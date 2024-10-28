from fastapi import Header, HTTPException, Request, Depends
from typing import Annotated
from fastapi.security import HTTPBearer
from cache import cache

async def check_permission(request: Request, test=Depends(HTTPBearer(scheme_name='Authorization'))):
    print(test.credentials, request.scope['route'].name)

    token = test.credentials
    request_name = request.scope['route'].name

    if token != "fake-super-secret-token":
        raise HTTPException(status_code=403, detail="invalid token")

    user_role = request.headers.get("X-User-Role")
    endpoint = request.url.path

    cache_key = f"permissions:{user_role}"

    permissions = cache.get(cache_key)

    if permissions is None:
        permissions = fetch_permissions_from_db(user_role)
        cache.set(cache_key, permissions)

    if not request_name in permissions:
        raise HTTPException(status_code=403, detail=f"Access denied for Role: {user_role} to Endpoint: {endpoint}")


def fetch_permissions_from_db(role: str):
    return ["endpoint1", "endpoint2", "/docs", 'get-item-detail']

