import { Client, Databases, Account, Storage } from 'appwrite'; // Импорт Storage

export const BUCKET_ID = "66d499ff00044379fc90";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Замените на ваш endpoint
  .setProject('66cb7c35000f04176383'); // Замените на ваш project ID

export const storage = new Storage(client); // Инициализация Storage

export const account = new Account(client);
export const databases = new Databases(client);

export async function uploadFile(file) {
  try {
    const response = await storage.createFile(BUCKET_ID, 'unique()', file); 
    console.log('File uploaded successfully:', response);
    return response.$id;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}
