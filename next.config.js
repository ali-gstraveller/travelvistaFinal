
// next.config.js

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cf.bstatic.com', // The hostname of the external image source
          port: '', // Optional: specify if you are using a specific port
          pathname: '/**', // Path matching for images
        },
        {
          protocol: 'https',
          hostname: 'pix10.agoda.net', // The hostname of the external image source
          port: '', // Optional: specify if you are using a specific port
          pathname: '/**', // Path matching for images
        },
        {
          protocol: 'https',
          hostname: 'www.agoda.com', // The hostname of the external image source
          port: '', // Optional: specify if you are using a specific port
          pathname: '/**', // Path matching for images
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org', // The hostname of the external image source
          port: '', // Optional: specify if you are using a specific port
          pathname: '/**', // Path matching for images
        },
      ],
    },
};
  