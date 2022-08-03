import '../src/config/firebase.config'

import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import '@fontsource/inter/variable-full.css'
import '@/css/suneditor.css'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'

import { AuthProvider } from '../src/hook/auth'
import AuthStateChanged from '../src/layout/AuthStateChanged'
import AppLayout from '../src/layout/AppLayout'

const isDevelopment = process.env.NODE_ENV === 'production'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <Analytics />
      <AuthProvider>
        <AppLayout>
          <AuthStateChanged>
            <LayoutWrapper>
              <Component {...pageProps} />
            </LayoutWrapper>
          </AuthStateChanged>
        </AppLayout>
      </AuthProvider>
    </ThemeProvider>
  )
}
