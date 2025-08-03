import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header className="flex items-center justify-between sticky top-0 z-50 h-16 px-4 md:px-6 border-b shrink-0 bg-card">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-semibold tracking-tight">CertMaster</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Link href="/dashboard/certificates">Certificates</Link>
          </Button>
          <Button variant="outline">
            <Link href="/dashboard/templates">Templates</Link>
          </Button>
          <Button variant="outline">
            <Link href="/dashboard/settings">Settings</Link>
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;
