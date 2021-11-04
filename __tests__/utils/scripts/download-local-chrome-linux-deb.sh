cd $(dirname $0) || exit

VERSION=$1
LOCAL_CHROME_DIR="../../local-chrome/linux"

if [ "$VERSION" = "86" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F86.0.4240.75%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "84" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F84.0.4147.135%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "83" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F83.0.4103.116%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "81" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F81.0.4044.92%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "80" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F80.0.3987.149%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "79" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F79.0.3945.88%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "78" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F78.0.3904.97%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "76" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F76.0.3809.100%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "75" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F75.0.3770.80%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "71" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F71.0.3578.80%2Fgoogle-chrome-stable_current_amd64.deb"
elif [ "$VERSION" = "70" ]
then
    DOWNLOAD_LINK="https://www.slimjet.com/chrome/download-chrome.php?file=files%2F70.0.3538.77%2Fgoogle-chrome-stable_current_amd64.deb"
else
    echo "Can't find a binary chrome with version $VERSION. Available versions are: 86, 84, 83, 81, 80, 79, 78, 76, 75, 71, and 70."
    echo "Exiting..."
    exit 1
fi

mkdir $LOCAL_CHROME_DIR -p
wget "$DOWNLOAD_LINK" --output-document="$LOCAL_CHROME_DIR"/chrome-"$VERSION".deb
dpkg-deb -x "$LOCAL_CHROME_DIR"/chrome-"$VERSION".deb "$LOCAL_CHROME_DIR"/chrome-"$VERSION"
rm "$LOCAL_CHROME_DIR"/chrome-"$VERSION".deb
echo "{ \"version\": \"$VERSION\" }" > "$LOCAL_CHROME_DIR"/chrome.json 

yarn remove puppeteer
yarn cache clean
yarn add puppeteer@chrome-"$VERSION"

