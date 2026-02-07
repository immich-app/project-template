import type { ThemeSetting } from '$lib/managers/theme-manager.svelte';
import { BaseEventManager } from '$lib/utils/base-event-manager.svelte';
import type { ApiKeyResponseDto, LoginResponseDto, UserAdminResponseDto } from '@server/sdk';

export type Events = {
  AppInit: [];

  AuthLogin: [LoginResponseDto];
  AuthLogout: [];
  AuthUserLoaded: [UserAdminResponseDto];

  LanguageChange: [{ name: string; code: string; rtl?: boolean }];
  ThemeChange: [ThemeSetting];

  ApiKeyCreate: [ApiKeyResponseDto];
  ApiKeyUpdate: [ApiKeyResponseDto];
  ApiKeyDelete: [ApiKeyResponseDto];

  UserAdminCreate: [UserAdminResponseDto];
  UserAdminUpdate: [UserAdminResponseDto];
  UserAdminRestore: [UserAdminResponseDto];
  // soft deleted
  UserAdminDelete: [UserAdminResponseDto];
  // confirmed permanently deleted from server
  UserAdminDeleted: [{ id: string }];
};

export const eventManager = new BaseEventManager<Events>();
