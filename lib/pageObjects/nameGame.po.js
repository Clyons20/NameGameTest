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

    async selectCorrectAnswer(options = {}) {
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

    async selectWrongAnswer(options = {}) {
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

    async click10RaandomPhotos() {
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
}

module.exports = new NameGame();
