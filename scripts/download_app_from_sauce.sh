set -o allexport
source .env
set +o allexport

if [ "$BUILD_NAME" = "latest" ]; then
    echo "Getting File data for [$BUILD_NAME] app"
    RESPONSE=$(curl -u "$SAUCE_USER:$SAUCE_KEY" --location \
    --request GET "https://api.us-west-1.saucelabs.com/v1/storage/files?kind=$OS&per_page=3" | json_pp)
    # echo "File data for [$BUILD_NAME] - $RESPONSE"
    ID=$(echo $RESPONSE | grep -oP '(?<="id" : ")[^"]+' | head -1)
    NAME=$(echo $RESPONSE | grep -Po '"name" : "\K(Payload|app-debug)-\w+(\.[^"]+)?' | head -1)
    echo "Application ID is [$ID]"
    echo "Downloading [$NAME] app"
    curl -u "$SAUCE_USER:$SAUCE_KEY" --location \
    --request GET "https://api.us-west-1.saucelabs.com/v1/storage/download/$ID" --output ./app/$NAME
    echo "Downloaded [$NAME] app"
else 
    echo "Getting File data for [$BUILD_NAME] app"
    RESPONSE=$(curl -u "$SAUCE_USER:$SAUCE_KEY" --location \
    --request GET "https://api.us-west-1.saucelabs.com/v1/storage/files?kind=$OS&name=$BUILD_NAME" | json_pp)
    # echo "File data for [$BUILD_NAME] - $RESPONSE"
    ID=$(echo $RESPONSE | grep -oP '(?<="id" : ")[^"]+' | head -1)
    echo "Application ID is [$ID]"
    echo "Downloading [$BUILD_NAME] app"
    curl -u "$SAUCE_USER:$SAUCE_KEY" --location \
    --request GET "https://api.us-west-1.saucelabs.com/v1/storage/download/$ID" --output ./app/$BUILD_NAME
    echo "Downloaded [$BUILD_NAME] app"
fi