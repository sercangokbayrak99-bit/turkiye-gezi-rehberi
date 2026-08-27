import type { ImageSourcePropType } from 'react-native';

export type IstanbulBeachSide = 'Avrupa Yakası' | 'Anadolu Yakası' | 'Adalar';
export type IstanbulSea = 'Marmara' | 'Karadeniz';
export type IstanbulBeachType = 'public_beach' | 'private_beach' | 'beach_club' | 'coast' | 'bay' | 'cove';
export type IstanbulBeachAccess = 'Ücretsiz' | 'Ücretli' | null;
export type IstanbulBeachFacility = boolean | null;

export type IstanbulBeach = {
  id: string;
  name: string;
  city: 'İstanbul';
  district: string;
  area: string;
  side: IstanbulBeachSide;
  category: 'Sahil';
  placeType: IstanbulBeachType;
  sea: IstanbulSea;
  summary: string;
  latitude: number | null;
  longitude: number | null;
  image: ImageSourcePropType;
  imageIsPlaceholder: boolean;
  imageCredit: string | null;
  imagePage: string | null;
  surface: 'Kum' | 'Çakıl' | 'Kayalık' | 'Karışık' | null;
  access: IstanbulBeachAccess;
  operator: 'İBB' | 'İlçe Belediyesi' | 'Özel işletme' | null;
  entryFee: number | null;
  entryFeeYear: number | null;
  parking: IstanbulBeachFacility;
  toilet: IstanbulBeachFacility;
  shower: IstanbulBeachFacility;
  changingRoom: IstanbulBeachFacility;
  sunbed: IstanbulBeachFacility;
  umbrella: IstanbulBeachFacility;
  food: IstanbulBeachFacility;
  familyFriendly: IstanbulBeachFacility;
  childFriendly: IstanbulBeachFacility;
  camping: IstanbulBeachFacility;
  picnic: IstanbulBeachFacility;
  blueFlag: boolean;
  blueFlagYear: number | null;
  lifeguardAvailable: IstanbulBeachFacility;
  accessible: IstanbulBeachFacility;
  waterQuality: null;
  waterQualityDate: null;
  waterQualitySource: string | null;
  seaWarning: string | null;
  swimmingRisk: null;
  officialSwimmingAreaYear: number | null;
  sourceUrl: string;
};

const placeholder = require('../assets/bursa/beach-placeholder.jpg');
const beachPhotos: Record<string, { image: ImageSourcePropType; credit: string; page: string }> = {
  'karaburun-halk': { image: require('../assets/istanbul/beaches/karaburun-halk.jpg'), credit: 'KabloGruplama · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Karaburun_halk_plaj%C4%B1.jpg' },
  'karaburun-sahil': { image: require('../assets/istanbul/beaches/karaburun-port.jpg'), credit: 'Khutuck · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Port_of_Karaburun.jpg' },
  ormanli: { image: require('../assets/istanbul/beaches/ormanli.jpg'), credit: 'nami yildirim · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Ormanl%C4%B1_sahili_-_yama%C3%A7_para%C5%9F%C3%BCt%C3%BC_-_panoramio.jpg' },
  denizkoskler: { image: require('../assets/istanbul/beaches/denizkoskler.jpg'), credit: 'Karacehennem · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Avc%C4%B1lar_Coastal_Park_31.jpg' },
  albatros: { image: require('../assets/istanbul/beaches/albatros.jpg'), credit: 'buzkozan · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Albatros_ve_Marmara_Denizi_-_panoramio.jpg' },
  'yesilkoy-polis': { image: require('../assets/istanbul/beaches/yesilkoy-ciroz.jpg'), credit: 'alafortanfuni · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Ye%C5%9Filk%C3%B6y_%C3%87iroz_Plaj%C4%B1_-_panoramio_-_alafortanfuni_(1).jpg' },
  'rumeli-feneri': { image: require('../assets/istanbul/beaches/rumeli-feneri.jpg'), credit: 'Robin.r · CC0', page: 'https://commons.wikimedia.org/wiki/File:View_from_Rumeli_Feneri_Kalesi.jpg' },
  'rumeli-kavagi': { image: require('../assets/istanbul/beaches/rumeli-kavagi.jpg'), credit: 'Canercangul · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Rumeli_Kava%C4%9F%C4%B1.jpg' },
  'tuzla-halk': { image: require('../assets/istanbul/beaches/tuzla-sahil.jpg'), credit: 'Tuzla Belediyesi · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Tuzla_Sahil.jpg' },
  'burgazada-su-sporlari': { image: require('../assets/istanbul/beaches/burgazada-marina.jpg'), credit: 'Barış Tarim · Kamu malı', page: 'https://commons.wikimedia.org/wiki/File:The_Marina_of_Burgazada,_Istanbul,_on_a_summer_evening,_as_seen_from_the_inner_city_ferries.jpg' },
  'burgazada-deniz-kulubu': { image: require('../assets/istanbul/beaches/burgazada-marina.jpg'), credit: 'Barış Tarim · Kamu malı', page: 'https://commons.wikimedia.org/wiki/File:The_Marina_of_Burgazada,_Istanbul,_on_a_summer_evening,_as_seen_from_the_inner_city_ferries.jpg' },
  degirmenburnu: { image: require('../assets/istanbul/beaches/degirmenburnu.jpg'), credit: 'Ceyda Turus · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:De%C4%9Firmenburnu_Tabiat_Park%C4%B1.jpg' },
  'ada-beach': { image: require('../assets/istanbul/beaches/cam-limani.jpg'), credit: 'Oystercard · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:View_over_%C3%87am_Liman%C4%B1_Bay_and_the_old_sanatorium_on_Heybeliada,_Istanbul.jpg' },
  tarabya: { image: require('../assets/istanbul/beaches/tarabya.jpg'), credit: 'Atasoy.emrah · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Tarabya,_%C4%B0stanbul.jpg' },
  mimarsinan: { image: require('../assets/istanbul/beaches/mimarsinan.jpg'), credit: 'Nevit Dilmen · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Windsurfing_Mimarsinan_Istanbul_1120225.jpg' },
  'kilyos-halk': { image: require('../assets/istanbul/kilyos.jpg'), credit: 'eleesege · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Kylyos_Beach_on_the_Black_Sea,_Turkey_-_panoramio.jpg' },
  ayazma: { image: require('../assets/istanbul/beaches/sile-beach.jpg'), credit: 'Özgür Okkalı · CC BY-SA 2.5', page: 'https://commons.wikimedia.org/wiki/File:Silebeach.JPG' },
  'caddebostan-1': { image: require('../assets/istanbul/caddebostan.jpg'), credit: 'Raicem · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Caddebostan_Coastal_Park.jpg' },
  'caddebostan-2': { image: require('../assets/istanbul/caddebostan.jpg'), credit: 'Raicem · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Caddebostan_Coastal_Park.jpg' },
  'caddebostan-3': { image: require('../assets/istanbul/caddebostan.jpg'), credit: 'Raicem · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Caddebostan_Coastal_Park.jpg' },
  'yalikoy-1': { image: require('../assets/istanbul/beaches/yalikoy.jpg'), credit: 'CeeGee · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Yal%C4%B1k%C3%B6y_(1).jpg' },
  'yalikoy-2': { image: require('../assets/istanbul/beaches/yalikoy.jpg'), credit: 'CeeGee · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Yal%C4%B1k%C3%B6y_(1).jpg' },
  'buyukcekmece-halk': { image: require('../assets/istanbul/beaches/buyukcekmece.jpg'), credit: 'buzkozan · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:B%C3%BCy%C3%BCk%C3%A7ekmece_Plaj%C4%B1_Panoramas%C4%B1,_May%C4%B1s_2014_-_panoramio.jpg' },
  'gurpinar-halk': { image: require('../assets/istanbul/beaches/gurpinar.jpg'), credit: 'buzkozan · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Beylikd%C3%BCz%C3%BC_Sahil_Band%C4%B1_Beylikd%C3%BCz%C3%BC_Plaj%C4%B1_May%C4%B1s_2014.JPG' },
  cilingoz: { image: require('../assets/istanbul/beaches/cilingoz.jpg'), credit: 'ClairDeLune9630 · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:%C3%87ilingoz_Beach.jpg' },
  gumusyaka: { image: require('../assets/istanbul/beaches/gumusyaka.jpg'), credit: 'by rock · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:G%C3%BCm%C3%BC%C5%9Fyaka_beach_-_panoramio.jpg' },
  kumburgaz: { image: require('../assets/istanbul/beaches/kumburgaz.jpg'), credit: 'Defnealamutt · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Sunset_Kumburgaz.jpg' },
  menekse: { image: require('../assets/istanbul/beaches/menekse.jpg'), credit: 'buzkozan · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Menek%C5%9Fe_plaj%C4%B1_k%C4%B1%C5%9F_manzaras%C4%B1_-_panoramio.jpg' },
  'semizkum-basinkent': { image: require('../assets/istanbul/beaches/semizkum.jpg'), credit: 'Maderibeyza · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Semizkumlar.JPG' },
  'semizkum-cadir': { image: require('../assets/istanbul/beaches/semizkum.jpg'), credit: 'Maderibeyza · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Semizkumlar.JPG' },
  'burc-beach': { image: require('../assets/istanbul/beaches/burc-beach.jpg'), credit: 'VikiPicture · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Bo%C4%9Fazi%C3%A7i_%C3%9Cniversitesi_BURCBeach_Kilyos.jpg' },
  dalya: { image: require('../assets/istanbul/beaches/dalya.jpg'), credit: 'Ozan Kilic · CC BY 2.0', page: 'https://commons.wikimedia.org/wiki/File:Kilyos_Dalia_beach.jpg' },
  'tirmata-beach': { image: require('../assets/istanbul/beaches/tirmata.jpg'), credit: 'Ersin Biçer · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:T%C4%B1rmata_Beach_-_panoramio_(1).jpg' },
  'riva-elmasburnu': { image: require('../assets/istanbul/riva.jpg'), credit: 'Nevit Dilmen · GFDL / CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Riva_deresi_1080232_1080262.jpg' },
  'riva-halk': { image: require('../assets/istanbul/riva.jpg'), credit: 'Nevit Dilmen · GFDL / CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Riva_deresi_1080232_1080262.jpg' },
  'riva-su-urunleri': { image: require('../assets/istanbul/riva.jpg'), credit: 'Nevit Dilmen · GFDL / CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Riva_deresi_1080232_1080262.jpg' },
  imrenli: { image: require('../assets/istanbul/beaches/imrenli.jpg'), credit: 'Thafer · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:34980_%C4%B0mrenli-%C5%9Eile-%C4%B0stanbul,_Turkey_-_panoramio_-_Thafer_(1).jpg' },
  alacali: { image: require('../assets/istanbul/beaches/alacali.jpg'), credit: 'Aniosgel · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:Beach_of_Alacal%C4%B1,_%C5%9Eile..JPG' },
  aglayankaya: { image: require('../assets/istanbul/beaches/aglayankaya.jpg'), credit: 'Sakaerka · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Beach_in_%C5%9Eile.jpg' },
  'aglayankaya-life': { image: require('../assets/istanbul/beaches/aglayankaya.jpg'), credit: 'Sakaerka · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Beach_in_%C5%9Eile.jpg' },
  'agva-camlik': { image: require('../assets/istanbul/beaches/agva-coast.jpg'), credit: 'Cemal · CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Sunset_in_Agva,_Istanbul.jpg' },
  'agva-mendirek': { image: require('../assets/istanbul/beaches/agva-coast.jpg'), credit: 'Cemal · CC BY-SA 2.0', page: 'https://commons.wikimedia.org/wiki/File:Sunset_in_Agva,_Istanbul.jpg' },
  'kilimli-koyu': { image: require('../assets/istanbul/beaches/kilimli-koyu.jpg'), credit: 'Emregulerx · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Kilimli_Koyu.jpg' },
  'kadirga-koyu': { image: require('../assets/istanbul/beaches/kadirga-koyu.jpg'), credit: 'Karakartal34 · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Kad%C4%B1rgal%C4%B1_Koyu,_A%C4%9Fva,_%C5%9Eile.jpg' },
  'kinaliada-su-sporlari': { image: require('../assets/istanbul/beaches/kinaliada-coast.jpg'), credit: 'Jorge Franganillo · CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Istanbul_-_K%C4%B1nal%C4%B1ada_(55108238871).jpg' },
  'kinaliada-iskele-sag': { image: require('../assets/istanbul/beaches/kinaliada-coast.jpg'), credit: 'Jorge Franganillo · CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Istanbul_-_K%C4%B1nal%C4%B1ada_(55108238871).jpg' },
  'kinaliada-iskele-sol': { image: require('../assets/istanbul/beaches/kinaliada-coast.jpg'), credit: 'Jorge Franganillo · CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Istanbul_-_K%C4%B1nal%C4%B1ada_(55108238871).jpg' },
};
const governorSource = 'https://www.istanbul.gov.tr/yuzme-alani-ve-plajlarla-ilgili-karar';
const ibb2025Source = 'https://destekhizmetleri.ibb.istanbul/haberler/ibb-plajlari-3-haziranda-sezona-merhaba-diyor/';
const healthSource = 'https://istanbulism.saglik.gov.tr/TR-109719/deniz-suyu-plajlar.html';

type Seed = [string, string, string, string, IstanbulBeachSide, IstanbulSea, IstanbulBeachType, number | null, number | null, IstanbulBeachAccess?, ('İBB' | 'İlçe Belediyesi' | 'Özel işletme' | null)?, string?];

const seeds: Seed[] = [
  ['karaburun-halk', 'Karaburun Halk Plajı', 'Arnavutköy', 'Karaburun ön deniz', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.341394, 28.687696, null, null],
  ['karaburun-sahil', 'Karaburun Sahili', 'Arnavutköy', 'Karaburun arka deniz', 'Avrupa Yakası', 'Karadeniz', 'coast', 41.343856, 28.678239, null, null],
  ['yenikoy-plaji', 'Yeniköy Halk Plajı', 'Arnavutköy', 'Yeniköy sahili', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.328949, 28.717453, 'Ücretsiz', 'İBB', ibb2025Source],

  ['cilingoz', 'Çilingoz Tabiat Parkı Plajı', 'Çatalca', 'Binkılıç · Çilingoz', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.52516, 28.21993, 'Ücretli', null],
  ['yalikoy-1', 'Yalıköy Plajı 1', 'Çatalca', 'Karacaköy · Yalıköy', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.48824, 28.29164, 'Ücretsiz', 'İBB', ibb2025Source],
  ['yalikoy-2', 'Yalıköy Plajı 2', 'Çatalca', 'Karacaköy · Çobankule', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.48137, 28.30943, 'Ücretsiz', 'İBB', ibb2025Source],
  ['evcik', 'Evcik Plajı', 'Çatalca', 'Karacaköy · Evcik', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.4512, 28.38266, null, null],
  ['ormanli', 'Ormanlı Plajı', 'Çatalca', 'Karacaköy · Ormanlı', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.4107, 28.48671, null, null],

  ['kilyos-halk', 'Kilyos Halk Plajı', 'Sarıyer', 'Kilyos', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.245976, 29.007791, null, null],
  ['gumusdere', 'Gümüşdere Plajı', 'Sarıyer', 'Gümüşdere', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.249313, 28.990149, null, null],
  ['uzunya', 'Uzunya Plajı', 'Sarıyer', 'Demirciköy', 'Avrupa Yakası', 'Karadeniz', 'private_beach', 41.248281, 29.071005, 'Ücretli', 'Özel işletme'],
  ['dalya', 'Dalya Plajı', 'Sarıyer', 'Demirciköy', 'Avrupa Yakası', 'Karadeniz', 'private_beach', 41.251151, 29.0633627, 'Ücretli', 'Özel işletme'],
  ['kisirkaya', 'Kısırkaya Halk Plajı', 'Sarıyer', 'Kısırkaya', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.252402, 28.974146, 'Ücretsiz', 'İBB', ibb2025Source],
  ['rumeli-feneri', 'Rumeli Feneri Plajı', 'Sarıyer', 'Rumeli Feneri · Gençlik Kampı', 'Avrupa Yakası', 'Karadeniz', 'public_beach', 41.244518, 29.091241, null, null],
  ['rumeli-kavagi', 'Rumeli Kavağı Plajı', 'Sarıyer', 'Rumeli Kavağı', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.185617, 29.077163, null, null],
  ['tarabya', 'Tarabya Plajı', 'Sarıyer', 'Tarabya', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.13718, 29.057551, null, null],
  ['burc-beach', 'Burç Beach', 'Sarıyer', 'Gümüşdere · Kilyos', 'Avrupa Yakası', 'Karadeniz', 'beach_club', null, null, 'Ücretli', 'Özel işletme', 'https://www.burcbeach.com/'],
  ['solar-beach', 'Solar Beach', 'Sarıyer', 'Kilyos', 'Avrupa Yakası', 'Karadeniz', 'beach_club', null, null, 'Ücretli', 'Özel işletme', 'https://solarbeach.com.tr/'],
  ['tirmata-beach', 'Tırmata Beach', 'Sarıyer', 'Kilyos', 'Avrupa Yakası', 'Karadeniz', 'beach_club', null, null, 'Ücretli', 'Özel işletme', 'https://tirmata.com/'],

  ['denizkoskler', 'Denizköşkler Yüzme Alanı', 'Avcılar', 'Denizköşkler', 'Avrupa Yakası', 'Marmara', 'public_beach', 40.9723903, 28.7131454, 'Ücretsiz', 'İBB', ibb2025Source],
  ['gunes-plaji', 'Florya Güneş Plajı', 'Bakırköy', 'Florya', 'Avrupa Yakası', 'Marmara', 'public_beach', null, null, 'Ücretli', 'İBB', ibb2025Source],
  ['yesilkoy-polis', 'Yeşilköy Polis Merkezi Önü Yüzme Alanı', 'Bakırköy', 'Yeşilköy', 'Avrupa Yakası', 'Marmara', 'public_beach', 40.955509, 28.827551, null, null],
  ['yesilkoy-hospital', 'Yeşilköy International Hospital Önü', 'Bakırköy', 'Yeşilköy', 'Avrupa Yakası', 'Marmara', 'public_beach', 40.95704, 28.8382, null, null],
  ['menekse', 'Menekşe Plajı', 'Küçükçekmece', 'Menekşe', 'Avrupa Yakası', 'Marmara', 'public_beach', 40.978825, 28.771793, 'Ücretsiz', 'İBB', ibb2025Source],
  ['gurpinar-halk', 'Gürpınar Halk Plajı', 'Beylikdüzü', 'Gürpınar sahili', 'Avrupa Yakası', 'Marmara', 'public_beach', 40.98177, 28.59843, null, null],
  ['west-marina', 'West İstanbul Marina Plajı', 'Beylikdüzü', 'Yakuplu', 'Avrupa Yakası', 'Marmara', 'private_beach', 40.96287, 28.65028, 'Ücretli', 'Özel işletme'],
  ['albatros', 'Albatros Halk Plajı', 'Büyükçekmece', 'Albatros sahili', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.0080706, 28.5997939, 'Ücretsiz', 'İBB', ibb2025Source],
  ['buyukcekmece-halk', 'Büyükçekmece Halk Plajı', 'Büyükçekmece', 'Merkez', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.0145553, 28.5944831, null, null],
  ['buyukcekmece-cocuk', 'Büyükçekmece Çocuk Sahili', 'Büyükçekmece', 'Merkez', 'Avrupa Yakası', 'Marmara', 'coast', 41.0138955, 28.5958457, null, null],
  ['mimarsinan', 'Mimarsinan Sahili', 'Büyükçekmece', 'Mimarsinan', 'Avrupa Yakası', 'Marmara', 'coast', 41.0134543, 28.5626909, null, null],
  ['kumburgaz', 'Kumburgaz Plajı', 'Büyükçekmece', 'Kumburgaz', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.0292002, 28.4548687, null, null],
  ['celaliye', 'Celaliye Halk Plajı', 'Büyükçekmece', 'Celaliye', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.0447562, 28.409121, null, null],
  ['kamiloba', 'Kamiloba Halk Plajı', 'Büyükçekmece', 'Kamiloba · Ağar Kamping', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.038839, 28.4285348, null, null],
  ['gumusyaka', 'Gümüşyaka Sahili', 'Silivri', 'Gümüşyaka', 'Avrupa Yakası', 'Marmara', 'coast', 41.047404, 28.054456, null, null],
  ['canta-kinali', 'Çanta / Kınalı Yüzme Alanı', 'Silivri', 'Çanta · Kınalı mevkii', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.058482, 28.093438, null, null],
  ['semizkum-basinkent', 'Semizkum Halk Plajı', 'Silivri', 'Semizkum · Başınkent', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.070004, 28.152449, 'Ücretsiz', 'İBB', ibb2025Source],
  ['semizkum-cadir', 'Semizkum Çadır Yerleri Yüzme Alanı', 'Silivri', 'Semizkum', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.071477, 28.159394, null, null],
  ['altinorak', 'Altınorak Yüzme Alanı', 'Silivri', 'Altınorak mevkii', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.073436, 28.176754, null, null],
  ['silivri-kumluk', 'Silivri Kumluk Halk Plajı', 'Silivri', 'Kumluk mevkii', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.077815, 28.223703, 'Ücretsiz', 'İBB', ibb2025Source],
  ['selimpasa-baskent', 'Selimpaşa Başkent Yüzme Alanı', 'Silivri', 'Selimpaşa', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.058036, 28.342925, null, null],
  ['selimpasa', 'Selimpaşa Halk Plajı', 'Silivri', 'Selimpaşa · Duruman', 'Avrupa Yakası', 'Marmara', 'public_beach', 41.053168, 28.371547, 'Ücretsiz', 'İBB', ibb2025Source],

  ['riva-elmasburnu', 'Riva Elmasburnu Plajı', 'Beykoz', 'Riva · Elmasburnu', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.229759, 29.218481, null, 'İlçe Belediyesi'],
  ['riva-halk', 'Riva Halk Plajı', 'Beykoz', 'Riva', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.22637, 29.21672, null, null],
  ['riva-su-urunleri', 'Riva Su Ürünleri Plajı', 'Beykoz', 'Riva', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.22847, 29.22937, null, null],

  ['dogancili', 'Doğancılı Plajı', 'Şile', 'Doğancılı', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.19834, 29.44989, null, null],
  ['imrenli', 'İmrenli Plajı', 'Şile', 'İmrenli', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.158467, 29.757676, null, null],
  ['kabakoz-sile', 'Kabakoz Plajı', 'Şile', 'Kabakoz', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.159049, 29.708649, null, null],
  ['sahilkoy', 'Sahilköy Plajı', 'Şile', 'Sahilköy', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.237933, 29.41043, null, null],
  ['sofular', 'Sofular Plajı', 'Şile', 'Sofular', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.18962, 29.48499, null, null],
  ['alacali', 'Alacalı Plajı', 'Şile', 'Alacalı', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.19117, 29.47916, null, null],
  ['aglayankaya', 'Ağlayankaya Plajı', 'Şile', 'Balibey', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.17536, 29.62505, null, null],
  ['aglayankaya-life', 'Ağlayankaya Life Beach', 'Şile', 'Balibey', 'Anadolu Yakası', 'Karadeniz', 'beach_club', 41.17423, 29.62798, 'Ücretli', 'Özel işletme'],
  ['agva-camlik', 'Ağva Halk Plajı', 'Şile', 'Ağva · Çamlık', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.139101, 29.844851, null, null],
  ['agva-mendirek', 'Ağva Mendirek Yanı Plajı', 'Şile', 'Ağva', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.139973, 29.852122, null, null],
  ['akcakese', 'Akçakese Akkaya Plajı', 'Şile', 'Akçakese', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.155483, 29.733682, null, null],
  ['ayazma', 'Ayazma Plajı', 'Şile', 'Şile merkez', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.1725, 29.60024, null, null],
  ['kumbaba', 'Kumbaba Plajı', 'Şile', 'Kumbaba', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.1713132, 29.5816041, null, null],
  ['uzunkum', 'Uzunkum Plajı', 'Şile', 'Uzunkum', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.1710113, 29.6354095, null, null],
  ['bozgaca', 'Bozgaca Plajı', 'Şile', 'Bozgaca', 'Anadolu Yakası', 'Karadeniz', 'public_beach', 41.15751, 29.77541, null, null],
  ['north-beach', 'North Beach', 'Şile', 'Kumbaba batısı', 'Anadolu Yakası', 'Karadeniz', 'private_beach', 41.176284, 29.551997, 'Ücretli', 'Özel işletme'],
  ['peacock-beach', 'Peacock Beach', 'Şile', 'Akçakese', 'Anadolu Yakası', 'Karadeniz', 'beach_club', 41.15701, 29.724053, 'Ücretli', 'Özel işletme'],
  ['kilimli-koyu', 'Kilimli Koyu', 'Şile', 'Bucaklı · Ağva', 'Anadolu Yakası', 'Karadeniz', 'cove', null, null, null, null, 'https://www.istanbul.gov.tr/basin-aciklamasi-2026-331'],
  ['kadirga-koyu', 'Kadırga Koyu', 'Şile', 'Ağva çevresi', 'Anadolu Yakası', 'Karadeniz', 'cove', null, null, null, null],

  ['caddebostan-1', 'Caddebostan Plajı 1', 'Kadıköy', 'Caddebostan', 'Anadolu Yakası', 'Marmara', 'public_beach', 40.967977, 29.051458, 'Ücretli', 'İBB', ibb2025Source],
  ['caddebostan-2', 'Caddebostan Plajı 2', 'Kadıköy', 'Caddebostan', 'Anadolu Yakası', 'Marmara', 'public_beach', 40.964289, 29.056136, 'Ücretsiz', 'İBB', ibb2025Source],
  ['caddebostan-3', 'Caddebostan Plajı 3', 'Kadıköy', 'Caddebostan · Suadiye yönü', 'Anadolu Yakası', 'Marmara', 'public_beach', 40.958558, 29.071254, 'Ücretsiz', 'İBB', ibb2025Source],
  ['tuzla-halk', 'Tuzla Belediyesi Halk Plajı', 'Tuzla', 'Postane', 'Anadolu Yakası', 'Marmara', 'public_beach', null, null, null, 'İlçe Belediyesi'],

  ['burgazada-su-sporlari', 'Burgazada Su Sporları Kulübü Önü', 'Adalar', 'Burgazada', 'Adalar', 'Marmara', 'public_beach', 40.87891, 29.07236, null, null],
  ['aya-nikola', 'Aya Nikola Halk Plajı', 'Adalar', 'Büyükada · Aya Nikola', 'Adalar', 'Marmara', 'public_beach', 40.85444, 29.12534, null, null],
  ['halik-eskibag', 'Halik Koyu / Eskibağ Halk Plajı', 'Adalar', 'Büyükada · Halik Koyu', 'Adalar', 'Marmara', 'bay', 40.84899, 29.11368, null, null],
  ['blue-beach', 'Kayıkhane Blue Beach', 'Adalar', 'Büyükada', 'Adalar', 'Marmara', 'beach_club', 40.87244, 29.12279, 'Ücretli', 'Özel işletme'],
  ['nakibey', 'Nakibey Plajı', 'Adalar', 'Büyükada', 'Adalar', 'Marmara', 'private_beach', 40.864444, 29.134722, 'Ücretli', 'Özel işletme'],
  ['yorukali', 'Yörükali Plajı', 'Adalar', 'Büyükada · Yörükali', 'Adalar', 'Marmara', 'private_beach', 40.859167, 29.113056, 'Ücretli', 'Özel işletme'],
  ['prenses-koyu', 'Prenses Koyu', 'Adalar', 'Büyükada', 'Adalar', 'Marmara', 'cove', 40.85887, 29.112681, null, null],
  ['sadikbey', 'Sadıkbey Plajı', 'Adalar', 'Heybeliada', 'Adalar', 'Marmara', 'private_beach', 40.88015, 29.08984, 'Ücretli', 'Özel işletme'],
  ['ada-beach', 'Ada Beach Club', 'Adalar', 'Heybeliada', 'Adalar', 'Marmara', 'beach_club', 40.87082, 29.08803, 'Ücretli', 'Özel işletme'],
  ['asaf-beach', 'Asaf Beach', 'Adalar', 'Heybeliada', 'Adalar', 'Marmara', 'beach_club', 40.879399, 29.088621, 'Ücretli', 'Özel işletme'],
  ['burgazada-deniz-kulubu', 'Burgazada Deniz Kulübü', 'Adalar', 'Burgazada', 'Adalar', 'Marmara', 'private_beach', 40.878913, 29.071076, 'Ücretli', 'Özel işletme'],
  ['kinaliada-su-sporlari', 'Kınalıada Su Sporları Kulübü Önü', 'Adalar', 'Kınalıada', 'Adalar', 'Marmara', 'public_beach', 40.914452, 29.050937, null, null],
  ['kinaliada-iskele-sag', 'Kınalıada İskele Sağ Halk Plajı', 'Adalar', 'Kınalıada', 'Adalar', 'Marmara', 'public_beach', 40.910556, 29.055556, null, null],
  ['kinaliada-iskele-sol', 'Kınalıada İskele Sol Halk Plajı', 'Adalar', 'Kınalıada', 'Adalar', 'Marmara', 'public_beach', 40.907306, 29.056762, null, null],
  ['sedef-halk', 'Sedef Adası Halk Plajı', 'Adalar', 'Sedef Adası', 'Adalar', 'Marmara', 'public_beach', 40.85023, 29.1408, null, null],
  ['kalpazankaya', 'Kalpazankaya', 'Adalar', 'Burgazada', 'Adalar', 'Marmara', 'cove', null, null, null, null],
  ['madam-martha', 'Madam Martha Koyu', 'Adalar', 'Burgazada', 'Adalar', 'Marmara', 'cove', null, null, null, null],
  ['camakya', 'Çamakya Sahili', 'Adalar', 'Burgazada', 'Adalar', 'Marmara', 'coast', null, null, null, null],
  ['alman-koyu', 'Alman Koyu', 'Adalar', 'Heybeliada', 'Adalar', 'Marmara', 'cove', null, null, null, null],
  ['akvaryum-koyu', 'Akvaryum Koyu', 'Adalar', 'Heybeliada', 'Adalar', 'Marmara', 'cove', null, null, null, null],
  ['degirmenburnu', 'Değirmenburnu Sahili', 'Adalar', 'Heybeliada', 'Adalar', 'Marmara', 'coast', null, null, null, null, 'https://www.istanbul.gov.tr/basin-aciklamasi-2025-43'],
  ['kumluk-kinaliada', 'Kumluk Plajı', 'Adalar', 'Kınalıada', 'Adalar', 'Marmara', 'public_beach', null, null, null, null],
  ['teos-beach', 'Teos Beach', 'Adalar', 'Kınalıada', 'Adalar', 'Marmara', 'beach_club', null, null, 'Ücretli', 'Özel işletme'],
];

const currentIbbIds = new Set(['yenikoy-plaji', 'yalikoy-1', 'yalikoy-2', 'kisirkaya', 'denizkoskler', 'gunes-plaji', 'menekse', 'albatros', 'semizkum-basinkent', 'silivri-kumluk', 'selimpasa', 'caddebostan-1', 'caddebostan-2', 'caddebostan-3']);

const typeLabel: Record<IstanbulBeachType, string> = {
  public_beach: 'halk plajı', private_beach: 'özel plaj', beach_club: 'beach club', coast: 'sahil', bay: 'koy', cove: 'doğal koy',
};

export const istanbulBeaches: IstanbulBeach[] = seeds.map(([id, name, district, area, side, sea, placeType, latitude, longitude, access = null, operator = null, sourceUrl]) => {
  const currentIbb = currentIbbIds.has(id);
  const photo = beachPhotos[id];
  return {
    id: `istanbul-beach-${id}`,
    name,
    city: 'İstanbul',
    district,
    area,
    side,
    category: 'Sahil',
    placeType,
    sea,
    summary: `${area} bölgesindeki ${name}, ${sea === 'Karadeniz' ? 'Karadeniz' : 'Marmara Denizi'} kıyısında ${typeLabel[placeType]} olarak sınıflandırılmıştır. ${currentIbb ? 'İBB’nin 2025 hizmet listesinde yer alır.' : 'Yüzme durumu ve hizmetler sezona göre değişebileceğinden güncel resmî uyarılar kontrol edilmelidir.'}`,
    latitude,
    longitude,
    image: photo?.image ?? placeholder,
    imageIsPlaceholder: !photo,
    imageCredit: photo?.credit ?? null,
    imagePage: photo?.page ?? null,
    surface: null,
    access,
    operator,
    entryFee: null,
    entryFeeYear: null,
    parking: null,
    toilet: currentIbb ? true : null,
    shower: currentIbb ? true : null,
    changingRoom: currentIbb ? true : null,
    sunbed: currentIbb ? true : null,
    umbrella: currentIbb ? true : null,
    food: currentIbb ? true : null,
    familyFriendly: null,
    childFriendly: null,
    camping: id === 'cilingoz' ? true : null,
    picnic: id === 'cilingoz' ? true : null,
    blueFlag: false,
    blueFlagYear: null,
    lifeguardAvailable: currentIbb ? true : null,
    accessible: null,
    waterQuality: null,
    waterQualityDate: null,
    waterQualitySource: healthSource,
    seaWarning: sea === 'Karadeniz' ? 'Dalga ve çeken akıntı uyarılarını ziyaret günü kontrol edin.' : null,
    swimmingRisk: null,
    officialSwimmingAreaYear: latitude !== null ? 2023 : null,
    sourceUrl: sourceUrl ?? governorSource,
  };
});

export const istanbulBeachSides: Array<'Tümü' | IstanbulBeachSide> = ['Tümü', 'Avrupa Yakası', 'Anadolu Yakası', 'Adalar'];
export const istanbulBeachSeas: Array<'Tümü' | IstanbulSea> = ['Tümü', 'Marmara', 'Karadeniz'];
export const istanbulBeachTypes: Array<'Tümü' | IstanbulBeachType> = ['Tümü', 'public_beach', 'private_beach', 'beach_club', 'cove', 'bay', 'coast'];
export const istanbulBeachAccesses: Array<'Tümü' | Exclude<IstanbulBeachAccess, null>> = ['Tümü', 'Ücretsiz', 'Ücretli'];
