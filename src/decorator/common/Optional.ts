import { Required } from './Required';

export const Optional = (optional = true) => Required(!optional);
