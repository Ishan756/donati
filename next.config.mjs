/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com', // GitHub profile images
      'lh3.googleusercontent.com',     // Google profile images
      'github.com'                     // GitHub images
    ],
  },
};

export default nextConfig;
