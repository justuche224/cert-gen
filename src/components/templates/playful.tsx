import type { CertificateData } from "@/lib/types";
import { Star, Sun, Smile } from "lucide-react";

export function TemplatePlayful({
  recipientName,
  courseName,
  issuerName,
  date,
  textColor,
  fontFamily,
  primaryColor,
  secondaryColor,
}: CertificateData) {
  return (
    <div
      className="w-full h-full bg-white p-8 flex flex-col relative overflow-hidden border-4 border-dashed"
      style={{ fontFamily, borderColor: primaryColor, borderRadius: '20px' }}
    >
      <div className="absolute top-10 left-10 text-yellow-400">
        <Sun className="w-16 h-16" style={{ color: secondaryColor }} />
      </div>
      <div className="absolute bottom-10 right-10 text-yellow-400">
        <Star className="w-16 h-16" fill={secondaryColor} style={{ color: secondaryColor }}/>
      </div>
       <div className="absolute top-1/2 left-1/4 text-pink-400 opacity-50">
         <Smile className="w-24 h-24 transform -rotate-12" style={{ color: secondaryColor }} />
      </div>

      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-center space-y-4">
        <h2
          className="text-5xl font-bold"
          style={{ color: primaryColor }}
        >
          Awesome Job!
        </h2>

        <p className="text-xl" style={{ color: textColor }}>
          This certificate is awarded to
        </p>

        <h1
          className="text-6xl font-extrabold pb-2"
          style={{ color: textColor, WebkitTextStroke: `2px ${primaryColor}` }}
        >
          {recipientName}
        </h1>

        <p className="text-xl max-w-xl" style={{ color: textColor }}>
          for totally crushing
        </p>
        <h3 className="text-3xl font-bold" style={{ color: primaryColor }}>
          {courseName}
        </h3>

        <div className="pt-8 w-full flex justify-around items-center">
            <div className="text-center">
                <p className="font-bold text-lg" style={{ color: textColor }}>{issuerName}</p>
                <div className="w-40 h-1 bg-gray-300 mt-2 rounded-full"></div>
                <p className="text-sm mt-2 font-semibold" style={{ color: textColor }}>Cool Issuer</p>
            </div>
            <div className="text-center">
                <p className="font-bold text-lg" style={{ color: textColor }}>{date}</p>
                <div className="w-40 h-1 bg-gray-300 mt-2 rounded-full"></div>
                <p className="text-sm mt-2 font-semibold" style={{ color: textColor }}>Date</p>
            </div>
        </div>
      </div>
    </div>
  );
}
