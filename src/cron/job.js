import { CronJob } from "cron";
import Rate from "../models/Rate.js";
import { JOB_TIME } from "../config/env.js";

export default CronJob.from({
    cronTime: JOB_TIME,
    onTick: async () => {
        console.log("Scrapping data...")
        const rate = await Rate.scrape()
        const isSaved = await Rate.save(rate)
        if (isSaved) {
            console.log("Rate stored in database!")
        } else {
            console.log("Rate updated in database!")
        }
    },
    runOnInit: true
})
