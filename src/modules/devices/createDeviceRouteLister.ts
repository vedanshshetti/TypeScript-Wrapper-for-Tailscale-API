import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey, Route } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type ListDeviceRoutesReturnType = {
  advertisedRoutes: Route[];
  enabledRoutes: Route[];
};

export default async function createDeviceRouteLister(
  apiKey: APIKey,
  deviceID: string
) {
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/device/${deviceID}/routes`,
    apiKey
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation devices.listDeviceRoutes with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}"`,
        req
      )
    );
  return await req.json();
}
