import React, { useEffect, useRef } from "react";
import {
  CloseIcon,
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  AwardIcon,
} from "./icons";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      panelRef.current?.focus();
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const socialClass =
    "p-3 bg-gray-100 dark:bg-gray-900 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Get in touch"
        className="relative bg-white dark:bg-true-black rounded-2xl p-8 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-800 outline-none animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-orange-400 transition-colors duration-300"
        >
          <CloseIcon size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Get in touch
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-light mb-8 select-text">
          Email is the way in. I read everything, and I answer most things.
        </p>

        <div className="mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <MailIcon className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Email
              </p>
              <a
                href="mailto:feizel.maduna@gmail.com"
                className="text-gray-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 font-light select-text"
              >
                feizel.maduna@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
            Elsewhere
          </p>
          <div className="flex space-x-3">
            <a
              href="https://github.com/Feizel"
              className={socialClass}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/feizel-ze-maduna/"
              className={socialClass}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
            <a
              href="https://www.credly.com/users/feizel/"
              className={socialClass}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Credly certifications"
            >
              <AwardIcon size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
