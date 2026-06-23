import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
import { getLocationById } from '../services/LocationsAPI'
import { getEventsByLocation } from '../services/EventsAPI'

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])
    
    useEffect(() => {
  const fetchData = async () => {
    const locationData = await getLocationById(index)
    const eventsData = await getEventsByLocation(index)
    setLocation(locationData)
    setEvents(eventsData)
  }
  fetchData()
}, [index])

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image_url} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
  key={event.id}
  id={event.id}
  name={event.name}
  description={event.description}
  event_date={event.event_date}
  image_url={event.image_url}
/>
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents