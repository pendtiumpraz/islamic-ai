import { PrismaClient, HafalanType, Tier } from "@prisma/client";

const prisma = new PrismaClient();

// Hadits Arba'in Nawawi (42 Hadits)
const haditsArbain = [
  { number: 1, title: "Niat", arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ", translation: "Sesungguhnya setiap amal tergantung pada niatnya" },
  { number: 2, title: "Islam, Iman, Ihsan", arabic: "أَنْ تَعْبُدَ اللَّهَ كَأَنَّكَ تَرَاهُ", translation: "Engkau beribadah kepada Allah seakan-akan engkau melihat-Nya" },
  { number: 3, title: "Rukun Islam", arabic: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ", translation: "Islam dibangun di atas lima perkara" },
  { number: 4, title: "Penciptaan Manusia", arabic: "إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ", translation: "Sesungguhnya penciptaan kalian dikumpulkan dalam perut ibu" },
  { number: 5, title: "Bid'ah", arabic: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ", translation: "Barangsiapa membuat perkara baru dalam urusan kami yang bukan bagian darinya, maka tertolak" },
  { number: 6, title: "Halal dan Haram", arabic: "إِنَّ الْحَلَالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ", translation: "Sesungguhnya yang halal itu jelas dan yang haram itu jelas" },
  { number: 7, title: "Agama adalah Nasihat", arabic: "الدِّينُ النَّصِيحَةُ", translation: "Agama adalah nasihat" },
  { number: 8, title: "Kesucian Darah Muslim", arabic: "أُمِرْتُ أَنْ أُقَاتِلَ النَّاسَ حَتَّى يَشْهَدُوا", translation: "Aku diperintahkan untuk memerangi manusia hingga mereka bersaksi" },
  { number: 9, title: "Larangan Berlebihan", arabic: "مَا نَهَيْتُكُمْ عَنْهُ فَاجْتَنِبُوهُ", translation: "Apa yang aku larang darinya, maka jauhilah" },
  { number: 10, title: "Makanan Halal", arabic: "إِنَّ اللَّهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا", translation: "Sesungguhnya Allah itu baik, tidak menerima kecuali yang baik" },
  { number: 11, title: "Wara'", arabic: "دَعْ مَا يَرِيبُكَ إِلَى مَا لَا يَرِيبُكَ", translation: "Tinggalkan apa yang meragukanmu kepada yang tidak meragukanmu" },
  { number: 12, title: "Meninggalkan yang Tidak Bermanfaat", arabic: "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ", translation: "Termasuk kebaikan Islam seseorang adalah meninggalkan apa yang tidak bermanfaat baginya" },
  { number: 13, title: "Cinta Saudara", arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ", translation: "Tidak beriman salah seorang dari kalian sampai ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya" },
  { number: 14, title: "Kesucian Darah Muslim 2", arabic: "لَا يَحِلُّ دَمُ امْرِئٍ مُسْلِمٍ إِلَّا بِإِحْدَى ثَلَاثٍ", translation: "Tidak halal darah seorang muslim kecuali karena tiga perkara" },
  { number: 15, title: "Berkata Baik", arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ", translation: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah berkata baik atau diam" },
  { number: 16, title: "Larangan Marah", arabic: "لَا تَغْضَبْ", translation: "Jangan marah" },
  { number: 17, title: "Ihsan", arabic: "إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ", translation: "Sesungguhnya Allah mewajibkan ihsan pada segala sesuatu" },
  { number: 18, title: "Takwa dan Akhlak", arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ", translation: "Bertakwalah kepada Allah di mana pun engkau berada" },
  { number: 19, title: "Menjaga Allah", arabic: "احْفَظِ اللَّهَ يَحْفَظْكَ", translation: "Jagalah Allah, niscaya Allah menjagamu" },
  { number: 20, title: "Malu", arabic: "إِنَّ مِمَّا أَدْرَكَ النَّاسُ مِنْ كَلَامِ النُّبُوَّةِ الْأُولَى إِذَا لَمْ تَسْتَحِ فَاصْنَعْ مَا شِئْتَ", translation: "Di antara yang diperoleh manusia dari kalimat kenabian terdahulu: jika engkau tidak malu, berbuatlah sesukamu" },
  { number: 21, title: "Istiqamah", arabic: "قُلْ آمَنْتُ بِاللَّهِ ثُمَّ اسْتَقِمْ", translation: "Katakanlah: Aku beriman kepada Allah, kemudian istiqamahlah" },
  { number: 22, title: "Jalan Menuju Surga", arabic: "أَرَأَيْتَ إِنْ صَلَّيْتُ الْمَكْتُوبَاتِ", translation: "Bagaimana pendapatmu jika aku shalat yang wajib..." },
  { number: 23, title: "Bersuci dan Shalat", arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ", translation: "Bersuci adalah separuh iman" },
  { number: 24, title: "Larangan Zalim", arabic: "يَا عِبَادِي إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي", translation: "Wahai hamba-Ku, sesungguhnya Aku haramkan kezaliman atas diri-Ku" },
  { number: 25, title: "Sedekah", arabic: "كُلُّ سُلَامَى مِنَ النَّاسِ عَلَيْهِ صَدَقَةٌ", translation: "Setiap persendian manusia wajib atasnya sedekah" },
  { number: 26, title: "Kebaikan", arabic: "كُلُّ مَعْرُوفٍ صَدَقَةٌ", translation: "Setiap kebaikan adalah sedekah" },
  { number: 27, title: "Birr dan Itsm", arabic: "الْبِرُّ حُسْنُ الْخُلُقِ", translation: "Kebaikan adalah akhlak yang baik" },
  { number: 28, title: "Berpegang pada Sunnah", arabic: "عَلَيْكُمْ بِسُنَّتِي وَسُنَّةِ الْخُلَفَاءِ الرَّاشِدِينَ", translation: "Wajib atas kalian berpegang pada sunnahku dan sunnah khulafa rasyidin" },
  { number: 29, title: "Pintu Kebaikan", arabic: "أَلَا أَدُلُّكَ عَلَى أَبْوَابِ الْخَيْرِ", translation: "Maukah aku tunjukkan pintu-pintu kebaikan?" },
  { number: 30, title: "Batasan Allah", arabic: "إِنَّ اللَّهَ فَرَضَ فَرَائِضَ فَلَا تُضَيِّعُوهَا", translation: "Sesungguhnya Allah mewajibkan kewajiban, maka jangan sia-siakan" },
  { number: 31, title: "Zuhud", arabic: "ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ", translation: "Zuhudlah terhadap dunia, niscaya Allah mencintaimu" },
  { number: 32, title: "Tidak Boleh Membahayakan", arabic: "لَا ضَرَرَ وَلَا ضِرَارَ", translation: "Tidak boleh membahayakan diri sendiri dan orang lain" },
  { number: 33, title: "Bukti dan Sumpah", arabic: "الْبَيِّنَةُ عَلَى الْمُدَّعِي وَالْيَمِينُ عَلَى مَنْ أَنْكَرَ", translation: "Bukti atas penggugat dan sumpah atas yang mengingkari" },
  { number: 34, title: "Amar Ma'ruf Nahi Munkar", arabic: "مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ", translation: "Barangsiapa di antara kalian melihat kemungkaran, hendaklah ia mengubahnya dengan tangannya" },
  { number: 35, title: "Persaudaraan", arabic: "لَا تَحَاسَدُوا وَلَا تَنَاجَشُوا وَلَا تَبَاغَضُوا", translation: "Jangan saling hasad, jangan najasy, jangan saling membenci" },
  { number: 36, title: "Menolong Sesama", arabic: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا", translation: "Barangsiapa melapangkan kesusahan seorang mukmin dari kesusahan dunia" },
  { number: 37, title: "Pahala Kebaikan dan Keburukan", arabic: "إِنَّ اللَّهَ كَتَبَ الْحَسَنَاتِ وَالسَّيِّئَاتِ", translation: "Sesungguhnya Allah mencatat kebaikan dan keburukan" },
  { number: 38, title: "Wali Allah", arabic: "مَنْ عَادَى لِي وَلِيًّا فَقَدْ آذَنْتُهُ بِالْحَرْبِ", translation: "Barangsiapa memusuhi wali-Ku, sungguh Aku mengumumkan perang kepadanya" },
  { number: 39, title: "Keringanan", arabic: "إِنَّ اللَّهَ تَجَاوَزَ لِي عَنْ أُمَّتِي الْخَطَأَ وَالنِّسْيَانَ", translation: "Sesungguhnya Allah memaafkan umatku dari kesalahan dan lupa" },
  { number: 40, title: "Musafir di Dunia", arabic: "كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ", translation: "Jadilah di dunia seakan-akan engkau orang asing atau musafir" },
  { number: 41, title: "Mengikuti Hawa Nafsu", arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يَكُونَ هَوَاهُ تَبَعًا لِمَا جِئْتُ بِهِ", translation: "Tidak beriman salah seorang dari kalian sampai hawa nafsunya mengikuti apa yang aku bawa" },
  { number: 42, title: "Ampunan Allah", arabic: "يَا ابْنَ آدَمَ إِنَّكَ مَا دَعَوْتَنِي وَرَجَوْتَنِي غَفَرْتُ لَكَ", translation: "Wahai anak Adam, selama engkau berdoa dan berharap kepada-Ku, Aku ampuni engkau" },
];

// Matan Ushul Tsalatsah
const matanUshulTsalatsah = [
  { number: 1, title: "Muqaddimah", arabic: "اعْلَمْ رَحِمَكَ اللهُ أَنَّهُ يَجِبُ عَلَيْنَا تَعَلُّمُ أَرْبَعِ مَسَائِلَ", translation: "Ketahuilah -semoga Allah merahmatimu- bahwa wajib atas kita mempelajari empat masalah" },
  { number: 2, title: "Masalah Pertama: Ilmu", arabic: "الْأُولَى: الْعِلْمُ، وَهُوَ مَعْرِفَةُ اللهِ، وَمَعْرِفَةُ نَبِيِّهِ", translation: "Pertama: Ilmu, yaitu mengenal Allah, mengenal Nabi-Nya" },
  { number: 3, title: "Masalah Kedua: Amal", arabic: "الثَّانِيَةُ: الْعَمَلُ بِهِ", translation: "Kedua: Mengamalkannya" },
  { number: 4, title: "Masalah Ketiga: Dakwah", arabic: "الثَّالِثَةُ: الدَّعْوَةُ إِلَيْهِ", translation: "Ketiga: Mendakwahkannya" },
  { number: 5, title: "Masalah Keempat: Sabar", arabic: "الرَّابِعَةُ: الصَّبْرُ عَلَى الْأَذَى فِيهِ", translation: "Keempat: Bersabar atas gangguan di dalamnya" },
  { number: 6, title: "Tiga Ushul", arabic: "الْأُصُولُ الثَّلَاثَةُ الَّتِي يَجِبُ عَلَى الْإِنْسَانِ مَعْرِفَتُهَا", translation: "Tiga ushul yang wajib diketahui manusia" },
  { number: 7, title: "Ushul Pertama: Mengenal Rabb", arabic: "الْأَصْلُ الْأَوَّلُ: مَعْرِفَةُ الرَّبِّ", translation: "Ushul Pertama: Mengenal Rabb" },
  { number: 8, title: "Ushul Kedua: Mengenal Islam", arabic: "الْأَصْلُ الثَّانِي: مَعْرِفَةُ دِينِ الْإِسْلَامِ بِالْأَدِلَّةِ", translation: "Ushul Kedua: Mengenal agama Islam dengan dalil-dalilnya" },
  { number: 9, title: "Ushul Ketiga: Mengenal Nabi", arabic: "الْأَصْلُ الثَّالِثُ: مَعْرِفَةُ نَبِيِّكُمْ مُحَمَّدٍ", translation: "Ushul Ketiga: Mengenal Nabi kalian Muhammad" },
  { number: 10, title: "Penutup", arabic: "وَالدَّلِيلُ عَلَى الْبَعْثِ قَوْلُهُ تَعَالَى", translation: "Dan dalil tentang kebangkitan adalah firman Allah Ta'ala" },
];

// Matan Qawa'idul Arba'
const matanQawaidulArba = [
  { number: 1, title: "Muqaddimah", arabic: "أَسْأَلُ اللَّهَ الْكَرِيمَ رَبَّ الْعَرْشِ الْعَظِيمِ أَنْ يَتَوَلَّاكَ فِي الدُّنْيَا وَالْآخِرَةِ", translation: "Aku memohon kepada Allah Yang Maha Mulia, Rabb 'Arsy yang agung, agar Dia melindungimu di dunia dan akhirat" },
  { number: 2, title: "Kaidah Pertama", arabic: "الْقَاعِدَةُ الْأُولَى: أَنْ تَعْلَمَ أَنَّ الْكُفَّارَ الَّذِينَ قَاتَلَهُمْ رَسُولُ اللَّهِ", translation: "Kaidah Pertama: Bahwa engkau mengetahui orang-orang kafir yang diperangi Rasulullah" },
  { number: 3, title: "Kaidah Kedua", arabic: "الْقَاعِدَةُ الثَّانِيَةُ: أَنَّهُمْ يَقُولُونَ مَا دَعَوْنَاهُمْ وَتَوَجَّهْنَا إِلَيْهِمْ إِلَّا لِطَلَبِ الْقُرْبَةِ وَالشَّفَاعَةِ", translation: "Kaidah Kedua: Bahwa mereka berkata: Kami tidak berdoa kepada mereka kecuali untuk mendekatkan diri dan syafa'at" },
  { number: 4, title: "Kaidah Ketiga", arabic: "الْقَاعِدَةُ الثَّالِثَةُ: أَنَّ النَّبِيَّ ظَهَرَ عَلَى أُنَاسٍ مُتَفَرِّقِينَ فِي عِبَادَاتِهِمْ", translation: "Kaidah Ketiga: Bahwa Nabi muncul di tengah manusia yang berbeda-beda dalam ibadah mereka" },
  { number: 5, title: "Kaidah Keempat", arabic: "الْقَاعِدَةُ الرَّابِعَةُ: أَنَّ مُشْرِكِي زَمَانِنَا أَغْلَظُ شِرْكًا مِنَ الْأَوَّلِينَ", translation: "Kaidah Keempat: Bahwa orang-orang musyrik zaman kita lebih parah syiriknya daripada yang terdahulu" },
];

async function main() {
  console.log("🌱 Seeding Hadits & Matan for Hafidz Mode...\n");

  // Seed Hadits Arbain
  console.log("📚 Seeding Hadits Arbain Nawawi...");
  for (const hadits of haditsArbain) {
    await prisma.hafalanItem.upsert({
      where: {
        id: `hadits-arbain-${hadits.number}`
      },
      update: {
        title: `Hadits ${hadits.number}: ${hadits.title}`,
        arabicText: hadits.arabic,
        translation: hadits.translation,
        minTier: Tier.FREE,
        orderIndex: hadits.number
      },
      create: {
        id: `hadits-arbain-${hadits.number}`,
        type: HafalanType.HADITS,
        title: `Hadits ${hadits.number}: ${hadits.title}`,
        arabicText: hadits.arabic,
        translation: hadits.translation,
        kitabId: "arbain-nawawi",
        haditsNumber: hadits.number,
        minTier: Tier.FREE,
        orderIndex: hadits.number
      }
    });
    console.log(`  ✓ Hadits ${hadits.number}: ${hadits.title}`);
  }

  // Seed Matan Ushul Tsalatsah
  console.log("\n📜 Seeding Matan Ushul Tsalatsah...");
  for (const matan of matanUshulTsalatsah) {
    await prisma.hafalanItem.upsert({
      where: {
        id: `matan-ushul-${matan.number}`
      },
      update: {
        title: `${matan.number}. ${matan.title}`,
        arabicText: matan.arabic,
        translation: matan.translation,
        minTier: Tier.FREE,
        orderIndex: matan.number
      },
      create: {
        id: `matan-ushul-${matan.number}`,
        type: HafalanType.MATAN,
        title: `${matan.number}. ${matan.title}`,
        arabicText: matan.arabic,
        translation: matan.translation,
        kitabId: "ushul-tsalatsah",
        babNumber: matan.number,
        minTier: Tier.FREE,
        orderIndex: matan.number
      }
    });
    console.log(`  ✓ ${matan.title}`);
  }

  // Seed Matan Qawa'idul Arba'
  console.log("\n📜 Seeding Matan Qawa'idul Arba'...");
  for (const matan of matanQawaidulArba) {
    await prisma.hafalanItem.upsert({
      where: {
        id: `matan-qawaid-${matan.number}`
      },
      update: {
        title: `${matan.number}. ${matan.title}`,
        arabicText: matan.arabic,
        translation: matan.translation,
        minTier: Tier.FREE,
        orderIndex: matan.number
      },
      create: {
        id: `matan-qawaid-${matan.number}`,
        type: HafalanType.MATAN,
        title: `${matan.number}. ${matan.title}`,
        arabicText: matan.arabic,
        translation: matan.translation,
        kitabId: "qawaidul-arba",
        babNumber: matan.number,
        minTier: Tier.FREE,
        orderIndex: matan.number
      }
    });
    console.log(`  ✓ ${matan.title}`);
  }

  const totalHadits = haditsArbain.length;
  const totalMatan = matanUshulTsalatsah.length + matanQawaidulArba.length;
  
  console.log(`\n✅ Seeding complete!`);
  console.log(`   - ${totalHadits} Hadits Arbain Nawawi`);
  console.log(`   - ${matanUshulTsalatsah.length} Matan Ushul Tsalatsah`);
  console.log(`   - ${matanQawaidulArba.length} Matan Qawa'idul Arba'`);
  console.log(`   - Total: ${totalHadits + totalMatan} items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
