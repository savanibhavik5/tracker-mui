// Global CSS
import "@/app_backup/globals.css";

// Third party CSS
import "flatpickr/dist/flatpickr.css";

// Font
import { Outfit } from "next/font/google";

// Context
import AuthProvider from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={outfit.className}>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <Component {...pageProps} />
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}