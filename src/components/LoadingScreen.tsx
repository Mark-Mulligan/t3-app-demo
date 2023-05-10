// React
import type { FC } from 'react';

interface IProps {
  loadingText: string;
}

const LoadingScreen: FC<IProps> = ({ loadingText }) => {
  return (
    <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div>
        <p className="text-center">{loadingText}</p>
        <progress className="progress progress-info h-1.5 w-56" />
      </div>
    </div>
  );
};

export default LoadingScreen;