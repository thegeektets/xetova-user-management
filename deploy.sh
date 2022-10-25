cp -R build build.bak

git pull

npm install

npm run build

### copy keys to build
cp -R resources build/resources

npm run start
cd build
#run migrations
node ace migration:run

cd ..

cp -R build.bak/build/tmp build/tmp


pm2 restart core-service

