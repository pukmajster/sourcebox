import Dexie, { type EntityTable } from 'dexie'

interface Profile {
  id: number
  label: string
  enabledAddonIds: string[]
  enabledShuffleIds: number[]
}

interface Shuffle {
  id: number
  label: string
  shuffledAddonIds: string[]
}

const db = new Dexie('FunkyDatabase-v6') as Dexie & {
  profiles: EntityTable<
    Profile,
    'id' // primary key "id" (for the typings only)
  >
  shuffles: EntityTable<
    Shuffle,
    'id' // primary key "id" (for the typings only)
  >
}

// Schema declaration:
db.version(1).stores({
  profiles: '++id, *enabledAddonIds, *enabledShuffleIds',
  shuffles: '++id, *shuffledAddonIds'
})

// Populate the database with default, empty profiles
db.on('populate', async () => {
  db.profiles.add({
    id: 1,
    label: 'Default',
    enabledAddonIds: [],
    enabledShuffleIds: []
  })

  db.profiles.add({
    id: 2,
    label: 'No Mods',
    enabledAddonIds: [],
    enabledShuffleIds: []
  })
})

export type { Profile, Shuffle }
export { db }
