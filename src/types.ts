export interface SpecificationData<T> {
  desc: string;
  name: string;
  isSatisfiedBy: (entity: T) => SpecificationResult;
}

export interface SpecificationResult {
  value: boolean;
  name: string;
  desc: string;
  details: Array<{
    value: boolean;
    desc: string;
    name: string;
  }>;
}

export interface Specification<T> {
  desc: string;
  name: string;
  isSatisfiedBy: (entity: T) => SpecificationResult;
  and: (spec: Specification<T>, name: string) => Specification<T>;
  or: (spec: Specification<T>, name: string) => Specification<T>;
  xor: (spec: Specification<T>, name: string) => Specification<T>;
  not: (name: string) => Specification<T>;
}

export interface SpecificationDefinition<T> {
  desc: string;
  name: string;
  isSatisfiedBy: (entity: T) => boolean;
}
