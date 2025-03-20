import axios from "axios";

export const PING_URL_KEY = "PING_URL";

export const handler = async (_event) => {
  const url = process.env[PING_URL_KEY];
  const timestamp = new Date().toLocaleString("en-SG", {
    timeZone: "Asia/Singapore",
  });

  if (!url) {
    console.error(`${PING_URL_KEY} environment variable is missing`);
    const errorResponse = {
      timestamp,
      statusCode: 500,
      body: JSON.stringify({
        message: `Missing ${PING_URL_KEY} environment variable`,
      }),
    };
    console.log("Response:", errorResponse);
    return errorResponse;
  }

  try {
    const response = await axios.get(url);

    const successResponse = {
      timestamp,
      statusCode: response.status,
      headers: response.headers,
      body: JSON.stringify({
        message: `Pinged ${url}`,
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers,
        requestConfig: response.config,
      }),
    };

    console.log("Response:", successResponse);
    return successResponse;
  } catch (error) {
    console.error("Error calling API:", error.message);

    const errorResponse = {
      timestamp,
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        message: `Error pinging ${url}`,
        error: error.message,
        response: error.response
          ? {
              status: error.response.status,
              statusText: error.response.statusText,
              data: error.response.data,
              headers: error.response.headers,
            }
          : null,
      }),
    };

    console.log("Response:", errorResponse);
    return errorResponse;
  }
};
