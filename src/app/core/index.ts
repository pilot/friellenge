import {AuthService} from './services/auth.service';
import {ApiFacebookService} from './services/api-facebook.service';
import {SessionService} from './services/session.service';
import {AccessGuard} from './guards/access-guard';

export * from './services/api-facebook.service';
export * from './services/auth.service';
export * from './services/session.service';

export const CORE_PROVIDERS = [
  ApiFacebookService,
  AuthService,
  SessionService,
  AccessGuard
];
