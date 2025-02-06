import Rate from "../models/Rate.js";

export default class RateController {
    static async getCurrent(req, res) {
        const rate = await Rate.getCurrent();
        return res.status(200).json(rate);
    }
    static async getHistory(req, res) {
        const { start_date, end_date } = req.query;
        const rates = await Rate.getHistory(start_date, end_date);
        return res.status(200).json(rates);
    }
}
