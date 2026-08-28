import type { ImageSourcePropType } from 'react-native';
import type { AccommodationArea, DailyRoute } from './guideData';

export type IzmirPlace = {
  id: string; name: string; district: string; category: string; summary: string;
  image: ImageSourcePropType; mapQuery: string; credit: string; imagePage: string; sourceUrl: string;
};

export type IzmirDistrict = { name: string; signature: string; highlights: string[]; flavors: string[]; mapQuery: string };

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;
const tourism = 'https://izmir.ktb.gov.tr/';

export const izmirPlaces: IzmirPlace[] = [
  { id: 'izmir-saat-kulesi', name: 'İzmir Saat Kulesi ve Konak Meydanı', district: 'Konak', category: 'Tarihî yapı', summary: '1901 tarihli Saat Kulesi, Hükûmet Konağı ve körfez kıyısıyla İzmir’in en tanınabilir kent odağı.', image: require('../assets/izmir/hero.jpg'), mapQuery: 'İzmir Saat Kulesi Konak İzmir', credit: 'Ingo Mehling · CC BY-SA 3.0', imagePage: commons('Izmir_Konak_Square.jpg'), sourceUrl: tourism },
  { id: 'izmir-kemeralti', name: 'Kemeraltı Çarşısı ve Kızlarağası Hanı', district: 'Konak', category: 'Tarihî doku', summary: 'Hanları, ibadet yapıları, dükkânları ve geleneksel yeme-içme duraklarıyla yaşayan tarihî çarşı rotası.', image: require('../assets/izmir/kemeralti.jpg'), mapQuery: 'Kızlarağası Hanı Kemeraltı Konak İzmir', credit: 'Furkan Akkurt · CC BY-SA 4.0', imagePage: commons('Kizlaragasi_Han_entrance_Izmir_2024.jpeg'), sourceUrl: tourism },
  { id: 'izmir-asansor', name: 'Tarihî Asansör ve Dario Moreno Sokağı', district: 'Konak', category: 'Tarihî yapı', summary: 'Karataş’ın iki kotunu birleştiren tarihî yapı, seyir terası ve Dario Moreno Sokağı’yla birlikte keşfedilir.', image: require('../assets/izmir/asansor.jpg'), mapQuery: 'Tarihi Asansör Dario Moreno Sokağı Konak İzmir', credit: 'Mach · CC BY-SA 3.0', imagePage: commons('Asansor-2.jpg'), sourceUrl: 'https://www.izmir.bel.tr/' },
  { id: 'izmir-agora', name: 'Smyrna Agora Ören Yeri', district: 'Konak', category: 'Tarihî yapı', summary: 'Roma dönemi agorası; kemerli bodrumları, sütunları ve antik Smyrna’nın kent yaşamını anlatan kalıntılarıyla merkezdeki arkeoloji durağı.', image: require('../assets/izmir/agora.jpg'), mapQuery: 'Smyrna Agora Ören Yeri Namazgah Konak İzmir', credit: 'Didier Laroche · CC BY-SA 3.0', imagePage: commons('Agora_of_Smyrna.jpg'), sourceUrl: 'https://muze.gov.tr/' },
  { id: 'izmir-efes', name: 'Efes Antik Kenti', district: 'Selçuk', category: 'Tarihî yapı', summary: 'UNESCO Dünya Mirası alanındaki Celsus Kütüphanesi, Büyük Tiyatro, Kuretler Caddesi ve Yamaç Evler aynı bütün içinde keşfedilir.', image: require('../assets/izmir/efes.jpg'), mapQuery: 'Efes Antik Kenti ana giriş Selçuk İzmir', credit: 'Benh LIEU SONG · CC BY-SA 3.0', imagePage: commons('Ephesus_Celsus_Library_Façade.jpg'), sourceUrl: 'https://whc.unesco.org/en/list/1018/' },
  { id: 'izmir-bergama', name: 'Bergama Akropolü', district: 'Bergama', category: 'Tarihî yapı', summary: 'UNESCO Çok Katmanlı Kültürel Peyzaj Alanı’nın tepe yerleşimi; tiyatro, Traianus Tapınağı ve antik kent manzarasıyla öne çıkar.', image: require('../assets/izmir/bergama.jpg'), mapQuery: 'Bergama Akropol Ören Yeri giriş İzmir', credit: 'Ingo Mehling · CC BY-SA 3.0', imagePage: commons('Pergamon_Acropolis.jpg'), sourceUrl: 'https://whc.unesco.org/en/list/1457/' },
  { id: 'izmir-cesme-kalesi', name: 'Çeşme Kalesi', district: 'Çeşme', category: 'Tarihî yapı', summary: 'Limanın karşısında yükselen kale, Çeşme Arkeoloji Müzesi ve merkez çarşısıyla birlikte güçlü bir tarih rotası oluşturur.', image: require('../assets/izmir/cesme-kalesi.jpg'), mapQuery: 'Çeşme Kalesi İzmir', credit: 'Gargarapalvin · CC BY-SA 4.0', imagePage: commons('Çeşme_Kalesi,_İzmir,_2020_07.jpg'), sourceUrl: tourism },
  { id: 'izmir-alacati', name: 'Alaçatı Tarihî Merkezi', district: 'Çeşme', category: 'Tarihî doku', summary: 'Taş evleri, yel değirmenleri, çarşısı ve rüzgâr sporları kültürüyle Çeşme Yarımadası’nın karakteristik yerleşimi.', image: require('../assets/izmir/alacati.jpg'), mapQuery: 'Alaçatı çarşı yel değirmenleri Çeşme İzmir', credit: 'Justinianus · CC BY-SA 4.0', imagePage: commons('Alaçatı_değirmenler_03.jpg'), sourceUrl: tourism },
  { id: 'izmir-sigacik', name: 'Sığacık Kaleiçi', district: 'Seferihisar', category: 'Tarihî doku', summary: 'Kale surları içindeki sokakları, üretici pazarı ve Teos’a yakınlığıyla yavaş tempolu Ege rotası.', image: require('../assets/izmir/sigacik.jpg'), mapQuery: 'Sığacık Kaleiçi Seferihisar İzmir', credit: 'BSRF · CC BY-SA 4.0', imagePage: commons('Sığacık_Castle_01.jpg'), sourceUrl: tourism },
  { id: 'izmir-teos', name: 'Teos Antik Kenti', district: 'Seferihisar', category: 'Tarihî yapı', summary: 'Dionysos Tapınağı, tiyatro, antik liman ve surlarıyla Sığacık yakınındaki önemli İyon kentlerinden biridir.', image: require('../assets/izmir/teos.jpg'), mapQuery: 'Teos Antik Kenti giriş Seferihisar İzmir', credit: 'Kadı · CC BY-SA 4.0', imagePage: commons('Teos,_Sığacık.jpg'), sourceUrl: 'https://muze.gov.tr/' },
  { id: 'izmir-foca', name: 'Eski Foça ve Beşkapılar', district: 'Foça', category: 'Sahil', summary: 'Tarihî limanı, Beşkapılar Kalesi, kıyı sokakları ve gün batımıyla Eski Foça’nın bütünlüklü yürüyüş rotası.', image: require('../assets/izmir/foca.jpg'), mapQuery: 'Beşkapılar Kalesi Eski Foça İzmir', credit: 'Dosseman · CC BY-SA 4.0', imagePage: commons('Foça_Harbour_scene_6451.jpg'), sourceUrl: tourism },
  { id: 'izmir-dikili', name: 'Dikili Sahili ve Bademli', district: 'Dikili', category: 'Sahil', summary: 'Uzun kıyı hattı, Bademli köyü ve çevredeki berrak koylara açılan kuzey İzmir sahil rotası.', image: require('../assets/izmir/dikili.jpg'), mapQuery: 'Dikili Sahili Bademli İzmir', credit: 'Fatih Renkligil · CC BY-SA 4.0', imagePage: commons('CANDARLI_-_PITANE-_DIKILI_-_IZMIR.jpg'), sourceUrl: tourism },
  { id: 'izmir-karaburun', name: 'Karaburun ve Bodrum Koyu', district: 'Karaburun', category: 'Sahil', summary: 'Yarımadanın sakin merkezi, kayalık kıyıları ve küçük koylarıyla doğa ve deniz odaklı bir rota.', image: require('../assets/izmir/karaburun.jpg'), mapQuery: 'Bodrum Koyu Karaburun İzmir', credit: 'Faik Sarıkaya · Attribution', imagePage: commons('Faik_Sarikaya_Karaburun_Bodrum_Koyu.jpg'), sourceUrl: tourism },
  { id: 'izmir-birgi', name: 'Birgi Tarihî Yerleşimi', district: 'Ödemiş', category: 'Tarihî doku', summary: 'Geleneksel evleri, Ulu Cami, Çakırağa Konağı ve sokak dokusuyla UNESCO Geçici Listesi’ndeki tarihî yerleşim.', image: require('../assets/izmir/birgi.jpg'), mapQuery: 'Birgi tarihi merkezi Ödemiş İzmir', credit: 'Volker Höhfeld · CC BY-SA 4.0', imagePage: commons('Birgi_15_05_1988_historische_Olivenölfabrik_unterhalb_von_Birgi.jpg'), sourceUrl: 'https://whc.unesco.org/en/tentativelists/6037/' },
  { id: 'izmir-sasali', name: 'İzmir Doğal Yaşam Parkı', district: 'Çiğli', category: 'Aile & Park', summary: 'Geniş doğal yaşam alanları ve eğitim odaklı sergileme düzeniyle çocuklu ailelerin öne çıkan açık hava durağı.', image: require('../assets/izmir/sasali.jpg'), mapQuery: 'İzmir Doğal Yaşam Parkı Sasalı Çiğli giriş', credit: 'VikiPicture · CC BY-SA 3.0', imagePage: commons('İzmir_Natural_Life_Park_p1.JPG'), sourceUrl: 'https://www.izmirdogalyasamparki.org.tr/' },
  { id: 'izmir-gediz', name: 'Gediz Deltası ve İzmir Kuş Cenneti', district: 'Çiğli', category: 'Doğa', summary: 'Flamingolar başta olmak üzere zengin kuş varlığına ev sahipliği yapan uluslararası önemde sulak alan ve kuş gözlem rotası.', image: require('../assets/izmir/gediz.jpg'), mapQuery: 'İzmir Kuş Cenneti ziyaretçi merkezi Çiğli', credit: 'Emoboy1331 · CC BY-SA 4.0', imagePage: commons('Flamingos_flying_in_Gediz_Delta.jpg'), sourceUrl: 'https://www.izmir.bel.tr/' },
  { id: 'izmir-meryem-ana', name: 'Meryem Ana Evi', district: 'Selçuk', category: 'Manevi', summary: 'Bülbüldağı üzerindeki Hristiyan hac ve ziyaret alanı; Efes-Selçuk kültür rotasının önemli manevi durağı.', image: require('../assets/izmir/meryem-ana.jpg'), mapQuery: 'Meryem Ana Evi giriş Selçuk İzmir', credit: 'Giorgio Galeotti · CC BY-SA 4.0', imagePage: commons('House_of_the_Virgin_Mary_-_Meryemana_Nature_Park,_Selçuk,_İzmir_Province,_Turkey_-_October_7,_2025.jpg'), sourceUrl: tourism },
  { id: 'izmir-ilica', name: 'Ilıca Plajı', district: 'Çeşme', category: 'Sahil', summary: 'Sığ ve kumlu kıyısı, termal kaynaklarla ilişkilendirilen denizi ve uzun sahiliyle Çeşme’nin bilinen halk plajlarından.', image: require('../assets/izmir/ilica.jpg'), mapQuery: 'Ilıca Halk Plajı Çeşme İzmir giriş', credit: 'Nihat1988 · CC BY 3.0', imagePage: commons('Cesme_Ilica_Plaji_(beach)_-_panoramio.jpg'), sourceUrl: 'https://www.cesme.bel.tr/' },
  { id: 'izmir-altinkum', name: 'Altınkum Plajı', district: 'Çeşme', category: 'Sahil', summary: 'Çiftlikköy yakınında serin ve berrak deniziyle bilinen geniş kumsal; farklı işletme ve halk erişim noktaları bulunur.', image: require('../assets/izmir/altinkum.jpg'), mapQuery: 'Altınkum Plajı Çiftlik Çeşme İzmir', credit: 'Bir Ege Hikayesi · CC BY 3.0', imagePage: commons('Altınkum,_35930_Ovacık-Çeşme-İzmir,_Turkey_-_panoramio.jpg'), sourceUrl: 'https://www.cesme.bel.tr/' },
  { id: 'izmir-pirlanta', name: 'Pırlanta Plajı', district: 'Çeşme', category: 'Sahil', summary: 'Çiftlikköy tarafındaki rüzgârlı, geniş kum kıyısı; deniz koşulları ziyaret öncesinde kontrol edilmelidir.', image: require('../assets/izmir/pirlanta.jpg'), mapQuery: 'Pırlanta Plajı Çiftlikköy Çeşme İzmir', credit: 'Justinianus · CC BY-SA 4.0', imagePage: commons('Pırlanta_koyu_1.jpg'), sourceUrl: 'https://www.cesme.bel.tr/' },
  { id: 'izmir-ekmeksiz', name: 'Ekmeksiz Plajı', district: 'Seferihisar', category: 'Sahil', summary: 'Teos ve Sığacık yakınındaki doğal kıyı; erişim ve işletme durumu mevsimsel olarak resmî kaynaklardan kontrol edilmelidir.', image: require('../assets/izmir/ekmeksiz.jpg'), mapQuery: 'Ekmeksiz Plajı Seferihisar İzmir', credit: 'Visit İzmir · İzmir Büyükşehir Belediyesi', imagePage: 'https://www.visitizmir.org/en/Destinasyon/10665', sourceUrl: 'https://www.visitizmir.org/en/Destinasyon/10665' },
  { id: 'izmir-mordogan', name: 'Mordoğan ve Ardıç Plajı', district: 'Karaburun', category: 'Sahil', summary: 'Mordoğan kıyısındaki yerleşim ve Ardıç çevresindeki yüzme alanları, yarımadanın ailelerce tercih edilen sahil duraklarındandır.', image: require('../assets/izmir/mordogan.jpg'), mapQuery: 'Ardıç Plajı Mordoğan Karaburun İzmir', credit: 'Bir Ege Hikayesi · CC BY 3.0', imagePage: commons('35970_Mordoğan-Karaburun-İzmir,_Turkey_-_panoramio.jpg'), sourceUrl: 'https://www.karaburun.bel.tr/' },
  { id: 'izmir-gumuldur', name: 'Gümüldür Sahili', district: 'Menderes', category: 'Sahil', summary: 'Mandalina bahçeleriyle çevrili yerleşimin uzun kıyı hattı; halk plajları ve konaklama alanlarıyla güney İzmir tatil rotası.', image: require('../assets/izmir/gümüldür.jpg'), mapQuery: 'Gümüldür Halk Plajı Menderes İzmir', credit: 'BIG-K006 · CC BY 4.0', imagePage: commons('Güneşin_batışı_Gümüldür,_İzmir,_Türkiye.jpg'), sourceUrl: 'https://www.menderes.bel.tr/' },
  { id: 'izmir-ozdere', name: 'Özdere ve Çukuraltı Sahili', district: 'Menderes', category: 'Sahil', summary: 'Koylar, halk plajları ve kıyı yürüyüşleriyle Menderes’in başlıca deniz tatili bölgelerinden.', image: require('../assets/izmir/ozdere.jpg'), mapQuery: 'Çukuraltı Halk Plajı Özdere Menderes İzmir', credit: 'CherryX · CC BY-SA 3.0', imagePage: commons('Özdere_Beach_(CherryX).jpg'), sourceUrl: 'https://www.menderes.bel.tr/' },
];

const district = (name: string, signature: string, highlights: string[], flavors: string[]): IzmirDistrict => ({ name, signature, highlights, flavors, mapQuery: `${name} İzmir` });
export const izmirDistricts: IzmirDistrict[] = [
  district('Aliağa','Sanayi kıyısı, antik miras ve kuzey körfez',['Kyme Antik Kenti','Şakran kıyısı','Aliağa Kuş Cenneti'],['Helvacı lokması','Deniz ürünleri']),
  district('Balçova','Teleferik, termal bölge ve kent ormanı',['Balçova Teleferik','İnciraltı Kent Ormanı','Termal tesisler'],['Ot yemekleri','Kahvaltı']),
  district('Bayındır','Çiçekçilik, tarihî merkez ve kırsal Ege',['Bayındır tarihî merkezi','Çiçek üretim alanları','Ilıca kaplıcaları'],['Zeytinyağlılar','Yerel süt ürünleri']),
  district('Bayraklı','Eski Smyrna ve körfez sahili',['Smyrna Bayraklı Höyüğü','Bayraklı sahili','Smyrna Meydanı'],['Boyoz','Deniz ürünleri']),
  district('Bergama','UNESCO mirası ve çok katmanlı antik kent',['Bergama Akropolü','Asklepion','Kızıl Avlu'],['Bergama tulumu','Çığırtma']),
  district('Beydağ','Dağ-kırsal peyzajı ve baraj çevresi',['Beydağ Barajı','Tarihî merkez','Kırsal yürüyüşler'],['Kestane','Köy ürünleri']),
  district('Bornova','Köşkler, üniversite yaşamı ve vadiler',['Homeros Vadisi','Bornova köşkleri','Büyükpark'],['Kokoreç','Kafe kültürü']),
  district('Buca','Levanten mirası, gölet ve kent yaşamı',['Buca Gölet','Forbes Köşkü','Kaynaklar'],['Buca üzümü','Köfte']),
  district('Çeşme','Kale, Alaçatı, koylar ve rüzgâr',['Çeşme Kalesi','Alaçatı','Ilıca Plajı'],['Kumru','Sakızlı tatlar']),
  district('Çiğli','Gediz Deltası ve aile doğa rotaları',['İzmir Kuş Cenneti','Doğal Yaşam Parkı','Gediz Deltası'],['Kahvaltı','Ege otları']),
  district('Dikili','Bademli koyları, şelale ve uzun sahil',['Dikili Sahili','Bademli','Nebiler Şelalesi'],['Deniz ürünleri','Zeytin']),
  district('Foça','Antik Phokaia, taş sokaklar ve koylar',['Eski Foça','Beşkapılar','Yeni Foça'],['Balık','Foça yoğurdu']),
  district('Gaziemir','Havalimanı, fuar ve kent bağlantısı',['Fuar İzmir','Sarnıç çevresi','Adnan Menderes Havalimanı'],['İzmir köfte','Kafe kültürü']),
  district('Güzelbahçe','Körfez kıyısı, balıkçılık ve yürüyüş',['Güzelbahçe sahili','Yelki','Balık hali çevresi'],['Balık','Kahvaltı']),
  district('Karabağlar','Mobilya kültürü ve kent dokusu',['Mobilyacılar bölgesi','Uzundere Rekreasyon Alanı','Kavacık köyü'],['Kavacık üzümü','İzmir köfte']),
  district('Karaburun','Bakir koylar, fener ve nergis',['Sarpıncık Feneri','Mordoğan','Manal Koyu'],['Nergis','Deniz ürünleri']),
  district('Karşıyaka','Çarşı, Bostanlı ve yerel sahil yaşamı',['Karşıyaka Çarşısı','Bostanlı Gün Batımı Terası','Karşıyaka Sahili'],['Boyoz','Kumru']),
  district('Kemalpaşa','Nif Dağı, nazar boncuğu ve Hitit izi',['Nazarköy','Karabel Anıtı','Nif Dağı'],['Kemalpaşa kirazı','Köy ürünleri']),
  district('Kınık','Bakırçay havzası ve kırsal kültür',['Kınık tarihî merkezi','Karadere ormanları','Yerel pazar'],['Kınık zeytini','Köy ekmeği']),
  district('Kiraz','Dağ köyleri, yayla ve tarım kültürü',['Kiraz tarihî merkezi','Suludere çevresi','Yerel pazar'],['Kiraz','Kestane']),
  district('Konak','Saat Kulesi, Kemeraltı ve Kordon',['Saat Kulesi','Kemeraltı','Tarihî Asansör'],['Boyoz','Söğüş']),
  district('Menderes','Gümüldür, Özdere ve antik Klaros',['Gümüldür','Özdere','Klaros Kehanet Merkezi'],['Mandalina','Deniz ürünleri']),
  district('Menemen','Seramik geleneği, tarihî merkez ve Gediz ovası',['Taşhan','Menemen çömlekçileri','Larissa Antik Kenti'],['Menemen çömleği','Yoğurt']),
  district('Narlıdere','Körfez yamaçları ve kent ormanı',['Narlıdere sahili','Kent ormanı','Yukarı Narlıdere'],['Ege otları','Kahvaltı']),
  district('Ödemiş','Birgi, Bozdağ ve Küçük Menderes kültürü',['Birgi','Gölcük','Bozdağ'],['Ödemiş köftesi','Töngül pide']),
  district('Seferihisar','Sığacık, Teos ve sakin sahiller',['Sığacık Kaleiçi','Teos Antik Kenti','Akkum'],['Mandalina','Enginar']),
  district('Selçuk','Efes, kutsal yapılar ve Şirince',['Efes Antik Kenti','Ayasuluk Tepesi','Şirince'],['Şeftali','Çöp şiş']),
  district('Tire','Tarihî çarşı, Salı pazarı ve zanaatlar',['Tire Pazarı','Tire tarihî çarşısı','Necip Paşa Kütüphanesi'],['Tire köftesi','Tak tak kebabı']),
  district('Torbalı','Metropolis ve verimli ova',['Metropolis Antik Kenti','Key Müzesi','Tarihî Torbalı'],['Torbalı zeytini','Köfte']),
  district('Urla','İskele, sanat, antik liman ve bağlar',['Urla İskele','Sanat Sokağı','Klazomenai'],['Enginar','Bağ ürünleri']),
];

export const izmirFoodGuide = [
  { dish:'Boyoz & yumurta', area:'Konak · Alsancak', note:'İzmir’in klasik fırın ürününü sabah saatlerinde tarihî fırın ve pastanelerde deneyin.', mapQuery:'boyoz fırını Alsancak Konak İzmir' },
  { dish:'Gevrek', area:'Kemeraltı · Karşıyaka', note:'Pekmezli, çıtır İzmir gevreğini çarşı fırınlarında ve seyyar tezgâhlarda arayın.', mapQuery:'İzmir gevreği Kemeraltı İzmir' },
  { dish:'Kumru', area:'Çeşme · Alaçatı', note:'Susamlı kumru ekmeğiyle hazırlanan sıcak çeşidi Çeşme merkez ve Alaçatı çevresinde deneyin.', mapQuery:'kumru Çeşme İzmir' },
  { dish:'İzmir söğüş', area:'Kemeraltı · Basmane', note:'İnce doğranmış sakatat, domates ve soğanla hazırlanan dürümü geleneksel söğüşçülerde tadın.', mapQuery:'söğüş Kemeraltı İzmir' },
  { dish:'İzmir köfte', area:'Konak · merkez', note:'Patates, domates ve köfteyle fırınlanan ev yemeği klasiğini esnaf lokantalarında arayın.', mapQuery:'İzmir köfte restoran Konak İzmir' },
  { dish:'Tire köftesi', area:'Tire', note:'İnce uzun köfteyi tereyağı, domates ve yoğurtla sunan ilçe lokantalarında deneyin.', mapQuery:'Tire köftesi Tire İzmir' },
  { dish:'Ödemiş köftesi', area:'Ödemiş', note:'Izgara köfteyi ekmek, maydanoz ve yöresel garnitürlerle sunan yerel salonları tercih edin.', mapQuery:'Ödemiş köftesi Ödemiş İzmir' },
  { dish:'Ot yemekleri & şevketibostan', area:'Urla · Seferihisar', note:'Mevsim otlarını zeytinyağlı, kuzu etli veya salata olarak sunan Ege lokantalarında keşfedin.', mapQuery:'Ege ot yemekleri Urla Seferihisar İzmir' },
  { dish:'Enginar', area:'Urla · Seferihisar', note:'İlkbaharda üretici pazarları ve zeytinyağlı mutfaklarda sakız enginarını arayın.', mapQuery:'enginar restoran Urla İzmir' },
  { dish:'Deniz ürünleri', area:'Foça · Karaburun · Güzelbahçe', note:'Günlük av ve mevsim durumuna göre kıyı balıkçıları ile restoranları karşılaştırın.', mapQuery:'balık restoranları Foça Karaburun Güzelbahçe İzmir' },
  { dish:'Şambali & lokma', area:'Kemeraltı', note:'Şerbetli sokak tatlılarını tarihî çarşı çevresindeki köklü tatlıcılarda deneyin.', mapQuery:'şambali lokma Kemeraltı İzmir' },
  { dish:'İzmir bomba', area:'Alsancak', note:'Akışkan çikolatalı modern kent tatlısını Alsancak çevresindeki fırınlarda arayın.', mapQuery:'İzmir bomba Alsancak İzmir' },
];

export const izmirVenueAreas = [
  { area:'Kemeraltı & Alsancak', district:'Konak', character:'Esnaf lokantalarından yeni nesil kafelere uzanan merkez seçkisi.', cafeQuery:'kafeler Kemeraltı Alsancak İzmir', restaurantQuery:'restoranlar Kemeraltı Alsancak İzmir' },
  { area:'Karşıyaka & Bostanlı', district:'Karşıyaka', character:'Sahil kafeleri, çarşı lezzetleri ve hareketli akşam yaşamı.', cafeQuery:'kafeler Bostanlı Karşıyaka İzmir', restaurantQuery:'restoranlar Bostanlı Karşıyaka İzmir' },
  { area:'Alaçatı & Çeşme', district:'Çeşme', character:'Ege mutfağı, kumru, deniz ürünleri ve yaz geceleri.', cafeQuery:'kafeler Alaçatı Çeşme İzmir', restaurantQuery:'restoranlar Alaçatı Çeşme İzmir' },
  { area:'Urla İskele & Bağ Yolu', district:'Urla', character:'Şef restoranları, bağ rotaları, enginar ve sakin kıyı sofraları.', cafeQuery:'kafeler Urla İskele İzmir', restaurantQuery:'restoranlar Urla Bağ Yolu İzmir' },
  { area:'Sığacık Kaleiçi', district:'Seferihisar', character:'Üretici pazarı, mandalina ürünleri ve deniz kıyısı.', cafeQuery:'kafeler Sığacık Seferihisar', restaurantQuery:'restoranlar Sığacık Seferihisar' },
  { area:'Eski Foça', district:'Foça', character:'Tarihî limanda balık, mezeler ve gün batımı.', cafeQuery:'kafeler Eski Foça İzmir', restaurantQuery:'balık restoranları Eski Foça İzmir' },
  { area:'Şirince', district:'Selçuk', character:'Köy kahvaltısı, meyve ürünleri ve Ege ev yemekleri.', cafeQuery:'kafeler Şirince Selçuk', restaurantQuery:'restoranlar Şirince Selçuk' },
  { area:'Bergama Çarşısı', district:'Bergama', character:'Yerel peynir, çığırtma ve geleneksel lokantalar.', cafeQuery:'kafeler Bergama çarşı İzmir', restaurantQuery:'restoranlar Bergama İzmir' },
];

export const izmirNightlifeAreas = [
  { area:'Alsancak & Kordon', district:'Konak', character:'Canlı müzik, kafeler, restoranlar ve Kordon boyunca geceye uzanan hareketli İzmir atmosferi.', mapQuery:'akşam mekanları canlı müzik Alsancak Kordon İzmir' },
  { area:'Kıbrıs Şehitleri & Alsancak', district:'Konak', character:'Yoğun yaya hareketi, kültür durakları, kafeler ve canlı müzikle merkezde hareketli bir akşam rotası.', mapQuery:'akşam mekanları Kıbrıs Şehitleri Alsancak İzmir' },
  { area:'Bostanlı & Karşıyaka', district:'Karşıyaka', character:'Gün batımı, sahil yürüyüşü, kafeler ve restoranlarla yerel yaşamın akşama taşındığı kıyı bölgesi.', mapQuery:'akşam mekanları Bostanlı Karşıyaka İzmir' },
  { area:'Bornova Küçükpark', district:'Bornova', character:'Öğrenci yaşamı, kafeler, kültür ve canlı müzik seçenekleriyle hareketli akşam saatlerine sahip merkez.', mapQuery:'akşam mekanları canlı müzik Küçükpark Bornova İzmir' },
  { area:'Alaçatı', district:'Çeşme', character:'Taş sokaklar, restoranlar ve canlı müzikle özellikle yaz sezonunda hareketlenen yarımada akşamları.', mapQuery:'akşam mekanları canlı müzik Alaçatı Çeşme İzmir' },
  { area:'Çeşme Marina & Merkez', district:'Çeşme', character:'Marina, restoranlar ve sahil yürüyüşüyle yaz akşamlarında canlı, deniz odaklı bir merkez rotası.', mapQuery:'akşam mekanları Çeşme Marina Çeşme İzmir' },
  { area:'Urla İskele', district:'Urla', character:'Kıyı restoranları, sakin yürüyüşler ve uzun akşam yemekleriyle daha dingin bir Ege gecesi alternatifi.', mapQuery:'akşam mekanları restoranlar Urla İskele İzmir' },
];

export const izmirShoppingStreets = [
  { area:'Kemeraltı Çarşısı', district:'Konak', character:'Hanları, pasajları, geleneksel dükkânları, baharatçıları ve Kızlarağası Hanı çevresiyle İzmir’in tarihî alışveriş merkezidir.', mapQuery:'Kemeraltı Çarşısı alışveriş Konak İzmir' },
  { area:'Alsancak & Kıbrıs Şehitleri Caddesi', district:'Konak', character:'Butik dükkânlar, kitapçılar, mağazalar ve kafelerle yürünebilir İzmir kent yaşamını alışverişle birleştiren aks.', mapQuery:'alışveriş Kıbrıs Şehitleri Caddesi Alsancak İzmir' },
  { area:'Karşıyaka Çarşısı', district:'Karşıyaka', character:'Vapur iskelesinden başlayan yoğun yaya aksında mağazaları, kitapçıları, kafeleri ve yerel çarşı atmosferini buluşturur.', mapQuery:'Karşıyaka Çarşısı alışveriş İzmir' },
  { area:'Alaçatı Çarşısı', district:'Çeşme', character:'Taş sokaklarda butik mağazalar, tasarım ürünleri, yerel tatlar ve hediyeliklerle özellikle yazın canlanan kasaba rotası.', mapQuery:'Alaçatı Çarşısı alışveriş Çeşme İzmir' },
  { area:'Çeşme Çarşısı', district:'Çeşme', character:'Kale, marina ve merkez arasında yerel ürünleri, hediyelikleri ve sahil kasabası alışverişini bir araya getirir.', mapQuery:'Çeşme Çarşısı alışveriş İzmir' },
  { area:'Urla Sanat Sokağı & Malgaca Pazarı', district:'Urla', character:'Sanat, butik üretim, yerel ürünler ve tarihî pazar dokusuyla sakin bir Ege kasabası alışveriş deneyimi sunar.', mapQuery:'Urla Sanat Sokağı Malgaca Pazarı alışveriş İzmir' },
  { area:'Sığacık Kaleiçi & Üretici Pazarı', district:'Seferihisar', character:'Kaleiçi sokaklarında yerel üretici tezgâhları, el emeği ürünler ve hediyelikleri tarihî doku içinde buluşturur.', mapQuery:'Sığacık Kaleiçi Üretici Pazarı alışveriş Seferihisar İzmir' },
  { area:'Tire Tarihî Çarşısı', district:'Tire', character:'Geleneksel dükkânlar, yerel pazar kültürü, el işi ürünler ve Tire’ye özgü tatlarla güçlü bir ilçe çarşısı rotasıdır.', mapQuery:'Tire Tarihî Çarşısı pazar alışveriş İzmir' },
  { area:'Bergama Tarihî Çarşısı', district:'Bergama', character:'Arasta çevresi, geleneksel esnaf, yerel dokumalar ve yöresel ürünlerle arkeoloji gezisini çarşı kültürüyle tamamlar.', mapQuery:'Bergama Tarihî Çarşısı arasta alışveriş İzmir' },
];

export const izmirAccommodations: AccommodationArea[] = [
  { area:'Konak & Alsancak', district:'Konak', category:'Merkez', bestFor:'İlk ziyaret · araçsız gezi · gece hayatı', character:'Metro, tramvay, vapur, Kemeraltı ve Kordon’a kolay erişim.', level:'Karma', mapQuery:'otel Konak Alsancak İzmir' },
  { area:'Karşıyaka & Bostanlı', district:'Karşıyaka', category:'Yerel yaşam', bestFor:'Sahil · uzun konaklama', character:'Vapur bağlantısı ve sahil yaşamıyla merkeze alternatif.', level:'Orta', mapQuery:'otel Karşıyaka Bostanlı İzmir' },
  { area:'Çeşme & Alaçatı', district:'Çeşme', category:'Deniz', bestFor:'Plaj · gece hayatı · butik tatil', character:'Plajlara yakın tatil köyleri, butik oteller ve pansiyonlar.', level:'Lüks', mapQuery:'otel Çeşme Alaçatı İzmir' },
  { area:'Urla', district:'Urla', category:'Gastronomi', bestFor:'Bağ rotası · sakin tatil', character:'İskele, bağlar ve gastronomi duraklarına yakın butik seçenekler.', level:'Orta', mapQuery:'butik otel Urla İzmir' },
  { area:'Sığacık', district:'Seferihisar', category:'Sakin sahil', bestFor:'Aile · Cittaslow deneyimi', character:'Kaleiçi pansiyonları ve sahil konaklamaları.', level:'Orta', mapQuery:'otel pansiyon Sığacık Seferihisar' },
  { area:'Selçuk & Şirince', district:'Selçuk', category:'Kültür', bestFor:'Efes · Şirince', character:'Antik kent erişimi ve tarihî köy atmosferi.', level:'Karma', mapQuery:'otel Selçuk Şirince İzmir' },
  { area:'Eski Foça', district:'Foça', category:'Sahil', bestFor:'Tarihî doku · sakin deniz', character:'Liman çevresinde butik otel ve pansiyonlar.', level:'Orta', mapQuery:'otel Eski Foça İzmir' },
  { area:'Bergama', district:'Bergama', category:'Arkeoloji', bestFor:'Akropol · kültür', character:'Antik alanlara yakın kent otelleri ve pansiyonlar.', level:'Ekonomik', mapQuery:'otel Bergama İzmir' },
];

export const izmirRoutes: DailyRoute[] = [
  { id:'izmir-merkez', title:'İzmir merkez', duration:'1 gün', theme:'#315F53', stops:['İzmir Saat Kulesi','Kemeraltı Çarşısı','Kızlarağası Hanı','Smyrna Agora','Alsancak Kordon'] },
  { id:'izmir-efes', title:'Efes & Selçuk', duration:'1 gün', theme:'#75513B', stops:['Efes Antik Kenti','Efes Müzesi','Ayasuluk Tepesi','Meryem Ana Evi','Şirince'] },
  { id:'izmir-cesme', title:'Çeşme & Alaçatı', duration:'1 gün', theme:'#477A89', stops:['Alaçatı Yel Değirmenleri','Ilıca Plajı','Çeşme Kalesi','Çeşme Marina'] },
  { id:'izmir-urla', title:'Urla sanat & gastronomi', duration:'1 gün', theme:'#8B6844', stops:['Urla Sanat Sokağı','Klazomenai Antik Kenti','Urla İskele','Urla Bağ Yolu'] },
  { id:'izmir-sigacik', title:'Sığacık & Teos', duration:'1 gün', theme:'#486F59', stops:['Sığacık Kaleiçi','Sığacık Pazarı','Teos Antik Kenti','Akkum Plajı'] },
  { id:'izmir-bergama', title:'Bergama mirası', duration:'1 gün', theme:'#69513F', stops:['Bergama Akropolü','Asklepion','Kızıl Avlu','Bergama Çarşısı'] },
  { id:'izmir-foca', title:'Foça kıyı günü', duration:'1 gün', theme:'#456C7A', stops:['Eski Foça','Beşkapılar Kalesi','Foça Limanı','Yeni Foça'] },
  { id:'izmir-birgi', title:'Birgi & Ödemiş', duration:'1 gün', theme:'#6E7548', stops:['Birgi Ulu Cami','Çakırağa Konağı','Ödemiş Tarihî Merkezi','Gölcük Gölü'] },
  { id:'izmir-dikili', title:'Dikili & Bademli', duration:'1 gün', theme:'#477A89', stops:['Dikili Sahili','Bademli','Killik Koyu','Nebiler Şelalesi'] },
  { id:'izmir-karaburun', title:'Karaburun & Mordoğan', duration:'1 gün', theme:'#315F53', stops:['Mordoğan','Manal Koyu','Karaburun Merkez','Sarpıncık Feneri'] },
];

export const izmirFamilyRoutes = [
  { area:'Doğal Yaşam & Kuş Cenneti', district:'Çiğli', character:'Doğal Yaşam Parkı ve Gediz Deltası çevresinde doğa odaklı tam gün.', mapQuery:'İzmir Doğal Yaşam Parkı İzmir Kuş Cenneti' },
  { area:'Kültürpark & Kordon', district:'Konak', character:'Yeşil alan, oyun molaları ve sahil yürüyüşünü birleştiren kolay merkez rotası.', mapQuery:'Kültürpark Kordon İzmir' },
  { area:'İnciraltı açık hava günü', district:'Balçova', character:'Kent Ormanı, bisiklet alanları ve kıyı molalarıyla çocuklara uygun rota.', mapQuery:'İnciraltı Kent Ormanı Balçova İzmir' },
  { area:'Sığacık & Akkum', district:'Seferihisar', character:'Kaleiçi gezisiyle uygun deniz koşullarında sahil molasını birleştirin.', mapQuery:'Sığacık Kaleiçi Akkum Plajı İzmir' },
  { area:'Selçuk keşif günü', district:'Selçuk', character:'Efes Müzesi, Ayasuluk çevresi ve Şirince ile tarih odaklı aile günü.', mapQuery:'Efes Müzesi Ayasuluk Şirince İzmir' },
];

export const izmirTransport = [
  { icon:'M', name:'İzmir Metro', description:'Merkez aksları, Bornova, Konak ve güneybatı yönleri arasında raylı ulaşım.', mapQuery:'İzmir Metro istasyonları' },
  { icon:'İZ', name:'İZBAN', description:'Aliağa–Selçuk aksında havalimanı ve çok sayıda ilçe bağlantısı sunan banliyö sistemi.', mapQuery:'İZBAN istasyonları İzmir' },
  { icon:'T', name:'Tramvay', description:'Konak, Karşıyaka ve Çiğli kıyı akslarında kent içi bağlantı.', mapQuery:'İzmir tramvay durakları' },
  { icon:'V', name:'İZDENİZ vapurları', description:'Körfezin iki yakası arasında Konak, Karşıyaka, Bostanlı ve diğer iskele bağlantıları.', mapQuery:'İZDENİZ vapur iskeleleri İzmir' },
  { icon:'B', name:'ESHOT otobüsleri', description:'Merkez ve çevre ilçelere yayılan belediye otobüs ağı.', mapQuery:'ESHOT durakları İzmir' },
  { icon:'✈', name:'Adnan Menderes Havalimanı', description:'İZBAN, otobüs ve karayoluyla kent merkezine bağlanan ana hava ulaşım noktası.', mapQuery:'Adnan Menderes Havalimanı İzmir' },
  { icon:'O', name:'Otogar & ilçe bağlantıları', description:'Çeşme, Urla, Foça, Bergama ve Seferihisar yönleri için güncel aktarma noktalarını kontrol edin.', mapQuery:'İzmir Otogar ilçe otobüsleri' },
];

export const izmirGallery = [
  { title:'Konak Saat Kulesi', district:'Konak', image:require('../assets/izmir/hero.jpg') },
  { title:'Efes ve Celsus', district:'Selçuk', image:require('../assets/izmir/efes.jpg') },
  { title:'Bergama Akropolü', district:'Bergama', image:require('../assets/izmir/bergama.jpg') },
  { title:'Sığacık Kaleiçi', district:'Seferihisar', image:require('../assets/izmir/sigacik.jpg') },
  { title:'Eski Foça Limanı', district:'Foça', image:require('../assets/izmir/foca.jpg') },
  { title:'Gediz Deltası', district:'Çiğli', image:require('../assets/izmir/gediz.jpg') },
];
