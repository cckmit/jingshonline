#!/usr/bin/env bash

# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -euo pipefail

usage()
{
    cat <<END
deploy.sh: deploys jingshonline jingshonline-web service application to Kubernetes cluster
Parameters:
  -n | --namespace
    指定部署的空间
  -e | --env  
    指定的环境变量
  -h | --help
    帮助
END
}

namespace="jingshonline"
workdir=$(cd $(dirname $0); pwd)
image_tag="latest"
container_registry="harbor.jingshonline.net"
docker_org="jingshonline"
replicas_num=2
env=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    -r | --registry )
        container_registry="$2"; shift 2 ;;
    -do | --docker-org )
        docker_org="$2"; shift 2 ;;          
    -n | --namespace )
        namespace="$2"; shift 2 ;;
    -e | --env )
        env="$2"; shift 2 ;;     
    -rn | --replicas-num  )
        replicas_num=$2; shift 2 ;;        
    -t | --tag )
        image_tag="$2"; shift 2 ;;
    -h | --help )
        usage; exit 1 ;;
    *)
        echo "Unknown option $1"
        usage; exit 2 ;;
  esac
done

if [[ ! ${namespace} ]]; then
  echo '必须要指定名称空间'
  echo ''
  usage
  exit 3
fi

echo "#################### 设置资源文件的名称空间 ####################"
grep "{{namespace}}" --include="*.yml" -rl ./ | xargs -r sed -i "s/{{namespace}}/${namespace}/g" || true

echo "#################### 清楚旧的部署和服务 ####################"
kubectl delete -f jingshonline-dashboard-deployment.yml -f jingshonline-dashboard-service.yml  || true

echo "#################### 创建新的部署和服务 ####################"
kubectl apply -f jingshonline-dashboard-deployment.yml -f jingshonline-dashboard-service.yml

image_repository_addr="${container_registry}/${docker_org}/jingshonline-dashboard:${image_tag}"
echo "更新docker镜像地址,docker镜像为${image_repository_addr}"
image_repository="jingshonline-dashboard=${image_repository_addr}"

kubectl set image deployments/jingshonline-dashboard $image_repository -n=${namespace}
kubectl rollout resume deployments/jingshonline-dashboard -n=${namespace}

kubectl scale deploy jingshonline-dashboard --replicas=${replicas_num} -n=${namespace}

echo "#################### 创建ingress ####################"
if [[ "${env}" ]]; then
  kubectl delete -f jingshonline-dashboard-ingress-${env}.yml || true
  kubectl apply -f jingshonline-dashboard-ingress-${env}.yml
else
  kubectl delete -f jingshonline-dashboard-ingress.yml || true
  kubectl apply -f jingshonline-dashboard-ingress.yml
fi
