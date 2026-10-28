import type { ComponentType } from "react";
import AiScene from "./AiScene";
import BrandScene from "./BrandScene";
import GraphicScene from "./GraphicScene";
import MarketingScene from "./MarketingScene";
import MotionScene from "./MotionScene";
import SeoScene from "./SeoScene";
import VideoScene from "./VideoScene";
import WebDevScene from "./WebDevScene";

/** Live demo shown on the big screen for each service id. */
export const SCENES: Record<string, ComponentType> = {
  "web-development": WebDevScene,
  "brand-design": BrandScene,
  "digital-marketing": MarketingScene,
  "seo-optimization": SeoScene,
  "graphic-design": GraphicScene,
  "video-editing": VideoScene,
  "motion-graphics": MotionScene,
  "ai-automation": AiScene,
};
