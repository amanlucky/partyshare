import essentials from "../assets/essentials.svg";
import decorations from "../assets/decorations.svg";
import audio from "../assets/audio.svg";
import catering from "../assets/catering.svg";
import tents from "../assets/tents.svg";
import outdoor from "../assets/outdoor.svg";
import staging from "../assets/stagging.svg";

const categories = [
  { id: 1, name: "Essentials", slug: "essentials", image: essentials },
  { id: 2, name: "Decorations", slug: "decorations", image: decorations },
  { id: 3, name: "Audio, Video", slug: "audio-video", image: audio },
  { id: 4, name: "Catering Equipment", slug: "catering-equipment", image: catering },
  { id: 5, name: "Tents & Temporary Structures", slug: "tents", image: tents },
  { id: 6, name: "Outdoor", slug: "outdoor", image: outdoor },
  { id: 7, name: "Staging, Platforms", slug: "staging", image: staging },
];

export default categories;