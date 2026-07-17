// "use client";


// import React, {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
// } from "react";

// const ThemeContext = createContext(undefined);

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light");
//   const [isInitialized, setIsInitialized] =
//     useState(false);

// useEffect(() => {
//   localStorage.setItem(
//     "theme",
//     theme
//   );
//   if (theme === "dark") {
//     document.documentElement.classList.add(
//       "dark"
//     );
//   } else {
//     document.documentElement.classList.remove(
//       "dark"
//     );
//   }
// }, [theme]);

//   useEffect(() => {
//     if (isInitialized) {
//       localStorage.setItem(
//         "theme",
//         theme
//       );
//       if (theme === "dark") {
//         document.documentElement.classList.add(
//           "dark"
//         );
//       } else {
//         document.documentElement.classList.remove(
//           "dark"
//        );
//       }
//     }
//   }, [theme, isInitialized]);

//   const toggleTheme = () => {
//     setTheme((prevTheme) =>
//       prevTheme === "light"
//         ? "dark"
//         : "light"
//     );
//   };

//   return (
//     <ThemeContext.Provider
//       value={{
//         theme,
//         toggleTheme,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context =
//     useContext(ThemeContext);

//   if (context === undefined) {
//     throw new Error(
//       "useTheme must be used within a ThemeProvider"
//     );
//   }
//   return context;
// };

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {


const [theme, setTheme] = useState(() => {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("theme") || "light";
});

useEffect(() => {
  localStorage.setItem("theme", theme);
  document.documentElement.classList.toggle(
    "dark",
    theme === "dark"
  );
}, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);