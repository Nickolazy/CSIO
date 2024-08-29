import { defineStore } from 'pinia';

import { ID, Query } from 'appwrite';
import { databases } from '../appwrite';
import { reactive } from 'vue';

export const CSIO_DATABASE_ID = "66d0b46b0010933cfb1c";
export const COURSES_COLLECTION_ID = "66d0b472000897d31516";

export const useDataStore = defineStore('DataStore', {
  state: () => ({
    Курсы: [],
  }),
  actions: {
    async fetchCourses() {
      try {
        const response = await databases.listDocuments(CSIO_DATABASE_ID, COURSES_COLLECTION_ID);
        console.log('Fetched courses:', response.documents); // Вывод данных в консоль
        this.Курсы = response.documents;
      } catch (error) {
        console.error('Ошибка при получении курсов:', error);
      }
    },
    async addCourse(course) {
      try {
        await databases.createDocument(CSIO_DATABASE_ID, COURSES_COLLECTION_ID, ID.unique(), course);
        await this.fetchCourses(); // Обновляем список после добавления
      } catch (error) {
        console.error('Ошибка при добавлении курса:', error);
      }
    },
    async updateCourse(id, updatedCourse) {
      try {
        await databases.updateDocument(CSIO_DATABASE_ID, COURSES_COLLECTION_ID, id, updatedCourse);
        await this.fetchCourses(); // Обновляем список после редактирования
      } catch (error) {
        console.error('Ошибка при обновлении курса:', error);
      }
    },
    async deleteCourse(id) {
      try {
        await databases.deleteDocument(CSIO_DATABASE_ID, COURSES_COLLECTION_ID, id);
        await this.fetchCourses(); // Обновляем список после удаления
      } catch (error) {
        console.error('Ошибка при удалении курса:', error);
      }
    },
  },
});
