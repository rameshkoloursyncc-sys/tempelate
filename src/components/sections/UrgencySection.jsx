import { useEffect, useState } from "react";
import divider from "../../assets/light-glow.svg";
import { motion } from "framer-motion";
const UrgencySection = ({ title, description, disclaimer, targetDate , cta }) => {
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
    <div className="flex flex-col items-center min-w-[70px]">
      <div className="text-8xl font-bold text-white">{value}</div>
      <div className="text-2xl text-white">{label}</div>
    </div>
  );

 const Separator = () => (
  <img src={divider} alt="" className="opacity-90 select-none" />
);

  return (
    <section className="bg-[#0d0826] bg-no-repeat bg-[position:100%_0] bg-fixed bg-[url('/images/bg-backdrop-2.svg')] m-10">

      <div className="w-full max-w-[1100px] mx-auto px-[20px] py-16 text-center antialiased">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-white mb-4">{title}</h2>

        {/* Description */}
        <p className="text-lg text-white/80 leading-relaxed whitespace-pre-line w-full md:w-[45%] mx-auto mb-10">
          {description}
        </p>

        {/* Countdown Grid */}
        <div className="flex justify-center items-center gap-4 md:gap-6 mb-8">

          <Box value={time.d} label="Days" />
          <Separator />

          <Box value={time.h} label="Hours" />
          <Separator />

          <Box value={time.m} label="Min" />
          <Separator />

          <Box value={time.s} label="Sec" />

        </div>

        {/* CTA Button */}
        <div className="text-start">
        <motion.a
          href={cta.link}
          className="inline-block bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#ef4444] text-white py-6 w-full rounded-md font-bold text-lg shadow-xl mb-4  ml-10 mt-20 relative overflow-hidden group"
      
        >
          <span className="relative z-10 ml-10">{cta.text}</span>
          <span className="relative z-10 line-through">{cta.text1}</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#ef4444] via-[#ec4899] to-[#7c3aed]"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl mr-10">↗</span>
        </motion.a>
       
      </div>
 <p className="text-white/70 text-sm mt-2 mb-10">{disclaimer}</p>
      </div>
    </section>
  );
};

export default UrgencySection;
