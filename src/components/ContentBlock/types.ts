import { TFunction } from "react-i18next";
export interface ContentBlockProps {
  icon: string;
  title: string;
  content: string;
  section?: {
    title: string;
    content: string;
    icon: string;
  }[];
  button?: (
    | {
        title: string;
        color?: undefined;
        link? : string;
      }
    | {
        title: string;
        color: string;
        link: string;
      }
  )[];
  t: TFunction;
  id: string;
  direction: "left" | "right";
}
