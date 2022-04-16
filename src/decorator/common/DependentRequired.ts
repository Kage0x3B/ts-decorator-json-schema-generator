import { applySchemaMetadata } from '../applySchemaMetadata';

export const DependentRequired = (...requiredProperties: string[]) =>
    applySchemaMetadata({
        parentSchemaDecorator: (options, parentSchema, propertyKey) => {
            parentSchema.dependencies = parentSchema.dependencies || {};

            parentSchema.dependencies[propertyKey] = requiredProperties;
        }
    });
