// Cidade

module.exports = function (db) {
    return {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Cidade (
                id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                nome    VARCHAR(60),
                estado  CHAR(2)
            )`)
        }
    }
}