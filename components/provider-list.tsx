import { useMemo, useState } from 'react';
import { providers } from '@/data/providers';
import { ProviderCard } from '@/components/provider-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCheck, Search } from 'lucide-react';
import type { translations } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProviderListProps {
  selectedProviderIds: Record<string, boolean>;
  allProvidersSelected: boolean;
  onToggle: (providerId: string, checked: boolean) => void;
  onSelectAll: () => void;
  selectedCount: number;
  t: typeof translations.sv;
}

export function ProviderList({
  selectedProviderIds,
  allProvidersSelected,
  onToggle,
  onSelectAll,
  selectedCount,
  t,
}: ProviderListProps) {
  const [query, setQuery] = useState('');
  const list = useMemo(() => {
    if (!query) return providers;
    const q = query.toLowerCase();
    return providers.filter((p) => p.name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q));
  }, [query]);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>{t.selectRecipients}</CardTitle>
              <Badge>{selectedCount}</Badge>
            </div>
            <CardDescription>
              {t.selectRecipientsDesc}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="shrink-0"
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            {allProvidersSelected ? t.deselectAll : t.selectAll}
          </Button>
        </div>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-2">
          <div className="space-y-3">
            {list.map((provider) => (
              <ProviderCard
                key={provider.id}
                provider={provider}
                description={t.providerDescriptions[provider.id]}
                selected={!!selectedProviderIds[provider.id]}
                onToggle={onToggle}
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
