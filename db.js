import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "exemploLista.sqlite";

const SQL_CREATE_ENTRIES = [
  `CREATE TABLE IF NOT EXISTS as (
      id INTEGER PRIMARY KEY autoincrement,
      titulo VARCHAR(255) NOT NULL,
      descricao INTEGER DEFAULT 1 NOT NULL
    )`,
];

var _db = null;

export function executeSql(query, params = []) {
  // uma função atalho para execução de SQLs
  // de apenas uma linha
  // o bom dessa função é que sempre antes de rodar a query
  // ela já ira verificar se a conexão com o banco já foi aberta
  if (!_db) {
    openDB();
  }

  return new Promise((resolve, reject) => {
    _db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, rs) => resolve(rs),
        (_, err) => reject(err)
      );
    });
  });
}

export default function openDB() {
  if (!_db) {
    _db = SQLite.openDatabase(DATABASE_NAME);

    // primeira vez que iremos abrir a conexão,
    // tentaremos criar nossas tabelas
    _db.transaction(
      tx => {
        // sendo um array de "create table" iremos
        // "girar" uma vez para cada table a ser criada
        SQL_CREATE_ENTRIES.map(query => {
          tx.executeSql(query);
        });
      },
      err => console.warn(err),
      () => console.log(`Banco iniciado`)
    );
  }

  return _db;
}



