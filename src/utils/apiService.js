import apisauce, { CancelToken } from "apisauce";

import { showLoading, hideLoading } from "./loadingService";
import { showErrorMessage } from "./errorService";

const baseURL = "http://localhost:8080/api/v1";
// configuration
const api = apisauce.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 20000,
  withCredentials: true
});

const pending = [];

const removePending = token => {
  pending.forEach(item => {
    if (item.existToken === token) {
      item.cancelFunc();
      pending.splice(item, 1);
    }
  });
};

api.addRequestTransform(config => {
  const existToken = `${baseURL}${config.url}&${config.method}`;
  removePending(existToken);
  config.cancelToken = new CancelToken(cancelFunc => {
    pending.push({ existToken, cancelFunc });
  });
  showLoading();
});

api.addResponseTransform(response => {
  const token = `${response.config.url}&${response.config.method}`;
  removePending(token);
  hideLoading();
  if (!response.ok) {
    showErrorMessage({
      message: response.data.message,
      code: response.status,
      type: response.problem
    });
  }
});

export default api;
