// import { data } from "./data.generated"
import type { BuiltData, Module } from "graphinx"
import {
  GraphQLSchema,
  isEnumType,
  isInputObjectType,
  isInterfaceType,
  isListType,
  isNamedType,
  isNonNullType,
  isObjectType,
  isScalarType,
  isUnionType,
  type GraphQLField,
  type GraphQLNamedType,
  type GraphQLType,
} from "graphql"
import { writeFile } from "node:fs/promises"
import { a, code, em, h, h1, h2, hr, strong, ul } from "./markdown"

// const schema = buildSchema(data.schema)

// True: show `?` when nullable. False: show `!` when non-nullable.
const REVERSE_DEFAULT_NULLABILITY = true

// const {
//   config,
//   config: { branding },
// } = data

export function indexModule({
  config: { branding, footer, description },
  modules,
}: BuiltData) {
  return [
    h1(branding.name),
    description,
    h2("Modules"),
    ul(modules.map(({ name, displayName }) => a(`./${name}.md`, displayName))),
    hr(),
    footer ?? "",
  ].join("\n")
}

function findItem(schema: GraphQLSchema, name: string | undefined) {
  if (!name) return undefined
  const types = schema.getTypeMap()
  const queries = schema.getQueryType()?.getFields() ?? {}
  const mutations = schema.getMutationType()?.getFields() ?? {}
  const subscriptions = schema.getSubscriptionType()?.getFields() ?? {}

  return types[name] ?? queries[name] ?? mutations[name] ?? subscriptions[name]
}

export function module(
  schema: GraphQLSchema,
  data: BuiltData,
  m: Module,
  startingHeadingLevel: number
) {
  return [
    h(startingHeadingLevel, m.displayName),
    m.renderedDocs,
    "",
    h(startingHeadingLevel + 1, "Types"),
    ...Object.values(m.types).map((typename) =>
      typedef(
        schema,
        data,
        findItem(schema, typename)!,
        startingHeadingLevel + 2
      )
    ),
    h(startingHeadingLevel + 1, "Queries"),
    ...Object.values(m.queries).map((queryname) =>
      field(
        schema,
        data,
        findItem(schema, queryname) as unknown as GraphQLField<
          unknown,
          unknown
        >,
        startingHeadingLevel + 2
      )
    ),
    h(startingHeadingLevel + 1, "Mutations"),
    ...Object.values(m.mutations).map((queryname) =>
      field(
        schema,
        data,
        findItem(schema, queryname) as unknown as GraphQLField<
          unknown,
          unknown
        >,
        startingHeadingLevel + 2
      )
    ),
    h(startingHeadingLevel + 1, "Subscriptions"),
    ...Object.values(m.subscriptions).map((queryname) =>
      field(
        schema,
        data,
        findItem(schema, queryname) as unknown as GraphQLField<
          unknown,
          unknown
        >,
        startingHeadingLevel + 2
      )
    ),
  ].join("\n")
}

/**
 *
 * @param t
 * @param startingHeadingLevel null to not output a header
 * @returns
 */
export function typedef(
  schema: GraphQLSchema,
  data: BuiltData,
  t: GraphQLNamedType,
  startingHeadingLevel: number | null
): string {
  const item = data.items.find((i) => i.name === t.name)
  if (item?.referencedBy.length === 1) return ""
  const noisyTypeNames = [
    item?.connection?.connectionType,
    item?.connection?.edgeType,
    item?.result?.successType,
    item?.result?.resultType,
  ]
  if (noisyTypeNames.includes(item?.name)) {
    return ""
  }
  return [
    ...(startingHeadingLevel
      ? [h(startingHeadingLevel, t.name, em(`(${typekind(t)})`)), "\n"]
      : []),
    ...(t.description ?? "").split("\n"),
    hasFields(t)
      ? ul(
          Object.values(t.getFields()).map((f) => field(schema, data, f, null))
        )
      : isEnumType(t)
      ? ul(
          Object.values(t.getValues()).map(
            (v) =>
              `${code(v.name)}${v.description ? `\n${v.description}\n` : ""}`
          )
        )
      : isUnionType(t)
      ? ul(
          Object.values(t.getTypes()).map((t) =>
            linkToItem(schema, data, t.name)
          )
        )
      : "",
  ].join("")
}

export function field<TSource, TContext>(
  schema: GraphQLSchema,
  data: BuiltData,
  f: GraphQLField<TSource, TContext>,
  headingLevel: number | null = null,
  live = false
) {
  const args = f.args ?? []
  const returnTypeNamed = drillToNamedType(f.type)
  const returnTypeItem = data.items.find(
    (i) => i.name === returnTypeNamed?.name
  )

  const fieldArgs = (collapseTypes = false) =>
    args
      .map((arg) =>
        collapseTypes
          ? arg.name
          : `${arg.name}: ${argtype(schema, data, arg.type)}`
      )
      .join(", ")

  const returnType = argtype(schema, data, f.type)

  return [
    `${headingLevel ? h(headingLevel, f.name) : strong(f.name)}${
      args.length > 0
        ? `(${
            args.length > 6 ? "..." : fieldArgs(args.length > 3)
          }): ${returnType}`
        : `: ${returnType}`
    }`,
    "",
    f.description ?? "",
    "",
    args.some((arg) => Boolean(arg.description)) || args.length > 3
      ? em("Arguments") +
        ul(
          args.map(
            (arg) =>
              `${strong(arg.name)}: ${argtype(schema, data, arg.type)}${
                arg.description ? `\n\n${arg.description}` : ""
              }`
          )
        )
      : "",
    returnTypeItem?.referencedBy.length === 1
      ? typedef(
          schema,
          data,
          returnTypeNamed!,
          headingLevel ? headingLevel + 1 : null
        )
      : "",
  ].join("\n")
}

export function argtype(
  schema: GraphQLSchema,
  data: BuiltData,
  t: GraphQLType,
  recursed = false
): string {
  if (!recursed) {
    const namedType = drillToNamedType(t)
    const item = data.items.find((i) => i.name === namedType?.name)
    if (item?.connection) {
      return a(
        itemHref(schema, data, item.connection.nodeType),
        code(
          `Connection<${argtype(
            schema,
            data,
            findItem(schema, item.connection.nodeType)!,
            true
          )}>`
        )
      )
    }
    if (item?.result) {
      return a(
        itemHref(schema, data, item.result.successDataType),
        code(
          `Result<${argtype(
            schema,
            data,
            findItem(schema, item.result.successDataType)!,
            true
          )}>`
        )
      )
    }
    if (namedType)
      return a(
        itemHref(schema, data, namedType.name),
        code(argtype(schema, data, t, true))
      )
    else return code(argtype(schema, data, t, true))
  }
  // if (REVERSE_DEFAULT_NULLABILITY && isNullable(t)) {
  //   return argtype(t)
  // }
  if (isListType(t)) return `[${argtype(schema, data, t.ofType, true)}]`
  if (isNonNullType(t))
    // return REVERSE_DEFAULT_NULLABILITY
    //   ? argtype(t.ofType, true)
    // : `${argtype(t.ofType, true)}!`
    return `${argtype(schema, data, t.ofType, true)}!`
  if (isNamedType(t)) return t.name
  throw new Error(`Cannot print arg type ${t}`)
}

function isNullable(t: GraphQLType) {
  if (isNonNullType(t)) return false
  if ("ofType" in t) return isNullable(t)
  return true
}

function hasFields(t: GraphQLType) {
  return isObjectType(t) || isInterfaceType(t) || isInputObjectType(t)
}

export function typekind(t: GraphQLType) {
  if (isUnionType(t)) return "union"
  if (isInputObjectType(t)) return "input object"
  if (isObjectType(t)) return "object"
  if (isInterfaceType(t)) return "interface"
  if (isEnumType(t)) return "enum"
  if (isScalarType(t)) return "scalar"
  throw new Error(`Unknown type kind: ${t}`)
}

export async function renderModules(schema: GraphQLSchema, data: BuiltData) {
  await Promise.all([
    ...data.modules.map(async (m) => {
      await writeFile(`out/${m.name}.md`, module(schema, data, m, 1))
    }),
    writeFile("out/index.md", indexModule(data)),
  ])
}

function linkToItem(
  schema: GraphQLSchema,
  data: BuiltData,
  name: string
): string {
  return a(itemHref(schema, data, name), name)
}

function itemHref(
  schema: GraphQLSchema,
  { items }: BuiltData,
  name: string
): string {
  const item = items.find((i) => i.name === name)
  if (!item) return ""
  const type = findItem(schema, name)
  if (!type) return ""
  return `./${item.moduleName}.md#${name
    .toLowerCase()
    .replaceAll(" ", "-")}-${typekind(type).replaceAll(" ", "-")}`
}

function drillToNamedType(t: GraphQLType): GraphQLNamedType | undefined {
  if (isNonNullType(t) || isListType(t)) return drillToNamedType(t.ofType)
  if (isNamedType(t)) return t
  return
}
