import express from 'express'
import { getAllEvents, getEventsByLocation } from '../controllers/EventsController.js'

const router = express.Router()

router.get('/', getAllEvents)
router.get('/location/:locationId', getEventsByLocation)

export default router