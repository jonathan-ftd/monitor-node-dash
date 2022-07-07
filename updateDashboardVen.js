const axios = require("axios");

const ENDPOINT = "https://monitor30-dashboard-dot-oracle-services-vzla.uc.r.appspot.com/backend/flexible/v2/monitor/updateDashboard30";
const DASHBOARDS = [
    {
        name: "PROGRAMMED", 
        deltaTime: 90000
    },
    
    {
        name: "TIMES_EXCEEDED", 
        deltaTime: 180000
    },
    {
        name: "FRAUD", 
        deltaTime: 180000
    },
    {
        name: "PAGO_MOVIL", 
        deltaTime: 180000
    },
    {
        name: "WEIGHT", 
        deltaTime: 180000
    }
];

const dashboardsRetryRequest = ["TIMES_EXCEEDED", "FRAUD", "PAGO_MOVIL", "WEIGHT"];

const TIMEZONE = {timeZone: "America/Bogota"};

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
        for (let dash of DASHBOARDS) {
            setInterval(() => {
                updateDashboardMonitor(dash.name);
             }, dash.deltaTime);
        }
    } catch (err) {
        console.log("ERROR WHEN CALLING INTERVAL", err);
    }
})();
