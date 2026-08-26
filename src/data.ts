import type { ImageSourcePropType } from 'react-native';

export type Category = 'Tarih' | 'Doğa' | 'Lezzet' | 'Sahil';

export type Place = {
  id: string;
  name: string;
  district: string;
  category: Category;
  summary: string;
  image: ImageSourcePropType;
  mapQuery: string;
  imageCredit?: string;
  imagePage?: string;
};

export const bursaBaths: Place[] = [
  { id: 'eski-kaplica', name: 'Eski Kaplıca Hamamı', district: 'Osmangazi · Çekirge', category: 'Tarih', summary: '14. yüzyıldan bu yana Bursa’nın termal su ve hamam geleneğini yaşatan, Çekirge’nin en önemli tarihî kaplıca yapılarından.', image: require('../assets/baths/eski-kaplica.jpg'), mapQuery: 'Eski Kaplıca Hamamı Çekirge Bursa', imageCredit: 'Carl Ha · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa,_Eski_Kaplıca,_general_view_from_east.jpg' },
  { id: 'ordekli-hamami', name: 'Ördekli Hamamı', district: 'Osmangazi', category: 'Tarih', summary: 'Yıldırım Bayezid döneminde başlayıp Çelebi Mehmed döneminde tamamlanan çifte hamam, günümüzde restore edilmiş bir kültür merkezi.', image: require('../assets/baths/ordekli.jpg'), mapQuery: 'Ördekli Hamamı Kültür Merkezi Bursa', imageCredit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa_Ördekli_Hamamı_Kültür_Merkezi_2008_2435.jpg' },
  { id: 'emir-sultan-hamami', name: 'Emir Sultan Hamamı', district: 'Yıldırım', category: 'Tarih', summary: '1426’da Hundi Fatma Hatun tarafından yaptırılan tarihî hamam, Emir Sultan Külliyesi’nin güneyindeki termal ve sosyal mirası temsil eder.', image: require('../assets/baths/emir-sultan-hamam.jpg'), mapQuery: 'Emir Sultan Hamamı Bursa', imageCredit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa_Emir_Sultan_Camii_7068.jpg' },
  { id: 'muradiye-hamami', name: 'Muradiye Hamamı', district: 'Osmangazi', category: 'Tarih', summary: 'Muradiye Külliyesi’nin karşısında bulunan yapı, Bursa’nın erken Osmanlı döneminden kalan hamam mimarisinin önemli örneklerinden.', image: require('../assets/baths/muradiye-hamam.jpg'), mapQuery: 'Muradiye Hamamı Osmangazi Bursa', imageCredit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa_Muradiye_Hamam_2006_0088.jpg' },
];

export type City = {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  districts: number;
  hero: ImageSourcePropType;
  places: Place[];
};

export type District = {
  name: string;
  signature: string;
  theme: string;
  highlights: string[];
  flavors: string[];
  mapQuery: string;
};

export type SpiritualSite = {
  id: string;
  city: string;
  name: string;
  district: string;
  kind: 'Türbe' | 'Külliye';
  period: string;
  summary: string;
  etiquette: string;
  image: ImageSourcePropType;
  imageCredit: string;
  imagePage: string;
  mapQuery: string;
  sourceUrl: string;
};

export const bursa: City = {
  id: 'bursa',
  name: 'Bursa',
  region: 'Marmara Bölgesi',
  tagline: 'Yeşilin, tarihin ve lezzetin şehri',
  description: 'Osmanlı mirasından Uludağ’a, göl kıyılarından köklü mutfağına uzanan çok katmanlı bir keşif.',
  districts: 17,
  hero: require('../assets/bursa-hero.jpg'),
  places: [
    { id: 'ulu-cami', name: 'Ulu Cami ve Hanlar Bölgesi', district: 'Osmangazi', category: 'Tarih', summary: 'Şehrin tarihî kalbinde camiler, hanlar, çarşılar ve yaşayan zanaat kültürü.', image: require('../assets/bursa-hero.jpg'), mapQuery: 'Bursa Ulu Cami' },
    { id: 'uludag', name: 'Uludağ', district: 'Osmangazi', category: 'Doğa', summary: 'Dört mevsim yürüyüş, manzara, kamp ve kış sporları sunan Bursa simgesi.', image: require('../assets/uludag.jpg'), mapQuery: 'Uludağ Bursa' },
    { id: 'cumalikizik', name: 'Cumalıkızık', district: 'Yıldırım', category: 'Tarih', summary: 'Renkli Osmanlı evleri ve taş sokaklarıyla UNESCO Dünya Mirası köyü.', image: require('../assets/cumalikizik.jpg'), mapQuery: 'Cumalıkızık Bursa' },
    { id: 'gemlik', name: 'Gemlik Körfezi', district: 'Gemlik', category: 'Sahil', summary: 'Zeytinlikler, sahil yürüyüşleri ve Marmara gün batımlarıyla sakin bir kıyı rotası.', image: require('../assets/gemlik.jpg'), mapQuery: 'Gemlik Sahili Bursa' },
    { id: 'iskender', name: 'İskender kebap', district: 'Osmangazi', category: 'Lezzet', summary: 'Döner, pide, domates sosu, yoğurt ve tereyağıyla Bursa’nın imza lezzeti.', image: require('../assets/iskender.jpg'), mapQuery: 'İskender kebap Bursa' }
  ]
};

export const comingCities = [
  { name: 'İstanbul', region: 'Marmara', tone: '#9B5C42' },
  { name: 'İzmir', region: 'Ege', tone: '#397C86' },
  { name: 'Antalya', region: 'Akdeniz', tone: '#C57645' },
  { name: 'Trabzon', region: 'Karadeniz', tone: '#486F59' },
  { name: 'Mardin', region: 'Güneydoğu', tone: '#A78055' },
  { name: 'Kapadokya', region: 'İç Anadolu', tone: '#8B665A' }
];

export const bursaDistricts: District[] = [
  { name: 'Osmangazi', signature: 'Hanlar, camiler ve tarihî merkez', theme: '#315F53', highlights: ['Ulu Cami ve Hanlar Bölgesi', 'Tophane ve Muradiye', 'Soğanlı Botanik Parkı'], flavors: ['İskender kebap', 'Pideli köfte', 'Süt helvası'], mapQuery: 'Osmangazi Bursa' },
  { name: 'Yıldırım', signature: 'Külliyeler ve Cumalıkızık', theme: '#8A6048', highlights: ['Yeşil Külliye', 'Emir Sultan Külliyesi', 'Cumalıkızık'], flavors: ['Cevizli lokum', 'Köy kahvaltısı', 'Gözleme'], mapQuery: 'Yıldırım Bursa' },
  { name: 'Nilüfer', signature: 'Modern yaşam, parklar ve kültür', theme: '#3D7480', highlights: ['Gölyazı', 'Misi Köyü', 'Hüdavendigar Kent Parkı'], flavors: ['Gölyazı balığı', 'Yerel kahvaltı', 'Bursa şeftalisi'], mapQuery: 'Nilüfer Bursa' },
  { name: 'Mudanya', signature: 'Mütareke, Tirilye ve sahil', theme: '#477A89', highlights: ['Mudanya Mütareke Evi', 'Tirilye', 'Kumyaka ve sahil'], flavors: ['Zeytin ve zeytinyağı', 'Deniz ürünleri', 'Tahinli pide'], mapQuery: 'Mudanya Bursa' },
  { name: 'Gemlik', signature: 'Körfez, zeytin ve kıyı rotaları', theme: '#617A51', highlights: ['Gemlik Sahili', 'Umurbey', 'Kumla Sahili'], flavors: ['Gemlik zeytini', 'Zeytinyağlılar', 'Deniz ürünleri'], mapQuery: 'Gemlik Bursa' },
  { name: 'İznik', signature: 'Çini, surlar ve göl gün batımı', theme: '#507B73', highlights: ['İznik Ayasofya', 'Tarihî surlar', 'İznik Gölü'], flavors: ['İznik köftesi', 'Göl balığı', 'Zeytin'], mapQuery: 'İznik Bursa' },
  { name: 'İnegöl', signature: 'Oylat, mobilya ve köfte', theme: '#80604A', highlights: ['Oylat Mağarası', 'Oylat Kaplıcaları', 'Kent Müzesi'], flavors: ['İnegöl köfte', 'Cevizli lokum', 'Yöresel çorbalar'], mapQuery: 'İnegöl Bursa' },
  { name: 'Mustafakemalpaşa', signature: 'Suuçtu ve peynir tatlısı', theme: '#4E745A', highlights: ['Suuçtu Şelalesi', 'Tümbüldek Kaplıcaları', 'Uluabat çevresi'], flavors: ['Kemalpaşa tatlısı', 'Peynir ürünleri', 'Köy kahvaltısı'], mapQuery: 'Mustafakemalpaşa Bursa' },
  { name: 'Karacabey', signature: 'Longoz, kuşlar ve kıyılar', theme: '#526F66', highlights: ['Karacabey Longozu', 'Yeniköy Sahili', 'Uluabat Gölü'], flavors: ['Mihaliç peyniri', 'Soğan', 'Deniz ürünleri'], mapQuery: 'Karacabey Bursa' },
  { name: 'Orhangazi', signature: 'İznik Gölü ve Gedelek turşusu', theme: '#7A6E48', highlights: ['İznik Gölü kıyıları', 'Keramet Kaplıcası', 'Gedelek'], flavors: ['Gedelek turşusu', 'Zeytin', 'Göl balığı'], mapQuery: 'Orhangazi Bursa' },
  { name: 'Kestel', signature: 'Saitabat ve Uludağ etekleri', theme: '#426B57', highlights: ['Saitabat Şelalesi', 'Babasultan Köyü', 'Kestel Kalesi çevresi'], flavors: ['Köy kahvaltısı', 'Kestane', 'Yöresel hamur işleri'], mapQuery: 'Kestel Bursa' },
  { name: 'Gürsu', signature: 'Tarım, armut ve doğa', theme: '#75804A', highlights: ['Gürsu Ovası', 'Dışkaya çevresi', 'Doğa yürüyüş rotaları'], flavors: ['Deveci armudu', 'Şeftali', 'Yerel tarım ürünleri'], mapQuery: 'Gürsu Bursa' },
  { name: 'Yenişehir', signature: 'Osmanlı izleri ve kırsal kültür', theme: '#8A6A50', highlights: ['Şemaki Evi Müzesi', 'Sinan Paşa Külliyesi', 'Yenişehir Ovası'], flavors: ['Biber', 'Süt ürünleri', 'Köy mutfağı'], mapQuery: 'Yenişehir Bursa' },
  { name: 'Orhaneli', signature: 'Kanyonlar ve yayla doğası', theme: '#506C5A', highlights: ['Sadağı Kanyonu', 'Karagöz Mesire Alanı', 'Termal kaynaklar'], flavors: ['Ceviz', 'Köy ekmeği', 'Yörük mutfağı'], mapQuery: 'Orhaneli Bursa' },
  { name: 'Keles', signature: 'Dağ köyleri ve Kocayayla', theme: '#486452', highlights: ['Kocayayla', 'Gelemiç Şelalesi', 'Dağ köyleri'], flavors: ['Keles kirazı', 'Dağ çileği', 'Yörük yemekleri'], mapQuery: 'Keles Bursa' },
  { name: 'Harmancık', signature: 'Yaylalar ve sakin doğa', theme: '#5C7158', highlights: ['Harmancık yaylaları', 'Kanyon ve yürüyüş rotaları', 'Kırsal köyler'], flavors: ['Ceviz', 'Köy ürünleri', 'Yöresel hamur işleri'], mapQuery: 'Harmancık Bursa' },
  { name: 'Büyükorhan', signature: 'Göletler ve dağ rotaları', theme: '#586B62', highlights: ['Görecik Yaylası', 'Büyükorhan Göleti', 'Dağ köyleri'], flavors: ['Kırsal üretici ürünleri', 'Köy ekmeği', 'Yörük mutfağı'], mapQuery: 'Büyükorhan Bursa' },
];

export const spiritualSites: SpiritualSite[] = [
  { id: 'osman-gazi', city: 'Bursa', name: 'Osman Gazi Türbesi', district: 'Osmangazi', kind: 'Türbe', period: 'Osmanlı’nın kuruluş dönemi', summary: 'Osmanlı Devleti’nin kurucusu Osman Gazi’nin Tophane’de bulunan türbesi; bugünkü yapı 1863 yılında yeniden yaptırılmıştır.', etiquette: 'Sessizliği koruyun, sandukalara dokunmayın ve ibadet eden ziyaretçilere alan bırakın.', image: require('../assets/spiritual/osman-gazi-wide.jpg'), imageCredit: 'Kültür Portalı · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Osman-gazi-turbesi.jpg', mapQuery: 'Osman Gazi Türbesi Bursa', sourceUrl: 'https://www.kulturportali.gov.tr/turkiye/bursa/gezilecekyer/osmangazi-turbesi' },
  { id: 'orhan-gazi', city: 'Bursa', name: 'Orhan Gazi Türbesi', district: 'Osmangazi', kind: 'Türbe', period: '14. yüzyıl Osmanlı mirası', summary: 'Bursa Fatihi Orhan Gazi’ye ait türbe, Tophane Parkı’nda Osman Gazi Türbesi’nin karşısında yer alır.', etiquette: 'Ziyaret sırasında sakin olun; içeride fotoğraf kuralları ve görevli yönlendirmelerine uyun.', image: require('../assets/spiritual/orhan-gazi-wide.jpg'), imageCredit: 'Mustafa Duman · CC BY 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:ORHANGAZ%C4%B0_T%C3%9CRBES%C4%B0_BURSA_OSMANGAZ%C4%B0_-_panoramio.jpg', mapQuery: 'Orhan Gazi Türbesi Bursa', sourceUrl: 'https://kulturportali.gov.tr/turkiye/bursa/kulturenvanteri/orhan-gazi-turbesi' },
  { id: 'emir-sultan', city: 'Bursa', name: 'Emir Sultan Türbesi ve Külliyesi', district: 'Yıldırım', kind: 'Külliye', period: 'Erken Osmanlı dönemi', summary: 'Bursa’nın en güçlü manevi odaklarından biri olan külliye, Emir Sultan’ın türbesi ve camisi çevresinde şekillenir.', etiquette: 'Cami bölümünde uygun kıyafet kullanın; namaz vakitlerinde ziyaret akışına dikkat edin.', image: require('../assets/spiritual/emir-sultan.jpg'), imageCredit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Emir_Sultan_Camii_7067.jpg', mapQuery: 'Emir Sultan Türbesi Bursa', sourceUrl: 'https://bursa.ktb.gov.tr/TR-70228/bursa-ili-genel-bilgiler.html' },
  { id: 'yesil-turbe', city: 'Bursa', name: 'Yeşil Türbe', district: 'Yıldırım', kind: 'Türbe', period: '15. yüzyıl', summary: 'Çelebi Sultan Mehmed için yaptırılan türbe, yeşil ve turkuaz çinileriyle Bursa’nın simge yapılarındandır.', etiquette: 'Çini yüzeylere dokunmayın; flaş ve fotoğraf kurallarını girişte kontrol edin.', image: require('../assets/spiritual/yesil-turbe.jpg'), imageCredit: 'Bernard Gagnon · CC BY-SA 3.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Ye%C5%9Fil_T%C3%BCrbe_01.jpg', mapQuery: 'Yeşil Türbe Bursa', sourceUrl: 'https://kulturportali.gov.tr/turkiye/bursa/gezilecekyer/yesil-turbe' },
  { id: 'muradiye', city: 'Bursa', name: 'Muradiye Külliyesi ve Türbeleri', district: 'Osmangazi', kind: 'Külliye', period: '15. yüzyıl', summary: 'II. Murad ve hanedan üyelerine ait türbeleri barındıran UNESCO miras alanı; geniş bir tarihî bahçe içinde yer alır.', etiquette: 'Hazire ve türbe alanlarında belirlenmiş yollardan ilerleyin; sessizliği koruyun.', image: require('../assets/spiritual/muradiye.jpg'), imageCredit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa_Muradiye_tombs_in_2007_1430.jpg', mapQuery: 'Muradiye Külliyesi Bursa', sourceUrl: 'https://www.kulturportali.gov.tr/turkiye/bursa/gezilecekyer/muradiye-kulliyesi' },
  { id: 'uftade', city: 'Bursa', name: 'Üftade Camii ve Türbesi', district: 'Osmangazi', kind: 'Külliye', period: '16. yüzyıl manevi mirası', summary: 'Mutasavvıf Üftade Hazretleri’yle ilişkilendirilen cami ve türbe, Pınarbaşı çevresindeki önemli ziyaret noktalarındandır.', etiquette: 'Dik yokuşlu çevre yollarına hazırlıklı olun; ibadet alanındaki kurallara uyun.', image: require('../assets/spiritual/uftade.jpg'), imageCredit: 'SARDES70 · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa_%C3%9Cftade_Camii.jpg', mapQuery: 'Üftade Türbesi Bursa', sourceUrl: 'https://bursatanitim.gov.tr/wp-content/uploads/2025/07/mini-Bursa-Turizm-Rehberi_REV_29Tem.pdf' },
  { id: 'suleyman-celebi', city: 'Bursa', name: 'Süleyman Çelebi Türbesi', district: 'Osmangazi', kind: 'Türbe', period: '15. yüzyıl kültür mirası', summary: 'Vesîletü’n-Necât adlı Mevlid’in yazarı Süleyman Çelebi’nin Çekirge yolu üzerindeki anıt mezarıdır.', etiquette: 'Alanı temiz tutun ve diğer ziyaretçilerin sessiz ziyaret hakkına saygı gösterin.', image: require('../assets/spiritual/suleyman-celebi.jpg'), imageCredit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa_S%C3%BCleyman_%C3%87elebi_T%C3%BCrbesi_2004_0055.jpg', mapQuery: 'Süleyman Çelebi Türbesi Bursa', sourceUrl: 'https://bursa.ktb.gov.tr/TR-70228/bursa-ili-genel-bilgiler.html' },
  { id: 'geyikli-baba', city: 'Bursa', name: 'Geyikli Baba Türbesi', district: 'Kestel', kind: 'Türbe', period: 'Erken Osmanlı dönemi', summary: 'Babasultan yerleşiminde bulunan türbe, Bursa’nın kuruluş dönemi manevi şahsiyetlerinden Geyikli Baba’yla ilişkilidir.', etiquette: 'Köy yaşamına ve ziyaret alanının yerel düzenine saygı gösterin.', image: require('../assets/spiritual/geyikli-baba-wide.jpg'), imageCredit: 'Bursa Büyükşehir Belediyesi · Visit Bursa', imagePage: 'https://visitbursa.org/mekanlar/geyikli-baba-turbesi-518', mapQuery: 'Geyikli Baba Türbesi Babasultan Bursa', sourceUrl: 'https://www.kulturportali.gov.tr/turkiye/bursa/kulturenvanteri/geyikli-baba-turbesi' },
  { id: 'hudavendigar', city: 'Bursa', name: 'I. Murad Hüdavendigâr Türbesi', district: 'Osmangazi', kind: 'Türbe', period: '14. yüzyıl', summary: 'Çekirge’deki Hüdavendigâr Külliyesi içinde, Osmanlı hükümdarı I. Murad’a ait türbedir.', etiquette: 'Cami ve türbe bölümlerini ayıran yönlendirmelere, kıyafet ve sessizlik kurallarına uyun.', image: require('../assets/spiritual/hudavendigar-wide.jpg'), imageCredit: 'Carl Ha · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa%2C_H%C3%BCdavendigar_T%C3%BCrbesi.jpg', mapQuery: 'Hüdavendigar Türbesi Bursa', sourceUrl: 'https://bursa.ktb.gov.tr/Eklenti/78710%2Cdergi1-turkcepdf.pdf?0=' },
  { id: 'yildirim-bayezid', city: 'Bursa', name: 'Yıldırım Bayezid Türbesi', district: 'Yıldırım', kind: 'Türbe', period: '15. yüzyıl başı', summary: 'Yıldırım Külliyesi çevresinde bulunan türbe, Osmanlı hükümdarı Yıldırım Bayezid’e aittir.', etiquette: 'Külliye içindeki ibadet ve eğitim alanlarının kullanımına dikkat ederek ziyaret edin.', image: require('../assets/spiritual/yildirim-bayezid.jpg'), imageCredit: 'Dosseman · CC BY-SA 4.0', imagePage: 'https://commons.wikimedia.org/wiki/File:Bursa_Yildirim_Tomb_May_2014_7153.jpg', mapQuery: 'Yıldırım Bayezid Türbesi Bursa', sourceUrl: 'https://bursatanitim.gov.tr/wp-content/uploads/2025/07/mini-Bursa-Turizm-Rehberi_REV_29Tem.pdf' },
];
