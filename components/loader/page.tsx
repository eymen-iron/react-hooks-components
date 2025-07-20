'use client';

import { useState } from 'react';
import PageLoader, { SimpleSpinner, QuickLoaders } from '@/components/PageLoader';

export default function LoaderDemoPage() {
  const [selectedAnimation, setSelectedAnimation] = useState<'dots' | 'pulse' | 'bounce' | 'wave' | 'scale' | 'rotate' | 'spiral'>('dots');
  const [selectedColor, setSelectedColor] = useState<'blue' | 'gray' | 'green' | 'red' | 'purple' | 'orange' | 'pink' | 'indigo'>('blue');
  const [selectedSpeed, setSelectedSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [selectedSize, setSelectedSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(45);

  const animationTypes: Array<{ type: 'dots' | 'pulse' | 'bounce' | 'wave' | 'scale' | 'rotate' | 'spiral'; name: string; description: string }> = [
    { type: 'dots', name: 'Dots', description: 'Zıplayan noktalar' },
    { type: 'pulse', name: 'Pulse', description: 'Nabız gibi atış' },
    { type: 'bounce', name: 'Bounce', description: 'Esnek zıplama' },
    { type: 'wave', name: 'Wave', description: 'Dalga efekti' },
    { type: 'scale', name: 'Scale', description: 'Büyüme/küçülme' },
    { type: 'rotate', name: 'Rotate', description: 'Klasik spinner' },
    { type: 'spiral', name: 'Spiral', description: 'Çift sarmal' },
  ];

  const colors: Array<{ color: 'blue' | 'gray' | 'green' | 'red' | 'purple' | 'orange' | 'pink' | 'indigo'; name: string }> = [
    { color: 'blue', name: 'Mavi' },
    { color: 'green', name: 'Yeşil' },
    { color: 'red', name: 'Kırmızı' },
    { color: 'purple', name: 'Mor' },
    { color: 'orange', name: 'Turuncu' },
    { color: 'pink', name: 'Pembe' },
    { color: 'indigo', name: 'İndigo' },
    { color: 'gray', name: 'Gri' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            PageLoader Demo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gelişmiş loader komponenti ile 7 farklı animasyon türü, 8 renk seçeneği ve özelleştirilebilir ayarlar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Panel - Ayarlar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Loader Ayarları</h3>
              
              {/* Animasyon Türü */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Animasyon Türü</label>
                <div className="grid grid-cols-2 gap-2">
                  {animationTypes.map((anim) => (
                    <button
                      key={anim.type}
                      onClick={() => setSelectedAnimation(anim.type)}
                      className={`p-3 text-sm rounded-lg border transition-all ${
                        selectedAnimation === anim.type
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">{anim.name}</div>
                      <div className="text-xs text-gray-500">{anim.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Renk */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Renk</label>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.color}
                      onClick={() => setSelectedColor(color.color)}
                      className={`p-2 text-xs rounded-lg border transition-all ${
                        selectedColor === color.color
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 bg-${color.color}-500 rounded-full mx-auto mb-1`}></div>
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Boyut */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Boyut</label>
                <div className="grid grid-cols-4 gap-2">
                  {['sm', 'md', 'lg', 'xl'].map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size as 'sm' | 'md' | 'lg' | 'xl')}
                      className={`p-2 text-xs rounded-lg border transition-all ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {size.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hız */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Hız</label>
                <div className="grid grid-cols-3 gap-2">
                  {['slow', 'normal', 'fast'].map((speed) => (
                    <button
                      key={speed}
                      onClick={() => setSelectedSpeed(speed as 'slow' | 'normal' | 'fast')}
                      className={`p-2 text-xs rounded-lg border transition-all ${
                        selectedSpeed === speed
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {speed === 'slow' ? 'Yavaş' : speed === 'normal' ? 'Normal' : 'Hızlı'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-700">Progress Bar</label>
                  <button
                    onClick={() => setShowProgress(!showProgress)}
                    className={`w-12 h-6 rounded-full border-2 relative transition-all ${
                      showProgress 
                        ? 'bg-blue-500 border-blue-500' 
                        : 'bg-gray-200 border-gray-200'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${
                      showProgress ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                {showProgress && (
                  <div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full mb-2"
                    />
                    <div className="text-xs text-gray-500 text-center">{progress}%</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sağ Panel - Preview */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ana Loader Preview */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">Ana Loader</h4>
                <div className="flex items-center justify-center h-40">
                  <PageLoader
                    isLoading={true}
                    fullScreen={false}
                    size={selectedSize}
                    color={selectedColor}
                    animationType={selectedAnimation}
                    speed={selectedSpeed}
                    text="Örnek yükleme..."
                    subText="Bu bir demo loader'dır"
                    showProgress={showProgress}
                    progress={progress}
                  />
                </div>
              </div>

              {/* Mesajlı Loader Preview */}
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">Mesajlı Loader</h4>
                <div className="flex items-center justify-center h-40">
                  <PageLoader
                    isLoading={true}
                    fullScreen={false}
                    size={selectedSize}
                    color={selectedColor}
                    animationType={selectedAnimation}
                    speed={selectedSpeed}
                    messages={['Veriler yükleniyor...', 'İşlem devam ediyor...', 'Neredeyse bitti...']}
                    tips={['Lütfen bekleyin', 'Bu biraz zaman alabilir', 'Sayfayı kapatmayın']}
                  />
                </div>
              </div>

              {/* Hazır Konfigürasyonlar */}
              <div className="md:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">Hazır Konfigürasyonlar</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h5 className="font-medium text-gray-700 mb-4">Hızlı İşlem</h5>
                    <div className="h-20 flex items-center justify-center">
                      <QuickLoaders.Quick />
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="font-medium text-gray-700 mb-4">Standart</h5>
                    <div className="h-20 flex items-center justify-center">
                      <QuickLoaders.Standard />
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="font-medium text-gray-700 mb-4">Gelişmiş</h5>
                    <div className="h-20 flex items-center justify-center">
                      <QuickLoaders.Advanced progress={75} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sadece Spinner'lar */}
              <div className="md:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 text-center">Simple Spinners</h4>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
                  {animationTypes.map((anim) => (
                    <div key={anim.type} className="text-center">
                      <div className="h-16 flex items-center justify-center mb-2">
                        <SimpleSpinner size="md" color={selectedColor} animationType={anim.type} />
                      </div>
                      <div className="text-xs text-gray-500">{anim.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kullanım Örnekleri */}
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Kullanım Örnekleri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Temel Kullanım</h4>
              <pre className="text-xs text-gray-600 overflow-x-auto">
{`<PageLoader
  isLoading={true}
  animationType="spiral"
  color="blue"
  text="Yükleniyor..."
/>`}
              </pre>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Gelişmiş Kullanım</h4>
              <pre className="text-xs text-gray-600 overflow-x-auto">
{`<PageLoader
  animationType="bounce"
  messages={[
    'Veriler hazırlanıyor...',
    'İşlem devam ediyor...'
  ]}
  tips={['Lütfen bekleyin']}
  showProgress={true}
  progress={progress}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 