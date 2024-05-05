import { createSlice } from '@reduxjs/toolkit';
import { fetchJobsData } from '../api/jobFetch';

const initialState = {
  jobs: [],
  isLoading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    startFetching(state) {
      state.isLoading = true;
      state.error = null;
    },
    appendJobs(state, action) {
      const newJobs = action.payload.filter(
        (job) =>
          !state.jobs.some((existingJob) => existingJob.jdUid === job.jdUid)
      );
      state.jobs = [...state.jobs, ...newJobs];
      state.isLoading = false;
    },
    setFetchError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const fetchJobs = (offset, limit) => async (dispatch) => {
  dispatch(startFetching());
  try {
    const data = await fetchJobsData(offset, limit);
    dispatch(appendJobs(data.jdList));
  } catch (error) {
    dispatch(setFetchError('Error fetching data'));
  }
};

export const { startFetching, appendJobs, setFetchError } = jobsSlice.actions;
export default jobsSlice.reducer;
