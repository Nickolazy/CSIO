import { Client, Databases, Account, Storage } from 'appwrite'; // Импорт Storage

export const BUCKET_ID = "66d499ff00044379fc90";

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject('66cb7c35000f04176383'); 

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

async function fetchImage(fileId) {
  try {
    // Получаем URL для просмотра файла
    const imageUrl = storage.getFileView('YOUR_BUCKET_ID', fileId);
    
    // Возвращаем URL для использования
    return imageUrl.href;
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    throw error;
  }
}
