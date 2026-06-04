[**epubjs**](../API.md)

***

[epubjs](../API.md) / RenditionManagerOptions

# Interface: RenditionManagerOptions

## Properties

### queue

> **queue**: [`Queue`](Queue.md)

***

### request

> **request**: \{(`path`, `type`): `Promise`\<`ArrayBuffer`\>; (`path`, `type`): `Promise`\<`Blob`\>; (`path`, `type`): `Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>; (`path`, `type`): `Promise`\<`Document` \| `XMLDocument`\>; (`path`, `type`): `Promise`\<`string`\>; (`path`, `type?`): `Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>; \}

#### Call Signature

> (`path`, `type`): `Promise`\<`ArrayBuffer`\>

##### Parameters

###### path

`string`

###### type

`"binary"`

##### Returns

`Promise`\<`ArrayBuffer`\>

#### Call Signature

> (`path`, `type`): `Promise`\<`Blob`\>

##### Parameters

###### path

`string`

###### type

`"blob"`

##### Returns

`Promise`\<`Blob`\>

#### Call Signature

> (`path`, `type`): `Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

##### Parameters

###### path

`string`

###### type

`"json"`

##### Returns

`Promise`\<[`JsonValue`](../type-aliases/JsonValue.md)\>

#### Call Signature

> (`path`, `type`): `Promise`\<`Document` \| `XMLDocument`\>

##### Parameters

###### path

`string`

###### type

`"xml"` \| `"opf"` \| `"ncx"` \| `"xhtml"` \| `"html"` \| `"htm"`

##### Returns

`Promise`\<`Document` \| `XMLDocument`\>

#### Call Signature

> (`path`, `type`): `Promise`\<`string`\>

##### Parameters

###### path

`string`

###### type

`"text"`

##### Returns

`Promise`\<`string`\>

#### Call Signature

> (`path`, `type?`): `Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

##### Parameters

###### path

`string`

###### type?

`string`

##### Returns

`Promise`\<[`RequestResponse`](../type-aliases/RequestResponse.md)\>

***

### settings

> **settings**: [`RenditionOptions`](RenditionOptions.md)

***

### view

> **view**: [`RenditionViewConstructor`](../type-aliases/RenditionViewConstructor.md)
