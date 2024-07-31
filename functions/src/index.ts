import {
  onDocumentCreated,
} from "firebase-functions/v2/firestore";

import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

exports.writeClientUID = onDocumentCreated(
  "profiles/{profileID}",
  async (event) => {
    const snapshot = event.data;
    if (snapshot == null) {
      console.log("No data associated with the event");
      return;
    }
    const data = snapshot.data();
    const practitionerID = data.practitionerID;
    const clientID = data.clientID;


    const docPath = `users/${practitionerID}/clients/${clientID}`;
    const client = await db.doc(docPath).get();
    const doc = client?.data();
    if (doc == null) {
      console.log("No data found for path: " + docPath);
      return;
    }
    doc.clientUID = data.id;
    await db.doc(docPath).set(doc);
  });
