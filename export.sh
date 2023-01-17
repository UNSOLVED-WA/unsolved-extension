#!/bin/bash
export UWZIP=true
cd ./extension
npm run export
cd ..
zip -r unsolved.zip ./extension/dist
export UWZIP=false
