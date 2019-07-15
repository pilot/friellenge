import {environment} from '../../../environments/environment';

export class ApiConfig {

  public static basePathApi = environment.basePathApi;

  // Authorization Path
  public static loginPath = `${ApiConfig.basePathApi}/auth/facebook/`;
  // Users Path
  public static usersPath = `${ApiConfig.basePathApi}/users/`;
  // Complaints Path
  public static complaintPath = `${ApiConfig.basePathApi}/violation/report/`;
  public static complaintsUsersPath = `${ApiConfig.basePathApi}/violation/report/user/`;
  public static complaintsChallengesPath = `${ApiConfig.basePathApi}/violation/report/challenge/`;
  // Complaints Ban Path
  public static banUserPath = `${ApiConfig.basePathApi}/violation/ban/user/`;
  public static banChallengePath = `${ApiConfig.basePathApi}/violation/ban/challenge/`;
  // Challenge Template Path
  public static templateCategoryPath = `${ApiConfig.basePathApi}/challenge/template_category/`;
  public static templatePath = `${ApiConfig.basePathApi}/challenge/template/`;
  // Challenge Path
  public static challengePath = `${ApiConfig.basePathApi}/challenge/`;
  // Payment Path
  public static paymentPath = `${ApiConfig.basePathApi}/payment/`;

  public static defaultImage = 'assets/img/app/default.jpg';
  public static challengeDefaultImage = 'assets/img/app/default-img.jpg';
  public static defaultAvatar = 'assets/img/app/user-default-avatar.png';
}
