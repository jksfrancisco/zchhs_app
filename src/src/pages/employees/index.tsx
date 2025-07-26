import AppLoader from "@/libs/components/Loader";
import dynamic from "next/dynamic";

const Employees = dynamic(() => import("@/modules/Employees/components/index"), {
  loading: () => <AppLoader/>,
  ssr: false,
});

export default function Home() {
  return <Employees />;
}
