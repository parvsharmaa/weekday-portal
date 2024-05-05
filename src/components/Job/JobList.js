import React from 'react';
import JobCard from './JobCard';
import { Grid } from '@mui/material';

const JobList = ({ jobs }) => {
  return (
    <div>
      <Grid container spacing={4}>
        {jobs.map((job, index) => (
          <Grid item key={job.jdUid + index} xs={6} sm={3} md={4} lg={3}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default JobList;
