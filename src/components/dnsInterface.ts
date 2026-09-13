import createDNSNameserverLister from "../modules/dns/createDNSNameserverLister";
import createDNSNameserverSetter, {
  SetNameserversReturnType
} from "../modules/dns/createDNSNameserverSetter";
import { APIKey, DNSNameserver, ListNameserversReturnType } from "../types";

const createDNSInterface = (apiKey: APIKey, tailnet: string) => ({
  /**
   * Lists all active DNS Nameservers for given Tailnet
   * @returns {Promise<ListNameserversReturnType>}
   */
  listNameservers: (): Promise<ListNameserversReturnType> =>
    createDNSNameserverLister(apiKey, tailnet),
  /**
   * Sets the Tailnet DNS Nameservers to given list.
   * @param newNameservers New DNS Nameservers to be applied.
   * @param overrideSafetyGuardrails Overrides safety guardrails and allows application of certain invalid nameservers.
   * Do not apply this in production systems.
   * @returns {Promise<SetNameserversReturnType>}
   */
  setNameservers: (
    newNameservers: DNSNameserver[],
    overrideSafetyGuardrails = false
  ): Promise<SetNameserversReturnType> =>
    createDNSNameserverSetter(
      apiKey,
      tailnet,
      newNameservers,
      overrideSafetyGuardrails
    )
});

export default createDNSInterface;
