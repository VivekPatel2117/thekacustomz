import nodemailer from "nodemailer";

/**
 * Create reusable transporter
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Replace dynamic values in HTML template
 * Example: {{name}} → Vivek
 */
const injectVariables = (html, variables = {}) => {
  let modifiedHtml = html;

  Object.keys(variables).forEach((key) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    modifiedHtml = modifiedHtml.replace(regex, variables[key]);
  });

  return modifiedHtml;
};

/**
 * Common Send Email Function
 * @param {string} emailTo
 * @param {string} subject
 * @param {string} htmlTemplate
 * @param {object} variables
 */
export const sendEmail = async ({
  emailTo,
  subject,
  htmlTemplate,
  variables = {},
}) => {
  try {
    const finalHtml = injectVariables(htmlTemplate, variables);

    const mailOptions = {
      from: `"Thekacustomz" <${process.env.SMTP_USER}>`,
      to: emailTo,
      subject,
      html: finalHtml,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};