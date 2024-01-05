import * as SQLite from "expo-sqlite";

const saveStateDatabase = SQLite.openDatabase("saveState.db");

export default function createSaveStateDatabase() {
    saveStateDatabase.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS eventInfo (id INTEGER PRIMARY KEY AUTOINCREMENT, matchNumber INTEGER, teamNumber INTEGER, matchType TEXT)'
        );
    });
    console.log("Created Database");
}