/** @type {import('next-sitemap').IConfig} */

const siteMetadata = require('./data/siteMetadata')
module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml'],
  robotsTxtOptions: {
    // policies: [
    //     { userAgent: "*", disallow: "/write/*" },
    //     { userAgent: "*", allow: "/" }
    // ],
    additionalSitemaps: [`${siteMetadata.siteUrl}/server-sitemap-index.xml`],
  },
  // exclude: ['/write/*'],
}
