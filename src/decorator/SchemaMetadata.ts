import { JSONSchema7 } from 'json-schema';
import { hasOwnProperty } from '../util/util';

export type SchemaMetadataType = keyof JSONSchema7;
export type SchemaMetadataValue = string | number | boolean | JSONSchema7 | string[] | number[];

type SchemaDecorator = (schema: JSONSchema7) => void;
type ParentSchemaDecorator = (parentSchema: JSONSchema7, propertyKey: string) => void;

export type SchemaMetadataOptions =
    | {
          type: SchemaMetadataType;
          value: SchemaMetadataValue;
          parentSchemaDecorator?: ParentSchemaDecorator;
      }
    | {
          schemaDecorator?: SchemaDecorator;
          parentSchemaDecorator?: ParentSchemaDecorator;
      };

export class SchemaMetadata {
    public type?: SchemaMetadataType = undefined;
    public value?: SchemaMetadataValue = undefined;
    public schemaDecorator?: (schema: JSONSchema7) => void = undefined;
    public parentSchemaDecorator?: ParentSchemaDecorator;

    constructor(options: SchemaMetadataOptions) {
        if (hasOwnProperty(options, 'type')) {
            this.type = options.type;
            this.value = options.value;
            this.schemaDecorator = (schema) => {
                if (this.type && typeof this.value !== 'undefined') {
                    // @ts-ignore
                    schema[this.type] = this.value;
                }
            };
        } else {
            this.schemaDecorator = options.schemaDecorator;
        }

        this.parentSchemaDecorator = options.parentSchemaDecorator;
    }

    public apply(schema: JSONSchema7): void {
        if (this.schemaDecorator) {
            this.schemaDecorator(schema);
        }
    }

    public applyToParent(parentSchema: JSONSchema7, propertyKey: string): void {
        if (this.parentSchemaDecorator) {
            this.parentSchemaDecorator(parentSchema, propertyKey);
        }
    }
}
