const resend = require("../config/resend");

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendValuationAdminNotification(valuation) {
  try {
    const {
      name,
      email,
      phone,
      property_address,
      postcode,
      property_type,
      valuation_type,
      bedrooms,
      message,
    } = valuation;

    const valuationLabel =
      valuation_type === "sell"
        ? "Sales Valuation"
        : "Rental Valuation";

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,

      to: process.env.ADMIN_NOTIFICATION_EMAIL,

      subject: `New ${valuationLabel} Request | ${name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          background:#f5f5f5;
          padding:30px 15px;
        ">

          <div style="
            max-width:650px;
            margin:auto;
            background:#ffffff;
            border-radius:8px;
            overflow:hidden;
          ">

            <div style="
              background:#082D52;
              padding:25px;
            ">
              <h2 style="
                margin:0;
                color:#ffffff;
              ">
                New Valuation Request
              </h2>

              <p style="
                margin:8px 0 0;
                color:#D3A72F;
              ">
                ${valuationLabel}
              </p>
            </div>

            <div style="
              padding:30px;
              color:#333333;
              line-height:1.7;
            ">

              <p>
                A new property valuation request
                has been submitted through the
                Next Move Estates website.
              </p>

              <hr style="
                border:none;
                border-top:1px solid #eeeeee;
                margin:25px 0;
              ">

              <p>
                <strong>Name:</strong>
                ${escapeHtml(name)}
              </p>

              <p>
                <strong>Email:</strong>
                ${escapeHtml(email)}
              </p>

              <p>
                <strong>Phone:</strong>
                ${escapeHtml(phone || "Not provided")}
              </p>

              <p>
                <strong>Property Address:</strong>
                ${escapeHtml(property_address)}
              </p>

              <p>
                <strong>Postcode:</strong>
                ${escapeHtml(postcode || "Not provided")}
              </p>

              <p>
                <strong>Property Type:</strong>
                ${escapeHtml(property_type || "Not provided")}
              </p>

              <p>
                <strong>Bedrooms:</strong>
                ${
                  bedrooms !== "" &&
                  bedrooms !== null &&
                  bedrooms !== undefined
                    ? escapeHtml(bedrooms)
                    : "Not provided"
                }
              </p>

              <p>
                <strong>Request:</strong>
                ${valuationLabel}
              </p>

              <p>
                <strong>Message:</strong><br>
                ${escapeHtml(message || "No message")}
              </p>

              <hr style="
                border:none;
                border-top:1px solid #eeeeee;
                margin:25px 0;
              ">

              <p style="
                font-size:13px;
                color:#777777;
              ">
                Login to the Next Move Estates
                Admin Panel to manage this request.
              </p>

            </div>

          </div>

        </div>
      `,
    });

    if (error) {
      console.error(
        "Admin valuation notification error:",
        error
      );

      return {
        success: false,
        error,
      };
    }

    console.log(
      "Admin valuation notification sent:",
      data?.id
    );

    return {
      success: true,
      data,
    };

  } catch (error) {
    console.error(
      "Send admin valuation notification error:",
      error
    );

    return {
      success: false,
      error,
    };
  }
}

module.exports =
  sendValuationAdminNotification;