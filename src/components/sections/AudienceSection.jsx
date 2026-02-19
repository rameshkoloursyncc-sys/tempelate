import { motion } from "framer-motion";

const AudienceSection = ({ title, audiences, cta, disclaimer }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative max-w-[1200px] mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-white text-center mb-16">{title}</h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-[1050px] mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {audiences.map((audience, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="relative bg-linear-to-r from-[#d9dfff1a] to-[#f0f2ff1a] border border-white/5 rounded-2xl p-4 flex items-center gap-4 transition-colors"
          >
            {/* Checkmark Icon */}
            <div className="relative w-[65px] h-[65px] flex items-center justify-center flex-shrink-0">
              {/* Outer ring */}
              <div 
                  
              className="absolute inset-0 rounded-full border-2 border-[#b699ff80]"></div>

              {/* Inner gradient circle with checkmark */}
              <div
                    style={{
                        background: 'var(--gradient-primary)',
                    }}
               className="relative flex-none w-[45px] h-[45px] rounded-full bg-gradient-to-b from-[#4316db] to-[#9076e7] shadow-[0_10px_20px_#b699ff4d] flex items-center justify-center">
                {/* Checkmark SVG */}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Text */}
            <p className="text-white font-semibold text-lg">{audience}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <motion.a
          style={{
                        background: 'var(--gradient-primary)',
                    }}
          href={cta.link}
          className="inline-block bg-gradient-to-r from-[#7c3aed] via-[#ec4899] to-[#ef4444] text-white py-4 w-[90%] rounded-md font-bold text-lg shadow-xl mb-4 relative overflow-hidden group"
      
        >
          <span className="relative z-10">{cta.text}</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#ef4444] via-[#ec4899] to-[#7c3aed]"
            initial={{ x: "100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl">↗</span>
        </motion.a>
        <p className="text-white/70 text-sm mt-4">{disclaimer}</p>
      </div>
    </section>
  );
};

export default AudienceSection;
