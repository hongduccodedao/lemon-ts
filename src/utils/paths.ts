interface IPaths {
  HOME: string;
  LOGIN: string;
  REGISTER: string;
  FORGOT_PASSWORD: string;
  CREATE: string;
  SETTING: string;
  VERIFY_ACCOUNT: string;
  VERIFY_FORGOT_PASSWORD: string;
  CHANGE_PASSWORD: string;
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
  VERIFY_ACCOUNT: "/verify-account",
  VERIFY_FORGOT_PASSWORD: "/verify-forgot-password",
  CHANGE_PASSWORD: "/change-password",
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
