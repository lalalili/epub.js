[**epubjs**](../API.md)

***

[epubjs](../API.md) / Spine

# Interface: Spine

## Properties

### baseUrl?

> `optional` **baseUrl?**: `string`

***

### epubcfi?

> `optional` **epubcfi?**: [`EpubCFI`](../classes/EpubCFI.md)

***

### hooks?

> `optional` **hooks?**: [`SectionHookSet`](SectionHookSet.md)

***

### items?

> `optional` **items?**: [`SpinePackageItem`](SpinePackageItem.md)[]

***

### length?

> `optional` **length?**: `number`

***

### loaded

> **loaded**: `boolean`

***

### manifest?

> `optional` **manifest?**: `Record`\<`string`, [`SpineManifestItem`](SpineManifestItem.md)\>

***

### spineByHref?

> `optional` **spineByHref?**: [`SpineLookup`](../type-aliases/SpineLookup.md)

***

### spineById?

> `optional` **spineById?**: [`SpineLookup`](../type-aliases/SpineLookup.md)

***

### spineItems?

> `optional` **spineItems?**: [`Section`](Section.md)[]

***

### spineNodeIndex?

> `optional` **spineNodeIndex?**: `number`

## Methods

### append()

> **append**(`section`): `number`

#### Parameters

##### section

[`Section`](Section.md)

#### Returns

`number`

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### each()

> **each**(`callback`, `thisArg?`): `void`

#### Parameters

##### callback

(`section`, `index`, `sections`) => `void`

##### thisArg?

`unknown`

#### Returns

`void`

***

### first()

> **first**(): [`Section`](Section.md)

#### Returns

[`Section`](Section.md)

***

### get()

> **get**(`target?`): [`Section`](Section.md)

#### Parameters

##### target?

`string` \| `number`

#### Returns

[`Section`](Section.md)

***

### indexHref()

> **indexHref**(`href`, `index`): `void`

#### Parameters

##### href

`string`

##### index

`number`

#### Returns

`void`

***

### isRenderableType()

> **isRenderableType**(`type?`): `boolean`

#### Parameters

##### type?

`string`

#### Returns

`boolean`

***

### last()

> **last**(): [`Section`](Section.md)

#### Returns

[`Section`](Section.md)

***

### prepend()

> **prepend**(`section`): `number`

#### Parameters

##### section

[`Section`](Section.md)

#### Returns

`number`

***

### remove()

> **remove**(`section`): [`Section`](Section.md)[]

#### Parameters

##### section

[`Section`](Section.md)

#### Returns

[`Section`](Section.md)[]

***

### removeHref()

> **removeHref**(`href`): `void`

#### Parameters

##### href

`string`

#### Returns

`void`

***

### resolveFallbackItem()

> **resolveFallbackItem**(`manifestItem`): [`SpineManifestItem`](SpineManifestItem.md)

#### Parameters

##### manifestItem

[`SpineManifestItem`](SpineManifestItem.md)

#### Returns

[`SpineManifestItem`](SpineManifestItem.md)

***

### unpack()

> **unpack**(`_package`, `resolver`, `canonical`): `void`

#### Parameters

##### \_package

[`SpinePackage`](SpinePackage.md)

##### resolver

[`SpineResolver`](../type-aliases/SpineResolver.md)

##### canonical

[`SpineResolver`](../type-aliases/SpineResolver.md)

#### Returns

`void`
