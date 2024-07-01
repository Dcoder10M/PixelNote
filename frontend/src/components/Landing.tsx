import { EngageSection } from "./helper/EngageSection";
import { Welcome } from "./helper/Welcome";
import { ExploreSection } from "./helper/ExploreSection";
import { AuroraBackground } from "./ui/aurora-background";

export const Landing = () => {
  return (
    <>
      <Welcome />
      <AuroraBackground>
        <div className="mt-32 w-full">
        <ExploreSection />
        </div>
      </AuroraBackground>
      <EngageSection />
    </>
  );
};
