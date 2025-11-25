import serverless from "serverless-http";
import { createServer } from "../../server/index"; // <— ensure this path is correct

const app = createServer();

// immediately after const app = express();
app.use((req, _res, next) => {
  const prefix = "/.netlify/functions/api";
  if (typeof req.url === "string" && req.url.startsWith(prefix)) {
    req.url = req.url.slice(prefix.length) || "/";
  }
  next();
});
export const handler = serverless(app);
