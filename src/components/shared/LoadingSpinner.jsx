import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizes[size]} bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center`}
      >
        <Heart className="w-1/2 h-1/2 text-white" />
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;