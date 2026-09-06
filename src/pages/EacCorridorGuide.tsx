import { CorridorGuide } from "@/components/marketing/CorridorGuide";
import { eacCorridorGuideBySlug } from "@/data/eac-corridor-guides";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";

export default function EacCorridorGuide() {
  const { slug = "" } = useParams();
  const guide = eacCorridorGuideBySlug[slug];

  if (!guide) return <NotFound />;
  return <CorridorGuide guide={guide} />;
}
