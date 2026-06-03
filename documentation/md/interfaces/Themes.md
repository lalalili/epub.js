[**epubjs**](../API.md)

***

[epubjs](../API.md) / Themes

# Interface: Themes

## Properties

### \_current?

> `optional` **\_current?**: `string`

***

### \_injected?

> `optional` **\_injected?**: [`InjectedThemes`](../type-aliases/InjectedThemes.md)

***

### \_overrides?

> `optional` **\_overrides?**: `Record`\<`string`, [`ThemeOverride`](ThemeOverride.md)\>

***

### \_themes?

> `optional` **\_themes?**: `Record`\<`string`, [`Theme`](Theme.md)\>

***

### rendition?

> `optional` **rendition?**: [`ThemesRendition`](ThemesRendition.md)

## Methods

### add()

> **add**(`name`, `contents`): `void`

#### Parameters

##### name

`string`

##### contents

[`Contents`](../classes/Contents.md) \| [`ThemesContent`](ThemesContent.md)

#### Returns

`void`

***

### default()

> **default**(`theme?`): `void`

#### Parameters

##### theme?

[`ThemeInput`](../type-aliases/ThemeInput.md)

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### font()

> **font**(`f`): `void`

#### Parameters

##### f

`string`

#### Returns

`void`

***

### fontSize()

> **fontSize**(`size`): `void`

#### Parameters

##### size

`string`

#### Returns

`void`

***

### inject()

> **inject**(`content`): `void`

#### Parameters

##### content

[`Contents`](../classes/Contents.md) \| [`ThemesContent`](ThemesContent.md)

#### Returns

`void`

***

### override()

> **override**(`name`, `value`, `priority?`): `void`

#### Parameters

##### name

`string`

##### value

`string`

##### priority?

`boolean`

#### Returns

`void`

***

### overrides()

> **overrides**(`contents`): `void`

#### Parameters

##### contents

[`Contents`](../classes/Contents.md) \| [`ThemesContent`](ThemesContent.md)

#### Returns

`void`

***

### register()

#### Call Signature

> **register**(): `void`

##### Returns

`void`

#### Call Signature

> **register**(`themeObject`): `void`

##### Parameters

###### themeObject

`Record`\<`string`, [`ThemeInput`](../type-aliases/ThemeInput.md)\>

##### Returns

`void`

#### Call Signature

> **register**(`theme`): `void`

##### Parameters

###### theme

`string`

##### Returns

`void`

#### Call Signature

> **register**(`theme`, `url`): `void`

##### Parameters

###### theme

`string`

###### url

`string`

##### Returns

`void`

#### Call Signature

> **register**(`theme`, `themeObject`): `void`

##### Parameters

###### theme

`string`

###### themeObject

[`ThemeRules`](../type-aliases/ThemeRules.md)

##### Returns

`void`

***

### registerCss()

> **registerCss**(`name`, `css`): `void`

#### Parameters

##### name

`string`

##### css

`string`

#### Returns

`void`

***

### registerRules()

> **registerRules**(`name`, `rules`): `void`

#### Parameters

##### name

`string`

##### rules

[`ThemeRules`](../type-aliases/ThemeRules.md)

#### Returns

`void`

***

### registerThemes()

> **registerThemes**(`themes`): `void`

#### Parameters

##### themes

`Record`\<`string`, [`ThemeInput`](../type-aliases/ThemeInput.md)\>

#### Returns

`void`

***

### registerUrl()

> **registerUrl**(`name`, `input`): `void`

#### Parameters

##### name

`string`

##### input

`string`

#### Returns

`void`

***

### removeOverride()

> **removeOverride**(`name`): `void`

#### Parameters

##### name

`string`

#### Returns

`void`

***

### select()

> **select**(`name`): `void`

#### Parameters

##### name

`string`

#### Returns

`void`

***

### update()

> **update**(`name`): `void`

#### Parameters

##### name

`string`

#### Returns

`void`
