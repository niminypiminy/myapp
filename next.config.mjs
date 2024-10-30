/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Enable WebAssembly and layers support
      config.experiments = {
        asyncWebAssembly: true,
        syncWebAssembly: true,
        layers: true,  // Enable layers
      };
  
      // Add rules for handling .wasm files
      config.module.rules.push({
        test: /\.wasm$/,
        type: 'webassembly/async',
      });
  
      return config;
    },
  };
  
  export default nextConfig;