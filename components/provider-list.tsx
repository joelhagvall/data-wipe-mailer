import { providers } from '@/data/providers';
import { ProviderCard } from '@/components/provider-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCheck } from 'lucide-react';
import type { translations } from '@/lib/i18n';

interface ProviderListProps {
  selectedProviderIds: Record<string, boolean>;
  allProvidersSelected: boolean;
  onToggle: (providerId: string, checked: boolean) => void;
  onSelectAll: () => void;
  t: typeof translations.sv;
}

export function ProviderList({
  selectedProviderIds,
  allProvidersSelected,
  onToggle,
  onSelectAll,
  t,
}: ProviderListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{t.selectRecipients}</CardTitle>
            <CardDescription>
              {t.selectRecipientsDesc}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onSelectAll}
            className="flex-shrink-0"
          >
            <CheckCheck className="mr-2 h-4 w-4" />
            {allProvidersSelected ? t.deselectAll : t.selectAll}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-y-auto space-y-3 pr-2 provider-scroll">
        {providers.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            description={t.providerDescriptions[provider.id as keyof typeof t.providerDescriptions]}
            selected={!!selectedProviderIds[provider.id]}
            onToggle={onToggle}
          />
        ))}
      </CardContent>
    </Card>
  );
}
