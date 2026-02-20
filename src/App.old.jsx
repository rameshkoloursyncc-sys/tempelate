import './App.css'
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
import Rupees from './assets/carbon_currency-rupee.svg'
import GrowIcon from './assets/uil_arrow-growth.svg'
import Briefcase from './assets/bx_bx-briefcase-alt-2.svg'
import { ThemeProvider } from './contexts/ThemeContext'

  // Option 2: Use theme from props/config
  const theme = {
    colors: {
      primary: 'linear-gradient(135deg, #0d0826 0%, #0d0826 100%)',
      secondary: 'radial-gradient(circle_at_100%_100%,#ffffff03,#ffffff2b)',
      accent: '#2a2f4a',
      background: '#0f172a',
      surface: '#1a1f3a',
      text: '#ffffff',
    },
    gradients: {
      primary: 'linear-gradient(135deg, #ef4444 0%, #7c3aed 100%)',
      secondary: 'linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #00d4aa 100%)',
    },
    fonts: {
      primary: "'Montserrat', Poppins",
      secondary: "'Montserrat', Poppins",
    },
  };

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="relative">
      <StickyHeader offerText="🔥Early Bird Offer: Price resets to ₹4,999 when the timer below hits 0." />
      <PageLayout showBottomWave={true}>
        <HeroSection
          title={{
            line1: "Build Custom Websites like",
            strong1: "Apple",
            strong2: "CRED",
            line2: "without a single code using",
            strong3: "Webflow for your Portfolio!",
          }}
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
            text: "Enroll for ₹1,999",
            link: "#",
            icon: ArrowIcon,
          }}
          video={{
            url: "https://vimeo.com/659871207/f4df3defe9",
            thumbnail: Thumbnail,
            playIcon: PlayIcon,
          }}
          mentor={{
            name: "Keshav Sharma",
            subtitle: "Our Students have worked in",
            image: MentorImage,
          }}
          stats={[
            { number: "5000+", label: "Students Trained on Nocode" },
            { number: "4+", label: "Projects" },
            { number: "₹3999", label: "Only" },
          ]}
        />

        {/* <IntroSection
        emoji="👇"
        title="You can even build this website yourself"
        cta={{ text: "Enroll Now", link: "#" }}
        image={WebflowHeroImage}
      /> */}

        <DescriptionSection
          image={WebflowHeroImage}
          title="What is Webflow, and why should you care?"
          description="Webflow is a magical tool that helps normal people like you and I, who do not know how to write code, to build beautiful websites. We have built websites for India's biggest startups on Webflow, and you can do it too. It's not that hard!"
        />

        <AudienceSection
          title="Who is this program for?"
          audiences={config.content.audiences}
          cta={{ text: "Enroll for ₹1,999 ₹4,999", link: "#" }}
          disclaimer="Register before midnight of 21, March, 2020, to unlock these bonusses. This offer is never heard before."
        />

        <CurriculumSection
          title="What will you learn in the program?"
          modules={[
            {
              number: "01",
              title: "Introduction to Webflow",
              description: "- What is No-Code web design\n- Technologies involved in web design\n- Overview of the Webflow designer",
              cta: { text: "Enroll Now", link: "#" },
            },
            {
              number: "02",
              title: "Personal Portfolio Website",
              description: "Build a personal website for yourself to showcase your skills to the world, and let the sales walk towards you.",
              cta: { text: "Enroll Now", link: "#" },
            },
            {
              number: "03",
              title: "Database Driven Websites",
              description: "- Creating a databse for your content management system\n- Building listing pages for your products\n- Building a blog and create content through Webflow",
              cta: { text: "Enroll Now", link: "#" },
            },
            {
              number: "04",
              title: "Ed-Tech Startup Website",
              description: "You will build a website for an Ed-Tech startup showcasing the courses available. You will also learn to build a blog functionality to create long form valuable content.",
              cta: { text: "Enroll Now", link: "#" },
            },
            {
              number: "05",
              title: "Cloning the website of a billion dollar company in India",
              description: "The company is a surprise, but after this series, you will have an incredible website in your hand with highly complex looking animations. But don't worry, it only looks complex, we've made the process simple for you to build it fully, without writing a single line of code.",
              cta: { text: "Enroll Now", link: "#" },
            },
          ]}
          cta={{ text: "Enroll for ₹1,999 ₹4,999", link: "#" }}
          disclaimer="Register before midnight of 21, March, 2020, to unlock these bonusses. This offer is never heard before."
        />

        <BonusSection
          title="Unlock Bonuses Worth"
          subtitle='₹20,000'
          bonuses={[
            { title: "Launch Checklist", value: "₹2,500" },
            { title: "Handover Checklist", value: "₹3,000" },
            { title: "NDA Document", value: "₹2,000" },
            { title: "Speed Testing Analytics", value: "₹2,000" },
            { title: "Website Templates", value: "₹5,000" },
          ]}
        />

        <UrgencySection
          title="Time is running!"
          description="Grab your spot fast before all the seats fill up, don't miss it. First batches will get extra weekly session with the mentors"
          targetDate="2026-03-01T00:00:00"
          disclaimer="Register before midnight of 21, March, 2020, to unlock these bonusses. This offer is never heard before."
          cta={{ text: "Enroll for ₹1,999 ", text1: " ₹4,999", link: "#" }}
        />

        <OpportunitySection
          title="Create an Outstanding Portfolio to land that dream interview!"
          opportunities={[
            {
              stat: "4$ Billion",
              description: "Nasscom report, India's low-code & no-code market will reach up to USD 4 billion by 2025",
              src: Rupees
            },
            {
              stat: "50,000+ Jobs",
              description: "The number of jobs across Design, Product, Tech, Marketing and Consulting that need a proof of work!",
              src: Briefcase
            },
            {
              stat: "Freelance/Startup Opportunities",
              description: "Webflow enables you to build websites without code. Why not do it for other startups and earn money as a freelancer or maybe build your own business?",
              src: GrowIcon
            },
          ]}
        />

        <ChecklistSection
          title="Still wondering if the program is for you?"
          subtitle="Please Check All Boxes, Where Your Answer is YES! , If you checked ANY of the boxes above, then this Webflow Web Design Workshop is perfect for you😁"
          checklistItems={[
            "I am a designer who wants to bring designs to life, but sadly doesn't know how to write code",
            "I am a Non-Techie who wants to generate a good passive income",
            "I am an Entrepreneur who doesn't want to spend a fortune on website development, but still needs a beautiful website.",
            "I am a Marketer who wants to build landing pages superfast, make optimizations superfast, and get audience feedback superfast.",
            "I am a Product Manager who wants to test out ideas and build MVP(s) without relying on the dev team.",
            "I am a Developer who doesn't want to waste time writing HTML/CSS, and much rather use a tool to generate it for me quickly.",
          ]}
          cta={{ text: "Enroll for JUST ₹1,999", link: "#" }}
        />

        <InstructorSection
          title="Meet the instructor"
          instructor={{
            name: "Keshav Sharma",
            title: "Founder at EPYC & Magik",
            bio: "Hey! I am Keshav, a designer turned No-Code entrepreneur and I help businesses save precious time and money by building software without code.\n\nI started India's first No-Code studio(EPYC) along with my bud Mayank 👉\n\nWe've built products for startups without code that scaled to become unicorns later.\n\nIn the past couple of years, I've trained and mentored 6000+ students in No-Code, and helped them build their dream products, without ever learning to code. EVER!",
            image: MentorImage,
          }}
        />

        <FAQSection
          title="FAQs: Here's everything you may ask..."
          faqs={[
            {
              question: "How does the program work?",
              answer: "It's a structured program with recorded content and resources. Once you purchase the program you will get access to it immediately and you can watch all the videos at your own pace and also complete the assignments included in the same. if you get any doubts, you can ask your question in the discord community and your peer and mentor network will help you out.",
            },
            {
              question: "Why shouldn't I just learn how to code?",
              answer: "It is great if you want to learn how to code. However, Webflow offers a range of benefits like speed to market, significantly lower time & cost commitments, & hey, it is a lot easier than coding.",
            },
            {
              question: "Will I be working on a real world project in the program?",
              answer: "Yes, you will be building real-world projects",
            },
            {
              question: "I don't have an idea that I want to work on. Can I still join the program?",
              answer: "Not a problem! Once you learn how to use the tool and build some prototypes, ideas will start flowing!",
            },
            {
              question: "When will I receive the bonuses?",
              answer: "You will receive all the bonuses right away once you login into your growthschool account.",
            },
            {
              question: "I made the payment but didn't receive any confirmation or email from GrowthSchool, what do I do?",
              answer: "Well, in most cases it should not happen. Make sure you give us 5-10 minutes in case you don't receive any emails right away. Even then if you don't receive anything from us, then please write to support@growthschool.io and our support team will clarify your problems in 24-48 hours.",
            },
            {
              question: "Do I get access to the Webflow tool?",
              answer: "We don't provide any licenses for the Webflow tool. However, it is a free tool for people looking to use it for personal use like Portfolio Building, hypothesis testing etc.",
            },
            {
              question: "Can I get a refund?",
              answer: "No, currently we don't have a refund policy.",
            },
          ]}
          disclaimer="Register before midnight of 21, March, 2020, to unlock these bonusses. This offer is never heard before."
        />

        <Footer />
      </PageLayout>
    </div>
    </ThemeProvider>
  )
}

export default App
