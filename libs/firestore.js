const Firestore = require('@google-cloud/firestore');
const path = require('path');
const config = require('../config');

class FirestoreClient {
  constructor() {
    this.firestore = new Firestore({
      projectId: config.firestore.project_id,
      keyFilename: path.join(__dirname, '../config/service-account.json')
    })
  }

  save(collection, data) {
    const docRef = this.firestore.collection(collection).doc();;
    return docRef.set(data);
  }

  async getDocsByDates(collection, startTime, endTime) {
    let collectionRef = this.firestore.collection(collection);
    collectionRef = collectionRef.where('start_time', '>=', startTime);
    collectionRef = collectionRef.where('start_time', '<=', endTime);
    const response = await collectionRef.orderBy('start_time', 'asc').get();
    return response;
  }

}

module.exports = new FirestoreClient();