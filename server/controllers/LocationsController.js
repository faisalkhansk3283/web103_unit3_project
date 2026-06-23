import { pool } from '../config/database.js'

const getAllLocations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM locations')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getLocationById = async (req, res) => {
  try {
    const { id } = req.params                          // grab id from the URL
    const result = await pool.query(
      'SELECT * FROM locations WHERE id = $1',
      [id]                                             // $1 gets replaced by id
    )
    res.json(result.rows[0])                           // [0] because only one row expected
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export { getAllLocations, getLocationById }