[**epubjs**](../API.md)

***

[epubjs](../API.md) / Annotation

# Interface: Annotation

## Properties

### cb

> **cb**: [`AnnotationCallback`](../type-aliases/AnnotationCallback.md)

***

### cfiRange

> **cfiRange**: `string`

***

### className

> **className**: `string`

***

### data

> **data**: [`AnnotationData`](../type-aliases/AnnotationData.md)

***

### mark

> **mark**: `unknown`

***

### sectionIndex

> **sectionIndex**: `number`

***

### styles

> **styles**: [`AnnotationStyles`](../type-aliases/AnnotationStyles.md)

***

### type

> **type**: `string`

## Methods

### attach()

> **attach**(`view`): `unknown`

#### Parameters

##### view

[`AnnotationView`](AnnotationView.md)

#### Returns

`unknown`

***

### detach()

> **detach**(`view?`): `unknown`

#### Parameters

##### view?

[`AnnotationView`](AnnotationView.md)

#### Returns

`unknown`

***

### emit()

> **emit**(`type`, ...`args`): `void`

#### Parameters

##### type

`string`

##### args

...`any`[]

#### Returns

`void`

***

### off()

> **off**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### on()

> **on**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### once()

> **once**(`type`, `listener`): `unknown`

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`unknown`

***

### text()

> **text**(): `void`

#### Returns

`void`

***

### update()

> **update**(`data`): `void`

#### Parameters

##### data

[`AnnotationData`](../type-aliases/AnnotationData.md)

#### Returns

`void`
