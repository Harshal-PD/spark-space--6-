import serverless from "serverless-http";
import { createServer } from "../../server/index"; // <— ensure this path is correct

const app = createServer();
export const handler = serverless(app);