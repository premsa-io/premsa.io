import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2, Link2 } from "lucide-react";
import { useMatches } from "@/hooks/useMatches";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AMBITS = [
  'education',
  'labor',
  'health',
  'environment',
  'finance',
  'technology',
  'energy',
  'transport',
];

const MatchesPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedAmbit, setSelectedAmbit] = useState<string | null>(null);

  const relevanceLevel = activeTab === 'all' ? null : activeTab;
  
  const { matches, isLoading } = useMatches({ 
    relevanceLevel: relevanceLevel as 'high' | 'medium' | 'low' | null,
    ambit: selectedAmbit,
  });

  const handleAmbitChange = (value: string) => {
    setSelectedAmbit(value === 'all' ? null : value);
  };

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">
        {t("matches.title")}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t("matches.description")}
      </p>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">{t("matches.all")}</TabsTrigger>
            <TabsTrigger value="high">{t("matches.high")}</TabsTrigger>
            <TabsTrigger value="medium">{t("matches.medium")}</TabsTrigger>
            <TabsTrigger value="low">{t("matches.low")}</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={selectedAmbit || 'all'} onValueChange={handleAmbitChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder={t("matches.filterByAmbit")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("matches.allAmbits")}</SelectItem>
            {AMBITS.map((ambit) => (
              <SelectItem key={ambit} value={ambit}>
                {t(`ambits.${ambit}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : matches.length === 0 ? (
          <div className="rounded-xl bg-card p-8 text-center border border-border">
            <Link2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">{t("matches.noMatches")}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("matches.showing", { count: matches.length })}
            </p>
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
