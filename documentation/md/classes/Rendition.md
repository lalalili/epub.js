[**epubjs**](../API.md)

***

[epubjs](../API.md) / Rendition

# Class: Rendition

## Constructors

### Constructor

> **new Rendition**(`book`, `options`): `Rendition`

#### Parameters

##### book

[`Book`](Book.md)

##### options

`RenditionOptions`

#### Returns

`Rendition`

## Properties

### annotations

> **annotations**: `Annotations`

***

### book

> **book**: [`Book`](Book.md)

***

### epubcfi

> **epubcfi**: [`EpubCFI`](EpubCFI.md)

***

### hooks

> **hooks**: `object`

#### content

> **content**: `Hook`

#### display

> **display**: `Hook`

#### layout

> **layout**: `Hook`

#### render

> **render**: `Hook`

#### serialize

> **serialize**: `Hook`

#### show

> **show**: `Hook`

#### unloaded

> **unloaded**: `Hook`

***

### location

> **location**: [`Location`](../interfaces/Location.md)

***

### q

> **q**: `Queue`

***

### settings

> **settings**: `RenditionOptions`

***

### started

> **started**: `Promise`\<`void`\>

***

### themes

> **themes**: `Themes`

## Methods

### adjustImages()

> **adjustImages**(`contents`): `Promise`\<`void`\>

#### Parameters

##### contents

[`Contents`](Contents.md)

#### Returns

`Promise`\<`void`\>

***

### attachTo()

> **attachTo**(`element`): `Promise`\<`void`\>

#### Parameters

##### element

`string` \| `Element`

#### Returns

`Promise`\<`void`\>

***

### clear()

> **clear**(): `void`

#### Returns

`void`

***

### currentLocation()

> **currentLocation**(): [`Location`](../interfaces/Location.md) \| `Promise`\<[`Location`](../interfaces/Location.md)\>

#### Returns

[`Location`](../interfaces/Location.md) \| `Promise`\<[`Location`](../interfaces/Location.md)\>

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### determineLayoutProperties()

> **determineLayoutProperties**(`metadata`): `object`

#### Parameters

##### metadata

`object`

#### Returns

`object`

***

### direction()

> **direction**(`dir`): `void`

#### Parameters

##### dir

`string`

#### Returns

`void`

***

### display()

#### Call Signature

> **display**(`target?`): `Promise`\<`void`\>

##### Parameters

###### target?

`string`

##### Returns

`Promise`\<`void`\>

#### Call Signature

> **display**(`target?`): `Promise`\<`void`\>

##### Parameters

###### target?

`number`

##### Returns

`Promise`\<`void`\>

***

### emit()

> **emit**(`type`, ...`args`): `void`

#### Parameters

##### type

`any`

##### args

...`any`[]

#### Returns

`void`

***

### flow()

> **flow**(`flow`): `void`

#### Parameters

##### flow

`string`

#### Returns

`void`

***

### getContents()

> **getContents**(): [`Contents`](Contents.md)

#### Returns

[`Contents`](Contents.md)

***

### getRange()

> **getRange**(`cfi`, `ignoreClass?`): `Range`

#### Parameters

##### cfi

`string`

##### ignoreClass?

`string`

#### Returns

`Range`

***

### handleLinks()

> **handleLinks**(`contents`): `void`

#### Parameters

##### contents

[`Contents`](Contents.md)

#### Returns

`void`

***

### injectIdentifier()

> **injectIdentifier**(`doc`, `section`): `void`

#### Parameters

##### doc

`Document`

##### section

`Section`

#### Returns

`void`

***

### injectScript()

> **injectScript**(`doc`, `section`): `void`

#### Parameters

##### doc

`Document`

##### section

`Section`

#### Returns

`void`

***

### injectStylesheet()

> **injectStylesheet**(`doc`, `section`): `void`

#### Parameters

##### doc

`Document`

##### section

`Section`

#### Returns

`void`

***

### layout()

> **layout**(`settings`): `any`

#### Parameters

##### settings

`any`

#### Returns

`any`

***

### located()

> **located**(`location`): `DisplayedLocation`

#### Parameters

##### location

[`Location`](../interfaces/Location.md)

#### Returns

`DisplayedLocation`

***

### moveTo()

> **moveTo**(`offset`): `void`

#### Parameters

##### offset

`number`

#### Returns

`void`

***

### next()

> **next**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### off()

> **off**(`type`, `listener`): `any`

#### Parameters

##### type

`any`

##### listener

`any`

#### Returns

`any`

***

### on()

> **on**(`type`, `listener`): `any`

#### Parameters

##### type

`any`

##### listener

`any`

#### Returns

`any`

***

### once()

> **once**(`type`, `listener`, ...`args`): `any`

#### Parameters

##### type

`any`

##### listener

`any`

##### args

...`any`[]

#### Returns

`any`

***

### onOrientationChange()

> **onOrientationChange**(`orientation`): `void`

#### Parameters

##### orientation

`string`

#### Returns

`void`

***

### passEvents()

> **passEvents**(`contents`): `void`

#### Parameters

##### contents

[`Contents`](Contents.md)

#### Returns

`void`

***

### prev()

> **prev**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### reportLocation()

> **reportLocation**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

***

### requireManager()

> **requireManager**(`manager`): `any`

#### Parameters

##### manager

`string` \| `object` \| `Function`

#### Returns

`any`

***

### requireView()

> **requireView**(`view`): `any`

#### Parameters

##### view

`string` \| `object` \| `Function`

#### Returns

`any`

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

### setManager()

> **setManager**(`manager`): `void`

#### Parameters

##### manager

`Function`

#### Returns

`void`

***

### spread()

> **spread**(`spread`, `min?`): `void`

#### Parameters

##### spread

`string`

##### min?

`number`

#### Returns

`void`

***

### start()

> **start**(): `void`

#### Returns

`void`

***

### views()

> **views**(): `View`[]

#### Returns

`View`[]
