const ConstructorPage = require('./ConstructorPage');
const TestElements = require('../../lib/testElements/');
const by = require('selenium-webdriver').By;

class NameGame extends ConstructorPage {
    constructor() {
        super(NameGame.expectedValues, NameGame.path);
        this.elements = NameGame.elements;
    }

    static get path() {
        return '/name-game';
    }

    static get expectedValues() {
        return { title: 'name game' };
    }

    static get elements() {
        return {
            pictures: {
                photo: new TestElements.Base(by.className('photo')),
                nameOnPhoto: new TestElements.Base(by.className('name')),
                image: new TestElements.Base(by.tagName('img')),
            },
            attempts: new TestElements.Base(by.className('attempts')),
            correct: new TestElements.Base(by.className('correct')),
            streak: new TestElements.Base(by.className('streak')),
            nameOfPerson: new TestElements.Base(by.css('#name'))
        };
    }

    async validatePageLoaded() {
        await driver.sleep(7000);
    }

    async selectCorrectAnswser(options = {}) {
        let name;
        options.nameToLookFor = options.nameToLookFor || await this.elements.nameOfPerson.getText();
        options.photos = options.photos || await this.elements.pictures.photo.findElements();
        options.nameOnPhotos = options.nameOnPhotos || await this.elements.pictures.nameOnPhoto.findElements();

        for (let i = 0; i < options.nameOnPhotos.length; i++) {
            name = await options.nameOnPhotos[i].getText();
            if (name === options.nameToLookFor) {
                await options.photos[i].click();
                break;
            }
        }
        return name;
    }

    async selectAWrongAnswer(options = {}) {
        let name;
        options.nameToLookFor = options.nameToLookFor || await this.elements.nameOfPerson.getText();
        options.photos = options.photos || await this.elements.pictures.photo.findElements();
        options.nameOnPhotos = options.nameOnPhotos || await this.elements.pictures.nameOnPhoto.findElements();

        for (let i = 0; i < options.nameOnPhotos.length; i++) {
            name = await options.nameOnPhotos[i].getText();
            if (name !== options.nameToLookFor) {
                await options.photos[i].click();
                break;
            }
        }
        return name;
    }

    async clickOnRandom10Photos() {
        let count = 0;
        do {
            const photos = await this.elements.pictures.photo.findElements();
            const pic = await photos[Math.floor(Math.random() * photos.length)];
            const attribute = await pic.getAttribute('class');
            if (attribute === 'photo') {
                await pic.click();
                count++;
                await driver.sleep(1000);
                const attributeAfter = await pic.getAttribute('class');
                if (attributeAfter === 'photo correct') {
                    await this.validatePageLoaded();
                }
            }
        } while (count < 10);
    }

    async wrongSelectionRepeats(wrongName, correctName) {
        let wrongCount;
        let correctCount;

        for(let i = 0; i < 10; i++) {
            wrongCount = 0;
            correctCount = 0;

            await this.refreshBrower();
            await this.validatePageLoaded();
            const names = await this.elements.pictures.nameOnPhoto.findElements();
            for(let j = 0; j < names.length; j++) {
                if (names.includes(wrongName)) {
                    wrongCount++;
                    return wrongCount;
                } else if (names.includes(correctName)) {
                    correctCount++;
                    return correctCount;
                }
            }
        }
        return [wrongCount, correctCount];
    }
}

module.exports = new NameGame();