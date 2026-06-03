[**epubjs**](../API.md)

***

[epubjs](../API.md) / EpubCFI

# Class: EpubCFI

## Constructors

### Constructor

> **new EpubCFI**(`cfiFrom?`, `base?`, `ignoreClass?`): `EpubCFI`

#### Parameters

##### cfiFrom?

`any`

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

### end

> **end**: `EpubCFIComponent`

***

### path

> **path**: `EpubCFIComponent`

***

### range

> **range**: `boolean`

***

### spinePos

> **spinePos**: `number`

***

### start

> **start**: `EpubCFIComponent`

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

> **filter**(`anchor`, `ignoreClass?`): `false` \| `Node`

#### Parameters

##### anchor

`Node`

##### ignoreClass?

`string`

#### Returns

`false` \| `Node`

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

`any`

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

> **parse**(`cfiStr`): `EpubCFI` \| \{ `spinePos`: `number`; \}

#### Parameters

##### cfiStr

`string`

#### Returns

`EpubCFI` \| \{ `spinePos`: `number`; \}

***

### toRange()

> **toRange**(`_doc?`, `ignoreClass?`): `any`

#### Parameters

##### \_doc?

`Document`

##### ignoreClass?

`string`

#### Returns

`any`

***

### toString()

> **toString**(): `string`

#### Returns

`string`
