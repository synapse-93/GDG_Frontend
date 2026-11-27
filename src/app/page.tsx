import { CommunityLinks } from "@/components/home/CommunityLinks";
import { FeaturedEvents } from "@/components/home/FeaturedEvents";
import { HeroSection } from "@/components/home/HeroSection";
import { HomeSnapController } from "@/components/home/HomeSnapController";
import { LatestRecap } from "@/components/home/LatestRecap";
import { PillarsGrid } from "@/components/home/PillarsGrid";

export default function HomePage() {
  return (
    <>
      <HomeSnapController />
      <HeroSection />
      <PillarsGrid />
      <FeaturedEvents />
      <LatestRecap />
      <CommunityLinks />
    </>
  );
}
