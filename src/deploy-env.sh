# Fill the .Env File
sed -i -e 's|BASEURL|'"${BASEURL}"'|g' src/cypress.env.json
sed -i -e 's|NUXT_ENV_CYPRESS_TOKEN|'"${NUXT_ENV_CYPRESS_TOKEN}"'|g' src/cypress.env.json

