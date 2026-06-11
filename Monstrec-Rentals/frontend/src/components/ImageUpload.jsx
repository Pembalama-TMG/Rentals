import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import OptimizedImage from './OptimizedImage.jsx';
import toast from 'react-hot-toast';

/**
 * ImageUpload Component
 * Handles multiple image uploads with preview
 * 
 * Props:
 * - onImagesChange: Callback when images are selected
 * - maxImages: Maximum number of images allowed
 * - existingImages: Array of existing image URLs
 * - onRemoveImage: Callback to remove an image
 */
const ImageUpload = ({
  onImagesChange,
  maxImages = 5,
  existingImages = [],
  onRemoveImage,
}) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files || []);
    
    if (uploadedImages.length + files.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsLoading(true);
    const newImages = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Only image files are allowed');
        continue;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} is too large (max 5MB)`);
        continue;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      newImages.push({
        file,
        preview: previewUrl,
        id: `temp-${Date.now()}-${Math.random()}`,
      });
    }

    const updatedImages = [...uploadedImages, ...newImages];
    setUploadedImages(updatedImages);
    onImagesChange(updatedImages);
    setIsLoading(false);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (id) => {
    const updated = uploadedImages.filter(img => img.id !== id);
    setUploadedImages(updated);
    onImagesChange(updated);
  };

  const totalImages = existingImages.length + uploadedImages.length;
  const canAddMore = totalImages < maxImages;

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Upload Vehicle Images
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {totalImages}/{maxImages} images ({canAddMore ? 'Can add more' : 'Maximum reached'})
        </p>
      </div>

      {/* Upload Area */}
      {canAddMore && (
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => fileInputRef.current?.click()}
          className="mb-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all text-center"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isLoading || !canAddMore}
            className="hidden"
          />

          <motion.div
            animate={isLoading ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: isLoading ? Infinity : 0, duration: 1.5 }}
          >
            <Upload size={40} className="mx-auto mb-3 text-gray-400 dark:text-gray-500" />
          </motion.div>

          <p className="font-semibold text-gray-900 dark:text-white mb-1">
            {isLoading ? 'Processing...' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            PNG, JPG, GIF up to 5MB
          </p>
        </motion.div>
      )}

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Existing Images
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {existingImages.map((image) => (
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700"
              >
                <div className="aspect-square">
                  <OptimizedImage
                    src={image}
                    alt="Existing vehicle"
                    className="w-full h-full"
                    objectFit="cover"
                  />
                </div>

                {/* Remove Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onRemoveImage && onRemoveImage(image)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </motion.button>

                {/* Badge */}
                <div className="absolute bottom-1 left-1 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Saved
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* New/Temp Images Preview */}
      {uploadedImages.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            New Images ({uploadedImages.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {uploadedImages.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700"
              >
                <div className="aspect-square">
                  <OptimizedImage
                    src={image.preview}
                    alt="New vehicle"
                    className="w-full h-full"
                    objectFit="cover"
                  />
                </div>

                {/* Remove Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </motion.button>

                {/* Badge */}
                <div className="absolute bottom-1 left-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                  New
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalImages === 0 && (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ImageIcon size={40} className="mx-auto mb-3 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400">
            No images uploaded yet
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
