import http from "../http-common";

const getAll = () => {
  return http.get("/budget");
};

const get = (id) => {
  return http.get(`/budget/${id}`);
};

const create = (data) => {
  return http.post("/budget", data);
};

const update = (id, data) => {
  return http.put(`/budget/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/budget/${id}`);
};

const removeAll = () => {
  return http.delete(`/budget`);
};

const findByTitle = (title) => {
  return http.get(`/budget?description=${title}`);
};

const BudgetService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default BudgetService;
