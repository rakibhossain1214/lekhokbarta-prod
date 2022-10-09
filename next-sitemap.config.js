/** @type {import('next-sitemap').IConfig} */

const siteMetadata = require('./data/siteMetadata')
module.exports = {
  siteUrl: siteMetadata.siteUrl,
  exclude: ['/404', '/server-sitemap.xml'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/404'],
      },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [`${siteMetadata.siteUrl}/server-sitemap.xml`],
  },
}
