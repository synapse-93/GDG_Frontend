import { CommunityLinks } from "@/components/home/CommunityLinks";
import { FeaturedEvents } from "@/components/home/FeaturedEvents";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestRecap } from "@/components/home/LatestRecap";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedEvents />
      <LatestRecap />
      <CommunityLinks />
    </>
  );
}
