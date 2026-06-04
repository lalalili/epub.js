[**epubjs**](../API.md)

***

[epubjs](../API.md) / Queue

# Interface: Queue

## Properties

### \_q

> **\_q**: [`QueuedItem`](QueuedItem.md)[]

***

### context

> **context**: `unknown`

***

### defered

> **defered**: [`Deferred`](Deferred.md)\<`unknown`\>

***

### paused

> **paused**: `boolean`

***

### running

> **running**: `boolean` \| `Promise`\<`unknown`\>

***

### tick

> **tick**: `AnimationFrameScheduler`

## Methods

### clear()

> **clear**(): `void`

#### Returns

`void`

***

### dequeue()

> **dequeue**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

***

### dump()

> **dump**(): `void`

#### Returns

`void`

***

### enqueue()

> **enqueue**(...`items`): `Promise`\<`unknown`\>

#### Parameters

##### items

...`unknown`[]

#### Returns

`Promise`\<`unknown`\>

***

### flush()

> **flush**(): `boolean` \| `Promise`\<`unknown`\>

#### Returns

`boolean` \| `Promise`\<`unknown`\>

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

> **run**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

***

### stop()

> **stop**(): `void`

#### Returns

`void`
