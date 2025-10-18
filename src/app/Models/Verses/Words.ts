import { Translation } from "./Translation";
import { Transliteration } from "./Transliteration";

export interface Word {
    id: number;
    position: number;
    text_uthmani: string;
    text_indopak: string;
    text_imlaei: string;
    verse_key: string;
    page_number: number;
    line_number: number;
    audio_url: string;
    location: string;
    char_type_name: string;
    code_v1: string;
    code_v2: string;
    translation: Translation;
    transliteration: Transliteration;
    v1_page: number;
    v2_page: number;
}