import Image from "next/image"
import { Button } from "@/components/ui/button";
import ANNOUNCEMENT from "@/assets/images/announcement.png";

const MarketingToolHero = () => {
  return (
    <section className="relative">
      <Image
        src={ANNOUNCEMENT}
        width={427}
        className="absolute right-0 hidden md:hidden lg:block"
        alt=""
      />
      <div className="py-[52px] md:px-12 md:max-w-4xl max-w-full px-4">
        <h1 className="font-extrabold text-4xl lg:text-5xl mb-6 font-clash">
          Discover <span className="textGradient">marketing tools</span> that{" "}
          <br />
          supercharge your growth
        </h1>
        <p className="mb-6">
          Browse through hundreds of unique tools to boost your marketing &
          startup. Start by clicking Categories below to pick tools in
          different marketing topics.
        </p>
        <div className="flex gap-2 md:gap-6">
          <Button className="font-bold h-12">View Latest Tools</Button>
          <Button variant="outline" className="h-12">
            Trending tools
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MarketingToolHero;