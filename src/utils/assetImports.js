// Import all assets to get proper Vite URLs
import ArrowIcon from '../assets/wf-buton-arrow.svg'
import Thumbnail from '../assets/thumbnil.jpeg'
import PlayIcon from '../assets/Playbutton.svg'
import MentorImage from '../assets/Keshav.png'
import WebflowHeroImage from '../assets/5f2db973311dff83f9829e34_webflow-home-hero-1.png'
import WebflowImage from '../assets/wbflow-1-p-800.webp'
import CertificateImage from '../assets/certificates.png'
import BrandLogo from '../assets/Playbutton.svg'
import EdtechImage from '../assets/edtech.jpeg'

// Export all assets with their proper Vite URLs
export const assets = {
  arrowIcon: ArrowIcon,
  thumbnail: Thumbnail,
  playIcon: PlayIcon,
  mentorImage: MentorImage,
  webflowHeroImage: WebflowHeroImage,
  webflowImage: WebflowImage,
  edtechImage: EdtechImage, // Using edtech.jpeg as fallback for portfolio
  certificateImage: CertificateImage,
  brandLogo: BrandLogo,
}

// Helper function to resolve asset path
// If it's a URL or starts with /, return as-is
// Otherwise, try to find it in imported assets
export const resolveAsset = (path) => {
  if (!path) return null
  
  // If it's an external URL or already imported, return as-is
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  
  // If it's in public folder (starts with /), return as-is
  if (path.startsWith('/') && !path.startsWith('/src/')) {
    return path
  }
  
  // Map old /src/assets/ paths to imported assets
  const assetMap = {
    '/src/assets/wf-buton-arrow.svg': assets.arrowIcon,
    '/src/assets/thumbnil.jpeg': assets.thumbnail,
    '/src/assets/Playbutton.svg': assets.playIcon,
    '/src/assets/Keshav.png': assets.mentorImage,
    '/src/assets/5f2db973311dff83f9829e34_webflow-home-hero-1.png': assets.webflowHeroImage,
    '/src/assets/wbflow-1-p-800.webp': assets.webflowImage,
    '/src/assets/portfolio-1-1-p-800.webp': assets.edtechImage, // Fallback to edtech
    '/src/assets/edtech.jpeg': assets.edtechImage,
    '/src/assets/certificates.png': assets.certificateImage,
  }
  
  return assetMap[path] || path
}
