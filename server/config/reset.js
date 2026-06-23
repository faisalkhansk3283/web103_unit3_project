import dotenv from 'dotenv'
dotenv.config()
import { pool } from './database.js'

const createTables = async () => {
  // Drop in reverse order — events references locations, so events must go first
  await pool.query(`DROP TABLE IF EXISTS events`)
  await pool.query(`DROP TABLE IF EXISTS locations`)

  // Create locations table
  await pool.query(`
    CREATE TABLE locations (
      id        SERIAL PRIMARY KEY,
      name      VARCHAR(100) NOT NULL,
      address   VARCHAR(150) NOT NULL,
      city      VARCHAR(100) NOT NULL,
      state     VARCHAR(2)   NOT NULL,
      zip       VARCHAR(10)  NOT NULL,
      image_url TEXT
    )
  `)

  // Create events table — location_id links each event to a location row
  await pool.query(`
    CREATE TABLE events (
      id          SERIAL PRIMARY KEY,
      name        VARCHAR(150) NOT NULL,
      description TEXT,
      event_date  TIMESTAMP   NOT NULL,
      image_url   TEXT,
      location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
    )
  `)

  // Seed 4 locations
  await pool.query(`
    INSERT INTO locations (name, address, city, state, zip, image_url) VALUES
      ('Riverside Park',    '100 River Rd',     'Greenfield', 'CA', '94101', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'),
      ('Summit Gardens',   '250 Hilltop Ave',   'Greenfield', 'CA', '94102', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600'),
      ('Harbor Front',     '5 Marina Blvd',     'Greenfield', 'CA', '94103', 'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=600'),
      ('Oakwood Commons',  '88 Oak Street',     'Greenfield', 'CA', '94104', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600')
  `)

  // Seed events — mix of future and past dates so you can test both states
  await pool.query(`
    INSERT INTO events (name, description, event_date, image_url, location_id) VALUES
      -- Riverside Park (id=1)
      ('Morning Yoga in the Park',  'Start your day with a free yoga session on the riverside lawn.',   '2026-07-05 08:00:00', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400', 1),
      ('Jazz on the River',         'Live jazz performed by local bands. Bring a blanket and snacks.',  '2026-08-15 18:30:00', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', 1),
      ('Kite Festival',             'Annual kite flying competition for all ages.',                     '2026-09-20 11:00:00', 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400', 1),
      ('Autumn Cleanup Day',        'Volunteer event — help keep the park beautiful for fall.',         '2025-11-01 09:00:00', 'https://images.unsplash.com/photo-1542601906897-ecd6ca4e2a38?w=400', 1),

      -- Summit Gardens (id=2)
      ('Farmers Market',            'Fresh produce, artisan goods, and local food vendors.',            '2026-07-12 09:00:00', 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400', 2),
      ('Outdoor Art Exhibition',    'Local artists display paintings and sculptures among the gardens.','2026-08-03 10:00:00', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 2),
      ('Sunset Photography Walk',   'Guided walk through the gardens timed for golden hour.',           '2026-07-25 19:00:00', 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=400', 2),
      ('Spring Plant Swap',         'Bring a cutting, take a cutting. All gardeners welcome.',          '2025-04-10 10:00:00', 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', 2),

      -- Harbor Front (id=3)
      ('Boat Parade',               'Watch decorated boats parade along the harbor at dusk.',           '2026-07-04 20:00:00', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', 3),
      ('Seafood Festival',          'Sample dishes from local restaurants. Live music all day.',        '2026-08-22 12:00:00', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', 3),
      ('Kayak Race',                'Competitive kayak race from Harbor Front to Pier 7 and back.',     '2026-09-07 10:00:00', 'https://images.unsplash.com/photo-1472745433479-4556f0bbe91e?w=400', 3),
      ('Night Market',              'Food trucks, crafts, and live performances under the stars.',       '2025-10-18 17:00:00', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400', 3),

      -- Oakwood Commons (id=4)
      ('Trivia Night',              'Team trivia every month. First place wins a gift basket.',         '2026-07-18 19:00:00', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400', 4),
      ('Dog Meetup',                'Bring your pup! Socialization event for dogs and their owners.',   '2026-08-09 10:00:00', 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400', 4),
      ('Board Game Tournament',     'Classic and modern board games. All skill levels welcome.',        '2026-09-14 13:00:00', 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400', 4),
      ('Community Potluck',         'Share a dish, meet your neighbors. Plates and utensils provided.', '2025-12-07 17:00:00', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', 4)
  `)

  console.log('✅ Tables created and seeded successfully')
  pool.end()
}

createTables()