import type { ImageSourcePropType } from 'react-native';

export type BeachWaterType = 'Deniz' | 'Göl';
export type BeachDistrict = 'Mudanya' | 'Gemlik' | 'Karacabey' | 'İznik' | 'Orhangazi';
export type BeachFacility = boolean | null;

export type BursaBeach = {
  id: string;
  name: string;
  city: 'Bursa';
  district: BeachDistrict;
  area: string;
  category: 'Sahil';
  waterType: BeachWaterType;
  summary: string;
  latitude: number | null;
  longitude: number | null;
  image: ImageSourcePropType;
  imageIsPlaceholder: boolean;
  surface: 'Kum' | 'Çakıl' | 'Karışık' | null;
  access: 'Ücretsiz' | 'Ücretli' | null;
  parking: BeachFacility;
  toilet: BeachFacility;
  shower: BeachFacility;
  changingRoom: BeachFacility;
  sunbed: BeachFacility;
  umbrella: BeachFacility;
  food: BeachFacility;
  familyFriendly: BeachFacility;
  childFriendly: BeachFacility;
  camping: BeachFacility;
  blueFlag: boolean;
  blueFlagYear: number | null;
  waterQuality: null;
  waterQualityDate: null;
  waterQualitySource: string | null;
  sourceUrl: string;
};

const placeholder = require('../assets/bursa/beach-placeholder.jpg');
const official2026 = 'https://www.bursa.bel.tr/haber/bursa-plajlari-yaza-hazir-37227';
const officialInventory = 'https://webdosya.csb.gov.tr/db/bursa/duyurular/5000_plan-aciklama-raporu-20180320133117.pdf';
const coordinateStudy = 'https://dergipark.org.tr/en/download/article-file/4653659';

type BeachSeed = [string, string, BeachDistrict, string, BeachWaterType, number | null, number | null, boolean, boolean, string?];

const seeds: BeachSeed[] = [
  ['burgaz-halk', 'Burgaz Halk Plajı', 'Mudanya', 'Burgaz', 'Deniz', 40.360564, 28.915482, true, false],
  ['burgaz-altinkum', 'Burgaz Altınkum Halk Plajı', 'Mudanya', 'Burgaz', 'Deniz', 40.356801, 28.940741, true, false],
  ['guzelyali-sahili', 'Güzelyalı Sahili', 'Mudanya', 'Güzelyalı', 'Deniz', 40.3564019, 28.9242175, false, false, 'https://www.beachatlas.com/guzelyal-sahili'],
  ['altintas', 'Altıntaş Halk Plajı', 'Mudanya', 'Altıntaş', 'Deniz', 40.356554, 28.971953, true, false],
  ['kumyaka', 'Kumyaka Plajı', 'Mudanya', 'Kumyaka', 'Deniz', 40.385797, 28.827732, true, false],
  ['zeytinbagi', 'Zeytinbağı / Tirilye Halk Plajı', 'Mudanya', 'Tirilye', 'Deniz', 40.391404, 28.803451, true, false],
  ['tirilye-sahili', 'Tirilye Sahili', 'Mudanya', 'Tirilye merkez', 'Deniz', 40.391404, 28.803451, false, false, officialInventory],
  ['coskunoz', 'Coşkunöz Plajı', 'Mudanya', 'Mudanya kıyısı', 'Deniz', 40.382264, 28.877543, true, false],
  ['egerce', 'Eğerce Halk Plajı', 'Mudanya', 'Eğerce', 'Deniz', 40.364926, 28.630684, true, false],
  ['eskel', 'Eşkel / Esence Halk Plajı', 'Mudanya', 'Esence (Eşkel)', 'Deniz', 40.362955, 28.670669, true, true],
  ['mesudiye-ayazma', 'Mesudiye Ayazma Plajı', 'Mudanya', 'Mesudiye', 'Deniz', 40.370194, 28.598117, true, false],
  ['sogutpinar', 'Söğütpınar Sahili', 'Mudanya', 'Söğütpınar', 'Deniz', null, null, false, false, officialInventory],
  ['ketendere', 'Ketendere Sahili', 'Mudanya', 'Esence · Ketendere', 'Deniz', 40.3763873, 28.7126111, false, false, 'https://www.beachatlas.com/ketendere-sahili'],

  ['kumsaz', 'Kumsaz Halk Plajı', 'Gemlik', 'Kumsaz', 'Deniz', 40.384925, 29.06943, true, false],
  ['gemsaz', 'Gemsaz Plajı', 'Gemlik', 'Gemsaz', 'Deniz', 40.416962, 29.100608, true, false],
  ['kursunlu-gemlik', 'Kurşunlu Plajı', 'Gemlik', 'Kurşunlu Siteler önü', 'Deniz', null, null, false, false, officialInventory],
  ['kursunlu-kadinlar', 'Kurşunlu Kadınlar Plajı', 'Gemlik', 'Kurşunlu', 'Deniz', 40.364283, 29.036363, true, false],
  ['kucukkumla', 'Küçük Kumla Sahili', 'Gemlik', 'Küçükkumla', 'Deniz', 40.46417, 29.104912, true, false],
  ['buyukkumla', 'Büyükkumla Halk Plajı', 'Gemlik', 'Büyükkumla', 'Deniz', 40.476489, 29.084309, true, false],
  ['narli', 'Narlı Halk Plajı', 'Gemlik', 'Narlı', 'Deniz', 40.479217, 29.036347, true, false],
  ['karacaali', 'Karacaali Sahili', 'Gemlik', 'Karacaali', 'Deniz', 40.478509, 29.056135, true, false],
  ['hasanaga-kadinlar', 'Hasanağa Kadınlar Plajı', 'Gemlik', 'Hasanağa', 'Deniz', 40.454352, 29.122133, true, false],

  ['yenikoy-bayramdere', 'Yeniköy / Bayramdere Halk Plajı', 'Karacabey', 'Bayramdere · Yeniköy', 'Deniz', 40.398482, 28.374206, true, false],
  ['malkara', 'Malkara Plajı', 'Karacabey', 'Bayramdere · Malkara', 'Deniz', 40.400727, 28.348805, true, true],
  ['kursunlu-karacabey', 'Kurşunlu Halk Plajı', 'Karacabey', 'Kurşunlu', 'Deniz', 40.39714, 28.292495, true, true],

  ['inciralti-iznik', 'İnciraltı Halk Plajı', 'İznik', 'İnciraltı mevkii', 'Göl', 40.42654, 29.7111128, true, true, official2026],
  ['golluce', 'Göllüce Halk Plajı', 'İznik', 'Göllüce', 'Göl', 40.384729851, 29.607436306, true, false, 'https://www.yuzmekolik.com/bursa-yuzme-kursu/golluce-halk-plaji'],
  ['darka', 'Darka Tatil Köyü Yüzme Alanı', 'İznik', 'Selçuk', 'Göl', 40.41028, 29.70469, true, false, 'https://www.darka.org.tr/iletisim'],
  ['orhangazi-halk', 'Orhangazi Halk Plajı', 'Orhangazi', 'Örnekköy · İznik Gölü kıyısı', 'Göl', 40.464371, 29.335169, true, false, officialInventory],
];

const summaryFor = (name: string, area: string, waterType: BeachWaterType, monitored: boolean) =>
  `${area} kıyısındaki ${name}, ${waterType === 'Deniz' ? 'Marmara Denizi' : 'İznik Gölü'} manzarası sunan ${monitored ? 'resmî olarak izlenen bir yüzme alanıdır' : 'bir sahil durağıdır'}. Tesisler ve yüzme koşulları sezona göre değişebileceğinden güncel uyarıları yerinde kontrol edin.`;

export const bursaBeaches: BursaBeach[] = seeds.map(([id, name, district, area, waterType, latitude, longitude, monitored, blueFlag, source]) => ({
  id: `beach-${id}`,
  name,
  city: 'Bursa',
  district,
  area,
  category: 'Sahil',
  waterType,
  summary: summaryFor(name, area, waterType, monitored),
  latitude,
  longitude,
  image: placeholder,
  imageIsPlaceholder: true,
  surface: null,
  access: null,
  parking: null,
  toilet: null,
  shower: null,
  changingRoom: null,
  sunbed: null,
  umbrella: null,
  food: null,
  familyFriendly: null,
  childFriendly: null,
  camping: null,
  blueFlag,
  blueFlagYear: blueFlag ? 2026 : null,
  waterQuality: null,
  waterQualityDate: null,
  waterQualitySource: null,
  sourceUrl: source ?? (blueFlag ? official2026 : monitored ? coordinateStudy : officialInventory),
}));

export const beachDistricts: Array<'Tümü' | BeachDistrict> = ['Tümü', 'Mudanya', 'Gemlik', 'Karacabey', 'İznik', 'Orhangazi'];
export const beachWaterTypes: Array<'Tümü' | BeachWaterType> = ['Tümü', 'Deniz', 'Göl'];
