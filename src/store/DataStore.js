import { defineStore } from 'pinia';
import { ID, Query } from 'appwrite';
import { databases } from '../appwrite';

import { Client, Databases, Account, Storage } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66cb7c35000f04176383');

const storage = new Storage(client);

export const CSIO_DATABASE_ID = "66d0b46b0010933cfb1c";

export const COURSES_ID = "66d0b472000897d31516";
export const WEBINARS_ID = "66d479080017c27da677";

export const FORMS_ID = "66d1c23c0012197cf2ec";
export const TYPES_ID = "66d1c3b0002139a82454";
export const SCHEDULES_ID = "66d1c412003b560bb9a4";

export const TEACHERS_ID = "66d497b3001d1b318f2a"

export const BUCKET_ID = "66d499ff00044379fc90";

export const useDataStore = defineStore('DataStore', {
  state: () => ({
    Курсы: [],
    ВебинарыСеминары: [],

    Преподаватели: [],
    РасписаниеПреподавателей: [],

    Фото: [],

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
        const response = await databases.createDocument(CSIO_DATABASE_ID, COURSES_ID, ID.unique(), course);
        course.id = response.$id;
        
        // Обновляем список курсов
        await this.fetchCourses();
      } catch (error) {
        console.error('Ошибка при добавлении курса:', error);
      }
    },
    
    async updateCourse(id, updatedCourse) {
      console.log(updatedCourse);
      try {
        await databases.updateDocument(CSIO_DATABASE_ID, COURSES_ID, id, updatedCourse);
        await this.fetchCourses(); // Обновляем список после редактирования
      } catch (error) {
        console.error('Ошибка при обновлении курса:', error);
      }
    }, 

    async handleCourseUpdated(updatedCourse) {
      try {
        if (!updatedCourse.$id) {
          throw new Error('ID курса отсутствует');
        }

        const id = updatedCourse.$id;
    
        // Обновляем курс в базе данных
        await this.updateCourse(id, updatedCourse);
        
        // Локальное обновление курса в списке
        const index = this.Курсы.findIndex(course => course.$id === updatedCourse.$id);
        if (index !== -1) {
          this.Курсы[index] = updatedCourse;
        }
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
    
        // Удаляем связанное расписание
        await this.deleteSchedulesByCourseTitle(title);
    
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
        const response = await databases.listDocuments(CSIO_DATABASE_ID, FORMS_ID, [
          Query.equal('title', title)
        ]);

        console.log('Forms to delete:', response.documents);

        // Удаляем каждую найденную форму
        for (const form of response.documents) {
          console.log('Deleting form with ID:', form.$id);
          await databases.deleteDocument(CSIO_DATABASE_ID, FORMS_ID, form.$id);
        }
      } catch (error) {
        console.error('Ошибка при удалении форм обучения:', error);
      }
    },

    async deleteTypesByCourseTitle(title) {
      try {
        console.log('Fetching types with course title:', title);
        const response = await databases.listDocuments(CSIO_DATABASE_ID, TYPES_ID, [
          Query.equal('title', title)
        ]);

        console.log('Types to delete:', response.documents);

        // Удаляем каждый найденный тип
        for (const type of response.documents) {
          console.log('Deleting type with ID:', type.$id);
          await databases.deleteDocument(CSIO_DATABASE_ID, TYPES_ID, type.$id);
        }
      } catch (error) {
        console.error('Ошибка при удалении типов обучения:', error);
      }
    },

    async deleteSchedulesByCourseTitle(title) {
      try {
        console.log('Fetching schedules with title:', title);
        const response = await databases.listDocuments(CSIO_DATABASE_ID, SCHEDULES_ID, [
          Query.equal('title', title)
        ]);

        console.log('Schedules to delete:', response.documents);

        // Удаляем каждое найденное расписание
        for (const schedule of response.documents) {
          console.log('Deleting schedule with ID:', schedule.$id);
          await databases.deleteDocument(CSIO_DATABASE_ID, SCHEDULES_ID, schedule.$id);
        }
      } catch (error) {
        console.error('Ошибка при удалении расписания:', error);
      }
    },

    async fetchFormsByCourse(title) {
      try {      
        // Получаем формы, связанные с курсом
        const response = await databases.listDocuments(CSIO_DATABASE_ID, FORMS_ID, [
          Query.equal('title', title),
          Query.equal('category', 'course')
        ]);
    
        console.log('Fetched forms for course:', response.documents);
        return response.documents;
      } catch (error) {
        console.error('Ошибка при получении форм по курсу:', error);
      }
    },

    async fetchFormsByWebinar(title, isWebinar) {
      try {    
        let category = '';
        if(isWebinar) {
          category = 'Вебинар';
        } else {
          category = 'Семинар';
        } 
        // Получаем формы, связанные с курсом
        const response = await databases.listDocuments(CSIO_DATABASE_ID, FORMS_ID, [
          Query.equal('title', title),
          Query.equal('category', category)
        ]);
    
        console.log('Fetched forms for course:', response.documents);
        return response.documents;
      } catch (error) {
        console.error('Ошибка при получении форм по курсу:', error);
      }
    },
    
    async fetchTypesByCourse(title) {
      try {
        // Получаем типы, связанные с курсом
        const response = await databases.listDocuments(CSIO_DATABASE_ID, TYPES_ID, [
          Query.equal('title', title),
          Query.equal('category', 'course')
        ]);
    
        console.log('Fetched types for course:', response.documents);
        return response.documents;
      } catch (error) {
        console.error('Ошибка при получении типов по курсу:', error);
      }
    },

    async fetchTypesByWebinar(title, isWebinar) {
      try {
        let category = '';
        if(isWebinar) {
          category = 'Вебинар';
        } else {
          category = 'Семинар';
        } 
        // Получаем типы, связанные с курсом
        const response = await databases.listDocuments(CSIO_DATABASE_ID, TYPES_ID, [
          Query.equal('title', title),
          Query.equal('category', category)
        ]);
    
        console.log('Fetched types for webinar:', response.documents);
        return response.documents;
      } catch (error) {
        console.error('Ошибка при получении типов по вебинару:', error);
      }
    },

    async fetchShedulesByCourse(title) {
      try {
        // Получаем расписание, связанное с курсом
        const response = await databases.listDocuments(CSIO_DATABASE_ID, SCHEDULES_ID, [
          Query.equal('title', title),
          Query.equal('category', 'course')
        ]);
    
        console.log('Fetched shedules for course:', response.documents);
        return response.documents;
      } catch (error) {
        console.error('Ошибка при получении расписания по курсу:', error);
      }
    },

    async fetchShedulesByWebinar(title, isWebinar) {
      try {
        let category = '';
        if(isWebinar) {
          category = 'Вебинар';
        } else {
          category = 'Семинар';
        } 
        // Получаем расписание, связанное с курсом
        const response = await databases.listDocuments(CSIO_DATABASE_ID, SCHEDULES_ID, [
          Query.equal('title', title),
          Query.equal('category', category)
        ]);
    
        console.log('Fetched shedules for webinar:', response.documents);
        return response.documents;
      } catch (error) {
        console.error('Ошибка при получении расписания по вебинару:', error);
      }
    },

    async fetchTeachersByWebinar(teacher) {
      try {
        const response = await databases.listDocuments(CSIO_DATABASE_ID, TEACHERS_ID, [
          Query.equal('name', teacher),
        ]);
        
        return response.documents;
      } catch (error) {
        console.error('Ошибка при получении преподавателей вебинара:', error);
      }
    },
    

    // Добавляем форму обучения
    async addFormOfCourse(form) {
      try {
        await databases.createDocument(CSIO_DATABASE_ID, FORMS_ID, ID.unique(), form);
      } catch (error) {
        console.error('Ошибка при добавлении формы обучения:', error);
      }
    },

    // Добавляем тип обучения
    async addTypeOfCourse(type) {
      try {
        await databases.createDocument(CSIO_DATABASE_ID, TYPES_ID, ID.unique(), type);
      } catch (error) {
        console.error('Ошибка при добавлении типа обучения:', error);
      }
    },

    async fetchShedulesOfTeacher(teacherName) {
      try {
        // Запрашиваем расписание для указанного преподавателя
        const response = await databases.listDocuments(CSIO_DATABASE_ID, SCHEDULES_ID, [
          Query.equal('teachers', teacherName)
        ]);
    
        console.log('Fetched schedules for teacher:', response.documents);
    
        this.РасписаниеПреподавателей = response.documents;
    
        return response.documents;
      } catch (error) {
        console.error('Ошибка при получении расписания для преподавателя:', error);
        return [];
      }
    },

    // Добавляем расписание
    async addSchedule(schedule) {
      try {
        await databases.createDocument(CSIO_DATABASE_ID, SCHEDULES_ID, ID.unique(), schedule);
      } catch (error) {
        console.error('Ошибка при добавлении расписания:', error);
      }
    },

    // Обновляем форму обучения
    async updateFormOfCourse(id, updatedForm) {
      try {
        await databases.updateDocument(CSIO_DATABASE_ID, FORMS_ID, id, updatedForm);
      } catch (error) {
        console.error('Ошибка при обновлении формы обучения:', error);
      }
    },

    // Удаляем форму обучения
    async deleteFormOfCourse(id) {
      try {
        await databases.deleteDocument(CSIO_DATABASE_ID, FORMS_ID, id);
      } catch (error) {
        console.error('Ошибка при удалении формы обучения:', error);
      }
    },

    // Обновляем тип обучения
    async updateTypeOfCourse(id, updatedType) {
      try {
        await databases.updateDocument(CSIO_DATABASE_ID, TYPES_ID, id, updatedType);
      } catch (error) {
        console.error('Ошибка при обновлении типа обучения:', error);
      }
    },

    // Удаляем тип обучения
    async deleteTypeOfCourse(id) {
      try {
        await databases.deleteDocument(CSIO_DATABASE_ID, TYPES_ID, id);
      } catch (error) {
        console.error('Ошибка при удалении типа обучения:', error);
      }
    },

    async fetchWebinars() {
        try {
          const response = await databases.listDocuments(CSIO_DATABASE_ID, WEBINARS_ID);
          console.log('Fetched webinars:', response.documents);
          this.ВебинарыСеминары = response.documents;
        } catch (error) {
          console.error('Ошибка при получении вебинаров:', error);
        }
      },
      
      async addWebinar(webinar) {
        try {
          await databases.createDocument(CSIO_DATABASE_ID, WEBINARS_ID, ID.unique(), webinar);
          await this.fetchWebinars(); // Обновляем список после добавления
        } catch (error) {
          console.error('Ошибка при добавлении вебинаров:', error);
        }
      },
      
      async updateWebinar(id, updatedWebinar) {
        try {
          await databases.updateDocument(CSIO_DATABASE_ID, WEBINARS_ID, id, updatedWebinar);
          await this.fetchWebinars(); // Обновляем список после редактирования
        } catch (error) {
          console.error('Ошибка при обновлении вебинара:', error);
        }
      },
      
      async deleteWebinar(id) {
        try {
          // Получаем курс для удаления
          const webinar = await databases.getDocument(CSIO_DATABASE_ID, WEBINARS_ID, id);
          const title = webinar.title;
      
          console.log('Deleting webinar with title:', title);
      
          // Удаляем связанные формы обучения
          await this.deleteFormsByCourseTitle(title);
      
          // Удаляем связанные типы обучения
          await this.deleteTypesByCourseTitle(title);
      
          // Удаляем связанное расписание
          await this.deleteSchedulesByCourseTitle(title);
      
          // Удаляем курс
          await databases.deleteDocument(CSIO_DATABASE_ID, WEBINARS_ID, id);
      
          await this.fetchWebinars(); // Обновляем список после удаления
        } catch (error) {
          console.error('Ошибка при удалении вебинара:', error);
        }
      },

      async fetchTeachers() {
        try {
          const response = await databases.listDocuments(CSIO_DATABASE_ID, TEACHERS_ID);
          console.log('Fetched teachers:', response.documents);
          this.Преподаватели = response.documents;
        } catch (error) {
          console.error('Ошибка при получении преподавателей:', error);
        }
      },
      
      async addTeacher(teacher) {
        try {
          const response = await databases.createDocument(CSIO_DATABASE_ID, TEACHERS_ID, ID.unique(), teacher);
          teacher.id = response.$id;
          await this.fetchTeachers(); // Обновляем список преподавателей после добавления
        } catch (error) {
          console.error('Ошибка при добавлении преподавателя:', error);
        }
      },
      
      async updateTeacher(id, updatedTeacher) {
        try {
          await databases.updateDocument(CSIO_DATABASE_ID, TEACHERS_ID, id, updatedTeacher);
          await this.fetchTeachers(); // Обновляем список после редактирования
        } catch (error) {
          console.error('Ошибка при обновлении преподавателя:', error);
        }
      },
      
      async uploadAndLinkImage(teacherId, imageFile) {
        try {
          const imageId = await uploadImage(imageFile);
          const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${imageId}/view?project=66cb7c35000f04176383&mode=admin`;
  
          // Обновляем документ преподавателя с URL изображения
          await this.updateTeacher(teacherId, { photoUrl: imageUrl });
        } catch (error) {
          console.error('Ошибка при загрузке и привязке изображения:', error);
        }
      },

      async uploadImage(imageFile) {
        try {
          const result = await storage.createFile(BUCKET_ID, 'unique()', imageFile);
          return result.$id; // Возвращаем fileId
        } catch (error) {
          console.error('Ошибка при загрузке изображения:', error);
          throw error;
        }
      },
  
      async getImageUrl(fileId) {
        return `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=66cb7c35000f04176383&project=66cb7c35000f04176383&mode=admin`;
      },
  
      // Получение всех изображений и их сохранение в state
      async fetchAllImages() {
        try {
          const response = await storage.listFiles(BUCKET_ID);
  
          this.Фото = response.files.map(file => ({
            name: file.name,
            url: this.getImageUrl(file.$id),
          }));
  
          console.log('Fetched images:', this.Фото);
        } catch (error) {
          console.error('Ошибка при получении изображений:', error);
        }
      },
  
      async fetchTeachers() {
        try {
          const response = await databases.listDocuments(CSIO_DATABASE_ID, TEACHERS_ID);
          console.log('Fetched teachers:', response.documents);
          this.Преподаватели = response.documents;
        } catch (error) {
          console.error('Ошибка при получении преподавателей:', error);
        }
      },
    },
});
