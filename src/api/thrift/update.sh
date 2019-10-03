#!/bin/sh

echo "Updating credits API";
read -p "Press any key to continue..."

git clone https://github.com/CREDITSCOM/thrift-interface-definitions.git ./new
cd new
thrift -r --gen js:node api.thrift
thrift -r --gen js:node general.thrift
mv gen-nodejs/*.ts ../
mv gen-nodejs/*.js ../
cd .. && rm -rf ./new

echo "Done!"