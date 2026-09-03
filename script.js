lucide.createIcons();


function showPage(page, button) {

    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    document.getElementById(page).classList.add("active");

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showToast(message) {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}


function runAIScan() {

    const button = event.target;

    button.innerText = "Scanning...";

    button.disabled = true;

    setTimeout(() => {

        document.getElementById("accessibilityValue").innerText = "67/100";
        document.getElementById("riskValue").innerText = "8";

        button.innerText = "Run AI Scan";
        button.disabled = false;

        showToast("✓ AI intelligence scan completed");

    }, 1800);

}


function toggleLayer(button) {

    button.classList.toggle("active-layer");

    showToast(
        button.innerText.trim() + " layer updated"
    );

}


function stateInfo(name, score, risk) {

    document.getElementById("stateDetails").innerHTML = `

        <div style="margin-top:10px">

            <h2>${name}</h2>

            <br>

            <p>Accessibility Score:
                <b style="color:var(--cyan)">${score}/100</b>
            </p>

            <br>

            <p>Risk Level:
                <b style="color:${risk === 'High' ? 'var(--red)' : 'var(--orange)'}">
                    ${risk}
                </b>
            </p>

            <br>

            <p style="color:var(--muted)">
                AI logistics intelligence is monitoring road conditions,
                weather patterns and transportation accessibility.
            </p>

        </div>
    `;

    showToast(name + " intelligence selected");

}

let routeMode = "city";

const routeData = {

    city: {
        label: "CITY",
        places: [
            "Guwahati",
            "Imphal",
            "Kohima",
            "Itanagar",
            "Shillong",
            "Agartala",
            "Aizawl",
            "Gangtok"
        ]
    },

    state: {
        label: "STATE",
        places: [
            "Assam",
            "Arunachal Pradesh",
            "Meghalaya",
            "Manipur",
            "Mizoram",
            "Nagaland",
            "Tripura",
            "Sikkim"
        ]
    },

    country: {
        label: "COUNTRY",
        places: [
            "India",
            "Bangladesh",
            "Bhutan",
            "Nepal",
            "Myanmar",
            "China"
        ]
    }

};


function loadRouteOptions() {

    const source = document.getElementById("source");
    const destination = document.getElementById("destination");

    const places = routeData[routeMode].places;

    source.innerHTML = "";
    destination.innerHTML = "";

    places.forEach((place, index) => {

        source.innerHTML += `
            <option value="${place}">
                ${place}
            </option>
        `;

        destination.innerHTML += `
            <option value="${place}"
                ${index === 1 ? "selected" : ""}>
                ${place}
            </option>
        `;

    });

    document.getElementById("sourceLabel").innerText =
        "SOURCE " + routeData[routeMode].label;

    document.getElementById("destinationLabel").innerText =
        "DESTINATION " + routeData[routeMode].label;
}


function setRouteMode(mode, button) {

    routeMode = mode;

    document.querySelectorAll(".route-tab").forEach(tab => {
        tab.classList.remove("active");
    });

    button.classList.add("active");

    loadRouteOptions();

    document.getElementById("routeData")
        .classList.remove("show");

    document.getElementById("routePlaceholder")
        .style.display = "block";

    showToast(
        `${mode.toUpperCase()} → ${mode.toUpperCase()} mode selected`
    );
}


loadRouteOptions();


function optimizeRoute() {

    const source = document.getElementById("source").value;
    const destination = document.getElementById("destination").value;
    const vehicle = document.getElementById("vehicle").value;
    const priority = document.getElementById("priority").value;

    if (source === destination) {
        showToast(
            "Source and destination cannot be the same."
        );
        return;
    }

    const button = event.target;

    button.innerText = "🤖 AI Analyzing...";
    button.disabled = true;

    showToast(
        `AI analyzing ${routeMode}-level logistics route...`
    );

    setTimeout(() => {

        const modeDetails = {

            city: {
                distance: Math.floor(Math.random() * 500 + 150) + " km",
                time: Math.floor(Math.random() * 12 + 4) + "h " +
                    Math.floor(Math.random() * 59 + 1) + "m",
                nodes: [
                    source,
                    "AI Transit Hub",
                    destination
                ]
            },

            state: {
                distance: Math.floor(Math.random() * 1000 + 300) + " km",
                time: Math.floor(Math.random() * 24 + 8) + "h " +
                    Math.floor(Math.random() * 59 + 1) + "m",
                nodes: [
                    source,
                    "Regional Logistics Corridor",
                    destination
                ]
            },

            country: {
                distance: Math.floor(Math.random() * 2500 + 500) + " km",
                time: Math.floor(Math.random() * 3 + 1) + " days",
                nodes: [
                    source,
                    "International Trade Corridor",
                    destination
                ]
            }

        };

        const details = modeDetails[routeMode];

        let baseCost =
            routeMode === "city" ? 15000 :
                routeMode === "state" ? 45000 :
                    120000;

        let cost = baseCost +
            Math.floor(Math.random() * baseCost);

        let risk =
            priority === "Safest"
                ? "Low"
                : priority === "Fastest"
                    ? "Medium"
                    : "Low–Medium";

        let confidence =
            Math.floor(Math.random() * 10 + 86) + "%";

        document.getElementById("routePlaceholder")
            .style.display = "none";

        document.getElementById("routeData")
            .classList.add("show");

        document.querySelector(".route-nodes")
            .innerHTML = details.nodes
                .map((node, index) => `
                <div class="node">${node}</div>
                ${index < details.nodes.length - 1 ? "→" : ""}
            `)
                .join("");

        document.querySelector(".result-grid")
            .innerHTML = `

            <div>
                <b>${details.distance}</b>
                <br>
                <small>Distance</small>
            </div>

            <div>
                <b>${details.time}</b>
                <br>
                <small>Estimated Time</small>
            </div>

            <div>
                <b>₹${cost.toLocaleString("en-IN")}</b>
                <br>
                <small>Estimated Cost</small>
            </div>

            <div>
                <b style="color:var(--green)">
                    ${risk}
                </b>
                <br>
                <small>AI Risk Score</small>
            </div>

        `;

        document.querySelector("#routeData p")
            .innerHTML = `

            AI Confidence: ${confidence}

            <br>

            <span style="
                color:var(--muted);
                font-size:12px
            ">
                Mode: ${routeMode.toUpperCase()}
                · Vehicle: ${vehicle}
                · Priority: ${priority}
            </span>

        `;

        button.innerText = "Optimize Route";
        button.disabled = false;

        showToast(
            `✓ ${routeMode.toUpperCase()} route optimized successfully`
        );

    }, 1800);

}


function filterAlerts(type) {

    document.querySelectorAll(".alert").forEach(alert => {

        if (
            type === "all" ||
            alert.dataset.type === type
        ) {

            alert.style.display = "flex";

        } else {

            alert.style.display = "none";

        }

    });

}


function searchData(event) {

    if (event.key !== "Enter") return;

    const value =
        event.target.value.toLowerCase().trim();

    const states = [
        "assam",
        "arunachal pradesh",
        "meghalaya",
        "manipur",
        "mizoram",
        "nagaland",
        "tripura",
        "sikkim"
    ];

    if (states.includes(value)) {

        showToast(
            "Intelligence record found for " + value
        );

    } else if (value === "maharashtra") {

        showToast(
            "No intelligence records found in North East India."
        );

    } else {

        showToast(
            "Searching intelligence database..."
        );

    }

}


const chartDefaults = {
    color: "#9aa5bd",
    borderColor: "rgba(255,255,255,.08)"
};


new Chart(
    document.getElementById("stateChart"),
    {
        type: "bar",

        data: {

            labels: [
                "Assam",
                "Arunachal",
                "Meghalaya",
                "Manipur",
                "Mizoram",
                "Nagaland",
                "Tripura",
                "Sikkim"
            ],

            datasets: [{

                label: "Accessibility",

                data: [
                    74, 48, 68, 55, 61, 57, 83, 71
                ],

                backgroundColor: [
                    "#48d8e8",
                    "#8f7adf",
                    "#ffad28",
                    "#39b994",
                    "#ff5858",
                    "#548ee6",
                    "#dc3d8a",
                    "#82c91e"
                ],

                borderRadius: 7

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            scales: {

                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: { color: chartDefaults.color },
                    grid: { color: chartDefaults.borderColor }
                },

                x: {
                    ticks: { color: chartDefaults.color },
                    grid: { display: false }
                }

            },

            plugins: {
                legend: { display: false }
            }

        }

    }
);


new Chart(
    document.getElementById("trendChart"),
    {
        type: "line",

        data: {

            labels: [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ],

            datasets: [{

                label: "Accessibility",

                data: [
                    60, 64, 67, 69, 69, 69,
                    67, 65, 62, 62, null, null
                ],

                borderColor: "#55d8ff",

                backgroundColor:
                    "rgba(85,216,255,.15)",

                fill: true,

                tension: .4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {
                legend: { display: false }
            }

        }

    }
);


new Chart(
    document.getElementById("efficiencyChart"),
    {
        type: "bar",

        data: {

            labels: [
                "Assam",
                "Arunachal",
                "Meghalaya",
                "Manipur",
                "Tripura"
            ],

            datasets: [{

                label: "On Time",

                data: [88, 70, 82, 75, 91],

                backgroundColor: "#4fd8b5"

            },

            {

                label: "Delayed",

                data: [12, 30, 18, 25, 9],

                backgroundColor: "#ffb547"

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    }
);


new Chart(
    document.getElementById("riskChart"),
    {
        type: "doughnut",

        data: {

            labels: [
                "Low",
                "Medium",
                "High",
                "Critical"
            ],

            datasets: [{

                data: [40, 32, 20, 8],

                backgroundColor: [
                    "#4dd8ff",
                    "#ffb547",
                    "#ff7a5c",
                    "#ff4d64"
                ]

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {
                        color: "#c5cce0"
                    }

                }

            }

        }

    }
);

let lastRiskPrediction = null;

function predictRisk() {

    const rainfall =
        Number(
            document.getElementById("rainfall").value
        );

    const road =
        Number(
            document.getElementById("roadCondition").value
        );

    const traffic =
        Number(
            document.getElementById("traffic").value
        );

    const landslide =
        Number(
            document.getElementById("landslide").value
        );

    const region =
        document.getElementById("riskRegion").value;

    const button =
        document.getElementById("riskButton");

    // Hide previous screens
    document.getElementById(
        "predictionPlaceholder"
    ).style.display = "none";

    document.getElementById(
        "predictionResult"
    ).style.display = "none";

    document.getElementById(
        "aiLoading"
    ).style.display = "block";

    button.disabled = true;
    button.innerText = "AI Analysis Running...";

    // Start loading animation
    const progress =
        document.getElementById("aiProgress");

    const loadingText =
        document.getElementById("aiLoadingText");

    progress.style.width = "15%";

    loadingText.innerText =
        "Collecting environmental intelligence...";

    setTimeout(() => {

        progress.style.width = "38%";

        loadingText.innerText =
            "Analyzing weather and rainfall patterns...";

    }, 500);


    setTimeout(() => {

        progress.style.width = "65%";

        loadingText.innerText =
            "Processing accessibility and route conditions...";

    }, 1000);


    setTimeout(() => {

        progress.style.width = "85%";

        loadingText.innerText =
            "AI model calculating disruption probability...";

    }, 1500);


    setTimeout(() => {

        progress.style.width = "100%";

        // WEIGHTED AI RISK FORMULA
        const riskScore = Math.round(

            rainfall * 0.25 +

            road * 0.25 +

            traffic * 0.20 +

            landslide * 0.30

        );

        displayRiskPrediction(
            riskScore,
            rainfall,
            road,
            traffic,
            landslide,
            region
        );

        document.getElementById(
            "aiLoading"
        ).style.display = "none";

        document.getElementById(
            "predictionResult"
        ).style.display = "block";

        button.disabled = false;

        button.innerHTML = `
            <i data-lucide="refresh-cw"
               style="
                width:16px;
                vertical-align:middle;
                margin-right:5px;
               ">
            </i>
            Run New AI Prediction
        `;

        lucide.createIcons();

        showToast(
            "✓ AI risk prediction completed successfully"
        );

    }, 2100);

}


function displayRiskPrediction(
    riskScore,
    rainfall,
    road,
    traffic,
    landslide,
    region
) {

    let level;
    let color;
    let background;
    let recommendation;
    let delay;
    let action;

    // RISK LEVEL LOGIC

    if (riskScore < 25) {

        level = "LOW RISK";

        color = "var(--green)";

        background =
            "rgba(72,214,168,.15)";

        delay = "0–2 hrs";

        action = "Proceed";

        recommendation =
            "Logistics conditions are stable. Continue with the planned route while maintaining routine AI monitoring.";

    }

    else if (riskScore < 50) {

        level = "MEDIUM RISK";

        color = "var(--orange)";

        background =
            "rgba(255,181,71,.15)";

        delay = "2–6 hrs";

        action = "Monitor";

        recommendation =
            "Moderate accessibility disruption has been detected. Monitor weather, road conditions and traffic before dispatch.";

    }

    else if (riskScore < 75) {

        level = "HIGH RISK";

        color = "var(--orange)";

        background =
            "rgba(255,140,70,.18)";

        delay = "6–18 hrs";

        action = "Reroute";

        recommendation =
            "High probability of logistics disruption detected. AI recommends evaluating an alternative route and avoiding vulnerable corridors.";

    }

    else {

        level = "CRITICAL RISK";

        color = "var(--red)";

        background =
            "rgba(255,93,108,.15)";

        delay = "18–30 hrs";

        action = "Avoid Route";

        recommendation =
            "Critical accessibility risk detected. Avoid dispatching through the affected corridor. Activate alternative logistics planning and emergency monitoring.";

    }


    // CALCULATE ACCESSIBILITY

    const accessibility =
        Math.max(
            5,
            100 - riskScore
        );


    // AI CONFIDENCE

    const confidence =
        Math.min(
            98,
            84 +
            Math.floor(
                Math.abs(rainfall - landslide) / 8
            )
        );


    // STORE FOR OTHER FEATURES

    lastRiskPrediction = {

        score: riskScore,

        level: level,

        region: region,

        action: action,

        recommendation: recommendation,

        accessibility: accessibility

    };


    // UPDATE MAIN SCORE

    const scoreElement =
        document.getElementById("riskScore");

    scoreElement.innerText =
        riskScore + "/100";

    scoreElement.style.color =
        color;


    // UPDATE LEVEL

    const levelElement =
        document.getElementById("riskLevel");

    levelElement.innerText =
        level;

    levelElement.style.color =
        color;

    levelElement.style.background =
        background;


    // REGION

    document.getElementById(
        "riskRegionResult"
    ).innerText =
        "Analysis region: " + region;


    // RISK POINTER

    setTimeout(() => {

        document.getElementById(
            "riskPointer"
        ).style.left =
            `calc(${riskScore}% - 9px)`;

    }, 100);


    // RECOMMENDATION

    document.getElementById(
        "riskRecommendation"
    ).innerText =
        recommendation;


    // RESULT DATA

    document.getElementById(
        "delayHours"
    ).innerText =
        delay;

    document.getElementById(
        "accessibilityScore"
    ).innerText =
        accessibility + "%";

    document.getElementById(
        "confidenceScore"
    ).innerText =
        confidence + "%";

    document.getElementById(
        "actionStatus"
    ).innerText =
        action;


    // FACTOR BREAKDOWN

    const factors = [

        {
            name: "Rainfall",
            value: rainfall,
            weight: "25%"
        },

        {
            name: "Road Condition",
            value: road,
            weight: "25%"
        },

        {
            name: "Traffic",
            value: traffic,
            weight: "20%"
        },

        {
            name: "Landslide Probability",
            value: landslide,
            weight: "30%"
        }

    ];


    document.getElementById(
        "factorAnalysis"
    ).innerHTML =

        factors.map(factor => `

            <div style="
                margin-bottom:13px;
            ">

                <div style="
                    display:flex;
                    justify-content:space-between;
                    font-size:11px;
                    margin-bottom:5px;
                ">

                    <span>
                        ${factor.name}
                    </span>

                    <span style="
                        color:var(--muted);
                    ">
                        ${factor.value}/100
                        · Weight ${factor.weight}
                    </span>

                </div>


                <div style="
                    height:7px;
                    background:#242d40;
                    border-radius:10px;
                    overflow:hidden;
                ">

                    <div style="
                        height:100%;
                        width:${factor.value}%;
                        background:${factor.value > 75
                ? "var(--red)"
                : factor.value > 45
                    ? "var(--orange)"
                    : "var(--green)"
            };
                        transition:width 1s ease;
                    ">
                    </div>

                </div>

            </div>

        `).join("");


    // UPDATE DASHBOARD KPIs

    const overallAccessibility =
        Math.round(
            (65 + accessibility) / 2
        );

    document.getElementById(
        "accessibilityValue"
    ).innerText =
        overallAccessibility + "/100";

    if (riskScore >= 75) {

        document.getElementById(
            "riskValue"
        ).innerText =
            "10";

    }

    else if (riskScore >= 50) {

        document.getElementById(
            "riskValue"
        ).innerText =
            "9";

    }

    else {

        document.getElementById(
            "riskValue"
        ).innerText =
            "6";

    }

}


function usePredictionForRoute() {

    if (!lastRiskPrediction) {

        showToast(
            "Run an AI prediction first"
        );

        return;

    }


    // MOVE TO ROUTE PAGE

    showPage(
        "route",
        document.querySelectorAll(".nav-item")[3]
    );


    showToast(
        `Route optimizer received ${lastRiskPrediction.level} intelligence`
    );


    // Scroll top

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


function generateRiskAlert() {

    if (!lastRiskPrediction) {

        showToast(
            "Run an AI prediction first"
        );

        return;

    }


    showToast(
        `⚠ Alert created for ${lastRiskPrediction.region}`
    );

}




function setRouteMode(mode, button) {

    routeMode = mode;


    document.querySelectorAll(".route-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });


    button.classList.add("active");


    const labels = {

        city: "CITY",

        state: "STATE",

        country: "COUNTRY"

    };


    const type = labels[mode];


    document.getElementById(
        "sourceLabel"
    ).innerText =
        "SOURCE " + type;


    document.getElementById(
        "destinationLabel"
    ).innerText =
        "DESTINATION " + type;


    document.getElementById(
        "source"
    ).placeholder =
        "Type or select a " +
        type.toLowerCase();


    document.getElementById(
        "destination"
    ).placeholder =
        "Type or select a " +
        type.toLowerCase();


    // Clear old values

    document.getElementById(
        "source"
    ).value = "";


    document.getElementById(
        "destination"
    ).value = "";


    hideAllSuggestions();


    showToast(
        `${mode.toUpperCase()} → ${mode.toUpperCase()} mode selected`
    );

}


function filterLocations(inputId) {

    const input =
        document.getElementById(inputId);

    const value =
        input.value
            .trim()
            .toLowerCase();


    const matches =
        locations[routeMode]
            .filter(location =>

                location
                    .toLowerCase()
                    .includes(value)

            )
            .slice(0, 10);


    renderSuggestions(
        inputId,
        matches
    );

}


function showSuggestions(inputId) {

    const list =
        locations[routeMode]
            .slice(0, 10);


    renderSuggestions(
        inputId,
        list
    );

}


function renderSuggestions(
    inputId,
    list
) {

    const container =
        document.getElementById(
            inputId + "Suggestions"
        );


    if (list.length === 0) {

        container.innerHTML = `
            <div class="suggestion-item"
                 style="
                    color:var(--muted);
                    cursor:default;
                 ">
                No suggestions — you can still use your typed location
            </div>
        `;


        container.classList.add("show");

        return;

    }


    container.innerHTML =
        list.map(location => `

            <div class="suggestion-item"
                 onclick="selectLocation(
                    '${inputId}',
                    '${location}'
                 )">

                ${location}

            </div>

        `).join("");


    container.classList.add("show");

}


function selectLocation(
    inputId,
    location
) {

    document.getElementById(
        inputId
    ).value =
        location;


    document.getElementById(
        inputId + "Suggestions"
    ).classList.remove("show");

}


function hideAllSuggestions() {

    document.querySelectorAll(
        ".suggestions"
    ).forEach(box => {

        box.classList.remove("show");

    });

}


function swapLocations() {

    const source =
        document.getElementById("source");

    const destination =
        document.getElementById("destination");


    const temp =
        source.value;


    source.value =
        destination.value;


    destination.value =
        temp;


    hideAllSuggestions();


    showToast(
        "Source and destination swapped"
    );

}


// Close suggestions when clicking outside

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                ".location-input-box"
            )
        ) {

            hideAllSuggestions();

        }

    }
);