import BgBackdrop from "../../assets/bg-backdrop-2.svg";
import Waves from "../../assets/waves_1.svg";

const BackgroundDecor = ({ showBottomWave }) => {
  return (
    <>
      <img
        src={BgBackdrop}
        alt="background"
        className="absolute top-0 right-0  h-[450px]  pointer-events-none"
      />

      {showBottomWave && (
        <img
          src={Waves}
          alt="waves"
          className="absolute bottom-0 left-1/2 -translate-x-1/2  pointer-events-none"
        />
      )}
    </>
  );
};

export default BackgroundDecor;
