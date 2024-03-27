export interface User {
  id: number;
  email: string;
  password: string;
  roles: UserRoleItem[];
}

export interface IsAuth {
  isAuth: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegistration {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
}

export interface UserRoleItem {
  UserRole: UserRole;
  createdAt: Date;
  id: number;
  name: string;
  updatedAt: Date;
}

export interface UserRole {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  roleId: number;
  userId: number
}

export interface UserRegistrationData {
  email: string;
  password: string;
  fio: string;
}


