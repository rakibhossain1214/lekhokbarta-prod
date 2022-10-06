import React from 'react'
import { NextSeo } from 'next-seo'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

function Test(props) {
  return (
    <div>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      Hello test
    </div>
  )
}

export default Test
