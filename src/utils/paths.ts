interface IPaths {
  HOME: string;
  LOGIN: string;
  REGISTER: string;
  FORGOT_PASSWORD: string;
  CREATE: string;
  SETTING: string;
  VERiFY_ACCOUNT: string;
  DASHBOARD: string;
}

interface IItemMenu {
  name: string;
  path: string;
}

export const paths: IPaths = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  CREATE: "/create",
  SETTING: "/setting",
  VERiFY_ACCOUNT: "/verify-account",
  DASHBOARD: "/dashboard",
};

export const itemMenu: IItemMenu[] = [
  {
    name: "Create Post",
    path: paths.CREATE,
  },
  {
    name: "Setting",
    path: paths.SETTING,
  },
  {
    name: "Dashboard",
    path: paths.DASHBOARD,
  },
];
