import createDevicesInterface from "./components/deviceInterface";
import createKeysInterface from "./components/keysInterface";
import createPolicyFileInterface from "./components/policyFileInterface";
import { APIKey } from "./types";

const TailscaleInterface = (apiKey: APIKey) => {
  return {
    devices: (deviceID: string) => createDevicesInterface(apiKey, deviceID),
    policyFile: (tailnet: string) => createPolicyFileInterface(apiKey, tailnet),
    keys: (tailnet: string) => createKeysInterface(apiKey, tailnet),
  };
};

export default TailscaleInterface;
