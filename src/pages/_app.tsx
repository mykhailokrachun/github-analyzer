import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { GithubProvider } from '@/context/context';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AuthWrapper from '@/components/AuthWrapper';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <AuthWrapper>
        <GithubProvider>
          <Component {...pageProps} />
        </GithubProvider>
      </AuthWrapper>
    </UserProvider>
  );
}
