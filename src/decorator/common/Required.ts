import { applySchemaMetadata } from '../applySchemaMetadata';

export const Required = (required = true) =>
    applySchemaMetadata({
        parentSchemaDecorator: (options, parentSchema, propertyKey) => {
            if (required) {
                parentSchema.required = parentSchema.required || [];
                parentSchema.required.push(propertyKey);
            }
        }
    });
