"use client";

import { useState, useEffect } from 'react';

interface ImageViewerProps {
  isOpen: boolean;
  imageUrl: string;
  alt: string;
  onClose: () => void;
}

export function ImageViewer({ isOpen, imageUrl, alt, onClose }: ImageViewerProps) {
  const [animationClass, setAnimationClass] = useState('opacity-0 scale-95');
  
  useEffect(() => {
    if (isOpen) {
      // Small timeout to ensure the animation works correctly
      setTimeout(() => {
        setAnimationClass('opacity-100 scale-100');
      }, 10);
    } else {
      setAnimationClass('opacity-0 scale-95');
    }
  }, [isOpen]);

  // Close on escape key press
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div className={`transition-all duration-300 ease-in-out ${animationClass} max-w-[90vw] max-h-[90vh]`}>
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={alt} 
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
} 