"""Shared paths for ML training scripts. Inference lives in backend/ only."""
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
MODELS_DIR = ROOT_DIR / "Models"
DATA_DIR = ROOT_DIR / "Data"

FORECAST_MODEL_PATH = MODELS_DIR / "forecast_model.pkl"
DASHBOARD_DATA_PATH = DATA_DIR / "tableau_dashboard_master_universidad.csv"

TRAIN_TEST_RANDOM_STATE = 42
TRAIN_TEST_SIZE = 0.2
