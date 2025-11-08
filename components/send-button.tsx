import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface SendButtonProps {
  onClick: () => void;
  disabled: boolean;
  selectedCount: number;
  label: string;
}

export function SendButton({ onClick, disabled, selectedCount, label }: SendButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size="lg"
      className="w-full mt-6"
    >
      <Send className="mr-2 h-5 w-5" />
      {label} ({selectedCount})
    </Button>
  );
}
