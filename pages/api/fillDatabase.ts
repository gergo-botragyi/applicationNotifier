import { defineStudent } from "../../lib/redis";
import * as fs from "fs";
const csv = require("csv-parser");
import { useState } from "react";

export default async function handler(req: any, res: any) {
  const [fileContent, setFileContent] = useState("");

  const file = req.body;
  fs.createReadStream(file)
    .pipe(csv())
    .on("data", (row: any) => {
      setFileContent((existingContent) => existingContent + row);
    });

  res.json({ fileContent });
}
