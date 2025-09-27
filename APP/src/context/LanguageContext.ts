import { createContext, useContext } from "react";
import polish from "../languages/polish";
import english from "../languages/english";


const languages = {polish, english}

 export type LanguageName = "polish" | "english"

export const LanguageContext = createContext<{
  languageName: LanguageName;
  setLanguageName: (languageName: LanguageName) => void;
}>({languageName: "polish", setLanguageName: ()=>{}});



export const useLanguage = () => {

    const { languageName } = useContext(LanguageContext)

    return languages[languageName]




}
