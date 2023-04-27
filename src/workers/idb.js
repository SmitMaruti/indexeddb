import { openDB } from "idb";
import { tableUpgrade } from "../migration";

let db;
openDB("person", 2, {
    upgrade: tableUpgrade,
}).then((_db) => {
    db = _db;
});

addEventListener("message", (event) => {
    const { action, payload } = event.data;
    console.log("message", action, payload);
    switch (action) {
        case "SAVE":
            const tx = db.transaction(["person-data"], "readwrite");
            const store = tx.objectStore("person-data");
            store.put(payload);
            postMessage({
                action: "DATABASE_CHANGED",
            });
            break;
    }
});
