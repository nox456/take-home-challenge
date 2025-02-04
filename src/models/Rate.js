import puppeteer from "puppeteer";
import { BCV_URL, DOLLAR_ELEMENT_SELECTOR } from "../config/consts.js";

export default class Rate {
    static async scrape() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(BCV_URL);
        const element = await page.$(DOLLAR_ELEMENT_SELECTOR)
        const rate = await element.evaluate(el => {
            return parseFloat(el.innerText.replace(",", ".")).toFixed(2)
        })
        await browser.close()
        return rate
    }
}
