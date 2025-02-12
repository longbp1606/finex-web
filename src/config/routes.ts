const routes = {
  public: {
    home: "/",
    login: '/login',
    register: '/register',
  },
  user: {
    dashboard: '/user/dashboard',
    transaction: '/user/transaction',
    transactionDetails: '/user/transaction/:id',
    category: '/user/category',
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