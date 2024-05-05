const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');

const WEEKDAY_API_URL = 'https://api.weekday.technology/adhoc/getSampleJdJSON';

/*
  fetches the jobs api data with an offset and limit parameters
  - offset : Skips the number of jobs from start
  - limit :  Number of jobs to be fetched in a single request
*/
export const fetchJobsData = async (offset, limit) => {
  const body = JSON.stringify({ limit, offset });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body,
  };

  try {
    const response = await fetch(WEEKDAY_API_URL, requestOptions);

    if (!response.ok) {
      throw new Error('Error in Network response');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching data:', error.message);
  }
};
