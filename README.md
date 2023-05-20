# ts-decorator-json-schema-generator

Generate JSON-Schemas from typescript classes annotated with decorators.

## Installation

`pnpm add ts-decorator-json-schema-generator reflect-metadata`
or
`npm install ts-decorator-json-schema-generator reflect-metadata`

As this library uses reflections, the `reflect-metadata` library is required and has to be imported before anything
else. And include these options in your `tsconfig.json`:

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true
```

## Usage

```typescript
import 'reflect-metadata';

import { generateJsonSchema } from 'ts-decorator-json-schema-generator';
import { MySchema } from './MySchema';

console.log(generateJsonSchema(MySchema));
```

```typescript
import {
    DependentRequired, JsonSchema, MaxLength, Min, MinLength, Optional, Pattern, Required
} from 'ts-decorator-json-schema-generator';

// This decorator and it's options are optional and
// only a handy shortcut to add some general info to your schema
@JsonSchema({
    id: 'https://example.com/my-schema.schema.json',
    title: 'Example Schema',
    description: 'An example schema for showcasing some features of the ts-decorator-json-schema-generator library'
})
export class MySchema {
    // Primitive types are automatically extracted from the typescript type
    @Required()
    @Min(0)
    public myRequiredNumber!: number;

    @Required()
    @MinLength(4)
    @MaxLength(16)
    @Pattern(/^[a-zA-Z_]+$/)
    public username!: string;

    @Optional()
    public streetAddress?: string;

    @Optional()
    @DependentRequired('streetAddress')
    public extendedAddress?: string;
}
```

Important: Every property has to have at least one decorator (just add `Required` or `Optional` everywhere) or it won't
be possible to extract the typescript type and include the property in the schema.

### Other features

- Almost all current json schema validation types are implemented as decorators (currently missing most of the core
  structure types like `"if"`/`"then"` and more)
- You can set the type to another schema typescript class to include a subschema.
- Explicitly set the property type with @Type which accepts a type name or another schema class -> `@Type("integer")`
  or `@Type(OtherSchema)`.
- `@Enum` accepts typescript enums and automatically sets the correct accepted values and property type.

## Decorator reference

| JSON schema keyword                                                                                                                                  | Decorator                                                                       | Description                                                                                                                                                                                                                                     |
|------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Common schema decorators**                                                                                                                         |                                                                                 |                                                                                                                                                                                                                                                 |
| $id, [title, description](https://json-schema.org/understanding-json-schema/reference/generic.html#annotations), $schema                             | `@JsonSchema({ id?: string; title?: string; description?: string })`            | Used on a class to mark it as a json schema class. Pass the options object to set metadata on the json schema                                                                                                                                   |
| $comment                                                                                                                                             | :x:                                                                             |                                                                                                                                                                                                                                                 |
| [type](https://json-schema.org/understanding-json-schema/reference/type.html)                                                                        | `@Type(typeNameOrSchemaClass: string  &#124; ClassConstructor)`                 | Explicitly set the type of this property to either a subschema class or a type name (one of `string`, `number`, `integer`, `boolean`, `object`, `array`, `null`)                                                                                |
| [enum](https://json-schema.org/understanding-json-schema/reference/generic.html#enumerated-values)                                                   | `@Enum(enumClass: Enum, valueType?: 'string' &#124; 'number' &#124; 'integer')` | Use a TypeScript enum class to set enum values on this property. The decorator tries to guess if your enum contains `string` or `number` types to set the `type` on the schema of the property, but this can be explicitly set with `valueType` |
| [const](https://json-schema.org/understanding-json-schema/reference/generic.html#constant-values)                                                    | :x:                                                                             | The `const` keyword is used to restrict a value to a single value.                                                                                                                                                                              |
| [dependentRequired](https://json-schema.org/understanding-json-schema/reference/conditionals.html#dependentrequired)                                 | `@DependentRequired(...requiredProperties: string[])`                           | List all other property keys, which this property depends on.                                                                                                                                                                                   |
| [dependentSchemas](https://json-schema.org/understanding-json-schema/reference/conditionals.html?highlight=dependencies#dependentschemas)            | :x:                                                                             |                                                                                                                                                                                                                                                 |
| [default](https://json-schema.org/understanding-json-schema/reference/generic.html#annotations)                                                      | `@Default(value: any)`                                                          | Set a default value for a property. This might be used by documentation generators.                                                                                                                                                             |
| [examples](https://json-schema.org/understanding-json-schema/reference/generic.html#annotations)                                                     | `@Examples(examples: any[])`                                                    | Provide a list of example values for this property. This might be used by documentation generators.                                                                                                                                             |
| [readOnly](https://json-schema.org/understanding-json-schema/reference/generic.html#annotations)                                                     | `@ReadOnly()`                                                                   | Mark a property as read-only.                                                                                                                                                                                                                   |
| [writeOnly](https://json-schema.org/understanding-json-schema/reference/generic.html#annotations)                                                    | `@WriteOnly()`                                                                  | Mark a property as write-only.                                                                                                                                                                                                                  |
| [deprecated](https://json-schema.org/understanding-json-schema/reference/generic.html#annotations)                                                   | `@Deprecated()`                                                                 | Mark a property as deprecated.                                                                                                                                                                                                                  |
| [$ref](https://json-schema.org/understanding-json-schema/structuring.html#ref)                                                                       | See [subschemas](#subschemas)                                                   |                                                                                                                                                                                                                                                 |
| **Composition decorators**                                                                                                                           |                                                                                 |                                                                                                                                                                                                                                                 |
| [allOf](https://json-schema.org/understanding-json-schema/reference/combining.html#allof)                                                            | `@AllOf(...schemaOrClasses: ClassConstructor &#124; JSONSchema7)`               |                                                                                                                                                                                                                                                 |
| [anyOf](https://json-schema.org/understanding-json-schema/reference/combining.html#anyof)                                                            | `@AnyOf(...schemaOrClasses: ClassConstructor &#124; JSONSchema7)`               |                                                                                                                                                                                                                                                 |
| [oneOf](https://json-schema.org/understanding-json-schema/reference/combining.html#oneof)                                                            | `@OneOf(...schemaOrClasses: ClassConstructor &#124; JSONSchema7)`               |                                                                                                                                                                                                                                                 |
| [not](https://json-schema.org/understanding-json-schema/reference/combining.html#not)                                                                | `@Not(schemaOrClass: ClassConstructor &#124; JSONSchema7)`                      |                                                                                                                                                                                                                                                 |
| **String decorators**                                                                                                                                |                                                                                 |                                                                                                                                                                                                                                                 |
| [minLength](https://json-schema.org/understanding-json-schema/reference/string.html#length)                                                          | `@MaxLength(maxLength: number)`                                                 | Set the max length of this string.                                                                                                                                                                                                              |
| [maxLength](https://json-schema.org/understanding-json-schema/reference/string.html#length)                                                          | `@MinLength(minLength: number)`                                                 | Set the min length of this string.                                                                                                                                                                                                              |
| [pattern](https://json-schema.org/understanding-json-schema/reference/string.html#regular-expressions)                                               | `@Pattern(pattern: RegExp &#124; string)`                                       | Require the string to match the given RegExp pattern.                                                                                                                                                                                           |                                                                                                                                                                                                            |
| [format](https://json-schema.org/understanding-json-schema/reference/string.html#format)                                                             | `@Format(format: string)`                                                       | Json schemas have a list of inbuilt string formats for strings containing dates, email addresses and more.                                                                                                                                      |
| [contentEncoding](https://json-schema.org/understanding-json-schema/reference/non_json_data.html#contentencoding)                                    | `@ContentEncoding(contentEncoding: string)`                                     | Specify the encoding of the content of this string. Examples include `base16`, `base32`, `base32hex` `base64`.                                                                                                                                  |
| [contentMediaType](https://json-schema.org/understanding-json-schema/reference/non_json_data.html#contentmediatype)                                  | `@ContentMediaType(mimeType: string)`                                           | Specify the mimetype of the content of this string.                                                                                                                                                                                             |
| [contentSchema](https://json-schema.org/understanding-json-schema/reference/non_json_data.html#contentschema)                                        | `@ContentSchema(schemaClass: ClassConstructor)`                                 | Specify the json schema, which the content of this string should adhere to.                                                                                                                                                                     |
| **Number decorators**                                                                                                                                |                                                                                 |                                                                                                                                                                                                                                                 |
| [minimum](https://json-schema.org/understanding-json-schema/reference/numeric.html#range)                                                            | `@Min(min: number)`                                                             | Set the min value of the number.                                                                                                                                                                                                                |
| [maximum](https://json-schema.org/understanding-json-schema/reference/numeric.html#range)                                                            | `@Max(max: number)`                                                             | Set the max value of the number.                                                                                                                                                                                                                |
| [minimum and maximum](https://json-schema.org/understanding-json-schema/reference/numeric.html#range)                                                | `@Range(min: number, max: number)`                                              | Shortcut for setting both @Min and @Max.                                                                                                                                                                                                        |
| [exclusiveMin](https://json-schema.org/understanding-json-schema/reference/numeric.html#range)                                                       | `@ExclusiveMin(exclusiveMin: number)`                                           | Set the exclusive min value of the number.                                                                                                                                                                                                      |
| [exclusiveMax](https://json-schema.org/understanding-json-schema/reference/numeric.html#range)                                                       | `@ExclusiveMax(exclusiveMax: number)`                                           | Set the exclusive max value of the number.                                                                                                                                                                                                      |
| [multipleOf](https://json-schema.org/understanding-json-schema/reference/numeric.html#multiples)                                                     | `@MultipleOf(value: number)`                                                    | Require to the number to be a multiple of `value`.                                                                                                                                                                                              |
| **Object decorators**                                                                                                                                |                                                                                 |                                                                                                                                                                                                                                                 |
| [required](https://json-schema.org/understanding-json-schema/reference/object.html#required-properties) (on the parent object)                       | `@Required()`                                                                   | Mark this property as required                                                                                                                                                                                                                  |
| (doesn't set anything)                                                                                                                               | `@Optional()`                                                                   | Mark this property as optional (no used in json schema, decorator exists for parity with `@Required()` decorator)                                                                                                                               |
| [minProperties](https://json-schema.org/understanding-json-schema/reference/object.html#size)                                                        | `@MinProperties(minAmount: number)`                                             | Require a min amount of properties on this object                                                                                                                                                                                               |
| [maxProperties](https://json-schema.org/understanding-json-schema/reference/object.html#size)                                                        | `@MaxProperties(maxAmount: number)`                                             | Restrict the max amount of properties on this object                                                                                                                                                                                            |
| [additionalProperties](https://json-schema.org/understanding-json-schema/reference/object.html?highlight=additionalproperties#additional-properties) | :x:                                                                             |                                                                                                                                                                                                                                                 |
| [patternProperties](https://json-schema.org/understanding-json-schema/reference/object.html?highlight=patternproperties#pattern-properties)          | :x:                                                                             |                                                                                                                                                                                                                                                 |
| [propertyNames](https://json-schema.org/understanding-json-schema/reference/object.html?highlight=patternproperties#property-names)                  | :x:                                                                             |                                                                                                                                                                                                                                                 |
| **Array decorators**                                                                                                                                 |                                                                                 |                                                                                                                                                                                                                                                 |
| [items](https://json-schema.org/understanding-json-schema/reference/array.html#items)                                                                | `@Items(type: string &#124; ClassConstructor)`                                  | Specify the type for each array item by passing a json schema type or a class                                                                                                                                                                   |
| [contains](https://json-schema.org/understanding-json-schema/reference/array.html?highlight=contains#contains)                                       | `@Items(type: string &#124; ClassConstructor)`                                  | Specify the type for each array item by passing a json schema type or a class                                                                                                                                                                   |
| [minItems](https://json-schema.org/understanding-json-schema/reference/array.html#length)                                                            | `@MinItems(minAmount: number)`                                                  | Require a min amount of items in this array                                                                                                                                                                                                     |
| [maxItems](https://json-schema.org/understanding-json-schema/reference/array.html#length)                                                            | `@MaxItems(maxAmount: number)`                                                  | Restrict the max amount of items in this array                                                                                                                                                                                                  |
| [uniqueItems](https://json-schema.org/understanding-json-schema/reference/array.html#uniqueness)                                                     | `@UniqueItems()`                                                                | Require each array item to be unique                                                                                                                                                                                                            |
| **Conditional decorators**                                                                                                                           |                                                                                 |                                                                                                                                                                                                                                                 |
| [if/then/else](https://json-schema.org/understanding-json-schema/reference/conditionals.html#if-then-else)                                           | :x:                                                                             |                                                                                                                                                                                                                                                 |

## Subschemas

When your schema classes have properties, which are also schema classes, there are different ways to place the
subschemas of these classes into the final json schema.

The `generateJsonSchema(sourceClass: ClassConstructor, options?: SchemaGeneratorOptions)` method accepts an options
object, where you can set `includeSubschemas` to the following values:

| Value                                                    | Description                                                                                                                            |
|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| `full`                                                   | Basically "copy-pastes" the full class json-schema into the property type                                                              |
| `anonymously`                                            | Like `full`, but removes the $id field to resolve problems with having json-schemas with the same $id defined multiple times in a file |
| `reference`                                              | Inserts a `$ref` to the json-schema $id, which then has to be resolved by the system loading the json-schemas.                         |
| `($id: string &#124; undefined) => SubschemaIncludeType` | Decide for each subschema, how to insert it.                                                                                           |

## Comparison to similar libraries

Similar libraries are [ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator), which uses JSDoc
comments for information on how to build the json schema instead of decorators and requires the source .ts files to be
present. There is also [ts-json-schema-decorator](https://github.com/eddow/ts-json-schema-decorator), which uses
decorators and inspired this library, but I decided to write a completely new library instead of forking this project,
as the code looked very hard to maintain. Furthermore, it used an unusual approach when it comes to generating the json
schema, as the decorators "magically" generated the schema when a class with the correct decorator was loaded, and
appended the generated schema to the class prototype.
