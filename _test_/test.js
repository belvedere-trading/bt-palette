const expect = require('chai').expect;

const palette = require('../index');


describe('makePalette', () => {
    const testPalette = palette.makePalette(3);

    it('returns an array', () => {
        expect(testPalette)
            .to.be.an('Array');
    });

    it('the array is the same length as the provided length param', () => {
        expect(testPalette)
            .to.have.length(3);
    });
});


describe('getRGB', () => {
    const rgb1 = palette.getRGB(1, 3);
    const rgb2 = palette.getRGB(0, 3);

    it('returns a number', () => {
        expect(rgb1)
            .to.be.a('Number');
    });

    it('the number is within the rgb screen spectrum', () => {
        expect(rgb1)
            .to.be.below(255);

        expect(rgb1)
            .to.be.above(0);
    });

    it('the range that the number is in uses the i param as its base and increments up based on the length of the palette', () => {
        expect(rgb1)
            .to.be.above(255 / 3);
    });

    it('if the inc equals 0, the min limit for the resulting number is 0', () => {
        expect(rgb2)
            .to.be.above(0);
    });

    it('the range that the number is in uses the i param as its upper limit and increments up based on the length of the palette', () => {
        expect(rgb1)
            .to.be.below((2 * 255) / 3);
    });
});


describe('getGreatestInObj', () => {
    const obj1 = {
        r: 10,
        g: 20,
        b: 30
    };

    const obj2 = {
        r: 10,
        g: 40,
        b: 30
    };

    const obj3 = {
        r: 60,
        g: 20,
        b: 30
    };

    const greatestInObj1 = palette.getGreatestInObj(obj1);
    const greatestInObj2 = palette.getGreatestInObj(obj2);
    const greatestInObj3 = palette.getGreatestInObj(obj3);

    it('returns a string', () => {
        expect(greatestInObj1)
            .to.be.a('String');
    });

    it('returns the string key for the corresponding greatest number value', () => {
        expect(greatestInObj1)
            .to.equal('b');

        expect(greatestInObj2)
            .to.equal('g');

        expect(greatestInObj3)
            .to.equal('r');
    });
});


describe('getRandomColor', () => {
    const randomColor = palette.getRandomColor(1, 3);

    it('returns an object with keys \'r\', \'g\', \'b\'', () => {
        expect(randomColor)
            .to.have.keys('r', 'g', 'b');
    });

    it('the values in the object are numbers', () => {
        for (let rgb in randomColor) {
            expect(randomColor[rgb])
                .to.be.a('Number');
        }
    });

    it('the numbers are all between 0 and 255', () => {
        for (let rgb in randomColor) {
            expect(randomColor[rgb])
                .to.be.above(0);

            expect(randomColor[rgb])
                .to.be.below(255);
        }
    });
});


describe('adjustRGBTemperature', () => {
    const color1 = {
        r: 10,
        g: 20,
        b: 250
    };

    const color2 = {
        r: 10,
        g: 20,
        b: 30
    };

    palette.adjustRGBTemperature(
        color1,
        'b',
        1
    );

    palette.adjustRGBTemperature(
        color2,
        'b',
        1
    );

    it('adjusts the temperature of the color by adding the anchor color increment to the most dominant color', () => {
        expect(color2['b'])
            .to.equal(45);
    });

    it('does not adjust the color past the rgb spectrum', () => {
        expect(color1['b'])
            .to.equal(255);
    });

    it('does not modify the non dominent color values in the object', () => {
        expect(color1['r'])
            .to.equal(10);
    });

    it('does not modify the non dominent color values in the object', () => {
        expect(color1['g'])
            .to.equal(20);
    });
});


describe('getAnchorColor', () => {
    const testPalette = [
        { r: 10, g: 20, b: 30 },
        { r: 40, g: 50, b: 60 },
        { r: 70, g: 80, b: 90 },
        { r: 100, g: 110, b: 120 }
    ];

    const anchorColor = palette.getAnchorColor(testPalette);

    it('returns a string', () => {
        expect(anchorColor)
            .to.be.a('String');
    });

    it('value returned is the color that has the greatest aggregate value in the supplied palette array', () => {
        expect(anchorColor)
            .to.equal('b');
    });
});

describe('getRGBString', () => {
    const rgbString = palette.getRGBString({ r: 10, g: 20, b: 30 });

    it('returns a string', () => {
        expect(rgbString)
            .to.be.a('String');
    });

    it('returns an rgb string that is css parsable', () => {
        expect(rgbString)
            .to.equal('rgb(10, 20, 30)');
    });
});


describe('getForegroundString', () => {
    const lightRgbString = palette.getForegroundString({ r: 10, g: 20, b: 30 });
    const darkRgbString = palette.getForegroundString({ r: 230, g: 240, b: 250 });
    const middleGrayRgbString = palette.getForegroundString({ r: 127.5, g: 127.5, b: 127.5 });

    it('returns a string', () => {
        expect(lightRgbString)
            .to.be.a('String');

        expect(darkRgbString)
            .to.be.a('String');
    });

    it('returns \'rgb(0, 0, 0)\' if the average value of the rgb param is darker than middle gray', () => {
        expect(darkRgbString)
            .to.equal('rgb(0, 0, 0)');
    });

    it('returns \'rgb(255, 255, 255)\' if the average value of the rgb param is lighter than middle gray', () => {
        expect(lightRgbString)
            .to.equal('rgb(255, 255, 255)');
    });

    it('returns \'rgb(255, 255, 255)\' if the average value of the rgb param is exactly middle gray', () => {
        expect(middleGrayRgbString)
            .to.equal('rgb(255, 255, 255)');
    });
});


describe('transformPaletteForCSS', () => {
    const testPalette = [{
        r: 10,
        g: 20,
        b: 30
    }, {
        r: 40,
        g: 50,
        b: 60
    }, {
        r: 230,
        g: 240,
        b: 250
    }];
    const transformedPalette = palette.transformPaletteForCSS(testPalette);

    it('returns an array', () => {
        expect(transformedPalette)
            .to.be.an('Array');
    });

    it('each item in the array has foreground and background keys', () => {
        for (let color of transformedPalette) {
            expect(color)
                .to.have.keys('foreground', 'background');
        }
    });

    it('values for the for the foreground and background keys are strings', () => {
        for (let color of transformedPalette) {
            expect(color['foreground'])
                .to.be.a('string');

            expect(color['background'])
                .to.be.a('string');
        }
    });

    it('background values correspond to colors in the provided palette param', () => {
        expect(transformedPalette[0].background)
            .to.equal('rgb(10, 20, 30)');

        expect(transformedPalette[1].background)
            .to.equal('rgb(40, 50, 60)');

        expect(transformedPalette[2].background)
            .to.equal('rgb(230, 240, 250)');
    });

    it('foreground values contrast the colors in the provided palette param', () => {
        expect(transformedPalette[0].foreground)
            .to.equal('rgb(255, 255, 255)');

        expect(transformedPalette[1].foreground)
            .to.equal('rgb(255, 255, 255)');

        expect(transformedPalette[2].foreground)
            .to.equal('rgb(0, 0, 0)');
    });
});
