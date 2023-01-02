track() {
    osascript -e 'tell application "Spotify" to name of current track as string'
}

artist() {
    osascript -e 'tell application "Spotify" to artist of current track as string'
}

duration() {
    osascript -e 'tell application "Spotify" to duration of current track as integer'
}

position() {
    osascript -e 'tell application "Spotify" to player position as integer'
}


case "$1" in
"track")
    track;;
"artist")
    artist;;
"duration")
    duration;;
"position")
    position;;
esac