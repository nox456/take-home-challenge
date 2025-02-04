import { CronJob } from "cron";
import Rate from "../models/Rate.js";

export default CronJob.from({
    cronTime: "0 0 5 * * *",
    onTick: async () => {
        const rate = await Rate.scrape()
    },
    runOnInit: true
})
