#!/bin/bash

if [[ $(pwd) =~ day[0-9]{2}$ ]] 
then
	echo "building typescript development environment"
	if ! [[ $(find package.json 2> /dev/null) ]] 
	then
		echo "package.json not found; initializing config"
		npm init -y
	fi

	# Install packages
	npm install typescript --save-dev
	npm install nodemon ts-node --save-dev
	npm install jest ts-jest @types/jest --save-dev

	if ! [[ $(find tsconfig.json 2> /dev/null) ]] 
	then
		echo "tsconfig.json not found; initializing config"
		tsc --init 
	fi

	if ! [[ $(find jest.config.js 2> /dev/null) ]] 
	then
		echo "jest.config.js not found; initializing config"
		npx ts-jest config:init
	fi

	### Configure nodemon
	echo '{ "execMap": { "ts": "ts-node"} }' | jq > nodemon.json

	### package.json configuration
	# set author
	npm pkg set author="Jonathan Min"
	# set main
	npm pkg set main="src/main.ts"
	# set scripts
	npm pkg set scripts.run="node src/main.ts"
	npm pkg set scripts.dev="nodemon src/main.ts"
	npm pkg set scripts.build="tsc"
	npm pkg set scripts.test="jest"
	npm pkg set scripts.test:watch="jest --watch"

	# Setup Project Structure 
	[[ ! -d "src" ]] && mkdir src && touch src/main.ts

	# Install additional packages
	npm install fs  

else 
	echo "$(pwd) is not a day directory"
fi
