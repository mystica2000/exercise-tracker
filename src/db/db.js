// Object Store -> stats (id: autoincrement, date: string, count: string, time: string)

const dbName = "jump-rope-tracker";

export const initDB = async () => {
  return new Promise((resolve, reject) => {
    // Open DB
    const request = indexedDB.open(dbName);

    // if user is first time user or if version is changed then onupgradeneeded will be executed
    request.onupgradeneeded = (event) => {
      let db = request.result;

      console.log("First Time User - DB is initializing...");

      const activityStore = db.createObjectStore("activity", {
        autoIncrement: true,
      });

      activityStore.transaction.oncomplete = (event) => {
        console.log("created a object store");
        resolve(db);
      };

      activityStore.transaction.onerror = (event) => {
        console.error(
          "Oops, something went wrong while creating object store",
          event
        );
        reject(event);
      };
    };

    request.onsuccess = (event) => {
      resolve(request.result);
    };

    request.onerror = (error) => {
      console.log("DB Connection failed : ", error);
      reject();
    };
  });
};

export const withDbOperation = (db, operation, data) => {
  return new Promise((resolve, reject) => {
    const handleOperation = (db) => {
        switch (operation) {
          case "insert":
            insertRecord(db, data).then(resolve).catch(reject);
            break;
          case "update":
            updateRecord(db, data).then(resolve).catch(reject);
            break;
          case "delete":
            deleteRecord(db,data).then(resolve).catch(reject);
            break;
          case "getAll":
            getAll(db).then(resolve).catch(reject);
            break;
          default:
            reject(new Error(`Unsupported operation: ${operation}`));
        }
    };

    if (!db) {
      initDB()
        .then((initializedDB) => {
          handleOperation(initializedDB);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      handleOperation(db);
    }
  });
};

const insertRecord = async (db, data) => {
  return new Promise((resolve, reject) => {

    const transaction = db.transaction("activity", "readwrite");
    const activityStore = transaction.objectStore("activity");
    const request = activityStore.add(data);

    request.onsuccess = (event) => {
      const addedRecord = { ...data, id: event.target.result };
       console.log(addedRecord)
      // Now you can use the key to update the data
      var updateRequest = activityStore.put({...data, id: addedRecord.id }, addedRecord.id);

      updateRequest.onsuccess = function() {
        resolve(addedRecord);
      };

      updateRequest.onerror = function(event) {
        console.error("Update failed:", event.target.error);
      };

    };

    request.onerror = (event) => {
      console.log("Error Adding Record: ", event.target.error);
      reject(event.target.error);
    };
  });
};

const getAll = async (db) => {
  return new Promise(async (resolve, reject) => {

    const transaction = db.transaction("activity", "readwrite");
    const activityStore = transaction.objectStore("activity");

    const request = activityStore.getAll();

    request.onsuccess = (event) => {
      const allRecord = event.target.result;
      resolve(allRecord);
    };

    request.onerror = (event) => {
      console.log("Error Getting Record: ", event.target.error);
      reject(event.target.error);
    };
  });
};

const updateRecord = (db, data) => {
  return new Promise((resolve, reject) => {

    const transaction = db.transaction("activity", "readwrite");
    const activityStore = transaction.objectStore("activity");
    const request = activityStore.put(data);

    request.onsuccess = (event) => {
      const updatedRecord = event.target.result;
      resolve(updatedRecord);
    };

    request.onerror = (event) => {
      console.log("Error Updating Record: ", event.target.error);
      reject(event.target.error);
    };
  });
};

const deleteRecord = (db, key) => {
  return new Promise(async (resolve, reject) => {

    const transaction = db.transaction("activity", "readwrite");
    const activityStore = transaction.objectStore("activity");
    const request = activityStore.delete(key);

    request.onsuccess = (event) => {
      const deleteRecord = event.target.result;
      console.log(deleteRecord);
      resolve(deleteRecord);
    };

    request.onerror = (event) => {
      console.log("Error Deleting Record: ", event.target.error);
      reject(event.target.error);
    };
  });
};

/**
 * Note: 
 * The below lines of code have to be done back to back, else transaction ends/closed
 * (https://stackoverflow.com/a/50858601)
 * TLDR; js event loop clock tick have to be same for the below
 * const transaction = db.transaction("activity", "readwrite");
 * const activityStore = transaction.objectStore("activity");
 * activityStore.delete/put/add/get
*/