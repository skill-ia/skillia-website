
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

interface ProductSectionProps {
  isVisible?: boolean;
  hasBeenInView?: boolean;
}

const classes = {
  strong: "text-primary font-semibold",
};

const parseFeatureText = (text: string) => {
  const regex =
    /\b(extenso|detallado|todas las claves|exitosamente|directa|personalizada|Análisis profundo|Acelerador de desarrollo|Comunidad Premium|Seguimiento continuo|traders profesionales|señales de trading|Mentoría|tiempo real|conexiones profesionales|compañeros|profesional|reales|exitosos|exclusivo|personalizadas|feedback|alianzas|conecta|respuestas directas)\b/gi;

  const parts = text.split(regex);
  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span key={index} className={classes.strong}>
          {part}
        </span>
      );
    }
    return part;
  });
};


export function ProductSection({
  isVisible = false,
  hasBeenInView: _hasBeenInView = false,
}: ProductSectionProps) {
  const [showCommunityRewards, setShowCommunityRewards] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showCommunityRewards) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCommunityRewards]);

  return (
    <>
      <section
        title="Product"
        rel="Product"
        className="relative w-screen mx-auto min-h-screen scroll-align-center mb-16 md:mb-12 lg:mb-0">
        <motion.div
          className="flex flex-col w-screen items-center justify-center pb-12 md:pb-20"
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
            className="text-[clamp(2rem,5vw,3rem)] font-bold text-center mx-auto"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.3,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}>
            Nuestros Recursos Formativos
          </motion.h1>
          <motion.div>
            <motion.h2
              className="text-[clamp(1rem,2vw,1.25rem)] text-center text-gray-400 z-50 mx-auto py-[clamp(1.5rem,3vw,2.5rem)]"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.3,
                delay: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
              }}>
              Escoge el recurso formativo que más se adapte a tus necesidades
            </motion.h2>
          </motion.div>
          <motion.div className="flex lg:flex-row flex-col items-start justify-center container mx-auto gap-12 lg:gap-12 px-4 lg:px-8">
            <motion.div
              className="flex flex-col h-full w-full lg:w-[580px] items-stretch
                         bg-[var(--card-bg)]
                         border border-border rounded-3xl p-6 lg:p-8
                         shadow-[0_8px_20px_0_rgba(0,0,0,0.1)] hover:shadow-[0_12px_30px_0_rgba(0,0,0,0.15)]
                         transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                ease: [0.25, 0.4, 0.25, 1],
              }}>
              {/* Header - Fixed height to match premium card */}
              <div className="w-full text-center min-h-[120px] flex flex-col justify-center">
                <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-bold mb-4 text-white">
                  Comunidades de Trading
                </h2>
                <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed">
                  Conecta con traders y aprende en comunidad
                </p>
              </div>

              {/* Features */}
              <motion.div
                className="flex flex-col w-full justify-start gap-3 text-gray-200 flex-grow"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                      delayChildren: 0.4,
                    },
                  },
                }}>
                {/* Section Headers and Features - each item animated individually */}
                <motion.h3
                  className="text-[clamp(1rem,1.8vw,1.125rem)] font-semibold text-success mb-1 mt-2"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}>
                  Comunidad Abierta
                </motion.h3>
                
                {[
                  "Accede a señales de trading compartidas por Ruben",
                  "Operaciones reales y resultados de miembros de las formaciones",
                  "Observa estrategias profesionales en tiempo real",
                  "Acceso a contenido exclusivo y análisis de mercado",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-row items-start gap-3 min-h-[28px]"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}>
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-1.5" />
                    <span className="text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed">
                      {parseFeatureText(feature)}
                    </span>
                  </motion.div>
                ))}

                <motion.h3
                  className="text-[clamp(1rem,1.8vw,1.125rem)] font-semibold text-success mt-3"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}>
                  Comunidad Privada
                </motion.h3>
                
                <motion.p
                  className="text-[clamp(0.875rem,1.5vw,1rem)] font-medium text-primary mb-1"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}>
                  Todo lo anterior y...
                </motion.p>
                
                {[
                  "Comunicación directa con Ruben y otros traders profesionales",
                  "Haz preguntas y recibe respuestas directas",
                  "Comparte tus operaciones y recibe feedback profesional",
                  "Conecta con otros traders y forma alianzas",
                ].map((feature, index) => (
                  <motion.div
                    key={index + 4}
                    className="flex flex-row items-start gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}>
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-1.5" />
                    <span className="text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed">
                      {parseFeatureText(feature)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                className="w-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ delay: 0.8, duration: 0.4 }}>
                <div className="text-center">
                  <button
                    onClick={() => setShowCommunityRewards(true)}
                    className="text-success hover:text-success/80 underline text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed transition-colors duration-200 cursor-pointer my-5">
                    Recompensas por antigüedad*
                  </button>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 cursor-pointer">
                  <Button
                    variant="open-community-card-button"
                    className="group"
                    onClick={() => {
                      window.open("https://t.me/rubenlopeztrading", "_blank");
                    }}>
                    Comunidad Abierta
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="private-community-card-button"
                    className="group"
                    onClick={() => {
                      window.open(
                        "https://t.me/gestion_usuarios_rlt_bot",
                        "_blank"
                      );
                    }}>
                    Comunidad Privada
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative flex flex-col h-full w-full lg:w-[580px] items-stretch
                         bg-[var(--card-bg)]
                         border border-[var(--button-color)] rounded-3xl p-6 lg:p-8
                         shadow-[0_8px_20px_0_rgba(1,129,201,0.1)] hover:shadow-[0_12px_30px_0_rgba(1,129,201,0.15)]
                         transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.3,
                delay: 0.3,
                ease: [0.25, 0.4, 0.25, 1],
              }}>
              {/* Premium Badge - positioned absolutely to not affect layout */}
              <div className="absolute -top-3 lg:-top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="px-4 py-1.5 lg:px-6 lg:py-2 bg-[var(--button-color)] rounded-full text-foreground font-bold text-xs lg:text-sm">
                  RECURSO PREMIUM
                </div>
              </div>

              {/* Header - Same height as basic card */}
              <div className="w-full text-center mb-2 min-h-[120px] flex flex-col justify-center">
                <h2 className="text-[clamp(1.5rem,3vw,1.875rem)] font-bold mb-4 text-white">
                  Entrenamientos Profesionales
                </h2>
                <p className="text-gray-300 text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed">
                  Formaciones profesionales a distintos niveles
                </p>
              </div>

              {/* Features */}
              <motion.div
                className="flex flex-col w-full justify-start gap-3 text-gray-200 flex-grow mb-6 lg:mb-0"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.06,
                      delayChildren: 0.5,
                    },
                  },
                }}>
                {[
                  "Contenido extenso y detallado con todas las claves para operar exitosamente",
                  "Mentoría directa y personalizada con Ruben",
                  "Análisis profundo de tu situación y recomendación de la mejor opción",
                  "Acelerador de desarrollo en trading con estrategias avanzadas",
                  "Acceso a Comunidad Premium exclusiva para miembros de la academia",
                  "Seguimiento continuo de tu progreso con ajustes personalizados",
                  "Networking exclusivo con traders profesionales de la formación",
                  "Soporte prioritario y acceso directo a recursos avanzados",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex flex-row items-start gap-3"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.3 }}>
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-1.5" />
                    <span className="text-[clamp(0.875rem,1.5vw,1rem)] leading-relaxed">
                      {parseFeatureText(feature)}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                className="w-full"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ delay: 0.9, duration: 0.4 }}>
                <div className="cursor-pointer">
                  <Button
                    variant="courses-card-button"
                    className="group"
                    onClick={() => {
                      window.open(
                        "https://cal.com/rubenlopez/entrevista-de-30-min-yt",
                        "_blank"
                      );
                    }}>
                    Analizar mi Situación
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Community Rewards Overlay */}
      <AnimatePresence>
        {showCommunityRewards && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden overscroll-none touch-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-background/90 supports-[backdrop-filter]:bg-background/70 supports-[backdrop-filter]:backdrop-blur-sm"
              onClick={() => setShowCommunityRewards(false)}
              style={{ touchAction: 'none' }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-[60] bg-background rounded-2xl max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[80vh] overflow-y-auto
                         scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-800
                         hover:scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#242424 transparent',
                touchAction: 'auto'
              }}>
              
              {/* Header */}
              <div className="sticky bg-background top-0 px-4 sm:px-8 py-6 flex items-center justify-between">
                <h2 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-primary">Recompensas por Antigüedad</h2>
                <button
                  onClick={() => setShowCommunityRewards(false)}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2.5 cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Content */}
              <div className="px-4 sm:px-8 py-6 text-gray-300 leading-relaxed space-y-6">
                <p>
                  Las <strong className="text-primary">recompensas por antigüedad</strong> son beneficios exclusivos que se otorgan a los miembros de larga duración de nuestras comunidades privadas. Este sistema reconoce la lealtad y el compromiso continuo de nuestros miembros más dedicados.
                </p>
                
                <p>
                  La antigüedad se calcula automáticamente desde el momento de tu primer pago de membresía privada y se mantiene activa mientras mantengas tu suscripción. Si cancelas y vuelves a unirte más tarde, tu antigüedad previa se conserva y continúa acumulándose desde donde lo dejaste.
                </p>
                <div className="space-y-4">
                  <h3 className="text-[clamp(1.125rem,2vw,1.25rem)] font-semibold text-primary">Cuáles son las recompensas?</h3>
                  <ul className="space-y-3 list-disc list-inside ml-4">
                    <li>
                      <strong className="text-success">3 meses de membresía:</strong> Acceso a recursos educativos adicionales y archivos históricos de la comunidad
                    </li>
                    <li>
                      <strong className="text-success">6 meses de membresía:</strong> Descuentos en cursos premium y acceso prioritario a nuevos contenidos
                    </li>
                    <li>
                      <strong className="text-success">12 meses de membresía:</strong> Sesiones de mentoría grupales exclusivas y acceso a estrategias avanzadas
                    </li>
                    <li>
                      <strong className="text-success">18+ meses de membresía:</strong> Reconocimiento como miembro veterano, acceso a beta testing de nuevas herramientas y descuentos significativos en todos los productos
                    </li>
                  </ul>
                </div>


                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-[clamp(1rem,1.8vw,1.125rem)] font-semibold text-primary mb-2">Nota Importante:</h4>
                  <p className="text-gray-300">
                    Las recompensas por antigüedad <strong className="text-primary">solo se aplican a las comunidades privadas de pago</strong>. Los miembros de la comunidad gratuita no acumulan antigüedad para este programa de recompensas, pero siempre pueden unirse a la comunidad privada para comenzar a acumular beneficios.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
