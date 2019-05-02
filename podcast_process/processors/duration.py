from processors.base import QueueProccessorBase


class DurationCalcProccessor(QueueProccessorBase):
    queue_name = "duration_calc_processor"
    routing_key = "asset.update"

    async def async_process(self, message) -> bool:
        return True


class TitlePredictProccessor(QueueProccessorBase):
    queue_name = "predict_processor"
    routing_key = "asset.update"

    async def async_process(self, message) -> bool:
        return True
