import React, { useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";

const ContactUs = () => {
  const isMobile = useIsMobile();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  // Submission state
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [resultMessage, setResultMessage] = useState("");

  // Error state for validation
  const [errors, setErrors] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  // Validation functions
  const validateName = (value: string): string => {
    if (!value.trim()) {
      return "Este campo es obligatorio";
    }
    return "";
  };

  const validateCompany = (value: string): string => {
    if (!value.trim()) {
      return "Este campo es obligatorio";
    }
    return "";
  };

  const validateEmail = (value: string): string => {
    if (!value.trim()) {
      return "Este campo es obligatorio";
    }
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      return "Por favor, introduce un email válido (ej: tu@email.com)";
    }
    return "";
  };

  const validateMessage = (value: string): string => {
    if (!value.trim()) {
      return "Este campo es obligatorio";
    }
    return "";
  };

  // Validate all fields
  const validateAllFields = (): boolean => {
    const newErrors = {
      name: validateName(formData.name),
      company: validateCompany(formData.company),
      email: validateEmail(formData.email),
      message: validateMessage(formData.message),
    };

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if it becomes valid
    if (errors[name as keyof typeof errors]) {
      let error = "";
      switch (name) {
        case "name":
          error = validateName(value);
          break;
        case "company":
          error = validateCompany(value);
          break;
        case "email":
          error = validateEmail(value);
          break;
        case "message":
          error = validateMessage(value);
          break;
      }
      setErrors({ ...errors, [name]: error });
    }
  };

  // Handle field blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "company":
        error = validateCompany(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "message":
        error = validateMessage(value);
        break;
    }

    setErrors({ ...errors, [name]: error });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields before submission
    if (!validateAllFields()) {
      return;
    }

    setStatus("submitting");
    setResultMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setResultMessage("¡Gracias! Tu mensaje ha sido enviado correctamente.");
        // Clear form
        setFormData({
          name: "",
          company: "",
          email: "",
          message: "",
        });
        // Clear errors
        setErrors({
          name: "",
          company: "",
          email: "",
          message: "",
        });
      } else {
        setStatus("error");
        setResultMessage("Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setStatus("error");
      setResultMessage("Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen flex pt-14 md:pt-0">
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

          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre <span className="text-foreground">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tu nombre"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-border"
                } bg-background text-foreground focus:border-[var(--border-focus)]`}
              />
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">
                Empresa <span className="text-foreground">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nombre de tu empresa"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.company ? "border-red-500" : "border-border"
                } bg-background text-foreground focus:border-[var(--border-focus)]`}
              />
              {errors.company && (
                <p className="text-sm text-red-600 mt-1">{errors.company}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email <span className="text-foreground">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="tu@email.com"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-border"
                } bg-background text-foreground focus:border-[var(--border-focus)]`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2">
                Mensaje <span className="text-foreground">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={6}
                placeholder="Tu mensaje..."
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.message ? "border-red-500" : "border-border"
                } bg-background text-foreground focus:border-[var(--border-focus)]`}
              />
              {errors.message && (
                <p className="text-sm text-red-600 mt-1">{errors.message}</p>
              )}
            </div>

            {/* Success/Error Message */}
            {resultMessage && (
              <div
                className={`p-4 rounded-lg ${
                  status === "success"
                    ? "bg-green-500/10 text-green-600 border border-green-500/20"
                    : "bg-red-500/10 text-red-600 border border-red-500/20"
                }`}
              >
                {resultMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="px-8 py-3 bg-[var(--skillia-blue)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
              {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
