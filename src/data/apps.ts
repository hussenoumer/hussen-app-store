export interface App {
  name: string;
  id: string;
  href: string;
  category: string;
  lang: string;
  addedDate?: string; // YYYY-MM-DD format, for "NEW" badge
}

/** Check if an app was added within the last N days (default 30) */
export function isNewApp(app: App, days = 30): boolean {
  if (!app.addedDate) return false;
  const added = new Date(app.addedDate);
  const now = new Date();
  const diffMs = now.getTime() - added.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

export const categories = [
  { id: "quran", label: "Full Quran Recitations", labelAm: "ሙሉ ቁርአን ንባብ", labelAr: "تلاوات القرآن الكامل", icon: "📖" },
  { id: "books-am", label: "Islamic Books (Amharic)", labelAm: "የእስላም መጽሐፍት (አማርኛ)", labelAr: "كتب إسلامية (الأمهرية)", icon: "📚" },
  { id: "books-ar", label: "Islamic Books (Arabic)", labelAm: "የእስላም መጽሐፍት (አረብኛ)", labelAr: "كتب إسلامية (العربية)", icon: "📗" },
  { id: "quran-learn", label: "Quran Learning", labelAm: "የቁርአን ትምህርት", labelAr: "تعلم القرآن", icon: "🎯" },
  { id: "productivity", label: "Productivity Tools", labelAm: "የስራ መሳሪያዎች", labelAr: "أدوات الإنتاجية", icon: "⚡" },
  { id: "audiobooks", label: "Audiobooks & Self-Help", labelAm: "ድምፅ መጽሐፍት", labelAr: "كتب صوتية وتطوير ذات", icon: "🎧" },
  { id: "other", label: "Other Islamic Apps", labelAm: "ሌሎች የእስላም መተግበሪያዎች", labelAr: "تطبيقات إسلامية أخرى", icon: "🕌" },
];

export const apps: App[] = [
  // Full Quran Recitations
  { name: "Abdul Rahman Al-Sudais Offline", id: "com.hussenapp.sudais", href: "/store/apps/details?id=com.hussenapp.sudais", category: "quran", lang: "en" },
  { name: "Abdul Basit Full Quran Offline", id: "com.hussenapp.abdulbasit", href: "/store/apps/details?id=com.hussenapp.abdulbasit", category: "quran", lang: "en" },
  { name: "Al Minshawi Full Quran Offline", id: "com.hussenapp.minshawi", href: "/store/apps/details?id=com.hussenapp.minshawi", category: "quran", lang: "en" },
  { name: "Mishary Rashid Alafasy Offline", id: "com.hussenapp.mishary", href: "/store/apps/details?id=com.hussenapp.mishary", category: "quran", lang: "en" },
  { name: "Shuraim Full Quran Offline", id: "com.hussenapp.shuraim", href: "/store/apps/details?id=com.hussenapp.shuraim", category: "quran", lang: "en" },
  { name: "Al Huthaify Full Quran Offline", id: "com.hussenapp.huzaifi", href: "/store/apps/details?id=com.hussenapp.huzaifi", category: "quran", lang: "en" },
  { name: "Saad al Ghamdi Full Quran", id: "com.hussenapp.ghamidi", href: "/store/apps/details?id=com.hussenapp.ghamidi", category: "quran", lang: "en" },
  { name: "Yasser Al Dosari Full Quran", id: "com.hussenapp.dosari", href: "/store/apps/details?id=com.hussenapp.dosari", category: "quran", lang: "en" },
  { name: "Abu Bakr Al Shatri Full Quran", id: "com.hussenapp.shatri", href: "/store/apps/details?id=com.hussenapp.shatri", category: "quran", lang: "en" },
  { name: "Abdullah Basfar Full Quran", id: "com.hussenapp.basfar", href: "/store/apps/details?id=com.hussenapp.basfar", category: "quran", lang: "en" },
  { name: "Abdul Wadud Full Quran Offline", id: "com.hussenapp.wadud", href: "/store/apps/details?id=com.hussenapp.wadud", category: "quran", lang: "en" },
  { name: "Al-Hussary Full Quran Offline", id: "com.hussenapp.hussary", href: "/store/apps/details?id=com.hussenapp.hussary", category: "quran", lang: "en" },
  { name: "Muhammad Ayyub Full Quran Mp3", id: "com.hussenapp.muhayyub", href: "/store/apps/details?id=com.hussenapp.muhayyub", category: "quran", lang: "en" },
  { name: "Mustafa Ismail Full Quran Mp3", id: "com.hussenapp.mustafa", href: "/store/apps/details?id=com.hussenapp.mustafa", category: "quran", lang: "en" },
  { name: "Mahmoud Ali Albanna Full Quran", id: "com.hussenapp.albanna", href: "/store/apps/details?id=com.hussenapp.albanna", category: "quran", lang: "en" },
  { name: "Abdulhadi Kanakeri Full Quran", id: "com.hussenapp.kanakri", href: "/store/apps/details?id=com.hussenapp.kanakri", category: "quran", lang: "en" },
  { name: "Ayman Swed Full Quran Offline", id: "com.hussenapp.ayman", href: "/store/apps/details?id=com.hussenapp.ayman", category: "quran", lang: "en" },
  { name: "Raad Al Kurdi Full Quran", id: "com.hussenapp.raad", href: "/store/apps/details?id=com.hussenapp.raad", category: "quran", lang: "en" },
  { name: "Qari Alzain Mohamed Ahmed Full", id: "com.hussenapp.alzain", href: "/store/apps/details?id=com.hussenapp.alzain", category: "quran", lang: "en" },
  { name: "Ahmed Mohamed Taher Full Quran", id: "com.hussenapp.taher", href: "/store/apps/details?id=com.hussenapp.taher", category: "quran", lang: "en" },
  { name: "Sheikh Mansour Salimi Offline", id: "com.hussenapp.salimi", href: "/store/apps/details?id=com.hussenapp.salimi", category: "quran", lang: "en" },
  { name: "Idrees Abkar Quran Offline", id: "com.hussenapp.idrees", href: "/store/apps/details?id=com.hussenapp.idrees", category: "quran", lang: "en" },
  { name: "Islam Sobhi Full Quran Offline", id: "com.hussenapp.islamsobhi", href: "/store/apps/details?id=com.hussenapp.islamsobhi", category: "quran", lang: "en" },
  { name: "Tawfeeq As Sayegh Offline", id: "com.hussenapp.tawfeeq", href: "/store/apps/details?id=com.hussenapp.tawfeeq", category: "quran", lang: "en" },
  { name: "Nureen Mohammad Offline Quran", id: "com.hussenapp.noreen", href: "/store/apps/details?id=com.hussenapp.noreen", category: "quran", lang: "en" },
  { name: "Khalifa Al Tunaiji Full Quran", id: "com.hussenapp.tunaiji", href: "/store/apps/details?id=com.hussenapp.tunaiji", category: "quran", lang: "en" },
  { name: "AlFateh Mohamed Zubair Offline", id: "com.hussenapp.zubair", href: "/store/apps/details?id=com.hussenapp.zubair", category: "quran", lang: "en" },
  { name: "Afif Mohammed Taj Full Quran", id: "com.hussenapp.affiftaj", href: "/store/apps/details?id=com.hussenapp.affiftaj", category: "quran", lang: "en" },
  { name: "Abdullah Matrood Quran Offline", id: "com.hussenapp.abdullahmatroud", href: "/store/apps/details?id=com.hussenapp.abdullahmatroud", category: "quran", lang: "en" },
  { name: "Mufti Menk Full Quran Offline", id: "com.hussenapp.muftimenk", href: "/store/apps/details?id=com.hussenapp.muftimenk", category: "quran", lang: "en" },
  { name: "Salah Bukhatir Full Quran", id: "com.hussenapp.salah", href: "/store/apps/details?id=com.hussenapp.salah", category: "quran", lang: "en" },
  { name: "Abdul Rahman Al Ossi Quran Mp3", id: "com.hussenapp.ossi", href: "/store/apps/details?id=com.hussenapp.ossi", category: "quran", lang: "en" },
  { name: "Muhammad Al Faqih Full Quran", id: "com.hussenapp.faqih", href: "/store/apps/details?id=com.hussenapp.faqih", category: "quran", lang: "en" },
  { name: "Ali Jabir Full Quran Offline", id: "com.hussenapp.aliali", href: "/store/apps/details?id=com.hussenapp.aliali", category: "quran", lang: "en" },
  { name: "Ibrahim Al Akhdar Full Quran", id: "com.hussenapp.ahdor", href: "/store/apps/details?id=com.hussenapp.ahdor", category: "quran", lang: "en" },
  { name: "Minshawi with child offline 01", id: "com.hussenapp.minshaa", href: "/store/apps/details?id=com.hussenapp.minshaa", category: "quran", lang: "en" },
  { name: "Minshawi with child offline 02", id: "com.hussenapp.minshab", href: "/store/apps/details?id=com.hussenapp.minshab", category: "quran", lang: "en" },
  { name: "Quran Offline Audio PDF", id: "com.hussenapp.quranpdf", href: "/store/apps/details?id=com.hussenapp.quranpdf", category: "quran", lang: "en" },
  { name: "Quran majeed juz 1 to 5", id: "com.hussenapp.asmahudaa", href: "/store/apps/details?id=com.hussenapp.asmahudaa", category: "quran", lang: "en" },

  // Islamic Books (Amharic)
  { name: "ኪታቡ ተውሒድ ከመሳኢሉ ጋር", id: "com.mesail.tawuhid", href: "/store/apps/details?id=com.mesail.tawuhid", category: "books-am", lang: "am" },
  { name: "ኪታቡ ተውሂድ", id: "com.matn.tawuhid", href: "/store/apps/details?id=com.matn.tawuhid", category: "books-am", lang: "am" },
  { name: "ኪታቡ ተውሒድ ከመሳኢሉ ጋር 02", id: "com.africatv.tawuhidb", href: "/store/apps/details?id=com.africatv.tawuhidb", category: "books-am", lang: "am" },
  { name: "ኪታቡ ተውሒድ በአቡጁወይሪያ ክፍል አንድ", id: "com.abujuwoyriya.tewhidc", href: "/store/apps/details?id=com.abujuwoyriya.tewhidc", category: "books-am", lang: "am" },
  { name: "ኪታቡ ተውሒድ በአቡጁወይሪያ ክፍል ሁለት", id: "com.abujuwoyriya.kitabutewhidd", href: "/store/apps/details?id=com.abujuwoyriya.kitabutewhidd", category: "books-am", lang: "am" },
  { name: "አቂደቱ ተውሒድ", id: "com.hussenapp.aqidetutewuhid", href: "/store/apps/details?id=com.hussenapp.aqidetutewuhid", category: "books-am", lang: "am" },
  { name: "አቂደቱል ሙስሊም", id: "com.hussenapp.aqidetulmuslim", href: "/store/apps/details?id=com.hussenapp.aqidetulmuslim", category: "books-am", lang: "am" },
  { name: "አቂደቱል ዋሲጢያ", id: "com.hussenapp.aqwasi", href: "/store/apps/details?id=com.hussenapp.aqwasi", category: "books-am", lang: "am" },
  { name: "አቂደቱል ዋሲጢያ በአቡ አስማ", id: "com.hussenapp.aqidaasma", href: "/store/apps/details?id=com.hussenapp.aqidaasma", category: "books-am", lang: "am" },
  { name: "አቂደቱል ዋሲጥያ በወንድም አቡ ሀሣን", id: "com.hussenapp.abuhassan", href: "/store/apps/details?id=com.hussenapp.abuhassan", category: "books-am", lang: "am" },
  { name: "አቂደቱል ዋሲጥያ", id: "com.hussenapp.wasahmed", href: "/store/apps/details?id=com.hussenapp.wasahmed", category: "books-am", lang: "am" },
  { name: "العقيدة الواسطية አቂደቱል ዋሲጥያ", id: "com.hussenapp.wasityajemal", href: "/store/apps/details?id=com.hussenapp.wasityajemal", category: "books-am", lang: "am" },
  { name: "ኡሱሉ ሰላሳ ኪታብ", id: "com.hussenapp.usulusman", href: "/store/apps/details?id=com.hussenapp.usulusman", category: "books-am", lang: "am" },
  { name: "ኡሱሉ ሰላሳ ኪታብ ትርጉም", id: "com.hussenapp.usulamhar", href: "/store/apps/details?id=com.hussenapp.usulamhar", category: "books-am", lang: "am" },
  { name: "ኡሱሉ ሰላሳ በአማርኛ በኡስታዝ ኸድር አህመድ", id: "com.hussenapp.usulkedr", href: "/store/apps/details?id=com.hussenapp.usulkedr", category: "books-am", lang: "am" },
  { name: "ኡሱሉ ሰላሳ ቱህፈቱል አጥፋል", id: "com.hussenapp.usulatfal", href: "/store/apps/details?id=com.hussenapp.usulatfal", category: "books-am", lang: "am" },
  { name: "ኡሱሉ ሰላሳ ቀዋኢዱል አርበአ በትግርኛ", id: "com.hussenapp.usuqatg", href: "/store/apps/details?id=com.hussenapp.usuqatg", category: "books-am", lang: "am" },
  { name: "ኡሱሉ ሱና መትን እና ሸርህ በአማርኛ", id: "com.hussenapp.shrususuna", href: "/store/apps/details?id=com.hussenapp.shrususuna", category: "books-am", lang: "am" },
  { name: "ኡሱሉል ኢማን የኢማን መሠረቶች", id: "com.hussenapp.usululiman", href: "/store/apps/details?id=com.hussenapp.usululiman", category: "books-am", lang: "am" },
  { name: "ሸርህ ነዋቂዱል ኢስላም", id: "com.hussenapp.shnewaqid", href: "/store/apps/details?id=com.hussenapp.shnewaqid", category: "books-am", lang: "am" },
  { name: "ነዋቂደል ኢስላም በኡስታዝ አቡጁወይሪያ", id: "com.hussenapp.newaqidabuju", href: "/store/apps/details?id=com.hussenapp.newaqidabuju", category: "books-am", lang: "am" },
  { name: "ኡምደቱል አህካም", id: "com.hussenapp.umdaa", href: "/store/apps/details?id=com.hussenapp.umdaa", category: "books-am", lang: "am" },
  { name: "ኡምደቱል አህካም በአቡጁወይሪያ 01", id: "com.hussenapp.abumdaa", href: "/store/apps/details?id=com.hussenapp.abumdaa", category: "books-am", lang: "am" },
  { name: "ኡምደቱል አህካም በአቡጁወይሪያ 02", id: "com.hussenapp.abumdab", href: "/store/apps/details?id=com.hussenapp.abumdab", category: "books-am", lang: "am" },
  { name: "ሹሩጡ ሶላት", id: "com.hussenapp.shurkhedr", href: "/store/apps/details?id=com.hussenapp.shurkhedr", category: "books-am", lang: "am" },
  { name: "ሹሩጡ ሶላት በአማረኛ", id: "com.hussenapp.shuramar", href: "/store/apps/details?id=com.hussenapp.shuramar", category: "books-am", lang: "am" },
  { name: "ሹሩጡ ሶላት በአማርኛ በኢብን ከማል", id: "com.hussenapp.shertukemal", href: "/store/apps/details?id=com.hussenapp.shertukemal", category: "books-am", lang: "am" },
  { name: "ሹሩጡ ሶላት አቡ ለይስ የፊቅሕ ትምህርት", id: "com.hussenapp.shurthanefya", href: "/store/apps/details?id=com.hussenapp.shurthanefya", category: "books-am", lang: "am" },
  { name: "ሹሩጡ ላኢላሀኢለላህ በአቡ አስማ", id: "com.hussenapp.shurutasma", href: "/store/apps/details?id=com.hussenapp.shurutasma", category: "books-am", lang: "am" },
  { name: "ሹሩጡ ላኢላሀኢለላህ በአቡ አብደላህ", id: "com.hussenapp.shurtheyru", href: "/store/apps/details?id=com.hussenapp.shurtheyru", category: "books-am", lang: "am" },
  { name: "ሹጃእ የፊቅህ ኪታብ", id: "com.hussenapp.shuja", href: "/store/apps/details?id=com.hussenapp.shuja", category: "books-am", lang: "am" },
  { name: "የፊቅህ መሰረታዊ ህግጋቶች", id: "com.hussenapp.qewafiqh", href: "/store/apps/details?id=com.hussenapp.qewafiqh", category: "books-am", lang: "am" },
  { name: "የፊቅህ ትምህርት ንጽሕና በኢስላም", id: "com.hussenapp.fiqhtehara", href: "/store/apps/details?id=com.hussenapp.fiqhtehara", category: "books-am", lang: "am" },
  { name: "የአልዋጂባት ሸርህ በኡስታዝ አቡዩሥራ ክፍል 01", id: "com.hussenapp.wajibatabuyusraa", href: "/store/apps/details?id=com.hussenapp.wajibatabuyusraa", category: "books-am", lang: "am" },
  { name: "የአልዋጂባት ሸርህ በኡስታዝ አቡዩሥራ ክፍል 02", id: "com.hussenapp.wajibatabuyusrab", href: "/store/apps/details?id=com.hussenapp.wajibatabuyusrab", category: "books-am", lang: "am" },
  { name: "ቡሉገል መራም በአማርኛ 01", id: "com.hussenapp.bulugaa", href: "/store/apps/details?id=com.hussenapp.bulugaa", category: "books-am", lang: "am" },
  { name: "ቡሉገል መራም በአማርኛ 02", id: "com.hussenapp.bulugbb", href: "/store/apps/details?id=com.hussenapp.bulugbb", category: "books-am", lang: "am" },
  { name: "ሪያዱ ሷሊሂን 01 በኢብን ሙነወር", id: "com.hussenapp.riyadmuna", href: "/store/apps/details?id=com.hussenapp.riyadmuna", category: "books-am", lang: "am" },
  { name: "ሪያዱ ሷሊሒን ክፍል አንድ", id: "com.hussenapp.riyada", href: "/store/apps/details?id=com.hussenapp.riyada", category: "books-am", lang: "am" },
  { name: "ሪያዱ ሷሊሒን ክፍል ሁለት", id: "com.hussenapp.riyadb", href: "/store/apps/details?id=com.hussenapp.riyadb", category: "books-am", lang: "am" },
  { name: "አርበኢን ነወዊ ኪታብ", id: "com.hussenapp.arbeinamin", href: "/store/apps/details?id=com.hussenapp.arbeinamin", category: "books-am", lang: "am" },
  { name: "አርበኢን ሀዲስ በድምፅ", id: "com.hussenapp.arbenjilalu", href: "/store/apps/details?id=com.hussenapp.arbenjilalu", category: "books-am", lang: "am" },
  { name: "አርበኢን ሀዲስ በአማርኛ", id: "com.hussenapp.arbenkhedr", href: "/store/apps/details?id=com.hussenapp.arbenkhedr", category: "books-am", lang: "am" },
  { name: "40 ሐዲስ", id: "com.hussenapp.habeshiya", href: "/store/apps/details?id=com.hussenapp.habeshiya", category: "books-am", lang: "am" },
  { name: "ሐያቱ ሶሀባ የሶሀቦች ታሪክ", id: "com.hussenapp.hayatusahaba", href: "/store/apps/details?id=com.hussenapp.hayatusahaba", category: "books-am", lang: "am" },
  { name: "ዱሩሱል ሙሒማ በኡስታዝ አቡ ዐብዲረሕማን", id: "com.hussenapp.muhitigr", href: "/store/apps/details?id=com.hussenapp.muhitigr", category: "books-am", lang: "am" },
  { name: "ሸርህ ከሽፉ ሹብሀት 01", id: "com.hussenapp.shrhkeshfa", href: "/store/apps/details?id=com.hussenapp.shrhkeshfa", category: "books-am", lang: "am" },
  { name: "ሸርህ ከሽፉ ሹብሀት 02", id: "com.hussenapp.shrhkeshfb", href: "/store/apps/details?id=com.hussenapp.shrhkeshfb", category: "books-am", lang: "am" },
  { name: "ከሽፉ ሹብሐት በኡስታዝ አህመድ አደም", id: "com.hussenapp.ahmedadem", href: "/store/apps/details?id=com.hussenapp.ahmedadem", category: "books-am", lang: "am" },
  { name: "كشف الشبهات ከሽፉ ሹብሐት በኡስታዝ ጀማል", id: "com.hussenapp.keshfjemal", href: "/store/apps/details?id=com.hussenapp.keshfjemal", category: "books-am", lang: "am" },
  { name: "ተንቢሃት በአቡ አስማ", id: "com.hussenapp.tenbasma", href: "/store/apps/details?id=com.hussenapp.tenbasma", category: "books-am", lang: "am" },
  { name: "ተንቢሃት تنبيهات", id: "com.hussenapp.tenbihatabu", href: "/store/apps/details?id=com.hussenapp.tenbihatabu", category: "books-am", lang: "am" },
  { name: "ሸርሁ ሱና በሸይኽ ሙሐመድ ዘይን ያለኔት", id: "com.hussenapp.sunazeyn", href: "/store/apps/details?id=com.hussenapp.sunazeyn", category: "books-am", lang: "am" },
  { name: "መካሪሙል አኽላቅ ጥሩ ስነምግባሮች", id: "com.hussenapp.ahlaq", href: "/store/apps/details?id=com.hussenapp.ahlaq", category: "books-am", lang: "am" },
  { name: "ሰፊነቱ ሶላት", id: "com.hussenapp.sefinasol", href: "/store/apps/details?id=com.hussenapp.sefinasol", category: "books-am", lang: "am" },
  { name: "ሰፊነቱ ነጃ በአማርኛ", id: "com.hussenapp.sefinaam", href: "/store/apps/details?id=com.hussenapp.sefinaam", category: "books-am", lang: "am" },
  { name: "ሰፊነቱ ነጃህ ቀዋኢዱል አርበአ በአማርኛ", id: "com.hussenapp.sefina", href: "/store/apps/details?id=com.hussenapp.sefina", category: "books-am", lang: "am" },
  { name: "አል ወረቃት الورقات في أصول الفقه", id: "com.hussenapp.alwereqat", href: "/store/apps/details?id=com.hussenapp.alwereqat", category: "books-am", lang: "am" },
  { name: "አዳኡ ወደዋእ በሽታ እና ፈውሱ", id: "com.hussenapp.adauwedewa", href: "/store/apps/details?id=com.hussenapp.adauwedewa", category: "books-am", lang: "am" },
  { name: "ምክር ለሴቶች ተውጂሀት ኪታብ", id: "com.hussenapp.tewujihat", href: "/store/apps/details?id=com.hussenapp.tewujihat", category: "books-am", lang: "am" },
  { name: "ምክር ለሴቶች መውኢዞቱ ኒሳእ", id: "com.hussenapp.mewizotunisaa", href: "/store/apps/details?id=com.hussenapp.mewizotunisaa", category: "books-am", lang: "am" },
  { name: "የመልካም ሚስት ባህሪዎች صفات الزوجة", id: "com.hussenapp.sifatzwjetusoliha", href: "/store/apps/details?id=com.hussenapp.sifatzwjetusoliha", category: "books-am", lang: "am" },
  { name: "ሙዘኪረቱን ፊ አህካሚ ሲያም", id: "com.hussenapp.muzsiyam", href: "/store/apps/details?id=com.hussenapp.muzsiyam", category: "books-am", lang: "am" },
  { name: "ኹዝ አቂደተክ አዱሩሱል ሙሂማ ኡሱሉ ሱና", id: "com.hussenapp.huzshkur", href: "/store/apps/details?id=com.hussenapp.huzshkur", category: "books-am", lang: "am" },
  { name: "አዱሩሱል ሙሂማ ኹዝ አቂደተክ በአቡ አስማ", id: "com.hussenapp.huzasma", href: "/store/apps/details?id=com.hussenapp.huzasma", category: "books-am", lang: "am" },
  { name: "የአቂዳ ኪታብ ለጀማሪዎች በአቡ አስማ", id: "com.hussenapp.keshfasma", href: "/store/apps/details?id=com.hussenapp.keshfasma", category: "books-am", lang: "am" },
  { name: "አል ሙቀዲመቱ ለጢፋ የሐነፊያ መዝሐብ ኪታብ", id: "com.hussenapp.mukedima", href: "/store/apps/details?id=com.hussenapp.mukedima", category: "books-am", lang: "am" },
  { name: "የኡስታዝ ኡመር አህመድ የአቂዳ ደርሶች", id: "com.hussenapp.urjuwiza", href: "/store/apps/details?id=com.hussenapp.urjuwiza", category: "books-am", lang: "am" },
  { name: "አልወጂዝ ኪታብ በአማርኛ", id: "com.hussenapp.alwejz", href: "/store/apps/details?id=com.hussenapp.alwejz", category: "books-am", lang: "am" },
  { name: "የላኢላሃኢለላህ ትርጉም መስፈርቶች አፍራሾች", id: "com.hussenapp.lailahaillellah", href: "/store/apps/details?id=com.hussenapp.lailahaillellah", category: "books-am", lang: "am" },
  { name: "ረውደቱል አንዋር የነብዩ ሲራ 02", id: "com.hussenapp.sirab", href: "/store/apps/details?id=com.hussenapp.sirab", category: "books-am", lang: "am" },
  { name: "ኩን ሰለፍያ كن سلفي على الجادة", id: "com.hussenapp.kunselefya", href: "/store/apps/details?id=com.hussenapp.kunselefya", category: "books-am", lang: "am" },
  { name: "ኩን ሰለፍዬን አለል ጃዳሕ ክፍል አንድ", id: "com.hussenapp.kunselefyena", href: "/store/apps/details?id=com.hussenapp.kunselefyena", category: "books-am", lang: "am" },
  { name: "ኩን ሰለፍዬን አለል ጃዳሕ ክፍል ሁለት", id: "com.hussenapp.kunselefyenb", href: "/store/apps/details?id=com.hussenapp.kunselefyenb", category: "books-am", lang: "am" },
  { name: "መንሐጁ ሰለፍያ በኡስታዝ አቡጁወይሪያ", id: "com.hussenapp.menhajuselef", href: "/store/apps/details?id=com.hussenapp.menhajuselef", category: "books-am", lang: "am" },
  { name: "መንሐጁ ሳሊኪን", id: "com.hussenapp.mensalikin", href: "/store/apps/details?id=com.hussenapp.mensalikin", category: "books-am", lang: "am" },
  { name: "ባፈድል ኪታብ", id: "com.hussenapp.bafedl", href: "/store/apps/details?id=com.hussenapp.bafedl", category: "books-am", lang: "am" },
  { name: "ቱህፈቱል አጥፋል", id: "com.hussenapp.atfakemal", href: "/store/apps/details?id=com.hussenapp.atfakemal", category: "books-am", lang: "am" },
  { name: "ረመዳንን እንዴት እንቀበለው", id: "com.hussenapp.remedaan", href: "/store/apps/details?id=com.hussenapp.remedaan", category: "books-am", lang: "am" },
  { name: "የጾምን ህግጋት ማስታወሻ", id: "com.hussenapp.yesomhig", href: "/store/apps/details?id=com.hussenapp.yesomhig", category: "books-am", lang: "am" },
  { name: "የነብያት ታሪክ ነብዩላህ ኢብራሒም", id: "com.hussenapp.prophetibrahim", href: "/store/apps/details?id=com.hussenapp.prophetibrahim", category: "books-am", lang: "am" },
  { name: "የነብዩ ሙሐመድ ታሪክ خلاصة نور اليقين", id: "com.hussenapp.hulasot", href: "/store/apps/details?id=com.hussenapp.hulasot", category: "books-am", lang: "am" },
  { name: "የአባታችን አደም ታሪክ", id: "com.hussenapp.prophetadem", href: "/store/apps/details?id=com.hussenapp.prophetadem", category: "books-am", lang: "am" },
  { name: "ዚክር እና ዱዓ በሸይኽ አህመድ አደም", id: "com.hussenapp.zikrdua", href: "/store/apps/details?id=com.hussenapp.zikrdua", category: "books-am", lang: "am" },
  { name: "እጅግ አስፈላጊ የሑረልዒይን መድረሳ ትምህርቶች", id: "com.hussenapp.asfelagitmhrtoch", href: "/store/apps/details?id=com.hussenapp.asfelagitmhrtoch", category: "books-am", lang: "am" },
  { name: "ሒዳየቱል ሙስተፊድ ለጀማሪዎች", id: "com.hussenapp.mustefida", href: "/store/apps/details?id=com.hussenapp.mustefida", category: "books-am", lang: "am" },
  { name: "ሚን ኡሱል አቂደቲ አሕሉሱነቲ ወልጀመአ", id: "com.hussenapp.minusul", href: "/store/apps/details?id=com.hussenapp.minusul", category: "books-am", lang: "am" },
  { name: "ይህ ነው እምነታችን ጥሪያችን", id: "com.hussenapp.hazihiaqidetuna", href: "/store/apps/details?id=com.hussenapp.hazihiaqidetuna", category: "books-am", lang: "am" },
  { name: "ፊርቀቱ ናጅያ", id: "com.hussenapp.firqetnagia", href: "/store/apps/details?id=com.hussenapp.firqetnagia", category: "books-am", lang: "am" },
  { name: "كتاب عزى في التصريف ኢዝይ ኪታብ", id: "com.hussenapp.eziy", href: "/store/apps/details?id=com.hussenapp.eziy", category: "books-am", lang: "am" },

  // Islamic Books (Arabic)
  { name: "شرح أصول في التفسير", id: "com.hussenapp.usulbook", href: "/store/apps/details?id=com.hussenapp.usulbook", category: "books-ar", lang: "ar" },
  { name: "شرح مقدمة الأجرومية", id: "com.hussenapp.ajrumar", href: "/store/apps/details?id=com.hussenapp.ajrumar", category: "books-ar", lang: "ar" },
  { name: "شرح الأربعين النووية", id: "com.hussenapp.reslanarbein", href: "/store/apps/details?id=com.hussenapp.reslanarbein", category: "books-ar", lang: "ar" },
  { name: "شرح عمدة الأحكام صالح فوزان 1", id: "com.hussenapp.part1", href: "/store/apps/details?id=com.hussenapp.part1", category: "books-ar", lang: "ar" },
  { name: "شرح الأصول ثلاثة", id: "com.hussenapp.sharhbadr", href: "/store/apps/details?id=com.hussenapp.sharhbadr", category: "books-ar", lang: "ar" },
  { name: "شرح مسائل الجاهلية", id: "com.hussenapp.sharmesail", href: "/store/apps/details?id=com.hussenapp.sharmesail", category: "books-ar", lang: "ar" },

  // Quran Learning
  { name: "አልቃኢደቱ ኑራንያ", id: "com.hussenapp.qaidafull", href: "/store/apps/details?id=com.hussenapp.qaidafull", category: "quran-learn", lang: "am" },
  { name: "Qaida Noorania With Sound", id: "com.hussenapp.qaidaen", href: "/store/apps/details?id=com.hussenapp.qaidaen", category: "quran-learn", lang: "en" },
  { name: "አል ቃኢደቱ ኑራንያ القاعدة النورانية", id: "com.hussenapp.qaidamha", href: "/store/apps/details?id=com.hussenapp.qaidamha", category: "quran-learn", lang: "am" },
  { name: "ቃኢዳ ኑራንያ በወንድም ሰይድ ሁሴን", id: "com.hussenapp.qaidaseid", href: "/store/apps/details?id=com.hussenapp.qaidaseid", category: "quran-learn", lang: "am" },
  { name: "Quran Juz 30 Offline", id: "com.hussenapp.ammagap", href: "/store/apps/details?id=com.hussenapp.ammagap", category: "quran-learn", lang: "en" },
  { name: "የ30ኛው ጁዝ የቁርአን አቀራር ለጀማሪዎች", id: "com.hussenapp.amatajwid", href: "/store/apps/details?id=com.hussenapp.amatajwid", category: "quran-learn", lang: "am" },
  { name: "አልቡርሓን የተጅዊድ ትምህርት", id: "com.hussenapp.alburhan", href: "/store/apps/details?id=com.hussenapp.alburhan", category: "quran-learn", lang: "am" },
  { name: "የቁርአን አቀራር በቃሪእ አብዱረህማን ዝናቤ", id: "com.hussenapp.ethioquran", href: "/store/apps/details?id=com.hussenapp.ethioquran", category: "quran-learn", lang: "am" },

  // Productivity Tools
  { name: "FocusFlow: Pomodoro timer", id: "com.hussenapp.pomodoro", href: "/store/apps/details?id=com.hussenapp.pomodoro", category: "productivity", lang: "en" },
  { name: "Task Master: To-Do & Planner", id: "com.hussenapp.taskmaster", href: "/store/apps/details?id=com.hussenapp.taskmaster", category: "productivity", lang: "en" },

  // Audiobooks & Self-Help
  { name: "Get It Done Audiobook", id: "com.hussenapp.getitdone", href: "/store/apps/details?id=com.hussenapp.getitdone", category: "audiobooks", lang: "en" },
  { name: "The Power of Not Reacting", id: "com.hussenapp.noreacting", href: "/store/apps/details?id=com.hussenapp.noreacting", category: "audiobooks", lang: "en" },

  // Other Islamic Apps
  { name: "Ruqyah Shariah", id: "com.hussenapp.ruqyah", href: "/store/apps/details?id=com.hussenapp.ruqyah", category: "other", lang: "en" },
  { name: "Daily Quran Hadith: Sahih", id: "com.hussenapp.enquotes", href: "/store/apps/details?id=com.hussenapp.enquotes", category: "other", lang: "en" },
  { name: "የሙስሊም ልጆች ስም", id: "com.hussenapp.names", href: "/store/apps/details?id=com.hussenapp.names", category: "other", lang: "am", addedDate: "2026-06-01" },

  // ==============================
  // TEMPLATE: Add new apps below with addedDate for "NEW" badge
  // Example: { name: "New App", id: "com.hussenapp.newapp", href: "/store/apps/details?id=com.hussenapp.newapp", category: "quran", lang: "en", addedDate: "2026-06-06" },
  // The NEW badge auto-shows for apps added within 30 days. Remove addedDate after 30 days or leave it.
  // ==============================
];
