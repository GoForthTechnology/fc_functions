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

    await db.doc(`users/${practitionerID}/clients/${clientID}`).set({
      "clientUID": event.params.profileID,
    }, {merge: true});
  });
