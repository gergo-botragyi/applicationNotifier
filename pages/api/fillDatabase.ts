import fs from "fs";
import { IncomingForm } from "formidable";
import { updateStudent, defineStudent } from "../../lib/redis";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  const data: any = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const contents = fs.readFileSync(data?.files.file.filepath, {
    encoding: "utf8",
  });
  const lines = contents.split("\r\n");

  for (let i = 0; i < lines.length; i++) {
    let lineElements = lines[i].split(",");
    let newStudent = `{
      "id":"${lineElements[0]}","name":"${lineElements[1]}",
      "pointsA":"${lineElements[2]}","notA":"${lineElements[3]}",
      "pointsB":"${lineElements[4]}","notB":"${lineElements[5]}",
      "pointsC":"${lineElements[6]}","notC":"${lineElements[7]}",
      "pointsD":"${lineElements[8]}","notD":"${lineElements[9]}",
      "pointsE":"${lineElements[10]}","notE":"${lineElements[11]}",
      "pointsF":"${lineElements[12]}","notF":"${lineElements[13]}"
    }`;
    const result = await updateStudent(JSON.parse(newStudent));
    if (result) {
      console.log(`updated student: ${result}`);
    } else {
      const define = await defineStudent(JSON.parse(newStudent));
      console.log(define);
    }
  }
  res.send("amogus");
}
