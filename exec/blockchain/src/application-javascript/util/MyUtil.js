exports.getResult = function (isSuccess, rs, debug = 0) {
    if (isSuccess) {
        if (debug) console.log(`Result: ${rs}`)
        return JSON.parse(rs.toString())
    }

    if (debug) console.log(`Error: ${rs}`)
    return rs
}