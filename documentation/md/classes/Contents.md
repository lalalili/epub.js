[**epubjs**](../API.md)

***

[epubjs](../API.md) / Contents

# Class: Contents

## Constructors

### Constructor

> **new Contents**(`doc`, `content`, `cfiBase`, `sectionIndex`): `Contents`

#### Parameters

##### doc

`Document`

##### content

`Element`

##### cfiBase

`string`

##### sectionIndex

`number`

#### Returns

`Contents`

## Properties

### cfiBase

> **cfiBase**: `string`

***

### content

> **content**: `Element`

***

### document

> **document**: `Document`

***

### documentElement

> **documentElement**: `Element`

***

### epubcfi

> **epubcfi**: [`EpubCFI`](EpubCFI.md)

***

### sectionIndex

> **sectionIndex**: `number`

***

### window

> **window**: `Window`

***

### listenedEvents

> `static` **listenedEvents**: `string`[]

## Methods

### addClass()

> **addClass**(`className`): `void`

#### Parameters

##### className

`string`

#### Returns

`void`

***

### addScript()

> **addScript**(`src`): `Promise`\<`boolean`\>

#### Parameters

##### src

`string`

#### Returns

`Promise`\<`boolean`\>

***

### addStylesheet()

> **addStylesheet**(`src`): `Promise`\<`boolean`\>

#### Parameters

##### src

`string`

#### Returns

`Promise`\<`boolean`\>

***

### addStylesheetCss()

> **addStylesheetCss**(`serializedCss`, `key`): `Promise`\<`boolean`\>

#### Parameters

##### serializedCss

`string`

##### key

`string`

#### Returns

`Promise`\<`boolean`\>

***

### addStylesheetRules()

> **addStylesheetRules**(`rules`, `key`): `Promise`\<`boolean`\>

#### Parameters

##### rules

`object` \| `object`[]

##### key

`string`

#### Returns

`Promise`\<`boolean`\>

***

### cfiFromNode()

> **cfiFromNode**(`node`, `ignoreClass?`): `string`

#### Parameters

##### node

`Node`

##### ignoreClass?

`string`

#### Returns

`string`

***

### cfiFromRange()

> **cfiFromRange**(`range`, `ignoreClass?`): `string`

#### Parameters

##### range

`Range`

##### ignoreClass?

`string`

#### Returns

`string`

***

### columns()

> **columns**(`width`, `height`, `columnWidth`, `gap`, `dir`): `void`

#### Parameters

##### width

`number`

##### height

`number`

##### columnWidth

`number`

##### gap

`number`

##### dir

`string`

#### Returns

`void`

***

### contentHeight()

> **contentHeight**(`h`): `number`

#### Parameters

##### h

`number`

#### Returns

`number`

***

### contentWidth()

> **contentWidth**(`w`): `number`

#### Parameters

##### w

`number`

#### Returns

`number`

***

### css()

> **css**(`property`, `value`, `priority?`): `string`

#### Parameters

##### property

`string`

##### value

`string`

##### priority?

`boolean`

#### Returns

`string`

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### direction()

> **direction**(`dir`): `void`

#### Parameters

##### dir

`string`

#### Returns

`void`

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

### fit()

> **fit**(`width`, `height`): `void`

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`void`

***

### height()

> **height**(`h`): `number`

#### Parameters

##### h

`number`

#### Returns

`number`

***

### locationOf()

> **locationOf**(`target`, `ignoreClass?`): `Promise`\<\{ `left`: `number`; `top`: `number`; \}\>

#### Parameters

##### target

`string` \| [`EpubCFI`](EpubCFI.md)

##### ignoreClass?

`string`

#### Returns

`Promise`\<\{ `left`: `number`; `top`: `number`; \}\>

***

### map()

> **map**(`layout`): `any`

#### Parameters

##### layout

`any`

#### Returns

`any`

***

### mapPage()

> **mapPage**(`cfiBase`, `layout`, `start`, `end`, `dev`): `any`

#### Parameters

##### cfiBase

`string`

##### layout

`object`

##### start

`number`

##### end

`number`

##### dev

`boolean`

#### Returns

`any`

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

### overflow()

> **overflow**(`overflow`): `string`

#### Parameters

##### overflow

`string`

#### Returns

`string`

***

### overflowX()

> **overflowX**(`overflow`): `string`

#### Parameters

##### overflow

`string`

#### Returns

`string`

***

### overflowY()

> **overflowY**(`overflow`): `string`

#### Parameters

##### overflow

`string`

#### Returns

`string`

***

### range()

> **range**(`cfi`, `ignoreClass?`): `Range`

#### Parameters

##### cfi

`string`

##### ignoreClass?

`string`

#### Returns

`Range`

***

### removeClass()

> **removeClass**(`className`): `void`

#### Parameters

##### className

`any`

#### Returns

`void`

***

### root()

> **root**(): `Element`

#### Returns

`Element`

***

### scaler()

> **scaler**(`scale`, `offsetX`, `offsetY`): `void`

#### Parameters

##### scale

`number`

##### offsetX

`number`

##### offsetY

`number`

#### Returns

`void`

***

### scrollHeight()

> **scrollHeight**(): `number`

#### Returns

`number`

***

### scrollWidth()

> **scrollWidth**(): `number`

#### Returns

`number`

***

### size()

> **size**(`width`, `height`): `void`

#### Parameters

##### width

`number`

##### height

`number`

#### Returns

`void`

***

### textHeight()

> **textHeight**(): `number`

#### Returns

`number`

***

### textWidth()

> **textWidth**(): `number`

#### Returns

`number`

***

### viewport()

> **viewport**(`options`): `ViewportSettings`

#### Parameters

##### options

`ViewportSettings`

#### Returns

`ViewportSettings`

***

### width()

> **width**(`w`): `number`

#### Parameters

##### w

`number`

#### Returns

`number`

***

### writingMode()

> **writingMode**(`mode`): `string`

#### Parameters

##### mode

`string`

#### Returns

`string`
