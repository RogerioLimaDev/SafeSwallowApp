import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Frown, Sparkles } from 'lucide-react';
import { NotificationType } from '../../types';

interface NotificationProps {
  notification: NotificationType | null;
}

export const Notification: React.FC<NotificationProps> = ({ notification }) => {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="absolute inset-0 z-[100] pointer-events-none flex items-center justify-center px-10"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-baruta text-base sm:text-2xl text-center uppercase leading-tight whitespace-pre-line"
          >
            {notification.message}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
