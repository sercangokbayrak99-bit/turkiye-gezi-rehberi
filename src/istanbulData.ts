import type { ImageSourcePropType } from 'react-native';

export type IstanbulPlace = { id: string; name: string; district: string; category: string; summary: string; image: ImageSourcePropType; mapQuery: string; credit: string; imagePage: string };
export type IstanbulDistrict = { name: string; side: 'Avrupa' | 'Anadolu' | 'Adalar'; signature: string; highlights: string[]; mapQuery: string };

const european = ['Arnavutköy','Avcılar','Bağcılar','Bahçelievler','Bakırköy','Başakşehir','Bayrampaşa','Beşiktaş','Beylikdüzü','Beyoğlu','Büyükçekmece','Çatalca','Esenler','Esenyurt','Eyüpsultan','Fatih','Gaziosmanpaşa','Güngören','Kağıthane','Küçükçekmece','Sarıyer','Silivri','Sultangazi','Şişli','Zeytinburnu'];
const asian = ['Ataşehir','Beykoz','Çekmeköy','Kadıköy','Kartal','Maltepe','Pendik','Sancaktepe','Sultanbeyli','Şile','Tuzla','Ümraniye','Üsküdar'];
const signatures: Record<string, string> = {
  Adalar: 'Köşkler, bisiklet rotaları ve deniz',
  Arnavutköy: 'Karaburun kıyıları, Terkos Gölü ve kuzey ormanları',
  Ataşehir: 'Modern kent yaşamı, finans merkezi ve kültür alanları',
  Avcılar: 'Marmara kıyısı, göl manzaraları ve kent parkları',
  Bağcılar: 'Yoğun mahalle yaşamı, kültür merkezleri ve ulaşım ağları',
  Bahçelievler: 'Bahçeli mahalleler, çarşılar ve merkezî ulaşım',
  Bakırköy: 'Florya kıyıları, Ataköy ve kültür durakları',
  Başakşehir: 'Kent meydanı, Şamlar ormanı ve modern yaşam',
  Bayrampaşa: 'Şehir parkları, alışveriş ve merkezî ulaşım',
  Beşiktaş: 'Boğaz, saraylar ve canlı sokaklar',
  Beykoz: 'Boğaz köyleri, korular, kasırlar ve Riva kıyıları',
  Beylikdüzü: 'Yaşam Vadisi, Gürpınar kıyısı ve modern kent dokusu',
  Beyoğlu: 'Galata, İstiklal ve kültür hayatı',
  Büyükçekmece: 'Mimar Sinan Köprüsü, göl ve Marmara sahili',
  Çatalca: 'Köy rotaları, ormanlar ve Karadeniz kıyıları',
  Çekmeköy: 'Orman rotaları, mesire alanları ve sakin mahalleler',
  Esenler: 'Dörtyol Meydanı, kültür merkezleri ve ulaşım bağlantıları',
  Esenyurt: 'Çok kültürlü mahalleler, parklar ve çağdaş kent yaşamı',
  Eyüpsultan: 'Haliç, Pierre Loti ve manevi miras',
  Fatih: 'Tarihî yarımada ve imparatorluk mirası',
  Gaziosmanpaşa: 'Mahalle çarşıları, parklar ve canlı kent yaşamı',
  Güngören: 'Ticaret sokakları, mahalle kültürü ve merkezî ulaşım',
  Kadıköy: 'Çarşı, sahil ve Anadolu Yakası kültürü',
  Kağıthane: 'Sadabad mirası, dere vadisi ve dönüşen kent dokusu',
  Kartal: 'Dragos manzarası, sahil parkları ve Aydos etekleri',
  Küçükçekmece: 'Küçükçekmece Gölü, tarihî köprü ve kıyı parkları',
  Maltepe: 'Marmara sahili, kent parkı ve Başıbüyük ormanları',
  Pendik: 'Marina, sahil parkları ve ulaşım merkezleri',
  Sancaktepe: 'Aydos ormanları, mesire alanları ve yeni kent yaşamı',
  Sarıyer: 'Boğaz köyleri, korular ve müzeler',
  Silivri: 'Uzun Marmara kıyıları, tarihî merkez ve kırsal rotalar',
  Sultanbeyli: 'Aydos Kalesi, gölet ve orman rotaları',
  Sultangazi: 'Mimar Sinan Kent Ormanı, mesire alanları ve mahalle yaşamı',
  Şile: 'Karadeniz kıyıları ve doğal koylar',
  Şişli: 'Nişantaşı, müzeler, pasajlar ve kent kültürü',
  Tuzla: 'Marina, tersane mirası ve Marmara kıyıları',
  Ümraniye: 'Çarşı yaşamı, kent ormanları ve Anadolu Yakası ulaşımı',
  Üsküdar: 'Kız Kulesi, camiler ve Boğaz silüeti',
  Zeytinburnu: 'Kara surları, tarihî yapılar ve sahil parkları',
};
const districtHighlights: Record<string, string[]> = {
  Adalar: ['Büyükada', 'Heybeliada', 'Burgazada ve Kınalıada'],
  Arnavutköy: ['Karaburun Sahili', 'Terkos Gölü', 'Durusu'],
  Ataşehir: ['İstanbul Finans Merkezi', 'Kayışdağı Ormanı', 'Nezahat Gökyiğit Botanik Bahçesi'],
  Avcılar: ['Avcılar Sahili', 'Küçükçekmece Gölü kıyısı', 'Haluk Perk Müzesi'],
  Bağcılar: ['Bağcılar Meydanı', 'Nostalji Bahçeleri', 'Bağcılar Kültür Merkezi'],
  Bahçelievler: ['Milli Egemenlik Parkı', 'Siyavuşpaşa Kasrı', 'Şirinevler Meydanı'],
  Bakırköy: ['Florya Atatürk Deniz Köşkü', 'Yeşilköy Sahili', 'İstanbul Akvaryum'],
  Başakşehir: ['Başakşehir Millet Bahçesi', 'Şamlar Tabiat Parkı', 'Sular Vadisi'],
  Bayrampaşa: ['Bayrampaşa Şehir Parkı', 'Forum İstanbul', 'Kocatepe Meydanı'],
  Beşiktaş: ['Dolmabahçe Sarayı', 'Yıldız Parkı', 'Ortaköy Meydanı'],
  Beykoz: ['Anadolu Hisarı', 'Hidiv Kasrı', 'Anadolu Kavağı'],
  Beylikdüzü: ['Yaşam Vadisi', 'Gürpınar Sahili', 'Kavaklı Sahili'],
  Beyoğlu: ['Galata Kulesi', 'İstiklal Caddesi', 'Karaköy'],
  Büyükçekmece: ['Kanuni Sultan Süleyman Köprüsü', 'Büyükçekmece Sahili', 'Kültürpark'],
  Çatalca: ['Çilingoz Tabiat Parkı', 'İnceğiz Mağaraları', 'Yalıköy'],
  Çekmeköy: ['Taşdelen Mesire Alanı', 'Reşadiye Mesire Alanı', 'Ömerli Barajı çevresi'],
  Esenler: ['Dörtyol Meydanı', '15 Temmuz Millet Bahçesi', 'Dr. Kadir Topbaş Kültür Sanat Merkezi'],
  Esenyurt: ['Şehitler Parkı', 'Recep Tayyip Erdoğan Parkı', 'Esenyurt Kültür Merkezi'],
  Eyüpsultan: ['Eyüp Sultan Camii ve Türbesi', 'Pierre Loti Tepesi', 'Göktürk Göleti'],
  Fatih: ['Ayasofya', 'Topkapı Sarayı', 'Sultanahmet Meydanı'],
  Gaziosmanpaşa: ['Gaziosmanpaşa Meydanı', 'Küçükköy Meydanı', 'Şehir Tiyatroları Gaziosmanpaşa Sahnesi'],
  Güngören: ['Güngören Parkı', 'Haznedar Meydanı', 'Köyiçi çarşısı'],
  Kadıköy: ['Kadıköy Çarşısı', 'Moda Sahili', 'Caddebostan Sahili'],
  Kağıthane: ['Sadabad', 'Hasbahçe Mesire Alanı', 'Kağıthane Deresi yürüyüş yolu'],
  Kartal: ['Dragos Tepesi', 'Kartal Sahili', 'Aydos Ormanı'],
  Küçükçekmece: ['Küçükçekmece Gölü', 'Tarihî Küçükçekmece Köprüsü', 'Menekşe Sahili'],
  Maltepe: ['Maltepe Sahil Parkı', 'Başıbüyük Ormanı', 'Beşçeşmeler'],
  Pendik: ['Pendik Marina', 'Pendik Sahili', 'Aydos Ormanı'],
  Sancaktepe: ['Aydos Ormanı', 'Paşaköy Mesire Alanı', 'Sancaktepe Kent Ormanı'],
  Sarıyer: ['Rumeli Hisarı', 'Emirgan Korusu', 'Belgrad Ormanı'],
  Silivri: ['Silivri Sahili', 'Mimar Sinan Köprüsü', 'Selimpaşa'],
  Sultanbeyli: ['Aydos Kalesi', 'Sultanbeyli Göleti', 'Aydos Ormanı'],
  Sultangazi: ['Mimar Sinan Kent Ormanı', 'Hacı Bektaş-ı Veli Kent Ormanı', 'Sultangazi Şehir Ormanı'],
  Şile: ['Şile Feneri', 'Ağva', 'Kilimli Koyu'],
  Şişli: ['Atatürk Müzesi', 'Maçka Demokrasi Parkı', 'Nişantaşı'],
  Tuzla: ['Tuzla Marina', 'Tuzla Sahili', 'Şelale Eğitim Parkı'],
  Ümraniye: ['Ümraniye Millet Bahçesi', 'Dudullu Tepesi', 'Ümraniye Çarşısı'],
  Üsküdar: ['Kız Kulesi', 'Beylerbeyi Sarayı', 'Kuzguncuk'],
  Zeytinburnu: ['Panorama 1453 Tarih Müzesi', 'Merkezefendi Külliyesi', 'Zeytinburnu Sahili'],
};
const district = (name: string, side: IstanbulDistrict['side']): IstanbulDistrict => ({ name, side, signature: signatures[name] ?? (side === 'Avrupa' ? 'Avrupa Yakası kent yaşamı ve yerel keşifler' : side === 'Anadolu' ? 'Anadolu Yakası mahalleleri ve sahil rotaları' : 'Ada yaşamı ve deniz rotaları'), highlights: districtHighlights[name] ?? [], mapQuery: `${name} İstanbul` });

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
  { id: 'camlica-camii', name: 'Büyük Çamlıca Camii', district: 'Üsküdar', category: 'Cami', summary: 'Çamlıca Tepesi’nde yükselen büyük külliye; altı minaresi, geniş avlusu, modern yorumlanan Osmanlı mimarisi ve şehir manzarasıyla öne çıkar.', image: require('../assets/istanbul/camlica-mosque.jpg'), mapQuery: 'Büyük Çamlıca Camii İstanbul', credit: 'Wikimedia Commons · CC BY 2.0', imagePage: 'https://commons.wikimedia.org/wiki/File:%C3%87aml%C4%B1ca_Mosque_front_view.jpg' },
  { id: 'eyup-sultan', name: 'Eyüp Sultan Camii ve Türbesi', district: 'Eyüpsultan', category: 'Türbe', summary: 'Ebu Eyyûb el-Ensârî’nin türbesi çevresinde gelişen külliye, İstanbul’un en önemli manevi ziyaret merkezlerindendir.', image: require('../assets/istanbul/eyup-sultan.jpg'), mapQuery: 'Eyüp Sultan Camii ve Türbesi İstanbul', credit: 'Ali Osman Dilekoğlu · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Eyüp_Sultan_Camii_IMG_0227.jpg' },
  { id: 'fatih-turbesi', name: 'Fatih Sultan Mehmet Türbesi', district: 'Fatih', category: 'Türbe', summary: 'İstanbul’un fatihi II. Mehmed’in Fatih Camii haziresindeki türbesi; tarih ve manevi miras rotalarının temel duraklarındandır.', image: require('../assets/istanbul/fatih-tomb.jpg'), mapQuery: 'Fatih Sultan Mehmet Türbesi İstanbul', credit: 'Sitomon · CC BY-SA 2.0', imagePage: 'https://commons.wikimedia.org/wiki/File:II._Mehmed_tomb.jpg' },
  { id: 'hudayi', name: 'Aziz Mahmud Hüdayi Türbesi', district: 'Üsküdar', category: 'Türbe', summary: 'Üsküdar’daki külliye içinde bulunan türbe, tasavvuf tarihinin önemli isimlerinden Aziz Mahmud Hüdayi’ye adanmıştır.', image: require('../assets/istanbul/hudayi-tomb.jpg'), mapQuery: 'Aziz Mahmud Hüdayi Türbesi İstanbul', credit: 'M. Pınarcı · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Türbe_Ziyareti_003_-_panoramio.jpg' },
  { id: 'beylerbeyi', name: 'Beylerbeyi Sarayı', district: 'Üsküdar', category: 'Saray', summary: 'Boğaz’ın Anadolu yakasında yükselen 19. yüzyıl sarayı; deniz köşkleri, bahçeleri ve zarif dış cephesiyle öne çıkar.', image: require('../assets/istanbul/beylerbeyi.jpg'), mapQuery: 'Beylerbeyi Sarayı İstanbul', credit: 'José Luiz · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Exterior_view_of_Beylerbeyi_Palace_(1).jpg' },
  { id: 'rumeli-hisari', name: 'Rumeli Hisarı', district: 'Sarıyer', category: 'Tarihî yapı', summary: 'Fatih Sultan Mehmet tarafından Boğaz’ın en dar noktalarından birinde yaptırılan görkemli kale ve açık hava tarih durağı.', image: require('../assets/istanbul/rumeli-fortress.jpg'), mapQuery: 'Rumeli Hisarı İstanbul', credit: 'Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Istanbul_Bosphorus_Rumelihisar%C4%B1_(Rumelian_Castle)_IMG_7804_1920.jpg' },
  { id: 'arkeoloji-muzeleri', name: 'İstanbul Arkeoloji Müzeleri', district: 'Fatih', category: 'Müze', summary: 'Arkeoloji Müzesi, Eski Şark Eserleri Müzesi ve Çinili Köşk’ten oluşan, farklı uygarlıklara uzanan büyük koleksiyon.', image: require('../assets/istanbul/archaeology-museum.jpg'), mapQuery: 'İstanbul Arkeoloji Müzeleri', credit: 'Yair Haklai · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Istanbul_Archaeological_Museums_(main_building)-.jpg' },
  { id: 'rahmi-koc', name: 'Rahmi M. Koç Müzesi', district: 'Beyoğlu', category: 'Müze', summary: 'Haliç kıyısında sanayi, ulaşım ve iletişim tarihini otomobillerden deniz araçlarına uzanan koleksiyonlarla anlatan aile dostu müze.', image: require('../assets/istanbul/rahmi-koc.jpg'), mapQuery: 'Rahmi M. Koç Müzesi İstanbul', credit: 'A. Savin · Free Art License', imagePage: 'https://commons.wikimedia.org/wiki/File:Istanbul_asv2021-11_img14_Rahmi_Ko%C3%A7_Museum.jpg' },
  { id: 'pera-muzesi', name: 'Pera Müzesi', district: 'Beyoğlu', category: 'Müze', summary: 'Oryantalist resim, Anadolu ağırlık ve ölçüleri ile Kütahya çini koleksiyonlarını dönemsel sergilerle buluşturan kent müzesi.', image: require('../assets/istanbul/pera-museum.jpg'), mapQuery: 'Pera Müzesi Beyoğlu İstanbul', credit: 'Tatiana Matlina · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Istanbul_Beyoglu_Pera_museum.jpg' },
  { id: 'oyuncak-muzesi', name: 'İstanbul Oyuncak Müzesi', district: 'Kadıköy', category: 'Müze', summary: 'Göztepe’de tarihî bir köşkte, 1700’lerden günümüze oyuncak tarihini çocuklar ve yetişkinler için hikâyelerle anlatan aile durağı.', image: require('../assets/istanbul/toy-museum.jpg'), mapQuery: 'İstanbul Oyuncak Müzesi Göztepe Kadıköy', credit: 'Palickap · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:MuzeumhracekIstanbul_budova.JPG' },
  { id: 'miniaturk', name: 'Miniatürk', district: 'Beyoğlu', category: 'Müze', summary: 'Türkiye ve yakın coğrafyanın önemli mimari eserlerini minyatür modellerle bir araya getiren, açık havada gezilebilen aile dostu müze park.', image: require('../assets/istanbul/miniaturk-new.jpg'), mapQuery: 'Miniatürk Sütlüce İstanbul', credit: 'VikiPicture · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Miniat%C3%BCrk_genel_g%C3%B6r%C3%BCn%C3%BCm.JPG' },
  { id: 'kariye', name: 'Kariye Camii', district: 'Fatih', category: 'Çok kültürlü miras', summary: 'Bizans dönemindeki manastır kilisesi kökeni, mozaikleri ve freskleriyle İstanbul’un katmanlı kültür tarihinin seçkin yapılarından.', image: require('../assets/istanbul/kariye.jpg'), mapQuery: 'Kariye Camii İstanbul', credit: 'Gryffindor · Public domain', imagePage: 'https://commons.wikimedia.org/wiki/File:Chora_Church_Constantinople_2007_panorama_002.jpg' },
  { id: 'fener-balat', name: 'Fener & Balat', district: 'Fatih', category: 'Çok kültürlü miras', summary: 'Renkli evleri, tarihî ibadet yapıları, dar sokakları ve Haliç mahalle kültürüyle yürüyerek keşfedilen çok katmanlı rota.', image: require('../assets/istanbul/balat.jpg'), mapQuery: 'Fener Balat İstanbul', credit: 'Antoloji · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Balat_houses.jpg' },
  { id: 'belgrad-ormani', name: 'Belgrad Ormanı', district: 'Sarıyer', category: 'Doğa · Sahil', summary: 'Yürüyüş ve koşu parkurları, bentleri ve geniş orman dokusuyla İstanbul’un kuzeyindeki en güçlü doğa kaçışlarından biri.', image: require('../assets/istanbul/belgrad-forest-new.jpg'), mapQuery: 'Belgrad Ormanı İstanbul', credit: 'KpokeJlJla · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:%D0%91%D0%B5%D0%BB%D0%B3%D1%80%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9_%D0%BB%D0%B5%D1%81,%D0%A1%D1%82%D0%B0%D0%BC%D0%B1%D1%83%D0%BB_-_1.JPG' },
  { id: 'yildiz-parki', name: 'Yıldız Parkı', district: 'Beşiktaş', category: 'Doğa · Sahil', summary: 'Boğaz sırtlarında koru dokusu, göletleri, yürüyüş yolları ve tarihî köşkleriyle şehir merkezindeki geniş yeşil kaçış.', image: require('../assets/istanbul/yildiz-park.jpg'), mapQuery: 'Yıldız Parkı Beşiktaş İstanbul', credit: 'Chapultepec · Kamu malı', imagePage: 'https://commons.wikimedia.org/wiki/File:Yildiz_Park_01.jpg' },
  { id: 'emirgan-korusu', name: 'Emirgan Korusu', district: 'Sarıyer', category: 'Doğa · Sahil', summary: 'Boğaz kıyısına yakın yamaçlarda göletleri, köşkleri ve özellikle ilkbahardaki renkli lale bahçeleriyle tanınır.', image: require('../assets/istanbul/emirgan-park.jpg'), mapQuery: 'Emirgan Korusu Sarıyer İstanbul', credit: 'Antonio Cristofaro · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Emirgan_park_pond_505.jpg' },
  { id: 'gulhane-parki', name: 'Gülhane Parkı', district: 'Fatih', category: 'Doğa · Sahil', summary: 'Topkapı Sarayı’nın eski dış bahçesinde uzanan tarihî kent parkı; ağaçlı yolları, çiçekleri ve Sarayburnu yakınlığıyla dinlenme durağıdır.', image: require('../assets/istanbul/gulhane-park.jpg'), mapQuery: 'Gülhane Parkı Fatih İstanbul', credit: 'Ninara · CC BY 2.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Gulhane_Park,_Istanbul_(52121614244).jpg' },
  { id: 'ihlamur-kasri', name: 'Ihlamur Kasrı', district: 'Beşiktaş', category: 'Saray', summary: '19. yüzyılda dinlenme ve kabul yapısı olarak kullanılan zarif Osmanlı kasrı; kabartmalı cephesi ve sakin bahçesiyle öne çıkar.', image: require('../assets/istanbul/ihlamur-pavilion.jpg'), mapQuery: 'Ihlamur Kasrı Beşiktaş İstanbul', credit: 'Hamdigumus · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Ihlamur_Kasr%C4%B1,_Be%C5%9Fikta%C5%9F_2014-8.jpg' },
  { id: 'camlica-korusu', name: 'Çamlıca Korusu', district: 'Üsküdar', category: 'Doğa · Sahil', summary: 'Çiçekli yürüyüş yolları, dinlenme alanları ve yüksek konumundan İstanbul manzaralarıyla Anadolu Yakası’nın sevilen korularından.', image: require('../assets/istanbul/camlica-grove.jpg'), mapQuery: 'Küçük Çamlıca Korusu Üsküdar İstanbul', credit: 'Heyamsoni · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:K%C3%BC%C3%A7%C3%BCk_%C3%87aml%C4%B1ca_Korusu.jpg' },
  { id: 'kapalicarsi', name: 'Kapalıçarşı', district: 'Fatih', category: 'Tarihî yapı', summary: 'Kubbeli sokakları, hanları ve binlerce dükkânıyla yüzyıllardır İstanbul’un ticaret kültürünü yaşatan tarihî çarşı labirenti.', image: require('../assets/istanbul/grand-bazaar.jpg'), mapQuery: 'Kapalıçarşı Fatih İstanbul', credit: 'Morgan Sand · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Istanbul_Gran_Bazaar.jpg' },
  { id: 'misir-carsisi', name: 'Mısır Çarşısı', district: 'Fatih', category: 'Tarihî yapı', summary: 'Eminönü’nde baharat, lokum, kuruyemiş ve geleneksel ürünlerin sıralandığı, kubbeli ana koridoruyla ünlü Osmanlı çarşısı.', image: require('../assets/istanbul/spice-bazaar.jpg'), mapQuery: 'Mısır Çarşısı Eminönü İstanbul', credit: 'Thomas Berwing · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:20220322-L1020878.jpg' },
  { id: 'istanbul-surlari', name: 'İstanbul Kara Surları', district: 'Fatih', category: 'Tarihî yapı', summary: 'Tarihî yarımadayı karadan koruyan, kuleleri ve kapılarıyla Roma ve Bizans savunma mimarisinin izlerini taşıyan uzun sur hattı.', image: require('../assets/istanbul/city-walls.jpg'), mapQuery: 'İstanbul Kara Surları Fatih', credit: 'Wikimedia Commons · CC BY-SA 2.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Theodosian_Walls_of_Constantinople,_Istanbul_(37648095330).jpg' },
  { id: 'anadolu-hisari', name: 'Anadolu Hisarı', district: 'Beykoz', category: 'Tarihî yapı', summary: 'Boğaz’ın Anadolu yakasında Yıldırım Bayezid döneminde yaptırılan ve Rumeli Hisarı’yla karşılıklı duran tarihî savunma yapısı.', image: require('../assets/istanbul/anadolu-fortress.jpg'), mapQuery: 'Anadolu Hisarı Beykoz İstanbul', credit: 'Wikimedia Commons · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Anadolu_hisar%C4%B1.jpg' },
  { id: 'istanbul-modern', name: 'İstanbul Modern', district: 'Beyoğlu', category: 'Müze', summary: 'Karaköy kıyısındaki çağdaş müze; modern ve güncel sanat sergilerini, fotoğrafı, tasarımı ve Boğaz manzarasını bir araya getirir.', image: require('../assets/istanbul/istanbul-modern.jpg'), mapQuery: 'İstanbul Modern Karaköy', credit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Istanbul_Museum_of_Modern_Art_Exterior_in_2024_5625.jpg' },
  { id: 'sakip-sabanci', name: 'Sakıp Sabancı Müzesi', district: 'Sarıyer', category: 'Müze', summary: 'Emirgan’daki Atlı Köşk’te hat, resim ve kitap sanatları koleksiyonlarıyla dönemsel uluslararası sergileri buluşturan Boğaz müzesi.', image: require('../assets/istanbul/sabanci-museum.jpg'), mapQuery: 'Sakıp Sabancı Müzesi Emirgan İstanbul', credit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Istanbul_Sakip_Sabanci_Museum_Exterior_in_2014_8836.jpg' },
  { id: 'ortakoy-camii', name: 'Ortaköy Camii', district: 'Beşiktaş', category: 'Cami', summary: 'Resmî adı Büyük Mecidiye Camii olan yapı; barok etkili cephesi ve Boğaz kıyısındaki konumuyla İstanbul’un simge manzaralarındandır.', image: require('../assets/istanbul/ortakoy-mosque.jpg'), mapQuery: 'Ortaköy Camii Beşiktaş İstanbul', credit: 'Pragdon · CC0', imagePage: 'https://commons.wikimedia.org/wiki/File:Ortak%C3%B6y_Mosque,_2025.jpg' },
  { id: 'fatih-camii', name: 'Fatih Camii', district: 'Fatih', category: 'Cami', summary: 'Fatih Sultan Mehmet’in külliyesi içinde yer alan büyük Osmanlı camisi; avluları, medreseleri ve tarihî merkezdeki güçlü silüetiyle öne çıkar.', image: require('../assets/istanbul/fatih-mosque.jpg'), mapQuery: 'Fatih Camii İstanbul', credit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Istanbul_Fatih_Mosque_courtyard_in_2015_9278.jpg' },
  { id: 'yeni-camii', name: 'Yeni Camii', district: 'Fatih', category: 'Cami', summary: 'Eminönü Meydanı ve Mısır Çarşısı yanında yükselen Osmanlı selatin camisi; kubbeli silüetiyle Haliç kıyısının temel simgelerindendir.', image: require('../assets/istanbul/new-mosque.jpg'), mapQuery: 'Yeni Camii Eminönü İstanbul', credit: 'Till Niermann · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:New_Mosque,_Istanbul,_from_Bosphorus.jpg' },
  { id: 'cagaloglu-hamami', name: 'Cağaloğlu Hamamı', district: 'Fatih', category: 'Hamam', summary: '1741’de tamamlanan tarihî Osmanlı hamamı; mermer iç mekânı, kubbeli sıcaklık bölümü ve geleneksel hamam deneyimiyle tarihî yarımadanın seçkin duraklarından.', image: require('../assets/istanbul/cagaloglu-hamam.jpg'), mapQuery: 'Cağaloğlu Hamamı Fatih İstanbul', credit: 'Orkut Murat Yılmaz · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Cağaloğlu_Hamam.jpg' },
  { id: 'kuzguncuk', name: 'Kuzguncuk', district: 'Üsküdar', category: 'Anadolu Yakası', summary: 'Boğaz kıyısındaki tarihî evleri, bostanı, farklı inanç yapılarını ve mahalle kafelerini bir araya getiren sakin yürüyüş rotası.', image: require('../assets/istanbul/kuzguncuk.jpg'), mapQuery: 'Kuzguncuk Üsküdar İstanbul', credit: 'BoRa KiLiC · CC BY 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Kuzguncuk,_Boğaziçi_Köprüsü,_Üsküdar-İstanbul,_Turkey_-_panoramio_(2).jpg' },
  { id: 'caddebostan-sahili', name: 'Caddebostan Sahili', district: 'Kadıköy', category: 'Sahil', summary: 'Marmara kıyısında yürüyüş, bisiklet, çim alanlar ve gün batımı manzaraları sunan Anadolu Yakası’nın uzun soluklu sahil parkı.', image: require('../assets/istanbul/caddebostan.jpg'), mapQuery: 'Caddebostan Sahili Kadıköy İstanbul', credit: 'Raicem · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Caddebostan_Coastal_Park.jpg' },
  { id: 'cemberlitas-hamami', name: 'Çemberlitaş Hamamı', district: 'Fatih', category: 'Hamam', summary: 'Mimar Sinan’ın 16. yüzyılda Nurbanu Sultan için tasarladığı çifte hamam; anıtsal kubbesi ve klasik Osmanlı hamam düzeniyle öne çıkar.', image: require('../assets/istanbul/cemberlitas-hamam.jpg'), mapQuery: 'Çemberlitaş Hamamı Fatih İstanbul', credit: 'Maksym Kozlenko · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:2013-01-02_Çemberlitaş_Hamamı_Istanbul.jpg' },
  { id: 'hurrem-sultan-hamami', name: 'Hürrem Sultan Hamamı', district: 'Fatih', category: 'Hamam', summary: 'Ayasofya ile Sultanahmet arasında Mimar Sinan tarafından yapılan 16. yüzyıl hamamı; uzun cephesi ve simetrik çifte hamam planıyla dikkat çeker.', image: require('../assets/istanbul/hurrem-sultan-hamam.jpg'), mapQuery: 'Haseki Hürrem Sultan Hamamı Fatih İstanbul', credit: 'Wikimedia Commons · Serbest lisans', imagePage: 'https://commons.wikimedia.org/wiki/File:Bath_of_Roxelane_Istanbul_2007.jpg' },
  { id: 'kilic-ali-pasa-hamami', name: 'Kılıç Ali Paşa Hamamı', district: 'Beyoğlu', category: 'Hamam', summary: 'Tophane’de Mimar Sinan’ın külliye içinde tasarladığı tarihî hamam; geniş kubbesi ve restore edilmiş taş dokusuyla geleneksel deneyim sunar.', image: require('../assets/istanbul/kilic-ali-pasa-hamam.jpg'), mapQuery: 'Kılıç Ali Paşa Hamamı Tophane İstanbul', credit: 'Metuboy · Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Kılıç_Ali_Pasha_Hamam.jpg' },
  { id: 'moda-sahili', name: 'Moda Sahili', district: 'Kadıköy', category: 'Anadolu Yakası', summary: 'Tarihî Moda İskelesi, parkları, gün batımı manzarası ve Kadıköy çarşısına yakınlığıyla yürüyüş ve dinlenme için sevilen kıyı rotası.', image: require('../assets/istanbul/moda.jpg'), mapQuery: 'Moda Sahili Kadıköy İstanbul', credit: 'Vikimedyahesap · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Moda_İskelesi_2019-08.jpg' },
  { id: 'kanlica', name: 'Kanlıca', district: 'Beykoz', category: 'Anadolu Yakası', summary: 'Boğaz kıyısındaki yalıları, küçük meydanı, vapur iskelesi ve meşhur yoğurduyla sakin bir Anadolu Yakası molası.', image: require('../assets/istanbul/kanlica.jpg'), mapQuery: 'Kanlıca Meydanı Beykoz İstanbul', credit: 'Moonik · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Yalı_in_Kanlıca_on_the_Bosphorus,_Turkey_002.jpg' },
  { id: 'anadolu-kavagi', name: 'Anadolu Kavağı', district: 'Beykoz', category: 'Anadolu Yakası', summary: 'Boğaz’ın Karadeniz’e yaklaştığı balıkçı mahallesi; vapur iskelesi, deniz ürünleri lokantaları ve tepede yükselen Yoros Kalesi’yle günübirlik rota sunar.', image: require('../assets/istanbul/anadolu-kavagi.jpg'), mapQuery: 'Anadolu Kavağı Beykoz İstanbul', credit: 'Moonik · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bosphorus,_Anadolu_Kavağı,_Turkey_010.JPG' },
  { id: 'sile', name: 'Şile', district: 'Şile', category: 'Sahil', summary: 'Karadeniz kıyısındaki plajları, tarihî deniz feneri, limanı ve çevredeki koylarıyla şehir merkezinden uzaklaşmak isteyenler için güçlü bir sahil rotası.', image: require('../assets/istanbul/sile.jpg'), mapQuery: 'Şile Feneri ve Şile Sahili İstanbul', credit: 'Wikimedia Commons · CC BY-SA', imagePage: 'https://commons.wikimedia.org/wiki/File:Şile_Feneri_(Şile_Lighthouse),_June_2025.jpg' },
  { id: 'kilyos', name: 'Kilyos', district: 'Sarıyer', category: 'Sahil', summary: 'Karadeniz kıyısında geniş kumsalları, plajları ve yaz etkinlikleriyle İstanbul’un kuzeyindeki en bilinen deniz kaçışlarından.', image: require('../assets/istanbul/kilyos.jpg'), mapQuery: 'Kilyos Plajı Sarıyer İstanbul', credit: 'eleesege · CC BY 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Kylyos_Beach_on_the_Black_Sea,_Turkey_-_panoramio.jpg' },
  { id: 'riva', name: 'Riva', district: 'Beykoz', category: 'Sahil', summary: 'Riva Deresi’nin Karadeniz’le buluştuğu kıyıda plajları, balıkçı tekneleri, yürüyüş alanları ve tepede yükselen Riva Kalesi’yle doğa ve tarih rotası.', image: require('../assets/istanbul/riva.jpg'), mapQuery: 'Riva Sahili ve Riva Kalesi Beykoz İstanbul', credit: 'Nevit Dilmen · GFDL / CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Riva_deresi_1080232_1080262.jpg' },
];

const venueRows: [string, string, string][] = [
  ['Karaköy & Galata','Beyoğlu','Tasarım kafeleri, kahve ve yeni nesil mutfak'], ['Kadıköy Çarşı & Moda','Kadıköy','Sokak lezzetleri, meyhaneler ve üçüncü nesil kahve'],
  ['Beşiktaş Çarşı','Beşiktaş','Kahvaltı, balık ve hareketli öğrenci yaşamı'], ['Nişantaşı','Şişli','Pastaneler, dünya mutfağı ve şık kafeler'],
  ['Sultanahmet & Eminönü','Fatih','Tarihî lokantalar, köfte ve geleneksel tatlılar'], ['Arnavutköy & Bebek','Beşiktaş','Boğaz manzaralı restoran ve kafeler'],
  ['Kuzguncuk & Çengelköy','Üsküdar','Mahalle kafeleri, fırınlar ve Boğaz kıyısı'], ['Sarıyer & Rumelikavağı','Sarıyer','Balık restoranları ve kıyı kahvaltısı'],
];
export const istanbulVenueAreas = venueRows.map(([area,district,character]) => ({ area, district, character, cafeQuery: `en iyi kafeler ${area} İstanbul`, restaurantQuery: `en iyi restoranlar ${area} İstanbul` }));

export const istanbulFamilyRoutes = [
  { area: 'Haliç keşif günü', district: 'Beyoğlu · Eyüpsultan', character: 'Miniatürk, Rahmi M. Koç Müzesi ve Haliç kıyısını aynı güne sığdıran merak odaklı aile rotası.', mapQuery: 'Miniatürk Rahmi M. Koç Müzesi İstanbul' },
  { area: 'Göztepe’den Moda’ya', district: 'Kadıköy', character: 'Oyuncak Müzesi ziyareti, park molası ve Moda Sahili yürüyüşünü birleştiren sakin Anadolu Yakası günü.', mapQuery: 'İstanbul Oyuncak Müzesi Moda Sahili' },
  { area: 'Tarih çocuklarla', district: 'Fatih', character: 'Gülhane Parkı, İstanbul Arkeoloji Müzeleri ve Yerebatan Sarnıcı çevresinde kısa yürüyüşlü keşif.', mapQuery: 'Gülhane Parkı İstanbul Arkeoloji Müzeleri Yerebatan Sarnıcı' },
  { area: 'Ada macerası', district: 'Adalar', character: 'Vapur yolculuğu, Büyükada kıyıları ve araçsız sokaklarda ailece keşif için tam günlük rota.', mapQuery: 'Büyükada aile gezisi İstanbul' },
];

export const istanbulNightlifeAreas = [
  { area: 'Asmalımescit & Nevizade', district: 'Beyoğlu', character: 'Canlı müzik, meyhane ve geç saatlere uzanan hareketli sokak atmosferi.', mapQuery: 'Asmalımescit Nevizade gece hayatı İstanbul' },
  { area: 'Karaköy & Galata', district: 'Beyoğlu', character: 'Tasarım barları, teraslar ve Galata çevresinde kültürle birleşen akşam rotası.', mapQuery: 'Karaköy Galata barlar gece hayatı' },
  { area: 'Kadıköy & Moda', district: 'Kadıköy', character: 'Barlar Sokağı, konser mekânları ve mahalle publarıyla Anadolu Yakası’nın canlı merkezi.', mapQuery: 'Kadıköy Moda gece hayatı barlar' },
  { area: 'Ortaköy & Kuruçeşme', district: 'Beşiktaş', character: 'Boğaz manzaralı restoranlar, kulüpler ve geceye uzanan kıyı deneyimi.', mapQuery: 'Ortaköy Kuruçeşme gece hayatı' },
];

export const istanbulShoppingStreets = [
  { area: 'İstiklal Caddesi', district: 'Beyoğlu', character: 'Tarihî pasajlar, kitapçılar, markalar ve kültür duraklarıyla şehrin simge yaya aksı.', mapQuery: 'İstiklal Caddesi İstanbul' },
  { area: 'Bağdat Caddesi', district: 'Kadıköy', character: 'Geniş kaldırımları, mağazaları ve kafeleriyle Anadolu Yakası’nın uzun alışveriş bulvarı.', mapQuery: 'Bağdat Caddesi Kadıköy İstanbul' },
  { area: 'Abdi İpekçi Caddesi', district: 'Şişli', character: 'Nişantaşı’nın tasarım mağazaları, seçkin markaları ve şehir kafeleriyle öne çıkan caddesi.', mapQuery: 'Abdi İpekçi Caddesi Nişantaşı İstanbul' },
  { area: 'Bahariye Caddesi', district: 'Kadıköy', character: 'Çarşıdan Moda yönüne uzanan tramvaylı yaya aksında mağaza, pasaj ve kültür durakları.', mapQuery: 'Bahariye Caddesi Kadıköy İstanbul' },
];

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

export const istanbulAccommodations = [
  { area: 'Sultanahmet', district: 'Fatih', category: 'Tarih', bestFor: 'İlk ziyaret · tarih', character: 'Ayasofya, Topkapı ve tarihî yarımadaya yürüyerek ulaşmak isteyenler için.', level: 'Karma', mapQuery: 'otel konaklama Sultanahmet Fatih İstanbul' },
  { area: 'Taksim & Beyoğlu', district: 'Beyoğlu', category: 'Gece hayatı', bestFor: 'Kültür · gece hayatı', character: 'İstiklal, müzeler, restoranlar ve merkezi ulaşımın yakınında.', level: 'Karma', mapQuery: 'otel konaklama Taksim Beyoğlu İstanbul' },
  { area: 'Beşiktaş & Boğaz', district: 'Beşiktaş', category: 'Merkezi ulaşım', bestFor: 'Boğaz · merkezi ulaşım', character: 'Vapur bağlantıları, saraylar ve Boğaz kıyısına yakın şehir otelleri.', level: 'Lüks', mapQuery: 'otel konaklama Beşiktaş Boğaz İstanbul' },
  { area: 'Kadıköy & Moda', district: 'Kadıköy', category: 'Yerel yaşam', bestFor: 'Yerel yaşam · yeme içme', character: 'Anadolu Yakası’nın çarşı, sahil, kafe ve gece yaşamına yakın.', level: 'Orta', mapQuery: 'otel konaklama Kadıköy Moda İstanbul' },
  { area: 'Şişli & Nişantaşı', district: 'Şişli', category: 'İş & alışveriş', bestFor: 'Alışveriş · iş seyahati', character: 'Metro, alışveriş, iş merkezleri ve şehir otelleri için güçlü bir üs.', level: 'Lüks', mapQuery: 'otel konaklama Şişli Nişantaşı İstanbul' },
  { area: 'Büyükada', district: 'Adalar', category: 'Sakin tatil', bestFor: 'Sakinlik · hafta sonu', character: 'Tarihî köşk atmosferinde butik otel ve pansiyon seçenekleri.', level: 'Orta', mapQuery: 'otel butik otel pansiyon Büyükada İstanbul' },
];

export const istanbulRoutes = [
  { title: 'Tarihî Yarımada', duration: '1 tam gün', color: '#75513B', stops: ['Ayasofya','Sultanahmet Camii','Topkapı Sarayı','Yerebatan Sarnıcı','Kapalıçarşı'] },
  { title: 'Galata’dan Boğaz’a', duration: '1 tam gün', color: '#315F53', stops: ['Galata Kulesi','Karaköy','Dolmabahçe Sarayı','Ortaköy','Bebek'] },
  { title: 'Anadolu Yakası', duration: '1 tam gün', color: '#477A89', stops: ['Kuzguncuk','Üsküdar Sahili','Kadıköy Çarşı','Moda Sahili','Caddebostan'] },
  { title: 'Adalar günü', duration: '1 tam gün', color: '#6B7252', stops: ['Büyükada İskelesi','Aya Yorgi Yokuşu','Büyükada Köşkleri','Dilburnu'] },
  { title: 'Müzeler & Haliç', duration: '1 tam gün', color: '#73566F', stops: ['İstanbul Arkeoloji Müzeleri','Galata Kulesi','Rahmi M. Koç Müzesi','Miniatürk'] },
  { title: 'Çok kültürlü miras', duration: '1 tam gün', color: '#A26448', stops: ['Kariye Camii','Fener Rum Patrikhanesi','Balat','Sveti Stefan Kilisesi'] },
  { title: 'Orman & Boğaz', duration: '1 tam gün', color: '#3F6650', stops: ['Belgrad Ormanı','Emirgan Korusu','Rumeli Hisarı','Bebek Sahili'] },
  { title: 'Tarihî çarşılar', duration: 'Yarım gün', color: '#8A593B', stops: ['Kapalıçarşı','Mahmutpaşa','Mısır Çarşısı','Yeni Camii'] },
  { title: 'Boğaz’ın hisarları', duration: '1 tam gün', color: '#405C70', stops: ['Anadolu Hisarı','Küçüksu Kasrı','Rumeli Hisarı','Emirgan Korusu'] },
];

export const istanbulTransport = [
  { icon: 'M', name: 'Metro', description: 'Raylı sistemle iki yakadaki merkezlere hızlı erişim ve aktarma noktaları.', mapQuery: 'İstanbul metro istasyonları' },
  { icon: 'MR', name: 'Marmaray', description: 'Boğaz’ın altından Avrupa ve Anadolu yakalarını birbirine bağlayan banliyö hattı.', mapQuery: 'İstanbul Marmaray istasyonları' },
  { icon: 'V', name: 'Vapur & deniz ulaşımı', description: 'Boğaz, Haliç ve Adalar arasında manzaralı şehir hatları bağlantıları.', mapQuery: 'İstanbul vapur iskeleleri' },
  { icon: 'MB', name: 'Metrobüs', description: 'Ana arter boyunca iki yakayı 24 saat çalışan otobüs hattıyla bağlayan sistem.', mapQuery: 'İstanbul metrobüs durakları' },
  { icon: 'T', name: 'Tramvay & füniküler', description: 'Tarihî yarımada, Beyoğlu ve Boğaz bağlantılarındaki kısa şehir hatları.', mapQuery: 'İstanbul tramvay füniküler istasyonları' },
  { icon: '✈', name: 'Havalimanı ulaşımı', description: 'İstanbul ve Sabiha Gökçen havalimanlarına toplu taşıma seçenekleri.', mapQuery: 'İstanbul havalimanı toplu taşıma' },
];

export const istanbulGallery = [
  { title: 'Tarihî Yarımada', district: 'Fatih', image: require('../assets/istanbul/hagia-sophia.jpg') },
  { title: 'Boğaz kıyıları', district: 'Beşiktaş', image: require('../assets/istanbul/ortakoy-mosque.jpg') },
  { title: 'Dolmabahçe Sarayı', district: 'Beşiktaş', image: require('../assets/istanbul/dolmabahce.jpg') },
  { title: 'Galata', district: 'Beyoğlu', image: require('../assets/istanbul/galata.jpg') },
  { title: 'Adalar', district: 'Adalar', image: require('../assets/istanbul/princes-islands.jpg') },
  { title: 'Emirgan Korusu', district: 'Sarıyer', image: require('../assets/istanbul/emirgan-park.jpg') },
];
