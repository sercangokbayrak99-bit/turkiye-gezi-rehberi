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
};

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
