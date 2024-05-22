import Image from "next/image"
import { Button } from "@/components/ui/button";
import ANNOUNCEMENT from "@/assets/images/announcement.png";

const MarketingToolHero = () => {
  return (
    <section className="relative">
      <Image
        src={ANNOUNCEMENT}
        width={430}
        className="absolute right-0 hidden md:hidden lg:block"
        alt=""
      />
      <div className="py-[52px] md:px-12 px-4">
        <div>
          <p className="font-extrabold text-4xl lg:text-[40px] font-clash">Discover <span className="textGradient">marketing tools</span> that{" "}</p>
          <p className="font-extrabold text-4xl lg:text-[40px] mb-6 font-clash">supercharge your growth</p>
        </div>
        <div>
          <p className="font-satoshi text-description font-medium text-base dark:text-white">Browse through hundreds of unique tools to boost your marketing & startup. Start by</p>
          <p className="mb-6 font-satoshi text-description font-medium text-base dark:text-white">clicking Categories below to pick tools in different marketing topics.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-6">
          <Button className="font-bold font-clash text-base p-6">View Latest Tools</Button>
          <Button variant="outline" className="font-medium font-clash text-base p-6">
            Trending tools
          </Button>
        </div>
      </div>
    </section>
  )
}

export default MarketingToolHero;