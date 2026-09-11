import createDevicesInterface from "./components/deviceInterface";
import { APIKey } from "./types";


const TailscaleInterface = (apiKey: APIKey) => {
    return {
        devices: (deviceID: string) => createDevicesInterface(apiKey, deviceID)
    };
};

export default TailscaleInterface;