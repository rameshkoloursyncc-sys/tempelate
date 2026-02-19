import { useEffect, useState } from "react";

const StickyEnrollButton = ({ text, link }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;

      // Hide when user reaches bottom
      if (scrollPosition >= pageHeight - 50) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <a
        href={link}
        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition"
      >
        {text}
      </a>
    </div>
  );
};

export default StickyEnrollButton;
