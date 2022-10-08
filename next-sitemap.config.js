/** @type {import('next-sitemap').IConfig} */

const siteMetadata = require('./data/siteMetadata')
module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    // policies: [
    //     { userAgent: "*", disallow: "/write/*" },
    //     { userAgent: "*", allow: "/" }
    // ],
    additionalSitemaps: [`${siteMetadata.siteUrl}/server-sitemap.xml`],
  },
  // exclude: ['/write/*'],
}
