import React from "react";
// import { BanknotesIcon } from "@heroicons/react/24/outline";

export default function BankBalanceCards({ banks = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4 md:gap-6">
      {banks.map((bank) => (
        <div
          key={bank.accountUUID}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
            {bank.accountName}
          </h4>

          <p className="mt-1 text-sm text-gray-500">{bank.accountType}</p>

          <h2
            className={`mt-5 text-3xl font-bold ${
              bank.balance >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            ₹ {bank.balance.toLocaleString("en-IN")}
          </h2>
        </div>
      ))}
    </div>
  );
}
