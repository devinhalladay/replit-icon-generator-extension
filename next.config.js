const path = require("path");

module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on fs module, see github.com/zeit/next.js/issues/7755
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: "empty",
        module: "empty",
      };
    }
    config.resolve.alias["@components"] = path.join(__dirname, `components`);
    config.resolve.alias["@pages"] = path.join(__dirname, `pages`);
    config.resolve.alias["@styles"] = path.join(__dirname, `styles`);
    config.resolve.alias["@utils"] = path.join(__dirname, `utils`);
    config.resolve.alias["@hooks"] = path.join(__dirname, `hooks`);
    config.resolve.alias["@state"] = path.join(__dirname, `state`);
    return config;
  },
  assetPrefix: process.env.BASE_PATH || "",
  basePath: process.env.BASE_PATH || "",
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  distDir: '.extension'
};