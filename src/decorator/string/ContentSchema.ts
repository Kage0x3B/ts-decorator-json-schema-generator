import { applyPropertySchemaMetadata } from '../applySchemaMetadata';
import { generateObjectSchema } from '../../JsonSchema7Generator';
import { Constructable } from '../../util/Constructable';

export const ContentSchema = (schemaClass: Constructable<any>) =>
    // @ts-ignore
    applyPropertySchemaMetadata('contentSchema', generateObjectSchema(schemaClass.prototype, 1));
