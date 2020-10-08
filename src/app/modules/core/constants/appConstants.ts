import {environment} from '../../../../environments/environment';

export const ApiBaseUrl = (environment.development)? environment.apiBaseUrl : '' ;
