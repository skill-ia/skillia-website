import { Percent, Wallet, Trophy } from "lucide-react";
import { Card, Carousel } from "@/components/ui/shadcn-io/apple-cards-carousel";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/shadcn-io/grid-pattern";
import { getVideoUrl } from "@/config/videos.config";

//import Marquee1 from "@/assets/results-screenshots/1.png";
//import Marquee2 from "@/assets/results-screenshots/2.jpg";
//import Marquee3 from "@/assets/results-screenshots/3.png";
//import Marquee4 from "@/assets/results-screenshots/4.png";
//import Marquee5 from "@/assets/results-screenshots/5.png";
//import Marquee6 from "@/assets/results-screenshots/6.png";
//import Marquee7 from "@/assets/results-screenshots/7.png";
//import Marquee8 from "@/assets/results-screenshots/8.png";
//import Marquee9 from "@/assets/results-screenshots/9.png";
//import Marquee10 from "@/assets/results-screenshots/10.png";
//import Marquee11 from "@/assets/results-screenshots/11.png";
//import Marquee13 from "@/assets/results-screenshots/13.png";
//import Marquee14 from "@/assets/results-screenshots/14.png";
//import Marquee15 from "@/assets/results-screenshots/15.png";
//import Marquee16 from "@/assets/results-screenshots/16.png";
//import Marquee17 from "@/assets/results-screenshots/17.png";
//import Marquee18 from "@/assets/results-screenshots/18.png";
//import Marquee19 from "@/assets/results-screenshots/19.png";
//import Marquee20 from "@/assets/results-screenshots/20.png";
//import Marquee21 from "@/assets/results-screenshots/21.png";

//import ChristianImg from "@/assets/testimonials/Christian.png";
//import LeonardoImg from "@/assets/testimonials/Leonardo.png";
//import MillerImg from "@/assets/testimonials/Miller.png";
//import SantiagoImg from "@/assets/testimonials/Santiago.png";
//import EthsonImg from "@/assets/testimonials/Ethson.png";
import {
  ScrollableMarquee,
  ScrollableMarqueeFade,
  ScrollableMarqueeItem,
} from "@/components/ui/shadcn-io/scrollable-marquee";
import { ImageZoom } from "@/components/ui/shadcn-io/image-zoom";

{/* const items = [
  {
    id: 1,
    src: ChristianImg || "",
    title: "Christian",
    content: "Operaciones Superiores al 11% Diario",
    video: getVideoUrl('TESTIMONIAL_CHRISTIAN'),
  },
  {
    id: 2,
    src: LeonardoImg || "",
    title: "Leonardo",
    content: "Operaciones de Hasta 7x",
    video: getVideoUrl('TESTIMONIAL_LEONARDO'),
  },
  {
    id: 3,
    src: MillerImg || "",
    title: "Miller",
    content: "Triplicó su Cuenta en 3 Meses",
    video: getVideoUrl('TESTIMONIAL_MILLER'),
  },
  {
    id: 4,
    src: SantiagoImg || "",
    title: "Santiago",
    content: "Rentabilidad del 50% en 3 Meses",
    video: getVideoUrl('TESTIMONIAL_SANTIAGO'),
  },
  {
    id: 5,
    src: EthsonImg || "",
    title: "Ethson",
    content: "Dejó su Oficio en la Banca para Vivir del Trading",
    video: getVideoUrl('TESTIMONIAL_ETHSON'),
  },
];

const itemsMarquee = [
  {
    id: 1,
    src: Marquee1 || "",
  },
  {
    id: 2,
    src: Marquee2 || "",
  },
  {
    id: 3,
    src: Marquee3 || "",
  },
  {
    id: 4,
    src: Marquee4 || "",
  },
  {
    id: 5,
    src: Marquee5 || "",
  },
  {
    id: 6,
    src: Marquee6 || "",
  },
  {
    id: 7,
    src: Marquee7 || "",
  },
  {
    id: 8,
    src: Marquee8 || "",
  },
  {
    id: 9,
    src: Marquee9 || "",
  },
  {
    id: 10,
    src: Marquee10 || "",
  },
  {
    id: 11,
    src: Marquee11 || "",
  },
  {
    id: 13,
    src: Marquee13 || "",
  },
  {
    id: 14,
    src: Marquee14 || "",
  },
  {
    id: 15,
    src: Marquee15 || "",
  },
  {
    id: 16,
    src: Marquee16 || "",
  },
  {
    id: 17,
    src: Marquee17 || "",
  },
  {
    id: 18,
    src: Marquee18 || "",
  },
  {
    id: 19,
    src: Marquee19 || "",
  },
  {
    id: 20,
    src: Marquee20 || "",
  },
  {
    id: 21,
    src: Marquee21 || "",
  },
];
*/}
interface CaseStudiesSectionProps {
  isVisible?: boolean;
  hasBeenInView?: boolean;
}

export function CaseStudiesSection({
  isVisible = false,
  hasBeenInView: _hasBeenInView = false,
}: CaseStudiesSectionProps) {
  return (
    <section
      title="Case Studies"
      rel="Case Studies"
      className="relative w-full mx-auto min-h-screen scroll-align-center my-32 md:my-0 md:mb-32">
        <motion.div
          className="flex flex-col w-full items-center justify-center pb-20"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}>
          <motion.h1
            className="text-[clamp(1.75rem,5vw,4rem)] font-bold max-sm:text-center lg:text-center text-white mx-auto"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.3,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}>
            Algunos de Los Resultados que Hemos Conseguido a Traders Como Tú
          </motion.h1>
          <div className="w-full items-center justify-center flex mt-[clamp(2rem,5vw,5rem)] mb-[clamp(1rem,3vw,2.5rem)] px-6 md:px-4">
            <div className="max-w-5xl w-full py-3 md:py-5 px-4 md:px-4 bg-black/80 supports-[backdrop-filter]:bg-transparent supports-[backdrop-filter]:backdrop-blur-sm supports-[backdrop-filter]:backdrop-brightness-70 rounded-3xl border-1 border-[var(--button-color)]/50 flex flex-row flex-nowrap md:flex-wrap justify-center gap-2 sm:gap-4 md:gap-8">
              <GridPattern
                width={20}
                height={20}
                x={-1}
                y={-1}
                strokeDasharray="0"
                className="rounded-3xl opacity-50"
              />
              {[
                {
                  icon: Percent,
                  title: "Alta Rentabilidad",
                  iconClass: "w-15 h-15",
                },
                {
                  icon: Wallet,
                  title: "Multiplicación de Carteras",
                  iconClass: "w-13 h-13",
                },
                {
                  icon: Trophy,
                  title: "Nuevos Traders Profesionales",
                  iconClass: "w-12 h-12",
                },
              ].map((card, index) => {
                const Icon = card.icon;
                const delay = 0.2 + index * 0.2; // 0.5, 1.0, 1.5 seconds

                return (
                  <motion.div
                    key={index}
                    className="flex-1 min-w-0 md:min-w-48 max-w-100 flex flex-col items-center py-1 md:py-2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      isVisible
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.8 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: delay,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}>
                    <div className="h-10 md:h-16 flex items-center justify-center mb-2 md:mb-4">
                      <Icon className="w-8 h-8 md:w-12 md:h-12 lg:w-15 lg:h-15" />
                    </div>
                    <h3 className="text-[clamp(0.75rem,1.5vw,1.125rem)] font-bold text-center">
                      {card.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div>
            <Carousel
              isVisible={isVisible}
              items={items.map((item, index) => (
                <Card
                  key={item.id}
                  card={{
                    src: item.src,
                    title: item.title,
                    content: item.content,
                    video: item.video || "",
                  }}
                  index={index}
                />
              ))}
            />
          </div>
        </motion.div>
      <div className="flex w-full h-40 md:h-64 items-center justify-center bg-transparent py-8">
        <ScrollableMarquee className="w-full" speed={40} pauseOnHover={true}>
          <ScrollableMarqueeFade side="left" />
          <ScrollableMarqueeFade side="right" />
          {itemsMarquee.map((item, index) => (
            <ScrollableMarqueeItem className="w-40 md:w-48" key={index}>
              <ImageZoom
                backdropClassName="image-zoom-backdrop">
                <img
                  alt={`Result screenshot ${item.id}`}
                  className="w-full h-full object-cover rounded-lg"
                  src={item.src}
                />
              </ImageZoom>
            </ScrollableMarqueeItem>
          ))}
        </ScrollableMarquee>
      </div>
    </section>
  );
}
