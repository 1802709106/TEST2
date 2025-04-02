// axiosInstances.js

// import axios from 'axios';

// const instance1 = axios.create({
//   baseURL: 'http://localhost:8088', // 根请求路径1（java后端）
// });

// const instance2 = axios.create({
//   baseURL: 'http://10.8.218.5:5000/front', // 根请求路径2（py后端）
// });

// const instance3 = axios.create({
//   baseURL: 'http://localhost:80', // 根请求路径3（前端）
// });

// export { instance1, instance2, instance3 };


// axiosInstances.js

import axios from 'axios';

const instance1 = axios.create({
  baseURL: 'http://192.168.31.110:5000', // 根请求路径1（py后端）
});

const instance2 = axios.create({
  baseURL: 'http://192.168.31.110:5000/front', // 根请求路径2（py后端）
});

const instance3 = axios.create({
  baseURL: 'http://localhost:80', // 根请求路径3（前端）
});

export { instance1, instance2, instance3 };