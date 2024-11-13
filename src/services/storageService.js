import { EncryptStorage } from "encrypt-storage";

const encryptStorage = new EncryptStorage(import.meta.env.VITE_STORAGE_KEY, {
  storageType: "localStorage",
});

export const saveData = (key, data) => {
    try {
      encryptStorage.setItem(key, data);
      console.log(`Data berhasil disimpan dengan key: ${key}`);
    } catch (error) {
      console.error("Error menyimpan data:", error);
    }
  };