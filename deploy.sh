#!/bin/bash

tag='dev'
project='dukandarsupplier-ui'
filter="name=^$project\$"
start=$(date +%s)

existing=$(docker container ls -aqf $filter)
if [ ! -z "$existing" ]; then
  echo 'Killing Existing Container'
  docker kill $existing
  docker rm $existing
else
  echo 'No Existing Conatiner Running!!'
fi

echo 'Creating New Container'
docker run -it -d -p 80:3000 --name $project $project:$tag

echo 'Waiting for container creation'
current=$(docker container ls -aqf $filter)
while [ -z "$current" ]; do
  current=$(docker container ls -aqf $filter)
done
echo 'Container Created Successfully!!'

echo 'Deployed Successfully!!!'

end=$(date +%s)
runtime=$((end - start))
echo 'Total Deploy Time =' $runtime 'seconds'

echo '---------------Displaying Logs---------------'
docker logs -f $current
