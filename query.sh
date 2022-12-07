#!/bin/sh

XML=$1
FORMAT=$2

SERVER=mines.legumeinfo.org
MINE=phaseolusmine

QUERY=`cat $XML`

curl --data-urlencode query="$QUERY" -d format=$FORMAT https://$SERVER/$MINE/service/query/results

echo ""
