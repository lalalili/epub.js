[**epubjs**](../API.md)

***

[epubjs](../API.md) / RequestMethod

# Interface: RequestMethod()

## Call Signature

> **RequestMethod**(`url`, `type`, `withCredentials?`, `headers?`, `signal?`): `Promise`\<`ArrayBuffer`\>

### Parameters

#### url

`string`

#### type

`"binary"`

#### withCredentials?

`boolean`

#### headers?

[`RequestHeaders`](../type-aliases/RequestHeaders.md)

#### signal?

`AbortSignal`

### Returns

`Promise`\<`ArrayBuffer`\>

## Call Signature

> **RequestMethod**(`url`, `type`, `withCredentials?`, `headers?`, `signal?`): `Promise`\<`Blob`\>

### Parameters

#### url

`string`

#### type

`"blob"`

#### withCredentials?

`boolean`

#### headers?

[`RequestHeaders`](../type-aliases/RequestHeaders.md)

#### signal?

`AbortSignal`

### Returns

`Promise`\<`Blob`\>

## Call Signature

> **RequestMethod**(`url`, `type`, `withCredentials?`, `headers?`, `signal?`): `Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

### Parameters

#### url

`string`

#### type

`"json"`

#### withCredentials?

`boolean`

#### headers?

[`RequestHeaders`](../type-aliases/RequestHeaders.md)

#### signal?

`AbortSignal`

### Returns

`Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

## Call Signature

> **RequestMethod**(`url`, `type`, `withCredentials?`, `headers?`, `signal?`): `Promise`\<`Document` \| `XMLDocument`\>

### Parameters

#### url

`string`

#### type

`"xml"` \| `"opf"` \| `"ncx"` \| `"xhtml"` \| `"html"` \| `"htm"`

#### withCredentials?

`boolean`

#### headers?

[`RequestHeaders`](../type-aliases/RequestHeaders.md)

#### signal?

`AbortSignal`

### Returns

`Promise`\<`Document` \| `XMLDocument`\>

## Call Signature

> **RequestMethod**(`url`, `type`, `withCredentials?`, `headers?`, `signal?`): `Promise`\<`string`\>

### Parameters

#### url

`string`

#### type

`"text"`

#### withCredentials?

`boolean`

#### headers?

[`RequestHeaders`](../type-aliases/RequestHeaders.md)

#### signal?

`AbortSignal`

### Returns

`Promise`\<`string`\>

## Call Signature

> **RequestMethod**(`url`, `type?`, `withCredentials?`, `headers?`, `signal?`): `Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

### Parameters

#### url

`string`

#### type?

`string`

#### withCredentials?

`boolean`

#### headers?

[`RequestHeaders`](../type-aliases/RequestHeaders.md)

#### signal?

`AbortSignal`

### Returns

`Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>
