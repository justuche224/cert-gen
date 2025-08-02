import type { CertificateData } from "@/lib/types";
import { Award } from "lucide-react";

function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
}

export function TemplateModern({
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
  const primaryRgb = hexToRgb(primaryColor);
  const secondaryRgb = hexToRgb(secondaryColor);

  return (
    <div
      className="w-full h-full bg-slate-50 p-12 flex flex-col relative overflow-hidden"
      style={{ fontFamily }}
    >
      <div className="absolute top-0 left-0 w-1/3 h-full -skew-x-12 -ml-12" style={{ backgroundColor: primaryRgb ? `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1)`: 'transparent' }}></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/2 skew-x-12 mr-[-50px] rounded-tl-full" style={{ backgroundColor: secondaryRgb ? `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.1)`: 'transparent' }}></div>
      
      <div className="z-10 flex-grow flex flex-col justify-center items-center text-center">
        <h2
          className="text-2xl font-light uppercase tracking-widest"
          style={{ color: textColor }}
        >
          {certificateTitle}
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
        <h3 className="text-3xl font-semibold mt-2" style={{ color: primaryColor }}>
          {courseName}
        </h3>

        <div className="mt-12 w-full flex justify-between items-end">
            <div className="text-left">
                <p className="font-semibold" style={{ color: textColor }}>{issuerName}</p>
                <div className="w-32 h-0.5 bg-gray-400 mt-1"></div>
                <p className="text-sm mt-1" style={{ color: textColor }}>Issuer</p>
            </div>
            <div className="text-center">
                <Award className="w-20 h-20" strokeWidth={1} style={{ color: secondaryColor }}/>
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
