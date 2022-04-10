import { Client, Entity, Schema } from "redis-om";
const client = new Client();

let connected = false;

export default async function connect() {
  if (!connected) {
    connected = true;
    await client.open(process.env.REDIS_URL);
  }
}

class Student extends Entity {}
let schema = new Schema(
  Student,
  {
    id: { type: "string" },
    name: { type: "string" },

    pointsA: { type: "string" },
    notA: { type: "string" },

    pointsB: { type: "string" },
    notB: { type: "string" },

    pointsC: { type: "string" },
    notC: { type: "string" },

    pointsD: { type: "string" },
    notD: { type: "string" },

    pointsE: { type: "string" },
    notE: { type: "string" },

    pointsF: { type: "string" },
    notF: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function defineStudent(data: any) {
  await connect();

  const repository = client.fetchRepository(schema);

  const student = repository.createEntity(data);

  const id = await repository.save(student);
  return id;
}

export async function createIndex() {
  await connect();

  const repository = client.fetchRepository(schema);
  await repository.createIndex();
}

export async function searchStudent(q: any) {
  await connect();

  const repository = client.fetchRepository(schema);

  const student = (
    await repository.search().where("id").eq(q).return.all()
  ).map((x) => x.entityData);
  return student;
}

export async function checkP(q: any) {
  await connect();

  const repository = client.fetchRepository(schema);

  const p = await repository.search().where("id").eq(q).return.first();

  if (!p) {
    return undefined;
  }
  return "checked";
}

export async function updateStudent(data: any) {
  await connect();

  const repository = client.fetchRepository(schema);

  const student = await repository
    .search()
    .where("id")
    .eq(data.id)
    .return.first();
  if (!student) {
    return undefined;
  }

  for (const key in data) {
    student.entityData[key] = data[key];
  }

  const id = await repository.save(student);
  return id;
}
