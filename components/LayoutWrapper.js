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
import CustomNavDropdown from './Dropdowns/CustomNavDropdown'

const LayoutWrapper = ({ children, auth }) => {
  const { user, logout } = auth
  const router = useRouter()
  const showHeader =
    router.pathname === '/dashboard/earning-report' ||
    router.pathname === '/dashboard/earning-trx-history'
      ? false
      : true

  return (
    <SectionContainer showHeader={showHeader}>
      <div className="flex h-screen flex-col justify-between">
        {showHeader && (
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
                <Link
                  key={'logout'}
                  href={'#'}
                  onClick={logout}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  Logout
                </Link>
              </div>
              {user !== null ? (
                <CustomNavDropdown userInfo={user} />
              ) : (
                <Link
                  key="login"
                  href="/login"
                  className="p-1 font-medium text-blue-500 dark:text-blue-500 sm:p-4"
                >
                  Login
                </Link>
              )}

              <ThemeSwitch />

              {/* <MobileNav user={user} /> */}
            </div>
          </header>
        )}
        <main className="mb-auto">{children}</main>
        {showHeader && <Footer />}
      </div>
    </SectionContainer>
  )
}

export default withPublic(LayoutWrapper)
