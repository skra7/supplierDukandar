#!/bin/bash

tag='dev'
project='dukandarsupplier-ui'
start=`date +%s`

echo 'Updating Code Base'
git pull

echo 'Building Docker Image'
docker build -t $project:$tag .

echo 'Removing Older Images'
docker image prune -f
echo 'Build Successfull!!!'

end=`date +%s`
runtime=$((end-start))
echo 'Total Build Time =' $runtime 'seconds'
