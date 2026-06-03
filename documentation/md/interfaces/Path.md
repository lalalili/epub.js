[**epubjs**](../API.md)

***

[epubjs](../API.md) / Path

# Interface: Path

## Properties

### directory

> **directory**: `string`

***

### extension

> **extension**: `string`

***

### filename

> **filename**: `string`

***

### path

> **path**: `string`

***

### splitPathRe

> **splitPathRe**: `RegExp`

## Methods

### isAbsolute()

> **isAbsolute**(`what?`): `boolean`

#### Parameters

##### what?

`string`

#### Returns

`boolean`

***

### isDirectory()

> **isDirectory**(`what`): `boolean`

#### Parameters

##### what

`string`

#### Returns

`boolean`

***

### parse()

> **parse**(`what`): [`ParsedPath`](ParsedPath.md)

#### Parameters

##### what

`string`

#### Returns

[`ParsedPath`](ParsedPath.md)

***

### relative()

> **relative**(`what`): `string`

#### Parameters

##### what

`string`

#### Returns

`string`

***

### resolve()

> **resolve**(`what`): `string`

#### Parameters

##### what

`string`

#### Returns

`string`

***

### splitPath()

> **splitPath**(`filename`): `string`[]

#### Parameters

##### filename

`string`

#### Returns

`string`[]

***

### toString()

> **toString**(): `string`

#### Returns

`string`
