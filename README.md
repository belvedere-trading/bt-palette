# BT Palette

This module returns an array of harmonious colors and a contrasting color for each one's foreground text.

## Example

const palette = require('bt-palette');

palette.makePalette(3);

Outputs:
```
[

    {
        foreground: 'rgb(255, 255, 255)',
        background: 'rgb(4, 7, 59)'
    },

    {
        foreground: 'rgb(0, 0, 0)',
        background: 'rgb(124, 128, 172)'
    },

    {
        foreground: 'rgb(0, 0, 0)',
        background: 'rgb(223, 182, 210)'
    }

]
```

## Why BT Palette?

Colors will be returned as CSS parsable strings in even value steps according to the number that you supply. Their temperature is automatically adjusted before being delivered to you! The foreground color is calculated based on value; if the color is lighter than middle gray your foreground color will be black, and if it's darker, your foreground color will be white.

