# Theme Elements

Building theme app extensions is difficult. This repo aims to output CSS classes from a bunch of baseline elements that are usually required to build theme app extensions that feel like they belong to the theme.

## How

[`theme_references.js`](./theme_references.js) contains a list of all known OS 2.0 themes from the Shopify Theme Store, along with their store pages, elements and their variants. If you plan to support certain themes, generate the `ui_elements.liquid` file and use it in your Liquid file:

```html
<button
  class="{% render 'ui_elements', template: 'dawn', element: 'button', variant: 'primary'%}"
>
  Button Content
</button>
```

## The problem

- Exceeds the 100kb Liquid limit and using JS is not optimal.

## The solution

For now I just want to generate a liquid file. Once I have a few themes' content in, I'll write to a metafield the classes that are required, which would cut down on the limitations of using theme ui elements.

## Contributions

Special thanks to [Taylor Page](https://x.com/TRPage_dev) for the `theme_references` file.
