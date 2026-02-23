import { useEffect, useState, useRef } from 'react';
import Waves from '../../assets/waves_1.svg';
import icons from '../../assets/icon.png'
import { Helmet } from 'react-helmet';
import SEO from '../layout/Seo';
const HeroSection = ({
    title,
    tagline,
    cta,
    video,
    mentor,
    stats,
    logo,
}) => {
    const [showEnrollButton, setShowEnrollButton] = useState(true);
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const heroBottom = heroRef.current.getBoundingClientRect().bottom;
                setShowEnrollButton(heroBottom > 0);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <SEO 
            title ={title.line1}
            description = {title.line2}
            name={title.line2}
            type="website"
            />
            <section ref={heroRef} className="relative max-w-[1200px] mx-auto px-4 pt-8 pb-32 text-center text-white overflow-visible">
                {/* ===== STICKY ENROLL BUTTON (only visible in hero) ===== */}
                {showEnrollButton && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                        <a
                            href={cta?.link}
                            className=" text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:scale-205 transition"
                            style={{ background: 'var(--gradient-primary)' }}
                        >
                            {cta?.text}
                        </a>
                    </div>
                )}

                {/* ===== TITLE ===== */}
                <div className='w-25 h-25 m-auto bg-transparent'>
                    <img src={logo} alt="Your Icons "
                        className='bg-green'
                        onError={(e) => e.target.src = icons}
                    />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mt-6">
                    {title.line1} {" "}
                    <strong
                        style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text'
                        }}
                        className="bg-clip-text text-transparent"
                    >
                        {title.strong1}
                    </strong>, <br />
                    <strong
                        style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text'
                        }}
                        className="bg-clip-text text-transparent"
                    >{title.strong2}</strong> {title.line2}{" "} <br />
                    <strong
                        style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text'
                        }}
                        className="bg-clip-text text-transparent"
                    >{title.strong3}</strong>
                </h1>

                {/* ===== TAGLINE ===== */}
                <p className="text-xl md:text-2xl mt-6 max-w-3xl mx-auto leading-relaxed text-white/90">
                    {tagline.map((item, index) =>
                        item.strong ? (
                            <strong key={index} className="text-white">{item.text} </strong>
                        ) : (
                            <span key={index}>{item.text} </span>
                        )
                    )}
                </p>

                {/* ===== VIDEO SECTION ===== */}
                <div className="mt-12 relative max-w-[900px] mx-auto z-20">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src={video.thumbnail}
                            alt="video thumbnail"
                            className="w-full rounded-2xl"
                        />

                        <a
                            href={video.url}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute inset-0 flex items-center justify-center group"
                        >
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition">
                                <img src={video.playIcon} alt="play" className="w-12 h-12" />
                            </div>
                        </a>

                        {/* Mentor Overlay */}
                        <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-sm p-4 rounded-xl flex items-center gap-4">
                            <img
                                src={mentor.image}
                                alt={mentor.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="text-left">
                                <h3 className="font-bold text-white">{mentor.name}</h3>
                                <p className="text-sm text-white/80">{mentor.subtitle}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave decoration below video - full width */}
                <div className="absolute left-[-120px] top-[calc(100%-60%)] z-10 w-screen">
                    <img src={Waves} alt="waves" className="w-full h-auto object-cover" style={{ minHeight: '200px' }} />
                </div>

                {/* ===== STATS GLASS CARD ===== */}
                <div className="mt-32 flex justify-center">
                    <div className="backdrop-blur-xl bg-[#ffffff0d] border border-white/5 rounded-3xl px-8 py-6 w-[90%] overflow-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex items-center w-full justify-center">
                                {/* Stat Block */}
                                <div className="text-center">
                                    <h2 style={{
                                        background: 'var(--gradient-primary)',
                                        WebkitBackgroundClip: 'text'
                                    }} className="text-3xl md:text-4xl font-bold  bg-clip-text text-transparent">
                                        {stat.number}
                                    </h2>
                                    <p className="text-white/80 mt-2 text-sm md:text-base">{stat.label}</p>
                                </div>

                                {/* Separator (not after last item) */}
                                {index !== stats.length - 1 && (
                                    <div className="hidden md:block h-12 w-[1px] bg-white/20 mx-8"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default HeroSection;
