import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="bg-gray-200 rounded-2xl overflow-hidden"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="h-48 bg-gray-300" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="h-10 bg-gray-300 rounded" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
