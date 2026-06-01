[**epubjs**](../API.md)

***

[epubjs](../API.md) / EpubCFI

# Class: EpubCFI

## Constructors

### Constructor

> **new EpubCFI**(`cfiFrom?`, `base?`, `ignoreClass?`): `EpubCFI`

#### Parameters

##### cfiFrom?

`string` \| `Range` \| `Node`

##### base?

`string` \| `object`

##### ignoreClass?

`string`

#### Returns

`EpubCFI`

## Properties

### base

> **base**: `EpubCFIComponent`

***

### range

> **range**: `boolean`

***

### spinePos

> **spinePos**: `number`

## Methods

### collapse()

> **collapse**(`toStart?`): `void`

#### Parameters

##### toStart?

`boolean`

#### Returns

`void`

***

### compare()

> **compare**(`cfiOne`, `cfiTwo`): `number`

#### Parameters

##### cfiOne

`string` \| `EpubCFI`

##### cfiTwo

`string` \| `EpubCFI`

#### Returns

`number`

***

### equalStep()

> **equalStep**(`stepA`, `stepB`): `boolean`

#### Parameters

##### stepA

`object`

##### stepB

`object`

#### Returns

`boolean`

***

### filter()

> **filter**(`anchor`, `ignoreClass?`): `false` \| `Element`

#### Parameters

##### anchor

`Element`

##### ignoreClass?

`string`

#### Returns

`false` \| `Element`

***

### fromNode()

> **fromNode**(`anchor`, `base`, `ignoreClass?`): `EpubCFI`

#### Parameters

##### anchor

`Node`

##### base

`string` \| `object`

##### ignoreClass?

`string`

#### Returns

`EpubCFI`

***

### fromRange()

> **fromRange**(`range`, `base`, `ignoreClass?`): `EpubCFI`

#### Parameters

##### range

`Range`

##### base

`string` \| `object`

##### ignoreClass?

`string`

#### Returns

`EpubCFI`

***

### isCfiString()

> **isCfiString**(`str`): `boolean`

#### Parameters

##### str

`string`

#### Returns

`boolean`

***

### parse()

> **parse**(`cfiStr`): `EpubCFI`

#### Parameters

##### cfiStr

`string`

#### Returns

`EpubCFI`

***

### toRange()

> **toRange**(`_doc?`, `ignoreClass?`): `Range`

#### Parameters

##### \_doc?

`Document`

##### ignoreClass?

`string`

#### Returns

`Range`

***

### toString()

> **toString**(): `string`

#### Returns

`string`
