import createDNSNameserverLister from "../modules/dns/createDNSNameserverLister";
import { APIKey, ListNameserversReturnType } from "../types";


const createDNSInterface = (apiKey: APIKey, tailnet: string) => ({
    /**
     * Lists all active DNS Nameservers for given Tailnet
     * @returns {Promise<ListNameserversReturnType>}
     */
    listNameservers: (): Promise<ListNameserversReturnType> => createDNSNameserverLister(apiKey, tailnet)
});

export default createDNSInterface;