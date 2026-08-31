export type IzmirDistrictTheme = 'Deniz' | 'Tarih' | 'Doğa' | 'Gastronomi' | 'Aile' | 'Eğlence';

export type IzmirDistrictGuideProfile = {
  name: string;
  tagline: string;
  whyVisit: string;
  themes: IzmirDistrictTheme[];
  photoPlaceId?: string;
};

const profile = (
  name: string,
  tagline: string,
  whyVisit: string,
  themes: IzmirDistrictTheme[],
  photoPlaceId?: string,
): IzmirDistrictGuideProfile => ({ name, tagline, whyVisit, themes, photoPlaceId });

// This layer describes each district without duplicating places, beaches or venue data.
// Related content is joined by district name inside App.tsx from the canonical datasets.
export const izmirDistrictGuideProfiles: IzmirDistrictGuideProfile[] = [
  profile('Aliağa', 'Antik Aiolis izleriyle kuzey kıyılarının buluştuğu ilçe', 'Kyme çevresindeki antik mirası, Yeni Şakran kıyıları ve kuş gözlem alanlarıyla sanayi kimliğinin ötesinde farklı bir kuzey İzmir rotası sunar.', ['Deniz', 'Tarih', 'Doğa']),
  profile('Balçova', 'Termal su, teleferik ve kent doğası', 'Merkeze yakın konumda termal dinlenme, İnciraltı kıyısı ve teleferik çevresindeki manzarayı aynı güne sığdırmak isteyenler için uygundur.', ['Doğa', 'Aile', 'Gastronomi']),
  profile('Bayındır', 'Çiçeklerin biçimlendirdiği sakin Küçük Menderes kasabası', 'Çiçekçilik kültürü, tarihî sokakları ve kırsal üretimiyle kalabalıktan uzak, yerel yaşam odaklı bir Ege deneyimi sunar.', ['Doğa', 'Gastronomi', 'Tarih']),
  profile('Bayraklı', 'Eski Smyrna’dan modern körfez yaşamına', 'Smyrna höyüğünde İzmir’in erken kent tarihini izleyip körfez kıyısında çağdaş şehir manzarasını görmek için güçlü bir merkez durağıdır.', ['Tarih', 'Aile']),
  profile('Bergama', 'UNESCO mirasının yaşayan antik kenti', 'Akropol, Asklepion, Kızıl Avlu ve tarihî çarşısıyla arkeolojiyi yerel yaşam ve güçlü bir gastronomi geleneğiyle birleştirir.', ['Tarih', 'Gastronomi', 'Doğa'], 'izmir-bergama'),
  profile('Beydağ', 'Baraj, dağ köyleri ve kırsal Ege manzaraları', 'Beydağ Barajı çevresi, tarım kültürü ve sakin dağ peyzajıyla doğa içinde yavaş bir keşif arayanlara hitap eder.', ['Doğa', 'Gastronomi']),
  profile('Bornova', 'Levanten köşkleri, üniversite yaşamı ve yeşil vadiler', 'Tarihî köşkleri, Homeros Vadisi ve Küçükpark çevresindeki canlı sosyal yaşamıyla kültür, doğa ve genç şehir ritmini bir araya getirir.', ['Tarih', 'Doğa', 'Aile', 'Eğlence']),
  profile('Buca', 'Levanten izleri ve kentin güneyindeki yeşil kaçışlar', 'Tarihî köşkleri, Kaynaklar çevresi ve Buca Gölet ile şehir içinde mimari ve açık hava rotalarını birleştirir.', ['Tarih', 'Doğa', 'Aile']),
  profile('Çeşme', 'İzmir’in Ege’ye açılan turkuaz kapısı', 'Alaçatı, koyları, plajları, tarihî kalesi ve hareketli Ege yaşamıyla İzmir’in en güçlü deniz tatili ve kültür rotalarından biridir.', ['Deniz', 'Tarih', 'Gastronomi', 'Aile', 'Eğlence'], 'izmir-cesme-kalesi'),
  profile('Çiğli', 'Gediz Deltası’nın kuşları ve aile doğa rotaları', 'Flamingoları, sulak alan ekosistemi ve İzmir Doğal Yaşam Parkı ile doğa gözlemi ve çocuklu aileler için öne çıkar.', ['Doğa', 'Aile'], 'izmir-gediz'),
  profile('Dikili', 'Bademli koylarından kuzey Ege’nin uzun sahillerine', 'Berrak koyları, Çandarlı çevresi, Nebiler doğası ve zeytin kültürüyle deniz ile kırsal keşfi bir araya getirir.', ['Deniz', 'Doğa', 'Aile', 'Gastronomi'], 'izmir-dikili'),
  profile('Foça', 'Antik Phokaia’nın taş sokakları ve gün batımı kıyıları', 'Eski Foça limanı, Beşkapılar, Yeni Foça ve çevre koylarıyla tarihî doku, deniz ve sakin akşam yaşamını birlikte sunar.', ['Deniz', 'Tarih', 'Gastronomi', 'Aile', 'Eğlence'], 'izmir-foca'),
  profile('Gaziemir', 'Fuar, ulaşım ve güney İzmir’in kent kapısı', 'Fuar İzmir, Sarnıç çevresi ve havalimanı bağlantısıyla özellikle etkinlik, ulaşım ve kısa şehir molaları için işlevsel bir ilçedir.', ['Aile']),
  profile('Güzelbahçe', 'Körfez kıyısında balıkçılık ve sakin yürüyüşler', 'Sahil hattı, balıkçılık kültürü ve Yelki çevresiyle merkeze yakın, yeme-içme ve gün batımı odaklı sakin bir rota sunar.', ['Deniz', 'Gastronomi', 'Aile']),
  profile('Karabağlar', 'Kentsel zanaat kültüründen Kavacık bağlarına', 'Mobilyacılık geleneği, Uzundere rekreasyon alanı ve Kavacık’ın üzüm bağlarıyla şehir ile kırsal deneyimi buluşturur.', ['Doğa', 'Gastronomi', 'Aile']),
  profile('Karaburun', 'Nergis kokulu yarımadanın bakir koyları', 'Sarpıncık Feneri, Mordoğan, Manal ve yarımadanın doğal kıyılarıyla yavaş deniz tatili ve manzara rotalarının adresidir.', ['Deniz', 'Doğa', 'Gastronomi'], 'izmir-karaburun'),
  profile('Karşıyaka', 'Çarşıdan Bostanlı gün batımına yerel İzmir yaşamı', 'Vapur, yaya çarşısı, sahil parkları ve Bostanlı çevresindeki sosyal yaşamıyla araçsız keşfe uygun canlı bir kıyı ilçesidir.', ['Deniz', 'Gastronomi', 'Aile', 'Eğlence']),
  profile('Kemalpaşa', 'Nif Dağı eteklerinde nazar boncuğu ve Hitit izi', 'Nazarköy’ün zanaat kültürü, Karabel Anıtı ve Nif Dağı çevresiyle tarih, doğa ve kırsal üretimi birleştirir.', ['Tarih', 'Doğa', 'Gastronomi']),
  profile('Kınık', 'Bakırçay Ovası’nın sakin kırsal kültürü', 'Yerel pazarları, zeytin üretimi ve ormanlık çevresiyle kuzey İzmir’in gündelik yaşamını ve kırsal peyzajını tanıtır.', ['Doğa', 'Gastronomi']),
  profile('Kiraz', 'Dağ köyleri ve bereketli yayla tarımı', 'Kestane, kiraz ve köy ürünleriyle biçimlenen yerel kültürü; Suludere ve çevre yaylaların sakin doğasıyla birlikte keşfedilir.', ['Doğa', 'Gastronomi']),
  profile('Konak', 'İzmir tarihinin, çarşılarının ve körfez yaşamının merkezi', 'Saat Kulesi’nden Kemeraltı’na, Agora’dan Tarihî Asansör’e uzanan yoğun rota; şehrin kültürünü ve mutfağını yürüyerek keşfetme olanağı verir.', ['Tarih', 'Gastronomi', 'Aile', 'Eğlence'], 'izmir-saat-kulesi'),
  profile('Menderes', 'Mandalina bahçelerinden uzun Ege sahillerine', 'Gümüldür, Özdere, Klaros ve kıyı köyleriyle deniz tatilini antik miras ve yerel üretimle tamamlar.', ['Deniz', 'Tarih', 'Doğa', 'Aile', 'Gastronomi'], 'izmir-gumuldur'),
  profile('Menemen', 'Çömlekçilik geleneği ve Gediz Ovası’nın tarihî ilçesi', 'Taşhan, seramik atölyeleri ve Larissa çevresiyle zanaat, tarih ve tarımsal üretim odaklı özgün bir rota sunar.', ['Tarih', 'Gastronomi']),
  profile('Narlıdere', 'Körfez yamaçlarında kent doğası ve yerel doku', 'Sahil bağlantısı, kent ormanı ve Yukarı Narlıdere çevresiyle yürüyüş, manzara ve sakin mahalle keşiflerini birleştirir.', ['Doğa', 'Aile', 'Gastronomi']),
  profile('Ödemiş', 'Birgi’nin konaklarından Bozdağ’ın serinliğine', 'Birgi, Gölcük ve Bozdağ üçgeninde tarihî doku, dağ doğası ve güçlü Küçük Menderes mutfağını birlikte sunar.', ['Tarih', 'Doğa', 'Gastronomi', 'Aile'], 'izmir-birgi'),
  profile('Seferihisar', 'Sığacık, Teos ve sakin Ege kıyıları', 'Kaleiçi sokakları, antik Teos, üretici kültürü ve plajlarıyla yavaş şehir deneyimini tarih ve denizle buluşturur.', ['Deniz', 'Tarih', 'Gastronomi', 'Aile'], 'izmir-sigacik'),
  profile('Selçuk', 'Efes’in dünya mirasından Şirince’nin sokaklarına', 'Efes, Ayasuluk, Meryem Ana Evi, Şirince ve Pamucak ile arkeoloji, inanç, köy yaşamı ve kıyıyı tek ilçede birleştirir.', ['Deniz', 'Tarih', 'Gastronomi', 'Aile'], 'izmir-efes'),
  profile('Tire', 'Tarihî çarşılar, zanaatlar ve güçlü ilçe mutfağı', 'Salı pazarı, geleneksel çarşı, kütüphane ve han çevresiyle yaşayan Ege kent kültürünü Tire köftesi gibi yerel tatlarla tamamlar.', ['Tarih', 'Gastronomi', 'Aile']),
  profile('Torbalı', 'Metropolis’ten otomobil tarihine ova rotası', 'Metropolis Antik Kenti, Key Müzesi ve verimli ova peyzajıyla arkeoloji, aile gezisi ve kırsal üretim arasında farklı seçenekler sunar.', ['Tarih', 'Aile', 'Gastronomi']),
  profile('Urla', 'Bağlar, sanat ve antik liman arasında Ege yaşamı', 'Klazomenai, İskele, sanat sokakları, koylar ve gastronomi bölgeleriyle kültür, deniz ve yerel üretimi dengeli biçimde birleştirir.', ['Deniz', 'Tarih', 'Gastronomi', 'Aile', 'Eğlence']),
];

export const izmirDistrictGuideByName = new Map(izmirDistrictGuideProfiles.map(item => [item.name, item]));

