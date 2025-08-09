import { getChartsDataAction, getStatsAction } from "@/utils/actions";

const StatsPage = () => {
  getStatsAction();
  getChartsDataAction();
  return <div>StatsPage</div>;
};

export default StatsPage;
