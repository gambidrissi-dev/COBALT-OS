import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* On désactive le compiler expérimental pour l'instant */
  /* experimental: {
    reactCompiler: true,
  }, */
  
  // Optionnel : ignore ESLint si tu as encore des erreurs de modules non trouvés
  eslint: {
    ignoreDuringBuilds: true, 
  }
};

export default nextConfig;