import axios from "axios";

const api = axios.create({
  baseURL: "/api/auth",
});

const AuthService = {
  register(data) {
    return api.post("/register", data);
  },

  login(data) {
    return api.post("/login", data);
  },
};

export default AuthService;