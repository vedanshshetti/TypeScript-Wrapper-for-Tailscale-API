import { APIKey } from "./types";

export function authorisedFetch(url: string, authToken: string, otherOptions?: RequestInit, requiresJSONContentHeader=false) {
  return fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          ...(requiresJSONContentHeader ? { "Content-Type": "application/json" } : {})
        },
        ...otherOptions
  });
};

export function buildErrorMessage(message: string, res: Response) {
  return `[@typescript-utils/tailscale-api-wrapper] had an Error: ${message} ${res.status === 401 ? "Here's a suggestion: Check your API Key, maybe you have a typo." : ""}`;
};

export function hideApiKey(key: APIKey) {
  const chars = key.split("tskey-api-")[1].split("");
  return `${chars[0]}####${chars[5]}`;
};