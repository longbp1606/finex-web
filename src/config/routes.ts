const routes = {
  public: {
    home: "/",
    login: '/login',
    register: '/register',
  },
  user: {
    dashboard: '/user/dashboard',
    budget: '/user/budget',
    budgetDetail: '/user/budget/:id',
    saving: '/user/saving',
    savingDetail: '/user/saving/:id',
    category: '/user/category',
    advice: '/user/advice',
    analysis: '/user/analysis',
    bill: '/user/bill',
    bankAccount: '/user/bankAccount',
    feedback: '/user/feedback',
    setting: '/user/setting',
    profile: '/user/profile',
    subscription: '/user/subscription',
  },
  admin: {
    systemCategory: '/admin/systemCategory',
    dashboard: '/admin/dashboard',
    account: '/admin/account',
    subscription: '/admin/subscription',
    userSubscription: '/admin/user-subscription',
    feedback: '/admin/feedback',
  },
  error: {
    403: '/error/forbidden',
    404: '/error/notFound',
  },
  api: {
    loginGoogle: "/auth/signin",
  },
};

export default routes;