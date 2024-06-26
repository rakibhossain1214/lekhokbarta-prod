import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { withPublic } from 'src/hook/route'
import { useRouter } from 'next/dist/client/router'
import CustomNavDropdown from './Dropdowns/CustomNavDropdown'
import LoginModal from './LoginModal'
import { useState } from 'react'
import Image from 'next/image'

const LayoutWrapper = ({ children, auth }) => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { user, loginWithGoogleNoRedirect, error, logout } = auth
  const router = useRouter()
  const showHeader =
    router.pathname === '/dashboard/earning-report' ||
    router.pathname === '/dashboard/earning-trx-history'
      ? false
      : true

  const handleLoginModal = () => {
    setShowLoginModal(false)
  }

  return (
    <SectionContainer showHeader={showHeader}>
      <div className="flex h-screen flex-col justify-between">
        {showHeader && (
          <header className="flex items-center justify-between py-10">
            <div>
              <Link href="/" aria-label={siteMetadata.headerTitle}>
                <div className="flex items-center justify-between">
                  <div className="mr-2">
                    <Image
                      src={'/static/images/roarspot-logo.png'}
                      alt="roarspot logo"
                      width={53.86}
                      height={43.61}
                    />
                  </div>
                  {typeof siteMetadata.headerTitle === 'string' ? (
                    <div className="block h-6 text-2xl font-semibold text-teal-700 dark:text-teal-600">
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
              </div>
              {user !== null && user !== 'NODATA' ? (
                <CustomNavDropdown userInfo={user} logout={logout} />
              ) : (
                <Link
                  key="login"
                  className="p-1 font-medium text-gray-900 dark:text-blue-500 sm:p-4"
                >
                  <button onClick={() => setShowLoginModal(true)}>Login</button>
                </Link>
              )}
              {showLoginModal ? (
                <LoginModal
                  handleLoginModal={handleLoginModal}
                  loginWithGoogleNoRedirect={loginWithGoogleNoRedirect}
                />
              ) : (
                ''
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
