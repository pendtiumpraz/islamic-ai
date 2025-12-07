import { PrismaClient, HafalanType } from "@prisma/client";

const prisma = new PrismaClient();

const KEMENAG_BASE = "https://raw.githubusercontent.com/ianoit/Al-Quran-JSON-Indonesia-Kemenag/master";

interface Surah {
  id: number;
  surat_name: string;
  surat_text: string;
  surat_terjemahan: string;
  count_ayat: number;
}

interface Ayah {
  aya_id: number;
  aya_number: number;
  aya_text: string;
  sura_id: number;
  juz_id: number;
  page_number: number;
  translation_aya_text: string;
}

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}`);
  return res.json();
}

async function seedQuran() {
  console.log("🌱 Seeding Quran from Kemenag...\n");

  // Fetch surah list
  const surahList = await fetchJSON<{ data: Surah[] }>(`${KEMENAG_BASE}/Daftar%20Surat.json`);
  
  // Start with Juz 30 (short surahs for hafalan)
  const juz30Surahs = surahList.data.filter(s => s.id >= 78); // Juz 30 starts from An-Naba (78)
  
  let orderIndex = 0;

  for (const surah of juz30Surahs) {
    console.log(`  📖 Fetching Surah ${surah.id}: ${surah.surat_name}...`);
    
    try {
      const ayahData = await fetchJSON<{ data: Ayah[] }>(`${KEMENAG_BASE}/Surat/${surah.id}.json`);
      
      // Combine all ayahs into one text
      const arabicText = ayahData.data
        .map(a => `${a.aya_text} ﴿${a.aya_number}﴾`)
        .join(" ");
      
      const translation = ayahData.data
        .map(a => `${a.aya_number}. ${a.translation_aya_text}`)
        .join(" ");

      // Create hafalan item for full surah
      await prisma.hafalanItem.upsert({
        where: { id: `QURAN-${surah.id}-full` },
        update: {
          title: `Surah ${surah.surat_name}`,
          arabicText,
          translation,
          surahNumber: surah.id,
          ayahStart: 1,
          ayahEnd: surah.count_ayat,
          orderIndex,
        },
        create: {
          id: `QURAN-${surah.id}-full`,
          type: HafalanType.QURAN,
          title: `Surah ${surah.surat_name}`,
          arabicText,
          translation,
          surahNumber: surah.id,
          ayahStart: 1,
          ayahEnd: surah.count_ayat,
          orderIndex,
        },
      });

      console.log(`    ✓ ${surah.surat_name} (${surah.count_ayat} ayat)`);
      orderIndex++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`    ✗ Error fetching ${surah.surat_name}:`, error);
    }
  }

  // Also add Al-Fatihah (essential for prayer)
  console.log("\n  📖 Fetching Surah 1: Al-Fatihah...");
  const fatihahData = await fetchJSON<{ data: Ayah[] }>(`${KEMENAG_BASE}/Surat/1.json`);
  const fatihahArabic = fatihahData.data
    .map(a => `${a.aya_text} ﴿${a.aya_number}﴾`)
    .join(" ");
  const fatihahTranslation = fatihahData.data
    .map(a => `${a.aya_number}. ${a.translation_aya_text}`)
    .join(" ");

  await prisma.hafalanItem.upsert({
    where: { id: "QURAN-1-full" },
    update: {
      title: "Surah Al-Fatihah",
      arabicText: fatihahArabic,
      translation: fatihahTranslation,
      surahNumber: 1,
      ayahStart: 1,
      ayahEnd: 7,
      orderIndex: -1, // First priority
    },
    create: {
      id: "QURAN-1-full",
      type: HafalanType.QURAN,
      title: "Surah Al-Fatihah",
      arabicText: fatihahArabic,
      translation: fatihahTranslation,
      surahNumber: 1,
      ayahStart: 1,
      ayahEnd: 7,
      orderIndex: -1,
    },
  });
  console.log("    ✓ Al-Fatihah (7 ayat)");

  // Add Ayat Kursi
  console.log("\n  📖 Fetching Ayat Kursi (Al-Baqarah 255)...");
  const baqarahData = await fetchJSON<{ data: Ayah[] }>(`${KEMENAG_BASE}/Surat/2.json`);
  const ayatKursi = baqarahData.data.find(a => a.aya_number === 255);
  
  if (ayatKursi) {
    await prisma.hafalanItem.upsert({
      where: { id: "QURAN-2-255" },
      update: {
        title: "Ayat Kursi",
        arabicText: ayatKursi.aya_text,
        translation: ayatKursi.translation_aya_text,
        surahNumber: 2,
        ayahStart: 255,
        ayahEnd: 255,
        orderIndex: -2, // High priority
      },
      create: {
        id: "QURAN-2-255",
        type: HafalanType.QURAN,
        title: "Ayat Kursi",
        arabicText: ayatKursi.aya_text,
        translation: ayatKursi.translation_aya_text,
        surahNumber: 2,
        ayahStart: 255,
        ayahEnd: 255,
        orderIndex: -2,
      },
    });
    console.log("    ✓ Ayat Kursi");
  }

  const count = await prisma.hafalanItem.count({ where: { type: HafalanType.QURAN } });
  console.log(`\n✅ Seeded ${count} Quran hafalan items!`);
}

async function main() {
  await seedQuran();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
