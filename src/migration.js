export const tableUpgrade = (dbObject) => {
    console.log("upgrade");
    const objectStore = dbObject.createObjectStore("person-data", {
        keyPath: "name",
    });
    objectStore.createIndex("age", "age", { unique: false });
    objectStore.createIndex("rating", "rating", { unique: false });
    objectStore.createIndex("combined", ["age", "rating"], { unique: false });
};
