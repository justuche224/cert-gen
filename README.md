# CertMaster: AI-Powered Certificate Generator

CertMaster is a modern, full-stack web application that allows users to effortlessly generate, customize, and download professional certificates. Built with a powerful stack including Next.js, Genkit for AI features, and Better Auth for authentication, it provides a seamless and intuitive user experience for creating beautiful certificates for any occasion.

Whether for a single award or a large batch of course completions, CertMaster streamlines the entire process, from design customization to high-quality PDF generation.

## Key Features

- **Intuitive Interface**: A clean, user-friendly interface for designing and previewing certificates in real-time.
- **Deep Customization**:
    - Choose from a variety of professional templates (Modern, Classic, Elegant, etc.).
    - Customize all text content, including title, recipient, course, and issuer.
    - Full control over design elements like fonts, text colors, and template accent colors.
    - Adjust certificate aspect ratio (Landscape, Portrait, A4, etc.).
- **Logo Integration**:
    - Upload your own logo to brand your certificates.
    - Position the logo precisely using a simple dropdown (Top Left, Middle Center, etc.).
    - Adjust the logo's scale and opacity for perfect integration.
- **Persistent Design**: Your design settings (colors, fonts, logo) are automatically saved to your browser's local storage, so your preferences are loaded on your next visit.
- **AI-Powered Feedback**: Leverage Google's Gemini model via Genkit to get intelligent suggestions for improving the visual appeal and semantic content of your certificates.
- **Secure Authentication**: User accounts are managed with Better Auth, providing secure email and password sign-in and sign-up functionality.
- **High-Quality Downloads**:
    - **Single PDF Download**: Instantly download a high-resolution, print-ready PDF of your customized certificate.
    - **Bulk Generation from CSV**: Upload a CSV file with recipient data to generate hundreds of personalized certificates at once, conveniently packaged into a single ZIP file.

## Technical Architecture

CertMaster is built on a modern, robust, and scalable technology stack.

- **Framework**: **Next.js** (with App Router) for a fast, server-rendered React application.
- **Language**: **TypeScript** for type safety and improved developer experience.
- **Styling**: **Tailwind CSS** and **ShadCN/UI** for a beautiful, consistent, and customizable component library.
- **Authentication**: **Better Auth** for handling user sign-up, sign-in, and session management.
- **Database ORM**: **Drizzle ORM** for type-safe database access, connected to a Postgres database.
- **Generative AI**: **Genkit** (with Google's Gemini) powers the AI feedback and suggestion features.
- **File Generation**:
    - **jsPDF** & **html2canvas** for converting the HTML preview into a downloadable PDF.
    - **JSZip** for creating ZIP archives for bulk certificate downloads.
    - **PapaParse** for efficiently parsing CSV files for bulk generation.

## Project Structure

The project follows a standard Next.js App Router structure:

```
src
├── ai/                    # Genkit AI flows and configuration
│   ├── flows/
│   └── genkit.ts
├── app/                   # Next.js routes and pages
│   ├── (main)/
│   │   ├── dashboard/     # Protected main application page
│   │   └── page.tsx       # Public landing page
│   ├── auth/              # Authentication (sign-in/sign-up) page
│   └── api/               # API routes (e.g., for auth)
├── components/            # React components
│   ├── app.tsx            # The core certificate editor component
│   ├── templates/         # Individual certificate template components
│   └── ui/                # ShadCN UI components
├── db/                    # Drizzle ORM schema and configuration
├── hooks/                 # Custom React hooks
├── lib/                   # Core utilities, types, and third-party integrations
└── ...
```