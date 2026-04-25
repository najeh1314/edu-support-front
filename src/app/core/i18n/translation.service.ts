import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocalizedText } from '../models/content.models';

type SupportedLanguage = 'en' | 'fr' | 'ar';

const STORAGE_KEY = 'edu-support-language';
const DEFAULT_LANGUAGE: SupportedLanguage = 'en';
const AVAILABLE_LANGUAGES: SupportedLanguage[] = ['en', 'fr', 'ar'];

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly dictionaries = new Map<SupportedLanguage, Record<string, unknown>>();
  private readonly currentLanguageState = signal<SupportedLanguage>(this.readStoredLanguage());
  private readonly isReadyState = signal(false);

  readonly currentLanguage = this.currentLanguageState.asReadonly();
  readonly isReady = this.isReadyState.asReadonly();
  readonly direction = computed(() => (this.currentLanguageState() === 'ar' ? 'rtl' : 'ltr'));
  readonly availableLanguages: SupportedLanguage[] = AVAILABLE_LANGUAGES;

  async initialize(): Promise<void> {
    await this.use(this.currentLanguageState());
  }

  async use(language: SupportedLanguage): Promise<void> {
    if (!this.dictionaries.has(language)) {
      const dictionary = await firstValueFrom(
        this.http.get<Record<string, unknown>>(`/i18n/${language}.json`)
      );
      this.dictionaries.set(language, dictionary);
    }

    this.currentLanguageState.set(language);
    localStorage.setItem(STORAGE_KEY, language);
    this.document.documentElement.lang = language;
    this.document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    this.document.body.setAttribute('dir', this.document.documentElement.dir);
    this.isReadyState.set(true);
  }

  translate(key: string): string {
    const dictionary = this.dictionaries.get(this.currentLanguageState());
    if (!dictionary) {
      return key;
    }

    const value = key.split('.').reduce<unknown>((accumulator, part) => {
      if (accumulator && typeof accumulator === 'object' && part in accumulator) {
        return (accumulator as Record<string, unknown>)[part];
      }
      return undefined;
    }, dictionary);

    return typeof value === 'string' ? value : key;
  }

  pick(text: LocalizedText): string {
    return text[this.currentLanguageState()];
  }

  private readStoredLanguage(): SupportedLanguage {
    const stored = localStorage.getItem(STORAGE_KEY) as SupportedLanguage | null;
    return stored && AVAILABLE_LANGUAGES.includes(stored) ? stored : DEFAULT_LANGUAGE;
  }
}
