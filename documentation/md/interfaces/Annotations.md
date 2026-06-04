[**epubjs**](../API.md)

***

[epubjs](../API.md) / Annotations

# Interface: Annotations

## Properties

### \_annotations

> **\_annotations**: [`AnnotationMap`](../type-aliases/AnnotationMap.md)

***

### \_annotationsBySectionIndex

> **\_annotationsBySectionIndex**: [`SectionAnnotationMap`](../type-aliases/SectionAnnotationMap.md)

***

### highlights

> **highlights**: [`Annotation`](Annotation.md)[]

***

### marks

> **marks**: [`Annotation`](Annotation.md)[]

***

### rendition

> **rendition**: [`AnnotationsRendition`](AnnotationsRendition.md)

***

### underlines

> **underlines**: [`Annotation`](Annotation.md)[]

## Methods

### \_annotationsAt()

> **\_annotationsAt**(`index`): `string`[]

#### Parameters

##### index

`number`

#### Returns

`string`[]

***

### \_removeFromAnnotationBySectionIndex()

> **\_removeFromAnnotationBySectionIndex**(`sectionIndex`, `hash`): `void`

#### Parameters

##### sectionIndex

`number`

##### hash

`string`

#### Returns

`void`

***

### add()

> **add**(`type`, `cfiRange`, `data?`, `cb?`, `className?`, `styles?`): [`Annotation`](Annotation.md)

#### Parameters

##### type

`string`

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

[`Annotation`](Annotation.md)

***

### clear()

> **clear**(`view`): `void`

#### Parameters

##### view

[`AnnotationView`](AnnotationView.md)

#### Returns

`void`

***

### each()

> **each**(...`args`): `void`

#### Parameters

##### args

...`any`[]

#### Returns

`void`

***

### hide()

> **hide**(): `void`

#### Returns

`void`

***

### highlight()

> **highlight**(`cfiRange`, `data?`, `cb?`, `className?`, `styles?`): [`Annotation`](Annotation.md)

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

[`Annotation`](Annotation.md)

***

### inject()

> **inject**(`view`): `void`

#### Parameters

##### view

[`AnnotationView`](AnnotationView.md)

#### Returns

`void`

***

### mark()

> **mark**(`cfiRange`, `data?`, `cb?`): [`Annotation`](Annotation.md)

#### Parameters

##### cfiRange

`string`

##### data?

[`AnnotationData`](../type-aliases/AnnotationData.md)

##### cb?

[`AnnotationCallback`](../type-aliases/AnnotationCallback.md)

#### Returns

[`Annotation`](Annotation.md)

***

### remove()

> **remove**(`cfiRange`, `type`): `void`

#### Parameters

##### cfiRange

`string`

##### type

`string`

#### Returns

`void`

***

### show()

> **show**(): `void`

#### Returns

`void`

***

### underline()

> **underline**(`cfiRange`, `data?`, `cb?`, `className?`, `styles?`): [`Annotation`](Annotation.md)

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

[`Annotation`](Annotation.md)
