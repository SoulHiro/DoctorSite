import { Globe, Mail, MapPin } from "lucide-react";

import { PageContainer } from "@/components/site/page-container";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <PageContainer className="pt-6">
      <div className="flex h-9 items-center justify-between rounded-full bg-secondary-active px-4 text-xs text-white">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5" aria-hidden="true" />
          Ibirubá, RS
        </span>

        <div className="flex items-center gap-1">
          <a
            href="mailto:doutorespalhacos@gmail.com"
            className="mr-3 inline-flex items-center gap-1.5 transition-colors hover:text-primary-subtle focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/50 rounded-sm"
          >
            <Mail className="size-3.5" aria-hidden="true" />
            doutorespalhacos@gmail.com
          </a>
          <Button
            variant="ghost"
            size="xs"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            Login
          </Button>
          <Button
            variant="ghost"
            size="xs"
            className="text-white hover:bg-white/10 hover:text-white"
          >
            <Globe className="size-3.5" aria-hidden="true" />
            PT
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
