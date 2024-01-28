import Footer from "@/components/footer";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Book, PenTool, Users2, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutPage = () => {
  const features = [
    {
      label: "Inspire Ideas",
      icon: Zap,
    },
    {
      label: "Express Yourself",
      icon: PenTool,
    },
    {
      label: "Community Hub",
      icon: Users2,
    },
    {
      label: "Discover Stories",
      icon: Book,
    },
  ];
  return (
    <MaxWidthWrapper>
      <div className="flex md:items-center flex-col md:flex-row gap-8 bg-background p-5 rounded-xl">
        <div className="relative w-full min-w-[300px] max-w-[450px] aspect-[6/5]">
          <Image
            src="/images/about-image.jpg"
            alt="About image"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-5">
          <h3 className="text-xl font-semibold">
            Unveiling QuillQuest&apos;s Creative Journey
          </h3>
          <p className="text-sm text-muted-foreground">
            Welcome to QuillQuest, a realm where language transforms into
            vibrant narratives. Dive into our creative haven, where stories
            unfurl, and ideas take flight. Embark on an odyssey of imagination,
            discovering the artistry in every sentence. Here, the written word
            becomes an adventure, inviting you to explore the boundless
            landscapes of creativity. Join us in weaving a tapestry of tales,
            where every expression is a brushstroke on the canvas of literary
            exploration.
          </p>
          <div className="grid xs:grid-cols-2 gap-y-4">
            {features.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 text-muted-foreground"
              >
                <item.icon className="h-5 w-5" />
                <p className="font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-2" />
          <Link href="/" className={cn(buttonVariants(), "mt-3 rounded-full")}>
            Explore more
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default AboutPage;
