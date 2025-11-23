// frontend/src/i18n/i18n.js
import { createI18n } from 'vue-i18n'
import en from './en.json'
import ru from './ru.json'
import tj from './tj.json'
import uz from './uz.json'

const savedLocale = localStorage.getItem('locale') || 'en'

export const i18n = createI18n({
    legacy: false,
    locale: savedLocale,
    fallbackLocale: 'en',
    messages: { en, ru, tj, uz },
})

export function setLocale(locale) {
    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
}
