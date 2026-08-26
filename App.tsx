import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useMemo, useState } from 'react';
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
  View,
} from 'react-native';
import { bursa, bursaDistricts, comingCities, spiritualSites, type Category, type District, type Place, type SpiritualSite } from './src/data';
import { bursaGuideModules, type DailyRoute } from './src/guideData';
import { regions, turkeyCities, type Region } from './src/cities';

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
type ExploreCategory = 'Tümü' | Category | 'Manevi';
const categories: ExploreCategory[] = ['Tümü', 'Tarih', 'Doğa', 'Lezzet', 'Sahil', 'Manevi'];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [category, setCategory] = useState<ExploreCategory>('Tümü');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['uludag']);
  const [selected, setSelected] = useState<Place | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [plannedDistricts, setPlannedDistricts] = useState<string[]>([]);
  const [selectedSpiritual, setSelectedSpiritual] = useState<SpiritualSite | null>(null);
  const [plannedSpiritual, setPlannedSpiritual] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem('turkiye-rehberi-favoriler').then(value => {
      if (value) setFavorites(JSON.parse(value));
    }).catch(() => {});
    AsyncStorage.getItem('turkiye-rehberi-ilce-plani').then(value => {
      if (value) setPlannedDistricts(JSON.parse(value));
    }).catch(() => {});
    AsyncStorage.getItem('turkiye-rehberi-manevi-plan').then(value => {
      if (value) setPlannedSpiritual(JSON.parse(value));
    }).catch(() => {});
  }, []);

  const filteredPlaces = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('tr-TR');
    return bursa.places.filter(place => {
      const categoryMatch = category === 'Tümü' || (category !== 'Manevi' && place.category === category);
      const text = `${place.name} ${place.district} ${place.category}`.toLocaleLowerCase('tr-TR');
      return categoryMatch && (!normalized || text.includes(normalized));
    });
  }, [category, query]);

  const favoritePlaces = bursa.places.filter(place => favorites.includes(place.id));
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

  const content = tab === 'plan'
    ? <PlanScreen districtNames={plannedDistricts} spiritualIds={plannedSpiritual} onRemoveDistrict={toggleDistrictPlan} onRemoveSpiritual={toggleSpiritualPlan} />
    : tab === 'favorites'
    ? <Favorites places={favoritePlaces} onOpen={setSelected} onRemove={toggleFavorite} />
    : tab === 'profile'
      ? <Profile />
      : tab === 'explore'
        ? <CitiesExplore onOpenBursa={() => setTab('home')} />
      : <MainContent
          exploreOnly={false}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          places={filteredPlaces}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onOpen={setSelected}
          onDistrictOpen={setSelectedDistrict}
          onSpiritualOpen={setSelectedSpiritual}
        />;

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {content}
      <BottomTabs tab={tab} setTab={setTab} favoriteCount={favorites.length} planCount={plannedDistricts.length + plannedSpiritual.length} />
      <PlaceModal place={selected} favorite={selected ? favorites.includes(selected.id) : false} onClose={() => setSelected(null)} onFavorite={toggleFavorite} />
      <DistrictModal district={selectedDistrict} planned={selectedDistrict ? plannedDistricts.includes(selectedDistrict.name) : false} onClose={() => setSelectedDistrict(null)} onTogglePlan={toggleDistrictPlan} />
      <SpiritualModal site={selectedSpiritual} planned={selectedSpiritual ? plannedSpiritual.includes(selectedSpiritual.id) : false} onClose={() => setSelectedSpiritual(null)} onTogglePlan={toggleSpiritualPlan} />
    </View>
  );
}

function CitiesExplore({ onOpenBursa }: { onOpenBursa: () => void }) {
  const [cityQuery, setCityQuery] = useState('');
  const [region, setRegion] = useState<'Tümü' | Region>('Tümü');
  const [upcoming, setUpcoming] = useState<string | null>(null);
  const normalized = cityQuery.trim().toLocaleLowerCase('tr-TR');
  const cities = turkeyCities.filter(city => (region === 'Tümü' || city.region === region) && (!normalized || `${city.name} ${city.region} ${city.plate}`.toLocaleLowerCase('tr-TR').includes(normalized)));
  return <SafeAreaView style={styles.citiesPage}><ScrollView contentContainerStyle={styles.citiesContent} showsVerticalScrollIndicator={false}>
    <View style={styles.citiesHero}><View style={styles.citiesBrand}><View style={styles.brandMark}><Text style={styles.brandMarkText}>TR</Text></View><Text style={styles.citiesBrandText}>Türkiye Rehberi</Text></View><Text style={styles.citiesKicker}>81 İL · 7 BÖLGE</Text><Text style={styles.citiesTitle}>Türkiye’yi{`\n`}şehir şehir keşfet.</Text><Text style={styles.citiesCopy}>Bir bölge seç, şehirleri ara ve kendi Türkiye rotanı oluşturmaya başla.</Text><View style={styles.citiesStats}><View><Text style={styles.citiesStatNumber}>81</Text><Text style={styles.citiesStatLabel}>Şehir</Text></View><View style={styles.citiesStatLine} /><View><Text style={styles.citiesStatNumber}>7</Text><Text style={styles.citiesStatLabel}>Bölge</Text></View><View style={styles.citiesStatLine} /><View><Text style={styles.citiesStatNumber}>01</Text><Text style={styles.citiesStatLabel}>Hazır rehber</Text></View></View></View>

    <View style={styles.citySearch}><Text style={styles.searchIcon}>⌕</Text><TextInput value={cityQuery} onChangeText={setCityQuery} placeholder="Şehir, bölge veya plaka ara" placeholderTextColor="#8A9691" style={styles.searchInput} /></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.regionRail}>{regions.map(item => <Pressable key={item} onPress={() => setRegion(item)} style={[styles.regionChip, region === item && styles.regionChipActive]}><Text style={[styles.regionChipText, region === item && styles.regionChipTextActive]}>{item}</Text></Pressable>)}</ScrollView>

    {upcoming && <View style={styles.upcomingNotice}><View style={styles.upcomingNoticeBody}><Text style={styles.upcomingNoticeKicker}>SIRADAKİ ŞEHİRLERDEN</Text><Text style={styles.upcomingNoticeTitle}>{upcoming} rehberi hazırlanıyor</Text><Text style={styles.upcomingNoticeCopy}>Bursa için kurduğumuz bütün modüller bu şehre de uygulanacak.</Text></View><Pressable onPress={() => setUpcoming(null)}><Text style={styles.upcomingNoticeClose}>×</Text></Pressable></View>}

    {(region === 'Tümü' || region === 'Marmara') && (!normalized || 'bursa marmara 16'.includes(normalized)) && <Pressable onPress={onOpenBursa} style={styles.activeCity}><Image source={bursa.hero} style={styles.activeCityImage} /><View style={styles.activeCityShade} /><View style={styles.activeCityTop}><View style={styles.activeBadge}><Text style={styles.activeBadgeText}>YAYINDA</Text></View><Text style={styles.activePlate}>16</Text></View><View style={styles.activeCityBottom}><Text style={styles.activeRegion}>MARMARA BÖLGESİ</Text><Text style={styles.activeCityName}>Bursa</Text><Text style={styles.activeCityCopy}>17 ilçe · tarih · doğa · lezzet · manevi miras</Text><Text style={styles.activeCityOpen}>Şehir rehberini aç  →</Text></View></Pressable>}

    <View style={styles.citiesListHeading}><Text style={styles.moduleTitle}>{region === 'Tümü' ? 'Tüm şehirler' : `${region} şehirleri`}</Text><Text style={styles.moduleHint}>{cities.length} il</Text></View>
    <View style={styles.citiesGrid}>{cities.filter(city => city.name !== 'Bursa').map(city => <Pressable key={city.plate} onPress={() => city.status === 'next' && setUpcoming(city.name)} style={[styles.cityTile, city.status === 'next' && styles.cityTileNext]}><View style={styles.cityTileTop}><Text style={styles.cityTilePlate}>{String(city.plate).padStart(2, '0')}</Text><View style={[styles.cityStatusDot, city.status === 'next' && styles.cityStatusDotNext]} /></View><Text style={styles.cityTileRegion}>{city.region.toUpperCase()}</Text><Text style={styles.cityTileName}>{city.name}</Text><Text style={[styles.cityTileStatus, city.status === 'next' && styles.cityTileStatusNext]}>{city.status === 'next' ? 'Sıradaki şehir  →' : 'Planlandı'}</Text></Pressable>)}</View>
    {!cities.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>Şehir bulunamadı</Text><Text style={styles.emptyCopy}>Farklı bir şehir, bölge veya plaka numarası deneyin.</Text></View>}
  </ScrollView></SafeAreaView>;
}

function MainContent({ exploreOnly, query, setQuery, category, setCategory, places, favorites, onFavorite, onOpen, onDistrictOpen, onSpiritualOpen }: {
  exploreOnly: boolean;
  query: string;
  setQuery: (value: string) => void;
  category: ExploreCategory;
  setCategory: (value: ExploreCategory) => void;
  places: Place[];
  favorites: string[];
  onFavorite: (id: string) => void;
  onOpen: (place: Place) => void;
  onDistrictOpen: (district: District) => void;
  onSpiritualOpen: (site: SpiritualSite) => void;
}) {
  const districtQuery = query.trim().toLocaleLowerCase('tr-TR');
  const visibleDistricts = bursaDistricts.filter(district => !districtQuery || `${district.name} ${district.signature} ${district.highlights.join(' ')} ${district.flavors.join(' ')}`.toLocaleLowerCase('tr-TR').includes(districtQuery));
  const visibleSpiritual = spiritualSites.filter(site => site.city === 'Bursa' && (category === 'Tümü' || category === 'Manevi') && (!districtQuery || `${site.name} ${site.district} ${site.kind} ${site.summary}`.toLocaleLowerCase('tr-TR').includes(districtQuery)));
  return (
    <ScrollView contentContainerStyle={styles.page} showsVerticalScrollIndicator={false} stickyHeaderIndices={exploreOnly ? [0] : undefined}>
      {!exploreOnly && <Hero />}
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
              <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text>
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
              {visibleSpiritual.map((site, index) => <Pressable key={site.id} onPress={() => onSpiritualOpen(site)} style={styles.spiritualCard}><View style={styles.spiritualVisual}><Image source={site.image} style={styles.spiritualImage} /><View style={styles.spiritualImageShade} /><View style={styles.spiritualMark}><Text style={styles.spiritualMarkText}>{String(index + 1).padStart(2, '0')}</Text></View><View style={styles.realPhotoBadge}><Text style={styles.realPhotoBadgeText}>GERÇEK FOTOĞRAF</Text></View></View><View style={styles.spiritualBody}><Text style={styles.spiritualMeta}>{site.kind.toUpperCase()} · {site.district.toUpperCase()}</Text><Text style={styles.spiritualName}>{site.name}</Text><Text numberOfLines={2} style={styles.spiritualSummary}>{site.summary}</Text><Text style={styles.spiritualOpen}>Detayı aç  →</Text></View></Pressable>)}
            </View>
          </>
        )}

        {category !== 'Manevi' && <><View style={styles.subheadingRow}>
          <Text style={styles.subheading}>{query || category !== 'Tümü' ? 'Arama sonuçları' : 'Bursa’da kaçırma'}</Text>
          <Text style={styles.resultCount}>{places.length} öneri</Text>
        </View><View style={styles.cardGrid}>
          {places.map(place => <PlaceCard key={place.id} place={place} favorite={favorites.includes(place.id)} onFavorite={onFavorite} onOpen={onOpen} />)}
        </View>{!places.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>Sonuç bulunamadı</Text><Text style={styles.emptyCopy}>Başka bir kelime veya kategori deneyebilirsin.</Text></View>}</>}

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

function CityToolkit() {
  const [offlineReady, setOfflineReady] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem('turkiye-rehberi-offline-bursa').then(value => setOfflineReady(value === 'ready')).catch(() => {});
  }, []);
  const openMapSearch = (query: string) => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`);
  const openRoute = (route: DailyRoute) => {
    const origin = route.stops[0];
    const destination = route.stops.at(-1);
    if (!origin || !destination) return;
    const waypoints = route.stops.slice(1, -1).map(stop => `${stop} Bursa`).join('|');
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(`${origin} Bursa`)}&destination=${encodeURIComponent(`${destination} Bursa`)}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}`);
  };
  const saveOffline = () => {
    const next = !offlineReady;
    setOfflineReady(next);
    AsyncStorage.setItem('turkiye-rehberi-offline-bursa', next ? 'ready' : 'none').catch(() => {});
  };
  return <>
    <View style={styles.toolkitHeader}><Text style={styles.eyebrow}>ŞEHİR ASİSTANI</Text><Text style={styles.toolkitTitle}>Bursa’da aradığın her şey.</Text><Text style={styles.toolkitCopy}>Yeme içmeden sağlık ve ulaşıma, hazır rotalardan yakındaki noktalara kadar tek yerde.</Text></View>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Temel ihtiyaçlar</Text><Text style={styles.moduleHint}>Canlı harita sonuçları</Text></View>
    <View style={styles.serviceGrid}>{bursaGuideModules.services.map((service, index) => <Pressable key={service.kind} onPress={() => openMapSearch(service.mapQuery)} style={styles.serviceCard}><View style={styles.serviceIcon}><Text style={styles.serviceIconText}>{['⌂', '+', '✚', '↗'][index]}</Text></View><Text style={styles.serviceKind}>{service.kind}</Text><Text style={styles.serviceName}>{service.label}</Text><Text style={styles.serviceCopy}>{service.description}</Text><Text style={styles.serviceOpen}>Haritada aç  ↗</Text></Pressable>)}</View>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Bölge bölge yeme & içme</Text><Text style={styles.moduleHint}>{bursaGuideModules.venueAreas.length} bölge</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.venueRail}>{bursaGuideModules.venueAreas.map(area => <View key={area.area} style={styles.venueCard}><Text style={styles.venueDistrict}>{area.district.toUpperCase()}</Text><Text style={styles.venueArea}>{area.area}</Text><Text style={styles.venueCharacter}>{area.character}</Text><Pressable onPress={() => openMapSearch(area.cafeQuery)} style={styles.venueButton}><Text style={styles.venueButtonText}>En iyi kafeler  →</Text></Pressable><Pressable onPress={() => openMapSearch(area.restaurantQuery)} style={[styles.venueButton, styles.venueButtonDark]}><Text style={[styles.venueButtonText, styles.venueButtonTextDark]}>En iyi restoranlar  →</Text></Pressable></View>)}</ScrollView>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Ne, nerede yenir?</Text><Text style={styles.moduleHint}>Yerel seçki</Text></View>
    <View style={styles.foodList}>{bursaGuideModules.foods.map((food, index) => <Pressable key={food.dish} onPress={() => openMapSearch(food.mapQuery)} style={styles.foodRow}><Text style={styles.foodNumber}>{String(index + 1).padStart(2, '0')}</Text><View style={styles.foodBody}><Text style={styles.foodDish}>{food.dish}</Text><Text style={styles.foodArea}>{food.area}</Text><Text style={styles.foodNote}>{food.note}</Text></View><Text style={styles.foodArrow}>↗</Text></Pressable>)}</View>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Hazır günlük rotalar</Text><Text style={styles.moduleHint}>Tek dokunuşla rota</Text></View>
    <View style={styles.routeList}>{bursaGuideModules.routes.map((route, index) => <Pressable key={route.id} onPress={() => openRoute(route)} style={[styles.routeCard, { backgroundColor: route.theme }]}><View style={styles.routeTop}><Text style={styles.routeIndex}>0{index + 1}</Text><Text style={styles.routeDuration}>{route.duration}</Text></View><Text style={styles.routeTitle}>{route.title}</Text><Text style={styles.routeStops}>{route.stops.join('  ·  ')}</Text><Text style={styles.routeOpen}>Rotayı haritada aç  →</Text></Pressable>)}</View>

    <View style={styles.moduleHeading}><Text style={styles.moduleTitle}>Bursa fotoğraf günlüğü</Text><Text style={styles.moduleHint}>{bursaGuideModules.gallery.length} kare</Text></View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRail}>{bursaGuideModules.gallery.map(item => <View key={item.title} style={styles.galleryCard}><Image source={item.image} style={styles.galleryImage} /><View style={styles.galleryShade} /><View style={styles.galleryCaption}><Text style={styles.galleryDistrict}>{item.district.toUpperCase()}</Text><Text style={styles.galleryTitle}>{item.title}</Text></View></View>)}</ScrollView>

    <View style={styles.nearbyPanel}><Text style={styles.nearbyEyebrow}>YAKINIMDA</Text><Text style={styles.nearbyTitle}>Şu anda çevrende ne var?</Text><Text style={styles.nearbyCopy}>Haritalar konum izninle yakınındaki güncel sonuçları gösterir.</Text><View style={styles.nearbyGrid}>{bursaGuideModules.nearbySearches.map(item => <Pressable key={item.label} onPress={() => openMapSearch(`${item.query} yakınımda`)} style={styles.nearbyButton}><Text style={styles.nearbyIcon}>{item.icon}</Text><Text style={styles.nearbyLabel}>{item.label}</Text></Pressable>)}</View></View>

    <View style={styles.offlineCard}><View style={styles.offlineTop}><View style={styles.offlineIcon}><Text style={styles.offlineIconText}>↓</Text></View><View style={styles.offlineBody}><Text style={styles.offlineEyebrow}>İNTERNETSİZ KULLANIM</Text><Text style={styles.offlineTitle}>Bursa şehir rehberi</Text><Text style={styles.offlineCopy}>İçerik, rotalar ve uygulamaya eklenen fotoğraflar cihazında hazır tutulur. Canlı harita ve işletme sonuçları internet gerektirir.</Text></View></View><Pressable onPress={saveOffline} style={[styles.offlineButton, offlineReady && styles.offlineButtonReady]}><Text style={[styles.offlineButtonText, offlineReady && styles.offlineButtonTextReady]}>{offlineReady ? '✓  Çevrimdışı rehber hazır' : 'Bursa rehberini indir'}</Text></Pressable></View>
  </>;
}

function Hero() {
  return (
    <ImageBackground source={bursa.hero} style={styles.hero} imageStyle={styles.heroImage}>
      <View style={styles.heroOverlay} />
      <SafeAreaView style={styles.heroSafe}>
        <View style={styles.brandRow}><View style={styles.brandMark}><Text style={styles.brandMarkText}>TR</Text></View><Text style={styles.brand}>Türkiye Rehberi</Text><Pressable style={styles.roundButton}><Text style={styles.roundButtonText}>☰</Text></Pressable></View>
        <View style={styles.heroCopy}>
          <View style={styles.liveBadge}><View style={styles.liveDot} /><Text style={styles.liveText}>81 ŞEHİR · BİNLERCE HİKÂYE</Text></View>
          <Text style={styles.heroTitle}>Yolun{`\n`}Türkiye’den{`\n`}geçsin.</Text>
          <Text style={styles.heroSubtitle}>Yakındaki güzellikleri keşfet, rotanı oluştur ve her şehri kendi hikâyesiyle tanı.</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

function PlaceCard({ place, favorite, onFavorite, onOpen }: { place: Place; favorite: boolean; onFavorite: (id: string) => void; onOpen: (place: Place) => void }) {
  return (
    <Pressable onPress={() => onOpen(place)} style={styles.placeCard}>
      <Image source={place.image} style={styles.placeImage} />
      <Pressable hitSlop={10} onPress={event => { event.stopPropagation(); onFavorite(place.id); }} style={styles.favoriteButton}><Text style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>{favorite ? '♥' : '♡'}</Text></Pressable>
      <View style={styles.placeBody}>
        <View style={styles.placeMeta}><Text style={styles.placeCategory}>{place.category}</Text><Text style={styles.placeDistrict}>{place.district}</Text></View>
        <Text style={styles.placeName}>{place.name}</Text>
        <Text numberOfLines={2} style={styles.placeSummary}>{place.summary}</Text>
      </View>
    </Pressable>
  );
}

function Favorites({ places, onOpen, onRemove }: { places: Place[]; onOpen: (place: Place) => void; onRemove: (id: string) => void }) {
  return <SafeAreaView style={styles.plainPage}><View style={styles.plainHeader}><Text style={styles.eyebrow}>KİŞİSEL KOLEKSİYONUN</Text><Text style={styles.sectionTitle}>Favorilerim</Text><Text style={styles.plainCopy}>Gitmek istediğin yerleri burada biriktir.</Text></View><ScrollView contentContainerStyle={styles.favoriteList}>{places.map(place => <PlaceCard key={place.id} place={place} favorite onFavorite={onRemove} onOpen={onOpen} />)}{!places.length && <View style={styles.empty}><Text style={styles.emptyIcon}>♡</Text><Text style={styles.emptyTitle}>Listen henüz boş</Text><Text style={styles.emptyCopy}>Keşfet bölümündeki kalp simgesine dokun.</Text></View>}</ScrollView></SafeAreaView>;
}

function Profile() {
  return <SafeAreaView style={styles.plainPage}><ScrollView contentContainerStyle={styles.plainHeader}><Text style={styles.eyebrow}>YOLCULUK PROFİLİ</Text><Text style={styles.sectionTitle}>Merhaba Gezgin</Text><Text style={styles.plainCopy}>Kişiselleştirilmiş rota, çevrimdışı şehir paketleri ve gezi geçmişi sonraki sürümlerde burada olacak.</Text><View style={styles.statRow}><View style={styles.stat}><Text style={styles.statNumber}>1</Text><Text style={styles.statLabel}>Keşfedilen il</Text></View><View style={styles.stat}><Text style={styles.statNumber}>5</Text><Text style={styles.statLabel}>Hazır öneri</Text></View><View style={styles.stat}><Text style={styles.statNumber}>81</Text><Text style={styles.statLabel}>Hedef şehir</Text></View></View><View style={styles.roadmap}><Text style={styles.roadmapTitle}>Yakında</Text>{['Çevrimdışı şehir indirme','Akıllı günlük rota','Konuma göre yakındakiler','Gezi notları ve listeler'].map((item, index) => <View key={item} style={styles.roadmapItem}><Text style={styles.roadmapIndex}>0{index + 1}</Text><Text style={styles.roadmapText}>{item}</Text></View>)}</View></ScrollView></SafeAreaView>;
}

function PlanScreen({ districtNames, spiritualIds, onRemoveDistrict, onRemoveSpiritual }: { districtNames: string[]; spiritualIds: string[]; onRemoveDistrict: (name: string) => void; onRemoveSpiritual: (id: string) => void }) {
  const districts = districtNames.map(name => bursaDistricts.find(item => item.name === name)).filter((item): item is District => Boolean(item));
  const sites = spiritualIds.map(id => spiritualSites.find(item => item.id === id)).filter((item): item is SpiritualSite => Boolean(item));
  const destinations = [...districts.map(item => item.mapQuery), ...sites.map(item => item.mapQuery)];
  const openRoute = () => {
    const first = destinations[0];
    const last = destinations.at(-1);
    if (!first || !last) return;
    if (destinations.length === 1) return Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(first)}`);
    const origin = encodeURIComponent(first);
    const destination = encodeURIComponent(last);
    const waypoints = destinations.slice(1, -1).join('|');
    return Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}`);
  };
  return <SafeAreaView style={styles.plainPage}><View style={styles.plainHeader}><Text style={styles.eyebrow}>KİŞİSEL BURSA ROTAN</Text><Text style={styles.sectionTitle}>Gezi planım</Text><Text style={styles.plainCopy}>İlçe ve manevi miras durakların burada sıralanır ve tek rota olarak haritada açılır.</Text></View><ScrollView contentContainerStyle={styles.planContent}>{districts.map((district, index) => <View key={district.name} style={styles.planDistrict}><View style={[styles.planNumber, { backgroundColor: district.theme }]}><Text style={styles.planNumberText}>{String(index + 1).padStart(2, '0')}</Text></View><View style={styles.planDistrictBody}><Text style={styles.planDistrictName}>{district.name}</Text><Text style={styles.planDistrictCopy}>İlçe · {district.signature}</Text></View><Pressable onPress={() => onRemoveDistrict(district.name)} hitSlop={10}><Text style={styles.planRemove}>×</Text></Pressable></View>)}{sites.map((site, index) => <View key={site.id} style={styles.planDistrict}><View style={[styles.planNumber, styles.planSpiritual]}><Text style={styles.planNumberText}>{String(districts.length + index + 1).padStart(2, '0')}</Text></View><View style={styles.planDistrictBody}><Text style={styles.planDistrictName}>{site.name}</Text><Text style={styles.planDistrictCopy}>Manevi miras · {site.district}</Text></View><Pressable onPress={() => onRemoveSpiritual(site.id)} hitSlop={10}><Text style={styles.planRemove}>×</Text></Pressable></View>)}{!destinations.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌖</Text><Text style={styles.emptyTitle}>Rotan henüz boş</Text><Text style={styles.emptyCopy}>İlçe veya manevi miras kartlarını açıp “Planıma ekle” düğmesine dokun.</Text></View>}{destinations.length > 0 && <Pressable onPress={openRoute} style={styles.planRouteButton}><Text style={styles.planRouteText}>Rotayı Google Maps’te aç  →</Text></Pressable>}</ScrollView></SafeAreaView>;
}

function BottomTabs({ tab, setTab, favoriteCount, planCount }: { tab: Tab; setTab: (tab: Tab) => void; favoriteCount: number; planCount: number }) {
  const items: Array<{ id: Tab; icon: string; label: string }> = [{ id: 'home', icon: '⌂', label: 'Ana sayfa' }, { id: 'explore', icon: '⌕', label: 'Keşfet' }, { id: 'plan', icon: '⌖', label: 'Planım' }, { id: 'favorites', icon: '♡', label: 'Favoriler' }, { id: 'profile', icon: '○', label: 'Profil' }];
  return <View style={styles.tabBar}>{items.map(item => { const badge = item.id === 'favorites' ? favoriteCount : item.id === 'plan' ? planCount : 0; return <Pressable key={item.id} onPress={() => setTab(item.id)} style={styles.tabItem}><View><Text style={[styles.tabIcon, tab === item.id && styles.tabActive]}>{item.icon}</Text>{badge > 0 && <View style={styles.tabBadge}><Text style={styles.tabBadgeText}>{badge}</Text></View>}</View><Text style={[styles.tabLabel, tab === item.id && styles.tabActive]}>{item.label}</Text></Pressable>; })}</View>;
}

function PlaceModal({ place, favorite, onClose, onFavorite }: { place: Place | null; favorite: boolean; onClose: () => void; onFavorite: (id: string) => void }) {
  const openMap = () => place && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`);
  return <Modal visible={Boolean(place)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{place && <View style={styles.modal}><Image source={place.image} style={styles.modalImage} /><View style={styles.modalShade} /><SafeAreaView style={styles.modalSafe}><View style={styles.modalActions}><Pressable onPress={onClose} style={styles.modalRound}><Text style={styles.modalRoundText}>×</Text></Pressable><Pressable onPress={() => onFavorite(place.id)} style={styles.modalRound}><Text style={styles.modalRoundText}>{favorite ? '♥' : '♡'}</Text></Pressable></View><View style={styles.modalBody}><Text style={styles.modalMeta}>{place.category.toUpperCase()} · {place.district.toUpperCase()}</Text><Text style={styles.modalTitle}>{place.name}</Text><Text style={styles.modalCopy}>{place.summary}</Text><View style={styles.infoCard}><Text style={styles.infoLabel}>BU ROTA İÇİN</Text><Text style={styles.infoTitle}>Haritada konumu aç</Text><Text style={styles.infoCopy}>Güncel yol durumunu ve ulaşım seçeneklerini harita uygulamasından görüntüle.</Text></View><Pressable onPress={openMap} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Yol tarifi al  →</Text></Pressable></View></SafeAreaView></View>}</Modal>;
}

function DistrictModal({ district, planned, onClose, onTogglePlan }: { district: District | null; planned: boolean; onClose: () => void; onTogglePlan: (name: string) => void }) {
  const openMap = () => district && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(district.mapQuery)}`);
  const openHighlight = (item: string) => district && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${item} ${district.name} Bursa`)}`);
  return <Modal visible={Boolean(district)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{district && <SafeAreaView style={[styles.districtModal, { backgroundColor: district.theme }]}><View style={styles.districtModalTop}><View><Text style={styles.districtModalKicker}>BURSA · İLÇE REHBERİ</Text><Text style={styles.districtModalTitle}>{district.name}</Text></View><Pressable onPress={onClose} style={styles.districtClose}><Text style={styles.districtCloseText}>×</Text></Pressable></View><Text style={styles.districtModalSignature}>{district.signature}</Text><ScrollView contentContainerStyle={styles.districtModalScroll}><Pressable onPress={() => onTogglePlan(district.name)} style={[styles.addPlanButton, planned && styles.addPlanButtonActive]}><Text style={[styles.addPlanText, planned && styles.addPlanTextActive]}>{planned ? '✓  Gezi planıma eklendi' : '+  Gezi planıma ekle'}</Text></Pressable><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>GÖRMEDEN DÖNME</Text>{district.highlights.map((item, index) => <Pressable key={item} onPress={() => openHighlight(item)} style={styles.districtListItem}><Text style={styles.districtListIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={styles.districtListText}>{item}</Text><Text style={styles.districtListArrow}>↗</Text></Pressable>)}</View><View style={styles.districtPanel}><Text style={styles.districtPanelLabel}>YEREL LEZZETLER</Text><View style={styles.flavorWrap}>{district.flavors.map(item => <View key={item} style={styles.flavorChip}><Text style={styles.flavorText}>{item}</Text></View>)}</View></View><Pressable onPress={openMap} style={styles.districtMapButton}><Text style={styles.districtMapText}>Haritada {district.name}  →</Text></Pressable><Text style={styles.sourceNote}>İçerikler resmî Bursa turizm rehberi temel alınarak hazırlanır; çalışma saatleri ve ulaşım bilgileri ziyaret öncesinde kontrol edilmelidir.</Text></ScrollView></SafeAreaView>}</Modal>;
}

function SpiritualModal({ site, planned, onClose, onTogglePlan }: { site: SpiritualSite | null; planned: boolean; onClose: () => void; onTogglePlan: (id: string) => void }) {
  const openMap = () => site && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`);
  const openSource = () => site && Linking.openURL(site.sourceUrl);
  const openImageSource = () => site && Linking.openURL(site.imagePage);
  return <Modal visible={Boolean(site)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{site && <SafeAreaView style={styles.spiritualModal}><View style={styles.spiritualModalHero}><Image source={site.image} style={styles.spiritualModalImage} /><View style={styles.spiritualModalImageShade} /><View style={styles.spiritualModalTop}><View><Text style={styles.spiritualModalKicker}>{site.kind.toUpperCase()} · {site.district.toUpperCase()}</Text><Text style={styles.spiritualModalTitle}>{site.name}</Text></View><Pressable onPress={onClose} style={styles.spiritualClose}><Text style={styles.spiritualCloseText}>×</Text></Pressable></View></View><ScrollView contentContainerStyle={styles.spiritualModalScroll}><Pressable onPress={openImageSource} style={styles.photoCredit}><Text style={styles.photoCreditLabel}>FOTOĞRAF</Text><Text style={styles.photoCreditText}>{site.imageCredit} · Wikimedia Commons  ↗</Text></Pressable><View style={styles.spiritualPeriod}><Text style={styles.spiritualPeriodLabel}>DÖNEM</Text><Text style={styles.spiritualPeriodText}>{site.period}</Text></View><Text style={styles.spiritualModalCopy}>{site.summary}</Text><View style={styles.etiquetteCard}><Text style={styles.etiquetteLabel}>ZİYARET NOTU</Text><Text style={styles.etiquetteText}>{site.etiquette}</Text></View><Pressable onPress={() => onTogglePlan(site.id)} style={[styles.spiritualPlanButton, planned && styles.spiritualPlanButtonActive]}><Text style={[styles.spiritualPlanText, planned && styles.spiritualPlanTextActive]}>{planned ? '✓  Gezi planıma eklendi' : '+  Gezi planıma ekle'}</Text></Pressable><Pressable onPress={openMap} style={styles.spiritualMapButton}><Text style={styles.spiritualMapText}>Konumu ve yol tarifini aç  →</Text></Pressable><Pressable onPress={openSource} style={styles.sourceButton}><Text style={styles.sourceButtonText}>Resmî bilgi kaynağı  ↗</Text></Pressable></ScrollView></SafeAreaView>}</Modal>;
}

const styles = StyleSheet.create({
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
});
