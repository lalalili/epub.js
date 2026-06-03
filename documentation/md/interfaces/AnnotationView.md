[**epubjs**](../API.md)

***

[epubjs](../API.md) / AnnotationView

# Interface: AnnotationView

## Properties

### index

> **index**: `number`

## Methods

### highlight()

> **highlight**(`cfiRange`, `data?`, `cb?`, `className?`, `styles?`): `any`

#### Parameters

##### cfiRange

`string`

##### data?

[`AnnotationData`](../type-aliases/AnnotationData.md)

##### cb?

[`AnnotationCallback`](../type-aliases/AnnotationCallback.md)

##### className?

`string`

##### styles?

[`AnnotationStyles`](../type-aliases/AnnotationStyles.md)

#### Returns

`any`

***

### mark()

> **mark**(`cfiRange`, `data?`, `cb?`): `any`

#### Parameters

##### cfiRange

`string`

##### data?

[`AnnotationData`](../type-aliases/AnnotationData.md)

##### cb?

[`AnnotationCallback`](../type-aliases/AnnotationCallback.md)

#### Returns

`any`

***

### underline()

> **underline**(`cfiRange`, `data?`, `cb?`, `className?`, `styles?`): `any`

#### Parameters

##### cfiRange

`string`

##### data?

[`AnnotationData`](../type-aliases/AnnotationData.md)

##### cb?

[`AnnotationCallback`](../type-aliases/AnnotationCallback.md)

##### className?

`string`

##### styles?

[`AnnotationStyles`](../type-aliases/AnnotationStyles.md)

#### Returns

`any`

***

### unhighlight()

> **unhighlight**(`cfiRange`): `any`

#### Parameters

##### cfiRange

`string`

#### Returns

`any`

***

### unmark()

> **unmark**(`cfiRange`): `any`

#### Parameters

##### cfiRange

`string`

#### Returns

`any`

***

### ununderline()

> **ununderline**(`cfiRange`): `any`

#### Parameters

##### cfiRange

`string`

#### Returns

`any`
