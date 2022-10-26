#!/bin/sh

#https://cloud.google.com/kubernetes-engine/docs/tutorials/autoscaling-metrics#custom-metric

kubectl create clusterrolebinding cluster-admin-binding \
    --clusterrole cluster-admin --user "$(gcloud config get-value account)" && \
    kubectl create -f https://raw.githubusercontent.com/GoogleCloudPlatform/k8s-stackdriver/master/custom-metrics-stackdriver-adapter/deploy/production/adapter_new_resource_model.yaml
