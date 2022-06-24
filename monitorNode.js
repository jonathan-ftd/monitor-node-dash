const axios = require("axios");

const ENDPOINT = "https://monitor30-dashboard-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/monitor/updateDashboard30";
const DASHBOARD_TYPE = {express: "EXPRESS", flash: "FLASH", fraud: "FRAUD"};
const TIMEZONE = {timeZone: "America/Bogota"};
const INTERVAL_TIME = 30000;

(function() {
    const updateDashboardMonitor = async function(dashboardType) {
        try {
            const res = await axios.get(`${ENDPOINT}/${dashboardType}`);
            console.log(dashboardType, new Date().toLocaleString("en-US", TIMEZONE), res.data.data.message);
        } catch (err) {
            console.log(new Date().toLocaleString("en-US", TIMEZONE), "ERROR WHEN CALLING updateDashboard30", dashboardType, err)
        }
    } 

    try {
        setInterval(() => {
           updateDashboardMonitor(DASHBOARD_TYPE.flash);
        }, INTERVAL_TIME);
    } catch (err) {
        console.log("ERROR WHEN CALLING INTERVAL", err);
    }
})();

