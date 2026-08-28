import type { ImageSourcePropType } from 'react-native';

export type IzmirBeachDistrict = 'Çeşme' | 'Seferihisar' | 'Karaburun' | 'Dikili' | 'Foça' | 'Urla' | 'Menderes' | 'Selçuk' | 'Güzelbahçe' | 'Aliağa';
export type IzmirBeachType = 'public_beach' | 'beach' | 'cove' | 'natural_coast';
export type IzmirBeachAccess = 'Ücretsiz' | 'Ücretli' | 'Karma' | null;
export type IzmirBeachFacility = boolean | null;

export type IzmirBeach = {
  id: string; name: string; city: 'İzmir'; district: IzmirBeachDistrict; area: string;
  sea: 'Ege'; category: 'Sahil'; placeType: IzmirBeachType; summary: string;
  latitude: number | null; longitude: number | null; locationStatus: 'verified' | 'needs_review';
  locationSource: string; locationVerifiedAt: string | null;
  image: ImageSourcePropType; imageIsPlaceholder: boolean; imageCredit: string | null; imagePage: string | null;
  surface: 'Kum' | 'Çakıl' | 'Kayalık' | 'Karışık' | null; access: IzmirBeachAccess;
  operator: 'İlçe Belediyesi' | 'İzmir Büyükşehir Belediyesi' | 'Özel işletme' | null;
  parking: IzmirBeachFacility; shower: IzmirBeachFacility; toilet: IzmirBeachFacility;
  changingRoom: IzmirBeachFacility; food: IzmirBeachFacility; sunbed: IzmirBeachFacility;
  umbrella: IzmirBeachFacility; familyFriendly: IzmirBeachFacility; childFriendly: IzmirBeachFacility;
  lifeguardAvailable: IzmirBeachFacility; accessible: IzmirBeachFacility;
  blueFlag: boolean | null; blueFlagYear: number | null; seaWarning: string | null; sourceUrl: string;
};

const tourism = 'https://izmir.ktb.gov.tr/TR-77213/plajlar.html';
const seaTourism = 'https://izmir.ktb.gov.tr/TR-92450/deniz-turizmi.html';
const seferihisar2026 = 'https://seferihisar.bel.tr/seferihisar-2026-sezonunda-10-mavi-bayragini-korudu';
const cesme2026 = 'https://www.cesme.bel.tr/haberler/cesme-belediyesi-plajlari-bir-kez-daha-mavi-bayrak-kazandi';
const aliaga2026 = 'https://www.aliaga.bel.tr/haber/aliaga-da-mavi-bayrakli-plaj-sayisi-3-e-yukseldi/1718';
const openStreetMap = 'https://www.openstreetmap.org/';
const placeholder = require('../assets/bursa/beach-placeholder.jpg');
const photos: Record<string, { image: ImageSourcePropType; credit: string; page: string }> = {
  ilica: { image: require('../assets/izmir/ilica.jpg'), credit: 'Nihat1988 · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Cesme_Ilica_Plaji_(beach)_-_panoramio.jpg' },
  altinkum: { image: require('../assets/izmir/altinkum.jpg'), credit: 'Bir Ege Hikayesi · CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Alt%C4%B1nkum,_35930_Ovac%C4%B1k-%C3%87e%C5%9Fme-%C4%B0zmir,_Turkey_-_panoramio.jpg' },
  pirlanta: { image: require('../assets/izmir/pirlanta.jpg'), credit: 'Justinianus · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:P%C4%B1rlanta_koyu_1.jpg' },
  ekmeksiz: { image: require('../assets/izmir/ekmeksiz.jpg'), credit: 'Fivitria · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Branches_of_a_tree_in_Ekmeksiz_beach.jpg' },
  'bodrum-koyu': { image: require('../assets/izmir/karaburun.jpg'), credit: 'Faik Sarıkaya · Attribution', page: 'https://commons.wikimedia.org/wiki/File:Faik_Sarikaya_Karaburun_Bodrum_Koyu.jpg' },
  candarli: { image: require('../assets/izmir/dikili.jpg'), credit: 'Fatih Renkligil · CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:CANDARLI_-_PITANE-_DIKILI_-_IZMIR.jpg' },
  gumuldur: { image: require('../assets/izmir/gümüldür.jpg'), credit: 'BIG-K006 · CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:G%C3%BCne%C5%9Fin_bat%C4%B1%C5%9F%C4%B1_G%C3%BCm%C3%BCld%C3%BCr,_%C4%B0zmir,_T%C3%BCrkiye.jpg' },
  cukuralti: { image: require('../assets/izmir/ozdere.jpg'), credit: 'CherryX · CC BY-SA 3.0', page: 'https://commons.wikimedia.org/wiki/File:%C3%96zdere_Beach_(CherryX).jpg' },
};

type Seed = [string, string, IzmirBeachDistrict, string, IzmirBeachType, IzmirBeachAccess?, string?];
const seeds: Seed[] = [
  ['ilica','Ilıca Halk Plajı','Çeşme','Ilıca','public_beach','Ücretsiz'],
  ['altinkum','Altınkum Plajı','Çeşme','Çiftlik · Ovacık','beach','Karma'],
  ['pirlanta','Pırlanta Plajı','Çeşme','Çiftlikköy','beach',null,'Rüzgâr ve deniz koşulları gün içinde değişebilir.'],
  ['boyalik','Boyalık Plajı','Çeşme','Boyalık','beach','Karma'],
  ['kocakari','Kocakarı Plajı','Çeşme','Dalyan','public_beach',null],
  ['tekke','Tekke Plajı','Çeşme','Çeşme merkez','public_beach',null],
  ['cark','Çark Plajı','Çeşme','Alaçatı Port çevresi','beach',null,'Rüzgâr sporları yapılan bölgede yerel uyarıları kontrol edin.'],
  ['deliklikoy','Deliklikoy','Çeşme','Alaçatı · Ovacık','natural_coast',null,'Doğal ve kayalık kıyıda denize giriş koşulları değişebilir.'],
  ['kleopatra','Kleopatra Koyu / Güvercinlik','Çeşme','Ovacık','cove',null],
  ['pasalimani','Paşalimanı Plajı','Çeşme','Paşalimanı','beach',null],
  ['yildizburnu','Yıldızburnu Küçük Halk Plajı','Çeşme','Ilıca · Yıldızburnu','public_beach',null],
  ['catalazmak','Çatalazmak Plajı','Çeşme','Dalyan','beach',null],

  ['buyuk-akkum','Büyük Akkum Plajı','Seferihisar','Sığacık','public_beach',null],
  ['akkum','Küçük Akkum Plajı','Seferihisar','Sığacık','public_beach',null,'Rüzgârlı günlerde deniz koşullarını kontrol edin.'],
  ['akarca','Akarca Plajı','Seferihisar','Akarca','public_beach',null],
  ['ekmeksiz','Ekmeksiz Plajı','Seferihisar','Sığacık · Teos','natural_coast',null],
  ['gemisuyu','Gemisuyu Mevkii Plajı','Seferihisar','Akarca · Gemisuyu','public_beach',null],
  ['doganbey','Doğanbey Halk Plajı','Seferihisar','Doğanbey','public_beach',null],
  ['urkmez','Ürkmez Belediye Plajı','Seferihisar','Ürkmez','public_beach',null],
  ['bengiler','Bengiler Halk Plajı','Seferihisar','Ürkmez · Bengiler','public_beach',null],
  ['orsal-bahadir','Orşal / Bahadır Mevkii Halk Plajı','Seferihisar','Akarca · Bahadır','public_beach','Ücretsiz'],
  ['doganbey-sakiz','Doğanbey Sakız Ağacı Mevkii Halk Plajı','Seferihisar','Doğanbey · Sakız Ağacı','public_beach','Ücretsiz'],
  ['doganbey-havacilar','Doğanbey Havacılar Sitesi Halk Plajı','Seferihisar','Doğanbey · Havacılar Sitesi','public_beach','Ücretsiz'],
  ['doganbey-omur','Doğanbey Ömür Beldesi Halk Plajı','Seferihisar','Doğanbey · Ömür Beldesi','public_beach','Ücretsiz'],
  ['urkmez-saglik','Ürkmez Sağlık Ocağı Halk Plajı','Seferihisar','Ürkmez · Sağlık Ocağı','public_beach','Ücretsiz'],
  ['iztur-sertur','İztur / Sertur Halk Plajı','Seferihisar','Akarca · İztur / Sertur','public_beach','Ücretsiz'],

  ['ardic','Ardıç Plajı','Karaburun','Mordoğan · Ardıç','public_beach',null],
  ['manal','Manal Koyu','Karaburun','Mordoğan · Balıklıova','cove',null],
  ['ayibaligi','Ayıbalığı Koyu','Karaburun','Mordoğan','cove',null],
  ['incirlikoy','İncirlikoy','Karaburun','Karaburun merkez','cove',null],
  ['boyabagi','Boyabağı Koyu','Karaburun','Mordoğan','cove',null],
  ['mimoza','Mimoza Koyu','Karaburun','Karaburun merkez','cove',null],
  ['kocakum','Kocakum Plajı','Karaburun','Karaburun merkez','public_beach',null],
  ['bodrum-koyu','Bodrum Koyu','Karaburun','Karaburun merkez','cove',null],

  ['dikili-halk','Dikili Halk Plajı','Dikili','Dikili merkez','public_beach','Ücretsiz'],
  ['bademli','Bademli Halk Plajı','Dikili','Bademli','public_beach',null],
  ['killik','Killik Koyu','Dikili','Bademli','cove',null],
  ['hayitli','Hayıtlı Koyu','Dikili','Bademli','cove',null],
  ['candarli','Çandarlı Halk Plajı','Dikili','Çandarlı','public_beach',null],
  ['denizkoy','Denizköy Plajı','Dikili','Denizköy','beach',null],

  ['karakum','Karakum Plajı','Foça','Eski Foça','public_beach',null],
  ['yenifoca','Yeni Foça Halk Plajı','Foça','Yeni Foça','public_beach',null],
  ['sazlica','Sazlıca Koyu','Foça','Eski Foça · Yeni Foça yolu','cove',null],
  ['mersinaki','Mersinaki Koyları','Foça','Eski Foça','cove',null],

  ['kum-denizi','Kum Denizi Plajı','Urla','İskele','public_beach',null],
  ['cesmealti','Çeşmealtı Yüzme Alanı','Urla','Çeşmealtı','public_beach',null],
  ['demircili','Demircili Koyu','Urla','Demircili','cove',null],
  ['altinkoy','Altınköy Plajı','Urla','Yağcılar','beach',null],
  ['melengec','Melengeç Plajı','Urla','Demircili çevresi','natural_coast',null],

  ['gumuldur','Gümüldür Halk Plajı','Menderes','Gümüldür','public_beach',null],
  ['cukuralti','Çukuraltı Halk Plajı','Menderes','Özdere · Çukuraltı','public_beach',null],
  ['kalemlik','Kalemlik Orman Kampı Plajı','Menderes','Özdere · Kalemlik','natural_coast',null],
  ['ahmetbeyli','Ahmetbeyli Halk Plajı','Menderes','Ahmetbeyli','public_beach',null],
  ['denizati','Denizatı Yüzme Alanı','Menderes','Özdere','public_beach',null],

  ['pamucak','Pamucak Halk Plajı','Selçuk','Pamucak','public_beach','Ücretsiz'],
  ['guzelbahce','Güzelbahçe Halk Plajı','Güzelbahçe','Siteler · kıyı bandı','public_beach',null],
  ['yeni-sakran','Yeni Şakran Halk Plajı','Aliağa','Yeni Şakran','public_beach',null],
  ['agapark','Ağapark Plajı','Aliağa','Yeni Şakran · Ağapark','public_beach',null],
  ['polis-kampi','Polis Kampı Plajı','Aliağa','Aliağa kıyısı','public_beach',null],
  ['albest-on','ALBEST Ön Plaj','Aliağa','ALBEST Sosyal Tesisleri önü','public_beach',null],
];

const blueFlag2026: Record<string, string> = {
  ilica: cesme2026, kocakari: cesme2026, tekke: cesme2026,
  'buyuk-akkum': seferihisar2026, akarca: seferihisar2026, gemisuyu: seferihisar2026,
  bengiler: seferihisar2026, 'orsal-bahadir': seferihisar2026, 'doganbey-sakiz': seferihisar2026,
  'doganbey-havacilar': seferihisar2026, 'doganbey-omur': seferihisar2026,
  'urkmez-saglik': seferihisar2026, 'iztur-sertur': seferihisar2026,
  agapark: aliaga2026, 'polis-kampi': aliaga2026, 'albest-on': aliaga2026,
};

const verifiedLocations: Record<string, [number, number]> = {
  ilica: [38.3092076, 26.3772479], tekke: [38.3284622, 26.2971823],
  altinkum: [38.2702408, 26.2600995], pirlanta: [38.2851397, 26.2491886],
  'buyuk-akkum': [38.1906623, 26.7731260], akarca: [38.1668983, 26.8076731],
  ardic: [38.5295423, 26.6134309], manal: [38.4718720, 26.6110615],
  killik: [39.0364876, 26.8110942], gumuldur: [38.0715785, 26.9903279],
  pamucak: [37.9401800, 27.2750149],
};

const typeLabel = (type: IzmirBeachType) => type === 'public_beach' ? 'halk plajı' : type === 'cove' ? 'koy' : type === 'natural_coast' ? 'doğal yüzme kıyısı' : 'plaj';

export const izmirBeaches: IzmirBeach[] = seeds.map(([key,name,district,area,placeType,access,seaWarning]) => {
  const photo = photos[key];
  const coordinates = verifiedLocations[key];
  const blueFlagSource = blueFlag2026[key];
  return {
    id: `izmir-beach-${key}`, name, city: 'İzmir', district, area, sea: 'Ege', category: 'Sahil', placeType,
    summary: `${area} çevresindeki ${name}, İzmir kıyı rehberinde ${typeLabel(placeType)} olarak sınıflandırılmıştır. Sezon, erişim ve tesis koşullarını ziyaret öncesinde resmî kanallardan kontrol edin.`,
    latitude: coordinates?.[0] ?? null, longitude: coordinates?.[1] ?? null,
    locationStatus: coordinates ? 'verified' : 'needs_review', locationSource: coordinates ? openStreetMap : seaTourism,
    locationVerifiedAt: coordinates ? '2026-08-28' : null,
    image: photo?.image ?? placeholder, imageIsPlaceholder: !photo, imageCredit: photo?.credit ?? null, imagePage: photo?.page ?? null,
    surface: null, access: access ?? null, operator: null, parking: null, shower: null, toilet: null, changingRoom: null,
    food: null, sunbed: null, umbrella: null, familyFriendly: null, childFriendly: null, lifeguardAvailable: null, accessible: null,
    blueFlag: blueFlagSource ? true : null, blueFlagYear: blueFlagSource ? 2026 : null,
    seaWarning: seaWarning ?? null, sourceUrl: blueFlagSource ?? (district === 'Seferihisar' ? tourism : seaTourism),
  };
});

export const izmirBeachDistricts: Array<'Tümü' | IzmirBeachDistrict> = ['Tümü','Çeşme','Seferihisar','Karaburun','Dikili','Foça','Urla','Menderes','Selçuk','Güzelbahçe','Aliağa'];
export const izmirBeachTypes: Array<'Tümü' | IzmirBeachType> = ['Tümü','public_beach','beach','cove','natural_coast'];
export const izmirBeachAccesses: Array<'Tümü' | 'Ücretsiz' | 'Ücretli' | 'Karma' | 'Doğrulanmadı'> = ['Tümü','Ücretsiz','Ücretli','Karma','Doğrulanmadı'];
