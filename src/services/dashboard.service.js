import api from "./api";

const DashboardService = {
  getDashboard() {
    return api.get("/auth/dashboard");
  },
};

export default DashboardService;
