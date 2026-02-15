export function Footer() {
    return (
        <footer className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-green-600 py-2 sm:py-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center">
                    <p className="text-sm md:text-base text-gray-900 font-medium">
                        © {new Date().getFullYear()} Kiran Rasan. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
