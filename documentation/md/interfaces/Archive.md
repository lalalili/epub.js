[**epubjs**](../API.md)

***

[epubjs](../API.md) / Archive

# Interface: Archive

## Properties

### urlCache

> **urlCache**: `Record`\<`string`, `string`\>

***

### zip?

> `optional` **zip?**: [`ArchiveZip`](ArchiveZip.md)

## Methods

### checkRequirements()

> **checkRequirements**(): `void`

#### Returns

`void`

***

### createUrl()

> **createUrl**(`url`, `options?`): `Promise`\<`string`\>

#### Parameters

##### url

`string`

##### options?

[`ArchiveUrlOptions`](ArchiveUrlOptions.md)

#### Returns

`Promise`\<`string`\>

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### getBase64()

> **getBase64**(`url`, `mimeType?`): `Promise`\<`string`\>

#### Parameters

##### url

`string`

##### mimeType?

`string`

#### Returns

`Promise`\<`string`\>

***

### getBlob()

> **getBlob**(`url`, `mimeType?`): `Promise`\<`Blob`\>

#### Parameters

##### url

`string`

##### mimeType?

`string`

#### Returns

`Promise`\<`Blob`\>

***

### getText()

> **getText**(`url`, `encoding?`): `Promise`\<`string`\>

#### Parameters

##### url

`string`

##### encoding?

`string`

#### Returns

`Promise`\<`string`\>

***

### handleResponse()

#### Call Signature

> **handleResponse**(`response`, `type`): [`JsonValue`](../type-aliases/JsonValue.md)

##### Parameters

###### response

`string`

###### type

`"json"`

##### Returns

[`JsonValue`](../type-aliases/JsonValue.md)

#### Call Signature

> **handleResponse**(`response`, `type`): `Document` \| `XMLDocument`

##### Parameters

###### response

`string`

###### type

`"xml"` \| `"opf"` \| `"ncx"` \| `"xhtml"` \| `"html"` \| `"htm"`

##### Returns

`Document` \| `XMLDocument`

#### Call Signature

> **handleResponse**(`response`, `type?`): [`RequestResponse`](../type-aliases/RequestResponse.md)

##### Parameters

###### response

[`RequestResponse`](../type-aliases/RequestResponse.md)

###### type?

`string`

##### Returns

[`RequestResponse`](../type-aliases/RequestResponse.md)

***

### open()

> **open**(`input`, `isBase64?`): `Promise`\<[`ArchiveZip`](ArchiveZip.md)\>

#### Parameters

##### input

[`ArchiveInput`](../type-aliases/ArchiveInput.md)

##### isBase64?

`boolean`

#### Returns

`Promise`\<[`ArchiveZip`](ArchiveZip.md)\>

***

### openUrl()

> **openUrl**(`zipUrl`, `isBase64?`): `Promise`\<[`ArchiveZip`](ArchiveZip.md)\>

#### Parameters

##### zipUrl

`string`

##### isBase64?

`boolean`

#### Returns

`Promise`\<[`ArchiveZip`](ArchiveZip.md)\>

***

### request()

#### Call Signature

> **request**(`url`, `type`): `Promise`\<`Blob`\>

##### Parameters

###### url

`string`

###### type

`"blob"`

##### Returns

`Promise`\<`Blob`\>

#### Call Signature

> **request**(`url`, `type`): `Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

##### Parameters

###### url

`string`

###### type

`"json"`

##### Returns

`Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

#### Call Signature

> **request**(`url`, `type`): `Promise`\<`Document` \| `XMLDocument`\>

##### Parameters

###### url

`string`

###### type

`"xml"` \| `"opf"` \| `"ncx"` \| `"xhtml"` \| `"html"` \| `"htm"`

##### Returns

`Promise`\<`Document` \| `XMLDocument`\>

#### Call Signature

> **request**(`url`, `type?`): `Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

##### Parameters

###### url

`string`

###### type?

`string`

##### Returns

`Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

***

### revokeUrl()

> **revokeUrl**(`url`): `void`

#### Parameters

##### url

`string`

#### Returns

`void`
