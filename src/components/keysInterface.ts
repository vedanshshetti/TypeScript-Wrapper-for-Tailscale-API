import createKeyCreation from "../modules/keys/createKeyCreation";
import createKeyDeletion from "../modules/keys/createKeyDeletion";
import createKeySetter from "../modules/keys/createKeySetter";
import createTailnetKeysLister, {
  ListTailnetKeysReturnType
} from "../modules/keys/createTailnetKeysList";
import { APIKey, TailscaleKey, SetKeyBody } from "../types";

const createKeysInterface = (apiKey: APIKey, tailnet: string) => ({
  /**
     * Returns a list of active auth keys, API access tokens and trust credentials.
        If the parameter {all} was not specified, the set of keys returned depends on the access token used to make the request:
        - If the API call is made with a user-owned API access token, this returns only the keys owned by that user.
        - If the API call is made with an access token derived from an OAuth client, this returns all OAuth clients for the tailnet.
        - If the API call is made with an access token derived from a federated identity, this returns all federated identities for the tailnet.
     * @param all Determines whether all keys should be listed.
     * @returns {Promise<ListTailnetKeysReturnType>}
     */
  listTailnetKeys: (all: boolean): Promise<ListTailnetKeysReturnType> =>
    createTailnetKeysLister(apiKey, tailnet, all),
  /**
   * Creates a new key.
   * @param body The new key to be created.
   * @returns {Promise<TailscaleKey>}
   */
  createKey: (body: TailscaleKey): Promise<TailscaleKey> =>
    createKeyCreation(apiKey, tailnet, body),
  /**
   * Deletes Key with given keyID.
   * @param keyID ID of the Key that is to be deleted. Can be found in the Admin Console.
   * @returns {Promise<void>} Void if successful, else throws an error.
   */
  deleteKey: (keyID: string): Promise<void> =>
    createKeyDeletion(apiKey, tailnet, keyID),
  /**
   * Sets the key of given keyID to specified configuration.
   * @param keyID ID of the key that is to be set.
   * @param body New key configuration.
   * @returns {Promise<TailscaleKey>} The newly set key.
   */
  setKey: (keyID: string, body: SetKeyBody): Promise<TailscaleKey> =>
    createKeySetter(apiKey, tailnet, keyID, body)
});

export default createKeysInterface;
