export default function setupAxios(axios, store) {
  axios.interceptors.request.use(
    config => {
      const {
        auth: { authToken }
      } = store.getState();

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
        config.headers["Access-Control-Allow-Origin"] = "*";
      }

      return config;
    },
    err => {
      Promise.reject(err)
    }
  );
}
