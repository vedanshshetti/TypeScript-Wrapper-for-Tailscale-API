import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey, IPAddress } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export default async function createDeviceIPV4AddrSetter(
  apiKey: APIKey,
  deviceID: string,
  ipv4Address: IPAddress
): Promise<void> {
  const body = { ipv4: ipv4Address };
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/device/${deviceID}/ip`,
    apiKey,
    { method: "POST", body: JSON.stringify(body) },
    true
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation devices.setIPV4Address with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`,
        req
      )
    );
}
