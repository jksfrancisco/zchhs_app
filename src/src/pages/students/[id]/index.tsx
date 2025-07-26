import AppLoader from "@/libs/components/Loader";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const StudentProfile = dynamic(() => import("@/modules/Students/[id]"), {
  loading: () => <AppLoader />,
  ssr: false,
});

export default function StudentPageWrapper() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <AppLoader />;

  return <StudentProfile id={id.toString()} />;
}
