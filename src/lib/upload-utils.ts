import jsPDF from "jspdf";

export async function uploadCertificateToServer(
  pdfDoc: jsPDF,
  certificateData: {
    id: string;
    certificateTitle: string;
    recipientName: string;
    courseName: string;
    issuer: string;
    date: string;
  }
) {
  try {
    const pdfBlob = pdfDoc.output("blob");

    const fileName = `${certificateData.recipientName.replace(
      / /g,
      "_"
    )}_certificate.pdf`;
    const file = new File([pdfBlob], fileName, { type: "application/pdf" });

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("id", certificateData.id);
    formData.append("certificateTitle", certificateData.certificateTitle);
    formData.append("recipientName", certificateData.recipientName);
    formData.append("courseName", certificateData.courseName);
    formData.append("issuer", certificateData.issuer);
    formData.append("date", certificateData.date);

    const response = await fetch("/api/certificates", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to upload certificate");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
