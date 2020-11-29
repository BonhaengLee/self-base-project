import { firebase } from '../firebase';

const db = firebase.firestore();

class TutorialDataService {
  getAll() {
    return db.collection('classMaterials').orderBy('postedOn', 'desc').get();
  }

  create(tutorial) {
    const uRef = db.collection('classMaterials').doc();
    console.log('uRef Key');
    console.log(uRef.id);

    uRef
      .set({
        ...tutorial,
        key: uRef.id,
      })
      .then(function () {
        console.log('Document successfully written!');
        return true;
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  update(key, value) {
    const kRef = db.collection('classMaterials').doc(key);
    kRef
      //.update(value)
      .set(value, { merge: true })
      .then(() => {
        console.log('Document updated'); // Document updated
        return true;
      })
      .catch((error) => {
        console.error('Error updating doc', error);
      });
  }

  delete(key) {
    db.collection('classMaterials')
      .doc(key)
      .delete()
      .then(() => console.log('Document deleted')) // Document deleted
      .catch((error) => console.error('Error deleting document', error));
  }

  deleteAll() {
    db.collection('classMaterials')
      .doc()
      .delete()
      .then(() => console.log('Document deleted')) // Document deleted
      .catch((error) => console.error('Error deleting document', error));
  }
}

export default new TutorialDataService();
