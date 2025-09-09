import DesktopNavigation from "./desktop-navigation";
import Logo from "./logo";
import MobileNavigation from "./mobile-navigation";
import SkipToContent from "./skip-to-content";

export function Header() {
  return (
    <header className="z-10 bg-background flex fixed w-full h-16 items-center justify-between px-4 border-b">
      <SkipToContent />
      <Logo />
      <DesktopNavigation />
      <MobileNavigation />
    </header>
  );
}
