#! /bin/bash

echo auto deploying...
git add -A
git commit -n -m 'auto deploy'
git push origin master
shipit default deploy
