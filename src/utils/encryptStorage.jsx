import { EncryptStorage } from "encrypt-storage";

const encryptStorage = new EncryptStorage("aB1!cD2@eF3#gH4"); // Pastikan Anda memiliki kunci yang valid
const token_auth = "token_auth";
const username_auth = "username_auth"; // Definisikan username_auth jika Anda belum melakukannya

export const authStorage = {
    async storeToken(token) {
        try {
            await encryptStorage.setItem(token_auth, token); // Pastikan untuk menunggu metode setItem
        } catch (error) {
            throw error;
        }
    },
    async retrieveToken() {
        try {
            const token = await encryptStorage.getItem(token_auth);
            return token;
        } catch (error) {
            throw error;
        }
    },
    async removeToken() {
        try {
            await encryptStorage.removeItem(token_auth); // Pastikan untuk menunggu metode removeItem
        } catch (error) {
            throw error;
        }
    },
    async storeUsername(username) {
        try {
            await encryptStorage.setItem(username_auth, username); // Pastikan untuk menunggu metode setItem
        } catch (error) {
            throw error;
        }
    },
    async retrieveUsername() {
        try {
            const username = await encryptStorage.getItem(username_auth);
            return username;
        } catch (error) {
            throw error;
        }
    },
    async removeUsername() {
        try {
            await encryptStorage.removeItem(username_auth); // Pastikan untuk menunggu metode removeItem
        } catch (error) {
            throw error;
        }
    },
};
