import { openDB } from "idb";
import { tableUpgrade } from "./migration";
const form = document.getElementById("form");

const idbWorker = new Worker("/dist/workers/idb.js");

let db;

const clearInput = () => {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("rating").value = "";
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value);
    const rating = parseInt(document.getElementById("rating").value);
    clearInput();
    idbWorker.postMessage({
        action: "SAVE",
        payload: {
            name,
            age,
            rating,
        },
    });
});

const display = async (respose) => {
    const result = document.getElementById("result");
    result.innerHTML = "";
    const resultHtml = respose.reduce(
        (prev, curr) =>
            prev + `<li>${curr.name} - ${curr.age} - ${curr.rating}</li>`,
        ""
    );
    result.innerHTML = resultHtml;
};

const displayAll = async () => {
    try {
        const respose = await db.getAll("person-data");
        display(respose);
    } catch (err) {
        console.log("error", err);
    }
};
openDB("person", 2, {
    upgrade: tableUpgrade,
}).then((_db) => {
    db = _db;
    displayAll();
});

idbWorker.addEventListener("message", (event) => {
    const { action } = event.data;
    switch (action) {
        case "DATABASE_CHANGED":
            displayAll();
            break;
    }
});

const btnAll = document.getElementById("btn-all");
const btnAssgined = document.getElementById("btn-assigned");
const btnClosed = document.getElementById("btn-closed");
const btnYou = document.getElementById("btn-you");
const btnUnassigned = document.getElementById("btn-unassigned");

const btnAllClickHandler = async () => {
    displayAll();
};
const btnAssginedClickHandler = async () => {
    const respose = await db.getAllFromIndex("person-data", "age", 1);
    display(respose);
};
const btnClosedClickHandler = async () => {
    const respose = await db.getAllFromIndex("person-data", "age", 2);
    display(respose);
};
const btnYouClickHandler = async () => {
    const respose = await db.getAllFromIndex("person-data", "combined", [1, 5]);
    display(respose);
};
const btnUnassignedClickHandler = async () => {
    const respose = await db.getAllFromIndex("person-data", "combined", [1, 3]);
    display(respose);
};

const btnCursorClickHandler = async () => {
    const response = await db.getAll();
};

btnAll.addEventListener("click", btnAllClickHandler);
btnAssgined.addEventListener("click", btnAssginedClickHandler);
btnClosed.addEventListener("click", btnClosedClickHandler);
btnYou.addEventListener("click", btnYouClickHandler);
btnUnassigned.addEventListener("click", btnUnassignedClickHandler);
