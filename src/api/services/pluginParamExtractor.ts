type UnionToTuple<U, T extends any[] = []> = [U] extends [never]
  ? T
  : (U extends any ? (u: U) => void : never) extends (u: infer I) => void
    ? UnionToTuple<Exclude<U, I>, [...T, I]>
    : never;

// @ts-expect-error TS complains here but we really don't care
type ExtractByIndex<U, I extends number> = UnionToTuple<U>[I];

export type ExtractPluginParamType<
  Instance,
  Method extends "get" | "post" | "put" | "delete" | "patch" | "all" = "post",
> = Parameters<
  // @ts-expect-error TS complains here but we really don't care
  ExtractByIndex<
    // @ts-expect-error TS complains here but we really don't care
    Exclude<Parameters<Instance[Method]>[1], string | number | boolean>,
    0
  >
>[0];
