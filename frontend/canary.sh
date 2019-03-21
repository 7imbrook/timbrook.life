#!/bin/bash

#!/bin/bash
function finish {
    echo "Please wait while we tear down your canary..."
    helm delete --purge canary-landing
}
trap finish EXIT

docker build -t 7imbrook/life:canary-$USER conf
docker push 7imbrook/life:canary-$USER | tee ./push_log.log

SHA=$(tail -n 1 ./push_log.log | cut -d':' -f 4 | cut -d' ' -f 1)
rm push_log.log

helm upgrade --wait -i -f ./values.yaml --set image.sha=$SHA canary-landing personal/appshell

POD=$(kubectl get pod \
    -l app.kubernetes.io/instance=canary-landing \
    -o=jsonpath="{.items[0].metadata.name}" \
    --field-selector status.phase=Running)

kubectl logs -f $POD