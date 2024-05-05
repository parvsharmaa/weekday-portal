import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Modal,
  Box,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #0000',
  boxShadow: 24,
  p: 4,
};

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  position: relative;
  border-radius: 20px;
  padding: 5px 5px;
  background-color: rgb(255, 255, 255);
  max-width: 360px;
  box-shadow: rgb(0, 0, 0, 0.25) 0px 1px 4px 0px;
  margin-left: 50px;
  margin-right: 20px;
  margin-top: 15px;
  font-weight: 400;
  &:hover {
    transform: scale(1.1);
    background-color: white;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
  }
`;

const JobTitle = styled(Typography)`
  text-transform: uppercase;
`;

const Company = styled(Typography)`
  text-transform: capitalize;
  font-weight: 900;
`;

const Location = styled(Typography)`
  text-transform: capitalize;
`;

const ApplyButton = styled(Button)`
  text-transform: capitalize;
  cursor: pointer;
  width: 100%;
  background-color: rgb(85, 239, 196);
  border-radius: 0.5rem;
  border-color: rgb(85, 239, 196);
  color: rgb(0, 0, 0);
  font-size: 20px;
  padding: 8px 18px;
`;

const JobCard = ({ job }) => {
  const maxDescriptionLength = 112;

  const [showMore, setShowMore] = useState(false);
  const handleOpen = () => setShowMore(true);
  const handleClose = () => setShowMore(false);

  // handles salary range for a Job
  function getSalaryRange(job) {
    if (job.minJdSalary && job.maxJdSalary) {
      return `$${job.minJdSalary}k - $${job.maxJdSalary}k`;
    } else if (job.minJdSalary) {
      return `$${job.minJdSalary}k and above`;
    } else if (job.maxJdSalary) {
      return `Up to $${job.maxJdSalary}k`;
    } else {
      return 'N/A';
    }
  }

  return (
    <StyledCard>
      <CardContent>
        <JobTitle variant='h6'>{job.jobRole} 🚀</JobTitle>
        <Company variant='body2'>{job.companyName}</Company>
        <Location variant='body2'>Location : {job.location}</Location>
        <Typography style={{ marginBottom: '4px' }} variant='body2'>
          Estimated Salary : {getSalaryRange(job)} ✅
        </Typography>
        <Typography
          style={{ marginBottom: '4px', fontWeight: 'bold' }}
          variant='body2'
          paragraph
        >
          About Company :
        </Typography>
        <Typography variant='body2' paragraph>
          {job.jobDetailsFromCompany.substring(0, maxDescriptionLength)}
          <span onClick={handleOpen}>Read More...</span>
          {/* rencder Read More Modal */}
          <Modal
            open={showMore}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                <JobTitle variant='h6'>Job Description</JobTitle>
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                {job.jobDetailsFromCompany}
              </Typography>
            </Box>
          </Modal>
        </Typography>
        <Typography
          variant='body2'
          style={{ marginBottom: '7px', fontWeight: 600 }}
        >
          Minimum Experience: {job.minExp ? `${job.minExp} years` : 'NA'}
        </Typography>
        <ApplyButton variant='contained' color='primary' href={job.jdLink}>
          ⚡ Easy Apply
        </ApplyButton>
      </CardContent>
    </StyledCard>
  );
};

export default JobCard;
