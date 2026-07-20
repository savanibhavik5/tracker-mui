import { getSheetData } from "@/services/googleSheets.service";

export async function getDashboardData(userUUID) {
  const rows = (await getSheetData("TTransactions")).slice(2);
  const accountRows = (await getSheetData("TAccounts")).slice(2);

  // Sirf login user ka data
  const userRows = rows.filter((row) => row[1] === userUUID);

  let totalIncome = 0;
  let totalExpense = 0;

  const recentTransactions = [];
  const categoryMap = {};
  const accountMap = {};

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // 12 months default
  const monthlyMap = {};

  months.forEach((month) => {
    monthlyMap[month] = {
      month,
      income: 0,
      expense: 0,
    };
  });

  userRows.forEach((row) => {
    const transaction = {
      transactionUUID: row[0],
      userUUID: row[1],
      accountUUID: row[2],
      date: row[3],
      transactionType: row[4],
      financeType: row[5],
      amount: Number(row[6]) || 0,
      category: row[7],
      subCategory: row[8],
      partyName: row[9],
      description: row[10],
      paymentMode: row[11],
      referenceNo: row[12],
      status: row[13],
      createdAt: row[14],
      updatedAt: row[15],
    };

    // Summary
    if (transaction.financeType === "Income") {
      totalIncome += transaction.amount;
    } else if (transaction.financeType === "Expense") {
      totalExpense += transaction.amount;
    }

    // Recent Transactions
    recentTransactions.push(transaction);

    // Monthly Chart
    const date = new Date(transaction.date);
    const month = months[date.getMonth()];

    if (transaction.financeType === "Income") {
      monthlyMap[month].income += transaction.amount;
    }

    if (transaction.financeType === "Expense") {
      monthlyMap[month].expense += transaction.amount;
    }

    // Category Chart
    if (!categoryMap[transaction.category]) {
      categoryMap[transaction.category] = 0;
    }

    categoryMap[transaction.category] += transaction.amount;

    // Account Balance
    if (!accountMap[transaction.accountUUID]) {
      accountMap[transaction.accountUUID] = 0;
    }

    if (transaction.financeType === "Income") {
      accountMap[transaction.accountUUID] += transaction.amount;
    } else if (transaction.financeType === "Expense") {
      accountMap[transaction.accountUUID] -= transaction.amount;
    }
  });
  const bankBalances = accountRows
    .filter((row) => row[1] === userUUID)
    .map((row) => {
      const accountUUID = row[0];
      const openingBalance = Number(row[4]) || 0;
      return {
        accountUUID,
        accountName: row[2],
        accountType: row[3],
        currency: row[5],
        balance: openingBalance + (accountMap[accountUUID] || 0),
      };
    });

  recentTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    summary: {
      totalIncome,
      totalExpense,
      totalBalance: totalIncome - totalExpense,
    },

    monthlyChart: Object.values(monthlyMap),

    categoryChart: Object.entries(categoryMap).map(([category, value]) => ({
      category,
      value,
    })),

    bankBalances,
    recentTransactions: recentTransactions.slice(0, 10),
  };
}
