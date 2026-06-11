// ImageKit Configuration
// Update these values with your ImageKit credentials from https://imagekit.io/dashboard

export const IMAGEKIT_CONFIG = {
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/monstrec/',
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY || 'public_key_here',
  authenticator: async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/imagekit-auth`);
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  },
};

// Image transformation presets
export const IMAGE_TRANSFORMS = {
  // Hero images - full width
  hero: {
    width: 1920,
    height: 1080,
    quality: 90,
    format: 'webp',
  },
  
  // Card images - medium size
  card: {
    width: 600,
    height: 400,
    quality: 85,
    format: 'webp',
  },
  
  // Thumbnail - small images
  thumbnail: {
    width: 300,
    height: 300,
    quality: 80,
    format: 'webp',
  },
  
  // Vehicle images - gallery
  vehicleGallery: {
    width: 800,
    height: 600,
    quality: 85,
    format: 'webp',
  },
  
  // Profile/Avatar images
  avatar: {
    width: 200,
    height: 200,
    quality: 90,
    format: 'webp',
  },
  
  // Destination images - landscape
  destination: {
    width: 800,
    height: 500,
    quality: 85,
    format: 'webp',
  },
};

// Default placeholder images (ImageKit URLs)
export const DEFAULT_IMAGES = {
  heroScooter: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
  landingRent: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  landingPartner: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
  kathmandu: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  pokhara: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  chitwan: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
  lumbini: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
  butwal: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
  
  // Feature images
  affordablePricing: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600&q=80',
  securePayment: 'https://images.unsplash.com/photo-1533767299635-6be5b932ae6f?w=600&q=80',
  verifiedOwners: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  easyBooking: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
};

// Helper function to generate ImageKit URL with transformations
export const getImagekitUrl = (filePath, transforms = {}) => {
  if (!filePath) return DEFAULT_IMAGES.heroScooter;
  
  // If it's already a full URL, return as is
  if (filePath.startsWith('http')) {
    return filePath;
  }
  
  const urlEndpoint = IMAGEKIT_CONFIG.urlEndpoint;
  const transformParams = new URLSearchParams();
  
  // Add transformations
  Object.entries(transforms).forEach(([key, value]) => {
    if (value) {
      transformParams.append(key, value);
    }
  });
  
  const queryString = transformParams.toString();
  return queryString ? `${urlEndpoint}${filePath}?${queryString}` : `${urlEndpoint}${filePath}`;
};

// Helper to get responsive image URLs for different screen sizes
export const getResponsiveImageURL = (filePath, baseWidth = 800) => {
  return {
    mobile: getImagekitUrl(filePath, { w: Math.floor(baseWidth * 0.5), q: 80 }),
    tablet: getImagekitUrl(filePath, { w: baseWidth, q: 85 }),
    desktop: getImagekitUrl(filePath, { w: baseWidth * 1.5, q: 90 }),
  };
};
