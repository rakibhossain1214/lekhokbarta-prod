import React from 'react'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

function About() {
  return (
    <>
      <PageSEO
        title={`About Us`}
        description={`About Roarspot - A platform for publishers and advertisers.`}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Image
              src={'/static/images/logo.png'}
              alt="avatar"
              width="202px"
              height="192px"
              className="h-48 w-48"
            />
            {/* <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">A. M. Rakibul Hossain</h3>
              <div className="text-gray-500 dark:text-gray-400">Founder</div>
              <div className="text-gray-500 dark:text-gray-400">Roarspot</div> */}
            {/* <div className="flex space-x-3 pt-6"> */}
            {/* <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} /> */}
            {/* <SocialIcon kind="github" href={github} /> */}
            {/* <SocialIcon kind="linkedin" href={linkedin} /> */}
            {/* <SocialIcon kind="twitter" href={twitter} /> */}
            {/* </div> */}
          </div>
          <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">
            Roarspot is a media network that builds, operates and invests in distinct media brands
            that produce ground-breaking content and media solutions across Bangladesh. We do this
            with the aim of creating the future of media. The future of media is one that is
            disruptive, agile, and credible. It embraces diversity, creates a positive impact, and
            leaves its audience in a better place than where they were before. We advocate for a
            media that embraces this and we embody this in our own identity.
          </div>
        </div>
      </div>
    </>
  )
}

export default About
