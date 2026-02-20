const Footer = ({ brandList, contents , domain }) => {
  return (
    <footer
      style={{
        background: 'var(--color-background)',
        color: 'var(--color-text)'
      }}
      className="relative bg-[#1a1a1a] border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">
       
        <div className="flex flex-col items-center text-center space-y-6">
         
          {/* Logos */}
          <div className="flex items-center gap-4">
              <div  className="flex items-center gap-2">

                <div className="w-8 h-8 bg-gradient-to-br from-[#00d4aa] to-[#00a67e] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    <img src={domain.icon} alt="G" />

                  </span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg leading-tight">{domain.name}</div>
                  <div className="text-white font-bold text-lg leading-tight">{domain.name2}</div>
                </div>
                   <div className="h-8 w-[1px] bg-white/20"></div>
              </div>
            {brandList.map((brand, index) =>

              // <div key={index} className="flex items-center gap-2">

              //   <div className="w-8 h-8 bg-gradient-to-br from-[#00d4aa] to-[#00a67e] rounded-lg flex items-center justify-center">
              //     <span className="text-white font-bold text-lg">
              //       <img src={brand.logo} alt="G" />

              //     </span>
              //   </div>
              //   <div>
              //     <div className="text-white font-bold text-lg leading-tight">{brand.title}</div>
              //     <div className="text-white font-bold text-lg leading-tight">{brand.title2}</div>
              //   </div>
              //      <div className="h-8 w-[1px] bg-white/20"></div>
              // </div>
              <div
                key={index}
                style={{
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)'
                }}
                className="bg-[#2d2d2d] border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
                <div
                  style={{
                    background: 'var(--color-background)',
                    color: 'var(--color-text)'
                  }}
                  className="w-8 h-8 bg-gradient-to-br from-[#00d4aa] to-[#00a67e] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg"><img src={brand.logo} alt="" /></span>
                </div>
                <div className="text-left">
                  <div className="text-[10px] text-white/60 leading-tight">{brand.title}</div>
                  <div className="text-xs text-white font-semibold leading-tight">{brand.title2}</div>
                </div>

              </div>


            )}


            {/* LinkedIn Badge */}
            {/* <div className="bg-[#2d2d2d] border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00d4aa] to-[#00a67e] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{brand.logo}</span>
                </div>
              <div className="text-left">
                <div className="text-[10px] text-white/60 leading-tight">LinkedIn</div>
                <div className="text-xs text-white font-semibold leading-tight">Top Startup 2023</div>
              </div>
            </div> */}
          </div>

          {/* Support Text */}
          <p className="text-white/70 text-sm max-w-[700px] leading-relaxed">
            {contents.title}{" "}
            <a href="mailto:hi@growthschool.io"
              style={{
                color: 'var(--color-secondary)'
              }}

              className="text-[#00d4aa] hover:underline">
              {contents.email} {""}
            </a>
            {contents.decsription}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          background: 'var(--color-surface)',
          color: 'var(--color-text)'
        }}
        className="border-t border-white/10 bg-[#0f0f0f]">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <p className="text-white/50 text-xs text-center">
            {contents.copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
