const StickyHeader = ({ offerText }) => {
  return (
    <div className="sticky top-0 z-[100]">
      <div className="max-w-[1200px] mx-auto py-4 px-4 flex justify-center">
        <div className=" p-3 w-[70%] rounded-md text-center text-white font-medium"
          style={{ background: 'var(--gradient-primary)' }}>
          {offerText}
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
