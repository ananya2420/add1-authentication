import '../styles/globals.css'


import { SessionProvider } from 'next-auth/react';
import MainNavigation from '../../components/layout/main-navigation';



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
    <MainNavigation />
 

      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

