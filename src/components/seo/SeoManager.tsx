import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { applySeoToDocument, resolveSeo } from "@/lib/seo";

export function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    applySeoToDocument(resolveSeo(`${location.pathname}${location.search}`));
  }, [location.pathname, location.search]);

  return null;
}
