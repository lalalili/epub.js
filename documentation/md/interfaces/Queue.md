[**epubjs**](../API.md)

***

[epubjs](../API.md) / Queue

# Interface: Queue

## Properties

### \_q

> **\_q**: [`QueuedItem`](QueuedItem.md)[]

***

### context

> **context**: `any`

***

### defered

> **defered**: [`Deferred`](Deferred.md)\<`any`\>

***

### paused

> **paused**: `boolean`

***

### running

> **running**: `boolean` \| `Promise`\<`any`\>

***

### tick

> **tick**: `any`

## Methods

### clear()

> **clear**(): `void`

#### Returns

`void`

***

### dequeue()

> **dequeue**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

***

### dump()

> **dump**(): `void`

#### Returns

`void`

***

### enqueue()

> **enqueue**(...`items`): `Promise`\<`any`\>

#### Parameters

##### items

...`any`[]

#### Returns

`Promise`\<`any`\>

***

### flush()

> **flush**(): `boolean` \| `Promise`\<`any`\>

#### Returns

`boolean` \| `Promise`\<`any`\>

***

### length()

> **length**(): `number`

#### Returns

`number`

***

### pause()

> **pause**(): `void`

#### Returns

`void`

***

### run()

> **run**(): `Promise`\<`any`\>

#### Returns

`Promise`\<`any`\>

***

### stop()

> **stop**(): `void`

#### Returns

`void`
