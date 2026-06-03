[**epubjs**](../API.md)

***

[epubjs](../API.md) / ThemesContent

# Interface: ThemesContent

## Methods

### addClass()

> **addClass**(`name`): `void`

#### Parameters

##### name

`string`

#### Returns

`void`

***

### addStylesheet()

> **addStylesheet**(`url`): `Promise`\<`boolean`\>

#### Parameters

##### url

`string`

#### Returns

`Promise`\<`boolean`\>

***

### addStylesheetCss()

> **addStylesheetCss**(`css`, `name`): `boolean`

#### Parameters

##### css

`string`

##### name

`string`

#### Returns

`boolean`

***

### addStylesheetRules()

> **addStylesheetRules**(`rules`, `name`): `void`

#### Parameters

##### rules

[`ThemeRules`](../type-aliases/ThemeRules.md)

##### name

`string`

#### Returns

`void`

***

### css()

> **css**(`name`, `value?`, `priority?`): `string`

#### Parameters

##### name

`string`

##### value?

`string`

##### priority?

`boolean`

#### Returns

`string`

***

### removeClass()

> **removeClass**(`name`): `void`

#### Parameters

##### name

`string`

#### Returns

`void`
