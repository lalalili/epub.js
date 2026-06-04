[**epubjs**](../API.md)

***

[epubjs](../API.md) / Contents

# Class: Contents

## Constructors

### Constructor

> **new Contents**(`doc`, `content?`, `cfiBase?`, `sectionIndex?`, `sectionHref?`): `Contents`

#### Parameters

##### doc

`Document`

##### content?

`HTMLElement`

##### cfiBase?

`string`

##### sectionIndex?

`number`

##### sectionHref?

`string`

#### Returns

`Contents`

## Properties

### \_forcedWritingMode

> **\_forcedWritingMode**: `string`

***

### \_layoutStyle?

> `optional` **\_layoutStyle?**: `string`

***

### \_size

> **\_size**: [`ContentsSize`](../interfaces/ContentsSize.md)

***

### \_verticalRlMetricsCache

> **\_verticalRlMetricsCache**: [`VerticalRlMetricsCache`](../interfaces/VerticalRlMetricsCache.md)

***

### \_verticalRlPageMetricsCache

> **\_verticalRlPageMetricsCache**: [`VerticalRlPageMetricsCache`](../interfaces/VerticalRlPageMetricsCache.md)

***

### \_verticalRlStableSnappedContentWidth?

> `optional` **\_verticalRlStableSnappedContentWidth?**: `object`

#### pageLength

> **pageLength**: `number`

#### totalPages

> **totalPages**: `number`

#### width

> **width**: `number`

***

### active

> **active**: `boolean`

***

### called

> **called**: `number`

***

### cfiBase

> **cfiBase**: `string`

***

### content

> **content**: `HTMLElement`

***

### document

> **document**: `Document`

***

### documentElement

> **documentElement**: `HTMLElement`

***

### epubcfi

> **epubcfi**: [`EpubCFI`](EpubCFI.md)

***

### sectionHref

> **sectionHref**: `string`

***

### sectionIndex

> **sectionIndex**: `number`

***

### window

> **window**: `Window` & *typeof* `globalThis`

***

### listenedEvents

> `static` **listenedEvents**: `string`[]

## Methods

### addClass()

> **addClass**(`className`): `void`

#### Parameters

##### className

`string`

#### Returns

`void`

***

### addScript()

> **addScript**(`src`): `Promise`\<`boolean`\>

#### Parameters

##### src

`string`

#### Returns

`Promise`\<`boolean`\>

***

### addStylesheet()

> **addStylesheet**(`src`): `Promise`\<`boolean`\>

#### Parameters

##### src

`string`

#### Returns

`Promise`\<`boolean`\>

***

### addStylesheetCss()

> **addStylesheetCss**(`serializedCss`, `key?`): `boolean`

#### Parameters

##### serializedCss

`string`

##### key?

`string`

#### Returns

`boolean`

***

### addStylesheetRules()

> **addStylesheetRules**(`rules`, `key?`): `void`

#### Parameters

##### rules

`object` \| `object`[]

##### key?

`string`

#### Returns

`void`

***

### cfiFromNode()

> **cfiFromNode**(`node`, `ignoreClass?`): `string`

#### Parameters

##### node

`Node`

##### ignoreClass?

`string`

#### Returns

`string`

***

### cfiFromRange()

> **cfiFromRange**(`range`, `ignoreClass?`): `string`

#### Parameters

##### range

`Range` \| `RangeObject`

##### ignoreClass?

`string`

#### Returns

`string`

***

### columns()

> **columns**(`width`, `height`, `columnWidth`, `gap`, `dir?`): `void`

#### Parameters

##### width

`number`

##### height

`number`

##### columnWidth

`number`

##### gap

`number`

##### dir?

`string`

#### Returns

`void`

***

### contentHeight()

> **contentHeight**(`h?`): `number`

#### Parameters

##### h?

`string` \| `number`

#### Returns

`number`

***

### contentWidth()

> **contentWidth**(`w?`): `number`

#### Parameters

##### w?

`string` \| `number`

#### Returns

`number`

***

### css()

> **css**(`property`, `value?`, `priority?`): `string`

#### Parameters

##### property

`string`

##### value?

`string`

##### priority?

`boolean`

#### Returns

`string`

***

### debugVerticalRlMetrics()

> **debugVerticalRlMetrics**(`pageWidth?`): [`VerticalRlDebugMetrics`](../interfaces/VerticalRlDebugMetrics.md)

#### Parameters

##### pageWidth?

`number`

#### Returns

[`VerticalRlDebugMetrics`](../interfaces/VerticalRlDebugMetrics.md)

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### direction()

> **direction**(`dir?`): `void`

#### Parameters

##### dir?

`string`

#### Returns

`void`

***

### emit()

> **emit**(`type`, ...`args`): `void`

#### Parameters

##### type

`string`

##### args

...`unknown`[]

#### Returns

`void`

***

### fit()

> **fit**(`width`, `height`, `section?`): `void`

#### Parameters

##### width

`number`

##### height

`number`

##### section?

`unknown`

#### Returns

`void`

***

### forceWritingMode()

> **forceWritingMode**(`mode?`): `string`

#### Parameters

##### mode?

`string`

#### Returns

`string`

***

### height()

> **height**(`h?`): `number`

#### Parameters

##### h?

`string` \| `number`

#### Returns

`number`

***

### invalidateVerticalRlMetricsCache()

> **invalidateVerticalRlMetricsCache**(): `void`

#### Returns

`void`

***

### isViewportFillingSingleMediaPage()

> **isViewportFillingSingleMediaPage**(`viewportWidth`): `boolean`

#### Parameters

##### viewportWidth

`number`

#### Returns

`boolean`

***

### locationOf()

> **locationOf**(`target`, `ignoreClass?`): `object`

#### Parameters

##### target

`string` \| `number` \| [`EpubCFI`](EpubCFI.md)

##### ignoreClass?

`string`

#### Returns

`object`

##### left

> **left**: `number`

##### top

> **top**: `number`

***

### map()

> **map**(`layout`): `any`

#### Parameters

##### layout

`any`

#### Returns

`any`

***

### mapPage()

> **mapPage**(`cfiBase`, `layout`, `start`, `end`, `dev?`): `any`

#### Parameters

##### cfiBase

`string`

##### layout

`object`

##### start

`number`

##### end

`number`

##### dev?

`boolean`

#### Returns

`any`

***

### measureVerticalRlRect()

> **measureVerticalRlRect**(): `object`

#### Returns

`object`

##### bottom

> **bottom**: `number`

##### left

> **left**: `number`

##### rawHeight

> **rawHeight**: `number`

##### rawWidth

> **rawWidth**: `number`

##### right

> **right**: `number`

##### top

> **top**: `number`

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

### overflow()

> **overflow**(`overflow?`): `string`

#### Parameters

##### overflow?

`string`

#### Returns

`string`

***

### overflowX()

> **overflowX**(`overflow?`): `string`

#### Parameters

##### overflow?

`string`

#### Returns

`string`

***

### overflowY()

> **overflowY**(`overflow?`): `string`

#### Parameters

##### overflow?

`string`

#### Returns

`string`

***

### range()

> **range**(`cfi`, `ignoreClass?`): `Range` \| `RangeObject`

#### Parameters

##### cfi

`string` \| [`EpubCFI`](EpubCFI.md)

##### ignoreClass?

`string`

#### Returns

`Range` \| `RangeObject`

***

### removeClass()

> **removeClass**(`className`): `void`

#### Parameters

##### className

`string`

#### Returns

`void`

***

### root()

> **root**(): `Element`

#### Returns

`Element`

***

### scaler()

> **scaler**(`scale`, `offsetX?`, `offsetY?`): `void`

#### Parameters

##### scale

`number`

##### offsetX?

`number`

##### offsetY?

`number`

#### Returns

`void`

***

### scrollHeight()

> **scrollHeight**(): `number`

#### Returns

`number`

***

### scrollWidth()

> **scrollWidth**(): `number`

#### Returns

`number`

***

### size()

> **size**(`width?`, `height?`): `void`

#### Parameters

##### width?

`number`

##### height?

`number`

#### Returns

`void`

***

### textHeight()

> **textHeight**(): `number`

#### Returns

`number`

***

### textWidth()

> **textWidth**(): `number`

#### Returns

`number`

***

### verticalRlPageMetrics()

> **verticalRlPageMetrics**(`pageWidth?`, `pageHeight?`): [`VerticalRlPageMetrics`](../interfaces/VerticalRlPageMetrics.md)

#### Parameters

##### pageWidth?

`number`

##### pageHeight?

`number`

#### Returns

[`VerticalRlPageMetrics`](../interfaces/VerticalRlPageMetrics.md)

***

### viewport()

> **viewport**(`options?`): [`ViewportSettings`](../interfaces/ViewportSettings.md)

#### Parameters

##### options?

[`ViewportSettings`](../interfaces/ViewportSettings.md)

#### Returns

[`ViewportSettings`](../interfaces/ViewportSettings.md)

***

### width()

> **width**(`w?`): `number`

#### Parameters

##### w?

`string` \| `number`

#### Returns

`number`

***

### writingMode()

> **writingMode**(`mode?`): `string`

#### Parameters

##### mode?

`string`

#### Returns

`string`
