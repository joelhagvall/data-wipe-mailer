'use client';

import type { Provider } from '@/types/provider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { LogoHelper } from '@/lib/logo';
import Image from 'next/image';

interface ProviderCardProps {
  provider: Provider;
  description: string;
  selected: boolean;
  onToggle: (providerId: string, checked: boolean) => void;
}

export function ProviderCard({ provider, description, selected, onToggle }: ProviderCardProps) {
  const logoUrl = LogoHelper.getFaviconUrl(provider.email);

  return (
    <Card
      className={`transition-all hover:shadow-md cursor-pointer ${
        selected ? 'bg-green-50 dark:bg-green-950 border-green-500' : ''
      }`}
      onClick={() => onToggle(provider.id, !selected)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <div className="shrink-0 mt-1">
            <Image
              src={logoUrl}
              alt={`${provider.name} logo`}
              width={32}
              height={32}
              className="rounded"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{provider.name}</CardTitle>
            <CardDescription className="mt-1.5">
              {description}
            </CardDescription>
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox
              id={provider.id}
              checked={selected}
              onCheckedChange={(checked) => onToggle(provider.id, checked as boolean)}
              className="mt-1 shrink-0"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Label htmlFor={provider.id} className="text-sm text-muted-foreground cursor-pointer">
          {provider.email}
        </Label>
      </CardContent>
    </Card>
  );
}
