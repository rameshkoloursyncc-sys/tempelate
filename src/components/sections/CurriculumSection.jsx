import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const CurriculumSection = ({ title, modules, cta, disclaimer, certificateImage }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative max-w-[1000px] m-auto px-4 py-20">
      <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-20">{title}</h2>

      <div className="relative">
        {/* Center Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent">
          {/* Animated Gradient Line */}
          <motion.div
            style={{
              background: 'var(--gradient-primary)',
              color: 'var(--color-text)',
              height: lineHeight
            }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#7c3aed] via-[#ec4899] to-[#ef4444]"
          />
        </div>

        {/* Modules */}
        <div className="space-y-32">
          {modules.map((module, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isLeft ? "" : "md:flex-row-reverse"
                  }`}
              >
                {/* Image Side */}
                <div className={`${isLeft ? "md:pr-16" : "md:pl-16 md:order-2"}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={module.image || '/src/assets/wbflow-1-p-800.webp'}
                      alt={module.title}
                      className="w-[400px] h-auto"
                    />
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className={`${isLeft ? "md:pl-16" : "md:pr-16 md:order-1"}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {module.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-6 whitespace-pre-line">
                    {module.description}
                  </p>
                  <motion.a
                    style={{
                      background: 'var(--gradient-primary)',
                      color: 'var(--color-text)',
                    }}
                    href={module.cta.link}
                    className="inline-block bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#ef4444] text-white px-8 py-3 rounded-full font-semibold shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {module.cta.text} <span className="ml-2">↗</span>
                  </motion.a>
                </div>

                {/* Center Dot */}
                <div
                 style={{
                      background: 'var(--gradient-primary)',
                      color: 'var(--color-text)',
                    }}
                 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-[#ec4899] to-[#ef4444] rounded-full border-4 border-[#0f172a] z-10" />
              </motion.div>
            );
          })}

          {/* Certificate Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center pt-16"
          >
            {/* Certificate with proper border frame */}
            <div className="relative max-w-[500px] w-full">
              {/* Animated gradient border - positioned OUTSIDE */}
              <motion.div
                className="absolute -inset-[3px] rounded-[32px]"
                style={{
                  background: 'var(--gradient-primary)',
                  clipPath: useTransform(
                    scrollYProgress,
                    [0.7, 0.75, 0.8, 0.85, 0.9],
                    [
                      "polygon(50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%)",
                      "polygon(50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 0% 0%, 0% 0%, 50% 0%)",
                      "polygon(50% 0%, 100% 0%, 100% 50%, 100% 50%, 100% 50%, 0% 50%, 0% 0%, 50% 0%)",
                      "polygon(50% 0%, 100% 0%, 100% 100%, 100% 100%, 50% 100%, 0% 100%, 0% 0%, 50% 0%)",
                      "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%, 0% 100%, 0% 0%, 50% 0%)"
                    ]
                  ),
                }}
              />

              {/* Dark background padding */}
              <div className="relative bg-[#0f172a] rounded-[24px] p-4">
                <img
                  src={certificateImage || '/src/assets/certificates.png'}
                  alt="Certificate"
                  className="w-full h-auto rounded-[20px]"
                />
              </div>
            </div>

            {/* Center Dot for Certificate */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-[#ec4899] to-[#ef4444] rounded-full border-4 border-[#0f172a] z-20" />
          </motion.div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-20">
        <motion.a
          style={{
            background: 'var(--gradient-primary)',
            color: 'var(--color-text)',
            height: lineHeight
          }}
          href={cta.link}
          className="inline-block bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#ef4444] text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl mb-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cta.text} <span className="ml-2">↗</span>
        </motion.a>
        <p className="text-white/70 text-sm mt-4">{disclaimer}</p>
      </div>
    </section>
  );
};

export default CurriculumSection;
