import { TailscaleAPIBaseURL } from "../../constants";
import { APIKey } from "../../types";
import { authorisedFetch, buildErrorMessage, hideApiKey } from "../../utils";

export type ListTailnetDevicesReturnType = {
  devices: {
    addresses: string[];
    id: string;
    nodeId: string;
    user: string;
    name: string;
    hostname: string;
    clientVersion: string;
    updateAvailable: boolean;
    os: string;
    created: string;
    connectedToControl: boolean;
    lastSeen: string;
    keyExpiryDisabled: boolean;
    expires: string;
    authorized: boolean;
    isExternal: boolean;
    multipleConnections: boolean;
    machineKey: string;
    nodeKey: string;
    blocksIncomingConnections: boolean;
    enabledRoutes: string[];
    advertisedRoutes: string[];
    clientConnectivity: {
      endpoints: string[];
      latency: {
        [region: string]: {
          latencyMs: number;
          preferred?: boolean;
        };
      };
      mappingVariesByDestIP: boolean;
      clientSupports: {
        hairPinning: boolean | null;
        ipv6: boolean;
        pcp: boolean;
        pmp: boolean;
        udp: boolean;
        upnp: boolean;
      };
    };
    tags: string[];
    tailnetLockError: string;
    tailnetLockKey: string;
    sshEnabled: boolean;
    postureIdentity: {
      serialNumbers: string[];
    };
    isEphemeral: boolean;
    distro: {
      name: string;
      version: string;
      codeName: string;
    };
  }[];
};


export default async function createDeviceLister(apiKey: APIKey, tailnet: string): Promise<ListTailnetDevicesReturnType> {
    const req = await authorisedFetch(`${TailscaleAPIBaseURL}/tailnet/${tailnet}/devices`, apiKey);
    if (!req.ok) throw new Error(buildErrorMessage(`Operation devices.listTailnetDevices with API Key ${hideApiKey(apiKey)} failed;
     Tailscale API returned a status code of ${req.status} with
     status text of "${req.statusText}"`, req));
    return await req.json() as ListTailnetDevicesReturnType;
};