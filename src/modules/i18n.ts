import type { Locale } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import { EnumLanguage } from '~/utils/enums'

const { VITE_I18N_DEFAULT_LANG } = getEnv()

/** 映射后端的多语言值 */
const languageMap: IObject = {
  'zh-CN': 'zh_CN',
  'vi-VN': 'vi_VN',
  'pt-BR': 'pt_BR',
}

const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
})

const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

function setI18nLanguage(lang: Locale) {
  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(langIndex: EnumLanguage): Promise<Locale> {
  const lang = EnumLanguage[langIndex]
  // If the same language
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export function install(app: App<Element>) {
  const localStorageLanguageIndex = Local.get<
    EnumLanguage | null
  >(STORAGE_LANGUAGE_KEY)?.value
  let index: number
  if (localStorageLanguageIndex)
    index = Number(localStorageLanguageIndex)

  else
    index = Number(EnumLanguage[VITE_I18N_DEFAULT_LANG])

  app.use(i18n)

  if (index in EnumLanguage)
    loadLanguageAsync(index)
  else
    loadLanguageAsync(EnumLanguage[VITE_I18N_DEFAULT_LANG])
}

/** 更换语言 */
export function changeLanguage(langIndex: EnumLanguage) {
  Local.set(STORAGE_LANGUAGE_KEY, langIndex)
  loadLanguageAsync(langIndex)
}

/** 获取前端本地多语言 */
export function getCurrentLanguage() {
  return i18n.global.locale.value
}

/** 获取当前对应后端的多语言 */
export function getCurrentLanguageForBackend() {
  return languageMap[getCurrentLanguage() || VITE_I18N_DEFAULT_LANG]
}
