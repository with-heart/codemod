import {
  ChartTile,
  type ChartTileProps,
} from "@/app/(website)/insights-dashboard/components/ChartTile";
import type { ColorConfig } from "@/app/(website)/insights-dashboard/types";

export const depreciatedAPIChartColorSets: ColorConfig[] = [
  {
    line: "#60A5FA",
    gradientStart: "#93C5FD",
    gradientEnd: "#EFF6FF",
  },
  {
    line: "#4ADE80",
    gradientStart: "#86EFAC",
    gradientEnd: "#ECFDF5",
  },
];

export const DepreciatedAPIChart = ({
  data,
}: {
  data: ChartTileProps["data"];
}) => (
  <ChartTile
    title="Deprecated API usage"
    colorSets={depreciatedAPIChartColorSets}
    data={data}
  />
);
