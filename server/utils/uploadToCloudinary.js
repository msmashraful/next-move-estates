const cloudinary = require("../config/cloudinary");


function uploadOnce(
  buffer,
  folder
) {
  return new Promise((resolve, reject) => {

    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder,

          resource_type:
            "image",

          timeout:
            120000,

          transformation: [
            {
              width: 1800,
              height: 1200,
              crop: "limit",
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },

        (error, result) => {

          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );


    stream.on(
      "error",
      (error) => {
        reject(error);
      }
    );


    stream.end(buffer);
  });
}


function wait(ms) {
  return new Promise(
    (resolve) =>
      setTimeout(resolve, ms)
  );
}


function isRetryableNetworkError(
  error
) {
  if (!error) {
    return false;
  }


  const codes = [
    "ETIMEDOUT",
    "ESOCKETTIMEDOUT",
    "ECONNRESET",
    "ECONNREFUSED",
    "ENETUNREACH",
    "EHOSTUNREACH",
    "EAI_AGAIN",
  ];


  if (
    codes.includes(
      error.code
    )
  ) {
    return true;
  }


  if (
    Array.isArray(
      error.errors
    )
  ) {
    return error.errors.some(
      (item) =>
        codes.includes(
          item?.code
        )
    );
  }


  const message =
    String(
      error.message || ""
    );


  return (
    message.includes(
      "ETIMEDOUT"
    ) ||
    message.includes(
      "ENETUNREACH"
    ) ||
    message.includes(
      "ECONNRESET"
    )
  );
}


async function uploadToCloudinary(
  buffer,
  folder =
    "next-move-estates/properties"
) {

  if (
    !buffer ||
    !Buffer.isBuffer(buffer)
  ) {
    throw new Error(
      "Invalid image buffer."
    );
  }


  const maxAttempts = 3;


  let lastError;


  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt++
  ) {

    try {

      console.log(
        `Cloudinary upload attempt ${attempt}/${maxAttempts}`
      );


      const result =
        await uploadOnce(
          buffer,
          folder
        );


      console.log(
        "Cloudinary upload successful:",
        result.public_id
      );


      return result;


    } catch (error) {

      lastError = error;


      console.error(
        `Cloudinary upload attempt ${attempt} failed:`,
        error.code ||
          error.message
      );


      if (
        !isRetryableNetworkError(
          error
        )
      ) {
        throw error;
      }


      if (
        attempt <
        maxAttempts
      ) {

        const delay =
          attempt * 2000;


        console.log(
          `Retrying Cloudinary upload in ${delay / 1000}s...`
        );


        await wait(
          delay
        );
      }
    }
  }


  const finalError =
    new Error(
      "Cloudinary upload failed after 3 attempts due to a network timeout."
    );


  finalError.cause =
    lastError;


  throw finalError;
}


module.exports =
  uploadToCloudinary;