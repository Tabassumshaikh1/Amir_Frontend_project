import { environment } from '../environments/environment';

function createUrl(actionName: string): string {
  return `${environment.apiHost}${actionName}`;
}

export const apiResources = {
  login: createUrl('/auth/login'),
  logout: createUrl('/auth/logout'),
  register: createUrl('/auth/register'),
  verifyEmail: createUrl('/auth/verify-email'),
  updatePassword: createUrl('/auth/reset'),
  updateMyProfile: createUrl('/auth/me'),
  department: createUrl('/departments'),
  user: createUrl('/users'),
  leave: createUrl('/leaves'),
};

export enum AppMessages {
  DEFAULT_ERROR = 'An unexpected error occurred, please try again later',
  USER_ALREADY_EXISTS = 'User already exists with this contact number/email/username.',
  INVALID_CREDENTIALS = 'Invalid credentials',
}

export enum SortBy {
  ASC = 'asc',
  DESC = 'desc',
}

export enum AppDefaults {
  MIN_ALLOWED_FILE_SIZE = 2097152, // 2MB
  PAGE_COUNT = 10,
  SORT = 'createdAt',
}

export enum LocalStorageKeys {
  LOGGED_IN_USER = '_slms_loggedin_user',
  TOKEN = '_slms_token',
}

export enum UserRoles {
  ADMIN = 'ADMIN',
  HOD = 'HOD',
  STAFF = 'STAFF',
}

export enum UserStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export const allowedImageTypes: string[] = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

export enum LeaveStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}
