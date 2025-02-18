const routes = {
  public: {
    home: "/",
    login: '/login',
    register: '/register',
  },
  user: {
    budget: '/user/budget',
    category: '/user/category',
    transaction: '/user/transaction',
    report: '/user/report',
    alert: '/user/alert',
    userAccount: '/admin/user-account',
  },
  admin: {
    systemCategory: '/admin/systemCategory',
    dashboard: '/admin/dashboard',
    account: '/admin/account',
  },
  api: {
    loginGoogle: "/auth/signin",
  },
};

export default routes;