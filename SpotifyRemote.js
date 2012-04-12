var SpotifyRemote = function(b)
 {
    function g(b, d)
    {
        if ($.browser.msie && 8 <= parseInt($.browser.version, 10) && window.XDomainRequest)
        {
            var e = new XDomainRequest;
            b.abortTimer = setTimeout(function()
            {
                },
            d + 1E3);
            e.onload = function()
            {
                clearTimeout(b.abortTimer);
                var d = e.responseText,
                d = JSON.parse(d);
                b.success(d)
            };
            e.onerror = function()
            {
                clearTimeout(b.abortTimer);
                b.error && b.error(e.responseText)
            };
            e.ontimeout = function()
            {
                clearTimeout(b.abortTimer);
                b.error && b.error({
                    type: "timeout"
                })
            };
            e.timeout = d ? d: 5E3;
            e.open("get", b.url);
            e.send()
        } else b.url +=
        "&cors=",
        b.dataType = "json",
        $.ajax(b)
    }
    function r()
    {
        if ("" === Q) for (var b = 0;
        10 > b;
        ++b) Q += String.fromCharCode(Math.floor(26 * Math.random()) + 97);
        return "https://" + Q + ".spotilocal.com"
    }
    function t(b, d)
    {
        d || (d = 5E3);
        ia = window.open("http://" + location.host + "/openspotify/?spuri=" + b + "&closedelay=" + d, "sp", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=80,width=250,left=" + (screen.width - 250) / 2 + ",top=" + (screen.height - 80) / 2)
    }
    function p(b, d, e)
    {
        var f = r() + ":" + b + "/service/version.json?service=remote";
        g({
            url: f,
            cache: !1,
            success: function(e)
            {
                H = b;
                ea = !0;
                ia && (ia.close(), ia = null);
                la = !1 === e.running;
                Y = !1;
                ! 1 !== e.running && (N(S, {
                    }), d && d())
            },
            error: function()
            {
                ea = !1;
                b < T ? p(++b, d, e) : (Q = "", e && e())
            }
        },
        5E3)
    }
    function k()
    {
        var b = 60;
        v && (b = 1);
        v = !v;
        var e = r() + ":" + H + "/remote/status.json?csrf=" + K + "&oauth=" + F + "&returnon=login%2Clogout%2Cplay%2Cpause%2Cerror%2Cap&returnafter=" + b;
        U = !0;
        g({
            url: e,
            cache: !1,
            success: function(b)
            {
                if (b.error) if ("4110" == b.error.type) ba = !1,
                v = !0,
                setTimeout(function()
                {
                    k()
                },
                1E3);
                else if ("4107" == b.error.type) A();
                else if ("4303" == b.error.type) k();
                else {
                    s({
                        track: d,
                        playing: !1
                    });
                    try {
                        console.log("Error: " + b.error.type),
                        console.log(b)
                    } catch(e)
                    {
                        }
                } else ba = !0,
                s(b),
                k(),
                "" !== D && (v = !0, setTimeout(function()
                {
                    o()
                },
                2E3))
            },
            error: function()
            {
                ea = ba = U = !1;
                v = !0;
                w()
            }
        },
        1E3 * b + 5E3)
    }
    function n(b)
    {
        var d = r() + ":" + H + "/simplecsrf/token.json?";
        g({
            url: d,
            cache: !1,
            success: function(d)
            {
                K = d.token;
                b && b()
            }
        })
    }
    function A()
    {
        n(k)
    }
    function w()
    {
        p(B, A, z)
    }
    function z()
    {
        if (R < ja || !Y) R++,
        setTimeout(function()
        {
            w()
        },
        1E3)
    }
    function s(b)
    {
        ! b.track && d && (b = {
            track: d,
            playing: !1
        });
        b.track && (Z = b.playing, N(pa, {
            track: b.track,
            status: Z,
            playing_position: b.playing_position
        }), d = b.track)
    }
    function o()
    {
        if ("" !== D)
        {
            var b = r() + ":" + H + "/remote/play.json?csrf=" + K + "&oauth=" + F + "&uri=" + D + "&context=" + E;
            g({
                url: b,
                cache: !1,
                success: function(b)
                {
                    b.error && (b.error.uri = D, N(P, b.error));
                    D = "";
                    s(b)
                },
                error: function()
                {
                    }
            })
        }
    }
    function e()
    {
        D = "";
        var b = r() + ":" + H + "/remote/pause.json?pause=" + Z + "&csrf=" + K + "&oauth=" + F;
        g({
            url: b,
            cache: !1,
            success: function(b)
            {
                s(b)
            }
        })
    }
    function f()
    {
        var b = r() + ":" + H + "/remote/open.json?";
        g({
            url: b,
            cache: !1,
            success: function(b)
            {
                b.running && (la = !1, j())
            }
        })
    }
    function j()
    {
        Y = !1;
        ea ? la ? f() : U ? ba ? d && d.track_resource.uri == D ? e() : o() : t("spotify:", 400) : k() : (ea || N(C, {
            }), w())
    }
    function u(b, d)
    {
        void 0 === ca[b] && (ca[b] = []);
        ca[b].push(d)
    }
    function N(b, d)
    {
        for (var e in ca[b]) listener = ca[b][e],
        listener(d)
    }
    var K = "",
    F = b,
    D = "",
    E = "",
    B = 4370,
    T = 4379,
    H = B,
    Q = "",
    ba = !1,
    U = !1,
    v = !0,
    ea = !1,
    Z = !1,
    d = null,
    R = 1,
    Y = !0,
    ja = 2,
    ia,
    la = !1,
    ca = {
        },
    pa = "PLAY_MODE_CHANGED",
    C = "ON_CLIENT_OPENING",
    S = "ON_CLIENT_CONNECTED",
    P = "ON_CLIENT_ERROR";
    $.support.cors = !0;
    w();
    return {
        addPlayModeChangedListener: function(b)
        {
            u(pa, b)
        },
        addOnClientOpeningListener: function(b)
        {
            u(C, b)
        },
        addOnClientConnectedListener: function(b)
        {
            u(S, b)
        },
        addOnClientErrorListener: function(b)
        {
            u(P, b)
        },
        playPauseTrack: function(b, d, e)
        {
            D = "spotify:" + d + ":" + b;
            E = e;
            j()
        },
        getCurrentTrack: function()
        {
            return d
        },
        getCurrentURI: function()
        {
            return D
        },
        isClientRunning: function()
        {
            return ea
        },
        isTrackPlaying: function()
        {
            return Z
        },
        openSpotifyURI: function(b, d)
        {
            t(b, d)
        }
    }
};

var SPR, durationTimer, seekerMaxWidth = 0,
	clickedTrack, utilFrame, hideSpinnerTimeout, playButtonClickedAtLeastOnce = !1,
	trackStartedPlayingAtLeastOnce = !1,
	installTutorial, MacOS = "MacOS",
	WindowsOS = "WindowsOS",
	OSName = WindowsOS; - 1 != navigator.appVersion.indexOf("Mac") && (OSName = MacOS);


function triggerWebPlayer() {
	utilFrame.src = "player.php?uri=" + SPR.getCurrentURI()
}

function triggerPlayPause(b, g, r) {
	g && g.preventDefault();
	hideNotificationBar();
	if (r && SPR.getCurrentTrack() && 0 === $("." + SPR.getCurrentTrack().track_resource.uri.split(":")[2]).length) return !1;
	playButtonClickedAtLeastOnce || (playButtonClickedAtLeastOnce = !0, l(1));
	clickedTrack = b;
	clickedTrack.find("a").addClass("st-tab-active");
	hideSpinnerTimeout && (clearTimeout(hideSpinnerTimeout), hideSpinnerTimeout = null);
	setTimeout(function () {
		if (clickedTrack) {
			hideSpinners();
			clickedTrack.attr("class", clickedTrack.attr("class") + " loading");
			setTimeout(function () {
				clickedTrack && clickedTrack.removeClass("loading")
			}, 6E4)
		}
	}, 300);
	SPR.playPauseTrack(b.attr("track"), b.attr("rel"), context);
	return !1
}

function changePlayModeForTrack(b) {
	var g = b.track,
		r = b.status;
	clickedTrack = null;
	trackId = getTrackId(g);
	seekerInterval && (clearInterval(seekerInterval), seekerInterval = null);
	durationTimer && (clearInterval(durationTimer), durationTimer = null);
	$(".music-playing").removeClass("music-playing").addClass("music-paused");
	g = $(".track-" + trackId);
	if (0 < g.length && (r && ($(".player").removeClass("music-paused").addClass("music-playing"), updateStatusBar(g)), $(".st-tab-active").removeClass("st-tab-active"), $(".active").removeClass("active"), g.attr("class", r ? "track-" + trackId + " music-playing active cover-art-container-list " + contextType : "track-" + trackId + " music-paused active cover-art-container-list " + contextType).find("a").addClass("st-tab-active"), g.each(function (b, g) {
		var p = $(g);
		p.addClass(p.attr("oe"))
	}), r)) {
		$("#engageView").removeClass("music-paused").addClass("music-playing");
		!trackStartedPlayingAtLeastOnce && playButtonClickedAtLeastOnce && (trackStartedPlayingAtLeastOnce = !0, l(2));
		var t = $(".player .meta .progress-bar-container .buffer").width(),
			r = Number(g.attr("durationms")),
			g = Math.floor(r / t);
		$(".music-playing .seeker").width(Math.floor(t / r * 1E3 * b.playing_position));
		seekerInterval = setInterval(function () {
			var b = $(".music-playing .seeker").width();
			b < t && $(".music-playing .seeker").width(b + 1)
		}, g);
		var p = 1E3 * b.playing_position;
		$(".player .meta .progress-bar-container .time-spent")[0].innerHTML = readableTime(p);
		durationTimer = setInterval(function () {
			p = p + 1E3;
			$(".player .meta .progress-bar-container .time-spent")[0].innerHTML = readableTime(p)
		}, 1E3)
	}
}

function onClientOpening() {
	isSpotified() ? openClient() : setTimeout(function () {
		showOverlay(0)
	}, 500)
}
function onClientConnected() {
	hideInstallFlow()
}
function onClientError(b) {
	showNotificationBar(b.message);
	"4303" == b.type && $(".track-" + b.uri.split(":")[2]).addClass("unavailable")
}

function setupSpotifyRemote() {
	SPR = SpotifyRemote(tokenData);
	SPR.addPlayModeChangedListener(changePlayModeForTrack);
	SPR.addOnClientOpeningListener(onClientOpening);
	SPR.addOnClientConnectedListener(onClientConnected);
	SPR.addOnClientErrorListener(onClientError)
}
function openContextInSpotify() {
	isSpotified() ? "track" != contextType && SPR.openSpotifyURI(dataContext, 500) : showOverlay(0)
}

function readableTime(b) {
	var g = b / 1E3 / 60,
		b = Math.floor(g),
		g = Math.round(60 * (g - b));
	60 == g && (b++, g = 0);
	return 10 > g ? b + ":0" + g : b + ":" + g
}
function openClient() {
	setTimeout(function () {
		SPR.isClientRunning() || showOverlay(1)
	}, 1E4);
	SPR.openSpotifyURI("spotify:", 1E4)
}
window.attachEvent ? window.attachEvent("onmessage", xdmMsg) : window.addEventListener("message", xdmMsg, !1);

function xdmMsg(b) {
	isSpotified() || setSpotified("yes" == b.data)
}

function getTrackId(b) {
	if (!b) return "";
	if ("ad" != b.track_type) {
		if (0 < $(".track-" + b.track_resource.uri.split(":")[2]).length) return b.track_resource.uri.split(":")[2];
		if (0 < $(".track-" + b.artist_resource.uri.split(":")[2]).length) return b.artist_resource.uri.split(":")[2];
		if (0 < $(".track-" + b.album_resource.uri.split(":")[2]).length) return b.album_resource.uri.split(":")[2]
	}
	return ""
}

function showInstallGuide() {
	var b = "?ref=" + document.referrer + "&t=" + testLeg,
		g = (screen.width - 973) / 2,
		r = (screen.height - 400) / 2;
	if (OSName == MacOS || OSName == WindowsOS) installTutorial = window.open("https://" + location.host + "/download/tutorial/" + b, "InstallGuide", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=400,width=973,left=" + g + ",top=" + r)
}

function triggerSpotifyDownload() {
	utilFrame.src = "/download" + ("?ref=" + document.referrer + "&t=" + testLeg);
	"autopop" == testLeg ? showInstallGuide() : setTimeout(function () {
		$(".ihavespotify, .helpsupport").hide();
		$(".install-tutorial-pop").fadeIn("slow")
	}, 1E3)
}
function hideSpinners() {
	$(".loading").length && $(".loading").removeClass("loading")
}
$(document).ready(function () {
	initIntructionSlider();
	setupSpotifyRemote();
	renderWidget();
	utilFrame = document.createElement("iframe");
	utilFrame.id = "spotifyUtilFrame";
	$(utilFrame).css("display", "none");
	document.body.appendChild(utilFrame);
	"track" != contextType && $("#mainContainer").jScrollPane()
});
$(".player .album-art-container").click(function (b) {
	triggerPlayPause($(".track-" + $(this).parent().attr("rel")), b)
});
$(".cover-art-container-list").click(function (b) {
	triggerPlayPause($(this), b)
});
$("#engageView .middle").click(function (b) {
	triggerPlayPause($(".track-" + $(this).parent().parent().parent().attr("rel")), b)
});
$(".ihavespotify").click(function (b) {
	b.preventDefault();
	hideInstallFlow();
	openClient();
	return !1
});
$(".install-tutorial-pop").click(function (b) {
	b.preventDefault();
	showInstallGuide();
	return !1
});
$(".download-spotify").click(function (b) {
	b.preventDefault();
	triggerSpotifyDownload();
	return !1
});
$("#notifBar .notifCloseButton").click(function () {
	hideNotificationBar()
});
$("#widgetContainer").hover(function () {
	$(".player .meta .titles").animate({
		width: $(".player").width() - PLAYER_HEIGHT - 8 - $(".right-bar-buttons").width() - 8
	}, 100)
}, function () {
	$(".player .meta .titles").animate({
		width: $(".player").width() - PLAYER_HEIGHT - 8 - 8 - 19
	}, 100)
});
$(".player, .status-header, #mainContainer, #engageView, .overlay-item-2").mousedown(function (b) {
	b.preventDefault()
});
$(".overlay-close-button").click(function () {
	hideSpinners();
	closeOverlay()
});