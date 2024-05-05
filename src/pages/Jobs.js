import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../store/jobSlice';
import Filters from '../components/Job/Filters';
import InfiniteScroll from 'react-infinite-scroll-component';
import JobList from '../components/Job/JobList';
import { CircularProgress } from '@mui/material';

const scrollerPosition = (component) => {
  return <div style={{ textAlign: 'center', margin: '10px' }}>{component}</div>;
};

const Jobs = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.jobs.isLoading);
  const jobs = useSelector((state) => state.jobs.jobs);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    role: '',
    location: '',
    experience: '',
    companyName: '',
    techStack: '',
    minBasePay: '',
    remote: false,
  });
  const limit = 10;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filters]);

  const fetchData = () => {
    dispatch(fetchJobs((page - 1) * limit, limit));
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  const handleFilterChange = (newFilters) => {
    setPage(1);
    setFilters(newFilters);
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (!filters.role ||
        job.jobRole?.toLowerCase().includes(filters.role.toLowerCase())) &&
      (!filters.experience || job.minExp >= parseInt(filters.experience)) &&
      (!filters.remote || job.location?.toLowerCase() === 'remote') &&
      (!filters.companyName ||
        job.companyName
          ?.toLowerCase()
          .includes(filters.companyName.toLowerCase())) &&
      (!filters.location ||
        job.location?.toLowerCase().includes(filters.location.toLowerCase())) &&
      (!filters.techStack ||
        job.techStack
          ?.toLowerCase()
          .includes(filters.techStack.toLowerCase())) &&
      (!filters.minBasePay || job.minJdSalary <= parseInt(filters.minBasePay))
  );

  return (
    <div>
      <Filters onFilterChange={handleFilterChange} />
      <InfiniteScroll
        dataLength={filteredJobs.length}
        next={loadMore}
        hasMore={!isLoading}
        loader={scrollerPosition(
          <CircularProgress sx={{ color: 'black', marginTop: '30px' }} />
        )}
        endMessage={scrollerPosition('No more jobs to load')}
      >
        <JobList jobs={filteredJobs} />
      </InfiniteScroll>
    </div>
  );
};

export default Jobs;
