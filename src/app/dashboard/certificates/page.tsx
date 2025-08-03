import CertificatesPage from "./certificates";
import { serverAuth } from "@/lib/server-auth";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await serverAuth();
  if (!user) {
    redirect("/auth");
  }
  return <CertificatesPage />;
};

export default page;
