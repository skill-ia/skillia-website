"use client";

import { motion } from "framer-motion";
import { ArrowLeft Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShimmeringText } from "@/components/ui/shadcn-io/shimmering-text/index";

/**
 * UnderImprovement Component
 *
 * Displays a temporary page when users try to access login/signup
 * Shows message about AI improvements to the Professional Advisor
 */
export const UnderImprovementSection = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 py-8">
      <div className="max-w-6xl w-full flex flex-col items-center justify-center text-center space-y-8">
        <Loader2 className="lg:w-10 lg:h-10 w-8 h-8 animate-spin text-[var(--skillia-blue)]" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="text-4xl text-center font-bold"
        >
            Disponible muy pronto...
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
        >
          <ShimmeringText
          className="text-xl"
          text="Estamos mejorando nuestro Orientador Profesional con Inteligencia Artificial"
          duration={0.7}
          wave={false}
          color="var(--foreground)"
            shimmeringColor="var(--skillia-blue)"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.4 }}
        >
          <Button variant="default" onClick={handleGoBack}>
          <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
