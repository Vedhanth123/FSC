import { getDBConnection } from "./db.js";


async function seedData() {

    const dbConn = await getDBConnection()

    try {
        let query = "insert into cart_items (user_id, product_id, quantity) values (?,?,?)"
        let data = [2,3,2]

        await dbConn.run(query, data)

    }
    catch (err) {
        console.log(err)
    }
}
seedData()