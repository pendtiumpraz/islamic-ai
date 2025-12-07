import { PrismaClient, HafalanType } from "@prisma/client";

const prisma = new PrismaClient();

const hafalanItems = [
  // JUZ AMMA - Short Surahs
  {
    type: HafalanType.QURAN,
    surahNumber: 114,
    ayahStart: 1,
    ayahEnd: 6,
    title: "Surah An-Nas",
    arabicText: `قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾`,
    translation: "Katakanlah, 'Aku berlindung kepada Tuhannya manusia, Raja manusia, Sembahan manusia, dari kejahatan (bisikan) setan yang bersembunyi, yang membisikkan (kejahatan) ke dalam dada manusia, dari (golongan) jin dan manusia.'",
    orderIndex: 1,
  },
  {
    type: HafalanType.QURAN,
    surahNumber: 113,
    ayahStart: 1,
    ayahEnd: 5,
    title: "Surah Al-Falaq",
    arabicText: `قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾`,
    translation: "Katakanlah, 'Aku berlindung kepada Tuhan yang menguasai subuh, dari kejahatan (makhluk) yang Dia ciptakan, dan dari kejahatan malam apabila telah gelap gulita, dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul, dan dari kejahatan pendengki apabila dia dengki.'",
    orderIndex: 2,
  },
  {
    type: HafalanType.QURAN,
    surahNumber: 112,
    ayahStart: 1,
    ayahEnd: 4,
    title: "Surah Al-Ikhlas",
    arabicText: `قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾`,
    translation: "Katakanlah (Muhammad), 'Dialah Allah Yang Maha Esa. Allah tempat meminta segala sesuatu. Dia tidak beranak dan tidak pula diperanakkan. Dan tidak ada sesuatu yang setara dengan Dia.'",
    orderIndex: 3,
  },
  {
    type: HafalanType.QURAN,
    surahNumber: 111,
    ayahStart: 1,
    ayahEnd: 5,
    title: "Surah Al-Lahab",
    arabicText: `تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ ﴿١﴾ مَا أَغْنَىٰ عَنْهُ مَالُهُ وَمَا كَسَبَ ﴿٢﴾ سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ ﴿٣﴾ وَامْرَأَتُهُ حَمَّالَةَ الْحَطَبِ ﴿٤﴾ فِي جِيدِهَا حَبْلٌ مِّن مَّسَدٍ ﴿٥﴾`,
    translation: "Binasalah kedua tangan Abu Lahab dan benar-benar binasa dia. Tidaklah berguna baginya hartanya dan apa yang dia usahakan. Kelak dia akan masuk ke dalam api yang menyala-nyala (neraka). Dan (begitu pula) istrinya, pembawa kayu bakar (penyebar fitnah). Di lehernya ada tali dari sabut yang dipintal.",
    orderIndex: 4,
  },
  {
    type: HafalanType.QURAN,
    surahNumber: 110,
    ayahStart: 1,
    ayahEnd: 3,
    title: "Surah An-Nasr",
    arabicText: `إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ﴿١﴾ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ﴿٢﴾ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا ﴿٣﴾`,
    translation: "Apabila telah datang pertolongan Allah dan kemenangan, dan engkau melihat manusia berbondong-bondong masuk agama Allah, maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya. Sungguh, Dia Maha Penerima tobat.",
    orderIndex: 5,
  },
  {
    type: HafalanType.QURAN,
    surahNumber: 1,
    ayahStart: 1,
    ayahEnd: 7,
    title: "Surah Al-Fatihah",
    arabicText: `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَٰنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾`,
    translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang. Segala puji bagi Allah, Tuhan seluruh alam, Yang Maha Pengasih, Maha Penyayang, Pemilik hari pembalasan. Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan. Tunjukilah kami jalan yang lurus, (yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.",
    orderIndex: 0,
  },

  // HADITS ARBAIN
  {
    type: HafalanType.HADITS,
    haditsNumber: 1,
    title: "Hadits 1: Niat",
    arabicText: `إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ`,
    translation: "Sesungguhnya setiap amal tergantung pada niatnya. Dan sesungguhnya setiap orang akan mendapatkan apa yang ia niatkan. Barangsiapa yang hijrahnya karena Allah dan Rasul-Nya, maka hijrahnya kepada Allah dan Rasul-Nya. Dan barangsiapa yang hijrahnya karena dunia yang ingin diraihnya atau karena wanita yang ingin dinikahinya, maka hijrahnya kepada apa yang ia tuju.",
    orderIndex: 100,
  },
  {
    type: HafalanType.HADITS,
    haditsNumber: 2,
    title: "Hadits 2: Islam, Iman, Ihsan",
    arabicText: `أَخْبِرْنِي عَنِ الْإِسْلَامِ، قَالَ: الْإِسْلَامُ أَنْ تَشْهَدَ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللهِ، وَتُقِيمَ الصَّلَاةَ، وَتُؤْتِيَ الزَّكَاةَ، وَتَصُومَ رَمَضَانَ، وَتَحُجَّ الْبَيْتَ إِنِ اسْتَطَعْتَ إِلَيْهِ سَبِيلًا`,
    translation: "Beritahukan kepadaku tentang Islam. Beliau bersabda: Islam adalah engkau bersaksi bahwa tidak ada Tuhan yang berhak disembah kecuali Allah dan Muhammad adalah utusan Allah, mendirikan shalat, menunaikan zakat, berpuasa Ramadhan, dan berhaji ke Baitullah jika engkau mampu melakukannya.",
    orderIndex: 101,
  },
  {
    type: HafalanType.HADITS,
    haditsNumber: 3,
    title: "Hadits 3: Rukun Islam",
    arabicText: `بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ`,
    translation: "Islam dibangun di atas lima perkara: bersaksi bahwa tidak ada Tuhan yang berhak disembah kecuali Allah dan Muhammad adalah utusan Allah, mendirikan shalat, menunaikan zakat, berhaji ke Baitullah, dan berpuasa Ramadhan.",
    orderIndex: 102,
  },
];

async function main() {
  console.log("🌱 Seeding hafalan items...");

  for (const item of hafalanItems) {
    await prisma.hafalanItem.upsert({
      where: {
        id: `${item.type}-${item.surahNumber || item.haditsNumber}-${item.ayahStart || 0}`,
      },
      update: item,
      create: {
        id: `${item.type}-${item.surahNumber || item.haditsNumber}-${item.ayahStart || 0}`,
        ...item,
      },
    });
    console.log(`  ✓ ${item.title}`);
  }

  console.log(`\n✅ Seeded ${hafalanItems.length} hafalan items!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
