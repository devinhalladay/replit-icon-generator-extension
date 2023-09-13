import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { HandshakeProvider } from '@replit/extensions-react';

function MyApp({ Component, pageProps }: AppProps) {
  return <HandshakeProvider>
    <Component {...pageProps} />
  </HandshakeProvider>
}

export default MyApp
