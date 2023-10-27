export const BASE_URL = 'https://heal-app.jocapps.com/api/'

export const LOGIN_API = 'users/loginByEmailID'
export const GOOGLE_LOGIN_API = 'users/loginByGoogleId'
export const FACEBOOK_LOGIN_API = 'users/loginByFacebookId'
export const UPDATE_SIGNUP = 'users/updateClientUserProfile'
export const CREATE_SIGNUP = 'users/signUp'
export const CREDITED_CARD_DETAILS = 'CardDetail/updateCreditCard'

export const PROVIDER_SIGNIN = 'providers/loginByEmailID'
export const GOOGLE_LOGIN_API_PROVIDER = 'providers/loginByGoogleId'
export const FACEBOOK_LOGIN_API_PROVIDER = 'providers/loginByFacebookId'
export const CREATE_SIGNUP_PROVIDER = 'providers/signUp'
export const UPDATE_SIGNUP_PROVIDER = 'providers/updateProviderUserDetails'
export const CREATE_PROVIDER_SEVICES = 'providers/createProviderServices'
export const GET_CREATE_CARD_DETAILS = 'CardDetail/getCreditCardDetails'
export const GET_PROVIDER_TYPES = 'providers/getAllProviderDetails'
export const GET_PROVIDER_SERVICE = 'providers/getAllProviderServices'
export const GET_USER_SERVICES = 'providers/getProviderServices'
const id = 1;
export const GET_AD_BANNER = `users/getBannersDetails/${id}`
export const GET_TREATMENT_MENU = 'users/getTreatmentMenu'
export const GET_SEARCH_PROVIDER = 'users/getSearchProvider'
export const ORDER_PROVIDER = 'users/createPatient'

export const POST = 'POST';
export const GET = 'GET';
export const PATCH = 'PATCH';
export const DEFAULT_ACCESS_TOKEN = 'Logicease123';
export const TIME_OUT = 30000;
