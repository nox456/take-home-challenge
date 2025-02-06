import Rate from "../models/rate.model.js";

export default class RateController {
    static async getCurrent(_, res) {
        let rate
        try {
            rate = await Rate.getCurrent();
        } catch(e) {
            console.error(e)
            return res.status(500).json({ message: "Internal Server Error!" })
        }
        if (rate) {
            return res.status(200).json(rate);
        } else return res.status(404).json({ message: "No rates found!" })
    }
    static async getHistory(req, res) {
        const { start_date, end_date } = req.query;
        let rates
        if (!Rate.validateDate(start_date)) {
            return res.status(400).json({ message: "Invalid Date!", field: "start_date", data: start_date })
        }
        if (!Rate.validateDate(end_date)) {
            return res.status(400).json({ message: "Invalid Date!", field: "end_date", data: end_date })
        }
        try {
            rates = await Rate.getHistory(start_date, end_date);
        } catch(e) {
            console.error(e)
            return res.status(500).json({ message: "Internal Server Error!" })
        }
        if (rates.length > 0) {
            return res.status(200).json(rates);
        } else return res.status(404).json({ message: "No rates found!" })
    }
}
