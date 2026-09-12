const resend = require("../config/resend");


function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


async function sendContactAdminNotification(
  enquiry
) {
  try {

    const {
      name,
      email,
      phone,
      subject,
      message,
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

    const safeSubject =
      escapeHtml(
        subject ||
          "General Enquiry"
      );

    const safeMessage =
      escapeHtml(message);


    const { data, error } =
      await resend.emails.send({

        from:
          process.env.EMAIL_FROM,

        to:
          process.env
            .ADMIN_NOTIFICATION_EMAIL,

        subject:
          `New Contact Enquiry | ${name}`,

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
                    New Contact Enquiry
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
                    A new general enquiry has
                    been submitted through the
                    Next Move Estates website.
                  </p>


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
                          width:150px;
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
                        Enquiry About
                      </td>

                      <td
                        style="
                          padding:12px;
                          border-bottom:1px solid #eeeeee;
                        "
                      >
                        ${safeSubject}
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
                      to review the enquiry and
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
        "Contact admin notification error:",
        error
      );

      return {
        success: false,
        error,
      };
    }


    console.log(
      "Contact admin notification sent:",
      data?.id
    );


    return {
      success: true,
      data,
    };

  } catch (error) {

    console.error(
      "Send contact admin notification error:",
      error
    );


    return {
      success: false,
      error,
    };
  }
}


module.exports =
  sendContactAdminNotification;