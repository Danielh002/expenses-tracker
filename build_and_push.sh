#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <aws-account-id> <aws-region> [image-tag]"
  exit 1
fi

ACCOUNT_ID=$1
REGION=$2
TAG=${3:-$(git rev-parse --short HEAD)}

BACKEND_REPO="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/expense-tracker-backend"
FRONTEND_REPO="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/expense-tracker-frontend"

aws ecr get-login-password --region "$REGION" | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

docker build -t "$BACKEND_REPO:$TAG" backend

docker build -t "$FRONTEND_REPO:$TAG" frontend

for IMAGE in "$BACKEND_REPO:$TAG" "$FRONTEND_REPO:$TAG"; do
  docker push "$IMAGE"
  echo "Pushed $IMAGE"
  echo "Remember to point the infra-expense-tracker Terraform variables at $IMAGE"
done
