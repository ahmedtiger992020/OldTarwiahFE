// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LanguageService {
//   private currentLang = 'en';
//   private translations = {};

//   public language$ = new BehaviorSubject<string>(this.currentLang);

//   constructor() {
//     // Load translations based on the current language
//     this.loadTranslations(this.currentLang);
//   }

//   loadTranslations(lang: string): void {
//     // Load translations from language file
//     this.translations = require(`../assets/i18n/${lang}.json`);
//     this.currentLang = lang;
//     this.language$.next(lang);
//   }

//   getTranslation(key: string): string {
//     // Get translated string for a given key
//     return this.translations[key] || key;
//   }

//   setLanguage(lang: string): void {
//     // Change current language and reload translations
//     this.loadTranslations(lang);
//   }
// }
