import { checkP } from "../../lib/redis";

export default async function handler(req: any, res: any) {
  const q = JSON.parse(req.body).q;
  if (!q) {
    res.status(400).send("bad request");
    return;
  }
  const response = await checkP(q);
  if (!response) res.status(404).send("wrong password");
  else {
    res.status(200).send("checked");
  }
}
