import { getPriorityColor, getPriorityLabel } from '../utils/format';
import { cn } from '../utils/cn';

interface PriorityBadgeProps {
  priority: number;
  className?: string;
}

export default function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        getPriorityColor(priority),
        className
      )}
    >
      {getPriorityLabel(priority)}
    </span>
  );
}
