const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.editUser = functions.https.onRequest((request, response) => {

});


exports.userCreate = functions.auth.user().onCreate(async (user) => {
  console.log('A new user signed in for the first time.');
  const fullName = user.displayName || 'Anonymous';

  await admin.firestore().collection('users').add({
    displayName: fullName,
    photoUrl: null,
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });
  console.log('Welcome message written to database.');
});
