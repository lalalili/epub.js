[**epubjs**](../API.md)

***

[epubjs](../API.md) / EpubCFI

# Class: EpubCFI

## Constructors

### Constructor

> **new EpubCFI**(`cfiFrom?`, `base?`, `ignoreClass?`): `EpubCFI`

#### Parameters

##### cfiFrom?

[`EpubCFIInput`](../type-aliases/EpubCFIInput.md)

##### base?

[`EpubCFIBase`](../type-aliases/EpubCFIBase.md)

##### ignoreClass?

`string`

#### Returns

`EpubCFI`

## Properties

### base

> **base**: [`EpubCFIComponent`](../interfaces/EpubCFIComponent.md) \| `Record`\<`string`, `never`\>

***

### end

> **end**: [`EpubCFIComponent`](../interfaces/EpubCFIComponent.md)

***

### path

> **path**: [`EpubCFIComponent`](../interfaces/EpubCFIComponent.md) \| `Record`\<`string`, `never`\>

***

### range

> **range**: `boolean`

***

### spinePos

> **spinePos**: `number`

***

### start

> **start**: [`EpubCFIComponent`](../interfaces/EpubCFIComponent.md)

***

### str

> **str**: `string`

## Methods

### checkType()

> **checkType**(`cfi`): [`EpubCFIType`](../type-aliases/EpubCFIType.md)

#### Parameters

##### cfi

`unknown`

#### Returns

[`EpubCFIType`](../type-aliases/EpubCFIType.md)

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

> **fromNode**(`anchor`, `base`, `ignoreClass?`): [`ParsedEpubCFI`](../interfaces/ParsedEpubCFI.md)

#### Parameters

##### anchor

`Node`

##### base

[`EpubCFIBase`](../type-aliases/EpubCFIBase.md)

##### ignoreClass?

`string`

#### Returns

[`ParsedEpubCFI`](../interfaces/ParsedEpubCFI.md)

***

### fromRange()

> **fromRange**(`range`, `base`, `ignoreClass?`): [`ParsedEpubCFI`](../interfaces/ParsedEpubCFI.md)

#### Parameters

##### range

`Range` \| `RangeObject` \| [`EpubCFIRangeInput`](../interfaces/EpubCFIRangeInput.md)

##### base

[`EpubCFIBase`](../type-aliases/EpubCFIBase.md)

##### ignoreClass?

`string`

#### Returns

[`ParsedEpubCFI`](../interfaces/ParsedEpubCFI.md)

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

[`EpubCFIStep`](../interfaces/EpubCFIStep.md)[]

#### Returns

`string`

***

### parse()

> **parse**(`cfiStr`): [`ParsedEpubCFI`](../interfaces/ParsedEpubCFI.md) \| \{ `spinePos`: `number`; \}

#### Parameters

##### cfiStr

`string`

#### Returns

[`ParsedEpubCFI`](../interfaces/ParsedEpubCFI.md) \| \{ `spinePos`: `number`; \}

***

### parseComponent()

> **parseComponent**(`componentStr`): [`EpubCFIComponent`](../interfaces/EpubCFIComponent.md)

#### Parameters

##### componentStr

`string`

#### Returns

[`EpubCFIComponent`](../interfaces/EpubCFIComponent.md)

***

### parseStep()

> **parseStep**(`stepStr`): [`EpubCFIStep`](../interfaces/EpubCFIStep.md)

#### Parameters

##### stepStr

`string`

#### Returns

[`EpubCFIStep`](../interfaces/EpubCFIStep.md)

***

### parseTerminal()

> **parseTerminal**(`termialStr`): [`EpubCFITerminal`](../interfaces/EpubCFITerminal.md)

#### Parameters

##### termialStr

`string`

#### Returns

[`EpubCFITerminal`](../interfaces/EpubCFITerminal.md)

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
