import type { CertificateData } from "@/lib/types";
import { Award } from "lucide-react";

export function TemplateModern({
  recipientName,
  courseName,
  issuerName,
  date,
  textColor,
  fontFamily,
}: CertificateData) {
  return (
    <div
      className="w-full h-full bg-slate-50 p-12 flex flex-col relative overflow-hidden"
      style={{ fontFamily }}
    >
      <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/10 -skew-x-12 -ml-12"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-accent/10 skew-x-12 mr-[-50px] rounded-tl-full"></div>
      
      <div className="z-10 flex-grow flex flex-col justify-center items-center text-center">
        <h2
          className="text-2xl font-light uppercase tracking-widest"
          style={{ color: textColor }}
        >
          Certificate of Completion
        </h2>
        
        <p className="mt-6 text-lg" style={{ color: textColor }}>
          This certificate is proudly presented to
        </p>
        
        <h1
          className="text-7xl font-bold mt-4"
          style={{ color: textColor, textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
        >
          {recipientName}
        </h1>
        
        <p className="mt-8 text-lg max-w-2xl" style={{ color: textColor }}>
          for successfully completing the course
        </p>
        <h3 className="text-3xl font-semibold mt-2 text-primary">
          {courseName}
        </h3>

        <div className="mt-12 w-full flex justify-between items-end">
            <div className="text-left">
                <p className="font-semibold" style={{ color: textColor }}>{issuerName}</p>
                <div className="w-32 h-0.5 bg-gray-400 mt-1"></div>
                <p className="text-sm mt-1" style={{ color: textColor }}>Issuer</p>
            </div>
            <div className="text-center">
                <Award className="w-20 h-20 text-accent/80" strokeWidth={1} />
            </div>
            <div className="text-right">
                <p className="font-semibold" style={{ color: textColor }}>{date}</p>
                <div className="w-32 h-0.5 bg-gray-400 mt-1 ml-auto"></div>
                <p className="text-sm mt-1" style={{ color: textColor }}>Date of Completion</p>
            </div>
        </div>
      </div>
    </div>
  );
}
