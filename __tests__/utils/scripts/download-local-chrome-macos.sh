cd $(dirname $0) || exit

VERSION=$1
LOCAL_CHROME_DIR="../../local-chrome/mac-os"

if [ "$VERSION" = "86" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F86.0.4240.75%2Fgooglechrome.dmg"
elif [ "$VERSION" = "84" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F84.0.4147.135%2Fgooglechrome.dmg"
elif [ "$VERSION" = "83" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F83.0.4103.116%2Fgooglechrome.dmg"
elif [ "$VERSION" = "81" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F81.0.4044.92%2Fgooglechrome.dmg"
elif [ "$VERSION" = "80" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F80.0.3987.149%2Fgooglechrome.dmg"
elif [ "$VERSION" = "79" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F79.0.3945.88%2Fgooglechrome.dmg"
else
    echo "Can't find a binary chrome with version $VERSION. Available versions are: 86, 84, 83, 81, 80, 79."
    echo "Exiting..."
    exit 1
fi

mkdir -p $LOCAL_CHROME_DIR
wget "$DOWNLOAD_LINK" --output-document="$LOCAL_CHROME_DIR"/chrome-"$VERSION".dmg
sudo hdiutil attach "$LOCAL_CHROME_DIR"/chrome-"$VERSION".dmg
##### The image will be mounted to /Volumes/<image>.dmg
cp -R /Volumes/Google\ Chrome/ "$LOCAL_CHROME_DIR"
chmod +x "$LOCAL_CHROME_DIR"/Google\ Chrome.app
##### Unmount the image
sudo hdiutil detach /Volumes/Google\ Chrome/
##### Remove download file
rm "$LOCAL_CHROME_DIR"/chrome-"$VERSION".dmg
echo "{ \"version\": \"$VERSION\" }" > "$LOCAL_CHROME_DIR"/macos-chrome.json 

yarn remove puppeteer
yarn cache clean
yarn add puppeteer@chrome-"$VERSION"

