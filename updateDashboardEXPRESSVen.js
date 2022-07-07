const axios = require("axios");

const ENDPOINT = "https://monitor30-dashboard-dot-oracle-services-vzla.uc.r.appspot.com/backend/flexible/v2/monitor/updateDashboard30";
const DASHBOARDS = [
    {
        name: "EXPRESS", 
        deltaTime: 30000
    }
];
const TIMEZONE = {timeZone: "America/Bogota"};

const dashboardsRetryRequest = [];

(function() {
    const updateDashboardMonitor = async function(dashboardType) {
        try {
            const res = await axios.get(`${ENDPOINT}/${dashboardType}`);
            if (res.status === 200) {
                console.log(dashboardType, new Date().toLocaleString("en-US", TIMEZONE), res.data.data.message);
            }
        } catch (err) {
            console.log(new Date().toLocaleString("en-US", TIMEZONE), "ERROR WHEN CALLING updateDashboard30", dashboardType, err)
            /*if (dashboardsRetryRequest.includes(dashboardType) && err?.response?.status === 503) {
                console.log("RETRYING TO UPDATE REDIS CACHE IN ", dashboardType);
                updateDashboardMonitor(dashboardType);
            }*/
        }
    } 

    try {
        setInterval(() => {
            updateDashboardMonitor(DASHBOARDS[0].name);
        }, DASHBOARDS[0].deltaTime);
    } catch (err) {
        console.log("ERROR WHEN CALLING INTERVAL", err);
    }
})();