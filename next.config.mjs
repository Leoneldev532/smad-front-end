
import nextMDX from '@next/mdx';
import createMDX from '@next/mdx'
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrettyCode from "rehype-pretty-code";
/** @type {import('next').NextConfig} */

const options = {
  theme:"tokyo-night"
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode,rehypeCodeTitles,options]],
  },
});


const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "*"
          },
        ],
      },
};

export default withMDX(nextConfig)
