"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { apps, categories, isNewApp, type App } from "@/data/apps";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  Search,
  Share2,
  Download,
  Heart,
  Phone,
  Mail,
  MessageCircle,
  Youtube,
  Users,
  ExternalLink,
  ChevronUp,
  Copy,
  Banknote,
  Globe,
  Smartphone,
  BookOpen,
  Sparkles,
  Code2,
  Bell,
  Zap,
} from "lucide-react";

const PLAY_STORE_BASE = "https://play.google.com";
const APPS_PER_PAGE = 24;

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleCount, setVisibleCount] = useState(APPS_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        search === "" || app.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "all" || app.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const groupedApps = useMemo(() => {
    if (activeCategory !== "all") {
      return { [activeCategory]: filteredApps };
    }
    const groups: Record<string, App[]> = {};
    categories.forEach((cat) => {
      const catApps = filteredApps.filter((a) => a.category === cat.id);
      if (catApps.length > 0) groups[cat.id] = catApps;
    });
    return groups;
  }, [filteredApps, activeCategory]);

  // Flatten for lazy loading
  const allFilteredFlat = useMemo(() => {
    const flat: (App & { catId: string })[] = [];
    Object.entries(groupedApps).forEach(([catId, catApps]) => {
      catApps.forEach((app) => flat.push({ ...app, catId }));
    });
    return flat;
  }, [groupedApps]);

  const visibleApps = useMemo(() => {
    return allFilteredFlat.slice(0, visibleCount);
  }, [allFilteredFlat, visibleCount]);

  // Group visible apps back by category for rendering
  const visibleGrouped = useMemo(() => {
    const groups: Record<string, App[]> = {};
    visibleApps.forEach((app) => {
      if (!groups[app.catId]) groups[app.catId] = [];
      groups[app.catId].push(app);
    });
    // Preserve category order
    const ordered: Record<string, App[]> = {};
    categories.forEach((cat) => {
      if (groups[cat.id]) ordered[cat.id] = groups[cat.id];
    });
    return ordered;
  }, [visibleApps]);

  const hasMore = visibleCount < allFilteredFlat.length;

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(APPS_PER_PAGE);
  }, [search, activeCategory]);

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + APPS_PER_PAGE);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore]);

  // Scroll to top listener
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareApp = useCallback(async (app: App) => {
    const text = `${app.name}\n${PLAY_STORE_BASE}${app.href}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: app.name, text, url: `${PLAY_STORE_BASE}${app.href}` });
      } catch {
        await navigator.clipboard.writeText(text);
        toast({ title: "Copied!", description: "App link copied to clipboard" });
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: "Copied!", description: "App link copied to clipboard" });
    }
  }, []);

  const shareAllApps = useCallback(async () => {
    const text = apps
      .map((app) => `${app.name}\n${PLAY_STORE_BASE}${app.href}`)
      .join("\n\n");
    if (navigator.share) {
      try {
        await navigator.share({ title: "Hussen App Store - All Apps", text });
      } catch {
        await navigator.clipboard.writeText(text);
        toast({ title: "All apps copied!", description: `${apps.length} app links copied to clipboard` });
      }
    } else {
      await navigator.clipboard.writeText(text);
      toast({ title: "All apps copied!", description: `${apps.length} app links copied to clipboard` });
    }
  }, []);

  const copyDonation = useCallback(async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: `${label} copied to clipboard` });
  }, []);

  const copyPhone = useCallback(async (phone: string) => {
    await navigator.clipboard.writeText(phone);
    toast({ title: "Copied!", description: "Phone number copied to clipboard" });
  }, []);

  const totalApps = apps.length;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#0a1628] via-[#0d2137] to-[#0a1628] text-white">
      {/* SEO structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Hussen App Store",
            url: "https://hussenappstore.com",
            description: "150+ Free Islamic & Productivity Android Apps by Dr. Hussen Oumer Amid",
            author: {
              "@type": "Person",
              name: "Hussen Oumer Amid",
              jobTitle: "Android App Developer",
              knowsAbout: ["Islamic Apps", "Quran Recitation", "Android Development"],
            },
            sameAs: [
              "https://t.me/islamicappdeveloper",
              "https://www.youtube.com/channel/UCMz3YhA-bsjn3xclupwVbpw",
              "https://t.me/ISLAMICBOOKSANDAPPS",
              "https://play.google.com/store/apps/dev?id=8792110632116938529",
            ],
          }),
        }}
      />
      {/* Service Worker + PWA */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(() => {});
              });
            }
            // OneSignal push notifications (free - add your app ID at onesignal.com)
            window.OneSignal = window.OneSignal || [];
             OneSignal.push(function() { OneSignal.init({ appId: 'dff80e61-f2f3-4c79-ba59-fa7fab553283' }); });
          `,
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a1628]/80 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Hussen App Store" className="w-10 h-10 rounded-xl" />
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
                Hussen App Store
              </h1>
              <p className="text-[10px] text-emerald-300/60 hidden sm:block">Islamic Apps & More</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/30 text-xs"
              onClick={shareAllApps}
            >
              <Share2 className="w-3 h-3 mr-1" />
              Share All
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-transparent to-yellow-900/10" />
          <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
          <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  <Sparkles className="w-3 h-3 mr-1" /> {totalApps}+ Free Apps
                </Badge>
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                  <span className="bg-gradient-to-r from-emerald-300 via-green-200 to-yellow-300 bg-clip-text text-transparent">
                    Dr. Hussen Oumer Amid
                  </span>
                </h2>
                <p className="text-emerald-100/70 text-lg md:text-xl mb-2">
                  Medical Doctor turned Android App Developer & Author & Content Creator
                </p>
                <p className="text-emerald-200/50 text-sm mb-6">From Ethiopia 🇪🇹</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a href="mailto:hussenoumer85@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm hover:bg-emerald-600/30 transition">
                    <Mail className="w-4 h-4" /> Email
                  </a>
                  <a href="tel:+251912767238" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm hover:bg-emerald-600/30 transition">
                    <Phone className="w-4 h-4" /> Call
                  </a>
                  <a href="https://t.me/islamicappdeveloper" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm hover:bg-blue-600/30 transition">
                    <MessageCircle className="w-4 h-4" /> Telegram
                  </a>
                  <a href="https://www.youtube.com/channel/UCMz3YhA-bsjn3xclupwVbpw?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-300 text-sm hover:bg-red-600/30 transition">
                    <Youtube className="w-4 h-4" /> YouTube
                  </a>
                  <a href="https://t.me/ISLAMICBOOKSANDAPPS" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600/20 border border-sky-500/30 text-sky-300 text-sm hover:bg-sky-600/30 transition">
                    <Users className="w-4 h-4" /> Group
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <img src="/logo.png" alt="Hussen App Store Logo" className="w-40 h-40 md:w-56 md:h-56 rounded-3xl shadow-2xl shadow-emerald-500/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-7xl mx-auto px-4 -mt-2 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Smartphone className="w-5 h-5" />, num: `${totalApps}+`, label: "Free Apps" },
              { icon: <BookOpen className="w-5 h-5" />, num: "7", label: "Categories" },
              { icon: <Globe className="w-5 h-5" />, num: "3", label: "Languages" },
              { icon: <Download className="w-5 h-5" />, num: "Free", label: "All Apps" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center hover:border-emerald-500/30 transition">
                <div className="text-emerald-400 flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">{stat.num}</div>
                <div className="text-xs text-emerald-200/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* App Development Service Section - Amharic */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <Card className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-blue-900/30 border-emerald-500/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-emerald-300 text-lg">
                <Code2 className="w-5 h-5 text-yellow-400" />
                የአፕልኬሽን ልማት አገልግሎት
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                ዶክተር ሁሴን ኡመር በትእዛዝ ማሠራት የሚፈልጉትን አፕልኬሽን ካለ ያለኔት ኪታቦችን መቅራት የሚያስችሉ የተለያዩ ኡስታዞችን ደርሶች ትምህርቶች ያለኔት ሰብስበው የያዘዙ አፕልኬሽን አዘጋጃለሁ።
              </p>

              {/* Service Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-black/30 rounded-lg p-3 border border-emerald-500/20 text-center">
                  <BookOpen className="w-6 h-6 mx-auto text-yellow-400 mb-2" />
                  <p className="text-xs text-emerald-200/70">ኪታቦችን ወደ አፕልኬሽን መቅረፅ</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 border border-emerald-500/20 text-center">
                  <Zap className="w-6 h-6 mx-auto text-yellow-400 mb-2" />
                  <p className="text-xs text-emerald-200/70">ትምህርቶችን ሰብስቦ አፕልኬሽን መስራት</p>
                </div>
                <div className="bg-black/30 rounded-lg p-3 border border-emerald-500/20 text-center">
                  <Code2 className="w-6 h-6 mx-auto text-yellow-400 mb-2" />
                  <p className="text-xs text-emerald-200/70">ብጁ አፕልኬሽን ልማት</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-black/30 rounded-lg p-3 border border-yellow-500/20">
                  <p className="text-xs text-yellow-300/60 mb-1">ስልክ 1</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-lg text-white">+251935830115</span>
                    <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300 h-8 px-2" onClick={() => copyPhone("+251935830115")}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 bg-black/30 rounded-lg p-3 border border-yellow-500/20">
                  <p className="text-xs text-yellow-300/60 mb-1">ስልክ 2</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-lg text-white">+251912767238</span>
                    <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300 h-8 px-2" onClick={() => copyPhone("+251912767238")}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a href="tel:+251935830115" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 text-sm hover:bg-emerald-600/30 transition">
                  <Phone className="w-4 h-4" /> ደውል
                </a>
                <a href="https://t.me/islamicappdeveloper" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm hover:bg-blue-600/30 transition">
                  <MessageCircle className="w-4 h-4" /> ቴሌግራም
                </a>
                <a href="mailto:hussenoumer85@gmail.com" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-300 text-sm hover:bg-red-600/30 transition">
                  <Mail className="w-4 h-4" /> ኢሜል
                </a>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Donation Card */}
        <section className="max-w-7xl mx-auto px-4 mb-8">
          <Card className="bg-gradient-to-r from-yellow-900/20 via-emerald-900/20 to-emerald-900/30 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-300">
                <Heart className="w-5 h-5 text-red-400" /> Support Dr. Hussen Oumer Amid
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-emerald-100/60">
                Your generous donations help Dr. Hussen Oumer Amid continue building free Islamic education and productivity apps for the Muslim community worldwide. Every contribution matters.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-xl p-5 border border-yellow-500/20">
                  <p className="text-xs text-yellow-300/60 mb-1 uppercase tracking-wide">Bank Account</p>
                  <p className="font-mono text-xl text-white mb-1">1000161347802</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-emerald-200/40">Dr. Hussen Oumer Amid</p>
                    <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300 h-7 px-2 text-xs" onClick={() => copyDonation("1000161347802", "Account number")}>
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </Button>
                  </div>
                </div>
                <div className="bg-black/30 rounded-xl p-5 border border-yellow-500/20">
                  <p className="text-xs text-yellow-300/60 mb-1 uppercase tracking-wide">Telebirr</p>
                  <p className="font-mono text-xl text-white mb-1">+251912767238</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-emerald-200/40">Mobile Money</p>
                    <Button size="sm" variant="ghost" className="text-yellow-400 hover:text-yellow-300 h-7 px-2 text-xs" onClick={() => copyDonation("+251912767238", "Telebirr number")}>
                      <Copy className="w-3 h-3 mr-1" /> Copy
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Search & Filter */}
        <section className="max-w-7xl mx-auto px-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/50" />
              <Input
                placeholder="Search apps by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-emerald-200/30 focus:border-emerald-500/50 h-11"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              size="sm"
              variant={activeCategory === "all" ? "default" : "outline"}
              className={activeCategory === "all" ? "bg-emerald-600 text-white shrink-0" : "border-white/10 text-emerald-300/70 hover:bg-emerald-900/30 shrink-0"}
              onClick={() => setActiveCategory("all")}
            >
              All ({totalApps})
            </Button>
            {categories.map((cat) => {
              const count = apps.filter((a) => a.category === cat.id).length;
              return (
                <Button
                  key={cat.id}
                  size="sm"
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  className={activeCategory === cat.id ? "bg-emerald-600 text-white shrink-0" : "border-white/10 text-emerald-300/70 hover:bg-emerald-900/30 shrink-0"}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.icon} {cat.label} ({count})
                </Button>
              );
            })}
          </div>
        </section>

        {/* Apps by Category (Lazy Loaded) */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          {Object.keys(groupedApps).length === 0 && (
            <div className="text-center py-20 text-emerald-200/40">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-xl">No apps found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          )}

          {Object.entries(visibleGrouped).map(([catId, catApps]) => {
            const cat = categories.find((c) => c.id === catId);
            return (
              <div key={catId} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{cat?.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{cat?.label}</h3>
                    <p className="text-xs text-emerald-300/50">{cat?.labelAm} • {cat?.labelAr}</p>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 ml-auto">
                    {catApps.length} apps
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {catApps.map((app) => {
                    const isNew = isNewApp(app);
                    return (
                      <Card
                        key={app.id}
                        className="bg-white/5 backdrop-blur border-white/10 hover:border-emerald-500/40 transition-all duration-200 hover:bg-white/8 group"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600/40 to-yellow-600/30 flex items-center justify-center text-lg shrink-0 border border-white/10">
                              {cat?.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm text-white leading-tight line-clamp-2 mb-1 group-hover:text-emerald-300 transition">
                                {app.name}
                              </h4>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-white/10 text-emerald-300/50">
                                  {app.lang === "am" ? "አማ" : app.lang === "ar" ? "عر" : "EN"}
                                </Badge>
                                {isNew && (
                                  <Badge className="text-[10px] px-1.5 py-0 bg-yellow-500/30 text-yellow-300 border-yellow-500/30 animate-pulse">
                                    NEW
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3">
                            <a
                              href={`${PLAY_STORE_BASE}${app.href}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-medium transition"
                            >
                              <ExternalLink className="w-3 h-3" /> Play Store
                            </a>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/10 text-emerald-300/70 hover:bg-emerald-900/30 hover:text-emerald-300 px-3"
                              onClick={() => shareApp(app)}
                            >
                              <Share2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Infinite scroll trigger */}
          {hasMore && (
            <div ref={loadMoreRef} className="flex justify-center py-8">
              <div className="flex items-center gap-3 text-emerald-300/50">
                <div className="w-5 h-5 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
                <span className="text-sm">Loading more apps...</span>
              </div>
            </div>
          )}

          {allFilteredFlat.length > 0 && !hasMore && (
            <div className="text-center py-6 text-emerald-200/40 text-sm">
              Showing all {allFilteredFlat.length} apps
            </div>
          )}
        </section>

        {/* Share All Apps Section */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/20">
            <CardContent className="p-6 text-center">
              <Share2 className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
              <h3 className="text-xl font-bold text-white mb-2">Share All {totalApps}+ Apps</h3>
              <p className="text-sm text-emerald-200/50 mb-4">
                Share the complete list of app names and Play Store links with friends and family
              </p>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={shareAllApps}>
                <Share2 className="w-4 h-4 mr-2" /> Share All Apps
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* Subscribe for New App Notifications */}
        <section className="max-w-7xl mx-auto px-4 mb-12">
          <Card className="bg-gradient-to-r from-blue-900/30 via-emerald-900/20 to-teal-900/30 border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-300">
                <Bell className="w-5 h-5" /> Get Notified About New Apps
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-emerald-100/60">
                Stay updated when new Islamic apps are released. Follow on Telegram or subscribe to notifications.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="https://t.me/ISLAMICBOOKSANDAPPS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 transition"
                >
                  <MessageCircle className="w-8 h-8 text-blue-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">Telegram Group</p>
                    <p className="text-xs text-blue-200/50">Instant notifications</p>
                  </div>
                </a>
                <a
                  href="https://t.me/islamicappdeveloper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-sky-600/20 border border-sky-500/30 hover:bg-sky-600/30 transition"
                >
                  <Users className="w-8 h-8 text-sky-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">Telegram Channel</p>
                    <p className="text-xs text-sky-200/50">App release updates</p>
                  </div>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCMz3YhA-bsjn3xclupwVbpw?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-red-600/20 border border-red-500/30 hover:bg-red-600/30 transition"
                >
                  <Youtube className="w-8 h-8 text-red-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm">YouTube Channel</p>
                    <p className="text-xs text-red-200/50">Tutorials & demos</p>
                  </div>
                </a>
              </div>
              <div className="bg-black/20 rounded-lg p-3 border border-white/10">
                <p className="text-xs text-emerald-200/50 text-center">
                  📡 RSS Feed available at <code className="text-emerald-300/70">/rss.xml</code> — Subscribe with any RSS reader
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-900/30 bg-[#0a1628]/80 backdrop-blur mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img src="/logo.png" alt="Hussen App Store" className="w-8 h-8 rounded-lg" />
                <span className="font-bold text-emerald-300">Hussen App Store</span>
              </div>
              <p className="text-sm text-emerald-200/40 leading-relaxed">
                {totalApps}+ free Android apps for Islamic education, Quran recitations, and productivity. Built with dedication by Dr. Hussen Oumer Amid from Ethiopia.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-300 mb-3">Quick Links</h4>
              <div className="space-y-2">
                <a href="https://play.google.com/store/apps/dev?id=8792110632116938529" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <ExternalLink className="w-3 h-3" /> Google Play Store
                </a>
                <a href="https://t.me/islamicappdeveloper" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <MessageCircle className="w-3 h-3" /> Telegram Channel
                </a>
                <a href="https://t.me/ISLAMICBOOKSANDAPPS" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <Users className="w-3 h-3" /> Telegram Group
                </a>
                <a href="https://www.youtube.com/channel/UCMz3YhA-bsjn3xclupwVbpw?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <Youtube className="w-3 h-3" /> YouTube Channel
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-300 mb-3">App Development</h4>
              <div className="space-y-2">
                <a href="tel:+251935830115" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <Phone className="w-3 h-3" /> +251935830115
                </a>
                <a href="tel:+251912767238" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <Phone className="w-3 h-3" /> +251912767238
                </a>
                <a href="https://t.me/islamicappdeveloper" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <Code2 className="w-3 h-3" /> Order Custom App
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-300 mb-3">Contact</h4>
              <div className="space-y-2">
                <a href="mailto:hussenoumer85@gmail.com" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <Mail className="w-3 h-3" /> hussenoumer85@gmail.com
                </a>
                <a href="tel:+251912767238" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <Phone className="w-3 h-3" /> +251912767238
                </a>
                <a href="/rss.xml" className="flex items-center gap-2 text-sm text-emerald-200/50 hover:text-emerald-300 transition">
                  <Bell className="w-3 h-3" /> RSS Feed
                </a>
              </div>
            </div>
          </div>
          <Separator className="bg-emerald-900/30 mb-4" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-xs text-emerald-200/30">
              &copy; {new Date().getFullYear()} Hussen App Store. All rights reserved.
            </p>
            <p className="text-xs text-emerald-200/30">
              Made with ❤️ in Ethiopia 🇪🇹
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/30 flex items-center justify-center transition"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
