import { Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface LanguageSelectorProps {
  variant?: "ghost" | "outline";
  showLabel?: boolean;
}

export const LanguageSelector = ({ variant = "ghost", showLabel = false }: LanguageSelectorProps) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();

  const currentLang = availableLanguages.find((l) => l.code === currentLanguage) || availableLanguages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="font-medium">{currentLang.short}</span>
          {showLabel && <span className="hidden sm:inline">{currentLang.label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={currentLanguage === lang.code ? "bg-accent" : ""}
          >
            <span className="mr-2 font-mono text-xs text-muted-foreground">{lang.short}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
