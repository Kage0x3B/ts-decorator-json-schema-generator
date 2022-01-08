import { applyPropertySchemaMetadata } from '../applySchemaMetadata';

type FormatNames =
    | 'date-time'
    | 'date'
    | 'time'
    | 'duration'
    | 'email'
    | 'idn-email'
    | 'hostname'
    | 'idn-hostname'
    | 'ipv4'
    | 'ipv6'
    | 'uri'
    | 'uri-reference'
    | 'iri'
    | 'iri-reference'
    | 'uuid'
    | 'json-pointer'
    | 'relative-json-pointer'
    | 'regex';
export const Format = (value: FormatNames) => applyPropertySchemaMetadata('format', value);
