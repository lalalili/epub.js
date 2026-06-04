[**epubjs**](../API.md)

***

[epubjs](../API.md) / AnnotationView

# Interface: AnnotationView

## Properties

### index

> **index**: `number`

## Methods

### highlight()

> **highlight**(`cfiRange`, `data?`, `cb?`, `className?`, `styles?`): `unknown`

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

`unknown`

***

### mark()

> **mark**(`cfiRange`, `data?`, `cb?`): `unknown`

#### Parameters

##### cfiRange

`string`

##### data?

[`AnnotationData`](../type-aliases/AnnotationData.md)

##### cb?

[`AnnotationCallback`](../type-aliases/AnnotationCallback.md)

#### Returns

`unknown`

***

### underline()

> **underline**(`cfiRange`, `data?`, `cb?`, `className?`, `styles?`): `unknown`

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

`unknown`

***

### unhighlight()

> **unhighlight**(`cfiRange`): `unknown`

#### Parameters

##### cfiRange

`string`

#### Returns

`unknown`

***

### unmark()

> **unmark**(`cfiRange`): `unknown`

#### Parameters

##### cfiRange

`string`

#### Returns

`unknown`

***

### ununderline()

> **ununderline**(`cfiRange`): `unknown`

#### Parameters

##### cfiRange

`string`

#### Returns

`unknown`
