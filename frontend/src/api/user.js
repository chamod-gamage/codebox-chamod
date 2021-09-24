import axios from 'axios';
export const postUserInfo = async ({ name, email, tool, teamSize }) => {
  return await axios.post(`${process.env.REACT_APP_API_URL}/users`, {
    name,
    email,
    tool,
    teamSize,
  });
};
