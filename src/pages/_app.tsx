import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { AppRouter } from './api/trpc/[trpc]';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Create short link</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link
          rel='shortcut icon'
          href='/src/public/favicon.ico'
          type='image/x-icon'
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

function getBaseUrl() {
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export default withTRPC<AppRouter>({
  config() {
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
    };
  },
  ssr: false,
})(MyApp);
