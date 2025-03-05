const routes = {
  public: {
    home: "/",
    login: '/login',
    register: '/register',
  },
  user: {
    budget: '/user/budget',
    budgetDetail: '/user/budget/:id',
    category: '/user/category',
    // transaction: '/user/transaction',
    // report: '/user/report',
    // alert: '/user/alert',
    chat: '/user/chat',
    analysis: '/user/analysis',
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