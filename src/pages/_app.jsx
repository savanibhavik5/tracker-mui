import "@/app_backup/globals.css";
import "flatpickr/dist/flatpickr.css";

import { Outfit } from "next/font/google";

import AuthProvider from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

import AuthGuard from "@/components/AuthGuard";
import AdminLayout from "@/layout/AdminLayout";
import { useRouter } from "next/router";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const authPages = ["/login", "/signup"];
  const isAuthPage = authPages.includes(router.pathname);
  return (
    <div className={outfit.className}>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            {isAuthPage ? (
              <Component />
            ) : (
              <AuthGuard>
                <AdminLayout>
                  <Component />
                </AdminLayout>
              </AuthGuard>
            )}
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}
