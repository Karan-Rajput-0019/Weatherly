import API from './api';

const authService = {
  signup: (name, email, password, confirmPassword) =>
    API.post('/auth/signup', { name, email, password, confirmPassword }),
  login: (email, password) => API.post('/auth/login', { email, password }),
  profile: () => API.get('/auth/profile'),
  updateProfile: data => API.put('/auth/profile', data)
};

export default authService;
