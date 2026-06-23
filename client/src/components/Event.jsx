import React from 'react'
import '../css/Event.css'

const Event = ({ id, name, description, event_date, image_url }) => {
  const now = new Date()
  const eventDate = new Date(event_date)
  const isPast = eventDate < now

  const diffMs = eventDate - now
  const diffDays = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60 * 24))
  const diffHours = Math.floor((Math.abs(diffMs) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  const countdown = isPast
    ? `Event passed ${diffDays}d ${diffHours}h ago`
    : `${diffDays}d ${diffHours}h remaining`

  return (
    <article className={`event-information ${isPast ? 'past-event' : ''}`}>
      <img src={image_url} />

      <div className='event-information-overlay'>
        <div className='text'>
          <h3>{name}</h3>
          <p>{description}</p>
          <p><i className="fa-regular fa-calendar fa-bounce"></i> {eventDate.toLocaleDateString()} {eventDate.toLocaleTimeString()}</p>
          <p id={`remaining-${id}`} className={isPast ? 'past' : ''}>{countdown}</p>
        </div>
      </div>
    </article>
  )
}

export default Event