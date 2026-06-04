[**epubjs**](../API.md)

***

[epubjs](../API.md) / Navigation

# Interface: Navigation

## Properties

### landmarks

> **landmarks**: [`LandmarkItem`](LandmarkItem.md)[]

***

### landmarksByType

> **landmarksByType**: `Record`\<`string`, `number`\>

***

### length

> **length**: `number`

***

### toc

> **toc**: [`NavItem`](NavItem.md)[]

***

### tocByHref

> **tocByHref**: `Record`\<`string`, `number`\>

***

### tocById

> **tocById**: `Record`\<`string`, `number`\>

## Methods

### forEach()

> **forEach**(`fn`): `void`

#### Parameters

##### fn

(`item`, `index`, `array`) => `void`

#### Returns

`void`

***

### get()

#### Call Signature

> **get**(): [`NavItem`](NavItem.md)[]

##### Returns

[`NavItem`](NavItem.md)[]

#### Call Signature

> **get**(`target`): [`NavItem`](NavItem.md)

##### Parameters

###### target

`string`

##### Returns

[`NavItem`](NavItem.md)

***

### getByIndex()

> **getByIndex**(`target`, `index`, `navItems`): [`NavItem`](NavItem.md)

#### Parameters

##### target

`string`

##### index

`number`

##### navItems

[`NavItem`](NavItem.md)[]

#### Returns

[`NavItem`](NavItem.md)

***

### landmark()

#### Call Signature

> **landmark**(): [`LandmarkItem`](LandmarkItem.md)[]

##### Returns

[`LandmarkItem`](LandmarkItem.md)[]

#### Call Signature

> **landmark**(`type`): [`LandmarkItem`](LandmarkItem.md)

##### Parameters

###### type

`string`

##### Returns

[`LandmarkItem`](LandmarkItem.md)

***

### landmarkItem()

> **landmarkItem**(`item`): [`LandmarkItem`](LandmarkItem.md)

#### Parameters

##### item

`Element`

#### Returns

[`LandmarkItem`](LandmarkItem.md)

***

### load()

> **load**(`json`): [`NavItem`](NavItem.md)[]

#### Parameters

##### json

[`NavigationInputItem`](NavigationInputItem.md)[]

#### Returns

[`NavItem`](NavItem.md)[]

***

### navItem()

> **navItem**(`item`, `parent?`): [`NavItem`](NavItem.md)

#### Parameters

##### item

`Element`

##### parent?

`string`

#### Returns

[`NavItem`](NavItem.md)

***

### ncxItem()

> **ncxItem**(`item`): [`NavItem`](NavItem.md)

#### Parameters

##### item

`Element`

#### Returns

[`NavItem`](NavItem.md)

***

### parse()

> **parse**(`xml`): `void`

#### Parameters

##### xml

[`NavigationInput`](../type-aliases/NavigationInput.md)

#### Returns

`void`

***

### parseLandmarks()

> **parseLandmarks**(`navHtml`): [`LandmarkItem`](LandmarkItem.md)[]

#### Parameters

##### navHtml

[`NavigationDocument`](../type-aliases/NavigationDocument.md)

#### Returns

[`LandmarkItem`](LandmarkItem.md)[]

***

### parseNav()

> **parseNav**(`navHtml`): [`NavItem`](NavItem.md)[]

#### Parameters

##### navHtml

[`NavigationDocument`](../type-aliases/NavigationDocument.md)

#### Returns

[`NavItem`](NavItem.md)[]

***

### parseNavList()

> **parseNavList**(`navListHtml?`, `parent?`): [`NavItem`](NavItem.md)[]

#### Parameters

##### navListHtml?

`Element`

##### parent?

`string`

#### Returns

[`NavItem`](NavItem.md)[]

***

### parseNcx()

> **parseNcx**(`navHtml`): [`NavItem`](NavItem.md)[]

#### Parameters

##### navHtml

[`NavigationDocument`](../type-aliases/NavigationDocument.md)

#### Returns

[`NavItem`](NavItem.md)[]

***

### unpack()

> **unpack**(`toc`): `void`

#### Parameters

##### toc

[`NavItem`](NavItem.md)[]

#### Returns

`void`
