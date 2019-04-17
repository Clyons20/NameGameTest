const nameGamePage = require('../lib/pageObjects/nameGame.po');

describe('Name Game Feature', () => {
    let count;
    let countAfter;
    let nameOnPhotos;

    beforeEach(async () => {
        await nameGamePage.clearCookies();
        await nameGamePage.navigateTo();
        await nameGamePage.validatePageLoaded();
    });

    it('Should verify the "streak" counter is incrementing and name/displayed photos change after correct answer.', async () => {
        count = await nameGamePage.elements.streak.getText();
        const images = await nameGamePage.elements.pictures.image.findElements();
        await nameGamePage.selectCorrectAnswer();
        await nameGamePage.validatePageLoaded();

        countAfter = await nameGamePage.elements.streak.getText();
        const nameOnPhotosAfter = await nameGamePage.elements.pictures.nameOnPhoto.findElements();
        const imagesAfter = await nameGamePage.elements.pictures.image.findElements();
        expect(countAfter).toBeGreaterThan(count);
        expect(nameOnPhotosAfter).not.toContain(nameOnPhotos);
        expect(images).not.toContain(imagesAfter);
    });

    it('Should verify that the multiple “streak” counter resets after getting an incorrect answer', async () => {
        await nameGamePage.selectCorrectAnswer();
        await nameGamePage.validatePageLoaded();

        count = await nameGamePage.elements.streak.getText();
        await nameGamePage.selectWrongAnswer();
        await driver.sleep(500);
        countAfter = await nameGamePage.elements.streak.getText();
        expect(countAfter).toBeLessThan(count);
    });

    it('Should verify that tries and correct counter are being incremented after 10 random selections', async () => {
        await nameGamePage.click10RaandomPhotos();
        const countOnTries = await nameGamePage.elements.attempts.getText();
        const countOnCorrect = await nameGamePage.elements.correct.getText();

        await nameGamePage.selectCorrectAnswer();
        await nameGamePage.validatePageLoaded();
        const countOnTriesAfter = await nameGamePage.elements.attempts.getText();
        const countOnCorrectAfter = await nameGamePage.elements.correct.getText();

        expect(countOnTriesAfter).toBeGreaterThan(countOnTries);
        expect(countOnCorrectAfter).toBeGreaterThan(countOnCorrect);
    });

});
