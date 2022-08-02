import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { withPublic } from 'src/hook/route'
import { useRouter } from 'next/dist/client/router'

const LayoutWrapper = ({ children, auth }) => {
  const { user } = auth
  const router = useRouter();
  const showHeader = 
    router.pathname === '/dashboard' || 
    router.pathname === '/dashboard/profile' ? false : true;

  return (
    <SectionContainer showHeader={showHeader}>
      <div className="flex h-screen flex-col justify-between">
        {showHeader &&
          <header className="flex items-center justify-between py-10">
            <div>
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <div className="flex items-center justify-between">
                  <div className="mr-3">
                    <Logo />
                  </div>
                  {typeof siteMetadata.headerTitle === 'string' ? (
                    <div className="hidden h-6 text-2xl font-semibold sm:block">
                      {siteMetadata.headerTitle}
                    </div>
                  ) : (
                    siteMetadata.headerTitle
                  )}
                </div>
              </Link>
            </div>
            <div className="flex items-center text-base leading-5">
              <div className="hidden sm:block">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                  >
                    {link.title}
                  </Link>
                ))}
                {user !== null ? (
                  <>
                    <Link
                      key="write"
                      href="/write"
                      className="p-1 font-medium text-primary-500 dark:text-primary-500 sm:p-4"
                    >
                      Write
                    </Link>
                    <Link
                      key="dashboard"
                      href="/dashboard"
                      className="p-1 font-medium text-blue-500 dark:text-blue-500 sm:p-4"
                    >
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <Link
                    key="login"
                    href="/login"
                    className="p-1 font-medium text-blue-500 dark:text-blue-500 sm:p-4"
                  >
                    Login
                  </Link>
                )}
              </div>

              <ThemeSwitch />

              <MobileNav />
            </div>
          </header>
        }
        <main className="mb-auto">{children}</main>
        {showHeader &&
          <Footer />
        }
      </div>
    </SectionContainer>
  )
}

export default withPublic(LayoutWrapper)
