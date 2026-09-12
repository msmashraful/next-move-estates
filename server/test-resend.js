require("dotenv").config();

const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

async function testEmail() {
  try {
    const { data, error } =
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM,

        to:
          process.env
            .ADMIN_NOTIFICATION_EMAIL,

        subject:
          "Next Move Estates - Resend Test",

        html: `
          <h2>Resend is working ✅</h2>

          <p>
            This is a test email from
            Next Move Estates website.
          </p>
        `,
      });

    if (error) {
      console.error(
        "Email failed:",
        error
      );

      return;
    }

    console.log(
      "Email sent successfully:",
      data
    );

  } catch (error) {
    console.error(
      "Test email error:",
      error
    );
  }
}

testEmail();