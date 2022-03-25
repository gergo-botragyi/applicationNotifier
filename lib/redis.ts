import { Client, Entity, Schema, Repository } from 'redis-om';

const client = new Client();

export default async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL);
    }
}