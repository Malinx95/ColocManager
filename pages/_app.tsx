import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserContextProvider } from "../provider/CurrentUserContext";
import Drawer from "../components/Drawer";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <Drawer />
        <Component {...pageProps} />
      </UserContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
