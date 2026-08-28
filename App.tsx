import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar as NativeStatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { bursa, bursaBaths, bursaDistricts, comingCities, spiritualSites, type Category, type District, type Place, type SpiritualSite } from './src/data';
import { bursaGuideModules, type AccommodationArea, type DailyRoute } from './src/guideData';
import { regions, turkeyCities, type Region } from './src/cities';
import { istanbulAccommodations, istanbulDistricts, istanbulFamilyRoutes, istanbulFoodGuide, istanbulGallery, istanbulNightlifeAreas, istanbulPlaces, istanbulRoutes, istanbulShoppingStreets, istanbulTransport, istanbulVenueAreas, type IstanbulDistrict, type IstanbulPlace } from './src/istanbulData';
import { ankaraAccommodations, ankaraDistricts, ankaraFamilyRoutes, ankaraFoodGuide, ankaraGallery, ankaraNightlifeAreas, ankaraPlaces, ankaraRoutes, ankaraShoppingStreets, ankaraTransport, ankaraVenueAreas, type AnkaraDistrict, type AnkaraPlace } from './src/ankaraData';
import { izmirAccommodations, izmirDistricts, izmirFamilyRoutes, izmirFoodGuide, izmirGallery, izmirNightlifeAreas, izmirPlaces, izmirQuickFacts, izmirRoutes, izmirShoppingStreets, izmirTransport, izmirVenueAreas, type IzmirDistrict, type IzmirPlace } from './src/izmirData';
import { izmirBeachAccesses, izmirBeachDistricts, izmirBeaches, izmirBeachTypes, type IzmirBeach, type IzmirBeachAccess, type IzmirBeachDistrict, type IzmirBeachType } from './src/izmirBeaches';
import { beachDistricts, beachWaterTypes, bursaBeaches, type BeachDistrict, type BeachWaterType, type BursaBeach } from './src/beaches';
import { istanbulBeachAccesses, istanbulBeachSeas, istanbulBeachSides, istanbulBeachTypes, istanbulBeaches, type IstanbulBeach, type IstanbulBeachAccess, type IstanbulBeachSide, type IstanbulBeachType, type IstanbulSea } from './src/istanbulBeaches';

const palette = {
  forest: '#153E35',
  moss: '#316759',
  cream: '#F3EFE5',
  paper: '#FFFCF6',
  ink: '#142A24',
  muted: '#6D7D77',
  gold: '#D09A4A',
  line: '#DFE4DE',
  white: '#FFFFFF',
};

type Tab = 'home' | 'explore' | 'plan' | 'favorites' | 'profile';
type CityId = 'bursa' | 'istanbul' | 'ankara' | 'izmir';
type ExploreCategory = 'Tümü' | Category | 'Manevi';
type CityGuideSection = 'overview' | 'places' | 'food' | 'beaches' | 'stay-routes' | 'services' | 'districts';
type IzmirFoodSection = 'venues' | 'food-guide' | 'nightlife';
const izmirGuideSections: { id: CityGuideSection; label: string }[] = [
  { id: 'overview', label: 'Genel Bakış' }, { id: 'places', label: 'Gezilecek Yerler' }, { id: 'food', label: 'Yeme & İçme' },
  { id: 'beaches', label: 'Sahiller & Plajlar' }, { id: 'stay-routes', label: 'Konaklama & Rotalar' }, { id: 'services', label: 'Ulaşım & Hizmetler' },
];
const categories: ExploreCategory[] = ['Tümü', 'Tarih', 'Doğa', 'Lezzet', 'Sahil', 'Manevi'];
const bursaBeachPlaces: Place[] = bursaBeaches.map(beach => ({
  id: beach.id,
  name: beach.name,
  district: `${beach.area} · ${beach.district}`,
  category: 'Sahil',
  summary: beach.summary,
  image: beach.image,
  mapQuery: beach.latitude !== null && beach.longitude !== null ? `${beach.latitude},${beach.longitude}` : `${beach.name} ${beach.district} Bursa`,
  beach,
}));
const allBursaPlaces = [...bursa.places, ...bursaBeachPlaces];
const istanbulBeachPlaceAdapters: IstanbulPlace[] = istanbulBeaches.map(beach => ({ id: beach.id, name: beach.name, district: beach.district, category: 'Sahil & Plaj', summary: beach.summary, image: beach.image, mapQuery: beach.latitude !== null && beach.longitude !== null ? `${beach.latitude},${beach.longitude}` : `${beach.name} ${beach.district} İstanbul`, credit: beach.imageCredit ?? 'Temsilî görsel', imagePage: beach.imagePage ?? beach.sourceUrl }));
const istanbulBeachFavoritePlaces: Place[] = istanbulBeaches.map(beach => ({ id: beach.id, name: beach.name, district: `${beach.district} / İstanbul`, category: 'Sahil', summary: beach.summary, image: beach.image, mapQuery: beach.latitude !== null && beach.longitude !== null ? `${beach.latitude},${beach.longitude}` : `${beach.name} ${beach.district} İstanbul` }));
const istanbulFavoritePlaces: Place[] = istanbulPlaces.map(place => ({
  id: place.id,
  name: place.name,
  district: `${place.district} / İstanbul`,
  category: place.category === 'Sahil' || place.category.includes('Sahil') || place.category.includes('Manzara') ? 'Sahil' : place.category.includes('Doğa') ? 'Doğa' : 'Tarih',
  summary: place.summary,
  image: place.image,
  mapQuery: place.mapQuery,
  imageCredit: place.credit,
  imagePage: place.imagePage,
}));
const istanbulDistrictPlanPlaces: IstanbulPlace[] = istanbulDistricts.map(district => ({ id: `istanbul-ilce-${district.name}`, name: district.name, district: 'İstanbul', category: 'İlçe', summary: district.signature, image: require('./assets/istanbul/hero.jpg'), mapQuery: district.mapQuery, credit: '', imagePage: '' }));
const allIstanbulPlanPlaces = [...istanbulPlaces, ...istanbulBeachPlaceAdapters, ...istanbulDistrictPlanPlaces];
const istanbulPlaceIds = new Set([...istanbulPlaces, ...istanbulBeaches].map(place => place.id));
const ankaraFavoritePlaces: Place[] = ankaraPlaces.map(place => ({ id: place.id, name: place.name, district: `${place.district} / Ankara`, category: place.category === 'Doğa' || place.category === 'Manzara' || place.category === 'Aile & Park' ? 'Doğa' : 'Tarih', summary: place.summary, image: place.image, mapQuery: place.mapQuery, imageCredit: place.credit, imagePage: place.imagePage }));
const ankaraDistrictPlanPlaces: AnkaraPlace[] = ankaraDistricts.map(district => ({ id: `ankara-ilce-${district.name}`, name: district.name, district: 'Ankara', category: 'İlçe', summary: district.signature, image: require('./assets/ankara/anitkabir.jpg'), mapQuery: district.mapQuery, credit: '', imagePage: '', sourceUrl: 'https://ankara.ktb.gov.tr/' }));
const allAnkaraPlanPlaces = [...ankaraPlaces, ...ankaraDistrictPlanPlaces];
const ankaraPlaceIds = new Set(ankaraPlaces.map(place => place.id));
const izmirFavoritePlaces: Place[] = izmirPlaces.map(place => ({ id: place.id, name: place.name, district: `${place.district} / İzmir`, category: place.category === 'Doğa' || place.category === 'Sahil' || place.category === 'Aile & Park' ? 'Doğa' : 'Tarih', summary: place.summary, image: place.image, mapQuery: place.mapQuery, imageCredit: place.credit, imagePage: place.imagePage }));
const izmirBeachPlaceAdapters: IzmirPlace[] = izmirBeaches.map(beach => ({ id: beach.id, name: beach.name, district: beach.district, category: 'Sahil & Plaj', summary: beach.summary, image: beach.image, mapQuery: beach.latitude !== null && beach.longitude !== null ? `${beach.latitude},${beach.longitude}` : `${beach.name} ${beach.district} İzmir`, credit: beach.imageCredit ?? 'Temsilî görsel', imagePage: beach.imagePage ?? beach.sourceUrl, sourceUrl: beach.sourceUrl }));
const izmirBeachFavoritePlaces: Place[] = izmirBeaches.map(beach => ({ id: beach.id, name: beach.name, district: `${beach.district} / İzmir`, category: 'Sahil', summary: beach.summary, image: beach.image, mapQuery: beach.latitude !== null && beach.longitude !== null ? `${beach.latitude},${beach.longitude}` : `${beach.name} ${beach.district} İzmir` }));
const izmirDistrictPlanPlaces: IzmirPlace[] = izmirDistricts.map(district => ({ id: `izmir-ilce-${district.name}`, name: district.name, district: 'İzmir', category: 'İlçe', summary: district.signature, image: require('./assets/izmir/hero.jpg'), mapQuery: district.mapQuery, credit: '', imagePage: '', sourceUrl: 'https://izmir.ktb.gov.tr/' }));
const allIzmirPlanPlaces = [...izmirPlaces, ...izmirBeachPlaceAdapters, ...izmirDistrictPlanPlaces];
const izmirPlaceIds = new Set([...izmirPlaces, ...izmirBeaches].map(place => place.id));
const istanbulNearbySearches = [
  { label: 'Gezilecek yer', icon: '⌖', query: 'gezilecek yerler' },
  { label: 'Kafe', icon: '☕', query: 'kafeler' },
  { label: 'Restoran', icon: '🍴', query: 'restoranlar' },
  { label: 'Müze', icon: '▣', query: 'müzeler' },
  { label: 'Eczane', icon: '+', query: 'eczaneler' },
  { label: 'Hastane', icon: 'H', query: 'hastaneler' },
  { label: 'AVM', icon: '⌂', query: 'alışveriş merkezleri' },
  { label: 'Otopark', icon: 'P', query: 'otoparklar' },
];

type OfflineStatus = 'idle' | 'downloading' | 'ready' | 'error';

// Kalıcı harita kuralı: belirli bir mekâna gitmek Directions, bölgesel keşif Search kullanır.
const googleMapsDirectionsUrl = (destination: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;

const openDirections = (destination: string) => Linking.openURL(googleMapsDirectionsUrl(destination));

async function downloadOfflineGuide(storageKey: string) {
  if (Platform.OS !== 'web') {
    await AsyncStorage.setItem(storageKey, 'ready');
    return;
  }
  if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) throw new Error('Çevrimdışı kullanım desteklenmiyor');
  const registration = await navigator.serviceWorker.ready;
  const worker = registration.active ?? registration.waiting ?? registration.installing;
  if (!worker) throw new Error('Çevrimdışı servis hazır değil');
  await new Promise<void>((resolve, reject) => {
    const channel = new MessageChannel();
    const timeout = setTimeout(() => reject(new Error('İndirme zaman aşımına uğradı')), 120000);
    channel.port1.onmessage = event => {
      clearTimeout(timeout);
      if (event.data?.ok) resolve();
      else reject(new Error('Çevrimdışı paket tamamlanamadı'));
    };
    worker.postMessage({ type: 'CACHE_APP' }, [channel.port2]);
  });
  await AsyncStorage.setItem(storageKey, 'ready');
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [activeCity, setActiveCity] = useState<CityId>('bursa');
  const [category, setCategory] = useState<ExploreCategory>('Tümü');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['uludag']);
  const [selected, setSelected] = useState<Place | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [plannedDistricts, setPlannedDistricts] = useState<string[]>([]);
  const [selectedSpiritual, setSelectedSpiritual] = useState<SpiritualSite | null>(null);
  const [plannedSpiritual, setPlannedSpiritual] = useState<string[]>([]);
  const [plannedIstanbulPlaces, setPlannedIstanbulPlaces] = useState<string[]>([]);
  const [plannedBursaPlaces, setPlannedBursaPlaces] = useState<string[]>([]);
  const [plannedAnkaraPlaces, setPlannedAnkaraPlaces] = useState<string[]>([]);
  const [plannedIzmirPlaces, setPlannedIzmirPlaces] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('./service-worker.js').catch(() => {});
    }
    AsyncStorage.getItem('turkiye-rehberi-favoriler').then(value => {
      if (value) setFavorites(JSON.parse(value));
    }).catch(() => {});
    AsyncStorage.getItem('turkiye-rehberi-ilce-plani').then(value => {
      if (value) setPlannedDistricts(JSON.parse(value));
    }).catch(() => {});
    AsyncStorage.getItem('turkiye-rehberi-manevi-plan').then(value => {
      if (value) setPlannedSpiritual(JSON.parse(value));
    }).catch(() => {});
    AsyncStorage.getItem('turkiye-rehberi-istanbul-mekan-plani').then(value => {
      if (value) setPlannedIstanbulPlaces(JSON.parse(value));
    }).catch(() => {});
    AsyncStorage.getItem('turkiye-rehberi-bursa-mekan-plani').then(value => {
      if (value) setPlannedBursaPlaces(JSON.parse(value));
    }).catch(() => {});
    AsyncStorage.getItem('turkiye-rehberi-ankara-mekan-plani').then(value => {
      if (value) setPlannedAnkaraPlaces(JSON.parse(value));
    }).catch(() => {});
    AsyncStorage.getItem('turkiye-rehberi-izmir-mekan-plani').then(value => {
      if (value) setPlannedIzmirPlaces(JSON.parse(value));
    }).catch(() => {});
  }, []);

  const filteredPlaces = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('tr-TR');
    return allBursaPlaces.filter(place => {
      const categoryMatch = category === 'Tümü' || (category !== 'Manevi' && place.category === category);
      const text = `${place.name} ${place.district} ${place.category} ${place.summary} ${place.beach?.waterType ?? ''} ${place.beach?.blueFlag ? 'mavi bayrak' : ''}`.toLocaleLowerCase('tr-TR');
      const hideBeachFromDefault = Boolean(place.beach) && category === 'Tümü' && !normalized;
      return categoryMatch && !hideBeachFromDefault && (!normalized || text.includes(normalized));
    });
  }, [category, query]);

  const favoritePlaces = [...allBursaPlaces, ...bursaBaths, ...istanbulFavoritePlaces, ...istanbulBeachFavoritePlaces, ...ankaraFavoritePlaces, ...izmirFavoritePlaces, ...izmirBeachFavoritePlaces].filter(place => favorites.includes(place.id));
  const toggleFavorite = (id: string) => setFavorites(current => {
    const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    AsyncStorage.setItem('turkiye-rehberi-favoriler', JSON.stringify(next)).catch(() => {});
    return next;
  });
  const toggleDistrictPlan = (name: string) => setPlannedDistricts(current => {
    const next = current.includes(name) ? current.filter(item => item !== name) : [...current, name];
    AsyncStorage.setItem('turkiye-rehberi-ilce-plani', JSON.stringify(next)).catch(() => {});
    return next;
  });
  const toggleSpiritualPlan = (id: string) => setPlannedSpiritual(current => {
    const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    AsyncStorage.setItem('turkiye-rehberi-manevi-plan', JSON.stringify(next)).catch(() => {});
    return next;
  });
  const toggleIstanbulPlacePlan = (id: string) => setPlannedIstanbulPlaces(current => {
    const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    AsyncStorage.setItem('turkiye-rehberi-istanbul-mekan-plani', JSON.stringify(next)).catch(() => {});
    return next;
  });
  const toggleBursaPlacePlan = (id: string) => setPlannedBursaPlaces(current => {
    const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    AsyncStorage.setItem('turkiye-rehberi-bursa-mekan-plani', JSON.stringify(next)).catch(() => {});
    return next;
  });
  const toggleAnkaraPlacePlan = (id: string) => setPlannedAnkaraPlaces(current => {
    const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    AsyncStorage.setItem('turkiye-rehberi-ankara-mekan-plani', JSON.stringify(next)).catch(() => {});
    return next;
  });
  const toggleIzmirPlacePlan = (id: string) => setPlannedIzmirPlaces(current => {
    const next = current.includes(id) ? current.filter(item => item !== id) : [...current, id];
    AsyncStorage.setItem('turkiye-rehberi-izmir-mekan-plani', JSON.stringify(next)).catch(() => {});
    return next;
  });
  const selectedIsIstanbul = selected ? istanbulPlaceIds.has(selected.id) : false;
  const selectedIsAnkara = selected ? ankaraPlaceIds.has(selected.id) : false;
  const selectedIsIzmir = selected ? izmirPlaceIds.has(selected.id) : false;
  const planCount = plannedDistricts.length + plannedSpiritual.length + plannedBursaPlaces.length + plannedIstanbulPlaces.length + plannedAnkaraPlaces.length + plannedIzmirPlaces.length;

  const content = tab === 'plan'
    ? <PlanScreen districtNames={plannedDistricts} spiritualIds={plannedSpiritual} bursaPlaceIds={plannedBursaPlaces} istanbulPlaceIds={plannedIstanbulPlaces} ankaraPlaceIds={plannedAnkaraPlaces} izmirPlaceIds={plannedIzmirPlaces} onRemoveDistrict={toggleDistrictPlan} onRemoveSpiritual={toggleSpiritualPlan} onRemoveBursaPlace={toggleBursaPlacePlan} onRemoveIstanbulPlace={toggleIstanbulPlacePlan} onRemoveAnkaraPlace={toggleAnkaraPlacePlan} onRemoveIzmirPlace={toggleIzmirPlacePlan} />
    : tab === 'favorites'
    ? <Favorites places={favoritePlaces} onOpen={setSelected} onRemove={toggleFavorite} />
    : tab === 'profile'
      ? <Profile favoriteCount={favorites.length} planCount={planCount} />
      : tab === 'explore'
        ? <CitiesExplore onOpenCity={city => { setActiveCity(city); setTab('home'); }} />
      : activeCity === 'istanbul'
        ? <IstanbulGuide plannedPlaceIds={plannedIstanbulPlaces} favorites={favorites} onFavorite={toggleFavorite} onTogglePlan={toggleIstanbulPlacePlan} onMenu={() => setMenuOpen(true)} />
      : activeCity === 'ankara'
        ? <AnkaraGuide plannedPlaceIds={plannedAnkaraPlaces} favorites={favorites} onFavorite={toggleFavorite} onTogglePlan={toggleAnkaraPlacePlan} onMenu={() => setMenuOpen(true)} />
      : activeCity === 'izmir'
        ? <IzmirGuide plannedPlaceIds={plannedIzmirPlaces} favorites={favorites} onFavorite={toggleFavorite} onTogglePlan={toggleIzmirPlacePlan} onMenu={() => setMenuOpen(true)} />
      : <MainContent
          exploreOnly={false}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          places={filteredPlaces}
          favorites={favorites}
          plannedPlaces={plannedBursaPlaces}
          plannedDistricts={plannedDistricts}
          plannedSpiritual={plannedSpiritual}
          onFavorite={toggleFavorite}
          onPlacePlan={toggleBursaPlacePlan}
          onDistrictPlan={toggleDistrictPlan}
          onSpiritualPlan={toggleSpiritualPlan}
          onOpen={setSelected}
          onDistrictOpen={setSelectedDistrict}
          onSpiritualOpen={setSelectedSpiritual}
          onMenu={() => setMenuOpen(true)}
        />;

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {content}
      <BottomTabs tab={tab} setTab={setTab} favoriteCount={favorites.length} planCount={planCount} />
      <PlaceModal place={selected} favorite={selected ? favorites.includes(selected.id) : false} planned={selected ? (selectedIsIstanbul ? plannedIstanbulPlaces : selectedIsAnkara ? plannedAnkaraPlaces : selectedIsIzmir ? plannedIzmirPlaces : plannedBursaPlaces).includes(selected.id) : false} onClose={() => setSelected(null)} onFavorite={toggleFavorite} onTogglePlan={selectedIsIstanbul ? toggleIstanbulPlacePlan : selectedIsAnkara ? toggleAnkaraPlacePlan : selectedIsIzmir ? toggleIzmirPlacePlan : toggleBursaPlacePlan} />
      <DistrictModal district={selectedDistrict} planned={selectedDistrict ? plannedDistricts.includes(selectedDistrict.name) : false} onClose={() => setSelectedDistrict(null)} onTogglePlan={toggleDistrictPlan} />
      <SpiritualModal site={selectedSpiritual} planned={selectedSpiritual ? plannedSpiritual.includes(selectedSpiritual.id) : false} onClose={() => setSelectedSpiritual(null)} onTogglePlan={toggleSpiritualPlan} />
      <AppMenu visible={menuOpen} activeCity={activeCity} favoriteCount={favorites.length} planCount={planCount} onClose={() => setMenuOpen(false)} onNavigate={nextTab => { setMenuOpen(false); setTab(nextTab); }} onCity={city => { setActiveCity(city); setTab('home'); setMenuOpen(false); }} />
    </View>
  );
}

function CitiesExplore({ onOpenCity }: { onOpenCity: (city: CityId) => void }) {
  const [cityQuery, setCityQuery] = useState('');
  const [region, setRegion] = useState<'Tümü' | Region>('Tümü');
  const [upcoming, setUpcoming] = useState<string | null>(null);
  const normalized = cityQuery.trim().toLocaleLowerCase('tr-TR');
  const cities = turkeyCities.filter(city => (region === 'Tümü' || city.region === region) && (!normalized || `${city.name} ${city.region} ${city.plate}`.toLocaleLowerCase('tr-TR').includes(normalized)));
  return <SafeAreaView style={styles.citiesPage}><ScrollView contentContainerStyle={styles.citiesContent} showsVerticalScrollIndicator={false}>
    <View style={styles.citiesHero}><View style={styles.citiesBrand}><View style={styles.brandMark}><Text style={styles.brandMarkText}>TR</Text></View><Text style={styles.citiesBrandText}>Türkiye Rehberi</Text></View><Text style={styles.citiesKicker}>81 İL · 7 BÖLGE</Text><Text style={styles.citiesTitle}>Türkiye’yi{`\n`}şehir şehir keşfet.</Text><Text style={styles.citiesCopy}>Bir bölge seç, şehirleri ara ve kendi Türkiye rotanı oluşturmaya başla.</Text><View style={styles.citiesStats}><View><Text style={styles.citiesStatNumber}>81</Text><Text style={styles.citiesStatLabel}>Şehir</Text></View><View style={styles.citiesStatLine} /><View><Text style={styles.citiesStatNumber}>7</Text><Text style={styles.citiesStatLabel}>Bölge</Text></View><View style={styles.citiesStatLine} /><View><Text style={styles.citiesStatNumber}>04</Text><Text style={styles.citiesStatLabel}>Hazır rehber</Text></View></View></View>

    <View style={styles.citySearch}><Text style={styles.searchIcon}>⌕</Text><TextInput value={cityQuery} onChangeText={setCityQuery} placeholder="Şehir, bölge veya plaka ara" placeholderTextColor="#8A9691" style={styles.searchInput} /></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.regionRail}>{regions.map(item => <Pressable key={item} onPress={() => setRegion(item)} style={[styles.regionChip, region === item && styles.regionChipActive]}><Text style={[styles.regionChipText, region === item && styles.regionChipTextActive]}>{item}</Text></Pressable>)}</ScrollView>

    {upcoming && <View style={styles.upcomingNotice}><View style={styles.upcomingNoticeBody}><Text style={styles.upcomingNoticeKicker}>SIRADAKİ ŞEHİRLERDEN</Text><Text style={styles.upcomingNoticeTitle}>{upcoming} rehberi hazırlanıyor</Text><Text style={styles.upcomingNoticeCopy}>Bursa için kurduğumuz bütün modüller bu şehre de uygulanacak.</Text></View><Pressable onPress={() => setUpcoming(null)}><Text style={styles.upcomingNoticeClose}>×</Text></Pressable></View>}

    {(region === 'Tümü' || region === 'Marmara') && (!normalized || 'bursa marmara 16'.includes(normalized)) && <Pressable onPress={() => onOpenCity('bursa')} style={styles.activeCity}><Image source={bursa.hero} style={styles.activeCityImage} /><View style={styles.activeCityShade} /><View style={styles.activeCityTop}><View style={styles.activeBadge}><Text style={styles.activeBadgeText}>YAYINDA</Text></View><Text style={styles.activePlate}>16</Text></View><View style={styles.activeCityBottom}><Text style={styles.activeRegion}>MARMARA BÖLGESİ</Text><Text style={styles.activeCityName}>Bursa</Text><Text style={styles.activeCityCopy}>17 ilçe · tarih · doğa · lezzet · manevi miras</Text><Text style={styles.activeCityOpen}>Şehir rehberini aç  →</Text></View></Pressable>}

    <View style={styles.citiesListHeading}><Text style={styles.moduleTitle}>{region === 'Tümü' ? 'Tüm şehirler' : `${region} şehirleri`}</Text><Text style={styles.moduleHint}>{cities.length} il</Text></View>
    <View style={styles.citiesGrid}>{cities.filter(city => city.name !== 'Bursa').map(city => <Pressable key={city.plate} onPress={() => city.status === 'active' ? onOpenCity(city.name === 'Ankara' ? 'ankara' : city.name === 'İzmir' ? 'izmir' : 'istanbul') : city.status === 'next' && setUpcoming(city.name)} style={[styles.cityTile, city.status === 'next' && styles.cityTileNext, city.status === 'active' && styles.cityTileActive]}><View style={styles.cityTileTop}><Text style={styles.cityTilePlate}>{String(city.plate).padStart(2, '0')}</Text><View style={[styles.cityStatusDot, city.status === 'next' && styles.cityStatusDotNext, city.status === 'active' && styles.cityStatusDotActive]} /></View><Text style={styles.cityTileRegion}>{city.region.toUpperCase()}</Text><Text style={styles.cityTileName}>{city.name}</Text><Text style={[styles.cityTileStatus, city.status === 'next' && styles.cityTileStatusNext, city.status === 'active' && styles.cityTileStatusActive]}>{city.status === 'active' ? 'Rehberi aç  →' : city.status === 'next' ? 'Sıradaki şehir  →' : 'Planlandı'}</Text></Pressable>)}</View>
    {!cities.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>Şehir bulunamadı</Text><Text style={styles.emptyCopy}>Farklı bir şehir, bölge veya plaka numarası deneyin.</Text></View>}
  </ScrollView></SafeAreaView>;
}

function AnkaraGuide({ plannedPlaceIds, favorites, onFavorite, onTogglePlan, onMenu }: { plannedPlaceIds: string[]; favorites: string[]; onFavorite: (id: string) => void; onTogglePlan: (id: string) => void; onMenu: () => void }) {
  const ankaraCategories: ExploreCategory[] = ['Tümü', 'Tarih', 'Doğa', 'Lezzet', 'Manevi'];
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ExploreCategory>('Tümü');
  const [selectedPlace, setSelectedPlace] = useState<AnkaraPlace | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<AnkaraDistrict | null>(null);
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>('idle');
  const normalized = query.trim().toLocaleLowerCase('tr-TR');
  const visibleShoppingStreets = ankaraShoppingStreets.filter(item => !normalized || `${item.area} ${item.district} ${item.character} alışveriş çarşı cadde pazar`.toLocaleLowerCase('tr-TR').includes(normalized));
  const visibleDistricts = ankaraDistricts.filter(item => !normalized || `${item.name} ${item.signature} ${item.highlights.join(' ')} ${item.flavors.join(' ')}`.toLocaleLowerCase('tr-TR').includes(normalized));
  const searchedPlaces = ankaraPlaces.filter(item => !normalized || `${item.name} ${item.district} ${item.category} ${item.summary}`.toLocaleLowerCase('tr-TR').includes(normalized));
  const categoryPlaces = searchedPlaces.filter(place => category === 'Tümü' || category === 'Tarih' && ['Tarihî yapı', 'Tarihî doku', 'Müze'].includes(place.category) || category === 'Doğa' && ['Doğa', 'Manzara', 'Aile & Park'].includes(place.category) || category === 'Manevi' && place.category === 'Manevi');
  const openMap = (mapQuery: string) => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`);
  const openRoute = (stops: string[]) => Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${stops[0]} Ankara`)}&destination=${encodeURIComponent(`${stops[stops.length - 1]} Ankara`)}&waypoints=${encodeURIComponent(stops.slice(1, -1).map(stop => `${stop} Ankara`).join('|'))}`);
  const services: [string, string, string][] = [['AVM', 'Alışveriş merkezleri', 'Ankara alışveriş merkezleri'], ['H', 'Hastaneler', 'Ankara hastaneleri'], ['+', 'Nöbetçi eczaneler', 'Ankara nöbetçi eczane'], ['↔', 'Ulaşım merkezleri', 'Ankara metro tren otobüs durakları']];
  const nearby = [{ label: 'Gezilecek yer', icon: '⌖', query: 'gezilecek yerler' }, { label: 'Kafe', icon: '☕', query: 'kafeler' }, { label: 'Restoran', icon: '🍴', query: 'restoranlar' }, { label: 'Müze', icon: '▣', query: 'müzeler' }, { label: 'Eczane', icon: '+', query: 'eczaneler' }, { label: 'Hastane', icon: 'H', query: 'hastaneler' }, { label: 'AVM', icon: '⌂', query: 'alışveriş merkezleri' }, { label: 'Otopark', icon: 'P', query: 'otoparklar' }];

  useEffect(() => { AsyncStorage.getItem('turkiye-rehberi-offline-ankara').then(value => setOfflineStatus(value === 'ready' ? 'ready' : 'idle')).catch(() => {}); }, []);
  const saveOffline = async () => {
    if (offlineStatus === 'ready' || offlineStatus === 'downloading') return;
    setOfflineStatus('downloading');
    try { await downloadOfflineGuide('turkiye-rehberi-offline-ankara'); setOfflineStatus('ready'); } catch { setOfflineStatus('error'); }
  };

  const renderPlaces = (title: string, kicker: string, items: AnkaraPlace[]) => {
    if (!items.length) return null;
    return <><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>{kicker}</Text><Text style={styles.moduleTitle}>{title}</Text></View><Text style={styles.moduleHint}>{items.length} yer</Text></View><View style={styles.istanbulPlaceList}>{items.map(place => { const planned = plannedPlaceIds.includes(place.id); const favorite = favorites.includes(place.id); return <View key={place.id} style={styles.istanbulPlaceCard}><Pressable onPress={() => setSelectedPlace(place)}><View><Image source={place.image} style={styles.istanbulPlaceImage} {...(Platform.OS === 'web' ? ({ loading: 'lazy' } as object) : {})} /><Pressable hitSlop={10} onPress={event => { event.stopPropagation(); onFavorite(place.id); }} style={styles.favoriteButton}><Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>{favorite ? '♥' : '♡'}</Text></Pressable></View><View style={styles.istanbulPlaceBody}><Text style={styles.istanbulPlaceMeta}>{place.category.toUpperCase()} · {place.district.toUpperCase()}</Text><Text style={styles.istanbulPlaceName}>{place.name}</Text><Text style={styles.istanbulPlaceCopy}>{place.summary}</Text><Text style={styles.istanbulDetailOpen}>Detayı aç  →</Text></View></Pressable><Pressable onPress={() => onTogglePlan(place.id)} style={[styles.istanbulCardPlanButton, planned && styles.istanbulCardPlanButtonActive]}><Text style={[styles.istanbulCardPlanText, planned && styles.istanbulCardPlanTextActive]}>{planned ? '✓  Planıma eklendi' : '+  Planıma ekle'}</Text></Pressable></View>; })}</View></>;
  };

  const history = categoryPlaces.filter(place => ['Tarihî yapı', 'Tarihî doku', 'Müze'].includes(place.category));
  const spiritual = categoryPlaces.filter(place => place.category === 'Manevi');
  const nature = categoryPlaces.filter(place => ['Doğa', 'Manzara', 'Aile & Park'].includes(place.category));

  return <SafeAreaView style={styles.istanbulPage}><ScrollView contentContainerStyle={styles.istanbulContent} showsVerticalScrollIndicator={false}>
    <ImageBackground source={require('./assets/ankara/anitkabir.jpg')} style={styles.istanbulHero} imageStyle={styles.istanbulHeroImage}><View style={styles.istanbulHeroShade} /><View style={styles.istanbulHeroTop}><View style={styles.istanbulLive}><Text style={styles.istanbulLiveText}>YAYINDA · 06</Text></View><View style={styles.istanbulHeroActions}><Text style={styles.istanbulHeroRegion}>İÇ ANADOLU · 25 İLÇE</Text><Pressable accessibilityRole="button" accessibilityLabel="Ana menüyü aç" onPress={onMenu} style={styles.roundButton}><Text style={styles.roundButtonText}>☰</Text></Pressable></View></View><View style={styles.istanbulHeroBody}><Text style={styles.istanbulHeroKicker}>CUMHURİYETİN BAŞKENTİ</Text><Text style={styles.istanbulHeroTitle}>Ankara</Text><Text style={styles.istanbulHeroCopy}>Cumhuriyet mirasından Frigya’ya, bozkır göllerinden tarihî ilçelere uzanan kapsamlı başkent rehberi.</Text></View></ImageBackground>
    <View style={styles.istanbulBody}>
      <View style={styles.citySearch}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="İlçe, yapı, müze veya doğa ara" placeholderTextColor="#8A9691" style={styles.searchInput} /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>{ankaraCategories.map(item => <Pressable key={item} onPress={() => setCategory(item)} style={[styles.categoryChip, category === item && styles.categoryChipActive]}><Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text></Pressable>)}</ScrollView>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>İLÇE REHBERİ</Text><Text style={styles.moduleTitle}>25 ilçeyi keşfet</Text></View><Text style={styles.moduleHint}>{visibleDistricts.length} sonuç</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.istanbulDistrictRail}>{visibleDistricts.map((item, index) => { const districtId = `ankara-ilce-${item.name}`; const planned = plannedPlaceIds.includes(districtId); return <Pressable key={item.name} onPress={() => setSelectedDistrict(item)} style={[styles.istanbulDistrictCard, { backgroundColor: index % 3 === 0 ? '#315F53' : index % 3 === 1 ? '#75513B' : '#477A89' }]}><Text style={styles.istanbulDistrictSide}>ANKARA · İLÇE</Text><Text style={styles.istanbulDistrictName}>{item.name}</Text><Text style={styles.istanbulDistrictCopy}>{item.signature}</Text><Text style={styles.istanbulDistrictOpen}>Detayı aç  →</Text><Pressable onPress={event => { event.stopPropagation(); onTogglePlan(districtId); }} style={[styles.istanbulDistrictPlan, planned && styles.istanbulDistrictPlanActive]}><Text style={styles.istanbulDistrictPlanText}>{planned ? '✓  Planımda' : '+  Planıma ekle'}</Text></Pressable></Pressable>; })}</ScrollView>
      {category !== 'Lezzet' && <>{renderPlaces('Tarih, müze & Cumhuriyet mirası', 'BAŞKENTİN HAFIZASI', history)}{renderPlaces('Camiler & manevi duraklar', 'MİMARİ & MANEVİ MİRAS', spiritual)}{renderPlaces('Doğa, göller & manzara', 'BOZKIRDAN ORMANLARA', nature)}</>}
      {(category === 'Tümü' || category === 'Lezzet') && <><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>BÖLGE BÖLGE</Text><Text style={styles.moduleTitle}>Kafeler & restoranlar</Text></View><Text style={styles.moduleHint}>{ankaraVenueAreas.length} bölge</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{ankaraVenueAreas.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.cafeQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>Yakındaki kafeler  ↗</Text></Pressable><Pressable onPress={() => openMap(item.restaurantQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Restoranları göster  ↗</Text></Pressable></View>)}</ScrollView><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ANKARA LEZZET REHBERİ</Text><Text style={styles.moduleTitle}>Ne, nerede yenir?</Text></View><Text style={styles.moduleHint}>{ankaraFoodGuide.length} öneri</Text></View><View style={styles.foodList}>{ankaraFoodGuide.map((food, index) => <Pressable key={food.dish} onPress={() => openMap(food.mapQuery)} style={styles.foodRow}><Text style={styles.foodNumber}>{String(index + 1).padStart(2, '0')}</Text><View style={styles.foodBody}><Text style={styles.foodDish}>{food.dish}</Text><Text style={styles.foodArea}>{food.area}</Text><Text style={styles.foodNote}>{food.note}</Text></View><Text style={styles.foodArrow}>↗</Text></Pressable>)}</View></>}
      {category === 'Tümü' && <><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ÇOCUKLARLA ANKARA</Text><Text style={styles.moduleTitle}>Aile & çocuk rotaları</Text></View><Text style={styles.moduleHint}>{ankaraFamilyRoutes.length} rota</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{ankaraFamilyRoutes.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.mapQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Rotayı haritada aç  ↗</Text></Pressable></View>)}</ScrollView><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>GÜN BATIMINDAN SONRA</Text><Text style={styles.moduleTitle}>Ankara gece hayatı</Text></View><Text style={styles.moduleHint}>{ankaraNightlifeAreas.length} bölge</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{ankaraNightlifeAreas.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.mapQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Bölgede ara  ↗</Text></Pressable></View>)}</ScrollView>{visibleShoppingStreets.length > 0 && <><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>CADDELER & ÇARŞILAR</Text><Text style={styles.moduleTitle}>Alışveriş rotaları</Text></View><Text style={styles.moduleHint}>{visibleShoppingStreets.length} rota</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{visibleShoppingStreets.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.mapQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>Haritada keşfet  ↗</Text></Pressable></View>)}</ScrollView></>}<AccommodationSection city="Ankara" items={ankaraAccommodations} /><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>PLANINI HAZIRLA</Text><Text style={styles.moduleTitle}>Günlük & tematik rotalar</Text></View><Text style={styles.moduleHint}>{ankaraRoutes.length} rota</Text></View><View style={styles.routeList}>{ankaraRoutes.map((route, index) => <Pressable key={route.title} onPress={() => openRoute(route.stops)} style={[styles.routeCard, { backgroundColor: route.theme }]}><View style={styles.routeTop}><Text style={styles.routeIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.routeDuration}>{route.duration}</Text></View><Text style={styles.routeTitle}>{route.title}</Text><Text style={styles.routeStops}>{route.stops.join('  ·  ')}</Text><Text style={styles.routeOpen}>Rotayı haritada başlat  →</Text></Pressable>)}</View><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ŞEHRİN KADRAJLARI</Text><Text style={styles.moduleTitle}>Ankara fotoğraf günlüğü</Text></View><Text style={styles.moduleHint}>{ankaraGallery.length} kare</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRail}>{ankaraGallery.map(item => <View key={item.title} style={styles.galleryCard}><Image source={item.image} style={styles.galleryImage} {...(Platform.OS === 'web' ? ({ loading: 'lazy' } as object) : {})} /><View style={styles.galleryShade} /><View style={styles.galleryCaption}><Text style={styles.galleryDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.galleryTitle}>{item.title}</Text></View></View>)}</ScrollView><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ŞEHİR İÇİNDE HAREKET</Text><Text style={styles.moduleTitle}>Toplu ulaşım rehberi</Text></View><Text style={styles.moduleHint}>{ankaraTransport.length} seçenek</Text></View><View style={styles.serviceGrid}>{ankaraTransport.map(item => <Pressable key={item.name} onPress={() => openMap(item.mapQuery)} style={styles.serviceCard}><View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{item.icon}</Text></View><Text style={styles.serviceKind}>ULAŞIM AĞI</Text><Text style={styles.serviceName}>{item.name}</Text><Text style={styles.serviceCopy}>{item.description}</Text><Text style={styles.serviceOpen}>Haritada aç  ↗</Text></Pressable>)}</View><View style={styles.infoCard}><Text style={styles.infoLabel}>ANKARAKART & AKTARMA</Text><Text style={styles.infoTitle}>Raylı sistem ve otobüslerde tek kart</Text><Text style={styles.infoCopy}>Güncel ücret, sefer ve aktarma bilgilerini yolculuk öncesinde EGO’nun resmî kanallarından kontrol edin.</Text></View><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ŞEHİRDE İHTİYACIN OLAN</Text><Text style={styles.moduleTitle}>Temel hizmetler</Text></View></View><View style={styles.serviceGrid}>{services.map(([icon, name, mapQuery]) => <Pressable key={name} onPress={() => openMap(mapQuery)} style={styles.serviceCard}><View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{icon}</Text></View><Text style={styles.serviceKind}>YAKINDA ARA</Text><Text style={styles.serviceName}>{name}</Text><Text style={styles.serviceCopy}>Güncel konumları ve yol seçeneklerini haritada görüntüle.</Text><Text style={styles.serviceOpen}>Haritada aç  ↗</Text></Pressable>)}</View><NearbySection city="Ankara" items={nearby} /><View style={styles.offlineCard}><View style={styles.offlineTop}><View style={styles.offlineIcon}><Text style={styles.offlineIconText}>↓</Text></View><View style={styles.offlineBody}><Text style={styles.offlineEyebrow}>İNTERNETSİZ KULLANIM</Text><Text style={styles.offlineTitle}>Ankara rehberini indir</Text><Text style={styles.offlineCopy}>Uygulama içeriği ve yerel fotoğraflar cihazına kaydedilir. Canlı harita için internet gerekir.</Text></View></View>{offlineStatus === 'error' && <Text style={styles.offlineError}>Paket indirilemedi. İnternet bağlantını kontrol edip yeniden dene.</Text>}<Pressable disabled={offlineStatus === 'downloading'} onPress={saveOffline} style={[styles.offlineButton, offlineStatus === 'ready' && styles.offlineButtonReady, offlineStatus === 'downloading' && styles.disabledButton]}><Text style={[styles.offlineButtonText, offlineStatus === 'ready' && styles.offlineButtonTextReady]}>{offlineStatus === 'ready' ? '✓  Çevrimdışı rehber hazır' : offlineStatus === 'downloading' ? 'Rehber indiriliyor…' : 'Rehberi bu cihaza indir'}</Text></Pressable></View><Text style={styles.istanbulSource}>İçerikler Kültür ve Turizm Bakanlığı, Ankara İl Kültür ve Turizm Müdürlüğü ve resmî müze kaynakları temel alınarak hazırlanmıştır.</Text></>}
    </View>
  </ScrollView><IstanbulPlaceModal place={selectedPlace} favorite={selectedPlace ? favorites.includes(selectedPlace.id) : false} planned={selectedPlace ? plannedPlaceIds.includes(selectedPlace.id) : false} onFavorite={onFavorite} onTogglePlan={onTogglePlan} onClose={() => setSelectedPlace(null)} /><AnkaraDistrictModal district={selectedDistrict} planned={selectedDistrict ? plannedPlaceIds.includes(`ankara-ilce-${selectedDistrict.name}`) : false} onTogglePlan={onTogglePlan} onClose={() => setSelectedDistrict(null)} /></SafeAreaView>;
}

function IzmirGuide({ plannedPlaceIds, favorites, onFavorite, onTogglePlan, onMenu }: { plannedPlaceIds: string[]; favorites: string[]; onFavorite: (id: string) => void; onTogglePlan: (id: string) => void; onMenu: () => void }) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1100;
  const isTablet = width >= 700 && width < 1100;
  const placeCategories: ExploreCategory[] = ['Tümü', 'Tarih', 'Doğa', 'Manevi'];
  const scrollRef = useRef<ScrollView>(null);
  const [guideSection, setGuideSection] = useState<CityGuideSection>('overview');
  const [foodSection, setFoodSection] = useState<IzmirFoodSection>('venues');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ExploreCategory>('Tümü');
  const [selectedPlace, setSelectedPlace] = useState<IzmirPlace | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<IzmirDistrict | null>(null);
  const [selectedSearchBeach, setSelectedSearchBeach] = useState<IzmirBeach | null>(null);
  const [showBeachGuide, setShowBeachGuide] = useState(false);
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>('idle');
  const normalized = query.trim().toLocaleLowerCase('tr-TR');
  const visibleShoppingStreets = izmirShoppingStreets.filter(item => !normalized || `${item.area} ${item.district} ${item.character} alışveriş çarşı cadde pazar`.toLocaleLowerCase('tr-TR').includes(normalized));
  const visibleDistricts = izmirDistricts.filter(item => !normalized || `${item.name} ${item.signature} ${item.highlights.join(' ')} ${item.flavors.join(' ')}`.toLocaleLowerCase('tr-TR').includes(normalized));
  const searchedPlaces = izmirPlaces.filter(item => !normalized || `${item.name} ${item.district} ${item.category} ${item.summary}`.toLocaleLowerCase('tr-TR').includes(normalized));
  const beachSearchResults = normalized ? izmirBeaches.filter(beach => `${beach.name} ${beach.district} ${beach.area} ${izmirBeachTypeLabels[beach.placeType]} ${beach.access ?? 'doğrulanmadı'} plaj koy sahil ${beach.blueFlag ? 'mavi bayrak' : ''}`.toLocaleLowerCase('tr-TR').includes(normalized)) : [];
  const categoryPlaces = searchedPlaces.filter(place => category === 'Tümü' || category === 'Tarih' && ['Tarihî yapı','Tarihî doku','Müze'].includes(place.category) || category === 'Doğa' && ['Doğa','Manzara','Aile & Park'].includes(place.category) || category === 'Sahil' && place.category === 'Sahil' || category === 'Manevi' && place.category === 'Manevi');
  const openMap = (mapQuery: string) => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`);
  const openRoute = (stops: string[]) => Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${stops[0]} İzmir`)}&destination=${encodeURIComponent(`${stops[stops.length - 1]} İzmir`)}&waypoints=${encodeURIComponent(stops.slice(1,-1).map(stop => `${stop} İzmir`).join('|'))}`);
  const nearby = [{label:'Gezilecek yer',icon:'⌖',query:'gezilecek yerler'},{label:'Kafe',icon:'☕',query:'kafeler'},{label:'Restoran',icon:'🍴',query:'restoranlar'},{label:'Müze',icon:'▣',query:'müzeler'},{label:'Eczane',icon:'+',query:'eczaneler'},{label:'Hastane',icon:'H',query:'hastaneler'},{label:'AVM',icon:'⌂',query:'alışveriş merkezleri'},{label:'Otopark',icon:'P',query:'otoparklar'}];
  const featuredPlaces = ['izmir-saat-kulesi', 'izmir-efes', 'izmir-alacati', 'izmir-foca'].map(id => izmirPlaces.find(place => place.id === id)).filter((place): place is IzmirPlace => Boolean(place));
  const selectGuideSection = (section: CityGuideSection) => { if (section === 'beaches') { setShowBeachGuide(true); return; } if (section === 'food') setFoodSection('venues'); setGuideSection(section); setQuery(''); setCategory('Tümü'); setTimeout(() => scrollRef.current?.scrollTo({ y: 0, animated: false }), 0); };
  const selectFoodSection = (section: IzmirFoodSection) => { setFoodSection(section); setTimeout(() => scrollRef.current?.scrollTo({ y: isDesktop ? 520 : 380, animated: true }), 0); };
  useEffect(() => { AsyncStorage.getItem('turkiye-rehberi-offline-izmir').then(value => setOfflineStatus(value === 'ready' ? 'ready' : 'idle')).catch(() => {}); }, []);
  const saveOffline = async () => { if (offlineStatus === 'ready' || offlineStatus === 'downloading') return; setOfflineStatus('downloading'); try { await downloadOfflineGuide('turkiye-rehberi-offline-izmir'); setOfflineStatus('ready'); } catch { setOfflineStatus('error'); } };
  const renderPlaces = (title: string, kicker: string, items: IzmirPlace[]) => !items.length ? null : <><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>{kicker}</Text><Text style={styles.moduleTitle}>{title}</Text></View><Text style={styles.moduleHint}>{items.length} yer</Text></View><View style={styles.istanbulPlaceList}>{items.map(place => { const planned=plannedPlaceIds.includes(place.id); const favorite=favorites.includes(place.id); return <View key={place.id} style={styles.istanbulPlaceCard}><Pressable onPress={() => setSelectedPlace(place)}><View><Image source={place.image} style={styles.istanbulPlaceImage} {...(Platform.OS === 'web' ? ({loading:'lazy'} as object) : {})}/><Pressable hitSlop={10} onPress={event=>{event.stopPropagation();onFavorite(place.id);}} style={styles.favoriteButton}><Text style={[styles.favoriteIcon,favorite&&styles.favoriteIconActive]}>{favorite?'♥':'♡'}</Text></Pressable></View><View style={styles.istanbulPlaceBody}><Text style={styles.istanbulPlaceMeta}>{place.category.toUpperCase()} · {place.district.toUpperCase()}</Text><Text style={styles.istanbulPlaceName}>{place.name}</Text><Text style={styles.istanbulPlaceCopy}>{place.summary}</Text><Text style={styles.istanbulDetailOpen}>Detayı aç  →</Text></View></Pressable><Pressable onPress={()=>onTogglePlan(place.id)} style={[styles.istanbulCardPlanButton,planned&&styles.istanbulCardPlanButtonActive]}><Text style={[styles.istanbulCardPlanText,planned&&styles.istanbulCardPlanTextActive]}>{planned?'✓  Planıma eklendi':'+  Planıma ekle'}</Text></Pressable></View>;})}</View></>;
  const history=categoryPlaces.filter(place=>['Tarihî yapı','Tarihî doku','Müze'].includes(place.category));
  const spiritual=categoryPlaces.filter(place=>place.category==='Manevi');
  const nature=categoryPlaces.filter(place=>['Doğa','Manzara','Aile & Park'].includes(place.category));
  const coast=categoryPlaces.filter(place=>place.category==='Sahil');
  if (showBeachGuide) return <IzmirBeachGuide query={query} setQuery={setQuery} favorites={favorites} plannedPlaceIds={plannedPlaceIds} onFavorite={onFavorite} onTogglePlan={onTogglePlan} onBack={()=>{setShowBeachGuide(false);setGuideSection('overview');setCategory('Tümü');}} />;
  return <SafeAreaView style={styles.istanbulPage}><ScrollView ref={scrollRef} contentContainerStyle={styles.istanbulContent} showsVerticalScrollIndicator={false}>
    <View style={[styles.istanbulHero,styles.izmirPremiumHero,isDesktop?styles.izmirPremiumHeroDesktop:styles.izmirPremiumHeroMobile]}>{Platform.OS === 'web' ? <View style={[StyleSheet.absoluteFill, styles.istanbulHeroImage, ({ backgroundImage: `url("${require('./assets/izmir/hero.jpg').uri}")`, backgroundPosition: '25% center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' } as object)]}/> : <Image source={require('./assets/izmir/hero.jpg')} resizeMode="cover" style={StyleSheet.absoluteFill}/>}<View style={[styles.istanbulHeroShade,styles.izmirPremiumHeroShade]}/><View style={styles.istanbulHeroTop}><View style={styles.istanbulLive}><Text style={styles.istanbulLiveText}>YAYINDA · 35</Text></View><View style={styles.istanbulHeroActions}><Text style={styles.istanbulHeroRegion}>EGE · 30 İLÇE</Text><Pressable accessibilityRole="button" accessibilityLabel="Ana menüyü aç" onPress={onMenu} style={styles.roundButton}><Text style={styles.roundButtonText}>☰</Text></Pressable></View></View><View style={[styles.istanbulHeroBody,styles.izmirPremiumHeroBody]}><Text style={[styles.istanbulHeroTitle,isDesktop&&styles.izmirPremiumHeroTitle]}>İZMİR</Text><Text style={styles.izmirHeroSubtitle}>Ege’nin İncisi</Text><Text style={[styles.istanbulHeroCopy,styles.izmirPremiumHeroCopy]}>Tarih, deniz, kültür ve Ege yaşamının buluştuğu şehir.</Text></View></View>
    <View style={[styles.izmirGuideNav,isDesktop&&styles.izmirGuideNavDesktop]}><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.izmirGuideNavRail,isDesktop&&styles.izmirGuideNavRailDesktop]}>{izmirGuideSections.map(item=><Pressable key={item.id} onPress={()=>selectGuideSection(item.id)} style={[styles.izmirGuideNavItem,isDesktop&&styles.izmirGuideNavItemDesktop,guideSection===item.id&&styles.izmirGuideNavItemActive]}><Text style={[styles.izmirGuideNavText,isDesktop&&styles.izmirGuideNavTextDesktop,guideSection===item.id&&styles.izmirGuideNavTextActive]}>{item.label}</Text></Pressable>)}</ScrollView></View>
    <View style={[styles.istanbulBody,styles.izmirPremiumBody]}>
      {guideSection!=='overview'&&<View style={styles.izmirBreadcrumb}><Pressable onPress={()=>selectGuideSection('overview')} style={styles.izmirBreadcrumbBack}><Text numberOfLines={1} style={styles.izmirBreadcrumbBackText}>←<Text style={styles.izmirBreadcrumbBackGap}>  </Text>Genel Bakış</Text></Pressable><Text style={styles.izmirBreadcrumbCurrent}>İzmir  /  {izmirGuideSections.find(item=>item.id===guideSection)?.label}</Text></View>}
      {guideSection==='overview'&&<><View style={styles.izmirOverviewIntro}><Text style={styles.istanbulEyebrow}>İZMİR’E GENEL BAKIŞ</Text><Text style={[styles.moduleTitle,isDesktop&&styles.izmirOverviewTitleDesktop]}>İzmir’e Genel Bakış</Text><Text style={styles.izmirOverviewCopy}>Ege’nin tarihini, kıyılarını, mutfağını ve şehir yaşamını tek rehberde keşfet.</Text></View>
        <View style={[styles.izmirDashboard,isDesktop&&styles.izmirDashboardDesktop]}>
          <View style={[styles.izmirDashboardPanel,styles.izmirFactsPanel,isDesktop&&styles.izmirDashboardSide,isTablet&&styles.izmirDashboardTabletHalf]}><Text style={styles.izmirPanelEyebrow}>HIZLI BİLGİLER</Text><View style={styles.izmirFactsGrid}>{izmirQuickFacts.map(fact=><View key={fact.label} style={styles.izmirFact}><Text style={styles.izmirFactValue}>{fact.value}</Text><Text style={styles.izmirFactLabel}>{fact.label}</Text></View>)}</View><Text style={styles.izmirFactsFootnote}>Nüfus 2025 ADNKS · Envanter güncel rehber verisidir.</Text></View>
          <View style={[styles.izmirDashboardPanel,styles.izmirFeaturedPanel,isDesktop&&styles.izmirDashboardCenter,isTablet&&styles.izmirDashboardTabletHalf]}><Text style={styles.izmirPanelEyebrow}>ÖNE ÇIKANLAR</Text><View style={styles.izmirFeaturedGrid}>{featuredPlaces.map(place=><Pressable key={place.id} onPress={()=>setSelectedPlace(place)} style={styles.izmirFeaturedCard}><Image source={place.image} style={styles.izmirFeaturedImage}/><View style={styles.izmirFeaturedShade}/><View style={styles.izmirFeaturedBody}><Text style={styles.izmirFeaturedDistrict}>{place.district.toUpperCase()}</Text><Text style={styles.izmirFeaturedName}>{place.name}</Text></View></Pressable>)}</View></View>
          <View style={[styles.izmirDashboardPanel,styles.izmirPopularPanel,isDesktop&&styles.izmirDashboardSide,isTablet&&styles.izmirDashboardTabletFull]}><Text style={styles.izmirPanelEyebrow}>POPÜLER KATEGORİLER</Text><View style={styles.izmirPopularList}>{[{id:'places' as CityGuideSection,label:'Gezilecek Yerler'},{id:'beaches' as CityGuideSection,label:'Sahiller & Plajlar'},{id:'food' as CityGuideSection,label:'Lezzet Rehberi'},{id:'stay-routes' as CityGuideSection,label:'Alışveriş Rotaları'}].map(item=><Pressable key={item.id+item.label} onPress={()=>selectGuideSection(item.id)} style={styles.izmirPopularButton}><Text style={styles.izmirPopularText}>{item.label}</Text><Text style={styles.izmirPopularArrow}>→</Text></Pressable>)}</View></View>
        </View>
        <View style={styles.izmirGuideHeading}><Text style={styles.istanbulEyebrow}>REHBERİNİ SEÇ</Text><Text style={[styles.moduleTitle,isDesktop&&styles.izmirGuideHeadingTitle]}>İzmir’i nasıl keşfetmek istersin?</Text></View><View style={[styles.izmirCategoryGrid,isDesktop&&styles.izmirCategoryGridDesktop]}>{[
          ['places','⌖','Gezilecek Yerler','Tarih, doğa, kültür ve önemli duraklar'],['food','🍴','Yeme & İçme','Kafeler, restoranlar ve İzmir lezzetleri'],['beaches','≈','Sahiller & Plajlar','Plajlar, koylar ve Mavi Bayraklı kıyılar'],['stay-routes','⌂','Konaklama & Rotalar','Nerede kalınır ve günlük gezi planları'],['services','↔','Ulaşım & Hizmetler','Toplu ulaşım ve şehirde ihtiyaç duyulanlar'],['districts','30','İlçe Rehberi','İzmir’in 30 ilçesini keşfet']
        ].map(([id,icon,title,copy],index)=>{const dark=index===0||index===5;const backgrounds=[palette.forest,'#F1E4CA','#DDECE8','#7A5944','#F8F2E7',palette.moss];return <Pressable key={id} onPress={()=>selectGuideSection(id as CityGuideSection)} style={[styles.izmirCategoryCard,isDesktop&&styles.izmirCategoryCardDesktop,{backgroundColor:backgrounds[index]}]}><Text style={[styles.izmirCategoryIcon,dark&&styles.izmirCategoryTextLight]}>{icon}</Text><View style={styles.izmirCategoryContent}><Text style={[styles.izmirCategoryTitle,dark&&styles.izmirCategoryTextLight]}>{title}</Text><Text style={[styles.izmirCategoryCopy,dark&&styles.izmirCategoryCopyLight]}>{copy}</Text></View><Text style={[styles.izmirCategoryOpen,dark&&styles.izmirCategoryTextLight]}>→</Text></Pressable>;})}</View>
      </>}
      {guideSection==='places'&&<><View style={styles.citySearch}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Mekân, ilçe veya deneyim ara" placeholderTextColor="#8A9691" style={styles.searchInput}/></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>{placeCategories.map(item=><Pressable key={item} onPress={()=>setCategory(item)} style={[styles.categoryChip,category===item&&styles.categoryChipActive]}><Text style={[styles.categoryText,category===item&&styles.categoryTextActive]}>{item}</Text></Pressable>)}</ScrollView>{renderPlaces('Antik kentler & tarihî doku','İZMİR’İN HAFIZASI',history)}{renderPlaces('Manevi duraklar','İNANÇ MİRASI',spiritual)}{renderPlaces('Doğa & aile keşifleri','DELTA, VADİ & YEŞİL',nature)}{renderPlaces('Kent sahilleri & kıyı rotaları','EGE KIYILARI',coast)}{category==='Tümü'&&<><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ÇOCUKLARLA İZMİR</Text><Text style={styles.moduleTitle}>Aile & çocuk rotaları</Text></View><Text style={styles.moduleHint}>{izmirFamilyRoutes.length} rota</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{izmirFamilyRoutes.map(item=><View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={()=>openMap(item.mapQuery)} style={[styles.venueButton,styles.venueButtonDark]}><Text style={[styles.venueButtonText,styles.venueButtonTextDark]}>Rotayı haritada aç  ↗</Text></Pressable></View>)}</ScrollView></>}</>}
      {guideSection==='food'&&<><View style={styles.izmirFoodIntro}><Text style={styles.istanbulEyebrow}>YEME & İÇME</Text><Text style={[styles.moduleTitle,isDesktop&&styles.izmirFoodTitleDesktop]}>İzmir’in lezzet ve sosyal yaşam rehberi</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.izmirFoodTabs,isDesktop&&styles.izmirFoodTabsDesktop]}>{([{id:'venues',label:'Kafeler & Restoranlar'},{id:'food-guide',label:'Lezzet Rehberi'},{id:'nightlife',label:'Gece Hayatı'}] as {id:IzmirFoodSection;label:string}[]).map(item=><Pressable key={item.id} onPress={()=>selectFoodSection(item.id)} style={[styles.izmirFoodTab,isDesktop&&styles.izmirFoodTabDesktop,foodSection===item.id&&styles.izmirFoodTabActive]}><Text numberOfLines={1} style={[styles.izmirFoodTabText,foodSection===item.id&&styles.izmirFoodTabTextActive]}>{item.label}</Text></Pressable>)}</ScrollView>
        {foodSection==='venues'&&<><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>BÖLGE BÖLGE</Text><Text style={styles.moduleTitle}>Kafeler & restoranlar</Text></View><Text style={styles.moduleHint}>{izmirVenueAreas.length} bölge</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{izmirVenueAreas.map(item=><View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={()=>openMap(item.cafeQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>Kafeleri göster  ↗</Text></Pressable><Pressable onPress={()=>openMap(item.restaurantQuery)} style={[styles.venueButton,styles.venueButtonDark]}><Text style={[styles.venueButtonText,styles.venueButtonTextDark]}>Restoranları göster  ↗</Text></Pressable></View>)}</ScrollView></>}
        {foodSection==='food-guide'&&<><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>İZMİR LEZZET REHBERİ</Text><Text style={styles.moduleTitle}>Ne, nerede yenir?</Text></View><Text style={styles.moduleHint}>{izmirFoodGuide.length} öneri</Text></View><View style={styles.foodList}>{izmirFoodGuide.map((food,index)=><Pressable key={food.dish} onPress={()=>openMap(food.mapQuery)} style={styles.foodRow}><Text style={styles.foodNumber}>{String(index+1).padStart(2,'0')}</Text><View style={styles.foodBody}><Text style={styles.foodDish}>{food.dish}</Text><Text style={styles.foodArea}>{food.area}</Text><Text style={styles.foodNote}>{food.note}</Text></View><Text style={styles.foodArrow}>↗</Text></Pressable>)}</View></>}
        {foodSection==='nightlife'&&<View style={styles.izmirNightlifeSection}><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>GÜN BATIMINDAN SONRA</Text><Text style={styles.moduleTitle}>İzmir Gece Hayatı</Text><Text style={styles.izmirNightlifeIntro}>Akşam yürüyüşlerinden canlı müzik bölgelerine, sosyal yaşamın öne çıkan duraklarını keşfet.</Text></View><Text style={styles.moduleHint}>{izmirNightlifeAreas.length} bölge</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{izmirNightlifeAreas.map(item=><View key={item.area} style={[styles.venueCard,styles.izmirNightlifeCard]}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={()=>openMap(item.mapQuery)} style={[styles.venueButton,styles.venueButtonDark]}><Text style={[styles.venueButtonText,styles.venueButtonTextDark]}>Bölgede ara  ↗</Text></Pressable></View>)}</ScrollView></View>}
      </>}
      {guideSection==='stay-routes'&&<><AccommodationSection city="İzmir" items={izmirAccommodations}/><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>PLANINI HAZIRLA</Text><Text style={styles.moduleTitle}>Günlük & tematik rotalar</Text></View><Text style={styles.moduleHint}>{izmirRoutes.length} rota</Text></View><View style={styles.routeList}>{izmirRoutes.map((route,index)=><Pressable key={route.id} onPress={()=>openRoute(route.stops)} style={[styles.routeCard,{backgroundColor:route.theme}]}><View style={styles.routeTop}><Text style={styles.routeIndex}>{String(index+1).padStart(2,'0')}</Text><Text style={styles.routeDuration}>{route.duration}</Text></View><Text style={styles.routeTitle}>{route.title}</Text><Text style={styles.routeStops}>{route.stops.join('  ·  ')}</Text><Text style={styles.routeOpen}>Rotayı haritada başlat  →</Text></Pressable>)}</View><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>CADDELER & ÇARŞILAR</Text><Text style={styles.moduleTitle}>Alışveriş rotaları</Text></View><Text style={styles.moduleHint}>{izmirShoppingStreets.length} rota</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{izmirShoppingStreets.map(item=><View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={()=>openMap(item.mapQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>Haritada keşfet  ↗</Text></Pressable></View>)}</ScrollView></>}
      {guideSection==='services'&&<><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ŞEHİR İÇİNDE HAREKET</Text><Text style={styles.moduleTitle}>Toplu ulaşım rehberi</Text></View><Text style={styles.moduleHint}>{izmirTransport.length} seçenek</Text></View><View style={styles.serviceGrid}>{izmirTransport.map(item=><Pressable key={item.name} onPress={()=>openMap(item.mapQuery)} style={styles.serviceCard}><View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{item.icon}</Text></View><Text style={styles.serviceKind}>ULAŞIM AĞI</Text><Text style={styles.serviceName}>{item.name}</Text><Text style={styles.serviceCopy}>{item.description}</Text><Text style={styles.serviceOpen}>Haritada aç  ↗</Text></Pressable>)}</View><NearbySection city="İzmir" items={nearby}/><View style={styles.offlineCard}><View style={styles.offlineTop}><View style={styles.offlineIcon}><Text style={styles.offlineIconText}>↓</Text></View><View style={styles.offlineBody}><Text style={styles.offlineEyebrow}>İNTERNETSİZ KULLANIM</Text><Text style={styles.offlineTitle}>İzmir rehberini indir</Text><Text style={styles.offlineCopy}>İçerik ve yerel fotoğraflar cihazına kaydedilir. Canlı harita internet gerektirir.</Text></View></View>{offlineStatus==='error'&&<Text style={styles.offlineError}>Paket indirilemedi. Yeniden deneyin.</Text>}<Pressable disabled={offlineStatus==='downloading'} onPress={saveOffline} style={[styles.offlineButton,offlineStatus==='ready'&&styles.offlineButtonReady]}><Text style={[styles.offlineButtonText,offlineStatus==='ready'&&styles.offlineButtonTextReady]}>{offlineStatus==='ready'?'✓  Çevrimdışı rehber hazır':offlineStatus==='downloading'?'Rehber indiriliyor…':'Rehberi bu cihaza indir'}</Text></Pressable></View></>}
      {guideSection==='districts'&&<><View style={styles.citySearch}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="İlçe veya deneyim ara" placeholderTextColor="#8A9691" style={styles.searchInput}/></View><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>İLÇE REHBERİ</Text><Text style={styles.moduleTitle}>30 ilçeyi keşfet</Text></View><Text style={styles.moduleHint}>{visibleDistricts.length} sonuç</Text></View><View style={styles.izmirDistrictGrid}>{visibleDistricts.map((item,index)=>{const id=`izmir-ilce-${item.name}`;const planned=plannedPlaceIds.includes(id);return <Pressable key={item.name} onPress={()=>setSelectedDistrict(item)} style={[styles.istanbulDistrictCard,styles.izmirDistrictCard,{backgroundColor:index%3===0?'#315F53':index%3===1?'#75513B':'#477A89'}]}><Text style={styles.istanbulDistrictSide}>İZMİR · İLÇE</Text><Text style={styles.istanbulDistrictName}>{item.name}</Text><Text style={styles.istanbulDistrictCopy}>{item.signature}</Text><Text style={styles.istanbulDistrictOpen}>Detayı aç  →</Text><Pressable onPress={event=>{event.stopPropagation();onTogglePlan(id);}} style={[styles.istanbulDistrictPlan,planned&&styles.istanbulDistrictPlanActive]}><Text style={styles.istanbulDistrictPlanText}>{planned?'✓  Planımda':'+  Planıma ekle'}</Text></Pressable></Pressable>;})}</View></>}
      <Text style={styles.istanbulSource}>İçerikler Kültür ve Turizm Bakanlığı, İzmir İl Kültür ve Turizm Müdürlüğü, TÜİK, UNESCO ve ilgili belediyelerin resmî kaynakları temel alınarak hazırlanmıştır.</Text>
    </View></ScrollView><IstanbulPlaceModal place={selectedPlace} favorite={selectedPlace?favorites.includes(selectedPlace.id):false} planned={selectedPlace?plannedPlaceIds.includes(selectedPlace.id):false} onFavorite={onFavorite} onTogglePlan={onTogglePlan} onClose={()=>setSelectedPlace(null)}/><IzmirBeachModal beach={selectedSearchBeach} favorite={selectedSearchBeach?favorites.includes(selectedSearchBeach.id):false} planned={selectedSearchBeach?plannedPlaceIds.includes(selectedSearchBeach.id):false} onFavorite={onFavorite} onPlan={onTogglePlan} onClose={()=>setSelectedSearchBeach(null)}/><IzmirDistrictModal district={selectedDistrict} planned={selectedDistrict?plannedPlaceIds.includes(`izmir-ilce-${selectedDistrict.name}`):false} onTogglePlan={onTogglePlan} onClose={()=>setSelectedDistrict(null)}/></SafeAreaView>;
}

const izmirBeachTypeLabels: Record<IzmirBeachType,string> = { public_beach:'Halk Plajı', beach:'Plaj', cove:'Koy', natural_coast:'Doğal Kıyı' };

function IzmirBeachGuide({query,setQuery,favorites,plannedPlaceIds,onFavorite,onTogglePlan,onBack}:{query:string;setQuery:(value:string)=>void;favorites:string[];plannedPlaceIds:string[];onFavorite:(id:string)=>void;onTogglePlan:(id:string)=>void;onBack:()=>void}) {
  const [district,setDistrict]=useState<'Tümü'|IzmirBeachDistrict>('Tümü');
  const [placeType,setPlaceType]=useState<'Tümü'|IzmirBeachType>('Tümü');
  const [access,setAccess]=useState<'Tümü'|'Ücretsiz'|'Ücretli'|'Karma'|'Doğrulanmadı'>('Tümü');
  const [blueFlagOnly,setBlueFlagOnly]=useState(false);
  const [selected,setSelected]=useState<IzmirBeach|null>(null);
  const normalized=query.trim().toLocaleLowerCase('tr-TR');
  const visible=useMemo(()=>izmirBeaches.filter(beach=>{const text=`${beach.name} ${beach.district} ${beach.area} ${izmirBeachTypeLabels[beach.placeType]} ${beach.access??'doğrulanmadı'} plaj koy sahil ${beach.blueFlag===true&&beach.blueFlagYear===2026?'mavi bayrak 2026':''}`.toLocaleLowerCase('tr-TR');return(!normalized||text.includes(normalized))&&(district==='Tümü'||beach.district===district)&&(placeType==='Tümü'||beach.placeType===placeType)&&(access==='Tümü'||access==='Doğrulanmadı'?access==='Tümü'||beach.access===null:beach.access===access)&&(!blueFlagOnly||(beach.blueFlag===true&&beach.blueFlagYear===2026));}),[normalized,district,placeType,access,blueFlagOnly]);
  return <SafeAreaView style={styles.istanbulPage}><ScrollView contentContainerStyle={styles.istanbulContent} showsVerticalScrollIndicator={false}><View style={styles.istanbulBeachTop}><Pressable onPress={onBack} style={styles.istanbulBeachBack}><Text style={styles.istanbulBeachBackText}>← İzmir rehberi</Text></Pressable><Text style={styles.istanbulBeachKicker}>İZMİR KIYI REHBERİ</Text><Text style={styles.istanbulBeachTitle}>Sahiller &{`\n`}Plajlar</Text><Text style={styles.istanbulBeachIntro}>Kent sahillerinden ayrı tutulan, denize girilen halk plajları, koylar ve doğal yüzme kıyıları.</Text></View><View style={styles.istanbulBody}><View style={styles.citySearch}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Plaj, koy, ilçe veya bölge ara" placeholderTextColor="#8A9691" style={styles.searchInput}/></View><BeachFilter label="İLÇE" items={izmirBeachDistricts} selected={district} onSelect={value=>setDistrict(value as 'Tümü'|IzmirBeachDistrict)}/><BeachFilter label="MEKÂN TÜRÜ" items={izmirBeachTypes} selected={placeType} onSelect={value=>setPlaceType(value as 'Tümü'|IzmirBeachType)} labelFor={value=>value==='Tümü'?value:izmirBeachTypeLabels[value as IzmirBeachType]}/><BeachFilter label="GİRİŞ" items={izmirBeachAccesses} selected={access} onSelect={value=>setAccess(value as typeof access)}/><View><Text style={styles.beachFilterLabel}>MAVİ BAYRAK</Text><Pressable onPress={()=>setBlueFlagOnly(value=>!value)} style={[styles.beachFilterChip,blueFlagOnly&&styles.beachFilterChipActive]}><Text style={[styles.beachFilterText,blueFlagOnly&&styles.beachFilterTextActive]}>🏅 Mavi Bayrak 2026</Text></Pressable></View><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>FİLTRELENEN KIYILAR</Text><Text style={styles.moduleTitle}>Plajlar & koylar</Text></View><Text style={styles.moduleHint}>{visible.length} sonuç</Text></View><View style={styles.istanbulPlaceList}>{visible.map(beach=><IzmirBeachCard key={beach.id} beach={beach} favorite={favorites.includes(beach.id)} planned={plannedPlaceIds.includes(beach.id)} onFavorite={onFavorite} onPlan={onTogglePlan} onOpen={()=>setSelected(beach)}/>)}</View>{!visible.length&&<View style={styles.empty}><Text style={styles.emptyIcon}>⌖</Text><Text style={styles.emptyTitle}>Bu filtrede sonuç yok</Text><Text style={styles.emptyCopy}>Seçili ölçütleri değiştirmeyi deneyin.</Text></View>}<View style={styles.istanbulBeachDataNote}><Text style={styles.istanbulBeachDataTitle}>Veri doğruluğu notu</Text><Text style={styles.istanbulBeachDataCopy}>Mavi Bayrak yalnızca 2026 tarihli resmî açıklamayla doğrulanan plajlarda gösterilir. Bilinmeyen durum “yok” sayılmaz. Yol tarifi, doğrulanmış koordinat yoksa plaj adı, ilçe ve şehirden oluşan hedef sorgusuyla açılır.</Text></View></View></ScrollView><IzmirBeachModal beach={selected} favorite={selected?favorites.includes(selected.id):false} planned={selected?plannedPlaceIds.includes(selected.id):false} onFavorite={onFavorite} onPlan={onTogglePlan} onClose={()=>setSelected(null)}/></SafeAreaView>;
}

function izmirBeachTags(beach:IzmirBeach){const tags=[`🌊 ${beach.sea}`,izmirBeachTypeLabels[beach.placeType]];if(beach.access)tags.push(beach.access==='Ücretsiz'?'🆓 Ücretsiz':`💳 ${beach.access}`);if(beach.blueFlag===true&&beach.blueFlagYear===2026)tags.push('🏅 Mavi Bayrak 2026');return tags;}

function IzmirBeachCard({beach,favorite,planned,onFavorite,onPlan,onOpen}:{beach:IzmirBeach;favorite:boolean;planned:boolean;onFavorite:(id:string)=>void;onPlan:(id:string)=>void;onOpen:()=>void}) {
  const destination=beach.latitude!==null&&beach.longitude!==null?`${beach.latitude},${beach.longitude}`:`${beach.name} ${beach.area} ${beach.district} İzmir`;
  return <Pressable onPress={onOpen} style={styles.placeCard}><View><Image source={beach.image} style={styles.placeImage} {...(Platform.OS==='web'?({loading:'lazy'} as object):{})}/>{beach.imageIsPlaceholder&&<View style={styles.placeholderBadge}><Text style={styles.placeholderBadgeText}>TEMSİLİ GÖRSEL</Text></View>}<Pressable hitSlop={10} onPress={event=>{event.stopPropagation();onFavorite(beach.id);}} style={styles.favoriteButton}><Text style={[styles.favoriteIcon,favorite&&styles.favoriteIconActive]}>{favorite?'♥':'♡'}</Text></Pressable></View><View style={styles.placeBody}><View style={styles.placeMeta}><Text style={styles.placeCategory}>{izmirBeachTypeLabels[beach.placeType].toUpperCase()}</Text><Text style={styles.placeDistrict}>📍 {beach.district} / İzmir</Text></View><Text style={styles.placeName}>{beach.name}</Text><Text style={styles.beachArea}>{beach.area}</Text><View style={styles.beachTags}>{izmirBeachTags(beach).map(tag=><View key={tag} style={styles.beachTag}><Text style={styles.beachTagText}>{tag}</Text></View>)}</View><Text numberOfLines={3} style={styles.placeSummary}>{beach.summary}</Text><Text style={styles.cardOpen}>Detayı aç  →</Text><Pressable onPress={event=>{event.stopPropagation();openDirections(destination);}} style={styles.bursaCardPlanButton}><Text style={styles.bursaCardPlanText}>📍  Yol tarifi al</Text></Pressable><Pressable onPress={event=>{event.stopPropagation();onPlan(beach.id);}} style={[styles.bursaCardPlanButton,planned&&styles.bursaCardPlanButtonActive]}><Text style={[styles.bursaCardPlanText,planned&&styles.bursaCardPlanTextActive]}>{planned?'✓  Planıma eklendi':'+  Planıma ekle'}</Text></Pressable></View></Pressable>;
}

function IzmirBeachModal({beach,favorite,planned,onFavorite,onPlan,onClose}:{beach:IzmirBeach|null;favorite:boolean;planned:boolean;onFavorite:(id:string)=>void;onPlan:(id:string)=>void;onClose:()=>void}) {
  if(!beach)return <Modal visible={false}/>;
  const destination=beach.latitude!==null&&beach.longitude!==null?`${beach.latitude},${beach.longitude}`:`${beach.name} ${beach.area} ${beach.district} İzmir`;
  const features=[['🌊','Deniz','Ege Denizi'],['🏖️','Mekân türü',izmirBeachTypeLabels[beach.placeType]],['◉','Plaj yapısı',beach.surface??'Doğrulanmadı'],['💳','Giriş',beach.access??'Doğrulanmadı'],['⌂','İşletme',beach.operator??'Doğrulanmadı'],['👨‍👩‍👧','Aile uygunluğu',facilityLabel(beach.familyFriendly)],['👶','Çocuk uygunluğu',facilityLabel(beach.childFriendly)],['🚗','Otopark',facilityLabel(beach.parking)],['🚿','Duş',facilityLabel(beach.shower)],['🚻','WC',facilityLabel(beach.toilet)],['🍴','Yeme içme',facilityLabel(beach.food)],['⛱️','Şezlong / şemsiye',`${facilityLabel(beach.sunbed)} / ${facilityLabel(beach.umbrella)}`],['🏊','Cankurtaran',facilityLabel(beach.lifeguardAvailable)],['♿','Engelli erişimi',facilityLabel(beach.accessible)],['🏅','Mavi Bayrak',beach.blueFlag===true&&beach.blueFlagYear===2026?'Var · 2026':beach.blueFlag===false?'Yok':'Doğrulanmadı']];
  return <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}><SafeAreaView style={styles.beachModal}><View style={styles.beachModalHero}><Image source={beach.image} style={styles.beachModalImage}/><View style={styles.beachModalShade}/><View style={styles.beachModalActions}><Pressable onPress={onClose} style={styles.modalRound}><Text style={styles.modalRoundText}>×</Text></Pressable><Pressable onPress={()=>onFavorite(beach.id)} style={styles.modalRound}><Text style={styles.modalRoundText}>{favorite?'♥':'♡'}</Text></Pressable></View>{beach.imageIsPlaceholder&&<View style={styles.beachModalCaption}><Text style={styles.placeholderBadgeText}>TEMSİLİ GÖRSEL · DOĞRU FOTOĞRAF BEKLENİYOR</Text></View>}</View><ScrollView contentContainerStyle={styles.beachModalScroll}><Text style={styles.modalMeta}>EGE · {beach.district.toUpperCase()} / İZMİR</Text><Text style={styles.beachModalTitle}>{beach.name}</Text><Text style={styles.beachLocation}>📍 {beach.area}, {beach.district} / İzmir</Text><Text style={styles.modalCopy}>{beach.summary}</Text>{beach.seaWarning&&<View style={styles.istanbulSeaWarning}><Text style={styles.istanbulSeaWarningText}>⚠️ {beach.seaWarning}</Text></View>}<Text style={styles.beachFeaturesTitle}>Plaj özellikleri</Text><View style={styles.beachFeatureGrid}>{features.map(([icon,label,value])=><View key={label} style={styles.beachFeature}><Text style={styles.beachFeatureIcon}>{icon}</Text><View style={styles.beachFeatureBody}><Text style={styles.beachFeatureLabel}>{label}</Text><Text style={styles.beachFeatureValue}>{value}</Text></View></View>)}</View><Pressable onPress={()=>onPlan(beach.id)} style={[styles.spiritualPlanButton,planned&&styles.spiritualPlanButtonActive]}><Text style={[styles.spiritualPlanText,planned&&styles.spiritualPlanTextActive]}>{planned?'✓  Gezi planıma eklendi':'+  Gezi planıma ekle'}</Text></Pressable><Pressable onPress={()=>openDirections(destination)} style={styles.primaryButton}><Text style={styles.primaryButtonText}>📍  Yol Tarifi Al</Text></Pressable><Text style={styles.beachSafetyNote}>{beach.locationStatus==='verified'?'Koordinat doğrulandı.':'Hedef, doğrulanmış koordinat bulunmadığı için plaj adı ve ilçe sorgusuyla açılır.'} Deniz ve hava koşulları günlük değişebilir; yüzmeden önce yerel uyarıları ve bayrakları kontrol edin.</Text>{beach.imagePage&&<Pressable onPress={()=>Linking.openURL(beach.imagePage!)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Fotoğraf: {beach.imageCredit}  ↗</Text></Pressable>}<Pressable onPress={()=>Linking.openURL(beach.sourceUrl)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Resmî bilgi kaynağı  ↗</Text></Pressable></ScrollView></SafeAreaView></Modal>;
}

function IzmirDistrictModal({ district, planned, onTogglePlan, onClose }: { district: IzmirDistrict | null; planned: boolean; onTogglePlan: (id:string)=>void; onClose:()=>void }) {
  const openSearch=(query:string)=>district&&Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${district.name} İzmir`)}`);
  const beaches=district?izmirBeaches.filter(beach=>beach.district===district.name):[];
  const services: Array<[string,string,string]> = [['☕','Kafeler','kafeler'],['🍴','Restoranlar','restoranlar'],['⌂','Konaklama','oteller'],['H','Hastaneler','hastaneler'],['+','Eczaneler','eczaneler'],['↔','Ulaşım','toplu taşıma']];
  return <Modal visible={Boolean(district)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{district&&<SafeAreaView style={[styles.districtModal,{backgroundColor:'#315F53'}]}><View style={styles.districtModalTop}><View><Text style={styles.districtModalKicker}>İZMİR · İLÇE REHBERİ</Text><Text style={styles.districtModalTitle}>{district.name}</Text></View><Pressable onPress={onClose} style={styles.districtClose}><Text style={styles.districtCloseText}>×</Text></Pressable></View><Text style={styles.districtModalSignature}>{district.signature}</Text><ScrollView contentContainerStyle={styles.districtModalScroll}><Pressable onPress={()=>onTogglePlan(`izmir-ilce-${district.name}`)} style={[styles.addPlanButton,planned&&styles.addPlanButtonActive]}><Text style={[styles.addPlanText,planned&&styles.addPlanTextActive]}>{planned?'✓  Gezi planıma eklendi':'+  Gezi planıma ekle'}</Text></Pressable><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>GÖRMEDEN DÖNME</Text>{district.highlights.map((item,index)=><Pressable key={item} onPress={()=>openSearch(item)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index+1).padStart(2,'0')}</Text><Text style={styles.districtListText}>{item}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>{beaches.length>0&&<View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>SAHİLLER & PLAJLAR · {beaches.length}</Text>{beaches.map((beach,index)=><Pressable key={beach.id} onPress={()=>openDirections(beach.latitude!==null&&beach.longitude!==null?`${beach.latitude},${beach.longitude}`:`${beach.name} ${beach.district} İzmir`)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index+1).padStart(2,'0')}</Text><Text style={styles.districtListText}>{beach.name}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>}<View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>YEREL LEZZETLER</Text><View style={styles.flavorWrap}>{district.flavors.map(item=><View key={item} style={styles.flavorChip}><Text style={styles.flavorText}>{item}</Text></View>)}</View></View><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>İLÇEDE ARA</Text><View style={styles.districtServiceGrid}>{services.map(([icon,label,q])=><Pressable key={label} onPress={()=>openSearch(q)} style={styles.districtServiceButton}><Text style={styles.districtServiceIcon}>{icon}</Text><Text style={styles.districtServiceText}>{label}</Text></Pressable>)}</View></View><Pressable onPress={()=>openSearch('gezilecek yerler')} style={styles.districtMapButton}><Text style={styles.districtMapText}>Haritada {district.name}  →</Text></Pressable></ScrollView></SafeAreaView>}</Modal>;
}

function AnkaraDistrictModal({ district, planned, onTogglePlan, onClose }: { district: AnkaraDistrict | null; planned: boolean; onTogglePlan: (id: string) => void; onClose: () => void }) {
  if (!district) return null;
  const openMap = (query: string) => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${district.name} Ankara`)}`);
  return <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}><SafeAreaView style={[styles.districtModal, { backgroundColor: '#315F53' }]}><View style={styles.districtModalTop}><View><Text style={styles.districtModalKicker}>ANKARA · İLÇE REHBERİ</Text><Text style={styles.districtModalTitle}>{district.name}</Text></View><Pressable onPress={onClose} style={styles.districtClose}><Text style={styles.districtCloseText}>×</Text></Pressable></View><Text style={styles.districtModalSignature}>{district.signature}</Text><ScrollView contentContainerStyle={styles.districtModalScroll}><Pressable onPress={() => onTogglePlan(`ankara-ilce-${district.name}`)} style={[styles.addPlanButton, planned && styles.addPlanButtonActive]}><Text style={[styles.addPlanText, planned && styles.addPlanTextActive]}>{planned ? '✓  Planıma eklendi' : '+  Planıma ekle'}</Text></Pressable><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>GÖRMEDEN DÖNME</Text>{district.highlights.map((item, index) => <Pressable key={item} onPress={() => openMap(item)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{item}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>YEREL LEZZETLER</Text><View style={styles.flavorWrap}>{district.flavors.map(item => <View key={item} style={styles.flavorChip}><Text style={styles.flavorText}>{item}</Text></View>)}</View></View><Pressable onPress={() => openMap('gezilecek yerler')} style={styles.districtMapButton}><Text style={styles.districtMapText}>İlçeyi haritada keşfet  →</Text></Pressable></ScrollView></SafeAreaView></Modal>;
}

function IstanbulGuide({ plannedPlaceIds, favorites, onFavorite, onTogglePlan, onMenu }: { plannedPlaceIds: string[]; favorites: string[]; onFavorite: (id: string) => void; onTogglePlan: (id: string) => void; onMenu: () => void }) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'rehber' | 'plajlar'>('rehber');
  const [category, setCategory] = useState<ExploreCategory>('Tümü');
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>('idle');
  const [selectedDistrict, setSelectedDistrict] = useState<IstanbulDistrict | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<IstanbulPlace | null>(null);
  const [selectedSearchBeach, setSelectedSearchBeach] = useState<IstanbulBeach | null>(null);
  const normalized = query.trim().toLocaleLowerCase('tr-TR');
  const visibleDistricts = istanbulDistricts.filter(item => !normalized || `${item.name} ${item.signature} ${item.highlights.join(' ')}`.toLocaleLowerCase('tr-TR').includes(normalized));
  const visiblePlaces = istanbulPlaces.filter(item => !normalized || `${item.name} ${item.district} ${item.category} ${item.summary}`.toLocaleLowerCase('tr-TR').includes(normalized));
  const beachSearchResults = normalized ? istanbulBeaches.filter(beach => `${beach.name} ${beach.district} ${beach.area} ${beach.side} ${beach.sea} ${istanbulBeachTypeLabels[beach.placeType]} ${beach.access ?? ''} ${beach.blueFlag ? 'mavi bayrak' : ''} plaj sahil`.toLocaleLowerCase('tr-TR').includes(normalized)) : [];
  const openMap = (mapQuery: string) => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`);
  const openRoute = (stops: string[]) => Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${stops[0]} İstanbul`)}&destination=${encodeURIComponent(`${stops[stops.length - 1]} İstanbul`)}&waypoints=${encodeURIComponent(stops.slice(1, -1).map(stop => `${stop} İstanbul`).join('|'))}`);
  const services: [string, string, string][] = [['AVM', 'Alışveriş merkezleri', 'İstanbul alışveriş merkezleri'], ['H', 'Hastaneler', 'İstanbul hastaneleri'], ['+', 'Nöbetçi eczaneler', 'İstanbul nöbetçi eczane'], ['↔', 'Ulaşım merkezleri', 'İstanbul metro marmaray vapur durakları']];

  useEffect(() => { AsyncStorage.getItem('turkiye-rehberi-offline-istanbul').then(value => setOfflineStatus(value === 'ready' ? 'ready' : 'idle')).catch(() => {}); }, []);
  const saveOffline = async () => {
    if (offlineStatus === 'ready' || offlineStatus === 'downloading') return;
    setOfflineStatus('downloading');
    try {
      await downloadOfflineGuide('turkiye-rehberi-offline-istanbul');
      setOfflineStatus('ready');
    } catch {
      setOfflineStatus('error');
    }
  };
  if (mode === 'plajlar') return <IstanbulBeachGuide query={query} setQuery={setQuery} favorites={favorites} plannedPlaceIds={plannedPlaceIds} onFavorite={onFavorite} onTogglePlan={onTogglePlan} onBack={() => { setMode('rehber'); setCategory('Tümü'); }} />;
  const renderPlaces = (title: string, kicker: string, categories: string[]) => {
    const items = visiblePlaces.filter(place => categories.includes(place.category));
    if (!items.length) return null;
    return <><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>{kicker}</Text><Text style={styles.moduleTitle}>{title}</Text></View><Text style={styles.moduleHint}>{items.length} yer</Text></View><View style={styles.istanbulPlaceList}>{items.map(place => { const planned = plannedPlaceIds.includes(place.id); const favorite = favorites.includes(place.id); return <View key={place.id} style={styles.istanbulPlaceCard}><Pressable onPress={() => setSelectedPlace(place)}><View><Image source={place.image} style={styles.istanbulPlaceImage} {...(Platform.OS === 'web' ? ({ loading: 'lazy' } as object) : {})} /><Pressable hitSlop={10} onPress={event => { event.stopPropagation(); onFavorite(place.id); }} style={styles.favoriteButton}><Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>{favorite ? '♥' : '♡'}</Text></Pressable></View><View style={styles.istanbulPlaceBody}><Text style={styles.istanbulPlaceMeta}>{place.category.toUpperCase()} · {place.district.toUpperCase()}</Text><Text style={styles.istanbulPlaceName}>{place.name}</Text><Text style={styles.istanbulPlaceCopy}>{place.summary}</Text><Text style={styles.istanbulDetailOpen}>Detayı aç  →</Text></View></Pressable><Pressable onPress={() => onTogglePlan(place.id)} style={[styles.istanbulCardPlanButton, planned && styles.istanbulCardPlanButtonActive]}><Text style={[styles.istanbulCardPlanText, planned && styles.istanbulCardPlanTextActive]}>{planned ? '✓  Planıma eklendi' : '+  Planıma ekle'}</Text></Pressable></View>; })}</View></>;
  };

  return <SafeAreaView style={styles.istanbulPage}><ScrollView contentContainerStyle={styles.istanbulContent} showsVerticalScrollIndicator={false}>
    <ImageBackground source={require('./assets/istanbul/hero.jpg')} style={styles.istanbulHero} imageStyle={styles.istanbulHeroImage}><View style={styles.istanbulHeroShade} /><View style={styles.istanbulHeroTop}><View style={styles.istanbulLive}><Text style={styles.istanbulLiveText}>YAYINDA · 34</Text></View><View style={styles.istanbulHeroActions}><Text style={styles.istanbulHeroRegion}>MARMARA · 39 İLÇE</Text><Pressable accessibilityRole="button" accessibilityLabel="Ana menüyü aç" onPress={onMenu} style={styles.roundButton}><Text style={styles.roundButtonText}>☰</Text></Pressable></View></View><View style={styles.istanbulHeroBody}><Text style={styles.istanbulHeroKicker}>İKİ KITA · TEK ŞEHİR</Text><Text style={styles.istanbulHeroTitle}>İstanbul</Text><Text style={styles.istanbulHeroCopy}>Boğaz kıyılarından tarihî yarımadaya, çarşılardan adalara uzanan kapsamlı şehir rehberi.</Text></View></ImageBackground>
    <View style={styles.istanbulBody}>
      <View style={styles.citySearch}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="İlçe, yapı veya deneyim ara" placeholderTextColor="#8A9691" style={styles.searchInput} /></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>{categories.map(item => <Pressable key={item} onPress={() => { if (item === 'Sahil') { setCategory(item); setMode('plajlar'); } else setCategory(item); }} style={[styles.categoryChip, category === item && styles.categoryChipActive]}><Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item === 'Sahil' ? '🏖️ Sahiller & Plajlar' : item}</Text></Pressable>)}</ScrollView>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>İLÇE REHBERİ</Text><Text style={styles.moduleTitle}>39 ilçeyi keşfet</Text></View><Text style={styles.moduleHint}>{visibleDistricts.length} sonuç</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.istanbulDistrictRail}>{visibleDistricts.map((item, index) => { const districtId = `istanbul-ilce-${item.name}`; const planned = plannedPlaceIds.includes(districtId); return <Pressable key={item.name} onPress={() => setSelectedDistrict(item)} style={[styles.istanbulDistrictCard, { backgroundColor: index % 3 === 0 ? '#315F53' : index % 3 === 1 ? '#75513B' : '#477A89' }]}><Text style={styles.istanbulDistrictSide}>{item.side.toUpperCase()}</Text><Text style={styles.istanbulDistrictName}>{item.name}</Text><Text style={styles.istanbulDistrictCopy}>{item.signature}</Text><Text style={styles.istanbulDistrictOpen}>Detayı aç  →</Text><Pressable onPress={event => { event.stopPropagation(); onTogglePlan(districtId); }} style={[styles.istanbulDistrictPlan, planned && styles.istanbulDistrictPlanActive]}><Text style={styles.istanbulDistrictPlanText}>{planned ? '✓  Planımda' : '+  Planıma ekle'}</Text></Pressable></Pressable>; })}</ScrollView>
      {normalized && beachSearchResults.length > 0 && <><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ARAMADA BULUNAN</Text><Text style={styles.moduleTitle}>Sahiller & plajlar</Text></View><Text style={styles.moduleHint}>{beachSearchResults.length} sonuç</Text></View><View style={styles.istanbulPlaceList}>{beachSearchResults.map(beach => <IstanbulBeachCard key={beach.id} beach={beach} favorite={favorites.includes(beach.id)} planned={plannedPlaceIds.includes(beach.id)} onFavorite={onFavorite} onPlan={onTogglePlan} onOpen={() => setSelectedSearchBeach(beach)} />)}</View></>}
      {category === 'Tarih' && <>{renderPlaces('Saraylar & tarihî yapılar', 'İMPARATORLUKLARIN İZİNDE', ['Saray', 'Tarihî yapı', 'Müze · Manzara'])}{renderPlaces('Müzeler', 'KOLEKSİYONLAR & KEŞİF', ['Müze'])}{renderPlaces('Çok kültürlü İstanbul', 'İNANÇLAR & MAHALLELER', ['Çok kültürlü miras'])}{renderPlaces('İstanbul hamamları', 'SU, MERMER & OSMANLI MİRASI', ['Hamam'])}</>}
      {category === 'Doğa' && <>{renderPlaces('Sahiller', 'DENİZLE BULUŞAN ŞEHİR', ['Sahil'])}{renderPlaces('Doğa & manzara', 'İKİ KITA ARASINDA', ['Doğa · Sahil', 'Manzara · Ulaşım'])}{renderPlaces('Anadolu Yakası keşifleri', 'MAHALLELER & YEREL YAŞAM', ['Anadolu Yakası'])}</>}
      {category === 'Manevi' && <>{renderPlaces('Camiler', 'MİMARİ & MANEVİ MİRAS', ['Cami'])}{renderPlaces('Türbeler & ziyaret yerleri', 'İSTANBUL’UN MANEVİ DURAKLARI', ['Türbe'])}</>}
      {category === 'Lezzet' && <><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>BÖLGE BÖLGE</Text><Text style={styles.moduleTitle}>Kafeler & restoranlar</Text></View><Text style={styles.moduleHint}>8 bölge</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{istanbulVenueAreas.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.cafeQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>Yakındaki kafeler  ↗</Text></Pressable><Pressable onPress={() => openMap(item.restaurantQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Restoranları göster  ↗</Text></Pressable></View>)}</ScrollView><View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>İSTANBUL LEZZET REHBERİ</Text><Text style={styles.moduleTitle}>Ne, nerede yenir?</Text></View><Text style={styles.moduleHint}>8 öneri</Text></View><View style={styles.foodList}>{istanbulFoodGuide.map((food, index) => <Pressable key={food.dish} onPress={() => openMap(food.mapQuery)} style={styles.foodRow}><Text style={styles.foodNumber}>{String(index + 1).padStart(2, '0')}</Text><View style={styles.foodBody}><Text style={styles.foodDish}>{food.dish}</Text><Text style={styles.foodArea}>{food.area}</Text><Text style={styles.foodNote}>{food.note}</Text></View><Text style={styles.foodArrow}>↗</Text></Pressable>)}</View></>}
      {category === 'Tümü' && <>
      {renderPlaces('Saraylar & tarihî yapılar', 'İMPARATORLUKLARIN İZİNDE', ['Saray', 'Tarihî yapı', 'Müze · Manzara'])}
      {renderPlaces('Müzeler', 'KOLEKSİYONLAR & KEŞİF', ['Müze'])}
      {renderPlaces('Camiler', 'MİMARİ & MANEVİ MİRAS', ['Cami'])}
      {renderPlaces('Türbeler & ziyaret yerleri', 'İSTANBUL’UN MANEVİ DURAKLARI', ['Türbe'])}
      {renderPlaces('Çok kültürlü İstanbul', 'İNANÇLAR & MAHALLELER', ['Çok kültürlü miras'])}
      {renderPlaces('İstanbul hamamları', 'SU, MERMER & OSMANLI MİRASI', ['Hamam'])}
      {renderPlaces('Anadolu Yakası keşifleri', 'MAHALLELER & YEREL YAŞAM', ['Anadolu Yakası'])}
      {renderPlaces('Sahiller', 'DENİZLE BULUŞAN ŞEHİR', ['Sahil'])}
      {renderPlaces('Doğa & manzara', 'İKİ KITA ARASINDA', ['Doğa · Sahil', 'Manzara · Ulaşım'])}
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ÇOCUKLARLA İSTANBUL</Text><Text style={styles.moduleTitle}>Aile & çocuk rotaları</Text></View><Text style={styles.moduleHint}>{istanbulFamilyRoutes.length} rota</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{istanbulFamilyRoutes.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.mapQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Rotayı haritada aç  ↗</Text></Pressable></View>)}</ScrollView>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>GÜN BATIMINDAN SONRA</Text><Text style={styles.moduleTitle}>Gece hayatı bölgeleri</Text></View><Text style={styles.moduleHint}>{istanbulNightlifeAreas.length} bölge</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{istanbulNightlifeAreas.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.mapQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Mekânları haritada aç  ↗</Text></Pressable></View>)}</ScrollView>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>CADDELER & PASAJLAR</Text><Text style={styles.moduleTitle}>Alışveriş rotaları</Text></View><Text style={styles.moduleHint}>{istanbulShoppingStreets.length} cadde</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{istanbulShoppingStreets.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.mapQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>Caddeyi haritada aç  ↗</Text></Pressable></View>)}</ScrollView>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>BÖLGE BÖLGE</Text><Text style={styles.moduleTitle}>Kafeler & restoranlar</Text></View><Text style={styles.moduleHint}>8 bölge</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{istanbulVenueAreas.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMap(item.cafeQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>Yakındaki kafeler  ↗</Text></Pressable><Pressable onPress={() => openMap(item.restaurantQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Restoranları göster  ↗</Text></Pressable></View>)}</ScrollView>
      <AccommodationSection city="İstanbul" items={istanbulAccommodations as AccommodationArea[]} />
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>İSTANBUL LEZZET REHBERİ</Text><Text style={styles.moduleTitle}>Ne, nerede yenir?</Text></View><Text style={styles.moduleHint}>8 öneri</Text></View>
      <View style={styles.foodList}>{istanbulFoodGuide.map((food, index) => <Pressable key={food.dish} onPress={() => openMap(food.mapQuery)} style={styles.foodRow}><Text style={styles.foodNumber}>{String(index + 1).padStart(2, '0')}</Text><View style={styles.foodBody}><Text style={styles.foodDish}>{food.dish}</Text><Text style={styles.foodArea}>{food.area}</Text><Text style={styles.foodNote}>{food.note}</Text></View><Text style={styles.foodArrow}>↗</Text></Pressable>)}</View>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>PLANINI HAZIRLA</Text><Text style={styles.moduleTitle}>Günlük & tematik rotalar</Text></View><Text style={styles.moduleHint}>{istanbulRoutes.length} rota</Text></View>
      <View style={styles.routeList}>{istanbulRoutes.map((route, index) => <Pressable key={route.title} onPress={() => openRoute(route.stops)} style={[styles.routeCard, { backgroundColor: route.color }]}><View style={styles.routeTop}><Text style={styles.routeIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.routeDuration}>{route.duration}</Text></View><Text style={styles.routeTitle}>{route.title}</Text><Text style={styles.routeStops}>{route.stops.join('  ·  ')}</Text><Text style={styles.routeOpen}>Rotayı haritada başlat  →</Text></Pressable>)}</View>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ŞEHRİN KADRAJLARI</Text><Text style={styles.moduleTitle}>İstanbul fotoğraf günlüğü</Text></View><Text style={styles.moduleHint}>{istanbulGallery.length} kare</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRail}>{istanbulGallery.map(item => <View key={item.title} style={styles.galleryCard}><Image source={item.image} style={styles.galleryImage} {...(Platform.OS === 'web' ? ({ loading: 'lazy' } as object) : {})} /><View style={styles.galleryShade} /><View style={styles.galleryCaption}><Text style={styles.galleryDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.galleryTitle}>{item.title}</Text></View></View>)}</ScrollView>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ŞEHİR İÇİNDE HAREKET</Text><Text style={styles.moduleTitle}>Toplu ulaşım rehberi</Text></View><Text style={styles.moduleHint}>{istanbulTransport.length} seçenek</Text></View>
      <View style={styles.serviceGrid}>{istanbulTransport.map(item => <Pressable key={item.name} onPress={() => openMap(item.mapQuery)} style={styles.serviceCard}><View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{item.icon}</Text></View><Text style={styles.serviceKind}>ULAŞIM AĞI</Text><Text style={styles.serviceName}>{item.name}</Text><Text style={styles.serviceCopy}>{item.description}</Text><Text style={styles.serviceOpen}>Durakları haritada aç  ↗</Text></Pressable>)}</View>
      <View style={styles.infoCard}><Text style={styles.infoLabel}>İSTANBULKART & AKTARMA</Text><Text style={styles.infoTitle}>Tek kartla farklı ulaşım türleri</Text><Text style={styles.infoCopy}>Metro, Marmaray, tramvay, otobüs ve şehir hatları arasında geçiş yapabilirsin. Sefer saatleri ve ücretler değişebildiği için yolculuk öncesinde resmî ulaşım kanallarını kontrol et.</Text></View>
      <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ŞEHİRDE İHTİYACIN OLAN</Text><Text style={styles.moduleTitle}>Temel hizmetler</Text></View></View>
      <View style={styles.serviceGrid}>{services.map(([icon, name, mapQuery]) => <Pressable key={name} onPress={() => openMap(mapQuery)} style={styles.serviceCard}><View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{icon}</Text></View><Text style={styles.serviceKind}>YAKINDA ARA</Text><Text style={styles.serviceName}>{name}</Text><Text style={styles.serviceCopy}>Güncel konumları ve yol seçeneklerini haritada görüntüle.</Text><Text style={styles.serviceOpen}>Haritada aç  ↗</Text></Pressable>)}</View>
      <NearbySection city="İstanbul" items={istanbulNearbySearches} />
      <View style={styles.offlineCard}><View style={styles.offlineTop}><View style={styles.offlineIcon}><Text style={styles.offlineIconText}>↓</Text></View><View style={styles.offlineBody}><Text style={styles.offlineEyebrow}>İNTERNETSİZ KULLANIM</Text><Text style={styles.offlineTitle}>İstanbul rehberini indir</Text><Text style={styles.offlineCopy}>Uygulama içeriği ve yerel fotoğraflar cihazına kaydedilir. Canlı harita ve yol bilgisi için internet gerekir.</Text></View></View>{offlineStatus === 'error' && <Text style={styles.offlineError}>Paket indirilemedi. İnternet bağlantını kontrol edip yeniden dene.</Text>}<Pressable disabled={offlineStatus === 'downloading'} onPress={saveOffline} style={[styles.offlineButton, offlineStatus === 'ready' && styles.offlineButtonReady, offlineStatus === 'downloading' && styles.disabledButton]}><Text style={[styles.offlineButtonText, offlineStatus === 'ready' && styles.offlineButtonTextReady]}>{offlineStatus === 'ready' ? '✓  Çevrimdışı rehber hazır' : offlineStatus === 'downloading' ? 'Rehber indiriliyor…' : 'Rehberi bu cihaza indir'}</Text></Pressable></View>
      <Text style={styles.istanbulSource}>İlçe yapısı İstanbul İl Kültür ve Turizm Müdürlüğü ile İBB kaynaklarına dayanır. Fotoğraflar Wikimedia Commons lisanslarıyla belirtilmiştir; çalışma saatlerini ziyaret öncesinde doğrulayın.</Text></>}
    </View>
  </ScrollView><IstanbulPlaceModal place={selectedPlace} favorite={selectedPlace ? favorites.includes(selectedPlace.id) : false} planned={selectedPlace ? plannedPlaceIds.includes(selectedPlace.id) : false} onFavorite={onFavorite} onTogglePlan={onTogglePlan} onClose={() => setSelectedPlace(null)} /><IstanbulBeachModal beach={selectedSearchBeach} favorite={selectedSearchBeach ? favorites.includes(selectedSearchBeach.id) : false} planned={selectedSearchBeach ? plannedPlaceIds.includes(selectedSearchBeach.id) : false} onClose={() => setSelectedSearchBeach(null)} onFavorite={onFavorite} onPlan={onTogglePlan} /><IstanbulDistrictModal district={selectedDistrict} planned={selectedDistrict ? plannedPlaceIds.includes(`istanbul-ilce-${selectedDistrict.name}`) : false} onTogglePlan={onTogglePlan} onClose={() => setSelectedDistrict(null)} /></SafeAreaView>;
}

const istanbulBeachTypeLabels: Record<IstanbulBeachType, string> = {
  public_beach: 'Halk Plajı', private_beach: 'Özel Plaj', beach_club: 'Beach Club', coast: 'Sahil', bay: 'Koy', cove: 'Doğal Koy',
};

function IstanbulBeachGuide({ query, setQuery, favorites, plannedPlaceIds, onFavorite, onTogglePlan, onBack }: { query: string; setQuery: (value: string) => void; favorites: string[]; plannedPlaceIds: string[]; onFavorite: (id: string) => void; onTogglePlan: (id: string) => void; onBack: () => void }) {
  const [side, setSide] = useState<'Tümü' | IstanbulBeachSide>('Tümü');
  const [sea, setSea] = useState<'Tümü' | IstanbulSea>('Tümü');
  const [district, setDistrict] = useState('Tümü');
  const [placeType, setPlaceType] = useState<'Tümü' | IstanbulBeachType>('Tümü');
  const [access, setAccess] = useState<'Tümü' | Exclude<IstanbulBeachAccess, null>>('Tümü');
  const [selected, setSelected] = useState<IstanbulBeach | null>(null);
  const districts = useMemo(() => ['Tümü', ...Array.from(new Set(istanbulBeaches.filter(item => side === 'Tümü' || item.side === side).map(item => item.district))).sort((a, b) => a.localeCompare(b, 'tr'))], [side]);
  const normalized = query.trim().toLocaleLowerCase('tr-TR');
  const visible = useMemo(() => istanbulBeaches.filter(beach => {
    const text = `${beach.name} ${beach.district} ${beach.area} ${beach.side} ${beach.sea} ${istanbulBeachTypeLabels[beach.placeType]} ${beach.access ?? ''} plaj sahil koy ${beach.blueFlag ? 'mavi bayrak' : ''}`.toLocaleLowerCase('tr-TR');
    return (side === 'Tümü' || beach.side === side)
      && (sea === 'Tümü' || beach.sea === sea)
      && (district === 'Tümü' || beach.district === district)
      && (placeType === 'Tümü' || beach.placeType === placeType)
      && (access === 'Tümü' || beach.access === access)
      && (!normalized || text.includes(normalized));
  }), [access, district, normalized, placeType, sea, side]);
  const chooseSide = (value: 'Tümü' | IstanbulBeachSide) => { setSide(value); setDistrict('Tümü'); };
  return <SafeAreaView style={styles.istanbulPage}><ScrollView contentContainerStyle={styles.istanbulContent} showsVerticalScrollIndicator={false}>
    <View style={styles.istanbulBeachTop}><Pressable onPress={onBack} style={styles.istanbulBeachBack}><Text style={styles.istanbulBeachBackText}>← İstanbul rehberi</Text></Pressable><Text style={styles.istanbulBeachKicker}>İSTANBUL KIYI REHBERİ</Text><Text style={styles.istanbulBeachTitle}>Sahiller &{`\n`}Plajlar</Text><Text style={styles.istanbulBeachIntro}>Karadeniz’in doğal kıyılarından Marmara plajlarına ve Adalar koylarına uzanan, türü açıkça belirtilmiş kıyı seçkisi.</Text></View>
    <View style={styles.istanbulBody}>
      <View style={styles.citySearch}><Text style={styles.searchIcon}>⌕</Text><TextInput value={query} onChangeText={setQuery} placeholder="Plaj, ilçe, deniz veya özellik ara" placeholderTextColor="#8A9691" style={styles.searchInput} /></View>
      <BeachFilter label="BÖLGE" items={istanbulBeachSides} selected={side} onSelect={value => chooseSide(value as 'Tümü' | IstanbulBeachSide)} labelFor={value => value === 'Adalar' ? '🏝️ Adalar' : value} />
      <BeachFilter label="DENİZ" items={istanbulBeachSeas} selected={sea} onSelect={value => setSea(value as 'Tümü' | IstanbulSea)} labelFor={value => value === 'Marmara' ? '🌊 Marmara' : value === 'Karadeniz' ? '🌊 Karadeniz' : value} />
      <BeachFilter label="İLÇE" items={districts} selected={district} onSelect={setDistrict} />
      <BeachFilter label="MEKÂN TÜRÜ" items={istanbulBeachTypes} selected={placeType} onSelect={value => setPlaceType(value as 'Tümü' | IstanbulBeachType)} labelFor={value => value === 'Tümü' ? value : istanbulBeachTypeLabels[value as IstanbulBeachType]} />
      <BeachFilter label="GİRİŞ" items={istanbulBeachAccesses} selected={access} onSelect={value => setAccess(value as 'Tümü' | Exclude<IstanbulBeachAccess, null>)} />
      <View style={styles.subheadingRow}><Text style={styles.subheading}>İstanbul kıyıları</Text><Text style={styles.resultCount}>{visible.length} sonuç</Text></View>
      <View style={styles.cardGrid}>{visible.map(beach => <IstanbulBeachCard key={beach.id} beach={beach} favorite={favorites.includes(beach.id)} planned={plannedPlaceIds.includes(beach.id)} onFavorite={onFavorite} onPlan={onTogglePlan} onOpen={() => setSelected(beach)} />)}</View>
      {!visible.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>Kıyı noktası bulunamadı</Text><Text style={styles.emptyCopy}>Aramayı temizle veya filtrelerden birini değiştir.</Text></View>}
      <View style={styles.istanbulBeachDataNote}><Text style={styles.istanbulBeachDataTitle}>Veri doğruluğu notu</Text><Text style={styles.istanbulBeachDataCopy}>Koordinatlar İstanbul Valiliğinin resmî yüzme alanı sınırlarından alınmıştır. 2023 listesindeki noktalar güncel sezonda açık kabul edilmez; 2025 İBB hizmet noktaları ayrıca belirtilir. Yüzmeden önce güncel su kalitesi ve yerel uyarıları kontrol edin.</Text></View>
    </View>
  </ScrollView><IstanbulBeachModal beach={selected} favorite={selected ? favorites.includes(selected.id) : false} planned={selected ? plannedPlaceIds.includes(selected.id) : false} onFavorite={onFavorite} onPlan={onTogglePlan} onClose={() => setSelected(null)} /></SafeAreaView>;
}

function BeachFilter<T extends string>({ label, items, selected, onSelect, labelFor }: { label: string; items: readonly T[]; selected: T; onSelect: (value: T) => void; labelFor?: (value: T) => string }) {
  return <><Text style={styles.beachFilterLabel}>{label}</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.beachFilterRail}>{items.map(item => <Pressable key={item} onPress={() => onSelect(item)} style={[styles.beachFilterChip, selected === item && styles.beachFilterChipActive]}><Text style={[styles.beachFilterText, selected === item && styles.beachFilterTextActive]}>{labelFor ? labelFor(item) : item}</Text></Pressable>)}</ScrollView></>;
}

function istanbulBeachTags(beach: IstanbulBeach) {
  const tags = [`🌊 ${beach.sea}`, istanbulBeachTypeLabels[beach.placeType]];
  if (beach.access === 'Ücretsiz') tags.push('🆓 Ücretsiz');
  if (beach.access === 'Ücretli') tags.push('💳 Ücretli');
  if (beach.shower === true) tags.push('🚿 Duş');
  if (beach.lifeguardAvailable === true) tags.push('🏊 Cankurtaran');
  if (beach.camping === true) tags.push('⛺ Kamp');
  if (beach.blueFlag) tags.push(`🏅 Mavi Bayrak ${beach.blueFlagYear}`);
  return tags;
}

function IstanbulBeachCard({ beach, favorite, planned, onFavorite, onPlan, onOpen }: { beach: IstanbulBeach; favorite: boolean; planned: boolean; onFavorite: (id: string) => void; onPlan: (id: string) => void; onOpen: () => void }) {
  return <Pressable onPress={onOpen} style={styles.placeCard}><View><Image source={beach.image} style={styles.placeImage} {...(Platform.OS === 'web' ? ({ loading: 'lazy' } as object) : {})} />{beach.imageIsPlaceholder && <View style={styles.placeholderBadge}><Text style={styles.placeholderBadgeText}>TEMSİLİ GÖRSEL</Text></View>}<Pressable hitSlop={10} onPress={event => { event.stopPropagation(); onFavorite(beach.id); }} style={styles.favoriteButton}><Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>{favorite ? '♥' : '♡'}</Text></Pressable></View><View style={styles.placeBody}><View style={styles.placeMeta}><Text style={styles.placeCategory}>{istanbulBeachTypeLabels[beach.placeType].toUpperCase()}</Text><Text style={styles.placeDistrict}>📍 {beach.district} / İstanbul</Text></View><Text style={styles.placeName}>{beach.name}</Text><Text style={styles.beachArea}>{beach.area} · {beach.side}</Text><View style={styles.beachTags}>{istanbulBeachTags(beach).map(tag => <View key={tag} style={styles.beachTag}><Text style={styles.beachTagText}>{tag}</Text></View>)}</View><Text numberOfLines={3} style={styles.placeSummary}>{beach.summary}</Text><Text style={styles.cardOpen}>Detayı aç  →</Text><Pressable onPress={event => { event.stopPropagation(); onPlan(beach.id); }} style={[styles.bursaCardPlanButton, planned && styles.bursaCardPlanButtonActive]}><Text style={[styles.bursaCardPlanText, planned && styles.bursaCardPlanTextActive]}>{planned ? '✓  Planıma eklendi' : '+  Planıma ekle'}</Text></Pressable></View></Pressable>;
}

function IstanbulBeachModal({ beach, favorite, planned, onFavorite, onPlan, onClose }: { beach: IstanbulBeach | null; favorite: boolean; planned: boolean; onFavorite: (id: string) => void; onPlan: (id: string) => void; onClose: () => void }) {
  if (!beach) return null;
  const hasCoordinates = beach.locationStatus === 'verified' && beach.latitude !== null && beach.longitude !== null;
  const openDirections = () => hasCoordinates && Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${beach.latitude},${beach.longitude}&travelmode=driving`);
  const features = [
    ['🌊', 'Deniz', `${beach.sea} Denizi`], ['🏖️', 'Mekân türü', istanbulBeachTypeLabels[beach.placeType]], ['◉', 'Plaj yapısı', beach.surface ?? 'Doğrulanmadı'], ['💳', 'Giriş', beach.access ?? 'Doğrulanmadı'], ['⌂', 'İşletme', beach.operator ?? 'Doğrulanmadı'], ['👨‍👩‍👧', 'Aile uygunluğu', facilityLabel(beach.familyFriendly)], ['👶', 'Çocuk uygunluğu', facilityLabel(beach.childFriendly)], ['🚗', 'Otopark', facilityLabel(beach.parking)], ['🚿', 'Duş', facilityLabel(beach.shower)], ['🚻', 'WC', facilityLabel(beach.toilet)], ['🍴', 'Yeme içme', facilityLabel(beach.food)], ['⛱️', 'Şezlong / şemsiye', `${facilityLabel(beach.sunbed)} / ${facilityLabel(beach.umbrella)}`], ['🏊', 'Cankurtaran', facilityLabel(beach.lifeguardAvailable)], ['♿', 'Engelli erişimi', facilityLabel(beach.accessible)], ['🏅', 'Mavi Bayrak', beach.blueFlag ? `Var · ${beach.blueFlagYear}` : '2026 için doğrulanmadı'],
  ];
  return <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}><SafeAreaView style={styles.beachModal}><View style={styles.beachModalHero}><Image source={beach.image} style={styles.beachModalImage} /><View style={styles.beachModalShade} /><View style={styles.beachModalActions}><Pressable onPress={onClose} style={styles.modalRound}><Text style={styles.modalRoundText}>×</Text></Pressable><Pressable onPress={() => onFavorite(beach.id)} style={styles.modalRound}><Text style={styles.modalRoundText}>{favorite ? '♥' : '♡'}</Text></Pressable></View>{beach.imageIsPlaceholder && <View style={styles.beachModalCaption}><Text style={styles.placeholderBadgeText}>TEMSİLİ GÖRSEL · GERÇEK FOTOĞRAF HAZIRLANIYOR</Text></View>}</View><ScrollView contentContainerStyle={styles.beachModalScroll}><Text style={styles.modalMeta}>{beach.side.toUpperCase()} · {beach.sea.toUpperCase()}</Text><Text style={styles.beachModalTitle}>{beach.name}</Text><Text style={styles.beachLocation}>📍 {beach.area}, {beach.district} / İstanbul</Text><Text style={styles.modalCopy}>{beach.summary}</Text>{beach.seaWarning && <View style={styles.istanbulSeaWarning}><Text style={styles.istanbulSeaWarningText}>⚠️ {beach.seaWarning}</Text></View>}<Text style={styles.beachFeaturesTitle}>Plaj özellikleri</Text><View style={styles.beachFeatureGrid}>{features.map(([icon, label, value]) => <View key={label} style={styles.beachFeature}><Text style={styles.beachFeatureIcon}>{icon}</Text><View style={styles.beachFeatureBody}><Text style={styles.beachFeatureLabel}>{label}</Text><Text style={styles.beachFeatureValue}>{value}</Text></View></View>)}</View><Pressable onPress={() => onPlan(beach.id)} style={[styles.spiritualPlanButton, planned && styles.spiritualPlanButtonActive]}><Text style={[styles.spiritualPlanText, planned && styles.spiritualPlanTextActive]}>{planned ? '✓  Gezi planıma eklendi' : '+  Gezi planıma ekle'}</Text></Pressable><Pressable disabled={!hasCoordinates} onPress={openDirections} style={[styles.primaryButton, !hasCoordinates && styles.disabledButton]}><Text style={styles.primaryButtonText}>{hasCoordinates ? '📍  Yol Tarifi Al' : 'Konum doğrulaması bekleniyor'}</Text></Pressable>{hasCoordinates && <Pressable onPress={() => Linking.openURL(beach.locationSource)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>✓ Konum doğrulandı · 28.08.2026  ↗</Text></Pressable>}{beach.imagePage && <Pressable onPress={() => Linking.openURL(beach.imagePage!)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Fotoğraf: {beach.imageCredit}  ↗</Text></Pressable>}<Pressable onPress={() => Linking.openURL(beach.sourceUrl)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Resmî bilgi kaynağı  ↗</Text></Pressable><Text style={styles.beachSafetyNote}>Su kalitesi yüzme sezonunda değişebilir. İstanbul İl Sağlık Müdürlüğünün güncel analizini ve plajdaki bayrakları kontrol edin.</Text></ScrollView></SafeAreaView></Modal>;
}

function IstanbulPlaceModal({ place, favorite, planned, onClose, onFavorite, onTogglePlan }: { place: IstanbulPlace | null; favorite: boolean; planned: boolean; onClose: () => void; onFavorite: (id: string) => void; onTogglePlan: (id: string) => void }) {
  const openMap = () => place && openDirections(place.mapQuery);
  return <Modal visible={Boolean(place)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{place && <View style={styles.modal}><Image source={place.image} style={styles.modalImage} /><View style={styles.modalShade} /><SafeAreaView style={styles.modalSafe}><View style={styles.modalActions}><Pressable onPress={onClose} style={styles.modalRound}><Text style={styles.modalRoundText}>×</Text></Pressable><Pressable onPress={() => onFavorite(place.id)} style={styles.modalRound}><Text style={styles.modalRoundText}>{favorite ? '♥' : '♡'}</Text></Pressable></View><View style={styles.modalBody}><Text style={styles.modalMeta}>{place.category.toUpperCase()} · {place.district.toUpperCase()}</Text><Text style={styles.modalTitle}>{place.name}</Text><Text style={styles.modalCopy}>{place.summary}</Text><View style={styles.infoCard}><Text style={styles.infoLabel}>ZİYARET BİLGİSİ</Text><Text style={styles.infoTitle}>Konumu ve güncel bilgileri görüntüle</Text><Text style={styles.infoCopy}>Çalışma saatleri, ulaşım seçenekleri ve güncel yol durumunu ziyaret öncesinde haritadan kontrol edin.</Text></View><Pressable onPress={() => onTogglePlan(place.id)} style={[styles.spiritualPlanButton, planned && styles.spiritualPlanButtonActive]}><Text style={[styles.spiritualPlanText, planned && styles.spiritualPlanTextActive]}>{planned ? '✓  Gezi planıma eklendi' : '+  Gezi planıma ekle'}</Text></Pressable><Pressable onPress={openMap} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Konum ve yol tarifi  →</Text></Pressable><Pressable onPress={() => Linking.openURL(place.imagePage)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Fotoğraf: {place.credit}</Text></Pressable></View></SafeAreaView></View>}</Modal>;
}

function IstanbulDistrictModal({ district, planned, onTogglePlan, onClose }: { district: IstanbulDistrict | null; planned: boolean; onTogglePlan: (id: string) => void; onClose: () => void }) {
  const related = district ? istanbulPlaces.filter(place => place.district === district.name) : [];
  const beaches = district ? istanbulBeaches.filter(beach => beach.district === district.name) : [];
  const openMap = () => district && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(district.mapQuery)}`);
  const openHighlight = (highlight: string) => district && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${highlight} ${district.name} İstanbul`)}`);
  const openDistrictSearch = (query: string) => district && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${district.name} İstanbul`)}`);
  const services: [string, string, string][] = [['☕', 'Kafeler', 'kafeler'], ['🍴', 'Restoranlar', 'restoranlar'], ['⌂', 'Konaklama', 'oteller'], ['H', 'Hastaneler', 'hastaneler'], ['+', 'Eczaneler', 'eczaneler'], ['↔', 'Ulaşım', 'toplu taşıma durakları']];
  return <Modal visible={Boolean(district)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{district && <SafeAreaView style={[styles.districtModal, { backgroundColor: district.side === 'Avrupa' ? '#315F53' : district.side === 'Anadolu' ? '#477A89' : '#75513B' }]}><View style={styles.districtModalTop}><View><Text style={styles.districtModalKicker}>İSTANBUL · {district.side === 'Adalar' ? 'ADALAR' : `${district.side.toUpperCase()} YAKASI`}</Text><Text style={styles.districtModalTitle}>{district.name}</Text></View><Pressable onPress={onClose} style={styles.districtClose}><Text style={styles.districtCloseText}>×</Text></Pressable></View><Text style={styles.districtModalSignature}>{district.signature}</Text><ScrollView contentContainerStyle={styles.districtModalScroll}><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>İLÇE HAKKINDA</Text><Text style={styles.istanbulDistrictModalCopy}>Mahalleleri, tarihî mirası, yeme-içme noktaları ve ulaşım seçenekleriyle {district.name} rehberini keşfedin.</Text></View><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>GÖRMEDEN DÖNME</Text>{district.highlights.map((highlight, index) => <Pressable key={highlight} onPress={() => openHighlight(highlight)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{highlight}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>{related.length > 0 && <View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>ÖNE ÇIKAN YERLER · {related.length}</Text>{related.map((place, index) => <Pressable key={place.id} onPress={() => openHighlight(place.name)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{place.name}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>}{beaches.length > 0 && <View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>SAHİLLER & PLAJLAR · {beaches.length}</Text>{beaches.slice(0, 8).map((beach, index) => <Pressable key={beach.id} onPress={() => openHighlight(beach.name)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{beach.name}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>}<View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>İLÇEDE ARA</Text><View style={styles.districtServiceGrid}>{services.map(([icon, label, query]) => <Pressable key={label} onPress={() => openDistrictSearch(query)} style={styles.districtServiceButton}><Text style={styles.districtServiceIcon}>{icon}</Text><Text style={styles.districtServiceText}>{label}</Text></Pressable>)}</View></View><Pressable onPress={() => onTogglePlan(`istanbul-ilce-${district.name}`)} style={[styles.spiritualPlanButton, planned && styles.spiritualPlanButtonActive]}><Text style={[styles.spiritualPlanText, planned && styles.spiritualPlanTextActive]}>{planned ? '✓  İlçe gezi planımda' : '+  İlçeyi gezi planıma ekle'}</Text></Pressable><Pressable onPress={openMap} style={styles.districtMapButton}><Text style={styles.districtMapText}>Haritada {district.name}  →</Text></Pressable><Text style={styles.sourceNote}>Konum, ulaşım ve çalışma saatlerini ziyaret öncesinde doğrulayın.</Text></ScrollView></SafeAreaView>}</Modal>;
}

function MainContent({ exploreOnly, query, setQuery, category, setCategory, places, favorites, plannedPlaces, plannedDistricts, plannedSpiritual, onFavorite, onPlacePlan, onDistrictPlan, onSpiritualPlan, onOpen, onDistrictOpen, onSpiritualOpen, onMenu }: {
  exploreOnly: boolean;
  query: string;
  setQuery: (value: string) => void;
  category: ExploreCategory;
  setCategory: (value: ExploreCategory) => void;
  places: Place[];
  favorites: string[];
  plannedPlaces: string[];
  plannedDistricts: string[];
  plannedSpiritual: string[];
  onFavorite: (id: string) => void;
  onPlacePlan: (id: string) => void;
  onDistrictPlan: (name: string) => void;
  onSpiritualPlan: (id: string) => void;
  onOpen: (place: Place) => void;
  onDistrictOpen: (district: District) => void;
  onSpiritualOpen: (site: SpiritualSite) => void;
  onMenu: () => void;
}) {
  const districtQuery = query.trim().toLocaleLowerCase('tr-TR');
  const visibleDistricts = bursaDistricts.filter(district => !districtQuery || `${district.name} ${district.signature} ${district.highlights.join(' ')} ${district.flavors.join(' ')}`.toLocaleLowerCase('tr-TR').includes(districtQuery));
  const visibleSpiritual = spiritualSites.filter(site => site.city === 'Bursa' && (category === 'Tümü' || category === 'Manevi') && (!districtQuery || `${site.name} ${site.district} ${site.kind} ${site.summary}`.toLocaleLowerCase('tr-TR').includes(districtQuery)));
  const visibleBaths = bursaBaths.filter(place => (category === 'Tümü' || category === 'Tarih') && (!districtQuery || `${place.name} ${place.district} hamam kaplıca termal ${place.summary}`.toLocaleLowerCase('tr-TR').includes(districtQuery)));
  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false} stickyHeaderIndices={exploreOnly ? [0] : undefined}>
      {!exploreOnly && <Hero onMenu={onMenu} />}
      <View style={[styles.content, exploreOnly && styles.exploreHeader]}>
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.eyebrow}>{exploreOnly ? 'TÜRKİYE’Yİ KEŞFET' : 'ÖNE ÇIKAN ŞEHİR'}</Text>
            <Text style={styles.sectionTitle}>{exploreOnly ? 'Nereye gitmek istersin?' : 'Bursa'}</Text>
          </View>
          {!exploreOnly && <View style={styles.cityBadge}><Text style={styles.cityBadgeText}>01</Text></View>}
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput value={query} onChangeText={setQuery} placeholder="Şehir, ilçe veya deneyim ara" placeholderTextColor="#8A9691" style={styles.searchInput} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map(item => (
            <Pressable key={item} onPress={() => setCategory(item)} style={[styles.categoryChip, category === item && styles.categoryChipActive]}>
              <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item === 'Sahil' ? '🏖️ Sahiller & Plajlar' : item}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {!exploreOnly && (
          <View style={styles.cityIntro}>
            <Image source={bursa.hero} style={styles.cityIntroImage} />
            <View style={styles.cityIntroShade} />
            <View style={styles.cityIntroContent}>
              <Text style={styles.cityRegion}>{bursa.region} · {bursa.districts} ilçe</Text>
              <Text style={styles.cityIntroTitle}>{bursa.tagline}</Text>
              <Text style={styles.cityIntroCopy}>{bursa.description}</Text>
            </View>
          </View>
        )}

        {!exploreOnly && (
          <>
            <View style={styles.subheadingRow}><Text style={styles.subheading}>{districtQuery ? 'Eşleşen ilçeler' : '17 ilçeyi keşfet'}</Text><Text style={styles.resultCount}>{visibleDistricts.length} ilçe</Text></View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.districtRail}>
              {visibleDistricts.map((district, index) => (
                <Pressable key={district.name} onPress={() => onDistrictOpen(district)} style={[styles.districtCard, { backgroundColor: district.theme }]}>
                  <Text style={styles.districtNumber}>{String(index + 1).padStart(2, '0')}</Text>
                  <Text style={styles.districtName}>{district.name}</Text>
                  <Text style={styles.districtSignature}>{district.signature}</Text>
                  <Text style={styles.districtOpen}>Detayı aç  →</Text>
                  <Pressable onPress={event => { event.stopPropagation(); onDistrictPlan(district.name); }} style={[styles.inlinePlanButton, plannedDistricts.includes(district.name) && styles.inlinePlanButtonActive]}><Text style={styles.inlinePlanButtonText}>{plannedDistricts.includes(district.name) ? '✓ Planımda' : '+ Planıma ekle'}</Text></Pressable>
                </Pressable>
              ))}
              {!visibleDistricts.length && <View style={styles.districtNoResult}><Text style={styles.districtNoResultText}>Bu aramayla eşleşen ilçe bulunamadı.</Text></View>}
            </ScrollView>
          </>
        )}

        {visibleSpiritual.length > 0 && (
          <>
            <View style={styles.spiritualHeading}>
              <View><Text style={styles.spiritualEyebrow}>MANEVİ MİRAS</Text><Text style={styles.spiritualTitle}>Bursa’nın ruhani durakları.</Text></View>
              <Text style={styles.spiritualCount}>{visibleSpiritual.length} yer</Text>
            </View>
            <View style={styles.spiritualGrid}>
              {visibleSpiritual.map((site, index) => <Pressable key={site.id} onPress={() => onSpiritualOpen(site)} style={styles.spiritualCard}><View style={styles.spiritualVisual}><Image source={site.image} style={styles.spiritualImage} /><View style={styles.spiritualImageShade} /><View style={styles.spiritualMark}><Text style={styles.spiritualMarkText}>{String(index + 1).padStart(2, '0')}</Text></View><View style={styles.realPhotoBadge}><Text style={styles.realPhotoBadgeText}>GERÇEK FOTOĞRAF</Text></View></View><View style={styles.spiritualBody}><Text style={styles.spiritualMeta}>{site.kind.toUpperCase()} · {site.district.toUpperCase()}</Text><Text style={styles.spiritualName}>{site.name}</Text><Text numberOfLines={2} style={styles.spiritualSummary}>{site.summary}</Text><Text style={styles.spiritualOpen}>Detayı aç  →</Text><Pressable onPress={event => { event.stopPropagation(); onSpiritualPlan(site.id); }} style={[styles.bursaCardPlanButton, plannedSpiritual.includes(site.id) && styles.bursaCardPlanButtonActive]}><Text style={[styles.bursaCardPlanText, plannedSpiritual.includes(site.id) && styles.bursaCardPlanTextActive]}>{plannedSpiritual.includes(site.id) ? '✓  Planıma eklendi' : '+  Planıma ekle'}</Text></Pressable></View></Pressable>)}
            </View>
          </>
        )}

        {!exploreOnly && category === 'Sahil' && <BeachExplorer query={query} favorites={favorites} plannedPlaces={plannedPlaces} onFavorite={onFavorite} onPlan={onPlacePlan} onOpen={onOpen} />}

        {category !== 'Manevi' && category !== 'Sahil' && <><View style={styles.subheadingRow}>
          <Text style={styles.subheading}>{query || category !== 'Tümü' ? 'Arama sonuçları' : 'Bursa’da kaçırma'}</Text>
          <Text style={styles.resultCount}>{places.length} öneri</Text>
        </View><View style={styles.cardGrid}>
          {places.map(place => <PlaceCard key={place.id} place={place} favorite={favorites.includes(place.id)} planned={plannedPlaces.includes(place.id)} onFavorite={onFavorite} onPlan={onPlacePlan} onOpen={onOpen} />)}
        </View>{!places.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>Sonuç bulunamadı</Text><Text style={styles.emptyCopy}>Başka bir kelime veya kategori deneyebilirsin.</Text></View>}</>}

        {!exploreOnly && visibleBaths.length > 0 && <><View style={styles.bathHeading}><View><Text style={styles.bathEyebrow}>HAMAMLAR & TERMAL MİRAS</Text><Text style={styles.bathTitle}>Suyun iyileştirdiği şehir.</Text></View><Text style={styles.resultCount}>{visibleBaths.length} hamam</Text></View><Text style={styles.bathIntro}>Roma’dan Osmanlı’ya uzanan termal kültürü, kubbeli hamamları ve Çekirge kaplıcalarını keşfet.</Text><View style={styles.cardGrid}>{visibleBaths.map(place => <PlaceCard key={place.id} place={place} favorite={favorites.includes(place.id)} planned={plannedPlaces.includes(place.id)} onFavorite={onFavorite} onPlan={onPlacePlan} onOpen={onOpen} />)}</View></>}

        {!exploreOnly && <CityToolkit />}

        {!exploreOnly && (
          <>
            <Text style={[styles.eyebrow, styles.spacedEyebrow]}>SIRADAKİ ROTALAR</Text>
            <Text style={styles.sectionTitle}>Türkiye, şehir şehir.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cityRail}>
              {comingCities.map(city => (
                <View key={city.name} style={[styles.comingCity, { backgroundColor: city.tone }]}>
                  <Text style={styles.comingRegion}>{city.region}</Text>
                  <Text style={styles.comingName}>{city.name}</Text>
                  <Text style={styles.comingSoon}>Hazırlanıyor →</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </ScrollView>
  );
}

function BeachExplorer({ query, favorites, plannedPlaces, onFavorite, onPlan, onOpen }: { query: string; favorites: string[]; plannedPlaces: string[]; onFavorite: (id: string) => void; onPlan: (id: string) => void; onOpen: (place: Place) => void }) {
  const [district, setDistrict] = useState<'Tümü' | BeachDistrict>('Tümü');
  const [waterType, setWaterType] = useState<'Tümü' | BeachWaterType>('Tümü');
  const [blueFlagOnly, setBlueFlagOnly] = useState(false);
  const normalized = query.trim().toLocaleLowerCase('tr-TR');
  const visible = useMemo(() => bursaBeaches.filter(beach => {
    const text = `${beach.name} ${beach.area} ${beach.district} bursa plaj sahil ${beach.waterType} ${beach.blueFlag ? 'mavi bayrak' : ''}`.toLocaleLowerCase('tr-TR');
    return (district === 'Tümü' || beach.district === district)
      && (waterType === 'Tümü' || beach.waterType === waterType)
      && (!blueFlagOnly || beach.blueFlag)
      && (!normalized || text.includes(normalized));
  }), [blueFlagOnly, district, normalized, waterType]);
  const placeFor = (beach: BursaBeach) => bursaBeachPlaces.find(place => place.id === beach.id)!;
  return <View style={styles.beachSection}>
    <View style={styles.beachHero}><Text style={styles.beachHeroEyebrow}>BURSA KIYI REHBERİ</Text><Text style={styles.beachHeroTitle}>Sahiller & Plajlar</Text><Text style={styles.beachHeroCopy}>Marmara Denizi’nden İznik Gölü’ne uzanan doğrulanmış yüzme alanları ve sahil durakları.</Text></View>
    <Text style={styles.beachFilterLabel}>İLÇE</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.beachFilterRail}>{beachDistricts.map(item => <Pressable key={item} onPress={() => setDistrict(item)} style={[styles.beachFilterChip, district === item && styles.beachFilterChipActive]}><Text style={[styles.beachFilterText, district === item && styles.beachFilterTextActive]}>{item}</Text></Pressable>)}</ScrollView>
    <Text style={styles.beachFilterLabel}>SU TÜRÜ</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.beachFilterRail}>{beachWaterTypes.map(item => <Pressable key={item} onPress={() => setWaterType(item)} style={[styles.beachFilterChip, waterType === item && styles.beachFilterChipActive]}><Text style={[styles.beachFilterText, waterType === item && styles.beachFilterTextActive]}>{item === 'Deniz' ? '🌊 Deniz' : item === 'Göl' ? '🏞️ Göl' : item}</Text></Pressable>)}<Pressable onPress={() => setBlueFlagOnly(value => !value)} style={[styles.beachFilterChip, blueFlagOnly && styles.blueFlagFilterActive]}><Text style={[styles.beachFilterText, blueFlagOnly && styles.beachFilterTextActive]}>🏅 Mavi Bayrak</Text></Pressable></ScrollView>
    <View style={styles.subheadingRow}><Text style={styles.subheading}>Kıyı durakları</Text><Text style={styles.resultCount}>{visible.length} sonuç</Text></View>
    <View style={styles.cardGrid}>{visible.map(beach => <BeachCard key={beach.id} beach={beach} favorite={favorites.includes(beach.id)} planned={plannedPlaces.includes(beach.id)} onFavorite={onFavorite} onPlan={onPlan} onOpen={() => onOpen(placeFor(beach))} />)}</View>
    {!visible.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>Plaj bulunamadı</Text><Text style={styles.emptyCopy}>İlçe, su türü veya Mavi Bayrak filtresini değiştir.</Text></View>}
  </View>;
}

function verifiedBeachTags(beach: BursaBeach) {
  const tags: string[] = [beach.waterType === 'Deniz' ? '🌊 Deniz' : '🏞️ Göl'];
  if (beach.surface) tags.push(`🏖️ ${beach.surface}`);
  if (beach.familyFriendly === true) tags.push('👨‍👩‍👧 Aileye uygun');
  if (beach.parking === true) tags.push('🚗 Otopark');
  if (beach.shower === true) tags.push('🚿 Duş');
  if (beach.blueFlag) tags.push(`🏅 Mavi Bayrak ${beach.blueFlagYear}`);
  return tags;
}

function BeachCard({ beach, favorite, planned, onFavorite, onPlan, onOpen }: { beach: BursaBeach; favorite: boolean; planned: boolean; onFavorite: (id: string) => void; onPlan: (id: string) => void; onOpen: () => void }) {
  return <Pressable onPress={onOpen} style={styles.placeCard}>
    <View><Image source={beach.image} style={styles.placeImage} {...(Platform.OS === 'web' ? ({ loading: 'lazy' } as object) : {})} />{beach.imageIsPlaceholder && <View style={styles.placeholderBadge}><Text style={styles.placeholderBadgeText}>TEMSİLİ GÖRSEL</Text></View>}<Pressable hitSlop={10} onPress={event => { event.stopPropagation(); onFavorite(beach.id); }} style={styles.favoriteButton}><Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>{favorite ? '♥' : '♡'}</Text></Pressable></View>
    <View style={styles.placeBody}><View style={styles.placeMeta}><Text style={styles.placeCategory}>🏖️ SAHİL & PLAJ</Text><Text style={styles.placeDistrict}>📍 {beach.district} / Bursa</Text></View><Text style={styles.placeName}>{beach.name}</Text><Text style={styles.beachArea}>{beach.area}</Text><View style={styles.beachTags}>{verifiedBeachTags(beach).map(tag => <View key={tag} style={styles.beachTag}><Text style={styles.beachTagText}>{tag}</Text></View>)}</View><Text numberOfLines={2} style={styles.placeSummary}>{beach.summary}</Text><Text style={styles.cardOpen}>Detayı aç  →</Text><Pressable onPress={event => { event.stopPropagation(); onPlan(beach.id); }} style={[styles.bursaCardPlanButton, planned && styles.bursaCardPlanButtonActive]}><Text style={[styles.bursaCardPlanText, planned && styles.bursaCardPlanTextActive]}>{planned ? '✓  Planıma eklendi' : '+  Planıma ekle'}</Text></Pressable></View>
  </Pressable>;
}

function CityToolkit() {
  const [offlineStatus, setOfflineStatus] = useState<OfflineStatus>('idle');
  useEffect(() => {
    AsyncStorage.getItem('turkiye-rehberi-offline-bursa').then(value => setOfflineStatus(value === 'ready' ? 'ready' : 'idle')).catch(() => {});
  }, []);
  const openMapSearch = (query: string) => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);
  const openRoute = (route: DailyRoute) => {
    const origin = route.stops[0];
    const destination = route.stops.at(-1);
    if (!origin || !destination) return;
    const waypoints = route.stops.slice(1, -1).map(stop => `${stop} Bursa`).join('|');
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${origin} Bursa`)}&destination=${encodeURIComponent(`${destination} Bursa`)}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}`);
  };
  const saveOffline = async () => {
    if (offlineStatus === 'ready' || offlineStatus === 'downloading') return;
    setOfflineStatus('downloading');
    try {
      await downloadOfflineGuide('turkiye-rehberi-offline-bursa');
      setOfflineStatus('ready');
    } catch {
      setOfflineStatus('error');
    }
  };
  return <>
    <View style={styles.toolkitHeader}><Text style={styles.eyebrow}>ŞEHİR ASİSTANI</Text><Text style={styles.toolkitTitle}>Bursa’da aradığın her şey.</Text><Text style={styles.toolkitCopy}>Yeme içmeden sağlık ve ulaşıma, hazır rotalardan yakındaki noktalara kadar tek yerde.</Text></View>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Temel ihtiyaçlar</Text><Text style={styles.moduleHint}>Canlı harita sonuçları</Text></View>
    <View style={styles.serviceGrid}>{bursaGuideModules.services.map((service, index) => <Pressable key={service.kind} onPress={() => openMapSearch(service.mapQuery)} style={styles.serviceCard}><View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{['⌂', '+', '✚', '↗'][index]}</Text></View><Text style={styles.serviceKind}>{service.kind}</Text><Text style={styles.serviceName}>{service.label}</Text><Text style={styles.serviceCopy}>{service.description}</Text><Text style={styles.serviceOpen}>Haritada aç  ↗</Text></Pressable>)}</View>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Bölge bölge yeme & içme</Text><Text style={styles.moduleHint}>{bursaGuideModules.venueAreas.length} bölge</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{bursaGuideModules.venueAreas.map(area => <View key={area.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{area.district.toUpperCase()}</Text><Text style={styles.venueArea}>{area.area}</Text><Text style={styles.venueCharacter}>{area.character}</Text><Pressable onPress={() => openMapSearch(area.cafeQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>En iyi kafeler  →</Text></Pressable><Pressable onPress={() => openMapSearch(area.restaurantQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>En iyi restoranlar  →</Text></Pressable></View>)}</ScrollView>

    <AccommodationSection city="Bursa" items={bursaGuideModules.accommodations} />

    <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ÇOCUKLARLA BURSA</Text><Text style={styles.moduleTitle}>Aile & çocuk rotaları</Text></View><Text style={styles.moduleHint}>{bursaGuideModules.familyRoutes.length} rota</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{bursaGuideModules.familyRoutes.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMapSearch(item.mapQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Rotayı haritada aç  ↗</Text></Pressable></View>)}</ScrollView>

    <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>GÜN BATIMINDAN SONRA</Text><Text style={styles.moduleTitle}>Bursa gece hayatı</Text></View><Text style={styles.moduleHint}>{bursaGuideModules.nightlifeAreas.length} bölge</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{bursaGuideModules.nightlifeAreas.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMapSearch(item.mapQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>Mekânları haritada aç  ↗</Text></Pressable></View>)}</ScrollView>

    <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ÇARŞILAR & BULVARLAR</Text><Text style={styles.moduleTitle}>Alışveriş rotaları</Text></View><Text style={styles.moduleHint}>{bursaGuideModules.shoppingStreets.length} bölge</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{bursaGuideModules.shoppingStreets.map(item => <View key={item.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.venueArea}>{item.area}</Text><Text style={styles.venueCharacter}>{item.character}</Text><Pressable onPress={() => openMapSearch(item.mapQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>Haritada aç  ↗</Text></Pressable></View>)}</ScrollView>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Ne, nerede yenir?</Text><Text style={styles.moduleHint}>Yerel seçki</Text></View>
    <View style={styles.foodList}>{bursaGuideModules.foods.map((food, index) => <Pressable key={food.dish} onPress={() => openMapSearch(food.mapQuery)} style={styles.foodRow}><Text style={styles.foodNumber}>{String(index + 1).padStart(2, '0')}</Text><View style={styles.foodBody}><Text style={styles.foodDish}>{food.dish}</Text><Text style={styles.foodArea}>{food.area}</Text><Text style={styles.foodNote}>{food.note}</Text></View><Text style={styles.foodArrow}>↗</Text></Pressable>)}</View>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Hazır günlük rotalar</Text><Text style={styles.moduleHint}>Tek dokunuşla rota</Text></View>
    <View style={styles.routeList}>{bursaGuideModules.routes.map((route, index) => <Pressable key={route.id} onPress={() => openRoute(route)} style={[styles.routeCard, { backgroundColor: route.theme }]}><View style={styles.routeTop}><Text style={styles.routeIndex}>0{index + 1}</Text><Text style={styles.routeDuration}>{route.duration}</Text></View><Text style={styles.routeTitle}>{route.title}</Text><Text style={styles.routeStops}>{route.stops.join('  ·  ')}</Text><Text style={styles.routeOpen}>Rotayı haritada aç  →</Text></Pressable>)}</View>

    <View style={styles.moduleHeading}><View><Text style={styles.istanbulEyebrow}>ŞEHİR İÇİNDE HAREKET</Text><Text style={styles.moduleTitle}>Toplu ulaşım rehberi</Text></View><Text style={styles.moduleHint}>{bursaGuideModules.transport.length} seçenek</Text></View>
    <View style={styles.serviceGrid}>{bursaGuideModules.transport.map(item => <Pressable key={item.name} onPress={() => openMapSearch(item.mapQuery)} style={styles.serviceCard}><View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{item.icon}</Text></View><Text style={styles.serviceKind}>ULAŞIM AĞI</Text><Text style={styles.serviceName}>{item.name}</Text><Text style={styles.serviceCopy}>{item.description}</Text><Text style={styles.serviceOpen}>Durakları haritada aç  ↗</Text></Pressable>)}</View>
    <View style={styles.infoCard}><Text style={styles.infoLabel}>BURSAKART & AKTARMA</Text><Text style={styles.infoTitle}>Kent içi ulaşımı tek kartla planla</Text><Text style={styles.infoCopy}>Bursaray, tramvay ve belediye otobüslerinde güncel hat, sefer ve ücret bilgilerini yolculuk öncesinde BURULAŞ kanallarından kontrol edin.</Text></View>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Bursa fotoğraf günlüğü</Text><Text style={styles.moduleHint}>{bursaGuideModules.gallery.length} kare</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRail}>{bursaGuideModules.gallery.map(item => <View key={item.title} style={styles.galleryCard}><Image source={item.image} style={styles.galleryImage} /><View style={styles.galleryShade} /><View style={styles.galleryCaption}><Text style={styles.galleryDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.galleryTitle}>{item.title}</Text></View></View>)}</ScrollView>

    <NearbySection city="Bursa" items={bursaGuideModules.nearbySearches} />

    <View style={styles.offlineCard}><View style={styles.offlineTop}><View style={styles.offlineIcon}><Text style={styles.offlineIconText}>↓</Text></View><View style={styles.offlineBody}><Text style={styles.offlineEyebrow}>İNTERNETSİZ KULLANIM</Text><Text style={styles.offlineTitle}>Bursa şehir rehberi</Text><Text style={styles.offlineCopy}>İçerik, rotalar ve uygulamaya eklenen fotoğraflar cihazına kaydedilir. Canlı harita ve işletme sonuçları internet gerektirir.</Text></View></View>{offlineStatus === 'error' && <Text style={styles.offlineError}>Paket indirilemedi. İnternet bağlantını kontrol edip yeniden dene.</Text>}<Pressable disabled={offlineStatus === 'downloading'} onPress={saveOffline} style={[styles.offlineButton, offlineStatus === 'ready' && styles.offlineButtonReady, offlineStatus === 'downloading' && styles.disabledButton]}><Text style={[styles.offlineButtonText, offlineStatus === 'ready' && styles.offlineButtonTextReady]}>{offlineStatus === 'ready' ? '✓  Çevrimdışı rehber hazır' : offlineStatus === 'downloading' ? 'Rehber indiriliyor…' : 'Bursa rehberini indir'}</Text></Pressable></View>
  </>;
}

function AccommodationSection({ city, items }: { city: string; items: AccommodationArea[] }) {
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const openMap = (query: string) => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);
  const categories = ['Tümü', ...items.map(item => item.category)];
  const visibleItems = selectedCategory === 'Tümü' ? items : items.filter(item => item.category === selectedCategory);
  const citySuffix = city === 'Bursa' ? 'Bursa’da' : city === 'İstanbul' ? 'İstanbul’da' : `${city}’da`;
  return <><View style={styles.moduleHeading}><View><Text style={styles.stayEyebrow}>KONAKLAMA REHBERİ</Text><Text style={styles.moduleTitle}>Nerede kalmalı?</Text></View><Text style={styles.moduleHint}>{visibleItems.length} bölge</Text></View><Text style={styles.stayIntro}>Gezi tarzını seç; {citySuffix} sana en uygun konaklama bölgesini karşılaştır.</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stayFilterRail}>{categories.map(category => <Pressable key={category} onPress={() => setSelectedCategory(category)} style={[styles.stayFilter, selectedCategory === category && styles.stayFilterActive]}><Text style={[styles.stayFilterText, selectedCategory === category && styles.stayFilterTextActive]}>{category}</Text></Pressable>)}</ScrollView><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stayRail}>{visibleItems.map((item, index) => <Pressable key={item.area} onPress={() => openMap(item.mapQuery)} style={[styles.stayCard, index % 2 === 1 && styles.stayCardAlt]}><View style={styles.stayTop}><Text style={styles.stayDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.stayLevel}>{item.level}</Text></View><Text style={styles.stayArea}>{item.area}</Text><Text style={styles.stayBest}>{item.category.toUpperCase()} · {item.bestFor}</Text><Text style={styles.stayCharacter}>{item.character}</Text><Text style={styles.stayOpen}>{city} konaklamalarını göster  ↗</Text></Pressable>)}</ScrollView></>;
}

function NearbySection({ city, items }: { city: string; items: { label: string; icon: string; query: string }[] }) {
  const [status, setStatus] = useState<'idle' | 'locating' | 'fallback'>('idle');
  const openNearby = (query: string) => {
    const fallback = () => {
      setStatus('fallback');
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${city}`)}`);
    };
    if (Platform.OS !== 'web' || typeof navigator === 'undefined' || !navigator.geolocation) {
      fallback();
      return;
    }
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      position => {
        setStatus('idle');
        const { latitude, longitude } = position.coords;
        Linking.openURL(`https://www.google.com/maps/search/${encodeURIComponent(query)}/@${latitude},${longitude},15z`);
      },
      fallback,
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  };
  return <View style={styles.nearbyPanel}><Text style={styles.nearbyEyebrow}>KONUMUNA GÖRE</Text><Text style={styles.nearbyTitle}>Şu anda çevrende ne var?</Text><Text style={styles.nearbyCopy}>Bir kategori seç. İzin verirsen konumun yalnızca yakınındaki güncel harita sonuçlarını açmak için kullanılır.</Text>{status === 'locating' && <Text style={styles.nearbyStatus}>Konumun alınıyor…</Text>}{status === 'fallback' && <Text style={styles.nearbyStatus}>Konum alınamadı; {city} geneli gösteriliyor.</Text>}<View style={styles.nearbyGrid}>{items.map(item => <Pressable key={item.label} disabled={status === 'locating'} onPress={() => openNearby(item.query)} style={[styles.nearbyButton, status === 'locating' && styles.disabledButton]}><Text style={styles.nearbyIcon}>{item.icon}</Text><Text style={styles.nearbyLabel}>{item.label}</Text></Pressable>)}</View></View>;
}

function Hero({ onMenu }: { onMenu: () => void }) {
  return (
    <ImageBackground source={bursa.hero} style={styles.hero} imageStyle={styles.heroImage}>
      <View style={styles.heroOverlay} />
      <SafeAreaView style={styles.heroSafe}>
        <View style={styles.brandRow}><View style={styles.brandMark}><Text style={styles.brandMarkText}>TR</Text></View><Text style={styles.brand}>Türkiye Rehberi</Text><Pressable accessibilityRole="button" accessibilityLabel="Ana menüyü aç" onPress={onMenu} style={styles.roundButton}><Text style={styles.roundButtonText}>☰</Text></Pressable></View>
        <View style={styles.heroCopy}>
          <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>81 ŞEHİR · BİNLERCE HİKÂYE</Text></View>
          <Text style={styles.heroTitle}>Yolun{`\n`}Türkiye’den{`\n`}geçsin.</Text>
          <Text style={styles.heroSubtitle}>Yakındaki güzellikleri keşfet, rotanı oluştur ve her şehri kendi hikâyesiyle tanı.</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function PlaceCard({ place, favorite, planned, onFavorite, onPlan, onOpen }: { place: Place; favorite: boolean; planned?: boolean; onFavorite: (id: string) => void; onPlan?: (id: string) => void; onOpen: (place: Place) => void }) {
  if (place.beach) return <BeachCard beach={place.beach} favorite={favorite} planned={Boolean(planned)} onFavorite={onFavorite} onPlan={onPlan ?? (() => {})} onOpen={() => onOpen(place)} />;
  return (
    <Pressable onPress={() => onOpen(place)} style={styles.placeCard}>
      <Image source={place.image} style={styles.placeImage} />
      <Pressable hitSlop={10} onPress={event => { event.stopPropagation(); onFavorite(place.id); }} style={styles.favoriteButton}><Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>{favorite ? '♥' : '♡'}</Text></Pressable>
      <View style={styles.placeBody}>
        <View style={styles.placeMeta}><Text style={styles.placeCategory}>{place.category}</Text><Text style={styles.placeDistrict}>{place.district}</Text></View>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text numberOfLines={2} style={styles.placeSummary}>{place.summary}</Text>
        {onPlan && <Pressable onPress={event => { event.stopPropagation(); onPlan(place.id); }} style={[styles.bursaCardPlanButton, planned && styles.bursaCardPlanButtonActive]}><Text style={[styles.bursaCardPlanText, planned && styles.bursaCardPlanTextActive]}>{planned ? '✓  Planıma eklendi' : '+  Planıma ekle'}</Text></Pressable>}
      </View>
    </Pressable>
  );
}

function Favorites({ places, onOpen, onRemove }: { places: Place[]; onOpen: (place: Place) => void; onRemove: (id: string) => void }) {
  return <SafeAreaView style={styles.plainPage}><View style={styles.plainHeader}><Text style={styles.eyebrow}>KİŞİSEL KOLEKSİYONUN</Text><Text style={styles.sectionTitle}>Favorilerim</Text><Text style={styles.plainCopy}>Gitmek istediğin yerleri burada biriktir.</Text></View><ScrollView contentContainerStyle={styles.favoriteList}>{places.map(place => <PlaceCard key={place.id} place={place} favorite onFavorite={onRemove} onOpen={onOpen} />)}{!places.length && <View style={styles.empty}><Text style={styles.emptyIcon}>♡</Text><Text style={styles.emptyTitle}>Listen henüz boş</Text><Text style={styles.emptyCopy}>Keşfet bölümündeki kalp simgesine dokun.</Text></View>}</ScrollView></SafeAreaView>;
}

function Profile({ favoriteCount, planCount }: { favoriteCount: number; planCount: number }) {
  const [name, setName] = useState('Gezgin');
  const [travelStyle, setTravelStyle] = useState('Kültür & tarih');
  const [bursaOffline, setBursaOffline] = useState(false);
  const [istanbulOffline, setIstanbulOffline] = useState(false);
  const [ankaraOffline, setAnkaraOffline] = useState(false);
  const [izmirOffline, setIzmirOffline] = useState(false);
  const travelStyles = ['Kültür & tarih', 'Doğa', 'Lezzet', 'Sahil', 'Aile'];
  useEffect(() => {
    Promise.all([
      AsyncStorage.getItem('turkiye-rehberi-profil-adi'),
      AsyncStorage.getItem('turkiye-rehberi-gezi-tarzi'),
      AsyncStorage.getItem('turkiye-rehberi-offline-bursa'),
      AsyncStorage.getItem('turkiye-rehberi-offline-istanbul'),
      AsyncStorage.getItem('turkiye-rehberi-offline-ankara'),
      AsyncStorage.getItem('turkiye-rehberi-offline-izmir'),
    ]).then(([savedName, savedStyle, bursaSaved, istanbulSaved, ankaraSaved, izmirSaved]) => {
      if (savedName) setName(savedName);
      if (savedStyle) setTravelStyle(savedStyle);
      setBursaOffline(bursaSaved === 'ready');
      setIstanbulOffline(istanbulSaved === 'ready');
      setAnkaraOffline(ankaraSaved === 'ready');
      setIzmirOffline(izmirSaved === 'ready');
    }).catch(() => {});
  }, []);
  const saveName = (value: string) => {
    const next = value.slice(0, 28);
    setName(next);
    AsyncStorage.setItem('turkiye-rehberi-profil-adi', next.trim() || 'Gezgin').catch(() => {});
  };
  const selectStyle = (value: string) => {
    setTravelStyle(value);
    AsyncStorage.setItem('turkiye-rehberi-gezi-tarzi', value).catch(() => {});
  };
  return <SafeAreaView style={styles.plainPage}><ScrollView contentContainerStyle={styles.profileContent} showsVerticalScrollIndicator={false}><Text style={styles.eyebrow}>YOLCULUK PROFİLİ</Text><Text style={styles.sectionTitle}>Merhaba {name.trim() || 'Gezgin'}</Text><Text style={styles.plainCopy}>Tercihlerin yalnızca bu cihazda saklanır; hesap açmadan kişisel gezi alanını kullanabilirsin.</Text><View style={styles.profileCard}><Text style={styles.profileLabel}>GÖRÜNEN ADIN</Text><TextInput value={name} onChangeText={saveName} placeholder="Gezgin" placeholderTextColor="#8A9691" style={styles.profileInput} maxLength={28} /><Text style={styles.profileLabel}>GEZİ TARZIN</Text><View style={styles.profileChips}>{travelStyles.map(item => <Pressable key={item} onPress={() => selectStyle(item)} style={[styles.profileChip, travelStyle === item && styles.profileChipActive]}><Text style={[styles.profileChipText, travelStyle === item && styles.profileChipTextActive]}>{item}</Text></Pressable>)}</View></View><View style={styles.statRow}><View style={styles.stat}><Text style={styles.statNumber}>{favoriteCount}</Text><Text style={styles.statLabel}>Favori</Text></View><View style={styles.stat}><Text style={styles.statNumber}>{planCount}</Text><Text style={styles.statLabel}>Planlanan durak</Text></View><View style={styles.stat}><Text style={styles.statNumber}>4</Text><Text style={styles.statLabel}>Hazır şehir</Text></View></View><View style={styles.roadmap}><Text style={styles.roadmapTitle}>Çevrimdışı rehberler</Text>{[['16', 'Bursa', bursaOffline], ['34', 'İstanbul', istanbulOffline], ['06', 'Ankara', ankaraOffline], ['35', 'İzmir', izmirOffline]].map(([plate, city, ready]) => <View key={String(city)} style={styles.roadmapItem}><Text style={styles.roadmapIndex}>{plate}</Text><View style={styles.profileOfflineBody}><Text style={styles.roadmapText}>{city}</Text><Text style={styles.profileOfflineText}>{ready ? 'Bu cihazda hazır' : 'Şehir sayfasından indirilebilir'}</Text></View><Text style={[styles.profileStatus, ready && styles.profileStatusReady]}>{ready ? '✓' : '○'}</Text></View>)}</View><View style={styles.profileNote}><Text style={styles.profileNoteTitle}>Gizlilik</Text><Text style={styles.profileNoteText}>Profil adı, gezi tarzı, favoriler ve planların cihazında tutulur. Bu sürümde sunucuya gönderilmez ve herkese açık profil oluşturulmaz.</Text></View></ScrollView></SafeAreaView>;
}

function AppMenu({ visible, activeCity, favoriteCount, planCount, onClose, onNavigate, onCity }: { visible: boolean; activeCity: CityId; favoriteCount: number; planCount: number; onClose: () => void; onNavigate: (tab: Tab) => void; onCity: (city: CityId) => void }) {
  const links: Array<[string, string, Tab, number?]> = [['⌂', 'Ana sayfa', 'home'], ['⌕', 'Tüm şehirler', 'explore'], ['⌖', 'Gezi planım', 'plan', planCount], ['♡', 'Favorilerim', 'favorites', favoriteCount], ['○', 'Profilim', 'profile']];
  return <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}><View style={styles.menuBackdrop}><Pressable accessibilityLabel="Menüyü kapat" onPress={onClose} style={StyleSheet.absoluteFill} /><SafeAreaView style={styles.menuSheet}><View style={styles.menuHeader}><View><Text style={styles.menuKicker}>TÜRKİYE GEZİ REHBERİ</Text><Text style={styles.menuTitle}>Menü</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Menüyü kapat" onPress={onClose} style={styles.menuClose}><Text style={styles.menuCloseText}>×</Text></Pressable></View><Text style={styles.menuSectionLabel}>ŞEHİRLER</Text><View style={styles.menuCityRow}>{([['bursa', '16', 'Bursa'], ['istanbul', '34', 'İstanbul'], ['ankara', '06', 'Ankara'], ['izmir', '35', 'İzmir']] as Array<[CityId, string, string]>).map(([id, plate, city]) => <Pressable key={id} onPress={() => onCity(id)} style={[styles.menuCity, activeCity === id && styles.menuCityActive]}><Text style={styles.menuCityPlate}>{plate}</Text><Text style={styles.menuCityName}>{city}</Text></Pressable>)}</View><Text style={styles.menuSectionLabel}>KISAYOLLAR</Text>{links.map(([icon, label, target, count]) => <Pressable key={target} onPress={() => onNavigate(target)} style={styles.menuLink}><Text style={styles.menuLinkIcon}>{icon}</Text><Text style={styles.menuLinkText}>{label}</Text>{Boolean(count) && <Text style={styles.menuLinkCount}>{count}</Text>}<Text style={styles.menuLinkArrow}>›</Text></Pressable>)}<Text style={styles.menuFooter}>Sürüm 1.2 · Bursa, İstanbul, Ankara ve İzmir rehberleri</Text></SafeAreaView></View></Modal>;
}

function PlanScreen({ districtNames, spiritualIds, bursaPlaceIds, istanbulPlaceIds, ankaraPlaceIds, izmirPlaceIds, onRemoveDistrict, onRemoveSpiritual, onRemoveBursaPlace, onRemoveIstanbulPlace, onRemoveAnkaraPlace, onRemoveIzmirPlace }: { districtNames: string[]; spiritualIds: string[]; bursaPlaceIds: string[]; istanbulPlaceIds: string[]; ankaraPlaceIds: string[]; izmirPlaceIds: string[]; onRemoveDistrict: (name: string) => void; onRemoveSpiritual: (id: string) => void; onRemoveBursaPlace: (id: string) => void; onRemoveIstanbulPlace: (id: string) => void; onRemoveAnkaraPlace: (id: string) => void; onRemoveIzmirPlace: (id: string) => void }) {
  const districts = districtNames.map(name => bursaDistricts.find(item => item.name === name)).filter((item): item is District => Boolean(item));
  const sites = spiritualIds.map(id => spiritualSites.find(item => item.id === id)).filter((item): item is SpiritualSite => Boolean(item));
  const bursaStops = bursaPlaceIds.map(id => [...allBursaPlaces, ...bursaBaths].find(item => item.id === id)).filter((item): item is Place => Boolean(item));
  const istanbulStops = istanbulPlaceIds.map(id => allIstanbulPlanPlaces.find(item => item.id === id)).filter((item): item is IstanbulPlace => Boolean(item));
  const ankaraStops = ankaraPlaceIds.map(id => allAnkaraPlanPlaces.find(item => item.id === id)).filter((item): item is AnkaraPlace => Boolean(item));
  const izmirStops = izmirPlaceIds.map(id => allIzmirPlanPlaces.find(item => item.id === id)).filter((item): item is IzmirPlace => Boolean(item));
  const destinations = [...districts.map(item => item.mapQuery), ...sites.map(item => item.mapQuery), ...bursaStops.map(item => item.mapQuery), ...istanbulStops.map(item => item.mapQuery), ...ankaraStops.map(item => item.mapQuery), ...izmirStops.map(item => item.mapQuery)];
  const openRoute = () => {
    const first = destinations[0];
    const last = destinations.at(-1);
    if (!first || !last) return;
    if (destinations.length === 1) return openDirections(first);
    const origin = encodeURIComponent(first);
    const destination = encodeURIComponent(last);
    const waypoints = destinations.slice(1, -1).join('|');
    return Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}`);
  };
  return <SafeAreaView style={styles.plainPage}><View style={styles.plainHeader}><Text style={styles.eyebrow}>KİŞİSEL TÜRKİYE ROTAN</Text><Text style={styles.sectionTitle}>Gezi planım</Text><Text style={styles.plainCopy}>Bursa, İstanbul, Ankara ve İzmir’den seçtiğin duraklar burada sıralanır ve tek rota olarak haritada açılır.</Text></View><ScrollView contentContainerStyle={styles.planContent}>{districts.map((district, index) => <View key={district.name} style={styles.planDistrict}><View style={[styles.planNumber, { backgroundColor: district.theme }]}><Text style={styles.planNumberText}>{String(index + 1).padStart(2, '0')}</Text></View><View style={styles.planDistrictBody}><Text style={styles.planDistrictName}>{district.name}</Text><Text style={styles.planDistrictCopy}>Bursa · İlçe · {district.signature}</Text></View><Pressable onPress={() => onRemoveDistrict(district.name)} hitSlop={10}><Text style={styles.planRemove}>×</Text></Pressable></View>)}{sites.map((site, index) => <View key={site.id} style={styles.planDistrict}><View style={[styles.planNumber, styles.planSpiritual]}><Text style={styles.planNumberText}>{String(districts.length + index + 1).padStart(2, '0')}</Text></View><View style={styles.planDistrictBody}><Text style={styles.planDistrictName}>{site.name}</Text><Text style={styles.planDistrictCopy}>Bursa · Manevi miras · {site.district}</Text></View><Pressable onPress={() => onRemoveSpiritual(site.id)} hitSlop={10}><Text style={styles.planRemove}>×</Text></Pressable></View>)}{bursaStops.map((place, index) => <View key={place.id} style={styles.planDistrict}><View style={[styles.planNumber, { backgroundColor: palette.moss }]}><Text style={styles.planNumberText}>{String(districts.length + sites.length + index + 1).padStart(2, '0')}</Text></View><View style={styles.planDistrictBody}><Text style={styles.planDistrictName}>{place.name}</Text><Text style={styles.planDistrictCopy}>Bursa · {place.category} · {place.district}</Text></View><Pressable onPress={() => onRemoveBursaPlace(place.id)} hitSlop={10}><Text style={styles.planRemove}>×</Text></Pressable></View>)}{istanbulStops.map((place, index) => <View key={place.id} style={styles.planDistrict}><View style={[styles.planNumber, styles.planIstanbul]}><Text style={styles.planNumberText}>{String(districts.length + sites.length + bursaStops.length + index + 1).padStart(2, '0')}</Text></View><View style={styles.planDistrictBody}><Text style={styles.planDistrictName}>{place.name}</Text><Text style={styles.planDistrictCopy}>İstanbul · {place.category} · {place.district}</Text></View><Pressable onPress={() => onRemoveIstanbulPlace(place.id)} hitSlop={10}><Text style={styles.planRemove}>×</Text></Pressable></View>)}{ankaraStops.map((place, index) => <View key={place.id} style={styles.planDistrict}><View style={[styles.planNumber, { backgroundColor: '#8B6844' }]}><Text style={styles.planNumberText}>{String(districts.length + sites.length + bursaStops.length + istanbulStops.length + index + 1).padStart(2, '0')}</Text></View><View style={styles.planDistrictBody}><Text style={styles.planDistrictName}>{place.name}</Text><Text style={styles.planDistrictCopy}>Ankara · {place.category} · {place.district}</Text></View><Pressable onPress={() => onRemoveAnkaraPlace(place.id)} hitSlop={10}><Text style={styles.planRemove}>×</Text></Pressable></View>)}{izmirStops.map((place,index)=><View key={place.id} style={styles.planDistrict}><View style={[styles.planNumber,{backgroundColor:'#477A89'}]}><Text style={styles.planNumberText}>{String(districts.length+sites.length+bursaStops.length+istanbulStops.length+ankaraStops.length+index+1).padStart(2,'0')}</Text></View><View style={styles.planDistrictBody}><Text style={styles.planDistrictName}>{place.name}</Text><Text style={styles.planDistrictCopy}>İzmir · {place.category} · {place.district}</Text></View><Pressable onPress={()=>onRemoveIzmirPlace(place.id)} hitSlop={10}><Text style={styles.planRemove}>×</Text></Pressable></View>)}{!destinations.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌖</Text><Text style={styles.emptyTitle}>Rotan henüz boş</Text><Text style={styles.emptyCopy}>Şehir rehberlerindeki “Planıma ekle” düğmesine dokun.</Text></View>}{destinations.length > 0 && <Pressable onPress={openRoute} style={styles.planRouteButton}><Text style={styles.planRouteText}>Rotayı Google Maps’te aç  →</Text></Pressable>}</ScrollView></SafeAreaView>;
}

function BottomTabs({ tab, setTab, favoriteCount, planCount }: { tab: Tab; setTab: (tab: Tab) => void; favoriteCount: number; planCount: number }) {
  const items: Array<{ id: Tab; icon: string; label: string }> = [{ id: 'home', icon: '⌂', label: 'Ana sayfa' }, { id: 'explore', icon: '⌕', label: 'Keşfet' }, { id: 'plan', icon: '⌖', label: 'Planım' }, { id: 'favorites', icon: '♡', label: 'Favoriler' }, { id: 'profile', icon: '○', label: 'Profil' }];
  return <View style={styles.tabBar}>{items.map(item => { const badge = item.id === 'favorites' ? favoriteCount : item.id === 'plan' ? planCount : 0; return <Pressable key={item.id} onPress={() => setTab(item.id)} style={styles.tabItem}><View><Text style={[styles.tabIcon, tab === item.id && styles.tabActive]}>{item.icon}</Text>{badge > 0 && <View style={styles.tabBadge}><Text style={styles.tabBadgeText}>{badge}</Text></View>}</View><Text style={[styles.tabLabel, tab === item.id && styles.tabActive]}>{item.label}</Text></Pressable>; })}</View>;
}

const facilityLabel = (value: boolean | null) => value === true ? 'Var' : value === false ? 'Yok' : 'Doğrulanmadı';

function BeachModal({ place, favorite, planned, onClose, onFavorite, onTogglePlan }: { place: Place; favorite: boolean; planned: boolean; onClose: () => void; onFavorite: (id: string) => void; onTogglePlan: (id: string) => void }) {
  const beach = place.beach!;
  const hasCoordinates = beach.locationStatus === 'verified' && beach.latitude !== null && beach.longitude !== null;
  const openDirections = () => hasCoordinates && Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${beach.latitude},${beach.longitude}&travelmode=driving`);
  const features = [
    ['🏖️', 'Plaj yapısı', beach.surface ?? 'Doğrulanmadı'],
    ['◉', 'Giriş', beach.access ?? 'Doğrulanmadı'],
    [beach.waterType === 'Deniz' ? '🌊' : '🏞️', 'Su türü', beach.waterType],
    ['👨‍👩‍👧', 'Aile uygunluğu', facilityLabel(beach.familyFriendly)],
    ['👶', 'Çocuk uygunluğu', facilityLabel(beach.childFriendly)],
    ['🚗', 'Otopark', facilityLabel(beach.parking)],
    ['🚿', 'Duş', facilityLabel(beach.shower)],
    ['🚻', 'WC', facilityLabel(beach.toilet)],
    ['▣', 'Soyunma kabini', facilityLabel(beach.changingRoom)],
    ['🍴', 'Yeme içme', facilityLabel(beach.food)],
    ['⛱️', 'Şezlong / şemsiye', `${facilityLabel(beach.sunbed)} / ${facilityLabel(beach.umbrella)}`],
    ['⛺', 'Kamp', facilityLabel(beach.camping)],
    ['🏅', 'Mavi Bayrak', beach.blueFlag ? `Var · ${beach.blueFlagYear}` : '2026 listesinde yok'],
    ['💧', 'Su kalitesi', 'Canlı veri bağlantısına hazır'],
  ];
  return <Modal visible animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}><SafeAreaView style={styles.beachModal}><View style={styles.beachModalHero}><Image source={beach.image} style={styles.beachModalImage} /><View style={styles.beachModalShade} /><View style={styles.beachModalActions}><Pressable onPress={onClose} style={styles.modalRound}><Text style={styles.modalRoundText}>×</Text></Pressable><Pressable onPress={() => onFavorite(place.id)} style={styles.modalRound}><Text style={styles.modalRoundText}>{favorite ? '♥' : '♡'}</Text></Pressable></View>{beach.imageIsPlaceholder && <View style={styles.beachModalCaption}><Text style={styles.placeholderBadgeText}>TEMSİLİ GÖRSEL · GERÇEK FOTOĞRAF HAZIRLANIYOR</Text></View>}</View><ScrollView contentContainerStyle={styles.beachModalScroll}><Text style={styles.modalMeta}>{beach.waterType.toUpperCase()} · {beach.district.toUpperCase()} / BURSA</Text><Text style={styles.beachModalTitle}>{beach.name}</Text><Text style={styles.beachLocation}>📍 {beach.area}, {beach.district} / Bursa</Text><Text style={styles.modalCopy}>{beach.summary}</Text>{beach.blueFlag && <View style={styles.blueFlagBanner}><Text style={styles.blueFlagBannerText}>🏅  2026 MAVİ BAYRAK</Text></View>}<Text style={styles.beachFeaturesTitle}>Plaj özellikleri</Text><View style={styles.beachFeatureGrid}>{features.map(([icon, label, value]) => <View key={label} style={styles.beachFeature}><Text style={styles.beachFeatureIcon}>{icon}</Text><View style={styles.beachFeatureBody}><Text style={styles.beachFeatureLabel}>{label}</Text><Text style={styles.beachFeatureValue}>{value}</Text></View></View>)}</View><Pressable onPress={() => onTogglePlan(place.id)} style={[styles.spiritualPlanButton, planned && styles.spiritualPlanButtonActive]}><Text style={[styles.spiritualPlanText, planned && styles.spiritualPlanTextActive]}>{planned ? '✓  Gezi planıma eklendi' : '+  Gezi planıma ekle'}</Text></Pressable><Pressable disabled={!hasCoordinates} onPress={openDirections} style={[styles.primaryButton, !hasCoordinates && styles.disabledButton]}><Text style={styles.primaryButtonText}>{hasCoordinates ? '📍  Yol Tarifi Al' : 'Konum doğrulaması bekleniyor'}</Text></Pressable>{hasCoordinates && <Pressable onPress={() => Linking.openURL(beach.locationSource)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>✓ Konum doğrulandı · 28.08.2026  ↗</Text></Pressable>}{beach.imagePage && <Pressable onPress={() => Linking.openURL(beach.imagePage!)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Fotoğraf: {beach.imageCredit}  ↗</Text></Pressable>}<Pressable onPress={() => Linking.openURL(beach.sourceUrl)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Bilgi kaynağı  ↗</Text></Pressable><Text style={styles.beachSafetyNote}>Yüzme koşulları ve tesis hizmetleri mevsimsel olarak değişebilir. Cankurtaran uyarılarını ve güncel resmî su kalitesi sonuçlarını ziyaret öncesinde kontrol edin.</Text></ScrollView></SafeAreaView></Modal>;
}

function PlaceModal({ place, favorite, planned, onClose, onFavorite, onTogglePlan }: { place: Place | null; favorite: boolean; planned: boolean; onClose: () => void; onFavorite: (id: string) => void; onTogglePlan: (id: string) => void }) {
  if (place?.beach) return <BeachModal place={place} favorite={favorite} planned={planned} onClose={onClose} onFavorite={onFavorite} onTogglePlan={onTogglePlan} />;
  const openMap = () => place && openDirections(place.mapQuery);
  return <Modal visible={Boolean(place)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{place && <View style={styles.modal}><Image source={place.image} style={styles.modalImage} /><View style={styles.modalShade} /><SafeAreaView style={styles.modalSafe}><View style={styles.modalActions}><Pressable onPress={onClose} style={styles.modalRound}><Text style={styles.modalRoundText}>×</Text></Pressable><Pressable onPress={() => onFavorite(place.id)} style={styles.modalRound}><Text style={styles.modalRoundText}>{favorite ? '♥' : '♡'}</Text></Pressable></View><View style={styles.modalBody}><Text style={styles.modalMeta}>{place.category.toUpperCase()} · {place.district.toUpperCase()}</Text><Text style={styles.modalTitle}>{place.name}</Text><Text style={styles.modalCopy}>{place.summary}</Text><View style={styles.infoCard}><Text style={styles.infoLabel}>BU ROTA İÇİN</Text><Text style={styles.infoTitle}>Haritada konumu aç</Text><Text style={styles.infoCopy}>Güncel yol durumunu ve ulaşım seçeneklerini harita uygulamasından görüntüle.</Text></View><Pressable onPress={() => onTogglePlan(place.id)} style={[styles.spiritualPlanButton, planned && styles.spiritualPlanButtonActive]}><Text style={[styles.spiritualPlanText, planned && styles.spiritualPlanTextActive]}>{planned ? '✓  Gezi planıma eklendi' : '+  Gezi planıma ekle'}</Text></Pressable><Pressable onPress={openMap} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Yol tarifi al  →</Text></Pressable>{place.imagePage && <Pressable onPress={() => Linking.openURL(place.imagePage!)} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Fotoğraf: {place.imageCredit}</Text></Pressable>}</View></SafeAreaView></View>}</Modal>;
}

function DistrictModal({ district, planned, onClose, onTogglePlan }: { district: District | null; planned: boolean; onClose: () => void; onTogglePlan: (name: string) => void }) {
  const places = district ? [...bursa.places, ...bursaBaths].filter(place => place.district.includes(district.name)) : [];
  const beaches = district ? bursaBeaches.filter(beach => beach.district === district.name) : [];
  const spiritual = district ? spiritualSites.filter(site => site.district === district.name) : [];
  const openMap = () => district && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(district.mapQuery)}`);
  const openHighlight = (item: string) => district && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item} ${district.name} Bursa`)}`);
  const openDistrictSearch = (query: string) => district && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${query} ${district.name} Bursa`)}`);
  const services: [string, string, string][] = [['☕', 'Kafeler', 'kafeler'], ['🍴', 'Restoranlar', 'restoranlar'], ['⌂', 'Konaklama', 'oteller'], ['H', 'Hastaneler', 'hastaneler'], ['+', 'Eczaneler', 'eczaneler'], ['↔', 'Ulaşım', 'toplu taşıma durakları']];
  return <Modal visible={Boolean(district)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{district && <SafeAreaView style={[styles.districtModal, { backgroundColor: district.theme }]}><View style={styles.districtModalTop}><View><Text style={styles.districtModalKicker}>BURSA · İLÇE REHBERİ</Text><Text style={styles.districtModalTitle}>{district.name}</Text></View><Pressable onPress={onClose} style={styles.districtClose}><Text style={styles.districtCloseText}>×</Text></Pressable></View><Text style={styles.districtModalSignature}>{district.signature}</Text><ScrollView contentContainerStyle={styles.districtModalScroll}><Pressable onPress={() => onTogglePlan(district.name)} style={[styles.addPlanButton, planned && styles.addPlanButtonActive]}><Text style={[styles.addPlanText, planned && styles.addPlanTextActive]}>{planned ? '✓  Gezi planıma eklendi' : '+  Gezi planıma ekle'}</Text></Pressable><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>İLÇE HAKKINDA</Text><Text style={styles.istanbulDistrictModalCopy}>{district.signature}. Tarihî mirası, doğal alanları, yerel lezzetleri ve ulaşım seçenekleriyle {district.name} ilçesini keşfedin.</Text></View><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>GÖRMEDEN DÖNME</Text>{district.highlights.map((item, index) => <Pressable key={item} onPress={() => openHighlight(item)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{item}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>{places.length > 0 && <View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>ÖNE ÇIKAN MEKÂNLAR · {places.length}</Text>{places.map((place, index) => <Pressable key={place.id} onPress={() => openHighlight(place.name)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{place.name}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>}{spiritual.length > 0 && <View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>MANEVİ DURAKLAR · {spiritual.length}</Text>{spiritual.map((site, index) => <Pressable key={site.id} onPress={() => openHighlight(site.name)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{site.name}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>}{beaches.length > 0 && <View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>SAHİLLER & PLAJLAR · {beaches.length}</Text>{beaches.map((beach, index) => <Pressable key={beach.id} onPress={() => openHighlight(beach.name)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{beach.name}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View>}<View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>YEREL LEZZETLER</Text><View style={styles.flavorWrap}>{district.flavors.map(item => <View key={item} style={styles.flavorChip}><Text style={styles.flavorText}>{item}</Text></View>)}</View></View><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>İLÇEDE ARA</Text><View style={styles.districtServiceGrid}>{services.map(([icon, label, query]) => <Pressable key={label} onPress={() => openDistrictSearch(query)} style={styles.districtServiceButton}><Text style={styles.districtServiceIcon}>{icon}</Text><Text style={styles.districtServiceText}>{label}</Text></Pressable>)}</View></View><Pressable onPress={openMap} style={styles.districtMapButton}><Text style={styles.districtMapText}>Haritada {district.name}  →</Text></Pressable><Text style={styles.sourceNote}>İçerikler resmî Bursa turizm rehberi temel alınarak hazırlanır; çalışma saatleri ve ulaşım bilgileri ziyaret öncesinde kontrol edilmelidir.</Text></ScrollView></SafeAreaView>}</Modal>;
}

function SpiritualModal({ site, planned, onClose, onTogglePlan }: { site: SpiritualSite | null; planned: boolean; onClose: () => void; onTogglePlan: (id: string) => void }) {
  const openMap = () => site && openDirections(site.mapQuery);
  const openSource = () => site && Linking.openURL(site.sourceUrl);
  const openImageSource = () => site && Linking.openURL(site.imagePage);
  return <Modal visible={Boolean(site)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{site && <SafeAreaView style={styles.spiritualModal}><View style={styles.spiritualModalHero}><Image source={site.image} style={styles.spiritualModalImage} /><View style={styles.spiritualModalImageShade} /><View style={styles.spiritualModalTop}><View><Text style={styles.spiritualModalKicker}>{site.kind.toUpperCase()} · {site.district.toUpperCase()}</Text><Text style={styles.spiritualModalTitle}>{site.name}</Text></View><Pressable onPress={onClose} style={styles.spiritualClose}><Text style={styles.spiritualCloseText}>×</Text></Pressable></View></View><ScrollView contentContainerStyle={styles.spiritualModalScroll}><Pressable onPress={openImageSource} style={styles.photoCredit}><Text style={styles.photoCreditLabel}>FOTOĞRAF</Text><Text style={styles.photoCreditText}>{site.imageCredit} · Wikimedia Commons  ↗</Text></Pressable><View style={styles.spiritualPeriod}><Text style={styles.spiritualPeriodLabel}>DÖNEM</Text><Text style={styles.spiritualPeriodText}>{site.period}</Text></View><Text style={styles.spiritualModalCopy}>{site.summary}</Text><View style={styles.etiquetteCard}><Text style={styles.etiquetteLabel}>ZİYARET NOTU</Text><Text style={styles.etiquetteText}>{site.etiquette}</Text></View><Pressable onPress={() => onTogglePlan(site.id)} style={[styles.spiritualPlanButton, planned && styles.spiritualPlanButtonActive]}><Text style={[styles.spiritualPlanText, planned && styles.spiritualPlanTextActive]}>{planned ? '✓  Gezi planıma eklendi' : '+  Gezi planıma ekle'}</Text></Pressable><Pressable onPress={openMap} style={styles.spiritualMapButton}><Text style={styles.spiritualMapText}>Konumu ve yol tarifini aç  →</Text></Pressable><Pressable onPress={openSource} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Resmî bilgi kaynağı  ↗</Text></Pressable></ScrollView></SafeAreaView>}</Modal>;
}

const istanbulStyles = {
  bursaCardPlanButton: { height: 47, marginTop: 16, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: palette.moss }, bursaCardPlanButtonActive: { backgroundColor: palette.moss }, bursaCardPlanText: { color: palette.moss, fontSize: 11, fontWeight: '900' }, bursaCardPlanTextActive: { color: palette.white }, inlinePlanButton: { marginTop: 13, paddingVertical: 9, alignItems: 'center', borderRadius: 13, borderWidth: 1, borderColor: 'rgba(255,255,255,.55)' }, inlinePlanButtonActive: { backgroundColor: 'rgba(255,255,255,.2)' }, inlinePlanButtonText: { color: palette.white, fontSize: 9, fontWeight: '900' },
  bathHeading: { marginTop: 38, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, bathEyebrow: { color: '#8B6844', fontSize: 9, fontWeight: '900', letterSpacing: 1.2 }, bathTitle: { marginTop: 6, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 29, fontWeight: '600' }, bathIntro: { marginTop: 9, marginBottom: 17, color: palette.muted, fontSize: 12, lineHeight: 18 },
  istanbulDetailOpen: { marginTop: 17, color: palette.moss, fontSize: 11, fontWeight: '900' }, istanbulDistrictModalCopy: { color: palette.muted, fontSize: 15, lineHeight: 23 }, istanbulCardPlanButton: { height: 48, marginHorizontal: 19, marginBottom: 19, alignItems: 'center', justifyContent: 'center', borderRadius: 16, borderWidth: 1, borderColor: palette.moss, backgroundColor: palette.paper }, istanbulCardPlanButtonActive: { backgroundColor: palette.moss }, istanbulCardPlanText: { color: palette.moss, fontSize: 12, fontWeight: '900' }, istanbulCardPlanTextActive: { color: palette.white }, planIstanbul: { backgroundColor: '#477A89' },
  stayEyebrow: { marginBottom: 5, color: '#8B6844', fontSize: 8, fontWeight: '900', letterSpacing: 1.2 }, stayIntro: { marginTop: -5, marginBottom: 12, color: palette.muted, fontSize: 12, lineHeight: 18 }, stayFilterRail: { gap: 8, paddingBottom: 15 }, stayFilter: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: 18, borderWidth: 1, borderColor: '#D6CCBB', backgroundColor: palette.paper }, stayFilterActive: { borderColor: '#8B6844', backgroundColor: '#8B6844' }, stayFilterText: { color: '#76583B', fontSize: 10, fontWeight: '800' }, stayFilterTextActive: { color: palette.white }, stayRail: { gap: 12, paddingRight: 20 }, stayCard: { width: 285, minHeight: 285, padding: 21, borderRadius: 26, backgroundColor: '#DCEAE4' }, stayCardAlt: { backgroundColor: '#E9DED0' }, stayTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, stayDistrict: { color: palette.moss, fontSize: 9, fontWeight: '900', letterSpacing: 1.1 }, stayLevel: { paddingHorizontal: 10, paddingVertical: 6, overflow: 'hidden', borderRadius: 13, color: '#76583B', fontSize: 8, fontWeight: '900', backgroundColor: 'rgba(255,255,255,.7)' }, stayArea: { marginTop: 25, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 28, fontWeight: '600' }, stayBest: { marginTop: 9, color: palette.gold, fontSize: 8, fontWeight: '900', letterSpacing: .8 }, stayCharacter: { marginTop: 9, color: palette.muted, fontSize: 12, lineHeight: 18 }, stayOpen: { marginTop: 'auto', paddingTop: 18, color: palette.forest, fontSize: 10, fontWeight: '900' },
  cityTileActive: { borderColor: '#7FA99B', backgroundColor: '#E4EEE9' }, cityStatusDotActive: { backgroundColor: palette.moss }, cityTileStatusActive: { color: palette.moss },
  istanbulPage: { flex: 1, backgroundColor: palette.cream }, istanbulContent: { paddingBottom: 110 }, istanbulHero: { height: 520, margin: 12, marginTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 8 : 10, overflow: 'hidden', borderRadius: 30, justifyContent: 'space-between' }, istanbulHeroImage: { borderRadius: 30 }, izmirHeroImage: { width: '100%', height: '100%' }, istanbulHeroShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(7,25,28,.48)' }, istanbulHeroTop: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, istanbulHeroActions: { flexDirection: 'row', alignItems: 'center', gap: 10 }, istanbulLive: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 14, backgroundColor: palette.gold }, istanbulLiveText: { color: palette.ink, fontSize: 8, fontWeight: '900', letterSpacing: .8 }, istanbulHeroRegion: { color: palette.white, fontSize: 9, fontWeight: '900', letterSpacing: 1 }, istanbulHeroBody: { padding: 26, paddingBottom: 31 }, istanbulHeroKicker: { color: '#E6C78F', fontSize: 9, fontWeight: '900', letterSpacing: 1.4 }, istanbulHeroTitle: { marginTop: 7, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 49, fontWeight: '600', letterSpacing: -1.5 }, istanbulHeroCopy: { marginTop: 10, maxWidth: 410, color: '#E5ECE9', fontSize: 14, lineHeight: 21 }, istanbulBody: { paddingHorizontal: 20 }, istanbulEyebrow: { marginBottom: 5, color: palette.gold, fontSize: 8, fontWeight: '900', letterSpacing: 1.2 }, istanbulDistrictRail: { gap: 11, paddingRight: 20 }, istanbulDistrictCard: { width: 230, minHeight: 230, padding: 20, borderRadius: 25 }, istanbulDistrictSide: { color: 'rgba(255,255,255,.65)', fontSize: 8, fontWeight: '900', letterSpacing: 1.1 }, istanbulDistrictName: { marginTop: 14, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 28, fontWeight: '600' }, istanbulDistrictCopy: { marginTop: 9, color: 'rgba(255,255,255,.76)', fontSize: 11, lineHeight: 17 }, istanbulDistrictOpen: { marginTop: 'auto', paddingTop: 18, color: palette.white, fontSize: 10, fontWeight: '900' }, istanbulPlaceList: { gap: 15 }, istanbulPlaceCard: { overflow: 'hidden', borderRadius: 25, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, istanbulPlaceImage: { width: '100%', height: 235 }, istanbulPlaceBody: { padding: 19 }, istanbulPlaceMeta: { color: palette.gold, fontSize: 8, fontWeight: '900', letterSpacing: .8 }, istanbulPlaceName: { marginTop: 6, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 28, fontWeight: '600' }, istanbulPlaceCopy: { marginTop: 8, color: palette.muted, fontSize: 12, lineHeight: 18 }, istanbulPlaceActions: { marginTop: 17, gap: 12 }, istanbulMapButton: { height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: palette.forest }, istanbulMapButtonText: { color: palette.white, fontSize: 11, fontWeight: '900' }, istanbulCredit: { color: palette.muted, fontSize: 8, textAlign: 'center', textDecorationLine: 'underline' }, istanbulSource: { marginTop: 22, paddingHorizontal: 10, color: palette.muted, fontSize: 10, lineHeight: 16, textAlign: 'center' },
} as const;

const styles = StyleSheet.create({
  ...istanbulStyles,
  app: { flex: 1, backgroundColor: palette.cream }, page: { paddingBottom: 112 }, content: { padding: 20 }, exploreHeader: { paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 22 : 68, backgroundColor: palette.cream },
  hero: { height: 560, backgroundColor: palette.forest }, heroImage: { resizeMode: 'cover' }, heroOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(7,31,26,.48)' }, heroSafe: { flex: 1 }, brandRow: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? NativeStatusBar.currentHeight : 4, flexDirection: 'row', alignItems: 'center', gap: 10 }, brandMark: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.gold }, brandMarkText: { color: palette.ink, fontWeight: '900', fontSize: 12 }, brand: { flex: 1, color: palette.white, fontSize: 17, fontWeight: '800', letterSpacing: -.4 }, roundButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,.4)', backgroundColor: 'rgba(21,62,53,.25)' }, roundButtonText: { color: palette.white, fontSize: 18 }, heroCopy: { marginTop: 'auto', padding: 24, paddingBottom: 44 }, liveBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 20, backgroundColor: 'rgba(255,255,255,.15)' }, liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: palette.gold }, liveText: { color: palette.white, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 }, heroTitle: { color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 55, lineHeight: 56, letterSpacing: -2.2, fontWeight: '600' }, heroSubtitle: { marginTop: 20, maxWidth: 330, color: '#E8ECE8', fontSize: 16, lineHeight: 24 },
  titleRow: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }, eyebrow: { color: palette.moss, fontSize: 11, fontWeight: '900', letterSpacing: 1.6 }, sectionTitle: { marginTop: 7, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 38, lineHeight: 43, fontWeight: '600', letterSpacing: -1.1 }, cityBadge: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.forest }, cityBadgeText: { color: palette.white, fontSize: 13, fontWeight: '900' }, searchBox: { height: 56, marginTop: 22, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: palette.line, borderRadius: 18, backgroundColor: palette.paper }, searchIcon: { color: palette.moss, fontSize: 25 }, searchInput: { flex: 1, color: palette.ink, fontSize: 16 }, categoryRow: { gap: 9, paddingVertical: 16 }, categoryChip: { paddingHorizontal: 17, paddingVertical: 11, borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, categoryChipActive: { borderColor: palette.forest, backgroundColor: palette.forest }, categoryText: { color: palette.muted, fontSize: 13, fontWeight: '700' }, categoryTextActive: { color: palette.white },
  cityIntro: { height: 330, marginTop: 5, overflow: 'hidden', borderRadius: 28, backgroundColor: palette.forest }, cityIntroImage: { width: '100%', height: '100%' }, cityIntroShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(8,32,27,.48)' }, cityIntroContent: { position: 'absolute', right: 24, bottom: 25, left: 24 }, cityRegion: { color: '#D7E2DC', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, cityIntroTitle: { maxWidth: 290, marginTop: 8, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 30, lineHeight: 34, fontWeight: '600' }, cityIntroCopy: { marginTop: 10, color: '#E4EAE6', fontSize: 14, lineHeight: 20 }, subheadingRow: { marginTop: 30, marginBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, subheading: { color: palette.ink, fontSize: 21, fontWeight: '800', letterSpacing: -.5 }, resultCount: { color: palette.muted, fontSize: 12, fontWeight: '700' }, cardGrid: { gap: 15 }, placeCard: { overflow: 'hidden', borderRadius: 24, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, placeImage: { width: '100%', height: 205 }, favoriteButton: { position: 'absolute', top: 14, right: 14, width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,.92)' }, favoriteIcon: { color: palette.forest, fontSize: 24 }, favoriteIconActive: { color: '#B75043' }, placeBody: { padding: 18 }, placeMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, placeCategory: { color: palette.moss, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 }, placeDistrict: { color: palette.muted, fontSize: 11, fontWeight: '700' }, placeName: { marginTop: 8, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 24, fontWeight: '600' }, placeSummary: { marginTop: 7, color: palette.muted, fontSize: 14, lineHeight: 21 },
  districtRail: { gap: 11, paddingRight: 20 }, districtCard: { width: 185, minHeight: 190, padding: 18, justifyContent: 'flex-end', borderRadius: 23 }, districtNumber: { marginBottom: 'auto', color: 'rgba(255,255,255,.55)', fontSize: 11, fontWeight: '900' }, districtName: { color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 24, fontWeight: '600' }, districtSignature: { marginTop: 7, color: 'rgba(255,255,255,.78)', fontSize: 12, lineHeight: 17 }, districtOpen: { marginTop: 13, color: palette.white, fontSize: 11, fontWeight: '900' }, districtNoResult: { width: 260, minHeight: 110, padding: 20, justifyContent: 'center', borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, districtNoResultText: { color: palette.muted, fontSize: 14, lineHeight: 20 },
  spiritualHeading: { marginTop: 38, marginBottom: 15, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, spiritualEyebrow: { color: '#8B6844', fontSize: 10, fontWeight: '900', letterSpacing: 1.4 }, spiritualTitle: { maxWidth: 290, marginTop: 7, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 29, lineHeight: 34, fontWeight: '600' }, spiritualCount: { color: palette.muted, fontSize: 11, fontWeight: '700' }, spiritualGrid: { gap: 15 }, spiritualCard: { overflow: 'hidden', borderRadius: 25, borderWidth: 1, borderColor: '#DED5C6', backgroundColor: '#FBF5E9' }, spiritualVisual: { height: 210, backgroundColor: '#6D5135' }, spiritualImage: { width: '100%', height: '100%' }, spiritualImageShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(15,25,20,.18)' }, spiritualMark: { position: 'absolute', top: 15, left: 15, width: 47, height: 47, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#8B6844' }, spiritualMarkText: { color: palette.white, fontSize: 10, fontWeight: '900' }, realPhotoBadge: { position: 'absolute', right: 14, bottom: 14, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 14, backgroundColor: 'rgba(255,255,255,.92)' }, realPhotoBadgeText: { color: '#5E4832', fontSize: 8, fontWeight: '900', letterSpacing: .8 }, spiritualBody: { padding: 19 }, spiritualMeta: { color: '#8B6844', fontSize: 9, fontWeight: '900', letterSpacing: 1 }, spiritualName: { marginTop: 6, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 24, fontWeight: '600' }, spiritualSummary: { marginTop: 7, color: palette.muted, fontSize: 13, lineHeight: 19 }, spiritualOpen: { marginTop: 12, color: '#7A5A38', fontSize: 11, fontWeight: '900' },
  citiesPage: { flex: 1, backgroundColor: palette.cream }, citiesContent: { paddingBottom: 120 }, citiesHero: { minHeight: 445, padding: 24, paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 22 : 32, backgroundColor: palette.forest }, citiesBrand: { flexDirection: 'row', alignItems: 'center', gap: 11 }, citiesBrandText: { color: palette.white, fontSize: 17, fontWeight: '800' }, citiesKicker: { marginTop: 62, color: palette.gold, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 }, citiesTitle: { marginTop: 12, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 47, lineHeight: 50, fontWeight: '600', letterSpacing: -1.7 }, citiesCopy: { marginTop: 17, maxWidth: 340, color: '#D7E3DE', fontSize: 14, lineHeight: 21 }, citiesStats: { marginTop: 30, paddingTop: 20, flexDirection: 'row', alignItems: 'center', gap: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,.15)' }, citiesStatNumber: { color: palette.white, fontSize: 22, fontWeight: '800' }, citiesStatLabel: { marginTop: 2, color: '#AFC2BB', fontSize: 9, fontWeight: '700' }, citiesStatLine: { width: 1, height: 34, backgroundColor: 'rgba(255,255,255,.16)' }, citySearch: { height: 58, margin: 20, marginBottom: 3, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: palette.line, borderRadius: 19, backgroundColor: palette.paper }, regionRail: { gap: 8, paddingHorizontal: 20, paddingVertical: 14 }, regionChip: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, regionChipActive: { borderColor: palette.forest, backgroundColor: palette.forest }, regionChipText: { color: palette.muted, fontSize: 11, fontWeight: '700' }, regionChipTextActive: { color: palette.white }, upcomingNotice: { marginHorizontal: 20, marginBottom: 15, padding: 18, flexDirection: 'row', gap: 12, borderRadius: 20, backgroundColor: '#E9DED0' }, upcomingNoticeBody: { flex: 1 }, upcomingNoticeKicker: { color: '#8B6844', fontSize: 8, fontWeight: '900', letterSpacing: 1 }, upcomingNoticeTitle: { marginTop: 5, color: palette.ink, fontSize: 17, fontWeight: '800' }, upcomingNoticeCopy: { marginTop: 5, color: palette.muted, fontSize: 11, lineHeight: 16 }, upcomingNoticeClose: { color: '#8B6844', fontSize: 24 }, activeCity: { height: 365, marginHorizontal: 20, overflow: 'hidden', borderRadius: 28, backgroundColor: palette.forest }, activeCityImage: { width: '100%', height: '100%' }, activeCityShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(7,31,26,.43)' }, activeCityTop: { position: 'absolute', top: 17, right: 17, left: 17, flexDirection: 'row', justifyContent: 'space-between' }, activeBadge: { paddingHorizontal: 11, paddingVertical: 7, borderRadius: 15, backgroundColor: palette.gold }, activeBadgeText: { color: palette.ink, fontSize: 8, fontWeight: '900', letterSpacing: .8 }, activePlate: { color: palette.white, fontSize: 14, fontWeight: '900' }, activeCityBottom: { position: 'absolute', right: 22, bottom: 22, left: 22 }, activeRegion: { color: '#D7E3DE', fontSize: 9, fontWeight: '900', letterSpacing: 1.1 }, activeCityName: { marginTop: 6, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 39, fontWeight: '600' }, activeCityCopy: { marginTop: 7, color: '#D7E3DE', fontSize: 11 }, activeCityOpen: { marginTop: 17, color: palette.white, fontSize: 12, fontWeight: '900' }, citiesListHeading: { margin: 20, marginTop: 32, marginBottom: 13, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, citiesGrid: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, cityTile: { width: '48%', minHeight: 165, padding: 16, borderRadius: 21, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, cityTileNext: { borderColor: '#C8B18A', backgroundColor: '#F1E8D9' }, cityTileTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, cityTilePlate: { color: palette.muted, fontSize: 10, fontWeight: '900' }, cityStatusDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#C9D1CD' }, cityStatusDotNext: { backgroundColor: palette.gold }, cityTileRegion: { marginTop: 26, color: palette.moss, fontSize: 8, fontWeight: '900', letterSpacing: .8 }, cityTileName: { marginTop: 5, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 21, fontWeight: '600' }, cityTileStatus: { marginTop: 'auto', paddingTop: 13, color: palette.muted, fontSize: 9, fontWeight: '800' }, cityTileStatusNext: { color: '#8B6844' },
  toolkitHeader: { marginTop: 50, padding: 24, borderRadius: 28, backgroundColor: palette.forest }, toolkitTitle: { marginTop: 8, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 32, lineHeight: 37, fontWeight: '600' }, toolkitCopy: { marginTop: 11, color: '#D7E3DE', fontSize: 14, lineHeight: 21 }, moduleHeading: { marginTop: 34, marginBottom: 14, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, moduleTitle: { flex: 1, color: palette.ink, fontSize: 22, fontWeight: '800', letterSpacing: -.5 }, moduleHint: { color: palette.muted, fontSize: 10, fontWeight: '700' }, serviceGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 }, serviceCard: { width: '48%', minHeight: 190, padding: 17, borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, serviceIcon: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: '#E6EFEA' }, serviceIconText: { color: palette.forest, fontSize: 18, fontWeight: '900' }, serviceKind: { marginTop: 18, color: palette.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1 }, serviceName: { marginTop: 5, color: palette.ink, fontSize: 16, fontWeight: '800' }, serviceCopy: { marginTop: 6, color: palette.muted, fontSize: 11, lineHeight: 16 }, serviceOpen: { marginTop: 'auto', paddingTop: 12, color: palette.moss, fontSize: 10, fontWeight: '900' }, venueRail: { gap: 12, paddingRight: 20 }, venueCard: { width: 275, minHeight: 255, padding: 20, borderRadius: 25, backgroundColor: '#E9DED0' }, venueDistrict: { color: '#8A6844', fontSize: 9, fontWeight: '900', letterSpacing: 1.2 }, venueArea: { marginTop: 7, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 27, fontWeight: '600' }, venueCharacter: { marginTop: 8, marginBottom: 19, color: '#6E655B', fontSize: 12, lineHeight: 18 }, venueButton: { height: 44, paddingHorizontal: 14, justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: '#846341' }, venueButtonDark: { marginTop: 8, borderColor: palette.forest, backgroundColor: palette.forest }, venueButtonText: { color: '#765637', fontSize: 11, fontWeight: '900' }, venueButtonTextDark: { color: palette.white }, foodList: { overflow: 'hidden', borderRadius: 24, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, foodRow: { minHeight: 113, padding: 17, flexDirection: 'row', alignItems: 'flex-start', gap: 13, borderTopWidth: 1, borderTopColor: palette.line }, foodNumber: { color: palette.gold, fontSize: 10, fontWeight: '900' }, foodBody: { flex: 1 }, foodDish: { color: palette.ink, fontSize: 18, fontWeight: '800' }, foodArea: { marginTop: 3, color: palette.moss, fontSize: 10, fontWeight: '800' }, foodNote: { marginTop: 7, color: palette.muted, fontSize: 11, lineHeight: 16 }, foodArrow: { color: palette.moss, fontSize: 18 }, routeList: { gap: 11 }, routeCard: { minHeight: 205, padding: 21, borderRadius: 25 }, routeTop: { flexDirection: 'row', justifyContent: 'space-between' }, routeIndex: { color: 'rgba(255,255,255,.58)', fontSize: 11, fontWeight: '900' }, routeDuration: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 13, color: palette.white, fontSize: 9, fontWeight: '900', backgroundColor: 'rgba(255,255,255,.14)' }, routeTitle: { marginTop: 24, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 28, fontWeight: '600' }, routeStops: { marginTop: 8, color: 'rgba(255,255,255,.77)', fontSize: 11, lineHeight: 17 }, routeOpen: { marginTop: 'auto', paddingTop: 17, color: palette.white, fontSize: 11, fontWeight: '900' }, galleryRail: { gap: 12, paddingRight: 20 }, galleryCard: { width: 275, height: 340, overflow: 'hidden', borderRadius: 25, backgroundColor: palette.forest }, galleryImage: { width: '100%', height: '100%' }, galleryShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(7,27,23,.27)' }, galleryCaption: { position: 'absolute', right: 19, bottom: 19, left: 19 }, galleryDistrict: { color: '#D7E3DE', fontSize: 9, fontWeight: '900', letterSpacing: 1 }, galleryTitle: { marginTop: 5, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 25, fontWeight: '600' }, nearbyPanel: { marginTop: 36, padding: 24, borderRadius: 28, backgroundColor: '#DCEAE4' }, nearbyEyebrow: { color: palette.moss, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 }, nearbyTitle: { marginTop: 7, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 28, lineHeight: 33, fontWeight: '600' }, nearbyCopy: { marginTop: 8, color: palette.muted, fontSize: 12, lineHeight: 18 }, nearbyGrid: { marginTop: 19, flexDirection: 'row', flexWrap: 'wrap', gap: 9 }, nearbyButton: { width: '48%', height: 54, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', gap: 9, borderRadius: 17, backgroundColor: palette.paper }, nearbyIcon: { color: palette.gold, fontSize: 18, fontWeight: '900' }, nearbyLabel: { color: palette.ink, fontSize: 11, fontWeight: '800' }, offlineCard: { marginTop: 16, padding: 22, borderRadius: 28, borderWidth: 1, borderColor: '#D6CCBB', backgroundColor: '#F1E8D9' }, offlineTop: { flexDirection: 'row', alignItems: 'flex-start', gap: 15 }, offlineIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: 16, backgroundColor: '#8B6844' }, offlineIconText: { color: palette.white, fontSize: 23, fontWeight: '900' }, offlineBody: { flex: 1 }, offlineEyebrow: { color: '#8B6844', fontSize: 8, fontWeight: '900', letterSpacing: 1.1 }, offlineTitle: { marginTop: 5, color: palette.ink, fontSize: 20, fontWeight: '800' }, offlineCopy: { marginTop: 7, color: palette.muted, fontSize: 11, lineHeight: 17 }, offlineButton: { height: 53, marginTop: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 17, backgroundColor: '#8B6844' }, offlineButtonReady: { borderWidth: 1, borderColor: '#6B8B7C', backgroundColor: '#E3EDE8' }, offlineButtonText: { color: palette.white, fontSize: 12, fontWeight: '900' }, offlineButtonTextReady: { color: palette.forest },
  spacedEyebrow: { marginTop: 42 }, cityRail: { gap: 12, paddingTop: 18, paddingRight: 20 }, comingCity: { width: 190, height: 205, padding: 20, justifyContent: 'flex-end', borderRadius: 25 }, comingRegion: { color: 'rgba(255,255,255,.75)', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 }, comingName: { marginTop: 6, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 28, fontWeight: '600' }, comingSoon: { marginTop: 20, color: palette.white, fontSize: 12, fontWeight: '800' },
  tabBar: { position: 'absolute', right: 12, bottom: 10, left: 12, height: 76, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,.12)', backgroundColor: palette.forest, shadowColor: '#0B211C', shadowOffset: { width: 0, height: 12 }, shadowOpacity: .28, shadowRadius: 22, elevation: 15 }, tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 }, tabIcon: { color: '#AFC2BB', fontSize: 25, fontWeight: '700' }, tabLabel: { color: '#AFC2BB', fontSize: 10, fontWeight: '700' }, tabActive: { color: palette.white }, tabBadge: { position: 'absolute', top: -4, right: -10, minWidth: 17, height: 17, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 9, backgroundColor: palette.gold }, tabBadgeText: { color: palette.ink, fontSize: 9, fontWeight: '900' },
  plainPage: { flex: 1, backgroundColor: palette.cream }, plainHeader: { padding: 22, paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 28 : 32, paddingBottom: 20 }, plainCopy: { marginTop: 12, color: palette.muted, fontSize: 15, lineHeight: 23 }, favoriteList: { padding: 20, paddingTop: 8, paddingBottom: 120, gap: 15 }, empty: { paddingVertical: 70, alignItems: 'center' }, emptyIcon: { color: palette.moss, fontSize: 48 }, emptyTitle: { marginTop: 12, color: palette.ink, fontSize: 20, fontWeight: '800' }, emptyCopy: { marginTop: 7, color: palette.muted, textAlign: 'center' }, statRow: { marginTop: 30, flexDirection: 'row', gap: 8 }, stat: { flex: 1, padding: 15, borderRadius: 18, backgroundColor: palette.paper, borderWidth: 1, borderColor: palette.line }, statNumber: { color: palette.forest, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 30, fontWeight: '600' }, statLabel: { marginTop: 4, color: palette.muted, fontSize: 10, fontWeight: '700' }, roadmap: { marginTop: 28, padding: 20, borderRadius: 24, backgroundColor: palette.forest }, roadmapTitle: { marginBottom: 10, color: palette.white, fontSize: 21, fontWeight: '800' }, roadmapItem: { paddingVertical: 15, flexDirection: 'row', alignItems: 'center', gap: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,.12)' }, roadmapIndex: { color: palette.gold, fontSize: 11, fontWeight: '900' }, roadmapText: { color: palette.white, fontSize: 14, fontWeight: '700' }, planContent: { padding: 20, paddingTop: 4, paddingBottom: 120, gap: 11 }, planDistrict: { padding: 14, flexDirection: 'row', alignItems: 'center', gap: 13, borderRadius: 20, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, planNumber: { width: 46, height: 46, alignItems: 'center', justifyContent: 'center', borderRadius: 15 }, planSpiritual: { backgroundColor: '#8B6844' }, planNumberText: { color: palette.white, fontSize: 11, fontWeight: '900' }, planDistrictBody: { flex: 1 }, planDistrictName: { color: palette.ink, fontSize: 17, fontWeight: '800' }, planDistrictCopy: { marginTop: 3, color: palette.muted, fontSize: 11 }, planRemove: { padding: 5, color: '#A85448', fontSize: 25 }, planRouteButton: { height: 58, marginTop: 8, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: palette.forest }, planRouteText: { color: palette.white, fontSize: 14, fontWeight: '900' },
  modal: { flex: 1, backgroundColor: palette.cream }, modalImage: { width: '100%', height: 350 }, modalShade: { position: 'absolute', top: 0, right: 0, left: 0, height: 160, backgroundColor: 'rgba(7,31,26,.22)' }, modalSafe: { position: 'absolute', inset: 0 }, modalActions: { padding: 18, flexDirection: 'row', justifyContent: 'space-between' }, modalRound: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: 'rgba(255,255,255,.94)' }, modalRoundText: { color: palette.forest, fontSize: 24, fontWeight: '600' }, modalBody: { flex: 1, marginTop: 235, padding: 24, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: palette.cream }, modalMeta: { color: palette.moss, fontSize: 11, fontWeight: '900', letterSpacing: 1.2 }, modalTitle: { marginTop: 9, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 36, lineHeight: 41, fontWeight: '600' }, modalCopy: { marginTop: 13, color: palette.muted, fontSize: 16, lineHeight: 24 }, infoCard: { marginTop: 25, padding: 20, borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, infoLabel: { color: palette.gold, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 }, infoTitle: { marginTop: 7, color: palette.ink, fontSize: 18, fontWeight: '800' }, infoCopy: { marginTop: 6, color: palette.muted, fontSize: 13, lineHeight: 19 }, primaryButton: { height: 56, marginTop: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: palette.forest }, primaryButtonText: { color: palette.white, fontSize: 15, fontWeight: '900' },
  districtModal: { flex: 1 }, districtModalTop: { padding: 24, paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 20 : 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }, districtModalKicker: { color: 'rgba(255,255,255,.65)', fontSize: 10, fontWeight: '900', letterSpacing: 1.3 }, districtModalTitle: { marginTop: 8, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 42, fontWeight: '600', letterSpacing: -1.3 }, districtClose: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: 'rgba(255,255,255,.15)' }, districtCloseText: { color: palette.white, fontSize: 27 }, districtModalSignature: { paddingHorizontal: 24, paddingBottom: 24, color: 'rgba(255,255,255,.82)', fontSize: 16, lineHeight: 23 }, districtModalScroll: { padding: 14, paddingBottom: 40, gap: 12 }, addPlanButton: { height: 53, alignItems: 'center', justifyContent: 'center', borderRadius: 19, borderWidth: 1, borderColor: 'rgba(255,255,255,.45)', backgroundColor: 'rgba(255,255,255,.1)' }, addPlanButtonActive: { borderColor: palette.gold, backgroundColor: palette.gold }, addPlanText: { color: palette.white, fontSize: 13, fontWeight: '900' }, addPlanTextActive: { color: palette.ink }, districtPanel: { padding: 21, borderRadius: 24, backgroundColor: palette.paper }, districtPanelLabel: { marginBottom: 12, color: palette.moss, fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, districtListItem: { minHeight: 52, paddingVertical: 13, flexDirection: 'row', alignItems: 'center', gap: 13, borderTopWidth: 1, borderTopColor: palette.line }, districtListIndex: { color: palette.gold, fontSize: 10, fontWeight: '900' }, districtListText: { flex: 1, color: palette.ink, fontSize: 15, fontWeight: '700' }, districtListArrow: { color: palette.moss, fontSize: 17, fontWeight: '800' }, flavorWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, flavorChip: { paddingHorizontal: 13, paddingVertical: 10, borderRadius: 18, backgroundColor: palette.cream }, flavorText: { color: palette.ink, fontSize: 12, fontWeight: '700' }, districtMapButton: { height: 57, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: palette.gold }, districtMapText: { color: palette.ink, fontSize: 14, fontWeight: '900' }, sourceNote: { paddingHorizontal: 10, color: 'rgba(255,255,255,.7)', fontSize: 11, lineHeight: 17, textAlign: 'center' },
  spiritualModal: { flex: 1, backgroundColor: '#F5EFE4' }, spiritualModalHero: { height: 360, backgroundColor: '#6D5135' }, spiritualModalImage: { width: '100%', height: '100%' }, spiritualModalImageShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(10,22,18,.42)' }, spiritualModalTop: { position: 'absolute', right: 0, bottom: 0, left: 0, padding: 24, paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 22 : 30, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }, spiritualModalKicker: { color: '#F0DFC3', fontSize: 10, fontWeight: '900', letterSpacing: 1.2 }, spiritualModalTitle: { maxWidth: 300, marginTop: 9, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 35, lineHeight: 40, fontWeight: '600' }, spiritualClose: { position: 'absolute', top: 22, right: 20, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: 'rgba(255,255,255,.18)' }, spiritualCloseText: { color: palette.white, fontSize: 27 }, spiritualModalScroll: { padding: 22, paddingBottom: 45, gap: 15 }, photoCredit: { paddingBottom: 13, borderBottomWidth: 1, borderBottomColor: '#DED5C6' }, photoCreditLabel: { color: '#896B47', fontSize: 8, fontWeight: '900', letterSpacing: 1 }, photoCreditText: { marginTop: 4, color: '#70583E', fontSize: 11, fontWeight: '700' }, spiritualPeriod: { alignSelf: 'flex-start', paddingHorizontal: 13, paddingVertical: 9, borderRadius: 18, backgroundColor: '#E8DCC8' }, spiritualPeriodLabel: { color: '#896B47', fontSize: 8, fontWeight: '900', letterSpacing: 1 }, spiritualPeriodText: { marginTop: 3, color: palette.ink, fontSize: 12, fontWeight: '700' }, spiritualModalCopy: { color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 21, lineHeight: 31 }, etiquetteCard: { padding: 19, borderLeftWidth: 4, borderLeftColor: '#9B754C', borderRadius: 18, backgroundColor: palette.paper }, etiquetteLabel: { color: '#8B6844', fontSize: 9, fontWeight: '900', letterSpacing: 1.1 }, etiquetteText: { marginTop: 8, color: palette.muted, fontSize: 14, lineHeight: 21 }, spiritualPlanButton: { height: 54, alignItems: 'center', justifyContent: 'center', borderRadius: 18, borderWidth: 1, borderColor: '#8B6844' }, spiritualPlanButtonActive: { backgroundColor: '#8B6844' }, spiritualPlanText: { color: '#7A5A38', fontSize: 13, fontWeight: '900' }, spiritualPlanTextActive: { color: palette.white }, spiritualMapButton: { height: 57, alignItems: 'center', justifyContent: 'center', borderRadius: 19, backgroundColor: palette.forest }, spiritualMapText: { color: palette.white, fontSize: 14, fontWeight: '900' }, sourceButton: { minHeight: 44, alignItems: 'center', justifyContent: 'center' }, sourceButtonText: { color: '#76583B', fontSize: 12, fontWeight: '800' },
  istanbulBeachEntry: { minHeight: 112, marginBottom: 18, padding: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 24, backgroundColor: '#DDEDEB', borderWidth: 1, borderColor: '#BED8D3' },
  istanbulBeachEntryEyebrow: { color: palette.moss, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 },
  istanbulBeachEntryTitle: { marginTop: 5, color: palette.forest, fontSize: 22, fontWeight: '900' },
  istanbulBeachEntryCopy: { maxWidth: 265, marginTop: 6, color: palette.muted, fontSize: 12, lineHeight: 17 },
  istanbulBeachEntryArrow: { color: palette.forest, fontSize: 27, fontWeight: '800' },
  istanbulBeachTop: { padding: 22, paddingTop: 30, paddingBottom: 28, backgroundColor: '#153E35' },
  istanbulBeachBack: { minHeight: 44, alignSelf: 'flex-start', paddingHorizontal: 14, alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: 'rgba(255,255,255,.12)' },
  istanbulBeachBackText: { color: palette.white, fontSize: 12, fontWeight: '800' },
  istanbulBeachKicker: { marginTop: 26, color: '#A9D5CA', fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  istanbulBeachTitle: { marginTop: 8, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 43, lineHeight: 47, fontWeight: '600' },
  istanbulBeachIntro: { marginTop: 12, maxWidth: 590, color: 'rgba(255,255,255,.76)', fontSize: 14, lineHeight: 21 },
  istanbulBeachDataNote: { marginTop: 24, padding: 19, borderRadius: 21, borderWidth: 1, borderColor: '#D7DDD7', backgroundColor: '#F8F4EB' },
  istanbulBeachDataTitle: { color: palette.ink, fontSize: 14, fontWeight: '900' },
  istanbulBeachDataCopy: { marginTop: 7, color: palette.muted, fontSize: 12, lineHeight: 18 },
  istanbulSeaWarning: { marginTop: 18, padding: 15, borderRadius: 16, backgroundColor: '#FFF1D8', borderWidth: 1, borderColor: '#E6C98E' },
  istanbulSeaWarningText: { color: '#72531F', fontSize: 12, lineHeight: 18, fontWeight: '800' },
  beachSection: { paddingTop: 4, paddingBottom: 24 },
  beachHero: { marginBottom: 22, padding: 22, borderRadius: 26, backgroundColor: '#DDEDEB', borderWidth: 1, borderColor: '#C7DEDA' },
  beachHeroEyebrow: { color: palette.moss, fontSize: 10, fontWeight: '900', letterSpacing: 1.4 },
  beachHeroTitle: { marginTop: 7, color: palette.forest, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 31, lineHeight: 37, fontWeight: '600' },
  beachHeroCopy: { marginTop: 9, maxWidth: 620, color: palette.muted, fontSize: 14, lineHeight: 21 },
  beachFilterLabel: { marginTop: 4, marginBottom: 8, color: palette.moss, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 },
  beachFilterRail: { paddingRight: 18, paddingBottom: 14, gap: 8 },
  beachFilterChip: { minHeight: 44, paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  beachFilterChipActive: { borderColor: palette.forest, backgroundColor: palette.forest },
  beachFilterText: { color: palette.muted, fontSize: 12, fontWeight: '800' },
  beachFilterTextActive: { color: palette.white },
  blueFlagFilterActive: { borderColor: '#C4942D', backgroundColor: '#A97610' },
  placeholderBadge: { position: 'absolute', bottom: 10, left: 10, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 12, backgroundColor: 'rgba(7,31,26,.78)' },
  placeholderBadgeText: { color: palette.white, fontSize: 8, fontWeight: '900', letterSpacing: .5 },
  beachArea: { marginTop: 4, color: palette.moss, fontSize: 12, fontWeight: '700' },
  beachTags: { marginTop: 11, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  beachTag: { paddingHorizontal: 9, paddingVertical: 6, borderRadius: 13, backgroundColor: '#E9F1ED' },
  beachTagText: { color: palette.forest, fontSize: 9, fontWeight: '800' },
  cardOpen: { marginTop: 12, color: palette.moss, fontSize: 12, fontWeight: '900' },
  beachModal: { flex: 1, backgroundColor: palette.cream },
  beachModalHero: { height: 290, backgroundColor: '#BDD6D2' },
  beachModalImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  beachModalShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(7,31,26,.16)' },
  beachModalActions: { position: 'absolute', top: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 8 : 18, right: 18, left: 18, flexDirection: 'row', justifyContent: 'space-between' },
  beachModalCaption: { position: 'absolute', right: 16, bottom: 14, left: 16, paddingHorizontal: 10, paddingVertical: 7, alignItems: 'center', borderRadius: 12, backgroundColor: 'rgba(7,31,26,.76)' },
  beachModalScroll: { padding: 22, paddingBottom: 48 },
  beachModalTitle: { marginTop: 8, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 32, lineHeight: 38, fontWeight: '600' },
  beachLocation: { marginTop: 8, color: palette.moss, fontSize: 13, fontWeight: '800' },
  blueFlagBanner: { marginTop: 18, paddingHorizontal: 15, paddingVertical: 13, borderRadius: 16, backgroundColor: '#EAF3F8', borderWidth: 1, borderColor: '#B8D5E3' },
  blueFlagBannerText: { color: '#145F83', fontSize: 12, fontWeight: '900' },
  beachFeaturesTitle: { marginTop: 26, marginBottom: 13, color: palette.ink, fontSize: 20, fontWeight: '900' },
  beachFeatureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  beachFeature: { width: '48%', minHeight: 72, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 9, borderRadius: 17, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  beachFeatureIcon: { width: 24, fontSize: 17, textAlign: 'center' },
  beachFeatureBody: { flex: 1 },
  beachFeatureLabel: { color: palette.muted, fontSize: 9, fontWeight: '800' },
  beachFeatureValue: { marginTop: 4, color: palette.ink, fontSize: 11, lineHeight: 15, fontWeight: '800' },
  nearbyStatus: { marginTop: 10, color: palette.moss, fontSize: 11, fontWeight: '800' },
  offlineError: { marginTop: 13, color: '#A04432', fontSize: 11, lineHeight: 16, fontWeight: '700' },
  istanbulDistrictPlan: { marginTop: 14, minHeight: 38, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 13, borderWidth: 1, borderColor: 'rgba(255,255,255,.42)' },
  istanbulDistrictPlanActive: { backgroundColor: 'rgba(255,255,255,.16)' },
  istanbulDistrictPlanText: { color: palette.white, fontSize: 10, fontWeight: '900' },
  districtServiceGrid: { marginTop: 12, flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  districtServiceButton: { width: '48%', minHeight: 48, paddingHorizontal: 11, flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 14, backgroundColor: '#EEF3F0' },
  districtServiceIcon: { width: 20, color: palette.gold, fontSize: 14, fontWeight: '900', textAlign: 'center' },
  districtServiceText: { flex: 1, color: palette.ink, fontSize: 10, fontWeight: '800' },
  profileContent: { padding: 22, paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 28 : 32, paddingBottom: 120 },
  profileCard: { marginTop: 24, padding: 20, borderRadius: 24, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  profileLabel: { marginBottom: 9, color: palette.moss, fontSize: 9, fontWeight: '900', letterSpacing: 1.1 },
  profileInput: { height: 52, marginBottom: 22, paddingHorizontal: 15, borderRadius: 16, borderWidth: 1, borderColor: palette.line, color: palette.ink, backgroundColor: palette.white, fontSize: 16, fontWeight: '700' },
  profileChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  profileChip: { paddingHorizontal: 13, paddingVertical: 10, borderRadius: 18, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.white },
  profileChipActive: { borderColor: palette.forest, backgroundColor: palette.forest },
  profileChipText: { color: palette.muted, fontSize: 10, fontWeight: '800' },
  profileChipTextActive: { color: palette.white },
  profileOfflineBody: { flex: 1 },
  profileOfflineText: { marginTop: 3, color: '#AFC2BB', fontSize: 10 },
  profileStatus: { color: '#AFC2BB', fontSize: 20, fontWeight: '900' },
  profileStatusReady: { color: palette.gold },
  profileNote: { marginTop: 20, padding: 18, borderRadius: 20, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  profileNoteTitle: { color: palette.ink, fontSize: 16, fontWeight: '900' },
  profileNoteText: { marginTop: 7, color: palette.muted, fontSize: 12, lineHeight: 18 },
  menuBackdrop: { flex: 1, alignItems: 'flex-end', backgroundColor: 'rgba(7,31,26,.56)' },
  menuSheet: { width: '90%', maxWidth: 390, height: '100%', padding: 22, paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 20 : 28, backgroundColor: palette.cream, shadowColor: '#071F1A', shadowOffset: { width: -12, height: 0 }, shadowOpacity: .28, shadowRadius: 24, elevation: 20 },
  menuHeader: { marginBottom: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuKicker: { color: palette.moss, fontSize: 8, fontWeight: '900', letterSpacing: 1.1 },
  menuTitle: { marginTop: 5, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 35, fontWeight: '600' },
  menuClose: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  menuCloseText: { color: palette.ink, fontSize: 28, lineHeight: 30 },
  menuSectionLabel: { marginTop: 12, marginBottom: 10, color: palette.moss, fontSize: 9, fontWeight: '900', letterSpacing: 1.2 },
  menuCityRow: { marginBottom: 18, flexDirection: 'row', gap: 9 },
  menuCity: { flex: 1, minHeight: 78, padding: 14, borderRadius: 18, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  menuCityActive: { borderColor: palette.gold, backgroundColor: '#F2E4CB' },
  menuCityPlate: { color: palette.gold, fontSize: 10, fontWeight: '900' },
  menuCityName: { marginTop: 8, color: palette.ink, fontSize: 18, fontWeight: '900' },
  menuLink: { minHeight: 56, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderTopWidth: 1, borderTopColor: palette.line },
  menuLinkIcon: { width: 25, color: palette.moss, fontSize: 22, textAlign: 'center' },
  menuLinkText: { flex: 1, color: palette.ink, fontSize: 15, fontWeight: '800' },
  menuLinkCount: { minWidth: 24, paddingHorizontal: 7, paddingVertical: 4, overflow: 'hidden', borderRadius: 12, color: palette.ink, backgroundColor: palette.gold, fontSize: 9, fontWeight: '900', textAlign: 'center' },
  menuLinkArrow: { color: palette.muted, fontSize: 24 },
  menuFooter: { marginTop: 'auto', paddingTop: 20, color: palette.muted, fontSize: 10, textAlign: 'center' },
  izmirPremiumHero: { width: 'auto', maxWidth: 1380, alignSelf: 'stretch', borderRadius: 26 },
  izmirPremiumHeroDesktop: { height: 420, marginTop: 18 },
  izmirPremiumHeroMobile: { height: 300, marginHorizontal: 10 },
  izmirPremiumHeroShade: { backgroundColor: 'rgba(7,25,28,.38)' },
  izmirPremiumHeroBody: { alignItems: 'center', paddingBottom: 38 },
  izmirPremiumHeroTitle: { fontSize: 72, letterSpacing: 2 },
  izmirHeroSubtitle: { marginTop: 4, color: '#F2D6A4', fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 20, fontWeight: '600' },
  izmirPremiumHeroCopy: { maxWidth: 520, textAlign: 'center' },
  izmirGuideNav: { width: '100%', maxWidth: 1380, alignSelf: 'center', marginTop: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: palette.line, borderRadius: 18, backgroundColor: palette.paper, zIndex: 4 },
  izmirGuideNavDesktop: { marginTop: 14, paddingHorizontal: 8 },
  izmirGuideNavRail: { gap: 8, paddingVertical: 9, paddingRight: 12 },
  izmirGuideNavRailDesktop: { flexGrow: 1, paddingRight: 0 },
  izmirGuideNavItem: { minHeight: 50, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 14, borderWidth: 1, borderColor: 'transparent', backgroundColor: palette.paper },
  izmirGuideNavItemDesktop: { flex: 1, minHeight: 58, paddingHorizontal: 12 },
  izmirGuideNavItemActive: { borderColor: palette.forest, backgroundColor: palette.forest },
  izmirGuideNavText: { color: palette.muted, fontSize: 11, fontWeight: '900' },
  izmirGuideNavTextDesktop: { color: palette.forest, fontSize: 11, letterSpacing: .2 },
  izmirGuideNavTextActive: { color: palette.white },
  izmirPremiumBody: { width: '100%', maxWidth: 1280, alignSelf: 'center' },
  izmirBreadcrumb: { marginTop: 30, marginBottom: 24, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 14 },
  izmirBreadcrumbBack: { minWidth: 140, height: 44, paddingHorizontal: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 20, borderWidth: 1, borderColor: palette.moss, backgroundColor: palette.paper },
  izmirBreadcrumbBackText: { color: palette.forest, fontSize: 11, lineHeight: 16, fontWeight: '900' },
  izmirBreadcrumbBackGap: { letterSpacing: 3 },
  izmirBreadcrumbCurrent: { flexGrow: 1, flexShrink: 0, color: palette.muted, fontSize: 11, fontWeight: '800' },
  izmirOverviewIntro: { maxWidth: 760, marginTop: 38, marginBottom: 8 },
  izmirOverviewTitleDesktop: { fontSize: 38, lineHeight: 45 },
  izmirOverviewCopy: { marginTop: 7, color: palette.muted, fontSize: 15, lineHeight: 23 },
  izmirDashboard: { marginTop: 24, flexDirection: 'row', flexWrap: 'wrap', gap: 18 },
  izmirDashboardDesktop: { flexWrap: 'nowrap', alignItems: 'stretch', gap: 20 },
  izmirDashboardPanel: { flexGrow: 1, flexBasis: 280, padding: 22, borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper, shadowColor: '#153E35', shadowOffset: { width: 0, height: 8 }, shadowOpacity: .06, shadowRadius: 18, elevation: 2 },
  izmirDashboardSide: { flexGrow: 0, flexShrink: 1, flexBasis: '24%' },
  izmirDashboardCenter: { flexGrow: 1, flexShrink: 1, flexBasis: '48%' },
  izmirDashboardTabletHalf: { flexBasis: '47%' },
  izmirDashboardTabletFull: { flexBasis: '100%' },
  izmirFactsPanel: { backgroundColor: '#F8F3E9' },
  izmirFeaturedPanel: { backgroundColor: palette.paper },
  izmirPopularPanel: { backgroundColor: '#EEF3EF' },
  izmirPanelEyebrow: { marginBottom: 16, color: palette.moss, fontSize: 10, fontWeight: '900', letterSpacing: 1.3 },
  izmirFactsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  izmirFact: { width: '47%', minHeight: 82, padding: 12, justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: '#E9E0D1', backgroundColor: palette.paper },
  izmirFactValue: { color: palette.ink, fontSize: 23, fontWeight: '900' },
  izmirFactLabel: { marginTop: 4, color: palette.moss, fontSize: 9, fontWeight: '900', textTransform: 'uppercase' },
  izmirFactNote: { marginTop: 3, color: palette.muted, fontSize: 8, fontWeight: '700' },
  izmirFactsFootnote: { marginTop: 12, color: palette.muted, fontSize: 8, lineHeight: 13 },
  izmirPopularList: { gap: 9 },
  izmirPopularButton: { minHeight: 58, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 14, borderWidth: 1, borderColor: '#D7E2DC', backgroundColor: palette.paper },
  izmirPopularText: { color: palette.ink, fontSize: 11, fontWeight: '900' },
  izmirPopularArrow: { color: palette.gold, fontSize: 18, fontWeight: '900' },
  izmirFeaturedGrid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  izmirFeaturedCard: { width: '48%', minHeight: 150, overflow: 'hidden', borderRadius: 16, backgroundColor: palette.forest },
  izmirFeaturedImage: { position: 'absolute', inset: 0, width: '100%', height: '100%' },
  izmirFeaturedShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(7,31,26,.38)' },
  izmirFeaturedBody: { flex: 1, padding: 13, justifyContent: 'flex-end' },
  izmirFeaturedDistrict: { color: palette.gold, fontSize: 9, fontWeight: '900', letterSpacing: 1 },
  izmirFeaturedName: { marginTop: 4, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 17, lineHeight: 21, fontWeight: '600' },
  izmirGuideHeading: { marginTop: 54, marginBottom: 20 },
  izmirGuideHeadingTitle: { fontSize: 34, lineHeight: 41 },
  izmirCategoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  izmirCategoryGridDesktop: { gap: 20 },
  izmirCategoryCard: { width: '100%', minHeight: 150, padding: 22, flexDirection: 'row', alignItems: 'center', gap: 18, borderRadius: 22, borderWidth: 1, borderColor: 'rgba(21,62,53,.10)', shadowColor: '#153E35', shadowOffset: { width: 0, height: 7 }, shadowOpacity: .06, shadowRadius: 14, elevation: 2 },
  izmirCategoryCardDesktop: { width: '48.8%', minHeight: 165, padding: 26 },
  izmirCategoryIcon: { width: 42, fontSize: 29, fontWeight: '900', textAlign: 'center' },
  izmirCategoryContent: { flex: 1 },
  izmirCategoryTitle: { color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 23, lineHeight: 28, fontWeight: '600' },
  izmirCategoryCopy: { marginTop: 7, color: palette.muted, fontSize: 12, lineHeight: 18 },
  izmirCategoryOpen: { color: palette.moss, fontSize: 24, fontWeight: '600' },
  izmirCategoryTextLight: { color: palette.white },
  izmirCategoryCopyLight: { color: 'rgba(255,255,255,.74)' },
  izmirFoodIntro: { maxWidth: 760, marginBottom: 20 },
  izmirFoodTitleDesktop: { fontSize: 36, lineHeight: 43 },
  izmirFoodTabs: { minWidth: '100%', gap: 8, paddingBottom: 4 },
  izmirFoodTabsDesktop: { gap: 10 },
  izmirFoodTab: { minWidth: 170, minHeight: 50, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper },
  izmirFoodTabDesktop: { flex: 1, minHeight: 54 },
  izmirFoodTabActive: { borderColor: palette.forest, backgroundColor: palette.forest },
  izmirFoodTabText: { color: palette.forest, fontSize: 11, fontWeight: '900' },
  izmirFoodTabTextActive: { color: palette.cream },
  izmirNightlifeSection: { marginTop: 4, paddingBottom: 8 },
  izmirNightlifeIntro: { marginTop: 8, maxWidth: 650, color: palette.muted, fontSize: 13, lineHeight: 20 },
  izmirNightlifeCard: { borderColor: '#C8D8D0', backgroundColor: '#F8F5EC' },
  izmirDistrictGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  izmirDistrictCard: { flexGrow: 1, flexBasis: 240, width: 'auto', minHeight: 224 },
  disabledButton: { opacity: .48 },
  beachSafetyNote: { marginTop: 12, color: palette.muted, fontSize: 11, lineHeight: 17, textAlign: 'center' },
});
