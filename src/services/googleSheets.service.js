import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export async function getSheetData(sheetName) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
  });

  return response.data.values || [];
}

export async function appendSheetData(sheetName, values) {
  return sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [values],
    },
  });
}

export async function updateSheetData(range, values) {
  return sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values,
    },
  });
}
export function rowsToObjects(headers, rows) {
  return rows.map((row) => {
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = row[index] ?? "";
    });

    return obj;
  });
}
export async function getUserSheetData(sheetName, userUUID) {
  const values = await getSheetData(sheetName);

  if (!values.length) return [];

  const headers = values[0];

  const rows = values.slice(1).filter((row) => row[1] === userUUID);

  return rowsToObjects(headers, rows);
}
/* ===========================================
SUM BY FIELD
=========================================== */

export function sumByField(data, field) {
  return data.reduce((sum, item) => {
    return sum + Number(item[field] || 0);
  }, 0);
}

/* ===========================================
GROUP BY
=========================================== */

export function groupBy(data, field) {
  return data.reduce((result, item) => {
    const key = item[field];

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push(item);

    return result;
  }, {});
}

/* ===========================================
GET ALL USER DATA
=========================================== */

export async function getDashboardData(userUUID) {
  const [accounts, income, expense, investments, insurance, bills] =
    await Promise.all([
      getUserSheetData("TAccounts", userUUID),
      getUserSheetData("TIncome", userUUID),
      getUserSheetData("TExpense", userUUID),
      getUserSheetData("TInvestment", userUUID),
      getUserSheetData("TInsurance", userUUID),
      getUserSheetData("TBills", userUUID),
    ]);

  return {
    accounts,
    income,
    expense,
    investments,
    insurance,
    bills,
  };
}
