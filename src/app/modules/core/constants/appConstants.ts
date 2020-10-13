
import { environment } from '../../../../environments/environment';

export const ApiBaseUrl = environment.development ? environment.apiBaseUrl : '';

export const PAGE_SIZE_OPTIONS: number[] = [5, 10];
