import { useEffect, useState } from "react";
import divider from "../../assets/light-glow.svg";
import { motion } from "framer-motion";
const UrgencySection = ({ title, description, disclaimer, targetDate, cta }) => {
  const [time, setTime] = useState(calcTime());

  function calcTime() {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };

    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const Box = ({ value, label }) => (
    <div className="flex flex-col items-center min-w-[50px] sm:min-w-[60px] md:min-w-[70px]">
      <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white">{value}</div>
      <div className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white">{label}</div>
    </div>
  );

  const Separator = () => (
    <img src={divider} alt="" className="opacity-90 select-none w-4 sm:w-6 md:w-8" />
  );

  return (
    <section
     
      className="bg-no-repeat bg-[position:100%_0] bg-fixed bg-[url('/images/bg-backdrop-2.svg')] mx-2 sm:mx-4 my-6 sm:my-8 md:my-10">

      <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-6 md:px-[20px] py-10 sm:py-12 md:py-16 text-center antialiased">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 px-4">{title}</h2>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-lg text-white/80 leading-relaxed whitespace-pre-line w-full sm:w-[70%] md:w-[55%] lg:w-[45%] mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
          {description}
        </p>

        {/* Countdown Grid */}
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-6 sm:mb-7 md:mb-8 flex-wrap">

          <Box value={time.d} label="Days" />
          <Separator />

          <Box value={time.h} label="Hours" />
          <Separator />

          <Box value={time.m} label="Min" />
          <Separator />

          <Box value={time.s} label="Sec" />

        </div>

        {/* CTA Button */}
        <div className="text-start px-2 sm:px-4 md:px-0">
          <motion.a
            style={{
              background: 'var(--gradient-primary)',
              color: 'var(--color-text)'
            }}
            href={cta.link}
            className="inline-block bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#ef4444] text-white py-4 sm:py-5 md:py-6 w-full rounded-md font-bold text-base sm:text-lg shadow-xl mb-4 relative overflow-hidden group"

          >
            <span className="relative z-10 ml-4 sm:ml-6 md:ml-10">{cta.text}</span>
            <span className="relative z-10 line-through ml-2">{cta.text1}</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ef4444] via-[#ec4899] to-[#7c3aed]"
              initial={{ x: "100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="absolute right-4 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl md:text-4xl">↗</span>
          </motion.a>

        </div>
        <p className="text-white/70 text-xs sm:text-sm mt-2 mb-6 sm:mb-8 md:mb-10 px-4">{disclaimer}</p>
      </div>
    </section>
  );
};

export default UrgencySection;
