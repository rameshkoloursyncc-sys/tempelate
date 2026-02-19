import BackgroundDecor from "./BackgroundDecor";

const PageLayout = ({ children, showBottomWave = false }) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0d0826] to-[#0d0826] -mt-20 pt-20">
      <BackgroundDecor showBottomWave={showBottomWave} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default PageLayout;
