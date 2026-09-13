import createCustomDeviceBatchPostureAttributesUpdater from "../modules/devices/createCustomDeviceBatchPostureAttributesUpdater";
import createCustomDevicePostureAttributesDeletion from "../modules/devices/createCustomDevicePostureAttributesDeletion";
import createCustomDevicePostureAttributesSetter from "../modules/devices/createCustomDevicePostureAttributesSetter";
import createDeviceAuthorizer from "../modules/devices/createDeviceAuthorizer";
import createDeviceDeletion from "../modules/devices/createDeviceDeletion";
import createDeviceIPV4AddrSetter from "../modules/devices/createDeviceIPV4AddrSetter";
import createDeviceKeyExpiry from "../modules/devices/createDeviceKeyExpiry";
import createDeviceKeyUpdater from "../modules/devices/createDeviceKeyUpdater";
import createDeviceLister from "../modules/devices/createDeviceLister";
import createDeviceNameSetter from "../modules/devices/createDeviceNameSetter";
import createDevicePostureAttributesRetriever from "../modules/devices/createDevicePostureAttributesRetriever";
import createDeviceRetriever from "../modules/devices/createDeviceRetriever";
import createDeviceRouteLister from "../modules/devices/createDeviceRouteLister";
import createDeviceRouteSetter from "../modules/devices/createDeviceRouteSetter";
import createDeviceTagsSetter from "../modules/devices/createDeviceTagSetter";
import {
  APIKey,
  GetDevicePostureAttributesReturnType,
  GetDeviceReturnType,
  IPAddress,
  ListDeviceRoutesReturnType,
  ListTailnetDevicesReturnType,
  SetCustomDevicePostureAttributesBody,
  SetDeviceRoutesBody,
  SetDeviceRoutesReturnType,
  UpdateCustomDevicePostureAttributesBody
} from "../types";

const createDevicesInterface = (apiKey: APIKey, deviceID: string) => {
  return {
    /**
     * Lists all devices for given tailnet.
     * @param tailnet The Tailnet for which devices should be listed.
     * @returns {Promise<ListTailnetDevicesReturnType>} A list of devices with additional data.
     */
    listTailnetDevices: (
      tailnet: string
    ): Promise<ListTailnetDevicesReturnType> =>
      createDeviceLister(apiKey, tailnet),
    /**
     * Gets the device information for given device ID.
     * @returns {Promise<GetDeviceReturnType>} An object of device data.
     */
    getDevice: (): Promise<GetDeviceReturnType> =>
      createDeviceRetriever(apiKey, deviceID),
    /**
     * Updates the custom device posture attributes for given device ID.
     * @param body Request Body containing posture attributes.
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    batchUpdateCustomDevicePostureAttributes: (
      body: UpdateCustomDevicePostureAttributesBody
    ): Promise<void> =>
      createCustomDeviceBatchPostureAttributesUpdater(apiKey, deviceID, body),
    /**
     * Deletes device with given deviceID.
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    deleteDevice: (): Promise<void> => createDeviceDeletion(apiKey, deviceID),
    /**
     * Expires the Device Key for the device with given deviceID.
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    expireDeviceKey: (): Promise<void> =>
      createDeviceKeyExpiry(apiKey, deviceID),
    /**
     * Lists all routes of the device with given deviceID.
     * @returns {Promise<ListDeviceRoutesReturnType>} An object containing lists of advertised and enabled routes.
     */
    listDeviceRoutes: (): Promise<ListDeviceRoutesReturnType> =>
      createDeviceRouteLister(apiKey, deviceID),
    /**
     * Sets the device routes of the device with given deviceID.
     * @param body The new routes.
     * @returns {Promise<SetDeviceRoutesReturnType>} An Object containing the newly updated routes.
     */
    setDeviceRoutes: (
      body: SetDeviceRoutesBody
    ): Promise<SetDeviceRoutesReturnType> =>
      createDeviceRouteSetter(apiKey, deviceID, body),
    /**
     * Changes the authorization for a device.
     * @param authorized Boolean value: true for authorizing device, false for unauthorizing.
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    authorizeDevice: (authorized: boolean): Promise<void> =>
      createDeviceAuthorizer(apiKey, deviceID, authorized),
    /**
     * Sets / Changes the device name for device with given deviceID.
     * @param name The new name.
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    setDeviceName: (name: string): Promise<void> =>
      createDeviceNameSetter(apiKey, deviceID, name),
    /**
     * Sets / Changes the device tags for device with given deviceID.
     * @param tags The new tags.
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    setDeviceTags: (tags: string[]): Promise<void> =>
      createDeviceTagsSetter(apiKey, deviceID, tags),
    /**
     * Updates the key expiry for device with given deviceID.
     * @param canKeyExpire Whether key should be able to expire.
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    updateDeviceKey: (canKeyExpire: boolean): Promise<void> =>
      createDeviceKeyUpdater(apiKey, deviceID, canKeyExpire),
    /**
     * Sets / Changes the IPv4 Address for device with given deviceID.
     * @param ipv4 The new IPv4 Address (must be in the 100.x.x.x range)
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    setDeviceIPV4Address: (ipv4: IPAddress): Promise<void> =>
      createDeviceIPV4AddrSetter(apiKey, deviceID, ipv4),
    /**
     * Retrieves the posture attributes (and their expiries if set) for device with given deviceID.
     * @returns {Promise<GetDevicePostureAttributesReturnType>} An object with the device posture attributes and their expiries if set.
     */
    getDevicePostureAttributes:
      (): Promise<GetDevicePostureAttributesReturnType> =>
        createDevicePostureAttributesRetriever(apiKey, deviceID),
    /**
     * Sets / Updates a custom device posture attribute for device with given deviceID.
     * @param attribute Attribute that is to be set / updated.
     * @returns {Promise<GetDevicePostureAttributesReturnType>} An object with the updated device posture attributes and their expiries if set.
     */
    setCustomDevicePostureAttributes: (
      attribute: SetCustomDevicePostureAttributesBody
    ): Promise<GetDevicePostureAttributesReturnType> =>
      createCustomDevicePostureAttributesSetter(apiKey, deviceID, attribute),
    /**
     * Deletes a custom device posture attribute for device with given deviceID.
     * @param attributeKey Attribute Key for attribute that is to be deleted.
     * @returns {Promise<void>} Void if successful, else throws an error.
     */
    deleteCustomDevicePostureAttributes: (
      attributeKey: string
    ): Promise<void> =>
      createCustomDevicePostureAttributesDeletion(
        apiKey,
        deviceID,
        attributeKey
      )
  };
};

export default createDevicesInterface;
