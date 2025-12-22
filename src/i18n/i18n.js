import ar from "./ar"
import en from "./en"

export const t = (key, lang) => {
  const dict = lang === "ar" ? ar : en
  return dict[key] || key
}
