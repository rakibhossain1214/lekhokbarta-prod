import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ShowPost from '../components/ShowPost'
import CommentList from '@/components/CommentList'
import { AddFollower, getUserInfo, deleteFollower } from '@/lib/firestoreConnection'
import { useEffect, useState } from 'react'
import LoginModal from '@/components/LoginModal'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const postDateTemplate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

export default function PostLayout({
  frontMatter,
  authorDetails,
  next,
  prev,
  children,
  postId,
  date,
  lastmod,
  postData,
  user,
  loginWithGoogleNoRedirect,
}) {
  const { slug, title, tags, postThumbnail, summary, category } = frontMatter

  const [showFollowButton, setShowFollowButton] = useState(true)
  const [followersCount, setFollowersCount] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [authorInfo, setAuthorInfo] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    async function getUser() {
      setProcessing(true)
      const userData = await getUserInfo(authorDetails.id)
      setAuthorInfo(userData)

      setFollowersCount(userData?.followers?.length)

      userData?.followers?.map((follower) => {
        if (follower.uid === user?.uid) {
          setShowFollowButton(false)
        }
      })
      setProcessing(false)
    }
    getUser()
  }, [postData])

  const handleFollow = () => {
    setProcessing(true)
    setShowFollowButton(false)

    setFollowersCount(followersCount + 1)

    if (authorInfo !== null) {
      AddFollower({ userInfo: authorInfo, user }).then(async () => {
        setProcessing(false)
      })
    }
  }

  const deleteFollow = () => {
    setShowFollowButton(true)
    setProcessing(true)

    setFollowersCount(followersCount - 1)

    if (authorInfo !== null) {
      deleteFollower({ userInfo: authorInfo, user }).then(async () => {
        setProcessing(false)
      })
    }
  }

  const handleLoginModal = () => {
    setShowLoginModal(false)
  }

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${postId}/${slug}`}
        images={postData.images}
        authorDetails={authorDetails}
        title={title}
        summary={summary}
        date={date}
        lastmod={lastmod}
        canonicalUrl={`${siteMetadata.siteUrl}/blog/${postId}/${slug}`}
        thumbnail={postThumbnail}
      />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
              <p className="pr-5 pl-5 pt-2 text-gray-600 dark:text-gray-400">{summary}</p>
              <div className="flex justify-center pt-2">
                {user !== null ? (
                  ''
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="m-1 flex items-center rounded border border-gray-200 bg-red-500 pl-2 pr-2 pt-1 pb-1 text-xs text-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="mt-1 mb-1 mr-1 h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                      />
                    </svg>
                    Please login to vote and comment
                  </button>
                )}

                {showLoginModal ? (
                  <LoginModal
                    handleLoginModal={handleLoginModal}
                    loginWithGoogleNoRedirect={loginWithGoogleNoRedirect}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </header>
          <div
            className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
            style={{ gridTemplateRows: 'auto 1fr' }}
          >
            <dl className="pt-6 pb-2 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    {authorDetails.avatar && (
                      <Image
                        src={authorDetails.avatar}
                        width="38px"
                        height="38px"
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <dl className="text-sm font-medium leading-5">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        <Link
                          href={`/profile/${authorDetails.id}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {authorDetails.name}
                        </Link>
                      </dd>
                      <dt className="sr-only">follower</dt>
                      <dd>
                        {followersCount > 1
                          ? `${followersCount} followers`
                          : `${followersCount} follower`}{' '}
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>

              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <dl className="text-sm font-medium leading-5">
                      <dt className="sr-only">Follow</dt>
                      <dd className="mt-4">
                        {user !== null && authorDetails.id !== user?.uid ? (
                          showFollowButton ? (
                            <button
                              disabled={processing}
                              onClick={handleFollow}
                              className="m-1 flex items-center rounded border border-gray-200 bg-teal-500 pl-2 pr-2 pt-1 pb-1 text-xs text-gray-100"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Follow
                            </button>
                          ) : (
                            <button
                              disabled={processing}
                              onClick={deleteFollow}
                              className="m-1 flex items-center rounded border border-gray-200 bg-gray-300 pl-2 pr-2 pt-1 pb-1 text-xs text-gray-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              Unfollow
                            </button>
                          )
                        ) : (
                          ''
                        )}
                      </dd>
                      <dd></dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            {showLoginModal ? (
              <LoginModal
                handleLoginModal={handleLoginModal}
                loginWithGoogleNoRedirect={loginWithGoogleNoRedirect}
              />
            ) : (
              ''
            )}
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-0 pb-8 dark:prose-dark">
                <ShowPost content={children} />
                {postData.referenceSources !== '' && (
                  <>
                    <p className="text-md mt-2 text-blue-600">তথ্যসূত্র:</p>
                    <p className="-mt-4 text-xs">{postData.referenceSources}</p>
                  </>
                )}
              </div>
              <CommentList postId={postId} defaultPostData={postData} user={user} />
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="mt-1 flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag.value} text={tag.value} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Category
                  </h2>
                  <div className="mt-1 flex flex-wrap text-sm text-blue-500">
                    {category.label.toUpperCase()}
                  </div>
                </div>

                {(next || prev) && (
                  <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                    {prev && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Previous Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${prev.postId}/${prev.slug}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && (
                      <div>
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Next Article
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/blog/${next.postId}/${next.slug}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href="/"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
        <ScrollTopAndComment />
      </article>
    </SectionContainer>
  )
}
