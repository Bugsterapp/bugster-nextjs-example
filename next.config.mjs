/** @type {import('next').NextConfig} */
import createWithVercelToolbar from '@vercel/toolbar/plugins/next';

const nextConfig = {
  // Config options here
};
 
const withVercelToolbar = createWithVercelToolbar();
// Instead of export default nextConfig, do this:
export default withVercelToolbar(nextConfig);
