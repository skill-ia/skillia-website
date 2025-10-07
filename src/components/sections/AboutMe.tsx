import { GraduationCap, TvMinimalPlay, UserRoundCheck } from "lucide-react";
import { motion } from "framer-motion";
import { GridPattern } from "@/components/ui/shadcn-io/grid-pattern";
import RubenImg from "@/assets/ruben_zoom.jpg";

interface AboutMeProps {
  isVisible?: boolean;
  hasBeenInView?: boolean;
}

const classes = {
  strong: "text-white",
};

export function AboutMe({
  isVisible = false,
  hasBeenInView: _hasBeenInView = false,
}: AboutMeProps) {
  return (
    <section
      title="About Me"
      rel="About Me"
      className="relative w-full mx-auto min-h-screen scroll-align-center mt-0 mb-24 md:my-60">
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
          <div className="w-full items-center justify-center flex flex-col lg:flex-row px-[clamp(1rem,4vw,10rem)]">
            <div className="w-full lg:w-1/2 flex items-center justify-center z-0 mb-[clamp(1.5rem,3vw,0)] lg:mb-0">
              <motion.img
                src={RubenImg}
                alt="Ruben"
                className="w-[clamp(15rem,25vw,30rem)] h-[clamp(18rem,28vw,30rem)] object-cover rounded-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: 0.3,
                  delay: 0,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              />
            </div>
            <div className="w-full lg:w-1/2 h-full flex flex-col gap-[clamp(1rem,2vw,1.5rem)] justify-start py-[clamp(1rem,2vw,1.25rem)]">
              <motion.h1
                className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}>
                Ruben Lopez Garcia
              </motion.h1>
              <motion.p
                className="text-[clamp(0.875rem,1.5vw,1.125rem)] text-gray-400/90 font-bold"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.2,
                  ease: [0.25, 0.4, 0.25, 1],
                }}>
                Trader Profesional
                <br />
                Asesor Financiero Independiente CNMV
                <br />
                "Family Consultant" por la Universidad BYU Idaho E.E.U.U
              </motion.p>
              <div className="flex flex-col gap-[clamp(0.75rem,1.5vw,1rem)] text-gray-300 text-justify text-[clamp(1rem,1.8vw,1.125rem)]">
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.3,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}>
                  A los <strong className={classes.strong}>23 años</strong> ya gestionaba su primer
                  portfolio personal con acciones de diferentes sectores,
                  superando al final de ese lustro, el{" "}
                  <strong className={classes.strong}>200% de rentabilidad total</strong>.
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}>
                  En la siguiente década, creó diferentes empresas en sectores
                  como: inmobiliario, formación bursátil, modelos informáticos
                  de alto rendimiento y crowdtrading, entre otros.
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.5,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}>
                  Ha participado activamente en{" "}
                  <strong className={classes.strong}>decenas de proyectos</strong> de formación con
                  entidades de primer nivel, asociaciones financieras y
                  universidades de habla hispana, impartiendo así, cientos de
                  ponencias y seminarios online a lo largo de su vida.
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.6,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}>
                  Como analista técnico independiente, en los últimos 15 años se
                  ha especializado en la acción del precio{" "}
                  <strong className={classes.strong}>«Price Action»</strong>, ha desarrollado varias
                  estrategias de trading y ha creado varios entrenamientos para
                  traders con la acción del precio que han creado{" "}
                  <strong className={classes.strong}>
                    cientos de nuevos traders profesionales
                  </strong>
                  .
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.7,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}>
                  Participante activo en reconocidos encuentros financieros, ha
                  sido ponente en varias ocasiones para{" "}
                  <strong className={classes.strong}>#Investor Gala</strong>,{" "}
                  <strong className={classes.strong}>#The Forex Day</strong>,{" "}
                  <strong className={classes.strong}>#Trading Mastery Summit</strong>,{" "}
                  <strong className={classes.strong}>
                    #Trading & Crypto Mastery Summit y en la <strong className={classes.strong}></strong>
                    #Crypto week Trading Madrid
                  </strong>
                  .
                </motion.p>
              </div>
            </div>
          </div>
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
                  icon: GraduationCap,
                  title: "+1125 Alumnos Formados",
                  iconClass: "w-15 h-15",
                },
                {
                  icon: TvMinimalPlay,
                  title: "+8000 Estudiantes Formados en Eventos",
                  iconClass: "w-13 h-13",
                },
                {
                  icon: UserRoundCheck,
                  title: "+24 Años como Trader Profesional",
                  iconClass: "w-12 h-12",
                },
              ].map((card, index) => {
                const Icon = card.icon;
                const delay = 0.2 + index * 0.2; // 0.2, 0.4, 0.6 seconds

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
                    <h3 className="text-[clamp(0.625rem,1.5vw,1.125rem)] font-bold text-center">
                      {card.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
    </section>
  );
}
