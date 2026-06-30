from typing import Any

import pandas as pd

EVENTS: dict[str, dict[str, Any]] = {
    "Warehouse Fire": {
        "impact": 0.40,
        "location": "Vietnam Warehouse",
        "feed": "Disaster Feed",
        "delay": 7,
        "suppliers": 4,
        "skus": 17,
        "backup": "Saigon Backup Hub",
        "driver": "Warehouse capacity offline",
    },
    "Warehouse Damage": {
        "impact": 0.34,
        "location": "Bangkok DC",
        "feed": "Facility Sensor",
        "delay": 5,
        "suppliers": 3,
        "skus": 13,
        "backup": "Thai Cross-Dock B",
        "driver": "Dock throughput reduced",
    },
    "AWS Outage": {
        "impact": 0.28,
        "location": "Cloud Control Plane",
        "feed": "Cloud Status",
        "delay": 3,
        "suppliers": 6,
        "skus": 22,
        "backup": "Manual EDI fallback",
        "driver": "Order orchestration delayed",
    },
    "Cyber Attack": {
        "impact": 0.36,
        "location": "Tier-1 Supplier ERP",
        "feed": "Cyber Threat Feed",
        "delay": 6,
        "suppliers": 5,
        "skus": 19,
        "backup": "Pre-approved Supplier Delta",
        "driver": "Supplier systems isolated",
    },
    "Extreme Weather": {
        "impact": 0.32,
        "location": "Vietnam Coast",
        "feed": "Weather API",
        "delay": 6,
        "suppliers": 4,
        "skus": 15,
        "backup": "Inland Rail Route",
        "driver": "Flood and storm risk",
    },
    "Port Congestion": {
        "impact": 0.30,
        "location": "Singapore Port",
        "feed": "Port Congestion Data",
        "delay": 4,
        "suppliers": 3,
        "skus": 14,
        "backup": "Port Klang diversion",
        "driver": "Container dwell time spike",
    },
    "Traffic Disruption": {
        "impact": 0.22,
        "location": "Mumbai Corridor",
        "feed": "Traffic Data",
        "delay": 2,
        "suppliers": 2,
        "skus": 9,
        "backup": "Night dispatch window",
        "driver": "Last-mile route slowdown",
    },
    "Supplier Bankruptcy": {
        "impact": 0.45,
        "location": "Tier-2 Component Supplier",
        "feed": "Financial Risk Feed",
        "delay": 10,
        "suppliers": 7,
        "skus": 26,
        "backup": "Dual-source activation",
        "driver": "Component availability shock",
    },
    "Flood": {
        "impact": 0.25,
        "location": "Chennai Warehouse",
        "feed": "Disaster Feed",
        "delay": 4,
        "suppliers": 3,
        "skus": 11,
        "backup": "Bangalore DC",
        "driver": "Inbound lanes degraded",
    },
}

SUPPLIER_RISK = pd.DataFrame(
    [
        ["Vietnam Supplier", "Vietnam", "Supplier", 10.8231, 106.6297, 92, "High"],
        ["Singapore Port", "Singapore", "Port", 1.2644, 103.8200, 74, "Medium"],
        ["Shanghai Port", "China", "Port", 31.2304, 121.4737, 66, "Medium"],
        ["Mumbai Port", "India", "Port", 18.9388, 72.8354, 28, "Low"],
        ["Bangalore DC", "India", "Warehouse", 12.9716, 77.5946, 34, "Low"],
        ["Rotterdam Port", "Netherlands", "Port", 51.9244, 4.4777, 48, "Medium"],
        ["Texas Fulfillment", "USA", "Warehouse", 29.7604, -95.3698, 39, "Low"],
    ],
    columns=["name", "country", "type", "lat", "lon", "risk", "level"],
)


def get_event_meta(event_name: str) -> dict[str, Any]:
    return EVENTS.get(event_name, EVENTS["Warehouse Fire"])


def list_event_names() -> list[str]:
    return list(EVENTS.keys())
