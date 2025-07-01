const clean = (data) => {
    return String(data).trim().replace(/\s+/g, '')
}

module.exports = {
    clean
}