import essentials from "../assets/essentials.png";
import decorations from "../assets/decorations.png";
import audio from "../assets/audio.png";
import catering from "../assets/catering.png";
import tents from "../assets/tents.png";
import outdoor from "../assets/outdoor.png";
import staging from "../assets/stagging.png";

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