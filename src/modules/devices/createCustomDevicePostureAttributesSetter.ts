import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey, GetDevicePostureAttributesReturnType, ISO8601TimeStamp } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type SetCustomDevicePostureAttributesBody = { // Schema copied from official Tailscale Docs.
    name: string;
    comment?: string;
    value: string | number | boolean;
    expiry?: ISO8601TimeStamp;
};

export default async function createCustomDevicePostureAttributesSetter(apiKey: APIKey, deviceID: string, attribute: SetCustomDevicePostureAttributesBody): Promise<GetDevicePostureAttributesReturnType> {
    const req = await authorisedFetch(`${TailscaleAPIBaseURL}/device/${deviceID}/attributes/${attribute.name}`, apiKey, {method: "patch", body: JSON.stringify(attribute)}, true);
    if (!req.ok) throw new Error(buildErrorMessage(`Operation devices.setCustomDevicePostureAttributes with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`, req));
    return await req.json() as GetDevicePostureAttributesReturnType;
};  