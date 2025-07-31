import Loading from "@/components/loading/Loading";
import { Suspense } from "react";
import Menu from "@/components/appmenu/Menu";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Menu />
    </Suspense>
  );
}
