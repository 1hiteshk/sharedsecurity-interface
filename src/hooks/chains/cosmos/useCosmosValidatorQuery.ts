import { useRecoilState } from "recoil";
import { useValidatorQuery } from "@/hooks/common/validators/useValidatorsQuery";
import { cosmosValidatorState } from "@/context/cosmosValidatorState";
import { useCosmosGovQuery } from "@/hooks/chains/cosmos/useCosmosGovQuery";
import { coinConvert } from "@/utils/common";
import nodeConfig from "@/config/nodeConfig.json";

const COSMOS_REST_URL = nodeConfig.Cosmos.REST;

export const useCosmosValidatorQuery = () => {
  const [{ validators }, setValidators] = useRecoilState(cosmosValidatorState);

  const { getFullValidatorList } = useValidatorQuery(COSMOS_REST_URL);
  const { getCosmosTotalBondedToken } = useCosmosGovQuery();

  const getAllCosmosValidators = async () => {
    const allValidators = await getFullValidatorList();

    allValidators.sort(
      (a: any, b: any) => Number(b?.tokens) - Number(a?.tokens)
    );

    return allValidators;
  };

  const getCosmosUnjailedValidators = async () => {
    let allValidators = validators;
    if (!allValidators.length) allValidators = await getAllCosmosValidators();
    allValidators = allValidators.filter(
      (validator) => validator.jailed === false
    );
    allValidators = allValidators.sort((a, b) => Number(b.tokens) - a.tokens);

    return allValidators;
  };

  const calculateCoefficients = (target: number, active: any[]) => {
    let aggregatedVp = 0;
    let coefficient = 0;
    active.some((item, index) => {
      const vp = Number(item["Share %"].slice(0, -1));

      aggregatedVp += vp;
      if (aggregatedVp > target) {
        coefficient = index + 1;

        return coefficient.toString();
      }
    });
    return coefficient.toString();
  };

  const getParsedActiveValidators = async () => {
    const totalBonded = await getCosmosTotalBondedToken();
    let allValidators = await getAllCosmosValidators();
    let parsedValidators = [];
    let parsedJailedValidators = [];
    let parsedActiveValidators = [];

    for (const index in allValidators) {
      const validator = allValidators[index];

      const parsedValidator = {
        Validator: validator.description.moniker,
        Power: Number(
          coinConvert(validator.tokens, 6, "human")
        ).toLocaleString(),
        "Share %": `${((validator.tokens / Number(totalBonded)) * 100).toFixed(
          2
        )}%`,
        "Commision Rate": `${(
          Number(validator.commission.commission_rates.rate) * 100
        ).toFixed(2)}%`,
      };
      parsedValidators.push(parsedValidator);

      if (validator.jailed === true)
        parsedJailedValidators.push(parsedValidator);
      else parsedActiveValidators.push(parsedValidator);
    }

    const active = parsedActiveValidators.slice(0, 180);

    setValidators({
      validators: parsedValidators,
      jailed: parsedJailedValidators,
      active: parsedActiveValidators.slice(0, 180),
      nCoefficient: calculateCoefficients(51, active),
      mCoefficient: calculateCoefficients(67, active),
    });

    return parsedActiveValidators.slice(0, 180);
  };

  return {
    getAllCosmosValidators,
    getCosmosUnjailedValidators,
    getParsedActiveValidators,
  };
};
