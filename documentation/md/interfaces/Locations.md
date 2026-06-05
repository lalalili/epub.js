[**epubjs**](../API.md)

***

[epubjs](../API.md) / Locations

# Interface: Locations

## Properties

### \_current?

> `optional` **\_current?**: `number`

***

### \_currentCfi?

> `optional` **\_currentCfi?**: `string`

***

### \_locations?

> `optional` **\_locations?**: `string`[]

***

### \_locationsWords?

> `optional` **\_locationsWords?**: [`WordLocation`](WordLocation.md)[]

***

### \_wordCounter?

> `optional` **\_wordCounter?**: `number`

***

### break?

> `optional` **break?**: `number`

***

### epubcfi?

> `optional` **epubcfi?**: [`EpubCFI`](../classes/EpubCFI.md)

***

### pause?

> `optional` **pause?**: `number`

***

### processingTimeout?

> `optional` **processingTimeout?**: `number`

***

### q?

> `optional` **q?**: [`Queue`](Queue.md)

***

### request?

> `optional` **request?**: [`LocationsRequest`](../type-aliases/LocationsRequest.md)

***

### spine?

> `optional` **spine?**: [`Spine`](Spine.md)

***

### total?

> `optional` **total?**: `number`

## Accessors

### currentLocation

#### Get Signature

> **get** **currentLocation**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **currentLocation**(`curr`): `void`

##### Parameters

###### curr

`string` \| `number`

##### Returns

`void`

## Methods

### cfiFromLocation()

> **cfiFromLocation**(`loc`): `string` \| `number`

#### Parameters

##### loc

`string` \| `number`

#### Returns

`string` \| `number`

***

### cfiFromPercentage()

> **cfiFromPercentage**(`percentage`): `string` \| `number`

#### Parameters

##### percentage

`number`

#### Returns

`string` \| `number`

***

### countWords()

> **countWords**(`s`): `number`

#### Parameters

##### s

`string`

#### Returns

`number`

***

### createRange()

> **createRange**(): [`LocationRange`](LocationRange.md)

#### Returns

[`LocationRange`](LocationRange.md)

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### emit()

> **emit**(`eventName`, `data?`): `void`

#### Parameters

##### eventName

`string`

##### data?

`unknown`

#### Returns

`void`

***

### fallbackCfi()

> **fallbackCfi**(`body`, `cfiBase`): `string`

#### Parameters

##### body

`Element`

##### cfiBase

`string`

#### Returns

`string`

***

### generate()

> **generate**(`chars?`): `Promise`\<`string`[]\>

#### Parameters

##### chars?

`number`

#### Returns

`Promise`\<`string`[]\>

***

### generateForSection()

> **generateForSection**(`section?`, `chars?`): `Promise`\<`string`[]\>

#### Parameters

##### section?

[`Section`](Section.md)

##### chars?

`number`

#### Returns

`Promise`\<`string`[]\>

***

### generateFromWords()

> **generateFromWords**(`startCfi?`, `wordCount?`, `count?`): `Promise`\<[`WordLocation`](WordLocation.md)[]\>

#### Parameters

##### startCfi?

`string`

##### wordCount?

`number`

##### count?

`number`

#### Returns

`Promise`\<[`WordLocation`](WordLocation.md)[]\>

***

### getCurrent()

> **getCurrent**(): `number`

#### Returns

`number`

***

### length()

> **length**(): `number`

#### Returns

`number`

***

### load()

> **load**(`locations`): `string`[]

#### Parameters

##### locations

`string` \| `string`[]

#### Returns

`string`[]

***

### locationFromCfi()

> **locationFromCfi**(`cfi`): `number`

#### Parameters

##### cfi

[`LocationInput`](../type-aliases/LocationInput.md)

#### Returns

`number`

***

### off()

> **off**(`eventName`, `listener`): `unknown`

#### Parameters

##### eventName

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### on()

> **on**(`eventName`, `listener`): `unknown`

#### Parameters

##### eventName

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### once()

> **once**(`eventName`, `listener`): `unknown`

#### Parameters

##### eventName

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### parse()

> **parse**(`contents`, `cfiBase`, `chars?`): `string`[]

#### Parameters

##### contents

`Element`

##### cfiBase

`string`

##### chars?

`number`

#### Returns

`string`[]

***

### parseWords()

> **parseWords**(`contents`, `section`, `wordCount`, `startCfi?`): [`WordLocation`](WordLocation.md)[]

#### Parameters

##### contents

`Element`

##### section

[`Section`](Section.md)

##### wordCount

`number`

##### startCfi?

[`EpubCFI`](../classes/EpubCFI.md)

#### Returns

[`WordLocation`](WordLocation.md)[]

***

### percentageFromCfi()

> **percentageFromCfi**(`cfi`): `number`

#### Parameters

##### cfi

[`LocationInput`](../type-aliases/LocationInput.md)

#### Returns

`number`

***

### percentageFromLocation()

> **percentageFromLocation**(`loc`): `number`

#### Parameters

##### loc

`number`

#### Returns

`number`

***

### process()

> **process**(`section`): `Promise`\<`string`[]\>

#### Parameters

##### section

[`Section`](Section.md)

#### Returns

`Promise`\<`string`[]\>

***

### processWords()

> **processWords**(`section`, `wordCount`, `startCfi?`, `count?`): `Promise`\<`void` \| [`WordLocation`](WordLocation.md)[]\>

#### Parameters

##### section

[`Section`](Section.md)

##### wordCount

`number`

##### startCfi?

[`EpubCFI`](../classes/EpubCFI.md)

##### count?

`number`

#### Returns

`Promise`\<`void` \| [`WordLocation`](WordLocation.md)[]\>

***

### save()

> **save**(): `string`

#### Returns

`string`

***

### setCurrent()

> **setCurrent**(`curr`): `void`

#### Parameters

##### curr

`string` \| `number`

#### Returns

`void`
