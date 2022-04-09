import { Client, Entity, Schema, Repository } from "redis-om";

const client = new Client();

export default async function connect() {
  if (!client.isOpen()) {
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
  if (!client.isOpen()) {
    await connect();
  }

  const repository = client.fetchRepository(schema);

  const student = repository.createEntity(data);

  const id = await repository.save(student);
  return id;
}

export async function createIndex() {
  if (!client.isOpen()) {
    await connect();
  }

  const repository = client.fetchRepository(schema);
  await repository.createIndex();
}

export async function searchStudent(q: any) {
  if (!client.isOpen()) {
    await connect();
  }

  const repository = client.fetchRepository(schema);

  const student = (
    await repository.search().where("id").eq(q).return.all()
  ).map((x) => x.entityData);

  return student;
}

export async function checkP(q: any) {
  if (!client.isOpen()) {
    await connect();
  }

  const repository = client.fetchRepository(schema);

  const p = await repository.search().where("id").eq(q).return.first();

  if (!p) {
    return undefined;
  }

  return "checked";
}

export async function updateStudent(data: any) {
  if (!client.isOpen()) {
    await connect();
  }

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
