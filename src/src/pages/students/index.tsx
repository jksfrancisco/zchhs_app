import AppLoader from "@/libs/components/Loader";
import dynamic from "next/dynamic";

const Students = dynamic(() => import("@/modules/Students/index"), {
  loading: () => <AppLoader/>,
  ssr: false,
});

export default function Home() {
  return <Students />;
}
