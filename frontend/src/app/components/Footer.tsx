import { MapPin } from 'lucide-react';

const SHOP_MAPS_URL = 'https://www.google.com/maps?q=27.5942672,91.869274';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-100 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pb-6 border-b border-gray-700">
                    <div>
                        <h4 className="font-semibold mb-2">App Download</h4>
                        <p className="text-sm text-gray-300">Coming soon on Android & iOS.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Contact</h4>
                        <p className="text-sm text-gray-300">Phone: +91 80037 59454</p>
                        <p className="text-sm text-gray-300">Email: support@gajustore.in</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Support Timings</h4>
                        <p className="text-sm text-gray-300">Mon-Sun: 7:00 AM - 10:00 PM</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Service Area</h4>
                        <p className="text-sm text-gray-300">Tawang, Arunachal Pradesh - 790104</p>
                        <p className="text-sm text-gray-300">Coverage radius: 5km</p>
                    </div>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
                    <p className="text-sm md:text-base text-gray-200 font-medium">
                        © {new Date().getFullYear()} Kiran Rasan. All rights reserved.
                    </p>
                    <a
                        href={SHOP_MAPS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm md:text-base text-gray-200 hover:text-green-300 font-medium underline"
                    >
                        <MapPin className="w-4 h-4" />
                        Store Location
                    </a>
                </div>
            </div>
        </footer>
    );
}
