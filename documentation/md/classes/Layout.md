[**epubjs**](../API.md)

***

[epubjs](../API.md) / Layout

# Class: Layout

## Constructors

### Constructor

> **new Layout**(`settings?`): `Layout`

#### Parameters

##### settings?

`LayoutSettings`

#### Returns

`Layout`

## Properties

### \_evenSpreads

> **\_evenSpreads**: `boolean`

***

### \_flow

> **\_flow**: `string`

***

### \_minSpreadWidth

> **\_minSpreadWidth**: `number`

***

### \_spread

> **\_spread**: `boolean`

***

### columnWidth

> **columnWidth**: `number`

***

### delta

> **delta**: `number`

***

### divisor

> **divisor**: `number`

***

### edgeGuardPx

> **edgeGuardPx**: `number`

***

### effectivePageAdvance

> **effectivePageAdvance**: `number`

***

### gap

> **gap**: `number`

***

### height

> **height**: `number`

***

### name

> **name**: `string`

***

### pageBoundaryShift

> **pageBoundaryShift**: `number`

***

### pageWidth

> **pageWidth**: `number`

***

### props

> **props**: `LayoutProps`

***

### settings

> **settings**: `LayoutSettings`

***

### spreadWidth

> **spreadWidth**: `number`

***

### viewportPageWidth

> **viewportPageWidth**: `number`

***

### width

> **width**: `number`

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

> **count**(`totalLength`, `pageLength?`): `LayoutCount`

#### Parameters

##### totalLength

`number`

##### pageLength?

`number`

#### Returns

`LayoutCount`

***

### emit()

> **emit**(`type`, ...`args`): `void`

#### Parameters

##### type

`string`

##### args

...`unknown`[]

#### Returns

`void`

***

### flow()

> **flow**(`flow?`): `string`

#### Parameters

##### flow?

`string`

#### Returns

`string`

***

### format()

> **format**(`contents`, `section?`, `axis?`): `unknown`

#### Parameters

##### contents

[`Contents`](Contents.md) \| `LayoutContent`

##### section?

`unknown`

##### axis?

`string`

#### Returns

`unknown`

***

### off()

> **off**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### on()

> **on**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### once()

> **once**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### spread()

> **spread**(`spread?`, `min?`): `boolean`

#### Parameters

##### spread?

`string`

##### min?

`number`

#### Returns

`boolean`

***

### update()

> **update**(`props`): `void`

#### Parameters

##### props

`Partial`\<`LayoutProps`\>

#### Returns

`void`
