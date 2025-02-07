import { cn } from '@/lib/utils';
import React from 'react';

type LoaderPropsType = {
  height?: string;
  width?: string;
};

const Loader: React.FC<LoaderPropsType> = ({ height = '8', width = '8' }:LoaderPropsType) => {
  return (
    <div
      className={cn(
        `h-8 w-8 rounded-full border-2 border-t-2 border-t-white border-l-transparent border-b-transparent border-r-transparent animate-spin`,
        height ? `h-${height}` : '',
        width ? `w-${width}` : ''
      )}
    ></div>
  );
};

export default Loader;
