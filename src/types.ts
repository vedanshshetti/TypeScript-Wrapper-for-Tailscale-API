// Global Types
export type APIKey = `tskey-api-${string}`;
export type Route = `${number}.${number}.${number}.${number}/${number}`;

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export type IPAddress = `100.${number}.${number}.${number}`;
export type IPAddressWithPort = `${IPAddress}:${number}`;
export type ISO8601TimeStamp =
  `${number}-${number}-${number}T15:${Digit}${Digit}:${Digit}${Digit}Z`;

// Types for Device Interface
export type { ListTailnetDevicesReturnType } from "./modules/devices/createDeviceLister";
export type { GetDeviceReturnType } from "./modules/devices/createDeviceRetriever";
export type { ListDeviceRoutesReturnType } from "./modules/devices/createDeviceRouteLister";
export type { UpdateCustomDevicePostureAttributesBody } from "./modules/devices/createCustomDeviceBatchPostureAttributesUpdater";
export type {
  SetDeviceRoutesReturnType,
  SetDeviceRoutesBody
} from "./modules/devices/createDeviceRouteSetter";
export type { GetDevicePostureAttributesReturnType } from "./modules/devices/createDevicePostureAttributesRetriever";
export type { SetCustomDevicePostureAttributesBody } from "./modules/devices/createCustomDevicePostureAttributesSetter";

// Types for Policy File Interface
export type { GetPolicyFileReturnType } from "./modules/policyFile/createRetriever";
export type { SetPolicyFileBody } from "./modules/policyFile/createPolicyFileSetter";
export type { PreviewRuleMatchesReturnType } from "./modules/policyFile/createPreviewRuleMatches";
export type {
  ValidateAndTestPolicyFileBody,
  ValidateAndTestPolicyFileReturnType
} from "./modules/policyFile/createPolicyFileValAndTest";

// Types for Keys Interface
export type { ListTailnetKeysReturnType } from "./modules/keys/createTailnetKeysList";
export type { TailscaleKey } from "./modules/keys/createKeyCreation";
export type { SetKeyBody } from "./modules/keys/createKeySetter";
