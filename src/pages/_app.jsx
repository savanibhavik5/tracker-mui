import "@/app_backup/globals.css";
import "flatpickr/dist/flatpickr.css";

import { Outfit } from "next/font/google";

import AuthProvider from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

import AuthGuard from "@/components/AuthGuard";
import AdminLayout from "@/layout/AdminLayout";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={outfit.className}>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <AuthGuard>
              <AdminLayout>
              <Component {...pageProps} />
              </AdminLayout>
            </AuthGuard>
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}