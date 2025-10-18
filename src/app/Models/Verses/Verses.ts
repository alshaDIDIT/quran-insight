import { Audio } from "./Audio";
import { Translation } from "./Translation";
import { Word } from "./Words";

export interface Verse {
  id: number;
  chapter_id?: number;
  verse_number: number;
  verse_key: string;
  verse_index?: number;
  text_uthmani?: string;
  text_uthmani_simple?: string;
  text_imlaei?: string;
  text_imlaei_simple?: string;
  text_indopak?: string;
  text_uthmani_tajweed?: string;
  juz_number: number;
  hizb_number: number;
  rub_number: number;
  page_number: number; // Deprecated - use v1_page instead
  image_url?: string;
  image_width?: number;
  words?: Word[];
  audio?: Audio;
  translations?: Translation[];
  code_v1?: string;
  code_v2?: string;
  v1_page?: number; // Range: 1-604
  v2_page?: number; // Range: 1-604
}