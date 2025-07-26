import AppLoader from "@/libs/components/Loader";
import dynamic from "next/dynamic";

const Dashboard = dynamic(() => import("@/modules/Dashboard"), {
  loading: () => <AppLoader/>,
  ssr: false,
});

export default function Home() {
  return <Dashboard />;
}
