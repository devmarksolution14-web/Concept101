import type { ComponentType } from "react";
import type { VisualKind } from "../data";
import AiVisual from "./AiVisual";
import BrandVisual from "./BrandVisual";
import CampaignVisual from "./CampaignVisual";
import GraphicVisual from "./GraphicVisual";
import MotionVisual from "./MotionVisual";
import SeoVisual from "./SeoVisual";
import SiteVisual from "./SiteVisual";
import VideoVisual from "./VideoVisual";
import type { VisualProps } from "./shared";

/** Live, looping stand-in for each project's real work. */
export const VISUALS: Record<VisualKind, ComponentType<VisualProps>> = {
  site: SiteVisual,
  brand: BrandVisual,
  campaign: CampaignVisual,
  seo: SeoVisual,
  graphic: GraphicVisual,
  video: VideoVisual,
  motion: MotionVisual,
  ai: AiVisual,
};
