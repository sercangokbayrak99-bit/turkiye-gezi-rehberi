import type { ImageSourcePropType } from 'react-native';
import type { AccommodationArea, DailyRoute } from './guideData';

export type AnkaraPlace = {
  id: string;
  name: string;
  district: string;
  category: string;
  summary: string;
  image: ImageSourcePropType;
  mapQuery: string;
  credit: string;
  imagePage: string;
  sourceUrl: string;
};

export type AnkaraDistrict = {
  name: string;
  signature: string;
  highlights: string[];
  flavors: string[];
  mapQuery: string;
};

export const ankaraPlaces: AnkaraPlace[] = [
  { id: 'ankara-anitkabir', name: 'Anıtkabir', district: 'Çankaya', category: 'Tarihî yapı', summary: 'Mustafa Kemal Atatürk’ün mozolesi, Kurtuluş Savaşı Müzesi, Aslanlı Yol ve tören meydanıyla başkentin en önemli ziyaret alanı.', image: require('../assets/ankara/anitkabir.jpg'), mapQuery: 'Anıtkabir Çankaya Ankara', credit: 'A. Savin · FAL', imagePage: 'https://commons.wikimedia.org/wiki/File:Ankara_asv2021-10_img04_Anıtkabir.jpg', sourceUrl: 'https://www.anitkabir.tsk.tr/' },
  { id: 'ankara-kalesi', name: 'Ankara Kalesi', district: 'Altındağ', category: 'Tarihî yapı', summary: 'Roma, Bizans, Selçuklu ve Osmanlı dönemlerinde onarılan surları, eski Ankara evleri ve şehir manzarasıyla tarihî merkezin simgesi.', image: require('../assets/ankara/ankara-kalesi.jpg'), mapQuery: 'Ankara Kalesi Altındağ Ankara', credit: 'Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Ankara_Castle.jpg', sourceUrl: 'https://kulturportali.gov.tr/turkiye/ankara/gezilecekyer/ankara-kalesi' },
  { id: 'ankara-anadolu-medeniyetleri', name: 'Anadolu Medeniyetleri Müzesi', district: 'Altındağ', category: 'Müze', summary: 'Paleolitik Çağ’dan Osmanlı dönemine uzanan Anadolu arkeolojisini, Mahmut Paşa Bedesteni ve Kurşunlu Han’da kronolojik olarak anlatır.', image: require('../assets/ankara/anadolu-medeniyetleri.jpg'), mapQuery: 'Anadolu Medeniyetleri Müzesi Altındağ Ankara', credit: 'Raicem · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Entrance_of_the_Museum_of_Anatolian_Civilizations_in_Ankara.jpg', sourceUrl: 'https://muze.gov.tr/muze-detay?DistId=AMM&SectionId=AMM01' },
  { id: 'ankara-hamamonu', name: 'Hamamönü', district: 'Altındağ', category: 'Tarihî doku', summary: 'Restore edilmiş Ankara evleri, Mehmet Âkif Ersoy Müze Evi, el sanatları ve yeme-içme duraklarıyla yürüyerek keşfedilen tarihî mahalle.', image: require('../assets/ankara/hamamonu.jpg'), mapQuery: 'Hamamönü Altındağ Ankara', credit: 'Omer Unlu · CC BY 2.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Hamamönü_(6477376115).jpg', sourceUrl: 'https://kulturportali.gov.tr/turkiye/ankara/gezilecekyer/hamamonu' },
  { id: 'ankara-augustus', name: 'Augustus Tapınağı', district: 'Altındağ', category: 'Tarihî yapı', summary: 'Hacı Bayram çevresinde yer alan Roma dönemi tapınağı, duvarlarındaki Monumentum Ancyranum yazıtıyla dünya tarihi açısından önemlidir.', image: require('../assets/ankara/augustus.jpg'), mapQuery: 'Augustus Tapınağı Altındağ Ankara', credit: 'Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Augustus_Tapınağı.jpg', sourceUrl: 'https://ankara.ktb.gov.tr/TR-152350/gezilecek-yerler.html' },
  { id: 'ankara-roma-hamami', name: 'Roma Hamamı Açık Hava Müzesi', district: 'Altındağ', category: 'Tarihî yapı', summary: 'Caracalla dönemine tarihlenen hamam kalıntıları, sütunlu yol ve Roma dönemi taş eserleriyle Ulus’taki önemli arkeolojik duraklardan.', image: require('../assets/ankara/roma-hamami.jpg'), mapQuery: 'Roma Hamamı Açık Hava Müzesi Altındağ Ankara', credit: 'Diego Delso · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Baños_romanos,_Ankara,_Turquía,_2024-10-03,_DD_40-44_PAN.jpg', sourceUrl: 'https://ankara.ktb.gov.tr/TR-152350/gezilecek-yerler.html' },
  { id: 'ankara-haci-bayram', name: 'Hacı Bayram-ı Veli Camii ve Türbesi', district: 'Altındağ', category: 'Manevi', summary: 'Augustus Tapınağı’nın yanında yer alan cami ve türbe, Ankara’nın en güçlü manevi ziyaret merkezlerinden biridir.', image: require('../assets/ankara/haci-bayram.jpg'), mapQuery: 'Hacı Bayram-ı Veli Camii Altındağ Ankara', credit: 'Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Haci_Bayram_Mosque_01.jpg', sourceUrl: 'https://ankara.ktb.gov.tr/TR-152350/gezilecek-yerler.html' },
  { id: 'ankara-kocatepe', name: 'Kocatepe Camii', district: 'Çankaya', category: 'Manevi', summary: 'Dört minaresi ve geniş kubbesiyle Ankara silüetinin belirgin yapılarından; merkezi konumuyla ibadet ve mimari ziyaret noktası.', image: require('../assets/ankara/kocatepe.jpg'), mapQuery: 'Kocatepe Camii Çankaya Ankara', credit: 'A. Savin · FAL', imagePage: 'https://commons.wikimedia.org/wiki/File:Ankara_asv2021-10_img40_Kocatepe_Mosque.jpg', sourceUrl: 'https://ankara.ktb.gov.tr/TR-152350/gezilecek-yerler.html' },
  { id: 'ankara-atakule', name: 'Atakule', district: 'Çankaya', category: 'Manzara', summary: 'Çankaya sırtlarında yer alan seyir kulesi; şehir panoraması, alışveriş ve yeme-içme alanlarıyla modern Ankara’nın simgelerinden.', image: require('../assets/ankara/atakule.jpg'), mapQuery: 'Atakule Çankaya Ankara', credit: 'Gargarapalvin · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Botanik_Parkı_ve_Atakule,_2019_04.jpg', sourceUrl: 'https://www.kulturportali.gov.tr/turkiye/ankara/gezilecekyer/atakule' },
  { id: 'ankara-eymir', name: 'Eymir Gölü', district: 'Gölbaşı', category: 'Doğa', summary: 'Bisiklet, yürüyüş ve kuş gözlemi için kullanılan göl çevresi; kent merkezine yakın sakin bir doğa rotası.', image: require('../assets/ankara/eymir.jpg'), mapQuery: 'Eymir Gölü Gölbaşı Ankara giriş', credit: 'Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Eymir_Gölü_(Lake_Eymir)_02.jpg', sourceUrl: 'https://ankara.ktb.gov.tr/Eklenti/48859,ankararehberi2016pdf.pdf?0=' },
  { id: 'ankara-mogan', name: 'Mogan Gölü ve Parkı', district: 'Gölbaşı', category: 'Doğa', summary: 'Göl kıyısı yürüyüş parkurları, rekreasyon alanları ve kuş yaşamıyla ailece vakit geçirilebilen geniş bir kent doğası alanı.', image: require('../assets/ankara/mogan.jpg'), mapQuery: 'Mogan Gölü Parkı Gölbaşı Ankara', credit: 'European Commission / Necati Savaş · CC BY 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Ankara,_capital_of_Türkiye_(P-064723-00-162).jpg', sourceUrl: 'https://ankara.ktb.gov.tr/Eklenti/48859,ankararehberi2016pdf.pdf?0=' },
  { id: 'ankara-soguksu', name: 'Soğuksu Millî Parkı', district: 'Kızılcahamam', category: 'Doğa', summary: 'Çam ormanları, yürüyüş rotaları, jeolojik oluşumları ve yaban hayatıyla Ankara’nın öne çıkan korunan doğa alanlarından.', image: require('../assets/ankara/soguksu.jpg'), mapQuery: 'Soğuksu Milli Parkı Kızılcahamam Ankara', credit: 'Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Soğuksu_Milli_Parkı.jpg', sourceUrl: 'https://ankara.ktb.gov.tr/Eklenti/48859,ankararehberi2016pdf.pdf?0=' },
  { id: 'ankara-nallihan', name: 'Nallıhan Kuş Cenneti', district: 'Nallıhan', category: 'Doğa', summary: 'Sarıyar Barajı kıyısındaki sulak alan, renkli jeolojik tepeleri ve zengin kuş varlığıyla doğa fotoğrafçılığı için güçlü bir rota.', image: require('../assets/ankara/nallihan.jpg'), mapQuery: 'Nallıhan Kuş Cenneti Davutoğlan Ankara', credit: 'Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Nallihan_Bird_Sanctuary_and_Rainbow_Hills.jpg', sourceUrl: 'https://www.kulturportali.gov.tr/turkiye/ankara/gezilecekyer/nallihan-kus-cenneti' },
  { id: 'ankara-gordion', name: 'Gordion Antik Kenti ve Müzesi', district: 'Polatlı', category: 'Tarihî yapı', summary: 'Frigya’nın başkenti, Büyük Tümülüs ve arkeoloji müzesiyle birlikte 2023’ten beri UNESCO Dünya Mirası Listesi’nde.', image: require('../assets/ankara/gordion.jpg'), mapQuery: 'Gordion Antik Kenti Yassıhöyük Polatlı Ankara', credit: 'Özge Kesgin · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Ankara_Gordion_Tümülüsleri.jpg', sourceUrl: 'https://www.kulturportali.gov.tr/portal/gordion' },
  { id: 'ankara-beypazari', name: 'Beypazarı Tarihî Merkezi', district: 'Beypazarı', category: 'Tarihî doku', summary: 'Cumbalı evleri, yaşayan müzeleri, el sanatları, çarşısı ve yerel mutfağıyla Ankara’nın en kapsamlı günübirlik kültür rotalarından.', image: require('../assets/ankara/beypazari.jpg'), mapQuery: 'Beypazarı tarihi evleri Ankara', credit: 'İlhan Turun · CC BY 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Beypazarı-Ankara,_Turkey_-_panoramio.jpg', sourceUrl: 'https://kulturportali.gov.tr/turkiye/ankara/gezilecekyer/beypazari-yasayan-muze' },
  { id: 'ankara-tuz-golu', name: 'Tuz Gölü Şereflikoçhisar Kıyısı', district: 'Şereflikoçhisar', category: 'Doğa', summary: 'Mevsime göre değişen beyaz tuz yüzeyi ve geniş ufuk çizgisiyle fotoğraf ve gün batımı için Ankara’nın sıra dışı doğa duraklarından.', image: require('../assets/ankara/tuz-golu.jpg'), mapQuery: 'Tuz Gölü ziyaretçi alanı Şereflikoçhisar Ankara', credit: 'Wikimedia Commons', imagePage: 'https://commons.wikimedia.org/wiki/File:Lake_Tuz_-_Hacıbektaşlı,_Şereflikoçhisar,_Ankara_Province,_Turkey_-_October_3,_2025.jpg', sourceUrl: 'https://ankara.ktb.gov.tr/TR-152350/gezilecek-yerler.html' },
  { id: 'ankara-altinpark', name: 'Altınpark', district: 'Altındağ', category: 'Aile & Park', summary: 'Gölet, bahçeler, spor ve etkinlik alanlarıyla geniş bir kent parkı; Feza Gürsey Bilim Merkezi sayesinde çocuklu aileler için de uygun.', image: require('../assets/ankara/altinpark.jpg'), mapQuery: 'Altınpark Altındağ Ankara', credit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Ankara_Altınpark_as_such_in_2005_01.jpg', sourceUrl: 'https://kulturportali.gov.tr/turkiye/ankara/gezilecekyer/altinpark' },
];

const district = (name: string, signature: string, highlights: string[], flavors: string[]): AnkaraDistrict => ({ name, signature, highlights, flavors, mapQuery: `${name} Ankara` });

export const ankaraDistricts: AnkaraDistrict[] = [
  district('Akyurt', 'Kırsal peyzaj ve başkentin kuzeydoğu kapısı', ['Balıkhisar çevresi', 'Kırsal yürüyüşler', 'Yerel pazar'], ['Bazlama', 'Köy ürünleri']),
  district('Altındağ', 'Kale, Ulus, müzeler ve eski Ankara', ['Ankara Kalesi', 'Anadolu Medeniyetleri Müzesi', 'Hamamönü'], ['Ankara simidi', 'Ankara tava']),
  district('Ayaş', 'Tarihî konaklar, kaplıca ve dut bağları', ['Ayaş evleri', 'Ayaş kaplıcaları', 'Bünyamin Ayaşi Camii'], ['Ayaş domatesi', 'Dut ürünleri']),
  district('Bala', 'Bozkır rotaları ve Beynam ormanları', ['Beynam Atatürk Ormanı', 'Kesikköprü çevresi', 'Kırsal köyler'], ['Köy ekmeği', 'Et yemekleri']),
  district('Beypazarı', 'Cumbalı evler, yaşayan kültür ve çarşı', ['Tarihî Beypazarı evleri', 'Yaşayan Müze', 'İnözü Vadisi'], ['Beypazarı güveci', 'Beypazarı kurusu', 'Havuç lokumu']),
  district('Çamlıdere', 'Baraj gölü, orman ve yayla havası', ['Çamlıdere Barajı', 'Doğa ve Hayvan Müzesi', 'Yayla rotaları'], ['Bal', 'Köy ürünleri']),
  district('Çankaya', 'Cumhuriyet mirası, kültür ve modern kent yaşamı', ['Anıtkabir', 'Atakule', 'Kuğulu Park'], ['Ankara tava', 'Kafe kültürü']),
  district('Çubuk', 'Turşu, Karagöl ve kırsal doğa', ['Karagöl Tabiat Parkı', 'Çubuk-1 Barajı', 'Kırsal yaylalar'], ['Çubuk turşusu', 'Vişne']),
  district('Elmadağ', 'Kayak, dağ yürüyüşü ve panoramik bozkır', ['Elmadağ Kayak Merkezi', 'Dağ yürüyüş rotaları', 'Hasanoğlan'], ['Et yemekleri', 'Köy kahvaltısı']),
  district('Etimesgut', 'Açık hava alanları ve aile etkinlikleri', ['Türk Tarih Müzesi ve Parkı', 'Göksu Parkı', 'Hava Müzesi'], ['Ankara mutfağı', 'Modern restoranlar']),
  district('Evren', 'Hirfanlı Baraj Gölü kıyısında sakin rota', ['Hirfanlı Baraj Gölü', 'Göl kıyısı', 'Kırsal manzaralar'], ['Göl balığı', 'Köy ürünleri']),
  district('Gölbaşı', 'Mogan ve Eymir çevresinde doğa', ['Eymir Gölü', 'Mogan Gölü', 'Tulumtaş Mağarası'], ['Gölbaşı kahvaltısı', 'Izgara']),
  district('Güdül', 'İnönü mağaraları ve tarihî sokaklar', ['İnönü Mağaraları', 'Güdül evleri', 'Sorgun Göleti'], ['Leblebi', 'Köy mutfağı']),
  district('Haymana', 'Termal kaynaklar ve Sakarya Meydan Muharebesi izleri', ['Haymana kaplıcaları', 'Sakarya Meydan Muharebesi alanları', 'Gavur Kalesi'], ['Haymana bazlaması', 'Et yemekleri']),
  district('Kahramankazan', 'Ova peyzajı ve rekreasyon alanları', ['Kurtboğazı Barajı', 'Kazan Ovası', 'Kırsal rotalar'], ['Kavurma', 'Köy ürünleri']),
  district('Kalecik', 'Bağlar, tarihî kale ve Kızılırmak manzarası', ['Kalecik Kalesi', 'Bağ rotaları', 'Kızılırmak kıyısı'], ['Kalecik Karası üzümü', 'Yaprak sarma']),
  district('Keçiören', 'Parklar, seyir alanları ve aile rotaları', ['Estergon Türk Kültür Merkezi', 'Keçiören Teleferiği', 'Kartaltepe Kent Ormanı'], ['Ankara mutfağı', 'Pastane kültürü']),
  district('Kızılcahamam', 'Millî park, termal kaynak ve orman', ['Soğuksu Millî Parkı', 'Kızılcahamam kaplıcaları', 'Abacı Peribacaları'], ['Bazlama', 'Maden suyu']),
  district('Mamak', 'Vadiler ve kent içi rekreasyon', ['Mavi Göl', 'Kayaş çevresi', 'Lavanta bahçeleri'], ['Ankara tava', 'Yerel pazar ürünleri']),
  district('Nallıhan', 'Kuş cenneti, renkli tepeler ve ipek iğne oyası', ['Nallıhan Kuş Cenneti', 'Jül Sezar Yolu', 'Taptuk Emre Türbesi'], ['Nallıhan höşmerimi', 'Erkeç pastırması']),
  district('Polatlı', 'Gordion ve Millî Mücadele cepheleri', ['Gordion Antik Kenti', 'Duatepe Anıtı', 'Alagöz Karargâh Müzesi'], ['Soğan', 'Et yemekleri']),
  district('Pursaklar', 'Kuzey Ankara parkları ve şehir yaşamı', ['Tebessüm Parkı', 'Endemik Vadi', 'Yerel etkinlik alanları'], ['Ankara simidi', 'Kafe kültürü']),
  district('Sincan', 'Parklar, banliyö yaşamı ve aile alanları', ['Harikalar Diyarı', 'Sincan Kent Meydanı', 'Temelli çevresi'], ['Ankara mutfağı', 'Izgara']),
  district('Şereflikoçhisar', 'Tuz Gölü ve bozkır ufku', ['Tuz Gölü kıyısı', 'Hirfanlı çevresi', 'Tuz Müzesi'], ['Tahinli pide', 'Köy ürünleri']),
  district('Yenimahalle', 'Müzeler, parklar ve modern ulaşım', ['Atatürk Orman Çiftliği', 'Cumhurbaşkanlığı Millet Kütüphanesi çevresi', 'Macunköy'], ['AOÇ ürünleri', 'Ankara döneri']),
];

export const ankaraFoodGuide = [
  { dish: 'Ankara tava', area: 'Ulus & Altındağ', note: 'Kuzu eti ve arpa şehriye/pirinçle hazırlanan başkent klasiğini geleneksel esnaf lokantalarında deneyin.', mapQuery: 'Ankara tava restoran Altındağ Ankara' },
  { dish: 'Ankara simidi', area: 'Ulus & Kızılay', note: 'Koyu renkli, yoğun pekmezli ve çıtır Ankara simidini tarihî fırınlar ve simitçilerde arayın.', mapQuery: 'Ankara simidi fırını Ankara' },
  { dish: 'Beypazarı güveci', area: 'Beypazarı', note: 'Uzun sürede pişen etli güveci tarihî çarşı çevresindeki yerel lokantalarda tadın.', mapQuery: 'Beypazarı güveci restoran Beypazarı Ankara' },
  { dish: 'Beypazarı kurusu', area: 'Beypazarı', note: 'Tereyağlı, tarçınlı ve uzun süre dayanabilen yerel kuruyu ilçe fırınlarından alın.', mapQuery: 'Beypazarı kurusu fırın Beypazarı Ankara' },
  { dish: 'Çubuk turşusu', area: 'Çubuk', note: 'İlçenin geleneksel üreticilerinden mevsimlik sebzelerle hazırlanan turşu çeşitlerini keşfedin.', mapQuery: 'Çubuk turşusu üreticileri Çubuk Ankara' },
  { dish: 'Kalecik Karası ürünleri', area: 'Kalecik', note: 'Bağ rotalarında yöresel üzüm ve yerel üretici ürünlerini inceleyin.', mapQuery: 'Kalecik Karası bağ rotası Kalecik Ankara' },
];

export const ankaraVenueAreas = [
  { area: 'Kızılay & Sakarya', district: 'Çankaya', character: 'Merkezi, hareketli ve farklı bütçelere uygun geniş yeme-içme seçkisi.', cafeQuery: 'kafeler Kızılay Ankara', restaurantQuery: 'restoranlar Kızılay Ankara' },
  { area: 'Tunalı & Kavaklıdere', district: 'Çankaya', character: 'Kafeler, pastaneler ve akşam yemeği mekânlarıyla yürünebilir kent aksı.', cafeQuery: 'kafeler Tunalı Hilmi Ankara', restaurantQuery: 'restoranlar Kavaklıdere Ankara' },
  { area: 'Bahçelievler 7. Cadde', district: 'Çankaya', character: 'Öğrenci yaşamı, hızlı yemek ve mahalle kafeleriyle canlı bir cadde.', cafeQuery: 'kafeler Bahçelievler 7. Cadde Ankara', restaurantQuery: 'restoranlar Bahçelievler 7. Cadde Ankara' },
  { area: 'Çayyolu & Ümitköy', district: 'Çankaya', character: 'Modern restoranlar, kahve mekânları ve aile dostu seçenekler.', cafeQuery: 'kafeler Çayyolu Ankara', restaurantQuery: 'restoranlar Ümitköy Ankara' },
  { area: 'Hamamönü & Kale', district: 'Altındağ', character: 'Tarihî çevrede Ankara mutfağı, kahvaltı ve geleneksel tatlar.', cafeQuery: 'kafeler Hamamönü Ankara', restaurantQuery: 'restoranlar Ankara Kalesi Altındağ' },
  { area: 'Beypazarı Çarşısı', district: 'Beypazarı', character: 'Güveç, yaprak sarma, havuç ürünleri ve yöresel fırınlar.', cafeQuery: 'kafeler Beypazarı tarihi çarşı', restaurantQuery: 'yöresel restoranlar Beypazarı Ankara' },
];

export const ankaraNightlifeAreas = [
  { area: 'Tunalı Hilmi & Kavaklıdere', district: 'Çankaya', character: 'Kafeler, restoranlar, canlı müzik ve yürünebilir sokaklarıyla Ankara’nın güçlü akşam yaşamı merkezlerinden.', mapQuery: 'akşam mekanları canlı müzik Tunalı Hilmi Kavaklıdere Ankara' },
  { area: 'Kızılay & Sakarya', district: 'Çankaya', character: 'Merkezî ulaşım, farklı bütçelere uygun kafeler, restoranlar ve kültür duraklarıyla hareketli şehir akşamları.', mapQuery: 'akşam mekanları canlı müzik Kızılay Sakarya Ankara' },
  { area: 'Bahçelievler 7. Cadde', district: 'Çankaya', character: 'Yoğun yaya hareketi, mahalle kafeleri ve restoranlarla genç şehir yaşamının akşama uzanan buluşma aksı.', mapQuery: 'akşam mekanları Bahçelievler 7. Cadde Ankara' },
  { area: 'Çayyolu & Ümitköy', district: 'Çankaya', character: 'Modern restoranlar, kafeler ve daha sakin akşam yemekleri için batı Ankara’nın güçlü sosyal yaşam bölgesi.', mapQuery: 'akşam mekanları restoranlar Çayyolu Ümitköy Ankara' },
  { area: 'GOP & Gaziosmanpaşa', district: 'Çankaya', character: 'Restoranlar, kafeler ve şehirli sosyal yaşamıyla akşam yemeği ve sohbet odaklı seçkin bir kent aksı.', mapQuery: 'akşam mekanları restoranlar Gaziosmanpaşa Ankara' },
];

export const ankaraAccommodations: AccommodationArea[] = [
  { area: 'Kızılay', district: 'Çankaya', category: 'Merkez', bestFor: 'İlk ziyaret · toplu ulaşım', character: 'Metro bağlantısı, müzeler ve merkezi akslara kolay erişim.', level: 'Karma', mapQuery: 'otel Kızılay Ankara' },
  { area: 'Kavaklıdere & Tunalı', district: 'Çankaya', category: 'Kent yaşamı', bestFor: 'Kafe · restoran · yürüyüş', character: 'Şehir yaşamına yakın butik ve üst segment oteller.', level: 'Orta', mapQuery: 'otel Kavaklıdere Tunalı Ankara' },
  { area: 'Söğütözü', district: 'Çankaya', category: 'İş', bestFor: 'İş seyahati · ulaşım', character: 'AŞTİ, metro ve iş merkezlerine yakın modern konaklama.', level: 'Lüks', mapQuery: 'otel Söğütözü Ankara' },
  { area: 'Ulus', district: 'Altındağ', category: 'Tarih', bestFor: 'Müze · tarihî merkez', character: 'Kale, müzeler ve tarihî çarşılara yakın ekonomik seçenekler.', level: 'Ekonomik', mapQuery: 'otel Ulus Altındağ Ankara' },
  { area: 'Kızılcahamam', district: 'Kızılcahamam', category: 'Termal', bestFor: 'Termal · doğa', character: 'Kaplıca otelleri ve Soğuksu Millî Parkı çevresinde dinlenme.', level: 'Orta', mapQuery: 'termal otel Kızılcahamam Ankara' },
  { area: 'Beypazarı', district: 'Beypazarı', category: 'Kültür', bestFor: 'Tarihî doku · sakin hafta sonu', character: 'Restore edilmiş konaklar ve ilçe merkezindeki butik seçenekler.', level: 'Karma', mapQuery: 'butik otel Beypazarı Ankara' },
];

export const ankaraRoutes: DailyRoute[] = [
  { id: 'ankara-cumhuriyet', title: 'Cumhuriyetin Başkenti', duration: '1 gün', theme: '#315F53', stops: ['Anıtkabir', 'I. TBMM Kurtuluş Savaşı Müzesi', 'II. TBMM Cumhuriyet Müzesi', 'Ulus Meydanı'] },
  { id: 'ankara-eski-kent', title: 'Eski Ankara', duration: '1 gün', theme: '#75513B', stops: ['Ankara Kalesi', 'Anadolu Medeniyetleri Müzesi', 'Hacı Bayram-ı Veli Camii', 'Hamamönü'] },
  { id: 'ankara-gol', title: 'Göl & Şehir Molası', duration: 'Yarım gün', theme: '#477A89', stops: ['Eymir Gölü', 'Mogan Gölü', 'Atakule', 'Kuğulu Park'] },
  { id: 'ankara-frigya', title: 'Frigya’ya Yolculuk', duration: '1 gün', theme: '#8B6844', stops: ['Gordion Antik Kenti', 'Gordion Müzesi', 'Midas Tümülüsü', 'Duatepe Anıtı'] },
  { id: 'ankara-beypazari', title: 'Beypazarı Kültür Rotası', duration: '1 gün', theme: '#486F59', stops: ['Beypazarı Tarihî Çarşı', 'Yaşayan Müze', 'İnözü Vadisi', 'Hıdırlık Tepesi'] },
];

export const ankaraTransport = [
  { icon: 'M', name: 'Ankaray & metro', description: 'Kent merkezi, AŞTİ, Kızılay, Batıkent, Keçiören ve Çayyolu akslarında raylı sistem.', mapQuery: 'Ankara metro istasyonları' },
  { icon: 'E', name: 'EGO otobüsleri', description: 'Merkez ve dış ilçelere yayılan belediye otobüs ağı.', mapQuery: 'EGO otobüs durakları Ankara' },
  { icon: 'B', name: 'Başkentray', description: 'Sincan–Kayaş hattında banliyö bağlantısı ve merkez durakları.', mapQuery: 'Başkentray istasyonları Ankara' },
  { icon: 'T', name: 'YHT & Ankara Garı', description: 'İstanbul, Eskişehir, Konya, Sivas ve diğer hatlara hızlı tren bağlantısı.', mapQuery: 'Ankara Yüksek Hızlı Tren Garı' },
  { icon: 'A', name: 'AŞTİ', description: 'Şehirlerarası otobüs terminali; Ankaray ile kent merkezine bağlı.', mapQuery: 'AŞTİ Ankara' },
  { icon: '✈', name: 'Esenboğa Havalimanı', description: 'Şehir merkezinin kuzeydoğusundaki ulusal ve uluslararası hava ulaşımı noktası.', mapQuery: 'Esenboğa Havalimanı Ankara' },
];

export const ankaraFamilyRoutes = [
  { area: 'Altınpark & Bilim Merkezi', district: 'Altındağ', character: 'Park, gölet ve çocukların deneyerek öğrenebileceği bilim etkinlikleri.', mapQuery: 'Altınpark Feza Gürsey Bilim Merkezi Ankara' },
  { area: 'Mogan Parkı', district: 'Gölbaşı', character: 'Göl kıyısında yürüyüş, oyun alanları ve açık hava molası.', mapQuery: 'Mogan Parkı Gölbaşı Ankara' },
  { area: 'Harikalar Diyarı', district: 'Sincan', character: 'Geniş park alanı ve çocuklara yönelik açık hava bölümleri.', mapQuery: 'Harikalar Diyarı Sincan Ankara' },
  { area: 'Atatürk Orman Çiftliği', district: 'Yenimahalle', character: 'Tarihî çiftlik alanı ve ailece planlanabilecek kent içi rota.', mapQuery: 'Atatürk Orman Çiftliği Ankara' },
];

export const ankaraGallery = [
  { title: 'Cumhuriyetin hafızası', district: 'Çankaya', image: require('../assets/ankara/anitkabir.jpg') },
  { title: 'Eski Ankara', district: 'Altındağ', image: require('../assets/ankara/ankara-kalesi.jpg') },
  { title: 'Bozkırda göl', district: 'Gölbaşı', image: require('../assets/ankara/eymir.jpg') },
  { title: 'Frigya mirası', district: 'Polatlı', image: require('../assets/ankara/gordion.jpg') },
  { title: 'Renkli tepeler', district: 'Nallıhan', image: require('../assets/ankara/nallihan.jpg') },
  { title: 'Tarihî konaklar', district: 'Beypazarı', image: require('../assets/ankara/beypazari.jpg') },
];
