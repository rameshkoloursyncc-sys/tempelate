import { useState, useEffect } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/ThemeContext'
import { getDomainConfig } from './utils/domainConfig'
import PageLayout from './components/layout/PageLayout'
import StickyHeader from './components/layout/StickyHeader'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import IntroSection from './components/sections/IntroSection'
import DescriptionSection from './components/sections/DescriptionSection'
import AudienceSection from './components/sections/AudienceSection'
import CurriculumSection from './components/sections/CurriculumSection'
import BonusSection from './components/sections/BonusSection'
import UrgencySection from './components/sections/UrgencySection'
import OpportunitySection from './components/sections/OpportunitySection'
import ChecklistSection from './components/sections/ChecklistSection'
import InstructorSection from './components/sections/InstructorSection'
import FAQSection from './components/sections/FAQSection'
import PricingSection from './components/sections/PricingSection'
import ArrowIcon from './assets/wf-buton-arrow.svg'
import Thumbnail from './assets/thumbnil.jpeg'
import PlayIcon from './assets/Playbutton.svg'
import MentorImage from './assets/Keshav.png'
import WebflowHeroImage from './assets/5f2db973311dff83f9829e34_webflow-home-hero-1.png'
import brandlogos from './assets/icon.png'
import icons from './assets/icon.png'

import { title } from 'framer-motion/client'

function App() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load configuration for current domain
    const domainConfig = getDomainConfig();
    setConfig(domainConfig);
    setLoading(false);

    // Show which domain config is loaded
    const hostname = window.location.hostname;
    const urlParams = new URLSearchParams(window.location.search);
    const testDomain = urlParams.get('domain');
    
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      console.log(`🌐 Loaded config for domain: ${hostname}`);
    } else if (testDomain) {
      console.log(`🌐 Testing with domain: ${testDomain}`);
    } else {
      console.log(`🌐 Using default configuration`);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <ThemeProvider theme={config.theme}>
      <div className="relative overflow-x-hidden w-full">
        <StickyHeader offerText="🔥Early Bird Offer: Price resets to ₹4,999 when the timer below hits 0." />

        <PageLayout showBottomWave={true}>
          <HeroSection
            title={config.content.hero.title}
            logo={config.content.hero.logo || icons }
            tagline={[
              { text: "Design", strong: true },
              { text: "and", strong: false },
              { text: "animate", strong: true },
              { text: "highly", strong: false },
              { text: "responsive", strong: true },
              { text: "custom websites using Webflow and bring your", strong: false },
              { text: "Portfolio", strong: true },
              { text: "to life", strong: false },
            ]}
            cta={{
              text: config.content.hero.ctaText,
              link: config.content.hero.ctaLink || "#",
              icon: config.content.hero.ctaIcon || ArrowIcon,
            }}
            video={{
              url: config.content.hero.videoUrl,
              thumbnail: config.content.hero.videoThumbnail || Thumbnail,
              playIcon: config.content.hero.videoPlayIcon || PlayIcon,
            }}
            mentor={{
              name: config.content.hero.mentorName,
              subtitle: config.content.hero.mentorSubtitle,
              image: config.content.hero.mentorImage || MentorImage,
            }}
            stats={config.content.stats}
          />

          <IntroSection
            emoji={config.content.intro?.emoji || "👇"}
            title={config.content.intro?.title || "You can even build this website yourself"}
            cta={{ text: config.content.intro?.ctaText || "Enroll Now", link: config.content.intro?.ctaLink || "#" }}
            image={config.content.intro?.image || WebflowHeroImage}
          />

          <DescriptionSection
            title={config.content.description?.title || "What is Webflow, and why should you care?"}
            description={config.content.description?.text || "Webflow is a magical tool that helps normal people like you and I, who do not know how to write code, to build beautiful websites."}
          />

          <AudienceSection
            title={config.content.audiences?.title || "Who is this program for?"}
            audiences={config.content.audiences?.list || config.content.audiences || []}
            cta={{ 
              text: config.content.audiences?.ctaText || config.content.hero.ctaText, 
              link: config.content.audiences?.ctaLink || "#" 
            }}
            disclaimer={config.content.audiences?.disclaimer || "Register before midnight to unlock these bonuses."}
          />

          <CurriculumSection
            title={config.content.curriculum?.title || "What will you learn in the program?"}
            modules={config.content.curriculum?.modules?.map(m => ({
              ...m,
              cta: { text: "Enroll Now", link: "#" }
            })) || [
                {
                  number: "01",
                  title: "Introduction to Webflow",
                  description: "- What is No-Code web design\n- Technologies involved in web design\n- Overview of the Webflow designer",
                  cta: { text: "Enroll Now", link: "#" },
                },
              ]}
            certificateImage={config.content.curriculum?.certificateImage}
            cta={{ 
              text: config.content.curriculum?.ctaText || config.content.hero.ctaText, 
              link: config.content.curriculum?.ctaLink || "#" 
            }}
            disclaimer="Register before midnight to unlock these bonuses."
          />

          <BonusSection
            title={config.content.bonuses?.title || "Unlock Bonuses Worth ₹20,000"}
            bonuses={config.content.bonuses?.items || [
              { title: "Launch Checklist", value: "₹2,500" },
              { title: "Handover Checklist", value: "₹3,000" },
            ]}
          />

          <UrgencySection
            title={config.content.urgency?.title || "Time is running!"}
            description={config.content.urgency?.description || "Grab your spot fast before all the seats fill up"}
            disclaimer="Register before midnight to unlock these bonuses."
            targetDate={config.content.urgency?.targetDate || "2024-12-31"}
            cta={config.content.urgency?.cta || {
              text: config.content.hero.ctaText,
              text1: config.content.pricing.originalPrice,
              link: "#"
            }}
          />

          <OpportunitySection
            title={config.content.opportunities?.title || "Create an Outstanding Portfolio to land that dream interview!"}
            opportunities={config.content.opportunities?.items || [
              {
                stat: "4$ Billion",
                description: "Nasscom report, India's low-code & no-code market will reach up to USD 4 billion by 2025",
              },
            ]}
          />

          <ChecklistSection
            title={config.content.checklist?.title || "Still wondering if the program is for you?"}
            subtitle={config.content.checklist?.subtitle || "Please Check All Boxes, Where Your Answer is YES!"}
            checklistItems={config.content.checklist?.items || [
              "I am a designer who wants to bring designs to life, but sadly doesn't know how to write code",
              "I am a Non-Techie who wants to generate a good passive income",
            ]}
            cta={{ 
              text: config.content.checklist?.ctaText || config.content.hero.ctaText, 
              link: config.content.checklist?.ctaLink || "#" 
            }}
          />

          <InstructorSection
            title="Meet the instructor"
            instructor={{
              name: config.content.instructor?.name || config.content.hero.mentorName,
              title: config.content.instructor?.title || "Founder at EPYC & Magik",
              bio: config.content.instructor?.bio || "Hey! I am a designer turned No-Code entrepreneur...",
              image: config.content.instructor?.image || MentorImage,
            }}
          />

          <FAQSection
            title={config.content.faqs?.title || "FAQs: Here's everything you may ask..."}
            faqs={config.content.faqs?.items || [
              {
                question: "How does the program work?",
                answer: "It's a structured program with recorded content and resources.",
              },
            ]}
            disclaimer="Register before midnight to unlock these bonuses."
          />
{/* 
          <PricingSection
            offerTitle="🔥Early Bird Offer: Price resets to ₹4,999 when the timer below hits 0."
            discount={config.content.pricing.discount}
            originalPrice={config.content.pricing.originalPrice}
            discountedPrice={config.content.pricing.discountedPrice}
            cta={{ text: "Buy Now", link: "#" }}
          /> */}

          <Footer brandList={
            config.content.footer?.brandList || 
            [
           {
            logo: brandlogos,
            title: "Linkdenin",
            title2: "this is social",
            link: "https://linkedin.com"
          }
        ]}
          contents={
            config.content.footer?.contents || 
            {
            title:"title",
            email :"ehsossjkdn@dfdf.dcd",
            decsription : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam cumque, eaque odit et nihil aliquid sunt, laborum, inventore ratione iusto culpa accusantium necessitatibus architecto aperiam.',
            copyrightText : "all rigjt reseved @ksjdnsjkf.dczsdv 1999"
          }}
           domain={
            config.content.footer?.domain || 
            {
            icon:PlayIcon,
            name :"Name",
            name2 : "Solg "
          }}
          />
        </PageLayout>
      </div>
    </ThemeProvider>
  )
}

export default App
