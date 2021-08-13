# use-responsive-viewport

Just put `useResponsiveViewport()` in your code and you won't have to think about narrow devices anymore!

- **Super lightweight**: less than 1KB, no dependencies.
- **React Hooks**: easy to use.
- **Simple design**: just put 1 line into your code.
- **Written in TypeScript**: has type definition naturally.

## Install

```
$ yarn add use-responsive-viewport
```

or

```
$ npm install --save use-responsive-viewport
```

## Usage

```typescript
import React from "react"
import { useResponsiveViewport } from "use-responsive-viewport"

const App = () => {
  useResponsiveViewport() // just put this line!

  return <YourApp />
}
```

## API

| Param    | Type        | Required | Default | Notes                      |
| -------- | ----------- | -------- | ------- | -------------------------- |
| minWidth | number (px) | false    | 360     | Fix the screen width from. |

### Example

```
useResponsiveViewport(375)
```

or
| Prop | Type | Required | Default | Notes |
| -------- | ----------- | -------- | ------- | ------- |
| delay | number (ms) | false | 200 | Seconds of debounce. **Smaller values result in worse performance.** |
| minWidth | number (px) | false | 360 | Fix the screen width from. |

### Example

```
useResponsiveViewport({ delay: 350, minWidth: 375 })
```

## License

MIT

## TODO

- [ ] Write tests.
