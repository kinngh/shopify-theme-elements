# WIP | Theme Elements | ETA: Jan 2025

Building theme app extensions is difficult. This repo aims to output CSS classes from a bunch of baseline elements that are usually required to build theme app extensions that feel like they belong to the theme.

## How To Use Theme Elements

- Copy the [`theme_references.js`](./theme_references.js) file to your app.

- Create a dropdown that contains `theme_title` as the options.

  - This contains the theme names, in all lower case. Make sure to make the first letter capital when you create your dropdown.

- On selection, make write to metafield that theme's configuration data.

```javascript
const shopDetails = await client.request(
  `{
        shop {
            id
        }
      }`,
);

const shopId = shopDetails.data.shop.id;

const write_shipping_metafield = await client.request(
  `
    mutation CreateAppDataMetafield(
    $metafieldsSetInput: [MetafieldsSetInput!]!
    ) {
        metafieldsSet(metafields: $metafieldsSetInput) {
            metafields {
                key
                ownerType
                type
                value
                namespace
            }
            userErrors {
                field
                message
            }
        }
    }`,
  {
    variables: {
      metafieldsSetInput: [
        {
          ownerId: shopId,
          namespace: "namespace",
          key: "key",
          value: JSON.stringify(theme_references.selectedTheme), //<-- Selected theme goes here
          type: "json",
        },
      ],
    },
  },
);
```

- Your data in the JSON metafield should look something like this.
  - You can choose to just write the `elements` entry, but I prefer to add in the `theme_title` too, just so I can debug it later if required.

```json
{
  "dawn": {
    "theme_title": "dawn",
    "theme_url": "https://themes.shopify.com/themes/dawn",
    "elements": {
      "button": {
        "primary": "button button--primary",
        "secondary": "button button--secondary",
        "add_to_cart": "shopify-payment-button"
      }
    },
    "selectors": {
      "slider_cart": {
        "add_to_cart_group": ".atc_group" //dummy
      }
    }
  }
}
```

- In your theme extension, assign the value of metafield to a Liquid Variable
  - Note that since you're storing it as a JSON, you need to have `.value` at the end of it or it's not going to treat it like a JSON.

```liquid
    {% assign theme_elements = shop.metafields.namespace.key.value %}
```

- Now the classes from theme elements are available to use in your code.

```liquid
<button class="{{ theme_elements.elements.button.primary }}">Primary button</button>
```

- `selectors` are classes that help you insert elements inside a theme's popup carts and other elements that are harder to access via Liquid.

```liquid
<script>
  window.app_name= {};
  window.app_name.slider_cart_selector= " {{ theme_elements.selectors.slider_cart.add_to_cart_group }}";
</script>
```

This would now allow you to inject your buttons in the slider cart.

## Contributions

Special thanks to [Taylor Page](https://x.com/TRPage_dev) for the initial `theme_references` file that had all the 222 themes' data.
