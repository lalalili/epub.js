[**epubjs**](../API.md)

***

[epubjs](../API.md) / Deferred

# Interface: Deferred\<T\>

## Type Parameters

### T

`T` = `unknown`

## Properties

### id

> **id**: `string`

***

### promise

> **promise**: `Promise`\<`T`\>

***

### reject

> **reject**: (`reason?`) => `void`

#### Parameters

##### reason?

`unknown`

#### Returns

`void`

***

### resolve

> **resolve**: (`value`) => `void`

#### Parameters

##### value

`T` \| `PromiseLike`\<`T`\>

#### Returns

`void`
