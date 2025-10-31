import { writable } from "svelte/store"

export type Languages = 'en' | 'th'

export const languages: Record<Languages, string> = {
  en: 'English',
  th: 'Thai'
}

export const defaultLang = 'en'

export const ui = {
    en: {
        'nav.home': 'Home',
        'nav.posts': 'Blogposts',
        'nav.projects': 'Projects',
        'nav.about': 'About',
        'title.home': 'Contemporary Texts',
        'title.posts': 'Bibliography (Posts)',
        'title.projects': 'Projects',
        'title.about': 'About',
        'button.seeAllPosts': 'See All Posts >',
    },
    th: {
        'nav.home': 'หน้าแรก',
        'nav.posts': 'บล็อกโพสต์',
        'nav.projects': 'โปรเจกต์',
        'nav.about': 'เกี่ยวกับเรา',
        'title.home': 'บล็อกโพสต์ล่าสุด',
        'title.posts': 'บล็อกโพสต์ทั้งหมด',
        'title.projects': 'โปรเจกต์',
        'title.about': 'เกี่ยวกับเรา',
        'button.seeAllPosts': 'บล็อกโพสต์ทั้งหมด >',
    }
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key]
  }
}

export const currentLang = writable<Languages>(defaultLang)