import {createKeyStorage} from "../../utilities/key-storage";
import {ColourMode} from "./storage-mode.interface";

export const ColorModeStore = createKeyStorage<ColourMode>('color-mode', ColourMode.AUTO);
