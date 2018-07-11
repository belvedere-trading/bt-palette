const ColorConstants = {
    COLOR_MAX: 255,
    COLOR_MIN: 0,
    ANCHOR_COLOR_INCREMENT: 15,
};


const makePalette = (length) => {
    const palette = [];

    let inc = 0;

    while (inc < length) {
        const color = getRandomColor(inc, length);
        palette.push(color);
        inc++;
    }

    adjustPaletteTemperature(palette);

    return transformPaletteForCSS(palette);
}

const getRGB = (i, length) => {
    const minRange = (i * ColorConstants.COLOR_MAX) / length;
    const maxRange = ((i + 1) * ColorConstants.COLOR_MAX) / length;

    const min = Math.ceil(minRange);
    const max = Math.floor(maxRange);

    return Math.floor(Math.random() * (max - min)) + min;
}

const getGreatestInObj = (obj) => {
    const arr = Object.values(obj);
    const greatest = arr.reduce((acc, val) => (val >= acc ? val : acc), 0);

    let key;

    for (let objKey in obj) {
        if (obj[objKey] === greatest) {
            key = objKey;
        }
    }

    return key;
}

const getRandomColor = (i, length) => {
    let r = getRGB(i, length);
    let g = getRGB(i, length);
    let b = getRGB(i, length);

    return { r, g, b };
}

const adjustRGBTemperature = (color, anchorColor) => {
    const adjustedColor = ColorConstants.ANCHOR_COLOR_INCREMENT + color[anchorColor];

    if (adjustedColor >= ColorConstants.COLOR_MAX) {
        color[anchorColor] = ColorConstants.COLOR_MAX;
    } else {
        color[anchorColor] = adjustedColor;
    }
}

const adjustPaletteTemperature = (palette) => {
    const anchorColor = getAnchorColor(palette);

    palette.forEach((color, i) => adjustRGBTemperature(color, anchorColor, i));
}

const getAnchorColor = (palette) => {
    const total = {
        r: 0,
        g: 0,
        b: 0
    };

    for (let color of palette) {
        total.r = total.r + color.r;
        total.g = total.g + color.g;
        total.b = total.b + color.b;
    }

    return getGreatestInObj(total);
}

const getRGBString = (rgb) => {
    // string formatted for CSS
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

const getForegroundString = (rgb) => {
    const threshhold = (ColorConstants.COLOR_MAX * 3) / 2;

    if ((rgb.r + rgb.g + rgb.b) > threshhold) {
        return 'rgb(0, 0, 0)';
    } else {
        return 'rgb(255, 255, 255)';
    }
}

const transformPaletteForCSS = (palette) => {
    return palette.map((color) => ({
        foreground: getForegroundString(color),
        background: getRGBString(color)
    }));
}

const palette = {
    makePalette,
    getRGB,
    getGreatestInObj,
    getRandomColor,
    adjustRGBTemperature,
    getAnchorColor,
    getRGBString,
    getForegroundString,
    transformPaletteForCSS
};

module.exports = palette;
