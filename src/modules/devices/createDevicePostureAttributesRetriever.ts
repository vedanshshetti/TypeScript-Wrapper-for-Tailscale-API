import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type GetDevicePostureAttributesReturnType = {
    attributes: {
        [attribute: string]: string | number | boolean;
    };
    expiry: {
        [attribute: string]: string;
    };
};


export default async function createDevicePostureAttributesRetriever(apiKey: APIKey, deviceID: string): Promise<GetDevicePostureAttributesReturnType> {
    const req = await authorisedFetch(`${TailscaleAPIBaseURL}/device/${deviceID}/attributes`, apiKey);
    if (!req.ok) throw new Error(buildErrorMessage(`Operation devices.getDevicePostureAttributes with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`, req));
    return await req.json() as GetDevicePostureAttributesReturnType;
};