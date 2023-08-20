import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Toaster } from "@medusajs/ui"

import { ThemeProvider } from "../../components/ui/theme-provider";
import "src/styles/globals.css";
import { api } from "../utils/api";

const MyApp: AppType<{ session: Session | null }> = (
  { Component, pageProps: { session, ...pageProps } },
) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session}>
        <Toaster />
        <Component {...pageProps}/>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
