#!/bin/bash

# Make File
touch cypress.env.json
# echo '{
#   "BASEURAL": "",
#   "NUXT_ENV_CYPRESS_TOKEN": ""
# }' >> cypress2.env.json

# Fill the .Env File
sed -i -e 's|CYPRESS_ENV|'"${CYPRESS_ENV}"'|g' cypress.env.json
# sed -i -e 's|NUXT_ENV_CYPRESS_TOKEN|'"${NUXT_ENV_CYPRESS_TOKEN}"'|g' cypress2.env.json

