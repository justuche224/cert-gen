import type { CertificateData } from "@/lib/types";

export function TemplateMinimalist({
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
      className="w-full h-full bg-white p-16 flex flex-col justify-between relative"
      style={{ fontFamily }}
    >
      <div className="w-full flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-semibold" style={{ color: textColor }}>
            {certificateTitle}
          </h2>
          <div className="w-24 h-1 mt-2" style={{ backgroundColor: primaryColor }}></div>
        </div>
        <p className="text-lg font-mono" style={{ color: textColor }}>{date}</p>
      </div>
      
      <div className="text-left my-auto">
        <p className="text-lg mb-2" style={{ color: textColor }}>
          This certificate is presented to
        </p>
        <h1 className="text-7xl font-bold" style={{ color: primaryColor }}>
          {recipientName}
        </h1>
        <p className="text-lg mt-4 max-w-2xl" style={{ color: textColor }}>
          in recognition of successfully completing the program
        </p>
        <h3 className="text-4xl font-medium mt-2" style={{ color: textColor }}>
          {courseName}
        </h3>
      </div>

      <div className="w-full flex justify-between items-end">
        <div>
          <p className="font-bold text-lg" style={{ color: textColor }}>{issuerName}</p>
          <p className="text-sm" style={{ color: textColor }}>Issuer</p>
        </div>
        <div className="w-24 h-24" style={{ backgroundColor: secondaryColor + '22' }}></div>
      </div>
    </div>
  );
}
