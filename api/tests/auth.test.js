test('should create auth token', async () => {
  const response = await fetch(
    'https://restful-booker.herokuapp.com/auth',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'password123'
      })
    }
  )

  const body = await response.json()

  // STATUS
  expect(response.status).toBe(200)

  // HEADERS
  expect(response.headers.get('content-type'))
    .toContain('application/json')

  // BODY
  expect(body).toHaveProperty('token')
})
