[**epubjs**](../API.md)

***

[epubjs](../API.md) / Packaging

# Interface: Packaging

## Properties

### coverPath?

> `optional` **coverPath?**: `string` \| `false`

***

### manifest?

> `optional` **manifest?**: [`PackagingManifestObject`](PackagingManifestObject.md)

***

### metadata?

> `optional` **metadata?**: [`PackagingMetadataObject`](PackagingMetadataObject.md)

***

### navPath?

> `optional` **navPath?**: `string` \| `false`

***

### ncxPath?

> `optional` **ncxPath?**: `string` \| `false`

***

### spine?

> `optional` **spine?**: [`PackagingSpineItem`](PackagingSpineItem.md)[]

***

### spineNodeIndex?

> `optional` **spineNodeIndex?**: `number`

***

### toc?

> `optional` **toc?**: [`PackagingTocItem`](PackagingTocItem.md)[]

***

### uniqueIdentifier?

> `optional` **uniqueIdentifier?**: `string`

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### findCoverPath()

> **findCoverPath**(`packageXml`): `string` \| `false`

#### Parameters

##### packageXml

`Document` \| `XMLDocument`

#### Returns

`string` \| `false`

***

### findNavPath()

> **findNavPath**(`manifestNode`): `string` \| `false`

#### Parameters

##### manifestNode

`Element`

#### Returns

`string` \| `false`

***

### findNcxPath()

> **findNcxPath**(`manifestNode`, `spineNode`): `string` \| `false`

#### Parameters

##### manifestNode

`Element`

##### spineNode

`Element`

#### Returns

`string` \| `false`

***

### findUniqueIdentifier()

> **findUniqueIdentifier**(`packageXml`): `string`

#### Parameters

##### packageXml

`Document` \| `XMLDocument`

#### Returns

`string`

***

### getElementText()

> **getElementText**(`xml`, `tag`): `string`

#### Parameters

##### xml

`Element`

##### tag

`string`

#### Returns

`string`

***

### getPropertyText()

> **getPropertyText**(`xml`, `property`): `string`

#### Parameters

##### xml

`Element`

##### property

`string`

#### Returns

`string`

***

### load()

> **load**(`json`): [`PackagingObject`](PackagingObject.md)

#### Parameters

##### json

[`PackagingJsonManifest`](../type-aliases/PackagingJsonManifest.md)

#### Returns

[`PackagingObject`](PackagingObject.md)

***

### parse()

> **parse**(`packageDocument`): [`PackagingObject`](PackagingObject.md)

#### Parameters

##### packageDocument

`Document` \| `XMLDocument`

#### Returns

[`PackagingObject`](PackagingObject.md)

***

### parseManifest()

> **parseManifest**(`xml`): [`PackagingManifestObject`](PackagingManifestObject.md)

#### Parameters

##### xml

`Element`

#### Returns

[`PackagingManifestObject`](PackagingManifestObject.md)

***

### parseMetadata()

> **parseMetadata**(`xml`): [`PackagingMetadataObject`](PackagingMetadataObject.md)

#### Parameters

##### xml

`Element`

#### Returns

[`PackagingMetadataObject`](PackagingMetadataObject.md)

***

### parseSpine()

> **parseSpine**(`xml`, `manifest`): [`PackagingSpineItem`](PackagingSpineItem.md)[]

#### Parameters

##### xml

`Element`

##### manifest

[`PackagingManifestObject`](PackagingManifestObject.md)

#### Returns

[`PackagingSpineItem`](PackagingSpineItem.md)[]
