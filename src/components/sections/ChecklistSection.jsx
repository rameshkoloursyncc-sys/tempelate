import { motion } from "framer-motion";
import { useState } from "react";
import CheckIcon from "../../assets/check_1.svg";

const ChecklistSection = ({ title, subtitle, checklistItems, cta }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="relative max-w-[1200px] mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left Column - Title and CTA */}
        <div className="space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              {subtitle}
            </p>
          </div>

          <motion.a
          style={{ 
  background: 'var(--gradient-primary)',
  color: 'var(--color-text)'
}}
            href={cta.link}
            className="inline-block bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#ef4444] text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{cta.text}</span>
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">↗</span>
          </motion.a>
        </div>

        {/* Right Column - Checklist Items */}
        <div className="space-y-4">
          {checklistItems.map((item, index) => (
            <motion.div
                  style={{
                        background: 'var(--color-primary)',
                    }}
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => toggleCheck(index)}
              className="relative bg-[#1a1f3a] border border-[#2d3250] rounded-2xl p-6 flex items-start gap-4 cursor-pointer transition-all hover:bg-[#1f2442]"
            >
              {/* Custom Checkbox */}
              <div
              
               className="relative w-[48px] h-[48px] flex items-center justify-center flex-shrink-0">
                {/* Static background circle - always visible */}
                <div
                      style={{
                        background: 'var(--color-accent)',
                    }}
                 className="absolute inset-0 rounded-xl bg-[#2a2f4a] flex items-center justify-center">
                  {/* Checkmark icon with animation */}
                  <motion.img
                   
                    src={CheckIcon}
                    alt="check"
                    className="w-6 h-6"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: checkedItems[index] ? 1 : 0,
                      opacity: checkedItems[index] ? 1 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                </div>
              </div>

              {/* Text */}
              <p className="text-white text-base leading-relaxed flex-1">{item}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChecklistSection;
