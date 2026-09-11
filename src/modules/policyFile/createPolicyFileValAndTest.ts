import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type ValidateAndTestPolicyFileBody = {
    "src": `${string}@${string}`;
    "accept": string[];
    "deny": string[];
    "proto"?: string;
    "srcPostureAttrs"?: Record<string, string | number | boolean>;
  }
[];

export type ValidateAndTestPolicyFileReturnType = {
  "message": string,
  "data": [
    {
      "user": `${string}@${string}`,
      "errors": string[]
    }
  ]
} | {};

export default async function createPolicyFileValAndTest(apiKey: APIKey, tailnet: string, body: ValidateAndTestPolicyFileBody): Promise<ValidateAndTestPolicyFileReturnType> {
    const req = await authorisedFetch(`${TailscaleAPIBaseURL}/tailnet/${tailnet}/acl/validate`, apiKey, {method: "POST", body: JSON.stringify(body)}, true);
    if (!req.ok) throw new Error(buildErrorMessage(`Operation policyFile.validateAndTestPolicyFile with API Key ${hideApiKey(apiKey)} and
     Tailnet "${tailnet}" failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`, req));
    return await req.json() as ValidateAndTestPolicyFileReturnType;
};