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
  { name: 'Osmangazi', signature: 'Hanlar, camiler ve tarihî merkez', theme: '#315F53' },
  { name: 'Yıldırım', signature: 'Külliyeler ve Cumalıkızık', theme: '#8A6048' },
  { name: 'Nilüfer', signature: 'Modern yaşam, parklar ve kültür', theme: '#3D7480' },
  { name: 'Mudanya', signature: 'Mütareke, Tirilye ve sahil', theme: '#477A89' },
  { name: 'Gemlik', signature: 'Körfez, zeytin ve kıyı rotaları', theme: '#617A51' },
  { name: 'İznik', signature: 'Çini, surlar ve göl gün batımı', theme: '#507B73' },
  { name: 'İnegöl', signature: 'Oylat, mobilya ve köfte', theme: '#80604A' },
  { name: 'Mustafakemalpaşa', signature: 'Suuçtu ve peynir tatlısı', theme: '#4E745A' },
  { name: 'Karacabey', signature: 'Longoz, kuşlar ve kıyılar', theme: '#526F66' },
  { name: 'Orhangazi', signature: 'İznik Gölü ve Gedelek turşusu', theme: '#7A6E48' },
  { name: 'Kestel', signature: 'Saitabat ve Uludağ etekleri', theme: '#426B57' },
  { name: 'Gürsu', signature: 'Tarım, armut ve doğa', theme: '#75804A' },
  { name: 'Yenişehir', signature: 'Osmanlı izleri ve kırsal kültür', theme: '#8A6A50' },
  { name: 'Orhaneli', signature: 'Kanyonlar ve yayla doğası', theme: '#506C5A' },
  { name: 'Keles', signature: 'Dağ köyleri ve Kocayayla', theme: '#486452' },
  { name: 'Harmancık', signature: 'Yaylalar ve sakin doğa', theme: '#5C7158' },
  { name: 'Büyükorhan', signature: 'Göletler ve dağ rotaları', theme: '#586B62' },
];
