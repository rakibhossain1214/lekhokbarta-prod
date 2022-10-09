import Link from '@/components/Link'
import { useEffect, useState } from 'react'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'
import { AddToFavoriteBlogs, getUserInfo, RemoveFavoriteBlogs } from '@/lib/firestoreConnection'
import kebabCase from '@/lib/utils/kebabCase'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import categories from '../data/categories'

const POSTS_PER_PAGE = 6

export default function BlogListLayout({ posts, user, setUser }) {
  const [searchValue, setSearchValue] = useState('')
  const [effectCaller, setEffectCaller] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [pageTitle, setPageTitle] = useState('All Posts')
  const [postCount, setPostCount] = useState(POSTS_PER_PAGE)
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')

  const filteredBlogPosts = filteredPosts.filter((frontMatter) => {
    const searchContent =
      frontMatter.title +
      frontMatter.category +
      frontMatter.authorDetails.name +
      frontMatter?.tags
        ?.map((tag) => {
          return tag?.value
        })
        .join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts = filteredPosts.length > 0 && !searchValue ? filteredPosts : filteredBlogPosts

  const slideLeft = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 500
  }

  const handleAddToFavoriteBlogs = (
    e,
    postId,
    title,
    slug,
    postThumbnail,
    authorDetails,
    category,
    tags
  ) => {
    e.preventDefault()
    setProcessing(true)

    setToastText('Added to favorite blogs.')
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)

    let favList = []
    user.favoriteBlogs.map((item) => {
      favList.push(item)
    })

    favList.push({
      postId,
      title,
      slug,
      postThumbnail,
      authorName: authorDetails.name,
      authorId: authorDetails.id,
      authorAvatar: authorDetails.avatar,
      category,
      tags,
    })

    user.favoriteBlogs = favList

    AddToFavoriteBlogs({
      postId,
      title,
      slug,
      postThumbnail,
      authorName: authorDetails.name,
      authorId: authorDetails.id,
      authorAvatar: authorDetails.avatar,
      user,
      category,
      tags,
    }).then(() => {
      setEffectCaller(!effectCaller)
      setProcessing(false)
    })
  }

  const handleRemoveFavoriteBlogs = (
    e,
    postId,
    title,
    slug,
    postThumbnail,
    authorDetails,
    category,
    tags
  ) => {
    e.preventDefault()
    setProcessing(true)

    setToastText('Removed from favorite blogs.')
    setShowToast(true)
    setTimeout(() => {
      setShowToast(false)
    }, 3000)

    let favList = []
    user.favoriteBlogs.map((item) => {
      if (item.postId !== postId) {
        favList.push(item)
      }
    })

    user.favoriteBlogs = favList

    RemoveFavoriteBlogs({
      postId,
      title,
      slug,
      postThumbnail,
      authorName: authorDetails.name,
      authorId: authorDetails.id,
      authorAvatar: authorDetails.avatar,
      user,
      category,
      tags,
    }).then(() => {
      setEffectCaller(!effectCaller)
      setProcessing(false)
    })
  }

  useEffect(async () => {
    if (user !== null) {
      const userData = await getUserInfo(user.uid)
      setUser(userData)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('userObject', JSON.stringify(userData))
      }
    }
  }, [effectCaller])

  const handleCategorySearch = (category) => {
    setPostCount(POSTS_PER_PAGE)
    const filteredPostsByTags = posts.filter(
      // (post) => post.draft !== true && post.tags.map((t) => kebabCase(t.value)).includes(tag)
      (post) => post.draft !== true && post.category.includes(category)
    )
    setFilteredPosts(filteredPostsByTags)
    document.getElementById('search-text-input').value = ''
    setSearchValue(category)
    let catStr = category.replace(/-/g, ' ')
    setPageTitle(catStr.charAt(0).toUpperCase() + catStr.slice(1))
    window.scrollTo(0, 0)
  }

  const handleTagSearch = (tag) => {
    setPostCount(POSTS_PER_PAGE)
    const filteredPostsByTags = posts.filter(
      (post) => post.draft !== true && post.tags.map((t) => kebabCase(t.value)).includes(tag)
    )
    setFilteredPosts(filteredPostsByTags)
    document.getElementById('search-text-input').value = ''
    setPageTitle(tag.charAt(0).toUpperCase() + tag.slice(1))
    setSearchValue(tag)
    window.scrollTo(0, 0)
  }

  const handleClearSearch = () => {
    setPostCount(POSTS_PER_PAGE)
    document.getElementById('search-text-input').value = ''
    setSearchValue('')
    setPageTitle('All Posts')
    setFilteredPosts(posts)
  }

  return (
    <>
      <div className="-mt-7 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-2">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-12">
            {pageTitle}
          </h1>
          <div className="relative max-w-lg">
            <input
              id="search-text-input"
              aria-label="Search articles"
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value)
              }}
              placeholder="Search blogs"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            className="text-md text-teal-500"
            style={{ marginTop: '8px', marginLeft: '5px' }}
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        </div>

        <>
          <div className="relative -mt-3 flex items-center p-2">
            <button className="cursor-pointer opacity-50 hover:opacity-100" onClick={slideLeft}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div
              id="slider"
              className="scroll h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap text-sm uppercase scrollbar-hide"
            >
              {categories.map((item) => (
                <ul
                  key={item.value}
                  className="inline-block cursor-pointer pl-4 pr-4 duration-300 ease-in-out hover:scale-105"
                >
                  <button onClick={() => handleCategorySearch(item.value.toLowerCase())}>
                    {item.label}
                  </button>
                </ul>
              ))}
            </div>

            <button className="cursor-pointer opacity-50 hover:opacity-100" onClick={slideRight}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </>

        <ul className="pt-5">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.slice(0, postCount).map((frontMatter) => {
            const {
              slug,
              date,
              title,
              summary,
              tags,
              postId,
              category,
              postThumbnail,
              wordCount,
              authorDetails,
            } = frontMatter
            return (
              <li key={postId} className="py-4">
                <div className="flex flex-col items-center rounded-lg border bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 md:w-full md:flex-row">
                  {postThumbnail !== undefined && postThumbnail !== '' ? (
                    <div className="md:w-64">
                      <Link href={`/blog/${postId}/${slug}`}>
                        <dd className="p-2">
                          <Image
                            className="rounded-t-lg md:rounded-l-lg"
                            src={postThumbnail}
                            width={500}
                            height={350}
                          />
                        </dd>
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="w-full flex-1">
                    <div className="flex flex-col justify-between p-3 leading-normal">
                      <Link href={`/blog/${postId}/${slug}`}>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          <div className="flex items-center">{title}</div>
                        </h2>
                      </Link>

                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="leading-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          {Math.ceil(wordCount / 225) > 1
                            ? `${Math.round(wordCount / 225)} minutes read`
                            : `${Math.round(wordCount / 225)} minute read`}
                        </dd>
                      </dl>

                      <div className="mb-2 flex flex-wrap">
                        {tags.map((tag) => (
                          <button
                            key={tag.value}
                            className="pr-2 text-sm uppercase text-teal-500"
                            onClick={() => handleTagSearch(tag.value.toLowerCase())}
                          >
                            {' '}
                            {tag.label}{' '}
                          </button>
                        ))}
                      </div>

                      <Link href={`/blog/${postId}/${slug}`}>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                          {summary}
                        </p>
                      </Link>

                      <hr className="border-1 p-1 dark:border-gray-700"></hr>
                      <div className="flex justify-between pt-1">
                        <div className="flex">
                          <Link href={`/profile/${authorDetails.id}`}>
                            <Image
                              className="rounded-full"
                              src={authorDetails.avatar}
                              width={40}
                              height={40}
                            />
                          </Link>

                          <div className="ml-2 mt-2 text-sm">
                            <Link href={`/profile/${authorDetails.id}`}>
                              <p className="leading-none text-gray-900 dark:text-gray-200">
                                {authorDetails.name}
                              </p>
                            </Link>
                            <dl>
                              <dd className="text-xs font-medium leading-6 text-gray-500 dark:text-gray-400">
                                <time dateTime={date}>{formatDate(date)}</time>
                              </dd>
                            </dl>
                          </div>
                        </div>

                        <div className="order-last pt-1">
                          <div className="flex content-center">
                            <button
                              className="pr-3 pb-2 pt-1 text-sm uppercase text-blue-600"
                              onClick={() => handleCategorySearch(category)}
                            >
                              {category}
                            </button>
                            {user !== null ? (
                              user.favoriteBlogs?.find((x) => x.postId === postId) ? (
                                <button
                                  type="button"
                                  disabled={processing}
                                  onClick={(e) =>
                                    handleRemoveFavoriteBlogs(
                                      e,
                                      postId,
                                      title,
                                      slug,
                                      postThumbnail,
                                      authorDetails,
                                      category,
                                      tags
                                    )
                                  }
                                >
                                  <Image
                                    src="/static/images/heart-red.png"
                                    width={24}
                                    height={24}
                                  />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  disabled={processing}
                                  onClick={(e) =>
                                    handleAddToFavoriteBlogs(
                                      e,
                                      postId,
                                      title,
                                      slug,
                                      postThumbnail,
                                      authorDetails,
                                      category,
                                      tags
                                    )
                                  }
                                >
                                  <Image
                                    src="/static/images/heart-dark.png"
                                    width={24}
                                    height={24}
                                  />
                                </button>
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {displayPosts.length > postCount ? (
        <div className="w-full pt-2 text-center text-teal-600">
          <button
            className="text-md font-semibold"
            onClick={() => setPostCount(postCount + POSTS_PER_PAGE)}
          >
            Load More...
          </button>
        </div>
      ) : (
        ''
      )}
      {showToast ? (
        <div
          id="myToast"
          className="fixed right-10 bottom-10 z-20 border-r-8 border-blue-500 bg-white px-5 py-4 drop-shadow-lg dark:bg-gray-700"
        >
          <p className="text-sm">
            <span className="mr-2 inline-block rounded-full bg-blue-500 px-3 py-1 font-extrabold text-white">
              i
            </span>
            {toastText}
          </p>
        </div>
      ) : (
        ''
      )}
      <ScrollTopAndComment />
    </>
  )
}
