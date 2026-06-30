from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[3]
MODELS_DIR = ROOT_DIR / "Models"
DATA_DIR = ROOT_DIR / "Data"

FORECAST_MODEL_PATH = MODELS_DIR / "forecast_model.pkl"
DASHBOARD_DATA_PATH = DATA_DIR / "tableau_dashboard_master_universidad.csv"


def first_existing_path(*paths: Path) -> Path:
    for path in paths:
        if path.exists():
            return path
    return paths[0]


def resolve_forecast_model_path() -> Path:
    return first_existing_path(
        FORECAST_MODEL_PATH,
        ROOT_DIR / "models" / "forecast_model.pkl",
    )


def resolve_dashboard_data_path() -> Path:
    return first_existing_path(
        DASHBOARD_DATA_PATH,
        ROOT_DIR / "data" / "tableau_dashboard_master_universidad.csv",
    )
