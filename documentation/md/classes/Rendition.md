[**epubjs**](../API.md)

***

[epubjs](../API.md) / Rendition

# Class: Rendition

## Constructors

### Constructor

> **new Rendition**(`book`, `options?`): `Rendition`

#### Parameters

##### book

[`Book`](Book.md)

##### options?

[`RenditionOptions`](../interfaces/RenditionOptions.md)

#### Returns

`Rendition`

## Properties

### \_layout?

> `optional` **\_layout?**: [`Layout`](Layout.md)

***

### annotations?

> `optional` **annotations?**: [`Annotations`](../interfaces/Annotations.md)

***

### book

> **book**: [`Book`](Book.md)

***

### displaying?

> `optional` **displaying?**: [`Deferred`](../interfaces/Deferred.md)\<`any`\>

***

### epubcfi?

> `optional` **epubcfi?**: [`EpubCFI`](EpubCFI.md)

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

### location?

> `optional` **location?**: [`Location`](../interfaces/Location.md)

***

### manager?

> `optional` **manager?**: `any`

***

### q

> **q**: `Queue`

***

### settings

> **settings**: [`RenditionOptions`](../interfaces/RenditionOptions.md)

***

### started?

> `optional` **started?**: `Promise`\<`void`\>

***

### starting?

> `optional` **starting?**: [`Deferred`](../interfaces/Deferred.md)\<`void`\>

***

### themes?

> `optional` **themes?**: [`Themes`](../interfaces/Themes.md)

***

### View?

> `optional` **View?**: `any`

***

### ViewManager?

> `optional` **ViewManager?**: `any`

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

### debugVerticalRlPage()

> **debugVerticalRlPage**(): `Record`\<`string`, `any`\>

#### Returns

`Record`\<`string`, `any`\>

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### determineLayoutProperties()

> **determineLayoutProperties**(`metadata`): [`RenditionLayoutProperties`](../interfaces/RenditionLayoutProperties.md)

#### Parameters

##### metadata

`Record`\<`string`, `any`\>

#### Returns

[`RenditionLayoutProperties`](../interfaces/RenditionLayoutProperties.md)

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

> **flow**(`flow?`): `void`

#### Parameters

##### flow?

`string`

#### Returns

`void`

***

### getContents()

> **getContents**(): [`Contents`](Contents.md)[]

#### Returns

[`Contents`](Contents.md)[]

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

[`Section`](../interfaces/Section.md)

#### Returns

`void`

***

### injectScript()

> **injectScript**(`doc`, `section`): `void`

#### Parameters

##### doc

`Document`

##### section

[`Section`](../interfaces/Section.md)

#### Returns

`void`

***

### injectStylesheet()

> **injectStylesheet**(`doc`, `section`): `void`

#### Parameters

##### doc

`Document`

##### section

[`Section`](../interfaces/Section.md)

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

> **located**(`location`): [`Location`](../interfaces/Location.md)

#### Parameters

##### location

`any`[] \| [`ManagerLocationItem`](../interfaces/ManagerLocationItem.md)[]

#### Returns

[`Location`](../interfaces/Location.md)

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

### remeasure()

> **remeasure**(`options?`): `Promise`\<`any`\>

#### Parameters

##### options?

###### preserveLocation?

`boolean`

###### waitForFonts?

`boolean`

#### Returns

`Promise`\<`any`\>

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

### resolveLinkHref()

> **resolveLinkHref**(`href`, `contents?`): `string`

#### Parameters

##### href

`string`

##### contents?

###### sectionHref?

`string`

#### Returns

`string`

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

`string` \| `boolean`

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
