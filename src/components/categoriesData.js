import essentials from "../assets/essentials.png";
import decorations from "../assets/decorations.png";
import audio from "../assets/audio.png";
import catering from "../assets/catering.png";
import tents from "../assets/tents.png";
import outdoor from "../assets/outdoor.png";
import staging from "../assets/stagging.png";

const categories = [
  { id: 1, name: "Essentials", image: essentials },
  { id: 2, name: "Decorations", image: decorations },
  { id: 3, name: "Audio, Video", image: audio },
  { id: 4, name: "Catering Equipment", image: catering },
  { id: 5, name: "Tents & Temporary Structures", image: tents },
  { id: 6, name: "Outdoor", image: outdoor },
  { id: 7, name: "Staging, Platforms", image: staging },
 // { id: 8, name: "Lighting", image: decorations }, // you reused decorations
];

export default categories;