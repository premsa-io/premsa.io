import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link2, Search } from "lucide-react";
import { useMatches } from "@/hooks/useMatches";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EmptyState } from "@/components/ui/EmptyState";
import { MatchCardSkeleton } from "@/components/dashboard/MatchCardSkeleton";

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
  const [searchQuery, setSearchQuery] = useState('');

  const relevanceLevel = activeTab === 'all' ? null : activeTab;
  
  const { matches, isLoading } = useMatches({ 
    relevanceLevel: relevanceLevel as 'high' | 'medium' | 'low' | null,
    ambit: selectedAmbit,
  });

  const handleAmbitChange = (value: string) => {
    setSelectedAmbit(value === 'all' ? null : value);
  };

  // Filter by search query
  const filteredMatches = matches.filter((match) => {
    if (searchQuery === '') return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      (match.topic?.title && match.topic.title.toLowerCase().includes(searchLower)) ||
      (match.normalized_item?.neutral_summary_original && match.normalized_item.neutral_summary_original.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-heading font-semibold text-foreground">
        {t("matches.title")}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t("matches.description")}
      </p>

      {/* Filters */}
      <div className="mt-6 space-y-4">
        {/* Row 1: Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">{t("matches.all")}</TabsTrigger>
            <TabsTrigger value="high">{t("matches.high")}</TabsTrigger>
            <TabsTrigger value="medium">{t("matches.medium")}</TabsTrigger>
            <TabsTrigger value="low">{t("matches.low")}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Row 2: Search + Ambit filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={t("matches.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
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
      </div>

      {/* Results */}
      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <MatchCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredMatches.length === 0 ? (
          <EmptyState
            icon={Link2}
            title={t("matches.noMatches")}
            description={searchQuery ? t("matches.noSearchResults") : undefined}
          />
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t("matches.showing", { count: filteredMatches.length })}
            </p>
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchesPage;
