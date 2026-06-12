/**
 * Re:combo · Acervo
 * Fonte: README.md do repositório hdmabuse/recombo
 * Todos os links apontam para archive.org (funcionais).
 */

export type ArchiveItemType = "performance" | "video" | "music" | "mixer";

export interface ArchiveItem {
  id: string;
  title: string;
  type: ArchiveItemType;
  url: string;
  year?: number;
  location?: string;
  description?: string;
}

export const archive: ArchiveItem[] = [
  // Performances
  {
    id: "perf-01",
    title: "Rádio Re:combo — Isto é Música?/!",
    type: "performance",
    url: "https://archive.org/details/ReCombo_CCBB",
    year: 2005,
    location: "Rio de Janeiro",
    description: "CCBB Rio de Janeiro",
  },
  {
    id: "perf-02",
    title: "Rádio Re:combo — Transmídia Itaú Cultural",
    type: "performance",
    url: "https://archive.org/details/recombo-performance-transmidia",
    year: 2004,
    location: "São Paulo",
  },
  {
    id: "perf-03",
    title: "Rádio Re:combo — Porto Musical",
    type: "performance",
    url: "https://archive.org/details/re-combo-02",
    year: 2004,
    location: "Recife",
  },

  // Vídeos
  {
    id: "vid-01",
    title: "Tá como o diabo gosta",
    type: "video",
    url: "https://archive.org/details/ReCombo_Video/ReCombo_Video_03_TahComoODiaboGosta.mpg",
    year: 2005,
  },
  {
    id: "vid-02",
    title: "1samba1",
    type: "video",
    url: "https://archive.org/details/ReCombo_Video/ReCombo_Video_04_1samba1.mpg",
    year: 2004,
  },
  {
    id: "vid-03",
    title: "Voice of Re:combo",
    type: "video",
    url: "https://archive.org/details/ReCombo_Video/ReCombo_Video_05_VoiceOfRecombo.mov",
    year: 2003,
  },
  {
    id: "vid-04",
    title: "Dragão Chinês",
    type: "video",
    url: "https://archive.org/details/ReCombo_Video/ReCombo_Video_01_ReCombo_DragaoChines.avi",
    year: 2002,
  },

  // Músicas
  {
    id: "mus-01",
    title: "Um sambinha",
    type: "music",
    url: "https://archive.org/details/recombo/01_Re-combo_umsambinha.mp3",
  },
  {
    id: "mus-02",
    title: "Cabocoxossi",
    type: "music",
    url: "https://archive.org/details/recombo/02_Re-combo_cabocoxossi.mp3",
  },
  {
    id: "mus-03",
    title: "Pamonha",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_Pamonha.mp3",
  },
  {
    id: "mus-04",
    title: "Pesadelo",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_Pesadelo.mp3",
  },
  {
    id: "mus-05",
    title: "Você não me amava — Chico Corrêa Janjão Mix",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_VcNaoMeAmavaChicoCorreaJanjaoMix.mp3",
  },
  {
    id: "mus-06",
    title: "Alih 2.0",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_alih20_b.mp3",
  },
  {
    id: "mus-07",
    title: "Alih 3.0",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_alih3.mp3",
  },
  {
    id: "mus-08",
    title: "Com certeza eu vou",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_comCertezaEuVou.mp3",
  },
  {
    id: "mus-09",
    title: "Curupira N0-Age Mix",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_curupira_N0-AgeMix.mp3",
  },
  {
    id: "mus-10",
    title: "Viola Ciranda",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_violaciranda_mix01.mp3",
  },
  {
    id: "mus-11",
    title: "Voice of Re:combo",
    type: "music",
    url: "https://archive.org/details/recombo/ReCombo_voiceOfRecombo.mp3",
  },
  {
    id: "mus-12",
    title: "Tá como o diabo gosta",
    type: "music",
    url: "https://archive.org/details/recombo/TahComoODiaboGosta_12.mp3",
  },
  {
    id: "mus-13",
    title: "pauseandplay",
    type: "music",
    url: "https://archive.org/details/PingfmReCombo",
    year: 2004,
  },

  // Translocal Mixer
  {
    id: "mix-00",
    title: "Translocal Mixer — Abertura",
    type: "mixer",
    url: "https://archive.org/details/recombo/ReCombo_00-abertura.mp3",
    description: "Abertura do álbum Translocal Mixer",
  },
  {
    id: "mix-01",
    title: "Translocal Mixer — Bairro do Recife",
    type: "mixer",
    url: "https://archive.org/details/recombo/ReCombo_01-BairroDoRecife.mp3",
  },
  {
    id: "mix-02",
    title: "Translocal Mixer — Santo Antônio",
    type: "mixer",
    url: "https://archive.org/details/recombo/ReCombo_02-StoAntonio.mp3",
  },
  {
    id: "mix-03",
    title: "Translocal Mixer — Bairro de São José",
    type: "mixer",
    url: "https://archive.org/details/recombo/ReCombo_03-SaoJose.mp3",
  },
  {
    id: "mix-04",
    title: "Translocal Mixer — Afogados",
    type: "mixer",
    url: "https://archive.org/details/recombo/ReCombo_04-Afogados.mp3",
  },
  {
    id: "mix-05",
    title: "Translocal Mixer — Casa Amarela",
    type: "mixer",
    url: "https://archive.org/details/recombo/ReCombo_05-casaAmarela.mp3",
  },
  {
    id: "mix-06",
    title: "Translocal Mixer — Boa Vista",
    type: "mixer",
    url: "https://archive.org/details/recombo/ReCombo_06-boaVista.mp3",
  },
  {
    id: "mix-07",
    title: "Translocal Mixer — Candeias",
    type: "mixer",
    url: "https://archive.org/details/recombo/ReCombo_07-Candeias.mp3",
  },
];

export const byType = (type: ArchiveItemType) => archive.filter((item) => item.type === type);

export const performances = byType("performance");
export const videos = byType("video");
export const musicas = byType("music");
export const mixer = byType("mixer");
