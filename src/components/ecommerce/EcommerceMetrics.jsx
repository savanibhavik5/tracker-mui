import React from "react";
import Badge from "../ui/badge/Badge";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarLineIcon,
  BoxIconLine,
} from "@/icons";

export const EcommerceMetrics = ({ summary, bankBalances = [] }) => {
  const totalAccounts = bankBalances.length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
      {/* Income */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100">
          <ArrowUpIcon className="text-green-600" />
        </div>

        <div className="mt-5">
          <span className="text-sm  dark:text-gray-400">
            Total Income
          </span>

          <h4 className="mt-2 text-2xl  dark:text-gray-400 font-bold">
            ₹{summary?.totalIncome?.toLocaleString()}
          </h4>
        </div>
      </div>

      {/* Expense */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-100">
          <ArrowDownIcon className="text-red-600" />
        </div>

        <div className="mt-5">
          <span className="text-sm dark:text-gray-400">Total Expense</span>

          <h4 className="mt-2 text-2xl dark:text-gray-400 font-bold">
            ₹{summary?.totalExpense?.toLocaleString()}
          </h4>
        </div>
      </div>

      {/* Balance */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100">
          <DollarLineIcon className="text-blue-600" />
        </div>

        <div className="mt-5">
          <span className="text-sm dark:text-gray-400">Total Balance</span>

          <h4 className="mt-2 text-2xl dark:text-gray-400 font-bold">
            ₹{summary?.totalBalance?.toLocaleString()}
          </h4>
        </div>
      </div>

      {/* Accounts */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-100">
          <BoxIconLine />
        </div>

        <div className="mt-5">
          <span className="text-sm dark:text-gray-400">
            Total Accounts
          </span>

          <h4 className="mt-2 text-2xl dark:text-gray-400 font-bold">
            {totalAccounts}
          </h4>
        </div>
      </div>
    </div>
  );
};
