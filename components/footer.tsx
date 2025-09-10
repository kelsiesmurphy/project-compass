import { Button } from "@/components/ui/button";
import InstagramIcon from "./icons/instagram";
import BlueskyIcon from "./icons/bluesky";
import Link from "next/link";
import { Mail } from "lucide-react";
import { brand } from "@/lib/constants/brand";

export default function Footer() {
  return (
    <section className="px-4 w-full">
      <div className="py-4 text-sm text-muted-foreground flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2 items-center">
          <p>
            © {new Date().getFullYear()} {brand.website}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link
              href={`mailto:${brand.email}`}
              aria-label={`Email us at ${brand.email}`}
            >
              <Mail />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link
              href={brand.instagram}
              target="_blank"
              aria-label={`Follow ${brand.name} on Instagram`}
            >
              <InstagramIcon />
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild>
            <Link
              href={brand.bluesky}
              target="_blank"
              aria-label={`Follow ${brand.name} on Bluesky`}
            >
              <BlueskyIcon />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
