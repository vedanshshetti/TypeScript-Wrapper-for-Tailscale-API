import createPolicyFileSetter from "../modules/policyFile/createPolicyFileSetter";
import createPolicyFileValAndTest from "../modules/policyFile/createPolicyFileValAndTest";
import createPreviewRuleMatches from "../modules/policyFile/createPreviewRuleMatches";
import createRetriever from "../modules/policyFile/createRetriever";
import { APIKey, GetPolicyFileReturnType, IPAddressWithPort, PreviewRuleMatchesReturnType, SetPolicyFileBody, ValidateAndTestPolicyFileBody, ValidateAndTestPolicyFileReturnType } from "../types";


const createPolicyFileInterface = (apiKey: APIKey, tailnet: string) => {
    return {
        /**
         * Retrieves the Policy File for specified Tailnet.
         * @returns {Promise<GetPolicyFileReturnType>} An object with the ACL information.
         */
        getPolicyFile: (): Promise<GetPolicyFileReturnType> => createRetriever(apiKey, tailnet),
        /**
         * Sets / Updates the Policy File for specified Tailnet.
         * @param body New Policy File Configuration.
         * @returns {Promise<GetPolicyFileReturnType>} An object with the ACL information.
         */
        setPolicyFile: (body: SetPolicyFileBody): Promise<GetPolicyFileReturnType> => createPolicyFileSetter(apiKey, tailnet, body),
        /**
         * Check
         * @param body PolicyFile
         * @param type "user" or "ipport" depending on whether 'previewFor' is a user or an IPPort string.
         * @param previewFor Either a user or an ipport string.
         * @returns {Promise<PreviewRuleMatchesReturnType>}
         */
        previewRuleMatches: (body: SetPolicyFileBody, type: "user" | "ipport", previewFor: `${string}@${string}` | IPAddressWithPort): Promise<PreviewRuleMatchesReturnType> => createPreviewRuleMatches(apiKey, tailnet, body, `?type=${type}&previewFor=${previewFor}`),
        /**
         * Run ACL Tests.
         * @param body Array of ACL tests.
         * @returns {Promise<ValidateAndTestPolicyFileReturnType>} An empty response implies passing validation or tests. If tests fail the error will be in the response.
         */
        validateAndTestPolicyFile: (body: ValidateAndTestPolicyFileBody): Promise<ValidateAndTestPolicyFileReturnType> => createPolicyFileValAndTest(apiKey, tailnet, body)
    };
};

export default createPolicyFileInterface;