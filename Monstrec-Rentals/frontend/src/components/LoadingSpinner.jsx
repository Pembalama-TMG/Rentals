import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <motion.div
      className="flex justify-center items-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  );
}
