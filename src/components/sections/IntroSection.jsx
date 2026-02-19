const IntroSection = ({ emoji, title, description, cta, image }) => {
  return (
    <section className="relative max-w-[1200px] mx-auto px-4 py-20 text-center text-white">
      {image && (
        <div className="max-w-[900px] mx-auto">
          <img 
            src={image} 
            alt="Webflow showcase" 
            className="w-full rounded-2xl"
          />
        </div>
      )}

      <h2 className="text-4xl mt-12 md:text-5xl font-bold mb-6">
        {emoji} {title} {emoji}
      </h2>
      <a
        href={cta.link}
        className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition shadow-xl mb-12"
      >
        {cta.text}
      </a>

    </section>
  );
};

export default IntroSection;
