import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";



export default async function createDeviceTagsSetter(apiKey: APIKey, deviceID: string, tags: string[]): Promise<void> {
    const body = {tags};
    const req = await authorisedFetch(`${TailscaleAPIBaseURL}/device/${deviceID}/tags`, apiKey, {method: "POST", body: JSON.stringify(body)}, true);
    if (!req.ok) throw new Error(buildErrorMessage(`Operation devices.setDeviceTags with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`, req));
};  