import axios from "axios";

const baseUrl = "https://reqres.in/";

export const getUsers = async (page = 1) => {
  const request = await axios.get(`${baseUrl}api/users?page=${page}`);
  return request.data;
};

// Bonus:
export const deleteUser = async (id) => {
  const request = await axios.delete(`${baseUrl}api/users/${id}`);
  return request.status;
};
