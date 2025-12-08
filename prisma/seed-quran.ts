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

function getMinTierByJuz(juzNumber: number): Tier {
  if (juzNumber === 30) return Tier.FREE;
  if (juzNumber === 29) return Tier.BRONZE;
  if (juzNumber >= 26) return Tier.SILVER;
  return Tier.GOLD;
}

async function seedQuran() {
  console.log("🌱 Seeding ALL Ayat from 114 Surahs (Kemenag)...\n");
  console.log("Tier Access:");
  console.log("  - FREE: Juz 30");
  console.log("  - BRONZE: Juz 29-30");
  console.log("  - SILVER: Juz 26-30");
  console.log("  - GOLD/PATRON: All 30 Juz\n");

  const surahList = await fetchJSON<{ data: Surah[] }>(`${KEMENAG_BASE}/Daftar%20Surat.json`);
  
  let totalAyat = 0;
  let errorCount = 0;

  for (const surah of surahList.data) {
    process.stdout.write(`  📖 Surah ${surah.id}: ${surah.surat_name} (${surah.count_ayat} ayat)... `);
    
    try {
      const ayahData = await fetchJSON<{ data: Ayah[] }>(`${KEMENAG_BASE}/Surat/${surah.id}.json`);
      
      // Seed each ayat individually
      for (const ayah of ayahData.data) {
        const minTier = getMinTierByJuz(ayah.juz_id);
        
        await prisma.hafalanItem.upsert({
          where: { id: `QURAN-${surah.id}-${ayah.aya_number}` },
          update: {
            title: `${surah.surat_name} : ${ayah.aya_number}`,
            arabicText: ayah.aya_text,
            translation: ayah.translation_aya_text,
            surahNumber: surah.id,
            ayahStart: ayah.aya_number,
            ayahEnd: ayah.aya_number,
            juzNumber: ayah.juz_id,
            minTier,
            orderIndex: (surah.id * 1000) + ayah.aya_number,
          },
          create: {
            id: `QURAN-${surah.id}-${ayah.aya_number}`,
            type: HafalanType.QURAN,
            title: `${surah.surat_name} : ${ayah.aya_number}`,
            arabicText: ayah.aya_text,
            translation: ayah.translation_aya_text,
            surahNumber: surah.id,
            ayahStart: ayah.aya_number,
            ayahEnd: ayah.aya_number,
            juzNumber: ayah.juz_id,
            minTier,
            orderIndex: (surah.id * 1000) + ayah.aya_number,
          },
        });
        
        totalAyat++;
      }

      console.log(`✓`);
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 50));
    } catch {
      console.log(`✗ Error`);
      errorCount++;
    }
  }

  // Summary
  const counts = await prisma.hafalanItem.groupBy({
    by: ["minTier"],
    where: { type: HafalanType.QURAN },
    _count: true,
  });

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Seeded ${totalAyat} ayat (${errorCount} errors)`);
  console.log("\nAyat by Tier:");
  for (const c of counts) {
    console.log(`  ${c.minTier}: ${c._count} ayat`);
  }
  console.log("=".repeat(50));
}

async function main() {
  // Clear existing Quran items first
  console.log("🗑️  Clearing existing Quran items...");
  await prisma.hafalanItem.deleteMany({
    where: { type: HafalanType.QURAN }
  });
  console.log("   Done!\n");
  
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
