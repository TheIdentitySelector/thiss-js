
import { detect } from "detect-browser";


let COMPLIANT = ["chrome", "chromium"];

if (process.env.SAA_COMPLIANT_BROWSERS !== undefined) {
    try {
        COMPLIANT = JSON.parse(process.env.SAA_COMPLIANT_BROWSERS);
    } catch (err) {
        console.log(`Problem with configured browsers: ${process.env.SAA_COMPLIANT_BROWSERS}`);
    }
}

export const isCompliant = () => {
    const browser = detect();
    if (browser && COMPLIANT.includes(browser.name)) {
        return true;
    }
    return false;
}
