import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React, { useEffect, useState } from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DashboardService from "@/services/dashboard.service";
import { Box, CircularProgress } from "@mui/material";
import BankBalanceCards from "@/components/ecommerce/BankBalanceCards";
// import DemographicCard from "@/components/ecommerce/DemographicCard";

export default function Ecommerce() {
  const [data, setData] = useState(null);

  const loadDashboard = async () => {
    try {
      const response = await DashboardService.getDashboard();
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (!data) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <EcommerceMetrics
          summary={data?.summary}
          bankBalances={data?.bankBalances}
        />
      </div>
      <div className="col-span-12">
        <BankBalanceCards banks={data?.bankBalances} />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <MonthlySalesChart data={data?.monthlyChart} />
      </div>

      {/* <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget summary={data?.summary} />
      </div> */}

      <div className="col-span-12">
        <StatisticsChart data={data?.categoryChart} />
      </div>

      <div className="col-span-12">
        <RecentOrders transactions={data?.recentTransactions} />
      </div>
    </div>
  );
}
