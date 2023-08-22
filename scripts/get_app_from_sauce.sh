if [ "$CI" != "true" ]; then
    set -o allexport
    source .env
    set +o allexport
fi

if [ "$BUILD_NAME" = "latest" ] 
then
    echo "Getting File data for [$BUILD_NAME] app"
    RESPONSE=$(curl -u "$SAUCE_USER:$SAUCE_KEY" --location \
    --request GET "https://api.us-west-1.saucelabs.com/v1/storage/files?kind=$OS&per_page=2" | json_pp)
    echo "File data for [$BUILD_NAME] - $RESPONSE"
    NAME=$(echo $RESPONSE | grep -Po '"name" : "\K(Payload|app-debug)-\w+(\.[^"]+)?' | head -1)
    echo "BUILD_NAME=$NAME"
else 
    echo "BUILD_NAME=$BUILD_NAME"
fi