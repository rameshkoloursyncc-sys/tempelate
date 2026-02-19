import { useState } from "react";

const FAQSection = ({ title, faqs, disclaimer }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative max-w-[1000px] mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-white text-center mb-12">{title}</h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5 transition"
            >
              <span className="text-white font-semibold text-lg">{faq.question}</span>
              <span className="text-white text-2xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-5">
                <p className="text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-white/70 text-sm text-center mt-8">{disclaimer}</p>
    </section>
  );
};

export default FAQSection;
