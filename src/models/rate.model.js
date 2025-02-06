import puppeteer from "puppeteer";
import db from "../database/db.js";
import { BCV_URL, DOLLAR_ELEMENT_SELECTOR } from "../config/consts.js";

export default class Rate {
    static async scrape() {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(BCV_URL);
        const element = await page.$(DOLLAR_ELEMENT_SELECTOR);
        const price = await element.evaluate((el) => {
            return parseFloat(el.innerText.replace(",", ".")).toFixed(2);
        });
        await browser.close();
        const date = new Date().toJSON().slice(0, 10);
        return {
            price,
            date,
        };
    }
    static async save(rate) {
        const ratesFound = await db.query(
            "SELECT id FROM rates WHERE date = $1",
            [rate.date],
        );
        const dateExists = ratesFound.rows.length > 0;
        if (dateExists) {
            await db.query("UPDATE rates SET price = $1 WHERE date = $2", [
                rate.price,
                rate.date,
            ]);
            return false;
        } else {
            await db.query("INSERT INTO rates VALUES (DEFAULT, $1, $2)", [
                rate.price,
                rate.date,
            ]);
            return true;
        }
    }
    static async getCurrent() {
        const rateQuery = await db.query(
            "SELECT price, date FROM rates ORDER BY date DESC LIMIT 1",
        );
        if (rateQuery.rowCount > 0) {
            const rate = rateQuery.rows[0];
            return {
                rate: rate.price,
                date: new Date(rate.date).toJSON().slice(0, 10),
            };
        } else return null;
    }
    static async getHistory(startDate, endDate) {
        let ratesQuery;
        if (startDate && endDate) {
            ratesQuery = await db.query(
                "SELECT price, date FROM rates WHERE date >= $1 AND date <= $2 ORDER BY date ASC",
                [startDate, endDate],
            );
        } else if (startDate) {
            ratesQuery = await db.query(
                "SELECT price, date FROM rates WHERE date >= $1 ORDER BY date ASC",
                [startDate],
            );
        } else if (endDate) {
            ratesQuery = await db.query(
                "SELECT price, date FROM rates WHERE date <= $1 ORDER BY date ASC",
                [endDate],
            );
        } else {
            ratesQuery = await db.query(
                "SELECT price, date FROM rates ORDER BY date ASC",
            );
        }
        return ratesQuery.rows.map((rate) => {
            return {
                rate: rate.price,
                date: new Date(rate.date).toJSON().slice(0, 10),
            };
        });
    }
    static validateDate(date) {
        return !isNaN(new Date(date));
    }
}
