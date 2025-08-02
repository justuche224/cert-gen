'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-powered feedback on certificate customization.
 *
 * It includes:
 * - certificateImprovementFeedback:  A function to get AI feedback on certificate customization.
 * - CertificateImprovementFeedbackInput: The input type for the certificateImprovementFeedback function.
 * - CertificateImprovementFeedbackOutput: The output type for the certificateImprovementFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CertificateImprovementFeedbackInputSchema = z.object({
  certificateText: z
    .string()
    .describe('The customized text content of the certificate, including title, recipient, course, issuer, and date.'),
  templateStyle: z
    .string()
    .describe('A description of the certificate template style (colors, fonts, etc.).'),
});
export type CertificateImprovementFeedbackInput = z.infer<
  typeof CertificateImprovementFeedbackInputSchema
>;

const CertificateImprovementFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe(
      'AI-powered feedback on the certificate customization, including suggestions for visual and semantic improvements (tone, terminology, content relevance).'      
    ),
});
export type CertificateImprovementFeedbackOutput = z.infer<
  typeof CertificateImprovementFeedbackOutputSchema
>;

export async function certificateImprovementFeedback(
  input: CertificateImprovementFeedbackInput
): Promise<CertificateImprovementFeedbackOutput> {
  return certificateImprovementFeedbackFlow(input);
}

const certificateImprovementFeedbackPrompt = ai.definePrompt({
  name: 'certificateImprovementFeedbackPrompt',
  input: {schema: CertificateImprovementFeedbackInputSchema},
  output: {schema: CertificateImprovementFeedbackOutputSchema},
  prompt: `You are an AI assistant providing feedback on certificate customization.

  Provide feedback on the visual appeal and semantic clarity of the certificate, offering suggestions for improvement.
  Consider the tone, terminology, and content relevance in your feedback.

  Certificate Text: {{{certificateText}}}
  Template Style: {{{templateStyle}}}
  `,
});

const certificateImprovementFeedbackFlow = ai.defineFlow(
  {
    name: 'certificateImprovementFeedbackFlow',
    inputSchema: CertificateImprovementFeedbackInputSchema,
    outputSchema: CertificateImprovementFeedbackOutputSchema,
  },
  async input => {
    const {output} = await certificateImprovementFeedbackPrompt(input);
    return output!;
  }
);
