const {
    HOST,
    PORT,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD
} = process.env

if (!HOST) {
    throw new Error("ERROR: Missing environment var! -> $HOST")
}
if (!PORT) {
    throw new Error("ERROR: Missing environment var! -> $PORT")
}
if (!DB_NAME) {
    throw new Error("ERROR: Missing environment var! -> $DB_NAME")
}
if (!DB_HOST) {
    throw new Error("ERROR: Missing environment var! -> $DB_HOST")
}
if (!DB_PORT) {
    throw new Error("ERROR: Missing environment var! -> $DB_PORT")
}
if (!DB_USER) {
    throw new Error("ERROR: Missing environment var! -> $DB_USER")
}
if (!DB_PASSWORD) {
    throw new Error("ERROR: Missing environment var! -> $DB_PASSWORD")
}

export {
    HOST,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_USER,
    DB_PASSWORD
}
