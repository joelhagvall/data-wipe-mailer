"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-2">
              <p>{bodyLine1}</p>
              <p>{bodyLine2}</p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <label className="mt-2 flex items-center gap-2 text-sm">
          <Checkbox checked={dontShow} onCheckedChange={(v) => onToggleDontShow(Boolean(v))} />
          <span>{dontShowLabel}</span>
        </label>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onCancel}>{cancelLabel}</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button autoFocus onClick={onConfirm}>{continueLabel}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
