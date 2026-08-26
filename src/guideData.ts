import type { ImageSourcePropType } from 'react-native';

export type ServiceKind = 'AVM' | 'Hastane' | 'Eczane' | 'Ulaşım';

export type CityService = {
  kind: ServiceKind;
  label: string;
  description: string;
  mapQuery: string;
};

export type FoodRecommendation = {
  dish: string;
  area: string;
  note: string;
  mapQuery: string;
};

export type DailyRoute = {
  id: string;
  title: string;
  duration: string;
  theme: string;
  stops: string[];
};

export type GalleryItem = {
  title: string;
  district: string;
  image: ImageSourcePropType;
};

export type VenueArea = {
  area: string;
  district: string;
  character: string;
  cafeQuery: string;
  restaurantQuery: string;
};

export type AccommodationArea = { area: string; district: string; category: string; bestFor: string; character: string; level: 'Ekonomik' | 'Orta' | 'Lüks' | 'Karma'; mapQuery: string };

export type CityGuideModules = {
  cityId: string;
  services: CityService[];
  foods: FoodRecommendation[];
  routes: DailyRoute[];
  gallery: GalleryItem[];
  venueAreas: VenueArea[];
  accommodations: AccommodationArea[];
  nearbySearches: { label: string; icon: string; query: string }[];
  familyRoutes: { area: string; district: string; character: string; mapQuery: string }[];
  nightlifeAreas: { area: string; district: string; character: string; mapQuery: string }[];
  shoppingStreets: { area: string; district: string; character: string; mapQuery: string }[];
};

export const bursaGuideModules: CityGuideModules = {
  cityId: 'bursa',
  services: [
    { kind: 'AVM', label: 'Alışveriş merkezleri', description: 'Yakındaki AVM’leri haritada listele.', mapQuery: 'Bursa alışveriş merkezleri' },
    { kind: 'Hastane', label: 'Hastaneler', description: 'Kamu ve özel hastanelere ulaş.', mapQuery: 'Bursa hastaneleri' },
    { kind: 'Eczane', label: 'Eczaneler', description: 'Yakındaki eczaneleri görüntüle.', mapQuery: 'Bursa eczaneleri' },
    { kind: 'Ulaşım', label: 'Ulaşım noktaları', description: 'Otogar, istasyon ve iskeleleri bul.', mapQuery: 'Bursa ulaşım otogar metro iskele' },
  ],
  foods: [
    { dish: 'İskender kebap', area: 'Osmangazi · Tarihî merkez', note: 'Kayhan ve çevresindeki köklü kebapçılarda dene.', mapQuery: 'İskender kebap Osmangazi Bursa' },
    { dish: 'Tahinli pide', area: 'Merkez ve Mudanya', note: 'Tarihî fırınlarda sıcak servis edilen çeşidini ara.', mapQuery: 'Tahinli pide Bursa' },
    { dish: 'İnegöl köfte', area: 'İnegöl', note: 'İlçe merkezindeki geleneksel köfte salonlarını tercih et.', mapQuery: 'İnegöl köfte İnegöl Bursa' },
    { dish: 'Pideli köfte', area: 'Osmangazi', note: 'Çarşı çevresinde tereyağlı ve yoğurtlu servis edilir.', mapQuery: 'Pideli köfte Osmangazi Bursa' },
    { dish: 'Kemalpaşa tatlısı', area: 'Mustafakemalpaşa', note: 'İlçedeki yerel üreticilerden taze olarak al.', mapQuery: 'Kemalpaşa tatlısı Mustafakemalpaşa' },
    { dish: 'Gemlik zeytini', area: 'Gemlik · Umurbey', note: 'Üretici dükkânlarında hasat ve salamura türlerini karşılaştır.', mapQuery: 'Gemlik zeytini üretici Gemlik' },
  ],
  routes: [
    { id: 'tarihi-bursa', title: 'Tarihî Bursa', duration: '1 tam gün', theme: '#315F53', stops: ['Tophane', 'Ulu Cami', 'Koza Han', 'Yeşil Külliye', 'Emir Sultan'] },
    { id: 'koyler-doga', title: 'Köyler ve doğa', duration: '1 tam gün', theme: '#587054', stops: ['Cumalıkızık', 'Saitabat Şelalesi', 'Babasultan', 'Uludağ'] },
    { id: 'sahil-lezzet', title: 'Sahil ve lezzet', duration: '1 tam gün', theme: '#477A89', stops: ['Mudanya', 'Tirilye', 'Kumyaka', 'Gemlik Sahili'] },
  ],
  gallery: [
    { title: 'Bursa’nın tarihî merkezi', district: 'Osmangazi', image: require('../assets/bursa-hero.jpg') },
    { title: 'Uludağ', district: 'Osmangazi', image: require('../assets/uludag.jpg') },
    { title: 'Cumalıkızık', district: 'Yıldırım', image: require('../assets/cumalikizik.jpg') },
    { title: 'Gemlik Körfezi', district: 'Gemlik', image: require('../assets/gemlik.jpg') },
    { title: 'Yeşil Türbe', district: 'Yıldırım', image: require('../assets/spiritual/yesil-turbe.jpg') },
  ],
  venueAreas: [
    { area: 'Tarihî Çarşı', district: 'Osmangazi', character: 'Hanlar, geleneksel tatlar ve tarihî atmosfer', cafeQuery: 'en iyi kafeler Tarihi Çarşı Osmangazi Bursa', restaurantQuery: 'en iyi restoranlar Tarihi Çarşı Osmangazi Bursa' },
    { area: 'FSM Bulvarı & Özlüce', district: 'Nilüfer', character: 'Modern kafeler, dünya mutfağı ve akşam yaşamı', cafeQuery: 'en iyi kafeler FSM Bulvarı Özlüce Bursa', restaurantQuery: 'en iyi restoranlar FSM Bulvarı Özlüce Bursa' },
    { area: 'Mudanya Sahili', district: 'Mudanya', character: 'Deniz manzarası, balık ve gün batımı', cafeQuery: 'en iyi kafeler Mudanya Sahili Bursa', restaurantQuery: 'en iyi restoranlar Mudanya Sahili Bursa' },
    { area: 'Tirilye', district: 'Mudanya', character: 'Taş sokaklar, kahvaltı ve deniz ürünleri', cafeQuery: 'en iyi kafeler Tirilye Bursa', restaurantQuery: 'en iyi restoranlar Tirilye Bursa' },
    { area: 'Gemlik Körfezi', district: 'Gemlik', character: 'Sahil kafeleri, zeytin ve deniz ürünleri', cafeQuery: 'en iyi kafeler Gemlik Sahili Bursa', restaurantQuery: 'en iyi restoranlar Gemlik Sahili Bursa' },
    { area: 'İznik Gölü', district: 'İznik', character: 'Göl manzarası, gün batımı ve yerel mutfak', cafeQuery: 'en iyi kafeler İznik Gölü Bursa', restaurantQuery: 'en iyi restoranlar İznik Gölü Bursa' },
    { area: 'İnegöl Merkez', district: 'İnegöl', character: 'Köfte salonları ve yerel tatlılar', cafeQuery: 'en iyi kafeler İnegöl Bursa', restaurantQuery: 'en iyi restoranlar İnegöl Bursa' },
  ],
  accommodations: [
    { area: 'Tarihî Merkez', district: 'Osmangazi', category: 'Tarih', bestFor: 'İlk kez gelenler · tarih', character: 'Ulu Cami, Hanlar Bölgesi ve çarşılara yürüyerek ulaşmak isteyenler için.', level: 'Karma', mapQuery: 'otel konaklama Tarihi Merkez Osmangazi Bursa' },
    { area: 'Çekirge', district: 'Osmangazi', category: 'Termal', bestFor: 'Termal · dinlenme', character: 'Termal oteller, kaplıcalar ve şehir merkezine kısa ulaşım.', level: 'Orta', mapQuery: 'termal oteller Çekirge Bursa' },
    { area: 'Nilüfer & Görükle', district: 'Nilüfer', category: 'Modern yaşam', bestFor: 'Modern yaşam · ekonomik', character: 'Kafeler, metro bağlantısı, apart ve şehir oteli seçenekleri.', level: 'Ekonomik', mapQuery: 'otel apart Nilüfer Görükle Bursa' },
    { area: 'Uludağ', district: 'Osmangazi', category: 'Kayak & doğa', bestFor: 'Kayak · doğa', character: 'Kış sporlarına ve dağ yürüyüşlerine yakın oteller ve dağ evleri.', level: 'Lüks', mapQuery: 'Uludağ otelleri Bursa' },
    { area: 'Mudanya & Tirilye', district: 'Mudanya', category: 'Sahil', bestFor: 'Sahil · sakin tatil', character: 'Deniz manzaralı butik oteller, pansiyonlar ve tarihî konaklar.', level: 'Orta', mapQuery: 'otel butik otel Mudanya Tirilye Bursa' },
    { area: 'İznik Gölü', district: 'İznik', category: 'Göl & kamp', bestFor: 'Göl · kamp', character: 'Göl kıyısı pansiyonları, bungalovlar ve kamp alanları.', level: 'Karma', mapQuery: 'otel pansiyon kamp İznik Gölü Bursa' },
  ],
  nearbySearches: [
    { label: 'Gezilecek yer', icon: '⌖', query: 'gezilecek yerler' },
    { label: 'Yemek', icon: '◉', query: 'restoranlar' },
    { label: 'Eczane', icon: '+', query: 'eczaneler' },
    { label: 'Ulaşım', icon: '↗', query: 'toplu taşıma durakları' },
  ],
  familyRoutes: [
    { area: 'Kültürpark & müze günü', district: 'Osmangazi', character: 'Bursa Arkeoloji Müzesi, Kültürpark ve çevredeki oyun alanlarını birleştiren kolay aile rotası.', mapQuery: 'Bursa Arkeoloji Müzesi Kültürpark Bursa' },
    { area: 'Arabalar & tarih', district: 'Yıldırım', character: 'Tofaş Anadolu Arabaları Müzesi ile Yeşil Külliye çevresini aynı günde keşfet.', mapQuery: 'Tofaş Anadolu Arabaları Müzesi Yeşil Külliye Bursa' },
    { area: 'Botanik Park & Hayvanat Bahçesi', district: 'Osmangazi', character: 'Bisiklet yolları, geniş yeşil alanlar ve hayvanat bahçesiyle çocuklara uygun tam günlük açık hava planı.', mapQuery: 'Soğanlı Botanik Park Bursa Hayvanat Bahçesi' },
    { area: 'Cumalıkızık köy günü', district: 'Yıldırım', character: 'Taş sokaklar, köy kahvaltısı ve geleneksel evlerle ailece yavaş tempolu kültür gezisi.', mapQuery: 'Cumalıkızık Bursa aile gezisi' },
  ],
  nightlifeAreas: [
    { area: 'FSM Bulvarı', district: 'Nilüfer', character: 'Restoranlar, kafeler ve akşam saatlerinde hareketlenen modern kent yaşamı.', mapQuery: 'FSM Bulvarı Bursa gece hayatı' },
    { area: 'Özlüce', district: 'Nilüfer', character: 'Yeni nesil restoran, pub ve canlı müzik seçenekleriyle genç ve modern akşam rotası.', mapQuery: 'Özlüce Bursa gece hayatı mekanlar' },
    { area: 'Görükle', district: 'Nilüfer', character: 'Üniversite çevresinde uygun fiyatlı kafeler, publar ve canlı sosyal yaşam.', mapQuery: 'Görükle Bursa gece hayatı' },
    { area: 'Mudanya Sahili', district: 'Mudanya', character: 'Deniz manzaralı restoranlar ve sakin sahil yürüyüşleriyle daha dingin bir akşam alternatifi.', mapQuery: 'Mudanya Sahili akşam mekanları' },
  ],
  shoppingStreets: [
    { area: 'Uzun Çarşı & Kapalıçarşı', district: 'Osmangazi', character: 'Hanlar Bölgesi’nde ipek, havlu, kuyumculuk ve geleneksel Bursa ürünleri.', mapQuery: 'Bursa Uzun Çarşı Kapalıçarşı' },
    { area: 'Cumhuriyet Caddesi', district: 'Osmangazi', character: 'Tarihî merkez boyunca mağazaları, tramvayı ve çarşı bağlantılarıyla canlı yaya aksı.', mapQuery: 'Cumhuriyet Caddesi Bursa' },
    { area: 'FSM Bulvarı', district: 'Nilüfer', character: 'Mağaza, kafe ve restoranların sıralandığı modern alışveriş ve yaşam bulvarı.', mapQuery: 'Fatih Sultan Mehmet Bulvarı Bursa' },
    { area: 'PodyumPark çevresi', district: 'Nilüfer', character: 'Açık hava alışverişi, yeme içme ve eğlenceyi bir araya getiren çağdaş kent bölgesi.', mapQuery: 'PodyumPark Bursa' },
  ],
};
