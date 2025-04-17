#!/bin/bash
# Initialize node.js project with package.json
npm init
mkdir src

# Setup ts
npm install typescript --save-dev
tsc --init

# Setup nodemon
npm install nodemon ts-node --save-dev
cat >nodemon.json<<EOF
{
  "execMap": {
    "ts": "ts-node"
  }
}
EOF

