import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export default async function createCustomDevicePostureAttributesDeletion(
  apiKey: APIKey,
  deviceID: string,
  attributeKey: string
): Promise<void> {
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/device/${deviceID}/attributes/${attributeKey}`,
    apiKey,
    { method: "delete" }
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation devices.deleteCustomDevicePostureAttributes with API Key ${hideApiKey(apiKey)} and
     attribute key "${attributeKey}" failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`,
        req
      )
    );
}
