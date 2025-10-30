import { getPriorityLabel } from '../utils/format';
import { cn } from '../utils/cn';

interface PriorityBadgeProps {
  priority: number;
  className?: string;
}

const getPriorityClass = (priority: number): string => {
  switch (priority) {
    case 1:
      return 'priority-low';
    case 2:
      return 'priority-medium';
    case 3:
      return 'priority-high';
    case 4:
      return 'priority-urgent';
    default:
      return 'priority-medium';
  }
};

export default function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'priority-badge',
        getPriorityClass(priority),
        className
      )}
    >
      {getPriorityLabel(priority)}
    </span>
  );
}