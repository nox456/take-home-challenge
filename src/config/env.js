const {
    HOST,
    PORT
} = process.env

if (!HOST) {
    throw new Error("ERROR: Missing environment var! -> $HOST")
}
if (!PORT) {
    throw new Error("ERROR: Missing environment var! -> $PORT")
}

export {
    HOST,
    PORT
}
