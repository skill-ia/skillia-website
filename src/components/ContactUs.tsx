import React from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";

const ContactUs = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Holded Style Layout */}

      {!isMobile ? (
        <div className="w-full md:w-2/5 bg-[var(--background-secondary)]/40 text-foreground p-8 md:p-12 flex flex-col items-center justify-center">
          {/* Main Stack Container */}

          <div className="flex flex-col w-full gap-12 flex-1 justify-between pb-30 pt-40 px-8">
            {/* Statistics Stack */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-2 mb-5">
                <h2 className="text-3xl font-bold text-foreground">
                  No hace falta que nos creas.
                </h2>
                <h3 className="text-lg font-bold text-foreground/70">
                    Los datos hablan por si solos.
                </h3>
              </div>

              {/* Stat 1 */}
              <div>
                <p className="text-4xl font-normal text-foreground mb-2">3x</p>
                <div className="w-full h-fit flex flex-row gap-2 items-center">
                <p className="text-sm font-normal text-foreground/70">
                  tu faturación por empleado con herramientas de IA
                </p>
                <div className="h-fit px-2 py-1 bg-foreground/10 rounded-lg flex items-center justify-center hover:bg-foreground/20 transition-all duration-200 group cursor-pointer">
                    <a href="https://www.pwc.com/gx/en/news-room/press-releases/2025/ai-linked-to-a-fourfold-increase-in-productivity-growth.html" target="_blank" className="text-sm text-foreground/70 group-hover:text-foreground hover:!text-foreground transition-all duration-200 no-underline">PwC</a>
                </div>
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <p className="text-4xl font-normal text-foreground mb-2">+66%</p>
                <div className="w-full h-fit flex flex-row gap-2 items-center">
                <p className="text-sm font-normal text-foreground/70">
                  en la productividad de tus empleados
                </p>
                <div className="h-fit px-2 py-1 bg-foreground/10 rounded-lg flex items-center justify-center hover:bg-foreground/20 transition-all duration-200 group cursor-pointer">
                    <a href="https://www.venasolutions.com/blog/ai-statistics" target="_blank" className="text-sm text-foreground/70 group-hover:text-foreground hover:!text-foreground transition-all duration-200 no-underline">Vena</a>
                </div>
                </div>
              </div>

              {/* Stat 3 */}
              <div>
                <p className="text-4xl font-normal text-foreground mb-2">3,7:1</p>
                <div className="w-full h-fit flex flex-row gap-2 items-center">
                <p className="text-sm font-normal text-foreground/70">
                  de ROI en tu inversion en IA
                </p>
                <div className="h-fit px-2 py-1 bg-foreground/10 rounded-lg flex items-center justify-center hover:bg-foreground/20 transition-all duration-200 group cursor-pointer">
                    <a href="https://www.sequencr.ai/insights/key-generative-ai-statistics-and-trends-for-2025" target="_blank" className="text-sm text-foreground/70 group-hover:text-foreground hover:!text-foreground transition-all duration-200 no-underline">Sequencr</a>
                </div>
              </div>
              </div>
            </div>

            {/* Client Logos Stack */}
            <div className="flex flex-col gap-6">
              <p className="text-md font-normal text-foreground/80 mb-5">
                Ya confían en Skillia
              </p>

              {/* Grid with 3 columns (xs-4 means 4 cols in 12-col grid = 33.33% each) */}
              <div className="grid grid-cols-3 gap-4">
                {/* Logo Box 1 */}
                <div className="h-10 flex items-center justify-center">
                  <img src="ics-logo.png" alt="ICS Logo" className="h-full w-auto" />
                </div>

                {/* Logo Box 2 */}
                <div className="h-10 flex items-center justify-center">
                  <img src="pimec-logo.png" alt="Pimec Logo" className="h-full w-auto" />
                </div>

                {/* Logo Box 3
                <div className="h-12 flex items-center justify-center">
                  <div className="w-full h-8 bg-foreground/10 rounded"></div>
                </div>

                {/* Logo Box 4
                <div className="h-12 flex items-center justify-center">
                  <div className="w-full h-8 bg-foreground/10 rounded"></div>
                </div>

                {/* Logo Box 5
                <div className="h-12 flex items-center justify-center">
                  <div className="w-full h-8 bg-foreground/10 rounded"></div>
                </div>

                {/* Logo Box 6
                <div className="h-12 flex items-center justify-center">
                  <div className="w-full h-8 bg-foreground/10 rounded"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Right Panel - Contact Form */}
      <div className="w-full md:w-3/5 text-foreground p-8 md:p-12 flex items-center justify-center">
        <div className="max-w-xl w-full">
          <h1 className="text-3xl font-bold mb-4">
            Crea un equipo de expertos en IA
          </h1>
          <p className="text-lg text-foreground/70 mb-8">
            Déjanos tu información y nos pondremos en contacto contigo lo antes
            posible.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                placeholder="Tu nombre"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--border-focus)]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="tu@email.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--border-focus)]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tu mensaje..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:border-[var(--border-focus)]"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-[var(--skillia-blue)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
