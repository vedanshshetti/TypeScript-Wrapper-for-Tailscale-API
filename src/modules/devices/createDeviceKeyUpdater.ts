import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export default async function createDeviceKeyUpdater(
  apiKey: APIKey,
  deviceID: string,
  keyCanExpire: boolean
): Promise<void> {
  const body = { keyExpiryDisabled: !keyCanExpire };
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/device/${deviceID}/key`,
    apiKey,
    { method: "POST", body: JSON.stringify(body) },
    true
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation devices.updateDeviceKey with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`,
        req
      )
    );
}
