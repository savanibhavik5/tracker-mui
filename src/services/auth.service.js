import api from "./api";

const AuthService = {
  login(data) {
    return api.post("/auth/login", data);
  },

  register(data) {
    return api.post("/auth/register", data);
  },

  refreshToken() {
    return api.post("/auth/refreshToken");
  },

  logout() {
    return api.post("/auth/logout");
  },
};

export default AuthService;
