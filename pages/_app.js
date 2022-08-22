import '../src/config/firebase.config'
import '@/css/tailwind.css'
import '@/css/prism.css'
import '@fontsource/inter/variable-full.css'
import '@/css/suneditor.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
// import { ClientReload } from '@/components/ClientReload'

import { AuthProvider } from '../src/hook/auth'
import AuthStateChanged from '../src/layout/AuthStateChanged'
import NextNProgress from 'nextjs-progressbar'
import Script from 'next/script'

// const isDevelopment = process.env.NODE_ENV === 'production'
// const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {/* {isDevelopment && isSocket && <ClientReload />} */}
      <Analytics />
      <Script src="https://apis.google.com/js/client:platform.js" strategy="lazyOnload"></Script>
      <AuthProvider>
        <AuthStateChanged>
          <LayoutWrapper>
            <NextNProgress />
            <Component {...pageProps} />
          </LayoutWrapper>
        </AuthStateChanged>
      </AuthProvider>
    </ThemeProvider>
  )
}
