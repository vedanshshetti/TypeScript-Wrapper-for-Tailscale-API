import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export default async function createDeviceDeletion(
  apiKey: APIKey,
  deviceID: string
): Promise<void> {
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/device/${deviceID}`,
    apiKey,
    { method: "delete" }
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation devices.deleteDevice with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`,
        req
      )
    );
}
