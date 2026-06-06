import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1628] via-[#0d2137] to-[#0a1628] text-white px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-lg">
        {/* 404 Number */}
        <h1 className="text-[120px] md:text-[180px] font-extrabold leading-none bg-gradient-to-r from-emerald-400 via-green-300 to-yellow-400 bg-clip-text text-transparent">
          404
        </h1>

        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-yellow-500 mx-auto rounded-full mb-6" />

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          Page Not Found
        </h2>
        <p className="text-emerald-200/60 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2" /> Go Home
            </Button>
          </Link>
          <Link href="/?search=">
            <Button
              size="lg"
              variant="outline"
              className="border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/30 w-full sm:w-auto"
            >
              <Search className="w-4 h-4 mr-2" /> Browse Apps
            </Button>
          </Link>
        </div>

        <p className="text-emerald-200/30 text-xs mt-8">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم • Hussen App Store
        </p>
      </div>
    </div>
  );
}
