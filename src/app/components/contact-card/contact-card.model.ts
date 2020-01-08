import {Card} from "../card/contact.model";

export interface ContactCard extends Card {
  src?: string;
  pixelSrc?: string;
  alt?: string;
  icon?: string;
}
