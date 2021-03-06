import { andOperator } from "./andOperator.ts";
import { orOperator } from "./orOperator.ts";
import { xorOperator } from "./xorOperator.ts";
import { notOperator } from "./notOperator.ts";

import {
  SpecificationResult,
  Specification,
  SpecificationData,
} from "./types.ts";

export function buildSpec<T>(specData: SpecificationData<T>): Specification<T> {
  const specification: Specification<T> = {
    desc: specData.desc,
    name: specData.name,
    isSatisfiedBy: (entity: T): SpecificationResult => {
      const result = specData.isSatisfiedBy(entity);

      return {
        name: specData.name,
        desc: specData.desc,
        value: result.value,
        details: result.details,
      };
    },
    and: (spec: Specification<T>, name: string): Specification<T> => {
      return buildSpec(andOperator(specification, spec, name));
    },
    or: (spec: Specification<T>, name: string): Specification<T> => {
      return buildSpec(orOperator(specification, spec, name));
    },
    xor: (spec: Specification<T>, name: string): Specification<T> => {
      return buildSpec(xorOperator(specification, spec, name));
    },
    not: (name: string): Specification<T> => {
      return buildSpec(notOperator(specification, name));
    },
  };

  return specification;
}
