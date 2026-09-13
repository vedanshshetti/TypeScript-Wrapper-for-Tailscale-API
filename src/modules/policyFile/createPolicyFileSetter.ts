import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey, GetPolicyFileReturnType, IPAddress } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type SetPolicyFileBody = {
  acls: [
    {
      action: string;
      ports: string[];
      users: string[];
    }
  ];
  groups: Record<string, string[]>;
  hosts: Record<string, IPAddress>;
};

export default async function createPolicyFileSetter(
  apiKey: APIKey,
  tailnet: string,
  body: SetPolicyFileBody
): Promise<GetPolicyFileReturnType> {
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/tailnet/${tailnet}/acl`,
    apiKey,
    { method: "POST", body: JSON.stringify(body) },
    true
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation policyFile.setPolicyFile with API Key ${hideApiKey(apiKey)} and
     Tailnet "${tailnet}" failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`,
        req
      )
    );
  return (await req.json()) as GetPolicyFileReturnType;
}
