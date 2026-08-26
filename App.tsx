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
import { bursa, bursaDistricts, comingCities, type Category, type Place } from './src/data';

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

type Tab = 'home' | 'explore' | 'favorites' | 'profile';
const categories: Array<'Tümü' | Category> = ['Tümü', 'Tarih', 'Doğa', 'Lezzet', 'Sahil'];

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [category, setCategory] = useState<(typeof categories)[number]>('Tümü');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['uludag']);
  const [selected, setSelected] = useState<Place | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('turkiye-rehberi-favoriler').then(value => {
      if (value) setFavorites(JSON.parse(value));
    }).catch(() => {});
  }, []);

  const filteredPlaces = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('tr-TR');
    return bursa.places.filter(place => {
      const categoryMatch = category === 'Tümü' || place.category === category;
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

  const content = tab === 'favorites'
    ? <Favorites places={favoritePlaces} onOpen={setSelected} onRemove={toggleFavorite} />
    : tab === 'profile'
      ? <Profile />
      : <MainContent
          exploreOnly={tab === 'explore'}
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          places={filteredPlaces}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onOpen={setSelected}
        />;

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {content}
      <BottomTabs tab={tab} setTab={setTab} favoriteCount={favorites.length} />
      <PlaceModal place={selected} favorite={selected ? favorites.includes(selected.id) : false} onClose={() => setSelected(null)} onFavorite={toggleFavorite} />
    </View>
  );
}

function MainContent({ exploreOnly, query, setQuery, category, setCategory, places, favorites, onFavorite, onOpen }: {
  exploreOnly: boolean;
  query: string;
  setQuery: (value: string) => void;
  category: (typeof categories)[number];
  setCategory: (value: (typeof categories)[number]) => void;
  places: Place[];
  favorites: string[];
  onFavorite: (id: string) => void;
  onOpen: (place: Place) => void;
}) {
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
            <View style={styles.subheadingRow}><Text style={styles.subheading}>17 ilçeyi keşfet</Text><Text style={styles.resultCount}>Tam liste</Text></View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.districtRail}>
              {bursaDistricts.map((district, index) => (
                <View key={district.name} style={[styles.districtCard, { backgroundColor: district.theme }]}>
                  <Text style={styles.districtNumber}>{String(index + 1).padStart(2, '0')}</Text>
                  <Text style={styles.districtName}>{district.name}</Text>
                  <Text style={styles.districtSignature}>{district.signature}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        <View style={styles.subheadingRow}>
          <Text style={styles.subheading}>{query || category !== 'Tümü' ? 'Arama sonuçları' : 'Bursa’da kaçırma'}</Text>
          <Text style={styles.resultCount}>{places.length} öneri</Text>
        </View>
        <View style={styles.cardGrid}>
          {places.map(place => <PlaceCard key={place.id} place={place} favorite={favorites.includes(place.id)} onFavorite={onFavorite} onOpen={onOpen} />)}
        </View>
        {!places.length && <View style={styles.empty}><Text style={styles.emptyIcon}>⌕</Text><Text style={styles.emptyTitle}>Sonuç bulunamadı</Text><Text style={styles.emptyCopy}>Başka bir kelime veya kategori deneyebilirsin.</Text></View>}

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

function BottomTabs({ tab, setTab, favoriteCount }: { tab: Tab; setTab: (tab: Tab) => void; favoriteCount: number }) {
  const items: Array<{ id: Tab; icon: string; label: string }> = [{ id: 'home', icon: '⌂', label: 'Ana sayfa' }, { id: 'explore', icon: '⌕', label: 'Keşfet' }, { id: 'favorites', icon: '♡', label: 'Favoriler' }, { id: 'profile', icon: '○', label: 'Profil' }];
  return <View style={styles.tabBar}>{items.map(item => <Pressable key={item.id} onPress={() => setTab(item.id)} style={styles.tabItem}><View><Text style={[styles.tabIcon, tab === item.id && styles.tabActive]}>{item.icon}</Text>{item.id === 'favorites' && favoriteCount > 0 && <View style={styles.tabBadge}><Text style={styles.tabBadgeText}>{favoriteCount}</Text></View>}</View><Text style={[styles.tabLabel, tab === item.id && styles.tabActive]}>{item.label}</Text></Pressable>)}</View>;
}

function PlaceModal({ place, favorite, onClose, onFavorite }: { place: Place | null; favorite: boolean; onClose: () => void; onFavorite: (id: string) => void }) {
  const openMap = () => place && Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`);
  return <Modal visible={Boolean(place)} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>{place && <View style={styles.modal}><Image source={place.image} style={styles.modalImage} /><View style={styles.modalShade} /><SafeAreaView style={styles.modalSafe}><View style={styles.modalActions}><Pressable onPress={onClose} style={styles.modalRound}><Text style={styles.modalRoundText}>×</Text></Pressable><Pressable onPress={() => onFavorite(place.id)} style={styles.modalRound}><Text style={styles.modalRoundText}>{favorite ? '♥' : '♡'}</Text></Pressable></View><View style={styles.modalBody}><Text style={styles.modalMeta}>{place.category.toUpperCase()} · {place.district.toUpperCase()}</Text><Text style={styles.modalTitle}>{place.name}</Text><Text style={styles.modalCopy}>{place.summary}</Text><View style={styles.infoCard}><Text style={styles.infoLabel}>BU ROTA İÇİN</Text><Text style={styles.infoTitle}>Haritada konumu aç</Text><Text style={styles.infoCopy}>Güncel yol durumunu ve ulaşım seçeneklerini harita uygulamasından görüntüle.</Text></View><Pressable onPress={openMap} style={styles.primaryButton}><Text style={styles.primaryButtonText}>Yol tarifi al  →</Text></Pressable></View></SafeAreaView></View>}</Modal>;
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: palette.cream }, page: { paddingBottom: 112 }, content: { padding: 20 }, exploreHeader: { paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 22 : 68, backgroundColor: palette.cream },
  hero: { height: 560, backgroundColor: palette.forest }, heroImage: { resizeMode: 'cover' }, heroOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(7,31,26,.48)' }, heroSafe: { flex: 1 }, brandRow: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? NativeStatusBar.currentHeight : 4, flexDirection: 'row', alignItems: 'center', gap: 10 }, brandMark: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.gold }, brandMarkText: { color: palette.ink, fontWeight: '900', fontSize: 12 }, brand: { flex: 1, color: palette.white, fontSize: 17, fontWeight: '800', letterSpacing: -.4 }, roundButton: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,.4)', backgroundColor: 'rgba(21,62,53,.25)' }, roundButtonText: { color: palette.white, fontSize: 18 }, heroCopy: { marginTop: 'auto', padding: 24, paddingBottom: 44 }, liveBadge: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 18, paddingHorizontal: 11, paddingVertical: 7, borderRadius: 20, backgroundColor: 'rgba(255,255,255,.15)' }, liveDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: palette.gold }, liveText: { color: palette.white, fontSize: 10, fontWeight: '800', letterSpacing: 1.2 }, heroTitle: { color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 55, lineHeight: 56, letterSpacing: -2.2, fontWeight: '600' }, heroSubtitle: { marginTop: 20, maxWidth: 330, color: '#E8ECE8', fontSize: 16, lineHeight: 24 },
  titleRow: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }, eyebrow: { color: palette.moss, fontSize: 11, fontWeight: '900', letterSpacing: 1.6 }, sectionTitle: { marginTop: 7, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 38, lineHeight: 43, fontWeight: '600', letterSpacing: -1.1 }, cityBadge: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center', backgroundColor: palette.forest }, cityBadgeText: { color: palette.white, fontSize: 13, fontWeight: '900' }, searchBox: { height: 56, marginTop: 22, paddingHorizontal: 17, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: palette.line, borderRadius: 18, backgroundColor: palette.paper }, searchIcon: { color: palette.moss, fontSize: 25 }, searchInput: { flex: 1, color: palette.ink, fontSize: 16 }, categoryRow: { gap: 9, paddingVertical: 16 }, categoryChip: { paddingHorizontal: 17, paddingVertical: 11, borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, categoryChipActive: { borderColor: palette.forest, backgroundColor: palette.forest }, categoryText: { color: palette.muted, fontSize: 13, fontWeight: '700' }, categoryTextActive: { color: palette.white },
  cityIntro: { height: 330, marginTop: 5, overflow: 'hidden', borderRadius: 28, backgroundColor: palette.forest }, cityIntroImage: { width: '100%', height: '100%' }, cityIntroShade: { position: 'absolute', inset: 0, backgroundColor: 'rgba(8,32,27,.48)' }, cityIntroContent: { position: 'absolute', right: 24, bottom: 25, left: 24 }, cityRegion: { color: '#D7E2DC', fontSize: 11, fontWeight: '800', letterSpacing: 1 }, cityIntroTitle: { maxWidth: 290, marginTop: 8, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 30, lineHeight: 34, fontWeight: '600' }, cityIntroCopy: { marginTop: 10, color: '#E4EAE6', fontSize: 14, lineHeight: 20 }, subheadingRow: { marginTop: 30, marginBottom: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, subheading: { color: palette.ink, fontSize: 21, fontWeight: '800', letterSpacing: -.5 }, resultCount: { color: palette.muted, fontSize: 12, fontWeight: '700' }, cardGrid: { gap: 15 }, placeCard: { overflow: 'hidden', borderRadius: 24, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, placeImage: { width: '100%', height: 205 }, favoriteButton: { position: 'absolute', top: 14, right: 14, width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,.92)' }, favoriteIcon: { color: palette.forest, fontSize: 24 }, favoriteIconActive: { color: '#B75043' }, placeBody: { padding: 18 }, placeMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, placeCategory: { color: palette.moss, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 }, placeDistrict: { color: palette.muted, fontSize: 11, fontWeight: '700' }, placeName: { marginTop: 8, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 24, fontWeight: '600' }, placeSummary: { marginTop: 7, color: palette.muted, fontSize: 14, lineHeight: 21 },
  districtRail: { gap: 11, paddingRight: 20 }, districtCard: { width: 175, minHeight: 170, padding: 18, justifyContent: 'flex-end', borderRadius: 23 }, districtNumber: { marginBottom: 'auto', color: 'rgba(255,255,255,.55)', fontSize: 11, fontWeight: '900' }, districtName: { color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 24, fontWeight: '600' }, districtSignature: { marginTop: 7, color: 'rgba(255,255,255,.78)', fontSize: 12, lineHeight: 17 },
  spacedEyebrow: { marginTop: 42 }, cityRail: { gap: 12, paddingTop: 18, paddingRight: 20 }, comingCity: { width: 190, height: 205, padding: 20, justifyContent: 'flex-end', borderRadius: 25 }, comingRegion: { color: 'rgba(255,255,255,.75)', fontSize: 10, fontWeight: '800', letterSpacing: 1.1 }, comingName: { marginTop: 6, color: palette.white, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 28, fontWeight: '600' }, comingSoon: { marginTop: 20, color: palette.white, fontSize: 12, fontWeight: '800' },
  tabBar: { position: 'absolute', right: 12, bottom: 10, left: 12, height: 76, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,.12)', backgroundColor: palette.forest, shadowColor: '#0B211C', shadowOffset: { width: 0, height: 12 }, shadowOpacity: .28, shadowRadius: 22, elevation: 15 }, tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 }, tabIcon: { color: '#AFC2BB', fontSize: 25, fontWeight: '700' }, tabLabel: { color: '#AFC2BB', fontSize: 10, fontWeight: '700' }, tabActive: { color: palette.white }, tabBadge: { position: 'absolute', top: -4, right: -10, minWidth: 17, height: 17, paddingHorizontal: 4, alignItems: 'center', justifyContent: 'center', borderRadius: 9, backgroundColor: palette.gold }, tabBadgeText: { color: palette.ink, fontSize: 9, fontWeight: '900' },
  plainPage: { flex: 1, backgroundColor: palette.cream }, plainHeader: { padding: 22, paddingTop: Platform.OS === 'android' ? (NativeStatusBar.currentHeight ?? 24) + 28 : 32, paddingBottom: 120 }, plainCopy: { marginTop: 12, color: palette.muted, fontSize: 15, lineHeight: 23 }, favoriteList: { padding: 20, paddingTop: 8, paddingBottom: 120, gap: 15 }, empty: { paddingVertical: 70, alignItems: 'center' }, emptyIcon: { color: palette.moss, fontSize: 48 }, emptyTitle: { marginTop: 12, color: palette.ink, fontSize: 20, fontWeight: '800' }, emptyCopy: { marginTop: 7, color: palette.muted, textAlign: 'center' }, statRow: { marginTop: 30, flexDirection: 'row', gap: 8 }, stat: { flex: 1, padding: 15, borderRadius: 18, backgroundColor: palette.paper, borderWidth: 1, borderColor: palette.line }, statNumber: { color: palette.forest, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 30, fontWeight: '600' }, statLabel: { marginTop: 4, color: palette.muted, fontSize: 10, fontWeight: '700' }, roadmap: { marginTop: 28, padding: 20, borderRadius: 24, backgroundColor: palette.forest }, roadmapTitle: { marginBottom: 10, color: palette.white, fontSize: 21, fontWeight: '800' }, roadmapItem: { paddingVertical: 15, flexDirection: 'row', alignItems: 'center', gap: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,.12)' }, roadmapIndex: { color: palette.gold, fontSize: 11, fontWeight: '900' }, roadmapText: { color: palette.white, fontSize: 14, fontWeight: '700' },
  modal: { flex: 1, backgroundColor: palette.cream }, modalImage: { width: '100%', height: 350 }, modalShade: { position: 'absolute', top: 0, right: 0, left: 0, height: 160, backgroundColor: 'rgba(7,31,26,.22)' }, modalSafe: { position: 'absolute', inset: 0 }, modalActions: { padding: 18, flexDirection: 'row', justifyContent: 'space-between' }, modalRound: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, backgroundColor: 'rgba(255,255,255,.94)' }, modalRoundText: { color: palette.forest, fontSize: 24, fontWeight: '600' }, modalBody: { flex: 1, marginTop: 235, padding: 24, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: palette.cream }, modalMeta: { color: palette.moss, fontSize: 11, fontWeight: '900', letterSpacing: 1.2 }, modalTitle: { marginTop: 9, color: palette.ink, fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }), fontSize: 36, lineHeight: 41, fontWeight: '600' }, modalCopy: { marginTop: 13, color: palette.muted, fontSize: 16, lineHeight: 24 }, infoCard: { marginTop: 25, padding: 20, borderRadius: 22, borderWidth: 1, borderColor: palette.line, backgroundColor: palette.paper }, infoLabel: { color: palette.gold, fontSize: 10, fontWeight: '900', letterSpacing: 1.1 }, infoTitle: { marginTop: 7, color: palette.ink, fontSize: 18, fontWeight: '800' }, infoCopy: { marginTop: 6, color: palette.muted, fontSize: 13, lineHeight: 19 }, primaryButton: { height: 56, marginTop: 18, alignItems: 'center', justifyContent: 'center', borderRadius: 18, backgroundColor: palette.forest }, primaryButtonText: { color: palette.white, fontSize: 15, fontWeight: '900' },
});
