import type { CertificateData } from "@/lib/types";
import { Feather } from "lucide-react";

export function TemplateElegant({
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
      className="w-full h-full bg-white p-12 flex flex-col relative"
      style={{ fontFamily }}
    >
      <div className="absolute inset-0 w-full h-full" style={{
        backgroundImage: `linear-gradient(to bottom right, ${primaryColor}11, transparent 50%), linear-gradient(to top left, ${secondaryColor}11, transparent 50%)`,
      }}></div>

      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center">
        <p
          className="text-lg uppercase tracking-[0.2em]"
          style={{ color: textColor }}
        >
          {certificateTitle}
        </p>
        
        <div className="my-6">
            <Feather className="w-12 h-12" style={{ color: primaryColor }}/>
        </div>

        <h1
          className="text-6xl font-serif"
          style={{ color: textColor }}
        >
          {recipientName}
        </h1>
        
        <p className="mt-8 text-lg" style={{ color: textColor }}>
          is hereby awarded for the exemplary completion of
        </p>
        <h3 className="text-3xl font-semibold mt-4" style={{ color: primaryColor }}>
          {courseName}
        </h3>

        <div className="mt-20 w-3/4 flex justify-between items-center">
            <div className="text-center">
                <p className="font-semibold text-lg" style={{ color: textColor, fontFamily: 'serif' }}>{issuerName}</p>
                <div className="w-48 h-px mt-2" style={{backgroundColor: secondaryColor}}></div>
                <p className="text-sm mt-2 uppercase tracking-wider" style={{ color: textColor }}>Authorized Issuer</p>
            </div>
            <div className="text-center">
                <p className="font-semibold text-lg" style={{ color: textColor, fontFamily: 'serif' }}>{date}</p>
                <div className="w-48 h-px mt-2" style={{backgroundColor: secondaryColor}}></div>
                <p className="text-sm mt-2 uppercase tracking-wider" style={{ color: textColor }}>Date Issued</p>
            </div>
        </div>
      </div>
    </div>
  );
}
