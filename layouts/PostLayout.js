import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import { BlogSEO } from '@/components/SEO'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import Comments from '@/components/comments'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import ShowPost from '../components/ShowPost'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { Button } from '@material-ui/core'
import CommentBox from '@/components/CommentBox'
import CommentList from '@/components/CommentList'

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
  postData
}) {
  const { slug, title, images, tags } = frontMatter

  return (
    <SectionContainer>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/blog/${postId}/${slug}`}
        authorDetails={authorDetails}
        {...frontMatter}
      />
      {/* <ScrollTopAndComment /> */}
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
                  {/* {authorDetails.map((author) => ( */}
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
                          href={'/profilr'}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {authorDetails.name}
                        </Link>
                      </dd>
                      <dt className="sr-only">Twitter</dt>
                      <dd>2.2k followers</dd>
                      {/* {authorDetails.name} */}
                    </dl>
                  </li>
                  {/* <li className="flex items-center space-x-2">{authorDetails.name}</li> */}
                  {/* ))} */}
                </ul>
              </dd>

              <dd>
                <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <dl className="text-sm font-medium leading-5">
                      <dt className="sr-only">Follow</dt>
                      <dd className="mt-4">
                        <Button
                          variant="outlined"
                          color="secondary"
                          style={{ fontSize: '9px' }}
                          startIcon={<CheckBoxIcon />}
                        >
                          Follow
                        </Button>
                        {/* <Button
                          variant="outlined"
                          color="accent"
                          style={{ fontSize: '10px', }}
                          startIcon={<DoneAllIcon />}
                        >
                          Following
                        </Button> */}
                      </dd>
                      <dd></dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pt-0 pb-8 dark:prose-dark">
                <ShowPost content={children} />
              </div>
              {/* <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                <Link href={discussUrl(slug)} rel="nofollow">
                  {'Discuss on Twitter'}
                </Link>
                {` • `}
                <Link href={editUrl(fileName)}>{'View on GitHub'}</Link>
              </div> */}
              {/* <Comments frontMatter={frontMatter} /> */}
              {/* <h4 className='pt-2 pb-2'>
                <button>⬆️</button>(5) | <button>⬇️</button>(5) | <button>Comments </button> ({postData.comments.length})
              </h4> */}
              {/* <h4 className='pb-1'>Comments (5)</h4> */}
              <CommentList postId={postId} postData={postData}/>
              <CommentBox postId={postId} postData={postData}/>
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Tags
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag.value} text={tag.value} />
                      ))}
                    </div>
                  </div>
                )}
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
                  href="/blog"
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  &larr; Back to the blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
