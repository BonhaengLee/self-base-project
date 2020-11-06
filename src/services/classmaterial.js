import db from "../firebaseInit";

class TutorialDataService {
  getAll() {
    return db.collection("users").get();
  }

  create(tutorial) {
    const uRef = db.collection("users").doc();
    console.log("uRef Key");
    console.log(uRef.id);

    uRef
      .set({
        ...tutorial,
        key: uRef.id,
      })
      .then(function () {
        console.log("Document successfully written!");
        return true;
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  update(key, value) {
    const kRef = db.collection("users").doc(key);
    kRef
      //.update(value)
      .set(value, { merge: true })
      .then(() => {
        console.log("Document updated"); // Document updated
        return true;
      })
      .catch((error) => {
        console.error("Error updating doc", error);
      });
  }

  delete(key) {
    db.collection("users")
      .doc(key)
      .delete()
      .then(() => console.log("Document deleted")) // Document deleted
      .catch((error) => console.error("Error deleting document", error));
  }

  deleteAll() {
    db.collection("users")
      .doc()
      .delete()
      .then(() => console.log("Document deleted")) // Document deleted
      .catch((error) => console.error("Error deleting document", error));
  }
}

export default new TutorialDataService();
