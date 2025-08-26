import React, { useEffect } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-true-black rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-orange-500/30 dark:shadow-orange-500/20 dark:shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all duration-300 hover:scale-110"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 dark:text-orange-400 dark:drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]">
          Get In Touch
        </h2>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg dark:shadow-orange-500/30 dark:shadow-sm">
              <Mail className="w-5 h-5 text-orange-500 dark:drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Email
              </p>
              <a
                href="mailto:contact@feizelzemaduna.com"
                className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-light"
              >
                feizel.maduna@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg dark:shadow-orange-500/30 dark:shadow-sm">
              <Phone className="w-5 h-5 text-orange-500 dark:drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Phone
              </p>
              <a
                href="tel:+1234567890"
                className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 font-light"
              >
                Shoot me an email for my digits
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg dark:shadow-orange-500/30 dark:shadow-sm">
              <MapPin className="w-5 h-5 text-orange-500 dark:drop-shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Location
              </p>
              <p className="text-gray-900 dark:text-white font-light">
                Johannesburg & Cape Town
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-orange-500/30 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
            Connect with me
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/Feizel"
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 dark:hover:shadow-orange-500/30 dark:hover:shadow-md dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/feizel-ze-maduna/"
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 dark:hover:shadow-orange-500/30 dark:hover:shadow-md dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 dark:hover:shadow-orange-500/30 dark:hover:shadow-md dark:hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
