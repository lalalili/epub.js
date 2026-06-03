[**epubjs**](../API.md)

***

[epubjs](../API.md) / PageList

# Interface: PageList

## Properties

### epubcfi?

> `optional` **epubcfi?**: [`EpubCFI`](../classes/EpubCFI.md)

***

### firstPage

> **firstPage**: `number`

***

### hrefByPage?

> `optional` **hrefByPage?**: [`PageLookup`](../type-aliases/PageLookup.md)

***

### hrefs?

> `optional` **hrefs?**: `string`[]

***

### lastPage

> **lastPage**: `number`

***

### locations?

> `optional` **locations?**: `string`[]

***

### ncx?

> `optional` **ncx?**: `unknown`

***

### pageByHref?

> `optional` **pageByHref?**: [`PageReverseLookup`](../type-aliases/PageReverseLookup.md)

***

### pageList?

> `optional` **pageList?**: [`PageListItem`](PageListItem.md)[]

***

### pages?

> `optional` **pages?**: [`PageValue`](../type-aliases/PageValue.md)[]

***

### toc?

> `optional` **toc?**: `unknown`

***

### totalPages

> **totalPages**: `number`

## Methods

### cfiFromPage()

> **cfiFromPage**(`pg`): `string` \| `-1`

#### Parameters

##### pg

[`PageValue`](../type-aliases/PageValue.md)

#### Returns

`string` \| `-1`

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### hrefFromPage()

> **hrefFromPage**(`pg`): `string`

#### Parameters

##### pg

[`PageValue`](../type-aliases/PageValue.md)

#### Returns

`string`

***

### item()

> **item**(`item`): [`PageListItem`](PageListItem.md)

#### Parameters

##### item

`Element`

#### Returns

[`PageListItem`](PageListItem.md)

***

### ncxItem()

> **ncxItem**(`item`): [`PageListItem`](PageListItem.md)

#### Parameters

##### item

`Element`

#### Returns

[`PageListItem`](PageListItem.md)

***

### pageFromCfi()

> **pageFromCfi**(`cfi`): [`PageValue`](../type-aliases/PageValue.md)

#### Parameters

##### cfi

`string`

#### Returns

[`PageValue`](../type-aliases/PageValue.md)

***

### pageFromHref()

> **pageFromHref**(`href`): [`PageValue`](../type-aliases/PageValue.md)

#### Parameters

##### href

`string`

#### Returns

[`PageValue`](../type-aliases/PageValue.md)

***

### pageFromPercentage()

> **pageFromPercentage**(`percent`): `number`

#### Parameters

##### percent

`number`

#### Returns

`number`

***

### parse()

> **parse**(`xml`): [`PageListItem`](PageListItem.md)[]

#### Parameters

##### xml

[`PageListDocument`](../type-aliases/PageListDocument.md)

#### Returns

[`PageListItem`](PageListItem.md)[]

***

### parseNav()

> **parseNav**(`navHtml`): [`PageListItem`](PageListItem.md)[]

#### Parameters

##### navHtml

[`PageListDocument`](../type-aliases/PageListDocument.md)

#### Returns

[`PageListItem`](PageListItem.md)[]

***

### parseNcx()

> **parseNcx**(`navXml`): [`PageListItem`](PageListItem.md)[]

#### Parameters

##### navXml

[`PageListDocument`](../type-aliases/PageListDocument.md)

#### Returns

[`PageListItem`](PageListItem.md)[]

***

### percentageFromCfi()

> **percentageFromCfi**(`cfi`): `number`

#### Parameters

##### cfi

`string`

#### Returns

`number`

***

### percentageFromPage()

> **percentageFromPage**(`pg`): `number`

#### Parameters

##### pg

`number`

#### Returns

`number`

***

### process()

> **process**(`pageList`): `void`

#### Parameters

##### pageList

[`PageListItem`](PageListItem.md)[]

#### Returns

`void`
