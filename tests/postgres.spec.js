const {Client} = require('pg');
import test from 'ava';
const client = new Client({
    user: 'test_user',
    host: 'localhost',
    database: 'test_db',
    password: 'testpass123',
    port: 5432,
  });

test('postgres db test', async t => {
    await client.connect()
    const msg = 'Hello world!';
    const res = await client.query('SELECT $1::text as message', [msg])
    console.log(res.rows[0].message) // Hello world!
    t.is(res.rows[0].message, msg, 'it is equal')
    await client.end()
})
