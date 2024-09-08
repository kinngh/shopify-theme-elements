import fs from "fs";
import theme_references from "./theme_references.js";

function generateLiquidSnippet(themes) {
  let liquidContent = `{% comment %}
  Renders the appropriate class for a theme's button element
  Accepts:
  - template: {String} The theme title (e.g., "Dawn")
  - element: {String} The element type (e.g., "button")
  - variant: {String} The button variant (e.g., "primary", "secondary", "tertiary", "add_to_cart")

  Usage:
  {% render 'ui_elements', template: "dawn", element: "button", variant: "primary" %}
{% endcomment %}

{% case template %}
`;

  themes.forEach((theme) => {
    liquidContent += `  {% when "${theme.theme_title.toLowerCase()}" %}
    {% case element %}
      {% when "button" %}
        {% case variant %}
`;

    Object.entries(theme.elements.button).forEach(([variant, classes]) => {
      liquidContent += `          {% when "${variant}" %}
            ${classes || variant}
`;
    });

    liquidContent += `          {% else %}
            {{ variant }}
        {% endcase %}
      {% else %}
        {{ element }}
    {% endcase %}
`;
  });

  liquidContent += `  {% else %}
    {{ theme }}
{% endcase %}`;

  return liquidContent;
}

const liquidSnippet = generateLiquidSnippet(theme_references);

fs.writeFileSync("ui_elements.liquid", liquidSnippet, "utf8");
console.log("ui_elements.liquid has been generated successfully.");
