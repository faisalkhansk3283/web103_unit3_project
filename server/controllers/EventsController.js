import { pool } from '../config/database.js'

const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getEventsByLocation = async (req, res) => {
  try {
    const { locationId } = req.params
    const result = await pool.query(
      'SELECT * FROM events WHERE location_id = $1',
      [locationId]
    )
    res.json(result.rows)           // array — a location can have many events
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { getAllEvents, getEventsByLocation }