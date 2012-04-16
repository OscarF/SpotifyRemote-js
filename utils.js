function getTrackId(b) {
    if (!b)
        return "";
    if ("ad" != b.track_type) {
        if (0 < $(".track-" + b.track_resource.uri.split(":")[2]).length)
            return b.track_resource.uri.split(":")[2];
        if (0 < $(".track-" + b.artist_resource.uri.split(":")[2]).length)
            return b.artist_resource.uri.split(":")[2];
        if (0 < $(".track-" + b.album_resource.uri.split(":")[2]).length)
            return b.album_resource.uri.split(":")[2]
    }
    return ""
}

function readableTime(b) {
    var g = b / 1E3 / 60, b = Math.floor(g), g = Math.round(60 * (g - b));
    60 == g && (b++, g = 0);
    return 10 > g ? b + ":0" + g : b + ":" + g
}