import type { ImageSourcePropType } from 'react-native';

export type IstanbulPlace = { id: string; name: string; district: string; category: string; summary: string; image: ImageSourcePropType; mapQuery: string; credit: string; imagePage: string };
export type IstanbulDistrict = { name: string; side: 'Avrupa' | 'Anadolu' | 'Adalar'; signature: string; mapQuery: string };

const european = ['Arnavutköy','Avcılar','Bağcılar','Bahçelievler','Bakırköy','Başakşehir','Bayrampaşa','Beşiktaş','Beylikdüzü','Beyoğlu','Büyükçekmece','Çatalca','Esenler','Esenyurt','Eyüpsultan','Fatih','Gaziosmanpaşa','Güngören','Kağıthane','Küçükçekmece','Sarıyer','Silivri','Sultangazi','Şişli','Zeytinburnu'];
const asian = ['Ataşehir','Beykoz','Çekmeköy','Kadıköy','Kartal','Maltepe','Pendik','Sancaktepe','Sultanbeyli','Şile','Tuzla','Ümraniye','Üsküdar'];
const signatures: Record<string, string> = {
  Fatih: 'Tarihî yarımada ve imparatorluk mirası', Beyoğlu: 'Galata, İstiklal ve kültür hayatı', Beşiktaş: 'Boğaz, saraylar ve canlı sokaklar',
  Kadıköy: 'Çarşı, sahil ve Anadolu Yakası kültürü', Üsküdar: 'Kız Kulesi, camiler ve Boğaz silüeti', Sarıyer: 'Boğaz köyleri, korular ve müzeler',
  Adalar: 'Köşkler, bisiklet rotaları ve deniz', Şile: 'Karadeniz kıyıları ve doğal koylar', Eyüpsultan: 'Haliç, Pierre Loti ve manevi miras',
};
const district = (name: string, side: IstanbulDistrict['side']): IstanbulDistrict => ({ name, side, signature: signatures[name] ?? (side === 'Avrupa' ? 'Avrupa Yakası kent yaşamı ve yerel keşifler' : side === 'Anadolu' ? 'Anadolu Yakası mahalleleri ve sahil rotaları' : 'Ada yaşamı ve deniz rotaları'), mapQuery: `${name} İstanbul` });

export const istanbulDistricts: IstanbulDistrict[] = [district('Adalar', 'Adalar'), ...european.map(name => district(name, 'Avrupa')), ...asian.map(name => district(name, 'Anadolu'))].sort((a, b) => a.name.localeCompare(b.name, 'tr'));

export const istanbulPlaces: IstanbulPlace[] = [
  { id: 'ayasofya', name: 'Ayasofya', district: 'Fatih', category: 'Tarihî yapı', summary: 'Bizans ve Osmanlı dönemlerinin izlerini bir arada taşıyan, tarihî yarımadanın simge yapılarından biri.', image: require('../assets/istanbul/hagia-sophia.jpg'), mapQuery: 'Ayasofya İstanbul', credit: 'José Luiz · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Exterior_of_Hagia_Sophia_from_the_Bosphorus.jpg' },
  { id: 'galata', name: 'Galata Kulesi', district: 'Beyoğlu', category: 'Müze · Manzara', summary: 'Galata’nın tarihî sokakları üzerinde yükselen ve panoramik İstanbul manzarası sunan kent simgesi.', image: require('../assets/istanbul/galata.jpg'), mapQuery: 'Galata Kulesi İstanbul', credit: 'Maurice Flesier · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Exterior_view_of_the_Galata_Tower.jpg' },
  { id: 'kiz-kulesi', name: 'Kız Kulesi', district: 'Üsküdar', category: 'Tarihî yapı', summary: 'Boğaz’ın ortasında, Üsküdar kıyısının karşısında yer alan İstanbul’un en tanınan silüetlerinden.', image: require('../assets/istanbul/maiden-tower.jpg'), mapQuery: 'Kız Kulesi İstanbul', credit: 'MB-one · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Maiden_tower,_Istanbul_(P1100206).jpg' },
  { id: 'adalar', name: 'Büyükada ve Adalar', district: 'Adalar', category: 'Doğa · Sahil', summary: 'Tarihî köşkler, bisiklet rotaları, çamlıklar ve Marmara manzaralarıyla şehirden kısa bir kaçış.', image: require('../assets/istanbul/princes-islands.jpg'), mapQuery: 'Büyükada İstanbul', credit: 'Kadı · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Princes%E2%80%99_Islands,_Istanbul.jpg' },
  { id: 'bogaz', name: 'Boğaziçi ve Haliç', district: 'İstanbul', category: 'Manzara · Ulaşım', summary: 'İki kıtayı birleştiren su yolu, vapur yolculukları ve kıyı mahalleleriyle İstanbul deneyiminin kalbi.', image: require('../assets/istanbul/hero.jpg'), mapQuery: 'İstanbul Boğazı', credit: 'Maurice Flesier · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bosphorus_and_Golden_Horn_view_from_Galata_Tower.jpg' },
];

const venueRows: [string, string, string][] = [
  ['Karaköy & Galata','Beyoğlu','Tasarım kafeleri, kahve ve yeni nesil mutfak'], ['Kadıköy Çarşı & Moda','Kadıköy','Sokak lezzetleri, meyhaneler ve üçüncü nesil kahve'],
  ['Beşiktaş Çarşı','Beşiktaş','Kahvaltı, balık ve hareketli öğrenci yaşamı'], ['Nişantaşı','Şişli','Pastaneler, dünya mutfağı ve şık kafeler'],
  ['Sultanahmet & Eminönü','Fatih','Tarihî lokantalar, köfte ve geleneksel tatlılar'], ['Arnavutköy & Bebek','Beşiktaş','Boğaz manzaralı restoran ve kafeler'],
  ['Kuzguncuk & Çengelköy','Üsküdar','Mahalle kafeleri, fırınlar ve Boğaz kıyısı'], ['Sarıyer & Rumelikavağı','Sarıyer','Balık restoranları ve kıyı kahvaltısı'],
];
export const istanbulVenueAreas = venueRows.map(([area,district,character]) => ({ area, district, character, cafeQuery: `en iyi kafeler ${area} İstanbul`, restaurantQuery: `en iyi restoranlar ${area} İstanbul` }));

export const istanbulRoutes = [
  { title: 'Tarihî Yarımada', duration: '1 tam gün', color: '#75513B', stops: ['Ayasofya','Sultanahmet Camii','Topkapı Sarayı','Yerebatan Sarnıcı','Kapalıçarşı'] },
  { title: 'Galata’dan Boğaz’a', duration: '1 tam gün', color: '#315F53', stops: ['Galata Kulesi','Karaköy','Dolmabahçe Sarayı','Ortaköy','Bebek'] },
  { title: 'Anadolu Yakası', duration: '1 tam gün', color: '#477A89', stops: ['Kuzguncuk','Üsküdar Sahili','Kadıköy Çarşı','Moda Sahili','Caddebostan'] },
  { title: 'Adalar günü', duration: '1 tam gün', color: '#6B7252', stops: ['Büyükada İskelesi','Aya Yorgi Yokuşu','Büyükada Köşkleri','Dilburnu'] },
];
