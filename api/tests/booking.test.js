let bookingId
let token

const BASE_URL = 'https://restful-booker.herokuapp.com'

/**
 * CREATE TOKEN
 * Runs once before all tests
 */
beforeAll(async () => {
  const response = await fetch(`${BASE_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'password123'
    })
  })

  const body = await response.json()
  token = body.token
})

/**
 * CREATE BOOKING
 */
test('should create a booking', async () => {
  const response = await fetch(`${BASE_URL}/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      firstname: 'Helena',
      lastname: 'QA',
      totalprice: 150,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-01-01',
        checkout: '2024-01-10'
      },
      additionalneeds: 'Breakfast'
    })
  })

  const body = await response.json()

  // STATUS
  expect(response.status).toBe(200)

  // HEADERS
  expect(response.headers.get('content-type'))
    .toContain('application/json')

  // BODY
  expect(body).toHaveProperty('bookingid')

  bookingId = body.bookingid
})

/**
 * GET BOOKING BY ID
 */
test('should get booking by id', async () => {
  const response = await fetch(
    `${BASE_URL}/booking/${bookingId}`,
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }
  )

  const body = await response.json()

  expect(response.status).toBe(200)

  // HEADERS
  expect(response.headers.get('content-type'))
    .toContain('application/json')

  // BODY
  expect(body).toHaveProperty('firstname')
  expect(body.firstname).toBe('Helena')
})

/**
 * UPDATE BOOKING
 */
test('should update booking', async () => {
  const response = await fetch(
    `${BASE_URL}/booking/${bookingId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      body: JSON.stringify({
        firstname: 'Updated',
        lastname: 'User',
        totalprice: 200,
        depositpaid: false,
        bookingdates: {
          checkin: '2024-02-01',
          checkout: '2024-02-05'
        },
        additionalneeds: 'Lunch'
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
  expect(body.firstname).toBe('Updated')
})

/**
 * DELETE BOOKING
 */
test('should delete booking', async () => {
  const response = await fetch(
    `${BASE_URL}/booking/${bookingId}`,
    {
      method: 'DELETE',
      headers: {
        'Cookie': `token=${token}`
      }
    }
  )

  // STATUS
  expect(response.status).toBe(201)

  // HEADERS
  expect(response.headers.get('content-type'))
    .toContain('text/plain')
})
