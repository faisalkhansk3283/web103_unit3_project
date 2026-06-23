import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import { getAllEvents } from '../services/EventsAPI'
import { getAllLocations } from '../services/LocationsAPI'

const Events = () => {
  const [events, setEvents] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('all')

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await getAllEvents()
      const locationsData = await getAllLocations()
      setEvents(eventsData)
      setLocations(locationsData)
    }
    fetchData()
  }, [])

  const filteredEvents = selectedLocation === 'all'
    ? events
    : events.filter(event => event.location_id === parseInt(selectedLocation))

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Events</h2>

      <select
        onChange={(e) => setSelectedLocation(e.target.value)}
        style={{ marginBottom: '20px' }}
      >
        <option value='all'>All Locations</option>
        {locations.map(loc => (
          <option key={loc.id} value={loc.id}>{loc.name}</option>
        ))}
      </select>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredEvents.length > 0
          ? filteredEvents.map(event => (
              <Event
                key={event.id}
                id={event.id}
                name={event.name}
                description={event.description}
                event_date={event.event_date}
                image_url={event.image_url}
              />
            ))
          : <h3>No events found.</h3>
        }
      </div>
    </div>
  )
}

export default Events
