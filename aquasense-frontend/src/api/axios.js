// import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// export default instance;

import axios from 'axios';

const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : `${process.env.REACT_APP_BACKEND_URL || 'https://aqua-ppr5.onrender.com'}/api`;

const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;
