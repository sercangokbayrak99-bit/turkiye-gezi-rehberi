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
