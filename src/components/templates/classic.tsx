import type { CertificateData } from "@/lib/types";

export function TemplateClassic({
  recipientName,
  courseName,
  issuerName,
  date,
  textColor,
  fontFamily,
}: CertificateData) {
  return (
    <div
      className="w-full h-full bg-white p-8 flex flex-col relative border-8 border-amber-800"
      style={{ fontFamily }}
    >
      {/* Ornate corners */}
      <div className="absolute top-2 left-2 w-16 h-16 border-t-4 border-l-4 border-amber-600"></div>
      <div className="absolute top-2 right-2 w-16 h-16 border-t-4 border-r-4 border-amber-600"></div>
      <div className="absolute bottom-2 left-2 w-16 h-16 border-b-4 border-l-4 border-amber-600"></div>
      <div className="absolute bottom-2 right-2 w-16 h-16 border-b-4 border-r-4 border-amber-600"></div>
      
      <div className="flex-grow flex flex-col justify-center items-center text-center">
        <h2
          className="text-4xl"
          style={{ color: textColor, fontFamily: 'Georgia, serif' }}
        >
          Certificate of Achievement
        </h2>
        
        <div className="w-1/4 h-0.5 bg-amber-700 my-6"></div>

        <p className="text-xl" style={{ color: textColor }}>
          This is to certify that
        </p>
        
        <h1
          className="text-6xl font-bold my-6"
          style={{ color: textColor }}
        >
          {recipientName}
        </h1>
        
        <p className="text-xl max-w-xl" style={{ color: textColor }}>
          has successfully completed the requirements for the
        </p>
        <h3 className="text-3xl font-semibold mt-4 text-amber-800">
          {courseName}
        </h3>

        <div className="mt-16 w-full flex justify-around items-center">
            <div className="text-center">
                <p className="font-semibold text-lg" style={{ color: textColor }}>{issuerName}</p>
                <div className="w-48 h-px bg-gray-500 mt-2"></div>
                <p className="text-sm mt-2 uppercase tracking-wider" style={{ color: textColor }}>Signature of Issuer</p>
            </div>
            <div className="text-center">
                <p className="font-semibold text-lg" style={{ color: textColor }}>{date}</p>
                <div className="w-48 h-px bg-gray-500 mt-2"></div>
                <p className="text-sm mt-2 uppercase tracking-wider" style={{ color: textColor }}>Date</p>
            </div>
        </div>
      </div>
       <div className="absolute bottom-8 right-8">
         <svg className="w-24 h-24 text-amber-800/80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#fef3c7" strokeWidth="2" stroke="currentColor" />
          <circle cx="50" cy="50" r="38" fill="transparent" strokeWidth="1" stroke="currentColor" />
          <text x="50" y="55" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">OFFICIAL</text>
          <text x="50" y="68" textAnchor="middle" fontSize="10" fill="currentColor" fontWeight="bold">SEAL</text>
        </svg>
      </div>
    </div>
  );
}
