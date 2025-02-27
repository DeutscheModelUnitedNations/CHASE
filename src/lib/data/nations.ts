import nationsData from "./nations.json";

export type NationTranslation = {
  id: number;
  alpha2?: string;
  alpha3: string;
  ar?: string;
  bg?: string;
  cs?: string;
  da?: string;
  de: string;
  el?: string;
  en: string;
  eo?: string;
  es?: string;
  et?: string;
  eu?: string;
  fi?: string;
  fr?: string;
  hr?: string;
  hu?: string;
  hy?: string;
  it?: string;
  ja?: string;
  ko?: string;
  lt?: string;
  nl?: string;
  no?: string;
  pl?: string;
  pt?: string;
  ro?: string;
  ru?: string;
  sk?: string;
  sl?: string;
  sr?: string;
  sv?: string;
  th?: string;
  uk?: string;
  zh?: string;
  "zh-tw"?: string;
};

const nations: NationTranslation[] = nationsData;

export default nations;
