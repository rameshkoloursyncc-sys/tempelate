import { motion } from "framer-motion";

const InstructorSection = ({ title, instructor }) => {
  return (
    <section className="relative max-w-[1200px] mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-white text-center mb-16">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-full max-w-[400px] h-auto object-cover rounded-3xl"
            />
          </div>
        </motion.div>

        {/* Right Column - Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#ec4899] to-[#ef4444] bg-clip-text text-transparent mb-2">
              {instructor.name}
            </h3>
            <p className="text-[#ec4899] font-semibold text-lg">{instructor.title}</p>
          </div>

          <div className="space-y-4 text-white/80 leading-relaxed">
            {instructor.bio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InstructorSection;
