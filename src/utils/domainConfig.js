import { footer } from "framer-motion/client";

/**
 * Get configuration for current domain
 */
export const getDomainConfig = () => {
  // Get current domain (or use query param for testing)
  const urlParams = new URLSearchParams(window.location.search);
  const testDomain = urlParams.get('domain');
  const currentDomain = testDomain || window.location.hostname;

  // Load all domain configs from localStorage
  const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');

  // Return config for current domain or default
  return allConfigs[currentDomain] || getDefaultConfig();
};

/**
 * Default configuration fallback
 */
export const getDefaultConfig = () => ({
  domain: 'default',
  // theme: {
  //   colors: {
  //     primary: '#7c3aed',
  //     secondary: '#ec4899',
  //     accent: '#ef4444',
  //     background: '#0f172a',
  //     surface: '#1a1f3a',
  //     text: '#ffffff',
  //   },
  //   gradients: {
  //     primary: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #ef4444 100%)',
  //     secondary: 'linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #00d4aa 100%)',
  //   },
  //   fonts: {
  //     primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  //     secondary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  //   },
  // },
  theme: {
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
  },
  content: {
    hero: {
      logo : "https://vimeo.com/659871207/f4df3defe9",
      title: {
        line1: 'Build Custom Websites like',
        strong1: 'Apple',
        strong2: 'CRED',
        line2: 'without a single code using',
        strong3: 'Webflow for your Portfolio!',
      },
      tagline: 'Design and animate highly responsive custom websites using Webflow and bring your Portfolio to life',
      ctaText: 'Enroll for ₹1,999',
      videoUrl: 'https://vimeo.com/659871207/f4df3defe9',
      mentorName: 'Keshav Sharma',
      mentorSubtitle: 'Our Students have worked in',
      ctaIcon: '/src/assets/wf-buton-arrow.svg',
      videoThumbnail: '/src/assets/thumbnil.jpeg',
      videoPlayIcon: '/src/assets/Playbutton.svg',
      mentorImage: '/src/assets/Keshav.png',
    },
    intro: {
      title: 'You can even build this website yourself',
      emoji: '👇',
      ctaText: 'Enroll Now',
      image: '/src/assets/5f2db973311dff83f9829e34_webflow-home-hero-1.png',
    },
    description: {
      title: 'What is Webflow, and why should you care?',
      text: "Webflow is a magical tool that helps normal people like you and I, who do not know how to write code, to build beautiful websites. We have built websites for India's biggest startups on Webflow, and you can do it too. It's not that hard!",
    },
    stats: [
      { number: '5000+', label: 'Students Trained on Nocode' },
      { number: '4+', label: 'Projects' },
      { number: '₹3999', label: 'Only' },
    ],
    audiences: [
      'Designers',
      'Developers',
      'Entrepreneurs',
      'Product Managers',
      'Freelancers',
      'Digital Marketers',
      'Small Businesses',
      'Students',
    ],
    curriculum: {
      title: 'What will you learn in the program?',
      modules: [
        {
          number: '01',
          title: 'Introduction to Webflow',
          description: '- What is No-Code web design\n- Technologies involved in web design\n- Overview of the Webflow designer',
          image: '/src/assets/wbflow-1-p-800.webp',
        },
        {
          number: '02',
          title: 'Personal Portfolio Website',
          description: 'Build a personal website for yourself to showcase your skills to the world, and let the sales walk towards you.',
          image: '/src/assets/portfolio-1-1-p-800.webp',
        },
      ],
      certificateImage: '/src/assets/certificates.png',
    },
    bonuses: {
      title: 'Unlock Bonuses Worth ₹20,000',
      items: [
        { title: 'Launch Checklist', value: '₹2,500' },
        { title: 'Handover Checklist', value: '₹3,000' },
        { title: 'NDA Document', value: '₹2,000' },
      ],
    },
    urgency: {
      title: 'Time is running!',
      description: "Grab your spot fast before all the seats fill up, don't miss it. First batches will get extra weekly session with the mentors",
      targetDate: '2024-12-31',
      cta: {
        text: 'Enroll for ₹1,999',
        link: '#',
      },
    },
    opportunities: {
      title: 'Create an Outstanding Portfolio to land that dream interview!',
      items: [
        {
          stat: '4$ Billion',
          description: "Nasscom report, India's low-code & no-code market will reach up to USD 4 billion by 2025",
        },
        {
          stat: '50,000+ Jobs',
          description: 'The number of jobs across Design, Product, Tech, Marketing and Consulting that need a proof of work!',
        },
      ],
    },
    checklist: {
      title: 'Still wondering if the program is for you?',
      subtitle: 'Please Check All Boxes, Where Your Answer is YES! , If you checked ANY of the boxes above, then this Webflow Web Design Workshop is perfect for you😁',
      items: [
        "I am a designer who wants to bring designs to life, but sadly doesn't know how to write code",
        'I am a Non-Techie who wants to generate a good passive income',
        "I am an Entrepreneur who doesn't want to spend a fortune on website development, but still needs a beautiful website.",
      ],
    },
    instructor: {
      name: 'Keshav Sharma',
      title: 'Founder at EPYC & Magik',
      bio: "Hey! I am Keshav, a designer turned No-Code entrepreneur and I help businesses save precious time and money by building software without code.\n\nI started India's first No-Code studio(EPYC) along with my bud Mayank 👉\n\nWe've built products for startups without code that scaled to become unicorns later.",
      image: '/src/assets/Keshav.png',
    },
    faqs: {
      title: "FAQs: Here's everything you may ask...",
      items: [
        {
          question: 'How does the program work?',
          answer: "It's a structured program with recorded content and resources. Once you purchase the program you will get access to it immediately and you can watch all the videos at your own pace.",
        },
        {
          question: "Why shouldn't I just learn how to code?",
          answer: 'It is great if you want to learn how to code. However, Webflow offers a range of benefits like speed to market, significantly lower time & cost commitments.',
        },
      ],
    },
    pricing: {
      originalPrice: '₹3999',
      discountedPrice: '₹1800',
      discount: '55%',
    },
  },
  footer: {
    brandList: [
      {
        logo: '',  // Will need to handle image upload later
        title: 'LinkedIn',
        title2: 'Top Startup 2023'
      },
      {
        logo: '',
        title: 'Google',
        title2: 'Best Workplace'
      }
    ],
    contents: {
      title: 'For any support, reach out to us at',
      email: 'support@example.com',
      description: 'We are here to help you build amazing websites without code.',
      copyrightText: '© 2024 All rights reserved'

    },
    domain : {
      icon :"https://cdn-icons-png.flaticon.com/128/4138/4138124.png",
      name : "name1",
      name2:"name2"
    }
  }
});

/**
 * Save configuration for a domain
 */
export const saveDomainConfig = (domain, config) => {
  const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
  allConfigs[domain] = config;
  localStorage.setItem('domainConfigs', JSON.stringify(allConfigs));
};

/**
 * Get all configured domains
 */
export const getAllDomains = () => {
  const allConfigs = JSON.parse(localStorage.getItem('domainConfigs') || '{}');
  return Object.keys(allConfigs);
};
