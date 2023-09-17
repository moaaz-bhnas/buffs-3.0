const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    /**
     * For @uiw/react-md-editor
     * Next.js throws an error if a package in node_modules is not using EcmaScript Module way of impoting (e.g. require)
     * Setting "esmExternals" to "loose" automatically corrects this error
     * https://nextjs.org/docs/messages/import-esm-externals
     */
    esmExternals: "loose",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.gravatar.com",
      },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },
  modularizeImports: {
    "usehooks-ts": {
      transform: "usehooks-ts/dist/esm/{{member}}/{{member}}",
    },
    "react-use": {
      transform: "react-use/esm/{{member}}",
    },
  },
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
