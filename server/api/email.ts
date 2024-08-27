import { createTransport } from "nodemailer";
type Ibody = {
  email: string;
  name: string;
  message: string;
  token: string;
};
export default defineEventHandler(async (event) => {
  const body = await readBody<Ibody>(event);
  const {
    email,
    public: { app_domain },
  } = useRuntimeConfig();

  if (!body.email || !body.name || !body.message || !body.token) {
    throw createError({
      statusCode: 400,
      message: "Missing required fields",
    });
  }

  const validate_token = await verifyTurnstileToken(body.token);

  if (validate_token.success === false) {
    throw createError({
      statusCode: 400,
      message: "Invalid token",
    });
  }

  const transport = createTransport({
    host: email.host,
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: email.user,
      pass: email.pass,
    },
  });

  await transport.sendMail({
    from: email.email_from,
    to: email.email_to,
    subject: `Message from your website ${app_domain}`,
    html: `Mr(s). ${body.name}<br><br>${body.message}`,
    inReplyTo: body.email,
  });
});
