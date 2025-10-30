import { getStatusLabel } from '../utils/format';
import { cn } from '../utils/cn';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'draft':
      return 'status-draft';
    case 'pending':
      return 'status-pending';
    case 'approved':
      return 'status-approved';
    case 'rejected':
      return 'status-rejected';
    case 'cancelled':
      return 'status-cancelled';
    case 'expired':
      return 'status-expired';
    default:
      return 'status-draft';
  }
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'status-badge',
        getStatusClass(status),
        className
      )}
    >
      {getStatusLabel(status)}
    </span>
  );
}