#!/bin/bash

NEW_VERSION=${1?Error: Pass new version}
CURRENT_VERSION=$(node -p "require('./package.json').version") 

GREEN='\033[0;32m'
NC='\033[0m' # No Color
echo -e "Updating release version from ${GREEN}${CURRENT_VERSION}${NC} to ${GREEN}${NEW_VERSION}${NC}"

sed -i '' "s/${CURRENT_VERSION}/${NEW_VERSION}/" package.json
sed -i '' "s/${CURRENT_VERSION}/${NEW_VERSION}/" package.json
echo -e "o ${GREEN}package.json updated to ${NEW_VERSION}${NC}"

SONAR_FILE=$(find ./ -iname sonar*.properties -type f)
# echo "Sonar file found: ${SONAR_FILE}"
REPLACE='^sonar.projectVersion=.*$'
WITH="sonar.projectVersion=${NEW_VERSION}"
sed -i '' "s#${REPLACE}#${WITH}#g" ${SONAR_FILE}
echo -e "o ${GREEN}sonar-project.properties updated to ${NEW_VERSION}${NC}"
