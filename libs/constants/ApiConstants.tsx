export const BASE_URL = 'https://heal-app.jocapps.com/api/';
//client API
export const LOGIN_API = 'users/loginByEmailID';
export const GOOGLE_LOGIN_API = 'users/loginByGoogleId';
export const FACEBOOK_LOGIN_API = 'users/loginByFacebookId';
export const UPDATE_SIGNUP = 'users/updateClientUserProfile';
export const CREATE_SIGNUP = 'users/signUp';
export const CREATE_CARD_DETAILS = 'CardDetail/createCreditCardDetails';
const id = 1;
export const GET_AD_BANNER = `users/getBannersDetails/${id}`;
export const GET_TREATMENT_MENU = 'users/getProviderMenu';
export const GET_SEARCH_PROVIDER = 'users/getSearchProviderType';
export const GET_SEARCH_LIST = 'providers/getSearchServices';
export const ORDER_PROVIDER = 'users/createClientOrder';
export const GET_LOCATION_SEARCH = 'users/getProviderFromSearch';
export const BOOK_ORDER = 'providers/providerOrder';
// export const SEARCH_API = 'location/getSearchProviderType'

//Provider API
export const PROVIDER_SIGNIN = 'providers/loginByEmailID';
export const GOOGLE_LOGIN_API_PROVIDER = 'providers/loginByGoogleId';
export const FACEBOOK_LOGIN_API_PROVIDER = 'providers/loginByFacebookId';
export const CREATE_SIGNUP_PROVIDER = 'providers/signUp';
export const UPDATE_SIGNUP_PROVIDER = 'providers/updateProviderUserDetails';
export const CREATE_PROVIDER_SEVICES = 'providers/createProviderServices';
export const GET_CREATE_CARD_DETAILS = 'CardDetail/getCreditCardDetails';
export const GET_PROVIDER_TYPES = 'providers/getAllProviderDetails';
export const GET_PROVIDER_SERVICE = 'providers/getAllProviderServices';
export const GET_USER_SERVICES = 'providers/getProviderServices';
export const ORDER_REQUEST = 'providers/providerClientOrder';
export const UPDATE_PROVIDER_LOCATION = 'providers/updateProviderStatus';
export const PROVIDER_AVAILABILITY = 'providers/updateProviderAvailability';
export const ADD_PROVIDER_SERVICE = 'providers/updateServicesStatus';
export const ORDER_PAYMENT = 'providers/payLoadOrder';
export const PROVIDER_RATING = 'providers/createProviderRatings';
export const TREATMENT_COMPLETED = 'providers/completedTreatment';

export const POST = 'POST';
export const GET = 'GET';
export const PATCH = 'PATCH';
export const DEFAULT_ACCESS_TOKEN = 'Logicease123';
export const PAYMENT_ACCESS_TOKEN = 'Logicease_23';
export const TIME_OUT = 30000;
export const UNAUTHORIZED_ERROR_CODE = 401;
