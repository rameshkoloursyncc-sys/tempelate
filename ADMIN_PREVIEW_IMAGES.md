# Admin Panel Preview Images Guide

## What Was Added

Preview images now appear at the top of each section in the admin panel to help users understand what they're configuring.

## Image Mapping

| Section | Preview Image | Location |
|---------|--------------|----------|
| Hero | `/hero.png` | public/hero.png |
| Intro | `/pageafterhero.png` | public/pageafterhero.png |
| Description | `/pageafterhero2.png` | public/pageafterhero2.png |
| Statistics | `/statss.png` | public/statss.png |
| Audiences | `/audiances.png` | public/audiances.png |
| Pricing | `/portofolio.png` | public/portofolio.png |
| Curriculum | `/curriclum.png` | public/curriclum.png |
| Bonuses | `/bonuses.png` | public/bonuses.png |
| Urgency | `/urgencysection.png` | public/urgencysection.png |
| Opportunities | `/statss.png` | public/statss.png |
| Checklist | `/chekcbox.png` | public/chekcbox.png |
| Instructor | `/mentor.png` | public/mentor.png |
| FAQs | `/faqs.png` | public/faqs.png |
| Footer | `/footers.png` | public/footers.png |

## How It Works

1. **SectionPreview Component**: Displays the image at the top of each section
2. **Error Handling**: If image fails to load, it's hidden automatically
3. **Responsive**: Images scale to fit the container width
4. **Border & Shadow**: Styled with border and shadow for better visibility

## Component Structure

```jsx
const SectionPreview = ({ imagePath, alt }) => (
  <div className="mb-6 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
    <img 
      src={imagePath} 
      alt={alt}
      className="w-full h-auto object-cover"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  </div>
);
```

## Usage in SectionCard

```jsx
<SectionCard 
  title="Hero Section" 
  description="The first thing visitors see"
  previewImage="/hero.png"
>
  {/* Section content */}
</SectionCard>
```

## Adding New Preview Images

1. Add image to `/public` folder
2. Update the SectionCard with `previewImage="/your-image.png"`
3. Image will automatically appear at the top of that section

## Benefits

- **Visual Context**: Users can see what they're configuring
- **Better UX**: Reduces confusion about section purpose
- **Quick Reference**: No need to switch between admin and preview
- **Professional Look**: Makes admin panel more polished

## Notes

- Images are loaded from `/public` folder (served at root `/`)
- All images have error handling (won't break if missing)
- Images are responsive and maintain aspect ratio
- Border and shadow styling for better visibility
