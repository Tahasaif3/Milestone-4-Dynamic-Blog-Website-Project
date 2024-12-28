import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface NeonButtonProps {
  href: string;
  children: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({ href, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center"
    >
      <Link
        href={href}
        className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-in-out transform rounded-full shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:shadow-2xl hover:scale-105 group"
      >
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 opacity-50 rounded-full blur-md"></span>
        <span className="absolute inset-0 w-full h-full border border-transparent rounded-full group-hover:border-white/10"></span>
        <span className="relative text-lg">{children}</span>
      </Link>
    </motion.div>
  );
};

export default NeonButton;
