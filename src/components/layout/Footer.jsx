const Footer = () => {
  return (
    <footer className="relative bg-[#1a1a1a] border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logos */}
          <div className="flex items-center gap-4">
            {/* Growth School Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#00d4aa] to-[#00a67e] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">Growth</div>
                <div className="text-white font-bold text-lg leading-tight">School</div>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-white/20"></div>

            {/* LinkedIn Badge */}
            <div className="bg-[#2d2d2d] border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#0077B5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-white/60 leading-tight">LinkedIn</div>
                <div className="text-xs text-white font-semibold leading-tight">Top Startup 2023</div>
              </div>
            </div>
          </div>

          {/* Support Text */}
          <p className="text-white/70 text-sm max-w-[700px] leading-relaxed">
            For any support, please mail to{" "}
            <a href="mailto:hi@growthschool.io" className="text-[#00d4aa] hover:underline">
              hi@growthschool.io
            </a>
            . Our support team will get back to you within 24 hours. The brands and companies that the instructors at growthschool are working at or have worked, have no relation what so ever with Growthschool
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#0f0f0f]">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <p className="text-white/50 text-xs text-center">
            © 2024 Growthschool.io. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
