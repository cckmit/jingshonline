#!/usr/bin/env bash

set -euo pipefail

usage() {
    cat <<END
pack-image.sh: 对docker镜像进行打包
Parameters:
  -r | --registry <container registry>
    指明docker私有镜像仓库
  -t | --tag <docker image tag>
    docker 镜像的标签
  -u | --docker-user )
    docker 镜像仓库用户
  -p | --docker-pwd )
    docker 镜像仓库密码
  -p | --docker-project
     项目名称
  --skip-image-push
    是否需要推送镜像
  --clear-images
    是否清理打包后本地的镜像
  -h | --help
    显示帮助

END
}

build_solution=''
container_registry='harbor.jingshonline.net'
build_images='yes'
push_image='yes'
docker_project='jingshonline'
clear_images=''
image_tag='latest'
docker_user=''
docker_pwd=''
deploy_env='prod'
workdir=$(
    cd $(dirname $0)
    pwd
)

while [[ $# -gt 0 ]]; do
    case "$1" in
    -r | --registry)
        container_registry="$2"
        shift 2
        ;;
    -t | --image-tag)
        image_tag="$2"
        shift 2
        ;;
    -u | --docker-user)
        docker_user="$2"
        shift 2
        ;;
    -p | --docker-pwd)
        docker_pwd="$2"
        shift 2
        ;;
    -e | --env)
        deploy_env="$2" 
        shift 2
        ;;        
    -pr | --docker-project )
       docker_project="$2" 
       shift 2
       ;;        
    --skip-image-push)
        push_image=''
        shift 1
        ;;
    --clear-images)
        clear_images='yes'
        shift 1
        ;;
    -h | --help)
        usage
        exit 1
        ;;
    *)
        echo "Unknown option $1"
        usage
        exit 2
        ;;
    esac
done

if [[ -z "${container_registry}" ]]; then
    echo "必须先指定docker镜像仓库"
    exit 1
fi

echo "#################### 设置打包的环境 ####################"
echo "指定的部署环境为${deploy_env}"
grep "{{env}}" --include="docker-compose.yml" -rl ../ | xargs -r sed -i "s/{{env}}/${deploy_env}/g" || true


echo "指定docker镜像的tag为${image_tag}"
export TAG=$image_tag

echo "#################### Building Docker images ####################"
docker-compose -p .. -f ${workdir}/../docker-compose.yml build --no-cache

if [ $? -ne 0 ]; then
    echo "构建镜像失败,请稍后重试..."
    exit 3
fi

# Login to Docker registry

if [[ "${docker_user}" ]]; then
    echo "使用账号${docker_user}登录到docker镜像仓库${container_registry}"
    docker login -u ${docker_user} -p ${docker_pwd} ${container_registry}
    if [ $? -ne 0 ]; then
        echo "docker 仓库登录失败"
        exit 3
    fi

fi

if [[ $push_image ]]; then
    echo "#################### Pushing images to registry ####################"
    image_fqdn=""
    if [[ "${docker_project:-}" ]]; then
        image_fqdn="${docker_project}"
    fi
    if [[ "${container_registry:-}" ]]; then
        image_fqdn="${container_registry}/${image_fqdn}"
    fi
    image_repo='jingshonline-web'
    if [[ "${image_fqdn:-}" ]]; then
        image_repo="${image_fqdn}/${image_repo}"
    fi
    echo "推送${image_repo}:${image_tag} docker镜像到镜像仓库.."
    docker tag "jingsh/jingshonline-web:${image_tag}" "${image_repo}:${image_tag}"
    docker push "${image_repo}:${image_tag}"
fi

if [[ $clear_images ]]; then
    echo "#################### clear local images ####################"
    docker rmi -f $(docker images | grep $image_tag | awk '{print $3}') || true
    # Remove temporary images
    docker rmi -f $(docker images -qf "dangling=true") || true
fi

if [ $? -ne 0 ]; then
    echo "删除所有未使用镜像和悬空的镜像失败..."
    exit 3
fi
