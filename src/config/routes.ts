const routes = {
  public: {
    home: "/",
  },
  user: {
    dashboard: '/user/dashboard',
    analysis: '/user/analysis',
    record: '/user/record',
    board: '/user/board',
    boardDetails: '/user/board/:id',
    category: '/user/category',
  },
  admin: {
    systemCategory: '/admin/system-category',
    userAccount: '/admin/user-account',
  },
  api: {
    loginGoogle: "/auth/signin",
  },
};

export default routes;