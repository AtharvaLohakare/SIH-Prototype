// =====================================================
// LOGISENSE AI - COMPLETE SCRIPT.JS
// =====================================================

// -----------------------------------------------------
// GLOBAL VARIABLES
// -----------------------------------------------------

let toastTimer;
let currentRouteMode = "city";

let routeMap = null;
let routeLine = null;
let sourceMarker = null;
let destinationMarker = null;


// =====================================================
// INITIALIZE APPLICATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Initialize charts
    initializeCharts();

    // Hide suggestions initially
    showSuggestions("source");
    showSuggestions("destination");

    // Optional: Initialize mobile navigation
    initializeMobileMenu();
});


// =====================================================
// NAVIGATION
// =====================================================

function showPage(pageId, button) {

    // Hide all pages
    document.querySelectorAll(".page").forEach(function (page) {
        page.classList.remove("active");
    });

    // Show selected page
    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    // Remove active navigation
    document.querySelectorAll(".nav-item").forEach(function (item) {
        item.classList.remove("active");
    });

    // Add active class
    if (button) {
        button.classList.add("active");
    }

    // Scroll top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    // Reinitialize icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    showToast(pageId.toUpperCase() + " opened");
}


// =====================================================
// TOAST
// =====================================================

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) {
        console.log(message);
        return;
    }

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


// =====================================================
// MOBILE MENU
// =====================================================

function initializeMobileMenu() {

    const menuButton = document.getElementById("menuButton");
    const sidebar = document.querySelector(".sidebar");

    if (!menuButton || !sidebar) {
        return;
    }

    menuButton.addEventListener("click", function () {
        sidebar.classList.toggle("mobile-open");
    });
}


// =====================================================
// MAP STATE INFORMATION
// =====================================================

function stateInfo(state, score, risk) {

    const details = document.getElementById("stateDetails");

    if (!details) {
        return;
    }

    let color = "var(--green)";

    if (risk === "Moderate") {
        color = "var(--orange)";
    }

    if (risk === "High") {
        color = "var(--red)";
    }

    details.innerHTML = `
        <div style="padding:10px 0">

            <h2 style="font-size:20px">
                ${state}
            </h2>

            <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:12px;
                margin-top:18px
            ">

                <div style="
                    padding:15px;
                    background:rgba(255,255,255,.04);
                    border-radius:10px
                ">

                    <small style="color:var(--muted)">
                        Accessibility
                    </small>

                    <h2 style="
                        color:var(--cyan);
                        margin-top:5px
                    ">
                        ${score}/100
                    </h2>

                </div>

                <div style="
                    padding:15px;
                    background:rgba(255,255,255,.04);
                    border-radius:10px
                ">

                    <small style="color:var(--muted)">
                        Risk Level
                    </small>

                    <h3 style="
                        color:${color};
                        margin-top:8px
                    ">
                        ${risk}
                    </h3>

                </div>

            </div>

            <p style="
                color:var(--muted);
                font-size:12px;
                line-height:1.6;
                margin-top:18px
            ">

                AI analysis indicates regional logistics conditions
                based on accessibility, weather patterns,
                road conditions and transport risk.

            </p>

        </div>
    `;

    showToast(state + " intelligence loaded");
}


// =====================================================
// MAP LAYER TOGGLE
// =====================================================

function toggleLayer(button) {

    button.classList.toggle("active-layer");

    const status = button.classList.contains("active-layer")
        ? "enabled"
        : "disabled";

    showToast(
        button.textContent.trim() + " layer " + status
    );
}


// =====================================================
// DASHBOARD AI SCAN
// =====================================================

function runAIScan() {

    showToast("AI scanning all 8 North East states...");

    let value = 65;

    const accessibility =
        document.getElementById("accessibilityValue");

    if (!accessibility) {
        return;
    }

    const scanInterval = setInterval(function () {

        value++;

        accessibility.textContent = value + "/100";

        if (value >= 72) {

            clearInterval(scanInterval);

            showToast(
                "AI scan complete! Accessibility improved to 72/100"
            );
        }

    }, 120);
}


// =====================================================
// AI RISK PREDICTION
// =====================================================

function predictRisk() {

    const rainfall =
        Number(document.getElementById("rainfall").value);

    const road =
        Number(document.getElementById("roadCondition").value);

    const traffic =
        Number(document.getElementById("traffic").value);

    const landslide =
        Number(document.getElementById("landslide").value);

    const region =
        document.getElementById("riskRegion").value;


    // Weighted risk formula

    let risk =
        rainfall * 0.25 +
        road * 0.30 +
        traffic * 0.20 +
        landslide * 0.25;

    risk = Math.round(risk);

    if (risk > 99) {
        risk = 99;
    }


    // Elements

    const placeholder =
        document.getElementById("predictionPlaceholder");

    const result =
        document.getElementById("predictionResult");

    const loading =
        document.getElementById("aiLoading");


    if (placeholder) {
        placeholder.style.display = "none";
    }

    if (result) {
        result.style.display = "none";
    }

    if (loading) {
        loading.style.display = "block";
    }


    // Progress

    const progress =
        document.getElementById("aiProgress");

    const loadingText =
        document.getElementById("aiLoadingText");


    const messages = [

        "Collecting environmental intelligence...",
        "Analyzing rainfall patterns...",
        "Evaluating road conditions...",
        "Calculating traffic disruption...",
        "Predicting landslide probability...",
        "Generating AI recommendation..."

    ];


    let percentage = 0;
    let messageIndex = 0;


    const interval = setInterval(function () {

        percentage += 10;

        if (progress) {
            progress.style.width = percentage + "%";
        }


        if (
            loadingText &&
            messageIndex < messages.length
        ) {

            loadingText.textContent =
                messages[messageIndex];

            messageIndex++;
        }


        if (percentage >= 100) {

            clearInterval(interval);

            setTimeout(function () {

                showPredictionResult(
                    risk,
                    rainfall,
                    road,
                    traffic,
                    landslide,
                    region
                );

            }, 400);
        }

    }, 350);
}


// =====================================================
// SHOW AI PREDICTION RESULT
// =====================================================

function showPredictionResult(
    risk,
    rainfall,
    road,
    traffic,
    landslide,
    region
) {

    const loading =
        document.getElementById("aiLoading");

    const result =
        document.getElementById("predictionResult");


    if (loading) {
        loading.style.display = "none";
    }

    if (result) {
        result.style.display = "block";
    }


    const score =
        document.getElementById("riskScore");

    const level =
        document.getElementById("riskLevel");

    const pointer =
        document.getElementById("riskPointer");

    const recommendation =
        document.getElementById("riskRecommendation");


    let riskText;
    let color;
    let recommendationText;
    let action;


    if (risk < 30) {

        riskText = "LOW RISK";
        color = "var(--green)";
        action = "Normal";

        recommendationText =
            "Logistics conditions are stable. Continue normal operations and maintain routine monitoring.";

    }

    else if (risk < 50) {

        riskText = "MODERATE RISK";
        color = "var(--orange)";
        action = "Monitor";

        recommendationText =
            "Moderate disruption is possible. Monitor weather and road conditions before dispatch.";

    }

    else if (risk < 75) {

        riskText = "HIGH RISK";
        color = "var(--orange)";
        action = "Reroute";

        recommendationText =
            "High logistics disruption probability detected. Consider alternate routes and reduce non-essential movement.";

    }

    else {

        riskText = "CRITICAL RISK";
        color = "var(--red)";
        action = "Avoid Route";

        recommendationText =
            "Critical disruption probability detected. Delay travel, activate emergency planning and avoid high-risk routes.";

    }


    // Risk score

    if (score) {

        score.textContent = risk;
        score.style.color = color;

    }


    // Risk level

    if (level) {

        level.textContent = riskText;
        level.style.color = color;

    }


    // Region

    const regionResult =
        document.getElementById("riskRegionResult");

    if (regionResult) {

        regionResult.textContent =
            "Analysis region: " + region;

    }


    // Pointer

    if (pointer) {

        setTimeout(function () {

            pointer.style.left =
                `calc(${risk}% - 9px)`;

        }, 100);

    }


    // Recommendation

    if (recommendation) {

        recommendation.textContent =
            recommendationText;

    }


    // Calculated values

    const delay =
        Math.max(
            0,
            Math.round(risk / 10)
        );


    const accessibility =
        Math.max(
            5,
            100 - risk
        );


    const confidence =
        Math.min(
            98,
            75 + Math.round(Math.random() * 20)
        );


    const delayHours =
        document.getElementById("delayHours");

    if (delayHours) {
        delayHours.textContent = delay + " hrs";
    }


    const accessibilityScore =
        document.getElementById("accessibilityScore");

    if (accessibilityScore) {
        accessibilityScore.textContent =
            accessibility + "%";
    }


    const confidenceScore =
        document.getElementById("confidenceScore");

    if (confidenceScore) {
        confidenceScore.textContent =
            confidence + "%";
    }


    const actionStatus =
        document.getElementById("actionStatus");

    if (actionStatus) {
        actionStatus.textContent = action;
    }


    // Factor analysis

    const factors = [

        {
            name: "Rainfall",
            value: rainfall
        },

        {
            name: "Road Condition",
            value: road
        },

        {
            name: "Traffic",
            value: traffic
        },

        {
            name: "Landslide",
            value: landslide
        }

    ];


    let factorHTML = "";


    factors.forEach(function (factor) {

        factorHTML += `

            <div style="margin-bottom:14px">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    font-size:11px;
                    margin-bottom:6px
                ">

                    <span>
                        ${factor.name}
                    </span>

                    <span style="color:var(--cyan)">
                        ${factor.value}/100
                    </span>

                </div>

                <div class="progress">

                    <div style="
                        width:${factor.value}%
                    "></div>

                </div>

            </div>

        `;

    });


    const factorAnalysis =
        document.getElementById("factorAnalysis");

    if (factorAnalysis) {

        factorAnalysis.innerHTML =
            factorHTML;

    }


    showToast(
        "AI prediction completed: " + riskText
    );
}


// =====================================================
// USE PREDICTION FOR ROUTE
// =====================================================

function usePredictionForRoute() {

    document.querySelectorAll(".page")
        .forEach(function (page) {

            page.classList.remove("active");

        });


    const routePage =
        document.getElementById("route");

    if (routePage) {
        routePage.classList.add("active");
    }


    document.querySelectorAll(".nav-item")
        .forEach(function (item) {

            item.classList.remove("active");

        });


    const routeNav =
        [...document.querySelectorAll(".nav-item")]
            .find(function (item) {

                return item.textContent.includes(
                    "Route Optimizer"
                );

            });


    if (routeNav) {
        routeNav.classList.add("active");
    }


    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });


    showToast(
        "AI risk data transferred to Route Optimizer"
    );
}


// =====================================================
// GENERATE RISK ALERT
// =====================================================

function generateRiskAlert() {

    const risk =
        document.getElementById("riskScore")?.textContent;

    const region =
        document.getElementById(
            "riskRegionResult"
        )?.textContent;


    showToast(
        `Alert created for ${region} — Risk ${risk}`
    );
}


// =====================================================
// ROUTE MODE
// =====================================================

function setRouteMode(mode, button) {

    currentRouteMode = mode;


    document.querySelectorAll(".route-tab")
        .forEach(function (tab) {

            tab.classList.remove("active");

        });


    if (button) {
        button.classList.add("active");
    }


    const sourceLabel =
        document.getElementById("sourceLabel");

    const destinationLabel =
        document.getElementById("destinationLabel");

    const source =
        document.getElementById("source");

    const destination =
        document.getElementById("destination");


    if (!source || !destination) {
        return;
    }


    source.value = "";
    destination.value = "";


    if (mode === "city") {

        sourceLabel.textContent =
            "SOURCE CITY";

        destinationLabel.textContent =
            "DESTINATION CITY";

        source.placeholder =
            "Type or select a city";

        destination.placeholder =
            "Type or select a city";

    }


    else if (mode === "state") {

        sourceLabel.textContent =
            "SOURCE STATE";

        destinationLabel.textContent =
            "DESTINATION STATE";

        source.placeholder =
            "Type or select a state";

        destination.placeholder =
            "Type or select a state";

    }


    else if (mode === "country") {

        sourceLabel.textContent =
            "SOURCE COUNTRY";

        destinationLabel.textContent =
            "DESTINATION COUNTRY";

        source.placeholder =
            "Type or select a country";

        destination.placeholder =
            "Type or select a country";

    }


    showSuggestions("source");
    showSuggestions("destination");

    showToast(
        mode.toUpperCase() + " mode selected"
    );
}


// =====================================================
// LOCATION DATA
// =====================================================

// Cities

const cities = [

    "Mumbai",
    "Delhi",
    "New Delhi",
    "Bengaluru",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Lucknow",
    "Surat",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Ranchi",
    "Bhubaneswar",
    "Raipur",

    "Guwahati",
    "Dibrugarh",
    "Jorhat",
    "Tezpur",
    "Nagaon",
    "Silchar",
    "Shillong",
    "Tura",
    "Kohima",
    "Dimapur",
    "Imphal",
    "Aizawl",
    "Lunglei",
    "Gangtok",
    "Agartala",

    "New York",
    "London",
    "Tokyo",
    "Singapore",
    "Dubai",
    "Paris",
    "Berlin",
    "Sydney",
    "Toronto",
    "Los Angeles",
    "Chicago",
    "San Francisco",
    "Seattle",
    "Hong Kong",
    "Shanghai",
    "Beijing",
    "Seoul",
    "Bangkok",
    "Jakarta",
    "Kuala Lumpur",
    "Dhaka",
    "Kathmandu",
    "Colombo",
    "Moscow",
    "Rome",
    "Madrid",
    "Amsterdam",
    "Frankfurt",
    "Istanbul"

];


// Indian states

const states = [

    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",

    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Puducherry"

];


// Countries

const countries = [

    "India",
    "United States",
    "United Kingdom",
    "Australia",
    "Canada",
    "China",
    "Japan",
    "South Korea",
    "Singapore",
    "United Arab Emirates",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Netherlands",
    "Russia",
    "Brazil",
    "Argentina",
    "Mexico",
    "South Africa",
    "Egypt",
    "Saudi Arabia",
    "Thailand",
    "Indonesia",
    "Malaysia",
    "Bangladesh",
    "Nepal",
    "Bhutan",
    "Sri Lanka",
    "Pakistan",
    "Vietnam",
    "New Zealand",
    "Switzerland",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Ireland",
    "Portugal",
    "Turkey",
    "Israel"

];


// =====================================================
// GET CURRENT LOCATION LIST
// =====================================================

function getCurrentLocations() {

    if (currentRouteMode === "city") {
        return cities;
    }

    if (currentRouteMode === "state") {
        return states;
    }

    return countries;
}


// =====================================================
// SHOW LOCATION SUGGESTIONS
// =====================================================

function showSuggestions(type) {

    const input =
        document.getElementById(type);

    const box =
        document.getElementById(
            type + "Suggestions"
        );


    if (!input || !box) {
        return;
    }


    const list =
        getCurrentLocations();


    const search =
        input.value
            .toLowerCase()
            .trim();


    const results =
        list
            .filter(function (item) {

                return item
                    .toLowerCase()
                    .includes(search);

            })
            .slice(0, 12);


    box.innerHTML = "";


    if (results.length === 0) {

        box.innerHTML = `
            <div class="suggestion-item">
                No matching location found.
                You can still type a custom location.
            </div>
        `;

        box.classList.add("show");

        return;
    }


    results.forEach(function (location) {

        const item =
            document.createElement("div");


        item.className =
            "suggestion-item";


        item.textContent =
            location;


        item.onclick = function () {

            input.value =
                location;

            box.classList.remove("show");

        };


        box.appendChild(item);

    });


    box.classList.add("show");
}


// =====================================================
// FILTER LOCATIONS
// =====================================================

function filterLocations(type) {

    showSuggestions(type);

}


// =====================================================
// HIDE SUGGESTIONS
// =====================================================

document.addEventListener(
    "click",
    function (event) {

        const boxes =
            document.querySelectorAll(
                ".location-input-box"
            );


        boxes.forEach(function (box) {

            if (!box.contains(event.target)) {

                const suggestions =
                    box.querySelector(
                        ".suggestions"
                    );


                if (suggestions) {

                    suggestions.classList.remove(
                        "show"
                    );

                }
            }

        });

    }
);


// =====================================================
// SWAP SOURCE AND DESTINATION
// =====================================================

function swapLocations() {

    const source =
        document.getElementById("source");

    const destination =
        document.getElementById("destination");


    if (!source || !destination) {
        return;
    }


    const temp =
        source.value;


    source.value =
        destination.value;


    destination.value =
        temp;


    showToast(
        "Source and destination swapped"
    );
}


// =====================================================
// OPTIMIZE ROUTE
// =====================================================

function optimizeRoute() {

    const source =
        document
            .getElementById("source")
            .value
            .trim();


    const destination =
        document
            .getElementById("destination")
            .value
            .trim();


    const vehicle =
        document
            .getElementById("vehicle")
            .value;


    const priority =
        document
            .getElementById("priority")
            .value;


    if (!source || !destination) {

        showToast(
            "Please enter both source and destination"
        );

        return;
    }


    if (
        source.toLowerCase() ===
        destination.toLowerCase()
    ) {

        showToast(
            "Source and destination cannot be the same"
        );

        return;
    }


    const button =
        document.getElementById(
            "optimizeButton"
        );


    if (button) {

        button.textContent =
            "🤖 AI Optimizing Route...";

        button.disabled = true;

    }


    setTimeout(async function () {

        await generateRouteResult(
            source,
            destination,
            vehicle,
            priority
        );


        if (button) {

            button.textContent =
                "🤖 Optimize Route with AI";

            button.disabled = false;

        }

    }, 1000);
}


// =====================================================
// GENERATE ROUTE RESULT
// =====================================================

async function generateRouteResult(
    source,
    destination,
    vehicle,
    priority
) {

    const routeData =
        document.getElementById("routeData");

    const placeholder =
        document.getElementById("routePlaceholder");


    if (placeholder) {
        placeholder.style.display = "none";
    }


    if (routeData) {

        routeData.style.display = "block";

        routeData.innerHTML = `

            <h2>AI Recommended Route</h2>

            <p style="
                color:var(--muted);
                font-size:13px;
                margin-bottom:15px
            ">

                Finding ${currentRouteMode} route...

            </p>

            <div id="routeMap"></div>

            <div id="routeResultContent">

                <p style="
                    text-align:center;
                    color:var(--muted);
                    padding:20px
                ">

                    🗺 Loading real location data...

                </p>

            </div>

        `;
    }


    try {

        // Get source coordinates

        const sourceLocation =
            await geocodeLocation(
                source,
                currentRouteMode
            );


        // Get destination coordinates

        const destinationLocation =
            await geocodeLocation(
                destination,
                currentRouteMode
            );


        if (
            !sourceLocation ||
            !destinationLocation
        ) {

            throw new Error(
                "Location not found"
            );

        }


        // Create map

        createRouteMap(
            sourceLocation,
            destinationLocation,
            source,
            destination
        );


        // Get route

        const route =
            await getRoadRoute(
                sourceLocation,
                destinationLocation
            );


        if (route) {

            drawRoadRoute(
                route.geometry
            );


            showRouteInformation(
                route,
                source,
                destination,
                vehicle,
                priority
            );

        }

        else {

            showDirectRouteInformation(
                sourceLocation,
                destinationLocation,
                source,
                destination
            );

        }


        showToast(
            "Real route loaded successfully"
        );

    }

    catch (error) {

        console.error(error);

        showDirectRouteInformation(
            null,
            null,
            source,
            destination
        );


        showToast(
            "Could not find detailed road route"
        );

    }

}


// =====================================================
// GEOCODE LOCATION
// NOMINATIM OPENSTREETMAP API
// =====================================================

async function geocodeLocation(
    location,
    type
) {

    let query =
        location;


    // Improve accuracy

    if (
        type === "city" ||
        type === "state"
    ) {

        query =
            location + ", India";

    }


    const url =
        "https://nominatim.openstreetmap.org/search" +
        "?format=json" +
        "&limit=1" +
        "&q=" +
        encodeURIComponent(query);


    const response =
        await fetch(url, {

            headers: {

                "Accept-Language":
                    "en"

            }

        });


    if (!response.ok) {

        throw new Error(
            "Geocoding API error"
        );

    }


    const data =
        await response.json();


    if (
        !data ||
        data.length === 0
    ) {

        return null;

    }


    return {

        lat:
            parseFloat(data[0].lat),

        lon:
            parseFloat(data[0].lon),

        displayName:
            data[0].display_name

    };

}


// =====================================================
// GET ROAD ROUTE
// OSRM API
// =====================================================

async function getRoadRoute(
    source,
    destination
) {

    const url =
        "https://router.project-osrm.org/route/v1/driving/" +
        source.lon +
        "," +
        source.lat +
        ";" +
        destination.lon +
        "," +
        destination.lat +
        "?overview=full" +
        "&geometries=geojson";


    const response =
        await fetch(url);


    if (!response.ok) {
        return null;
    }


    const data =
        await response.json();


    if (
        data.code === "Ok" &&
        data.routes &&
        data.routes.length > 0
    ) {

        return data.routes[0];

    }


    return null;

}


// =====================================================
// CREATE LEAFLET MAP
// =====================================================

function createRouteMap(
    source,
    destination,
    sourceName,
    destinationName
) {

    if (typeof L === "undefined") {

        throw new Error(
            "Leaflet library not loaded"
        );

    }


    if (routeMap) {

        routeMap.remove();

        routeMap = null;

    }


    routeMap =
        L.map(
            "routeMap",
            {
                zoomControl: true
            }
        );


    // OpenStreetMap

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom: 19,

            attribution:
                "© OpenStreetMap contributors"

        }

    ).addTo(routeMap);


    // Source marker

    sourceMarker =
        L.marker([
            source.lat,
            source.lon
        ])

        .addTo(routeMap)

        .bindPopup(
            `<b>Source</b><br>${sourceName}`
        );


    // Destination marker

    destinationMarker =
        L.marker([
            destination.lat,
            destination.lon
        ])

        .addTo(routeMap)

        .bindPopup(
            `<b>Destination</b><br>${destinationName}`
        );


    // Bounds

    const bounds =
        L.latLngBounds([

            [
                source.lat,
                source.lon
            ],

            [
                destination.lat,
                destination.lon
            ]

        ]);


    routeMap.fitBounds(
        bounds,
        {
            padding: [60, 60]
        }
    );


    setTimeout(function () {

        routeMap.invalidateSize();

    }, 300);

}


// =====================================================
// DRAW ROAD ROUTE
// =====================================================

function drawRoadRoute(geometry) {

    if (!routeMap) {
        return;
    }


    if (routeLine) {

        routeMap.removeLayer(
            routeLine
        );

    }


    const coordinates =
        geometry.coordinates.map(
            function (coordinate) {

                return [
                    coordinate[1],
                    coordinate[0]
                ];

            }
        );


    routeLine =
        L.polyline(

            coordinates,

            {

                color: "#6c8cff",
                weight: 6,
                opacity: 0.9

            }

        )

        .addTo(routeMap);


    routeMap.fitBounds(

        routeLine.getBounds(),

        {
            padding: [50, 50]
        }

    );

}


// =====================================================
// SHOW ROUTE INFORMATION
// =====================================================

function showRouteInformation(
    route,
    source,
    destination,
    vehicle,
    priority
) {

    const distanceKm =
        Number(
            route.distance / 1000
        );


    const durationMinutes =
        Math.round(
            route.duration / 60
        );


    const hours =
        Math.floor(
            durationMinutes / 60
        );


    const minutes =
        durationMinutes % 60;


    // Cost calculation

    let costPerKm = 30;


    if (vehicle === "Light Truck") {
        costPerKm = 22;
    }

    else if (
        vehicle === "Container Truck"
    ) {
        costPerKm = 38;
    }

    else if (
        vehicle === "Refrigerated Truck"
    ) {
        costPerKm = 45;
    }

    else if (
        vehicle === "Emergency Vehicle"
    ) {
        costPerKm = 28;
    }

    else if (
        vehicle === "Delivery Van"
    ) {
        costPerKm = 16;
    }


    const estimatedCost =
        Math.round(
            distanceKm * costPerKm
        );


    // AI confidence

    let confidence = 92;


    if (priority === "Safest") {
        confidence = 96;
    }

    else if (priority === "Fastest") {
        confidence = 89;
    }


    const result =
        document.getElementById(
            "routeResultContent"
        );


    if (!result) {
        return;
    }


    result.innerHTML = `

        <div class="route-nodes">

            <div class="node">
                ${source}
            </div>

            →

            <div class="node">
                AI Optimized Route
            </div>

            →

            <div class="node">
                ${destination}
            </div>

        </div>


        <div class="result-grid">

            <div>

                <b>
                    ${distanceKm.toFixed(1)} km
                </b>

                <br>

                <small>
                    Real Distance
                </small>

            </div>


            <div>

                <b>
                    ${hours}h ${minutes}m
                </b>

                <br>

                <small>
                    Estimated ETA
                </small>

            </div>


            <div>

                <b>
                    ₹${estimatedCost.toLocaleString("en-IN")}
                </b>

                <br>

                <small>
                    Estimated Cost
                </small>

            </div>


            <div>

                <b style="
                    color:var(--green)
                ">

                    ${priority}

                </b>

                <br>

                <small>
                    Optimization
                </small>

            </div>

        </div>


        <div style="
            margin-top:20px;
            padding:16px;
            background:rgba(69,216,255,.07);
            border-radius:12px
        ">

            <b style="
                color:var(--cyan)
            ">
                🤖 AI Route Intelligence
            </b>


            <p style="
                color:var(--muted);
                font-size:12px;
                line-height:1.7;
                margin-top:8px
            ">

                This route is optimized for
                <b>${priority}</b>.

                Estimated using real map distance,
                vehicle type and road routing data.

            </p>


            <p style="
                color:var(--green);
                margin-top:10px
            ">

                AI Confidence:
                ${confidence}%

            </p>

        </div>

    `;

}


// =====================================================
// FALLBACK DIRECT ROUTE
// =====================================================

function showDirectRouteInformation(
    sourceLocation,
    destinationLocation,
    source,
    destination
) {

    const result =
        document.getElementById(
            "routeResultContent"
        );


    if (!result) {
        return;
    }


    let distanceText =
        "Location route unavailable";


    // Calculate direct distance

    if (
        sourceLocation &&
        destinationLocation
    ) {

        const distance =
            calculateDistance(

                sourceLocation.lat,
                sourceLocation.lon,

                destinationLocation.lat,
                destinationLocation.lon

            );


        distanceText =
            distance.toFixed(1) +
            " km approximate";

    }


    result.innerHTML = `

        <div style="
            padding:20px;
            background:rgba(255,174,87,.08);
            border-radius:12px
        ">

            <h3>
                Alternative Route Analysis
            </h3>

            <p style="
                margin-top:10px;
                color:var(--muted)
            ">

                ${source}
                →
                ${destination}

            </p>


            <div style="
                margin-top:15px;
                font-size:18px;
                color:var(--cyan)
            ">

                ${distanceText}

            </div>


            <p style="
                margin-top:15px;
                color:var(--muted);
                font-size:12px
            ">

                Detailed road routing is temporarily unavailable.
                AI recommends verifying the route before dispatch.

            </p>

        </div>

    `;

}


// =====================================================
// HAVERSINE DISTANCE
// =====================================================

function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371;

    const dLat =
        (lat2 - lat1) *
        Math.PI / 180;

    const dLon =
        (lon2 - lon1) *
        Math.PI / 180;


    const a =

        Math.sin(dLat / 2) *
        Math.sin(dLat / 2)

        +

        Math.cos(
            lat1 * Math.PI / 180
        )

        *

        Math.cos(
            lat2 * Math.PI / 180
        )

        *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =
        2 *
        Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;

}


// =====================================================
// ALERT FILTER
// =====================================================

function filterAlerts(type) {

    const alerts =
        document.querySelectorAll(".alert");


    alerts.forEach(function (alert) {

        const alertType =
            alert.dataset.type;


        if (
            type === "all" ||
            type === alertType
        ) {

            alert.style.display =
                "block";

        }

        else {

            alert.style.display =
                "none";

        }

    });


    showToast(
        type.toUpperCase() +
        " alerts filtered"
    );
}


// =====================================================
// SEARCH
// =====================================================

function searchData(event) {

    if (event.key !== "Enter") {
        return;
    }


    const search =
        event.target.value
            .trim()
            .toLowerCase();


    if (!search) {
        return;
    }


    // States

    const foundState =
        states.find(function (item) {

            return item
                .toLowerCase()
                .includes(search);

        });


    if (foundState) {

        showToast(
            "Found state: " +
            foundState
        );

        return;
    }


    // Cities

    const foundCity =
        cities.find(function (item) {

            return item
                .toLowerCase()
                .includes(search);

        });


    if (foundCity) {

        showToast(
            "Found city: " +
            foundCity
        );

        return;
    }


    // Countries

    const foundCountry =
        countries.find(function (item) {

            return item
                .toLowerCase()
                .includes(search);

        });


    if (foundCountry) {

        showToast(
            "Found country: " +
            foundCountry
        );

        return;
    }


    showToast(
        "No intelligence result found for: " +
        event.target.value
    );

}


// =====================================================
// CHARTS
// =====================================================

function initializeCharts() {

    if (typeof Chart === "undefined") {
        return;
    }


    const cyan =
        "rgba(69,216,255,0.8)";

    const purple =
        "rgba(155,124,255,0.8)";

    const green =
        "rgba(72,214,168,0.8)";

    const orange =
        "rgba(255,174,87,0.8)";

    const red =
        "rgba(255,98,125,0.8)";


    // Global chart style

    Chart.defaults.color =
        "#8e9bb5";

    Chart.defaults.font.family =
        "Inter";


    // =============================================
    // STATE ACCESSIBILITY CHART
    // =============================================

    const stateChart =
        document.getElementById(
            "stateChart"
        );


    if (stateChart) {

        new Chart(
            stateChart,
            {

                type: "bar",

                data: {

                    labels: [

                        "Assam",
                        "Tripura",
                        "Sikkim",
                        "Meghalaya",
                        "Mizoram",
                        "Nagaland",
                        "Manipur",
                        "Arunachal"

                    ],

                    datasets: [

                        {

                            label:
                                "Accessibility Score",

                            data: [

                                74,
                                83,
                                71,
                                68,
                                61,
                                57,
                                55,
                                48

                            ],

                            backgroundColor: [

                                cyan,
                                green,
                                purple,
                                cyan,
                                purple,
                                orange,
                                red,
                                orange

                            ],

                            borderRadius: 6

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        y: {

                            beginAtZero: true,

                            max: 100,

                            grid: {

                                color:
                                    "rgba(255,255,255,.05)"

                            }

                        },

                        x: {

                            grid: {
                                display: false
                            }

                        }

                    }

                }

            }
        );

    }


    // =============================================
    // MONTHLY TREND
    // =============================================

    const trendChart =
        document.getElementById(
            "trendChart"
        );


    if (trendChart) {

        new Chart(
            trendChart,
            {

                type: "line",

                data: {

                    labels: [

                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep"

                    ],

                    datasets: [

                        {

                            label:
                                "Accessibility",

                            data: [

                                56,
                                59,
                                61,
                                60,
                                63,
                                65

                            ],

                            borderColor:
                                cyan,

                            backgroundColor:
                                "rgba(69,216,255,.1)",

                            fill: true,

                            tension: 0.4,

                            pointBackgroundColor:
                                cyan

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {
                            display: false
                        }

                    },

                    scales: {

                        y: {

                            min: 40,

                            max: 100,

                            grid: {

                                color:
                                    "rgba(255,255,255,.05)"

                            }

                        },

                        x: {

                            grid: {
                                display: false
                            }

                        }

                    }

                }

            }
        );

    }


    // =============================================
    // LOGISTICS EFFICIENCY
    // =============================================

    const efficiencyChart =
        document.getElementById(
            "efficiencyChart"
        );


    if (efficiencyChart) {

        new Chart(
            efficiencyChart,
            {

                type: "doughnut",

                data: {

                    labels: [

                        "Efficient",
                        "Moderate",
                        "Delayed"

                    ],

                    datasets: [

                        {

                            data: [
                                62,
                                25,
                                13
                            ],

                            backgroundColor: [

                                green,
                                orange,
                                red

                            ],

                            borderWidth: 0

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    cutout: "70%",

                    plugins: {

                        legend: {

                            position:
                                "bottom"

                        }

                    }

                }

            }
        );

    }


    // =============================================
    // RISK DISTRIBUTION
    // =============================================

    const riskChart =
        document.getElementById(
            "riskChart"
        );


    if (riskChart) {

        new Chart(
            riskChart,
            {

                type: "pie",

                data: {

                    labels: [

                        "Low",
                        "Medium",
                        "High",
                        "Critical"

                    ],

                    datasets: [

                        {

                            data: [

                                35,
                                28,
                                25,
                                12

                            ],

                            backgroundColor: [

                                green,
                                cyan,
                                orange,
                                red

                            ],

                            borderWidth: 0

                        }

                    ]

                },

                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    plugins: {

                        legend: {

                            position:
                                "bottom"

                        }

                    }

                }

            }
        );

    }

}


// =====================================================
// END OF SCRIPT
// =====================================================