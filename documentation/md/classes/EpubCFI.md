[**epubjs**](../API.md)

***

[epubjs](../API.md) / EpubCFI

# Class: EpubCFI

## Constructors

### Constructor

> **new EpubCFI**(`cfiFrom?`, `base?`, `ignoreClass?`): `EpubCFI`

#### Parameters

##### cfiFrom?

`EpubCFIInput`

##### base?

`EpubCFIBase`

##### ignoreClass?

`string`

#### Returns

`EpubCFI`

## Properties

### base

> **base**: `EpubCFIComponent` \| `Record`\<`string`, `any`\>

***

### end

> **end**: `EpubCFIComponent`

***

### path

> **path**: `EpubCFIComponent` \| `Record`\<`string`, `any`\>

***

### range

> **range**: `boolean`

***

### spinePos

> **spinePos**: `number`

***

### start

> **start**: `EpubCFIComponent`

***

### str

> **str**: `string`

## Methods

### checkType()

> **checkType**(`cfi`): `EpubCFIType`

#### Parameters

##### cfi

`unknown`

#### Returns

`EpubCFIType`

***

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

> **fromNode**(`anchor`, `base`, `ignoreClass?`): `ParsedEpubCFI`

#### Parameters

##### anchor

`Node`

##### base

`EpubCFIBase`

##### ignoreClass?

`string`

#### Returns

`ParsedEpubCFI`

***

### fromRange()

> **fromRange**(`range`, `base`, `ignoreClass?`): `ParsedEpubCFI`

#### Parameters

##### range

`Range` \| `RangeObject`

##### base

`EpubCFIBase`

##### ignoreClass?

`string`

#### Returns

`ParsedEpubCFI`

***

### generateChapterComponent()

> **generateChapterComponent**(`_spineNodeIndex`, `_pos`, `id?`): `string`

#### Parameters

##### \_spineNodeIndex

`number`

##### \_pos

`string` \| `number`

##### id?

`string`

#### Returns

`string`

***

### getChapterComponent()

> **getChapterComponent**(`cfiStr`): `string`

#### Parameters

##### cfiStr

`string`

#### Returns

`string`

***

### getCharecterOffsetComponent()

> **getCharecterOffsetComponent**(`cfiStr`): `string`

#### Parameters

##### cfiStr

`string`

#### Returns

`string`

***

### getPathComponent()

> **getPathComponent**(`cfiStr`): `string`

#### Parameters

##### cfiStr

`string`

#### Returns

`string`

***

### getRange()

> **getRange**(`cfiStr`): `false` \| \[`string`, `string`\]

#### Parameters

##### cfiStr

`string`

#### Returns

`false` \| \[`string`, `string`\]

***

### isCfiString()

> **isCfiString**(`str`): `boolean`

#### Parameters

##### str

`unknown`

#### Returns

`boolean`

***

### joinSteps()

> **joinSteps**(`steps?`): `string`

#### Parameters

##### steps?

`EpubCFIStep`[]

#### Returns

`string`

***

### parse()

> **parse**(`cfiStr`): `ParsedEpubCFI` \| \{ `spinePos`: `number`; \}

#### Parameters

##### cfiStr

`string`

#### Returns

`ParsedEpubCFI` \| \{ `spinePos`: `number`; \}

***

### parseComponent()

> **parseComponent**(`componentStr`): `EpubCFIComponent`

#### Parameters

##### componentStr

`string`

#### Returns

`EpubCFIComponent`

***

### parseStep()

> **parseStep**(`stepStr`): `EpubCFIStep`

#### Parameters

##### stepStr

`string`

#### Returns

`EpubCFIStep`

***

### parseTerminal()

> **parseTerminal**(`termialStr`): `EpubCFITerminal`

#### Parameters

##### termialStr

`string`

#### Returns

`EpubCFITerminal`

***

### toRange()

> **toRange**(`_doc?`, `ignoreClass?`): `Range` \| `RangeObject`

#### Parameters

##### \_doc?

`Document`

##### ignoreClass?

`string`

#### Returns

`Range` \| `RangeObject`

***

### toString()

> **toString**(): `string`

#### Returns

`string`
