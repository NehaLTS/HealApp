import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./strings/en.json"
import he from "./strings/he.json"
import ru from "./strings/ru.json"
import ar from "./strings/ar.json"
i18next.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "en",
    resources: {
        en: { translation: en },
        he: { translation: he },
        ru: { translation: ru },
        ar: { translation: ar },
    },
    react: {
        useSuspense: false,
    },
});
export default i18next;

