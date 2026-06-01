[**epubjs**](../API.md)

***

[epubjs](../API.md) / Layout

# Class: Layout

## Constructors

### Constructor

> **new Layout**(`settings`): `Layout`

#### Parameters

##### settings

`LayoutSettings`

#### Returns

`Layout`

## Properties

### name

> **name**: `string`

***

### props

> **props**: `object`

#### columnWidth

> **columnWidth**: `number`

#### delta

> **delta**: `number`

#### divisor

> **divisor**: `number`

#### flow

> **flow**: `string`

#### gap

> **gap**: `number`

#### height

> **height**: `number`

#### name

> **name**: `string`

#### spread

> **spread**: `string`

#### spreadWidth

> **spreadWidth**: `number`

#### width

> **width**: `number`

***

### settings

> **settings**: `LayoutSettings`

## Methods

### calculate()

> **calculate**(`_width`, `_height`, `_gap?`): `void`

#### Parameters

##### \_width

`number`

##### \_height

`number`

##### \_gap?

`number`

#### Returns

`void`

***

### count()

> **count**(`totalLength`, `pageLength`): `object`

#### Parameters

##### totalLength

`number`

##### pageLength

`number`

#### Returns

`object`

##### pages

> **pages**: `Number`

##### spreads

> **spreads**: `Number`

***

### emit()

> **emit**(`type`, ...`args`): `void`

#### Parameters

##### type

`any`

##### args

...`any`[]

#### Returns

`void`

***

### flow()

> **flow**(`flow`): `string`

#### Parameters

##### flow

`string`

#### Returns

`string`

***

### format()

> **format**(`contents`): `void` \| `Promise`\<`void`\>

#### Parameters

##### contents

[`Contents`](Contents.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### off()

> **off**(`type`, `listener`): `any`

#### Parameters

##### type

`any`

##### listener

`any`

#### Returns

`any`

***

### on()

> **on**(`type`, `listener`): `any`

#### Parameters

##### type

`any`

##### listener

`any`

#### Returns

`any`

***

### once()

> **once**(`type`, `listener`, ...`args`): `any`

#### Parameters

##### type

`any`

##### listener

`any`

##### args

...`any`[]

#### Returns

`any`

***

### spread()

> **spread**(`spread`, `min`): `boolean`

#### Parameters

##### spread

`string`

##### min

`number`

#### Returns

`boolean`
