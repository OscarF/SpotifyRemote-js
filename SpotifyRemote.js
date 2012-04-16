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
	/* Original method to open the Spotify client if not running
	function t(b, d)
	{
		d || (d = 5E3);
		ia = window.open("http://" + location.host + "/openspotify/?spuri=" + b + "&closedelay=" + d, "sp", "status=0,toolbar=0,location=0,menubar=0,directories=0,resizable=0,scrollbars=0,height=80,width=250,left=" + (screen.width - 250) / 2 + ",top=" + (screen.height - 80) / 2)
	}*/
	/* New method to open Spotify client if not running. Not using Spotify servers. */
	function t(b, d) {
		ia = document.createElement('iframe');
		ia.src = b;
		document.getElementsByTagName("body")[0].appendChild(ia);
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
				//Changing opening way
				//ia && (ia.close(), ia = null);
				ia && (ia.parentElement.removeChild(ia), ia = null);
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