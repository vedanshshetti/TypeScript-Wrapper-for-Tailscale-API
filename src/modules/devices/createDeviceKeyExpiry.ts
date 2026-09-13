import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export default async function createDeviceKeyExpiry(
  apiKey: APIKey,
  deviceID: string
): Promise<void> {
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/device/${deviceID}/expire`,
    apiKey,
    { method: "POST" }
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation devices.expireDevice with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`,
        req
      )
    );
}
