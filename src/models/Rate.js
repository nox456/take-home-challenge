import puppeteer from "puppeteer";
import db from "../database/db.js"
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
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
        const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        return {
            price: rate,
            date: `${year}-${month}-${day}`
        }
    }
    static async save(rate) {
        const ratesFound = await db.query("SELECT id FROM rates WHERE date = $1", [rate.date])
        const dateExists = ratesFound.rows.length > 0
        if (dateExists) {
            await db.query("UPDATE rates SET price = $1 WHERE date = $2", [rate.price, rate.date])
            return false;
        } else {
            await db.query("INSERT INTO rates VALUES (DEFAULT, $1, $2)", [rate.price, rate.date])
            return true;
        }
    }
}
