import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

interface RiskWarningSectionProps {
  isVisible?: boolean;
  hasBeenInView?: boolean;
}

export function RiskWarningSection({
  isVisible = false,
  hasBeenInView: _hasBeenInView = false,
}: RiskWarningSectionProps) {
  const [showRiskWarning, setShowRiskWarning] = useState(false);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showRiskWarning) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showRiskWarning]);

  return (
    <>
      <section
        title="Risk Warning"
        rel="Risk Warning"
        className="relative w-screen mx-auto min-h-screen scroll-align-center">
        <motion.div
          className="flex flex-col w-screen items-center justify-center min-h-screen px-4 lg:px-8 py-12 md:py-20"
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
          
          <motion.div
            className="text-center mb-[clamp(2rem,4vw,3rem)]"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}>
            <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-primary mb-[clamp(1rem,2vw,1.5rem)]">
              ¿Listo para comenzar?
            </h1>
            <p className="text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground max-w-2xl mx-auto">
              Agenda un análisis gratuito y descubre cómo podemos ayudarte a alcanzar tus objetivos en trading
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 items-center"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              ease: [0.25, 0.4, 0.25, 1],
            }}>
            
            <Button 
              variant="risk-warning-button"
              onClick={() => {
                window.open("https://cal.com/rubenlopez/entrevista-de-30-min-yt", "_blank");
              }}>
              Agendar un Análisis Gratuito
            </Button>

            <button
              onClick={() => setShowRiskWarning(true)}
              className="text-muted-foreground hover:text-primary underline text-[clamp(1rem,1.8vw,1.125rem)] transition-colors duration-200 cursor-pointer">
              Aviso de Riesgo
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Risk Warning Overlay */}
      <AnimatePresence>
        {showRiskWarning && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden overscroll-none touch-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-background/90 supports-[backdrop-filter]:bg-background/70 supports-[backdrop-filter]:backdrop-blur-sm"
              onClick={() => setShowRiskWarning(false)}
              style={{ touchAction: 'none' }}
            />

            {/* Modal Content */}
            <motion.div
              className="relative z-[60] bg-foreground rounded-2xl max-w-[95vw] sm:max-w-2xl lg:max-w-4xl max-h-[80vh] overflow-y-auto
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
              <div className="sticky top-0 px-4 sm:px-8 py-6 flex items-center justify-between">
                <h2 className="text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold text-background">Aviso de Riesgo</h2>
                <button
                  onClick={() => setShowRiskWarning(false)}
                  className="text-background hover:text-white transition-colors duration-200 p-2.5 cursor-pointer">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Content */}
              <div className="px-4 sm:px-8 py-6 text-gray-300 leading-relaxed space-y-6">
                <p>
                  Rubenlopeztrading, es la marca comercial, vinculada a un portal web de información y formación sobre los mercados financieros que pretende transmitir enseñanzas en dicha materia. Por lo tanto, no tiene la obligación de estar inscrita en la CNMV, a pesar de que su autor cuenta con la certificación de este regulador. Se recuerda que las acciones, así como el mercado de Futuros y Divisas, son productos financieros que pueden ser difíciles de entender por el inversor y que conllevan un alto nivel de riesgo asociado, por lo que pueden no ser apropiados para inversores principiantes o minoristas, debido a su complejidad y riesgo. Más añn, cuando se trata de productos apalancados cuyas pérdidas pueden exceder el depósito inicial. La operativa en activos financieros de este tipo, requiere conocimientos específicos y una amplia experiencia. Existe por tanto, la posibilidad de que usted pierda parte o la totalidad de su inversión en esta clase de productos. Por lo que le instamos encarecidamente, a que sea prudente y busque el asesoramiento profesional pertinente con la entidad o persona debidamente regulada para este fin.
                </p>
                
                <p>
                  Rubenlopeztrading, ni cualquier persona o empresa relacionada con proyectos afines, aceptar ninguna responsabilidad por cualquier pérdida o daño en el trading como resultado de la confianza en la información suministrada en nuestra web, o cualquier medio de difusión, incluyendo nuestras publicaciones, webinarios, cotizaciones, gráficos, videos, grabaciones, manuales, cursos, talleres, entrenamientos, tutorías, operaciones, etc. Así mismo, tampoco sus asociados, colaboradores y trabajadores, pueden asumir responsabilidad alguna por cualquier pérdida, directa o indirecta, que pudiera resultar del uso de este material, la información ofrecida en nuestra web o cualquiera de nuestros servicios. Los usuarios deben estar plenamente informados sobre los riesgos latentes que conllevan sus propias actos, la gestión monetaria utilizada, así como el apalancamiento elegido, además de los gastos asociados con el trading en los mercados financieros que ellos elijan. El contenido de este material, su web y los servicios que se ofrecen no pretenden ser, no son y no pueden considerarse en ningún caso, asesoramiento en materia de inversión ni de ningún otro tipo de asesoramiento financiero, ni pueden servir de base para ningún contrato, compromiso o decisión de ningún tipo.
                </p>
                
                <p>
                  Además, declaramos que al utilizar los servicios gratuitos y de pago contenidos en nuestro portal, usted está de acuerdo con la utilización de la información, que ha sido preparada con fines estrictamente educativos y no como asesoramiento bursátil de ningún tipo. Serán por tanto, una muestra de investigaciones iniciales, para que usted pueda finalmente sacar sus propias conclusiones que le permitirán ejecutar sus propias decisiones personales de inversión, totalmente ajenas a Rubenlopeztrading. Los avisos de este portal, serán válidos permanentemente a no ser que se indique lo contrario con previa notificación expresa.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}