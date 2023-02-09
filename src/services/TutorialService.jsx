import http from "../http-common";

const getAll = () => {
  return http.get("/api/tutorials");
};

const get = (id) => {
  return http.get(`/api/tutorials/${id}`);
};

const create = (data) => {
  return http.post("/api/tutorials", data);
};

const update = (id, data) => {
  return http.put(`/api/tutorials/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/api/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete(`/api/tutorials`);
};

const findByTitle = (title) => {
  return http.get(`/api/tutorials?title=${title}`); //in case we have more queries then use sign & for following parameters
};

const TutorialService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default TutorialService;
