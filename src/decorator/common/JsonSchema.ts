import { applySchemaMetadataClass } from '../applySchemaMetadata';

type BaseJsonSchemaOptions = {
    id: string;
    title: string;
    description: string;
};

export const JsonSchema = (options: Partial<BaseJsonSchemaOptions>) =>
    applySchemaMetadataClass({
        schemaDecorator: (generatorOptions, schema) => {
            if (options.id) {
                schema.$id = options.id;
            }

            if (options.title) {
                schema.title = options.title;
            }

            if (options.description) {
                schema.description = options.description;
            }
        }
    });
