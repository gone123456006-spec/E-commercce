export function Footer() {
    return (
        <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center">
                    <p className="text-lg md:text-xl font-semibold mb-2">
                        Made with ❤️ by Shyam
                    </p>
                    <p className="text-sm md:text-base text-white/80">
                        © {new Date().getFullYear()} ShopZone. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
