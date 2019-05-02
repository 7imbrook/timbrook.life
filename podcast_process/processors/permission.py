import asyncio, boto3, os, json
from box import Box
from processors.base import QueueProccessorBase


key = os.environ.get("ACCESS_KEY_ID")
secret = os.environ.get("SECRET_ACCESS_KEY")

s3 = boto3.resource(
    "s3",
    aws_access_key_id=key,
    aws_secret_access_key=secret,
    region_name="sfo2",
    endpoint_url="https://sfo2.digitaloceanspaces.com",
)


class PermissionProcessor(QueueProccessorBase):
    queue_name = "permission_update"
    routing_key = "asset.update"

    async def _update_permission(self, asset, should_be_pubic) -> bool:
        obj = s3.Object("timbrook-podcast", asset)
        acl = "public-read" if should_be_pubic else "private"
        obj.put(ACL=acl)
        self.log.info("Updated permissions on", asset, "to:", acl)
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

    async def _delete_object(self, asset) -> bool:
        obj = s3.Object("timbrook-podcast", asset)
        obj.delete()
        self.log.info("Deleted asset", asset)
        return True

    async def async_process(self, message) -> bool:
        if message.storage_key is None:
            self.log.critical(f"Missing storate key for payload {json.dumps(message)}")
            return True
        return await self._delete_object(message.storage_key)
