import db from '../firebaseInit';

class ClassMaterialDataService {
  getAll() {
    return db.collection('tutorials').get();
  }

  create(material) {
    const uRef = db.collection('tutorials').doc();
    console.log('uRef Key');
    console.log(uRef.id);

    uRef
      .set({
        ...material,
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
    const kRef = db.collection('tutorials').doc(key);
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
    db.collection('tutorials')
      .doc(key)
      .delete()
      .then(() => console.log('Document deleted')) // Document deleted
      .catch((error) => console.error('Error deleting document', error));
  }

  deleteAll() {
    db.collection('tutorials')
      .doc()
      .delete()
      .then(() => console.log('Document deleted')) // Document deleted
      .catch((error) => console.error('Error deleting document', error));
  }
}

export default new ClassMaterialDataService();
