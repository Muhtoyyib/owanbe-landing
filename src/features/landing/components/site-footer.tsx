import {Container} from "./container";
import {BrandLogo} from "./brand-logo";
import {InstagramIcon, LinkedinIcon, XIcon} from "./social-icons";
import {CONTACT_EMAIL} from "../data";

type SocialIcon = (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;

const SOCIAL_LINKS: Array<{label: string; href: string; icon: SocialIcon}> = [
  {label: "X", href: "https://x.com", icon: XIcon},
  {label: "Instagram", href: "https://instagram.com", icon: InstagramIcon},
  {label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon},
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col items-center gap-6 py-8 md:flex-row md:justify-between md:gap-4 md:py-6">
        <BrandLogo tone="light" />

        {/* Mobile stacks the logo above a single email + socials row (per the
            mobile design); desktop spreads all three across the bar. */}
        <div className="flex items-center gap-8 md:contents">
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            {CONTACT_EMAIL}
          </a>

          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-brand"
              >
                <social.icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
