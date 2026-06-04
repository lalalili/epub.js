[**epubjs**](../API.md)

***

[epubjs](../API.md) / Hook

# Interface: Hook

## Properties

### context

> **context**: `unknown`

***

### hooks

> **hooks**: [`HookTask`](../type-aliases/HookTask.md)[]

## Methods

### clear()

> **clear**(): [`HookTask`](../type-aliases/HookTask.md)[]

#### Returns

[`HookTask`](../type-aliases/HookTask.md)[]

***

### deregister()

> **deregister**(`func`): `void`

#### Parameters

##### func

[`HookTask`](../type-aliases/HookTask.md)

#### Returns

`void`

***

### list()

> **list**(): [`HookTask`](../type-aliases/HookTask.md)[]

#### Returns

[`HookTask`](../type-aliases/HookTask.md)[]

***

### register()

> **register**(...`items`): `void`

#### Parameters

##### items

...[`HookRegistration`](../type-aliases/HookRegistration.md)[]

#### Returns

`void`

***

### trigger()

> **trigger**(...`args`): `Promise`\<`unknown`[]\>

#### Parameters

##### args

...`any`[]

#### Returns

`Promise`\<`unknown`[]\>
