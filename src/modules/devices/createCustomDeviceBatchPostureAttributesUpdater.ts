import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey, ISO8601TimeStamp } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type UpdateCustomDevicePostureAttributesBody = { // Schema copied from official Tailscale Docs.
    comment?: string,
    nodes: Record<string, {
        [propertyName: string]: {
            value: string | number | boolean;
            expiry?: ISO8601TimeStamp;
        }
    }>
};

export default async function createCustomDeviceBatchPostureAttributesUpdater(apiKey: APIKey, deviceID: string, body: UpdateCustomDevicePostureAttributesBody): Promise<void> {
    const req = await authorisedFetch(`${TailscaleAPIBaseURL}/device/${deviceID}`, apiKey, {method: "patch", body: JSON.stringify(body)}, true);
    if (!req.ok) throw new Error(buildErrorMessage(`Operation devices.batchUpdateCustomDevicePostureAttributes with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`, req));
};  