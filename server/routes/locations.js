import express from 'express'
import { getAllLocations, getLocationById } from '../controllers/LocationsController.js'

const router = express.Router()

router.get('/', getAllLocations)
router.get('/:id', getLocationById)

export default router