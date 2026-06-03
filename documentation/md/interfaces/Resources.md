[**epubjs**](../API.md)

***

[epubjs](../API.md) / Resources

# Interface: Resources

## Properties

### assets?

> `optional` **assets?**: [`ResourceManifestItem`](ResourceManifestItem.md)[]

***

### css?

> `optional` **css?**: [`ResourceManifestItem`](ResourceManifestItem.md)[]

***

### cssUrls?

> `optional` **cssUrls?**: `string`[]

***

### html?

> `optional` **html?**: [`ResourceManifestItem`](ResourceManifestItem.md)[]

***

### manifest?

> `optional` **manifest?**: [`ResourceManifest`](ResourceManifest.md)

***

### replacementUrls?

> `optional` **replacementUrls?**: `string`[]

***

### resources?

> `optional` **resources?**: [`ResourceManifestItem`](ResourceManifestItem.md)[]

***

### settings?

> `optional` **settings?**: [`ResourceSettings`](ResourceSettings.md)

***

### urls?

> `optional` **urls?**: `string`[]

## Methods

### createCssFile()

> **createCssFile**(`href`, `archive?`, `resolver?`): `Promise`\<`string`\>

#### Parameters

##### href

`string`

##### archive?

`Archive` \| [`ResourceArchive`](ResourceArchive.md)

##### resolver?

[`ResourceResolver`](../type-aliases/ResourceResolver.md)

#### Returns

`Promise`\<`string`\>

***

### createUrl()

> **createUrl**(`url`): `Promise`\<`string`\>

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`string`\>

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### get()

> **get**(`path`): `Promise`\<`string`\>

#### Parameters

##### path

`string`

#### Returns

`Promise`\<`string`\>

***

### process()

> **process**(`manifest`): `void`

#### Parameters

##### manifest

`PackagingManifestObject` \| [`ResourceManifest`](ResourceManifest.md)

#### Returns

`void`

***

### relativeTo()

> **relativeTo**(`absolute`, `resolver?`): `string`[]

#### Parameters

##### absolute

`string`

##### resolver?

[`ResourceResolver`](../type-aliases/ResourceResolver.md)

#### Returns

`string`[]

***

### replaceCss()

> **replaceCss**(`archive?`, `resolver?`): `Promise`\<`void`[]\>

#### Parameters

##### archive?

`Archive` \| [`ResourceArchive`](ResourceArchive.md)

##### resolver?

[`ResourceResolver`](../type-aliases/ResourceResolver.md)

#### Returns

`Promise`\<`void`[]\>

***

### replacements()

> **replacements**(): `Promise`\<`string`[]\>

#### Returns

`Promise`\<`string`[]\>

***

### split()

> **split**(): `void`

#### Returns

`void`

***

### splitUrls()

> **splitUrls**(): `void`

#### Returns

`void`

***

### substitute()

> **substitute**(`content`, `url?`): `string`

#### Parameters

##### content

`string`

##### url?

`string`

#### Returns

`string`
