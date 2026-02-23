import { Helmet } from "react-helmet";
const BonusSection = ({ title, bonuses, subtitle }) => {
  return (
    <>
    <section className="relative max-w-[1100px] mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white text-center mb-3 sm:mb-4">{title}</h2>
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-8 sm:mb-10 md:mb-12 px-4">{subtitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {bonuses.map((bonus, index) => (
          <div
            key={index}
            className="backdrop-blur-xl bg-[radial-gradient(circle_at_100%_100%,#ffffff03,#ffffff2b)] w-full h-44 sm:h-48 md:h-52 rounded-2xl p-1 transition hover:scale-105"
          >
            <div className="border border-dotted border-gray-600 h-full w-full p-3 sm:p-4 rounded-2xl 
                flex flex-col items-center justify-center text-center">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 text-center px-2">{bonus.title}</h3>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text'
                  }}
                  className="text-2xl sm:text-3xl md:text-3xl font-bold bg-gradient-to-r text-center from-pink-400 to-purple-500 bg-clip-text text-transparent">
                  {bonus.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default BonusSection;
