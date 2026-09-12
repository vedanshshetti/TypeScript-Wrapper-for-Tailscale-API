import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey, ISO8601TimeStamp } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type ListTailnetKeysReturnType = {
  keys: {
    id: string;
    key?: string;
    keyType: "auth" | "client" | "api" | "federated";
    expirySeconds?: number;
    created: ISO8601TimeStamp;
    updated?: string;
    expires?: string;
    revoked?: string;
    capabilities?: {
      devices?: {
        create?: {
          reusable?: boolean;
          ephemeral?: boolean;
          preauthorized?: boolean;
          tags?: string[];
        };
      };
    };
    scopes?: string[];
    tags?: string[];
    description?: string;
    invalid?: boolean;
    userId?: string;
    audience?: string;
    issuer?: string;
    subject?: string;
    customClaimRules?: {
      [claimName: string]: string;
    };
  }[];
};

export default async function createTailnetKeysLister(
  apiKey: APIKey,
  tailnet: string,
  all: boolean
): Promise<ListTailnetKeysReturnType> {
  const req = await authorisedFetch(
    `${TailscaleAPIBaseURL}/tailnet/${tailnet}/keys?all=${all}`,
    apiKey
  );

  if (!req.ok)
    throw new Error(
      buildErrorMessage(
        `Operation keys.listTailnetKeys with API Key ${hideApiKey(apiKey)} failed;
        Tailscale API returned a status code of ${req.status} with
        status text of "${req.statusText}"`,
        req
      )
    );

  return (await req.json()) as ListTailnetKeysReturnType;
}
