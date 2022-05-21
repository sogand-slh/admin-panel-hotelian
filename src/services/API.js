import axios from "axios";

const BASE_URL = "http://front-api-test.wsafar.com/posts";

const getPosts = async (access_token, type, search) => {
  let response;
  if (type === "list") {
    response = await axios.get(`${BASE_URL}?access-token=${access_token}`);
  } else if (type === "search" && search) {
    response = await axios.get(
      `${BASE_URL}?access-token=${access_token}&filter[${search?.fieldName}]=${search?.searchValue}`
    );
  }
  return response.data?.result;
};
export { getPosts };
