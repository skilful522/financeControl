export const USER_KEY = 'user_financeControl';

const authService = {
  isAuthenticated: !!localStorage.getItem(USER_KEY),

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch (e) {
      localStorage.removeItem(USER_KEY);
    }
  },

  login(user) {
    this.isAuthenticated = true;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem(USER_KEY);
  },
};

export default authService;
