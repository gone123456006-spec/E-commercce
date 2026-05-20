import { MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const SHOP_MAPS_URL = 'https://www.google.com/maps?q=27.5942672,91.869274';
const FOOTER_SCENE_SRC = '/assets/images/bg%20og%20footer%20.png';

export function Footer() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  if (!isHome) return null;

  return (
    <footer className="site-footer site-footer--home text-tawang-cream overflow-hidden shrink-0">
      <div className="site-footer-body relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-0">
        <div className="tawang-divider mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-8">
          <div>
            <h4 className="font-heading text-tawang-gold text-lg mb-3">Contact</h4>
            <p className="text-sm text-white/75 font-body">Phone: +91 80037 59454</p>
            <p className="text-sm text-white/75 font-body">Email: support@mybalag.in</p>
          </div>
          <div>
            <h4 className="font-heading text-tawang-gold text-lg mb-3">Support Timings</h4>
            <p className="text-sm text-white/75 font-body">Mon-Sun: 7:00 AM - 10:00 PM</p>
          </div>
          <div>
            <h4 className="font-heading text-tawang-gold text-lg mb-3">Service Area</h4>
            <p className="text-sm text-white/75 font-body">Tawang, Arunachal Pradesh - 790104</p>
            <p className="text-sm text-white/75 font-body">Coverage radius: 5 km</p>
          </div>
        </div>
        <div className="tawang-divider mb-6" />
      </div>

      <div className="site-footer-legal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm md:text-base text-white/90 font-body">
          © {new Date().getFullYear()} MyBalag. All rights reserved.
        </p>
        <a
          href={SHOP_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 text-sm md:text-base text-tawang-gold hover:text-white font-medium transition-colors duration-200 mt-3"
        >
          <MapPin className="w-4 h-4" />
          Store Location
        </a>
      </div>

      <div className="site-footer-scene" aria-hidden="true">
        <img src={FOOTER_SCENE_SRC} alt="" decoding="async" loading="lazy" />
        <div className="site-footer-scene-fade" />
      </div>
    </footer>
  );
}
