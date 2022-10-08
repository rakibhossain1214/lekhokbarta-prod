const siteMetadata = require('./data/siteMetadata')

module.exports = {
  siteUrl: siteMetadata.siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // policies: [
    //     { userAgent: "*", disallow: "/write/*" },
    //     { userAgent: "*", allow: "/" }
    // ],
    additionalSitemaps: [`${siteMetadata.siteUrl}/server-sitemap.xml`],
  },
  // exclude: ['/write/*'],
}
