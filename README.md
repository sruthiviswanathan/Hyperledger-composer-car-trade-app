# car-trade-app

an app that trades car

npm install
composer network install
docker ps
composer card list
composer network install
composer network start

TO RUN:
composer-rest-server -c admin@car-trade-app -n required -u true -d n -w true

AFTER UPDATING :
update version in package.jsoncomposer archive create -a car-trade-app.bna -t dir -n .
npm install  (or) 
     -- this will update bna file
composer network install
composer network update 


EACH TIME:

composer network install --archiveFile dist/car-trade-app.bna --card PeerAdmin@hlfv1

composer network start --card PeerAdmin@hlfv1 --networkName car-trade-app --networkVersion 0.0.1 --networkAdmin admin -S adminpw 

composer-rest-server -c admin@car-trade-app -n required -u true -d n -w true

