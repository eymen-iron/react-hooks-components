import React, { useState, useEffect } from 'react';

interface PageLoaderProps {
  /** Loader'ı gösterip göstermeme kontrolü */
  isLoading?: boolean;
  /** Full screen overlay kullanılacak mı */
  fullScreen?: boolean;
  /** Loader boyutu */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Ana metin */
  text?: string;
  /** Alt metin */
  subText?: string;
  /** Dönen mesajlar listesi */
  messages?: string[];
  /** Yardımcı ipuçları */
  tips?: string[];
  /** Spinner rengi */
  color?: 'blue' | 'gray' | 'green' | 'red' | 'purple' | 'orange' | 'pink' | 'indigo';
  /** Loading animasyon türü */
  animationType?: 'dots' | 'pulse' | 'bounce' | 'wave' | 'scale' | 'rotate' | 'spiral';
  /** Animasyon hızı */
  speed?: 'slow' | 'normal' | 'fast';
  /** Progress bar göster */
  showProgress?: boolean;
  /** Progress yüzdesi (0-100) */
  progress?: number;
  /** Background blur efekti */
  blur?: boolean;
  /** Z-index değeri */
  zIndex?: number;
  /** Özel pattern */
  customPattern?: React.ReactNode;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = true,
  fullScreen = false,
  size = 'md',
  text = 'Yükleniyor...',
  subText,
  messages = [],
  tips = [],
  color = 'blue',
  animationType = 'dots',
  speed = 'normal',
  showProgress = false,
  progress = 0,
  blur = true,
  zIndex = 50,
  customPattern,
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  // Mesaj ve tip rotasyonu
  useEffect(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [messages.length]);

  useEffect(() => {
    if (tips.length > 1) {
      const interval = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [tips.length]);

  if (!isLoading) return null;

  // Boyut ayarları
  const sizeClasses = {
    sm: { spinner: 'w-8 h-8', dot: 'w-2 h-2' },
    md: { spinner: 'w-12 h-12', dot: 'w-3 h-3' },
    lg: { spinner: 'w-16 h-16', dot: 'w-4 h-4' },
    xl: { spinner: 'w-20 h-20', dot: 'w-5 h-5' },
  };

  // Renk ayarları - Sabit class'lar kullanıyoruz
  const getColorClasses = (colorName: string) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', border: 'border-blue-500', borderSecondary: 'border-blue-200' },
      gray: { bg: 'bg-gray-500', border: 'border-gray-500', borderSecondary: 'border-gray-200' },
      green: { bg: 'bg-green-500', border: 'border-green-500', borderSecondary: 'border-green-200' },
      red: { bg: 'bg-red-500', border: 'border-red-500', borderSecondary: 'border-red-200' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-500', borderSecondary: 'border-purple-200' },
      orange: { bg: 'bg-orange-500', border: 'border-orange-500', borderSecondary: 'border-orange-200' },
      pink: { bg: 'bg-pink-500', border: 'border-pink-500', borderSecondary: 'border-pink-200' },
      indigo: { bg: 'bg-indigo-500', border: 'border-indigo-500', borderSecondary: 'border-indigo-200' },
    };
    return colorMap[colorName as keyof typeof colorMap] || colorMap.blue;
  };

  const colorClasses = getColorClasses(color);

  // Hız ayarları
  const speedClass = speed === 'fast' ? 'anim-fast' : speed === 'slow' ? 'anim-slow' : 'anim-normal';

  const containerClass = fullScreen
    ? `fixed inset-0 flex items-center justify-center bg-white/90 ${blur ? 'backdrop-blur-sm' : ''}`
    : 'flex flex-col items-center justify-center py-8';

  const zIndexStyle = fullScreen ? { zIndex } : undefined;

  // Loading animasyon komponentleri
  const LoadingAnimations = {
    dots: () => (
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`${sizeClasses[size].dot} ${colorClasses.bg} rounded-full animate-bounce`}
            style={{
              animationDelay: `${index * 0.15}s`,
              animationDuration: speed === 'fast' ? '0.8s' : speed === 'slow' ? '1.6s' : '1.2s',
            }}
          />
        ))}
      </div>
    ),

    pulse: () => (
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`${sizeClasses[size].dot} ${colorClasses.bg} rounded-full animate-pulse`}
            style={{
              animationDelay: `${index * 0.2}s`,
              animationDuration: speed === 'fast' ? '1s' : speed === 'slow' ? '2s' : '1.5s',
            }}
          />
        ))}
      </div>
    ),

    bounce: () => (
      <div className="flex space-x-1">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`${sizeClasses[size].dot} ${colorClasses.bg} rounded-full bounce-loader ${speedClass}`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    ),

    wave: () => (
      <div className="flex space-x-1 items-end">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`w-1 ${colorClasses.bg} rounded-full wave-loader ${speedClass}`}
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    ),

    scale: () => (
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`${sizeClasses[size].dot} ${colorClasses.bg} rounded-full scale-loader ${speedClass}`}
            style={{
              animationDelay: `${index * 0.15}s`,
            }}
          />
        ))}
      </div>
    ),

    rotate: () => (
      <div className="relative">
        <div
          className={`${sizeClasses[size].spinner} border-4 ${colorClasses.borderSecondary} ${colorClasses.border} border-t-transparent rounded-full animate-spin`}
          style={{
            animationDuration: speed === 'fast' ? '0.8s' : speed === 'slow' ? '2s' : '1.2s',
          }}
        />
      </div>
    ),

    spiral: () => (
      <div className="relative">
        <div
          className={`${sizeClasses[size].spinner} border-4 border-transparent ${colorClasses.border} border-t-current border-r-current rounded-full spiral-loader ${speedClass}`}
        />
        <div
          className={`absolute inset-2 border-4 border-transparent ${colorClasses.border} border-b-current border-l-current rounded-full spiral-loader-reverse`}
        />
      </div>
    ),
  };

  const currentMessage = messages.length > 0 ? messages[currentMessageIndex] : text;
  const currentTip = tips.length > 0 ? tips[currentTipIndex] : subText;

  return (
    <div className={containerClass} style={zIndexStyle}>
      <div className="flex flex-col items-center space-y-6 max-w-md mx-auto px-6">
        {/* Custom Pattern veya Loading Animation */}
        {customPattern || (
          <div className="flex items-center justify-center">
            {LoadingAnimations[animationType]()}
          </div>
        )}

        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>İlerleme</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 ${colorClasses.bg} rounded-full transition-all duration-300 ease-out`}
                style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
              />
            </div>
          </div>
        )}

        {/* Loading Text */}
        {currentMessage && (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 transition-all duration-500">
              {currentMessage}
            </h3>
            {currentTip && (
              <p className="text-sm text-gray-600 transition-all duration-500 leading-relaxed">
                {currentTip}
              </p>
            )}
          </div>
        )}

        {/* Loading Counter (sadece uzun loading'ler için) */}
        {tips.length > 0 && (
          <div className="flex space-x-1">
            {tips.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentTipIndex ? colorClasses.bg : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLoader;

// Convenience exports
export const FullScreenLoader = (props: Omit<PageLoaderProps, 'fullScreen'>) => (
  <PageLoader {...props} fullScreen={true} />
);

export const InlineLoader = (props: Omit<PageLoaderProps, 'fullScreen'>) => (
  <PageLoader {...props} fullScreen={false} />
);

export const SimpleSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  animationType = 'rotate' 
}: Pick<PageLoaderProps, 'size' | 'color' | 'animationType'>) => (
  <PageLoader isLoading={true} fullScreen={false} text="" size={size} color={color} animationType={animationType} />
);

// Hazır loader konfigürasyonları
export const QuickLoaders = {
  // Hızlı işlemler için
  Quick: (props: Partial<PageLoaderProps>) => (
    <PageLoader
      animationType="pulse"
      speed="fast"
      size="sm"
      text="İşleniyor..."
      {...props}
    />
  ),

  // Orta seviye işlemler
  Standard: (props: Partial<PageLoaderProps>) => (
    <PageLoader
      animationType="dots"
      speed="normal"
      size="md"
      text="Yükleniyor..."
      subText="Lütfen bekleyin..."
      {...props}
    />
  ),

  // Uzun işlemler için
  Advanced: (props: Partial<PageLoaderProps>) => (
    <PageLoader
      animationType="spiral"
      speed="normal"
      size="lg"
      messages={['Veriler hazırlanıyor...', 'İşlem devam ediyor...', 'Neredeyse tamam...']}
      tips={[
        'Bu işlem biraz zaman alabilir',
        'Sayfayı kapatmayın',
        'Verileriniz güvenli bir şekilde işleniyor'
      ]}
      showProgress={true}
      {...props}
    />
  ),
}; 