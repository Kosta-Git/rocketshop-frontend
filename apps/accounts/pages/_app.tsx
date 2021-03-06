import { AppProps } from 'next/app';
import Head from 'next/head';
import './../styles/styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to accounts!</title>
      </Head>
      <main className="app h-full">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
