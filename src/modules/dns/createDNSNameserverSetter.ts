import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey, DNSNameserver } from "../../types";
import {
  authorisedFetch,
  buildErrorMessage,
  hideApiKey,
  not
} from "../../utils";

export type SetNameserversReturnType = {
  dns: DNSNameserver[];
  magicDNS: boolean;
};

export default async function createDNSNameserverSetter(
  apiKey: APIKey,
  tailnet: string,
  dns: DNSNameserver[],
  overrideGuardrails = false
) {
  if (overrideGuardrails)
    console.warn(
      "WARNING: Running dns.createDNSNameserverSetter with safety guardrails disabled."
    );
  if (dns.includes("0.0.0.0") && not(overrideGuardrails)) {
    throw new Error(
      "Refusing to set DNS to 0.0.0.0 — this will break your tailnet. Set overrideGuardrails to true if you wish to proceed."
    );
  }
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/tailnet/${tailnet}/dns/nameservers`,
    apiKey,
    { method: "POST", body: JSON.stringify({ dns }) },
    true
  );
  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation dns.setNameservers with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}"`,
        req
      )
    );
  return await req.json();
}
