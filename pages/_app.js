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

import { AuthProvider } from '../src/hook/auth'
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <AuthProvider>
        <LayoutWrapper>
          <NextNProgress />
          <Component {...pageProps} />
        </LayoutWrapper>
      </AuthProvider>
    </ThemeProvider>
  )
}
