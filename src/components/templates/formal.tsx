import type { CertificateData } from "@/lib/types";
import { CheckCircle } from "lucide-react";

export function TemplateFormal({
  recipientName,
  courseName,
  issuerName,
  date,
  textColor,
  fontFamily,
}: CertificateData) {
  return (
    <div
      className="w-full h-full bg-white p-10 flex border-2 border-gray-800"
      style={{ fontFamily }}
    >
      <div className="w-1/4 h-full bg-gray-800 flex flex-col justify-between items-center p-6">
        <div className="text-center">
            <h3 className="text-white text-3xl font-bold tracking-wider" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                CERTIFICATE
            </h3>
        </div>
        <CheckCircle className="w-16 h-16 text-white" />
      </div>

      <div className="w-3/4 h-full pl-10 flex flex-col justify-center">
        <p className="text-xl uppercase tracking-widest" style={{ color: textColor }}>
          Official Recognition
        </p>
        <h1 className="text-6xl font-bold mt-4" style={{ color: textColor }}>
          {recipientName}
        </h1>
        <p className="text-lg mt-8" style={{ color: textColor }}>
          Has been awarded this certificate for the successful completion of
        </p>
        <h2 className="text-4xl font-semibold mt-2 text-gray-800">
          {courseName}
        </h2>
        
        <div className="mt-16 border-t-2 border-gray-200 pt-6 flex justify-between items-center">
          <div>
            <p className="text-sm uppercase" style={{ color: textColor }}>Issued by</p>
            <p className="text-xl font-bold" style={{ color: textColor }}>{issuerName}</p>
          </div>
          <div>
            <p className="text-sm uppercase" style={{ color: textColor }}>Date of Issue</p>
            <p className="text-xl font-bold" style={{ color: textColor }}>{date}</p>
          </div>
        </div>
         <div className="absolute bottom-12 right-12">
            <svg className="w-28 h-28 text-gray-800" viewBox="0 0 100 100">
                <path d="M50,5A45,45,0,1,1,5,50,45,45,0,0,1,50,5M50,0a50,50,0,1,0,50,50A50,50,0,0,0,50,0Z" fill="currentColor"/>
                <text x="50" y="45" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">CM</text>
                <text x="50" y="60" textAnchor="middle" fill="white" fontSize="10">CERTIFIED</text>
                <text x="50" y="72" textAnchor="middle" fill="white" fontSize="10">QUALITY</text>
            </svg>
        </div>
      </div>
    </div>
  );
}
