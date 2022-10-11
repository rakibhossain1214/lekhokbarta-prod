const siteMetadata = {
  title: 'Roarspot',
  author: 'A. M. Rakibul Hossain',
  headerTitle: 'Roarspot',
  description:
    'Roarspot is the largest blog publishing website in Bangladesh with the slogan "I am the best".',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://roarspot.vercel.app',
  siteLogo: '/static/images/logo.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/logo.png',
  email: 'roarspotmail@gmail.com',
  // twitter: 'https://twitter.com/Twitter',
  facebook: 'https://www.facebook.com/profile.php?id=100086779055740',
  youtube: 'https://www.youtube.com/channel/UC9D6ARfkgbGdeGsn8OJQSaA',
  locale: 'en-US',
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports plausible, simpleAnalytics, umami or googleAnalytics
    plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    simpleAnalytics: false, // true or false
    umamiWebsiteId: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    googleAnalyticsId: 'UA-238156085-1', // e.g. UA-000000-2 or G-XXXXXXX
    posthogAnalyticsId: '', // posthog.init e.g. phc_5yXvArzvRdqtZIsHkEm3Fkkhm3d0bEYUXCaFISzqPSQ
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
}

module.exports = siteMetadata
