/** @type {import('next-sitemap').IConfig} */

const siteMetadata = require('./data/siteMetadata')
module.exports = {
  siteUrl: siteMetadata.siteUrl,
  exclude: ['/404'],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/404'],
      },
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      `${siteMetadata.siteUrl}/sitemap.xml`,
      `${siteMetadata.siteUrl}/server-sitemap.xml`,
    ],
  },
  // exclude: ['/write/*'],
}

// const siteUrl = process.env.NEXT_PUBLIC_DOMAIN_URL;
// module.exports = {
//   siteUrl,
//   exclude: ["/404"],
//   generateRobotsTxt: true,
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: "*",
//         disallow: ["/404"],
//       },
//       { userAgent: "*", allow: "/" },
//     ],
//     additionalSitemaps: [
//       `${siteUrl}sitemap.xml`,
//       `${siteUrl}server-sitemap.xml`,
//     ],
//   },
// };
