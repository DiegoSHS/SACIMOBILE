import initdb from "./db.js"

export const addNoti = async (noti) => {
    const db = await initdb()
    const tx = db.transaction('notifications', 'readwrite')
    const store = tx.objectStore('notifications')
    const result = await store.add(noti)
    return result
}

export const getNotis = async () => {
    const db = await initdb()
    const tx = db.transaction('notifications', 'readonly')
    const store = tx.objectStore('notifications')
    const result = await store.getAll()
    return result
}

export const deleteNoti = async (id) => {
    const db = await initdb()
    const tx = db.transaction('notifications', 'readwrite')
    const store = tx.objectStore('notifications')
    const result = await store.delete(id)
    return result
}

export const deleteAllNotis = async () => {
    const db = await initdb()
    const tx = db.transaction('notifications', 'readwrite')
    const store = tx.objectStore('notifications')
    const result = await store.clear()
    return result
}