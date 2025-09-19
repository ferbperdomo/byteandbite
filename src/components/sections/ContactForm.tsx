"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Special handling for phone number
    if (name === "phone") {
      // Only allow numbers, +, spaces, hyphens, and parentheses
      const phoneValue = value.replace(/[^\d\+\s\-\(\)]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: phoneValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    // Validate name (required, at least 2 characters)
    if (!formData.name || formData.name.trim().length < 2) {
      setSubmitStatus("error");
      return false;
    }

    // Validate email (required, valid format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setSubmitStatus("error");
      return false;
    }

    // Validate phone if provided (must start with + and contain only numbers, spaces, hyphens, parentheses)
    if (formData.phone && formData.phone.trim() !== "") {
      const phoneRegex = /^\+[1-9]\d{1,14}$/;
      if (!phoneRegex.test(formData.phone.replace(/[\s\-\(\)]/g, ""))) {
        setSubmitStatus("error");
        return false;
      }
    }

    // Validate message (required, at least 10 characters)
    if (!formData.message || formData.message.trim().length < 10) {
      setSubmitStatus("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Validate form before submitting
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-12 px-4">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #b65c25 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, #d97316 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, #b65c25 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("formTitle")}
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {t("formSubtitle")}
          </p>
        </motion.div>

        <motion.div
          className="bg-black/80 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {t("name")} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#b65c25] focus:ring-2 focus:ring-[#b65c25]/20 focus:outline-none transition-all duration-300"
                  placeholder={t("namePlaceholder")}
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {t("email")} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#b65c25] focus:ring-2 focus:ring-[#b65c25]/20 focus:outline-none transition-all duration-300"
                  placeholder={t("emailPlaceholder")}
                />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-2"
                >
                  {t("phone")}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#b65c25] focus:ring-2 focus:ring-[#b65c25]/20 focus:outline-none transition-all duration-300"
                  placeholder="+1234567890"
                  pattern="^\+[1-9]\d{1,14}$"
                  title="Phone number must start with + and contain only numbers"
                />
              </motion.div>

              {/* Service Field */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="service"
                  className="block text-sm font-medium mb-2"
                >
                  {t("service")}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-[#b65c25] focus:ring-2 focus:ring-[#b65c25]/20 focus:outline-none transition-all duration-300"
                >
                  <option value="">{t("selectService")}</option>
                  <option value="photography">{t("photography")}</option>
                  <option value="videography">{t("videography")}</option>
                  <option value="web-development">{t("webDevelopment")}</option>
                  <option value="consultation">{t("consultation")}</option>
                  <option value="other">{t("other")}</option>
                </select>
              </motion.div>
            </div>

            {/* Message Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {t("message")} *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#b65c25] focus:ring-2 focus:ring-[#b65c25]/20 focus:outline-none transition-all duration-300 resize-none"
                placeholder={t("messagePlaceholder")}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#b65c25] to-[#d97316] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#b65c25]/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? t("sending") : t("sendMessage")}
              </button>
            </motion.div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-4 bg-[#b65c25]/20 border border-[#b65c25]/30 rounded-lg"
              >
                <p className="text-[#b65c25]">{t("successMessage")}</p>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-4 bg-red-900/20 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400">{t("errorMessage")}</p>
              </motion.div>
            )}
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-black/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">{t("contactInfo")}</h3>
            <div className="space-y-2 text-gray-300">
              <p>📧 admin@byteandbitemedia.com</p>
              <p>🌐 www.byteandbitemedia.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
