/**
 * Transform API response to match application structure
 */

/**
 * Transform audiences from API format to app format
 * API: { "0": "Designers", "1": "Developers", "title": "...", ... }
 * App: { list: ["Designers", "Developers"], title: "...", ... }
 */
const transformAudiences = (apiAudiences) => {
  if (!apiAudiences) return { list: [], title: '', ctaText: '', ctaLink: '', disclaimer: '' };

  // Extract numeric keys as array
  const list = Object.keys(apiAudiences)
    .filter(key => !isNaN(key))
    .sort((a, b) => Number(a) - Number(b))
    .map(key => apiAudiences[key]);

  return {
    title: apiAudiences.title || '',
    list: apiAudiences.list || list,
    ctaText: apiAudiences.ctaText || '',
    ctaLink: apiAudiences.ctaLink || '',
    disclaimer: apiAudiences.disclaimer || '',
  };
};

/**
 * Transform footer contents (fix typo: decsription → description)
 */
const transformFooterContents = (apiContents) => {
  if (!apiContents) return {};

  return {
    title: apiContents.title || '',
    email: apiContents.email || '',
    description: apiContents.description || apiContents.decsription || '', // Handle typo
    copyrightText: apiContents.copyrightText || '',
  };
};

/**
 * Transform footer brand list
 */
const transformBrandList = (apiBrandList) => {
  if (!Array.isArray(apiBrandList)) return [];

  return apiBrandList.map(brand => ({
    logo: brand.logo || '',
    title: brand.title || '',
    title2: brand.title2 || brand.title1 || '', // Handle title1/title2
    link: brand.link || '#',
  }));
};

/**
 * Main transformer: API response → App structure
 */
export const transformApiResponse = (apiData) => {
  if (!apiData) return null;

  try {
    return {
      domain: apiData.domain || 'default',
      uuid: apiData.uuid,
      client: apiData.client,
      
      theme: {
        colors: {
          primary: apiData.theme?.colors?.primary || '#7c3aed',
          secondary: apiData.theme?.colors?.secondary || '#ec4899',
          accent: apiData.theme?.colors?.accent || '#ef4444',
          background: apiData.theme?.colors?.background || '#0f172a',
          surface: apiData.theme?.colors?.surface || '#1a1f3a',
          text: apiData.theme?.colors?.text || '#ffffff',
        },
        gradients: {
          primary: apiData.theme?.gradients?.primary || 'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #ef4444 100%)',
          secondary: apiData.theme?.gradients?.secondary || 'linear-gradient(135deg, #ef4444 0%, #ec4899 50%, #00d4aa 100%)',
        },
        fonts: {
          primary: apiData.theme?.fonts?.primary || "'Inter', sans-serif",
          secondary: apiData.theme?.fonts?.secondary || "'Inter', sans-serif",
        },
      },

      content: {
        hero: {
          title: apiData.content?.hero?.title || {},
          tagline: apiData.content?.hero?.tagline || '',
          ctaText: apiData.content?.hero?.ctaText || '',
          ctaLink: apiData.content?.hero?.ctaLink || '#',
          ctaIcon: apiData.content?.hero?.ctaIcon || '',
          videoUrl: apiData.content?.hero?.videoUrl || '',
          videoThumbnail: apiData.content?.hero?.videoThumbnail || '',
          videoPlayIcon: apiData.content?.hero?.videoPlayIcon || '',
          mentorName: apiData.content?.hero?.mentorName || '',
          mentorSubtitle: apiData.content?.hero?.mentorSubtitle || '',
          mentorImage: apiData.content?.hero?.mentorImage || '',
          logo: apiData.content?.hero?.logo || '',
          favicon: apiData.content?.hero?.favicon || '',
        },

        stats: apiData.content?.stats || [],

        intro: {
          title: apiData.content?.intro?.title || '',
          emoji: apiData.content?.intro?.emoji || '👇',
          ctaText: apiData.content?.intro?.ctaText || '',
          ctaLink: apiData.content?.intro?.ctaLink || '#',
          image: apiData.content?.intro?.image || '',
        },

        description: {
          title: apiData.content?.description?.title || '',
          text: apiData.content?.description?.text || '',
        },

        audiences: transformAudiences(apiData.content?.audiences),

        curriculum: {
          title: apiData.content?.curriculum?.title || '',
          modules: apiData.content?.curriculum?.modules || [],
          certificateImage: apiData.content?.curriculum?.certificateImage || '',
          ctaText: apiData.content?.curriculum?.ctaText || '',
          ctaLink: apiData.content?.curriculum?.ctaLink || '#',
        },

        bonuses: {
          title: apiData.content?.bonuses?.title || '',
          items: apiData.content?.bonuses?.items || [],
        },

        urgency: {
          title: apiData.content?.urgency?.title || '',
          description: apiData.content?.urgency?.description || '',
          targetDate: apiData.content?.urgency?.targetDate || '',
          cta: apiData.content?.urgency?.cta || { text: '', link: '#' },
        },

        opportunities: {
          title: apiData.content?.opportunities?.title || '',
          items: apiData.content?.opportunities?.items || [],
        },

        checklist: {
          title: apiData.content?.checklist?.title || '',
          subtitle: apiData.content?.checklist?.subtitle || '',
          items: apiData.content?.checklist?.items || [],
          ctaText: apiData.content?.checklist?.ctaText || '',
          ctaLink: apiData.content?.checklist?.ctaLink || '#',
        },

        instructor: {
          name: apiData.content?.instructor?.name || '',
          title: apiData.content?.instructor?.title || '',
          bio: apiData.content?.instructor?.bio || '',
          image: apiData.content?.instructor?.image || '',
        },

        faqs: {
          title: apiData.content?.faqs?.title || '',
          items: apiData.content?.faqs?.items || [],
        },

        pricing: {
          originalPrice: apiData.content?.pricing?.originalPrice || '',
          discountedPrice: apiData.content?.pricing?.discountedPrice || '',
          discount: apiData.content?.pricing?.discount || '',
        },

        footer: {
          contents: transformFooterContents(apiData.content?.footer?.contents),
          brandList: transformBrandList(apiData.content?.footer?.brandList),
          domain: apiData.content?.footer?.domain || { icon: '', name: '', name2: '' },
        },
      },
    };
  } catch (error) {
    console.error('❌ Error transforming API data:', error);
    return null;
  }
};

export default transformApiResponse;
