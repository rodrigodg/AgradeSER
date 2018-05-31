import { db } from '@/main';

class Repository {
  static getUserDocumentReference(userId) {
    return db.collection('usuario').doc(userId);
  }
}


export default Repository;
