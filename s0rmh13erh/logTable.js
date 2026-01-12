import { getDBConnection } from './db/db.js'

async function logTable() {
  const db = await getDBConnection()

  const tableName = 'cart_items'
  const tableName2 = 'products'
  const tableName3 = 'users'

  try {
    const table = await db.all(`SELECT * FROM ${tableName}`)
    console.table(table)
    console.log('\n')

    const table2 = await db.all(`SELECT * FROM ${tableName2}`)
    console.table(table2)
    console.log('\n')

    const table3 = await db.all(`SELECT * FROM ${tableName3}`)
    console.table(table3)

  } catch (err) {

    console.error('Error fetching table:', err.message)

  } finally {

    await db.close()

  }
}

logTable()