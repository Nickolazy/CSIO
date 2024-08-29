import { account } from '../appwrite';
import { reactive } from 'vue';

export const user = reactive({
  current: null,

  async init() {
    try {
      this.current = await account.get();
    } catch (e) {
      this.current = null;
      console.log("account.get() - error");
    }
  },

  async login(email, password) {
    try {
      await account.createEmailPasswordSession(email, password);
      this.current = await account.get();
    } catch (e) {
      console.error('Ошибка входа:', e);
      this.current = null;
    }
  },

  async logout() {
    try {
      await account.deleteSession('current');
      this.current = null;
    } catch (e) {
      console.error('Ошибка выхода:', e);
    }
  },
});
