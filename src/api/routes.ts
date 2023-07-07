const BASE_URL = "http://localhost:8082";
const API_ROUTES = {
  save: {
    method: "post",
    url: `${BASE_URL}/save`,
  },
  getStatus: {
    method: "get",
    url: `${BASE_URL}/get-status`,
  },
};

export default Object.freeze(API_ROUTES);
