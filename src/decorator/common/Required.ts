import { applySchemaMetadata } from '../applySchemaMetadata';

export const Required = (required = true) =>
    applySchemaMetadata({
        parentSchemaDecorator: (parentSchema, propertyKey) => {
            if (required) {
                parentSchema.required = parentSchema.required || [];
                parentSchema.required.push(propertyKey);
            }
        }
    });
