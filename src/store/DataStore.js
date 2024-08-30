import { defineStore } from 'pinia';
import { ID, Query } from 'appwrite';
import { databases } from '../appwrite';

export const CSIO_DATABASE_ID = "66d0b46b0010933cfb1c";
export const COURSES_ID = "66d0b472000897d31516";
export const FORMS_OF_COURSES_ID = "66d1c23c0012197cf2ec";
export const TYPE_OF_COURSES_ID = "66d1c3b0002139a82454";
export const SCHEDULE_OF_COURSES_ID = "66d1c412003b560bb9a4";

export const useDataStore = defineStore('DataStore', {
  state: () => ({
    Курсы: [],
    Вебинары: [],
    Семинары: [],
    Преподаватели: [],
    Акции: [],
    Новости: [],
    События: [],
  }),
  actions: {
    async fetchCourses() {
      try {
        const response = await databases.listDocuments(CSIO_DATABASE_ID, COURSES_ID);
        console.log('Fetched courses:', response.documents);
        this.Курсы = response.documents;
      } catch (error) {
        console.error('Ошибка при получении курсов:', error);
      }
    },
    
    async addCourse(course) {
      try {
        await databases.createDocument(CSIO_DATABASE_ID, COURSES_ID, ID.unique(), course);
        await this.fetchCourses(); // Обновляем список после добавления
      } catch (error) {
        console.error('Ошибка при добавлении курса:', error);
      }
    },
    
    async updateCourse(id, updatedCourse) {
      try {
        await databases.updateDocument(CSIO_DATABASE_ID, COURSES_ID, id, updatedCourse);
        await this.fetchCourses(); // Обновляем список после редактирования
      } catch (error) {
        console.error('Ошибка при обновлении курса:', error);
      }
    },
    
    async deleteCourse(id) {
      try {
        // Получаем курс для удаления
        const course = await databases.getDocument(CSIO_DATABASE_ID, COURSES_ID, id);
        const title = course.title;
    
        console.log('Deleting course with title:', title);
    
        // Удаляем связанные формы обучения
        await this.deleteFormsByCourseTitle(title);
    
        // Удаляем связанные типы обучения
        await this.deleteTypesByCourseTitle(title);
    
        // Удаляем курс
        await databases.deleteDocument(CSIO_DATABASE_ID, COURSES_ID, id);
    
        await this.fetchCourses(); // Обновляем список после удаления
      } catch (error) {
        console.error('Ошибка при удалении курса:', error);
      }
    },    

    async deleteFormsByCourseTitle(title) {
      try {
        console.log('Fetching forms with title:', title);
        const response = await databases.listDocuments(CSIO_DATABASE_ID, FORMS_OF_COURSES_ID, [
          Query.equal('title', title)
        ]);

        console.log('Forms to delete:', response.documents);

        // Удаляем каждую найденную форму
        for (const form of response.documents) {
          console.log('Deleting form with ID:', form.$id);
          await databases.deleteDocument(CSIO_DATABASE_ID, FORMS_OF_COURSES_ID, form.$id);
        }
      } catch (error) {
        console.error('Ошибка при удалении форм обучения:', error);
      }
    },

    async deleteTypesByCourseTitle(title) {
      try {
        console.log('Fetching types with course title:', title);
        const response = await databases.listDocuments(CSIO_DATABASE_ID, TYPE_OF_COURSES_ID, [
          Query.equal('title', title)
        ]);

        console.log('Types to delete:', response.documents);

        // Удаляем каждый найденный тип
        for (const type of response.documents) {
          console.log('Deleting type with ID:', type.$id);
          await databases.deleteDocument(CSIO_DATABASE_ID, TYPE_OF_COURSES_ID, type.$id);
        }
      } catch (error) {
        console.error('Ошибка при удалении типов обучения:', error);
      }
    },

    // Добавляем форму обучения
    async addFormOfCourse(form) {
      try {
        await databases.createDocument(CSIO_DATABASE_ID, FORMS_OF_COURSES_ID, ID.unique(), form);
      } catch (error) {
        console.error('Ошибка при добавлении формы обучения:', error);
      }
    },

    // Добавляем тип обучения
    async addTypeOfCourse(type) {
      try {
        await databases.createDocument(CSIO_DATABASE_ID, TYPE_OF_COURSES_ID, ID.unique(), type);
      } catch (error) {
        console.error('Ошибка при добавлении типа обучения:', error);
      }
    },

    // Обновляем форму обучения
    async updateFormOfCourse(id, updatedForm) {
      try {
        await databases.updateDocument(CSIO_DATABASE_ID, FORMS_OF_COURSES_ID, id, updatedForm);
      } catch (error) {
        console.error('Ошибка при обновлении формы обучения:', error);
      }
    },

    // Удаляем форму обучения
    async deleteFormOfCourse(id) {
      try {
        await databases.deleteDocument(CSIO_DATABASE_ID, FORMS_OF_COURSES_ID, id);
      } catch (error) {
        console.error('Ошибка при удалении формы обучения:', error);
      }
    },

    // Обновляем тип обучения
    async updateTypeOfCourse(id, updatedType) {
      try {
        await databases.updateDocument(CSIO_DATABASE_ID, TYPE_OF_COURSES_ID, id, updatedType);
      } catch (error) {
        console.error('Ошибка при обновлении типа обучения:', error);
      }
    },

    // Удаляем тип обучения
    async deleteTypeOfCourse(id) {
      try {
        await databases.deleteDocument(CSIO_DATABASE_ID, TYPE_OF_COURSES_ID, id);
      } catch (error) {
        console.error('Ошибка при удалении типа обучения:', error);
      }
    }
  },
});
