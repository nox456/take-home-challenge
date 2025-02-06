import Rate from "../models/Rate.js"

export default class RateController {
    static async getCurrent(req,res) {
        const rate = await Rate.getCurrent()
        return res.status(200).json(rate)
    }
}
