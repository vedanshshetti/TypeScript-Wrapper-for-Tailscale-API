import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";



export default async function createKeyDeletion(apiKey: APIKey, tailnet: string, keyID: string): Promise<void> {
    const req = await authorisedFetch(`${TailscaleAPIBaseURL}/tailnet/${tailnet}/keys/${keyID}`, apiKey, {method: "delete"});
    if (!req.ok) throw new Error(buildErrorMessage(`Operation keys.deleteKey with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}".`, req));
};