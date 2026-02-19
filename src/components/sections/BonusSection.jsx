const BonusSection = ({ title, bonuses, subtitle }) => {
  return (
    <section className="relative max-w-[1100px] mx-auto px-4 py-20 ">
      <h2 className="text-4xl font-semi-bold text-white text-center mb-4">{title}</h2>
      <h2 className="text-6xl font-bold text-white text-center mb-12">{subtitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bonuses.map((bonus, index) => (

          <div
//             style={{
//               background: 'var(--color-secondary)',
//              blur: {
//   backdropFilter: "blur(24px)",
//   WebkitBackdropFilter: "blur(24px)"
// }
//             }}

            key={index}
            className="backdrop-blur-xl bg-[radial-gradient(circle_at_100%_100%,#ffffff03,#ffffff2b)] w-88 h-52 rounded-2xl p-1  transition"
          >
            <div className="border border-dotted border-gray-600 h-full w-full p-2 rounded-2xl 
                flex flex-col items-center justify-center text-center">

              <h3 className="text-xl font-bold text-white mb-3  text-center">{bonus.title}</h3>
              <div className="flex items-center gap-2">
                <span
                  style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text'
                  }}
                  className="text-3xl font-bold bg-gradient-to-r  text-center from-pink-400 to-purple-500 bg-clip-text text-transparent">
                  {bonus.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BonusSection;
