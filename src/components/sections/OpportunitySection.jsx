
const OpportunitySection = ({ title, opportunities, }) => {
  return (
    <section className="relative max-w-[1200px] mx-auto px-4 py-20">
      <h2 className="text-5xl font-bold text-white text-center mb-16 w-[55%] m-auto leading-snug">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {opportunities.map((opportunity, index) => (
          <div
            key={index}
            className="rounded-3xl p-8 text-center items-center transition"
          >
            <img
              src={opportunity.src || '/src/assets/bx_bx-briefcase-alt-2.svg'}
              alt="waves"
                onError={(e) => e.target.src = '/src/assets/bx_bx-briefcase-alt-2.svg'}
              className="mx-auto block mb-4 w-10 h-10"
            />
            <h3
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text'
              }}
              className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-4">
              {opportunity.stat}
            </h3>
            <p className="text-white/80 leading-relaxed">{opportunity.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OpportunitySection;
