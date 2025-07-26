import AppLoader from "@/libs/components/Loader";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/libs/components/Auth/Login"), {
  loading: () => <AppLoader/>,
  ssr: false,
});

export default function Home() {
  return <Login />;
}
