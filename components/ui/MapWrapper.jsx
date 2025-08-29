"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import RealMap with no SSR to prevent hydration issues
const RealMap = dynamic(() => import('./RealMap'), {
  ssr: false,
  loading: () => (
    <div className="relative bg-gray-100 rounded-xl h-96 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    </div>
  )
});

export default function MapWrapper(props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={`relative bg-gray-100 rounded-xl ${props.height || 'h-96'} overflow-hidden ${props.className || ''}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Initializing map...</p>
          </div>
        </div>
      </div>
    );
  }

  return <RealMap {...props} />;
}
