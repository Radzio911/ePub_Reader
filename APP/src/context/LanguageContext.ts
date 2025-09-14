import { createContext, useContext } from "react";
import polish from "../languages/polish";


const languages = {polish}

 export type LanguageName = "polish"

export const LanguageContext = createContext<{
  name: LanguageName;
  setName: (name: LanguageName) => void;
}>({name: "polish", setName: ()=>{}});



export const useLanguage = () => {

    const { name } = useContext(LanguageContext)

    return languages[name]




}
