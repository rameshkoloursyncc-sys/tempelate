const StickyHeader = ({ offerText }) => {
    return (
      <div className="sticky top-0 z-[100]">
        <div className="max-w-[1200px] mx-auto py-4 px-4 flex justify-center">
          <div className="bg-gradient-to-r from-[#ff7373] to-[#491eb8] p-3 w-[70%] rounded-md text-center text-white font-medium">
            {offerText}
          </div>
        </div>
      </div>
    );
  };
  
  export default StickyHeader;
  