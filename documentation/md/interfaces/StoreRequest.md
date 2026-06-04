[**epubjs**](../API.md)

***

[epubjs](../API.md) / StoreRequest

# Interface: StoreRequest()

## Call Signature

> **StoreRequest**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<[`StoreData`](../type-aliases/StoreData.md)\>

### Parameters

#### url

`string`

#### type

`"binary"`

#### withCredentials?

`boolean`

#### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

### Returns

`Promise`\<[`StoreData`](../type-aliases/StoreData.md)\>

## Call Signature

> **StoreRequest**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<`Blob`\>

### Parameters

#### url

`string`

#### type

`"blob"`

#### withCredentials?

`boolean`

#### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

### Returns

`Promise`\<`Blob`\>

## Call Signature

> **StoreRequest**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

### Parameters

#### url

`string`

#### type

`"json"`

#### withCredentials?

`boolean`

#### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

### Returns

`Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

## Call Signature

> **StoreRequest**(`url`, `type`, `withCredentials?`, `headers?`): `Promise`\<`Document` \| `XMLDocument`\>

### Parameters

#### url

`string`

#### type

[`StoreMarkupRequestType`](../type-aliases/StoreMarkupRequestType.md)

#### withCredentials?

`boolean`

#### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

### Returns

`Promise`\<`Document` \| `XMLDocument`\>

## Call Signature

> **StoreRequest**(`url`, `type?`, `withCredentials?`, `headers?`): `Promise`\<[`StoreRequestResponse`](../type-aliases/StoreRequestResponse.md)\>

### Parameters

#### url

`string`

#### type?

`string`

#### withCredentials?

`boolean`

#### headers?

[`StoreHeaders`](../type-aliases/StoreHeaders.md)

### Returns

`Promise`\<[`StoreRequestResponse`](../type-aliases/StoreRequestResponse.md)\>
