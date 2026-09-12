const resend = require("../config/resend");

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendValuationThankYou({
  name,
  email,
  valuation_type,
}) {
  try {
    const safeName = escapeHtml(name);

      const typeText =
        valuation_type === "sell"
          ? "sales valuation"
          : "rental valuation";

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,

      subject:
        "Thank You for Your Valuation Request | Next Move Estates",

      html: `
        <div style="
          font-family: Arial, sans-serif;
          background:#f5f5f5;
          padding:30px 15px;
        ">
          <div style="
            max-width:600px;
            margin:auto;
            background:#ffffff;
            border-radius:8px;
            overflow:hidden;
          ">

            <div style="
              background:#082D52;
              padding:25px;
              text-align:center;
            ">
              <h1 style="
                margin:0;
                color:#ffffff;
                font-size:24px;
              ">
                NEXT MOVE ESTATES
              </h1>

              <p style="
                color:#D3A72F;
                margin:6px 0 0;
              ">
                LONDON
              </p>
            </div>

            <div style="
              padding:30px;
              color:#333333;
              line-height:1.7;
            ">

              <h2 style="
                color:#082D52;
                margin-top:0;
              ">
                Thank you, ${safeName}
              </h2>

              <p>
                We have received your
                <strong>${typeText}</strong>
                request.
              </p>

              <p>
                A member of the Next Move Estates team
                will review your property details and
                contact you shortly.
              </p>

              <p>
                If you need to provide any additional
                information, simply reply to our team
                when contacted.
              </p>

              <p style="margin-top:30px;">
                Kind regards,<br>
                <strong>Next Move Estates London</strong>
              </p>

            </div>

            <div style="
              background:#082D52;
              padding:15px;
              text-align:center;
              color:#ffffff;
              font-size:12px;
            ">
              Next Move Estates London
            </div>

          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend valuation email error:", error);

      return {
        success: false,
        error,
      };
    }

    console.log(
      "Valuation thank you email sent:",
      data?.id
    );

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(
      "Send valuation thank you error:",
      error
    );

    return {
      success: false,
      error,
    };
  }
}

module.exports = sendValuationThankYou;