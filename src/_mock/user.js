import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import axios from 'axios';

// ----------------------------------------------------------------------
  const getJobsData = async () =>{
    let jobsData = [];
    const response = await axios.get('http://127.0.0.1:5000/all_jobs');
    jobsData = response.data;
    const usersList = [...Array(jobsData.length)].map((_, index) => ({
      id: faker.datatype.uuid(),
      avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
      name: faker.name.fullName(),
      company: faker.company.name(),
      isVerified: faker.datatype.boolean(),
      status: sample(['active', 'banned']),
      role: sample([
        'Leader',
        'Hr Manager',
        'UI Designer',
        'UX Designer',
        'UI/UX Designer',
        'Project Manager',
        'Backend Developer',
        'Full Stack Designer',
        'Front End Developer',
        'Full Stack Developer',
      ]),
    })); 
    return usersList;
  }
export default getJobsData();
