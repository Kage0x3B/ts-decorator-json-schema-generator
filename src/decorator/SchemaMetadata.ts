import { JSONSchema7 } from 'json-schema';
import { hasOwnProperty } from '../util/util';
import { SchemaGeneratorOptions } from '../JsonSchema7Generator';

export type SchemaMetadataType = keyof JSONSchema7;
export type SchemaMetadataValue = string | number | boolean | JSONSchema7 | string[] | number[];

type SchemaDecorator = (options: SchemaGeneratorOptions, schema: JSONSchema7) => void;
type ParentSchemaDecorator = (options: SchemaGeneratorOptions, parentSchema: JSONSchema7, propertyKey: string) => void;

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
    public schemaDecorator?: SchemaDecorator = undefined;
    public parentSchemaDecorator?: ParentSchemaDecorator;

    constructor(options: SchemaMetadataOptions) {
        if (hasOwnProperty(options, 'type')) {
            this.type = options.type;
            this.value = options.value;
            this.schemaDecorator = (options, schema) => {
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

    public apply(options: SchemaGeneratorOptions, schema: JSONSchema7): void {
        if (this.schemaDecorator) {
            this.schemaDecorator(options, schema);
        }
    }

    public applyToParent(options: SchemaGeneratorOptions, parentSchema: JSONSchema7, propertyKey: string): void {
        if (this.parentSchemaDecorator) {
            this.parentSchemaDecorator(options, parentSchema, propertyKey);
        }
    }
}
