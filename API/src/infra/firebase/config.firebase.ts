import * as admin from 'firebase-admin';
import * as serviceAccount from '../../../credentials/firebase.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: "https://handtalk-3d5ac-default-rtdb.firebaseio.com"
});

export const db = admin.database();
export const auth = admin.auth();
