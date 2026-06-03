[**epubjs**](../API.md)

***

[epubjs](../API.md) / Section

# Interface: Section

## Properties

### canonical?

> `optional` **canonical?**: `string`

***

### cfiBase?

> `optional` **cfiBase?**: `string`

***

### contents?

> `optional` **contents?**: `Element`

***

### document?

> `optional` **document?**: `Document`

***

### fallback?

> `optional` **fallback?**: `string`

***

### fallbackChain?

> `optional` **fallbackChain?**: `string`[]

***

### hooks?

> `optional` **hooks?**: [`SectionHookSet`](SectionHookSet.md)

***

### href?

> `optional` **href?**: `string`

***

### idref?

> `optional` **idref?**: `string`

***

### index?

> `optional` **index?**: `number`

***

### linear?

> `optional` **linear?**: `boolean`

***

### mediaType?

> `optional` **mediaType?**: `string`

***

### next?

> `optional` **next?**: () => `Section` \| [`SpineItem`](SpineItem.md)

#### Returns

`Section` \| [`SpineItem`](SpineItem.md)

***

### originalHref?

> `optional` **originalHref?**: `string`

***

### originalMediaType?

> `optional` **originalMediaType?**: `string`

***

### output?

> `optional` **output?**: `string`

***

### prev?

> `optional` **prev?**: () => `Section` \| [`SpineItem`](SpineItem.md)

#### Returns

`Section` \| [`SpineItem`](SpineItem.md)

***

### properties?

> `optional` **properties?**: `string`[]

***

### request?

> `optional` **request?**: [`SectionRequest`](../type-aliases/SectionRequest.md)

***

### url?

> `optional` **url?**: `string`

## Methods

### cfiFromElement()

> **cfiFromElement**(`el`): `string`

#### Parameters

##### el

`Element`

#### Returns

`string`

***

### cfiFromRange()

> **cfiFromRange**(`_range`): `string`

#### Parameters

##### \_range

`Range`

#### Returns

`string`

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### find()

> **find**(`_query`): [`SectionSearchResult`](SectionSearchResult.md)[]

#### Parameters

##### \_query

`string`

#### Returns

[`SectionSearchResult`](SectionSearchResult.md)[]

***

### load()

> **load**(`_request?`): `Promise`\<`Element`\>

#### Parameters

##### \_request?

[`SectionRequest`](../type-aliases/SectionRequest.md)

#### Returns

`Promise`\<`Element`\>

***

### reconcileLayoutSettings()

> **reconcileLayoutSettings**(`globalLayout`): [`SectionLayoutSettings`](SectionLayoutSettings.md)

#### Parameters

##### globalLayout

[`GlobalLayout`](GlobalLayout.md)

#### Returns

[`SectionLayoutSettings`](SectionLayoutSettings.md)

***

### render()

> **render**(`_request?`): `Promise`\<`string`\>

#### Parameters

##### \_request?

[`SectionRequest`](../type-aliases/SectionRequest.md)

#### Returns

`Promise`\<`string`\>

***

### search()

> **search**(`_query`, `maxSeqEle?`): [`SectionSearchResult`](SectionSearchResult.md)[]

#### Parameters

##### \_query

`string`

##### maxSeqEle?

`number`

#### Returns

[`SectionSearchResult`](SectionSearchResult.md)[]

***

### unload()

> **unload**(): `void`

#### Returns

`void`
