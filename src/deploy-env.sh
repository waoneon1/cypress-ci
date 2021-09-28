# Make File
touch cypress.env.json

# Fill the .Env File
sed -i -e 's|BASEURL|'"${BASEURL}"'|g' cypress.env.json
sed -i -e 's|NUXT_ENV_CYPRESS_TOKEN|'"${NUXT_ENV_CYPRESS_TOKEN}"'|g' cypress.env.json

