import { buildSchema } from "graphql"
import { renderModules } from "."
import { data } from "./data.generated"

const schema = buildSchema(data.schema)

await renderModules(schema, data)
