import type { CertificateData } from "@/lib/types";
import { Building2 } from "lucide-react";

export function TemplateCorporate({
  recipientName,
  courseName,
  issuerName,
  date,
  textColor,
  fontFamily,
  primaryColor,
  secondaryColor,
  certificateTitle,
}: CertificateData) {
  return (
    <div
      className="w-full h-full bg-white flex relative"
      style={{ fontFamily }}
    >
        <div className="w-1/3 h-full p-8 flex flex-col justify-between" style={{ backgroundColor: primaryColor }}>
            <div className="z-10">
                <Building2 className="w-12 h-12" style={{ color: secondaryColor }} />
                <h2 className="text-3xl font-bold mt-4" style={{ color: "white" }}>
                    {issuerName}
                </h2>
            </div>
            <div className="z-10">
                <div className="w-full h-1" style={{ backgroundColor: secondaryColor }}></div>
                <p className="text-sm mt-2" style={{ color: "white" }}>
                    Official Corporate Certificate
                </p>
            </div>
        </div>
      <div className="w-2/3 h-full pl-10 pr-8 py-10 flex flex-col justify-center relative">
        <div className="absolute top-0 right-0 h-full w-4" style={{backgroundColor: secondaryColor}}></div>
        <p className="text-lg uppercase tracking-wider" style={{ color: textColor }}>
            {certificateTitle}
        </p>
        <h1 className="text-5xl font-bold my-4" style={{ color: primaryColor }}>
          {recipientName}
        </h1>
        <p className="text-lg" style={{ color: textColor }}>
          has demonstrated outstanding performance and is hereby recognized for the successful completion of
        </p>
        <h3 className="text-3xl font-semibold mt-4" style={{ color: textColor }}>
          {courseName}
        </h3>

        <div className="mt-12 w-full flex justify-between items-center">
            <div className="text-center">
                <p className="font-semibold text-lg" style={{ color: textColor }}>{issuerName}</p>
                <div className="w-48 h-px bg-gray-400 mt-2"></div>
                <p className="text-sm mt-2" style={{ color: textColor }}>Authorizing Signature</p>
            </div>
            <div className="text-center">
                <p className="font-semibold text-lg" style={{ color: textColor }}>{date}</p>
                <div className="w-48 h-px bg-gray-400 mt-2"></div>
                <p className="text-sm mt-2" style={{ color: textColor }}>Date Issued</p>
            </div>
        </div>
      </div>
    </div>
  );
}
