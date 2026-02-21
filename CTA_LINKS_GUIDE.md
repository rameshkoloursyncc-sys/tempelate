# CTA Links Configuration Guide

## What Was Updated

Made all CTA (Call-to-Action) button links configurable from the admin panel.

## Sections with CTA Buttons

### 1. Hero Section
- **Button**: Main CTA button (sticky + in hero)
- **Config**: `hero.ctaText` and `hero.ctaLink`
- **Default**: "Enroll for ₹1,999" → "#enroll"

### 2. Intro Section  
- **Button**: Below intro text
- **Config**: `intro.ctaText` and `intro.ctaLink`
- **Default**: "Enroll Now" → "#enroll"

### 3. Audiences Section
- **Button**: Below audience grid
- **Config**: `audiences.ctaText` and `audiences.ctaLink`
- **Default**: "Enroll for ₹1,999" → "#enroll"

### 4. Curriculum Section
- **Buttons**: 
  - Per module CTA (uses module.cta.link - hardcoded to "#")
  - Bottom main CTA
- **Config**: `curriculum.ctaText` and `curriculum.ctaLink`
- **Default**: "Enroll for ₹1,999" → "#enroll"

### 5. Checklist Section
- **Button**: In left column
- **Config**: `checklist.ctaText` and `checklist.ctaLink`
- **Default**: "Enroll for ₹1,999" → "#enroll"

### 6. Urgency Section
- **Button**: Below countdown timer
- **Config**: `urgency.cta.text` and `urgency.cta.link`
- **Default**: "Enroll for ₹1,999" → "#"

### 7. Pricing Section
- **Button**: Main pricing CTA
- **Config**: Passed from App.jsx
- **Default**: "Buy Now" → "#"

## Files Modified

1. ✅ `src/utils/domainConfig.js` - Added ctaLink fields
2. ⏳ `src/App.jsx` - Need to pass ctaLink to components
3. ⏳ `src/components/admin/ContentConfigComplete.jsx` - Need to add link input fields

## Next Steps

### Step 1: Update App.jsx
Pass ctaLink props to all sections:

```javascript
<HeroSection
  cta={{
    text: config.content.hero.ctaText,
    link: config.content.hero.ctaLink || "#",
    icon: config.content.hero.ctaIcon || ArrowIcon,
  }}
/>

<IntroSection
  cta={{ 
    text: config.content.intro?.ctaText || "Enroll Now", 
    link: config.content.intro?.ctaLink || "#" 
  }}
/>

<AudienceSection
  cta={{ 
    text: config.content.audiences?.ctaText || "Enroll Now", 
    link: config.content.audiences?.ctaLink || "#" 
  }}
/>

<CurriculumSection
  cta={{ 
    text: config.content.curriculum?.ctaText || "Enroll Now", 
    link: config.content.curriculum?.ctaLink || "#" 
  }}
/>

<ChecklistSection
  cta={{ 
    text: config.content.checklist?.ctaText || "Enroll Now", 
    link: config.content.checklist?.ctaLink || "#" 
  }}
/>
```

### Step 2: Update Admin Panel
Add CTA Link input fields to each section in `ContentConfigComplete.jsx`:

```javascript
// In renderHero()
<InputField
  label="CTA Button Link"
  value={hero.ctaLink}
  onChange={(v) => onChange({ ...content, hero: { ...hero, ctaLink: v } })}
  placeholder="#enroll or https://..."
  type="url"
/>

// In renderIntro()
<InputField
  label="CTA Link"
  value={intro.ctaLink}
  onChange={(v) => onChange({ ...content, intro: { ...intro, ctaLink: v } })}
  placeholder="#enroll or https://..."
  type="url"
/>

// Similar for audiences, curriculum, checklist sections
```

## Link Format Examples

```
# Anchor links (same page)
#enroll
#pricing
#contact

# External links
https://payment.example.com/checkout
https://forms.google.com/...

# Relative links
/checkout
/register
```
