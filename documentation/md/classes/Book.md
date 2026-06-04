[**epubjs**](../API.md)

***

[epubjs](../API.md) / Book

# Class: Book

## Constructors

### Constructor

> **new Book**(`url?`, `options?`): `Book`

#### Parameters

##### url?

[`BookInput`](../type-aliases/BookInput.md)

##### options?

[`BookOptions`](../interfaces/BookOptions.md)

#### Returns

`Book`

### Constructor

> **new Book**(`options?`): `Book`

#### Parameters

##### options?

[`BookOptions`](../interfaces/BookOptions.md)

#### Returns

`Book`

## Properties

### archive?

> `optional` **archive?**: [`Archive`](../interfaces/Archive.md)

***

### archived

> **archived**: `boolean`

***

### container?

> `optional` **container?**: [`Container`](../interfaces/Container.md)

***

### cover?

> `optional` **cover?**: `string`

***

### displayOptions?

> `optional` **displayOptions?**: [`DisplayOptions`](../interfaces/DisplayOptions.md)

***

### isOpen

> **isOpen**: `boolean`

***

### isRendered

> **isRendered**: `boolean`

***

### loaded?

> `optional` **loaded?**: [`BookLoaded`](../interfaces/BookLoaded.md)

***

### loading?

> `optional` **loading?**: [`BookLoading`](../interfaces/BookLoading.md)

***

### locations?

> `optional` **locations?**: [`Locations`](../interfaces/Locations.md)

***

### navigation?

> `optional` **navigation?**: [`Navigation`](../interfaces/Navigation.md)

***

### opened?

> `optional` **opened?**: `Promise`\<`Book`\>

***

### opening?

> `optional` **opening?**: [`Deferred`](../interfaces/Deferred.md)\<`Book`\>

***

### package?

> `optional` **package?**: [`Packaging`](../interfaces/Packaging.md)

***

### packaging?

> `optional` **packaging?**: [`Packaging`](../interfaces/Packaging.md)

***

### pageList?

> `optional` **pageList?**: [`PageList`](../interfaces/PageList.md)

***

### path?

> `optional` **path?**: [`Path`](../interfaces/Path.md)

***

### ready?

> `optional` **ready?**: `Promise`\<`any`[]\>

***

### rendition?

> `optional` **rendition?**: [`Rendition`](Rendition.md)

***

### request

> **request**: [`RequestMethod`](../interfaces/RequestMethod.md)

***

### resources?

> `optional` **resources?**: [`Resources`](../interfaces/Resources.md)

***

### settings

> **settings**: [`BookOptions`](../interfaces/BookOptions.md)

***

### spine?

> `optional` **spine?**: [`Spine`](../interfaces/Spine.md)

***

### storage?

> `optional` **storage?**: [`Store`](../interfaces/Store.md)

***

### url?

> `optional` **url?**: [`Url`](../interfaces/Url.md)

## Methods

### canonical()

> **canonical**(`path`): `string`

#### Parameters

##### path

`string`

#### Returns

`string`

***

### coverUrl()

> **coverUrl**(): `Promise`\<`string`\>

#### Returns

`Promise`\<`string`\>

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### determineType()

> **determineType**(`input`): `string`

#### Parameters

##### input

[`BookInput`](../type-aliases/BookInput.md)

#### Returns

`string`

***

### emit()

> **emit**(`type`, ...`args`): `void`

#### Parameters

##### type

`string`

##### args

...`any`[]

#### Returns

`void`

***

### getRange()

> **getRange**(`cfiRange`): `Promise`\<`Range`\>

#### Parameters

##### cfiRange

`string`

#### Returns

`Promise`\<`Range`\>

***

### key()

> **key**(`identifier?`): `string`

#### Parameters

##### identifier?

`string`

#### Returns

`string`

***

### load()

#### Call Signature

> **load**(`path`, `type`): `Promise`\<`ArrayBuffer`\>

##### Parameters

###### path

`string`

###### type

`"binary"`

##### Returns

`Promise`\<`ArrayBuffer`\>

#### Call Signature

> **load**(`path`, `type`): `Promise`\<`Blob`\>

##### Parameters

###### path

`string`

###### type

`"blob"`

##### Returns

`Promise`\<`Blob`\>

#### Call Signature

> **load**(`path`, `type`): `Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

##### Parameters

###### path

`string`

###### type

`"json"`

##### Returns

`Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

#### Call Signature

> **load**(`path`, `type`): `Promise`\<`Document` \| `XMLDocument`\>

##### Parameters

###### path

`string`

###### type

`"xml"` \| `"opf"` \| `"ncx"` \| `"xhtml"` \| `"html"` \| `"htm"`

##### Returns

`Promise`\<`Document` \| `XMLDocument`\>

#### Call Signature

> **load**(`path`, `type?`): `Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

##### Parameters

###### path

`string`

###### type?

`string`

##### Returns

`Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

***

### loadNavigation()

> **loadNavigation**(`packaging`): `Promise`\<[`Navigation`](../interfaces/Navigation.md)\>

#### Parameters

##### packaging

[`Packaging`](../interfaces/Packaging.md)

#### Returns

`Promise`\<[`Navigation`](../interfaces/Navigation.md)\>

***

### off()

> **off**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

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

### once()

> **once**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### open()

#### Call Signature

> **open**(`input`, `what?`): `Promise`\<`Book`\>

##### Parameters

###### input

`string`

###### what?

`string`

##### Returns

`Promise`\<`Book`\>

#### Call Signature

> **open**(`input`, `what?`): `Promise`\<`Book`\>

##### Parameters

###### input

`ArrayBuffer` \| `Blob`

###### what?

`string`

##### Returns

`Promise`\<`Book`\>

***

### openContainer()

> **openContainer**(`url`): `Promise`\<`string`\>

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`string`\>

***

### openEpub()

> **openEpub**(`data`, `encoding?`): `Promise`\<`Book`\>

#### Parameters

##### data

[`BookInput`](../type-aliases/BookInput.md)

##### encoding?

`string`

#### Returns

`Promise`\<`Book`\>

***

### openManifest()

> **openManifest**(`url`): `Promise`\<`Book`\>

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`Book`\>

***

### openPackaging()

> **openPackaging**(`url`): `Promise`\<`Book`\>

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`Book`\>

***

### renderTo()

#### Call Signature

> **renderTo**(`element`, `options?`): [`Rendition`](Rendition.md)

##### Parameters

###### element

`Element`

###### options?

[`RenditionOptions`](../interfaces/RenditionOptions.md)

##### Returns

[`Rendition`](Rendition.md)

#### Call Signature

> **renderTo**(`element`, `options?`): [`Rendition`](Rendition.md)

##### Parameters

###### element

`string`

###### options?

[`RenditionOptions`](../interfaces/RenditionOptions.md)

##### Returns

[`Rendition`](Rendition.md)

***

### resolve()

> **resolve**(`path?`, `absolute?`): `string`

#### Parameters

##### path?

`string` \| `false`

##### absolute?

`boolean`

#### Returns

`string`

***

### section()

#### Call Signature

> **section**(`target`): [`Section`](../interfaces/Section.md)

##### Parameters

###### target

`string`

##### Returns

[`Section`](../interfaces/Section.md)

#### Call Signature

> **section**(`target`): [`Section`](../interfaces/Section.md)

##### Parameters

###### target

`number`

##### Returns

[`Section`](../interfaces/Section.md)

***

### setRequestCredentials()

> **setRequestCredentials**(`credentials`): `void`

#### Parameters

##### credentials

`boolean`

#### Returns

`void`

***

### setRequestHeaders()

> **setRequestHeaders**(`headers`): `void`

#### Parameters

##### headers

[`RequestHeaders`](../type-aliases/RequestHeaders.md)

#### Returns

`void`

***

### store()

> **store**(`name`): [`Store`](../interfaces/Store.md)

#### Parameters

##### name

`string`

#### Returns

[`Store`](../interfaces/Store.md)

***

### unarchive()

> **unarchive**(`input`, `encoding?`): `Promise`\<[`ArchiveZip`](../interfaces/ArchiveZip.md)\>

#### Parameters

##### input

[`BookInput`](../type-aliases/BookInput.md)

##### encoding?

`string`

#### Returns

`Promise`\<[`ArchiveZip`](../interfaces/ArchiveZip.md)\>

***

### unpack()

> **unpack**(`packaging`): `void`

#### Parameters

##### packaging

[`Packaging`](../interfaces/Packaging.md)

#### Returns

`void`
