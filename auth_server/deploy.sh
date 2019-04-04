#!/bin/bash

#!/bin/bash
# function finish {
#     echo "Please wait while we tear down your canary..."
#     helm delete --purge auth-server
# }
# trap finish EXIT

docker build -t 7imbrook/auth:canary-$USER .
docker push 7imbrook/auth:canary-$USER | tee ./push_log.log

SHA=$(tail -n 1 ./push_log.log | cut -d':' -f 4 | cut -d' ' -f 1)
rm push_log.log

helm upgrade --wait -i -f ./values.yaml --set image.sha=$SHA auth-server personal/appshell

POD=$(kubectl get pod \
    -l app.kubernetes.io/instance=auth-server \
    -o=jsonpath="{.items[0].metadata.name}" \
    --field-selector status.phase=Running)

kubectl logs -f $POD