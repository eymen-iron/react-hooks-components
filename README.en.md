# Custom React Components & Hooks

[🇹🇷 Türkçe](./README.md) | 🇺🇸 English

Ready-to-use React components and hooks that you'll actually need in your projects. Born from real-world requirements and battle-tested in production. Just copy, paste, and start building awesome stuff.

## 📦 Contents

### Components
- **PageLoader** - Advanced loading component
- **Loader Animations** - CSS animation collection

### Hooks
- **useScrollAnimation** - Scroll-based animation hook
- **useTranslation** - Multi-language support hook

---

## 🎨 PageLoader Component

Advanced and customizable loading component. Comes with 7 different animation types, 8 color options, and progress bar support.

### ✨ Features

- **7 Animation Types**: dots, pulse, bounce, wave, scale, rotate, spiral
- **8 Color Options**: blue, gray, green, red, purple, orange, pink, indigo
- **4 Size Options**: sm, md, lg, xl
- **3 Speed Options**: slow, normal, fast
- **Progress Bar Support**
- **Rotating Messages and Tips**
- **Full Screen and Inline Modes**
- **TypeScript Support**

### 🚀 Usage

```tsx
import PageLoader, { SimpleSpinner, QuickLoaders } from './components/loader/pageLoader';

// Basic usage
<PageLoader
  isLoading={true}
  animationType="spiral"
  color="blue"
  text="Loading..."
/>

// Advanced usage
<PageLoader
  animationType="bounce"
  messages={[
    'Preparing data...',
    'Processing...',
    'Almost done...'
  ]}
  tips={['Please wait', 'This may take a while']}
  showProgress={true}
  progress={75}
  color="green"
  size="lg"
/>

// Pre-configured loaders
<QuickLoaders.Quick />
<QuickLoaders.Standard />
<QuickLoaders.Advanced progress={50} />

// Spinner only
<SimpleSpinner size="md" color="blue" animationType="rotate" />
```

### 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isLoading` | `boolean` | `true` | Control loader visibility |
| `fullScreen` | `boolean` | `false` | Use full screen overlay |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Loader size |
| `color` | `'blue' \| 'gray' \| 'green' \| 'red' \| 'purple' \| 'orange' \| 'pink' \| 'indigo'` | `'blue'` | Spinner color |
| `animationType` | `'dots' \| 'pulse' \| 'bounce' \| 'wave' \| 'scale' \| 'rotate' \| 'spiral'` | `'dots'` | Animation type |
| `speed` | `'slow' \| 'normal' \| 'fast'` | `'normal'` | Animation speed |
| `text` | `string` | `'Loading...'` | Main text |
| `subText` | `string` | - | Sub text |
| `messages` | `string[]` | `[]` | Rotating messages list |
| `tips` | `string[]` | `[]` | Helper tips |
| `showProgress` | `boolean` | `false` | Show progress bar |
| `progress` | `number` | `0` | Progress percentage (0-100) |

---

## 🎭 useScrollAnimation Hook

Advanced hook for scroll-based animations using Intersection Observer API. Compatible with Animate.css and performance-focused.

### ✨ Features

- **Intersection Observer API** usage
- **Animate.css** support
- **Hydration-safe** (SSR compatible)
- **React Strict Mode** compatible
- **Performance optimized**
- **Debug mode**
- **Customizable threshold and margin**

### 🚀 Usage

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
        This element will slide in from left
      </div>
      
      <div 
        data-animation="animate__bounceIn"
        data-delay="0.5"
      >
        This element will bounce in
      </div>
    </div>
  );
}
```

### 📋 HTML Data Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| `data-animation` | Animation class name | `"animate__fadeInUp"` |
| `data-delay` | Delay duration (seconds) | `"0.5"` |
| `data-duration` | Animation duration (seconds) | `"1.2"` |
| `data-once` | One-time animation | `"true"` / `"false"` |

### 📋 Hook Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `selector` | `string` | `'[data-animation]'` | Animation elements selector |
| `defaultAnimation` | `string` | `'animate__fadeInUp'` | Default animation |
| `threshold` | `number` | `0.1` | Intersection threshold |
| `rootMargin` | `string` | `'0px 0px -50px 0px'` | Observer margin |
| `once` | `boolean` | `true` | One-time animation |
| `initiallyHidden` | `boolean` | `true` | Initially hide elements |
| `debug` | `boolean` | `false` | Debug mode |

---

## 🌍 useTranslation Hook

Advanced translation hook for multi-language support. Comes with string interpolation, localStorage persistence, and TypeScript support.

### ✨ Features

- **Multi-language support** (TR/EN)
- **String interpolation** (parameter passing)
- **localStorage persistence**
- **SSR compatible**
- **TypeScript support**
- **Performance optimized**

### 🚀 Usage

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
      
      <p>Current language: {language}</p>
    </div>
  );
}
```

### 📋 Hook Return

| Property | Type | Description |
|----------|------|-------------|
| `language` | `'tr' \| 'en'` | Current language |
| `t` | `(key: string, params?: object) => string` | Translation function |
| `setLanguage` | `(lang: 'tr' \| 'en') => void` | Language setter |
| `isLanguage` | `(lang: 'tr' \| 'en') => boolean` | Language checker |
| `availableLanguages` | `('tr' \| 'en')[]` | Available languages |

### 🔧 Standalone Functions

```tsx
import { 
  translate, 
  getCurrentLanguage, 
  setCurrentLanguage 
} from './hooks/useTranslation';

// Usage outside components
const welcomeText = translate('Hoş geldiniz', {}, 'en');
const currentLang = getCurrentLanguage();
setCurrentLanguage('en');
```

---

## 🎨 Loader CSS Animations

Custom CSS animations for PageLoader component. Optimized keyframes for each animation type.

### 🎭 Animation Types

- **bounceLoader** - Elastic bounce effect
- **waveLoader** - Wave effect
- **scaleLoader** - Scale up/down effect
- **spiralLoader** - Double spiral effect
- **spin** - Classic spinner effect
- **pulse** - Pulse effect

### 🚀 Usage

```css
/* Import CSS file */
@import './components/loader/loader.css';

/* Usage in HTML */
<div class="bounce-loader anim-fast">Loading...</div>
<div class="wave-loader anim-slow">Loading...</div>
<div class="spiral-loader">Loading...</div>
```

---

## 🛠️ Installation and Usage

### Requirements

- React 18+
- TypeScript 4.5+
- Tailwind CSS (for PageLoader)
- Animate.css (for useScrollAnimation, optional)

### Installation

1. Copy files to your project
2. Install required dependencies:

```bash
npm install react react-dom
npm install -D typescript @types/react @types/react-dom
```

3. Tailwind CSS setup (for PageLoader):

```bash
npm install -D tailwindcss postcss autoprefixer
```

4. Animate.css setup (for useScrollAnimation):

```bash
npm install animate.css
```

### Import Usage

```tsx
// Components
import PageLoader, { SimpleSpinner, QuickLoaders } from './components/loader/pageLoader';

// Hooks
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useTranslation } from './hooks/useTranslation';

// CSS
import './components/loader/loader.css';
import 'animate.css'; // for useScrollAnimation
```

---

## 🎯 Examples

### Full Page Loading

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
          'Loading application...',
          'Preparing data...',
          'Almost ready...'
        ]}
        showProgress={true}
        progress={75}
      />
    );
  }

  return <div>Main application content</div>;
}
```

### Scroll Animated Page

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
        <h1>Title</h1>
      </section>
      
      <section 
        data-animation="animate__slideInLeft"
        data-delay="0.3"
      >
        <p>Content sliding from left</p>
      </section>
      
      <section 
        data-animation="animate__bounceIn"
        data-delay="0.6"
      >
        <p>Content bouncing in</p>
      </section>
    </div>
  );
}
```

### Multi-Language App

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
          name: 'User',
          date: new Date().toLocaleDateString()
        })}</p>
      </main>
    </div>
  );
}
```

---

## 🔧 Customization

### PageLoader Theme Customization

```tsx
// Custom color definition
const customLoader = (
  <PageLoader
    animationType="spiral"
    customPattern={
      <div className="custom-spinner">
        {/* Your custom spinner design */}
      </div>
    }
  />
);
```

### Translation Dictionary Extension

```tsx
// In hooks/useTranslation.tsx file
const EnTranslations = {
  'Hoş geldiniz': 'Welcome',
  'Merhaba {name}!': 'Hello {name}!',
  // Add new translations...
};
```

---

## 📝 License

These components and hooks are shared as open source. You can freely use them in your projects.

---

## 🤝 Contributing

To improve these components:

1. Fork the code
2. Add new features
3. Test thoroughly
4. Submit pull request

---
