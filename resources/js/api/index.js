import axiosRetry from 'axios-retry';

import interfaces from './interfaces';

function refreshToken() {
  return axios.post('/api/refresh');
}

function useRefreshTokenHandler(axios) {
  axios.refreshTokenRetryCount = 0;

  axios.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401 && axios.refreshTokenRetryCount < 3) {
      axios.refreshTokenRetryCount += 1;
      return refreshToken().then(() => {
        axios.refreshTokenRetryCount = 0;
        return axios.request(error.config);
      });
    } else {
      if (axios.refreshTokenRetryCount !== 0) {
        axios.refreshTokenRetryCount = 0;
      }
    }

    return Promise.reject(error);
  });
}

function handleRequestError(error) {
  if (error.response && error.response.status === 401) {
    window.location = '/login';
  } else {
    return Promise.reject(error);
  }
}

function createAxiosAdapter(interfaces, axios) {
  axiosRetry(axios, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
  });

  useRefreshTokenHandler(axios);

  const adapter = {
    ...interfaces,

    wrapRequest(requestChain) {
      return requestChain.catch(handleRequestError);
    },

    get() {
      return this.wrapRequest(axios.get.apply(null, arguments));
    },

    post() {
      return this.wrapRequest(axios.post.apply(null, arguments));
    },

    patch() {
      return this.wrapRequest(axios.patch.apply(null, arguments));
    },

    delete() {
      return this.wrapRequest(axios.delete.apply(null, arguments));
    },
  };

  return adapter;
}

const api = createAxiosAdapter(interfaces, window.axios);

export default api;
