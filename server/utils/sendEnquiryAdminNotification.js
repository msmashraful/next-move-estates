const resend = require("../config/resend");


function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


async function sendEnquiryAdminNotification(
  enquiry
) {
  try {

    const {
      name,
      email,
      phone,
      preferred_date,
      message,
      property_title,
    } = enquiry;


    const safeName =
      escapeHtml(name);

    const safeEmail =
      escapeHtml(email);

    const safePhone =
      escapeHtml(
        phone ||
          "Not provided"
      );

    const safePreferredDate =
      escapeHtml(
        preferred_date ||
          "Not provided"
      );

    const safeMessage =
      escapeHtml(
        message ||
          "No message"
      );

    const safePropertyTitle =
      escapeHtml(
        property_title ||
          "Property"
      );


    const { data, error } =
      await resend.emails.send({

        from:
          process.env.EMAIL_FROM,

        to:
          process.env
            .ADMIN_NOTIFICATION_EMAIL,

        replyTo:
          email,

        subject:
          `New Property Enquiry | ${name}`,

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
                  max-width:650px;
                  margin:30px auto;
                  background:#ffffff;
                  border:1px solid #e3e9ee;
                  border-radius:14px;
                  overflow:hidden;
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
                    New Property Enquiry
                  </h1>

                </div>


                <div
                  style="
                    padding:32px;
                  "
                >

                  <p
                    style="
                      margin:0 0 24px;
                      font-size:15px;
                      line-height:1.7;
                      color:#555555;
                    "
                  >
                    A new property enquiry has
                    been submitted through the
                    Next Move Estates website.
                  </p>


                  <div
                    style="
                      margin-bottom:24px;
                      padding:18px;
                      background:#FFF9E8;
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
                        font-size:17px;
                        font-weight:bold;
                      "
                    >
                      ${safePropertyTitle}
                    </div>

                  </div>


                  <table
                    style="
                      width:100%;
                      border-collapse:collapse;
                      font-size:14px;
                    "
                  >

                    <tr>

                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                          color:#777777;
                          width:170px;
                        "
                      >
                        Name
                      </td>


                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                          color:#082D52;
                          font-weight:bold;
                        "
                      >
                        ${safeName}
                      </td>

                    </tr>


                    <tr>

                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                          color:#777777;
                        "
                      >
                        Email
                      </td>


                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                        "
                      >
                        ${safeEmail}
                      </td>

                    </tr>


                    <tr>

                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                          color:#777777;
                        "
                      >
                        Phone
                      </td>


                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                        "
                      >
                        ${safePhone}
                      </td>

                    </tr>


                    <tr>

                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                          color:#777777;
                        "
                      >
                        Preferred Viewing
                      </td>


                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                        "
                      >
                        ${safePreferredDate}
                      </td>

                    </tr>

                  </table>


                  <div
                    style="
                      margin-top:25px;
                    "
                  >

                    <div
                      style="
                        margin-bottom:8px;
                        color:#082D52;
                        font-size:13px;
                        font-weight:bold;
                        text-transform:uppercase;
                        letter-spacing:1px;
                      "
                    >
                      Message
                    </div>


                    <div
                      style="
                        background:#f7fafc;
                        border-left:4px solid #D3A72F;
                        padding:18px;
                        border-radius:8px;
                        color:#555555;
                        font-size:14px;
                        line-height:1.8;
                        white-space:pre-wrap;
                      "
                    >${safeMessage}</div>

                  </div>


                  <div
                    style="
                      margin-top:28px;
                      padding:18px;
                      background:#FFF9E8;
                      border-radius:8px;
                    "
                  >

                    <strong
                      style="
                        color:#082D52;
                      "
                    >
                      Action required
                    </strong>


                    <p
                      style="
                        margin:7px 0 0;
                        color:#555555;
                        font-size:14px;
                        line-height:1.7;
                      "
                    >
                      Log in to the admin panel
                      to review this enquiry and
                      update its status.
                    </p>

                  </div>

                </div>

              </div>

            </body>

          </html>
        `,
      });


    if (error) {

      console.error(
        "Enquiry admin notification error:",
        error
      );


      return {
        success: false,
        error,
      };
    }


    console.log(
      "Enquiry admin notification sent:",
      data?.id
    );


    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Send enquiry admin notification error:",
      error
    );


    return {
      success: false,
      error,
    };
  }
}


module.exports =
  sendEnquiryAdminNotification;