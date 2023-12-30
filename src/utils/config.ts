import 'dotenv/config'
import { ConfigSchema } from "./interfaces/config"

console.log(process.env.PORT);

const config = {
  PORT: parseInt(process.env.PORT || '3000', 10) as number,
  EXTERNAL_API: process.env.EXTERNAL_API as string
}

export default ConfigSchema.parse(config)