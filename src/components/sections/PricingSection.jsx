const PricingSection = ({ offerTitle, discount, originalPrice, discountedPrice, cta }) => {
  return (
    <section className="relative max-w-[600px] mx-auto px-4 py-20">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">{offerTitle}</h2>

        <div className="mb-8">
          <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-xl mb-4">
            Your {discount} Discount has been applied
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="text-white/50 line-through text-3xl">{originalPrice}</span>
          <span className="text-5xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            {discountedPrice}
          </span>
        </div>

        <a
          href={cta.link}
          className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-12 py-4 rounded-full font-bold text-xl hover:scale-105 transition shadow-xl w-full"
        >
          {cta.text}
        </a>
      </div>
    </section>
  );
};

export default PricingSection;
