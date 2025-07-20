# Custom React Components & Hooks

🇹🇷 Türkçe | [🇺🇸 English](./README.en.md)

React projelerinizde sıkça ihtiyaç duyacağınız, kullanıma hazır komponentler ve hook'lar. Gerçek projelerden çıkan ihtiyaçlar doğrultusunda geliştirildi ve production ortamında test edildi. Hepsini kopyala-yapıştır ile hemen kullanmaya başlayabilirsiniz.

## 📦 İçerik

### Components

- **PageLoader** - Gelişmiş loading komponenti
- **Loader Animations** - CSS animasyon koleksiyonu

### Hooks

- **useScrollAnimation** - Scroll tabanlı animasyon hook'u
- **useTranslation** - Çoklu dil desteği hook'u

---

## 🎨 PageLoader Component

Gelişmiş ve özelleştirilebilir loading komponenti. 7 farklı animasyon türü, 8 renk seçeneği ve progress bar desteği ile birlikte gelir.

### ✨ Özellikler

- **7 Animasyon Türü**: dots, pulse, bounce, wave, scale, rotate, spiral
- **8 Renk Seçeneği**: blue, gray, green, red, purple, orange, pink, indigo
- **4 Boyut Seçeneği**: sm, md, lg, xl
- **3 Hız Seçeneği**: slow, normal, fast
- **Progress Bar Desteği**
- **Dönen Mesajlar ve İpuçları**
- **Full Screen ve Inline Modları**
- **TypeScript Desteği**

### 🚀 Kullanım

```tsx
import PageLoader, { SimpleSpinner, QuickLoaders } from './components/loader/pageLoader';

// Temel kullanım
<PageLoader
  isLoading={true}
  animationType="spiral"
  color="blue"
  text="Yükleniyor..."
/>

// Gelişmiş kullanım
<PageLoader
  animationType="bounce"
  messages={[
    'Veriler hazırlanıyor...',
    'İşlem devam ediyor...',
    'Neredeyse tamam...'
  ]}
  tips={['Lütfen bekleyin', 'Bu biraz zaman alabilir']}
  showProgress={true}
  progress={75}
  color="green"
  size="lg"
/>

// Hazır konfigürasyonlar
<QuickLoaders.Quick />
<QuickLoaders.Standard />
<QuickLoaders.Advanced progress={50} />

// Sadece spinner
<SimpleSpinner size="md" color="blue" animationType="rotate" />
```

### 📋 Props

| Prop | Tip | Varsayılan | Açıklama |
|------|-----|------------|----------|
| `isLoading` | `boolean` | `true` | Loader'ı gösterip göstermeme kontrolü |
| `fullScreen` | `boolean` | `false` | Full screen overlay kullanılacak mı |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Loader boyutu |
| `color` | `'blue' \| 'gray' \| 'green' \| 'red' \| 'purple' \| 'orange' \| 'pink' \| 'indigo'` | `'blue'` | Spinner rengi |
| `animationType` | `'dots' \| 'pulse' \| 'bounce' \| 'wave' \| 'scale' \| 'rotate' \| 'spiral'` | `'dots'` | Animasyon türü |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animasyon hızı |
| `text` | `string` | `'Yükleniyor...'` | Ana metin |
| `subText` | `string` | - | Alt metin |
| `messages` | `string[]` | `[]` | Dönen mesajlar listesi |
| `tips` | `string[]` | `[]` | Yardımcı ipuçları |
| `showProgress` | `boolean` | `false` | Progress bar göster |
| `progress` | `number` | `0` | Progress yüzdesi (0-100) |

---

## 🎭 useScrollAnimation Hook

Intersection Observer API kullanarak scroll tabanlı animasyonlar için gelişmiş hook. Animate.css ile uyumlu ve performans odaklı.

### ✨ Özellikler

- **Intersection Observer API** kullanımı
- **Animate.css** desteği
- **Hydration-safe** (SSR uyumlu)
- **React Strict Mode** uyumlu
- **Performance optimized**
- **Debug modu**
- **Özelleştirilebilir threshold ve margin**

### 🚀 Kullanım

```tsx
import { useScrollAnimation } from './hooks/useScrollAnimation';

function MyComponent() {
  const { reinitialize, triggerAnimation, isSupported } = useScrollAnimation({
    selector: '[data-animation]',
    defaultAnimation: 'animate__fadeInUp',
    threshold: 0.1,
    once: true,
    debug: true
  });

  return (
    <div>
      <div 
        data-animation="animate__fadeInLeft"
        data-delay="0.2"
        data-duration="1"
      >
        Bu element soldan kayarak gelecek
      </div>
      
      <div 
        data-animation="animate__bounceIn"
        data-delay="0.5"
      >
        Bu element zıplayarak gelecek
      </div>
    </div>
  );
}
```

### 📋 HTML Data Attributes

| Attribute | Açıklama | Örnek |
|-----------|----------|-------|
| `data-animation` | Animasyon class adı | `"animate__fadeInUp"` |
| `data-delay` | Gecikme süresi (saniye) | `"0.5"` |
| `data-duration` | Animasyon süresi (saniye) | `"1.2"` |
| `data-once` | Tek seferlik animasyon | `"true"` / `"false"` |

### 📋 Hook Options

| Option | Tip | Varsayılan | Açıklama |
|--------|-----|------------|----------|
| `selector` | `string` | `'[data-animation]'` | Animasyon elementleri seçici |
| `defaultAnimation` | `string` | `'animate__fadeInUp'` | Varsayılan animasyon |
| `threshold` | `number` | `0.1` | Intersection threshold |
| `rootMargin` | `string` | `'0px 0px -50px 0px'` | Observer margin |
| `once` | `boolean` | `true` | Tek seferlik animasyon |
| `initiallyHidden` | `boolean` | `true` | Başlangıçta gizle |
| `debug` | `boolean` | `false` | Debug modu |

---

## 🌍 useTranslation Hook

Çoklu dil desteği için gelişmiş translation hook'u. String interpolation, localStorage persistence ve TypeScript desteği ile birlikte gelir.

### ✨ Özellikler

- **Çoklu dil desteği** (TR/EN)
- **String interpolation** (parametre geçirme)
- **localStorage persistence**
- **SSR uyumlu**
- **TypeScript desteği**
- **Performance optimized**

### 🚀 Kullanım

```tsx
import { useTranslation } from './hooks/useTranslation';

function MyComponent() {
  const { t, language, setLanguage, isLanguage } = useTranslation();

  return (
    <div>
      <h1>{t('Hoş geldiniz')}</h1>
      <p>{t('Merhaba {name}!', { name: 'John' })}</p>
      
      <button 
        onClick={() => setLanguage('en')}
        className={isLanguage('en') ? 'active' : ''}
      >
        English
      </button>
      
      <button 
        onClick={() => setLanguage('tr')}
        className={isLanguage('tr') ? 'active' : ''}
      >
        Türkçe
      </button>
      
      <p>Mevcut dil: {language}</p>
    </div>
  );
}
```

### 📋 Hook Return

| Property | Tip | Açıklama |
|----------|-----|----------|
| `language` | `'tr' \| 'en'` | Mevcut dil |
| `t` | `(key: string, params?: object) => string` | Çeviri fonksiyonu |
| `setLanguage` | `(lang: 'tr' \| 'en') => void` | Dil değiştirme |
| `isLanguage` | `(lang: 'tr' \| 'en') => boolean` | Dil kontrolü |
| `availableLanguages` | `('tr' \| 'en')[]` | Mevcut diller |

### 🔧 Standalone Functions

```tsx
import { 
  translate, 
  getCurrentLanguage, 
  setCurrentLanguage 
} from './hooks/useTranslation';

// Component dışında kullanım
const welcomeText = translate('Hoş geldiniz', {}, 'en');
const currentLang = getCurrentLanguage();
setCurrentLanguage('en');
```

---

## 🎨 Loader CSS Animations

PageLoader komponenti için özel CSS animasyonları. Her animasyon türü için optimize edilmiş keyframe'ler.

### 🎭 Animasyon Türleri

- **bounceLoader** - Esnek zıplama efekti
- **waveLoader** - Dalga efekti
- **scaleLoader** - Büyüme/küçülme efekti
- **spiralLoader** - Çift sarmal efekti
- **spin** - Klasik döner efekt
- **pulse** - Nabız efekti

### 🚀 Kullanım

```css
/* CSS dosyasını import edin */
@import './components/loader/loader.css';

/* HTML'de kullanım */
<div class="bounce-loader anim-fast">Loading...</div>
<div class="wave-loader anim-slow">Loading...</div>
<div class="spiral-loader">Loading...</div>
```

---

## 🛠️ Kurulum ve Kullanım

### Gereksinimler

- React 18+
- TypeScript 4.5+
- Tailwind CSS (PageLoader için)
- Animate.css (useScrollAnimation için, opsiyonel)

### Kurulum

1. Dosyaları projenize kopyalayın
2. Gerekli bağımlılıkları yükleyin:

```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
```

3. Tailwind CSS kurulumu (PageLoader için):

```bash
npm install -D tailwindcss postcss autoprefixer
```

4. Animate.css kurulumu (useScrollAnimation için):

```bash
npm install animate.css
```

### Import Kullanımı

```tsx
// Components
import PageLoader, { SimpleSpinner, QuickLoaders } from './components/loader/pageLoader';

// Hooks
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useTranslation } from './hooks/useTranslation';

// CSS
import './components/loader/loader.css';
import 'animate.css'; // useScrollAnimation için
```

---

## 🎯 Örnekler

### Tam Sayfa Loading

```tsx
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated loading
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return (
      <PageLoader
        fullScreen={true}
        animationType="spiral"
        color="blue"
        messages={[
          'Uygulama yükleniyor...',
          'Veriler hazırlanıyor...',
          'Neredeyse hazır...'
        ]}
        showProgress={true}
        progress={75}
      />
    );
  }

  return <div>Ana uygulama içeriği</div>;
}
```

### Scroll Animasyonlu Sayfa

```tsx
function AnimatedPage() {
  useScrollAnimation({
    defaultAnimation: 'animate__fadeInUp',
    threshold: 0.2,
    debug: true
  });

  return (
    <div>
      <section data-animation="animate__fadeInDown">
        <h1>Başlık</h1>
      </section>
      
      <section 
        data-animation="animate__slideInLeft"
        data-delay="0.3"
      >
        <p>Sol taraftan gelen içerik</p>
      </section>
      
      <section 
        data-animation="animate__bounceIn"
        data-delay="0.6"
      >
        <p>Zıplayarak gelen içerik</p>
      </section>
    </div>
  );
}
```

### Çoklu Dil Desteği

```tsx
function MultiLanguageApp() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div>
      <header>
        <h1>{t('Hoş geldiniz')}</h1>
        <nav>
          <button onClick={() => setLanguage('tr')}>TR</button>
          <button onClick={() => setLanguage('en')}>EN</button>
        </nav>
      </header>
      
      <main>
        <p>{t('Merhaba {name}, bugün {date} tarihinde buradasınız.', {
          name: 'Kullanıcı',
          date: new Date().toLocaleDateString()
        })}</p>
      </main>
    </div>
  );
}
```

---

## 🔧 Özelleştirme

### PageLoader Tema Özelleştirmesi

```tsx
// Özel renk tanımlaması
const customLoader = (
  <PageLoader
    animationType="spiral"
    customPattern={
      <div className="custom-spinner">
        {/* Özel spinner tasarımınız */}
      </div>
    }
  />
);
```

### Translation Sözlük Genişletme

```tsx
// hooks/useTranslation.tsx dosyasında
const EnTranslations = {
  'Hoş geldiniz': 'Welcome',
  'Merhaba {name}!': 'Hello {name}!',
  // Yeni çeviriler ekleyin...
};
```

---

## 📝 Lisans

Bu komponentler ve hook'lar açık kaynak olarak paylaşılmıştır. Projelerinizde özgürce kullanabilirsiniz.

---

## 🤝 Katkıda Bulunma

Bu komponentleri geliştirmek için:

1. Kodu fork edin
2. Yeni özellikler ekleyin
3. Test edin
4. Pull request gönderin

---

## 📞 İletişim

Sorularınız veya önerileriniz için issue açabilir veya doğrudan iletişime geçebilirsiniz.
