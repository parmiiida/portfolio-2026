import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const resendApiKey = env.RESEND_API_KEY;
  const contactFromEmail =
    env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

  return {
    plugins: [
      tailwindcss(),
      {
        name: "contact-api-dev-middleware",
        configureServer(server) {
        server.middlewares.use("/api/contact", async (req, res) => {
          const reqAny = req as any;
          const resAny = res as any;

          if (reqAny.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, message: "Method not allowed" }));
            return;
          }

          try {
            let body = "";
            await new Promise<void>((resolve, reject) => {
              reqAny.on("data", (chunk: string) => {
                body += chunk;
              });
              reqAny.on("end", () => resolve());
              reqAny.on("error", reject);
            });

            const parsed = JSON.parse(body || "{}") as {
              name?: string;
              email?: string;
              message?: string;
            };

            const { name, email, message } = parsed;
            if (!name || !email || !message) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, message: "Missing required fields" }));
              return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, message: "Invalid email address" }));
              return;
            }

            if (!resendApiKey) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: false,
                  message: "RESEND_API_KEY is missing in your local environment",
                })
              );
              return;
            }

            const resendResponse = await resAny.req.fetch?.("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: contactFromEmail,
                to: ["parmida.shoeibzade4@gmail.com"],
                reply_to: email,
                subject: `New portfolio message from ${name}`,
                html: `
                  <h2>New Contact Message</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong></p>
                  <p>${String(message).replace(/\n/g, "<br />")}</p>
                `,
              }),
            });
            const finalResendResponse =
              resendResponse ||
              (await (globalThis as any).fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${resendApiKey}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  from: contactFromEmail,
                  to: ["parmida.shoeibzade4@gmail.com"],
                  reply_to: email,
                  subject: `New portfolio message from ${name}`,
                  html: `
                  <h2>New Contact Message</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Message:</strong></p>
                  <p>${String(message).replace(/\n/g, "<br />")}</p>
                `,
                }),
              }));

            if (!finalResendResponse.ok) {
              const details = await finalResendResponse.text();
              res.statusCode = 502;
              res.setHeader("Content-Type", "application/json");
              res.end(
                JSON.stringify({
                  success: false,
                  message: "Failed to send email",
                  details,
                })
              );
              return;
            }

            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, message: "Message sent successfully" }));
          } catch {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, message: "Unexpected server error" }));
          }
        });
        },
      },
    ],
  };
});
