import { cn } from '../utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: { width: '16px', height: '16px' },
    md: { width: '24px', height: '24px' },
    lg: { width: '32px', height: '32px' },
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className="spinner"
        style={sizeStyles[size]}
      />
    </div>
  );
}