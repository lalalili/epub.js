[**epubjs**](../API.md)

***

[epubjs](../API.md) / Mapping

# Interface: Mapping

## Properties

### \_dev

> **\_dev**: `boolean`

***

### direction

> **direction**: `string`

***

### horizontal

> **horizontal**: `boolean`

***

### layout

> **layout**: [`MappingLayout`](MappingLayout.md)

## Methods

### axis()

> **axis**(`axis?`): `boolean`

#### Parameters

##### axis?

`string`

#### Returns

`boolean`

***

### findEnd()

> **findEnd**(`root`, `start`, `end`): `Range`

#### Parameters

##### root

`Node`

##### start

`number`

##### end

`number`

#### Returns

`Range`

***

### findRanges()

> **findRanges**(`view`): [`RangePair`](RangePair.md)[]

#### Parameters

##### view

[`MappingView`](MappingView.md)

#### Returns

[`RangePair`](RangePair.md)[]

***

### findStart()

> **findStart**(`root`, `start`, `end`): `Range`

#### Parameters

##### root

`Node`

##### start

`number`

##### end

`number`

#### Returns

`Range`

***

### findTextEndRange()

> **findTextEndRange**(`node`, `start`, `end`): `Range`

#### Parameters

##### node

`Node`

##### start

`number`

##### end

`number`

#### Returns

`Range`

***

### findTextStartRange()

> **findTextStartRange**(`node`, `start`, `end`): `Range`

#### Parameters

##### node

`Node`

##### start

`number`

##### end

`number`

#### Returns

`Range`

***

### page()

> **page**(`contents`, `cfiBase`, `start`, `end`): [`EpubCFIPair`](EpubCFIPair.md)

#### Parameters

##### contents

[`Contents`](../classes/Contents.md) \| [`MappingContents`](MappingContents.md)

##### cfiBase

`string`

##### start

`number`

##### end

`number`

#### Returns

[`EpubCFIPair`](EpubCFIPair.md)

***

### rangeListToCfiList()

> **rangeListToCfiList**(`cfiBase`, `columns`): [`EpubCFIPair`](EpubCFIPair.md)[]

#### Parameters

##### cfiBase

`string`

##### columns

[`RangePair`](RangePair.md)[]

#### Returns

[`EpubCFIPair`](EpubCFIPair.md)[]

***

### rangePairToCfiPair()

> **rangePairToCfiPair**(`cfiBase`, `rangePair`): [`EpubCFIPair`](EpubCFIPair.md)

#### Parameters

##### cfiBase

`string`

##### rangePair

[`RangePair`](RangePair.md)

#### Returns

[`EpubCFIPair`](EpubCFIPair.md)

***

### section()

> **section**(`view`): [`EpubCFIPair`](EpubCFIPair.md)[]

#### Parameters

##### view

[`MappingView`](MappingView.md)

#### Returns

[`EpubCFIPair`](EpubCFIPair.md)[]

***

### splitTextNodeIntoRanges()

> **splitTextNodeIntoRanges**(`node`, `_splitter?`): `Range`[]

#### Parameters

##### node

`Node`

##### \_splitter?

`string`

#### Returns

`Range`[]

***

### walk()

> **walk**(`root`, `func`): `false` \| `Node` \| `Range` \| `Text`

#### Parameters

##### root

`Node`

##### func

[`MappingTextNodeWalker`](../type-aliases/MappingTextNodeWalker.md)

#### Returns

`false` \| `Node` \| `Range` \| `Text`
