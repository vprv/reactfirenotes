const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

exports.getUser = functions.https.onCall(async (data, context) => {
  if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'};

  const email = context.auth.token.email;
  return new Promise((resolve, reject) => {
    db.collection("users").where("email", "==", email).get()
      .then(snapshot => {
        if (snapshot.empty) return resolve(null);

        return resolve({user: snapshot.docs[0].data()});
      })
      .catch(error => reject(error))
  });
});

exports.changeUserProfile = functions.https.onCall(async (data, context) => {
  if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'};

  const email = context.auth.token.email;

  return db.collection("users").where("email", "==", email)
    .get()
    .then(querySnapshot => {
      return querySnapshot.forEach(doc => {
        return db.collection("users").doc(doc.id).update(data);
      });
    }).catch(error => console.log(error));
});

exports.addNote = functions.https.onCall(async (data, context) => {
  if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'};

  return db.collection('notes').add({
    author: context.auth.token.email,
    text: data,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }).catch(function (error) {
    console.error('Error writing new note to Firebase Database', error);
  });
});

exports.getNotes = functions.https.onCall((data, context) => {
  if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'};

  const email = context.auth.token.email;
  return new Promise((resolve, reject) => {
    db.collection("notes").where("author", "==", email).get()
      .then(snapshot => {
        if (snapshot.empty) return resolve(null);

        const notes = [];
        snapshot.forEach(doc => {
          notes.push(doc.data().text);
        });
        return resolve(notes)
      })
      .catch(error => reject(error))
  });
});


exports.userCreate = functions.auth.user().onCreate(async (user) => {
  const fullName = user.displayName || 'Anonymous';

  await admin.firestore().collection('users').add({
    displayName: fullName,
    photoUrl: null,
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
});


exports.sendFile = functions.https.onCall((data, context) => {
  if (!context.auth) return {status: 'error', code: 401, message: 'Not signed in'};

  return data;
});
