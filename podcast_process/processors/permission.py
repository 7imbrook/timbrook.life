from util import s3
from processors.base import QueueProccessorBase


class PermissionProcessor(QueueProccessorBase):
    queue_name = "permission_update"
    routing_key = "asset.update"
    disabled = True

    async def _update_permission(self, asset, should_be_pubic) -> bool:
        obj = s3.Object("timbrook-podcast", asset)
        pod_acl = obj.Acl()

        acl = "public-read" if should_be_pubic else "private"
        pod_acl.put(ACL=acl)

        self.log.info(f"Updated permissions on {asset} to: {acl}")
        return True

    async def async_process(self, message) -> bool:
        if message.storage_key is None or message.podcast is None:
            self.log.info(
                "Message missing storage key or not part of podcast, skipping"
            )
            return True

        return await self._update_permission(message.storage_key, message.published)


class AssetPurgeProcessor(QueueProccessorBase):
    queue_name = "purge_asset"
    routing_key = "asset.purge"
    disabled = True

    async def _delete_object(self, asset) -> bool:
        s3.Object("timbrook-podcast", asset).delete()
        self.log.info(f"Deleted asset {asset}")
        return True

    async def async_process(self, message) -> bool:
        if message.storage_key is None:
            self.log.critical(f"Missing storate key for payload {json.dumps(message)}")
            return True
        return await self._delete_object(message.storage_key)
