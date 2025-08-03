import CertMasterPage from "@/components/app";
import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await serverAuth();
  if (!user) {
    redirect("/auth");
  }
  return <CertMasterPage />;
};

export default page;
