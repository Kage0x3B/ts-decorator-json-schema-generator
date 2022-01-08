import { applySchemaMetadataClass } from '../applySchemaMetadata';
import { JSONSchema7 } from 'json-schema';

type BaseJsonSchemaOptions = Pick<JSONSchema7, '$id' | 'title' | 'description'>;

export const JsonSchema = (options: BaseJsonSchemaOptions) =>
    applySchemaMetadataClass({
        schemaDecorator: (schema) => {
            for (const key of Object.keys(options)) {
                // @ts-ignore
                schema[key] = options[key];
            }
        }
    });
