[**epubjs**](../API.md)

***

[epubjs](../API.md) / RenditionManager

# Interface: RenditionManager

## Properties

### \_layoutDirty?

> `optional` **\_layoutDirty?**: `boolean`

***

### container?

> `optional` **container?**: `HTMLElement`

***

### layout?

> `optional` **layout?**: [`Layout`](../classes/Layout.md)

***

### views?

> `optional` **views?**: [`RenditionViewsBridge`](../type-aliases/RenditionViewsBridge.md)

## Methods

### applyLayout()

> **applyLayout**(`layout`): `void`

#### Parameters

##### layout

[`Layout`](../classes/Layout.md)

#### Returns

`void`

***

### clear()

> **clear**(): `void`

#### Returns

`void`

***

### createSemanticWindowDescriptor()?

> `optional` **createSemanticWindowDescriptor**(`location`, `sourceIdentity`): `Record`\<`string`, `unknown`\>

#### Parameters

##### location

[`ManagerLocationItem`](ManagerLocationItem.md)

##### sourceIdentity

###### publicationIdentifier

`string`

###### publicationModified

`string`

#### Returns

`Record`\<`string`, `unknown`\>

***

### currentLocation()

> **currentLocation**(): [`ManagerLocationItem`](ManagerLocationItem.md)[] \| `Promise`\<[`ManagerLocationItem`](ManagerLocationItem.md)[]\>

#### Returns

[`ManagerLocationItem`](ManagerLocationItem.md)[] \| `Promise`\<[`ManagerLocationItem`](ManagerLocationItem.md)[]\>

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### direction()

> **direction**(`dir?`): `void`

#### Parameters

##### dir?

`string`

#### Returns

`void`

***

### display()

> **display**(`section`, `target?`, `options?`): `Promise`\<`void`\>

#### Parameters

##### section

[`Section`](Section.md)

##### target?

`string` \| `number`

##### options?

###### persistResourceCorrelation?

`unknown`

#### Returns

`Promise`\<`void`\>

***

### getContents()

> **getContents**(): [`Contents`](../classes/Contents.md)[]

#### Returns

[`Contents`](../classes/Contents.md)[]

***

### getCurrentPageIndex()?

> `optional` **getCurrentPageIndex**(): `number`

#### Returns

`number`

***

### getNormalizedLogicalScrollLeft()?

> `optional` **getNormalizedLogicalScrollLeft**(): `number`

#### Returns

`number`

***

### getPageAdvance()?

> `optional` **getPageAdvance**(): `number`

#### Returns

`number`

***

### getTotalPagesForCurrentView()?

> `optional` **getTotalPagesForCurrentView**(): `number`

#### Returns

`number`

***

### isRendered()

> **isRendered**(): `boolean`

#### Returns

`boolean`

***

### moveTo()

> **moveTo**(`offset`): `void`

#### Parameters

##### offset

`object`

#### Returns

`void`

***

### next()

> **next**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### on()

> **on**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### prev()

> **prev**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### render()

> **render**(`element`, `size?`): `void`

#### Parameters

##### element

`Element`

##### size?

###### height

`string` \| `number`

###### width

`string` \| `number`

#### Returns

`void`

***

### resize()

> **resize**(`width?`, `height?`, `epubcfi?`): `void`

#### Parameters

##### width?

`string` \| `number`

##### height?

`string` \| `number`

##### epubcfi?

`string`

#### Returns

`void`

***

### resizeView()?

> `optional` **resizeView**(`view`): `void`

#### Parameters

##### view

`View`

#### Returns

`void`

***

### restoreSemanticWindowDescriptor()?

> `optional` **restoreSemanticWindowDescriptor**(`descriptor`, `sourceIdentity`, `context?`): `object`

#### Parameters

##### descriptor

`Record`\<`string`, `unknown`\>

##### sourceIdentity

###### publicationIdentifier

`string`

###### publicationModified

`string`

##### context?

###### restoreInvocationId?

`string`

###### semanticWindowDescriptorFingerprint?

`string`

#### Returns

`object`

##### reason

> **reason**: `string`

##### status

> **status**: `string`

***

### updateFlow()

> **updateFlow**(`flow`): `void`

#### Parameters

##### flow

`string`

#### Returns

`void`

***

### updateLayout()

> **updateLayout**(): `void`

#### Returns

`void`

***

### visible()

> **visible**(): `View`[]

#### Returns

`View`[]
