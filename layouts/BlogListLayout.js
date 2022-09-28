import Link from '@/components/Link'
import { useEffect, useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Moment from 'react-moment'
import 'moment-timezone'
import Image from '@/components/Image'
import { AddToFavoriteBlogs, RemoveFavoriteBlogs } from '@/lib/firestoreConnection'

const allBlogCategories = [
  'Trending',
  'Review',
  'Sports',
  'Entertainment',
  'Other'
]

export default function BlogListLayout({
  posts,
  initialDisplayPosts = [],
  pagination,
  user,
  setUser,
}) {
  const [searchValue, setSearchValue] = useState('')
  const [effectCaller, setEffectCaller] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [searchContentType, setSearchContentType] = useState('text')

  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = ''
    if (searchContentType === 'text') {
      searchContent =
        frontMatter.title +
        frontMatter.category +
        frontMatter.authorDetails.name +
        frontMatter?.tags
          ?.map((tag) => {
            return tag?.value
          })
          .join(' ')
    } else if (searchContentType === 'category') {
      searchContent = frontMatter.category
    } else if (searchContentType === 'tag') {
      searchContent = frontMatter?.tags?.map((tag) => {
        return tag?.value
      }).join(' ')
    }

    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  const slideLeft = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft - 500
  }

  const slideRight = () => {
    var slider = document.getElementById('slider')
    slider.scrollLeft = slider.scrollLeft + 500
  }

  const handleAddToFavoriteBlogs = (e, postId, title, slug, postThumbnail, authorDetails) => {
    e.preventDefault()
    setProcessing(true)

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
    }).then(() => {
      setEffectCaller(!effectCaller)
      setProcessing(false)
    })
  }

  const handleRemoveFavoriteBlogs = (e, postId, title, slug, postThumbnail, authorDetails) => {
    e.preventDefault()
    setProcessing(true)

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
    }).then(() => {
      setEffectCaller(!effectCaller)
      setProcessing(false)
    })
  }

  useEffect(() => {
    setUser(user)
  }, [effectCaller])


  const handleCategorySearch = (category) => {
    setSearchContentType('category')
    setSearchValue(category)
  }

  const handleTagSearch = (tag) => {
    setSearchContentType('tag')
    setSearchValue(tag)
  }

  const handleClearSearch = () => {
    document.getElementById('search-text-input').value=""
    setSearchValue('')
  }

  return (
    <>
      <div className="-mt-7 divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <div className="relative max-w-lg">
            <input
              id="search-text-input"
              aria-label="Search articles"
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value)
                setSearchContentType('text')
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
          <button className='text-teal-500 text-md' style={{ marginTop: '8px', marginLeft: '5px' }} onClick={ handleClearSearch }>Clear Search</button>
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
              className="scroll h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide uppercase text-sm"
            >
              {allBlogCategories.map((item) => (
                <ul className="inline-block cursor-pointer pl-4 pr-4 duration-300 ease-in-out hover:scale-105">
                  <button onClick={() => handleCategorySearch(item)}>
                    {item}
                  </button>
                </ul>
              )
              )}
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
          {displayPosts.map((frontMatter) => {
            const {
              slug,
              date,
              title,
              summary,
              tags,
              postId,
              category,
              postThumbnail,
              characterCount,
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
                            width={window.innerWidth < 768 ? 500 : 250}
                            height={window.innerWidth < 768 ? 350 : 208}
                          />
                        </dd>
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className="w-full flex-1">
                    <div className="flex flex-col justify-between p-3 leading-normal">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="leading-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                          <Moment fromNow>{date}</Moment>
                        </dd>
                      </dl>

                      <Link href={`/blog/${postId}/${slug}`}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          <div className="flex items-center">{title}</div>
                        </h5>
                      </Link>

                      <div className="mb-2 flex flex-wrap">
                        {tags.map((tag) => (
                          <button className='pr-2 text-teal-500 uppercase text-sm' onClick={() => handleTagSearch(tag.value.toLowerCase())}> {tag.label} </button>
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
                            <div className="pr-2 pt-1 pb-1 text-sm uppercase text-blue-600">
                              <button onClick={() => handleCategorySearch(category)}>
                                {category}
                              </button>
                            </div>
                            {user !== null ? (
                              user.favoriteBlogs.find((x) => x.postId === postId) ? (
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
                                      authorDetails
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
                                      authorDetails
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
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
