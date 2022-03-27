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
    class: { type: "string" },
    points: { type: "string" },
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
