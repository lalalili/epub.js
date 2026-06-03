[**epubjs**](../API.md)

***

[epubjs](../API.md) / Store

# Interface: Store

## Properties

### \_status?

> `optional` **\_status?**: (`event?`) => `void`

#### Parameters

##### event?

`Event`

#### Returns

`void`

***

### name

> **name**: `string`

***

### online

> **online**: `boolean`

***

### requester

> **requester**: [`StoreRequest`](../type-aliases/StoreRequest.md)

***

### resolver?

> `optional` **resolver?**: [`StoreResolver`](../type-aliases/StoreResolver.md)

***

### storage?

> `optional` **storage?**: [`StoreStorage`](StoreStorage.md)

***

### urlCache

> **urlCache**: `Record`\<`string`, `string`\>

## Methods

### add()

> **add**(`resources`, `force?`): `Promise`\<[`StoreData`](../type-aliases/StoreData.md)[]\>

#### Parameters

##### resources

[`StoreResources`](StoreResources.md)

##### force?

`boolean`

#### Returns

`Promise`\<[`StoreData`](../type-aliases/StoreData.md)[]\>

***

### addListeners()

> **addListeners**(): `void`

#### Returns

`void`

***

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

[`StoreUrlOptions`](StoreUrlOptions.md)

#### Returns

`Promise`\<`string`\>

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### emit()

> **emit**(`eventName`, ...`args`): `void`

#### Parameters

##### eventName

`string`

##### args

...`any`[]

#### Returns

`void`

***

### getBase64()

> **getBase64**(`url`, `mimeType?`): `Promise`\<`string` \| `ArrayBuffer`\>

#### Parameters

##### url

`string`

##### mimeType?

`string`

#### Returns

`Promise`\<`string` \| `ArrayBuffer`\>

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

> **getText**(`url`, `mimeType?`): `Promise`\<`string` \| `ArrayBuffer`\>

#### Parameters

##### url

`string`

##### mimeType?

`string`

#### Returns

`Promise`\<`string` \| `ArrayBuffer`\>

***

### handleResponse()

#### Call Signature

> **handleResponse**(`response`, `type`): `JsonValue`

##### Parameters

###### response

`string`

###### type

`"json"`

##### Returns

`JsonValue`

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

> **handleResponse**(`response`, `type?`): `RequestResponse`

##### Parameters

###### response

`RequestResponse`

###### type?

`string`

##### Returns

`RequestResponse`

***

### put()

> **put**(`url`, `withCredentials?`, `headers?`): `Promise`\<[`StoreData`](../type-aliases/StoreData.md)\>

#### Parameters

##### url

`string`

##### withCredentials?

`boolean`

##### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

#### Returns

`Promise`\<[`StoreData`](../type-aliases/StoreData.md)\>

***

### removeListeners()

> **removeListeners**(): `void`

#### Returns

`void`

***

### request()

#### Call Signature

> **request**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<`Blob`\>

##### Parameters

###### url

`string`

###### type

`"blob"`

###### withCredentials?

`boolean`

###### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

##### Returns

`Promise`\<`Blob`\>

#### Call Signature

> **request**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<`JsonValue`\>

##### Parameters

###### url

`string`

###### type

`"json"`

###### withCredentials?

`boolean`

###### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

##### Returns

`Promise`\<`JsonValue`\>

#### Call Signature

> **request**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<`Document` \| `XMLDocument`\>

##### Parameters

###### url

`string`

###### type

`"xml"` \| `"opf"` \| `"ncx"` \| `"xhtml"` \| `"html"` \| `"htm"`

###### withCredentials?

`boolean`

###### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

##### Returns

`Promise`\<`Document` \| `XMLDocument`\>

#### Call Signature

> **request**(`url`, `type?`, `withCredentials?`, `headers?`): `Promise`\<`RequestResponse`\>

##### Parameters

###### url

`string`

###### type?

`string`

###### withCredentials?

`boolean`

###### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

##### Returns

`Promise`\<`RequestResponse`\>

***

### retrieve()

#### Call Signature

> **retrieve**(`url`, `type`): `Promise`\<`Blob`\>

##### Parameters

###### url

`string`

###### type

`"blob"`

##### Returns

`Promise`\<`Blob`\>

#### Call Signature

> **retrieve**(`url`, `type`): `Promise`\<`JsonValue`\>

##### Parameters

###### url

`string`

###### type

`"json"`

##### Returns

`Promise`\<`JsonValue`\>

#### Call Signature

> **retrieve**(`url`, `type`): `Promise`\<`Document` \| `XMLDocument`\>

##### Parameters

###### url

`string`

###### type

`"xml"` \| `"opf"` \| `"ncx"` \| `"xhtml"` \| `"html"` \| `"htm"`

##### Returns

`Promise`\<`Document` \| `XMLDocument`\>

#### Call Signature

> **retrieve**(`url`, `type?`): `Promise`\<`RequestResponse`\>

##### Parameters

###### url

`string`

###### type?

`string`

##### Returns

`Promise`\<`RequestResponse`\>

***

### revokeUrl()

> **revokeUrl**(`url`): `void`

#### Parameters

##### url

`string`

#### Returns

`void`

***

### status()

> **status**(`event?`): `void`

#### Parameters

##### event?

`Event`

#### Returns

`void`
