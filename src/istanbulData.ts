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
  { id: 'dolmabahce', name: 'Dolmabahçe Sarayı', district: 'Beşiktaş', category: 'Saray', summary: 'Osmanlı’nın son dönem yönetim merkezi; Boğaz kıyısındaki görkemli cephesi, tören salonları ve bahçeleriyle öne çıkar.', image: require('../assets/istanbul/dolmabahce.jpg'), mapQuery: 'Dolmabahçe Sarayı İstanbul', credit: 'flowcomm · CC BY 2.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Dolmabahce_Istanbul_Turkey.jpg' },
  { id: 'topkapi', name: 'Topkapı Sarayı', district: 'Fatih', category: 'Saray', summary: 'Yüzyıllar boyunca Osmanlı yönetiminin merkezi olan saray; avluları, Harem’i ve imparatorluk koleksiyonlarıyla kapsamlı bir durak.', image: require('../assets/istanbul/topkapi.jpg'), mapQuery: 'Topkapı Sarayı İstanbul', credit: 'Yair Haklai · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Gate_of_Salutation_(Topkapı_Palace)-.jpg' },
  { id: 'yerebatan', name: 'Yerebatan Sarnıcı', district: 'Fatih', category: 'Tarihî yapı', summary: '6. yüzyılda inşa edilen yer altı su yapısı; sütunları, yansımaları ve Medusa başlarıyla benzersiz bir tarih atmosferi sunar.', image: require('../assets/istanbul/yerebatan.jpg'), mapQuery: 'Yerebatan Sarnıcı İstanbul', credit: 'Gun Powder Ma · Public domain', imagePage: 'https://commons.wikimedia.org/wiki/File:Basilica_Cistern,_Constantinople.jpg' },
  { id: 'galata', name: 'Galata Kulesi', district: 'Beyoğlu', category: 'Müze · Manzara', summary: 'Galata’nın tarihî sokakları üzerinde yükselen ve panoramik İstanbul manzarası sunan kent simgesi.', image: require('../assets/istanbul/galata.jpg'), mapQuery: 'Galata Kulesi İstanbul', credit: 'Maurice Flesier · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Exterior_view_of_the_Galata_Tower.jpg' },
  { id: 'kiz-kulesi', name: 'Kız Kulesi', district: 'Üsküdar', category: 'Tarihî yapı', summary: 'Boğaz’ın ortasında, Üsküdar kıyısının karşısında yer alan İstanbul’un en tanınan silüetlerinden.', image: require('../assets/istanbul/maiden-tower.jpg'), mapQuery: 'Kız Kulesi İstanbul', credit: 'MB-one · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Maiden_tower,_Istanbul_(P1100206).jpg' },
  { id: 'adalar', name: 'Büyükada ve Adalar', district: 'Adalar', category: 'Doğa · Sahil', summary: 'Tarihî köşkler, bisiklet rotaları, çamlıklar ve Marmara manzaralarıyla şehirden kısa bir kaçış.', image: require('../assets/istanbul/princes-islands.jpg'), mapQuery: 'Büyükada İstanbul', credit: 'Ceylnbirol · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:View_of_Istanbul_from_Büyükada.jpg' },
  { id: 'bogaz', name: 'Boğaziçi ve Haliç', district: 'İstanbul', category: 'Manzara · Ulaşım', summary: 'İki kıtayı birleştiren su yolu, vapur yolculukları ve kıyı mahalleleriyle İstanbul deneyiminin kalbi.', image: require('../assets/istanbul/hero.jpg'), mapQuery: 'İstanbul Boğazı', credit: 'Maurice Flesier · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bosphorus_and_Golden_Horn_view_from_Galata_Tower.jpg' },
  { id: 'sultanahmet', name: 'Sultanahmet Camii', district: 'Fatih', category: 'Cami', summary: 'Altı minaresi, geniş avlusu ve mavi İznik çinileriyle tarihî yarımadanın en güçlü Osmanlı silüetlerinden biridir.', image: require('../assets/istanbul/sultanahmet.jpg'), mapQuery: 'Sultanahmet Camii İstanbul', credit: 'Julian Lupyan · CC0', imagePage: 'https://commons.wikimedia.org/wiki/File:Sultan_Ahmed_Mosque_Front_Façade,_2024.jpg' },
  { id: 'suleymaniye', name: 'Süleymaniye Camii', district: 'Fatih', category: 'Cami', summary: 'Mimar Sinan’ın Kanuni Sultan Süleyman için tasarladığı külliye; Haliç manzarası ve dengeli mimarisiyle başyapıt kabul edilir.', image: require('../assets/istanbul/suleymaniye.jpg'), mapQuery: 'Süleymaniye Camii İstanbul', credit: 'İhsan Deniz Kılıçoğlu · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Süleymaniye_Mosque_exterior_view.JPG' },
  { id: 'eyup-sultan', name: 'Eyüp Sultan Camii ve Türbesi', district: 'Eyüpsultan', category: 'Türbe', summary: 'Ebu Eyyûb el-Ensârî’nin türbesi çevresinde gelişen külliye, İstanbul’un en önemli manevi ziyaret merkezlerindendir.', image: require('../assets/istanbul/eyup-sultan.jpg'), mapQuery: 'Eyüp Sultan Camii ve Türbesi İstanbul', credit: 'Ali Osman Dilekoğlu · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Eyüp_Sultan_Camii_IMG_0227.jpg' },
  { id: 'fatih-turbesi', name: 'Fatih Sultan Mehmet Türbesi', district: 'Fatih', category: 'Türbe', summary: 'İstanbul’un fatihi II. Mehmed’in Fatih Camii haziresindeki türbesi; tarih ve manevi miras rotalarının temel duraklarındandır.', image: require('../assets/istanbul/fatih-tomb.jpg'), mapQuery: 'Fatih Sultan Mehmet Türbesi İstanbul', credit: 'Sitomon · CC BY-SA 2.0', imagePage: 'https://commons.wikimedia.org/wiki/File:II._Mehmed_tomb.jpg' },
  { id: 'hudayi', name: 'Aziz Mahmud Hüdayi Türbesi', district: 'Üsküdar', category: 'Türbe', summary: 'Üsküdar’daki külliye içinde bulunan türbe, tasavvuf tarihinin önemli isimlerinden Aziz Mahmud Hüdayi’ye adanmıştır.', image: require('../assets/istanbul/hudayi-tomb.jpg'), mapQuery: 'Aziz Mahmud Hüdayi Türbesi İstanbul', credit: 'M. Pınarcı · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Türbe_Ziyareti_003_-_panoramio.jpg' },
];

const venueRows: [string, string, string][] = [
  ['Karaköy & Galata','Beyoğlu','Tasarım kafeleri, kahve ve yeni nesil mutfak'], ['Kadıköy Çarşı & Moda','Kadıköy','Sokak lezzetleri, meyhaneler ve üçüncü nesil kahve'],
  ['Beşiktaş Çarşı','Beşiktaş','Kahvaltı, balık ve hareketli öğrenci yaşamı'], ['Nişantaşı','Şişli','Pastaneler, dünya mutfağı ve şık kafeler'],
  ['Sultanahmet & Eminönü','Fatih','Tarihî lokantalar, köfte ve geleneksel tatlılar'], ['Arnavutköy & Bebek','Beşiktaş','Boğaz manzaralı restoran ve kafeler'],
  ['Kuzguncuk & Çengelköy','Üsküdar','Mahalle kafeleri, fırınlar ve Boğaz kıyısı'], ['Sarıyer & Rumelikavağı','Sarıyer','Balık restoranları ve kıyı kahvaltısı'],
];
export const istanbulVenueAreas = venueRows.map(([area,district,character]) => ({ area, district, character, cafeQuery: `en iyi kafeler ${area} İstanbul`, restaurantQuery: `en iyi restoranlar ${area} İstanbul` }));

export const istanbulFoodGuide = [
  { dish: 'Balık ekmek', area: 'Eminönü · Karaköy', note: 'Haliç ve Boğaz manzarası eşliğinde, kıyıdaki geleneksel balık-ekmek noktalarında dene.', mapQuery: 'balık ekmek Eminönü Karaköy İstanbul' },
  { dish: 'Sultanahmet köftesi', area: 'Sultanahmet · Fatih', note: 'Tarihî yarımadadaki köftecilerde piyaz ve ayran eşliğinde servis edilen klasik yorumu tercih et.', mapQuery: 'Sultanahmet köftesi Fatih İstanbul' },
  { dish: 'Kumpir', area: 'Ortaköy · Beşiktaş', note: 'Ortaköy Meydanı çevresindeki kumpircilerde malzemelerini seçerek Boğaz kıyısında tadabilirsin.', mapQuery: 'kumpir Ortaköy Beşiktaş İstanbul' },
  { dish: 'Kanlıca yoğurdu', area: 'Kanlıca · Beykoz', note: 'Vapur iskelesi çevresinde pudra şekeriyle sunulan geleneksel Kanlıca yoğurdunu dene.', mapQuery: 'Kanlıca yoğurdu Beykoz İstanbul' },
  { dish: 'Sarıyer böreği', area: 'Sarıyer Merkez', note: 'Sarıyer’in köklü börekçilerinde kıymalı, peynirli veya kuş üzümlü çeşitlerini sıcak olarak ara.', mapQuery: 'Sarıyer böreği Sarıyer İstanbul' },
  { dish: 'Vefa bozası', area: 'Vefa · Fatih', note: 'Kış aylarında tarçın ve leblebiyle sunulan koyu kıvamlı geleneksel bozayı tarihî Vefa çevresinde tat.', mapQuery: 'boza Vefa Fatih İstanbul' },
  { dish: 'Profiterol', area: 'Beyoğlu', note: 'İstiklal Caddesi ve çevresindeki geleneksel pastanelerde yoğun çikolata soslu İstanbul klasiğini dene.', mapQuery: 'profiterol Beyoğlu İstanbul' },
  { dish: 'Moda dondurması', area: 'Moda · Kadıköy', note: 'Moda sahiline uzanan yürüyüşte mahalle dondurmacılarının mevsimlik ve klasik çeşitlerini keşfet.', mapQuery: 'dondurma Moda Kadıköy İstanbul' },
];

export const istanbulRoutes = [
  { title: 'Tarihî Yarımada', duration: '1 tam gün', color: '#75513B', stops: ['Ayasofya','Sultanahmet Camii','Topkapı Sarayı','Yerebatan Sarnıcı','Kapalıçarşı'] },
  { title: 'Galata’dan Boğaz’a', duration: '1 tam gün', color: '#315F53', stops: ['Galata Kulesi','Karaköy','Dolmabahçe Sarayı','Ortaköy','Bebek'] },
  { title: 'Anadolu Yakası', duration: '1 tam gün', color: '#477A89', stops: ['Kuzguncuk','Üsküdar Sahili','Kadıköy Çarşı','Moda Sahili','Caddebostan'] },
  { title: 'Adalar günü', duration: '1 tam gün', color: '#6B7252', stops: ['Büyükada İskelesi','Aya Yorgi Yokuşu','Büyükada Köşkleri','Dilburnu'] },
];
