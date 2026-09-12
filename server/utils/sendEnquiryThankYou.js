const resend = require("../config/resend");


function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


async function sendEnquiryThankYou(enquiry) {
  try {
    const {
      name,
      email,
      property_title,
      preferred_date,
    } = enquiry;


    const safeName =
      escapeHtml(name);

    const safePropertyTitle =
      escapeHtml(
        property_title ||
          "Property Enquiry"
      );

    const safeViewingDate =
      preferred_date
        ? escapeHtml(
            preferred_date
          )
        : null;


    const { data, error } =
      await resend.emails.send({

        from:
          process.env.EMAIL_FROM,

        to:
          email,

        replyTo:
          process.env
            .ADMIN_NOTIFICATION_EMAIL,

        subject:
          `We received your property enquiry | Next Move Estates`,

        html: `
          <!DOCTYPE html>

          <html>

            <body
              style="
                margin:0;
                padding:0;
                background:#f5f7f9;
                font-family:Arial,Helvetica,sans-serif;
                color:#333333;
              "
            >

              <div
                style="
                  max-width:620px;
                  margin:30px auto;
                  background:#ffffff;
                  border-radius:14px;
                  overflow:hidden;
                  border:1px solid #e3e9ee;
                "
              >

                <div
                  style="
                    background:#082D52;
                    padding:28px 32px;
                  "
                >

                  <div
                    style="
                      color:#D3A72F;
                      font-size:12px;
                      font-weight:bold;
                      letter-spacing:2px;
                      text-transform:uppercase;
                    "
                  >
                    Next Move Estates
                  </div>


                  <h1
                    style="
                      margin:10px 0 0;
                      color:#ffffff;
                      font-size:25px;
                    "
                  >
                    Thank you for your enquiry
                  </h1>

                </div>


                <div
                  style="
                    padding:32px;
                  "
                >

                  <p
                    style="
                      margin:0 0 18px;
                      font-size:16px;
                      line-height:1.7;
                    "
                  >
                    Dear ${safeName},
                  </p>


                  <p
                    style="
                      margin:0 0 18px;
                      font-size:15px;
                      line-height:1.8;
                      color:#555555;
                    "
                  >
                    Thank you for your interest
                    in one of our properties.
                    We have received your enquiry
                    and a member of the
                    Next Move Estates team will
                    review your request.
                  </p>


                  <div
                    style="
                      margin:24px 0;
                      padding:18px;
                      background:#f7fafc;
                      border-left:4px solid #D3A72F;
                      border-radius:8px;
                    "
                  >

                    <div
                      style="
                        font-size:12px;
                        color:#777777;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      "
                    >
                      Property
                    </div>


                    <div
                      style="
                        margin-top:7px;
                        color:#082D52;
                        font-size:16px;
                        font-weight:bold;
                      "
                    >
                      ${safePropertyTitle}
                    </div>


                    ${
                      safeViewingDate
                        ? `
                          <div
                            style="
                              margin-top:14px;
                              font-size:13px;
                              color:#777777;
                            "
                          >
                            Preferred viewing date
                          </div>

                          <div
                            style="
                              margin-top:4px;
                              color:#333333;
                              font-size:14px;
                              font-weight:bold;
                            "
                          >
                            ${safeViewingDate}
                          </div>
                        `
                        : ""
                    }

                  </div>


                  <p
                    style="
                      margin:0;
                      font-size:15px;
                      line-height:1.8;
                      color:#555555;
                    "
                  >
                    Our team will contact you
                    shortly regarding the
                    property and any next steps.
                  </p>


                  <p
                    style="
                      margin:18px 0 0;
                      font-size:15px;
                      line-height:1.8;
                      color:#555555;
                    "
                  >
                    If you need to provide any
                    additional information,
                    simply reply to this email.
                  </p>


                  <div
                    style="
                      margin-top:30px;
                      padding-top:20px;
                      border-top:1px solid #eeeeee;
                    "
                  >

                    <p
                      style="
                        margin:0;
                        font-size:14px;
                        line-height:1.7;
                        color:#555555;
                      "
                    >
                      Kind regards,<br>

                      <strong
                        style="
                          color:#082D52;
                        "
                      >
                        Next Move Estates London
                      </strong>

                    </p>

                  </div>

                </div>


                <div
                  style="
                    background:#082D52;
                    padding:18px 32px;
                    text-align:center;
                    color:#ffffff;
                    font-size:12px;
                  "
                >
                  Next Move Estates London
                </div>

              </div>

            </body>

          </html>
        `,
      });


    if (error) {

      console.error(
        "Enquiry thank-you email error:",
        error
      );


      return {
        success: false,
        error,
      };
    }


    console.log(
      "Enquiry thank-you email sent:",
      data?.id
    );


    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Send enquiry thank-you email error:",
      error
    );


    return {
      success: false,
      error,
    };
  }
}


module.exports =
  sendEnquiryThankYou;