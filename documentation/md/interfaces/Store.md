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

> **requester**: [`StoreRequest`](StoreRequest.md)

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

[`StoreMarkupRequestType`](../type-aliases/StoreMarkupRequestType.md)

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

> **request**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

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

`Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

#### Call Signature

> **request**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<`Document` \| `XMLDocument`\>

##### Parameters

###### url

`string`

###### type

[`StoreMarkupRequestType`](../type-aliases/StoreMarkupRequestType.md)

###### withCredentials?

`boolean`

###### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

##### Returns

`Promise`\<`Document` \| `XMLDocument`\>

#### Call Signature

> **request**(`url`, `type?`, `withCredentials?`, `headers?`): `Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

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

`Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

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

> **retrieve**(`url`, `type`): `Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

##### Parameters

###### url

`string`

###### type

`"json"`

##### Returns

`Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

#### Call Signature

> **retrieve**(`url`, `type`): `Promise`\<`Document` \| `XMLDocument`\>

##### Parameters

###### url

`string`

###### type

[`StoreMarkupRequestType`](../type-aliases/StoreMarkupRequestType.md)

##### Returns

`Promise`\<`Document` \| `XMLDocument`\>

#### Call Signature

> **retrieve**(`url`, `type?`): `Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

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

***

### status()

> **status**(`event?`): `void`

#### Parameters

##### event?

`Event`

#### Returns

`void`
