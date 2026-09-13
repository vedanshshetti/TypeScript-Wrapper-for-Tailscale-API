import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export default async function createDeviceNameSetter(
  apiKey: APIKey,
  deviceID: string,
  name: string
): Promise<void> {
  const body = { name };
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/device/${deviceID}/name`,
    apiKey,
    { method: "POST", body: JSON.stringify(body) },
    true
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation devices.setDeviceName with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`,
        req
      )
    );
}
