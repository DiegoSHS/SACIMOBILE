import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm'

let db
/**
 * Initializes the database
 * @returns {Promise<IDBDatabase>} the database
 */
const initdb = async () => {
    if (db){
        console.log('using cached db')
        return db
    }
    db = await openDB('notifications', 1, {
        upgrade(db, oldVersion, newVersion, transaction) {
            const notis = db.createObjectStore('notifications', {
                keyPath: 'id',
                autoIncrement: true
            })
            notis.createIndex('name', 'name')
            notis.createIndex('state', 'state')
            notis.createIndex('timestamp', 'timestamp')
            console.log('db configured')
        },
        blocked(currentVersion, blockedVersion, event) {
            // …
        },
        blocking(currentVersion, blockedVersion, event) {
            // …
        },
        terminated() {
            // …
        }
    })
    return db
}

export default initdb