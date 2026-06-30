import logging

import joblib
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split

from app.domain.paths import resolve_dashboard_data_path, resolve_forecast_model_path
from app.domain.simulation_engine import DEFAULT_RESIDUAL_STD

logger = logging.getLogger(__name__)


class ModelService:
    def __init__(self):
        model_path = resolve_forecast_model_path()
        data_path = resolve_dashboard_data_path()

        logger.info("Loading model from %s", model_path)
        logger.info("Loading dashboard data from %s", data_path)

        self.model = joblib.load(model_path)
        self.df = pd.read_csv(data_path)

        self.sample = self.df.drop("Total_Inventory_Cost", axis=1).iloc[-1:]
        self.base_unit_price = float(self.sample["Base_Unit_Price"].iloc[0])
        self.residual_std = self._compute_residual_std()

    def _compute_residual_std(self) -> float:
        try:
            y = self.df["Total_Inventory_Cost"]
            x = self.df.drop("Total_Inventory_Cost", axis=1)
            _, x_test, _, y_test = train_test_split(
                x, y, test_size=0.2, random_state=42
            )
            pred = self.model.predict(x_test)
            return float(np.std(y_test - pred))
        except Exception as exc:
            logger.warning(
                "Could not compute residual std dynamically, using default: %s", exc
            )
            return DEFAULT_RESIDUAL_STD

    def get_base_forecast(self) -> float:
        return float(self.model.predict(self.sample)[0])


model_service = ModelService()
