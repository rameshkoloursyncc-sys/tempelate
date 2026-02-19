const DescriptionSection = ({ title, description , image }) => {
  return (
    <section className="relative max-w-[1000px] mx-auto px-4 py-16 text-center">
          {image && (
        <div className="max-w-[900px] mx-auto">
          <img 
            src={image} 
            alt="Webflow showcase" 
            className="w-full rounded-2xl"
          />
        </div>
      )}
      <h2 className="text-5xl font-bold  mb-6 bg-gradient-to-r from-[#ff7373] to-[#491eb8] bg-clip-text text-transparent">{title}</h2>
      <p className="text-xl text-white/80 leading-relaxed">{description}</p>
    </section>
  );
};

export default DescriptionSection;
