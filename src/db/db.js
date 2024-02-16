// TODO: indexedDB

// Install idb for async/await instead of native callback
// Table -> jump-rope
// Object Store -> stats (id: autoincrement, date: string, count: string, time: string)

// count is editable in the UI (before create)
// update is allowed only for count? i guess...
// delete is allowed

const dbName = "jump-rope-tracker";

const request = indexedDB.open(dbName);
let isDBup = false;
let database;

request.onupgradeneeded = initDB;
request.onsuccess = startDB;
request.onerror = errorHandler;


// request.onsuccess = (event) => {

//   // const db = event.target.result;
//   // console.log(db);
//   // const customerObjectStore = db.transaction("activity", "readwrite").objectStore("activity");
//   // console.log(customerObjectStore)
//   // const putRequest = customerObjectStore.put({ date: "16/02/2024", count: 1000, time: "20:00" }, 1);
//   // console.log(putRequest)
//   // putRequest.onsuccess = (event) => {
//   //   // Get the old value that we want to update
//   //   const data = event.target.result;

//   //   console.log("DATA ", data);
//   // }

//   // putRequest.onerror = () => {
//   //   console.log("edrradasdasd")
//   // }


// const customerObjectStore = db.transaction("activity", "readwrite").objectStore("activity");

//     [{ date: "16/02/2024", count: 2000, time: "20:00" }].forEach((aList) => {
//       customerObjectStore.add(aList);
//     })

//     // customerObjectStore.put
// }


function initDB(event) {
  const db = event.target.result;

  const activityStore = db.createObjectStore("activity", { autoIncrement: true })

  activityStore.transaction.oncomplete = (event) => {
    console.log("Db is created and created a object store")
  }

  activityStore.transaction.onerror = (event) => {
    console.error("Oops, something went wrong while creating object store", event)
  }
}

async function startDB(event) {
  isDBup = true;
  database = event.target.result;
  const result = await insertRecord({ count: 2000, time: "20:20:12" })
  console.log(result);

  const all = await getAll();
  console.log(all);
}

function errorHandler(event) {
  console.log("Oops, something went wrong!")
}

function insertRecord(data) {
  return new Promise((resolve, reject) => {
    if (!isDBup) {
      console.log("DB is not Up")
      reject("DB is not Up")
    }

    const activityStore = database.transaction("activity", "readwrite").objectStore("activity");
    const request = activityStore.add(data);

    request.onsuccess = (event) => {
      const addedRecord = { ...data, id: event.target.result }
      resolve(addedRecord);
    }

    request.onerror = (event) => {
      console.log("Error Adding Record: ", event.target.error);
      reject(event.target.error);
    }

  })
}

function getAll() {
  return new Promise((resolve, reject) => {
    if(!isDBup) {
      console.log("DB is not Up")
      reject("DB is not Up")
    }

    const activityStore = database.transaction("activity", "readwrite").objectStore("activity");
    const request = activityStore.getAll();

    request.onsuccess = (event) => {
      const allRecord = event.target.result
      resolve(allRecord);
    }

    request.onerror = (event) => {
      console.log("Error Adding Record: ", event.target.error);
      reject(event.target.error);
    }

  })
}

function updateRecord(data) {

}

function deleteRecord() {

}