import {
  createAbilityFactory,
  createAccessibleByFactory,
  type ExtractModelName,
  type Model,
} from "@casl/prisma/runtime";
import type { hkt } from "@casl/ability";
import type { Prisma, PrismaClient } from "../../../../prisma/generated/client";

type ModelName = Prisma.ModelName;
type ModelWhereInput = {
  [K in Prisma.ModelName]: Uncapitalize<K> extends keyof PrismaClient
    ? Extract<
        Parameters<PrismaClient[Uncapitalize<K>]["findFirst"]>[0],
        // biome-ignore lint/suspicious/noExplicitAny: casl boilerplate
        { where?: any }
      >["where"]
    : never;
};

type WhereInput<TModelName extends Prisma.ModelName> = Extract<
  ModelWhereInput[TModelName],
  // biome-ignore lint/suspicious/noExplicitAny: casl boilerplate
  Record<any, any>
>;

interface PrismaQueryTypeFactory extends hkt.GenericFactory {
  produce: WhereInput<ExtractModelName<this[0], ModelName>>;
}

// biome-ignore lint/suspicious/noExplicitAny: casl boilerplate
type PrismaModel = Model<Record<string, any>, string>;
// Higher Order type that allows to infer passed in Prisma Model name
export type PrismaQuery<T extends PrismaModel = PrismaModel> = WhereInput<
  ExtractModelName<T, ModelName>
> &
  hkt.Container<PrismaQueryTypeFactory>;

type WhereInputPerModel = {
  [K in ModelName]: WhereInput<K>;
};

const createPrismaAbility = createAbilityFactory<ModelName, PrismaQuery>();
const accessibleBy = createAccessibleByFactory<
  WhereInputPerModel,
  PrismaQuery
>();

export { createPrismaAbility, accessibleBy };
