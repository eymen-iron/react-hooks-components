import { useState, useEffect, useCallback, useMemo } from 'react';
// import { EnTranslations } from '@/constant/enWordList';

const EnTranslations = {
    'Hoş geldiniz': 'Welcome',
}

/**
 * Supported languages
 */
export type SupportedLanguage = 'tr' | 'en';

/**
 * Translation parameters for string interpolation
 */
export type TranslationParams = Record<string, string | number>;

/**
 * Translation hook return type
 */
export interface UseTranslationReturn {
    /** Current language */
    language: SupportedLanguage;
    /** Translation function */
    t: (key: string, params?: TranslationParams) => string;
    /** Change language function */
    setLanguage: (language: SupportedLanguage) => void;
    /** Check if current language is specific language */
    isLanguage: (lang: SupportedLanguage) => boolean;
    /** Get available languages */
    availableLanguages: SupportedLanguage[];
}

/**
 * Translation configuration
 */
interface TranslationConfig {
    /** Default language */
    defaultLanguage: SupportedLanguage;
    /** Local storage key */
    storageKey: string;
    /** Fallback to key if translation not found */
    fallbackToKey: boolean;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: TranslationConfig = {
    defaultLanguage: 'tr',
    storageKey: 'site_language',
    fallbackToKey: true,
};

/**
 * Available languages
 */
const AVAILABLE_LANGUAGES: SupportedLanguage[] = ['tr', 'en'];

/**
 * Translation dictionaries
 */
const TRANSLATIONS = {
    tr: {}, // Turkish is the default language, no translations needed
    en: EnTranslations,
} as const;

/**
 * Safe localStorage operations
 */
const storage = {
    get: (key: string, defaultValue: string): string => {
        if (typeof window === 'undefined') return defaultValue;
        try {
            return localStorage.getItem(key) || defaultValue;
        } catch {
            return defaultValue;
        }
    },
    set: (key: string, value: string): void => {
        if (typeof window === 'undefined') return;
        try {
            localStorage.setItem(key, value);
        } catch {
            // Silently fail if localStorage is not available
        }
    },
};

/**
 * String interpolation utility
 */
const interpolateString = (
    template: string,
    params: TranslationParams = {}
): string => {
    return Object.entries(params).reduce((result, [key, value]) => {
        const placeholder = `{${key}}`;
        return result.replace(new RegExp(placeholder, 'g'), String(value));
    }, template);
};

/**
 * Get translation for a key
 */
const getTranslation = (
    key: string,
    language: SupportedLanguage,
    fallbackToKey: boolean = true
): string => {
    // If Turkish, return the key as-is (Turkish is default)
    if (language === 'tr') {
        return key;
    }

    // Get translation from dictionary
    const translation = TRANSLATIONS[language]?.[key];

    if (translation !== undefined && translation !== '') {
        return translation;
    }

    // Fallback to key or empty string
    return fallbackToKey ? key : '';
};

/**
 * Professional translation hook
 * 
 * @description
 * A comprehensive translation hook that provides:
 * - Language switching with persistence
 * - String interpolation
 * - Type-safe language support
 * - SSR compatibility
 * - Performance optimizations
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, language, setLanguage } = useTranslation();
 * 
 *   return (
 *     <div>
 *       <h1>{t('Hoş geldiniz')}</h1>
 *       <p>{t('Merhaba {name}!', { name: 'John' })}</p>
 *       <button onClick={() => setLanguage('en')}>
 *         English
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 * 
 * @param config - Optional configuration
 * @returns Translation utilities
 */
export function useTranslation(
    config: Partial<TranslationConfig> = {}
): UseTranslationReturn {
    const finalConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [config]);

    // Initialize language state
    const [language, setLanguageState] = useState<SupportedLanguage>(() => {
        const stored = storage.get(finalConfig.storageKey, finalConfig.defaultLanguage);
        return AVAILABLE_LANGUAGES.includes(stored as SupportedLanguage)
            ? (stored as SupportedLanguage)
            : finalConfig.defaultLanguage;
    });

    // Sync with localStorage on language change
    useEffect(() => {
        storage.set(finalConfig.storageKey, language);
    }, [language, finalConfig.storageKey]);

    // Translation function
    const t = useCallback(
        (key: string, params: TranslationParams = {}): string => {
            const translation = getTranslation(key, language, finalConfig.fallbackToKey);
            return interpolateString(translation, params);
        },
        [language, finalConfig.fallbackToKey]
    );

    // Language setter with validation
    const setLanguage = useCallback((newLanguage: SupportedLanguage) => {
        if (AVAILABLE_LANGUAGES.includes(newLanguage)) {
            setLanguageState(newLanguage);
        } else {
            console.warn(`Unsupported language: ${newLanguage}`);
        }
    }, []);

    // Language checker
    const isLanguage = useCallback(
        (lang: SupportedLanguage): boolean => language === lang,
        [language]
    );

    return {
        language,
        t,
        setLanguage,
        isLanguage,
        availableLanguages: AVAILABLE_LANGUAGES,
    };
}

/**
 * Standalone translation function (for use outside components)
 * 
 * @param key - Translation key
 * @param params - Interpolation parameters
 * @param targetLanguage - Target language (optional, reads from localStorage)
 * @returns Translated string
 */
export function translate(
    key: string,
    params: TranslationParams = {},
    targetLanguage?: SupportedLanguage
): string {
    const language = targetLanguage ||
        (storage.get(DEFAULT_CONFIG.storageKey, DEFAULT_CONFIG.defaultLanguage) as SupportedLanguage);

    const translation = getTranslation(key, language, DEFAULT_CONFIG.fallbackToKey);
    return interpolateString(translation, params);
}

/**
 * Get current language from storage
 */
export function getCurrentLanguage(): SupportedLanguage {
    const stored = storage.get(DEFAULT_CONFIG.storageKey, DEFAULT_CONFIG.defaultLanguage);
    return AVAILABLE_LANGUAGES.includes(stored as SupportedLanguage)
        ? (stored as SupportedLanguage)
        : DEFAULT_CONFIG.defaultLanguage;
}

/**
 * Set language in storage
 */
export function setCurrentLanguage(language: SupportedLanguage): void {
    if (AVAILABLE_LANGUAGES.includes(language)) {
        storage.set(DEFAULT_CONFIG.storageKey, language);
    } else {
        console.warn(`Unsupported language: ${language}`);
    }
}

/**
 * Check if a language is supported
 */
export function isSupportedLanguage(language: string): language is SupportedLanguage {
    return AVAILABLE_LANGUAGES.includes(language as SupportedLanguage);
}

// Legacy exports for backward compatibility
export const __ = translate;
export const GetUserLanguage = getCurrentLanguage;
export const SetUserLanguage = setCurrentLanguage;