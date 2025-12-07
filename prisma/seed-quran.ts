import { PrismaClient, HafalanType, Tier } from "@prisma/client";

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

// Determine minTier based on Juz
// FREE: Juz 30 only (Surah 78-114)
// BRONZE: Juz 29-30
// SILVER: Juz 26-30
// GOLD/PATRON: All 30 Juz
function getMinTierByJuz(juzNumber: number): Tier {
  if (juzNumber === 30) return Tier.FREE;
  if (juzNumber === 29) return Tier.BRONZE;
  if (juzNumber >= 26) return Tier.SILVER;
  return Tier.GOLD;
}

async function seedQuran() {
  console.log("🌱 Seeding ALL 114 Surahs from Kemenag...\n");
  console.log("Tier Access:");
  console.log("  - FREE: Juz 30 (Surah 78-114)");
  console.log("  - BRONZE: Juz 29-30");
  console.log("  - SILVER: Juz 26-30");
  console.log("  - GOLD/PATRON: All 30 Juz\n");

  // Fetch surah list
  const surahList = await fetchJSON<{ data: Surah[] }>(`${KEMENAG_BASE}/Daftar%20Surat.json`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const surah of surahList.data) {
    process.stdout.write(`  📖 Surah ${surah.id}: ${surah.surat_name}... `);
    
    try {
      const ayahData = await fetchJSON<{ data: Ayah[] }>(`${KEMENAG_BASE}/Surat/${surah.id}.json`);
      
      // Get juz from first ayah
      const juzNumber = ayahData.data[0]?.juz_id || 30;
      const minTier = getMinTierByJuz(juzNumber);
      
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
          juzNumber,
          minTier,
          orderIndex: surah.id,
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
          juzNumber,
          minTier,
          orderIndex: surah.id,
        },
      });

      console.log(`✓ (Juz ${juzNumber}, ${minTier})`);
      successCount++;
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 30));
    } catch {
      console.log(`✗ Error`);
      errorCount++;
    }
  }

  // Add Ayat Kursi (special - FREE access)
  console.log("\n  📖 Fetching Ayat Kursi (Al-Baqarah 255)...");
  try {
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
          juzNumber: 3,
          minTier: Tier.FREE, // Special: FREE access
          orderIndex: 0, // High priority
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
          juzNumber: 3,
          minTier: Tier.FREE,
          orderIndex: 0,
        },
      });
      console.log("    ✓ Ayat Kursi (FREE access)");
      successCount++;
    }
  } catch {
    console.log("    ✗ Error fetching Ayat Kursi");
    errorCount++;
  }

  // Summary
  const counts = await prisma.hafalanItem.groupBy({
    by: ["minTier"],
    where: { type: HafalanType.QURAN },
    _count: true,
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Seeded ${successCount} items (${errorCount} errors)`);
  console.log("\nAccess by Tier:");
  for (const c of counts) {
    console.log(`  ${c.minTier}: ${c._count} surahs`);
  }
  console.log("=".repeat(50));
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
