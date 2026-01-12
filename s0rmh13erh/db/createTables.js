import { getDBConnection } from "./db.js";


async function createCartTable() {
    const dbConn = await getDBConnection()

    try {
        await dbConn.exec(`CREATE TABLE if not exists cart_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (product_id) REFERENCES products(id));`)
    }
    catch(err) {
        console.log(`${err}: Table not created`)
    }
}

createCartTable()