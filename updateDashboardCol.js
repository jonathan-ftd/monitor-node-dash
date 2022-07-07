const axios = require("axios");

const ENDPOINT = "https://monitor30-dashboard-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/monitor/updateDashboard30";
const DASHBOARDS = [
    {
        name: "EXPRESS", 
        deltaTime: 30000
    },
    {
        name: "FLASH", 
        deltaTime: 60000
    },
    {
        name: "FRAUD", 
        deltaTime: 180000
    },
    {
        name: "FACTURADAS", 
        deltaTime: 180000
    },
    {
        name: "SPECIALS", 
        deltaTime: 60000
    },
    {
        name: "RX", 
        deltaTime: 180000
    },
    {
        name: "PROGRAMMED", 
        deltaTime: 120000
    },
    {
        name: "MESSENGERS", 
        deltaTime: 180000
    },
    {
        name: "CANCELED", 
        deltaTime: 280000
    },
    {
        name: "PAYU_WITHOUT_FINALIZE", 
        deltaTime: 180000
    }
];
const TIMEZONE = {timeZone: "America/Bogota"};

const dashboardsRetryRequest = ["CANCELED", "PAYU_WITHOUT_FINALIZE", "MESSENGERS"];

(function() {
    const updateDashboardMonitor = async function(dashboardType) {
        try {
            const res = await axios.get(`${ENDPOINT}/${dashboardType}`);
            if (res?.status === 200) {
                console.log(dashboardType, new Date().toLocaleString("en-US", TIMEZONE), res.data.data.message);
            }
        } catch (err) {
            console.log(new Date().toLocaleString("en-US", TIMEZONE), "ERROR WHEN CALLING updateDashboard30", dashboardType, err)
            if (dashboardsRetryRequest.includes(dashboardType) && err?.response?.status === 503) {
                console.log("RETRYING TO UPDATE REDIS CACHE IN ", dashboardType);
                updateDashboardMonitor(dashboardType);
            }
        }
    } 

    try {
        for (let dash of DASHBOARDS) {
            setInterval(() => {
                updateDashboardMonitor(dash.name);
             }, dash.deltaTime);
        }
    } catch (err) {
        console.log("ERROR WHEN CALLING INTERVAL", err);
    }
})();
