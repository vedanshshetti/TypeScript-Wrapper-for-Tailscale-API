import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey, Route } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type SetDeviceRoutesBody = {
  routes: Route[];
};

export type SetDeviceRoutesReturnType = {
  advertisedRoutes: Route[];
  enabledRoutes: Route[];
};

export default async function createDeviceRouteSetter(
  apiKey: APIKey,
  deviceID: string,
  body: SetDeviceRoutesBody
): Promise<SetDeviceRoutesReturnType> {
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/device/${deviceID}/routes`,
    apiKey,
    { method: "POST", body: JSON.stringify(body) },
    true
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation devices.setDeviceRoutes with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`,
        req
      )
    );
  return (await req.json()) as SetDeviceRoutesReturnType;
}
