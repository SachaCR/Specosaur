import { buildSpec } from './buildSpec.ts';

import {
  SpecificationResult,
  SpecificationDefinition,
  Specification,
} from './types.ts';

export function defineSpecification<T>(
  definition: SpecificationDefinition<T>,
): Specification<T> {
  return buildSpec({
    name: definition.name,
    desc: definition.desc,
    isSatisfiedBy: (entity: T): SpecificationResult => {
      const isSatisfied = definition.isSatisfiedBy(entity);

      return {
        name: definition.name,
        value: isSatisfied,
        desc: definition.desc,
        details: [
          {
            name: definition.name,
            value: isSatisfied,
            desc: definition.desc,
          },
        ],
      };
    },
  });
}
