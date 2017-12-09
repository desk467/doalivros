// Contato

module.exports = function (db) {
    return {
        montar: function () {
            db.run(`CREATE TABLE IF NOT EXISTS Contato (
                id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                tipo    INTEGER NOT NULL,
                valor   VARCHAR(16)
            )`)
        }
    }
}