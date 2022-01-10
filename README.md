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

## Comparison to similar libraries

Similar libraries are [ts-json-schema-generator](https://github.com/vega/ts-json-schema-generator), which uses JSDoc
comments for information on how to build the json schema instead of decorators and requires the source .ts files to be
present. There is also [ts-json-schema-decorator](https://github.com/eddow/ts-json-schema-decorator), which uses
decorators and inspired this library, but I decided to write a completely new library instead of forking this project,
as the code looked very hard to maintain. Furthermore, it used an unusual approach when it comes to generating the json
schema, as the decorators "magically" generated the schema when a class with the correct decorator was loaded, and
appended the generated schema to the class prototype.