import database from 'infra/database.js'

beforeAll(cleanDatabase)

async function cleanDatabase() {
  await database.query('drop schema public cascade; create schema public;')
}

test('POST to /api/v1/migrations shoud return 200', async () => {
  const res = await fetch('http://localhost:3000/api/v1/migrations', {
    method: 'POST',
  })
  expect(res.status).toBe(201)

  const responseBody = await res.json()
  expect(Array.isArray(responseBody)).toBe(true)
  expect(responseBody.length).toBeGreaterThan(0)

  const res2 = await fetch('http://localhost:3000/api/v1/migrations', {
    method: 'POST',
  })
  expect(res2.status).toBe(200)

  const responseBody2 = await res2.json()
  expect(Array.isArray(responseBody2)).toBe(true)
  expect(responseBody2.length).toBe(0)
})
