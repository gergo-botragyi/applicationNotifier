import { updateStudent } from "../../lib/redis";

export default async function handler(req: any, res: any) {
  const id = await updateStudent(req.body);
  if (!id) res.status(404).send("student not found, creating a new one");
  else {
    res.json({ id });
  }
}
