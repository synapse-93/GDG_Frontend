import { CampusMarquee } from "@/components/home/CampusMarquee";
import { CommunityLinks } from "@/components/home/CommunityLinks";
import { FeaturedEvents } from "@/components/home/FeaturedEvents";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestRecap } from "@/components/home/LatestRecap";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      {/* Desktop full-width marquee sits right below HeroSection; mobile renders it right below Screen 1 */}
      <CampusMarquee className="hidden border-t-0 lg:block" />
      <FeaturedEvents />
      <LatestRecap />
      <CommunityLinks />
    </>
  );
}
