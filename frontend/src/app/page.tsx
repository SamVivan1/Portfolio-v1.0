import Portfolio from "../components/pixel/Portfolio";
import { PortfolioDataProvider } from "../components/pixel/PortfolioData";
import ReducedMotionDocument from "../components/pixel/ReducedMotionDocument";

export default function Home() {
  return (
    <PortfolioDataProvider>
      <Portfolio />
      <ReducedMotionDocument />
    </PortfolioDataProvider>
  );
}
