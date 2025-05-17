import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebaseApp from "../config/firebase-config";

export const uploadFileToFirebaseAndReturnUrl = async (file: File) => {
  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage, `images/${file.name}`);

  try {
    const res = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(res.ref);
    console.log("File uploaded successfully, URL:", url);
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const deleteFileFromFirebase = async (fileUrl: string) => {
  const storage = getStorage(firebaseApp);
  const fileRef = ref(storage, fileUrl);

  try {
    await deleteObject(fileRef);
    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
