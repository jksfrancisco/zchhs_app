import AppLoader from "@/libs/components/Loader";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import("@/modules/Profile"), {
  loading: () => <AppLoader/>,
  ssr: false,
});

export default function Home() {
  return <Profile />;
}
