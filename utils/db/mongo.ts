import { MongoClient } from "@db/mod.ts";
import "dotenv/load.ts";

const prt = Deno.env.get("DB_PRT");
const user = Deno.env.get("DB_USER");
const pwd = Deno.env.get("DB_PWD");
const url = Deno.env.get("DB_URL");
const database = Deno.env.get("MONGO_DB");
const param = Deno.env.get("DB_PARAM");

const uri = `${prt}://${user}:${pwd}@${url}/${database}?${param}`

const client = new MongoClient();
await client.connect(uri);

export const db = client.database(database);
