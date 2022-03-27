import { searchStudent } from "../../lib/redis";

export default async function handler(req: any, res: any) {
  const q = req.query.q;
  const student = await searchStudent(q);
  res.status(200).json({ student });
}
