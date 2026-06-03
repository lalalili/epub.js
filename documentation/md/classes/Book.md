[**epubjs**](../API.md)

***

[epubjs](../API.md) / Book

# Class: Book

## Constructors

### Constructor

> **new Book**(`url?`, `options?`): `Book`

#### Parameters

##### url?

`string` \| `ArrayBuffer` \| `Blob`

##### options?

`BookOptions`

#### Returns

`Book`

### Constructor

> **new Book**(`options?`): `Book`

#### Parameters

##### options?

`BookOptions`

#### Returns

`Book`

## Properties

### archive?

> `optional` **archive?**: `Archive`

***

### archived

> **archived**: `boolean`

***

### container?

> `optional` **container?**: `Container`

***

### isOpen

> **isOpen**: `boolean`

***

### loaded

> **loaded**: `object`

#### cover

> **cover**: `Promise`\<`string`\>

#### displayOptions

> **displayOptions**: `Promise`\<`DisplayOptions`\>

#### manifest

> **manifest**: `Promise`\<`PackagingManifestObject`\>

#### metadata

> **metadata**: `Promise`\<`PackagingMetadataObject`\>

#### navigation

> **navigation**: `Promise`\<`Navigation`\>

#### pageList

> **pageList**: `Promise`\<`PageListItem`[]\>

#### resources

> **resources**: `Promise`\<`string`[]\>

#### spine

> **spine**: `Promise`\<`SpineItem`[]\>

***

### locations

> **locations**: `Locations`

***

### navigation?

> `optional` **navigation?**: `Navigation`

***

### opened

> **opened**: `Promise`\<`Book`\>

***

### opening

> **opening**: `any`

***

### packaging?

> `optional` **packaging?**: `Packaging`

***

### pageList?

> `optional` **pageList?**: `PageList`

***

### path?

> `optional` **path?**: `Path`

***

### ready

> **ready**: `Promise`\<`void`\>

***

### rendition?

> `optional` **rendition?**: [`Rendition`](Rendition.md)

***

### request

> **request**: `RequestMethod`

***

### resources?

> `optional` **resources?**: `Resources`

***

### settings

> **settings**: `BookOptions`

***

### spine

> **spine**: `Spine`

***

### storage?

> `optional` **storage?**: `Store`

***

### url?

> `optional` **url?**: `Url`

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

`string` \| `ArrayBuffer` \| `Blob`

#### Returns

`string`

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

> **load**(`path`, `type?`): `Promise`\<`RequestResponse`\>

#### Parameters

##### path

`string`

##### type?

`string`

#### Returns

`Promise`\<`RequestResponse`\>

***

### loadNavigation()

> **loadNavigation**(`packaging`): `Promise`\<`Navigation`\>

#### Parameters

##### packaging

`Packaging`

#### Returns

`Promise`\<`Navigation`\>

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

`string` \| `ArrayBuffer` \| `Blob`

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

`RenditionOptions`

##### Returns

[`Rendition`](Rendition.md)

#### Call Signature

> **renderTo**(`element`, `options?`): [`Rendition`](Rendition.md)

##### Parameters

###### element

`string`

###### options?

`RenditionOptions`

##### Returns

[`Rendition`](Rendition.md)

***

### resolve()

> **resolve**(`path`, `absolute?`): `string`

#### Parameters

##### path

`string`

##### absolute?

`boolean`

#### Returns

`string`

***

### section()

#### Call Signature

> **section**(`target`): `Section`

##### Parameters

###### target

`string`

##### Returns

`Section`

#### Call Signature

> **section**(`target`): `Section`

##### Parameters

###### target

`number`

##### Returns

`Section`

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

`RequestHeaders`

#### Returns

`void`

***

### store()

> **store**(`name`): `Store`

#### Parameters

##### name

`string`

#### Returns

`Store`

***

### unarchive()

> **unarchive**(`input`, `encoding?`): `Promise`\<`Archive`\>

#### Parameters

##### input

`BinaryType`

##### encoding?

`string`

#### Returns

`Promise`\<`Archive`\>

***

### unpack()

> **unpack**(`packaging`): `void`

#### Parameters

##### packaging

`Packaging`

#### Returns

`void`
