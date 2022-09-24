import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Moment from 'react-moment'
import 'moment-timezone'
import Image from '@/components/Image'

export default function ListLayout({ posts, initialDisplayPosts = [], pagination }) {
    const [searchValue, setSearchValue] = useState('')
    const filteredBlogPosts = posts.filter((frontMatter) => {
        const searchContent =
            frontMatter.title +
            frontMatter.summary +
            frontMatter.category +
            frontMatter?.tags
                ?.map((tag) => {
                    return tag?.value
                })
                .join(' ')
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

    return (
        <>
            <div className="-mt-7 divide-y divide-gray-200 dark:divide-gray-700">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <div className="relative max-w-lg">
                        <input
                            aria-label="Search articles"
                            type="text"
                            onChange={(e) => setSearchValue(e.target.value)}
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
                            className="scroll h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap scrollbar-hide"
                        >
                            <ul className="inline-block cursor-pointer pl-4 pr-4 duration-300 ease-in-out hover:scale-105">
                                Trending
                            </ul>
                            <ul className="inline-block cursor-pointer pl-4 pr-4 duration-300 ease-in-out hover:scale-105">
                                Review
                            </ul>
                            <ul className="inline-block cursor-pointer pl-4 pr-4 duration-300 ease-in-out hover:scale-105">
                                Sports
                            </ul>
                            <ul className="inline-block cursor-pointer pl-4 pr-4 duration-300 ease-in-out hover:scale-105">
                                Entertainment
                            </ul>
                            <ul className="inline-block cursor-pointer pl-4 pr-4 duration-300 ease-in-out hover:scale-105">
                                Others
                            </ul>

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
                        const { slug, date, title, summary, tags, postId, category, postThumbnail } = frontMatter
                        return (
                            <li key={postId} className="py-4">
                                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                    <dl>
                                        {/* <dt className="sr-only">Published on</dt>
                                        <dd className="leading-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                            <Moment fromNow>{date}</Moment>
                                        </dd>
                                        <dd className="text-xs font-medium leading-6 text-gray-500 dark:text-gray-400">
                                            <time dateTime={date}>{formatDate(date)}</time>
                                        </dd> */}
                                        {
                                            postThumbnail !== undefined && postThumbnail !== "" ?
                                                <dd>
                                                    <Image
                                                        src={postThumbnail}
                                                        width={120}
                                                        height={80}
                                                    />
                                                </dd>
                                                :
                                                ""
                                        }
                                    </dl>
                                    <div className="space-y-3 xl:col-span-3">
                                        <dl>
                                            <dt className="sr-only">Published on</dt>
                                            <dd className="leading-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                                <Moment fromNow>{date}</Moment>
                                            </dd>
                                            <dd className="text-xs font-medium leading-6 text-gray-500 dark:text-gray-400">
                                                <time dateTime={date}>{formatDate(date)}</time>
                                            </dd>
                                        </dl>
                                        <div>
                                            <h3 className="text-2xl font-bold leading-8 tracking-tight">
                                                <Link
                                                    href={`/blog/${postId}/${slug}`}
                                                    className="text-gray-900 dark:text-gray-100"
                                                >
                                                    {title}
                                                </Link>
                                            </h3>
                                            <div className="flex flex-wrap">
                                                <span className='text-blue-400 uppercase text-sm pr-2'>{category}</span>
                                                {tags.map((tag) => (
                                                    <Tag key={tag.value} text={tag.value} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                            {summary}
                                        </div>
                                    </div>
                                </article>
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
