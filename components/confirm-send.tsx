"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface ConfirmSendProps {
  open: boolean;
  title: string;
  bodyLine1: string;
  bodyLine2: string;
  dontShowLabel: string;
  cancelLabel: string;
  continueLabel: string;
  dontShow: boolean;
  onToggleDontShow: (value: boolean) => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmSend({
  open,
  title,
  bodyLine1,
  bodyLine2,
  dontShowLabel,
  cancelLabel,
  continueLabel,
  dontShow,
  onToggleDontShow,
  onCancel,
  onConfirm,
}: ConfirmSendProps) {
  if (!open) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        'bg-black/40'
      )}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-xl border bg-card text-card-foreground shadow-xl">
        <div className="p-5">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>{bodyLine1}</p>
            <p>{bodyLine2}</p>
          </div>

          <label className="mt-4 flex items-center gap-2 text-sm">
            <Checkbox
              checked={dontShow}
              onCheckedChange={(v) => onToggleDontShow(Boolean(v))}
            />
            <span>{dontShowLabel}</span>
          </label>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>{cancelLabel}</Button>
            <Button onClick={onConfirm}>{continueLabel}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

