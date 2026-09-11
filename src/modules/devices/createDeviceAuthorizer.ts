import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";


export default async function createDeviceAuthorizer(apiKey: APIKey, deviceID: string, authorized: boolean): Promise<void> {
    const body = {authorized};
    const req = await authorisedFetch(`${TailscaleAPIBaseURL}/device/${deviceID}/authorized`, apiKey, {method: "POST", body: JSON.stringify(body)}, true);
    if (!req.ok) throw new Error(buildErrorMessage(`Operation devices.authorizeDevice with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`, req));
};  