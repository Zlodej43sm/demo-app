import base from "./base.json";
import en from "./en.json";
import { LANG_CODES } from "../common/constants";
export type AppMessages = typeof base;

export const appMessages = (selectedLanguage: LANG_CODES): AppMessages => {
  switch (selectedLanguage) {
    case LANG_CODES.EN: {
      return { ...base, ...en };
    }

    default:
      return { ...base };
  }
};
