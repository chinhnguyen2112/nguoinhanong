﻿!(function () {
	function e(e) {
		return o.instances[e];
	}
	function t(e) {
		var t = this;
		t.id = e.name;
		var n = e.element.getDocument().getWindow().$,
			i = o.oC.getWindow().$;
		(t.inPopup = !(!n || !n.opener)),
			(t.inIframe =
				!t.inPopup &&
				n != i.top &&
				"iframe" == n.frameElement.nodeName.toLowerCase()),
			(t.inFrame =
				!t.inPopup &&
				n != i.top &&
				"frame" == n.frameElement.nodeName.toLowerCase()),
			(t.inUrlPopup = !(!t.inPopup || !i.opener));
	}
	function n(e, t, n) {
		t.on(
			"appReady",
			function (o) {
				o.removeListener(),
					(e.document = t.document.$),
					(e.folders = t.folders),
					(e.files = t.ld["filesview.filesview"].data().files),
					(e.basketFiles = t.basketFiles),
					(e.resourceTypes = t.resourceTypes),
					(e.connector = t.connector),
					(e.lang = t.lang),
					(e.langCode = t.langCode),
					(e.config = t.config),
					t.ld["foldertree.foldertree"].on(
						"afterAddFolder",
						function (t) {
							t.removeListener(), n && n(e);
						},
						e
					);
			},
			e,
			null,
			999
		);
	}
	var o = (function () {
			var e = {
					jY: "E7F823V",
					_: {},
					status: "unloaded",
					basePath: (function () {
						var e = window.CKFINDER_BASEPATH || "";
						if (!e)
							for (
								var t = document.getElementsByTagName("script"), n = 0;
								n < t.length;
								n++
							) {
								var o = t[n].src.match(
									/(^|.*[\\\/])CKFINDER(?:_basic)?(?:_v2)?(?:_source)?.js(?:\?.*)?$/i
								);
								if (o) {
									e = o[1];
									break;
								}
							}
						return (
							-1 == e.indexOf("://") &&
								(e =
									0 === e.indexOf("/")
										? location.href.match(/^.*?:\/\/[^\/]*/)[0] + e
										: location.href.match(/^[^\?]*\/(?:)/)[0] + e),
							e
						);
					})(),
					getUrl: function (e) {
						return (
							-1 == e.indexOf("://") &&
								0 !== e.indexOf("/") &&
								(e = this.basePath + e),
							this.jY &&
								"/" != e.charAt(e.length - 1) &&
								(e += (e.indexOf("?") >= 0 ? "&" : "?") + "t=" + this.jY),
							e
						);
					},
				},
				t = window.CKFINDER_GETURL;
			if (t) {
				var n = e.getUrl;
				e.getUrl = function (o) {
					return t.call(e, o) || n.call(e, o);
				};
			}
			return e;
		})(),
		i = {
			callback: 1,
			selectThumbnailActionFunction: 1,
			selectActionFunction: 1,
		};
	if (
		((o.jd = function () {
			var e,
				t = this,
				n = {};
			for (e in t)
				t.hasOwnProperty(e) &&
					(("function" == typeof t[e] && !i[e]) ||
						"undefined" == typeof t[e] ||
						(n[e] = t[e]));
			return t.callback && (n.callback = t.callback), n;
		}),
		(o.lj = function (e) {
			var t = this;
			e = e || t.basePath;
			var n = "";
			(e && 0 !== e.length) || (e = CKFinder.DEFAULT_basePath),
				"/" != e.substr(e.length - 1, 1) && (e += "/"),
				(e += "ckfinder.html");
			var o;
			return (
				t.hh &&
					((o = t.hh),
					"function" == typeof o &&
						(o = o.toString().match(/function ([^(]+)/)[1]),
					(n += "?action=js&amp;func=" + o)),
				t.jx &&
					((n += n ? "&amp;" : "?"), (n += "data=" + encodeURIComponent(t.jx))),
				t.disableThumbnailSelection
					? ((n += n ? "&amp;" : "?"), (n += "dts=1"))
					: (t.lH || t.hh) &&
					  ((o = t.lH || t.hh),
					  "function" == typeof o &&
							(o = o.toString().match(/function ([^(]+)/)[1]),
					  (n += n ? "&amp;" : "?"),
					  (n += "thumbFunc=" + o),
					  t.nm
							? (n += "&amp;tdata=" + encodeURIComponent(t.nm))
							: !t.lH &&
							  t.jx &&
							  (n += "&amp;tdata=" + encodeURIComponent(t.jx))),
				t.startupPath &&
					((n += n ? "&amp;" : "?"),
					(n +=
						"start=" +
						encodeURIComponent(
							t.startupPath + (t.startupFolderExpanded ? ":1" : ":0")
						))),
				void 0 === t.rememberLastFolder ||
					t.rememberLastFolder ||
					((n += n ? "&amp;" : "?"), (n += "rlf=0")),
				t.id &&
					((n += n ? "&amp;" : "?"), (n += "id=" + encodeURIComponent(t.id))),
				t.skin &&
					((n += n ? "&amp;" : "?"),
					(n += "skin=" + encodeURIComponent(t.skin))),
				e + n
			);
		}),
		(t.prototype = {
			_: {},
			addFileContextMenuOption: function (t, n, i) {
				var a = e(this.id),
					r = "FileContextMenu_" + t.command;
				a.bD(r, {
					exec: function (e) {
						var t = e.ld["filesview.filesview"].tools.dH();
						n(e.cg, t);
					},
				}),
					(t.command = r),
					t.group || (t.group = "file1"),
					a.gp(r, t),
					a.ld["filesview.filesview"].on("beforeContextMenu", function (e) {
						if (i) {
							var t = i(this.tools.dH());
							t && (e.data.bj[r] = -1 == t ? o.aY : o.aS);
						} else e.data.bj[r] = o.aS;
					});
			},
			disableFileContextMenuOption: function (t, n) {
				var o = e(this.id),
					i = n ? "FileContextMenu_" + t : t,
					a = function (e) {
						delete e.data.bj[i];
					};
				return (
					o.ld["filesview.filesview"].on("beforeContextMenu", a),
					function () {
						o.ld["filesview.filesview"].removeListener("beforeContextMenu", a);
					}
				);
			},
			addFolderContextMenuOption: function (t, n, i) {
				var a = e(this.id),
					r = "FolderContextMenu_" + t.command;
				a.bD(r, {
					exec: function (e) {
						n(e.cg, e.aV);
					},
				}),
					(t.command = r),
					t.group || (t.group = "folder1"),
					a.gp(r, t),
					a.ld["foldertree.foldertree"].on("beforeContextMenu", function (e) {
						if (i) {
							var t = i(this.app.aV);
							t && (e.data.bj[r] = -1 == t ? o.aY : o.aS);
						} else e.data.bj[r] = o.aS;
					});
			},
			disableFolderContextMenuOption: function (t, n) {
				var o = e(this.id),
					i = n ? "FolderContextMenu_" + t : t,
					a = function (e) {
						delete e.data.bj[i];
					};
				return (
					o.ld["foldertree.foldertree"].on("beforeContextMenu", a),
					function () {
						o.ld["foldertree.foldertree"].removeListener(
							"beforeContextMenu",
							a
						);
					}
				);
			},
			addFolderDropMenuOption: function (t, n, i) {
				var a = e(this.id),
					r = "FolderDropMenu_" + t.command;
				a.bD(r, {
					exec: function (e) {
						n(e.cg, e.cK.oa());
					},
				}),
					(t.command = r);
				var l = new o.iD(a, r, t);
				a.ld["foldertree.foldertree"].on("beforeDropMenu", function (e) {
					(i ? i.call(a.cg, e.data.folder) : 1) && (e.data.iG[r] = l);
				});
			},
			disableFolderDropMenuOption: function (t, n) {
				var o = e(this.id),
					i = n ? "FolderDropMenu_" + t : t,
					a = function (e) {
						delete e.data.iG[i];
					};
				return (
					o.ld["foldertree.foldertree"].on("beforeDropMenu", a),
					function () {
						o.ld["foldertree.foldertree"].removeListener("beforeDropMenu", a);
					}
				);
			},
			getSelectedFile: function () {
				return e(this.id).ld["filesview.filesview"].tools.dH();
			},
			getSelectedFiles: function () {
				return e(this.id).ld["filesview.filesview"].tools.oO();
			},
			getSelectedFolder: function () {
				return e(this.id).aV;
			},
			filterFiles: function (t) {
				e(this.id).ld["filesview.filesview"].oW("requestRenderFiles", {
					lookup: t,
				});
			},
			setUiColor: function (t) {
				return e(this.id).setUiColor(t);
			},
			destroy: function (t) {
				e(this.id).destroy(), t && t();
			},
			openDialog: function (t, n) {
				{
					var i = this,
						a = new o.dom.document(window.document).getHead();
					e(i.id).document.getWindow();
				}
				return (
					(i.inFrame || i.inPopup || i.inIframe) &&
						(o.document = e(i.id).document),
					e(i.id).openDialog(t, n, a)
				);
			},
			openMsgDialog: function (t, n) {
				e(this.id).msgDialog(t, n);
			},
			openConfirmDialog: function (t, n, o) {
				e(this.id).fe(t, n, o);
			},
			openInputDialog: function (t, n, o, i) {
				e(this.id).hs(t, n, o, i);
			},
			openSkippedFilesDialog: function (t, n, o, i) {
				e(this.id).skippedFilesDialog(t, n, o, i);
			},
			addTool: function (t) {
				return e(this.id).plugins.tools.addTool(t);
			},
			addToolPanel: function (t) {
				return e(this.id).plugins.tools.addToolPanel(t);
			},
			removeTool: function (t) {
				e(this.id).plugins.tools.removeTool(t);
			},
			showTool: function (t) {
				e(this.id).plugins.tools.showTool(t);
			},
			hideTool: function (t) {
				e(this.id).plugins.tools.hideTool(t);
			},
			getResourceType: function (t) {
				return e(this.id).getResourceType(t);
			},
			log: function () {
				o.log.apply(o.log, arguments);
			},
			getLog: function () {
				return o.mZ();
			},
			emptyBasket: function () {
				e(this.id).execCommand("TruncateBasket");
			},
			replaceUploadForm: function (t, n, i, a) {
				var r = e(this.id);
				return (
					a || (a = 10),
					a >= (r.dC || 20)
						? void 0
						: ((r.dC = a),
						  r.ld["formpanel.formpanel"].on(
								"beforeUploadFileForm",
								function (e) {
									if (2 == e.data.step && !(a > r.dC)) {
										e.cancel(!0);
										{
											var l = this.data();
											e.data.folder;
										}
										try {
											"upload" == l.dc
												? this.oW("requestUnloadForm", function () {
														this.app.cS("upload").bR(o.aS);
												  })
												: (this.data().dc && this.oW("requestUnloadForm"),
												  i || this.eh.removeClass("show_border"),
												  this.oW("requestLoadForm", {
														html: t,
														command: "upload",
												  }),
												  n && n());
										} catch (s) {
											throw (
												(this.oW("failedUploadFileForm", e.data),
												this.oW("afterUploadFileForm", e.data),
												o.ba(s))
											);
										}
									}
								}
						  ),
						  {
								hide: function () {
									r.oW("requestUnloadForm", function () {
										r.cS("upload").bR(o.aS);
									});
								},
						  })
				);
			},
			resizeFormPanel: function (t) {
				var n = e(this.id);
				if ("undefined" == typeof t)
					n.document.getById("panel_view").setStyle("height", ""),
						n.document.getById("panel_widget").setStyle("height", "");
				else {
					var o = Math.min(
						t,
						Math.max(
							90,
							n.document.getById("main_container").$.offsetHeight - 300
						)
					);
					n.document.getById("panel_view").setStyle("height", o + "px"),
						n.document.getById("panel_widget").setStyle("height", o - 3 + "px");
				}
				n.layout.ea(!0);
			},
			refreshOpenedFolder: function () {
				var t = e(this.id),
					n = t.ld["filesview.filesview"].tools.currentFolder();
				t.oW("requestSelectFolder", { folder: n });
			},
			selectFile: function (t) {
				var n = e(this.id);
				n.oW("requestSelectFile", { file: t, scrollTo: 1 });
			},
			closePopup: function () {
				this.inPopup && e(this.id).element.getDocument().getWindow().$.close();
			},
			openFolder: function (t, n) {
				var o = e(this.id);
				(n = n.replace(/\/$/, "")), (t = t.toLowerCase());
				for (var i = 0; i < o.folders.length; i++) {
					var a = o.folders[i];
					if (a.getPath().replace(/\/$/, "") == n && t == a.type.toLowerCase())
						return (
							o.oW("requestSelectFolder", { folder: a }),
							void o.oW("requestShowFolderFiles", { folder: a })
						);
				}
			},
			setUiColor: function (t) {
				e(this.id).setUiColor(t);
			},
			execCommand: function (t) {
				e(this.id).execCommand(t);
			},
		}),
		(function () {
			function e(e) {
				for (var t = 1; CKFinder._.instanceConfig[t]; ) t++;
				return (CKFinder._.instanceConfig[t] = e), t;
			}
			(window.CKFinder = function (e, t) {
				if (e) {
					var n;
					for (n in e)
						e.hasOwnProperty(n) &&
							("function" != typeof e[n] || "callback" == n) &&
							(this[n] = e[n]);
				}
				this.callback = t;
			}),
				(CKFinder.prototype = {
					create: function (e) {
						var t = "ckf" + Math.random().toString().substr(2, 9);
						document.write('<span id="' + t + '"></span>'),
							(e = o.tools.extend(o.jd.call(this), e, !0));
						var n = o.replace(t, e, CKFinder);
						return (this.api = n.cg), n.cg;
					},
					appendTo: function (e, t) {
						t = o.tools.extend(o.jd.call(this), t, !0);
						var n = o.appendTo(e, t, CKFinder);
						return (this.api = n.cg), n.cg;
					},
					replace: function (e, t) {
						t = o.tools.extend(o.jd.call(this), t, !0);
						var n = o.replace(e, t, CKFinder);
						return (this.api = n.cg), n.cg;
					},
					popup: function (e, t) {
						var n = this;
						(e = e || "80%"),
							(t = t || "70%"),
							"string" == typeof e &&
								e.length > 1 &&
								"%" == e.substr(e.length - 1, 1) &&
								(e = parseInt(
									(window.screen.width * parseInt(e, 10)) / 100,
									10
								)),
							"string" == typeof t &&
								t.length > 1 &&
								"%" == t.substr(t.length - 1, 1) &&
								(t = parseInt(
									(window.screen.height * parseInt(t, 10)) / 100,
									10
								)),
							200 > e && (e = 200),
							200 > t && (t = 200);
						var i = parseInt((window.screen.height - t) / 2, 10),
							a = parseInt((window.screen.width - e) / 2, 10),
							r =
								"location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,width=" +
								e +
								",height=" +
								t +
								",top=" +
								i +
								",left=" +
								a,
							l = o.env.webkit ? "about:blank" : "",
							s = window.open(l, "CKFinderpopup", r, !0);
						if (!s) return !1;
						n.width = n.height = "100%";
						var d =
								'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html><head><title>CKFinder 2</title><style type="text/css">body, html, iframe, #ckfinder { margin: 0; padding: 0; border: 0; width: 100%; height: 100%; overflow: hidden; }</style></head><body></body></html>',
							c = new o.dom.document(s.document);
						c.$.open(),
							o.env.isCustomDomain() && (c.$.domain = window.document.domain),
							c.$.write(d),
							c.$.close();
						try {
							var u = navigator.userAgent.toLowerCase();
							return (
								-1 == u.indexOf(" chrome/") &&
									(s.moveTo(a, i), s.resizeTo(e, t)),
								s.focus(),
								n.appendTo(c.bH())
							);
						} catch (f) {
							return n.appendTo(c.bH());
						}
						return !1;
					},
				}),
				(CKFinder._ = {}),
				(CKFinder._.instanceConfig = []),
				(CKFinder.lang = {}),
				(CKFinder.version = "2.4.2"),
				(CKFinder.revision = "2731"),
				(CKFinder.addPlugin = function (e, t, n) {
					var i = { bM: n || [] };
					"function" == typeof t && (t = { appReady: t });
					var a;
					for (a in t)
						t.hasOwnProperty(a) &&
							"connectorInitialized" != a &&
							"uiReady" != a &&
							(i[a] = t[a]);
					(i.bz = function (e) {
						return e.config.readOnly && i.readOnly === !1
							? null
							: (t.connectorInitialized &&
									e.on(
										"connectorInitialized",
										function (n) {
											var o = t.connectorInitialized;
											o && o.call(o, e.cg, n.data.xml);
										},
										null,
										null,
										1e3
									),
							  t.connectorResponse &&
									e.on("connectorResponse", function (n) {
										var o = t.connectorResponse;
										o && o.call(o, e.cg, n.data.xml);
									}),
							  t.galleryCallback &&
									e.on("launchGallery", function (n) {
										var o = t.galleryCallback;
										o &&
											(n.data.bx = o.call(
												o,
												e.cg,
												n.data.selected,
												n.data.files
											));
									}),
							  t.uiReady &&
									e.on(
										"uiReady",
										function () {
											var n = t.uiReady;
											n.call(n, e.cg);
										},
										null,
										null,
										1e3
									),
							  void (
									t.appReady &&
									e.on(
										"appReady",
										function () {
											var n = t.appReady;
											n.call(n, e.cg);
										},
										null,
										null,
										1e3
									)
							  ));
					}),
						o.plugins.add(e, i);
				}),
				(CKFinder.getPluginPath = function (e) {
					return o.plugins.getPath(e);
				}),
				(CKFinder.addExternalPlugin = function (e, t, n) {
					o.plugins.tR(e, t, n);
				}),
				(CKFinder.setPluginLang = function (e, t, n) {
					o.plugins.rX(e, t, n);
				}),
				(CKFinder.dialog = {
					add: function (e, t) {
						"function" == typeof t &&
							(t = o.tools.override(t, function (e) {
								return function (t) {
									return e(t.cg);
								};
							})),
							o.dialog.add(e, t);
					},
				}),
				(CKFinder.tools = {}),
				(CKFinder.env = {}),
				(CKFinder.dom = {}),
				(CKFinder.create = function (e, t, n, o, i) {
					var a;
					if (null !== e && "object" == typeof e) {
						a = new CKFinder();
						var r;
						for (r in e) a[r] = e[r];
					} else
						(a = new CKFinder()),
							(a.basePath = e),
							t && (a.width = t),
							n && (a.height = t),
							o && (a.selectActionFunction = o),
							i && (a.callback = i);
					return a.create();
				}),
				(CKFinder.popup = function (e, t, n, o, i) {
					var a;
					if (null !== e && "object" == typeof e) {
						a = new CKFinder();
						var r;
						for (r in e) a[r] = e[r];
					} else
						(a = new CKFinder()),
							(a.basePath = e),
							o && (a.selectActionFunction = o),
							i && (a.callback = i);
					return a.popup(t, n);
				}),
				(CKFinder.setupFCKeditor = function (t, n, i, a) {
					var r, l;
					if (null !== n && "object" == typeof n) {
						(l = e(n)), (r = new CKFinder());
						var s;
						for (s in n)
							if (((r[s] = n[s]), "width" == s)) {
								var d = r[s] || 800;
								"string" == typeof d &&
									d.length > 1 &&
									"%" == d.substr(d.length - 1, 1) &&
									(d = parseInt(
										(window.screen.width * parseInt(d, 10)) / 100,
										10
									)),
									(t.Config.LinkBrowserWindowWidth = d),
									(t.Config.ImageBrowserWindowWidth = d),
									(t.Config.FlashBrowserWindowWidth = d);
							} else if ("height" == s) {
								var c = r[s] || 600;
								"string" == typeof c &&
									c.length > 1 &&
									"%" == c.substr(c.length - 1, 1) &&
									(c = parseInt(
										(window.screen.height * parseInt(c, 10)) / 100,
										10
									)),
									(t.Config.LinkBrowserWindowHeight = c),
									(t.Config.ImageBrowserWindowHeight = c),
									(t.Config.FlashBrowserWindowHeight = c);
							}
					} else (r = new CKFinder()), (r.basePath = n);
					var u = r.basePath;
					"/" != u.substr(0, 1) &&
						-1 == u.indexOf("://") &&
						(u =
							document.location.pathname.substring(
								0,
								document.location.pathname.lastIndexOf("/") + 1
							) + u),
						(u = o.lj.call(r, u));
					var f = -1 !== u.indexOf("?") ? "&" : "?";
					l && ((u += f + "configId=" + l), (f = "&")),
						(t.Config.LinkBrowserURL = u),
						(t.Config.ImageBrowserURL = u + f + "type=" + (i || "Images")),
						(t.Config.FlashBrowserURL = u + f + "type=" + (a || "Flash"));
					var p = u.substring(0, 1 + u.lastIndexOf("/"));
					(t.Config.LinkUploadURL =
						p +
						"core/connector/" +
						CKFinder.config.connectorLanguage +
						"/connector." +
						CKFinder.config.connectorLanguage +
						"?command=QuickUpload&type=Files"),
						(t.Config.ImageUploadURL =
							p +
							"core/connector/" +
							CKFinder.config.connectorLanguage +
							"/connector." +
							CKFinder.config.connectorLanguage +
							"?command=QuickUpload&type=" +
							(i || "Images")),
						(t.Config.FlashUploadURL =
							p +
							"core/connector/" +
							CKFinder.config.connectorLanguage +
							"/connector." +
							CKFinder.config.connectorLanguage +
							"?command=QuickUpload&type=" +
							(a || "Flash"));
				}),
				(CKFinder.setupCKEditor = function (t, n, i, a) {
					if (null === t) {
						var r;
						for (r in CKEDITOR.instances)
							CKFinder.setupCKEditor(CKEDITOR.instances[r], n, i, a);
						return void CKEDITOR.on("instanceCreated", function (e) {
							CKFinder.setupCKEditor(e.editor, n, i, a);
						});
					}
					var l, s;
					if (null !== n && "object" == typeof n) {
						(s = e(n)), (l = new CKFinder());
						var d;
						for (d in n)
							if (((l[d] = n[d]), "width" == d)) {
								var c = l[d] || 800;
								"string" == typeof c &&
									c.length > 1 &&
									"%" == c.substr(c.length - 1, 1) &&
									(c = parseInt(
										(window.screen.width * parseInt(c, 10)) / 100,
										10
									)),
									(t.config.filebrowserWindowWidth = c);
							} else if ("height" == d) {
								var u = l[d] || 600;
								"string" == typeof u &&
									u.length > 1 &&
									"%" == u.substr(u.length - 1, 1) &&
									(u = parseInt(
										(window.screen.height * parseInt(u, 10)) / 100,
										10
									)),
									(t.config.filebrowserWindowHeight = u);
							}
					} else (l = new CKFinder()), (l.basePath = n);
					var f = l.basePath;
					"/" != f.substr(0, 1) &&
						-1 == f.indexOf("://") &&
						(f =
							document.location.pathname.substring(
								0,
								document.location.pathname.lastIndexOf("/") + 1
							) + f),
						(f = o.lj.call(l, f));
					var p = -1 !== f.indexOf("?") ? "&" : "?";
					s && ((f += p + "configId=" + s), (p = "&")),
						(t.config.filebrowserBrowseUrl = f),
						(t.config.filebrowserImageBrowseUrl =
							f + p + "type=" + (i || "Images")),
						(t.config.filebrowserFlashBrowseUrl =
							f + p + "type=" + (a || "Flash"));
					var h = f.substring(0, 1 + f.lastIndexOf("/"));
					(t.config.filebrowserUploadUrl =
						h +
						"core/connector/" +
						CKFinder.config.connectorLanguage +
						"/connector." +
						CKFinder.config.connectorLanguage +
						"?command=QuickUpload&type=Files"),
						(t.config.filebrowserImageUploadUrl =
							h +
							"core/connector/" +
							CKFinder.config.connectorLanguage +
							"/connector." +
							CKFinder.config.connectorLanguage +
							"?command=QuickUpload&type=" +
							(i || "Images")),
						(t.config.filebrowserFlashUploadUrl =
							h +
							"core/connector/" +
							CKFinder.config.connectorLanguage +
							"/connector." +
							CKFinder.config.connectorLanguage +
							"?command=QuickUpload&type=" +
							(a || "Flash"));
				});
		})(),
		o.event ||
			((o.event = function () {}),
			(o.event.du = function (e) {
				var t,
					n = o.event.prototype;
				for (t in n) void 0 == e[t] && (e[t] = n[t]);
			}),
			(o.event.prototype = (function () {
				var e = function (e) {
						var t = (e.kk && e.kk()) || e._ || (e._ = {});
						return t.cC || (t.cC = {});
					},
					t = function (e) {
						(this.name = e), (this.dF = []);
					};
				return (
					(t.prototype = {
						mi: function (e) {
							for (var t = 0, n = this.dF; t < n.length; t++)
								if (n[t].fn == e) return t;
							return -1;
						},
					}),
					{
						on: function (n, o, i, a, r) {
							var l = e(this),
								s = l[n] || (l[n] = new t(n));
							if (s.mi(o) < 0) {
								var d = s.dF;
								i || (i = this), isNaN(r) && (r = 10);
								var c = this,
									u = function (e, t, r, l) {
										var s = {
											name: n,
											jN: this,
											application: e,
											data: t,
											jO: a,
											stop: r,
											cancel: l,
											removeListener: function () {
												c.removeListener(n, o);
											},
										};
										return o.call(i, s), s.data;
									};
								(u.fn = o), (u.nT = r);
								for (var f = d.length - 1; f >= 0; f--)
									if (d[f].nT <= r) return void d.splice(f + 1, 0, u);
								d.unshift(u);
							}
						},
						oW: (function () {
							var t = !1,
								n = function () {
									t = !0;
								},
								i = !1,
								a = function (e) {
									i = e ? 2 : !0;
								};
							return function (r, l, s, d) {
								"function" == typeof l
									? ((d = l), (l = null))
									: "function" == typeof s && ((d = s), (s = null)),
									"mousemove" != r && o.log("[EVENT] " + r, l, d);
								var c = e(this)[r],
									u = t,
									f = i;
								if (((t = i = !1), c)) {
									var p = c.dF;
									if (p.length) {
										p = p.slice(0);
										for (var h = 0; h < p.length; h++) {
											var m = p[h].call(this, s, l, n, a);
											if (
												("undefined" != typeof m && (l = m), t || (i && 2 != i))
											)
												break;
										}
									}
								}
								var g =
									i ||
									("undefined" == typeof l
										? !1
										: l && "undefined" != typeof l.result
										? l.result
										: l);
								return (
									"function" == typeof d &&
										2 != i &&
										(g = d.call(this, i, l) || g),
									(t = u),
									(i = f),
									g
								);
							};
						})(),
						cr: function (t, n, o) {
							var i = this.oW(t, n, o);
							return delete e(this)[t], i;
						},
						removeListener: function (t, n) {
							var o = e(this)[t];
							if (o) {
								var i = o.mi(n);
								i >= 0 && o.dF.splice(i, 1);
							}
						},
						mF: function () {
							for (var t = e(this), n = 0; n < t.length; n++) t[n].dF = [];
						},
						rC: function (t) {
							var n = e(this)[t];
							return n && n.dF.length > 0;
						},
					}
				);
			})())),
		o.application ||
			((o.kZ = 0),
			(o.fc = 1),
			(o.qE = 2),
			(o.application = function (e, t, n, i) {
				var a = this;
				(a._ = { instanceConfig: e, element: t }),
					(a.ff = n || o.kZ),
					o.event.call(a),
					a.iI(i);
			}),
			(o.application.replace = function (e, t, n) {
				var i = e;
				if ("object" != typeof i) {
					if (((i = document.getElementById(e)), !i))
						for (
							var a = 0, r = document.getElementsByName(e);
							(i = r[a++]) && "textarea" != i.tagName.toLowerCase();

						);
					if (!i)
						throw (
							'[CKFINDER.application.replace] The element with id or name "' +
							e +
							'" was not found.'
						);
				}
				return new o.application(t, i, o.fc, n);
			}),
			(o.application.appendTo = function (e, t, n) {
				if ("object" != typeof e && ((e = document.getElementById(e)), !e))
					throw (
						'[CKFINDER.application.appendTo] The element with id "' +
						e +
						'" was not found.'
					);
				return new o.application(t, e, o.qE, n);
			}),
			(o.application.prototype = {
				iI: function () {
					var e = o.application.eb || (o.application.eb = []);
					e.push(this);
				},
				oW: function (e, t, n) {
					return o.event.prototype.oW.call(this, e, t, this, n);
				},
				cr: function (e, t, n) {
					return o.event.prototype.cr.call(this, e, t, this, n);
				},
			}),
			o.event.du(o.application.prototype, !0)),
		!o.env)
	) {
		var a = /rv:([\d\.]+)/,
			r = /trident\/([\d]+)/;
		(o.env = (function () {
			var e = navigator.userAgent.toLowerCase(),
				t = window.opera,
				n = {
					ie: !1,
					iemodern: !1,
					opera: !!t && t.version,
					webkit: e.indexOf(" applewebkit/") > -1,
					air: e.indexOf(" adobeair/") > -1,
					mac: e.indexOf("macintosh") > -1,
					quirks: "BackCompat" == document.compatMode,
					isCustomDomain: function () {
						return this.ie && document.domain != window.location.hostname;
					},
				};
			(n.gecko = "Gecko" == navigator.product && !n.webkit && !n.opera),
				(n.chrome = !1),
				(n.safari = !1),
				n.webkit &&
					(e.indexOf(" chrome/") > -1 ? (n.chrome = !0) : (n.safari = !0));
			var o = 0;
			if (
				(n.ie &&
					((o = parseFloat(e.match(/msie (\d+)/)[1])),
					(n.ie8 = !!document.documentMode),
					(n.ie8Compat = 8 == document.documentMode),
					(n.ie7Compat =
						(7 == o && !document.documentMode) || 7 == document.documentMode),
					(n.ie6Compat = 7 > o || n.quirks)),
				n.gecko)
			) {
				var i = e.match(a);
				i &&
					((i = i[1].split(".")),
					(o = 1e4 * i[0] + 100 * (i[1] || 0) + +(i[2] || 0))),
					r.test(e)
						? ((n.gecko = !1), (n.iemodern = !0))
						: (n.isMobile = e.indexOf("fennec") > -1);
			}
			return (
				n.opera &&
					((o = parseFloat(t.version())),
					(n.isMobile = e.indexOf("opera mobi") > -1)),
				n.air && (o = parseFloat(e.match(/ adobeair\/(\d+)/)[1])),
				n.webkit &&
					((o = parseFloat(e.match(/ applewebkit\/(\d+)/)[1])),
					(n.isMobile = e.indexOf("mobile") > -1)),
				(n.version = o),
				(n.isCompatible =
					(n.ie && o >= 6) ||
					(n.iemodern && o >= 11) ||
					(n.gecko && o >= 10801) ||
					(n.opera && o >= 9.5) ||
					(n.air && o >= 1) ||
					(n.webkit && o >= 522) ||
					!1),
				(n.cssClass =
					"browser_" +
					(n.ie
						? "ie"
						: n.iemodern
						? "iemodern"
						: n.gecko
						? "gecko"
						: n.opera
						? "opera"
						: n.air
						? "air"
						: n.webkit
						? "webkit"
						: "unknown")),
				n.quirks && (n.cssClass += " browser_quirks"),
				n.ie &&
					((n.cssClass +=
						" browser_ie" + (n.version < 7 ? "6" : n.version >= 8 ? "8" : "7")),
					n.quirks && (n.cssClass += " browser_iequirks"),
					n.ie7Compat && (n.cssClass += " browser_ie7Compat")),
				n.gecko && 10900 > o && (n.cssClass += " browser_gecko18"),
				n
			);
		})()),
			(CKFinder.env = o.env);
	}
	var l = o.env,
		s = l.ie;
	"unloaded" == o.status &&
		!(function () {
			o.event.du(o),
				(o.dO = function () {
					if ("basic_ready" != o.status) return void (o.dO.qr = !0);
					delete o.dO;
					var e = document.createElement("script");
					(e.type = "text/javascript"),
						(e.src = o.basePath + "ckfinder.js"),
						document.getElementsByTagName("head")[0].appendChild(e);
				}),
				(o.mS = 0),
				(o.uQ = "ckfinder"),
				(o.uM = !0);
			var e = function (e, t, n, i) {
				if (l.isCompatible) {
					o.dO && o.dO();
					var a = n(e, t, i);
					return o.add(a), a;
				}
				return null;
			};
			(o.replace = function (t, n, i) {
				return e(t, n, o.application.replace, i);
			}),
				(o.appendTo = function (t, n, i) {
					return e(t, n, o.application.appendTo, i);
				}),
				(o.add = function (e) {
					var t = this._.io || (this._.io = []);
					t.push(e);
				}),
				(o.uL = function () {
					for (
						var e = document.getElementsByTagName("textarea"), t = 0;
						t < e.length;
						t++
					) {
						{
							var n = null,
								o = e[t];
							o.name;
						}
						if (o.name || o.id) {
							if ("string" == typeof arguments[0]) {
								var i = new RegExp("(?:^| )" + arguments[0] + "(?:$| )");
								if (!i.test(o.className)) continue;
							} else if (
								"function" == typeof arguments[0] &&
								((n = {}), arguments[0](o, n) === !1)
							)
								continue;
							this.replace(o, n);
						}
					}
				}),
				(function () {
					var e = function () {
						var e = o.dO,
							t = o.mS;
						(o.status = "basic_ready"),
							e && e.qr
								? e()
								: t &&
								  setTimeout(function () {
										o.dO && o.dO();
								  }, 1e3 * t);
					};
					window.addEventListener
						? window.addEventListener("load", e, !1)
						: window.attachEvent && window.attachEvent("onload", e);
				})(),
				(o.status = "basic_loaded");
		})(),
		(o.dom = {}),
		(CKFinder.dom = o.dom);
	var d = o.dom;
	(o.ajax = (function () {
		var e = function () {
				if (!s || "file:" != location.protocol)
					try {
						return new XMLHttpRequest();
					} catch (e) {}
				try {
					return new ActiveXObject("Msxml2.XMLHTTP");
				} catch (t) {}
				try {
					return new ActiveXObject("Microsoft.XMLHTTP");
				} catch (n) {}
				return null;
			},
			t = function (e) {
				return (
					4 == e.readyState &&
					((e.status >= 200 && e.status < 300) ||
						304 == e.status ||
						0 === e.status ||
						1223 == e.status)
				);
			},
			n = function (e) {
				return t(e) ? e.responseText : null;
			},
			i = function (e) {
				if (t(e)) {
					var n = e.responseXML,
						i = new o.xml(
							n &&
							n.firstChild &&
							n.documentElement &&
							"parsererror" != n.documentElement.nodeName
								? n
								: e.responseText.replace(/^[^<]+/, "").replace(/[^>]+$/, "")
						);
					if (
						i &&
						i.mq &&
						i.mq.documentElement &&
						"parsererror" != i.mq.documentElement.nodeName &&
						"html" != i.mq.documentElement.nodeName &&
						"br" != i.mq.documentElement.nodeName
					)
						return i;
				}
				var a = o.nG || o.jt,
					r = e.responseText,
					l = a.lang.ErrorMsg[r ? "XmlError" : "XmlEmpty"] + "<br>";
				return (
					i &&
						i.mq &&
						(i.mq.parseError && i.mq.parseError.reason
							? (l += i.mq.parseError.reason)
							: i.mq.documentElement &&
							  "parsererror" == i.mq.documentElement.nodeName &&
							  (l += i.mq.documentElement.textContent)),
					r
						? ((/text\/plain/.test(e.getResponseHeader("Content-Type")) ||
								/<Connector\s*/.test(r)) &&
								((r = o.tools.htmlEncode(r)),
								(r = r.replace(/\n/g, "<br>")),
								(r =
									'<div style="width:600px; overflow:scroll"><font>' +
									r +
									"</font></div>")),
						  a.msgDialog(
								a.lang.SysErrorDlgTitle,
								l +
									"<br>" +
									a.lang.ErrorMsg.XmlRawResponse.replace("%s", "<br><br>" + r)
						  ))
						: a.msgDialog(a.lang.SysErrorDlgTitle, l),
					{}
				);
			},
			a = function (t, n, i, a) {
				var r = !!n;
				o.log("[AJAX] " + (a ? "POST" : "GET") + " " + t);
				var l = e();
				return l
					? (a ? l.open("POST", t, r) : l.open("GET", t, r),
					  r &&
							(l.onreadystatechange = function () {
								4 == l.readyState && (n(i(l)), (l = null));
							}),
					  a
							? (l.setRequestHeader(
									"Content-type",
									"application/x-www-form-urlencoded; charset=utf-8"
							  ),
							  l.send(a))
							: l.send(null),
					  r ? "" : i(l))
					: null;
			};
		return {
			load: function (e, t, o) {
				return a(e, t, n, o);
			},
			loadXml: function (e, t, n) {
				return a(e, t, i, n);
			},
		};
	})()),
		(CKFinder.ajax = o.ajax),
		(function () {
			var e = [];
			(o.tools = {
				arrayCompare: function (e, t) {
					if (!e && !t) return !0;
					if (!e || !t || e.length != t.length) return !1;
					for (var n = 0; n < e.length; n++) if (e[n] != t[n]) return !1;
					return !0;
				},
				clone: function (e) {
					var t;
					if (e && e instanceof Array) {
						t = [];
						for (var n = 0; n < e.length; n++) t[n] = this.clone(e[n]);
						return t;
					}
					if (
						null === e ||
						"object" != typeof e ||
						e instanceof String ||
						e instanceof Number ||
						e instanceof Boolean ||
						e instanceof Date
					)
						return e;
					t = new e.constructor();
					var o;
					for (o in e) {
						var i = e[o];
						t[o] = this.clone(i);
					}
					return t;
				},
				capitalize: function (e) {
					return e.charAt(0).toUpperCase() + e.substring(1).toLowerCase();
				},
				extend: function (e) {
					var t,
						n,
						o = arguments.length;
					"boolean" == typeof (t = arguments[o - 1])
						? o--
						: "boolean" == typeof (t = arguments[o - 2]) &&
						  ((n = arguments[o - 1]), (o -= 2));
					for (var i = 1; o > i; i++) {
						var a,
							r = arguments[i];
						for (a in r)
							(t === !0 || void 0 == e[a]) && (!n || a in n) && (e[a] = r[a]);
					}
					return e;
				},
				prototypedCopy: function (e) {
					var t = function () {};
					return (t.prototype = e), new t();
				},
				isArray: function (e) {
					return !!e && e instanceof Array;
				},
				cssStyleToDomStyle: (function () {
					var e = document.createElement("div").style,
						t =
							"undefined" != typeof e.cssFloat
								? "cssFloat"
								: "undefined" != typeof e.styleFloat
								? "styleFloat"
								: "float";
					return function (e) {
						return "float" == e
							? t
							: e.replace(/-./g, function (e) {
									return e.substr(1).toUpperCase();
							  });
					};
				})(),
				htmlEncode: function (e) {
					var t = function (e) {
							var t = new d.element("span");
							return t.setText(e), t.getHtml();
						},
						n =
							"<br>" == t("\n").toLowerCase()
								? function (e) {
										return t(e).replace(/<br>/gi, "\n");
								  }
								: t,
						o =
							">" == t(">")
								? function (e) {
										return n(e).replace(/>/g, "&gt;");
								  }
								: n,
						i =
							"&nbsp; " == t("  ")
								? function (e) {
										return o(e).replace(/&nbsp;/g, " ");
								  }
								: o;
					return (this.htmlEncode = i), this.htmlEncode(e);
				},
				getNextNumber: (function () {
					var e = 0;
					return function () {
						return ++e;
					};
				})(),
				override: function (e, t) {
					return t(e);
				},
				setTimeout: function (e, t, n, o, i) {
					return (
						i || (i = window),
						n || (n = i),
						i.setTimeout(function () {
							o ? e.apply(n, [].concat(o)) : e.apply(n);
						}, t || 0)
					);
				},
				trim: (function () {
					var e = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
					return function (t) {
						return t ? t.replace(e, "") : null;
					};
				})(),
				ltrim: (function () {
					var e = /^[ \t\n\r]+/g;
					return function (t) {
						return t ? t.replace(e, "") : null;
					};
				})(),
				rtrim: (function () {
					var e = /[ \t\n\r]+$/g;
					return function (t) {
						return t ? t.replace(e, "") : null;
					};
				})(),
				indexOf: Array.prototype.indexOf
					? function (e, t) {
							return e.indexOf(t);
					  }
					: function (e, t) {
							for (var n = 0, o = e.length; o > n; n++)
								if (e[n] === t) return n;
							return -1;
					  },
				bind: function (e, t) {
					return function () {
						return e.apply(t, arguments);
					};
				},
				createClass: function (e) {
					var t = e.$,
						n = e.base,
						i = e.vd || e._,
						a = e.ej,
						r = e.statics;
					if (i) {
						var l = t;
						t = function () {
							var e,
								t = this,
								n = t._ || (t._ = {});
							for (e in i) {
								var a = i[e];
								n[e] = "function" == typeof a ? o.tools.bind(a, t) : a;
							}
							l.apply(t, arguments);
						};
					}
					return (
						n &&
							((t.prototype = this.prototypedCopy(n.prototype)),
							(t.prototype.constructor = t),
							(t.prototype.base = function () {
								(this.base = n.prototype.base),
									n.apply(this, arguments),
									(this.base = arguments.callee);
							})),
						a && this.extend(t.prototype, a, !0),
						r && this.extend(t, r, !0),
						t
					);
				},
				addFunction: function (t, n) {
					return (
						e.push(function () {
							t.apply(n || this, arguments);
						}) - 1
					);
				},
				removeFunction: function (t) {
					e[t] = null;
				},
				callFunction: function (t) {
					var n = e[t];
					return n.apply(window, Array.prototype.slice.call(arguments, 1));
				},
				cssLength: (function () {
					var e = /^\d+(?:\.\d+)?$/;
					return function (t) {
						return t + (e.test(t) ? "px" : "");
					};
				})(),
				repeat: function (e, t) {
					return new Array(t + 1).join(e);
				},
				deepCopy: function (e) {
					var t = {};
					if ("object" == typeof e) {
						"undefined" != typeof e.length && (t = []);
						var n;
						for (n in e)
							t[n] =
								null === e[n]
									? null
									: "object" == typeof e[n]
									? o.tools.deepCopy(e[n])
									: e[n];
					}
					return t;
				},
				getUrlParam: function (e, t) {
					var n = new RegExp("(?:[?&]|&amp;)" + e + "=([^&]+)", "i"),
						o = (t || window).location.search.match(n);
					return o && o.length > 1 ? o[1] : null;
				},
				htmlEncode: function (e) {
					return e
						? ((e = "string" != typeof e ? e.toString() : e),
						  (e = e.replace(/&/g, "&amp;")),
						  (e = e.replace(/</g, "&lt;")),
						  (e = e.replace(/>/g, "&gt;")))
						: "";
				},
				setCookie: function (e, t, n) {
					document.cookie =
						e +
						"=" +
						t +
						(n ? "" : "; expires=Thu, 6 Oct 2038 01:00:00 UTC; path=/");
				},
				getCookie: function (e) {
					var t = document.cookie.match(
						new RegExp("(^|\\s|;)" + e + "=([^;]*)")
					);
					return t && t.length > 0 ? t[2] : "";
				},
				mH: function (e) {
					s
						? ((e.$.onfocusin = function () {
								e.addClass("focus_inside");
						  }),
						  (e.$.onfocusout = function () {
								e.removeClass("focus_inside");
						  }))
						: (e.$.addEventListener(
								"focus",
								function () {
									e.addClass("focus_inside");
								},
								!0
						  ),
						  e.$.addEventListener(
								"blur",
								function () {
									e.removeClass("focus_inside");
								},
								!0
						  ));
				},
				formatSize: function (e, t, n) {
					return 0 == e
						? "0"
						: 1 > e
						? t.Kb.replace("%1", 1)
						: 1024 > e
						? (n || (e = e.toFixed(2)), t.Kb.replace("%1", e))
						: 1048576 > e
						? t.Mb.replace("%1", (e / 1024).toFixed(2))
						: t.Gb.replace("%1", (e / 1048576).toFixed(2));
				},
				formatSpeed: function (e, t) {
					return t.SizePerSecond.replace("%1", this.formatSize(e, t));
				},
			}),
				(CKFinder._.callFunction = o.tools.callFunction),
				(CKFinder.tools = o.tools);
		})();
	var c = o.tools;
	(d.event = function (e) {
		this.$ = e;
	}),
		(d.event.prototype = {
			oV: function () {
				return this.$.keyCode || this.$.which || 0;
			},
			db: function () {
				var e = this,
					t = e.oV();
				return (
					(e.$.ctrlKey || e.$.metaKey) && (t += o.bP),
					e.$.shiftKey && (t += o.dy),
					e.$.altKey && (t += o.eJ),
					t
				);
			},
			preventDefault: function (e) {
				var t = this.$;
				t.preventDefault ? t.preventDefault() : (t.returnValue = !1),
					e && this.stopPropagation();
			},
			stopPropagation: function () {
				var e = this.$;
				e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = !0);
			},
			bK: function () {
				var e = this.$.target || this.$.srcElement;
				return e ? new d.bi(e) : null;
			},
			getButton: function () {
				if (this.$.which) return this.$.which;
				switch (this.$.button) {
					case 1:
						return 1;
					case 4:
						return 2;
					case 2:
						return 3;
				}
			},
			ov: function () {
				return 1 == this.getButton();
			},
		}),
		(o.bP = 1e3),
		(o.dy = 2e3),
		(o.eJ = 4e3),
		(d.dE = function (e) {
			e && (this.$ = e);
		}),
		(d.dE.prototype = (function () {
			var e = function (e, t) {
				return function (n) {
					"undefined" != typeof o && e.oW(t, new d.event(n));
				};
			};
			return {
				kk: function () {
					var e;
					return (e = this.dw("_")) || this.fL("_", (e = {})), e;
				},
				on: function (t) {
					var n = this,
						i = n.dw("_cke_nativeListeners");
					if ((i || ((i = {}), n.fL("_cke_nativeListeners", i)), !i[t])) {
						var a = (i[t] = e(n, t));
						n.$.addEventListener
							? n.$.addEventListener(t, a, !!o.event.jP)
							: n.$.attachEvent && n.$.attachEvent("on" + t, a);
					}
					return o.event.prototype.on.apply(n, arguments);
				},
				removeListener: function (e) {
					var t = this;
					if (
						(o.event.prototype.removeListener.apply(t, arguments), !t.rC(e))
					) {
						var n = t.dw("_cke_nativeListeners"),
							i = n && n[e];
						i &&
							(t.$.removeEventListener
								? t.$.removeEventListener(e, i, !1)
								: t.$.detachEvent && t.$.detachEvent("on" + e, i),
							delete n[e]);
					}
				},
			};
		})()),
		(function (e) {
			var t = {};
			(e.equals = function (e) {
				return e && e.$ === this.$;
			}),
				(e.fL = function (e, n) {
					var o = this.iY(),
						i = t[o] || (t[o] = {});
					return (i[e] = n), this;
				}),
				(e.dw = function (e) {
					var n = this.$._ckf_expando,
						o = n && t[n];
					return o && o[e];
				}),
				(e.jF = function (e) {
					var n = this.$._ckf_expando,
						o = n && t[n],
						i = o && o[e];
					return "undefined" != typeof i && delete o[e], i || null;
				}),
				(e.iY = function () {
					return (
						this.$._ckf_expando || (this.$._ckf_expando = c.getNextNumber())
					);
				}),
				o.event.du(e);
		})(d.dE.prototype),
		(d.window = function (e) {
			d.dE.call(this, e);
		}),
		(d.window.prototype = new d.dE()),
		c.extend(d.window.prototype, {
			focus: function () {
				l.webkit && this.$.parent && this.$.parent.focus(), this.$.focus();
			},
			eR: function () {
				var e = this.$.document,
					t = "CSS1Compat" == e.compatMode;
				return {
					width: (t ? e.documentElement.clientWidth : e.body.clientWidth) || 0,
					height:
						(t ? e.documentElement.clientHeight : e.body.clientHeight) || 0,
				};
			},
			hV: function () {
				var e = this.$;
				if ("pageXOffset" in e)
					return { x: e.pageXOffset || 0, y: e.pageYOffset || 0 };
				var t = e.document;
				return {
					x: t.documentElement.scrollLeft || t.body.scrollLeft || 0,
					y: t.documentElement.scrollTop || t.body.scrollTop || 0,
				};
			},
		}),
		(d.document = function (e) {
			d.dE.call(this, e);
		});
	var u = d.document;
	(u.prototype = new d.dE()),
		c.extend(u.prototype, {
			appendStyleSheet: function (e) {
				var t = this;
				if (t.$.createStyleSheet) t.$.createStyleSheet(e);
				else {
					var n = new d.element("link", t);
					n.setAttributes({ rel: "stylesheet", type: "text/css", href: e }),
						t.getHead().append(n);
				}
			},
			createElement: function (e, t) {
				var n = new d.element(e, this);
				return (
					t &&
						(t.attributes && n.setAttributes(t.attributes),
						t.gS && n.setStyles(t.gS)),
					n
				);
			},
			jT: function (e) {
				return new d.text(e, this);
			},
			focus: function () {
				this.getWindow().focus();
			},
			getById: function (e) {
				var t = this.$.getElementById(e);
				return t ? new d.element(t) : null;
			},
			vu: function (e, t) {
				for (var n = this.$.documentElement, o = 0; n && o < e.length; o++) {
					var i = e[o];
					if (t)
						for (var a = -1, r = 0; r < n.childNodes.length; r++) {
							var l = n.childNodes[r];
							if (
								(t !== !0 ||
									3 != l.nodeType ||
									!l.previousSibling ||
									3 != l.previousSibling.nodeType) &&
								(a++, a == i)
							) {
								n = l;
								break;
							}
						}
					else n = n.childNodes[i];
				}
				return n ? new d.bi(n) : null;
			},
			eG: function (e, t) {
				return (
					!s && t && (e = t + ":" + e), new d.iT(this.$.getElementsByTagName(e))
				);
			},
			getHead: function () {
				var e = this.$.getElementsByTagName("head")[0];
				return (
					(e = new d.element(e)),
					(this.getHead = function () {
						return e;
					})()
				);
			},
			bH: function () {
				var e = new d.element(this.$.body);
				return (this.bH = function () {
					return e;
				})();
			},
			gT: function () {
				var e = new d.element(this.$.documentElement);
				return (this.gT = function () {
					return e;
				})();
			},
			getWindow: function () {
				var e = new d.window(this.$.parentWindow || this.$.defaultView);
				return (this.getWindow = function () {
					return e;
				})();
			},
		}),
		(d.bi = function (e) {
			if (e) {
				switch (e.nodeType) {
					case o.cv:
						return new d.element(e);
					case o.fl:
						return new d.text(e);
				}
				d.dE.call(this, e);
			}
			return this;
		}),
		(d.bi.prototype = new d.dE()),
		(o.cv = 1),
		(o.fl = 3),
		(o.va = 8),
		(o.om = 11),
		(o.oh = 0),
		(o.op = 1),
		(o.gW = 2),
		(o.gX = 4),
		(o.mo = 8),
		(o.lF = 16),
		c.extend(d.bi.prototype, {
			appendTo: function (e, t) {
				return e.append(this, t), e;
			},
			clone: function (e, t) {
				var n = this.$.cloneNode(e);
				if (!t) {
					var i = function (e) {
						if (e.nodeType == o.cv) {
							e.removeAttribute("id", !1),
								e.removeAttribute("_ckf_expando", !1);
							for (var t = e.childNodes, n = 0; n < t.length; n++) i(t[n]);
						}
					};
					i(n);
				}
				return new d.bi(n);
			},
			gE: function () {
				return !!this.$.previousSibling;
			},
			ge: function () {
				return !!this.$.nextSibling;
			},
			kB: function (e) {
				return e.$.parentNode.insertBefore(this.$, e.$.nextSibling), e;
			},
			insertBefore: function (e) {
				return e.$.parentNode.insertBefore(this.$, e.$), e;
			},
			vP: function (e) {
				return this.$.parentNode.insertBefore(e.$, this.$), e;
			},
			lU: function (e) {
				for (
					var t = [], n = this.getDocument().$.documentElement, o = this.$;
					o && o != n;

				) {
					for (
						var i = o.parentNode, a = -1, r = 0;
						r < i.childNodes.length;
						r++
					) {
						var l = i.childNodes[r];
						if (
							!(
								(e &&
									3 == l.nodeType &&
									l.previousSibling &&
									3 == l.previousSibling.nodeType) ||
								(a++, l != o)
							)
						)
							break;
					}
					t.unshift(a), (o = o.parentNode);
				}
				return t;
			},
			getDocument: function () {
				var e = new u(this.$.ownerDocument || this.$.parentNode.ownerDocument);
				return (this.getDocument = function () {
					return e;
				})();
			},
			vA: function () {
				for (
					var e = this.$, t = e.parentNode && e.parentNode.firstChild, n = -1;
					t;

				) {
					if ((n++, t == e)) return n;
					t = t.nextSibling;
				}
				return -1;
			},
			hL: function (e, t, n) {
				if (n && !n.call) {
					var i = n;
					n = function (e) {
						return !e.equals(i);
					};
				}
				var a,
					r = !e && this.getFirst && this.getFirst();
				if (!r) {
					if (this.type == o.cv && n && n(this, !0) === !1) return null;
					r = this.dG();
				}
				for (; !r && (a = (a || this).getParent()); ) {
					if (n && n(a, !0) === !1) return null;
					r = a.dG();
				}
				return r
					? n && n(r) === !1
						? null
						: t && t != r.type
						? r.hL(!1, t, n)
						: r
					: null;
			},
			hZ: function (e, t, n) {
				if (n && !n.call) {
					var i = n;
					n = function (e) {
						return !e.equals(i);
					};
				}
				var a,
					r = !e && this.dB && this.dB();
				if (!r) {
					if (this.type == o.cv && n && n(this, !0) === !1) return null;
					r = this.cf();
				}
				for (; !r && (a = (a || this).getParent()); ) {
					if (n && n(a, !0) === !1) return null;
					r = a.cf();
				}
				return r
					? n && n(r) === !1
						? null
						: t && r.type != t
						? r.hZ(!1, t, n)
						: r
					: null;
			},
			cf: function (e) {
				var t,
					n = this.$;
				do (n = n.previousSibling), (t = n && new d.bi(n));
				while (t && e && !e(t));
				return t;
			},
			vs: function () {
				return this.cf(function (e) {
					return 1 == e.$.nodeType;
				});
			},
			dG: function (e) {
				var t,
					n = this.$;
				do (n = n.nextSibling), (t = n && new d.bi(n));
				while (t && e && !e(t));
				return t;
			},
			vk: function () {
				return this.dG(function (e) {
					return 1 == e.$.nodeType;
				});
			},
			getParent: function () {
				var e = this.$.parentNode;
				return e && 1 == e.nodeType ? new d.bi(e) : null;
			},
			vn: function (e) {
				var t = this,
					n = [];
				do n[e ? "push" : "unshift"](t);
				while ((t = t.getParent()));
				return n;
			},
			vv: function (e) {
				var t = this;
				if (e.equals(t)) return t;
				if (e.contains && e.contains(t)) return e;
				var n = t.contains ? t : t.getParent();
				do if (n.contains(e)) return n;
				while ((n = n.getParent()));
				return null;
			},
			gz: function (e) {
				var t = this.$,
					n = e.$;
				if (t.compareDocumentPosition) return t.compareDocumentPosition(n);
				if (t == n) return o.oh;
				if (this.type == o.cv && e.type == o.cv) {
					if (t.contains) {
						if (t.contains(n)) return o.lF + o.gX;
						if (n.contains(t)) return o.mo + o.gW;
					}
					if ("sourceIndex" in t)
						return t.sourceIndex < 0 || n.sourceIndex < 0
							? o.op
							: t.sourceIndex < n.sourceIndex
							? o.gX
							: o.gW;
				}
				for (
					var i = this.lU(),
						a = e.lU(),
						r = Math.min(i.length, a.length),
						l = 0;
					r - 1 >= l;
					l++
				)
					if (i[l] != a[l]) {
						if (r > l) return i[l] < a[l] ? o.gX : o.gW;
						break;
					}
				return i.length < a.length ? o.lF + o.gX : o.mo + o.gW;
			},
			vw: function (e, t) {
				var n = this.$;
				for (t || (n = n.parentNode); n; ) {
					if (n.nodeName && n.nodeName.toLowerCase() == e) return new d.bi(n);
					n = n.parentNode;
				}
				return null;
			},
			vX: function (e, t) {
				var n = this.$;
				for (t || (n = n.parentNode); n; ) {
					if (n.nodeName && n.nodeName.toLowerCase() == e) return !0;
					n = n.parentNode;
				}
				return !1;
			},
			move: function (e, t) {
				e.append(this.remove(), t);
			},
			remove: function (e) {
				var t = this.$,
					n = t.parentNode;
				if (n) {
					if (e)
						for (var o; (o = t.firstChild); )
							n.insertBefore(t.removeChild(o), t);
					n.removeChild(t);
				}
				return this;
			},
			replace: function (e) {
				this.insertBefore(e), e.remove();
			},
			trim: function () {
				this.ltrim(), this.rtrim();
			},
			ltrim: function () {
				for (var e, t = this; t.getFirst && (e = t.getFirst()); ) {
					if (e.type == o.fl) {
						var n = c.ltrim(e.getText()),
							i = e.hJ();
						if (!n) {
							e.remove();
							continue;
						}
						n.length < i &&
							(e.split(i - n.length), t.$.removeChild(t.$.firstChild));
					}
					break;
				}
			},
			rtrim: function () {
				for (var e, t = this; t.dB && (e = t.dB()); ) {
					if (e.type == o.fl) {
						var n = c.rtrim(e.getText()),
							i = e.hJ();
						if (!n) {
							e.remove();
							continue;
						}
						n.length < i &&
							(e.split(n.length),
							t.$.lastChild.parentNode.removeChild(t.$.lastChild));
					}
					break;
				}
				s ||
					l.opera ||
					((e = t.$.lastChild),
					e &&
						1 == e.type &&
						"br" == e.nodeName.toLowerCase() &&
						e.parentNode.removeChild(e));
			},
		}),
		(d.iT = function (e) {
			this.$ = e;
		}),
		(d.iT.prototype = {
			count: function () {
				return this.$.length;
			},
			getItem: function (e) {
				var t = this.$[e];
				return t ? new d.bi(t) : null;
			},
		}),
		(d.element = function (e, t) {
			"string" == typeof e && (e = (t ? t.$ : document).createElement(e)),
				d.dE.call(this, e);
		});
	var f = d.element;
	(f.eB = function (e) {
		return e && (e.$ ? e : new f(e));
	}),
		(f.prototype = new d.bi()),
		(f.kE = function (e, t) {
			var n = new f("div", t);
			return n.setHtml(e), n.getFirst().remove();
		}),
		(f.rS = function (e, t, n, o) {
			var i =
					t.dw("list_marker_id") ||
					t.fL("list_marker_id", c.getNextNumber()).dw("list_marker_id"),
				a =
					t.dw("list_marker_names") ||
					t.fL("list_marker_names", {}).dw("list_marker_names");
			return (e[i] = t), (a[n] = 1), t.fL(n, o);
		}),
		(f.sM = function (e) {
			var t;
			for (t in e) f.qZ(e, e[t], !0);
		}),
		(f.qZ = function (e, t, n) {
			var o,
				i = t.dw("list_marker_names"),
				a = t.dw("list_marker_id");
			for (o in i) t.jF(o);
			t.jF("list_marker_names"), n && (t.jF("list_marker_id"), delete e[a]);
		}),
		c.extend(f.prototype, {
			type: o.cv,
			addClass: function (e) {
				var t = this.$.className;
				if (t) {
					var n = new RegExp("(?:^|\\s)" + e + "(?:\\s|$)", "");
					n.test(t) || (t += " " + e);
				}
				this.$.className = t || e;
			},
			removeClass: function (e) {
				var t = this.getAttribute("class");
				if (t) {
					var n = new RegExp("(?:^|\\s+)" + e + "(?=\\s|$)", "i");
					n.test(t) &&
						((t = t.replace(n, "").replace(/^\s+/, "")),
						t ? this.setAttribute("class", t) : this.removeAttribute("class"));
				}
			},
			hasClass: function (e) {
				var t = new RegExp("(?:^|\\s+)" + e + "(?=\\s|$)", "");
				return t.test(this.getAttribute("class"));
			},
			append: function (e, t) {
				var n = this;
				return (
					"string" == typeof e && (e = n.getDocument().createElement(e)),
					t ? n.$.insertBefore(e.$, n.$.firstChild) : n.$.appendChild(e.$),
					o.log("[DOM] DOM flush into " + n.getName()),
					e
				);
			},
			appendHtml: function (e) {
				var t = this;
				if (t.$.childNodes.length) {
					var n = new f("div", t.getDocument());
					n.setHtml(e), n.jg(t);
				} else t.setHtml(e);
			},
			appendText: function (e) {
				void 0 != this.$.text ? (this.$.text += e) : this.append(new d.text(e));
			},
			pd: function () {
				for (
					var e = this, t = e.dB();
					t && t.type == o.fl && !c.rtrim(t.getText());

				)
					t = t.cf();
				(t && t.is && t.is("br")) ||
					e.append(
						l.opera
							? e.getDocument().jT("")
							: e.getDocument().createElement("br")
					);
			},
			tV: function (e) {
				var t = this,
					n = new d.mk(t.getDocument());
				n.setStartAfter(t), n.setEndAfter(e);
				var o = n.extractContents();
				n.insertNode(t.remove()), o.kA(t);
			},
			contains:
				s || l.webkit
					? function (e) {
							var t = this.$;
							return e.type != o.cv
								? t.contains(e.getParent().$)
								: t != e.$ && t.contains(e.$);
					  }
					: function (e) {
							return !!(16 & this.$.compareDocumentPosition(e.$));
					  },
			focus: function () {
				try {
					this.$.focus();
				} catch (e) {}
			},
			getHtml: function () {
				return this.$.innerHTML;
			},
			fH: function () {
				var e = this;
				if (e.$.outerHTML) return e.$.outerHTML.replace(/<\?[^>]*>/, "");
				var t = e.$.ownerDocument.createElement("div");
				return t.appendChild(e.$.cloneNode(!0)), t.innerHTML;
			},
			setHtml: function (e) {
				return (
					o.log("[DOM] DOM flush into " + this.getName()),
					(this.$.innerHTML = e)
				);
			},
			setText: function (e) {
				return (
					(f.prototype.setText =
						void 0 != this.$.innerText
							? function (e) {
									return o.log("[DOM] Text flush"), (this.$.innerText = e);
							  }
							: function (e) {
									return o.log("[DOM] Text flush"), (this.$.textContent = e);
							  }),
					this.setText(e)
				);
			},
			getAttribute: (function () {
				var e = function (e) {
					return this.$.getAttribute(e, 2);
				};
				return s && (l.ie7Compat || l.ie6Compat)
					? function (t) {
							var n = this;
							switch (t) {
								case "class":
									t = "className";
									break;
								case "tabindex":
									var o = e.call(n, t);
									return 0 !== o && 0 === n.$.tabIndex && (o = null), o;
								case "checked":
									return n.$.checked;
								case "style":
									return n.$.style.cssText;
							}
							return e.call(n, t);
					  }
					: e;
			})(),
			getChildren: function () {
				return new d.iT(this.$.childNodes);
			},
			getComputedStyle: s
				? function (e) {
						return this.$.currentStyle[c.cssStyleToDomStyle(e)];
				  }
				: function (e) {
						return this.getWindow()
							.$.getComputedStyle(this.$, "")
							.getPropertyValue(e);
				  },
			pf: function () {
				var e = o.ga[this.getName()];
				return (
					(this.pf = function () {
						return e;
					}),
					e
				);
			},
			eG: u.prototype.eG,
			vp: s
				? function () {
						var e = this.$.tabIndex;
						return (
							0 !== e ||
								o.ga.ug[this.getName()] ||
								0 === parseInt(this.getAttribute("tabindex"), 10) ||
								(e = -1),
							e
						);
				  }
				: l.webkit
				? function () {
						var e = this.$.tabIndex;
						return (
							void 0 == e &&
								((e = parseInt(this.getAttribute("tabindex"), 10)),
								isNaN(e) && (e = -1)),
							e
						);
				  }
				: function () {
						return this.$.tabIndex;
				  },
			getText: function () {
				return this.$.textContent || this.$.innerText || "";
			},
			getWindow: function () {
				return this.getDocument().getWindow();
			},
			dS: function () {
				return this.$.id || null;
			},
			data: function (e, t) {
				return (
					(e = "data-" + e),
					void 0 === t
						? this.getAttribute(e)
						: (t === !1 ? this.removeAttribute(e) : this.setAttribute(e, t),
						  null)
				);
			},
			vm: function () {
				return this.$.name || null;
			},
			getName: function () {
				var e = this.$.nodeName.toLowerCase();
				if (s && !(document.documentMode > 8)) {
					var t = this.$.scopeName;
					"HTML" != t && (e = t.toLowerCase() + ":" + e);
				}
				return (this.getName = function () {
					return e;
				})();
			},
			getValue: function () {
				return this.$.value;
			},
			getFirst: function () {
				var e = this.$.firstChild;
				return e ? new d.bi(e) : null;
			},
			dB: function (e) {
				var t = this.$.lastChild,
					n = t && new d.bi(t);
				return n && e && !e(n) && (n = n.cf(e)), n;
			},
			rd: function (e) {
				return this.$.style[c.cssStyleToDomStyle(e)];
			},
			is: function () {
				for (var e = this.getName(), t = 0; t < arguments.length; t++)
					if (arguments[t] == e) return !0;
				return !1;
			},
			vL: function () {
				var e = this.getName(),
					t = !o.ga.uj[e] && (o.ga[e] || o.ga.span);
				return t && t["#"];
			},
			isIdentical: function (e) {
				if (this.getName() != e.getName()) return !1;
				var t = this.$.attributes,
					n = e.$.attributes,
					o = t.length,
					i = n.length;
				if (!s && o != i) return !1;
				for (var a = 0; o > a; a++) {
					var r = t[a];
					if (
						(!s || (r.specified && "_ckf_expando" != r.nodeName)) &&
						r.nodeValue != e.getAttribute(r.nodeName)
					)
						return !1;
				}
				if (s)
					for (a = 0; i > a; a++)
						if (
							((r = n[a]),
							(!s || (r.specified && "_ckf_expando" != r.nodeName)) &&
								r.nodeValue != t.getAttribute(r.nodeName))
						)
							return !1;
				return !0;
			},
			isVisible: function () {
				return this.$.offsetWidth && "hidden" != this.$.style.visibility;
			},
			hasAttributes:
				s && (l.ie7Compat || l.ie6Compat)
					? function () {
							for (var e = this.$.attributes, t = 0; t < e.length; t++) {
								var n = e[t];
								switch (n.nodeName) {
									case "class":
										if (this.getAttribute("class")) return !0;
									case "_ckf_expando":
										continue;
									default:
										if (n.specified) return !0;
								}
							}
							return !1;
					  }
					: function () {
							var e = this.$.attributes;
							return (
								e.length > 1 ||
								(1 == e.length && "_ckf_expando" != e[0].nodeName)
							);
					  },
			hasAttribute: function (e) {
				var t = this.$.attributes.getNamedItem(e);
				return !(!t || !t.specified);
			},
			hide: function () {
				this.setStyle("display", "none");
			},
			jg: function (e, t) {
				var n = this.$;
				if (((e = e.$), n != e)) {
					var o;
					if (t)
						for (; (o = n.lastChild); )
							e.insertBefore(n.removeChild(o), e.firstChild);
					else for (; (o = n.firstChild); ) e.appendChild(n.removeChild(o));
				}
			},
			show: function () {
				this.setStyles({ display: "", visibility: "" });
			},
			setAttribute: (function () {
				var e = function (e, t) {
					return this.$.setAttribute(e, t), this;
				};
				return s && (l.ie7Compat || l.ie6Compat)
					? function (t, n) {
							var o = this;
							return (
								"class" == t
									? (o.$.className = n)
									: "style" == t
									? (o.$.style.cssText = n)
									: "tabindex" == t
									? (o.$.tabIndex = n)
									: "checked" == t
									? (o.$.checked = n)
									: e.apply(o, arguments),
								o
							);
					  }
					: e;
			})(),
			setAttributes: function (e) {
				var t;
				for (t in e) this.setAttribute(t, e[t]);
				return this;
			},
			setValue: function (e) {
				return (this.$.value = e), this;
			},
			removeAttribute: (function () {
				var e = function (e) {
					this.$.removeAttribute(e);
				};
				return s && (l.ie7Compat || l.ie6Compat)
					? function (t) {
							"class" == t
								? (t = "className")
								: "tabindex" == t && (t = "tabIndex"),
								e.call(this, t);
					  }
					: e;
			})(),
			uW: function (e) {
				for (var t = 0; t < e.length; t++) this.removeAttribute(e[t]);
			},
			removeStyle: function (e) {
				var t = this;
				t.$.style.removeAttribute
					? t.$.style.removeAttribute(c.cssStyleToDomStyle(e))
					: t.setStyle(e, ""),
					t.$.style.cssText || t.removeAttribute("style");
			},
			setStyle: function (e, t) {
				return (this.$.style[c.cssStyleToDomStyle(e)] = t), this;
			},
			setStyles: function (e) {
				var t;
				for (t in e) this.setStyle(t, e[t]);
				return this;
			},
			setOpacity: function (e) {
				s && l.version < 9
					? ((e = Math.round(100 * e)),
					  this.setStyle(
							"filter",
							e >= 100
								? ""
								: "progid:DXImageTransform.Microsoft.Alpha(opacity=" + e + ")"
					  ))
					: this.setStyle("opacity", e);
			},
			unselectable: l.gecko
				? function () {
						this.$.style.MozUserSelect = "none";
				  }
				: l.webkit
				? function () {
						this.$.style.uE = "none";
				  }
				: function () {
						if (s || l.opera) {
							var e,
								t = this.$,
								n = 0;
							for (t.unselectable = "on"; (e = t.all[n++]); )
								switch (e.tagName.toLowerCase()) {
									case "iframe":
									case "textarea":
									case "input":
									case "select":
										break;
									default:
										e.unselectable = "on";
								}
						}
				  },
			vr: function () {
				for (var e = this; "html" != e.getName(); ) {
					if ("static" != e.getComputedStyle("position")) return e;
					e = e.getParent();
				}
				return null;
			},
			ir: function (e) {
				var t = this,
					n = 0,
					o = 0,
					i = t.getDocument().bH(),
					a = "BackCompat" == t.getDocument().$.compatMode,
					r = t.getDocument();
				if (document.documentElement.getBoundingClientRect) {
					var d = t.$.getBoundingClientRect(),
						c = r.$,
						u = c.documentElement,
						p = u.clientTop || i.$.clientTop || 0,
						h = u.clientLeft || i.$.clientLeft || 0,
						m = !0;
					if (s) {
						var g = r.gT().contains(t),
							v = r.bH().contains(t);
						m = (a && v) || (!a && g);
					}
					m &&
						((n = d.left + ((!a && u.scrollLeft) || i.$.scrollLeft)),
						(n -= h),
						(o = d.top + ((!a && u.scrollTop) || i.$.scrollTop)),
						(o -= p));
				} else
					for (
						var b, y = t, w = null;
						y && "body" != y.getName() && "html" != y.getName();

					) {
						(n += y.$.offsetLeft - y.$.scrollLeft),
							(o += y.$.offsetTop - y.$.scrollTop),
							y.equals(t) ||
								((n += y.$.clientLeft || 0), (o += y.$.clientTop || 0));
						for (var F = w; F && !F.equals(y); )
							(n -= F.$.scrollLeft), (o -= F.$.scrollTop), (F = F.getParent());
						(w = y), (y = (b = y.$.offsetParent) ? new f(b) : null);
					}
				if (e) {
					var _ = t.getWindow(),
						k = e.getWindow();
					if (!_.equals(k) && _.$.frameElement) {
						var C = new f(_.$.frameElement).ir(e);
						(n += C.x), (o += C.y);
					}
				}
				return (
					document.documentElement.getBoundingClientRect ||
						(l.gecko &&
							!a &&
							((n += t.$.clientLeft ? 1 : 0), (o += t.$.clientTop ? 1 : 0))),
					{ x: n, y: o }
				);
			},
			scrollIntoView: function (e) {
				var t = this,
					n = t.getWindow(),
					o = n.eR().height,
					i = -1 * o;
				e
					? (i += o)
					: ((i += t.$.offsetHeight || 0),
					  (i += parseInt(t.getComputedStyle("marginBottom") || 0, 10) || 0));
				var a = t.ir();
				(i += a.y), (i = 0 > i ? 0 : i);
				var r = n.hV().y;
				(i > r || r - o > i) && n.$.scrollTo(0, i);
			},
			bR: function (e) {
				var t = this;
				switch (e) {
					case o.eV:
						t.addClass("cke_on"),
							t.removeClass("cke_off"),
							t.removeClass("cke_disabled");
						break;
					case o.aY:
						t.addClass("cke_disabled"),
							t.removeClass("cke_off"),
							t.removeClass("cke_on");
						break;
					default:
						t.addClass("cke_off"),
							t.removeClass("cke_on"),
							t.removeClass("cke_disabled");
				}
			},
			getFrameDocument: function () {
				var e = this.$;
				try {
					e.contentWindow.document;
				} catch (t) {
					(e.src = e.src),
						s &&
							l.version < 7 &&
							window.showModalDialog(
								'javascript:document.write("<script>window.setTimeout(function(){window.close();},50);</script>")'
							);
				}
				return e && new u(e.contentWindow.document);
			},
			qw: function (e, t) {
				var n = this,
					o = n.$.attributes;
				t = t || {};
				for (var i = 0; i < o.length; i++) {
					var a = o[i];
					if (
						a.specified ||
						(s && a.nodeValue && "value" == a.nodeName.toLowerCase())
					) {
						var r = a.nodeName;
						if (r in t) continue;
						var l = n.getAttribute(r);
						null === l && (l = a.nodeValue), e.setAttribute(r, l);
					}
				}
				"" !== n.$.style.cssText && (e.$.style.cssText = n.$.style.cssText);
			},
			renameNode: function (e) {
				var t = this;
				if (t.getName() != e) {
					var n = t.getDocument(),
						o = new f(e, n);
					t.qw(o),
						t.jg(o),
						t.$.parentNode.replaceChild(o.$, t.$),
						(o.$._ckf_expando = t.$._ckf_expando),
						(t.$ = o.$);
				}
			},
			getChild: function (e) {
				var t = this.$;
				if (e.slice) for (; e.length > 0 && t; ) t = t.childNodes[e.shift()];
				else t = t.childNodes[e];
				return t ? new d.bi(t) : null;
			},
			iu: function () {
				return this.$.childNodes.length;
			},
			hX: function () {
				this.on("contextmenu", function (e) {
					e.data.bK().hasClass("cke_enable_context_menu") ||
						e.data.preventDefault();
				});
			},
			toString: function () {
				return (
					this.getName() + "#" + this.dS() + "." + this.getAttribute("class")
				);
			},
		}),
		(function () {
			function e(e) {
				for (var n = 0, o = 0, i = t[e].length; i > o; o++)
					n += parseInt(this.getComputedStyle(t[e][o]) || 0, 10) || 0;
				return n;
			}
			var t = {
				width: [
					"border-left-width",
					"border-right-width",
					"padding-left",
					"padding-right",
				],
				height: [
					"border-top-width",
					"border-bottom-width",
					"padding-top",
					"padding-bottom",
				],
			};
			(f.prototype.setSize = function (t, n, o) {
				"number" == typeof n &&
					(!o || (s && l.quirks) || (n -= e.call(this, t)),
					this.setStyle(t, n + "px"));
			}),
				(f.prototype.hR = function (t, n) {
					var o =
						Math.max(
							this.$["offset" + c.capitalize(t)],
							this.$["client" + c.capitalize(t)]
						) || 0;
					return n && (o -= e.call(this, t)), o;
				});
		})(),
		(o.command = function (e, t) {
			(this.pW = []),
				(this.exec = function (n) {
					return this.bu == o.aY || (this.readOnly === !1 && e.config.readOnly)
						? !1
						: (t.oD && e.focus(), t.exec.call(this, e, n) !== !1);
				}),
				c.extend(this, t, { iH: { qt: 1 }, oD: !0, bu: o.aS }),
				o.event.call(this);
		}),
		(o.command.prototype = {
			enable: function () {
				var e = this;
				e.bu == o.aY && e.bR(e.vf && "undefined" != typeof e.lJ ? e.lJ : o.aS);
			},
			disable: function () {
				this.bR(o.aY);
			},
			bR: function (e) {
				var t = this;
				return t.bu == e ? !1 : ((t.lJ = t.bu), (t.bu = e), t.oW("bu"), !0);
			},
			rJ: function () {
				var e = this;
				e.bu == o.aS ? e.bR(o.eV) : e.bu == o.eV && e.bR(o.aS);
			},
		}),
		o.event.du(o.command.prototype, !0),
		(o.config = {
			customConfig: o.getUrl("config.js"),
			connectorLanguage: "php",
			language: "",
			defaultLanguage: "en",
			defaultViewType: "thumbnails",
			defaultSortBy: "filename",
			defaultDisplayFilename: !0,
			defaultDisplayDate: !0,
			defaultDisplayFilesize: !0,
			pO: "",
			height: 400,
			plugins:
				"foldertree,folder,filebrowser,container,connector,resource,search,toolbar,formpanel,filesview,status,contextmenu,uploadform,keystrokes,dragdrop,basket,dialog,tools,resize,maximize,help,flashupload,mobile,html5upload,gallery",
			extraPlugins: "",
			fileIcons:
				"ai|avi|bmp|cs|dll|doc|docx|exe|fla|gif|jpg|js|mdb|mp3|ogg|pdf|ppt|pptx|rdp|swf|swt|txt|vsd|xls|xlsx|xml|zip",
			removePlugins: "",
			tabIndex: 0,
			thumbnailDelay: 100,
			theme: "default",
			skin: "kama",
			width: "100%",
			baseFloatZIndex: 1e4,
			directDownload: !1,
			log: !1,
			logStackTrace: !1,
			rememberLastFolder: !0,
			id: null,
			startupPath: "",
			startupFolderExpanded: !0,
			selectActionFunction: null,
			selectActionData: null,
			selectThumbnailActionFunction: null,
			selectThumbnailActionData: null,
			disableThumbnailSelection: !1,
			thumbsUrl: null,
			thumbsDirectAccess: !1,
			imagesMaxWidth: 0,
			imagesMaxHeight: 0,
			selectActionType: "js",
			resourceType: null,
			disableHelpButton: !1,
			connectorPath: "",
			connectorInfo: "",
			uiColor: null,
			showContextMenuArrow: !1,
			useNativeIcons: !1,
			maxSimultaneousUploads: 1,
			readOnly: !1,
			selectMultiple: !0,
		}),
		(CKFinder.config = o.config);
	var p = o.config;
	(o.dU = function (e, t) {
		(this.rG = e), (this.message = t);
	}),
		(o.fs = function (e) {
			return e.fs
				? e.fs
				: ((this.hasFocus = !1), (this._ = { application: e }), this);
		}),
		(o.fs.prototype = {
			focus: function () {
				var e = this;
				if ((e._.fW && clearTimeout(e._.fW), !e.hasFocus)) {
					o.nG && o.nG.fs.ly();
					var t = e._.application;
					t.container.getFirst().addClass("cke_focus"),
						(e.hasFocus = !0),
						t.oW("focus");
				}
			},
			blur: function () {
				var e = this;
				e._.fW && clearTimeout(e._.fW),
					(e._.fW = setTimeout(function () {
						delete e._.fW, e.ly();
					}, 100));
			},
			ly: function () {
				if (this.hasFocus) {
					var e = this._.application;
					e.container.getFirst().removeClass("cke_focus"),
						(this.hasFocus = !1),
						e.oW("blur");
				}
			},
		}),
		(function () {
			o.lang = {
				ko: {
					bg: 1,
					ca: 1,
					cs: 1,
					cy: 1,
					da: 1,
					de: 1,
					el: 1,
					en: 1,
					eo: 1,
					es: 1,
					"es-mx": 1,
					et: 1,
					fa: 1,
					fi: 1,
					fr: 1,
					gu: 1,
					he: 1,
					hi: 1,
					hr: 1,
					hu: 1,
					it: 1,
					ja: 1,
					lv: 1,
					lt: 1,
					nb: 1,
					nl: 1,
					no: 1,
					nn: 1,
					pl: 1,
					"pt-br": 1,
					ro: 1,
					ru: 1,
					sk: 1,
					sl: 1,
					sr: 1,
					sv: 1,
					tr: 1,
					vi: 1,
					"zh-cn": 1,
					"zh-tw": 1,
				},
				load: function (e, t, n) {
					(e && o.lang.ko[e]) || (e = this.jV(t, e)),
						this[e]
							? n(e, this[e])
							: o.scriptLoader.load(
									o.getUrl("lang/" + e + ".js"),
									function () {
										n(e, CKFinder.lang[e]);
									},
									this
							  );
				},
				jV: function (e, t) {
					var n = this.ko;
					t = t || navigator.userLanguage || navigator.language;
					var i = t.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
						a = i[1],
						r = i[2];
					return (
						n[a + "-" + r] ? (a = a + "-" + r) : n[a] || (a = null),
						(o.lang.jV = a
							? function () {
									return a;
							  }
							: function (e) {
									return e;
							  }),
						a || e
					);
				},
			};
		})(),
		(function () {
			(o.log = function () {
				if (p.log || window.CKFINDER_LOG) {
					for (var e = "", t = 0; t < arguments.length; t++) {
						var n = arguments[t];
						if (n)
							switch ((e && (e += "; "), typeof n)) {
								case "function":
									var i = /function (\w+?)\(/.exec(n.toString());
									(i = i ? i[1] : "anonymous func"), (e += i);
									break;
								default:
									e += n ? n.toString() : "";
							}
					}
					o._.log.push(e),
						"object" == typeof window.console &&
							(console.log.apply
								? console.log.apply(console, arguments)
								: console.log(e));
				}
			}),
				(o.ba = function (e) {
					return p.logStackTrace && o.log("[EXCEPTION] " + e.toString()), e;
				}),
				(o.mZ = function () {
					for (var e = "", t = 0; t < o._.log.length; t++)
						e += t + 1 + ". " + o._.log[t] + "\n";
					return e;
				}),
				(o._.log = []);
		})(),
		(o.scriptLoader = (function () {
			var e = {},
				t = {};
			return {
				load: function (n, i, a, r, l, d) {
					var c = "string" == typeof n;
					c && (n = [n]), a || (a = o);
					var u = n.length,
						p = [],
						h = [],
						m = function (e) {
							i && (c ? i.call(a, e) : i.call(a, p, h));
						};
					if (0 === u) return void m(!0);
					for (
						var g = function (e, t) {
								(t ? p : h).push(e), --u <= 0 && m(t);
							},
							v = function (n, o) {
								e[n] = 1;
								var i = t[n];
								delete t[n];
								for (var a = 0; a < i.length; a++) i[a](n, o);
							},
							b = function (n) {
								if (r !== !0 && e[n]) return void g(n, !0);
								var a = t[n] || (t[n] = []);
								if ((a.push(g), !(a.length > 1))) {
									var c = new f("script", d);
									c.setAttributes({ type: "text/javascript", src: n }),
										i &&
											(s
												? (c.$.onreadystatechange = function () {
														("loaded" == c.$.readyState ||
															"complete" == c.$.readyState) &&
															((c.$.onreadystatechange = null),
															o.log("[LOADED] " + n),
															v(n, !0));
												  })
												: ((c.$.onload = function () {
														setTimeout(function () {
															o.log("[LOADED] " + n), v(n, !0);
														}, 0);
												  }),
												  (c.$.onerror = function () {
														v(n, !1);
												  }))),
										c.appendTo(l ? l : o.document.getHead());
								}
							},
							y = 0,
							w = u;
						w > y;
						y++
					)
						b(n[y]);
				},
				uq: function (e) {
					var t = new f("script");
					t.setAttribute("type", "text/javascript"),
						t.appendText(e),
						t.appendTo(o.document.getHead());
				},
			};
		})()),
		(CKFinder.scriptLoader = o.scriptLoader),
		(o.fQ = function (e, t) {
			var n = this;
			(n.basePath = e),
				(n.fileName = t),
				(n.bX = {}),
				(n.loaded = {}),
				(n.jn = {}),
				(n._ = { rZ: {} });
		}),
		(o.fQ.prototype = {
			add: function (e, t) {
				if (this.bX[e])
					throw (
						'[CKFINDER.fQ.add] The resource name "' + e + '" is already bX.'
					);
				this.bX[e] = t || {};
			},
			eB: function (e) {
				return this.bX[e] || null;
			},
			getPath: function (e) {
				var t = this.jn[e];
				return o.getUrl((t && t.dir) || this.basePath + e + "/");
			},
			pi: function (e) {
				var t = this.jn[e];
				return o.getUrl(
					this.getPath(e) + ((t && t.file) || this.fileName + ".js")
				);
			},
			tR: function (e, t, n) {
				e = e.split(",");
				for (var o = 0; o < e.length; o++) {
					var i = e[o];
					this.jn[i] = { dir: t, file: n };
				}
			},
			load: function (e, t, n) {
				c.isArray(e) || (e = e ? [e] : []);
				for (
					var i = this.loaded, a = this.bX, r = [], l = {}, s = {}, d = 0;
					d < e.length;
					d++
				) {
					var u = e[d];
					if (u)
						if (i[u] || a[u]) s[u] = this.eB(u);
						else {
							var f = this.pi(u);
							r.push(f), f in l || (l[f] = []), l[f].push(u);
						}
				}
				o.scriptLoader.load(
					r,
					function (e, o) {
						if (o.length)
							throw (
								'[CKFINDER.fQ.load] Resource name "' +
								l[o[0]].join(",") +
								'" was not found at "' +
								o[0] +
								'".'
							);
						for (var a = 0; a < e.length; a++)
							for (var r = l[e[a]], d = 0; d < r.length; d++) {
								var c = r[d];
								(s[c] = this.eB(c)), (i[c] = 1);
							}
						t.call(n, s);
					},
					this
				);
			},
		}),
		(o.plugins = new o.fQ("plugins/", "plugin"));
	var h = o.plugins;
	(h.load = c.override(h.load, function (e) {
		return function (t, n, o) {
			var i = {},
				a = function (t) {
					e.call(
						this,
						t,
						function (e) {
							c.extend(i, e);
							var t,
								r = [];
							for (t in e) {
								var l = e[t],
									s = l && l.bM;
								if (s)
									for (var d = 0; d < s.length; d++) i[s[d]] || r.push(s[d]);
							}
							if (r.length) a.call(this, r);
							else {
								for (t in i)
									(l = i[t]),
										l.onLoad && !l.onLoad.qK && (l.onLoad(), (l.onLoad.qK = 1));
								n && n.call(o || window, i);
							}
						},
						this
					);
				};
			a.call(this, t);
		};
	})),
		(h.rX = function (e, t, n) {
			var o = this.eB(e);
			o.lang[t] = n;
		}),
		(function () {
			var e = {},
				t = function (t, n) {
					var o = function () {
							(e[t] = 1), n();
						},
						i = new f("img");
					i.on("load", o), i.on("error", o), i.setAttribute("src", t);
				};
			o.rw = {
				load: function (n, o) {
					for (
						var i = n.length,
							a = function () {
								0 === --i && o();
							},
							r = 0;
						r < n.length;
						r++
					) {
						var l = n[r];
						e[l] ? a() : t(l, a);
					}
				},
			};
		})(),
		(o.skins = (function () {
			var e = {},
				t = {},
				n = {},
				i = function (a, r, l, s) {
					var d = e[r];
					a.skin || ((a.skin = d), d.bz && d.bz(a));
					var c = function (e) {
						for (var t = 0; t < e.length; t++) e[t] = o.getUrl(n[r] + e[t]);
					};
					if (!t[r]) {
						var u = d.ls;
						if (u && u.length > 0)
							return (
								c(u),
								void o.rw.load(u, function () {
									(t[r] = 1), i(a, r, l, s);
								})
							);
						t[r] = 1;
					}
					l = d[l];
					var f = 0;
					if ((l ? (l.iB ? l.iB[a.name] && (f = 1) : (l.iB = [])) : (f = 1), f))
						s && s();
					else {
						void 0 === l.eb && (l.eb = []),
							void 0 === l.eb[a.name] && (l.eb[a.name] = []);
						var p = l.eb[a.name];
						if ((p.push(s), p.length > 1)) return;
						var h = !l.css || !l.css.length,
							m = !l.js || !l.js.length,
							g = function () {
								if (h && m) {
									l.iB[a.name] = 1;
									for (var e = 0; e < p.length; e++) p[e] && p[e]();
								}
							};
						if (!h) {
							if ((l.rr || (c(l.css), (l.rr = 1)), l.qx))
								for (var v = 0; v < l.css.length; v++)
									o.oC.appendStyleSheet(l.css[v]);
							else
								a.on("themeSpace", function (e) {
									if ("head" == e.data.space)
										for (var t = 0; t < l.css.length; t++)
											e.data.html +=
												"<link rel='stylesheet' href='" + l.css[t] + "'>\n";
									e.removeListener();
								});
							h = 1;
						}
						m ||
							(c(l.js),
							a.scriptLoader.load(l.js, function () {
								(m = 1), g();
							})),
							g();
					}
				};
			return {
				add: function (t, i) {
					(e[t] = i), (i.fh = n[t] || (n[t] = o.getUrl("skins/" + t + "/")));
				},
				loaded: e,
				load: function (t, a, r) {
					var l = t.gd,
						s = t.fh;
					if (e[l]) {
						i(t, l, a, r);
						{
							e[l];
						}
					} else
						(n[l] = s),
							o.scriptLoader.load(s + "skin.js", function () {
								i(t, l, a, r);
							});
				},
			};
		})()),
		(o.gc = new o.fQ("gc/", "theme")),
		(o.bY = function (e) {
			return e.bY
				? e.bY
				: ((this._ = { jZ: {}, items: {}, application: e }), this);
		});
	var m = o.bY;
	if (
		((m.prototype = {
			add: function (e, t, n) {
				this._.items[e] = {
					type: t,
					command: n.command || null,
					mp: Array.prototype.slice.call(arguments, 2),
				};
			},
			create: function (e) {
				var t = this,
					n = t._.items[e],
					o = n && t._.jZ[n.type],
					i = n && n.command && t._.application.cS(n.command),
					a = o && o.create.apply(t, n.mp);
				return i && i.pW.push(a), a;
			},
			kd: function (e, t) {
				this._.jZ[e] = t;
			},
		}),
		(function () {
			var e = 0,
				i = function () {
					var t = "ckfinder" + ++e;
					return o.instances && o.instances[t] ? i() : t;
				},
				a = {},
				r = function (e) {
					var t = e.config.customConfig;
					if (!t) return !1;
					var n = a[t] || (a[t] = {});
					return (
						n.fn
							? setTimeout(function () {
									n.fn.call(e, e.config),
										(e.config.customConfig != t && r(e)) ||
											e.cr("customConfigLoaded");
							  }, 0)
							: o.scriptLoader.load(t, function () {
									(n.fn = CKFinder.customConfig
										? CKFinder.customConfig
										: function () {}),
										r(e);
							  }),
						!0
					);
				},
				s = function (e, t) {
					e.on("customConfigLoaded", function () {
						if (t) {
							if (t.on) {
								var n;
								for (n in t.on) e.on(n, t.on[n]);
							}
							c.extend(e.config, t, !0), delete e.config.on;
						}
						d(e);
					}),
						t && t.id && (e.config.id = t.id),
						t &&
							void 0 != t.customConfig &&
							(e.config.customConfig = t.customConfig),
						r(e) || e.cr("customConfigLoaded");
				},
				d = function (e) {
					var t = e.config.skin.split(","),
						n = t[0],
						i = o.getUrl(t[1] || "skins/" + n + "/");
					(e.gd = n),
						(e.fh = i),
						(e.iy = "cke_skin_" + n + " skin_" + n),
						(e.qn = e.ox()),
						e.on("uiReady", function () {
							e.document.getWindow().on("lW", function () {
								c.setCookie(
									"CKFinder_UTime",
									Math.round(new Date().getTime() / 1e3),
									!0
								),
									c.setCookie(
										"CKFinder_UId",
										encodeURIComponent(e.id ? e.id : location.href),
										!0
									);
							});
						}),
						e.cr("configLoaded"),
						y(e);
				},
				g = function (e, t) {
					(o.event.jP = !0),
						e.document.on("keydown", function (n) {
							var i = n.data,
								a = i.oV(),
								r = i.db();
							if (116 == a || r == o.bP + 82 || r == o.bP + o.dy + 82) {
								e.execCommand("refresh"),
									t.$.event && t.$.event.keyCode && (t.$.event.keyCode = 5055);
								try {
									n.data.preventDefault();
								} catch (l) {}
							}
						}),
						(o.event.jP = !1);
				},
				v = function (e, t, n) {
					var o,
						i,
						a = [];
					for (i = 0; i < n.length; i++)
						(o = n[i]),
							a.push(
								{
									evt: "onbeforeunload",
									bi: o.bH().$,
									fO: o.bH().$.onbeforeunload,
								},
								{
									evt: "onunload",
									bi: o.getWindow().$,
									fO: o.getWindow().$.onunload,
								},
								{
									evt: "onbeforeunload",
									bi: o.getWindow().$,
									fO: o.getWindow().$.onbeforeunload,
								}
							);
					t.$.onunload = t.$.onbeforeunload = function () {
						var e;
						for (e = 0; e < a.length; e += 1) a[e].bi[a[e].evt] = a[e].fO;
					};
				},
				b = function (e, t) {
					var n,
						i = [o.oC],
						a =
							t.$.top.location.href.match(/ckfinder.html/) ||
							"CKFinderpopup" == t.$.top.name;
					if (a) {
						if ((e.document.focus(), e.focus(), e.cg.inUrlPopup))
							try {
								i.push(new u(o.oC.getWindow().$.opener.document));
							} catch (r) {}
						for (g(e, t), v(e, t, i), n = 0; n < i.length; n += 1)
							i[n].bH().$.onbeforeunload =
								i[n].getWindow().$.onunload =
								i[n].getWindow().$.onbeforeunload =
									function () {
										var t = e.element && e.element.getDocument().getWindow().$;
										t.closed || t.close();
									};
					}
				},
				y = function (e) {
					o.lang.load(
						e.config.language,
						e.config.defaultLanguage,
						function (t, n) {
							(e.langCode = t),
								(e.lang = c.prototypedCopy(n)),
								(e.lB = (function () {
									var t = "['" + e.lang.DateAmPm.join("','") + "']",
										n = e.lang.DateTime.replace(
											/dd|mm|yyyy|hh|HH|MM|aa|d|m|yy|h|H|M|a/g,
											function (e) {
												var n;
												switch (e) {
													case "d":
														n = "day.replace(/^0/,'')";
														break;
													case "dd":
														n = "day";
														break;
													case "m":
														n = "month.replace(/^0/,'')";
														break;
													case "mm":
														n = "month";
														break;
													case "yy":
														n = "year.substr(2)";
														break;
													case "yyyy":
														n = "year";
														break;
													case "H":
														n = "hour.replace(/^0/,'')";
														break;
													case "HH":
														n = "hour";
														break;
													case "h":
														n =
															"( hour < 12 ? hour : ( ( hour - 12 ) + 100 ).toString().substr( 1 ) ).replace(/^0/,'')";
														break;
													case "hh":
														n =
															"( hour < 12 ? hour : ( ( hour - 12 ) + 100 ).toString().substr( 1 ) )";
														break;
													case "M":
														n = "minute.replace(/^0/,'')";
														break;
													case "MM":
														n = "minute";
														break;
													case "a":
														n = t + "[ hour < 12 ? 0 : 1 ].charAt(0)";
														break;
													case "aa":
														n = t + "[ hour < 12 ? 0 : 1 ]";
														break;
													default:
														n = "'" + e + "'";
												}
												return "'," + n + ",'";
											}
										);
									return (
										(n = "'" + n + "'"),
										(n = n.replace(/('',)|,''$/g, "")),
										new Function(
											"day",
											"month",
											"year",
											"hour",
											"minute",
											"return [" + n + "].join('');"
										)
									);
								})()),
								l.gecko &&
									l.version < 10900 &&
									"rtl" == e.lang.dir &&
									(e.lang.dir = "ltr"),
								w(e);
						}
					);
				},
				w = function (e) {
					var t = e.config,
						n = t.plugins,
						i = t.extraPlugins,
						a = t.removePlugins;
					if (i) {
						var r = new RegExp(
							"(?:^|,)(?:" + i.replace(/\s*,\s*/g, "|") + ")(?=,|$)",
							"g"
						);
						(n = n.replace(r, "")), (n += "," + i);
					}
					a &&
						((r = new RegExp(
							"(?:^|,)(?:" + a.replace(/\s*,\s*/g, "|") + ")(?=,|$)",
							"g"
						)),
						(n = n.replace(r, ""))),
						h.load(n.split(","), function (t) {
							var n,
								i = [],
								a = [],
								r = [];
							if (e.config.readOnly)
								for (n in t) t[n].readOnly === !1 && delete t[n];
							e.plugins = t;
							for (n in t) {
								var l = t[n],
									s = l.lang,
									d = h.getPath(n),
									u = null;
								(t[n].name = n),
									(l.pathName = d),
									s &&
										((u = c.indexOf(s, e.langCode) >= 0 ? e.langCode : s[0]),
										l.lang[u]
											? (c.extend(e.lang, l.lang[u]), (u = null))
											: r.push(o.getUrl(d + "lang/" + u + ".js"))),
									a.push(u),
									i.push(l);
							}
							o.scriptLoader.load(r, function () {
								for (var t = ["eK", "bz", "gr"], n = 0; n < t.length; n++)
									for (var r = 0; r < i.length; r++) {
										var l = i[r];
										0 === n && a[r] && l.lang && c.extend(e.lang, l.lang[a[r]]),
											l[t[n]] &&
												(o.log("[PLUGIN] " + l.name + "." + t[n]), l[t[n]](e));
									}
								e.oW("pluginsLoaded"), F(e);
							});
						});
				},
				F = function (e) {
					o.skins.load(e, "application", function () {
						o.skins.load(e, "host", function () {
							_(e);
						});
					});
				},
				_ = function (e) {
					var t = e.config.theme;
					o.gc.load(t, function () {
						var n = (e.theme = o.gc.eB(t));
						(n.pathName = o.gc.getPath(t)), e.oW("themeAvailable");
					});
				};
			o.application.prototype.iI = function (e) {
				var a = f.eB(this._.element),
					r = this._.instanceConfig;
				if (
					(delete this._.element,
					delete this._.instanceConfig,
					(this._.ky = {}),
					(this._.gS = []),
					(a.getDocument().getWindow().$.CKFinder = e),
					(this.element = a),
					(this.document = null),
					(this.rQ = {}),
					(this.name = i()),
					this.name in o.instances)
				)
					throw (
						'[CKFINDER.application] The instance "' +
						this.name +
						'" already exists.'
					);
				(this.config = c.prototypedCopy(p)),
					(this.bY = new m(this)),
					(this.fs = new o.fs(this)),
					(this.aL = {}),
					(this.ld = {}),
					this.on(
						"uiReady",
						function () {
							var e = this,
								t = e.document.getWindow();
							t.on("lW", e.destroy, e), e.cg.inPopup && b(e, t);
						},
						this
					),
					(this.cg = new t(this)),
					this.on(
						"configLoaded",
						function () {
							var e = this;
							n(e.cg, e, e.config.callback), (e.id = e.config.id);
						},
						this
					),
					s(this, r),
					o.oW("instanceCreated", null, this);
			};
		})(),
		c.extend(o.application.prototype, {
			bD: function (e, t) {
				return (this._.ky[e] = new o.command(this, t));
			},
			destroy: function () {
				var e = this;
				e.theme.destroy(e), e.oW("destroy"), o.remove(e);
			},
			execCommand: function (e, t) {
				o.log("[COMMAND] " + e);
				var n = this.cS(e),
					i = { name: e, rm: t, command: n };
				return n &&
					n.bu != o.aY &&
					this.oW("beforeCommandExec", i) !== !0 &&
					((i.returnValue = n.exec(i.rm)),
					!n.async && this.oW("afterCommandExec", i) !== !0)
					? i.returnValue
					: !1;
			},
			cS: function (e) {
				return this._.ky[e];
			},
			ox: function () {
				var e = Math.round(new Date().getTime() / 1e3),
					t = c.getCookie("CKFinder_UTime"),
					n = decodeURIComponent(c.getCookie("CKFinder_UId"));
				return n &&
					t &&
					n == (this.id ? this.id : location.href) &&
					Math.abs(e - t) < 5
					? 1
					: 0;
			},
			bs: "",
		}),
		(function () {
			for (var e = "", t = 49; 58 > t; t++) e += String.fromCharCode(t);
			for (t = 65; 91 > t; t++)
				73 != t && 79 != t && (e += String.fromCharCode(t));
			(o.bs = e),
				(o.nd = "lo"),
				(o.jG = "ho"),
				(o.hf = new window.RegExp("^www\\.")),
				(o.hg = new window.RegExp(":\\d+$")),
				(o.lS = function (e) {
					return e.toLowerCase().replace(o.hf, "").replace(o.hg, "");
				});
		})(),
		o.on("loaded", function () {
			var e = o.application.eb;
			if (e) {
				delete o.application.eb;
				for (var t = 0; t < e.length; t++) e[t].iI();
			}
		}),
		delete o.dO,
		(o.instances = {}),
		(o.document = new u(document)),
		(o.oC =
			o.document.getWindow().$ != o.document.getWindow().$.top
				? new u(o.document.getWindow().$.top.document)
				: o.document),
		(o.add = function (e) {
			(o.instances[e.name] = e),
				(o.jt = e),
				e.on("focus", function () {
					o.nG != e && ((o.nG = e), o.oW("nG"));
				}),
				e.on("blur", function () {
					o.nG == e && ((o.nG = null), o.oW("nG"));
				});
		}),
		(o.remove = function (e) {
			delete o.instances[e.name];
		}),
		(o.aL = {}),
		(o.eV = 1),
		(o.aS = 2),
		(o.aY = 0),
		(o.bF = ""),
		(function () {
			function e(e, t) {
				return e + "." + (t.name || t || e);
			}
			o.ld = {
				bX: {},
				hS: function (t, i, a) {
					var r = e(t, i);
					if (void 0 !== this.bX[r])
						throw "[CKFINDER] Widget " + r + " already bX!";
					return (
						o.log("[WIDGET] bX " + r), (this.bX[r] = new n(r, a)), this.bX[r]
					);
				},
				bz: function (t, n, i, a, r) {
					var l = e(n, i),
						s = this.bX[l],
						d = c.deepCopy(s.hF),
						u = function (e, t, n) {
							(this.app = e),
								(this.eh = t instanceof f ? t : new f(t)),
								(this.hF = d ? c.extend(d, n) : n || {}),
								(this._ = {});
							var o = function (e) {
								this.ib = e;
							};
							(o.prototype = this.tools), (this.tools = new o(this));
							var i = s.dT;
							if (i.length)
								for (var a = 0; a < i.length; a++) i[a].call(this, e, this);
						};
					u.prototype = s;
					var p,
						h = new u(t, a, r);
					for (p in h.fw)
						h.fw[p].readOnly && t.config.readOnly ? h.ke(p) : h.gA(p);
					if (t.ld[l]) throw "[CKFINDER Widget " + l + " already initiated.";
					return (t.ld[l] = h), o.log("[WIDGET] instanced " + l), h;
				},
			};
			var t = {
					click: 1,
					mouseover: 1,
					mouseout: 1,
					focus: 1,
					blur: 1,
					submit: 1,
					dblclick: 1,
					mousedown: 1,
					mouseup: 1,
					mousemove: 1,
					keypress: 1,
					keydown: 1,
					keyup: 1,
					load: 1,
					lW: 1,
					abort: 1,
					error: 1,
					resize: 1,
					scroll: 1,
					select: 1,
					change: 1,
					reset: 1,
				},
				n = function (e, t) {
					var n = this;
					(n.id = e),
						(n.readOnly = !0),
						(n.fw = {}),
						(n.hF = t || {}),
						(n.dT = []),
						(n.tools = new n.tools(n));
				};
			(n.prototype = {
				gA: function (e) {
					var n = this;
					o.log("[WIDGET] Enabling behavior " + e);
					var i = n.fw[e];
					if (i)
						for (var a = n, r = 0; r < i.cC.length; r++) {
							var l = i.cC[r];
							t[l]
								? n.eh.on(l, i.fO, a)
								: (n.on(l, i.fO, a), n.app.on(l, i.fO, a));
						}
				},
				ke: function (e) {
					o.log("[WIDGET] Disabling behavior " + e);
					var n = this.fw[e];
					if (n)
						for (var i = 0; i < n.cC.length; i++) {
							var a = n.cC[i];
							t[a]
								? this.eh.removeListener(a, n.fO)
								: this.removeListener(a, n.fO);
						}
				},
				bh: function (e, t, n, o) {
					c.isArray(t) || (t = [t]),
						(this.fw[e] = { cC: t, fO: n, readOnly: o === !1 }),
						this.eh && this.gA(e);
				},
				removeBehavior: function (e) {
					delete this.fw[e];
				},
				ur: function () {
					return this.fw;
				},
				bn: function () {
					return this.eh;
				},
				oE: function () {
					return this.hF;
				},
				data: function () {
					return this.hF;
				},
				tools: function () {},
			}),
				(n.prototype.tools.prototype = {
					kg: function (e) {
						return e.target == this.ib.eh ? 1 : void 0;
					},
				}),
				o.event.du(n.prototype);
		})(),
		(o.xml = function (e) {
			var t = null;
			if ("object" == typeof e) t = e;
			else {
				var n = (e || "").replace(/&nbsp;/g, " ");
				if (window.DOMParser)
					t = new DOMParser().parseFromString(n, "text/xml");
				else if (window.ActiveXObject) {
					try {
						t = new ActiveXObject("MSXML2.DOMDocument");
					} catch (o) {
						try {
							t = new ActiveXObject("Microsoft.XmlDom");
						} catch (i) {}
					}
					t &&
						((t.async = !1),
						(t.resolveExternals = !1),
						(t.validateOnParse = !1),
						t.loadXML(n));
				}
			}
			this.mq = t;
		}),
		(o.xml.prototype = {
			selectSingleNode: function (e, t) {
				var n = this.mq;
				if (t || (t = n)) {
					if ("selectSingleNode" in t) return t.selectSingleNode(e);
					if (n.evaluate) {
						var o = n.evaluate(e, t, null, 9, null);
						return (o && o.singleNodeValue) || null;
					}
					if (t.querySelectorAll) {
						var i = this.selectNodes(e, t);
						if (1 == i.length)
							return (
								(o = e.match(/\/@(.*$)/)),
								o ? i[0].getAttributeNode(o[1]) : i[0]
							);
					} else alert("XPath is not supported in your browser");
				}
				return null;
			},
			selectNodes: function (e, t) {
				var n = this.mq,
					o = [];
				if (t || (t = n)) {
					if ("selectNodes" in t) return t.selectNodes(e);
					if (n.evaluate) {
						var i = n.evaluate(e, t, null, 5, null);
						if (i) for (var a; (a = i.iterateNext()); ) o.push(a);
					} else {
						if (t.querySelectorAll) {
							var r = e.replace(/\/@(.*$)/, "[$1]").replace(/\//gi, ">");
							return t.querySelectorAll(r);
						}
						alert("XPath is not supported in your browser");
					}
				}
				return o;
			},
			vB: function (e, t) {
				var n = this.selectSingleNode(e, t),
					o = [];
				if (n)
					for (n = n.firstChild; n; )
						n.xml
							? o.push(n.xml)
							: window.XMLSerializer &&
							  o.push(new XMLSerializer().serializeToString(n)),
							(n = n.nextSibling);
				return o.length ? o.join("") : null;
			},
		}),
		(function () {
			var e = {
					address: 1,
					tY: 1,
					dl: 1,
					h1: 1,
					h2: 1,
					h3: 1,
					h4: 1,
					h5: 1,
					h6: 1,
					p: 1,
					pre: 1,
					li: 1,
					dt: 1,
					de: 1,
				},
				t = {
					body: 1,
					div: 1,
					table: 1,
					tbody: 1,
					tr: 1,
					td: 1,
					th: 1,
					caption: 1,
					form: 1,
				},
				n = function (e) {
					for (var t = e.getChildren(), n = 0, i = t.count(); i > n; n++) {
						var a = t.getItem(n);
						if (a.type == o.cv && o.ga.um[a.getName()]) return !0;
					}
					return !1;
				};
			d.qS = function (i) {
				for (var a = this, r = null, l = null, d = [], c = i; c; ) {
					if (c.type == o.cv) {
						a.qH || (a.qH = c);
						var u = c.getName();
						if (
							(s &&
								"HTML" != c.$.scopeName &&
								(u = c.$.scopeName.toLowerCase() + ":" + u),
							l ||
								(!r && e[u] && (r = c),
								t[u] && (r || "div" != u || n(c) ? (l = c) : (r = c))),
							d.push(c),
							"body" == u)
						)
							break;
					}
					c = c.getParent();
				}
				(a.block = r), (a.tX = l), (a.elements = d);
			};
		})(),
		(d.qS.prototype = {
			sJ: function (e) {
				var t = this.elements,
					n = e && e.elements;
				if (!n || t.length != n.length) return !1;
				for (var o = 0; o < t.length; o++) if (!t[o].equals(n[o])) return !1;
				return !0;
			},
		}),
		(d.text = function (e, t) {
			"string" == typeof e && (e = (t ? t.$ : document).createTextNode(e)),
				(this.$ = e);
		}),
		(d.text.prototype = new d.bi()),
		c.extend(d.text.prototype, {
			type: o.fl,
			hJ: function () {
				return this.$.nodeValue.length;
			},
			getText: function () {
				return this.$.nodeValue;
			},
			split: function (e) {
				var t = this;
				if (s && e == t.hJ()) {
					var n = t.getDocument().jT("");
					return n.kB(t), n;
				}
				var o = t.getDocument(),
					i = new d.text(t.$.splitText(e), o);
				if (l.ie8) {
					var a = new d.text("", o);
					a.kB(i), a.remove();
				}
				return i;
			},
			substring: function (e, t) {
				return "number" != typeof t
					? this.$.nodeValue.substr(e)
					: this.$.nodeValue.substring(e, t);
			},
		}),
		(d.pa = function (e) {
			(e = e || o.document), (this.$ = e.$.createDocumentFragment());
		}),
		c.extend(
			d.pa.prototype,
			f.prototype,
			{
				type: o.om,
				kA: function (e) {
					(e = e.$), e.parentNode.insertBefore(this.$, e.nextSibling);
				},
			},
			!0,
			{
				append: 1,
				pd: 1,
				getFirst: 1,
				dB: 1,
				appendTo: 1,
				jg: 1,
				insertBefore: 1,
				kA: 1,
				replace: 1,
				trim: 1,
				type: 1,
				ltrim: 1,
				rtrim: 1,
				getDocument: 1,
				iu: 1,
				getChild: 1,
				getChildren: 1,
			}
		),
		(function () {
			function e(e, t) {
				if (this._.end) return null;
				var n,
					i,
					a = this.mk,
					r = this.vR,
					l = this.type,
					s = e ? "getPreviousSourceNode" : "getNextSourceNode";
				if (!this._.start && ((this._.start = 1), a.trim(), a.collapsed))
					return this.end(), null;
				if (!e && !this._.kp) {
					var d = a.endContainer,
						c = d.getChild(a.endOffset);
					this._.kp = function (e, t) {
						return !(
							(t && d.equals(e)) ||
							(c && e.equals(c)) ||
							(e.type == o.cv && "body" == e.getName())
						);
					};
				}
				if (e && !this._.ka) {
					var u = a.startContainer,
						f = a.startOffset > 0 && u.getChild(a.startOffset - 1);
					this._.ka = function (e, t) {
						return !(
							(t && u.equals(e)) ||
							(f && e.equals(f)) ||
							(e.type == o.cv && "body" == e.getName())
						);
					};
				}
				var p = e ? this._.ka : this._.kp;
				for (
					i = r
						? function (e, t) {
								return p(e, t) === !1 ? !1 : r(e);
						  }
						: p,
						this.current
							? (n = this.current[s](!1, l, i))
							: e
							? ((n = a.endContainer),
							  a.endOffset > 0
									? ((n = n.getChild(a.endOffset - 1)),
									  i(n) === !1 && (n = null))
									: (n = i(n) === !1 ? null : n.hZ(!0, l, i)))
							: ((n = a.startContainer),
							  (n = n.getChild(a.startOffset)),
							  n
									? i(n) === !1 && (n = null)
									: (n =
											i(a.startContainer) === !1
												? null
												: a.startContainer.hL(!0, l, i)));
					n && !this._.end;

				) {
					if (((this.current = n), this.lf && this.lf(n) === !1)) {
						if (t && this.lf) return !1;
					} else if (!t) return n;
					n = n[s](!1, l, i);
				}
				return this.end(), (this.current = null);
			}
			function t(t) {
				for (var n, o = null; (n = e.call(this, t)); ) o = n;
				return o;
			}
			d.gm = c.createClass({
				$: function (e) {
					(this.mk = e), (this._ = {});
				},
				ej: {
					end: function () {
						this._.end = 1;
					},
					next: function () {
						return e.call(this);
					},
					previous: function () {
						return e.call(this, !0);
					},
					sC: function () {
						return e.call(this, !1, !0) !== !1;
					},
					sD: function () {
						return e.call(this, !0, !0) !== !1;
					},
					uF: function () {
						return t.call(this);
					},
					uB: function () {
						return t.call(this, !0);
					},
					reset: function () {
						delete this.current, (this._ = {});
					},
				},
			});
			var n = {
					block: 1,
					"list-item": 1,
					table: 1,
					"table-row-group": 1,
					"table-header-group": 1,
					"table-footer-group": 1,
					"table-row": 1,
					"table-column-group": 1,
					"table-column": 1,
					"table-cell": 1,
					"table-caption": 1,
				},
				i = { hr: 1 };
			(f.prototype.qy = function (e) {
				var t = c.extend({}, i, e || {});
				return n[this.getComputedStyle("display")] || t[this.getName()];
			}),
				(d.gm.pQ = function (e) {
					return function (t) {
						return !(t.type == o.cv && t.qy(e));
					};
				}),
				(d.gm.us = function () {
					return this.pQ({ br: 1 });
				}),
				(d.gm.tU = function () {}),
				(d.gm.tW = function (e, t) {
					function n(e) {
						return (
							e &&
							e.getName &&
							"span" == e.getName() &&
							e.hasAttribute("_fck_bookmark")
						);
					}
					return function (o) {
						var i, a;
						return (
							(i = o && !o.getName && (a = o.getParent()) && n(a)),
							(i = e ? i : i || n(o)),
							t ^ i
						);
					};
				}),
				(d.gm.sf = function (e) {
					return function (t) {
						var n = t && t.type == o.fl && !c.trim(t.getText());
						return e ^ n;
					};
				});
		})(),
		(function () {
			if (l.webkit) return void (l.hc = !1);
			var e = f.kE(
				'<div style="width:0px;height:0px;position:absolute;left:-10000px;border:1px solid;border-color:red blue;"></div>',
				o.document
			);
			e.appendTo(o.document.getHead());
			try {
				l.hc =
					e.getComputedStyle("border-top-color") ==
					e.getComputedStyle("border-right-color");
			} catch (t) {
				l.hc = !1;
			}
			l.hc && (l.cssClass += " cke_hc"), e.remove();
		})(),
		h.load(p.pO.split(","), function () {
			(o.status = "loaded"), o.oW("loaded");
			var e = o._.io;
			if (e) {
				delete o._.io;
				for (var t = 0; t < e.length; t++) o.add(e[t]);
			}
		}),
		s)
	)
		try {
			document.execCommand("BackgroundImageCache", !1, !0);
		} catch (g) {}
	(CKFinder.lang.en = {
		appTitle: "CKFinder",
		common: {
			unavailable: '%1<span class="cke_accessibility">, unavailable</span>',
			confirmCancel:
				"Some of the options were changed. Are you sure you want to close the dialog window?",
			ok: "OK",
			cancel: "Cancel",
			confirmationTitle: "Confirmation",
			messageTitle: "Information",
			inputTitle: "Question",
			undo: "Undo",
			redo: "Redo",
			skip: "Skip",
			skipAll: "Skip all",
			makeDecision: "What action should be taken?",
			rememberDecision: "Remember my decision",
		},
		dir: "ltr",
		HelpLang: "en",
		LangCode: "en",
		DateTime: "m/d/yyyy h:MM aa",
		DateAmPm: ["AM", "PM"],
		FoldersTitle: "Folders",
		FolderLoading: "Loading...",
		FolderNew: "Please type the new folder name: ",
		FolderRename: "Please type the new folder name: ",
		FolderDelete: 'Are you sure you want to delete the "%1" folder?',
		FolderRenaming: " (Renaming...)",
		FolderDeleting: " (Deleting...)",
		DestinationFolder: "Destination Folder",
		FileRename: "Please type the new file name: ",
		FileRenameExt:
			"Are you sure you want to change the file extension? The file may become unusable.",
		FileRenaming: "Renaming...",
		FileDelete: 'Are you sure you want to delete the file "%1"?',
		FilesDelete: "Are you sure you want to delete %1 files?",
		FilesLoading: "Loading...",
		FilesEmpty: "The folder is empty.",
		DestinationFile: "Destination File",
		SkippedFiles: "List of skipped files:",
		BasketFolder: "Basket",
		BasketClear: "Clear Basket",
		BasketRemove: "Remove from Basket",
		BasketOpenFolder: "Open Parent Folder",
		BasketTruncateConfirm:
			"Do you really want to remove all files from the basket?",
		BasketRemoveConfirm:
			'Do you really want to remove the file "%1" from the basket?',
		BasketRemoveConfirmMultiple:
			"Do you really want to remove %1 files from the basket?",
		BasketEmpty: "No files in the basket, drag and drop some.",
		BasketCopyFilesHere: "Copy Files from Basket",
		BasketMoveFilesHere: "Move Files from Basket",
		OperationCompletedSuccess: "Operation completed successfully.",
		OperationCompletedErrors: "Operation completed with errors.",
		FileError: "%s: %e",
		MovedFilesNumber: "Number of files moved: %s.",
		CopiedFilesNumber: "Number of files copied: %s.",
		MoveFailedList: "The following files could not be moved:<br />%s",
		CopyFailedList: "The following files could not be copied:<br />%s",
		Upload: "Upload",
		UploadTip: "Upload New File",
		Refresh: "Refresh",
		Settings: "Settings",
		Help: "Help",
		HelpTip: "Help",
		Select: "Select",
		SelectThumbnail: "Select Thumbnail",
		View: "View",
		Download: "Download",
		NewSubFolder: "New Subfolder",
		Rename: "Rename",
		Delete: "Delete",
		DeleteFiles: "Delete Files",
		CopyDragDrop: "Copy Here",
		MoveDragDrop: "Move Here",
		RenameDlgTitle: "Rename",
		NewNameDlgTitle: "New Name",
		FileExistsDlgTitle: "File Already Exists",
		SysErrorDlgTitle: "System Error",
		FileOverwrite: "Overwrite",
		FileAutorename: "Auto-rename",
		ManuallyRename: "Manually rename",
		OkBtn: "OK",
		CancelBtn: "Cancel",
		CloseBtn: "Close",
		UploadTitle: "Upload New File",
		UploadSelectLbl: "Select a file to upload",
		UploadProgressLbl: "(Upload in progress, please wait...)",
		UploadBtn: "Upload Selected File",
		UploadBtnCancel: "Cancel",
		UploadNoFileMsg: "Please select a file from your computer.",
		UploadNoFolder: "Please select a folder before uploading.",
		UploadNoPerms: "File upload not allowed.",
		UploadUnknError: "Error sending the file.",
		UploadExtIncorrect: "File extension not allowed in this folder.",
		UploadLabel: "Files to Upload",
		UploadTotalFiles: "Total Files:",
		UploadTotalSize: "Total Size:",
		UploadSend: "Upload",
		UploadAddFiles: "Add Files",
		UploadClearFiles: "Clear Files",
		UploadCancel: "Cancel Upload",
		UploadRemove: "Remove",
		UploadRemoveTip: "Remove !f",
		UploadUploaded: "Uploaded !n%",
		UploadProcessing: "Processing...",
		SetTitle: "Settings",
		SetView: "View:",
		SetViewThumb: "Thumbnails",
		SetViewList: "List",
		SetDisplay: "Display:",
		SetDisplayName: "File Name",
		SetDisplayDate: "Date",
		SetDisplaySize: "File Size",
		SetSort: "Sorting:",
		SetSortName: "by File Name",
		SetSortDate: "by Date",
		SetSortSize: "by Size",
		SetSortExtension: "by Extension",
		FilesCountEmpty: "<Empty Folder>",
		FilesCountOne: "1 file",
		FilesCountMany: "%1 files",
		Kb: "%1 KB",
		Mb: "%1 MB",
		Gb: "%1 GB",
		SizePerSecond: "%1/s",
		ErrorUnknown: "It was not possible to complete the request. (Error %1)",
		Errors: {
			10: "Invalid command.",
			11: "The resource type was not specified in the request.",
			12: "The requested resource type is not valid.",
			102: "Invalid file or folder name.",
			103: "It was not possible to complete the request due to authorization restrictions.",
			104: "It was not possible to complete the request due to file system permission restrictions.",
			105: "Invalid file extension.",
			109: "Invalid request.",
			110: "Unknown error.",
			111: "It was not possible to complete the request due to resulting file size.",
			115: "A file or folder with the same name already exists.",
			116: "Folder not found. Please refresh and try again.",
			117: "File not found. Please refresh the files list and try again.",
			118: "Source and target paths are equal.",
			201: 'A file with the same name is already available. The uploaded file was renamed to "%1".',
			202: "Invalid file.",
			203: "Invalid file. The file size is too big.",
			204: "The uploaded file is corrupt.",
			205: "No temporary folder is available for upload in the server.",
			206: "Upload cancelled due to security reasons. The file contains HTML-like data.",
			207: 'The uploaded file was renamed to "%1".',
			300: "Moving file(s) failed.",
			301: "Copying file(s) failed.",
			500: "The file browser is disabled for security reasons. Please contact your system administrator and check the CKFinder configuration file.",
			501: "The thumbnails support is disabled.",
		},
		ErrorMsg: {
			FileEmpty: "The file name cannot be empty.",
			FileExists: "File %s already exists.",
			FolderEmpty: "The folder name cannot be empty.",
			FolderExists: "Folder %s already exists.",
			FolderNameExists: "Folder already exists.",
			FileInvChar:
				'The file name cannot contain any of the following characters: \n\\ / : * ? " < > |',
			FolderInvChar:
				'The folder name cannot contain any of the following characters: \n\\ / : * ? " < > |',
			PopupBlockView:
				"It was not possible to open the file in a new window. Please configure your browser and disable all popup blockers for this site.",
			XmlError:
				"It was not possible to properly load the XML response from the web server.",
			XmlEmpty:
				"It was not possible to load the XML response from the web server. The server returned an empty response.",
			XmlRawResponse: "Raw response from the server: %s",
		},
		Imageresize: {
			dialogTitle: "Resize %s",
			sizeTooBig:
				"Cannot set image height or width to a value bigger than the original size (%size).",
			resizeSuccess: "Image resized successfully.",
			thumbnailNew: "Create a new thumbnail",
			thumbnailSmall: "Small (%s)",
			thumbnailMedium: "Medium (%s)",
			thumbnailLarge: "Large (%s)",
			newSize: "Set a new size",
			width: "Width",
			height: "Height",
			invalidHeight: "Invalid height.",
			invalidWidth: "Invalid width.",
			invalidName: "Invalid file name.",
			newImage: "Create a new image",
			noExtensionChange: "File extension cannot be changed.",
			imageSmall: "Source image is too small.",
			contextMenuName: "Resize",
			lockRatio: "Lock ratio",
			resetSize: "Reset size",
		},
		Fileeditor: {
			save: "Save",
			fileOpenError: "Unable to open file.",
			fileSaveSuccess: "File saved successfully.",
			contextMenuName: "Edit",
			loadingFile: "Loading file, please wait...",
		},
		Maximize: { maximize: "Maximize", minimize: "Minimize" },
		Gallery: { current: "Image {current} of {total}" },
		Zip: {
			extractHereLabel: "Extract here",
			extractToLabel: "Extract to...",
			downloadZipLabel: "Download as zip",
			compressZipLabel: "Compress to zip",
			removeAndExtract: "Remove existing and extract",
			extractAndOverwrite: "Extract overwriting existing files",
			extractSuccess: "File extracted successfully.",
		},
		Search: { searchPlaceholder: "Search" },
	}),
		(function () {
			var e = 1,
				t = 2,
				n = 4,
				i = 8,
				a = 16,
				r = 32,
				l = 64,
				s = 128;
			(o.aL.Acl = function (o) {
				var d = this;
				o || (o = 0),
					(d.folderView = (o & e) == e),
					(d.folderCreate = (o & t) == t),
					(d.folderRename = (o & n) == n),
					(d.folderDelete = (o & i) == i),
					(d.fileView = (o & a) == a),
					(d.fileUpload = (o & r) == r),
					(d.fileRename = (o & l) == l),
					(d.fileDelete = (o & s) == s);
			}),
				h.add("acl");
		})(),
		(function () {
			h.add("connector", {
				bM: [],
				bz: function (e) {
					e.on("appReady", function () {
						e.connector = new o.aL.Connector(e);
						var t = e.config.resourceType,
							n = t ? { type: t } : null;
						e.connector.sendCommand("Init", n, function (t) {
							var n;
							if (!t.checkError()) {
								var i = "Connector/ConnectorInfo/";
								(o.ed = t.selectSingleNode(i + "@s").value),
									(o.bF = t.selectSingleNode(i + "@c").value + "----"),
									(e.config.thumbsEnabled =
										"true" == t.selectSingleNode(i + "@thumbsEnabled").value),
									(e.config.thumbsDirectAccess = !1),
									e.config.thumbsEnabled
										? ((n = t.selectSingleNode(i + "@thumbsUrl")),
										  n && (e.config.thumbsUrl = n.value),
										  (n = t.selectSingleNode(i + "@thumbsDirectAccess")),
										  n && (e.config.thumbsDirectAccess = "true" == n.value),
										  (n = t.selectSingleNode(i + "@thumbsWidth")),
										  (e.config.thumbsWidth =
												(n ? parseInt(n.value, 10) : 100) || 100),
										  (n = t.selectSingleNode(i + "@thumbsHeight")),
										  (e.config.thumbsHeight =
												(n ? parseInt(n.value, 10) : 100) || 100))
										: ((e.config.thumbsWidth = 100),
										  (e.config.thumbsHeight = 100)),
									(e.config.imagesMaxWidth = parseInt(
										t.selectSingleNode(i + "@imgWidth").value,
										10
									)),
									(e.config.imagesMaxHeight = parseInt(
										t.selectSingleNode(i + "@imgHeight").value,
										10
									)),
									(n = t.selectSingleNode(i + "@uploadMaxSize")),
									(e.config.uploadMaxSize = n ? parseInt(n.value, 10) : 0),
									(n = t.selectSingleNode(i + "@uploadCheckImages")),
									(e.config.uploadCheckImages = n ? "true" == n.value : !1);
								var a = t.selectSingleNode(i + "@plugins"),
									r = a && a.value;
								r && r.length
									? h.load(r.split(","), function (n) {
											var i,
												a = [],
												r = [],
												l = [];
											for (i in n) {
												var s = n[i],
													d = s.lang,
													u = h.getPath(i),
													f = null;
												e.plugins[i] ||
													((e.plugins[i] = n[i]),
													(n[i].name = i),
													(s.pathName = u),
													d &&
														((f =
															c.indexOf(d, e.langCode) >= 0
																? e.langCode
																: d[0]),
														s.lang[f]
															? (c.extend(e.lang, s.lang[f]), (f = null))
															: l.push(o.getUrl(u + "lang/" + f + ".js"))),
													r.push(f),
													a.push(s));
											}
											o.scriptLoader.load(l, function () {
												for (
													var n = ["eK", "bz", "gr"], i = 0;
													i < n.length;
													i++
												)
													for (var l = 0; l < a.length; l++) {
														var s = a[l];
														0 === i &&
															r[l] &&
															s.lang &&
															c.extend(e.lang, s.lang[r[l]]),
															s[n[i]] &&
																(o.log("[PLUGIN] " + s.name + "." + n[i]),
																s[n[i]](e));
													}
												e.cr("uiReady"),
													e.cr("appReady"),
													e.oW("pluginsLoaded", { step: 2, jN: e.connector }),
													e.cr("connectorInitialized", { xml: t });
											});
									  })
									: (e.oW("pluginsLoaded", { step: 2, jN: e.connector }),
									  e.cr("connectorInitialized", { xml: t }));
							}
						});
					});
				},
			}),
				(o.aL.Connector = function (e) {
					this.app = e;
					var t = e.config.connectorLanguage || "php";
					this.oN = e.config.connectorPath
						? e.config.connectorPath
						: o.basePath + "core/connector/" + t + "/connector." + t;
				}),
				(o.aL.Connector.prototype = {
					ERROR_NONE: 0,
					ERROR_CUSTOMERROR: 1,
					ERROR_INVALIDCOMMAND: 10,
					ERROR_TYPENOTSPECIFIED: 11,
					ERROR_INVALIDTYPE: 12,
					ERROR_INVALIDNAME: 102,
					ERROR_UNAUTHORIZED: 103,
					ERROR_ACCESSDENIED: 104,
					ERROR_INVALIDEXTENSION: 105,
					ERROR_INVALIDREQUEST: 109,
					ERROR_UNKNOWN: 110,
					ERROR_ALREADYEXIST: 115,
					ERROR_FOLDERNOTFOUND: 116,
					ERROR_FILENOTFOUND: 117,
					ERROR_SOURCE_AND_TARGET_PATH_EQUAL: 118,
					ERROR_UPLOADEDFILERENAMED: 201,
					ERROR_UPLOADEDINVALID: 202,
					ERROR_UPLOADEDTOOBIG: 203,
					ERROR_UPLOADEDCORRUPT: 204,
					ERROR_UPLOADEDNOTMPDIR: 205,
					ERROR_UPLOADEDWRONGHTMLFILE: 206,
					ERROR_UPLOADEDINVALIDNAMERENAMED: 207,
					ERROR_MOVE_FAILED: 300,
					ERROR_COPY_FAILED: 301,
					ERROR_CONNECTORDISABLED: 500,
					ERROR_THUMBNAILSDISABLED: 501,
					currentFolderUrl: function () {
						return this.app.aV ? this.app.aV.getUrl() : void 0;
					},
					currentType: function () {
						return this.app.aV ? this.app.aV.type : void 0;
					},
					currentTypeHash: function () {
						return this.app.aV
							? o.getResourceType(this.app.aV.type).hash
							: void 0;
					},
					currentResourceType: function () {
						return o.getResourceType(this.currentType());
					},
					sendCommand: function (t, n, i, a, r) {
						var l = this.composeUrl(t, n, a, r),
							s = this;
						return i
							? o.ajax.loadXml(l, function (t) {
									(t.hy = s.app),
										s.app.oW("connectorResponse", { xml: t }),
										i(c.extend(t, e));
							  })
							: o.ajax.loadXml(l, function (e) {
									s.app.oW("connectorResponse", { xml: e });
							  });
					},
					sendCommandPost: function (t, n, i, a, r, l) {
						var s = this.composeUrl(t, n, r, l),
							d = this;
						return (
							i || (i = {}),
							(i.CKFinderCommand = !0),
							a
								? o.ajax.loadXml(
										s,
										function (t) {
											(t.hy = d.app),
												d.app.oW("connectorResponse", { xml: t }),
												a(c.extend(t, e));
										},
										this.composeUrlParams(i)
								  )
								: o.ajax.loadXml(
										s,
										function (e) {
											d.app.oW("connectorResponse", { xml: e });
										},
										this.composeUrlParams(i)
								  )
						);
					},
					composeUrl: function (e, t, n, o) {
						var i = this,
							a = i.oN + "?command=" + encodeURIComponent(e);
						if ("Init" != e) {
							var r = "";
							o || (o = i.app.aV),
								(r = n
									? i.app.getResourceType(n).hash
									: i.app.getResourceType(o.type).hash),
								(a +=
									"&type=" +
									encodeURIComponent(n || i.app.aV.type) +
									"&currentFolder=" +
									encodeURIComponent(o.getPath() || "") +
									"&langCode=" +
									i.app.langCode +
									"&hash=" +
									r);
						}
						if (t) {
							var l = i.composeUrlParams(t);
							l && (a += "&" + l);
						}
						return (
							i.app.id && (a += "&id=" + encodeURIComponent(i.app.id)),
							i.app.config.connectorInfo &&
								(a +=
									("&" != i.app.config.connectorInfo.charAt(0) ? "&" : "") +
									i.app.config.connectorInfo),
							a
						);
					},
					composeUrlParams: function (e) {
						if (!e) return "";
						var t,
							n = "";
						for (t in e)
							n.length && (n += "&"),
								(n += encodeURIComponent(t) + "=" + encodeURIComponent(e[t]));
						return n;
					},
				});
			var e = {
				checkError: function () {
					var e = this,
						t = e.getErrorNumber(),
						n = e.hy.connector;
					if (t == n.ERROR_NONE) return !1;
					if (-1 === t) return !0;
					var i = e.getErrorMessage();
					o.log("[ERROR] " + t);
					var a;
					if (t == n.ERROR_CUSTOMERROR) a = i;
					else if ((a = e.hy.lang.Errors[t]))
						for (var r = 0; r <= arguments.length; r++) {
							var l = 0 === r ? i : arguments[r - 1];
							a = a.replace(/%(\d+)/, l);
						}
					else a = e.hy.lang.ErrorUnknown.replace(/%1/, t);
					return e.hy.msgDialog("", a), t != n.ERROR_UPLOADEDFILERENAMED;
				},
				getErrorNumber: function () {
					var e =
						this.selectSingleNode &&
						this.selectSingleNode("Connector/Error/@number");
					return e ? parseInt(e.value, 10) : -1;
				},
				getErrorMessage: function () {
					var e =
						this.selectSingleNode &&
						this.selectSingleNode("Connector/Error/@text");
					return e ? e.value : "";
				},
			};
		})(),
		h.add("resource", {
			bM: ["connector"],
			bz: function (e) {
				(e.resourceTypes = []),
					e.on("connectorInitialized", function (t) {
						for (
							var n = t.data.xml.selectNodes(
									"Connector/ResourceTypes/ResourceType"
								),
								i = 0;
							i < n.length;
							i++
						) {
							var a = n[i].attributes;
							e.resourceTypes.push(
								new o.aL.ResourceType(e, {
									name: a.getNamedItem("name").value,
									url: a.getNamedItem("url").value,
									hasChildren: a.getNamedItem("hasChildren").value,
									allowedExtensions: a.getNamedItem("allowedExtensions").value,
									deniedExtensions: a.getNamedItem("deniedExtensions").value,
									acl: a.getNamedItem("acl").value,
									hash: a.getNamedItem("hash").value,
									maxSize: a.getNamedItem("maxSize").value,
								})
							);
						}
						e.cr("resourcesReceived", { hK: e.resourceTypes });
					}),
					(e.getResourceType = function (e) {
						for (var t = 0; t < this.resourceTypes.length; t++) {
							var n = this.resourceTypes[t];
							if (n.name == e) return n;
						}
						return null;
					});
			},
		}),
		(function () {
			function e(e) {
				var t = {};
				if (e.length > 0)
					for (var n = e.toLowerCase().split(","), o = 0; o < n.length; o++)
						t[n[o]] = !0;
				return t;
			}
			(o.aL.ResourceType = function (t, n) {
				var o = this;
				(o.app = t),
					(o.name = n.name),
					(o.url = n.url),
					(o.hasChildren = "true" === n.hasChildren),
					(o.defaultView = "Thumbnails"),
					(o.allowedExtensions = n.allowedExtensions),
					(o.deniedExtensions = n.deniedExtensions),
					(o.oT = e(n.allowedExtensions)),
					(o.ms = e(n.deniedExtensions)),
					(o.nS = n.acl),
					(o.hash = n.hash),
					(o.maxSize = n.maxSize);
			}),
				(o.aL.ResourceType.prototype = {
					isExtensionAllowed: function (e) {
						var t = this;
						return (
							(e = e.toLowerCase()),
							!(
								(0 !== t.deniedExtensions.length && t.ms[e]) ||
								(0 !== t.allowedExtensions.length && !t.oT[e])
							)
						);
					},
					allowedExtensions: function () {
						return this.allowedExtensions;
					},
					getRootFolder: function () {
						for (var e = 0; e < this.app.folders.length; e++) {
							var t = this.app.folders[e];
							if (t.isRoot && t.type == this.name) return t;
						}
						return void 0;
					},
				});
		})(),
		(function () {
			var e = function (e) {
				this.app = e;
			};
			(e.prototype.er = function (e, t) {
				var n = this;
				if (!n.id) {
					(n.toolbarId = "cke_" + c.getNextNumber()),
						(n.id = "cke_" + c.getNextNumber()),
						(n.placeholderId = "cke_" + c.getNextNumber());
					var o = {
							id: n.id,
							placeholderId: n.placeholderId,
							lastTimeout: -1,
							app: e,
						},
						i = c.addFunction(e.search.doSearch, o),
						a = c.addFunction(e.search.onFocus, o);
					t.push(
						'<span class="cke_search_box" id="',
						n.toolbarId,
						'" class="cke_toolbar" role="presentation"><span class="cke_toolbar_start"></span>'
					),
						t.push('<input id="' + n.id + '" '),
						t.push(
							' onkeyup="window.parent.CKFinder._.callFunction(',
							i,
							', this);"'
						),
						t.push(
							' oninput="window.parent.CKFinder._.callFunction(',
							i,
							', this);"'
						),
						t.push(
							' onfocus="window.parent.CKFinder._.callFunction(',
							a,
							', this);"'
						),
						t.push(">"),
						t.push(
							'<span id="' +
								n.placeholderId +
								'" class="cke_search_placeholder" onclick="window.parent.CKFinder._.callFunction(',
							a,
							', this);">' + e.lang.Search.searchPlaceholder + "</span>"
						),
						t.push('<span class="cke_toolbar_end"></span></span>');
				}
			}),
				(e.prototype.doSearch = function () {
					var e = this.app.ld["filesview.filesview"].oE().shownFiles.length,
						t = this.app.document.getById(this.id).getValue(),
						n = this.app;
					this.lastTimeout &&
						(clearTimeout(this.lastTimeout), (this.lastTimeout = null)),
						200 > e
							? n.ld["filesview.filesview"].oW("requestRenderFiles", {
									lookup: t,
							  })
							: (this.lastTimeout = setTimeout(function () {
									n.ld["filesview.filesview"].oW("requestRenderFiles", {
										lookup: t,
									});
							  }, 1e3));
				}),
				(e.prototype.onFocus = function () {
					var e = this;
					e.app.document.getById(e.placeholderId).setStyle("display", "none"),
						e.app.document.getById(e.id).$.focus();
				}),
				(e.prototype.reset = function () {
					var e = this;
					e.app.document.getById(e.id).setValue(""),
						e.app.document
							.getById(e.placeholderId)
							.setStyle("display", "inline");
				}),
				h.add("search", {
					bM: ["foldertree"],
					eK: function (t) {
						t.search = new e(t);
					},
					bz: function (e) {
						e.on("appReady", function () {
							e.ld["foldertree.foldertree"].on(
								"beforeSelectFolder",
								function () {
									e.search.reset();
								}
							),
								e.ld["formpanel.formpanel"].on("afterUploadFile", function () {
									e.search.reset();
								});
						});
					},
				});
		})(),
		(function () {
			function e(e, t, n, i, a) {
				null === e.childFolders && (e.childFolders = []);
				var r = new o.aL.Folder(e.app, t, n, i, a);
				return (
					(r.parent = e),
					(r.nh = e.isRoot ? 0 : e.nh + 1),
					e.childFolders.push(r),
					r
				);
			}
			function t(e) {
				return e.folders || (e.folders = []), e.folders;
			}
			function n(e, t) {
				if (!e || 0 === e.length)
					throw new o.dU("name_empty", t.lang.ErrorMsg.FolderEmpty);
				if (i.iz.test(e))
					throw new o.dU("name_invalid_chars", t.lang.ErrorMsg.FolderInvChar);
				return !0;
			}
			var i = { iz: /[\\\/:\*\?"<>\|]/ };
			h.add("folder", {
				bM: ["resource", "connector", "acl"],
				bz: function (e) {
					(e.folders = t(e)),
						(e.aV = null),
						e.on("resourcesReceived", function (t) {
							for (var n = [], i = t.data.hK, a = 0; a < i.length; a++) {
								var r = i[a];
								n.push(new o.aL.Folder(e, r.name, r.name, r.hasChildren, r.nS)),
									(n[n.length - 1].isRoot = !0);
							}
							e.oW("requestAddFolder", { folders: n }, function () {
								var t = e.config.startupPath || "",
									n = 0,
									i = "",
									a = "";
								if (e.config.rememberLastFolder) {
									var r = e.id ? "CKFinder_Path_" + e.id : "CKFinder_Path";
									i = decodeURIComponent(c.getCookie(r)) || "";
								}
								if (
									(t && !e.qn
										? ((a = t), (n = 1))
										: i
										? (a = i)
										: t
										? (a = t)
										: e.resourceTypes.length &&
										  (a = e.resourceTypes[0].name + "/"),
									a)
								) {
									o.log("[FOLDER] Opening startup path: " + a);
									var l = a.split(":");
									(!e.getResourceType(l[0]) || l.length < 2) &&
										(l = [e.resourceTypes[0].name, "/"]);
									var s = e.ld["foldertree.foldertree"],
										d = /(.*\/)(.*)$/.exec(l[1]);
									s.tools.jL(l[0], d[1], function (t) {
										if (t) {
											o.log("[FOLDER] Opening startup folder: ", t);
											var i = !n && ("1" == l[2] || void 0 === l[2]);
											i && e.config.startupFolderExpanded === !1 && (i = 0),
												s.oW("requestSelectFolder", {
													folder: t,
													expand: i,
													file:
														d[2] && t.type == l[0] && t.getPath() == d[1]
															? d[2]
															: "",
												});
										}
									});
								}
							});
						}),
						e.bD("RemoveFolder", {
							readOnly: !1,
							exec: function (e) {
								var t = e.aV;
								if (t) {
									if (t.isRoot || !t.acl.folderDelete) return;
									e.fe(
										"",
										e.lang.FolderDelete.replace("%1", t.name),
										function () {
											e.oW("requestProcessingFolder", { folder: t }),
												t.remove();
										}
									);
								}
							},
						}),
						e.bD("CreateSubFolder", {
							readOnly: !1,
							exec: function (e) {
								var t = e.aV;
								t &&
									e.hs(
										e.lang.NewNameDlgTitle,
										e.lang.FolderRename,
										"",
										function (n) {
											if ((n = c.trim(n)))
												try {
													e.oW("requestProcessingFolder", { folder: t }),
														t.createNewFolder(n);
												} catch (i) {
													if (!(i instanceof o.dU)) throw i;
													e.oW("requestRepaintFolder", { folder: t }),
														e.msgDialog("", i.message);
												}
										}
									);
							},
						}),
						e.bD("RenameFolder", {
							readOnly: !1,
							exec: function (e) {
								var t = e.aV;
								if (t) {
									if (t.isRoot || !t.acl.folderRename) return;
									e.hs(
										e.lang.RenameDlgTitle,
										e.lang.FolderRename,
										e.aV.name,
										function (n) {
											if ((n = c.trim(n)))
												try {
													t.rename(n);
												} catch (i) {
													if (!(i instanceof o.dU)) throw i;
													e.oW("requestRepaintFolder", { folder: t }),
														e.msgDialog("", i.message);
												}
										}
									);
								}
							},
						}),
						e.eU &&
							(e.dZ("folder0", 99),
							e.dZ("folder1", 100),
							e.dZ("folder2", 101),
							e.dZ("folder3", 102),
							e.eU({
								createSubFolder: {
									label: e.lang.NewSubFolder,
									command: "CreateSubFolder",
									group: "folder1",
								},
								renameFolder: {
									label: e.lang.Rename,
									command: "RenameFolder",
									group: "folder1",
								},
								removeFolder: {
									label: e.lang.Delete,
									command: "RemoveFolder",
									group: "folder2",
								},
							}));
				},
			}),
				(o.aL.Folder = function (e, n, i, a, r) {
					var l = this;
					(l.app = e),
						(l.type = n || ""),
						(l.name = i || ""),
						(l.hasChildren = void 0 == a || null === a ? !0 : !!a),
						(l.isRoot = !1),
						(l.isOpened = !1),
						(l.parent = null),
						(l.isDirty = !1),
						(l.acl = new o.aL.Acl(r)),
						(l.index = t(e).push(l) - 1),
						(l.childFolders = null);
				}),
				(o.aL.Folder.prototype = {
					getPath: function () {
						for (var e = this, t = e.isRoot ? "/" : e.name; e.parent; )
							(e = e.parent), (t = e.isRoot ? "/" + t : e.name + "/" + t);
						return e != this ? t + "/" : t;
					},
					getUrl: function () {
						for (var e = this, t = ""; e; )
							(t = e.isRoot
								? this.app.getResourceType(e.type).url + t
								: encodeURIComponent(e.name) + "/" + t),
								(e = e.parent);
						return t;
					},
					getUploadUrl: function () {
						return this.app.connector.composeUrl(
							"FileUpload",
							{},
							this.type,
							this
						);
					},
					getResourceType: function () {
						return this.app.getResourceType(this.type);
					},
					updateReference: function () {
						var e = this;
						if (e.app.folders[e.index] == e) return e;
						for (var t = 0; t < e.parent.childFolders.length; t++)
							if (e.parent.childFolders[t].name == e.name)
								return e.parent.childFolders[t];
						return void 0;
					},
					getChildren: function (t, n) {
						var i = this,
							a = i.childFolders;
						if (i.hl && !n) {
							o.log("[FOLDER] getChildrenLock active, defering callback..."),
								i.app.oW("requestLoadingFolder", { folder: i });
							var r = 100;
							return void setTimeout(function () {
								i.hl
									? 3e3 >= r
										? setTimeout(arguments.callee, (r *= 2))
										: (o.log(
												"[FOLDER] TIMEOUT for getChildrenLock defered callback!"
										  ),
										  (i.hl = !1),
										  i.getChildren(t))
									: t(a);
							});
						}
						if (a && !i.isDirty && !n) return t(a), a;
						if (((i.hl = !0), i.isDirty && a)) {
							o.log("[FOLDER] Clearing folder children cache.");
							for (var l = 0; l < a.length; l++)
								delete i.app.folders[a[l].index];
						}
						return (
							i.app.oW("requestLoadingFolder", { folder: i }),
							this.app.connector.sendCommand(
								"GetFolders",
								null,
								function (n) {
									if (n.checkError())
										return void i.app.oW("requestRepaintFolder", { folder: i });
									var o = n.selectSingleNode("Connector/@resourceType").value;
									i.hm = !0;
									var a = n.selectNodes("Connector/Folders/Folder"),
										r = [];
									i.childFolders = null;
									for (var l = 0; l < a.length; l++) {
										var s = a[l].attributes.getNamedItem("name").value,
											d =
												"true" ==
												a[l].attributes.getNamedItem("hasChildren").value,
											c = parseInt(
												a[l].attributes.getNamedItem("acl").value,
												10
											);
										r.push(e(i, o, s, d, c));
									}
									(i.hasChildren = !!a.length),
										(i.isDirty = !1),
										(i.hl = null),
										i.app.oW("requestRepaintFolder", { folder: i }),
										t(r);
								},
								i.type,
								i
							),
							null
						);
					},
					mapLoadedDescendants: function (e) {
						if (this.childFolders)
							for (var t = 0; t < this.childFolders.length; t++) {
								var n = this.childFolders[t];
								n.mapLoadedDescendants(e), e(n);
							}
					},
					select: function () {
						this.app.oW("requestSelectFolder", { folder: this });
					},
					isSelected: function () {
						return this.app.aV && this == this.app.aV;
					},
					deselect: function () {
						this.app.oW("requestSelectFolder");
					},
					open: function (e) {
						(!e || this.hm) &&
							this.app.oW("requestExpandFolder", { folder: this });
					},
					close: function () {
						this.app.oW("requestExpandFolder", { folder: this, collapse: 1 });
					},
					hU: function () {
						for (var e = 1, t = this; t; ) e++, (t = t.parent);
						return e;
					},
					toggle: function () {
						var e = this;
						e.hasChildren && (e.isOpened ? e.close() : e.open());
					},
					createNewFolder: function (e) {
						n(e, this.app);
						var t = this;
						(t.isDirty = !0),
							t.app.connector.sendCommandPost(
								"CreateFolder",
								{ NewFolderName: e },
								null,
								function (n) {
									return n.checkError()
										? void t.app.oW("requestRepaintFolder", { folder: t })
										: ((t.hasChildren = !0),
										  void t.app.oW("afterCommandExecDefered", {
												name: "CreateFolder",
												ip: t,
												uv: e,
										  }));
								},
								this.type,
								this
							);
					},
					rename: function (e) {
						n(e, this.app);
						var t = this;
						return (
							this.app.oW("requestProcessingFolder", { folder: t }),
							(t.parent.isDirty = !0),
							t.name == e
								? void t.app.oW("requestRepaintFolder", { folder: t })
								: void t.app.connector.sendCommandPost(
										"RenameFolder",
										{ NewFolderName: e },
										null,
										function (e) {
											return e.checkError()
												? void t.app.oW("requestRepaintFolder", { folder: t })
												: ((t.parent.isDirty = !1),
												  (t.name = e.selectSingleNode(
														"Connector/RenamedFolder/@newName"
												  ).value),
												  void t.app.oW("requestRepaintFolder", { folder: t }));
										},
										this.type,
										this
								  )
						);
					},
					remove: function () {
						var e = this;
						e.deselect(),
							(e.parent.isDirty = !0),
							this.app.oW("requestProcessingFolder", { folder: e }),
							e.app.connector.sendCommandPost(
								"DeleteFolder",
								null,
								null,
								function (t) {
									return t.checkError()
										? void e.app.oW("requestRepaintFolder", { folder: e })
										: void e.app.oW(
												"requestRemoveFolder",
												{ folder: e },
												function () {
													var t = c.indexOf(e.parent.childFolders, e),
														n = e.index,
														o = e.parent,
														i = e.app;
													o.childFolders[t].mapLoadedDescendants(function (e) {
														(i.folders[e.index].isDeleted = !0),
															delete i.folders[e.index];
													}),
														o.childFolders.splice(t, 1),
														(i.folders[n].isDeleted = !0),
														delete i.folders[n],
														0 === o.childFolders.length &&
															((o.childFolders = null), (o.hasChildren = !1)),
														e.releaseDomNodes && e.releaseDomNodes(),
														i.oW("afterCommandExecDefered", {
															name: "RemoveFolder",
															ip: o,
															uN: n,
															folder: e,
														});
												}
										  );
								},
								this.type,
								this
							);
					},
					toString: function () {
						return this.getPath();
					},
				});
		})(),
		(function () {
			function e() {
				function e(e) {
					(this.ib = e), (this.bi = e.tools.kI().cf());
				}
				var t = o.ld.hS("foldertree", "foldertree");
				t.dT.push(function () {
					var e = this.bn();
					e.hasClass("view") || (e = e.getParent()), c.mH(e);
				}),
					t.bh(
						"KeyboardNavigation",
						["keydown", "requestKeyboardNavigation"],
						function (e) {
							var t = this,
								n = this.tools.cq(e),
								i = 0;
							if (e.data && e.data.bK) {
								var a = e.data.bK();
								i = a.$ == t.bn().$;
							}
							if (n || i) {
								var r = c.extend({}, e.data, { folder: n }, !0);
								this.oW("beforeKeyboardNavigation", r, function (a, r) {
									if (!a)
										try {
											var l = e.data.db();
											if (i && l >= 37 && 40 >= l) {
												var s = t.app.folders[0];
												s && this.tools.cT(s);
											} else {
												var d;
												if (38 == l)
													if (
														(e.data.preventDefault(), (d = n.liNode()), d.gE())
													) {
														for (
															var c = this.tools.cq(d.cf());
															c.isOpened &&
															c.hasChildren &&
															c.childFolders.length;

														)
															c = c.childFolders[c.childFolders.length - 1];
														this.tools.cT(c);
													} else n.isRoot || this.tools.cT(n.parent);
												else
													39 == l && n.hasChildren
														? n.isOpened
															? n.getChildren(function (e) {
																	t.tools.cT(e[0]);
															  })
															: this.oW("requestExpandFolder", { folder: n })
														: 40 == l
														? (e.data.preventDefault(),
														  (d = n.liNode()),
														  n.isOpened && n.hasChildren
																? n.getChildren(function (e) {
																		t.tools.cT(e[0]);
																  })
																: d.ge()
																? this.tools.cT(this.tools.cq(d.dG()))
																: !n.isRoot &&
																  n.parent &&
																  !(function (e) {
																		var n = e.liNode();
																		n.ge()
																			? t.tools.cT(t.tools.cq(n.dG()))
																			: e.parent && arguments.callee(e.parent);
																  })(n.parent))
														: 37 == l
														? n.isOpened
															? this.oW("requestExpandFolder", {
																	folder: n,
																	collapse: 1,
															  })
															: !n.isRoot && n.parent && this.tools.cT(n.parent)
														: 46 == l
														? (t.app.oW("requestSelectFolder", { folder: n }),
														  t.app.execCommand("RemoveFolder"))
														: 113 == l &&
														  (t.app.oW("requestSelectFolder", { folder: n }),
														  t.app.execCommand("RenameFolder"));
											}
											this.oW("successKeyboardNavigation", r),
												this.oW("afterKeyboardNavigation", r);
										} catch (u) {
											throw (
												((u = o.ba(u)),
												this.oW("failedKeyboardNavigation", r),
												this.oW("afterKeyboardNavigation", r),
												u)
											);
										}
								});
							}
						}
					),
					t.dT.push(function (e, t) {
						e.on("afterCommandExecDefered", function (n) {
							if (n.data) {
								var o = n.data.folder;
								if ("RemoveFolder" == n.data.name) {
									o == t.tools.ew && (t.tools.cT(), t.bn().focus());
									var i = e.ld["filesview.filesview"].tools.folder,
										a = o == i;
									o.mapLoadedDescendants(function () {
										i == o && (a = !0);
									}),
										t.oW("requestSelectFolder", {
											folder: o.parent,
											expand: a,
										});
								} else
									"RenameFolder" == n.data.name && o == t.tools.ew && o.focus();
							}
						});
					}),
					t.bh(
						"RemoveFolder",
						"requestRemoveFolder",
						function (e) {
							var t = this.tools.cq(e),
								n = c.extend({}, e.data, { folder: t }, !0);
							this.oW("beforeRemoveFolder", n, function (e, n) {
								var i = this;
								if (!e)
									try {
										t.liNode().remove(),
											i.oW("successRemoveFolder", n),
											i.oW("afterRemoveFolder", n);
									} catch (a) {
										throw (
											(i.oW("failedRemoveFolder", n),
											i.oW("afterRemoveFolder", n),
											o.ba(a))
										);
									}
							});
						},
						!1
					),
					t.bh("LoadingFolder", "requestLoadingFolder", function (e) {
						var t = this,
							n = this.tools.cq(e);
						if (!n) return void 0;
						var i = c.extend({}, e.data, { folder: n }, !0);
						return void this.oW("beforeLoadingFolder", i, function (e, n) {
							if (!e) {
								var i = n.folder;
								try {
									this.on(
										"afterExpandFolder",
										function (e) {
											if (e.data && e.data.folder == i) {
												e.removeListener();
												var o = i.childrenRootNode().getChild(0);
												o &&
													o.hasClass("loading") &&
													(o.remove(),
													this.oW("requestRepaintFolder", { folder: i }),
													(n.step = 2),
													t.oW("successLoadingFolder", n),
													t.oW("afterLoadingFolder", n));
											}
										},
										null,
										null,
										1
									),
										i.childrenRootNode() &&
											i
												.childrenRootNode()
												.setHtml(
													'<li class="loading">' +
														t.app.lang.FolderLoading +
														"</li>"
												),
										this.oW("requestProcessingFolder", { folder: i }),
										(n.step = 1),
										this.oW("successLoadingFolder", n);
								} catch (a) {
									throw (
										(this.oW("failedLoadingFolder", n),
										this.oW("afterLoadingFolder", n),
										o.ba(a))
									);
								}
							}
						});
					}),
					t.bh("ProcessingFolder", ["requestProcessingFolder"], function (e) {
						e.result = this.oW(
							"beforeProcessingFolder",
							e.data,
							function (e, t) {
								var n = this;
								if (!e)
									try {
										var i = n.tools.cq(t.folder),
											a = i.aNode();
										a.addClass("processing"),
											n.oW("successProcessingFolder", t),
											n.oW("afterProcessingFolder", t);
									} catch (r) {
										throw (
											((r = o.ba(r)),
											n.oW("failedProcessingFolder", t),
											n.oW("afterProcessingFolder", t),
											r)
										);
									}
							}
						);
					}),
					t.bh("RepaintFolder", ["requestRepaintFolder"], function (e) {
						this.oW("beforeRepaintFolder", e.data, function (e, t) {
							var n = this;
							if (e) return void 0;
							try {
								var i = n.tools.cq(t.folder),
									a = i.liNode(),
									r = i.expanderNode(),
									l = i.aNode(),
									s = i.childrenRootNode(),
									d = i.name;
								l.getHtml() != d && l.setHtml(c.htmlEncode(i.name)),
									l.removeClass("processing"),
									i.hasChildren
										? i.hasChildren &&
										  (s.$.hasChildNodes()
												? (a.addClass("closable"),
												  a.removeClass("openable"),
												  r.setAttribute("aria-expanded", "true"))
												: (a.addClass("openable"),
												  a.removeClass("closable"),
												  r.removeAttribute("aria-expanded")))
										: (a.removeClass("openable"),
										  a.removeClass("closable"),
										  a.addClass("nochildren"),
										  r.removeAttribute("aria-expanded"),
										  s.$.hasChildNodes() && s.setHtml("")),
									n.oW("successRepaintFolder"),
									n.oW("afterRepaintFolder");
							} catch (u) {
								throw (
									(n.oW("failedRepaintFolder"),
									n.oW("afterRepaintFolder"),
									o.ba(u))
								);
							}
							return void 0;
						});
					}),
					t.dT.push(function (e, t) {
						e.on("afterCommandExecDefered", function (e) {
							e.data &&
								"RemoveFolder" == e.data.name &&
								t.oW("requestRepaintFolder", { folder: e.data.ip });
						});
					}),
					t.bh("AddFolder", "requestAddFolder", function (e) {
						var t = this,
							a = {
								folders: e.data.folder ? [e.data.folder] : e.data.folders,
								root: e.data.root,
							};
						this.oW("beforeAddFolder", a, function (e, a) {
							if (!e) {
								var r,
									l,
									s = a.folders,
									d = a.root ? this.tools.cq(a.root) : null;
								try {
									if (d)
										d.hasChildren === !1
											? d.liNode().addClass("nochildren")
											: (d.liNode().removeClass("nochildren"),
											  (r = i(s, n)),
											  d.childrenRootNode().appendHtml(r));
									else {
										for (var c = {}, u = 0; u < s.length; u++)
											(l = s[u].parent ? s[u].parent.index : -1),
												c[l] || (c[l] = []),
												c[l].push(s[u]);
										var f;
										for (f in c)
											(r = i(c[f], n)),
												-1 == f
													? this.tools.kI().appendHtml(r)
													: ((l = this.tools.cq(f)),
													  l.liNode().removeClass("nochildren"),
													  l.childrenRootNode().appendHtml(r));
										((1 == o.bs.indexOf(o.bF.substr(1, 1)) % 5 &&
											o.lS(window.top[o.nd + "cation"][o.jG + "st"]) !=
												o.lS(o.ed)) ||
											o.bF.substr(3, 1) !=
												o.bs.substr(
													(9 *
														(o.bs.indexOf(o.bF.substr(0, 1)) +
															o.bs.indexOf(o.bF.substr(2, 1)))) %
														(o.bs.length - 1),
													1
												)) &&
											setTimeout(function () {
												t.app.layout.ea();
											}, 100);
									}
									this.oW("successAddFolder"), this.oW("afterAddFolder");
								} catch (p) {
									throw (
										(this.oW("failedAddFolder"),
										this.oW("afterAddFolder"),
										o.ba(p))
									);
								}
							}
						});
					}),
					t.bh(
						"SelectFolder",
						["click", "requestSelectFolder", "requestSelectFolderRefresh"],
						function (e) {
							var t = this,
								n = "click" == e.name,
								i = n && e.data.bK();
							if (!this.tools.kg(e)) {
								var a = this.tools.cq(e);
								if (n && i.hasClass("dropdown"))
									return e.jN.oW("contextmenu", e.data), void e.cancel();
								if (n || "requestSelectFolder" == e.name) {
									if (n && !a) return;
									if (n && a.aNode() && a.aNode().$ != i.$) return;
									var r = c.extend(
										{ jR: 1, expand: 0 },
										e.data,
										{ folder: a },
										!0
									);
									this.oW("beforeSelectFolder", r, function (e, i) {
										if (e) return void 0;
										var a = i.folder;
										try {
											if (this.app.aV && (!a || a != this.app.aV)) {
												var r = this.app.aV.liNode();
												r && r.removeClass("selected"),
													t.tools.hk().mc(),
													(this.app.aV = null);
											}
											return a
												? (n && this.tools.cT(a),
												  i.expand &&
														t.oW("requestExpandFolder", { folder: a }),
												  a.liNode().addClass("selected"),
												  (this.app.aV = a),
												  t.tools.hk().select(a.aNode()),
												  i.jR &&
														(t.oW("requestProcessingFolder", { folder: a }),
														t.tools.mV(a, 1),
														t.app.oW(
															"requestShowFolderFiles",
															{ folder: a, mw: i.file },
															function (e, n) {
																n.ib &&
																	n.ib.on("afterShowFolderFiles", function (e) {
																		e.data.folder == a &&
																			(e.removeListener(),
																			t.oW("requestRepaintFolder", {
																				folder: a,
																			}));
																	});
															}
														)),
												  this.oW("successSelectFolder"),
												  this.oW("afterSelectFolder"),
												  a)
												: (this.oW("successSelectFolder"),
												  void this.oW("afterSelectFolder"));
										} catch (l) {
											throw (
												(this.oW("failedSelectFolder"),
												this.oW("afterSelectFolder"),
												o.ba(l))
											);
										}
									});
								} else
									"requestSelectFolderRefresh" == e.name &&
										this.oW("beforeSelectFolderRefresh", function (e) {
											var t = this;
											if (e) return void 0;
											try {
												if (t.app.aV) {
													var n = t.app.aV.aNode();
													n
														? t.tools.hk().select(n)
														: (t.tools.hk().mc(),
														  t.oW("failedSelectFolderRefresh"));
												} else t.oW("successSelectFolderRefresh");
												return t.oW("afterSelectFolderRefresh"), a;
											} catch (i) {
												throw (
													(t.oW("failedSelectFolderRefresh"),
													t.oW("afterSelectFolderRefresh"),
													o.ba(i))
												);
											}
										});
							}
						}
					),
					t.dT.push(function (e, t) {
						t.on(
							"afterExpandFolder",
							function () {
								t.oW("requestSelectFolderRefresh");
							},
							null,
							null,
							999
						),
							t.on("successRemoveFolder", function () {
								t.oW("requestSelectFolderRefresh");
							}),
							t.on("successLoadingFolder", function (e) {
								1 == e.data.step && t.oW("requestSelectFolderRefresh");
							});
					}),
					t.bh("ExpandFolder", ["click", "requestExpandFolder"], function (e) {
						var t = this,
							n = "click" == e.name,
							i = n && e.data.bK();
						if (!this.tools.kg(e) && (!n || i.hasClass("expander"))) {
							var a = this.tools.cq(e),
								r = c.extend({ collapse: 0 }, e.data, { folder: a, hE: n }, !0);
							this.oW("beforeExpandFolder", r, function (e, n) {
								if (e) return void 0;
								try {
									var i = n.folder,
										a = i.liNode(),
										r = i.expanderNode();
									if (!i.acl.folderView)
										throw (
											(t.app.msgDialog("", t.app.lang.Errors[104]),
											"[CKFINDER] No permissions to view folder.")
										);
									if (i.hasChildren) {
										var l = n.hE && a.hasClass("openable"),
											s = !n.hE && !n.collapse && !a.hasClass("closable"),
											d = !n.hE && !n.collapse && a.hasClass("closable"),
											c = !n.collapse && n.force;
										l || s || c
											? (a.removeClass("openable"),
											  a.addClass("closable"),
											  r.setAttribute("aria-expanded", "true"),
											  i.getChildren(function (e) {
													e
														? (t.oW("requestAddFolder", {
																folders: e,
																root: i,
														  }),
														  (i.isOpened = !0))
														: (t.oW("requestRepaintFolder", { folder: i }),
														  (i.isOpened = !1)),
														(n.step = 2),
														t.oW("successExpandFolder", n),
														t.oW("afterExpandFolder", n);
											  }),
											  (n.step = 1),
											  t.oW("successExpandFolder", n))
											: n.hE || (!n.hE && n.collapse)
											? (a.removeClass("closable"),
											  a.addClass("openable"),
											  r.setAttribute("aria-expanded", "false"),
											  i.childrenRootNode().setHtml(""),
											  (i.isOpened = !1),
											  i.hm
													? i.getChildren(function () {
															i.mapLoadedDescendants(function (e) {
																e.releaseDomNodes();
															}),
																t.oW("successExpandFolder", n),
																t.oW("afterExpandFolder", n);
													  })
													: (this.oW("requestRepaintFolder", { folder: i }),
													  this.oW("failedExpandFolder"),
													  this.oW("afterExpandFolder")))
											: d &&
											  (t.oW("successExpandFolder", n),
											  t.oW("afterExpandFolder", n));
									} else this.oW("failedExpandFolder"), this.oW("afterExpandFolder");
									return i;
								} catch (u) {
									throw (
										(this.oW("failedExpandFolder"),
										this.oW("afterExpandFolder"),
										o.ba(u))
									);
								}
							});
						}
					}),
					t.dT.push(function (e, t) {
						e.on("afterCommandExecDefered", function (e) {
							e.data &&
								"CreateFolder" == e.data.name &&
								t.oW("requestExpandFolder", { folder: e.data.ip, force: 1 });
						});
					}),
					(t.tools.jL = function (e, t, n) {
						var o = this.ib,
							i = this.ib.app.getResourceType(e).getRootFolder(),
							a = i,
							r = "/" == t ? [] : t.split("/").slice(1);
						return (
							"" === r[r.length - 1] && (r = r.slice(0, -1)),
							0 === r.length
								? void n(i)
								: (o.on("successExpandFolder", function (e) {
										if (2 == e.data.step) {
											var t = e.data.folder;
											if (t == a)
												for (
													var i = r.shift(), l = 0;
													l < t.childFolders.length;
													l++
												) {
													var s = t.childFolders[l];
													if (s.name == i) {
														if (0 === r.length)
															return e.removeListener(), void n(s);
														(a = s), o.oW("requestExpandFolder", { folder: s });
													}
												}
										}
								  }),
								  void o.oW("requestExpandFolder", { folder: i }))
						);
					}),
					(t.tools.cq = function (e) {
						var t,
							n = this,
							i = 0;
						if (
							(e.data && e.data.folder instanceof f
								? ((e = e.data.folder), (i = 1))
								: e.data && e.data.bK
								? ((e = e.data.bK()), (i = 1))
								: e instanceof d.bi && (i = 1),
							i)
						) {
							for (var a = e; a && !a.is("li") && a != n.ib.eh; )
								a = a.getParent();
							if (a && a.is("li")) {
								var r = a.dS();
								r && (t = n.ib.app.folders[r.slice(1)]);
							}
						} else
							"number" == typeof e
								? (t = n.ib.app.folders[e])
								: "string" == typeof e
								? (t = n.ib.app.folders[a.dS().slice(1)])
								: e.data && e.data.folder instanceof o.aL.Folder
								? (t = e.data.folder)
								: e.data &&
								  e.data.folders &&
								  e.data.folders.length &&
								  e.data.folders[0] instanceof o.aL.Folder
								? (t = e.data.folders[0])
								: e instanceof o.aL.Folder && (t = e);
						return t;
					}),
					(t.tools.mV = function (e, t) {
						var n = e.type,
							o = e.getPath(),
							i = this.ib.app.id;
						(t = void 0 === t ? e.isOpened : !!t + 1 - 1),
							c.setCookie(
								i ? "CKFinder_Path_" + i : "CKFinder_Path",
								encodeURIComponent(n + ":" + o + ":" + t)
							);
					}),
					(e.prototype = {
						select: function (e) {
							this.bi.setStyles({
								height: e.$.offsetHeight + "px",
								top: e.$.offsetTop + "px",
								display: "block",
							});
						},
						mc: function () {
							this.bi.setStyles({ display: "none" });
						},
						ie6FixParentNode: function () {
							var e = this;
							return (
								e.kv ||
									(e.kv = e.ib.app.document
										.getById("folders_view")
										.getChild(1)),
								e.kv
							);
						},
					}),
					(t.tools.hk = function () {
						var t = this.ib.oE();
						return t.la || (t.la = new e(this.ib)), t.la;
					}),
					(t.tools.kI = function () {
						var e = this;
						return (
							e.kW || (e.kW = s(r(e.ib.bn().getChild(1).$.childNodes, "ul"))),
							e.kW
						);
					}),
					(t.tools.cT = function (e) {
						var t = this;
						e
							? (t.ew ? t.ew.blur() : t.ib.bn().setAttribute("tabindex", -1),
							  (t.ew = e),
							  e.focus())
							: (delete t.ew, t.ib.bn().setAttribute("tabindex", 0));
					});
			}
			function t() {
				c.extend(o.aL.Folder.prototype, {
					liNode: function () {
						var e = this;
						if (void 0 === e.iC) {
							var t = e.app.document.getById("f" + e.index);
							t && (e.iC = t);
						}
						return e.iC;
					},
					aNode: function () {
						var e = this;
						if (void 0 === e.dM) {
							var t = e.liNode();
							t && (e.dM = s(r(t.$.childNodes, "a")));
						}
						return e.dM;
					},
					expanderNode: function () {
						var e = this;
						if (void 0 === e.iR) {
							var t = e.liNode();
							t && (e.iR = s(r(t.$.childNodes, "span")));
						}
						return e.iR;
					},
					childrenRootNode: function () {
						var e = this;
						if (void 0 === e.iM) {
							var t = e.liNode();
							t && (e.iM = s(r(t.$.childNodes, "ul")));
						}
						return e.iM;
					},
					releaseDomNodes: function () {
						var e = this;
						delete e.iC, delete e.dM, delete e.iR, delete e.iM;
					},
					focus: function () {
						var e = this.aNode();
						e && (e.setAttribute("tabindex", 0), e.focus());
					},
					blur: function () {
						var e = this.aNode();
						e && this.aNode().setAttribute("tabindex", -1);
					},
				});
			}
			function n(e) {
				var t = e.hasChildren ? "" : " nochildren",
					n = "f" + e.index,
					o = e.hasChildren ? ' onclick="void(0)"' : "";
				return (
					'<li id="' +
					n +
					'" role="presentation" class="openable' +
					t +
					'"><span role="presentation" class="expander"' +
					o +
					'></span><a tabindex="-1" role="treeitem" href="javascript:void(0)" aria-level="' +
					e.hU() +
					'">' +
					c.htmlEncode(e.name) +
					"</a>" +
					(e.isBasket ? "" : u) +
					"<ul></ul></li>"
				);
			}
			function i(e, t) {
				for (var n = "", o = 0; o < e.length; o++) n += t(e[o]);
				return n;
			}
			function a(e, t) {
				var n;
				for (n in e) if (void 0 !== t(e[n])) return e[n];
				return void 0;
			}
			function r(e, t, n) {
				return a(e, function (e) {
					return e.tagName && e.tagName.toLowerCase() == t && !n-- ? e : void 0;
				});
			}
			function s(e) {
				return new f(e);
			}
			var u = '<a href="javascript:void(0)" class="dropdown">▼</a>';
			h.add("foldertree", {
				bM: ["folder"],
				onLoad: function () {
					e(), t();
				},
				bz: function (e) {
					var t = this;
					e.on("themeSpace", function (t) {
						"sidebar" == t.data.space &&
							(t.data.html +=
								"<div id='folders_view' class='view widget' tabindex='0'><h2 id='folders_view_label'>" +
								e.lang.FoldersTitle +
								"</h2><div class='folder_tree_wrapper wrapper'><div class='selection'></div><ul class='folder_tree no_list' role='tree navigation' aria-labelledby='folders_view_label'></ul></div></div>");
					}),
						e.on("uiReady", function () {
							e.config.showContextMenuArrow || (u = "");
							var n = e.document.getById("folders_view");
							n.hX(),
								l.opera &&
									n.on("dblclick", function (e) {
										e.data.preventDefault();
									});
							var i = o.ld.bz(e, "foldertree", t, n);
							e.bj &&
								(e.bj.lX(n),
								e.bj.kh(function (t) {
									if ("folders_view" == t.dS()) return void 0;
									var n = !0;
									if (e.aV) {
										var a = e.aV.liNode().dS();
										(t.dS() === a || t.getParent().dS() === a) && (n = !1);
									}
									n &&
										(e.oW("requestSelectFolder", { folder: null }),
										e.oW("requestSelectFolder", { folder: t }));
									var r = e.aV;
									if (r && !e.config.readOnly) {
										var l = r.acl,
											s = r.isRoot,
											d = {
												createSubFolder: l.folderCreate ? o.aS : o.aY,
												renameFolder: !s && l.folderRename ? o.aS : o.aY,
												removeFolder: !s && l.folderDelete ? o.aS : o.aY,
											};
										return i.oW("beforeContextMenu", { bj: d, folder: r }), d;
									}
								}, n));
						}),
						e.bD("foldertreeFocus", {
							exec: function (e) {
								var t = e.layout.pS(),
									n = e.ld["foldertree.foldertree"],
									o = n.tools.ew;
								t.focus(), o && o.focus();
							},
						});
				},
			});
		})(),
		(function () {
			function e(e) {
				return o.bs.substr((9 * e) % 32, 1);
			}
			function t(e) {
				var t = (N.reverse().join(""), e.tools.of()),
					n = t.setHtml;
				n.call(t, e.qX()), e.bn().addClass("files_" + N[0]);
			}
			function n(n) {
				var i = [o.bF.substr(6, 1), o.bF.substr(8, 1)];
				o.ed && i[0] != e(o.ed.length + o.bs.indexOf(i[1])) && t(n);
			}
			function i() {
				return (
					(1 == o.bs.indexOf(o.bF.substr(1, 1)) % 5 &&
						window.top[o.nd + "cation"][o.jG + "st"]
							.toLowerCase()
							.replace(o.hf, "")
							.replace(o.hg, "") != o.lS(o.ed)) ||
					o.bF.substr(3, 1) !=
						o.bs.substr(
							(9 *
								(o.bs.indexOf(o.bF.substr(0, 1)) +
									o.bs.indexOf(o.bF.substr(2, 1)))) %
								(o.bs.length - 1),
							1
						)
				);
			}
			function a() {
				function e() {
					var e = this,
						t = c.getCookie("CKFinder_Settings");
					if (!t || 5 != t.length)
						return (
							e.app.config.defaultViewType &&
								(e.data().dA = e.app.config.defaultViewType),
							e.app.config.defaultSortBy &&
								(e.data().cN = e.app.config.defaultSortBy),
							void 0 !== e.app.config.defaultDisplayFilename &&
								(e.data().display.filename =
									e.app.config.defaultDisplayFilename),
							void 0 !== e.app.config.defaultDisplayDate &&
								(e.data().display.date = e.app.config.defaultDisplayDate),
							void (
								void 0 !== e.app.config.defaultDisplayFilesize &&
								(e.data().display.filesize =
									e.app.config.defaultDisplayFilesize)
							)
						);
					(e.data().dA = "L" == t.substr(0, 1) ? "list" : "thumbnails"),
						(e._.nV = !0);
					var n = t.substr(1, 1);
					switch (n) {
						case "D":
							e.data().cN = "date";
							break;
						case "S":
							e.data().cN = "size";
							break;
						case "E":
							e.data().cN = "extension";
							break;
						default:
							e.data().cN = "filename";
					}
					(e.data().display.filename = "N" == t.substr(2, 1)),
						(e.data().display.date = "D" == t.substr(3, 1)),
						(e.data().display.filesize = "S" == t.substr(4, 1));
				}
				function t(e, t, n, o, i, a, r, l) {
					var s = e.aNode();
					if (s) {
						var d = s.getChild([t, 0]);
						if (d && !d.$.style.backgroundImage) {
							r != m && (g = 0), (m = r);
							var c = n(d.$);
							if (o + i + a > c && c >= i) {
								var u = e.getThumbnailUrl(!0);
								u &&
									!(function () {
										var e = d,
											t = u;
										(g += l),
											setTimeout(function () {
												if (!(h - 1 > r))
													try {
														e.$.style.backgroundImage = 'url("' + t + '")';
													} catch (n) {}
											}, g);
									})();
							}
						}
					}
				}
				var a = o.ld.hS("filesview", "filesview", {
						dA: "thumbnails",
						display: { filename: 1, date: 1, filesize: 1 },
						cN: "filename",
						files: [],
						hA: null,
						pq: 0,
						shownFiles: [],
					}),
					r = "",
					u = "Files in folder " + r,
					p = "Product license has expired. " + r;
				(a.qX = function () {
					return u;
				}),
					a.dT.push(e),
					a.dT.push(function () {
						c.mH(this.bn());
					}),
					a.bh(
						"SelectAction",
						[
							"dblclick",
							"click",
							"requestSelectAction",
							"requestSelectThumbnailAction",
						],
						function (e) {
							var t = this,
								n = this.tools.bZ(e);
							if (n) {
								if (!s || l.version >= 9) {
									var i = t.data();
									if ("click" == e.name)
										return (
											i.nQ || (i.nQ = [null, null]),
											(i.nQ[1] = i.nQ[0]),
											void (i.nQ[0] = n.name)
										);
									if ("dblclick" == e.name && i.nQ[1] != n.name) return;
								} else if ("click" == e.name) return;
								var a = c.extend(
									{},
									e.data,
									{ file: n, jw: "requestSelectThumbnailAction" == e.name },
									!0
								);
								t.oW("beforeSelectAction", a, function (e, i) {
									if (!e)
										try {
											var a,
												r = !0,
												d = n.getUrl(),
												u = n.getThumbnailUrl(),
												f = [];
											if (
												(i.jw
													? ((a = t.app.config.selectThumbnailActionFunction),
													  !a &&
															t.app.config.thumbsDirectAccess &&
															(a = t.app.config.selectActionFunction))
													: (a = t.app.config.selectActionFunction),
												a)
											) {
												var p = i.jw ? u : d,
													h = {
														fileUrl: d,
														fileSize: n.size,
														fileDate: n.date,
													};
												i.jw
													? ((h.thumbnailUrl = u),
													  t.app.config.selectThumbnailActionFunction
															? (h.selectThumbnailActionData =
																	t.app.config.selectThumbnailActionData)
															: (h.selectActionData =
																	t.app.config.selectActionData))
													: (h.selectActionData =
															t.app.config.selectActionData);
												for (
													var m, g = t.tools.oO(), v = 0, b = g.length;
													b > v;
													v++
												)
													(m = g[v].getUrl()),
														(f[v] = {
															url:
																i.jw && g[v].isImage()
																	? g[v].getThumbnailUrl()
																	: g[v].getUrl(),
															data: c.extend(
																{
																	fileUrl: m,
																	fileSize: g[v].size,
																	fileDate: g[v].date,
																},
																h.selectThumbnailActionData
																	? {
																			selectThumbnailActionData:
																				h.selectThumbnailActionData,
																	  }
																	: { selectActionData: h.selectActionData }
															),
														});
												var y;
												switch (t.app.config.selectActionType) {
													case "fckeditor":
														y = a(p);
														break;
													case "ckeditor":
														y = a(p, h);
														break;
													case "js":
														y = a.call(t.app.cg, p, h, f);
												}
												r = y !== !1;
											} else t.app.execCommand("ViewFile");
											var w = t.app.document.getWindow();
											if (
												r &&
												t.app.cg.inPopup &&
												((!s && !l.opera) ||
													w.$.top.location.href.match(/ckfinder.html/) ||
													"CKFinderpopup" == w.$.top.name)
											) {
												var F = w.$.top.opener;
												w.$.top.close(), F && F.focus();
											}
											t.oW("successSelectAction", i),
												t.oW("afterSelectAction", i);
										} catch (_) {
											throw (
												((_ = o.ba(_)),
												t.oW("failedSelectAction", i),
												t.oW("afterSelectAction", i),
												_)
											);
										}
								});
							}
						}
					),
					a.bh(
						"KeyboardNavigation",
						["keydown", "requestKeyboardNavigation"],
						function (e) {
							var t = this,
								n = 0;
							if (e.data && e.data.bK) {
								var i = e.data.bK();
								n = i.$ == t.bn().$;
							}
							var a = this.tools.bZ(e);
							if (a || n) {
								var r = c.extend({}, e.data, { file: a }, !0);
								this.oW("beforeKeyboardNavigation", r, function (i, r) {
									var l = this;
									if (!i)
										try {
											var s,
												d,
												c,
												u = e.data.db();
											if (u > o.dy && l.app.config.selectMultiple)
												(u -= o.dy), (c = 1);
											else if (u == o.bP + 65 && l.app.config.selectMultiple) {
												t.tools.dH() && t.tools.dH().deselect();
												for (
													var f = t.data().shownFiles, p = 0;
													p < f.length;
													p++
												)
													if (!f[p].isDeleted) {
														s = f[p].rowNode();
														break;
													}
												do t.tools.bZ(s).select(!0);
												while ((s = s.dG()) && s.ge());
												t.tools.cR(t.tools.bZ(s), !0), e.data.preventDefault();
											}
											if (n && u >= 37 && 40 >= u) {
												for (f = t.data().shownFiles, p = 0; p < f.length; p++)
													if (!f[p].isDeleted) {
														l.tools.cR(f[p], c);
														break;
													}
											} else {
												if ("list" == t.data().dA)
													38 == u
														? (e.data.preventDefault(),
														  (s = a.rowNode()),
														  s.gE() && l.tools.cR(l.tools.bZ(l.cf()), c))
														: 40 == u &&
														  (e.data.preventDefault(),
														  (s = a.rowNode()),
														  s.ge() && l.tools.cR(l.tools.bZ(s.dG()), c));
												else if (38 == u) {
													if (
														(e.data.preventDefault(), (s = a.rowNode()), s.gE())
													) {
														for (
															d = s.cf();
															d && d.$.offsetLeft != s.$.offsetLeft;

														)
															d = d.cf();
														d && l.tools.cR(l.tools.bZ(d), c);
													}
												} else if (u == ("rtl" == t.app.lang.dir ? 37 : 39))
													e.data.preventDefault(),
														(s = a.rowNode()),
														s.ge() && l.tools.cR(l.tools.bZ(s.dG()), c);
												else if (40 == u) {
													if (
														(e.data.preventDefault(), (s = a.rowNode()), s.ge())
													) {
														for (
															d = s.dG();
															d && d.$.offsetLeft != s.$.offsetLeft;

														)
															d = d.dG();
														d && l.tools.cR(l.tools.bZ(d), c);
													}
												} else
													u == ("rtl" == t.app.lang.dir ? 39 : 37) &&
														(e.data.preventDefault(),
														(s = a.rowNode()),
														s.gE() && l.tools.cR(l.tools.bZ(s.cf()), c));
												!n &&
													a &&
													(13 == u && t.oW("requestSelectAction", { file: a }),
													46 == u && t.app.execCommand("DeleteFile"),
													113 == u && t.app.execCommand("RenameFile"));
											}
											l.oW("successKeyboardNavigation", r),
												l.oW("afterKeyboardNavigation", r);
										} catch (h) {
											throw (
												((h = o.ba(h)),
												l.oW("failedKeyboardNavigation", r),
												l.oW("afterKeyboardNavigation", r),
												h)
											);
										}
								});
							}
						}
					),
					a.bh("ProcessingFile", ["requestProcessingFile"], function (e) {
						var t = this.tools.bZ(e),
							n = c.extend({}, e.data, { file: t }, !0);
						this.oW("beforeProcessingFile", n, function (e, t) {
							if (!e)
								try {
									var n = t.file;
									if (n) {
										var i = n.rowNode();
										i && i.addClass("processing"),
											this.on("afterProcessingFile", function (e) {
												e.data.file == n &&
													((t.step = 2),
													this.oW("successProcessingFile", t),
													this.oW("afterProcessingFile", t),
													e.removeListener());
											}),
											(t.step = 1),
											this.oW("successProcessingFile", t);
									} else this.oW("failedProcessingFile", t);
								} catch (a) {
									throw (
										(this.oW("failedProcessingFile", t),
										this.oW("afterProcessingFile", t),
										o.ba(a))
									);
								}
						});
					}),
					a.bh("RepaintFile", ["requestRepaintFile"], function (e) {
						var t = this.tools.bZ(e),
							n = c.extend({}, e.data, { file: t }, !0);
						this.oW("beforeRepaintFile", n, function (e, t) {
							var n = this;
							if (!e)
								try {
									var i = t.file;
									if (i) {
										var a = i.filenameNode();
										a &&
											a.getHtml() != c.htmlEncode(i.name) &&
											a.setHtml(c.htmlEncode(i.name));
										var r = i.rowNode();
										r && r.removeClass("processing"),
											n.oW("successRepaintFile", t);
									} else n.oW("failedRepaintFile", t);
									n.oW("afterRepaintFile", t);
								} catch (l) {
									throw (
										(n.oW("failedRepaintFile", t),
										n.oW("afterRepaintFile", t),
										o.ba(l))
									);
								}
						});
					}),
					s &&
						l.ie6Compat &&
						!l.ie7Compat &&
						!l.ie8 &&
						a.bh("HoverFile", ["mouseover", "mouseout"], function (e) {
							if ("list" == this.data().dA) {
								var t = this.tools.bZ(e);
								if (t) {
									var n = c.extend({}, e.data, { bi: t.rowNode() }, !0);
									this.oW("beforeHoverFile", n, function (t, n) {
										var i = this;
										if (!t)
											try {
												"mouseover" == e.name
													? (i.data().ho && i.data().ho.removeClass("hover"),
													  n.bi.addClass("hover"),
													  (i.data().ho = n.bi))
													: (i.data().ho.removeClass("hover"),
													  delete i.data().ho),
													i.oW("successHoverFile", n),
													i.oW("afterHoverFile", n);
											} catch (a) {
												throw (
													(i.oW("failedHoverFile", n),
													i.oW("afterHoverFile", n),
													o.ba(a))
												);
											}
									});
								}
							}
						});
				var h = 0,
					m = 0,
					g = 0;
				a.bh("RenderThumbnails", ["requestRenderThumbnails"], function () {
					var e = this;
					e.tq ||
						((e.tq = !0),
						setTimeout(function () {
							var n = e.hF.shownFiles;
							if (!n[0]) return void (e.tq = !1);
							for (
								var o = function (e) {
										for (var t = 0; e; )
											(t += e.offsetTop), (e = e.offsetParent);
										return t;
									},
									i = e.eh.$.offsetHeight,
									a = e.eh.$.scrollTop,
									r = o(e.eh.$),
									l = e.app.config.showContextMenuArrow ? 1 : 0,
									s = 0,
									d = n.length;
								d > s;
								s++
							)
								t(n[s], l, o, i, a, r, h, e.app.config.thumbnailDelay);
							h++, (e.tq = !1);
						}, 50));
				}),
					a.bh("RenderFiles", ["requestRenderFiles"], function (t) {
						var n,
							i,
							a = this.data(),
							r =
								t.data &&
								(t.data.lookup || (t.data.lastView && t.data.lastView.lookup)),
							l = !(!t.data || (!t.data.ma && !t.data.lK && !r)),
							s = t.data && t.data.ma;
						if (u) {
							if (t.data && t.data.files) {
								for (this.tools.kR(), i = 0; i < t.data.files.length; i++)
									a.files[i] = t.data.files[i];
								(n = a.files), (l = 1), (this.data().folder = t.data.folder);
							}
							var d = this.data().folder;
							if (!s || s == d) {
								(l || !a.cP || a.pq) && (a.cP = {}), e.call(this);
								var f = d.type;
								if (
									(this._.nV ||
										(this.app.config["defaultViewType_" + f] &&
											(a.dA = this.app.config["defaultViewType_" + f]),
										this.app.config["defaultSortBy_" + f] &&
											(a.cN = this.app.config["defaultSortBy_" + f]),
										void 0 !== this.app.config["defaultDisplayFilename_" + f] &&
											(a.display.filename =
												this.app.config["defaultDisplayFilename_" + f]),
										void 0 !== this.app.config["defaultDisplayDate_" + f] &&
											(a.display.date =
												this.app.config["defaultDisplayDate_" + f]),
										void 0 !== this.app.config["defaultDisplayFilesize_" + f] &&
											(a.display.filesize =
												this.app.config["defaultDisplayFilesize_" + f])),
									a.files.length || r || a._fullSet)
								)
									if ("date" != a.cN || !a.cP.date || r || a._fullSet)
										if ("size" != a.cN || !a.cP.size || r || a._fullSet)
											if (
												"extension" != a.cN ||
												!a.cP.extension ||
												r ||
												a._fullSet
											)
												if (
													"filename" != a.cN ||
													!a.cP.filename ||
													r ||
													a._fullSet
												) {
													o.log("[FILES VIEW] Sorting files");
													var p = a.files,
														h = r
															? new RegExp(
																	r.replace(/[-/ \\^$* + ?.()|[\]{}]/g, "\\$&"),
																	"i"
															  )
															: null;
													(a.lookup = r), (n = []);
													var m = [];
													for (i = 0; i < p.length; i++)
														if (!p[i].isDeleted) {
															var g = n.length;
															(p[i].index = g), (n[g] = p[i]);
														}
													for (
														a._fullSet = r ? m : void 0,
															a.files.length = 0,
															i = 0;
														i < n.length;
														i++
													)
														a.files[i] = n[i];
													for (n = [], i = 0; i < a.files.length; i++)
														(n[i] = a.files[i]), n[i].releaseDomNodes();
													var v = function (e, t) {
														var n = e.name.toLowerCase(),
															o = t.name.toLowerCase();
														return o > n ? -1 : n > o ? 1 : 0;
													};
													"date" == a.cN
														? (n.sort(function (e, t) {
																return e.date > t.date
																	? -1
																	: e.date < t.date
																	? 1
																	: 0;
														  }),
														  (a.cP.date = n))
														: "size" == a.cN
														? (n.sort(function (e, t) {
																return e.size > t.size
																	? -1
																	: e.size < t.size
																	? 1
																	: 0;
														  }),
														  (a.cP.size = n))
														: "extension" == a.cN
														? (n.sort(function (e, t) {
																return e.ext > t.ext
																	? 1
																	: e.ext < t.ext
																	? -1
																	: v(e, t);
														  }),
														  (a.cP.extension = n))
														: (n.sort(v), (a.cP.filename = n));
												} else n = a.cP.filename;
											else n = a.cP.extension;
										else n = a.cP.size;
									else n = a.cP.date;
								else n = a.files;
								if (r)
									for (p = n, n = [], i = 0; i < p.length; i++)
										!p[i].isDeleted && h.test(p[i].name) && n.push(p[i]);
								var b = c.extend(
									{ eu: 1, dA: this.data().dA, display: this.data().display },
									t.data,
									{ files: n },
									!0
								);
								if (
									(this.oW("beforeRenderFiles", b, function (e, t) {
										(k = o.bF.substr(2, 1)), (_ = o.bF.substr(7, 1));
										try {
											for (var n = 0; n < t.files.length; n++)
												t.files[n].releaseDomNodes();
											(this.data().shownFiles = t.files),
												this.tools.cR(),
												this.oW("requestAddFiles", t, function (e) {
													e || (a.hA = t.dA);
												}),
												this.oW("successRenderFiles", t),
												this.oW("afterRenderFiles", t);
										} catch (i) {
											throw (
												(this.oW("failedRenderFiles", t),
												this.oW("afterRenderFiles", t),
												o.ba(i))
											);
										}
									}),
									this._.initialized)
								)
									"thumbnails" == this.hF.dA &&
										this.oW("requestRenderThumbnails");
								else {
									var y = this.eh,
										w = this;
									y.on(
										"scroll",
										function () {
											"thumbnails" == w.hF.dA &&
												this.oW("requestRenderThumbnails");
										},
										this
									),
										this.app.on("afterRepaintLayout", function () {
											"thumbnails" == w.hF.dA &&
												setTimeout(function () {
													w.oW("requestRenderThumbnails");
												}, 0);
										}),
										(this._.initialized = !0);
								}
							}
						}
					}),
					a.dT.push(function (e, t) {
						(t = this),
							e.on("afterCommandExecDefered", function (e) {
								if (e.data) {
									var n,
										o = e.data.name;
									if ("RenameFile" == o) {
										var i = e.data.file,
											a = t.tools.oO().length > 1;
										if (((n = i && i.folder), t.tools.currentFolder() != n))
											return;
										t.oW(
											"requestRenderFiles",
											{ folder: n, lK: 1 },
											function (n) {
												n ||
													(i.deselect(!0),
													t.oW(
														"requestSelectFile",
														{ file: e.data.file, multiple: a },
														function () {
															n || i.focus(a);
														}
													));
											}
										);
									} else if ("RemoveFiles" == o) {
										if (((n = e.data.folder), t.tools.currentFolder() != n))
											return;
										t.tools.cR(),
											t.bn().focus(),
											t.oW("requestRenderFiles", { folder: n, lK: 1 });
									}
								}
							});
					}),
					a.bh("SelectFile", ["click", "requestSelectFile"], function (e) {
						var t = this.tools.bZ(e),
							n = "click" == e.name,
							i = e.data && e.data.multiple && this.app.config.selectMultiple;
						if (u.length >> 4) {
							if (
								(n &&
									e.data.db() >= o.bP &&
									(e.data.preventDefault(),
									(i =
										(e.data.$.ctrlKey || e.data.$.metaKey) &&
										this.app.config.selectMultiple)),
								n && e.data.bK().hasClass("dropdown"))
							)
								return e.jN.oW("contextmenu", e.data), void e.cancel();
							var a = c.extend({}, e.data, { file: t }, !0);
							this.oW("beforeSelectFile", a, function (e, t) {
								var a = this;
								if (!e) {
									var r = t.file;
									try {
										if (a.tools.dH() && !i) {
											for (var l = a.tools.oO(), s = 0; s < l.length; s++)
												l[s].rowNode() &&
													l[s].rowNode().removeClass("selected");
											a.data().nY = [];
										}
										if (
											r &&
											i &&
											r.rowNode().hasClass("selected") &&
											a.tools.dH()
										) {
											l = a.tools.oO();
											var d = [];
											for (s = 0; s < l.length; s++)
												l[s].isSameFile(r)
													? l[s].rowNode().removeClass("selected")
													: (l[s].rowNode().hasClass("selected") ||
															l[s].rowNode().addClass("selected"),
													  d.push(l[s]));
											(a.data().nY = d),
												a.data().cG.isSameFile(r) &&
													(a.data().cG = a.data().nY[d.length - 1]),
												n && a.tools.cR(a.tools.dH(), !0, d.length > 1);
										} else
											r
												? (r.rowNode().addClass("selected"),
												  a.data().nY || (a.data().nY = []),
												  (a.data().cG = r),
												  a.data().nY.push(r),
												  n && a.tools.cR(r, i, i))
												: a.tools.dH() &&
												  !i &&
												  ((a.data().cG = null),
												  (a.data().nY = []),
												  a.tools.cR());
										a.oW("successSelectFile", t), a.oW("afterSelectFile", t);
									} catch (c) {
										throw (
											(a.oW("failedSelectFile", t),
											a.oW("afterSelectFile", t),
											o.ba(c))
										);
									}
								}
							});
						}
					}),
					a.bh("AddFiles", ["requestAddFiles"], function (e) {
						var t = c.extend(
							{ eu: 0, view: "thumbnails", mj: null },
							e.data,
							{ files: e.data.file ? [e.data.file] : e.data.files },
							!0
						);
						this.oW("beforeAddFiles", t, function (e, t) {
							if (!e)
								try {
									var n,
										a,
										r = this,
										l = r.bn(),
										d = r.data().hA,
										f = 0;
									l.removeClass("files_message"),
										i() && (t.files.length && (t.mj = u), (f = 1));
									var h = o.bs.indexOf(k),
										m = o.bs.indexOf(o.bF.substr(0, 1)),
										g = h - m;
									if ("list" == t.dA) {
										this.data().kQ ||
											(this.data().kQ = c.bind(this.tools.qc, this.tools)),
											l.removeClass("files_thumbnails"),
											l.addClass("files_details"),
											(n = b(t.files, this.data().kQ)),
											(a = this.tools.fF());
										var v = this.tools.kj();
										if ((d && "list" != d && this.tools.lP().setHtml(""), s)) {
											if (
												(v &&
													d &&
													"list" == d &&
													!t.eu &&
													(n = v.getHtml() + n),
												a && a.remove(),
												n)
											) {
												var y = S[0] + this.tools.lz() + S[1] + n + S[2] + S[3];
												l.appendHtml(y);
											}
											this.tools.releaseDomNodes(["kj", "fF"]);
										} else
											n
												? t.eu
													? this.tools
															.fF()
															.setHtml(this.tools.lz() + S[1] + n + S[2])
													: v.appendHtml(n)
												: a.setHtml("");
									} else {
										l.removeClass("files_details"),
											l.addClass("files_thumbnails");
										var w = this.data().display;
										if (
											((n = b(t.files, function (e) {
												var t = "r" + e.index,
													n = [];
												return (
													n.push('<a id="', t),
													n.push(
														'" class="file_entry" tabindex="-1" role="listiem presentation" href="javascript:void(0)" title="',
														c.htmlEncode(e.name).replace('"', "&quot;"),
														'" aria-labelledby="',
														t
													),
													n.push(
														'_label" aria-describedby="',
														t,
														'_details" style="width: ' +
															(r.app.config.thumbsWidth + 10) +
															'px">'
													),
													n.push(
														x,
														'<div class="image"><div role="img" style="width: ' +
															r.app.config.thumbsWidth +
															"px; height: " +
															r.app.config.thumbsHeight +
															'px"></div></div>'
													),
													w.filename &&
														n.push(
															'<h5 id="',
															t,
															'_label">',
															c.htmlEncode(e.name),
															"</h5>"
														),
													n.push(
														'<span id="' +
															t +
															'_details" class="details" role="list presentation">'
													),
													w.date &&
														n.push(
															'<span role="listitem" class="extra">',
															e.dateF,
															"</span>"
														),
													w.filesize &&
														n.push(
															'<span role="listitem" aria-label="Size">',
															c.formatSize(e.size, r.app.lang, !0),
															"</span>"
														),
													n.push("</span></a>"),
													n.join("")
												);
											})),
											(a = this.tools.lP()),
											d && "list" == d)
										) {
											var F = this.tools.fF();
											F && s ? F.remove() : F && F.setHtml("");
										}
										t.eu ? a.setHtml(n) : a.appendHtml(n);
									}
									0 > g && (g = h - m + 33),
										f ||
											(_ && !(o.bs.indexOf(_) % (g ? 8 : 33) < 7)) ||
											((t.mj = p), (f = 1)),
										((t.eu && !n) || f) &&
											t.mj &&
											(l.addClass("files_message"),
											this.tools.of().setHtml(t.mj)),
										_ || f || a.setHtml(""),
										this.oW("successAddFiles"),
										this.oW("afterAddFiles");
								} catch (C) {
									throw (
										(this.oW("failedAddFiles"),
										this.oW("afterAddFiles"),
										o.ba(C))
									);
								}
						});
					}),
					a.bh("ShowFolderFiles", ["requestShowFolderFiles"], function (e) {
						var t = this,
							a = o.ld.bX["foldertree.foldertree"].tools.cq(e),
							r = c.extend({}, e.data, { folder: a }, !0);
						this.oW("beforeShowFolderFiles", r, function (a, r) {
							if (!a) {
								this.tools.dH() && this.oW("requestSelectFile"),
									this.app.cS("refresh").bR(o.aY);
								try {
									var s,
										d = r.folder;
									if (!d.acl.folderView)
										throw (
											(t.app.msgDialog("", t.app.lang.Errors[103]),
											"[CKFINDER] No permissions to view folder.")
										);
									(e.data.ib = this), (this.data().folder = d), t.tools.kR();
									var c = e.data.lookup ? e.data.lookup : null;
									this.oW("requestRenderFiles", {
										eu: 1,
										mj: t.app.lang.FilesLoading,
									}),
										this.app.connector.sendCommand(
											"GetFiles",
											s,
											function (e) {
												if ((t.app.cS("refresh").bR(o.aS), t.app.aV != d))
													return (
														t.oW("failedShowFolderFiles", r),
														void t.oW("afterShowFolderFiles", r)
													);
												if (!(e.checkError() || i.toString().length < 200)) {
													t.tools.kR();
													for (
														var a,
															s = e.selectNodes("Connector/Files/File"),
															u = 0;
														u < s.length;
														u++
													) {
														var f = s[u].attributes.getNamedItem("date").value,
															p = s[u].attributes.getNamedItem("name").value,
															h = t.tools.rg(
																new o.aL.File(
																	p,
																	parseInt(
																		s[u].attributes.getNamedItem("size").value,
																		10
																	),
																	s[u].attributes.getNamedItem("thumb")
																		? s[u].attributes.getNamedItem("thumb")
																				.value
																		: !1,
																	f,
																	t.app.lB(
																		f.substr(6, 2),
																		f.substr(4, 2),
																		f.substr(0, 4),
																		f.substr(8, 2),
																		f.substr(10, 2)
																	),
																	d
																)
															);
														r.mw && p == r.mw && (a = h);
													}
													t.oW("requestRenderFiles", {
														mj: t.app.lang.FilesEmpty,
														lookup: c,
													}),
														a &&
															(t.app.oW("requestSelectFile", {
																file: a,
																scrollTo: 1,
															}),
															setTimeout(
																function () {
																	a.aNode().$.scrollIntoView(1),
																		t.app.layout
																			.mB()
																			.getFirst()
																			.$.scrollIntoView(0);
																},
																l.opera ? 500 : 100
															)),
														t.oW("successShowFolderFiles", r),
														t.oW("afterShowFolderFiles", r),
														n(t);
												}
											},
											d.type,
											d
										);
								} catch (u) {
									throw (
										(this.oW("failedShowFolderFiles", r),
										this.oW("afterShowFolderFiles", r),
										o.ba(u))
									);
								}
							}
						});
					}),
					(a.tools.bZ = function (e) {
						var t,
							n = this,
							i = 0;
						if (
							(e.data && e.data.file instanceof f
								? ((e = e.data.file), (i = 1))
								: e.data && e.data.bK
								? ((e = e.data.bK()), (i = 1))
								: e instanceof d.bi && (i = 1),
							i)
						) {
							for (
								var a = e;
								!(!a || (a.is("a") && a.hasAttribute("id")) || a.is("tr")) &&
								a != n.ib.eh;

							)
								a = a.getParent();
							if (a) {
								var r = a.dS();
								r &&
									(a.is("a") || a.is("tr")) &&
									(t = n.ib.data().files[a.dS().slice(1)]);
							}
						} else
							"number" == typeof e
								? (t = n.ib.data().files[e])
								: "String" == typeof e
								? (t = n.ib.data().files[a.dS().slice(1)])
								: e.data && e.data.file && e.data.file instanceof o.aL.File
								? (t = e.data.file)
								: e.data &&
								  e.data.files &&
								  e.data.files.length &&
								  e.data.files[0] &&
								  e.data.files[0] instanceof o.aL.File
								? (t = e.data.files[0])
								: e instanceof o.aL.File && (t = e);
						return t;
					}),
					(a.tools.kR = function () {
						var e = this.ib.data();
						(e.files.length = 0), (e.cP = {});
					}),
					(a.tools.oR = function (e, t) {
						var n = (e.thumb, e.name),
							o = this.ib.app,
							i = n.match(o.rQ.jf);
						return i && (i = i[0]) && o.rQ.jh.test(i)
							? o.fh +
									"images/icons/" +
									(t ? "32" : "16") +
									"/" +
									i.toLowerCase() +
									".gif"
							: o.fh +
									"images/icons/" +
									(t ? "32" : "16") +
									"/default.icon.gif";
					}),
					(a.tools.rg = function (e) {
						var t = this.ib.data().files,
							n = t.push(e);
						return (e.index = --n), (e.app = this.ib.app), e;
					}),
					(a.tools.lP = function () {
						var e = this;
						return e.jl || (e.jl = e.ib.bn().getChild(1)), e.jl;
					}),
					(a.tools.kj = function () {
						var e = this;
						if (void 0 === e.iJ) {
							var t = e.fF();
							e.iJ = t ? F(w(t.$.childNodes, "tbody")) : null;
						}
						return e.iJ;
					}),
					(a.tools.sn = function () {
						var e = this;
						if (void 0 === e.kT) {
							var t = e.fF();
							e.kT = t ? F(w(t.$.childNodes, "thead")) : null;
						}
						return e.kT;
					}),
					(a.tools.fF = function () {
						var e = this;
						return (
							void 0 === e.iO && (e.iO = F(w(e.ib.bn().$.childNodes, "table"))),
							e.iO
						);
					}),
					(a.tools.of = function () {
						var e = this;
						return e.iF || (e.iF = e.ib.bn().getChild(0)), e.iF;
					}),
					(a.tools.releaseDomNodes = function () {
						var e = this;
						(e.jl = void 0), (e.iO = void 0), (e.iJ = void 0), (e.iF = void 0);
					}),
					(a.tools.lz = function () {
						var e = this,
							t = e.ib.data().display,
							n = [];
						n.push(
							'<td class="name">' + e.ib.app.lang.SetDisplayName + "</td>"
						),
							t.filesize &&
								n.push("<td>" + e.ib.app.lang.SetDisplaySize + "</td>"),
							t.date && n.push("<td>" + e.ib.app.lang.SetDisplayDate + "</td>");
						var o = n.length - 1;
						return (
							(n[o] = o
								? '<td class="last">' + n[o].substr(4)
								: '<td class="last ' + n[o].substr(11)),
							"<thead><tr><td>&nbsp;</td>" + n.join("") + "</tr></thead>"
						);
					}),
					(a.tools.qc = function (e) {
						var t = this.oR(e),
							n = "r" + e.index,
							o = this.ib.data().display,
							i = [];
						i.push(
							'<td class="name">' +
								E +
								'<a tabindex="-1">' +
								(o.filename ? c.htmlEncode(e.name) : "") +
								"</a></td>"
						),
							o.filesize &&
								i.push(
									"<td>" + c.formatSize(e.size, this.ib.app.lang, !0) + "</td>"
								),
							o.date && i.push("<td>" + e.dateF + "</td>");
						var a = i.length - 1;
						return (
							(i[a] = a
								? '<td class="last">' + i[a].substr(4)
								: '<td class="last ' + i[a].substr(11)),
							'<tr id="' +
								n +
								'"><td class="image"><img src="' +
								t +
								'" alt="img alt" /></td>' +
								i.join("") +
								"</tr>"
						);
					}),
					(a.tools.dH = function () {
						var e = this.ib.data();
						return e.cG ? (e.cG.isDeleted ? (e.cG = null) : e.cG) : void 0;
					}),
					(a.tools.oO = function (e) {
						var t = this.ib.data(),
							n = [];
						if (t.nY) {
							for (var o = 0; o < t.nY.length; o++)
								t.nY[o] && !t.nY[o].isDeleted && n.push(t.nY[o]);
							if (e) {
								var i = n,
									a = {};
								for (n = [], o = 0; o < i.length; o++)
									i[o].name in a || (n.push(i[o]), (a[i[o].name] = 1));
							}
						}
						return (t.nY = n);
					}),
					(a.tools.currentFolder = function () {
						return this.ib.data().folder;
					}),
					(a.tools.cR = function (e, t, n) {
						var o = this;
						e
							? (o.iS ? o.iS.blur() : o.ib.bn().setAttribute("tabindex", -1),
							  (o.iS = e),
							  e.focus(t, n))
							: (delete o.iS, o.ib.bn().setAttribute("tabindex", 0));
					}),
					(a.tools.downloadFile = function (e, t) {
						var n = e.getById("downloadIframe");
						n ||
							((n = e.createElement("iframe")),
							n.setAttribute("id", "downloadIframe"),
							n.setStyle("display", "none"),
							e.bH().append(n)),
							n.setAttribute("src", t);
					});
			}
			function r(e, t, n, o, i, a) {
				for (
					var l = {},
						s = 0,
						d = t.files,
						f = [t.destination],
						h = 0,
						m = t.files.length;
					m > h;
					h++
				)
					t.destination != d[h].folder &&
						((l["files[" + s + "][name]"] = d[h].name),
						(l["files[" + s + "][type]"] = d[h].folder.type),
						(l["files[" + s + "][folder]"] = d[h].folder.getPath()),
						(l["files[" + s + "][options]"] = (i && i[h]) || ""),
						s++,
						n && !o && f.push(d[h].folder));
				if (
					(o ||
						(a || (a = function () {}),
						(a = c.override(a, function (t) {
							return function () {
								for (
									var n = e.ld["filesview.filesview"],
										o = n.tools.currentFolder(),
										i = 0,
										a = f.length;
									a > i;
									i++
								)
									if (f[i] == o) {
										e.oW("requestSelectFolder", { folder: o });
										break;
									}
								return t;
							};
						}))),
					!s)
				)
					return void (a && a());
				var g = e.connector,
					v = 0,
					b = n ? "MoveFiles" : "CopyFiles";
				g.sendCommandPost(
					b,
					null,
					l,
					function (i) {
						var l,
							s,
							f,
							h = i.getErrorNumber(),
							m = [],
							b = [];
						for (l = 0, s = d.length; s > l; l++) b.push(d[l]);
						if (h == g.ERROR_COPY_FAILED || h == g.ERROR_MOVE_FAILED) {
							v = 1;
							var y,
								w,
								F,
								_,
								k = i.selectNodes("Connector/Errors/Error"),
								C = parseInt(
									i.selectSingleNode(
										"Connector/" +
											(n ? "MoveFiles/@moved" : "CopyFiles/@copied")
									).value,
									10
								),
								x = 0,
								E = [];
							for (l = 0, s = k.length; s > l; l++)
								for (
									y = k[l].getAttribute("code"),
										y == g.ERROR_ALREADYEXIST
											? (x = 1)
											: E.push([k[l].getAttribute("name"), e.lang.Errors[y]]),
										w = 0,
										F = b.length;
									F > w;
									w++
								)
									if (
										(_ = b[w]) &&
										_.name == k[l].getAttribute("name") &&
										_.folder.getPath() == k[l].getAttribute("folder") &&
										_.folder.type == k[l].getAttribute("type")
									) {
										k[l].getAttribute("code") == g.ERROR_ALREADYEXIST &&
											m.push(_),
											delete b[w];
										break;
									}
							for (l = 0, s = E.length; s > l; l++)
								E[l] = e.lang.FileError.replace("%s", E[l][0]).replace(
									"%e",
									E[l][1]
								);
							C || x
								? E.length == b.length - C &&
								  ((f =
										e.lang.OperationCompletedErrors +
										" " +
										e.lang[
											n ? "MovedFilesNumber" : "CopiedFilesNumber"
										].replace("%s", C) +
										"<br /><br />"),
								  (f += e.lang[n ? "MoveFailedList" : "CopyFailedList"].replace(
										"%s",
										p(E)
								  )),
								  e.msgDialog("", f, a || null))
								: e.msgDialog(
										"",
										e.lang.Errors[n ? 300 : 301] + "<br /><br />" + p(E),
										a || null
								  );
							var S = u(e, b, t.fileCallback);
							if (
								(x &&
									e.cg.openDialog("moveFileExists", function (o) {
										var i = arguments.callee;
										(f = ""),
											E.length && (f += e.lang.OperationCompletedErrors + " "),
											(f += C
												? e.lang[
														n ? "MovedFilesNumber" : "CopiedFilesNumber"
												  ].replace("%s", C)
												: ""),
											E.length &&
												(f +=
													(f ? "<br /><br />" : "") +
													e.lang[
														n ? "MoveFailedList" : "CopyFailedList"
													].replace("%s", p(E))),
											f && (f += "<br /><br />");
										var l = e.lang.ErrorMsg.FileExists;
										(l = l.replace("%s", m[0])),
											(f += "<strong>" + l + "</strong>"),
											o.show(),
											o
												.getContentElement("tab1", "msg")
												.getElement()
												.setHtml(f),
											o.on("ok", function (l) {
												l.removeListener();
												var s,
													d = o.getContentElement("tab1", "option").getValue(),
													u = o
														.getContentElement("tab1", "remember")
														.getValue();
												switch (d) {
													case "autorename":
													case "overwrite":
														s = [d];
														break;
													case "skip":
														return void (u
															? a && a()
															: (m.shift(),
															  m.length &&
																	setTimeout(function () {
																		e.cg.openDialog("moveFileExists", i);
																	}, 0)));
												}
												if (u)
													for (var f = 1, p = m.length; p > f; f++)
														s.push(s[0]);
												r(e, c.extend({ files: m }, t), n, 1, s, a);
											});
									}),
								o)
							)
								return;
						} else i.checkError() && (v = 1);
						return v
							? void (t.errorCallback && t.errorCallback())
							: ((S = u(e, b, t.fileCallback)),
							  void (S
									? ((f =
											e.lang.OperationCompletedSuccess +
											"<br />" +
											e.lang[
												n ? "MovedFilesNumber" : "CopiedFilesNumber"
											].replace("%s", S)),
									  e.msgDialog("", f, a || null))
									: a && a()));
					},
					t.destination.type,
					t.destination
				);
			}
			function u(e, t, n) {
				for (var o, i = 0, a = 0, r = t.length; r > a; a++)
					(o = t[a]) && (i++, n && n(e, o));
				return i;
			}
			function p(e) {
				return (
					'<ul class="cke_files_list' +
					(e.length > 3 ? " cke_files_list_many" : "") +
					'"><li>' +
					e.join("</li><li>") +
					"</li></ul>"
				);
			}
			function m(e, t) {
				if (!e || 0 === e.length)
					throw new o.dU("name_empty", t.lang.ErrorMsg.FileEmpty);
				if (C.iz.test(e))
					throw new o.dU("name_invalid_chars", t.lang.ErrorMsg.FileInvChar);
				return !0;
			}
			function g(e, t) {
				for (
					var n = {}, o = t[0].folder, i = o.getPath(), a = 0, r = t.length;
					r > a;
					a++
				)
					(n["files[" + a + "][name]"] = t[a].name),
						(n["files[" + a + "][type]"] = o.type),
						(n["files[" + a + "][folder]"] = i),
						e.oW("requestProcessingFile", { file: t[a] });
				e.connector.sendCommandPost(
					"DeleteFiles",
					null,
					n,
					function (n) {
						var i,
							a,
							r = {};
						if (302 == n.getErrorNumber()) {
							var l =
								t.length -
								parseInt(
									n.selectSingleNode("Connector/DeleteFiles/@deleted").value,
									10
								);
							if (!l) return void n.checkError();
							var s = n.selectNodes("Connector/Errors/Error");
							for (i = 0, a = s.length; a > i; i++)
								r[s[i].attributes.getNamedItem("name").value] = 1;
							e.skippedFilesDialog(null, s);
						} else if (n.checkError()) return;
						for (i = 0, a = t.length; a > i; i++)
							r[t[i]] || ((t[i].isDeleted = !0), t[i].releaseDomNodes());
						e.oW("afterCommandExecDefered", { name: "RemoveFiles", folder: o });
					},
					o.type,
					o
				);
			}
			function v() {
				c.extend(o.aL.Folder.prototype, {
					getFiles: function (e) {
						var t = this,
							n = this.app;
						n.connector.sendCommand(
							"GetFiles",
							{},
							function (i) {
								for (
									var a = [], r = i.selectNodes("Connector/Files/File"), l = 0;
									l < r.length;
									l++
								) {
									var s = r[l].attributes.getNamedItem("date").value;
									a.push(
										new o.aL.File(
											r[l].attributes.getNamedItem("name").value,
											parseInt(r[l].attributes.getNamedItem("size").value, 10),
											r[l].attributes.getNamedItem("thumb")
												? r[l].attributes.getNamedItem("thumb").value
												: !1,
											s,
											n.lB(
												s.substr(6, 2),
												s.substr(4, 2),
												s.substr(0, 4),
												s.substr(8, 2),
												s.substr(10, 2)
											),
											t
										)
									);
								}
								e && e.call(t, a);
							},
							t.type,
							t
						);
					},
					showFiles: function (e) {
						this.app.oW("requestShowFolderFiles", { folder: this, mw: e });
					},
				});
			}
			function b(e, t) {
				if (!e) return void 0;
				for (var n = [], o = 0; o < e.length; o++) n.push(t(e[o]));
				return n.join("");
			}
			function y(e, t) {
				var n;
				for (n in e) if (void 0 !== t(e[n])) return e[n];
				return void 0;
			}
			function w(e, t, n) {
				return y(e, function (e) {
					return e.tagName && e.tagName.toLowerCase() == t && !n-- ? e : void 0;
				});
			}
			function F(e) {
				return e ? new f(e) : null;
			}
			var _,
				k,
				C = { fX: /[^\.]+$/, iz: /[\\\/:\*\?"<>\|]/ },
				x = '<span class="dropdown">▼</span>',
				E = '<a href="javascript:void(0)" class="dropdown">▼</a>',
				S = [
					"<table class='files_details' role='region' aria-controls='status_view'>",
					"<tbody>",
					"</tbody>",
					"</table>",
				],
				N = ["Node", "message"];
			h.add("filesview", {
				bM: ["foldertree"],
				onLoad: function () {
					v(),
						a(),
						o.dialog.add("moveFileExists", function (e) {
							return {
								title: e.lang.FileExistsDlgTitle,
								minWidth: 350,
								minHeight: 120,
								contents: [
									{
										id: "tab1",
										label: "",
										title: "",
										style: l.ie7Compat ? "height:auto" : "",
										expand: !0,
										padding: 0,
										elements: [
											{
												id: "msg",
												className: "cke_dialog_error_msg",
												type: "html",
												widths: ["70%", "30%"],
												html: "",
											},
											{
												type: "hbox",
												className: "cke_dialog_file_exist_options",
												children: [
													{
														type: "radio",
														id: "option",
														label: e.lang.common.makeDecision,
														default: "autorename",
														items: [
															[e.lang.FileAutorename, "autorename"],
															[e.lang.FileOverwrite, "overwrite"],
															[e.lang.common.skip, "skip"],
														],
													},
												],
											},
											{
												type: "hbox",
												className: "cke_dialog_remember_decision",
												children: [
													{
														type: "checkbox",
														id: "remember",
														label: e.lang.common.rememberDecision,
													},
												],
											},
										],
									},
								],
								buttons: [
									CKFinder.dialog.okButton,
									CKFinder.dialog.cancelButton,
								],
							};
						});
				},
				bz: function (e) {
					var t = this;
					(e.rQ.jh = new RegExp("^(" + e.config.fileIcons + ")$", "i")),
						(e.rQ.rO = /^(jpg|gif|png|bmp|jpeg)$/i),
						(e.rQ.jf = C.fX),
						e.on("themeSpace", function (e) {
							if ("mainMiddle" == e.data.space) {
								var t = "";
								s || (t = S[0] + S[3]),
									(e.data.html +=
										"<div id='files_view' class='view widget files_thumbnails' aria-live='polite' role='main' tabindex='0' aria-controls='status_view'><h4 class='message_content'></h4><div class='files_thumbnails fake no_list' role='list'></div>" +
										t +
										"</div>");
							}
						}),
						e.on("uiReady", function () {
							e.config.showContextMenuArrow || ((x = ""), (E = ""));
							var n = e.document.getById("files_view");
							n.hX();
							var i = o.ld.bz(e, "filesview", t, n);
							e.config.selectMultiple &&
								n.on(
									"click",
									function (e) {
										if (e.data.$.shiftKey) {
											var t = i.tools.dH(),
												n = i.tools.bZ(e),
												o = !t;
											if (n) {
												t &&
													(t.rowNode().$.offsetTop < n.rowNode().$.offsetTop
														? (o = 1)
														: "list" != i.data().dA &&
														  t.rowNode().$.offsetTop ==
																n.rowNode().$.offsetTop &&
														  (o =
																t.rowNode().$.offsetLeft <
																n.rowNode().$.offsetLeft));
												for (
													var a, r = n.rowNode();
													(r = o ? r.cf() : r.dG()) &&
													((a = i.tools.bZ(r)), !t || !a.isSameFile(t));

												)
													a.select(!0);
												i.tools.cR(n, !0), e.cancel(), e.data.preventDefault();
											}
										}
									},
									null,
									null,
									1
								),
								e.bD("ViewFile", {
									exec: function (e) {
										var t = i.data().cG;
										if (t) {
											if (
												e.oW("launchGallery", {
													selected: t,
													files: i.data().files,
												}).bx === !0
											)
												return;
											var n = 0.8 * window.screen.width,
												o = 0.7 * window.screen.height,
												a =
													"menubar=no,location=no,status=no,toolbar=no,scrollbars=yes,resizable=yes";
											(a += ",width=" + n),
												(a += ",height=" + o),
												(a += ",left=" + (window.screen.width - n) / 2),
												(a += ",top=" + (window.screen.height - o) / 2);
											var r = e.cg.inPopup
												? e.document.getWindow().$.parent
												: window;
											r.open(
												t.folder.getUrl() + encodeURIComponent(t.name),
												"_blank",
												a
											) || e.msgDialog("", e.lang.ErrorMsg.PopupBlockView);
										}
									},
								}),
								e.bD("DownloadFile", {
									exec: function (e) {
										var t = i.data().cG;
										if (t) {
											var n;
											(n = e.config.directDownload
												? t.folder.getUrl() + t.name + "?download"
												: e.connector.composeUrl(
														"DownloadFile",
														{ FileName: t.name },
														t.folder.type,
														t.folder
												  )),
												i.tools.downloadFile(e.document, n);
										}
									},
								}),
								e.bD("RenameFile", {
									readOnly: !1,
									exec: function (e) {
										var t = function (t, i) {
												try {
													n.rename(i);
												} catch (a) {
													if (!(a instanceof o.dU)) throw a;
													e.msgDialog("", a.message);
												}
											},
											n = i.data().cG;
										n &&
											n.folder.acl.fileRename &&
											e.hs(
												e.lang.RenameDlgTitle,
												e.lang.FileRename,
												n.name,
												function (o) {
													if ((o = c.trim(o))) {
														var i = o.match(e.rQ.jf)[0];
														i.toLowerCase() != n.ext.toLowerCase()
															? e.fe("", e.lang.FileRenameExt, function () {
																	t(n, o);
															  })
															: t(n, o);
													}
												}
											);
									},
								}),
								e.bD("DeleteFile", {
									readOnly: !1,
									exec: function (e) {
										var t = i.tools.oO(!0);
										t &&
											0 != t.length &&
											t[0].folder.acl.fileDelete &&
											e.fe(
												"",
												1 == t.length
													? e.lang.FileDelete.replace("%1", t[0].name)
													: e.lang.FilesDelete.replace("%1", t.length),
												function () {
													g(e, t);
												}
											);
									},
								}),
								e.bD("copyFilesToFolder", {
									readOnly: !1,
									exec: function (e, t) {
										t.files || (t.files = i.tools.oO()),
											t.files.length &&
												t.destination &&
												t.destination.acl.fileUpload &&
												r(e, t, 0, 0, [], t.callback);
									},
								}),
								e.bD("moveFilesToFolder", {
									readOnly: !1,
									exec: function (e, t) {
										t.files || (t.files = i.tools.oO()),
											t.files.length &&
												t.destination &&
												t.destination.acl.fileUpload &&
												t.files[0].folder.acl.fileDelete &&
												r(e, t, 1, 0, [], t.callback);
									},
								}),
								e.eU &&
									(e.dZ("file0", 90),
									e.dZ("file1", 100),
									e.dZ("file2", 110),
									e.dZ("file3", 120),
									e.eU({
										selectFile: {
											label: e.lang.Select,
											onClick: function () {
												var t = e.ld["filesview.filesview"],
													n = t.tools.dH();
												n && t.oW("requestSelectAction", { file: n });
											},
											group: "file0",
										},
										selectFileThumbnail: {
											label: e.lang.SelectThumbnail,
											onClick: function () {
												var t = e.ld["filesview.filesview"],
													n = t.tools.dH();
												n && t.oW("requestSelectThumbnailAction", { file: n });
											},
											group: "file0",
										},
										viewFile: {
											label: e.lang.View,
											command: "ViewFile",
											group: "file1",
										},
										downloadFile: {
											label: e.lang.Download,
											command: "DownloadFile",
											group: "file1",
										},
										renameFile: {
											label: e.lang.Rename,
											command: "RenameFile",
											group: "file2",
										},
										deleteFile: {
											label: e.lang.Delete,
											command: "DeleteFile",
											group: "file3",
										},
										deleteFiles: {
											label: e.lang.DeleteFiles,
											command: "DeleteFile",
											group: "file3",
										},
									})),
								e.bj &&
									(e.bj.lX(n),
									e.bj.kh(function (t) {
										var n = i.tools.bZ(t);
										if (n) {
											n.rowNode().hasClass("selected")
												? (i.data().cG = n)
												: e.oW("requestSelectFile", { file: n });
											var a = n.folder.acl,
												r = {
													viewFile: a.fileView ? o.aS : o.aY,
													downloadFile: a.fileView ? o.aS : o.aY,
												};
											return (
												e.config.readOnly ||
													((r.renameFile = a.fileRename ? o.aS : o.aY),
													(r[
														i.tools.oO().length > 1
															? "deleteFiles"
															: "deleteFile"
													] = a.fileDelete ? o.aS : o.aY)),
												e.config.selectActionFunction &&
													(r.selectFile = a.fileView ? o.aS : o.aY),
												n.isImage() &&
													!e.config.disableThumbnailSelection &&
													(e.config.selectThumbnailActionFunction ||
														(e.config.thumbsDirectAccess &&
															e.config.selectActionFunction)) &&
													(r.selectFileThumbnail = a.fileView ? o.aS : o.aY),
												i.oW("beforeContextMenu", {
													bj: r,
													file: n,
													folder: i.data().folder,
												}),
												r
											);
										}
									}, n));
						}),
						e.bD("filesviewFocus", {
							exec: function (e) {
								var t = e.layout.pn(),
									n = e.ld["filesview.filesview"],
									o = n.tools.dH();
								t.focus(), o && o.focus();
							},
						});
				},
			}),
				(o.aL.File = function (e, t, n, o, i, a) {
					var r = this;
					(r.index = null),
						(r.app = null),
						(r.name = e),
						(r.ext = e.match(C.fX)[0]),
						(r.nameL = e.toLowerCase()),
						(r.size = t),
						(r.thumb = n),
						(r.date = o),
						(r.dateF = i),
						(r.folder = a),
						(r.isDeleted = !1);
				}),
				(o.aL.File.prototype = {
					rename: function (e) {
						m(e, this.app);
						var t = this;
						return t.name == e
							? void t.app.oW("afterCommandExecDefered", {
									name: "RenameFile",
									file: t,
							  })
							: (t.app.oW("requestProcessingFile", { file: t }),
							  void t.app.connector.sendCommandPost(
									"RenameFile",
									{ fileName: t.name, newFileName: e },
									null,
									function (e) {
										return e.checkError()
											? void t.app.oW("requestRepaintFile", { file: t })
											: ((t.name = e.selectSingleNode(
													"Connector/RenamedFile/@newName"
											  ).value),
											  (t.nameL = t.name.toLowerCase()),
											  (t.ext = t.name.match(C.fX)[0]),
											  (t.thumb = 0),
											  void t.app.oW("afterCommandExecDefered", {
													name: "RenameFile",
													file: t,
											  }));
									},
									t.folder.type,
									t.folder
							  ));
					},
					remove: function () {
						g(this.app, [this]);
					},
					select: function (e) {
						this.app.oW("requestSelectFile", { file: this, multiple: e });
					},
					deselect: function (e) {
						e ? this.select(!0) : this.app.oW("requestSelectFile");
					},
					toString: function () {
						return this.name;
					},
					isImage: function () {
						return this.app.rQ.rO.test(this.ext);
					},
					isSameFile: function (e) {
						var t = this;
						return (
							(t.name == e.name || t.index == e.index) &&
							t.folder.getPath() == e.folder.getPath() &&
							t.folder.type == e.folder.type
						);
					},
					getUrl: function () {
						return this.folder.getUrl() + encodeURIComponent(this.name);
					},
					rowNode: function () {
						var e = this;
						return e.je || (e.je = e.app.document.getById("r" + e.index)), e.je;
					},
					getThumbnailUrl: function (e) {
						var t = this,
							n = t.thumb,
							o = t.name,
							i = t.app,
							a = o.match(i.rQ.jf);
						if (a && (a = a[0])) {
							if (i.config.thumbsEnabled && i.rQ.rO.test(a)) {
								var r = encodeURIComponent(t.date + "-" + t.size);
								if (n && i.config.thumbsDirectAccess)
									return (
										i.config.thumbsUrl +
										t.folder.type +
										t.folder.getPath() +
										encodeURIComponent(o) +
										(e
											? "?hash=" +
											  i.getResourceType(t.folder.type).hash +
											  "&fileHash=" +
											  r
											: "")
									);
								var s = { FileName: o };
								return (
									e && (s.fileHash = r),
									i.connector.composeUrl(
										"Thumbnail",
										s,
										t.folder.type,
										t.folder
									)
								);
							}
							if (i.config.useNativeIcons && l.gecko)
								return "moz-icon://." + a.toLowerCase() + "?size=32";
							if (i.rQ.jh.test(a))
								return i.fh + "images/icons/32/" + a.toLowerCase() + ".gif";
						}
						return i.fh + "images/icons/32/default.icon.gif";
					},
					filenameNode: function () {
						var e = this;
						if (void 0 === e.ht) {
							var t = e.rowNode();
							t &&
								(e.ht = F(
									t.is("a")
										? w(t.$.childNodes, "h5")
										: w(e.aNode().$.childNodes, "h5")
								));
						}
						return e.ht;
					},
					aNode: function () {
						var e = this;
						if (void 0 === e.dM) {
							var t = e.rowNode();
							if (t)
								if (t.is("a")) e.dM = t;
								else {
									var n = w(t.$.childNodes, "td", 1);
									e.dM = F(w(n.childNodes, "a"));
								}
						}
						return e.dM;
					},
					focusNode: function () {
						return this.aNode();
					},
					releaseDomNodes: function () {
						(this.je = void 0), (this.dM = void 0), (this.ht = void 0);
					},
					focus: function (e, t) {
						t || this.select(e);
						var n = this.focusNode();
						n.setAttribute("tabindex", 0), n.focus();
					},
					blur: function () {
						this.aNode().setAttribute("tabindex", -1);
					},
				});
		})(),
		(function () {
			function e(e, t) {
				var n = [];
				if (!t) return e;
				var o;
				for (o in t) n.push(o + "=" + encodeURIComponent(t[o]));
				return e + (-1 != e.indexOf("?") ? "&" : "?") + n.join("&");
			}
			function t() {
				var e = this,
					t = e.getDialog(),
					n = t.getParentApi();
				return (
					(n._.rb = e),
					t.getContentElement(e["for"][0], e["for"][1]).getInputElement().$
						.value && t.getContentElement(e["for"][0], e["for"][1]).vy()
						? !0
						: !1
				);
			}
			function n(t, n, o) {
				var i = o.params || {};
				o.url &&
					((i.CKFinderFuncNum = t._.ra),
					i.langCode || (i.langCode = t.langCode),
					(n.action = e(o.url, i)),
					(n.filebrowser = o));
			}
			function i(o, a, r, l) {
				var s, d;
				for (d in l)
					if (
						((s = l[d]),
						("hbox" == s.type || "vbox" == s.type) && i(o, a, r, s.children),
						s.filebrowser && "fileButton" == s.type && s["for"])
					) {
						if ("string" == typeof s.filebrowser) {
							var c = { target: s.filebrowser };
							s.filebrowser = c;
						}
						s.filebrowser.action = "QuickUpload";
						var u = s.filebrowser.url;
						if (u)
							(s.filebrowser.url = u),
								(s.hidden = !1),
								n(o, r.vz(s["for"][0]).eB(s["for"][1]), s.filebrowser);
						else {
							var f = s.onShow;
							s.onShow = function (t) {
								var n = t.jN;
								if (f && f.call(n, t) === !1) return !1;
								var i = o.getSelectedFolder();
								if ((i && (u = i.getUploadUrl()), !u)) return !1;
								var a = s.filebrowser.params || {};
								(a.CKFinderFuncNum = o._.ra),
									a.langCode || (a.langCode = o.langCode),
									(u = e(u, a));
								var r = this.getDialog().getContentElement(
									s["for"][0],
									s["for"][1]
								);
								return r ? ((r._.dg.action = u), r.reset(), !0) : !1;
							};
						}
						var p = s.onClick;
						s.onClick = function (e) {
							var n = e.jN;
							return p && p.call(n, e) === !1 ? !1 : t.call(n, e);
						};
					}
			}
			function a(e, t) {
				var n = t.getDialog(),
					o = t.filebrowser.target || "";
				if (o) {
					var i = o.split(":"),
						a = n.getContentElement(i[0], i[1]);
					a && (a.setValue(e), n.selectPage(i[0]));
				}
			}
			function r(e, t, n) {
				if (-1 !== n.indexOf(";")) {
					for (var o = n.split(";"), i = 0; i < o.length; i++)
						if (r(e, t, o[i])) return !0;
					return !1;
				}
				var a = e.vz(t).eB(n).filebrowser;
				return a && a.url;
			}
			function l(e, t) {
				var n = this,
					o = n._.rb.getDialog(),
					i = n._.rb["for"],
					r = n._.rb.filebrowser.onSelect;
				i && o.getContentElement(i[0], i[1]).reset(),
					("function" != typeof t || t.call(n._.rb) !== !1) &&
						((r && r.call(n._.rb, e, t) === !1) ||
							("string" == typeof t && t && alert(t), e && a(e, n._.rb)));
			}
			h.add("filebrowser", {
				bz: function (e) {
					e.cg._.ra = c.addFunction(l, e.cg);
				},
			}),
				o.on("dialogDefinition", function (e) {
					var t,
						n,
						o = e.data.dg;
					for (n in o.contents)
						(t = o.contents[n]),
							i(e.application.cg, e.data.name, o, t.elements),
							t.hidden &&
								t.filebrowser &&
								(t.hidden = !r(o, t.id, t.filebrowser));
				});
		})(),
		h.add("button", {
			eK: function (e) {
				e.bY.kd(o.UI_BUTTON, m.button.dq);
			},
		}),
		(CKFinder._.UI_BUTTON = o.UI_BUTTON = 1),
		(m.button = function (e) {
			c.extend(this, e, {
				title: e.label,
				className:
					e.className || (e.command && "cke_button_" + e.command) || "",
				click:
					e.click ||
					function (t) {
						e.command ? t.execCommand(e.command) : e.onClick && e.onClick(t);
					},
			}),
				(this._ = {});
		}),
		(m.button.dq = {
			create: function (e) {
				return new m.button(e);
			},
		}),
		(m.button.prototype = {
			canGroup: !0,
			er: function (e, t) {
				var n = l,
					i = (this._.id = "cke_" + c.getNextNumber());
				this._.app = e;
				var a = {
						id: i,
						button: this,
						app: e,
						focus: function () {
							var t = e.document.getById(i);
							t && t.focus();
						},
						lc: function () {
							this.button.click(e);
						},
					},
					r = c.addFunction(a.lc, a),
					s = m.button._.instances.push(a) - 1,
					d = "",
					u = this.command;
				if (
					(this.iH
						? e.on(
								"mode",
								function () {
									this.bR(this.iH[e.mode] ? o.aS : o.aY);
								},
								this
						  )
						: u &&
						  ((u = e.cS(u)),
						  u &&
								(u.on(
									"bu",
									function () {
										this.bR(u.bu);
									},
									this
								),
								(d +=
									"cke_" +
									(u.bu == o.eV ? "on" : u.bu == o.aY ? "disabled" : "off")))),
					u || (d += "cke_off"),
					this.className && (d += " " + this.className),
					t.push(
						'<span class="cke_button">',
						'<a id="',
						i,
						'" class="',
						d,
						'" href="javascript:void(\'',
						(this.title || "").replace("'", ""),
						'\')" title="',
						this.title,
						'" tabindex="-1" hidefocus="true" role="button" aria-labelledby="' +
							i +
							'_label"' +
							(this.vZ ? ' aria-haspopup="true"' : "")
					),
					(n.opera || (n.gecko && n.mac)) &&
						t.push(' onkeypress="return false;"'),
					n.gecko &&
						t.push(' onblur="this.style.cssText = this.style.cssText;"'),
					t.push(
						' onkeydown="window.parent.CKFinder._.uiButtonKeydown(',
						s,
						', event);" onfocus="window.parent.CKFinder._.uiButtonFocus(',
						s,
						', event);" onclick="window.parent.CKFinder._.callFunction(',
						r,
						', this); return false;">'
					),
					this.icon !== !1 && t.push('<span class="cke_icon"'),
					this.icon)
				) {
					var f = -16 * (this.rD || 0);
					t.push(
						' style="background-image:url(',
						o.getUrl(this.icon),
						");background-position:0 " + f + 'px;"'
					);
				}
				return (
					this.icon !== !1 && t.push("></span>"),
					t.push(
						'<span id="',
						i,
						'_label" class="cke_label">',
						this.label,
						"</span>"
					),
					this.vZ && t.push('<span class="cke_buttonarrow"></span>'),
					t.push("</a>", "</span>"),
					this.onRender && this.onRender(),
					a
				);
			},
			bR: function (e) {
				var t = this;
				if (t._.bu == e) return !1;
				t._.bu = e;
				var n = t._.app.document.getById(t._.id);
				if (n) {
					n.bR(e),
						e == o.aY
							? n.setAttribute("aria-disabled", !0)
							: n.removeAttribute("aria-disabled"),
						e == o.eV
							? n.setAttribute("aria-pressed", !0)
							: n.removeAttribute("aria-pressed");
					var i = t.title,
						a = t._.app.lang.common.unavailable,
						r = n.getChild(1);
					return e == o.aY && (i = a.replace("%1", t.title)), r.setHtml(i), !0;
				}
				return !1;
			},
		}),
		(m.button._ = {
			instances: [],
			keydown: function (e, t) {
				var n = m.button._.instances[e];
				return n.onkey
					? ((t = new d.event(t)), n.onkey(n, t.db()) !== !1)
					: void 0;
			},
			focus: function (e, t) {
				var n,
					o = m.button._.instances[e];
				return (
					o.onfocus && (n = o.onfocus(o, new d.event(t)) !== !1),
					l.gecko && l.version < 10900 && t.preventBubble(),
					n
				);
			},
		}),
		(CKFinder._.uiButtonKeydown = m.button._.keydown),
		(CKFinder._.uiButtonFocus = m.button._.focus),
		(m.prototype.qW = function (e, t) {
			this.add(e, o.UI_BUTTON, t);
		}),
		(function () {
			h.add("container", {
				bM: [],
				bz: function (e) {
					var t = this;
					e.on("themeAvailable", function () {
						t.pV(e);
					});
				},
				pV: function (e) {
					function t(t) {
						t && t.removeListener();
						var n = h.getFrameDocument().$;
						if (
							(n.open(),
							c && (n.domain = document.domain),
							(e.document = new u(n)),
							e.theme.dQ(e),
							n.close(),
							((n.defaultView || n.parentWindow).CKFinder = CKFinder),
							o.skins.load(e, "application", function () {
								var t = e.dJ;
								t && t.oA(e.document);
							}),
							!h.isVisible() && s && l.version >= 8)
						)
							var i = setInterval(function () {
								h.isVisible() && (e.layout.ea(!0), (i = clearInterval(i)));
							}, 500);
					}
					var n = e.config.height,
						i = e.config.tabIndex || e.element.getAttribute("tabindex") || 0;
					isNaN(n) || ((n = Math.max(n, 200)), (n += "px"));
					var a = "",
						r = e.config.width;
					r && (isNaN(r) || (r += "px"), (a += "width: " + r + ";"));
					var d = e.config.className
							? 'class="' + e.config.className + '"'
							: "",
						c = l.isCustomDomain(),
						p =
							"document.open();" +
							(c ? 'document.domain="' + window.document.domain + '";' : "") +
							"document.close();",
						h = f.kE(
							'<iframe style="' +
								a +
								"height:" +
								n +
								'"' +
								d +
								' frameBorder="0" src="' +
								(s
									? "javascript:void(function(){" +
									  encodeURIComponent(p) +
									  "}())"
									: "") +
								'" tabIndex="' +
								i +
								'" allowTransparency="true"></iframe>',
							e.element.getDocument()
						);
					s &&
						l.version >= 9 &&
						e.cg.inPopup &&
						(e.element.getDocument().getWindow().$.ckfinder = function () {
							(e.element.getDocument().getWindow().$.ckfinder = void 0), t();
						}),
						h.on("load", t);
					var m = e.lang.appTitle.replace("%1", e.name);
					l.gecko
						? (h.on("load", function (e) {
								e.removeListener();
						  }),
						  e.element.setAttributes({ role: "region", title: m }),
						  h.setAttributes({ role: "region", title: " " }))
						: l.webkit
						? (h.setAttribute("title", m), h.setAttribute("name", m))
						: s && h.appendTo(e.element),
						s || e.element.append(h),
						(e.container = h);
				},
			}),
				(o.application.prototype.focus = function () {
					var e = this;
					if (e._.oO && e._.oO.length > 1) {
						e.oW("requestSelectFile");
						for (var t = 0, n = e._.oO.length; n > t; t++)
							e.oW("requestSelectFile", { file: e._.oO[t], multiple: !0 });
					}
					(e._.activeElement
						? f.eB(e._.activeElement)
						: e.document.getWindow()
					).focus();
				});
		})(),
		h.add("contextmenu", {
			bM: ["menu"],
			eK: function (e) {
				(e.bj = new h.bj(e)),
					e.bD("bj", {
						exec: function () {
							var t,
								n,
								o,
								i = e.layout.pn();
							if (i.hasClass("focus_inside")) {
								o = e.ld["filesview.filesview"];
								var a = o.tools.dH();
								if (a)
									return (
										(t = a.dM),
										(n = t.ir()),
										e.bj.show(
											e.document.bH().getParent(),
											null,
											n.x + 5,
											n.y + 5,
											t,
											i
										),
										(e._.activeElement = t),
										void (e._.oO = o.tools.oO())
									);
							}
							if (((i = e.layout.pS()), i.hasClass("focus_inside"))) {
								o = e.ld["foldertree.foldertree"];
								var r = o.tools.ew;
								if (r)
									return (
										(t = r.dM),
										(n = t.ir()),
										e.bj.show(
											e.document.bH().getParent(),
											null,
											n.x + 5,
											n.y + 5,
											t,
											i
										),
										(e._.activeElement = t),
										void (e._.oO = [])
									);
							}
						},
					});
			},
		}),
		(h.bj = c.createClass({
			$: function (e) {
				(this.id = "cke_" + c.getNextNumber()),
					(this.app = e),
					(this._.dF = []),
					(this._.vx = c.addFunction(function () {
						this._.panel.hide(), e.focus && e.focus();
					}, this));
			},
			_: {
				onMenu: function (e, t, n, i, a, r) {
					var l = this._.menu,
						d = this.app;
					l
						? (l.hide(), l.ih())
						: ((l = this._.menu = new o.menu(d)),
						  (l.onClick = c.bind(function (e) {
								var t = !0;
								l.hide(),
									s && d.focus && d.focus(),
									e.onClick
										? e.onClick()
										: e.command && d.execCommand(e.command),
									(t = !1);
						  }, this))),
						(l.onEscape = function () {
							d.focus && d.focus(),
								a.focus && a.focus(),
								(d._.activeElement = null);
						});
					var u = this._.dF;
					l.onHide = c.bind(function () {
						(l.onHide = null), this.onHide && this.onHide();
					}, this);
					for (var f = 0; f < u.length; f++) {
						var p = u[f];
						if (!p[1] || p[1].$ == r.$) {
							var h = u[f][0](a);
							if (h) {
								var m;
								for (m in h) {
									var g = this.app.mh(m);
									g && ((g.bu = h[m]), l.add(g));
								}
							}
						}
					}
					l.items.length && l.show(e, t || ("rtl" == d.lang.dir ? 2 : 1), n, i);
				},
			},
			ej: {
				lX: function (e, t) {
					if (l.opera && !("oncontextmenu" in document.body)) {
						var n;
						e.on("mousedown", function (i) {
							if (((i = i.data), 2 != i.$.button))
								return void (i.db() == o.bP + 1 && e.oW("contextmenu", i));
							if (!t || (!i.$.ctrlKey && !i.$.metaKey)) {
								var a = i.bK();
								if (!n) {
									var r = a.getDocument();
									(n = r.createElement("input")),
										(n.$.type = "button"),
										r.bH().append(n);
								}
								n.setAttribute(
									"style",
									"position:absolute;top:" +
										(i.$.clientY - 2) +
										"px;left:" +
										(i.$.clientX - 2) +
										"px;width:5px;height:5px;opacity:0.01"
								);
							}
						}),
							e.on("mouseup", function (t) {
								n && (n.remove(), (n = void 0), e.oW("contextmenu", t.data));
							});
					}
					if (
						(e.on(
							"contextmenu",
							function (n) {
								var o = n.data;
								if (!t || !(l.webkit ? i : o.$.ctrlKey || o.$.metaKey)) {
									o.preventDefault();
									var a = o.bK(),
										r = o.bK().getDocument().gT(),
										s = o.$.clientX,
										d = o.$.clientY;
									c.setTimeout(
										function () {
											this._.onMenu(r, null, s, d, a, e);
										},
										0,
										this
									);
								}
							},
							this
						),
						l.opera &&
							e.on("keypress", function (e) {
								var t = e.data;
								0 === t.$.keyCode && t.preventDefault();
							}),
						l.webkit)
					) {
						var i,
							a = function (e) {
								i = e.data.$.ctrlKey || e.data.$.metaKey;
							},
							r = function () {
								i = 0;
							};
						e.on("keydown", a), e.on("keyup", r), e.on("contextmenu", r);
					}
				},
				kh: function (e, t) {
					this._.dF.push([e, t]);
				},
				show: function (e, t, n, i, a, r) {
					this.app.focus(),
						this._.onMenu(e || o.document.gT(), t, n || 0, i || 0, a, r);
				},
			},
		})),
		(function () {
			function e(e) {
				var t = this;
				(t.jr = null), (t.kP = null), (t.nK = null), (t.app = e);
			}
			function t(e, t) {
				for (
					var n = !0, o = t[0].ext.toLowerCase(), i = 1, a = t.length;
					a > i;
					i++
				)
					if (t[i].ext.toLowerCase() != o) {
						n = !1;
						break;
					}
				return (
					'<div style="background-image: url(' +
					(n
						? e.tools.oR(t[0], !0)
						: e.app.fh + "images/icons/32/default.icon.gif") +
					')"><span>' +
					t.length +
					"</span></div>"
				);
			}
			h.add("dragdrop", {
				bM: ["foldertree", "filesview", "contextmenu", "dialog"],
				readOnly: !1,
				gr: function (n) {
					n.cK = new e(n);
					var i, a;
					n.on("themeSpace", function (e) {
						"mainBottom" == e.data.space &&
							(e.data.html +=
								'<div id="dragged_container" style="display: none; position: absolute;"></div>');
					}),
						n.on("uiReady", function () {
							n.document.on("dragstart", function (e) {
								e.data.preventDefault(!0);
							}),
								n.document.on("drag", function (e) {
									e.data.preventDefault(!0);
								});
							n.ld["filesview.filesview"].gA("Draggable"),
								n.ld["foldertree.foldertree"].ke("Droppable");
						}),
						o.ld.bX["filesview.filesview"].bh(
							"Draggable",
							["mousedown"],
							function (e) {
								var o = this,
									a = o.tools.bZ(e),
									r = o.tools.oO(!0);
								if (a && e.data.ov()) {
									e.data.preventDefault(),
										a.rowNode().hasClass("selected") ||
											((e.data.$.ctrlKey || e.data.$.metaKey) &&
											n.config.selectMultiple
												? r.push(a)
												: (r = [a]));
									var l = c.extend({}, { file: a, files: r, step: 1 }, !0);
									o.oW("beforeDraggable", l, function (e, l) {
										function s(e) {
											if (
												(i.setStyles({
													left:
														e.data.$.clientX -
														("rtl" == n.lang.dir ? i.hR("width") : -1) +
														"px",
													top: e.data.$.clientY + "px",
												}),
												0 === u && (u = e.data.$.clientY + e.data.$.clientX),
												!(
													f ||
													Math.abs(e.data.$.clientY + e.data.$.clientX - u) < 20
												))
											) {
												o.app.cK.kG(c), o.app.cK.kz(r);
												for (var a = 0, s = r.length; s > a; a++)
													r[a].rowNode().addClass("dragged_source");
												1 == r.length
													? (i.setStyle("width", c.rd("width")),
													  i.addClass("file_entry"))
													: i.addClass("drag_multiple"),
													i.show();
												var d;
												1 == r.length
													? ((d = c.getHtml()),
													  (d = d.replace(
															/url\(&quot;(.+?)&quot;\);?"/,
															'url($1);"'
													  )),
													  (d = d.replace(
															/url\(([^'].+?[^'])\);?"/,
															"url('$1');\""
													  )))
													: (d = t(o, r)),
													i.setHtml(d),
													(f = 1),
													o.app.document.bH().addClass("dragging"),
													o.app.ld["foldertree.foldertree"].gA("Droppable"),
													(l.step = 1),
													o.oW("successDraggable", l);
											}
										}
										function d(e) {
											i.hide(),
												i.removeClass("drag_multiple"),
												i.removeClass("file_entry"),
												i.setStyle("width", "auto"),
												i.setHtml("");
											for (var t = 0, a = r.length; a > t; t++)
												r[t].rowNode().removeClass("dragged_source");
											o.app.cK.kG(null),
												o.app.cK.kz(null),
												n.document.removeListener("mousemove", s),
												e
													? e.removeListener()
													: n.document.removeListener("mouseup", d),
												o.app.ld["foldertree.foldertree"].ke("Droppable"),
												o.app.document.bH().removeClass("dragging"),
												(l.step = 2),
												o.oW("successDraggable", l),
												o.oW("afterDraggable", l);
										}
										if (!e) {
											var c = a.rowNode(),
												u = 0,
												f = 0;
											(i = i || n.document.getById("dragged_container")),
												i.hide(),
												n.document.on("mousemove", s),
												n.document.on("mouseup", d, 999);
											var p = n.document.bH().$;
											n.document.on("mouseout", function (e) {
												n.cK.qp() && e.data.bK().$ == p && d();
											});
										}
									});
								}
							}
						),
						o.ld.bX["foldertree.foldertree"].bh(
							"Droppable",
							["mouseup", "mouseover", "mouseout"],
							function (e) {
								var t = e.data.bK(),
									i = this,
									r = e.name,
									l = !!i.app.cK.qp();
								if (l && !t.is("ul")) {
									var s = i.tools.cq(t);
									if (s)
										if ("mouseup" == r) {
											i.app.cK.iW(0), i.app.cK.nz(s);
											var d = i.app.cK.pe(),
												u = c.extend({}, { target: s, source: d }, !0);
											i.oW("beforeDroppable", u, function (e, t) {
												if (!e)
													try {
														var r = t.target,
															l = t.source,
															s = new o.iD(i.app, "copyFilesToFolderDrop", {
																label: i.app.lang.CopyDragDrop,
																bu:
																	r != l[0].folder && r.acl.fileUpload
																		? o.aS
																		: o.aY,
																onClick: function () {
																	i.oW("successDroppable", {
																		hH: l,
																		hC: r,
																		step: 2,
																	}),
																		i.app.execCommand("copyFilesToFolder", {
																			files: l,
																			destination: r,
																			callback: function () {
																				i.oW("successDroppable", {
																					hH: l,
																					hC: r,
																					step: 3,
																				}),
																					i.oW("afterDroppable", t);
																			},
																			errorCallback: function () {
																				i.oW("failedDroppable", t),
																					i.oW("afterDroppable", t);
																			},
																		});
																},
															}),
															d = window.top[o.nd + "cation"][o.jG + "st"],
															u = new o.iD(i.app, "moveFilesToFolderDrop", {
																label: i.app.lang.MoveDragDrop,
																bu:
																	r != l[0].folder &&
																	r.acl.fileUpload &&
																	l[0].folder.acl.fileDelete
																		? o.aS
																		: o.aY,
																onClick: function () {
																	i.oW("successDroppable", {
																		hH: l,
																		hC: r,
																		step: 2,
																	}),
																		(o.bF &&
																			1 ==
																				o.bs.indexOf(o.bF.substr(1, 1)) % 5 &&
																			o.lS(d) != o.lS(o.ed)) ||
																		(o.bF &&
																			o.bF.substr(3, 1) !=
																				o.bs.substr(
																					(9 *
																						(o.bs.indexOf(o.bF.substr(0, 1)) +
																							o.bs.indexOf(
																								o.bF.substr(2, 1)
																							))) %
																						(o.bs.length - 1),
																					1
																				))
																			? i.app.msgDialog(
																					"",
																					"This function is disabled in the demo version of CKFinder.<br />Please visit the <a href='http://cksource.com/ckfinder'>CKFinder web site</a> to obtain a valid license."
																			  )
																			: i.app.execCommand("moveFilesToFolder", {
																					files: l,
																					destination: r,
																					callback: function () {
																						i.oW("successDroppable", {
																							hH: l,
																							hC: r,
																							step: 3,
																						}),
																							i.oW("afterDroppable", t);
																					},
																					errorCallback: function () {
																						i.oW("failedDroppable", t),
																							i.oW("afterDroppable", t);
																					},
																			  });
																},
															}),
															f = {
																copyFilesToFolder: s,
																moveFilesToFolder: u,
															};
														i.oW("beforeDropMenu", { iG: f, folder: r }),
															a ||
																((a = new o.menu(i.app)),
																(a.onClick = c.bind(function (e) {
																	var t = !0;
																	a.hide(),
																		e.onClick
																			? e.onClick()
																			: e.command && n.execCommand(e.command),
																		(t = !1);
																}, this))),
															a.ih();
														var p;
														for (p in f) f.hasOwnProperty(p) && a.add(f[p]);
														a.items.length &&
															a.show(
																r.aNode(),
																"rtl" == n.lang.dir ? 2 : 1,
																0,
																r.aNode().$.offsetHeight
															),
															i.oW("successDroppable", {
																hH: l,
																hC: r,
																step: 1,
															});
													} catch (h) {
														throw (
															((h = o.ba(h)),
															i.oW("failedDroppable", t),
															i.oW("afterDroppable", t),
															h)
														);
													}
											});
										} else
											"mouseover" == r
												? i.app.cK.fZ || i.app.cK.iW(s.liNode())
												: "mouseout" == r && i.app.cK.fZ && i.app.cK.iW(0);
								}
							}
						);
				},
			}),
				(e.prototype = {
					iW: function (e) {
						var t = this,
							n = !!e;
						n && !t.fZ
							? (t.app.document.bH().addClass("drop_accepted"),
							  e.addClass("drop_target"))
							: !n &&
							  t.fZ &&
							  (t.app.document.bH().removeClass("drop_accepted"),
							  t.fZ.removeClass("drop_target")),
							(t.fZ = n ? e : null);
					},
					kG: function (e) {
						(this.jr = e), this.jr instanceof f && this.jr.focus();
					},
					vE: function () {
						return this.jr;
					},
					kz: function (e) {
						this.kP = e;
					},
					pe: function () {
						return this.kP;
					},
					qp: function () {
						return !!this.jr;
					},
					nz: function (e) {
						this.nK = e;
					},
					oa: function () {
						return this.nK;
					},
				});
		})(),
		h.add("floatpanel", { bM: ["panel"] }),
		(function () {
			function e(e, n, o, i, a) {
				var r =
						n.iY() +
						"-" +
						o.iY() +
						"-" +
						e.gd +
						"-" +
						e.lang.dir +
						((e.uiColor && "-" + e.uiColor) || "") +
						((i.css && "-" + i.css) || "") +
						((a && "-" + a) || ""),
					l = t[r];
				return (
					l ||
						((l = t[r] = new m.panel(n, i, e.gd)),
						(l.element = o.append(f.kE(l.nt(e), o.getDocument()))),
						l.element.setStyles({ display: "none", position: "absolute" })),
					l
				);
			}
			var t = {},
				n = !1;
			m.pY = c.createClass({
				$: function (t, n, o, i) {
					o.lE = !0;
					var a = n.getDocument(),
						r = e(t, a, n, o, i || 0),
						l = r.element,
						s = l.getFirst().getFirst();
					(this.element = l),
						t.ia ? t.ia.push(l) : (t.ia = [l]),
						(this._ = {
							panel: r,
							parentElement: n,
							dg: o,
							document: a,
							iframe: s,
							children: [],
							dir: t.lang.dir,
						});
				},
				ej: {
					qq: function (e, t) {
						return this._.panel.qq(e, t);
					},
					re: function (e, t) {
						return this._.panel.re(e, t);
					},
					iv: function (e) {
						return this._.panel.iv(e);
					},
					gf: function (e, t, i, a, r) {
						var u = this._.panel,
							f = u.gf(e);
						this.fj(!1), (n = !0);
						var p = this.element,
							h = this._.iframe,
							m = this._.dg,
							g = t.ir(p.getDocument()),
							v = "rtl" == this._.dir,
							b = g.x + (a || 0),
							y = g.y + (r || 0);
						if (
							(!v || (1 != i && 4 != i)
								? v || (2 != i && 3 != i) || (b += t.$.offsetWidth - 1)
								: (b += t.$.offsetWidth),
							(3 == i || 4 == i) && (y += t.$.offsetHeight - 1),
							(this._.panel._.nr = t.dS()),
							p.setStyles({
								top: y + "px",
								left: "-3000px",
								visibility: "hidden",
								opacity: "0",
								display: "",
							}),
							p.getFirst().removeStyle("width"),
							!this._.qa)
						) {
							var w = s ? h : new d.window(h.$.contentWindow);
							(o.event.jP = !0),
								w.on(
									"blur",
									function (e) {
										if (!s || this.fj()) {
											var t = e.data.bK(),
												o = t.getWindow && t.getWindow();
											(o && o.equals(w)) ||
												!this.visible ||
												this._.gF ||
												n ||
												(l.webkit && l.isMobile
													? c.setTimeout(
															function () {
																this.hide();
															},
															500,
															this
													  )
													: this.hide());
										}
									},
									this
								),
								w.on(
									"focus",
									function () {
										(this._.lG = !0), this.gU(), this.fj(!0);
									},
									this
								),
								(o.event.jP = !1),
								(this._.qa = 1);
						}
						(u.onEscape = c.bind(function () {
							this.onEscape && this.onEscape();
						}, this)),
							c.setTimeout(
								function () {
									v && (b -= p.$.offsetWidth),
										p.setStyles({
											left: b + "px",
											visibility: "",
											opacity: "1",
										});
									var e = p.getFirst();
									if (f.oz) {
										var t = function () {
											var e = p.getFirst(),
												t = 0,
												n = f.element.$;
											(l.gecko || l.opera) && (n = n.parentNode);
											var o = n.scrollWidth;
											if (s && l.version < 10) {
												n = n.document.body;
												for (
													var i = n.getElementsByTagName("a"), a = 0;
													a < i.length;
													a++
												) {
													var r = i[a].children[1],
														d = r.scrollWidth + r.offsetLeft - o;
													d > 0 && d > t && (t = d);
												}
											}
											(o += t),
												s &&
													l.quirks &&
													o > 0 &&
													(o +=
														(e.$.offsetWidth || 0) - (e.$.clientWidth || 0)),
												(o += 4),
												e.setStyle("width", o + "px"),
												f.element.addClass("cke_frameLoaded");
											var c = f.element.$.scrollHeight;
											s &&
												l.quirks &&
												c > 0 &&
												(c +=
													(e.$.offsetHeight || 0) - (e.$.clientHeight || 0)),
												e.setStyle("height", c + "px"),
												u._.iL.element
													.setStyle("display", "none")
													.removeStyle("display");
										};
										u.hm ? t() : (u.onLoad = t);
									} else e.removeStyle("height");
									var n = u.element,
										o = n.getWindow(),
										i = o.hV(),
										a = o.eR(),
										r = { height: n.$.offsetHeight, width: n.$.offsetWidth };
									(v ? 0 > b : b + r.width > a.width + i.x) &&
										(b += r.width * (v ? 1 : -1)),
										y + r.height > a.height + i.y && (y -= r.height),
										p.setStyles({
											top: y + "px",
											left: b + "px",
											opacity: "1",
										}),
										c.setTimeout(
											function () {
												if (m.ny && l.gecko) {
													var e = h.getParent();
													e.setAttribute("role", "region"),
														e.setAttribute("title", m.ny),
														h.setAttribute("role", "region"),
														h.setAttribute("title", " ");
												}
												s && l.quirks ? h.focus() : h.$.contentWindow.focus(),
													s && !l.quirks && this.fj(!0);
											},
											0,
											this
										);
								},
								0,
								this
							),
							(this.visible = 1),
							this.onShow && this.onShow.call(this),
							(l.ie7Compat || (l.ie8 && l.ie6Compat)) &&
								c.setTimeout(
									function () {
										this._.parentElement.$.style.cssText += "";
									},
									0,
									this
								),
							(n = !1);
					},
					hide: function () {
						var e = this;
						!e.visible ||
							(e.onHide && e.onHide.call(e) === !0) ||
							(e.gU(), e.element.setStyle("display", "none"), (e.visible = 0));
					},
					fj: function (e) {
						var t = this._.panel;
						return void 0 != e && (t.fj = e), t.fj;
					},
					rA: function (e, t, n, o, i, a) {
						(this._.gF != e || e._.panel._.nr != n.dS()) &&
							(this.gU(),
							(e.onHide = c.bind(function () {
								c.setTimeout(
									function () {
										this._.lG || this.hide();
									},
									0,
									this
								);
							}, this)),
							(this._.gF = e),
							(this._.lG = !1),
							e.gf(t, n, o, i, a),
							(l.ie7Compat || (l.ie8 && l.ie6Compat)) &&
								setTimeout(function () {
									e.element.getChild(0).$.style.cssText += "";
								}, 100));
					},
					gU: function () {
						var e = this._.gF;
						e && (delete e.onHide, delete this._.gF, e.hide());
					},
				},
			});
		})(),
		(function () {
			function e() {
				var e = o.ld.hS("formpanel", "formpanel", { dc: null });
				e.dT.push(function () {
					c.mH(this.bn());
				}),
					e.bh("UnloadForm", ["submit", "requestUnloadForm"], function (e) {
						("submit" != e.name || this.data().gM) &&
							(e.result = this.oW("beforeUnloadForm", function (e, t) {
								var n = this;
								if (!e)
									try {
										if (
											(n.bn().getParent().setStyle("display", "none"),
											n.app.layout.ea(!0),
											n.data().dc)
										) {
											var i = n.app.cS(n.data().dc);
											i && i.bR(o.aS), (n.data().dc = null);
										}
										var a = n.tools.formNode();
										a && (a.mF(), a.remove()),
											n.tools.releaseDomNodes(),
											n.oW("successUnloadForm", t);
									} catch (r) {
										throw (
											(n.oW("failedUnloadForm", t),
											n.oW("afterUnloadForm", t),
											o.ba(r))
										);
									}
							}));
					}),
					e.bh("LoadForm", ["requestLoadForm"], function (e) {
						var t = this,
							n = c.extend(
								{
									html: null,
									dq: null,
									cC: null,
									cancelSubmit: 1,
									gM: 1,
									command: null,
								},
								e.data,
								!0
							);
						e.result = this.oW("beforeLoadForm", n, function (e, n) {
							if (!e) {
								try {
									var a = this.bn();
									a.setHtml(n.html),
										a.getParent().removeStyle("display"),
										this.app.layout.ea(!0);
									var r = this.tools.formNode();
									if (r) {
										if (n.dq)
											if (n.cC) {
												var l;
												for (l in n.cC) r.on(n.cC[l], n.dq);
											} else r.on("submit", n.dq);
										n.cancelSubmit && r.on("submit", i);
										var s = r.eG("input");
										for (l = 0; l < s.count(); l++)
											if ("cancel" == s.getItem(l).getAttribute("name")) {
												s.getItem(l).on("click", function (e) {
													t.oW("requestUnloadForm"), e.removeListener();
												});
												break;
											}
										n.cancelSubmit && r.on("submit", i);
									}
									if (((this.data().gM = n.gM), n.command)) {
										var d = this.app.cS(n.command);
										d && d.bR(o.eV), (this.data().dc = n.command);
									}
									this.oW("successLoadForm", n);
								} catch (c) {
									throw (this.oW("failedLoadForm", n), o.ba(c));
								}
								this.oW("afterLoadForm", n);
							}
						});
					}),
					e.bh(
						"FilesViewSettingsForm",
						["requestFilesViewSettingsForm"],
						function (e) {
							e.result = this.oW(
								"beforeFilesViewSettingsForm",
								{},
								function (e, i) {
									if (!e)
										try {
											if ("settings" == this.data().dc)
												this.oW("requestUnloadForm", function () {
													this.oW("successFilesViewSettingsForm", i),
														this.oW("afterFilesViewSettingsForm", i);
												});
											else {
												this.data().dc && this.oW("requestUnloadForm");
												var a = this.app.ld["filesview.filesview"].data(),
													r = n(this.app.lang, a.dA, a.display, a.cN);
												this.oW(
													"requestLoadForm",
													{
														html: r,
														dq: c.bind(t, this),
														cC: ["click", "submit"],
														command: "settings",
													},
													function () {
														this.eh.addClass("show_border"),
															this.app.cg.resizeFormPanel(),
															this.oW("successFilesViewSettingsForm", i);
													}
												);
											}
										} catch (l) {
											throw (
												(this.oW("failedFilesViewSettingsForm", i),
												this.oW("afterFilesViewSettingsForm", i),
												o.ba(l))
											);
										}
								}
							);
						}
					),
					(e.tools = {
						formNode: function () {
							var e = this;
							return (
								void 0 === e.iP &&
									e.ib.bn().$.childNodes.length &&
									(e.iP = l(r(e.ib.bn().$.childNodes, "form"))),
								e.iP
							);
						},
						releaseDomNodes: function () {
							delete this.iP;
						},
					});
			}
			function t(e) {
				if ("submit" == e.name) {
					var t = this.app.ld["formpanel.formpanel"],
						n = t.data();
					return (
						this.oW("requestUnloadForm"),
						void this.oW("afterFilesViewSettingsForm", n)
					);
				}
				var o = e.data.bK(),
					i = o.getAttribute("name"),
					a = o.getAttribute("value"),
					r = o.$.checked;
				"input" == o.getName() &&
					c.setTimeout(
						function () {
							var e = this.app.ld["filesview.filesview"],
								t = e.data(),
								n = {
									dA: t.dA,
									cN: t.cN,
									display: CKFinder.tools.clone(t.display),
									lookup: t.lookup,
								};
							if ("sortby" == i) t.cN = a;
							else if ("view_type" == i) {
								t.dA = a;
								var o = this.app.document.getById("fs_display_filename");
								"list" == a
									? ((t.display.filename = !0),
									  (o.$.checked = !0),
									  (o.$.disabled = !0))
									: (o.$.disabled = !1);
							} else
								"display_filename" == i
									? "list" != t.dA && (t.display.filename = !!r)
									: "display_date" == i
									? (t.display.date = !!r)
									: "display_filesize" == i && (t.display.filesize = !!r);
							var l =
								("list" == t.dA ? "L" : "T") +
								("size" == t.cN
									? "S"
									: "date" == t.cN
									? "D"
									: "extension" == t.cN
									? "E"
									: "N") +
								(t.display.filename ? "N" : "_") +
								(t.display.date ? "D" : "_") +
								(t.display.filesize ? "S" : "_");
							c.setCookie("CKFinder_Settings", l, !1),
								(n.display.filename != t.display.filename ||
									n.display.date != t.display.date ||
									n.display.filesize != t.display.filesize ||
									n.cN != t.cN ||
									n.dA != t.dA) &&
									e.oW("requestRenderFiles", {
										mj: e.app.lang.FilesEmpty,
										lastView: n,
									});
						},
						0,
						this
					);
			}
			function n(e, t, n, o) {
				var i = 'checked="checked"',
					a = "",
					r = "",
					l = "",
					s = "",
					d = "",
					c = "",
					u = "",
					f = "",
					p = "";
				"list" == t ? (a = i) : (r = i),
					n.filename && (l = i),
					n.date && (s = i),
					n.filesize && (d = i),
					"date" == o
						? (u = i)
						: "size" == o
						? (f = i)
						: "extension" == o
						? (p = i)
						: (c = i);
				var h = a ? ' disabled="true"' : "";
				return (
					'<form id="files_settings" role="region" aria-controls="files_view" action="#" method="POST"><h2 role="heading">' +
					e.SetTitle +
					'</h2><table role="presentation"><tr><td><dl role="group" aria-labelledby="files_settings_type"><dt id="files_settings_type">' +
					e.SetView +
					'</dt><dd><input type="radio" name="view_type" value="thumbnails" ' +
					r +
					' id="fs_type_thumbnails" /> <label for="fs_type_thumbnails">' +
					e.SetViewThumb +
					'</label></dd><dd><input type="radio" name="view_type" value="list" ' +
					a +
					' id="fs_type_details" /> <label for="fs_type_details">' +
					e.SetViewList +
					'</label></dd></dl></td><td><dl role="group" aria-labelledby="files_settings_display"><dt id="files_settings_display">' +
					e.SetDisplay +
					'</dt><dd><input type="checkbox" name="display_filename" value="1" ' +
					l +
					h +
					' id="fs_display_filename" /> <label for="fs_display_filename">' +
					e.SetDisplayName +
					'</label></dd><dd><input type="checkbox" name="display_date" value="1" ' +
					s +
					' id="fs_display_date" /> <label for="fs_display_date">' +
					e.SetDisplayDate +
					'</label></dd><dd><input type="checkbox" name="display_filesize" value="1" ' +
					d +
					' id="fs_display_filesize" /> <label for="fs_display_filesize">' +
					e.SetDisplaySize +
					'</label></dd></dl></td><td><dl role="group" aria-labelledby="files_settings_sorting"><dt id="files_settings_sorting">' +
					e.SetSort +
					'</dt><dd><input type="radio" name="sortby" value="filename" ' +
					c +
					' id="fs_sortby_filename" /> <label for="fs_sortby_filename">' +
					e.SetSortName +
					'</label></dd><dd><input type="radio" name="sortby" value="date" ' +
					u +
					' id="fs_sortby_date" /> <label for="fs_sortby_date">' +
					e.SetSortDate +
					'</label></dd><dd><input type="radio" name="sortby" value="size" ' +
					f +
					' id="fs_sortby_size" /> <label for="fs_sortby_size">' +
					e.SetSortSize +
					'</label></dd><dd><input type="radio" name="sortby" value="extension" ' +
					p +
					' id="fs_sortby_extension" /> <label for="fs_sortby_extension">' +
					e.SetSortExtension +
					'</label></dd></dl></td></tr></table><div class="buttons_wrapper"><div class="buttons"><input type="submit" value="' +
					e.CloseBtn +
					'" /></div></div></form>'
				);
			}
			function i(e) {
				e.data.preventDefault();
			}
			function a(e, t) {
				var n;
				for (n in e) if (void 0 !== t(e[n])) return e[n];
				return void 0;
			}
			function r(e, t, n) {
				return a(e, function (e) {
					return e.tagName && e.tagName.toLowerCase() == t && !n-- ? e : void 0;
				});
			}
			function l(e) {
				return e ? new f(e) : null;
			}
			h.add("formpanel", {
				bM: ["button"],
				onLoad: function () {
					e();
				},
				gr: function (e) {
					var t = this;
					e.on("themeSpace", function (e) {
						"mainTop" == e.data.space &&
							(e.data.html +=
								'<div id="panel_view" class="view" role="region" aria-live="polite" style="display: none;"><div id="panel_widget" class="panel_widget widget" tabindex="-1"></div></div>');
					}),
						e.on("uiReady", function () {
							var n = e.document.getById("panel_view").getChild(0);
							o.ld.bz(e, "formpanel", t, n);
						}),
						e.bD("settings", {
							exec: function (e) {
								e.oW("requestFilesViewSettingsForm", null, function () {
									e.cS("settings").bu == o.eV &&
										setTimeout(function () {
											e.ld["formpanel.formpanel"].tools
												.formNode()
												.eG("input")
												.getItem(0)
												.focus();
										}, 0);
								});
							},
						}),
						e.bD("refresh", {
							exec: function (e) {
								var t = e.aV;
								t &&
									e.oW(
										"requestShowFolderFiles",
										{
											folder: t,
											lookup: e.ld["filesview.filesview"].data().lookup,
										},
										function () {
											setTimeout(function () {
												e.ld["filesview.filesview"].bn().focus();
											}, 0);
										}
									);
							},
						}),
						e.bY.add("Settings", o.UI_BUTTON, {
							label: e.lang.Settings,
							command: "settings",
						}),
						e.bY.add("Refresh", o.UI_BUTTON, {
							label: e.lang.Refresh,
							command: "refresh",
						}),
						e.cS("refresh").bR(o.aY);
				},
			});
		})(),
		h.add("keystrokes", {
			eK: function (e) {
				(e.dJ = new o.dJ(e)), (e.oX = {});
			},
			bz: function (e) {
				for (
					var t = e.config.keystrokes,
						n = e.config.gN,
						o = e.dJ.keystrokes,
						i = e.dJ.gN,
						a = 0;
					a < t.length;
					a++
				)
					o[t[a][0]] = t[a][1];
				for (a = 0; a < n.length; a++) i[n[a]] = 1;
			},
		}),
		(o.dJ = function (e) {
			var t = this;
			return e.dJ
				? e.dJ
				: ((t.keystrokes = {}), (t.gN = {}), (t._ = { app: e }), t);
		}),
		(function () {
			var e,
				t = function (t) {
					t = t.data;
					var n = t.db(),
						o = this.keystrokes[n],
						i = this._.app;
					if (((e = i.oW("iK", { keyCode: n }) === !0), !e)) {
						if (o) {
							var a = { gJ: "dJ" };
							e = i.execCommand(o, a) !== !1;
						}
						if (!e) {
							var r = i.oX[n];
							(e = r && r(i) === !0), e || (e = !!this.gN[n]);
						}
					}
					return e && t.preventDefault(!0), !e;
				},
				n = function (t) {
					e && ((e = !1), t.data.preventDefault(!0));
				};
			o.dJ.prototype = {
				oA: function (e) {
					e.on("keydown", t, this),
						(l.opera || (l.gecko && l.mac)) && e.on("keypress", n, this);
				},
			};
		})(),
		(p.gN = []),
		(p.keystrokes = [
			[o.eJ + 119, "foldertreeFocus"],
			[o.eJ + 120, "filesviewFocus"],
			[o.eJ + 121, "hW"],
			[o.eJ + 85, "upload"],
			[o.dy + 121, "bj"],
			[o.bP + o.dy + 121, "bj"],
		]),
		h.add("menu", {
			eK: function (e) {
				for (var t = e.config.nj.split(","), n = {}, o = 0; o < t.length; o++)
					n[t[o]] = o + 1;
				(e._.iA = n), (e._.iG = {});
			},
			bM: ["floatpanel"],
		}),
		c.extend(o.application.prototype, {
			dZ: function (e, t) {
				this._.iA[e] = t || 100;
			},
			gp: function (e, t) {
				this._.iA[t.group] && (this._.iG[e] = new o.iD(this, e, t));
			},
			eU: function (e) {
				var t;
				for (t in e) this.gp(t, e[t]);
			},
			mh: function (e) {
				return this._.iG[e];
			},
		}),
		(function () {
			function e(e) {
				e.sort(function (e, t) {
					return e.group < t.group
						? -1
						: e.group > t.group
						? 1
						: e.fE < t.fE
						? -1
						: e.fE > t.fE
						? 1
						: 0;
				});
			}
			o.menu = c.createClass({
				$: function (e, t) {
					var n = this;
					(n.id = "cke_" + c.getNextNumber()),
						(n.app = e),
						(n.items = []),
						(n._.hx = t || 1);
				},
				_: {
					jK: function (e) {
						var t = this,
							n = t._.oM,
							i = t.items[e],
							a = i.hQ && i.hQ();
						if (!a) return void t._.panel.gU();
						n
							? n.ih()
							: ((n = t._.oM = new o.menu(t.app, t._.hx + 1)),
							  (n.parent = t),
							  (n.onClick = c.bind(t.onClick, t)));
						var r;
						for (r in a) n.add(t.app.mh(r));
						var l = t._.panel
							.iv(t.id)
							.element.getDocument()
							.getById(t.id + String(e));
						n.show(l, 2);
					},
				},
				ej: {
					add: function (e) {
						e.fE || (e.fE = this.items.length), this.items.push(e);
					},
					ih: function () {
						this.items = [];
					},
					show: function (t, n, i, a) {
						var r = this.items,
							l = this.app,
							s = this._.panel,
							d = this._.element;
						if (!s) {
							(s = this._.panel =
								new m.pY(
									this.app,
									this.app.document.bH(),
									{
										css: [],
										hx: this._.hx - 1,
										className: l.iy + " cke_contextmenu",
									},
									this._.hx
								)),
								(s.onEscape = c.bind(function () {
									this.onEscape && this.onEscape(), this.hide();
								}, this)),
								(s.onHide = c.bind(function () {
									this.onHide && this.onHide();
								}, this));
							var u = s.qq(this.id);
							u.oz = !0;
							var f = u.jQ;
							(f[40] = "next"),
								(f[9] = "next"),
								(f[38] = "prev"),
								(f[o.dy + 9] = "prev"),
								(f[32] = "click"),
								(f[39] = "click"),
								(d = this._.element = u.element),
								d.addClass(l.iy);
							var p = d.getDocument();
							p.bH().setStyle("overflow", "hidden"),
								p.eG("html").getItem(0).setStyle("overflow", "hidden"),
								(this._.qz = c.addFunction(function (e) {
									var t = this;
									clearTimeout(t._.jI),
										(t._.jI = c.setTimeout(t._.jK, l.config.ob, t, [e]));
								}, this)),
								(this._.qm = c.addFunction(function () {
									clearTimeout(this._.jI);
								}, this)),
								(this._.ql = c.addFunction(function (e) {
									var t = this,
										n = t.items[e];
									return n.bu == o.aY
										? void t.hide()
										: void (n.hQ ? t._.jK(e) : t.onClick && t.onClick(n));
								}, this));
						}
						e(r);
						for (
							var h = ['<div class="cke_menu">'],
								g = r.length,
								v = g && r[0].group,
								b = 0;
							g > b;
							b++
						) {
							var y = r[b];
							v != y.group &&
								(h.push('<div class="cke_menuseparator"></div>'),
								(v = y.group)),
								y.er(this, b, h);
						}
						h.push("</div>"),
							d.setHtml(h.join("")),
							this.parent
								? this.parent._.panel.rA(s, this.id, t, n, i, a)
								: s.gf(this.id, t, n, i, a),
							l.oW("menuShow", [s]);
					},
					hide: function () {
						this._.panel && this._.panel.hide();
					},
				},
			});
		})(),
		(o.iD = c.createClass({
			$: function (e, t, n) {
				var o = this;
				c.extend(o, n, { fE: 0, className: "cke_button_" + t }),
					(o.group = e._.iA[o.group]),
					(o.app = e),
					(o.name = t);
			},
			ej: {
				er: function (e, t, n) {
					var i = this,
						a = e.id + String(t),
						r = "undefined" == typeof i.bu ? o.aS : i.bu,
						s = " cke_" + (r == o.eV ? "on" : r == o.aY ? "disabled" : "off"),
						d = i.label;
					r == o.aY && (d = i.app.lang.common.unavailable.replace("%1", d)),
						i.className && (s += " " + i.className);
					var c = i.hQ;
					n.push(
						'<span class="cke_menuitem"><a id="',
						a,
						'" class="',
						s,
						'" href="javascript:void(\'',
						(i.label || "").replace("'", ""),
						'\')" title="',
						i.label,
						'" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem"' +
							(c ? 'aria-haspopup="true"' : "") +
							(r == o.aY ? 'aria-disabled="true"' : "") +
							(r == o.eV ? 'aria-pressed="true"' : "")
					),
						(l.opera || (l.gecko && l.mac)) &&
							n.push(' onkeypress="return false;"'),
						l.gecko &&
							n.push(' onblur="this.style.cssText = this.style.cssText;"');
					var u = -16 * (i.rD || 0);
					n.push(
						' onmouseover="CKFinder.tools.callFunction(',
						e._.qz,
						",",
						t,
						');" onmouseout="CKFinder.tools.callFunction(',
						e._.qm,
						",",
						t,
						');" onclick="CKFinder.tools.callFunction(',
						e._.ql,
						",",
						t,
						'); return false;"><span class="cke_icon_wrapper"><span class="cke_icon"' +
							(i.icon
								? ' style="background-image:url(' +
								  o.getUrl(i.icon) +
								  ");background-position:0 " +
								  u +
								  'px;"'
								: "") +
							'></span></span><span class="cke_label">'
					),
						i.hQ && n.push('<span class="cke_menuarrow"></span>'),
						n.push(d, "</span></a></span>");
				},
			},
		})),
		(p.ob = 400),
		(p.nj = ""),
		(function () {
			function e(e) {
				l.opera && e.setStyle("overflow", "hidden"),
					e.on("touchstart", function (t) {
						var n = t.data.$.touches[0];
						e.interval && (window.clearInterval(e.interval), delete e.interval),
							(e.lL = e.$.scrollTop),
							(e.nx = e.$.scrollLeft),
							(e.mP = n.pageY),
							(e.na = n.pageX),
							(e.mO = new Date());
					}),
					e.on("touchmove", function (n) {
						var o = n.data,
							i = o.$.touches[0];
						t(e, i.pageX, i.pageY) && o.preventDefault();
					}),
					e.on("touchend", function (o) {
						var i = o.data,
							a = i.$.changedTouches[0];
						if (t(e, a.pageX, a.pageY)) {
							i.preventDefault();
							var r = (new Date() - e.mO) / 100,
								l = a.pageX - e.na,
								s = a.pageY - e.mP;
							(e.mK = l / r),
								(e.nu = s / r),
								(e.jy = a.pageX),
								(e.mv = a.pageY),
								(e.nf = 0),
								(e.interval = window.setInterval(function () {
									n(e);
								}, 100));
						}
					});
			}
			function t(e, t, n) {
				var o = Math.round(t - e.na),
					i = Math.round(n - e.mP),
					a = e.nx - o,
					r = e.lL - i;
				return e.$.scrollLeft == a && e.$.scrollTop == r
					? !1
					: ((e.$.scrollLeft = a),
					  (e.$.scrollTop = r),
					  Math.abs(o) > Math.abs(i)
							? e.$.scrollLeft == a
							: e.$.scrollTop == r);
			}
			function n(e) {
				var n = 7,
					o = Math.cos(((e.nf / n) * Math.PI) / 2);
				return (
					(e.jy += e.mK * o),
					(e.mv += e.nu * o),
					e.nf++ > n || !t(e, e.jy, e.mv)
						? (window.clearInterval(e.interval), void delete e.interval)
						: void 0
				);
			}
			h.add("mobile", {
				bM: ["foldertree", "filesview"],
				bz: function (t) {
					var n = "ontouchstart" in window;
					(l.isMobile || n) &&
						((t.config.showContextMenuArrow = !0),
						l.isMobile &&
							t.on(
								"uiReady",
								function () {
									((l.webkit && l.version < 534) || l.opera) &&
										(e(t.layout.pS()), e(t.layout.pn())),
										(t.hs = function (e, t, n, o) {
											var i = window.prompt(t, n);
											null !== i && o(i);
										}),
										(t.msgDialog = function (e, t, n) {
											window.alert(t), n && n();
										}),
										(t.fe = function (e, t, n) {
											window.confirm(t) && n();
										});
								},
								null,
								null,
								20
							));
				},
			});
		})(),
		h.add("panel", {
			eK: function (e) {
				e.bY.kd(o.UI_PANEL, m.panel.dq);
			},
		}),
		(o.UI_PANEL = 2),
		(m.panel = function (e, t, n) {
			var i = this;
			t && c.extend(i, t), c.extend(i, { className: "" });
			var a = o.basePath;
			c.extend(i.css, [a + "skins/" + n + "/uipanel.css"]),
				(i.id = c.getNextNumber()),
				(i.document = e),
				(i._ = { iq: {} });
		}),
		(m.panel.dq = {
			create: function (e) {
				return new m.panel(e);
			},
		}),
		(m.panel.prototype = {
			nt: function (e) {
				var t = [];
				return this.er(e, t), t.join("");
			},
			er: function (e, t) {
				var n = this,
					o = "cke_" + n.id;
				if (
					(t.push(
						'<div class="',
						e.iy,
						' cke_compatibility" lang="',
						e.langCode,
						'" role="presentation" style="display:none;z-index:' +
							(e.config.baseFloatZIndex + 1) +
							'"><div id="',
						o,
						'"',
						' dir="',
						e.lang.dir,
						'"',
						' role="presentation" class="cke_panel cke_',
						e.lang.dir
					),
					n.className && t.push(" ", n.className),
					t.push('">'),
					n.lE || n.css.length)
				) {
					t.push('<iframe id="', o, '_frame" frameborder="0" src="');
					var i = l.isCustomDomain(),
						a =
							"document.open();" +
							(i ? 'document.domain="' + window.document.domain + '";' : "") +
							"document.close();";
					t.push(
						s
							? "javascript:void(function(){" + encodeURIComponent(a) + "}())"
							: ""
					),
						t.push('"></iframe>');
				}
				return t.push("</div></div>"), o;
			},
			oU: function () {
				var e = this._.rE;
				if (!e) {
					if (this.lE || this.css.length) {
						var t = this.document.getById("cke_" + this.id + "_frame"),
							n = t.getParent(),
							o = n.getAttribute("dir"),
							i = n.getParent().getAttribute("class").split(" ")[0],
							a = n.getParent().getAttribute("lang"),
							r = t.getFrameDocument();
						r.$.open(), l.isCustomDomain() && (r.$.domain = document.domain);
						var s = c.addFunction(
								c.bind(function () {
									(this.hm = !0), this.onLoad && this.onLoad();
								}, this)
							),
							d = r.getWindow();
						d.$.CKFinder = CKFinder;
						var u = l.cssClass.replace(/browser_quirks|browser_iequirks/g, "");
						r.$.write(
							"<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'><html dir=\"" +
								o +
								'" class="' +
								i +
								'_container" lang="' +
								a +
								'"><head><style>.' +
								i +
								'_container{visibility:hidden}</style></head><body class="cke_' +
								o +
								" cke_panel_frame " +
								u +
								' cke_compatibility" style="margin:0;padding:0" onload="var ckfinder = window.CKFinder || window.parent.CKFinder; ckfinder && ckfinder.tools.callFunction(' +
								s +
								');"></body><link type="text/css" rel=stylesheet href="' +
								this.css.join(
									'"><link type="text/css" rel="stylesheet" href="'
								) +
								'"></html>'
						),
							r.$.close(),
							(d.$.CKFinder = CKFinder),
							r.on(
								"keydown",
								function (e) {
									var t = this,
										n = e.data.db();
									return t._.onKeyDown && t._.onKeyDown(n) === !1
										? void e.data.preventDefault()
										: void (27 == n && t.onEscape && t.onEscape());
								},
								this
							),
							(e = r.bH());
					} else e = this.document.getById("cke_" + this.id);
					this._.rE = e;
				}
				return e;
			},
			qq: function (e, t) {
				var n = this;
				return (
					(t = n._.iq[e] = t || new m.panel.block(n.oU())), n._.iL || n.gf(e), t
				);
			},
			iv: function (e) {
				return this._.iq[e];
			},
			gf: function (e) {
				var t = this,
					n = t._.iq,
					o = n[e],
					i = t._.iL;
				return (
					i && i.hide(),
					(t._.iL = o),
					(o._.cQ = -1),
					(t._.onKeyDown = o.onKeyDown && c.bind(o.onKeyDown, o)),
					o.show(),
					o
				);
			},
		}),
		(m.panel.block = c.createClass({
			$: function (e) {
				var t = this;
				(t.element = e.append(
					e.getDocument().createElement("div", {
						attributes: { class: "cke_panel_block", role: "presentation" },
						gS: { display: "none" },
					})
				)),
					(t.jQ = {}),
					(t._.cQ = -1),
					t.element.hX();
			},
			_: {},
			ej: {
				show: function () {
					this.element.setStyle("display", "");
				},
				hide: function () {
					var e = this;
					(e.onHide && e.onHide.call(e) === !0) ||
						e.element.setStyle("display", "none");
				},
				onKeyDown: function (e) {
					var t = this,
						n = t.jQ[e];
					switch (n) {
						case "next":
							for (
								var o, i = t._.cQ, a = t.element.eG("a");
								(o = a.getItem(++i));

							)
								if (o.getAttribute("_cke_focus") && o.$.offsetWidth) {
									(t._.cQ = i), o.focus();
									break;
								}
							return !1;
						case "prev":
							for (
								i = t._.cQ, a = t.element.eG("a");
								i > 0 && (o = a.getItem(--i));

							)
								if (o.getAttribute("_cke_focus") && o.$.offsetWidth) {
									(t._.cQ = i), o.focus();
									break;
								}
							return !1;
						case "click":
							return (
								(i = t._.cQ),
								(o = i >= 0 && t.element.eG("a").getItem(i)),
								o && (o.$.click ? o.$.click() : o.$.onclick()),
								!1
							);
					}
					return !0;
				},
			},
		})),
		h.add("resize", {
			bz: function (e) {
				var t = e.config;
				t.nB &&
					e.on("uiReady", function () {
						function n(n) {
							e.document.bH().addClass("during_sidebar_resize");
							var o = n.data.$.screenX - a.x,
								i = r.width + o * ("rtl" == e.lang.dir ? -1 : 1);
							e.nJ(Math.max(t.nN, Math.min(i, t.nC)));
						}
						function i() {
							e.document.bH().removeClass("during_sidebar_resize"),
								o.document.removeListener("mousemove", n),
								o.document.removeListener("mouseup", i),
								e.document &&
									(e.document.removeListener("mousemove", n),
									e.document.removeListener("mouseup", i));
						}
						var a,
							r,
							l = null;
						e.layout.dV().on("mousedown", function (t) {
							l || (l = e.layout.dV()),
								t.data.bK().$ == l.$ &&
									((r = { width: l.$.offsetWidth || 0 }),
									(a = { x: t.data.$.screenX }),
									o.document.on("mousemove", n),
									o.document.on("mouseup", i),
									e.document &&
										(e.document.on("mousemove", n),
										e.document.on("mouseup", i)));
						});
					});
			},
		}),
		(p.nN = 120),
		(p.nC = 500),
		(p.nB = !0),
		(function () {
			function e() {
				var e = o.ld.hS("status", "status");
				e.bh("ShowFileInfo", ["requestShowFileInfo"], function (e) {
					e.result = this.oW("beforeShowFileInfo", e.data, function (e, n) {
						var i = this;
						if (!e) {
							var a = n.file;
							try {
								var r = a ? t(a, i.app.lang) : "";
								i.bn().setHtml(r), i.oW("successShowFileInfo", n);
							} catch (l) {
								throw (i.oW("failedShowFileInfo", n), o.ba(l));
							}
							i.oW("afterShowFileInfo", n);
						}
					});
				}),
					e.bh("ShowFolderInfo", ["requestShowFolderInfo"], function (e) {
						e.result = this.oW("beforeShowFolderInfo", e.data, function (t, i) {
							var a = this;
							if (!t) {
								{
									i.folder;
								}
								try {
									var r = n(e.data.ib.data().shownFiles.length, a.app.lang);
									a.bn().setHtml(r), a.oW("successShowFolderInfo", i);
								} catch (l) {
									throw (a.oW("failedShowFolderInfo", i), o.ba(l));
								}
								a.oW("afterShowFolderInfo", i);
							}
						});
					});
			}
			function t(e, t) {
				return (
					"<p>" +
					e.name +
					" (" +
					c.formatSize(e.size, t, !0) +
					", " +
					e.dateF +
					")</p>"
				);
			}
			function n(e, t) {
				var n;
				return (
					(n =
						0 === e
							? t.FilesCountEmpty
							: 1 == e
							? t.FilesCountOne
							: t.FilesCountMany.replace("%1", e)),
					"<p>" + c.htmlEncode(n) + "</p>"
				);
			}
			h.add("status", {
				bM: ["filesview"],
				onLoad: function () {
					e();
				},
				gr: function (e) {
					var t = this;
					e.on("themeSpace", function (e) {
						"mainBottom" == e.data.space &&
							(e.data.html +=
								'<div id="status_view" class="view" role="status"></div>');
					}),
						e.on("uiReady", function () {
							var n = e.document.getById("status_view"),
								i = e.ld["filesview.filesview"],
								a = o.ld.bz(e, "status", t, n, { parent: i });
							i.app == e &&
								(i.on("successSelectFile", function (e) {
									a.oW("requestShowFileInfo", e.data);
								}),
								i.on("successRenderFiles", function (e) {
									var t = { folder: e.data.folder, ib: i };
									a.oW("requestShowFolderInfo", t);
								})),
								e.on("afterCommandExecDefered", function (e) {
									if ("RemoveFile" == e.data.name) {
										var t = { folder: e.data.folder, ib: i };
										a.oW("requestShowFolderInfo", t);
									}
								}),
								a.on("afterShowFileInfo", function () {
									this.bn().getText() ||
										a.oW("requestShowFolderInfo", {
											ib: i,
											folder: i.data().folder,
										});
								});
						});
				},
			});
		})(),
		(function () {
			var e = function () {
				(this.fk = []), (this.pZ = !1);
			};
			e.prototype.focus = function () {
				for (var e, t = 0; (e = this.fk[t++]); )
					for (var n, o = 0; (n = e.items[o++]); )
						if (n.focus) return void n.focus();
			};
			var t = {
				hW: {
					iH: { qt: 1, source: 1 },
					exec: function (e) {
						e.dh &&
							((e.dh.pZ = !0),
							s
								? setTimeout(function () {
										e.dh.focus();
								  }, 100)
								: e.dh.focus());
					},
				},
			};
			h.add("toolbar", {
				bM: ["formpanel"],
				bz: function (n) {
					var o = function (e, t) {
						switch (t) {
							case "rtl" == n.lang.dir ? 37 : 39:
								for (
									;
									(e = e.next || (e.toolbar.next && e.toolbar.next.items[0])) &&
									!e.focus;

								);
								return e ? e.focus() : n.dh.focus(), !1;
							case "rtl" == n.lang.dir ? 39 : 37:
								for (
									;
									(e =
										e.previous ||
										(e.toolbar.previous &&
											e.toolbar.previous.items[
												e.toolbar.previous.items.length - 1
											])) && !e.focus;

								);
								if (e) e.focus();
								else {
									var o = n.dh.fk[n.dh.fk.length - 1].items;
									o[o.length - 1].focus();
								}
								return !1;
							case 27:
								return n.focus(), !1;
							case 13:
							case 32:
								return e.lc(), !1;
						}
						return !0;
					};
					n.on("themeSpace", function (t) {
						if ("mainTop" == t.data.space) {
							n.dh = new e();
							var i,
								a = "cke_" + c.getNextNumber(),
								r = [
									'<div id="toolbar_view" class="view"><div class="cke_toolbox cke_compatibility" role="toolbar" aria-labelledby="',
									a,
									'"',
								];
							r.push(">"),
								r.push(
									'<span id="',
									a,
									'" class="cke_voice_label">',
									n.lang.toolbar,
									"</span>"
								);
							for (
								var l = n.dh.fk,
									s =
										n.config.toolbar instanceof Array
											? n.config.toolbar
											: n.config["toolbar_" + n.config.toolbar],
									d = 0;
								d < s.length;
								d++
							) {
								var u = s[d];
								if (u) {
									var f = "cke_" + c.getNextNumber(),
										p = { id: f, items: [] };
									if ((i && (r.push("</div>"), (i = 0)), "/" !== u)) {
										r.push(
											'<span id="',
											f,
											'" class="cke_toolbar" role="presentation"><span class="cke_toolbar_start"></span>'
										);
										var h = l.push(p) - 1;
										h > 0 && ((p.previous = l[h - 1]), (p.previous.next = p));
										for (var g = 0; g < u.length; g++) {
											var v,
												b = u[g];
											if ((v = "-" == b ? m.separator : n.bY.create(b))) {
												v.canGroup
													? i ||
													  (r.push('<span class="cke_toolgroup">'), (i = 1))
													: i && (r.push("</span>"), (i = 0));
												var y = v.er(n, r);
												(h = p.items.push(y) - 1),
													h > 0 &&
														((y.previous = p.items[h - 1]),
														(y.previous.next = y)),
													(y.toolbar = p),
													(y.onkey = o);
											}
										}
										i && (r.push("</span>"), (i = 0)),
											r.push('<span class="cke_toolbar_end"></span></span>');
									} else r.push('<div class="cke_break"></div>');
								}
							}
							n.search && n.search.er(n, r),
								r.push("</div></div>"),
								(t.data.html += r.join(""));
						}
					}),
						n.bD("hW", t.hW);
				},
			});
		})(),
		(m.separator = {
			er: function (e, t) {
				return t.push('<span class="cke_separator"></span>'), {};
			},
		}),
		(p.toolbar_Basic = [["Upload", "Refresh"]]),
		(p.toolbar_Full = [["Upload", "Refresh", "Settings", "Maximize", "Help"]]),
		(p.toolbar = "Full"),
		(function () {
			h.add("tools", {
				eK: function (e) {
					this.app = e;
				},
				addTool: function (e, t) {
					var n = "tool_" + c.getNextNumber();
					return (
						(e = t
							? '<div id="' +
							  n +
							  '" class="view tool_panel" tabindex="0" style="display: none;">' +
							  e +
							  "</div>"
							: '<div id="' +
							  n +
							  '" class="tool" style="display: none;">' +
							  e +
							  "</div>"),
						this.app.layout.dV().getChild(0).appendHtml(e),
						n
					);
				},
				addToolPanel: function (e) {
					e = e || "";
					var t = this.addTool(e, 1),
						n = this.app.layout.dV().getChild(0).dB();
					return c.mH(n), t;
				},
				hideTool: function (e) {
					this.app.document.getById(e).setStyle("display", "none"),
						this.app.layout.ea(!0);
				},
				showTool: function (e) {
					this.app.document.getById(e).removeStyle("display"),
						this.app.layout.ea(!0);
				},
				removeTool: function (e) {
					this.hideTool(e), this.app.document.getById(e).remove();
				},
			});
		})(),
		(function () {
			function e() {
				function e() {
					var e = "RMRHY5Q4S,GGYXTSBLA,QS8F4ZFUJ";
					return o.bF.length > 0 && -1 != e.indexOf(o.bF.substr(0, 9));
				}
				function t(e, t) {
					var n = this,
						i = (n.data(), 1),
						a = this.tools.qO(),
						r = a && a.$.value;
					if (!r.length)
						return (
							e.data.preventDefault(!0),
							this.oW("failedUploadFileForm"),
							this.oW("afterUploadFileForm"),
							!1
						);
					var l = r.match(/\.([^\.]+)\s*$/)[1];
					if (
						(l && t.getResourceType().isExtensionAllowed(l)
							? (i = 0)
							: (e.data.preventDefault(),
							  n.app.msgDialog("", n.app.lang.UploadExtIncorrect)),
						i)
					)
						return (
							e.data.preventDefault(!0),
							this.oW("failedUploadFileForm"),
							this.oW("afterUploadFileForm"),
							!1
						);
					var s = n.app.document.getWindow().$;
					return (
						(s.OnUploadCompleted = function (e, o) {
							var i = { step: 3, filename: e, folder: t };
							if (o && !e) {
								n.app.msgDialog("", o);
								var a = n.tools.qB();
								a.setStyle("display", "none"),
									a.getChild(1).setText(""),
									a.getChild(2).setText(""),
									n.oW("failedUploadFileForm", i);
							} else
								o && n.app.msgDialog("", o),
									n.app.aV == t &&
										n.app.oW("requestShowFolderFiles", { folder: t, mw: e }),
									n.oW("requestUnloadForm"),
									n.oW("successUploadFileForm", i);
							n.oW("afterUploadFileForm", i);
							try {
								delete s.OnUploadCompleted;
							} catch (r) {
								s.OnUploadCompleted = void 0;
							}
						}),
						o.log("[UPLOADFORM] Starting IFRAME file upload."),
						this.oW("successUploadFileForm", { step: 2 }),
						!0
					);
				}
				function n(e, t, n) {
					return (
						'<form enctype="multipart/form-data" id="upload_form" role="region" action="' +
						n +
						'" method="POST" target="' +
						t +
						'"><h2 role="heading">' +
						e.lang.UploadTitle +
						'</h2><p><input type="file" name="upload" /></p><div class="buttons_wrapper"><div class="buttons"><input type="submit" value="' +
						e.lang.UploadBtn +
						'" /><input type="button" name="cancel" value="' +
						e.lang.UploadBtnCancel +
						'" /></div></div></form>'
					);
				}
				var i = o.ld.bX["formpanel.formpanel"];
				i &&
					(i.bh("UploadFileForm", ["requestUploadFileForm"], function () {
						var i = this.app.aV,
							a = this;
						this.oW(
							"beforeUploadFileForm",
							{ folder: i, step: 1 },
							function (i, r) {
								if (!i && !e()) {
									var l = this.data(),
										s = r.folder,
										d = 0;
									return (
										s ||
											(this.app.msgDialog("", this.app.lang.UploadNoFolder),
											(d = 1)),
										d ||
											s.acl.fileUpload ||
											(this.app.msgDialog("", this.app.lang.UploadNoPerms),
											(d = 1)),
										d
											? (this.oW("failedUploadFileForm"),
											  void this.oW("afterUploadFileForm"))
											: void this.oW(
													"beforeUploadFileForm",
													{ folder: s, step: 2 },
													function (e, i) {
														try {
															if ("upload" == l.dc)
																this.oW("requestUnloadForm", function () {
																	this.app.cS("upload").bR(o.aS),
																		this.oW("successUploadFileForm", i),
																		this.oW("afterUploadFileForm", i);
																});
															else {
																l.dc && this.oW("requestUnloadForm");
																var r = this.tools.qL(),
																	d = this.app.connector.composeUrl(
																		"FileUpload",
																		{},
																		s.type,
																		s
																	),
																	u = n(this.app, r.$.id, d),
																	f = this;
																this.oW(
																	"requestLoadForm",
																	{
																		html: u,
																		dq: c.bind(function (e) {
																			return t.call(f, e, s);
																		}),
																		cC: ["submit"],
																		cancelSubmit: 0,
																		gM: 0,
																		command: "upload",
																	},
																	function () {
																		this.eh.addClass("show_border"),
																			(i.step = 1),
																			this.oW("successUploadFileForm", i);
																	}
																);
																var p = function (e) {
																		if (
																			e.data.folder &&
																			e.data.folder.acl.fileUpload
																		) {
																			var t = a.tools.qO();
																			a.oW("requestUnloadForm"),
																				a.oW(
																					"requestUploadFileForm",
																					function () {
																						var e = a.tools.qO();
																						t.kB(e),
																							e.remove(),
																							delete a.tools.jj;
																					}
																				);
																		}
																	},
																	h = this.app.ld["filesview.filesview"];
																h.on("successShowFolderFiles", p),
																	this.on("requestUnloadForm", function (e) {
																		e.removeListener(),
																			h.removeListener(
																				"successShowFolderFiles",
																				p
																			);
																	});
															}
														} catch (m) {
															throw (
																(this.oW("failedUploadFileForm", i),
																this.oW("afterUploadFileForm", i),
																o.ba(m))
															);
														}
													}
											  )
									);
								}
							}
						);
					}),
					(i.tools.releaseDomNodes = c.override(
						i.tools.releaseDomNodes,
						function (e) {
							return function () {
								var t = this;
								e.apply(t, arguments),
									delete t.jj,
									delete t.jc,
									void 0 !== t.gq && (t.gq.remove(), delete t.gq);
							};
						}
					)),
					(i.tools.qB = function () {
						var e = this;
						return void 0 === e.jc && (e.jc = e.ib.bn().getChild([0, 2])), e.jc;
					}),
					(i.tools.qO = function () {
						var e = this;
						return (
							void 0 === e.jj && (e.jj = e.ib.bn().getChild([0, 1, 0])), e.jj
						);
					}),
					(i.tools.qL = function () {
						var e = this;
						if (void 0 === e.gq) {
							var t = l.isCustomDomain(),
								n = "ckf_" + c.getNextNumber(),
								o =
									'<iframe id="' +
									n +
									'" name="' +
									n +
									'" style="display:none" frameBorder="0"' +
									(t
										? " src=\"javascript:void((function(){document.open();document.domain='" +
										  document.domain +
										  "';document.close();})())\""
										: "") +
									' tabIndex="-1" allowTransparency="true"></iframe>',
								i = e.ib.app.document.bH();
							i.appendHtml(o), (e.gq = i.dB());
						}
						return e.gq;
					}));
			}
			h.add("uploadform", {
				bM: ["formpanel", "button"],
				readOnly: !1,
				md: function () {
					if (!l.webkit) return !0;
					var e = document.createElement("input");
					return e.setAttribute("type", "file"), e.disabled === !1;
				},
				onLoad: function () {
					this.md() && e();
				},
				gr: function (e) {
					this.md() &&
						(e.bD("upload", {
							exec: function (e) {
								e.oW("requestUploadFileForm", null, function () {
									var t = e.ld["formpanel.formpanel"].tools.formNode(),
										n = e.cg.inPopup && s && l.version > 8;
									n && t && t.submit(),
										e.cS("upload").bu == o.eV &&
											setTimeout(function () {
												if (t) {
													var e = t.eG("input").getItem(0);
													n ||
														e.on("change", function () {
															if (e.getValue())
																for (var n = 0; n < t.$.elements.length; n++) {
																	var o = t.$.elements[n];
																	"INPUT" == o.nodeName &&
																		"submit" == o.type &&
																		o.click();
																}
														}),
														e.$.click ? e.$.click() : e.focus();
												}
											}, 0);
								});
							},
						}),
						e.bY.add("Upload", o.UI_BUTTON, {
							label: e.lang.Upload,
							command: "upload",
						}),
						e.on("appReady", function () {
							e.ld["filesview.filesview"].on(
								"successShowFolderFiles",
								function () {
									var t = this.tools.currentFolder(),
										n = this.app.cS("upload");
									if (t && t.acl.fileUpload) n.bu == o.aY && n.bR(o.aS);
									else {
										var i = e.ld["formpanel.formpanel"];
										"upload" == i.data().dc && i.oW("requestUnloadForm"),
											n.bR(o.aY);
									}
								}
							);
						}));
				},
			});
		})(),
		(function () {
			function e(e, t) {
				function n() {
					if (!z) {
						try {
							var e = U.getElementsByTagName("body")[0].appendChild(b("span"));
							e.parentNode.removeChild(e);
						} catch (t) {
							return;
						}
						z = !0;
						for (var n = M.length, o = 0; n > o; o++) M[o]();
					}
				}
				function o(e) {
					z ? e() : (M[M.length] = e);
				}
				function i(e) {
					if (typeof A.addEventListener != T) A.addEventListener("load", e, !1);
					else if (typeof U.addEventListener != T)
						U.addEventListener("load", e, !1);
					else if (typeof A.attachEvent != T) y(A, "onload", e);
					else if ("function" == typeof A.onload) {
						var t = A.onload;
						A.onload = function () {
							t(), e();
						};
					} else A.onload = e;
				}
				function a() {
					B ? r() : l();
				}
				function r() {
					var e = U.getElementsByTagName("body")[0],
						t = b(R);
					t.setAttribute("type", I);
					var n = e.appendChild(t);
					if (n) {
						var o = 0;
						!(function () {
							var i;
							try {
								i = typeof n.GetVariable != T;
							} catch (a) {
								i = !1;
							}
							if (i) {
								var r = n.GetVariable("$version");
								r &&
									((r = r.split(" ")[1].split(",")),
									(G.pv = [
										parseInt(r[0], 10),
										parseInt(r[1], 10),
										parseInt(r[2], 10),
									]));
							} else if (10 > o)
								return o++, void setTimeout(arguments.callee, 10);
							e.removeChild(t), (n = null), l();
						})();
					} else l();
				}
				function l() {
					var e = j.length;
					if (e > 0)
						for (var t = 0; e > t; t++) {
							var n = j[t].id,
								o = j[t].callbackFn,
								i = { success: !1, id: n };
							if (G.pv[0] > 0) {
								var a = v(n);
								if (a)
									if (!w(j[t].swfVersion) || (G.wk && G.wk < 312))
										if (j[t].ln && d()) {
											var r = {};
											(r.data = j[t].ln),
												(r.width = a.getAttribute("width") || "0"),
												(r.height = a.getAttribute("height") || "0"),
												a.getAttribute("class") &&
													(r.styleclass = a.getAttribute("class")),
												a.getAttribute("align") &&
													(r.align = a.getAttribute("align"));
											for (
												var l = {},
													f = a.getElementsByTagName("param"),
													p = f.length,
													h = 0;
												p > h;
												h++
											)
												"movie" != f[h].getAttribute("name").toLowerCase() &&
													(l[f[h].getAttribute("name")] =
														f[h].getAttribute("value"));
											c(r, l, n, o);
										} else u(a), o && o(i);
									else _(n, !0), o && ((i.success = !0), (i.ref = s(n)), o(i));
							} else if ((_(n, !0), o)) {
								var m = s(n);
								m &&
									typeof m.SetVariable != T &&
									((i.success = !0), (i.ref = m)),
									o(i);
							}
						}
				}
				function s(e) {
					var t = null,
						n = v(e);
					if (n && "OBJECT" == n.nodeName)
						if (typeof n.SetVariable != T) t = n;
						else {
							var o = n.getElementsByTagName(R)[0];
							o && (t = o);
						}
					return t;
				}
				function d() {
					return !K && w("6.0.65") && (G.win || G.mac) && !(G.wk && G.wk < 312);
				}
				function c(e, t, n, o) {
					(K = !0), (E = o || null), (S = { success: !1, id: n });
					var i = v(n);
					if (i) {
						"OBJECT" == i.nodeName
							? ((C = f(i)), (x = null))
							: ((C = i), (x = n)),
							(e.id = L),
							(typeof e.width == T ||
								(!/%$/.test(e.width) && parseInt(e.width, 10) < 310)) &&
								(e.width = "310"),
							(typeof e.height == T ||
								(!/%$/.test(e.height) && parseInt(e.height, 10) < 137)) &&
								(e.height = "137"),
							(U.title = U.title.slice(0, 47) + " - Flash Player Installation");
						var a = G.ie && G.win ? "ActiveX" : "PlugIn",
							r =
								"MMredirectURL=" +
								A.location.toString().replace(/&/g, "%26") +
								"&MMplayerType=" +
								a +
								"&MMdoctitle=" +
								U.title;
						if (
							(typeof t.flashvars != T
								? (t.flashvars += "&" + r)
								: (t.flashvars = r),
							G.ie && G.win && 4 != i.readyState)
						) {
							var l = b("div");
							(n += "SWFObjectNew"),
								l.setAttribute("id", n),
								i.parentNode.insertBefore(l, i),
								(i.style.display = "none"),
								(function () {
									4 == i.readyState
										? i.parentNode.removeChild(i)
										: setTimeout(arguments.callee, 10);
								})();
						}
						p(e, t, n);
					}
				}
				function u(e) {
					if (G.ie && G.win && 4 != e.readyState) {
						var t = b("div");
						e.parentNode.insertBefore(t, e),
							t.parentNode.replaceChild(f(e), t),
							(e.style.display = "none"),
							(function () {
								4 == e.readyState
									? e.parentNode.removeChild(e)
									: setTimeout(arguments.callee, 10);
							})();
					} else e.parentNode.replaceChild(f(e), e);
				}
				function f(e) {
					var t = b("div");
					if (G.win && G.ie) t.innerHTML = e.innerHTML;
					else {
						var n = e.getElementsByTagName(R)[0];
						if (n) {
							var o = n.childNodes;
							if (o)
								for (var i = o.length, a = 0; i > a; a++)
									(1 == o[a].nodeType && "PARAM" == o[a].nodeName) ||
										8 == o[a].nodeType ||
										t.appendChild(o[a].cloneNode(!0));
						}
					}
					return t;
				}
				function p(e, t, n) {
					var o,
						i = v(n);
					if (G.wk && G.wk < 312) return o;
					if (i)
						if ((typeof e.id == T && (e.id = n), G.ie && G.win)) {
							var a,
								r = "";
							for (a in e)
								e[a] != Object.prototype[a] &&
									("data" == a.toLowerCase()
										? (t.movie = e[a])
										: "styleclass" == a.toLowerCase()
										? (r += ' class="' + e[a] + '"')
										: "classid" != a.toLowerCase() &&
										  (r += " " + a + '="' + e[a] + '"'));
							var l,
								s = "";
							for (l in t)
								t[l] != Object.prototype[l] &&
									(s += '<param name="' + l + '" value="' + t[l] + '" />');
							(i.outerHTML =
								'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
								r +
								">" +
								s +
								"</object>"),
								(q[q.length] = e.id),
								(o = v(e.id));
						} else {
							var d = b(R);
							d.setAttribute("type", I);
							var c;
							for (c in e)
								e[c] != Object.prototype[c] &&
									("styleclass" == c.toLowerCase()
										? d.setAttribute("class", e[c])
										: "classid" != c.toLowerCase() && d.setAttribute(c, e[c]));
							var u;
							for (u in t)
								t[u] != Object.prototype[u] &&
									"movie" != u.toLowerCase() &&
									h(d, u, t[u]);
							i.parentNode.replaceChild(d, i), (o = d);
						}
					return o;
				}
				function h(e, t, n) {
					var o = b("param");
					o.setAttribute("name", t),
						o.setAttribute("value", n),
						e.appendChild(o);
				}
				function m(e) {
					var t = v(e);
					t &&
						"OBJECT" == t.nodeName &&
						(G.ie && G.win
							? ((t.style.display = "none"),
							  (function () {
									4 == t.readyState ? g(e) : setTimeout(arguments.callee, 10);
							  })())
							: t.parentNode.removeChild(t));
				}
				function g(e) {
					var t = v(e);
					if (t) {
						var n;
						for (n in t) "function" == typeof t[n] && (t[n] = null);
						t.parentNode.removeChild(t);
					}
				}
				function v(e) {
					var t = null;
					try {
						t = U.getElementById(e);
					} catch (n) {}
					return t;
				}
				function b(e) {
					return U.createElement(e);
				}
				function y(e, t, n) {
					e.attachEvent(t, n), (H[H.length] = [e, t, n]);
				}
				function w(e) {
					var t = G.pv,
						n = e.split(".");
					return (
						(n[0] = parseInt(n[0], 10)),
						(n[1] = parseInt(n[1], 10) || 0),
						(n[2] = parseInt(n[2], 10) || 0),
						t[0] > n[0] ||
						(t[0] == n[0] && t[1] > n[1]) ||
						(t[0] == n[0] && t[1] == n[1] && t[2] >= n[2])
							? !0
							: !1
					);
				}
				function F(e, t, n, o) {
					if (!G.ie || !G.mac) {
						var i = U.getElementsByTagName("head")[0];
						if (i) {
							var a = n && "string" == typeof n ? n : "screen";
							if ((o && ((N = null), (D = null)), !N || D != a)) {
								var r = b("style");
								r.setAttribute("type", "text/css"),
									r.setAttribute("media", a),
									(N = i.appendChild(r)),
									G.ie &&
										G.win &&
										typeof U.styleSheets != T &&
										U.styleSheets.length > 0 &&
										(N = U.styleSheets[U.styleSheets.length - 1]),
									(D = a);
							}
							G.ie && G.win
								? N && typeof N.addRule == R && N.addRule(e, t)
								: N &&
								  typeof U.createTextNode != T &&
								  N.appendChild(U.createTextNode(e + " {" + t + "}"));
						}
					}
				}
				function _(e, t) {
					if (V) {
						var n = t ? "visible" : "hidden";
						z && v(e)
							? (v(e).style.visibility = n)
							: F("#" + e, "visibility:" + n);
					}
				}
				function k(e) {
					var t = /[\\\"<>\.;]/,
						n = null != t.exec(e);
					return n && typeof encodeURIComponent != T
						? encodeURIComponent(e)
						: e;
				}
				{
					var C,
						x,
						E,
						S,
						N,
						D,
						T = "undefined",
						R = "object",
						$ = "Shockwave Flash",
						W = "ShockwaveFlash.ShockwaveFlash",
						I = "application/x-shockwave-flash",
						L = "SWFObjectExprInst",
						O = "onreadystatechange",
						A = e,
						U = t,
						P = navigator,
						B = !1,
						M = [a],
						j = [],
						q = [],
						H = [],
						z = !1,
						K = !1,
						V = !0,
						G = (function () {
							var e =
									typeof U.getElementById != T &&
									typeof U.getElementsByTagName != T &&
									typeof U.createElement != T,
								t = P.userAgent.toLowerCase(),
								n = P.platform.toLowerCase(),
								o = /win/.test(n ? n : t),
								i = /mac/.test(n ? n : t),
								a = /webkit/.test(t)
									? parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1"))
									: !1,
								r = !1,
								l = [0, 0, 0],
								s = null;
							if (typeof P.plugins != T && typeof P.plugins[$] == R)
								(s = P.plugins[$].description),
									!s ||
										(typeof P.mimeTypes != T &&
											P.mimeTypes[I] &&
											!P.mimeTypes[I].enabledPlugin) ||
										((B = !0),
										(r = !1),
										(s = s.replace(/^.*\s+(\S+\s+\S+$)/, "$1")),
										(l[0] = parseInt(s.replace(/^(.*)\..*$/, "$1"), 10)),
										(l[1] = parseInt(s.replace(/^.*\.(.*)\s.*$/, "$1"), 10)),
										(l[2] = /[a-zA-Z]/.test(s)
											? parseInt(s.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10)
											: 0));
							else if (typeof A.ActiveXObject != T)
								try {
									var d = new ActiveXObject(W);
									d &&
										((s = d.GetVariable("$version")),
										s &&
											((r = !0),
											(s = s.split(" ")[1].split(",")),
											(l = [
												parseInt(s[0], 10),
												parseInt(s[1], 10),
												parseInt(s[2], 10),
											])));
								} catch (c) {}
							return { w3: e, pv: l, wk: a, ie: r, win: o, mac: i };
						})();
					!(function () {
						G.w3 &&
							(((typeof U.readyState != T && "complete" == U.readyState) ||
								(typeof U.readyState == T &&
									(U.getElementsByTagName("body")[0] || U.body))) &&
								n(),
							z ||
								(typeof U.addEventListener != T &&
									U.addEventListener("DOMContentLoaded", n, !1),
								G.ie &&
									G.win &&
									(U.attachEvent(O, function () {
										"complete" == U.readyState &&
											(U.detachEvent(O, arguments.callee), n());
									}),
									A == top &&
										!(function () {
											if (!z) {
												try {
													U.documentElement.doScroll("left");
												} catch (e) {
													return void setTimeout(arguments.callee, 0);
												}
												n();
											}
										})()),
								G.wk &&
									!(function () {
										return z
											? void 0
											: /loaded|complete/.test(U.readyState)
											? void n()
											: void setTimeout(arguments.callee, 0);
									})(),
								i(n)));
					})();
				}
				setTimeout(function () {
					n();
				}, 100);
				!(function () {
					G.ie &&
						G.win &&
						e.attachEvent("onunload", function () {
							for (var e = H.length, t = 0; e > t; t++)
								H[t][0].detachEvent(H[t][1], H[t][2]);
							for (var n = q.length, o = 0; n > o; o++) m(q[o]);
							var i;
							for (i in G) G[i] = null;
							if (((G = null), "undefined" != typeof swfobject)) {
								var a;
								for (a in swfobject) swfobject[a] = null;
								swfobject = null;
							}
						});
				})();
				return {
					gH: function (e, t, n, o) {
						if (G.w3 && e && t) {
							var i = {};
							(i.id = e),
								(i.swfVersion = t),
								(i.ln = n),
								(i.callbackFn = o),
								(j[j.length] = i),
								_(e, !1);
						} else o && o({ success: !1, id: e });
					},
					lp: function (e) {
						return G.w3 ? s(e) : void 0;
					},
					embedSWF: function (e, t, n, i, a, r, l, s, u, f) {
						var h = { success: !1, id: t };
						G.w3 && !(G.wk && G.wk < 312) && e && t && n && i && a
							? (_(t, !1),
							  o(function () {
									(n += ""), (i += "");
									var o = {};
									if (u && typeof u === R) {
										var m;
										for (m in u) o[m] = u[m];
									}
									(o.data = e), (o.width = n), (o.height = i);
									var g = {};
									if (s && typeof s === R) {
										var v;
										for (v in s) g[v] = s[v];
									}
									if (l && typeof l === R) {
										var b;
										for (b in l)
											typeof g.flashvars != T
												? (g.flashvars += "&" + b + "=" + l[b])
												: (g.flashvars = b + "=" + l[b]);
									}
									if (w(a)) {
										var y = p(o, g, t);
										o.id == t && _(t, !0), (h.success = !0), (h.ref = y);
									} else {
										if (r && d()) return (o.data = r), void c(o, g, t, f);
										_(t, !0);
									}
									f && f(h);
							  }))
							: f && f(h);
					},
					switchOffAutoHideShow: function () {
						V = !1;
					},
					ua: G,
					kL: function () {
						return { major: G.pv[0], minor: G.pv[1], release: G.pv[2] };
					},
					kf: w,
					iV: function (e, t, n) {
						return G.w3 ? p(e, t, n) : void 0;
					},
					jS: function (e, t, n, o) {
						G.w3 && d() && c(e, t, n, o);
					},
					jv: function (e) {
						G.w3 && m(e);
					},
					ik: function (e, t, n, o) {
						G.w3 && F(e, t, n, o);
					},
					cz: o,
					jC: i,
					kY: function (e) {
						var t = U.location.search || U.location.hash;
						if (t) {
							if ((/\?/.test(t) && (t = t.split("?")[1]), null == e))
								return k(t);
							for (var n = t.split("&"), o = 0; o < n.length; o++)
								if (n[o].substring(0, n[o].indexOf("=")) == e)
									return k(n[o].substring(n[o].indexOf("=") + 1));
						}
						return "";
					},
					lq: function () {
						if (K) {
							var e = v(L);
							e &&
								C &&
								(e.parentNode.replaceChild(C, e),
								x && (_(x, !0), G.ie && G.win && (C.style.display = "block")),
								E && E(S)),
								(K = !1);
						}
					},
				};
			}
			CKFinder.addPlugin("flashupload", {
				readOnly: !1,
				appReady: function (t) {
					if ("asp" != t.config.connectorLanguage || CKFinder.env.ie) {
						var n = t.document,
							o = n.defaultView || n.parentWindow,
							i = e(o, n);
						i.kf("10.2.0") &&
							setTimeout(function () {
								t.replaceUploadForm(
									'<iframe src="' +
										CKFinder.getPluginPath("flashupload") +
										'Uploader.html" style="width: 100%; height: 98%;" frameBorder="0"></iframe>',
									function () {
										t.resizeFormPanel(100),
											(o.api = t),
											(o.create_swfobject = e),
											(o.sessionIdentifiers = {
												CFID: "CFID",
												CFTOKEN: "CFTOKEN",
												JSESSIONID: "jsessionid",
											}),
											CKFinder.env.ie ||
												o.flash_cookies ||
												t.connector.sendCommandPost(
													"LoadCookies",
													null,
													null,
													function (e) {
														if (e.checkError()) return !1;
														var t = e.selectSingleNode("Connector/Cookies");
														if (t) {
															var n =
																	t.attributes.getNamedItem(
																		"sessionCookieName"
																	),
																i = t.attributes.getNamedItem(
																	"sessionParameterName"
																);
															n &&
																n.value &&
																i &&
																i.value &&
																(o.sessionIdentifiers[n.value] = i.value);
														}
														var a = e.selectNodes("Connector/Cookies/Cookie");
														if (a && a.length) {
															o.flash_cookies = {};
															for (var r = 0; r < a.length; r++) {
																var l =
																		a[r].attributes.getNamedItem("value").value,
																	s =
																		a[r].attributes.getNamedItem("name").value;
																o.flash_cookies[s] = l;
															}
														}
													}
												);
									},
									!1,
									12
								);
							}, 100);
					}
				},
			});
		})(),
		(function () {
			function e(e, n) {
				if (E() && !n.config.readOnly) {
					var o = new t(n),
						a = new y(n),
						r = new w(n, a),
						s = new l(e, n, a, r),
						d = new i(e, n, a, r, s),
						c = new m(e, n, a, r, s),
						u = new v(n, a, r);
					s.tS(window, q, H, z, K, V),
						r.tJ(n.config.maxSimultaneousUploads),
						(r.uI = function (e) {
							s.ux = e;
						}),
						u.ns(c),
						a.ns(u),
						r.ns(o),
						r.ns(u),
						r.ns(a),
						N(e, n, "filesview.filesview", function (t, n, o) {
							D(e, t, d, s, a, r, u, o);
						}),
						N(e, n, "formpanel.formpanel", function (t, n, o) {
							T(e, t, d, s, a, r, u, o);
						}),
						setInterval(function () {
							r.sX() && r.tx();
						}, 1e3);
				}
			}
			var t,
				n,
				i,
				a,
				r,
				l,
				s,
				d,
				u,
				p,
				h,
				m,
				g,
				v,
				b,
				y,
				w,
				F,
				_,
				k,
				C,
				x,
				E,
				S,
				N,
				D,
				T,
				R,
				$,
				W,
				I,
				L,
				O = /\.([^\.]+)\s*$/,
				A = /^(jpg|jpeg|gif|png|bmp)$/i,
				U = /\|/,
				P = /(\{\{([a-z_]+)\}\})/g,
				B = function () {
					return new Date().getTime();
				},
				M = 500,
				j = !1,
				q = "ckf_plugin_html5upload_" + B(),
				H = q + "_fallbackAsyncArrayTraverse",
				z = q + "_fallbackShouldFallback",
				K = q + "_fallbackOnFileBlobReady",
				V = q + "_fallbackOnXMLHttpRequestReady",
				G = "CKFinder._['" + q + "']['{{application_name}}']",
				X =
					"var _files = ((('undefined' === typeof files) ? (this.files || (event.dataTransfer && event.dataTransfer.files)) : files) || []);setTimeout(function () {" +
					G +
					"['" +
					H +
					"'](_files, function (file, index, files) {var formData = new FormData(),uploadBlob,xhr = new XMLHttpRequest();if (file && " +
					G +
					"['" +
					z +
					"']()) {formData.append('upload', file);uploadBlob = " +
					G +
					"['" +
					K +
					"'](file, formData);" +
					G +
					"['" +
					V +
					"'](file, uploadBlob, xhr, xhr.send.bind(xhr, formData), xhr.abort.bind(xhr));} else {return false;}});}, " +
					M +
					");",
				Y =
					'<div id="ckf_upload_form" ondrop="' +
					X +
					'"><div class="ckf_upload_info" id="ckf_globalUploads"><div class="ckf_progress_wrapper"><div class="ckf_progress_info"><span></span><span></span><div class="ckf_progress_bar_container"><div></div></div><span class="ckf_status"></span><span class="ckf_speed"></span></div></div><div class="ckf_uploadButtons"><input type="file" {{input_multiple}} id="ckf_fileInput" onchange="' +
					X +
					'"><a class="cke_dialog_ui_button" href="javascript:void(0);"><span class="cke_dialog_ui_button" id="ckf_addFiles">{{lang_upload_add_files}}</span></a><br><a class="cke_dialog_ui_button cke_dialog_ui_button_ok" href="javascript:void(0);" id="ckf_cancelUpload"><span class="cke_dialog_ui_button">{{lang_close_button}}</span></a></div></div></div>',
				Z =
					'<div class="ckf_progress_wrapper"><div class="ckf_progress_info"><span>{{file_name}}</span><span></span><div class="ckf_progress_bar_container"><div></div></div><span class="ckf_status"></span><span class="ckf_speed"></span><div class="ckf_outcome"></div></div></div><div class="ckf_uploadButtons"><a class="cke_dialog_ui_button cke_dialog_ui_button_cancel" name="cancel"><span class="cke_dialog_ui_button">{{lang_cancel_button}}</span></a></div>';
			(C = Object.hasOwnProperty("create")
				? Object.create
				: function (e) {
						return (j = !0), e;
				  }),
				(k = function (e, t, n) {
					var o,
						i = 10,
						a = 10,
						r = 0;
					n || (n = null),
						(t = t.bind(n)),
						(o = function () {
							for (var n, l = 0, s = B(); ; ) {
								if (((n = e.item ? e.item(r) : e[r]), !n || !1 === t(n, r, e)))
									return;
								if (((r += 1), (l += 1), l >= a && B() - s > i))
									return setTimeout(o, i);
							}
						})();
				}),
				(x = function (e) {
					return function (t) {
						var n;
						for (n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
						return t;
					};
				}),
				(a = function () {
					this.uU = [];
				}),
				(a.prototype.mD = function (e) {
					var t = this;
					if (!(e instanceof a))
						throw new Error("Invalid argument: expected EventDispatcher.");
					e.sy().forEach(function (e) {
						t.ns(e);
					});
				}),
				(a.mixin = x(a.prototype)),
				(a.prototype.ns = function (e) {
					if (!(e instanceof r))
						throw new Error("Invalid argument: expected EventSubscriber.");
					if (this.sL(e))
						throw new Error(
							"Logic error: same EventSubscriber is added twice to the EventDispatcher"
						);
					this.uU.push(e);
				}),
				(a.prototype.dispatch = function (e, t) {
					this.uU.forEach(function (n) {
						var o = n.tc();
						o.hasOwnProperty(e) && n[o[e]].apply(n, t);
					});
				}),
				(a.prototype.sy = function (e) {
					return e
						? this.uU.filter(function (t) {
								return t.sV(e);
						  })
						: this.uU.slice(0);
				}),
				(a.prototype.sL = function (e) {
					return -1 !== this.uU.indexOf(e);
				}),
				(a.prototype.removeSubscriber = function (e) {
					var t = this.uU.indexOf(e);
					if (!(e instanceof r))
						throw new Error("Invalid argument: expected EventSubscriber.");
					if (-1 === t)
						throw new Error(
							"Logic error: this EventSubscriber is not registered"
						);
					this.uU.splice(t, 1);
				}),
				(r = function () {}),
				(r.prototype.sV = function (e) {
					return this.tc().hasOwnProperty(e);
				}),
				(r.prototype.tc = function () {
					throw new Error("This method needs to be overriden in child class.");
				}),
				(t = function () {
					r.call(this);
				}),
				(t.prototype = C(r.prototype)),
				(t.prototype.tc = function () {
					var e = {};
					return (e[w.qM] = "tF"), e;
				}),
				(t.prototype.tF = function (e, t) {
					var n = t.targetFolder,
						o = e.connector.composeUrl(
							"FileUpload",
							{ response_type: "txt" },
							n.type,
							n
						);
					t.bT.open("POST", o);
				}),
				(d = function (e, t, n, o) {
					var i = this;
					r.call(i),
						(i.ckFinder = e),
						(i.application = t),
						(i.ty = n),
						(i.ub = o);
				}),
				(d.prototype = C(r.prototype)),
				(h = function (e) {
					this.tw(e);
				}),
				(h.mixin = x(h.prototype)),
				(h.prototype.tj = function () {
					if (!this.so) throw new Error("Form panel widget is not set.");
					return this.so;
				}),
				(h.prototype.sX = function () {
					return !!this.so;
				}),
				(h.prototype.uV = function () {}),
				(h.prototype.tC = function () {}),
				(h.prototype.tw = function (e) {
					var t = this;
					!t.so && e
						? t.uV(e)
						: t.so && e
						? (t.tC(), t.uV(e))
						: t.so && !e && t.tC(),
						(t.so = e);
				}),
				(i = function (e, t, n, o) {
					d.call(this, e, t, n, o), h.call(this);
				}),
				(i.prototype = C(d.prototype)),
				(i.prototype = h.mixin(i.prototype)),
				(i.prototype.mE = function (e) {
					var t = this,
						n = e.layout.pn(),
						o = n.getDocument(),
						i = t.sS.bind(t),
						a = t.ss.bind(t),
						r = t.rs.bind(t);
					o.on("drop", r),
						o.on("dragover", a),
						n.on("dragover", i),
						t.domElementListeners || (t.domElementListeners = []),
						t.domElementListeners.push(
							{ evt: "drop", fO: r, bi: o },
							{ evt: "dragover", fO: a, bi: o },
							{ evt: "dragover", fO: i, bi: n }
						);
				}),
				(i.prototype.ss = function (e) {
					var t = e.data,
						n = t.$.dataTransfer;
					if (n) {
						n.dropEffect = "none";
						try {
							n.effectAllowed = "none";
						} catch (o) {}
						this.ckFinder.env.webkit && t.preventDefault();
					}
				}),
				(i.prototype.rs = function (e) {
					var t = e.data.$.dataTransfer;
					t &&
						t.files &&
						t.files.length > 0 &&
						(this.ub.uG(t.files), e.data.preventDefault());
				}),
				(i.prototype.uV = function (e) {
					var t = this,
						n = e.bn().getDocument(),
						o = t.sS.bind(t),
						i = n.getById("ckf_upload_form");
					t.domElementListeners || (t.domElementListeners = []),
						t.domElementListeners.length > 0 && t.tC(),
						t.mE(t.application),
						i.on("dragover", o),
						t.domElementListeners.push({ evt: "dragover", fO: o, bi: i });
				}),
				(i.prototype.sS = function (e) {
					var t = e.data,
						n = t.$.dataTransfer;
					n &&
						((n.files && n.files.length) ||
						(n.types &&
							((n.types.contains && n.types.contains("Files")) ||
								(n.types.indexOf && -1 !== n.types.indexOf("Files"))))
							? ((n.dropEffect = "copy"), t.stopPropagation())
							: (n.dropEffect = "none"),
						t.preventDefault());
				}),
				(i.prototype.tC = function () {
					var e, t;
					for (e = 0; e < this.domElementListeners.length; e += 1)
						(t = this.domElementListeners[e]), t.bi.removeListener(t.evt, t.fO);
					delete this.domElementListeners;
				}),
				(l = function (e, t, n, o) {
					d.call(this, e, t, n, o), (this.pJ = {}), (this.ux = !0);
				}),
				(l.prototype = C(d.prototype)),
				(l.prototype.lT = function (e) {
					var t,
						n,
						o = this;
					for (t in o.pJ)
						if (o.pJ.hasOwnProperty(t))
							for (n = 0; n < e.length; n += 1)
								e[n] === o.pJ[t] && delete o.pJ[t];
				}),
				(l.prototype.ti = function (e, t) {
					return this.ux ? new g(e, new p(t)) : void 0;
				}),
				(l.prototype.uK = function (e, t, o, i, a) {
					var r = this;
					if (r.ux) {
						var l;
						if (!r.ub.sX()) return void a();
						(l = new n(r.application, r.application.aV, t, i, a)),
							l.ns(r.ty),
							l.nv(o),
							t.ns(l),
							(r.ub.expectedFiles -= 1),
							r.ub.tL(r.application, l);
					}
				}),
				(l.prototype.tS = function (e, t, n, o, i, a) {
					var r = this,
						l = {};
					(l[n] = k),
						(l[o] = r.shouldFallback.bind(r)),
						(l[i] = r.ti.bind(r)),
						(l[a] = r.uK.bind(r)),
						e.CKFinder.hasOwnProperty("_") || (e.CKFinder._ = {}),
						e.CKFinder._.hasOwnProperty(t) || (e.CKFinder._[t] = {}),
						(e.CKFinder._[t][r.application.name] = l);
				}),
				(l.prototype.shouldFallback = function () {
					return !this.ub.shouldStopProcessing && this.ux;
				}),
				(s = function () {
					a.call(this);
				}),
				(s.prototype = C(a.prototype)),
				(s.qQ = "xhr.header"),
				(s.prototype.tn = function () {
					throw new Error("This method needs to be overriden in child class.");
				}),
				(u = function (e) {
					s.call(this), (this.file = e);
				}),
				(u.prototype = C(s.prototype)),
				(u.prototype.tn = function (e, t) {
					var n = new FormData();
					n.append("upload", this.file), t(n);
				}),
				(p = function (e) {
					s.call(this), (this.formData = e);
				}),
				(p.prototype = C(s.prototype)),
				(p.prototype.tn = function (e, t) {
					t(this.formData);
				}),
				(m = function (e, t, n, o, i) {
					d.call(this, e, t, n, o), (this.qJ = i);
				}),
				(m.prototype = C(d.prototype)),
				(m.prototype.tc = function () {
					var e = {};
					return (e[v.qN] = "onFileInputChange"), e;
				}),
				(m.prototype.onFileInputChange = function (e, t) {
					this.ub.uG(t) && this.qJ.lT(t);
				}),
				(g = function (e, t) {
					(this.sz = t), (this.file = e);
				}),
				(g.prototype = C(a.prototype)),
				(g.prototype.mD = function (e) {
					return this.sz.mD(e);
				}),
				(g.prototype.ns = function (e) {
					return this.sz.ns(e);
				}),
				(g.prototype.dispatch = function (e, t) {
					return this.sz.dispatch(e, t);
				}),
				(g.prototype.bZ = function () {
					return this.file;
				}),
				(g.prototype.wv = function () {
					var e = "",
						t = this.getFileName();
					return O.test(t) ? ((e = t.match(O)), e[1].toLowerCase()) : e;
				}),
				(g.prototype.getFileName = function () {
					return this.file.name;
				}),
				(g.prototype.getFileSize = function () {
					return this.file.size;
				}),
				(g.prototype.sy = function (e) {
					return this.sz.sy(e);
				}),
				(g.prototype.tn = function (e) {
					this.sz.tn(this.file, e);
				}),
				(b = function () {}),
				(b.prototype = C(r.prototype)),
				(b.pH = "abort"),
				(b.rj = "error"),
				(b.qk = "load"),
				(b.rc = "progress"),
				(b.prototype.tc = function () {
					var e = {};
					return (
						(e[b.pH] = "onAbort"),
						(e[b.rj] = "onError"),
						(e[b.qk] = "onLoad"),
						(e[b.rc] = "onProgress"),
						e
					);
				}),
				(b.prototype.onAbort = function () {}),
				(b.prototype.onError = function () {}),
				(b.prototype.onLoad = function () {}),
				(b.prototype.onProgress = function () {}),
				(y = function (e) {
					var t = this;
					a.call(t), b.call(t), (t.application = e), (t.tM = []);
				}),
				(y.prototype = C(b.prototype)),
				(y.prototype = a.mixin(y.prototype)),
				(y.prototype.mC = function () {
					var e = this.tM.concat();
					(this.tM = []),
						k(e, function (e) {
							e && e.sY() && e.lN();
						});
				}),
				(y.prototype.mU = function (e) {
					this.tM.push(e);
				}),
				(y.prototype.nU = function (e) {
					var t = this.tM.indexOf(e);
					if (-1 === t)
						throw new Error("Given upload supervisor is not attached.");
					this.tM.splice(t, 1);
				}),
				(y.prototype.tc = function () {
					var e = b.prototype.tc.call(this);
					return (e[F.pN] = "uc"), (e[w.qM] = "tF"), e;
				}),
				(y.prototype.sj = function (e) {
					var t;
					for (t = 0; t < this.tM.length; t += 1)
						if (e === this.tM[t].uploadBlob.bZ()) return !0;
					return !1;
				}),
				(y.prototype.sB = function (e) {
					return this.tM.indexOf(e) >= 0;
				}),
				(y.prototype.tF = function (e, t) {
					this.mU(t);
				}),
				(y.prototype.uc = function (e) {
					this.sB(e) && this.nU(e);
				}),
				(v = function (e, t, n) {
					var o = this;
					a.call(o),
						h.call(o),
						b.call(o),
						(o.application = e),
						(o.attachedUploadViewsNumber = 0),
						(o.wU = []),
						(o.sa = 0),
						(o.sO = 0),
						(o.tI = 0),
						(o.totalFiles = 0),
						(o.ty = t),
						(o.ub = n),
						(o.tM = []);
				}),
				(v.prototype = C(b.prototype)),
				(v.prototype = a.mixin(v.prototype)),
				(v.prototype = h.mixin(v.prototype)),
				(v.prototype.mU = y.prototype.mU),
				(v.prototype.nU = y.prototype.nU),
				(v.prototype.sB = y.prototype.sB),
				(v.prototype.tC = i.prototype.tC),
				(v.qN = "event.file.input.change"),
				(v.ue = 300),
				(v.prototype.mC = function () {
					var e,
						t = this;
					for (e = 0; e < t.tM.length; e += 1) t.tM[e].removeSubscriber(t);
					t.ty.mC(),
						t.ub.or(),
						(t.attachedUploadViewsNumber = 0),
						(t.tM = []),
						t.ud(t.application),
						t.ma(),
						t.remove();
				}),
				(v.prototype.tc = function () {
					var e = {};
					return (
						(e[w.qM] = "tF"),
						(e[F.pN] = "uc"),
						(e[_.EVENT_DOM_ATTACHED] = "onUploadViewDomAttached"),
						(e[_.EVENT_DOM_REMOVED] = "onUploadViewDomRemoved"),
						(e[_.pM] = "onFolderRefreshRequest"),
						e
					);
				}),
				(v.prototype.onFileInputChange = function (e) {
					var t = e.jN.$,
						n = t.files;
					n.length < 1 || this.dispatch(v.qN, [t, n]);
				}),
				(v.prototype.onFolderRefreshRequest = function (e, t) {
					this.wU.push({ folder: e, mw: t });
				}),
				(v.prototype.uV = function (e) {
					var t,
						n = this,
						o = e.bn().getDocument(),
						i = o.getById("ckf_addFiles"),
						a = o.getById("ckf_cancelUpload"),
						r = o.getById("ckf_fileInput"),
						l = o.getById("ckf_globalUploads"),
						s = n.mC.bind(n),
						d = n.onFileInputChange.bind(n);
					(l = l.getChild([0, 0])),
						(n.domElement = {
							addFilesButton: i,
							cancelButton: a,
							countSpan: l.getChild(0),
							fileInput: r,
							ni: l.getChild([2, 0]),
							np: l.getChild(4),
							mz: l.getChild(3),
							totalSizeSpan: l.getChild(1),
						}),
						(t = n.onDomElementAddFilesClickListener.bind(n)),
						i.on("click", t),
						a.on("click", s),
						r.on("change", d),
						n.domElementListeners || (n.domElementListeners = []),
						n.domElementListeners.push(
							{ evt: "click", fO: t, bi: i },
							{ evt: "click", fO: s, bi: a },
							{ evt: "change", fO: d, bi: r }
						),
						n.shouldBeClickedAutomatically &&
							((n.shouldBeClickedAutomatically = !1), t());
				}),
				(v.prototype.onDomElementAddFilesClickListener = function () {
					this.domElement.fileInput.$.click();
				}),
				(v.prototype.onUploadPanelUploadStartClick = function (e, t, n) {
					(this.shouldBeClickedAutomatically = !0), n(e);
				}),
				(v.prototype.uH = function (e) {
					this.domElement.cancelButton
						.getFirst()
						.setHtml(e.lang.UploadBtnCancel);
				}),
				(v.prototype.ud = function (e) {
					var t = this;
					t.domElement.cancelButton.getFirst().setHtml(e.lang.CloseBtn),
						(t.sa = 0),
						(t.sO = 0),
						(t.tI = 0),
						(t.totalFiles = 0);
				}),
				(v.prototype.onUploadViewDomAttached = function () {
					this.attachedUploadViewsNumber += 1;
				}),
				(v.prototype.onUploadViewDomRemoved = function () {
					var e = this;
					(e.attachedUploadViewsNumber -= 1),
						e.ub.expectedFiles < 1 &&
							e.attachedUploadViewsNumber < 1 &&
							((e.attachedUploadViewsNumber = 0),
							(e.ub.expectedFiles = 0),
							e.remove());
				}),
				(v.prototype.tF = function (e, t) {
					var n = this,
						o = t.uploadBlob.bZ(),
						i = n.tj(),
						a = new _(e, t, o);
					t.ns(n),
						t.ns(a),
						a.ns(n),
						a.tw(i),
						n.mU(t),
						(n.tI += o.size),
						n.to(n.tI),
						(n.totalFiles += 1),
						n.tm(n.totalFiles),
						1 === n.totalFiles && n.uH(e);
				}),
				(v.prototype.uc = function (e) {
					var t = this,
						n = t.ub.expectedFiles,
						o = e.uploadBlob.bZ();
					t.sB(e) && t.nU(e),
						1 > n && t.tM.length < 1
							? (t.ma(), t.ud(t.application))
							: ((t.sa += o.size), (t.sO += 1)),
						t.updateUploadProgress(t.sa, t.tI, t.sO, t.totalFiles, n),
						t.to(t.tI),
						t.tm(t.totalFiles);
				}),
				(v.prototype.ma = function () {
					var e,
						t,
						n = this,
						o = n.application.aV;
					for (e = 0; e < n.wU.length; e += 1)
						if (n.wU[e].folder === o) {
							t = n.wU[e];
							break;
						}
					(n.wU = []), t && n.application.oW("requestShowFolderFiles", t);
				}),
				(v.prototype.remove = function () {
					this.tj().oW("requestUnloadForm");
				}),
				(v.prototype.setUploadCommand = function (e, t) {
					var n, o, i, a;
					if (t.pW && !(t.pW.length < 1))
						for (
							this.domElementListeners || (this.domElementListeners = []),
								i = function (e, n) {
									this.onUploadPanelUploadStartClick(n, t, e);
								},
								a = t.pW,
								o = 0;
							o < a.length;
							o += 1
						)
							a[o].click && ((n = a[o].click), (a[o].click = i.bind(this, n)));
				}),
				(v.prototype.tD = function (e, t) {
					this.updateLoadedPercentage(e, t);
				}),
				(v.prototype.updateLoadedPercentage = function (e, t, n) {
					var o;
					(o = t > 0 ? Math.round((e / t) * 100) : 0),
						0 > o && (o = 0),
						(o > 100 || isNaN(o)) && (o = 100),
						this.domElement.ni.setStyle("width", o + "%"),
						(n = n ? " - " + n.trim() : ""),
						this.updateStatusText(
							this.application.lang.UploadUploaded.replace("!n", o) + n
						);
				}),
				(v.prototype.nR = function (e, t) {
					var n;
					1 > t ||
						((n = e / 1024 / t),
						this.domElement.np.setText(
							c.formatSpeed(n, this.application.lang)
						));
				}),
				(v.prototype.updateStatusText = function (e) {
					this.domElement.mz.setText(e);
				}),
				(v.prototype.to = function (e) {
					this.domElement.totalSizeSpan.setText(
						this.application.lang.UploadTotalSize +
							" " +
							c.formatSize(e / 1024, this.application.lang)
					);
				}),
				(v.prototype.tm = function (e) {
					this.domElement.countSpan.setText(
						this.application.lang.UploadTotalFiles + " " + e + " "
					);
				}),
				(v.prototype.updateUploadProgress = function (e, t, n, o, i) {
					var a,
						r = e / t,
						l = 1,
						s = n / (o + i),
						d = 3;
					(a = CKFinder.tools.formatSize(e / 1024, this.application.lang)),
						this.updateLoadedPercentage(r * l + s * d, l + d, a);
				}),
				(w = function (e, t) {
					var n = this;
					a.call(n),
						h.call(n),
						b.call(n),
						(n.application = e),
						(n.lQ = 10),
						(n.expectedFiles = 0),
						(n.shouldStopProcessing = !1),
						(n.tM = []),
						(n.ty = t);
				}),
				(w.prototype = C(b.prototype)),
				(w.prototype = a.mixin(w.prototype)),
				(w.prototype = h.mixin(w.prototype)),
				(w.qM = "upload.supervisor.ready"),
				(w.prototype.or = function () {
					(this.expectedFiles = 0),
						(this.shouldStopProcessing = !0),
						(this.tM = []);
				}),
				(w.prototype.nZ = function () {
					return this.tM.shift();
				}),
				(w.prototype.qg = function (e) {
					this.sj(e.file) || this.tM.push(e);
				}),
				(w.prototype.tc = function () {
					var e = {};
					return (e[F.pU] = "tH"), (e[F.pN] = "uc"), e;
				}),
				(w.prototype.getUploadCommand = function () {
					if (!this.uploadCommand)
						throw new Error("Upload command is not set.");
					return this.uploadCommand;
				}),
				(w.prototype.sj = function (e) {
					var t;
					for (t = 0; t < this.tM.length; t += 1)
						if (e === this.tM[t].uploadBlob.bZ()) return !0;
					return !1;
				}),
				(w.prototype.tH = function () {
					this.tx();
				}),
				(w.prototype.uc = function () {
					(this.lQ += 1), this.tx();
				}),
				(w.prototype.uG = function (e) {
					var t,
						n,
						i,
						a = 100,
						r = this.sX(),
						l = this,
						s = this.getUploadCommand(),
						d = this.application.aV;
					if (!d) return !1;
					if (
						((this.expectedFiles += e.length),
						(this.shouldStopProcessing = !1),
						s.bu !== o.aY)
					) {
						if (e.length < 1) return !1;
						try {
							(n = e[0]), this.uI && this.uI(!1);
						} catch (c) {
							return !1;
						} finally {
							s.bu !== o.eV && ((r = !1), s.exec(this.application));
						}
						return (
							(i = k.bind(null, e, function (e) {
								return l.shouldStopProcessing
									? ((l.expectedFiles = 0), (l.shouldStopProcessing = !1), !1)
									: ((l.expectedFiles -= 1), void l.tA(new g(e, new u(e))));
							})),
							r
								? (i(), !0)
								: ((t = setInterval(function () {
										l.sX() && (clearInterval(t), i());
								  }, a)),
								  !0)
						);
					}
				}),
				(w.prototype.tA = function (e) {
					var t,
						n,
						o = this;
					return e.getFileName().length < 1
						? void o.tj().oW("failedUploadFile")
						: ((n = new F(o.application, o.application.aV, e)),
						  n.ns(o.ty),
						  e.ns(n),
						  (t = new XMLHttpRequest()),
						  n.nv(t),
						  void o.tL(o.application, n));
				}),
				(w.prototype.tL = function (e, t) {
					var n = this;
					return (
						n.dispatch(w.qM, [n.application, t]),
						t.ns(n),
						n.lQ < 1 ? void n.qg(t) : void n.tv(e, t)
					);
				}),
				(w.prototype.tx = function () {
					for (var e = this; e.tM.length > 0 && e.lQ > 0; )
						e.tv(e.application, e.nZ());
				}),
				(w.prototype.tJ = function (e) {
					this.lQ = e;
				}),
				(w.prototype.setUploadCommand = function (e, t) {
					this.uploadCommand = t;
				}),
				(w.prototype.tv = function (e, t) {
					(this.lQ -= 1), t.mW();
				}),
				(F = function (e, t, n) {
					var o = this;
					a.call(o),
						b.call(o),
						(o.application = e),
						(o.isAborted = !1),
						(o.sa = 0),
						(o.oS = 0),
						(o.targetFolder = t),
						(o.uploadBlob = n);
				}),
				(F.prototype = C(b.prototype)),
				(F.prototype = a.mixin(F.prototype)),
				(F.pU = "start"),
				(F.pN = "stop"),
				(F.prototype.lN = function () {
					if (!this.sY()) throw new Error("Upload is not in progress.");
					(this.isAborted = !0), this.bT.abort();
				}),
				(F.prototype.ns = function (e) {
					if (!(e instanceof b))
						throw new Error(
							"Invalid argument: expected UploadProgressListener."
						);
					a.prototype.ns.call(this, e);
				}),
				(F.prototype.ta = function (e) {
					var t = this.wv(),
						n = e.aV,
						o = n.getResourceType();
					return t && !o.isExtensionAllowed(t)
						? (this.onError(e.lang.UploadExtIncorrect), !1)
						: !0;
				}),
				(F.prototype.wN = function (e) {
					var t,
						n = this,
						o = n.wv(),
						i = n.getFileSize(),
						a = parseInt(e.config.uploadMaxSize, 10),
						r = e.aV,
						l = r.getResourceType();
					return (
						(t = parseInt(l.maxSize, 10)),
						0 === i
							? (n.onError(e.lang.Errors[202]), !1)
							: (a && i > a) ||
							  (t && i > t && (e.config.uploadCheckImages || !A.test(o)))
							? (n.onError(e.lang.Errors[203]), !1)
							: !0
					);
				}),
				(F.prototype.tl = function (e) {
					return this.ta(e) ? this.wN(e) : !1;
				}),
				(F.prototype.nv = function (e) {
					var t,
						n = this;
					if (n.sY()) throw new Error("Upload is already started.");
					e.addEventListener(b.pH, n.onAbort.bind(n)),
						e.addEventListener(b.rj, n.onError.bind(n)),
						e.addEventListener(b.qk, n.onLoad.bind(n)),
						(t = e.upload),
						t && t.addEventListener(b.rc, n.onProgress.bind(n)),
						(n.bT = e),
						(n.isAborted = !1);
				}),
				(F.prototype.tK = function () {
					return this.oS;
				}),
				(F.prototype.bZ = function () {
					return this.uploadBlob.bZ();
				}),
				(F.prototype.wv = function () {
					return this.uploadBlob.wv();
				}),
				(F.prototype.getFileName = function () {
					return this.uploadBlob.getFileName();
				}),
				(F.prototype.getFileSize = function () {
					return this.uploadBlob.getFileSize();
				}),
				(F.prototype.tc = function () {
					var e = b.prototype.tc.call(this);
					return (e["xhr.header"] = "tO"), e;
				}),
				(F.prototype.sY = function () {
					return this.isAborted ? !1 : !!this.bT;
				}),
				(F.prototype.onAbort = function () {
					this.dispatch(b.pH, [this.uploadBlob]), this.onStop();
				}),
				(F.prototype.onError = function (e) {
					var t = this;
					e || (e = t.application.lang.UploadUnknError),
						t.dispatch(b.rj, [t.uploadBlob, e]),
						t.onStop();
				}),
				(F.prototype.tO = function (e, t) {
					if (!this.bT) throw new Error("Request is not initialized");
					this.bT.setRequestHeader(e, t);
				}),
				(F.prototype.onLoad = function (e) {
					var t,
						n,
						o,
						i,
						a = this,
						r = 2;
					return 200 !== a.bT.status
						? a.onError()
						: ((o = e.target.responseText),
						  (i = o.split(U, r)),
						  (t = i[0]),
						  (n = i[1]),
						  !t.length && n
								? a.dispatch(b.rj, [a.uploadBlob, n])
								: a.dispatch(b.qk, [a.uploadBlob, t, n]),
						  void a.onStop());
				}),
				(F.prototype.onProgress = function (e) {
					var t = this;
					e.lengthComputable &&
						((t.sa = e.target.kC = e.loaded),
						t.dispatch(b.rc, [t, t.uploadBlob, t.sa, t.tK()]));
				}),
				(F.prototype.onStop = function () {
					var e = this;
					delete e.bT,
						(e.isAborted = !0),
						(e.oS = 0),
						e.dispatch(F.pN, [e, e.uploadBlob]);
				}),
				(F.prototype.mW = function () {
					var e = this,
						t = this.bT;
					return this.tl(this.application)
						? void this.uploadBlob.tn(function (n) {
								if ((e.dispatch(F.pU, [e.uploadBlob]), t)) {
									e.oS = B();
									try {
										e.bT.send(n);
									} catch (o) {
										e.onStop();
									}
								} else e.onStop();
						  })
						: !1;
				}),
				(n = function (e, t, n, o, i) {
					var a = this;
					F.call(a, e, t, n), (a.isAborted = !1), (a.tG = o), (a.uz = i);
				}),
				(n.prototype = C(F.prototype)),
				(n.prototype.lN = function () {
					if (!this.sY()) throw new Error("Upload is not in progress.");
					(this.isAborted = !0), this.uz();
				}),
				(n.prototype.mW = function () {
					var e = this;
					if (!e.tl(e.application)) return !1;
					(e.isAborted = !1), (e.oS = B()), e.dispatch(F.pU, [e.uploadBlob]);
					try {
						e.tG();
					} catch (t) {
						try {
							e.uz();
						} catch (n) {
							throw n;
						} finally {
							e.onStop();
						}
					}
				}),
				(_ = function (e, t, n) {
					var o = this;
					a.call(o),
						h.call(o),
						b.call(o),
						(o.application = e),
						(o.file = n),
						(o.isDomAttached = !1),
						(o.isDomRemoved = !1),
						(o.shouldBeRemovedOnStop = !0),
						(o.targetFolder = t.targetFolder),
						(o.ts = t);
				}),
				(_.prototype = C(b.prototype)),
				(_.prototype = a.mixin(_.prototype)),
				(_.prototype = h.mixin(_.prototype)),
				(_.prototype.tD = v.prototype.updateLoadedPercentage),
				(_.prototype.nR = v.prototype.nR),
				(_.prototype.updateStatusText = v.prototype.updateStatusText),
				(_.EVENT_DOM_ATTACHED = "event.dom.attached"),
				(_.EVENT_DOM_REMOVED = "event.dom.removed"),
				(_.pM = "event.folder.refresh.request"),
				(_.prototype.tc = function () {
					var e = b.prototype.tc.call(this);
					return (e[F.pN] = "onStop"), e;
				}),
				(_.prototype.onAbort = function () {
					var e = this;
					e.ts && (e.ts.sY() && (e.ts.lN(), e.ts.onStop()), e.onStop());
				}),
				(_.prototype.onError = function (e, t) {
					this.tE(t);
				}),
				(_.prototype.uV = function (e) {
					var t = this;
					if (!t.isDomAttached) {
						var n,
							o = e.bn(),
							i = new f("div", o.getDocument());
						i.setAttribute("class", "ckf_upload_info"),
							i.setHtml(L(t.application, e, t.file, Z)),
							o.dB().append(i),
							t.application.cg.resizeFormPanel(),
							(n = i.getChild([0, 0])),
							(t.domElement = {
								button: i.getChild([1, 0]),
								container: i,
								mI: n.getChild(5),
								ni: n.getChild([2, 0]),
								mx: n.getChild(1),
								np: n.getChild(4),
								mz: n.getChild(3),
							}),
							t.domElement.button.on("click", t.uk.bind(t, t.ts)),
							(t.isDomAttached = !0),
							t.dispatch(_.EVENT_DOM_ATTACHED, [t]);
					}
				}),
				(_.prototype.onLoad = function (e, t, n) {
					this.tN(n), this.dispatch(_.pM, [this.targetFolder, t]);
				}),
				(_.prototype.onProgress = function (e, t, n, o) {
					this.tD(n, this.file.size), this.nR(n, o);
				}),
				(_.prototype.onStop = function () {
					this.shouldBeRemovedOnStop && this.remove();
				}),
				(_.prototype.uk = function (e) {
					(this.shouldBeRemovedOnStop = !0),
						e.sY() ? e.lN() : this.onAbort(e.uploadBlob);
				}),
				(_.prototype.remove = function () {
					var e = this;
					e.isDomRemoved ||
						(e.domElement.container.remove(),
						e.application.cg.resizeFormPanel(),
						(e.isDomRemoved = !0),
						e.dispatch(_.EVENT_DOM_REMOVED, [e]));
				}),
				(_.prototype.tE = function (e) {
					var t = this,
						n = t.tj();
					t.tp(e),
						t.domElement.container.addClass("ckf_FileError"),
						t.application.cg.resizeFormPanel(),
						n.oW("failedUploadFile", e);
				}),
				(_.prototype.tp = function (e) {
					var t = this;
					e && (t.shouldBeRemovedOnStop = !1),
						t.domElement.ni.getParent().hide(),
						t.domElement.mz.hide(),
						t.domElement.np.hide(),
						t.domElement.mI.setText(e),
						t.domElement.button.getFirst().setHtml(t.application.lang.CloseBtn),
						t.domElement.button.addClass("cke_dialog_ui_button_ok"),
						t.domElement.button.removeClass("cke_dialog_ui_button_cancel");
				}),
				(_.prototype.tN = function (e) {
					var t = this,
						n = t.tj();
					e ? (t.tp(e), t.application.cg.resizeFormPanel()) : t.remove(),
						n.oW("successUploadFile", e);
				}),
				(E = function () {
					return !j && "undefined" != typeof FormData;
				}),
				(S = function (e) {
					var t;
					return (t = e.env ? e : o), !(!t.env.mac && t.env.safari);
				}),
				(N = function (e, t, n, o) {
					var i,
						a = 10;
					i = setInterval(function () {
						t.ld.hasOwnProperty(n) && (clearInterval(i), o(t, n, t.ld[n]));
					}, a);
				}),
				(D = function (e, t, n, o, i, a, r, l) {
					var s = l.bn();
					n.sX() || n.mE(t),
						s.hasAttribute("ondrop") || s.setAttribute("ondrop", I(t, X));
				}),
				(T = function (e, t, n, o, i, a, r, l) {
					var s = 11,
						d = I(t, Y),
						c = !0,
						u = t.cS("upload");
					a.setUploadCommand(t, u),
						r.setUploadCommand(t, u),
						t.cg.replaceUploadForm(
							d,
							function () {
								R(e, t, n, o, i, a, r, l);
							},
							c,
							s
						);
				}),
				(R = function (e, t, n, o, i, a, r, l) {
					n.tw(l), r.tw(l), a.tw(l);
				}),
				(W = function (e, t) {
					return e.replace(P, function (e, n, o) {
						return t[o];
					});
				}),
				(I = function (e, t) {
					var n = {
						application_name: e.name,
						input_multiple: S(e) ? 'multiple="multiple"' : "",
						lang_upload_add_files: e.lang.UploadAddFiles,
						lang_close_button: e.lang.CloseBtn,
					};
					return W(t, n);
				}),
				(L = function (e, t, n, o) {
					var i = {
						file_name: n.name,
						lang_cancel_button: e.lang.UploadBtnCancel,
					};
					return W(o, i);
				}),
				($ = function (t) {
					var n;
					e.bind ? (n = e.bind(this, t)) : ((j = !0), (n = e)),
						t.plugins.add("html5upload", { bM: ["uploadform"], bz: n });
				})(o);
		})(),
		(function () {
			function e(e, t, n, o) {
				e.execCommand(o ? "moveFilesToFolder" : "copyFilesToFolder", {
					files: n,
					destination: t,
					fileCallback: function (e, t) {
						for (
							var n = c.indexOf(e.basketFiles, t),
								o = 1,
								i = e.basketFiles.length - 1,
								a = n;
							i > a;
							a++
						)
							e.basketFiles[a]
								? (e.basketFiles[a] = e.basketFiles[a + o])
								: o++;
						e.basketFiles.length = Math.max(i, 0);
					},
				});
			}
			h.add("basket", {
				bM: ["foldertree", "filesview", "contextmenu"],
				readOnly: !1,
				basketToolbar: [
					[
						"clearBasket",
						{
							label: "BasketClear",
							command: "TruncateBasket",
							disableEmpty: !0,
						},
					],
				],
				basketFileContextMenu: [
					[
						"mu",
						{
							label: "BasketRemove",
							command: "RemoveFileFromBasket",
							group: "file3",
						},
					],
					[
						"hN",
						{
							label: "BasketOpenFolder",
							command: "OpenFileFolder",
							group: "file1",
						},
					],
				],
				bz: function (t) {
					var n = window.top[o.nd + "cation"][o.jG + "st"],
						i = [],
						a = function () {
							for (
								var e = t.basketFiles.length ? o.aS : o.aY, n = 0, a = i.length;
								a > n;
								n++
							)
								t.cS(i[n]).bR(e);
						};
					t.bD("FolderPasteCopyBasket", {
						exec: function (t) {
							var n = t.aV;
							n && e(t, n, t.basketFiles);
						},
					}),
						t.bD("FolderPasteMoveBasket", {
							exec: function (t) {
								if (
									(o.bF &&
										1 == o.bs.indexOf(o.bF.substr(1, 1)) % 5 &&
										o.lS(n) != o.lS(o.ed)) ||
									(o.bF &&
										o.bF.substr(3, 1) !=
											o.bs.substr(
												(9 *
													(o.bs.indexOf(o.bF.substr(0, 1)) +
														o.bs.indexOf(o.bF.substr(2, 1)))) %
													(o.bs.length - 1),
												1
											))
								)
									t.msgDialog(
										"",
										"This function is disabled in the demo version of CKFinder.<br />Please visit the <a href='http://cksource.com/ckfinder'>CKFinder web site</a> to obtain a valid license."
									);
								else {
									var i = t.aV;
									if (!i) return;
									e(t, i, t.basketFiles, !0), a();
								}
							},
						}),
						t.eU({
							folderPasteMoveBasket: {
								label: t.lang.BasketMoveFilesHere,
								command: "FolderPasteMoveBasket",
								group: "folder1",
							},
							folderPasteCopyBasket: {
								label: t.lang.BasketCopyFilesHere,
								command: "FolderPasteCopyBasket",
								group: "folder1",
							},
						});
					var r = (t.basket = new o.aL.BasketFolder(t));
					(t.basketFiles = []),
						t.on(
							"uiReady",
							function () {
								function e(e) {
									var t;
									for (t in e.plugins)
										if (
											e.plugins.hasOwnProperty(t) &&
											((t = e.plugins[t]), t.basketToolbar)
										)
											for (var n = 0; n < t.basketToolbar.length; n++) {
												var o = t.basketToolbar[n];
												if (!e.bY._.items[o[0]]) {
													var a = c.deepCopy(o[1]),
														r = a.command;
													if (!a.command) {
														var l = o[1].onClick;
														(r = "BasketToolbar_" + o[0]),
															e.bD(r, {
																exec: function (e) {
																	l(e.cg);
																},
															}),
															(a.command = r);
													}
													var s = c.capitalize(t.name);
													"function" == typeof a.label
														? (a.label = a.label.call(t, e.cg))
														: e.lang[t.name] && e.lang[t.name][a.label]
														? (a.label = e.lang[t.name][a.label])
														: e.lang[s] && e.lang[s][a.label]
														? (a.label = e.lang[s][a.label])
														: e.lang[a.label] && (a.label = e.lang[a.label]),
														(a.basketToolbar = 1),
														a.disableEmpty && i.push(r),
														e.bY.add(o[0], CKFinder._.UI_BUTTON, a);
												}
											}
								}
								function n(e) {
									if (e.eU) {
										var t;
										for (t in e.plugins)
											if (
												e.plugins.hasOwnProperty(t) &&
												((t = e.plugins[t]), t.basketFileContextMenu)
											)
												for (
													var n = 0;
													n < t.basketFileContextMenu.length;
													n++
												) {
													var o = t.basketFileContextMenu[n];
													if (!e._.iG[o[0]]) {
														var a = c.deepCopy(o[1]);
														if (!a.command) {
															var r = "BasketContextMenu_" + o[0],
																l = o[1].onClick;
															e.bD("BasketContextMenu_" + o[0], {
																exec: function (e) {
																	l(e.cg);
																},
															}),
																(a.command = r);
														}
														var s = c.capitalize(t.name);
														"function" == typeof a.label
															? (a.label = a.label.call(t, e.cg))
															: e.lang[t.name] && e.lang[t.name][a.label]
															? (a.label = e.lang[t.name][a.label])
															: e.lang[s] && e.lang[s][a.label]
															? (a.label = e.lang[s][a.label])
															: e.lang[a.label] && (a.label = e.lang[a.label]),
															a.disableEmpty && i.push(r),
															e.gp(o[0], a),
															u.push(o[0]);
													}
												}
									}
								}
								var l = t.ld["foldertree.foldertree"];
								l.on("beforeAddFolder", function (e) {
									e.removeListener(), e.data.folders.push(r);
								}),
									l.on("beforeDroppable", function (e) {
										if (
											e.data.target instanceof o.aL.BasketFolder &&
											(e.data.source instanceof o.aL.File &&
												(e.data.source = [e.data.source]),
											c.isArray(e.data.source) &&
												e.data.source.length &&
												e.data.source[0] instanceof o.aL.File)
										) {
											for (
												var n, i, a = e.data.source, r = 0, l = 0, s = a.length;
												s > l;
												l++
											) {
												for (n = 0, i = t.basketFiles.length; i > n; n++)
													if (a[l].isSameFile(t.basketFiles[n])) {
														r = 1;
														break;
													}
												r || t.basketFiles.push(a[l]);
											}
											e.cancel(1);
										}
									}),
									l.on("beforeContextMenu", function (e) {
										var n;
										e.data.folder instanceof o.aL.BasketFolder
											? ((n = e.data.bj),
											  delete n.renameFolder,
											  delete n.removeFolder,
											  delete n.createSubFolder,
											  (n.qT = t.basketFiles.length ? o.aS : o.aY))
											: ((n = e.data.bj),
											  (n.folderPasteCopyBasket = t.basketFiles.length
													? o.aS
													: o.aY),
											  (n.folderPasteMoveBasket = t.basketFiles.length
													? o.aS
													: o.aY));
									}),
									l.on("beforeKeyboardNavigation", function (e) {
										if (e.data.folder instanceof o.aL.BasketFolder) {
											var t = e.data.db();
											(46 == t || 113 == t) && e.cancel();
										}
									}),
									t.bD("TruncateBasket", {
										exec: function (e) {
											e.basketFiles.length &&
												e.fe("", e.lang.BasketTruncateConfirm, function () {
													(e.basketFiles.length = 0),
														e.oW("requestSelectFolder", { folder: e.basket });
												});
										},
									}),
									t.bD("RemoveFileFromBasket", {
										exec: function (e) {
											var t = e.ld["filesview.filesview"].tools.oO();
											t &&
												t.length &&
												e.fe(
													"",
													1 == t.length
														? e.lang.BasketRemoveConfirm.replace(
																"%1",
																t[0].name
														  )
														: e.lang.BasketRemoveConfirmMultiple.replace(
																"%1",
																t.length
														  ),
													function () {
														for (var n, o = 0, i = t.length; i > o; o++)
															for (n = 0; n < e.basketFiles.length; n++)
																if (t[o].isSameFile(e.basketFiles[n])) {
																	e.basketFiles.splice(n, 1);
																	break;
																}
														e.oW("requestSelectFolder", { folder: e.basket }),
															a();
													}
												);
										},
									}),
									t.bD("OpenFileFolder", {
										exec: function (e) {
											var t = e.ld["filesview.filesview"].data().cG;
											t && e.oW("requestSelectFolder", { folder: t.folder });
										},
									}),
									t.eU &&
										t.gp("truncateBasket", {
											label: t.lang.BasketClear,
											command: "TruncateBasket",
											group: "folder",
										});
								var s = [],
									d = t.ld["filesview.filesview"],
									u = [];
								d.on("beforeContextMenu", function (e) {
									if (e.data.folder instanceof o.aL.BasketFolder) {
										var t = e.data.bj;
										delete t.renameFile,
											delete t.deleteFile,
											delete t.deleteFiles,
											(t.mu = o.aS),
											(t.hN = o.aS);
										for (var n = 0; n < u.length; n++) t[u[n]] = o.aS;
									}
								}),
									d.on("beforeShowFolderFiles", function (i) {
										if (i.data.folder instanceof o.aL.BasketFolder) {
											i.cancel(1),
												this.app.oW("requestRenderFiles", {
													files: t.basketFiles,
													mj: t.lang.BasketEmpty,
													eu: 1,
													folder: i.data.folder,
												}),
												this.app.oW("requestRepaintFolder", i.data),
												e(this.app),
												n(this.app),
												a();
											for (var r = this.app.dh.fk, l = 0; l < r.length; l++) {
												var d,
													c = this.app.document.getById(r[l].id),
													u = ['<span class="cke_toolgroup" id="basket">'];
												for (d in this.app.bY._.items)
													if (this.app.bY._.items.hasOwnProperty(d)) {
														var f = t.bY._.items[d];
														if (f.mp[0].basketToolbar) {
															f = t.bY.create(d);
															var p = f.er(t, u),
																h = r[l].items.push(p) - 1;
															h > 0 &&
																((p.previous = r[l].items[h - 1]),
																(p.previous.next = p)),
																s[l] || (s[l] = []),
																s[l].push(h);
														}
													}
												u.push("</span>"), c.appendHtml(u.join(""));
											}
											this.on(
												"beforeShowFolderFiles",
												function (e) {
													this.app.document.getById("basket").remove();
													for (var t = this.app.dh.fk, n = 0; n < t.length; n++)
														for (var o = 0; o < t[n].items.length; o++)
															s[n][o] && delete t[n].items[o];
													e.removeListener();
												},
												null,
												null,
												1
											),
												this.oW("successShowFolderFiles", i.data),
												this.oW("afterShowFolderFiles", i.data);
										}
									}),
									d.on("beforeKeyboardNavigation", function (e) {
										var n = t.aV;
										if (n && n instanceof o.aL.BasketFolder) {
											var i = e.data.db();
											46 == i &&
												(e.cancel(), t.execCommand("RemoveFileFromBasket")),
												113 == i && e.cancel();
										}
									});
							},
							null,
							null,
							20
						);
				},
			}),
				(o.aL.BasketFolder = c.createClass({
					$: function (e) {
						var t = this;
						o.aL.Folder.call(t, e, null, e.lang.BasketFolder),
							(t.hasChildren = 0),
							(t.acl = new o.aL.Acl("1111111")),
							(t.isBasket = !0);
					},
					base: o.aL.Folder,
					ej: {
						createNewFolder: function () {},
						getChildren: function (e) {
							e.apply(this, null);
						},
						rename: function () {},
						remove: function () {},
						getUrl: function () {
							return "ckfinder://basketFolder";
						},
						getUploadUrl: function () {
							return null;
						},
						getPath: function () {
							return "/";
						},
						copyFiles: function () {},
						moveFiles: function () {},
					},
				}));
		})(),
		(o.DIALOG_RESIZE_NONE = 0),
		(o.DIALOG_RESIZE_WIDTH = 1),
		(o.DIALOG_RESIZE_HEIGHT = 2),
		(o.DIALOG_RESIZE_BOTH = 3),
		(function () {
			function e(e) {
				return !!this._.tabs[e][0].$.offsetHeight;
			}
			function t() {
				for (
					var t = this,
						n = t._.gx,
						o = t._.cU.length,
						i = c.indexOf(t._.cU, n) + o,
						a = i - 1;
					a > i - o;
					a--
				)
					if (e.call(t, t._.cU[a % o])) return t._.cU[a % o];
				return null;
			}
			function n() {
				for (
					var t = this,
						n = t._.gx,
						o = t._.cU.length,
						i = c.indexOf(t._.cU, n),
						a = i + 1;
					i + o > a;
					a++
				)
					if (e.call(t, t._.cU[a % o])) return t._.cU[a % o];
				return null;
			}
			function i(e, t, n) {
				(this.element = t),
					(this.cQ = n),
					(this.fM = function () {
						return !t.getAttribute("disabled") && t.isVisible();
					}),
					(this.focus = function () {
						(e._.aW = this.cQ), this.element.focus();
					}),
					t.on("keydown", function (e) {
						e.data.db() in { 32: 1, 13: 1 } && this.oW("click");
					}),
					t.on("focus", function () {
						this.oW("mouseover");
					}),
					t.on("blur", function () {
						this.oW("mouseout");
					});
			}
			function a(e, t) {
				(this._ = { dialog: e }), c.extend(this, t);
			}
			function r(e) {
				function t(t) {
					var n,
						r,
						l = e.hR(),
						c = o.document.getWindow().eR(),
						u = t.data.$.screenX,
						f = t.data.$.screenY,
						p = u - i.x,
						h = f - i.y;
					(i = { x: u, y: f }),
						(a.x += p),
						(a.y += h),
						(n =
							a.x + d[3] < s
								? -d[3]
								: a.x - d[1] > c.width - l.width - s
								? c.width - l.width + d[1]
								: a.x),
						(r =
							a.y + d[0] < s
								? -d[0]
								: a.y - d[2] > c.height - l.height - s
								? c.height - l.height + d[2]
								: a.y),
						e.move(n, r, 1),
						t.data.preventDefault();
				}
				function n() {
					if (
						(o.document.removeListener("mousemove", t),
						o.document.removeListener("mouseup", n),
						l.ie6Compat)
					) {
						var e = F.getChild(0).getFrameDocument();
						e.removeListener("mousemove", t), e.removeListener("mouseup", n);
					}
				}
				var i = null,
					a = null,
					r = (e.getElement().getFirst(), e.eY()),
					s = r.config.dialog_magnetDistance,
					d = r.skin.margins || [0, 0, 0, 0];
				"undefined" == typeof s && (s = 20),
					e.bO.title.on(
						"mousedown",
						function (r) {
							if (
								((i = { x: r.data.$.screenX, y: r.data.$.screenY }),
								o.document.on("mousemove", t),
								o.document.on("mouseup", n),
								(a = e.gz()),
								l.ie6Compat)
							) {
								var s = F.getChild(0).getFrameDocument();
								s.on("mousemove", t), s.on("mouseup", n);
							}
							r.data.preventDefault();
						},
						e
					);
			}
			function d(e) {
				function t(t) {
					if (e._.moved && "rtl" == b.lang.dir) {
						var n = e._.element.getFirst();
						n.setStyle("right", t + "px"), n.removeStyle("left");
					} else e._.moved || e.layout();
				}
				function n(t) {
					(g = e.hR()), (t = t.data.$);
					var n = e.bO.contents,
						r = n.$.getElementsByTagName("iframe").length;
					if (
						(r &&
							((v = f.kE(
								'<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>'
							)),
							n.append(v)),
						(p =
							g.height -
							e.bO.contents.hR(
								"height",
								!(l.gecko || l.opera || (s && l.quirks))
							)),
						(u = g.width - e.bO.contents.hR("width", 1)),
						(m = { x: t.screenX, y: t.screenY }),
						(h = o.document.getWindow().eR()),
						o.document.on("mousemove", i),
						o.document.on("mouseup", a),
						l.ie6Compat)
					) {
						var d = F.getChild(0).getFrameDocument();
						d.on("mousemove", i), d.on("mouseup", a);
					}
					t.preventDefault && t.preventDefault();
				}
				function i(n) {
					var i = "rtl" == b.lang.dir,
						a = (n.data.$.screenX - m.x) * (i ? -1 : 1),
						l = n.data.$.screenY - m.y,
						s = g.width,
						c = g.height,
						f = s + a * (e._.moved ? 1 : 2),
						v = c + l * (e._.moved ? 1 : 2),
						y = e._.element.getFirst(),
						w = i && y.getComputedStyle("right"),
						F = e.gz();
					w &&
						(w =
							"auto" == w
								? h.width - (F.x || 0) - y.hR("width")
								: parseInt(w, 10)),
						F.y + v > h.height && (v = h.height - F.y),
						(i ? w : F.x) + f > h.width && (f = h.width - (i ? w : F.x)),
						(d != o.DIALOG_RESIZE_WIDTH && d != o.DIALOG_RESIZE_BOTH) ||
							(i && a > 0 && !F.x) ||
							(s = Math.max(r.minWidth || 0, f - u)),
						(d == o.DIALOG_RESIZE_HEIGHT || d == o.DIALOG_RESIZE_BOTH) &&
							(c = Math.max(r.minHeight || 0, v - p)),
						e.resize(s, c),
						t(w),
						n.data.preventDefault();
				}
				function a() {
					if (
						(o.document.removeListener("mouseup", a),
						o.document.removeListener("mousemove", i),
						v && (v.remove(), (v = null)),
						l.ie6Compat)
					) {
						var t = F.getChild(0).getFrameDocument();
						t.removeListener("mouseup", a), t.removeListener("mousemove", i);
					}
					if ("rtl" == b.lang.dir) {
						var n = e._.element.getFirst(),
							r = n.getComputedStyle("left");
						(r =
							"auto" == r
								? h.width - parseInt(n.rd("right"), 10) - e.hR().width
								: parseInt(r, 10)),
							n.removeStyle("right"),
							(e._.position.x += 1),
							e.move(r, e._.position.y);
					}
				}
				var r = e.dg,
					d = r.resizable;
				if (d != o.DIALOG_RESIZE_NONE) {
					var u,
						p,
						h,
						m,
						g,
						v,
						b = e.eY();
					e.on("load", function () {
						var t = "";
						d == o.DIALOG_RESIZE_WIDTH
							? (t = " cke_resizer_horizontal")
							: d == o.DIALOG_RESIZE_HEIGHT && (t = " cke_resizer_vertical");
						var i = f.kE(
							'<div class="cke_resizer' +
								t +
								'" title="' +
								c.htmlEncode(b.lang.resize) +
								'"></div>'
						);
						i.on("mousedown", n), e.bO.footer.append(i, 1);
					}),
						b.on("destroy", function () {
							c.removeFunction(n);
						});
				}
			}
			function p(e, t) {
				var n = function () {
						i(this), t(this);
					},
					o = function () {
						i(this);
					},
					i = function (e) {
						e.removeListener("ok", n), e.removeListener("cancel", o);
					};
				e.on("ok", n), e.on("cancel", o);
			}
			(o.dialog = function (e, i) {
				function a(e) {
					var t = m._.eO,
						n = e ? 1 : -1;
					if (!(t.length < 1)) {
						for (
							var o = (m._.aW + n + t.length) % t.length, i = o;
							!t[i].fM() && ((i = (i + n + t.length) % t.length), i != o);

						);
						t[i].focus(), "text" == t[i].type && t[i].select();
					}
				}
				function s(e) {
					if (m == o.dialog._.dL) {
						var i = e.data.db();
						if (((b = 0), 9 == i || i == o.dy + 9)) {
							var r = i == o.dy + 9;
							if (m._.eC) {
								var l = r ? t.call(m) : n.call(m);
								m.selectPage(l), m._.tabs[l][0].focus();
							} else a(!r);
							b = 1;
						} else
							i != o.eJ + 121 || m._.eC
								? (37 != i && 39 != i) ||
								  !m._.eC ||
								  ((l = 37 == i ? t.call(m) : n.call(m)),
								  m.selectPage(l),
								  m._.tabs[l][0].focus(),
								  (b = 1))
								: ((m._.eC = !0), m._.tabs[m._.gx][0].focus(), (b = 1));
						b && (e.stop(), e.data.preventDefault());
					}
				}
				function f(e) {
					b && e.data.preventDefault();
				}
				var p = o.dialog._.ev[i];
				(p = c.extend(p(e), g)), (p = c.clone(p)), (p = new w(this, p));
				var h = (o.document, e.theme.pu(e));
				(this._ = {
					app: e,
					element: h.element,
					name: i,
					hB: { width: 0, height: 0 },
					size: { width: 0, height: 0 },
					contents: {},
					buttons: {},
					iX: {},
					tabs: {},
					cU: [],
					gx: null,
					nM: null,
					gV: 0,
					qF: null,
					eC: !1,
					eO: [],
					aW: 0,
					hasFocus: !1,
				}),
					(this.bO = h.bO),
					this.bO.dialog.setStyles({
						position: l.ie6Compat ? "absolute" : "fixed",
						top: 0,
						left: 0,
						visibility: "hidden",
					}),
					o.event.call(this),
					(this.dg = p = o.oW("dialogDefinition", { name: i, dg: p }, e).dg),
					p.onLoad && this.on("load", p.onLoad),
					p.onShow && this.on("show", p.onShow),
					p.onHide && this.on("hide", p.onHide),
					p.onOk &&
						this.on("ok", function (e) {
							p.onOk.call(this, e) === !1 && (e.data.hide = !1);
						}),
					p.onCancel &&
						this.on("cancel", function (e) {
							p.onCancel.call(this, e) === !1 && (e.data.hide = !1);
						});
				var m = this,
					v = function (e) {
						var t,
							n = m._.contents,
							o = !1;
						for (t in n) {
							var i;
							for (i in n[t]) if ((o = e.call(this, n[t][i]))) return;
						}
					};
				this.on(
					"ok",
					function (t) {
						v(function (n) {
							if (n.validate) {
								var o = n.validate(this);
								if (
									("string" == typeof o &&
										(e.document.getWindow().$.alert(o), (o = !1)),
									o === !1)
								)
									return (
										n.select ? n.select() : n.focus(),
										(t.data.hide = !1),
										t.stop(),
										!0
									);
							}
						});
					},
					this,
					null,
					0
				),
					this.on(
						"cancel",
						function (t) {
							v(function (n) {
								return n.isChanged()
									? (e.document
											.getWindow()
											.$.confirm(e.lang.common.confirmCancel) ||
											(t.data.hide = !1),
									  !0)
									: void 0;
							});
						},
						this,
						null,
						0
					),
					this.bO.close.on(
						"click",
						function () {
							this.oW("cancel", { hide: !0 }).hide !== !1 && this.hide();
						},
						this
					);
				var b;
				this.on("show", function () {
					if (
						(o.document.on("keydown", s, this, null, 0),
						(l.opera || (l.gecko && l.mac)) &&
							o.document.on("keypress", f, this),
						l.ie6Compat)
					) {
						var e = F.getChild(0).getFrameDocument();
						e.on("keydown", s, this, null, 0);
					}
				}),
					this.on("hide", function () {
						o.document.removeListener("keydown", s),
							(l.opera || (l.gecko && l.mac)) &&
								o.document.removeListener("keypress", f);
					}),
					this.on("iframeAdded", function (e) {
						var t = new u(e.data.iframe.$.contentWindow.document);
						t.on("keydown", s, this, null, 0);
					}),
					this.on(
						"show",
						function () {
							this._.hasFocus || ((this._.aW = -1), a(!0));
						},
						this,
						null,
						4294967295
					),
					l.ie6Compat &&
						this.on(
							"load",
							function () {
								var e = this.getElement(),
									t = e.getFirst();
								t.remove(), t.appendTo(e);
							},
							this
						),
					r(this),
					d(this),
					this.bO.title.setText(p.title);
				for (var y = 0; y < p.contents.length; y++) this.addPage(p.contents[y]);
				var _ = /cke_dialog_tab(\s|$|_)/;
				this.bO.tabs.on(
					"click",
					function (e) {
						var t,
							n = this,
							o = e.data.bK();
						(_.test(o.$.className) || "a" == o.getName()) &&
							((t = o.$.id.substr(0, o.$.id.lastIndexOf("_"))),
							n.selectPage(t),
							n._.eC && ((n._.eC = !1), (n._.aW = -1), a(!0)),
							e.data.preventDefault());
					},
					this
				);
				var k = [],
					C = o.dialog._.gv.hbox
						.dQ(
							this,
							{
								type: "hbox",
								className: "cke_dialog_footer_buttons",
								widths: [],
								children: p.buttons,
							},
							k
						)
						.getChild();
				for (this.bO.footer.setHtml(k.join("")), y = 0; y < C.length; y++)
					this._.buttons[C[y].id] = C[y];
				o.skins.load(e, "dialog");
			}),
				(o.dialog.prototype = {
					resize: (function () {
						return function (e, t) {
							var n = this;
							(n._.hB && n._.hB.width == e && n._.hB.height == t) ||
								(o.dialog.oW(
									"resize",
									{ dialog: n, skin: n._.app.gd, width: e, height: t },
									n._.app
								),
								(n._.hB = { width: e, height: t }));
						};
					})(),
					hR: function () {
						var e = this._.element.getFirst();
						return {
							width: e.$.offsetWidth || 0,
							height: e.$.offsetHeight || 0,
						};
					},
					mn: function () {
						var e = this.hR();
						return (
							(e.height =
								e.height -
								(this.bO.title.$.offsetHeight || 0) -
								(this.bO.footer.$.offsetHeight || 0)),
							e
						);
					},
					move: (function () {
						var e;
						return function (t, n, i) {
							var a = this,
								r = a._.element.getFirst();
							if (
								(void 0 === e &&
									(e = "fixed" == r.getComputedStyle("position")),
								!e ||
									!a._.position ||
									a._.position.x != t ||
									a._.position.y != n)
							) {
								if (((a._.position = { x: t, y: n }), !e)) {
									var l = o.document.getWindow().hV();
									(t += l.x), (n += l.y);
								}
								r.setStyles({
									left: (t > 0 ? t : 0) + "px",
									top: (n > 0 ? n : 0) + "px",
								}),
									i && (a._.moved = 1);
							}
						};
					})(),
					gz: function () {
						return c.extend({}, this._.position);
					},
					show: function () {
						var e = this._.app;
						if ("qt" == e.mode && s) {
							var t = e.getSelection();
							t && t.up();
						}
						var n = this._.element,
							i = this.dg;
						if (!n.getParent() || !n.getParent().equals(o.document.bH())) {
							if ((n.appendTo(o.document.bH()), l.gecko && l.version < 10900)) {
								var a = this.bO.dialog;
								a.setStyle("position", "absolute"),
									setTimeout(function () {
										a.setStyle("position", "fixed");
									}, 0);
							}
							if (
								(this.resize(
									(this._.hB && this._.hB.width) || i.minWidth,
									(this._.hB && this._.hB.height) || i.minHeight
								),
								this.selectPage(this.dg.contents[0].id),
								this.reset(),
								null === o.dialog._.gw &&
									(o.dialog._.gw = this._.app.config.baseFloatZIndex),
								this._.element
									.getFirst()
									.setStyle("z-index", (o.dialog._.gw += 10)),
								null === o.dialog._.dL)
							) {
								(o.dialog._.dL = this), (this._.ep = null);
								try {
									C(this._.app);
								} catch (r) {
									(F = void 0), C(e), (k = !1);
								}
								n.on("keydown", S), n.on(l.opera ? "keypress" : "keyup", N);
								var d;
								for (d in { keyup: 1, keydown: 1, keypress: 1 }) n.on(d, I);
							} else {
								this._.ep = o.dialog._.dL;
								var u = this._.ep.getElement().getFirst();
								(u.$.style.zIndex -= Math.floor(
									this._.app.config.baseFloatZIndex / 2
								)),
									(o.dialog._.dL = this);
							}
							D(this, this, "", null, function () {
								var e = this.getButton("cancel");
								e
									? e.click()
									: this.oW("cancel", { hide: !0 }).hide !== !1 && this.hide();
							}),
								(this._.hasFocus = !1),
								c.setTimeout(
									function () {
										this.layout(),
											this.bO.dialog.setStyle("visibility", ""),
											this.cr("load", {}),
											this.oW("show", {}),
											this._.app.oW("dialogShow", this),
											this.gh(function (e) {
												e.jW && e.jW();
											});
									},
									100,
									this
								);
						}
					},
					layout: function () {
						var e = this,
							t = o.document.getWindow().eR(),
							n = e.hR();
						e.move(
							e._.moved ? e._.position.x : (t.width - n.width) / 2,
							e._.moved ? e._.position.y : (t.height - n.height) / 2
						);
					},
					gh: function (e) {
						var t,
							n = this;
						for (t in n._.contents) {
							var o;
							for (o in n._.contents[t]) e(n._.contents[t][o]);
						}
						return n;
					},
					reset: (function () {
						var e = function (e) {
							e.reset && e.reset();
						};
						return function () {
							return this.gh(e), this;
						};
					})(),
					rN: function () {
						var e = arguments;
						this.gh(function (t) {
							t.qi && t.qi.apply(t, e);
						});
					},
					sI: function () {
						var e = arguments;
						this.gh(function (t) {
							t.rx && t.rx.apply(t, e);
						});
					},
					hide: function () {
						this.oW("hide", {}), this._.app.oW("dialogHide", this);
						var e = this._.element;
						if (e.getParent()) {
							if (
								(e.remove(),
								this.bO.dialog.setStyle("visibility", "hidden"),
								T(this),
								this._.ep)
							) {
								var t = this._.ep.getElement().getFirst();
								t.setStyle(
									"z-index",
									parseInt(t.$.style.zIndex, 10) +
										Math.floor(this._.app.config.baseFloatZIndex / 2)
								);
							} else x();
							if (((o.dialog._.dL = this._.ep), this._.ep)) o.dialog._.gw -= 10;
							else {
								(o.dialog._.gw = null),
									e.removeListener("keydown", S),
									e.removeListener(l.opera ? "keypress" : "keyup", N);
								var n;
								for (n in { keyup: 1, keydown: 1, keypress: 1 })
									e.removeListener(n, I);
								var i = this._.app;
								if (
									(i.focus(),
									(i._.activeElement = null),
									(i._.oO = []),
									"qt" == i.mode && s)
								) {
									var a = i.getSelection();
									a && a.sd(!0);
								}
							}
							this.gh(function (e) {
								e.ki && e.ki();
							});
						}
					},
					addPage: function (e) {
						var t = this,
							n = [],
							i = e.label ? ' title="' + c.htmlEncode(e.label) + '"' : "",
							a =
								(e.elements,
								o.dialog._.gv.vbox.dQ(
									t,
									{
										type: "vbox",
										className: "cke_dialog_page_contents",
										children: e.elements,
										expand: !!e.expand,
										padding: e.padding,
										style: e.style || "width: 100%; height: 100%;",
									},
									n
								)),
							r = f.kE(n.join(""), o.document),
							l = f.kE(
								[
									'<a class="cke_dialog_tab"',
									t._.gV > 0 ? " cke_last" : "cke_first",
									i,
									e.hidden ? ' style="display:none"' : "",
									' id="',
									e.id + "_",
									c.getNextNumber(),
									'" href="javascript:void(0)"',
									' hp="true">',
									e.label,
									"</a>",
								].join(""),
								o.document
							);
						0 === t._.gV
							? t.bO.dialog.addClass("cke_single_page")
							: t.bO.dialog.removeClass("cke_single_page"),
							(t._.tabs[e.id] = [l, r]),
							t._.cU.push(e.id),
							t._.gV++,
							(t._.qF = l);
						for (
							var s, d = (t._.contents[e.id] = {}), u = a.getChild();
							(s = u.shift());

						)
							(d[s.id] = s),
								"function" == typeof s.getChild &&
									u.push.apply(u, s.getChild());
						r.setAttribute("name", e.id),
							r.appendTo(t.bO.contents),
							l.unselectable(),
							t.bO.tabs.append(l),
							e.accessKey &&
								(D(t, t, "bP+" + e.accessKey, $, R),
								(t._.iX["bP+" + e.accessKey] = e.id));
					},
					selectPage: function (e) {
						var t,
							n = this;
						for (t in n._.tabs) {
							var o = n._.tabs[t][0],
								i = n._.tabs[t][1];
							t != e && (o.removeClass("cke_dialog_tab_selected"), i.hide());
						}
						var a = n._.tabs[e];
						a[0].addClass("cke_dialog_tab_selected"),
							a[1].show(),
							(n._.gx = e),
							(n._.nM = c.indexOf(n._.cU, e));
					},
					vJ: function (e) {
						var t = this._.tabs[e] && this._.tabs[e][0];
						t && t.hide();
					},
					showPage: function (e) {
						var t = this._.tabs[e] && this._.tabs[e][0];
						t && t.show();
					},
					getElement: function () {
						return this._.element;
					},
					getName: function () {
						return this._.name;
					},
					getContentElement: function (e, t) {
						return this._.contents[e][t];
					},
					getValueOf: function (e, t) {
						return this.getContentElement(e, t).getValue();
					},
					setValueOf: function (e, t, n) {
						return this.getContentElement(e, t).setValue(n);
					},
					getButton: function (e) {
						return this._.buttons[e];
					},
					click: function (e) {
						return this._.buttons[e].click();
					},
					disableButton: function (e) {
						return this._.buttons[e].disable();
					},
					enableButton: function (e) {
						return this._.buttons[e].enable();
					},
					vj: function () {
						return this._.gV;
					},
					getParentApi: function () {
						return this._.app.cg;
					},
					eY: function () {
						return this._.app;
					},
					rf: function () {
						return this.eY().getSelection().rf();
					},
					tQ: function (e, t) {
						var n = this;
						if ("undefined" == typeof t)
							(t = n._.eO.length), n._.eO.push(new i(n, e, t));
						else {
							n._.eO.splice(t, 0, new i(n, e, t));
							for (var o = t + 1; o < n._.eO.length; o++) n._.eO[o].cQ++;
						}
					},
					setTitle: function (e) {
						this.bO.title.setText(e);
					},
				}),
				c.extend(o.dialog, {
					add: function (e, t) {
						(this._.ev[e] && "function" != typeof t) || (this._.ev[e] = t);
					},
					exists: function (e) {
						return !!this._.ev[e];
					},
					getCurrent: function () {
						return o.dialog._.dL;
					},
					okButton: (function () {
						var e = function (e, t) {
							return (
								(t = t || {}),
								c.extend(
									{
										id: "ok",
										type: "button",
										label: e.lang.common.ok,
										class: "cke_dialog_ui_button_ok",
										onClick: function (e) {
											var t = e.data.dialog;
											t.oW("ok", { hide: !0 }).hide !== !1 && t.hide();
										},
									},
									t,
									!0
								)
							);
						};
						return (
							(e.type = "button"),
							(e.override = function (t) {
								return c.extend(
									function (n) {
										return e(n, t);
									},
									{ type: "button" },
									!0
								);
							}),
							e
						);
					})(),
					cancelButton: (function () {
						var e = function (e, t) {
							return (
								(t = t || {}),
								c.extend(
									{
										id: "cancel",
										type: "button",
										label: e.lang.common.cancel,
										class: "cke_dialog_ui_button_cancel",
										onClick: function (e) {
											var t = e.data.dialog;
											t.oW("cancel", { hide: !0 }).hide !== !1 && t.hide();
										},
									},
									t,
									!0
								)
							);
						};
						return (
							(e.type = "button"),
							(e.override = function (t) {
								return c.extend(
									function (n) {
										return e(n, t);
									},
									{ type: "button" },
									!0
								);
							}),
							e
						);
					})(),
					addUIElement: function (e, t) {
						this._.gv[e] = t;
					},
				}),
				(o.dialog._ = { gv: {}, ev: {}, dL: null, gw: null }),
				o.event.du(o.dialog),
				o.event.du(o.dialog.prototype, !0);
			var g = {
					resizable: o.DIALOG_RESIZE_NONE,
					minWidth: 600,
					minHeight: 400,
					buttons: [o.dialog.okButton, o.dialog.cancelButton],
				},
				v = function (e, t, n) {
					for (var o, i = 0; (o = e[i]); i++) {
						if (o.id == t) return o;
						if (n && o[n]) {
							var a = v(o[n], t, n);
							if (a) return a;
						}
					}
					return null;
				},
				b = function (e, t, n, o, i) {
					if (n) {
						for (var a, r = 0; (a = e[r]); r++) {
							if (a.id == n) return e.splice(r, 0, t), t;
							if (o && a[o]) {
								var l = b(a[o], t, n, o, !0);
								if (l) return l;
							}
						}
						if (i) return null;
					}
					return e.push(t), t;
				},
				y = function (e, t, n) {
					for (var o, i = 0; (o = e[i]); i++) {
						if (o.id == t) return e.splice(i, 1);
						if (n && o[n]) {
							var a = y(o[n], t, n);
							if (a) return a;
						}
					}
					return null;
				},
				w = function (e, t) {
					this.dialog = e;
					for (var n, o = t.contents, i = 0; (n = o[i]); i++)
						o[i] = new a(e, n);
					c.extend(this, t);
				};
			(w.prototype = {
				vz: function (e) {
					return v(this.contents, e);
				},
				getButton: function (e) {
					return v(this.buttons, e);
				},
				uh: function (e, t) {
					return b(this.contents, e, t);
				},
				qW: function (e, t) {
					return b(this.buttons, e, t);
				},
				uP: function (e) {
					y(this.contents, e);
				},
				uO: function (e) {
					y(this.buttons, e);
				},
			}),
				(a.prototype = {
					eB: function (e) {
						return v(this.elements, e, "children");
					},
					add: function (e, t) {
						return b(this.elements, e, t, "children");
					},
					remove: function (e) {
						y(this.elements, e, "children");
					},
				});
			var F,
				_,
				k = !0,
				C = function (e) {
					var t = o.document.getWindow();
					if (!k || !F) {
						var n = e.config.dialog_backgroundCoverColor || "white",
							i = [
								'<div style="position: ',
								l.ie6Compat ? "absolute" : "fixed",
								"; z-index: ",
								e.config.baseFloatZIndex,
								"; top: 0px; left: 0px; ",
								l.ie6Compat ? "" : "background-color: " + n,
								'" id="cke_dialog_background_cover">',
							];
						if (l.ie6Compat) {
							var a = l.isCustomDomain(),
								r =
									"<html><body style=\\'background-color:" +
									n +
									";\\'></body></html>";
							i.push(
								'<iframe hp="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:'
							),
								i.push(
									"void((function(){document.open();" +
										(a ? "document.domain='" + document.domain + "';" : "") +
										"document.write( '" +
										r +
										"' );document.close();})())"
								),
								i.push(
									'" style="position:absolute;left:0;top:0;width:100%;height: 100%;progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>'
								);
						}
						i.push("</div>"), (F = f.kE(i.join(""), o.document));
					}
					var s = F,
						d = function () {
							var e = t.eR();
							s.setStyles({ width: e.width + "px", height: e.height + "px" });
						},
						c = function () {
							var e = t.hV(),
								n = o.dialog._.dL;
							s.setStyles({ left: e.x + "px", top: e.y + "px" });
							do {
								var i = n.gz();
								n.move(i.x, i.y);
							} while ((n = n._.ep));
						};
					if (((_ = d), t.on("resize", d), d(), l.ie6Compat)) {
						var u = function () {
							c(), arguments.callee.lw.apply(this, arguments);
						};
						t.$.setTimeout(function () {
							(u.lw = window.onscroll || function () {}), (window.onscroll = u);
						}, 0),
							c();
					}
					var p = e.config.dialog_backgroundCoverOpacity;
					s.setOpacity("undefined" != typeof p ? p : 0.5),
						s.appendTo(o.document.bH());
				},
				x = function () {
					if (F) {
						var e = o.document.getWindow();
						F.remove(),
							e.removeListener("resize", _),
							l.ie6Compat &&
								e.$.setTimeout(function () {
									var e = window.onscroll && window.onscroll.lw;
									window.onscroll = e || null;
								}, 0),
							(_ = null);
					}
				},
				E = {},
				S = function (e) {
					var t = e.data.$.ctrlKey || e.data.$.metaKey,
						n = e.data.$.altKey,
						o = e.data.$.shiftKey,
						i = String.fromCharCode(e.data.$.keyCode),
						a = E[(t ? "bP+" : "") + (n ? "eJ+" : "") + (o ? "dy+" : "") + i];
					a &&
						a.length &&
						((a = a[a.length - 1]),
						a.keydown && a.keydown.call(a.bf, a.dialog, a.iK),
						e.data.preventDefault());
				},
				N = function (e) {
					var t = e.data.$.ctrlKey || e.data.$.metaKey,
						n = e.data.$.altKey,
						o = e.data.$.shiftKey,
						i = String.fromCharCode(e.data.$.keyCode),
						a = E[(t ? "bP+" : "") + (n ? "eJ+" : "") + (o ? "dy+" : "") + i];
					a &&
						a.length &&
						((a = a[a.length - 1]),
						a.keyup &&
							(a.keyup.call(a.bf, a.dialog, a.iK), e.data.preventDefault()));
				},
				D = function (e, t, n, o, i) {
					var a = E[n] || (E[n] = []);
					a.push({
						bf: e,
						dialog: t,
						iK: n,
						keyup: i || e.eZ,
						keydown: o || e.iU,
					});
				},
				T = function (e) {
					var t;
					for (t in E) {
						for (var n = E[t], o = n.length - 1; o >= 0; o--)
							(n[o].dialog == e || n[o].bf == e) && n.splice(o, 1);
						0 === n.length && delete E[t];
					}
				},
				R = function (e, t) {
					e._.iX[t] && e.selectPage(e._.iX[t]);
				},
				$ = function () {},
				W = { 27: 1, 13: 1 },
				I = function (e) {
					e.data.db() in W && e.data.stopPropagation();
				};
			!(function () {
				m.dialog = {
					bf: function (e, t, n, i, a, r, l) {
						if (!(arguments.length < 4)) {
							{
								var s,
									d = (i.call ? i(t) : i) || "div",
									u = ["<", d, " "],
									f = (a && a.call ? a(t) : a) || {},
									p = (r && r.call ? r(t) : r) || {},
									h = (l && l.call ? l(e, t) : l) || "",
									m = (this.oJ = p.id || c.getNextNumber() + "_uiElement");
								this.id = t.id;
							}
							p.id = m;
							var g = {};
							t.type && (g["cke_dialog_ui_" + t.type] = 1),
								t.className && (g[t.className] = 1);
							var v =
								p["class"] && p["class"].split ? p["class"].split(" ") : [];
							for (s = 0; s < v.length; s++) v[s] && (g[v[s]] = 1);
							var b = [];
							for (s in g) b.push(s);
							(p["class"] = b.join(" ")), t.title && (p.title = t.title);
							var y = (t.style || "").split(";");
							for (s in f) y.push(s + ":" + f[s]);
							for (
								t.hidden && y.push("display:none"), s = y.length - 1;
								s >= 0;
								s--
							)
								"" === y[s] && y.splice(s, 1);
							y.length > 0 &&
								(p.style = (p.style ? p.style + "; " : "") + y.join("; "));
							for (s in p) u.push(s + '="' + c.htmlEncode(p[s]) + '" ');
							u.push(">", h, "</", d, ">"),
								n.push(u.join("")),
								((this._ || (this._ = {})).dialog = e),
								"boolean" == typeof t.isChanged &&
									(this.isChanged = function () {
										return t.isChanged;
									}),
								"function" == typeof t.isChanged &&
									(this.isChanged = t.isChanged),
								o.event.du(this),
								this.nc(t),
								this.eZ &&
									this.iU &&
									t.accessKey &&
									D(this, e, "bP+" + t.accessKey);
							var w = this;
							e.on("load", function () {
								w.getInputElement() &&
									w.getInputElement().on(
										"focus",
										function () {
											(e._.eC = !1), (e._.hasFocus = !0), w.oW("focus");
										},
										w
									);
							}),
								this.eA &&
									((this.cQ = e._.eO.push(this) - 1),
									this.on("focus", function () {
										e._.aW = w.cQ;
									})),
								c.extend(this, t);
						}
					},
					hbox: function (e, t, n, o, i) {
						if (!(arguments.length < 4)) {
							this._ || (this._ = {});
							var a,
								r = ((this._.children = t), (i && i.widths) || null),
								l = (i && i.height) || null,
								s = {},
								d = function () {
									var e = ['<tbody><tr class="cke_dialog_ui_hbox">'];
									for (a = 0; a < n.length; a++) {
										var t = "cke_dialog_ui_hbox_child",
											o = [];
										0 === a && (t = "cke_dialog_ui_hbox_first"),
											a == n.length - 1 && (t = "cke_dialog_ui_hbox_last"),
											e.push('<td class="', t, '" '),
											r
												? r[a] && o.push("width:" + c.cssLength(r[a]))
												: o.push("width:" + Math.floor(100 / n.length) + "%"),
											l && o.push("height:" + c.cssLength(l)),
											i &&
												void 0 != i.padding &&
												o.push("padding:" + c.cssLength(i.padding)),
											o.length > 0 && e.push('style="' + o.join("; ") + '" '),
											e.push(">", n[a], "</td>");
									}
									return e.push("</tr></tbody>"), e.join("");
								};
							m.dialog.bf.call(
								this,
								e,
								i || { type: "hbox" },
								o,
								"table",
								s,
								(i && i.align && { align: i.align }) || null,
								d
							);
						}
					},
					vbox: function (e, t, n, o, i) {
						if (!(arguments.length < 3)) {
							this._ || (this._ = {});
							var a = ((this._.children = t), (i && i.width) || null),
								r = (i && i.vY) || null,
								l = function () {
									var t = ['<table cellspacing="0" border="0" '];
									t.push('style="'),
										i && i.expand && t.push("height:100%;"),
										t.push("width:" + c.cssLength(a || "100%"), ";"),
										t.push('"'),
										t.push(
											'align="',
											c.htmlEncode(
												(i && i.align) ||
													("ltr" == e.eY().lang.dir ? "left" : "right")
											),
											'" '
										),
										t.push("><tbody>");
									for (var o = 0; o < n.length; o++) {
										var l = [];
										t.push("<tr><td "),
											a && l.push("width:" + c.cssLength(a || "100%")),
											r
												? l.push("height:" + c.cssLength(r[o]))
												: i &&
												  i.expand &&
												  l.push("height:" + Math.floor(100 / n.length) + "%"),
											i &&
												void 0 != i.padding &&
												l.push("padding:" + c.cssLength(i.padding)),
											l.length > 0 && t.push('style="', l.join("; "), '" '),
											t.push(
												' class="cke_dialog_ui_vbox_child">',
												n[o],
												"</td></tr>"
											);
									}
									return t.push("</tbody></table>"), t.join("");
								};
							m.dialog.bf.call(
								this,
								e,
								i || { type: "vbox" },
								o,
								"div",
								null,
								null,
								l
							);
						}
					},
				};
			})(),
				(m.dialog.bf.prototype = {
					getElement: function () {
						return o.document.getById(this.oJ);
					},
					getInputElement: function () {
						return this.getElement();
					},
					getDialog: function () {
						return this._.dialog;
					},
					setValue: function (e) {
						return (
							this.getInputElement().setValue(e),
							this.oW("change", { value: e }),
							this
						);
					},
					getValue: function () {
						return this.getInputElement().getValue();
					},
					isChanged: function () {
						return !1;
					},
					selectParentTab: function () {
						for (
							var e, t = this, n = t.getInputElement(), o = n;
							(o = o.getParent()) &&
							-1 == o.$.className.search("cke_dialog_page_contents");

						);
						return o
							? ((e = o.getAttribute("name")),
							  t._.dialog._.gx != e && t._.dialog.selectPage(e),
							  t)
							: t;
					},
					focus: function () {
						return this.selectParentTab().getInputElement().focus(), this;
					},
					nc: function (e) {
						var t,
							n,
							o = /^on([A-Z]\w+)/,
							i = function (e, t, n, o) {
								t.on("load", function () {
									e.getInputElement().on(n, o, e);
								});
							};
						for (n in e)
							(t = n.match(o)) &&
								(this.dm[n]
									? this.dm[n].call(this, this._.dialog, e[n])
									: i(this, this._.dialog, t[1].toLowerCase(), e[n]));
						return this;
					},
					dm: {
						onLoad: function (e, t) {
							e.on("load", t, this);
						},
						onShow: function (e, t) {
							e.on("show", t, this);
						},
						onHide: function (e, t) {
							e.on("hide", t, this);
						},
					},
					iU: function () {
						this.focus();
					},
					eZ: function () {},
					disable: function () {
						var e = this.getInputElement();
						e.setAttribute("disabled", "true"), e.addClass("cke_disabled");
					},
					enable: function () {
						var e = this.getInputElement();
						e.removeAttribute("disabled"), e.removeClass("cke_disabled");
					},
					isEnabled: function () {
						return !this.getInputElement().getAttribute("disabled");
					},
					isVisible: function () {
						return this.getInputElement().isVisible();
					},
					fM: function () {
						return this.isEnabled() && this.isVisible() ? !0 : !1;
					},
				}),
				(m.dialog.hbox.prototype = c.extend(
					new m.dialog.bf(),
					{
						getChild: function (e) {
							var t = this;
							return arguments.length < 1
								? t._.children.concat()
								: (e.splice || (e = [e]),
								  e.length < 2
										? t._.children[e[0]]
										: t._.children[e[0]] && t._.children[e[0]].getChild
										? t._.children[e[0]].getChild(e.slice(1, e.length))
										: null);
						},
					},
					!0
				)),
				(m.dialog.vbox.prototype = new m.dialog.hbox()),
				(function () {
					var e = {
						dQ: function (e, t, n) {
							for (
								var i, a = t.children, r = [], l = [], s = 0;
								s < a.length && (i = a[s]);
								s++
							) {
								var d = [];
								r.push(d), l.push(o.dialog._.gv[i.type].dQ(e, i, d));
							}
							return new m.dialog[t.type](e, l, r, n, t);
						},
					};
					o.dialog.addUIElement("hbox", e), o.dialog.addUIElement("vbox", e);
				})(),
				(o.rB = function (e) {
					this.ry = e;
				}),
				(o.rB.prototype = {
					exec: function (e) {
						e.openDialog(this.ry);
					},
					sG: !1,
				}),
				(function () {
					var e = /^([a]|[^a])+$/,
						t = /^\d*$/,
						n = /^\d*(?:\.\d+)?$/;
					(o.sg = 1),
						(o.jb = 2),
						(o.dialog.validate = {
							functions: function () {
								return function () {
									var e,
										t = this,
										n = t && t.getValue ? t.getValue() : arguments[0],
										i = void 0,
										a = o.jb,
										r = [];
									for (
										e = 0;
										e < arguments.length && "function" == typeof arguments[e];
										e++
									)
										r.push(arguments[e]);
									e < arguments.length &&
										"string" == typeof arguments[e] &&
										((i = arguments[e]), e++),
										e < arguments.length &&
											"number" == typeof arguments[e] &&
											(a = arguments[e]);
									var l = a == o.jb ? !0 : !1;
									for (e = 0; e < r.length; e++)
										l = a == o.jb ? l && r[e](n) : l || r[e](n);
									return l
										? !0
										: (void 0 !== i && alert(i),
										  t && (t.select || t.focus) && (t.select || t.focus()),
										  !1);
								};
							},
							regex: function (e, t) {
								return function () {
									var n = this,
										o = n && n.getValue ? n.getValue() : arguments[0];
									return e.test(o)
										? !0
										: (void 0 !== t && alert(t),
										  n &&
												(n.select || n.focus) &&
												(n.select ? n.select() : n.focus()),
										  !1);
								};
							},
							notEmpty: function (t) {
								return this.regex(e, t);
							},
							integer: function (e) {
								return this.regex(t, e);
							},
							number: function (e) {
								return this.regex(n, e);
							},
							equals: function (e, t) {
								return this.functions(function (t) {
									return t == e;
								}, t);
							},
							notEqual: function (e, t) {
								return this.functions(function (t) {
									return t != e;
								}, t);
							},
						});
				})(),
				c.extend(o.application.prototype, {
					openDialog: function (e, t, n) {
						var i = o.dialog._.ev[e];
						if ("function" == typeof i) {
							var a = this._.oB || (this._.oB = {}),
								r = a[e] || (a[e] = new o.dialog(this, e));
							return (
								t && t.call(r, r),
								this._.activeElement ||
									(this._.activeElement = this.document.$.activeElement),
								this._.oO ||
									(this._.oO = this.ld["filesview.filesview"].tools.oO()),
								r.show(),
								r
							);
						}
						if ("failed" == i)
							throw new Error(
								'[CKFINDER.dialog.openDialog] Dialog "' +
									e +
									'" failed when loading dg.'
							);
						var l = o.document.bH(),
							s = l.$.style.cursor,
							d = this;
						return (
							l.setStyle("cursor", "wait"),
							o.scriptLoader.load(
								o.getUrl(i),
								function () {
									"function" != typeof o.dialog._.ev[e] &&
										(o.dialog._.ev[e] = "failed"),
										d.openDialog(e, t),
										l.setStyle("cursor", s);
								},
								null,
								null,
								n
							),
							null
						);
					},
					hs: function (e, t, n, o) {
						var i = this;
						setTimeout(function () {
							i.cg.openDialog("Input", function (a) {
								a.show(),
									a.setTitle(e || i.lang.common.inputTitle),
									a.getContentElement("tab1", "msg").getElement().setHtml(t),
									a.getContentElement("tab1", "input").setValue(n),
									p(a, function (e) {
										var t = e.getContentElement("tab1", "input").getValue();
										o(t);
									});
							});
						}, 0);
					},
					msgDialog: function (e, t, n) {
						var o = this;
						setTimeout(function () {
							o.cg.openDialog("Msg", function (i) {
								i.show(),
									i.setTitle(e || o.lang.common.messageTitle),
									i.getContentElement("tab1", "msg").getElement().setHtml(t),
									n &&
										p(i, function () {
											n();
										});
							});
						}, 0);
					},
					fe: function (e, t, n) {
						var o = this;
						setTimeout(function () {
							o.cg.openDialog("Confirm", function (i) {
								i.show(),
									i.setTitle(e || o.lang.common.confirmationTitle),
									i.getContentElement("tab1", "msg").getElement().setHtml(t),
									p(i, function () {
										n();
									});
							});
						}, 0);
					},
					skippedFilesDialog: function (e, t, n, o) {
						var i = this;
						setTimeout(function () {
							i.cg.openDialog("SkippedFiles", function (a) {
								a.show(),
									a.setTitle(e || i.lang.common.messageTitle),
									n
										? (a.getContentElement("tab1", "msg").getElement().show(),
										  a
												.getContentElement("tab1", "msg")
												.getElement()
												.setHtml(n))
										: a.getContentElement("tab1", "msg").getElement().hide();
								var r = "",
									l = "cke_files_list",
									s = "",
									d = t.length;
								d > 3 &&
									((l += " cke_files_list_many"),
									(s = ' style="height: ' + Math.min(d + 0.1, 20) + 'em"'));
								for (var c = 0; d > c; c++)
									r +=
										"<li>" +
										("string" == typeof t[c]
											? t[c]
											: t[c].getAttribute("name")) +
										"</li>";
								a
									.getContentElement("tab1", "skippedList")
									.getElement()
									.setHtml('<ul class="' + l + '"' + s + ">" + r + "</ul>"),
									o &&
										p(a, function () {
											o();
										});
							});
						}, 0);
					},
				}),
				h.add("dialog", {
					bM: ["dialogui"],
					onLoad: function () {
						o.dialog.add("Confirm", function (e) {
							return {
								title: e.lang.common.confirmationTitle,
								minWidth: 270,
								minHeight: 60,
								contents: [
									{
										id: "tab1",
										elements: [{ type: "html", html: "", id: "msg" }],
									},
								],
								buttons: [
									CKFinder.dialog.okButton,
									CKFinder.dialog.cancelButton,
								],
							};
						}),
							o.dialog.add("Msg", function (e) {
								return {
									title: e.lang.common.messageTitle,
									minWidth: 270,
									minHeight: 60,
									contents: [
										{
											id: "tab1",
											elements: [{ type: "html", html: "", id: "msg" }],
										},
									],
									buttons: [CKFinder.dialog.okButton],
								};
							}),
							o.dialog.add("Input", function (e) {
								return {
									title: e.lang.common.inputTitle,
									minWidth: 270,
									minHeight: 60,
									contents: [
										{
											id: "tab1",
											elements: [
												{ type: "html", html: "", id: "msg" },
												{ type: "text", id: "input" },
											],
										},
									],
									buttons: [
										CKFinder.dialog.okButton,
										CKFinder.dialog.cancelButton,
									],
								};
							}),
							o.dialog.add("SkippedFiles", function (e) {
								return {
									title: e.lang.common.messageTitle,
									minWidth: 400,
									minHeight: 100,
									contents: [
										{
											id: "tab1",
											style: l.ie7Compat ? "height: auto" : "",
											expand: !0,
											padding: 0,
											elements: [
												{
													type: "vbox",
													expand: !0,
													children: [
														{
															type: "html",
															className: "cke_dialog_msg",
															html: "",
															id: "msg",
														},
														{
															type: "html",
															id: "skippedDescription",
															className: "cke_dialog_msg",
															html: e.lang.SkippedFiles,
														},
														{
															type: "html",
															id: "skippedList",
															className: "cke_dialog_msg",
															html: "",
														},
													],
												},
											],
										},
									],
									buttons: [CKFinder.dialog.okButton],
								};
							});
					},
				});
		})(),
		h.add("dialogui"),
		(function () {
			var e = function (e) {
					var t = this;
					t._ || (t._ = {}), (t._["default"] = t._.hq = e["default"] || "");
					for (var n = [t._], o = 1; o < arguments.length; o++)
						n.push(arguments[o]);
					return n.push(!0), c.extend.apply(c, n), t._;
				},
				t = {
					dQ: function (e, t, n) {
						return new m.dialog.ju(e, t, n);
					},
				},
				n = {
					dQ: function (e, t, n) {
						return new m.dialog[t.type](e, t, n);
					},
				},
				i = {
					isChanged: function () {
						return this.getValue() != this.lu();
					},
					reset: function () {
						this.setValue(this.lu());
					},
					jW: function () {
						this._.hq = this.getValue();
					},
					ki: function () {
						this._.hq = this._["default"];
					},
					lu: function () {
						return this._.hq;
					},
				},
				a = c.extend(
					{},
					m.dialog.bf.prototype.dm,
					{
						onChange: function (e, t) {
							this._.pL ||
								(e.on(
									"load",
									function () {
										this.getInputElement().on(
											"change",
											function () {
												this.oW("change", { value: this.getValue() });
											},
											this
										);
									},
									this
								),
								(this._.pL = !0)),
								this.on("change", t);
						},
					},
					!0
				),
				r = /^on([A-Z]\w+)/,
				u = function (e) {
					var t;
					for (t in e)
						(r.test(t) || "title" == t || "type" == t) && delete e[t];
					return e;
				};
			c.extend(
				m.dialog,
				{
					dD: function (t, n, i, a) {
						if (!(arguments.length < 4)) {
							var r = e.call(this, n);
							r.hz = c.getNextNumber() + "_label";
							var l =
								((this._.children = []),
								function () {
									var e = [];
									if ("horizontal" != n.uC)
										e.push(
											'<div class="cke_dialog_ui_labeled_label" id="',
											r.hz,
											'" >',
											n.label,
											"</div>",
											'<div class="cke_dialog_ui_labeled_content">',
											a(t, n),
											"</div>"
										);
									else {
										var i = {
											type: "hbox",
											widths: n.widths,
											padding: 0,
											children: [
												{
													type: "html",
													html:
														'<span class="cke_dialog_ui_labeled_label" id="' +
														r.hz +
														'">' +
														c.htmlEncode(n.label) +
														"</span>",
												},
												{
													type: "html",
													html:
														'<span class="cke_dialog_ui_labeled_content">' +
														a(t, n) +
														"</span>",
												},
											],
										};
										o.dialog._.gv.hbox.dQ(t, i, e);
									}
									return e.join("");
								});
							m.dialog.bf.call(this, t, n, i, "div", null, null, l);
						}
					},
					ju: function (t, n, o) {
						if (!(arguments.length < 3)) {
							e.call(this, n);
							var i = (this._.le = c.getNextNumber() + "_textInput"),
								a = {
									class: "cke_dialog_ui_input_" + n.type,
									id: i,
									type: "text",
								};
							n.validate && (this.validate = n.validate),
								n.maxLength && (a.uy = n.maxLength),
								n.size && (a.size = n.size);
							var r = this,
								l = !1;
							t.on("load", function () {
								r.getInputElement().on("keydown", function (e) {
									13 == e.data.db() && (l = !0);
								}),
									r.getInputElement().on(
										"keyup",
										function (e) {
											13 == e.data.db() &&
												l &&
												(t.getButton("ok") &&
													setTimeout(function () {
														t.getButton("ok").click();
													}, 0),
												(l = !1));
										},
										null,
										null,
										1e3
									);
							});
							var s = function () {
								var e = ['<div class="cke_dialog_ui_input_', n.type, '"'];
								n.width && e.push('style="width:' + n.width + '" '),
									e.push("><input ");
								var t;
								for (t in a) e.push(t + '="' + a[t] + '" ');
								return e.push(" /></div>"), e.join("");
							};
							m.dialog.dD.call(this, t, n, o, s);
						}
					},
					textarea: function (t, n, o) {
						if (!(arguments.length < 3)) {
							e.call(this, n);
							var i = this,
								a = (this._.le = c.getNextNumber() + "_textarea"),
								r = {};
							n.validate && (this.validate = n.validate),
								(r.rows = n.rows || 5),
								(r.cols = n.cols || 20);
							var l = function () {
								var e,
									t = [
										'<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" id="',
										a,
										'" ',
									];
								for (e in r) t.push(e + '="' + c.htmlEncode(r[e]) + '" ');
								return (
									t.push(
										">",
										c.htmlEncode(i._["default"]),
										"</textarea></div>"
									),
									t.join("")
								);
							};
							m.dialog.dD.call(this, t, n, o, l);
						}
					},
					checkbox: function (t, n, o) {
						if (!(arguments.length < 3)) {
							var i = e.call(this, n, { default: !!n["default"] });
							n.validate && (this.validate = n.validate);
							var a = function () {
								var e = c.extend(
										{},
										n,
										{
											id: n.id
												? n.id + "_checkbox"
												: c.getNextNumber() + "_checkbox",
										},
										!0
									),
									o = [],
									a = {
										class: "cke_dialog_ui_checkbox_input",
										type: "checkbox",
									};
								return (
									u(e),
									n["default"] && (a.checked = "checked"),
									(i.checkbox = new m.dialog.bf(t, e, o, "input", null, a)),
									o.push(
										' <label for="',
										a.id,
										'">',
										c.htmlEncode(n.label),
										"</label>"
									),
									o.join("")
								);
							};
							m.dialog.bf.call(this, t, n, o, "span", null, null, a);
						}
					},
					radio: function (t, n, o) {
						if (!(arguments.length < 3)) {
							e.call(this, n),
								this._["default"] ||
									(this._["default"] = this._.hq = n.items[0][1]),
								n.validate && (this.validate = n.sh);
							var i = [],
								a = this,
								r = function () {
									for (
										var e = [],
											o = [],
											r = n.id ? n.id + "_radio" : c.getNextNumber() + "_radio",
											l = 0;
										l < n.items.length;
										l++
									) {
										var s = n.items[l],
											d = void 0 !== s[2] ? s[2] : s[0],
											f = void 0 !== s[1] ? s[1] : s[0],
											p = c.extend(
												{},
												n,
												{
													id: c.getNextNumber() + "_radio_input",
													title: null,
													type: null,
												},
												!0
											),
											h = c.extend({}, p, { id: null, title: d }, !0),
											g = {
												type: "radio",
												class: "cke_dialog_ui_radio_input",
												name: r,
												value: f,
											},
											v = [];
										a._["default"] == f && (g.checked = "checked"),
											u(p),
											u(h),
											i.push(new m.dialog.bf(t, p, v, "input", null, g)),
											v.push(" "),
											new m.dialog.bf(
												t,
												h,
												v,
												"label",
												null,
												{ for: g.id },
												s[0]
											),
											e.push(v.join(""));
									}
									return new m.dialog.hbox(t, [], e, o), o.join("");
								};
							m.dialog.dD.call(this, t, n, o, r), (this._.children = i);
						}
					},
					button: function (t, n, i) {
						if (arguments.length) {
							"function" == typeof n && (n = n(t.eY())),
								e.call(this, n, { disabled: n.disabled || !1 }),
								o.event.du(this);
							var a = this;
							t.on(
								"load",
								function () {
									var e = this.getElement();
									!(function () {
										e.on("click", function (e) {
											a.oW("click", { dialog: a.getDialog() }),
												e.data.preventDefault();
										});
									})(),
										e.unselectable();
								},
								this
							);
							var r = c.extend({}, n);
							delete r.style,
								m.dialog.bf.call(
									this,
									t,
									r,
									i,
									"a",
									null,
									{
										style: n.style,
										href: "javascript:void(0)",
										title: n.label,
										hp: "true",
										class: n["class"],
									},
									'<span class="cke_dialog_ui_button">' +
										c.htmlEncode(n.label) +
										"</span>"
								);
						}
					},
					select: function (t, n, o) {
						if (!(arguments.length < 3)) {
							var i = e.call(this, n);
							n.validate && (this.validate = n.validate);
							var a = function () {
								var e = c.extend(
										{},
										n,
										{
											id: n.id
												? n.id + "_select"
												: c.getNextNumber() + "_select",
										},
										!0
									),
									o = [],
									a = [],
									r = { class: "cke_dialog_ui_input_select" };
								void 0 != n.size && (r.size = n.size),
									void 0 != n.multiple && (r.multiple = n.multiple),
									u(e);
								for (var l, s = 0; s < n.items.length && (l = n.items[s]); s++)
									a.push(
										'<option value="',
										c.htmlEncode(void 0 !== l[1] ? l[1] : l[0]),
										'" /> ',
										c.htmlEncode(l[0])
									);
								return (
									(i.select = new m.dialog.bf(
										t,
										e,
										o,
										"select",
										null,
										r,
										a.join("")
									)),
									o.join("")
								);
							};
							m.dialog.dD.call(this, t, n, o, a);
						}
					},
					file: function (t, n, i) {
						if (!(arguments.length < 3)) {
							void 0 === n["default"] && (n["default"] = "");
							var a = c.extend(e.call(this, n), { dg: n, buttons: [] });
							n.validate && (this.validate = n.validate);
							var r = function () {
								a.gL = c.getNextNumber() + "_fileInput";
								var e = l.isCustomDomain(),
									t = [
										'<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" id="',
										a.gL,
										'" title="',
										n.label,
										'" src="javascript:void(',
									];
								return (
									t.push(
										e
											? "(function(){document.open();document.domain='" +
													document.domain +
													"';document.close();})()"
											: "0"
									),
									t.push(')"></iframe>'),
									t.join("")
								);
							};
							t.on("load", function () {
								var e = o.document.getById(a.gL),
									t = e.getParent();
								t.addClass("cke_dialog_ui_input_file");
							}),
								m.dialog.dD.call(this, t, n, i, r);
						}
					},
					fileButton: function (t, n, o) {
						if (!(arguments.length < 3)) {
							var i = (e.call(this, n), this);
							n.validate && (this.validate = n.validate);
							var a = c.extend({}, n),
								r = a.onClick;
							(a.className =
								(a.className ? a.className + " " : "") +
								"cke_dialog_ui_button"),
								(a.onClick = function (e) {
									var o = n["for"];
									(r && r.call(this, e) === !1) ||
										(t.getContentElement(o[0], o[1]).submit(), this.disable());
								}),
								t.on("load", function () {
									t.getContentElement(n["for"][0], n["for"][1])._.buttons.push(
										i
									);
								}),
								m.dialog.button.call(this, t, a, o);
						}
					},
					html: (function () {
						var e = /^\s*<[\w:]+\s+([^>]*)?>/,
							t = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
							n = /\/$/;
						return function (o, i, a) {
							if (!(arguments.length < 3)) {
								var r,
									l,
									s,
									d = [],
									c = i.html;
								if (
									("<" != c.charAt(0) && (c = "<span>" + c + "</span>"),
									i.focus)
								) {
									var u = this.focus;
									if (
										((this.focus = function () {
											u.call(this), i.focus.call(this), this.oW("focus");
										}),
										i.fM)
									) {
										var f = this.fM;
										this.fM = f;
									}
									this.eA = !0;
								}
								m.dialog.bf.call(this, o, i, d, "span", null, null, ""),
									(r = d.join("")),
									(l = r.match(e)),
									(s = c.match(t) || ["", "", ""]),
									n.test(s[1]) &&
										((s[1] = s[1].slice(0, -1)), (s[2] = "/" + s[2])),
									a.push([s[1], " ", l[1] || "", s[2]].join(""));
							}
						};
					})(),
				},
				!0
			),
				(m.dialog.html.prototype = new m.dialog.bf()),
				(m.dialog.dD.prototype = c.extend(
					new m.dialog.bf(),
					{
						rW: function (e) {
							var t = o.document.getById(this._.hz);
							return (
								t.iu() < 1
									? new d.text(e, o.document).appendTo(t)
									: (t.getChild(0).$.nodeValue = e),
								this
							);
						},
						vt: function () {
							var e = o.document.getById(this._.hz);
							return !e || e.iu() < 1 ? "" : e.getChild(0).getText();
						},
						dm: a,
					},
					!0
				)),
				(m.dialog.button.prototype = c.extend(
					new m.dialog.bf(),
					{
						click: function () {
							var e = this;
							return e._.disabled
								? (e.getElement().$.blur(), !1)
								: e.oW("click", { dialog: e._.dialog });
						},
						enable: function () {
							this._.disabled = !1;
							var e = this.getElement();
							e && e.removeClass("disabled");
						},
						disable: function () {
							(this._.disabled = !0), this.getElement().addClass("disabled");
						},
						isVisible: function () {
							return this.getElement().getFirst().isVisible();
						},
						isEnabled: function () {
							return !this._.disabled;
						},
						dm: c.extend(
							{},
							m.dialog.bf.prototype.dm,
							{
								onClick: function (e, t) {
									this.on("click", t);
								},
							},
							!0
						),
						eZ: function () {
							this.click();
						},
						iU: function () {
							this.focus();
						},
						eA: !0,
					},
					!0
				)),
				(m.dialog.ju.prototype = c.extend(
					new m.dialog.dD(),
					{
						getInputElement: function () {
							return o.document.getById(this._.le);
						},
						focus: function () {
							var e = this.selectParentTab();
							setTimeout(function () {
								var t = e.getInputElement();
								t && t.$.focus();
							}, 0);
						},
						select: function () {
							var e = this.selectParentTab();
							setTimeout(function () {
								var t = e.getInputElement();
								t && (t.$.focus(), t.$.select());
							}, 0);
						},
						eZ: function () {
							this.select();
						},
						setValue: function (e) {
							return (
								(e = null !== e ? e : ""),
								m.dialog.bf.prototype.setValue.call(this, e)
							);
						},
						eA: !0,
					},
					i,
					!0
				)),
				(m.dialog.textarea.prototype = new m.dialog.ju()),
				(m.dialog.select.prototype = c.extend(
					new m.dialog.dD(),
					{
						getInputElement: function () {
							return this._.select.getElement();
						},
						add: function (e, t, n) {
							var o = new f("option", this.getDialog().eY().document),
								i = this.getInputElement().$;
							return (
								(o.$.text = e),
								(o.$.value = void 0 === t || null === t ? e : t),
								void 0 === n || null === n
									? s
										? i.add(o.$)
										: i.add(o.$, null)
									: i.add(o.$, n),
								this
							);
						},
						remove: function (e) {
							var t = this.getInputElement().$;
							return t.remove(e), this;
						},
						clear: function () {
							for (var e = this.getInputElement().$; e.length > 0; )
								e.remove(0);
							return this;
						},
						eA: !0,
					},
					i,
					!0
				)),
				(m.dialog.checkbox.prototype = c.extend(
					new m.dialog.bf(),
					{
						getInputElement: function () {
							return this._.checkbox.getElement();
						},
						setValue: function (e) {
							(this.getInputElement().$.checked = e),
								this.oW("change", { value: e });
						},
						getValue: function () {
							return this.getInputElement().$.checked;
						},
						eZ: function () {
							this.setValue(!this.getValue());
						},
						dm: {
							onChange: function (e, t) {
								return s
									? (e.on(
											"load",
											function () {
												var e = this._.checkbox.getElement();
												e.on(
													"propertychange",
													function (t) {
														(t = t.data.$),
															"checked" == t.propertyName &&
																this.oW("change", { value: e.$.checked });
													},
													this
												);
											},
											this
									  ),
									  this.on("change", t),
									  null)
									: a.onChange.apply(this, arguments);
							},
						},
						eA: !0,
					},
					i,
					!0
				)),
				(m.dialog.radio.prototype = c.extend(
					new m.dialog.bf(),
					{
						setValue: function (e) {
							for (
								var t, n = this._.children, o = 0;
								o < n.length && (t = n[o]);
								o++
							)
								t.getElement().$.checked = t.getValue() == e;
							this.oW("change", { value: e });
						},
						getValue: function () {
							for (var e = this._.children, t = 0; t < e.length; t++)
								if (e[t].getElement().$.checked) return e[t].getValue();
							return null;
						},
						eZ: function () {
							var e,
								t = this._.children;
							for (e = 0; e < t.length; e++)
								if (t[e].getElement().$.checked)
									return void t[e].getElement().focus();
							t[0].getElement().focus();
						},
						dm: {
							onChange: function (e, t) {
								return s
									? (e.on(
											"load",
											function () {
												for (
													var e = this._.children, t = this, n = 0;
													n < e.length;
													n++
												) {
													var o = e[n].getElement();
													o.on("propertychange", function (e) {
														(e = e.data.$),
															"checked" == e.propertyName &&
																this.$.checked &&
																t.oW("change", {
																	value: this.getAttribute("value"),
																});
													});
												}
											},
											this
									  ),
									  this.on("change", t),
									  null)
									: a.onChange.apply(this, arguments);
							},
						},
						eA: !0,
					},
					i,
					!0
				)),
				(m.dialog.file.prototype = c.extend(
					new m.dialog.dD(),
					i,
					{
						getInputElement: function () {
							var e = o.document.getById(this._.gL).getFrameDocument();
							return e.$.forms.length > 0
								? new f(e.$.forms[0].elements[0])
								: this.getElement();
						},
						submit: function () {
							return this.getInputElement().getParent().$.submit(), this;
						},
						vy: function () {
							return this.getInputElement().getParent().$.action;
						},
						reset: function () {
							function e() {
								n.$.open(),
									l.isCustomDomain() && (n.$.domain = document.domain);
								var e = "";
								i.size && (e = i.size - (s ? 7 : 0)),
									n.$.write(
										[
											'<html><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">',
											'<form enctype="multipart/form-data" method="POST" action="',
											c.htmlEncode(i.action),
											'">',
											'<input type="file" name="',
											c.htmlEncode(i.id || "cke_upload"),
											'" size="',
											c.htmlEncode(e > 0 ? e : ""),
											'" />',
											"</form>",
											"</body></html>",
										].join("")
									),
									n.$.close();
								for (var t = 0; t < a.length; t++) a[t].enable();
							}
							var t = o.document.getById(this._.gL),
								n = t.getFrameDocument(),
								i = this._.dg,
								a = this._.buttons;
							l.gecko ? setTimeout(e, 500) : e();
						},
						getValue: function () {
							return "";
						},
						dm: a,
						eA: !0,
					},
					!0
				)),
				(m.dialog.fileButton.prototype = new m.dialog.button()),
				o.dialog.addUIElement("text", t),
				o.dialog.addUIElement("password", t),
				o.dialog.addUIElement("textarea", n),
				o.dialog.addUIElement("checkbox", n),
				o.dialog.addUIElement("radio", n),
				o.dialog.addUIElement("button", n),
				o.dialog.addUIElement("select", n),
				o.dialog.addUIElement("file", n),
				o.dialog.addUIElement("fileButton", n),
				o.dialog.addUIElement("html", n),
				c.extend(CKFinder.dialog, o.dialog);
		})(),
		(function () {
			h.add("help", {
				bM: ["toolbar", "button"],
				bz: function (e) {
					e.config.disableHelpButton ||
						(e.bD("help", {
							exec: function (e) {
								e.ld["filesview.filesview"].bn().focus(),
									window.open(
										o.basePath +
											"help/" +
											(e.lang.HelpLang || "en") +
											"/index.html"
									);
							},
						}),
						e.bY.add("Help", o.UI_BUTTON, {
							label: e.lang.Help,
							command: "help",
						}));
				},
			});
		})(),
		(function () {
			function e(e, t, n, o, a) {
				for (var r = 0, l = 0, s = [], d = 0; d < e.length; d++)
					(!o || o(e[d])) &&
						(s.push(
							'<a href="',
							t.folder.getUrl(),
							encodeURIComponent(e[d].name),
							'" title="',
							e[d].name,
							'" rel="',
							n,
							'">a</a>'
						),
						e[d].isSameFile(t) && (r = l),
						l++);
				return (
					i(),
					(m = new f("div", a)),
					m.setAttribute("id", "ckf_gallery"),
					m.setHtml(s.join("")),
					m.appendTo(a.bH()),
					m.hide(),
					r
				);
			}
			function t(e) {
				if (e && e.inPopup) {
					var t = new u(e.document),
						n = t.getWindow();
					if (
						(!s && !l.opera) ||
						n.$.top.location.href.match(/ckfinder.html/) ||
						"CKFinderpopup" == n.$.top.name
					)
						return t;
				}
				return o.oC;
			}
			function n(e) {
				return function () {
					e.$.activeElement && e.$.activeElement.blur(),
						e.$.activeElement && e.$.activeElement.blur(),
						l.gecko || (e.getWindow().focus(), e.bH().focus());
				};
			}
			function i() {
				m && m.remove();
			}
			function a(e) {
				return function () {
					i(), e && e.focus(!0, !0);
				};
			}
			function r(e) {
				if (e.click) e.click();
				else if (o.document.$.createEvent) {
					var t = o.document.$.createEvent("MouseEvents");
					t.initEvent("click", !0, !0), e.dispatchEvent(t);
				}
			}
			function d(e, t, n) {
				s && l.version < 9
					? (e.$.onreadystatechange = function () {
							("loaded" == this.readyState || "complete" == this.readyState) &&
								setTimeout(function () {
									t.callee.apply(n, t);
								}, 0);
					  })
					: e.on("load", function () {
							setTimeout(function () {
								t.callee.apply(n, t);
							}, 0);
					  });
			}
			function p(e, n) {
				if (!e || !e.inPopup) {
					e && e.ld["filesview.filesview"].on("afterRenderFiles", i);
					var o = t(n).getWindow().$;
					"undefined" != typeof o.jQuery && o.jQuery.fn.colorbox
						? (F = g)
						: "undefined" != typeof o.jQuery && o.jQuery.fn.fancybox
						? (F = v)
						: "undefined" != typeof o.jQuery && o.jQuery.fn.prettyPhoto
						? (F = b)
						: "undefined" != typeof o.Shadowbox
						? (F = y)
						: "undefined" != typeof o.Prototype &&
						  "undefined" != typeof o.Lightbox &&
						  (F = w),
						F && (_ = 1);
				}
			}
			var h,
				m,
				g = 1,
				v = 2,
				b = 3,
				y = 4,
				w = 5,
				F = 0,
				_ = 0,
				k = [];
			CKFinder.addPlugin("gallery", {
				bM: ["filesview"],
				appReady: function () {
					(F = 0), (_ = 0), (k = []), (h = null), (m = null);
				},
				galleryCallback: function (o, l, s) {
					_ || p(null, o);
					var u = t(o),
						C = u.getWindow().$,
						x = function (e) {
							return e.isImage();
						};
					if (!F && o.config.gallery_autoLoad) {
						if (!x(l)) return !1;
						var E,
							S = u.getHead(),
							N = CKFinder.getPluginPath("gallery") + "colorbox/",
							D = arguments,
							T = "undefined" == typeof C.jQuery;
						if (!T) {
							var R = C.jQuery.fn.jquery.split("."),
								$ = parseInt(R[0], 10),
								W = parseInt(R[1], 10),
								I = parseInt(R[2] || 0, 10);
							(1 > $ || (1 == $ && 4 > W) || (1 == $ && 4 == W && 3 > I)) &&
								(T = !0);
						}
						return T
							? (C.jQuery && (k = [C.jQuery, C.$]),
							  (E = new f("script", u)),
							  E.setAttribute("type", "text/javascript"),
							  E.setAttribute("src", N + "jquery.min.js"),
							  d(E, D, C),
							  E.appendTo(S),
							  !0)
							: (u.appendStyleSheet(N + "colorbox.css"),
							  (E = new f("script", u)),
							  E.setAttribute("type", "text/javascript"),
							  E.setAttribute("src", N + "jquery.colorbox-min.js"),
							  d(E, D, C),
							  E.appendTo(S),
							  !0);
					}
					if (
						(k.length &&
							((h = C.jQuery.noConflict(!0)),
							(C.jQuery = k[0]),
							(C.$ = k[1]),
							(k = [])),
						h || (h = C.jQuery),
						F)
					) {
						var L,
							O = c.getNextNumber(),
							A = "ckf_gallery_" + O;
						switch (F) {
							case g:
								if (!x(l)) return !1;
								(L = e(s, l, A, x, u)),
									h("#ckf_gallery a")
										.colorbox(
											c.extend(
												{
													minWidth: "300",
													minHeight: "200",
													maxWidth: "95%",
													maxHeight: "95%",
													scalePhotos: !0,
													current: o.lang.Gallery.current,
												},
												o.config.gallery_config,
												{ rel: A, group: A, onClosed: a(l), onOpen: n(u) },
												!0
											)
										)
										.eq(L)
										.click();
								break;
							case v:
								if (
									((x = function (e) {
										return e.isImage() || "swf" == e.ext;
									}),
									!x(l))
								)
									return !1;
								(L = e(s, l, A, x, u)),
									C.jQuery("#ckf_gallery a")
										.fancybox(
											c.extend(
												{},
												o.config.gallery_config,
												{
													onClosed: i,
													onComplete: n(u),
													afterClose: a(l),
													afterShow: n(u),
												},
												!0
											)
										)
										.eq(L)
										.click();
								break;
							case b:
								if (
									((x = function (e) {
										return e.isImage() || "swf" == e.ext || "mov" == e.ext;
									}),
									!x(l))
								)
									return !1;
								(L = e(s, l, "prettyPhoto[ckf_gallery_" + O + "]", x, u)),
									C.jQuery("#ckf_gallery a")
										.prettyPhoto(
											c.extend(
												{},
												o.config.gallery_config,
												{ callback: a(l), changepicturecallback: n(u) },
												!0
											)
										)
										.eq(L)
										.click();
								break;
							case y:
								if (
									((x = function (e) {
										return e.isImage() || "swf" == e.ext || "mov" == e.ext;
									}),
									!x(l))
								)
									return !1;
								(L = e(s, l, A, x, u)),
									C.Shadowbox.qi(
										"#ckf_gallery a",
										c.extend(
											{},
											o.config.gallery_config,
											{ gallery: A, onClose: a(l), onFinish: n(u) },
											!0
										)
									),
									r(m.eG("a").getItem(L).$);
								break;
							case w:
								if (!x(l)) return !1;
								(L = e(s, l, "lightbox[ckf_gallery_" + O + "]", x, u)),
									r(m.eG("a").getItem(L).$);
								break;
							default:
								return !1;
						}
						return !0;
					}
					return !1;
				},
				bz: p,
			});
		})(),
		(p.gallery_autoLoad = !0),
		(function () {
			function e(e) {
				if (!e || e.type != o.cv || "form" != e.getName()) return [];
				for (var t = [], n = ["style", "className"], i = 0; i < n.length; i++) {
					var a = n[i],
						r = e.$.elements.namedItem(a);
					if (r) {
						var l = new f(r);
						t.push([l, l.nextSibling]), l.remove();
					}
				}
				return t;
			}
			function t(e, t) {
				if (e && e.type == o.cv && "form" == e.getName() && t.length > 0)
					for (var n = t.length - 1; n >= 0; n--) {
						var i = t[n][0],
							a = t[n][1];
						a ? i.insertBefore(a) : i.appendTo(e);
					}
			}
			function n(n, o) {
				var i = e(n),
					a = {},
					r = n.$;
				return (
					o || ((a["class"] = r.className || ""), (r.className = "")),
					(a.inline = r.style.cssText || ""),
					o || (r.style.cssText = "position: static; overflow: visible"),
					t(i),
					a
				);
			}
			function i(n, o) {
				var i = e(n),
					a = n.$;
				"class" in o && (a.className = o["class"]),
					"inline" in o && (a.style.cssText = o.inline),
					t(i);
			}
			var a = null,
				r = null;
			h.add("maximize", {
				bz: function (e) {
					function t(t) {
						var n = v.eR();
						if ((!t && d && (t = [d]), t)) {
							for (var o = 0, i = t.length; i > o; o++)
								t[o].setStyles({
									width: n.width + "px",
									height: n.height + "px",
								});
							e.oW("resize");
						} else e.resize(n.width, n.height);
					}
					var d,
						p,
						h,
						m = e.lang.Maximize,
						g = o.oC,
						v = g.getWindow(),
						b = [0, 0, 0, 0],
						y = {};
					d = o.document.getWindow().$;
					try {
						d = d.frameElement;
					} catch (w) {
						d = null;
					}
					(d = d && new f(d)),
						d &&
							!d.getFrameDocument().bH().hasClass("CKFinderFrameWindow") &&
							(d = null),
						e.bD("maximize", {
							oD: !1,
							exec: function () {
								var g = e.document.getWindow().$;
								if (
									e.cg.inPopup &&
									((!s && !l.opera) ||
										g.top.location.href.match(/ckfinder.html/) ||
										"CKFinderpopup" == g.top.name)
								)
									(g = e.document.getWindow().$.parent),
										this.bu == o.aS
											? ((b[2] = g.screenLeft || g.screenX),
											  (b[3] = g.screenTop || g.screenY),
											  g.moveTo(0, 0),
											  r ||
													(r = [
														g.screenLeft || g.screenX,
														g.screenTop || g.screenY,
													]),
											  (b[2] -= r[0]),
											  (b[3] -= r[1]),
											  g.outerHeight
													? ((b[0] = g.outerWidth), (b[1] = g.outerHeight))
													: ((b[0] = g.document.body.scrollWidth),
													  (b[1] = g.document.body.scrollHeight),
													  a ||
															(g.resizeTo(
																g.screen.availWidth,
																g.screen.availHeight
															),
															(a = [
																g.screen.availWidth -
																	g.document.body.scrollWidth,
																g.screen.availHeight -
																	g.document.body.scrollHeight,
															])),
													  (b[0] += a[0]),
													  (b[1] += a[1])),
											  g.resizeTo
													? g.resizeTo(
															g.screen.availWidth,
															g.screen.availHeight
													  )
													: ((g.outerHeight = g.screen.availHeight),
													  (g.outerWidth = g.screen.availWidth)))
											: (g.resizeTo
													? g.resizeTo(b[0], b[1])
													: ((g.outerWidth = b[0]), (g.outerHeight = b[1])),
											  g.moveTo(b[2], b[3]));
								else {
									var w = d || e.container;
									if (this.bu == o.aS) {
										p = v.hV();
										for (var F, _ = w; (_ = _.getParent()); )
											(F = c.getNextNumber()),
												(y[F] = n(_)),
												(_.$.og = F),
												_.is("html", "body") &&
													_.setStyle("overflow", "hidden"),
												_.setStyle("z-index", e.config.baseFloatZIndex - 1);
										(F = c.getNextNumber()), (y[F] = n(w, !0)), (w.$.og = F);
										var k = [w];
										for (g = w.getDocument().getWindow().$; g.frameElement; )
											k.push(f.eB(g.frameElement)), (g = g.parent);
										(h = function () {
											t(k);
										}),
											v.on("resize", h);
										var C = new u(g.document),
											x = {
												overflow: l.webkit ? "" : "hidden",
												width: 0,
												height: 0,
											};
										C.gT().setStyles(x),
											l.gecko || C.gT().setStyle("position", "fixed"),
											C.bH().setStyles(x),
											s
												? setTimeout(function () {
														v.$.scrollTo(0, 0);
												  }, 0)
												: v.$.scrollTo(0, 0);
										for (var E, S = 0, N = k.length; N > S; S++)
											(E = k[S]),
												E.setStyle("position", "absolute"),
												E.$.offsetLeft,
												E.setStyles({
													"z-index": e.config.baseFloatZIndex - 1,
													left: "0px",
													top: "0px",
												});
										k[0].addClass("cke_maximized"), t(k);
										var D = k[0].ir();
										k[0].setStyles({
											left: -1 * D.x + "px",
											top: -1 * D.y + "px",
										});
									} else {
										for (v.removeListener("resize", h), _ = w; _; )
											i(_, y[_.$.og]), (_.$.og = null), (_ = _.getParent());
										(y = {}),
											s
												? setTimeout(function () {
														v.$.scrollTo(p.x, p.y);
												  }, 0)
												: v.$.scrollTo(p.x, p.y),
											w.removeClass("cke_maximized"),
											l.webkit &&
												(w.setStyle("display", "inline"),
												setTimeout(function () {
													w.setStyle("display", "block");
												}, 0)),
											e.oW("resize");
									}
								}
								this.rJ();
								var T = this.pW[0];
								if (T) {
									var R = this.bu == o.aS ? m.maximize : m.minimize,
										$ = e.document.getById(T._.id);
									$.getChild(1).setHtml(R),
										$.setAttribute("title", R),
										$.setAttribute("href", 'javascript:void("' + R + '");');
								}
							},
						}),
						e.bY.qW("Maximize", { label: m.maximize, command: "maximize" });
				},
			});
		})(),
		(function () {
			function e(e, t) {
				for (var n = 0, o = t.length; o > n; n++)
					if (t[n].name && t[n].name === e) return !0;
				return !1;
			}
			var t = {};
			CKFinder.addPlugin("zip", {
				uiReady: function (n) {
					var o = n.lang.Zip;
					CKFinder.dialog.add("compressToFileName", function (e) {
						var t = e.getSelectedFolder();
						return {
							title: e.lang.DestinationFile,
							minWidth: 270,
							minHeight: 60,
							contents: [
								{
									id: "tab1",
									label: "",
									title: "",
									expand: !0,
									style: CKFinder.env.ie7Compat ? "height:auto" : "",
									padding: 0,
									elements: [
										{
											id: "msg",
											className: "cke_dialog_error_msg",
											type: "html",
											html: e.lang.FileRename,
										},
										{
											type: "hbox",
											widths: ["90%", "10%"],
											padding: 0,
											children: [
												{
													type: "text",
													label: "",
													id: "fileName",
													default: t.name,
													validate: function () {
														return this.getValue()
															? void 0
															: (e.openMsgDialog("", e.lang.ErrorMsg.FileEmpty),
															  !1);
													},
												},
												{
													type: "html",
													html: ".zip",
													id: "fileNameExt",
													onLoad: function () {
														this.getElement().getParent().setStyles({
															"vertical-align": "bottom",
															"padding-bottom": "2px",
														});
													},
												},
											],
										},
									],
								},
							],
							buttons: [CKFinder.dialog.okButton, CKFinder.dialog.cancelButton],
						};
					}),
						CKFinder.dialog.add("unzipDirExists", function (e) {
							var n = e.getSelectedFolder(),
								i = [[e.lang.ManuallyRename, "manuallyrename"]];
							return (
								n.acl.fileDelete &&
									n.acl.fileRename &&
									n.acl.folderRename &&
									n.acl.folderDelete &&
									i.push(
										[o.removeAndExtract, "overwrite"],
										[o.extractAndOverwrite, "merge"]
									),
								{
									title: e.lang.ErrorMsg.FolderNameExists,
									minWidth: 270,
									minHeight: 60,
									contents: [
										{
											id: "tab1",
											label: "",
											title: "",
											expand: !0,
											style: CKFinder.env.ie7Compat ? "height:auto" : "",
											padding: 0,
											elements: [
												{
													id: "msg",
													className: "cke_dialog_error_msg",
													type: "html",
													html: "",
												},
												{
													type: "hbox",
													className: "cke_dialog_file_exist_options",
													children: [
														{
															label: e.lang.common.makeDecision,
															type: "radio",
															id: "option",
															default: "manuallyrename",
															items: i,
														},
													],
												},
											],
										},
									],
									onOk: function () {
										var n = this,
											o = n.getValueOf("tab1", "option");
										return (
											"manuallyrename" == o && (o = null),
											t.extractTo(e.getSelectedFile(), o),
											!0
										);
									},
									onCancel: function () {
										return t.ma(n), !0;
									},
									buttons: [
										CKFinder.dialog.okButton,
										CKFinder.dialog.cancelButton,
									],
								}
							);
						}),
						CKFinder.dialog.add("unzipFileExists", function (e) {
							var n = e.getSelectedFolder();
							return {
								title: e.lang.FileExistsDlgTitle,
								minWidth: 350,
								minHeight: 120,
								contents: [
									{
										id: "tab1",
										label: "",
										title: "",
										style: CKFinder.env.ie7Compat ? "height:auto" : "",
										expand: !0,
										padding: 0,
										elements: [
											{
												id: "msg",
												className: "cke_dialog_error_msg",
												type: "html",
												widths: ["70%", "30%"],
												html: "",
											},
											{
												type: "hbox",
												className: "cke_dialog_file_exist_options",
												children: [
													{
														type: "radio",
														id: "option",
														label: e.lang.common.makeDecision,
														default: "autorename",
														items: [
															[e.lang.FileAutorename, "autorename"],
															[e.lang.FileOverwrite, "overwrite"],
															[e.lang.common.skip, "skip"],
														],
													},
												],
											},
											{
												type: "hbox",
												className: "cke_dialog_remember_decision",
												children: [
													{
														type: "checkbox",
														id: "remember",
														label: e.lang.common.rememberDecision,
													},
												],
											},
										],
									},
								],
								onCancel: function () {
									return t.ma(n), !0;
								},
								buttons: [
									CKFinder.dialog.okButton,
									CKFinder.dialog.cancelButton,
								],
							};
						}),
						CKFinder.dialog.add("compressFileExists", function (e) {
							var n = e.getSelectedFolder(),
								o = [[e.lang.ManuallyRename, "manuallyrename"]];
							return (
								n.acl.fileDelete &&
									n.acl.fileRename &&
									o.push(
										[e.lang.FileAutorename, "autorename"],
										[e.lang.FileOverwrite, "overwrite"]
									),
								{
									title: e.lang.FileExistsDlgTitle,
									minWidth: 270,
									minHeight: 60,
									contents: [
										{
											id: "tab1",
											label: "",
											title: "",
											expand: !0,
											style: CKFinder.env.ie7Compat ? "height:auto" : "",
											padding: 0,
											elements: [
												{
													id: "msg",
													className: "cke_dialog_error_msg",
													type: "html",
													html: "",
												},
												{
													type: "hbox",
													className: "cke_dialog_file_exist_options",
													children: [
														{
															label: e.lang.common.makeDecision,
															type: "radio",
															id: "option",
															default: "manuallyrename",
															items: o,
														},
													],
												},
											],
										},
									],
									onOk: function () {
										var n = this,
											o = n.getValueOf("tab1", "option");
										return (
											"manuallyrename" == o && (o = null),
											t.nX(e.getSelectedFolder(), t.pp.download, o),
											!0
										);
									},
									onCancel: function () {
										return t.ma(n), !0;
									},
									buttons: [
										CKFinder.dialog.okButton,
										CKFinder.dialog.cancelButton,
									],
								}
							);
						}),
						n.connector.app.dZ("zip", 112),
						(t = {
							rQ: { iz: /[\\\/:\*\?"<>\|]/ },
							iG: {
								extractHere: {
									label: o.extractHereLabel,
									command: "ExtractHere",
									group: "zip",
									icon: CKFinder.getPluginPath("zip") + "images/zip.gif",
								},
								extractTo: {
									label: o.extractToLabel,
									command: "ExtractTo",
									group: "zip",
									icon: CKFinder.getPluginPath("zip") + "images/zip.gif",
								},
								downloadZip: {
									label: o.downloadZipLabel,
									command: "DownloadZip",
									group: "zip",
									icon: CKFinder.getPluginPath("zip") + "images/zip.gif",
								},
								compressZip: {
									label: o.compressZipLabel,
									command: "CompressZip",
									group: "zip",
									icon: CKFinder.getPluginPath("zip") + "images/zip.gif",
								},
							},
							ma: function (e) {
								e.getChildren(function () {
									e.close(), e.showFiles(), e.open();
								}, !0);
							},
							oc: function (e) {
								return e && e.length
									? t.rQ.iz.test(e)
										? n.lang.ErrorMsg.FolderInvChar
										: !1
									: n.lang.ErrorMsg.FolderEmpty;
							},
							nI: function (o) {
								if (!t.filesList[t.currentItem])
									return void t.extractHere(n.getSelectedFile(), !0);
								var i = [{ name: "skip" }, { name: "ok" }];
								if (
									t.filesList[t.currentItem].options &&
									e(t.filesList[t.currentItem].options, i)
								)
									return (
										t.currentItem++, void n.openDialog("unzipFileExists", t.nI)
									);
								o.show();
								var a =
									n.lang.ErrorMsg[
										"Folder" == t.filesList[t.currentItem].type
											? "FolderExists"
											: "FileExists"
									];
								(a =
									"<strong>" +
									a.replace("%s", t.filesList[t.currentItem].name) +
									"</strong>"),
									o.getContentElement("tab1", "msg").getElement().setHtml(a),
									o.on("ok", function (e) {
										e.removeListener();
										var i = o.getValueOf("tab1", "remember"),
											a = o.getValueOf("tab1", "option");
										if (i) {
											for (var r = 0, l = t.filesList.length; l > r; r++)
												t.filesList[r].options || (t.filesList[r].options = a);
											return void t.extractHere(n.getSelectedFile(), !0);
										}
										for (
											t.filesList[t.currentItem].options = a, t.currentItem++;
											t.currentItem < t.filesList.length &&
											t.filesList[t.currentItem].options &&
											(!t.filesList[t.currentItem].options ||
												"skip" == t.filesList[t.currentItem].options);

										)
											t.currentItem++;
										return t.currentItem < t.filesList.length
											? void setTimeout(function () {
													n.openDialog("unzipFileExists", t.nI);
											  }, 0)
											: void t.extractHere(n.getSelectedFile(), !0);
									});
							},
							extract: function (e) {
								var i = {},
									a = e.file;
								e.extra && (i = e.extra),
									(i.fileName = e.file.name),
									n.connector.sendCommandPost(
										e.action,
										null,
										i,
										function (e) {
											if (((t.filesList = []), 303 == e.getErrorNumber())) {
												t.currentItem = 0;
												for (
													var i,
														a = e.selectNodes("Connector/Errors/Error"),
														r = e.selectNodes("Connector/UnzippedFiles/File"),
														l = 0,
														s = 0,
														d = a.length;
													d > s;
													s++
												)
													(i = "skip"),
														115 == a[s].getAttribute("code") &&
															((l = 1), (i = null)),
														(t.filesList[s] = {
															name: a[s].getAttribute("name"),
															options: i,
															type: a[s].getAttribute("type"),
															code: a[s].getAttribute("code"),
														});
												var c = 0;
												for (d = r.length; d > c; c++, s++)
													t.filesList[s] = {
														name: r[c].getAttribute("name"),
														options: r[c].getAttribute("action"),
														type: "File",
														code: 0,
													};
												if (l)
													return void n.openDialog("unzipFileExists", t.nI);
											} else if (e.checkError()) return;
											var u = e.selectNodes("Connector/FolderExists/Folder");
											if (u && u.length)
												return void n.openDialog(
													"unzipDirExists",
													function (e) {
														e.show();
														var t = n.lang.FolderNameExists;
														(t =
															"<strong>" +
															t.replace("%s", u[0].getAttribute("name")) +
															"</strong>"),
															e
																.getContentElement("tab1", "msg")
																.getElement()
																.setHtml(t);
													}
												);
											if (
												((r = e.selectNodes("Connector/UnzippedFiles/File")),
												r && r.length)
											) {
												var f = [];
												s = 0;
												for (var p = r.length; p > s; s++)
													"skip" == r[s].getAttribute("action") &&
														f.push(r[s].getAttribute("name"));
												if (t.filesList)
													for (s = 0, p = t.filesList.length; p > s; s++)
														f.push(t.filesList[s].name);
												if (f.length)
													return (
														n.openSkippedFilesDialog(null, f, o.extractSuccess),
														t.ma(n.getSelectedFolder()),
														!0
													);
											}
											return (
												n.openMsgDialog("OK", o.extractSuccess),
												t.ma(n.getSelectedFolder()),
												!0
											);
										},
										a.folder.type,
										a.folder
									);
							},
							extractHere: function (e, i) {
								if (i) {
									for (var a = !1, r = 0, l = t.filesList.length; l > r; r++)
										if (
											115 == t.filesList[r].code &&
											"skip" != t.filesList[r].options
										) {
											for (
												a = !0, i = {}, r = 0, l = t.filesList.length;
												l > r;
												r++
											)
												(i["files[" + r + "][name]"] = t.filesList[r].name),
													(i["files[" + r + "][options]"] =
														t.filesList[r].options);
											break;
										}
									if (!a) {
										var s = [];
										for (r = 0, l = t.filesList.length; l > r; r++)
											s.push(t.filesList[r].name);
										return void n.openSkippedFilesDialog(
											null,
											s,
											o.extractSuccess,
											function () {
												return t.ma(n.getSelectedFolder()), !0;
											}
										);
									}
								}
								(i = i || {}),
									t.extract({ action: "ExtractHere", file: e, extra: i });
							},
							extractTo: function (o, i) {
								return i
									? void t.extract({
											action: "ExtractTo",
											file: o,
											extra: { extractDir: t.extractDir || "/", force: i },
									  })
									: void n.openInputDialog(
											n.lang.DestinationFolder,
											n.lang.FolderRename,
											"",
											function (a) {
												var r = n.getSelectedFolder();
												a = CKFinder.tools.trim(a);
												var l = t.oc(a);
												return l
													? (n.openConfirmDialog("", l, function () {
															t.extractTo(o, i);
													  }),
													  !1)
													: ((t.extractDir = a),
													  void (r.hasChildren
															? r.getChildren(function (i) {
																	return e(a, i)
																		? void n.openDialog(
																				"unzipDirExists",
																				function (e) {
																					e.show();
																					var t = n.lang.ErrorMsg.FolderExists;
																					(t =
																						"<strong>" +
																						t.replace("%s", a) +
																						"</strong>"),
																						e
																							.getContentElement("tab1", "msg")
																							.getElement()
																							.setHtml(t);
																				}
																		  )
																		: void t.extract({
																				action: "ExtractTo",
																				file: o,
																				extra: { extractDir: a },
																		  });
															  }, !0)
															: (r.createNewFolder(a),
															  t.extract({
																	action: "ExtractTo",
																	file: o,
																	extra: { extractDir: a },
															  }))));
											}
									  );
							},
							downloadZip: function (e, t, o) {
								var i = n.connector.composeUrl(
									"DownloadZip",
									{ FileName: e, ZipName: t },
									o.type,
									o
								);
								n.connector.app.ld["filesview.filesview"].tools.downloadFile(
									new CKFinder.dom.document(n.document),
									i
								);
							},
							oH: function (e, o) {
								n.connector.sendCommandPost(
									"CreateZip",
									null,
									o,
									function (n) {
										if (!n.checkError()) {
											if (o.download) {
												var i = n.selectSingleNode("Connector/ZipFile");
												if (i)
													return (
														(i = i.getAttribute("name")),
														t.downloadZip(i, o.zipName, e)
													);
											}
											t.ma(e);
										}
									},
									e.type,
									e
								);
							},
							nX: function (o, i, a, r) {
								var l = { zipName: o.name + ".zip", download: i };
								if (r)
									for (var s = 0, d = r.length; d > s; s++)
										(l["files[" + s + "][name]"] = r[s].name),
											(l["files[" + s + "][type]"] = r[s].folder.type),
											(l["files[" + s + "][folder]"] = r[s].folder.getPath());
								if (a) return (l = t.pp), (l.fileExistsAction = a), t.oH(o, l);
								if (o.isBasket || i) {
									if (o.isBasket && "undefined" == typeof r)
										for (
											l.zipName = "basket.zip", s = 0, d = n.basketFiles.length;
											d > s;
											s++
										)
											(l["files[" + s + "][name]"] = n.basketFiles[s].name),
												(l["files[" + s + "][type]"] =
													n.basketFiles[s].folder.type),
												(l["files[" + s + "][folder]"] =
													n.basketFiles[s].folder.getPath());
									return (
										o.isBasket && ((o = n.folders[1]), (l.basket = !0)),
										t.oH(o, l)
									);
								}
								n.openDialog("compressToFileName", function (a) {
									a.show(),
										a
											.getContentElement("tab1", "fileName")
											.getElement()
											.setValue(o.name),
										a.on("ok", function (r) {
											r.removeListener();
											var s = a.getValueOf("tab1", "fileName");
											s = CKFinder.tools.trim(s) + ".zip";
											var d = t.oc(s);
											return d
												? (n.openConfirmDialog("", d, function () {
														t.nX(o, i);
												  }),
												  !1)
												: ((l.zipName = s),
												  void o.getFiles(function (i) {
														return e(s, i)
															? ((t.pp = l),
															  n.openDialog(
																	"compressFileExists",
																	function (e) {
																		e.show();
																		var t = n.lang.ErrorMsg.FileExists;
																		(t =
																			"<strong>" +
																			t.replace("%s", s) +
																			"</strong>"),
																			e
																				.getContentElement("tab1", "msg")
																				.getElement()
																				.setHtml(t);
																	}
															  ),
															  !1)
															: void t.oH(o, l);
												  }, !0));
										});
								});
							},
						}),
						n.addFileContextMenuOption(
							t.iG.extractHere,
							function (e, n) {
								t.extractHere(n);
							},
							function (e) {
								var t = n.getSelectedFolder();
								if (t.isBasket) return !1;
								var o = n.getSelectedFiles();
								return "zip" !== e.ext.toLowerCase() ||
									(n.config.selectMultiple && o.length > 1)
									? !1
									: e.folder.acl.fileUpload && e.folder.acl.folderCreate
									? !0
									: -1;
							}
						),
						n.addFileContextMenuOption(
							t.iG.extractTo,
							function (e, n) {
								t.extractTo(n);
							},
							function (e) {
								var t = n.getSelectedFolder();
								if (t.isBasket) return !1;
								var o = n.getSelectedFiles();
								return "zip" !== e.ext.toLowerCase() ||
									(n.config.selectMultiple && o.length > 1)
									? !1
									: e.folder.acl.fileUpload && e.folder.acl.folderCreate
									? !0
									: -1;
							}
						),
						n.addFileContextMenuOption(
							t.iG.compressZip,
							function (e) {
								var n = e.getSelectedFiles(),
									o = e.getSelectedFolder();
								t.nX(o, !1, !1, n);
							},
							function (e) {
								var t = n.getSelectedFolder();
								if (t.isBasket) return !1;
								var o = n.getSelectedFiles();
								return !n.config.selectMultiple || o.length < 2
									? !1
									: e.folder.acl.fileUpload &&
									  e.folder.acl.folderCreate &&
									  t.getResourceType().isExtensionAllowed("zip")
									? !0
									: -1;
							}
						),
						n.addFileContextMenuOption(
							t.iG.downloadZip,
							function (e) {
								var n = e.getSelectedFiles(),
									o = e.getSelectedFolder();
								t.nX(o, !0, !1, n);
							},
							function (e) {
								var t = n.getSelectedFiles();
								return !n.config.selectMultiple || t.length < 2
									? !1
									: e.folder.acl.fileUpload
									? !0
									: -1;
							}
						),
						n.addFolderContextMenuOption(
							t.iG.compressZip,
							function (e, n) {
								t.nX(n, !1);
							},
							function (e) {
								return e.isBasket
									? !1
									: e.acl.fileUpload &&
									  e.getResourceType().isExtensionAllowed("zip") &&
									  (n.files.length || e.hasChildren)
									? !0
									: -1;
							}
						),
						n.addFolderContextMenuOption(
							t.iG.downloadZip,
							function (e, n) {
								t.nX(n, !0);
							},
							function (e) {
								return e.isBasket
									? e.app.basketFiles.length
										? !0
										: -1
									: e.acl.fileUpload && (n.files.length || e.hasChildren)
									? !0
									: -1;
							}
						),
						n.connector.app.ld["filesview.filesview"].on(
							"beforeContextMenu",
							function (e) {
								n.getSelectedFiles().length > 1 &&
									delete e.data.bj.downloadFile;
							}
						);
				},
				basketToolbar: [
					[
						"DownloadZip",
						{
							label: "downloadZipLabel",
							icon: CKFinder.getPluginPath("zip") + "images/zip.gif",
							onClick: function (e) {
								var n = e.getSelectedFolder();
								n.app.basketFiles.length && t.nX(n, !0);
							},
							disableEmpty: !0,
						},
					],
				],
			});
		})(),
		o.skins.add(
			"kama",
			(function () {
				var e = [
					"images/loaders/16x16.gif",
					"images/loaders/32x32.gif",
					"images/ckffolder.gif",
					"images/ckffolderopened.gif",
				];
				return (
					s && l.version < 7 && e.push("images/sprites_ie6.png"),
					{
						ls: e,
						application: { css: ["app.css"] },
						host: { qx: 1, css: ["host.css"] },
						mA: 7,
						kN: 7,
						ps: 1,
						bz: function (e) {
							function t(e) {
								var t = e.getHead().append("style");
								return (
									t.setAttribute("id", "cke_ui_color"),
									t.setAttribute("type", "text/css"),
									t
								);
							}
							function n(e, t, n) {
								for (var o, i, a, r = 0; r < e.length; r++)
									if (l.webkit) {
										for (i = 0; i < e[r].$.sheet.rules.length; i++)
											e[r].$.sheet.removeRule(i);
										for (i = 0; i < t.length; i++) {
											for (a = t[i][1], o = 0; o < n.length; o++)
												a = a.replace(n[o][0], n[o][1]);
											e[r].$.sheet.addRule(t[i][0], a);
										}
									} else {
										for (a = t, o = 0; o < n.length; o++)
											a = a.replace(n[o][0], n[o][1]);
										s ? (e[r].$.styleSheet.cssText = a) : e[r].setHtml(a);
									}
							}
							e.config.width &&
								!isNaN(e.config.width) &&
								(e.config.width -= 12);
							var i = [],
								a =
									"/* UI Color Support */.cke_skin_kama .cke_menuitem .cke_icon_wrapper{	background-color: $color !important;	border-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:active .cke_icon_wrapper{	background-color: $color !important;	border-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_label,.cke_skin_kama .cke_menuitem a:focus .cke_label,.cke_skin_kama .cke_menuitem a:active .cke_label{	background-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_label{	background-color: transparent !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_icon_wrapper{	background-color: $color !important;	border-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled .cke_icon_wrapper{	background-color: $color !important;	border-color: $color !important;}.cke_skin_kama .cke_menuseparator{	background-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover,.cke_skin_kama .cke_menuitem a:focus,.cke_skin_kama .cke_menuitem a:active{	background-color: $color !important;}";
							if (l.webkit) {
								a = a.split("}").slice(0, -1);
								for (var r = 0; r < a.length; r++) a[r] = a[r].split("{");
							}
							var d = /\$color/g;
							c.extend(e, {
								uiColor: null,
								rk: function () {
									return this.uiColor;
								},
								setUiColor: function (r) {
									var s,
										c,
										u = t(o.oC),
										f = t(this.document),
										p = ".cke_" + e.name.replace(".", "\\."),
										h = [
											p + " .cke_wrapper",
											p + "_dialog .cke_dialog_contents",
											p + "_dialog a.cke_dialog_tab",
											p + "_dialog .cke_dialog_footer",
										].join(","),
										m = "background-color: $color !important;";
									return (
										l.webkit
											? ((s = [[h, m]]), (c = [["body," + h, m]]))
											: ((s = h + "{" + m + "}"),
											  (c = "body," + h + "{" + m + "}")),
										(this.setUiColor = function (t) {
											var o = [[d, t]];
											(e.uiColor = t), n([u], s, o), n([f], c, o), n(i, a, o);
										})(r)
									);
								},
							}),
								e.on("menuShow", function (o) {
									var r = o.data[0],
										l = r.element.eG("iframe").getItem(0).getFrameDocument();
									if (!l.getById("cke_ui_color")) {
										var s = t(l);
										i.push(s);
										var c = e.rk();
										c && n([s], a, [[d, c]]);
									}
								}),
								e.config.uiColor &&
									e.on("uiReady", function () {
										e.setUiColor(e.config.uiColor);
									});
						},
					}
				);
			})()
		),
		(function () {
			function e() {
				o.dialog.on("resize", function (e) {
					var t = e.data,
						n = t.width,
						o = t.height,
						i = t.dialog,
						a = i.bO.contents;
					"kama" == t.skin &&
						(a.setStyles({ width: n + "px", height: o + "px" }),
						setTimeout(function () {
							var e = i.bO.dialog.getChild([0, 0, 0]),
								t = e.getChild(0),
								n = e.getChild(2);
							n.setStyle("width", t.$.offsetWidth + "px"),
								(n = e.getChild(7)),
								n.setStyle("width", t.$.offsetWidth - 28 + "px"),
								(n = e.getChild(4)),
								n.setStyle("height", t.$.offsetHeight - 31 - 14 + "px"),
								(n = e.getChild(5)),
								n.setStyle("height", t.$.offsetHeight - 31 - 14 + "px");
						}, 100));
				});
			}
			o.dialog ? e() : o.on("dialogPluginReady", e);
		})(),
		o.skins.add(
			"v1",
			(function () {
				var e = [
					"images/loaders/16x16.gif",
					"images/loaders/32x32.gif",
					"images/ckffolder.gif",
					"images/ckffolderopened.gif",
				];
				return (
					s && l.version < 7 && e.push("images/sprites_ie6.png"),
					{
						ls: e,
						application: { css: ["app.css"] },
						ps: 1,
						rv: -8,
						kN: 0,
						host: { qx: 1, css: ["host.css"] },
					}
				);
			})()
		),
		(function () {
			function e() {
				o.dialog.on("resize", function (e) {
					var t = e.data,
						n = t.width,
						o = t.height,
						i = t.dialog,
						a = i.bO.contents;
					"v1" == t.skin &&
						(a.setStyles({ width: n + "px", height: o + "px" }),
						setTimeout(function () {
							var e = i.bO.dialog.getChild([0, 0, 0]),
								t = e.getChild(0),
								n = e.getChild(2);
							n.setStyle("width", t.$.offsetWidth + "px"),
								(n = e.getChild(7)),
								n.setStyle("width", t.$.offsetWidth - 28 + "px"),
								(n = e.getChild(4)),
								n.setStyle("height", t.$.offsetHeight - 31 - 14 + "px"),
								(n = e.getChild(5)),
								n.setStyle("height", t.$.offsetHeight - 31 - 14 + "px");
						}, 100));
				});
			}
			o.dialog ? e() : o.on("dialogPluginReady", e);
		})(),
		o.gc.add(
			"default",
			(function () {
				return {
					dQ: function (e) {
						function t() {
							l.ie6Compat && (e.layout.oG = e.document.getWindow().eR());
						}
						var n = (e.name, e.element),
							i = e.ff;
						if (n && i != o.kZ) {
							e.layout = new o.application.layout(e);
							var a = e.oW("themeSpace", { space: "head", html: "" }),
								r = e.oW("themeSpace", { space: "sidebar", html: "" }),
								d = e.oW("themeSpace", { space: "mainTop", html: "" }),
								u = e.oW("themeSpace", { space: "mainMiddle", html: "" }),
								f = e.oW("themeSpace", { space: "mainBottom", html: "" }),
								p = e.config.skin.indexOf(","),
								h =
									(-1 == p ? e.config.skin : e.config.skin.substr(0, p)) ||
									"kama",
								m =
									'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html lang="' +
									e.lang.LangCode +
									'" dir="' +
									e.lang.dir +
									'"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
									a.html +
									"</head><body>" +
									(l.ie6Compat
										? '<div id="ckfinder" role="application">'
										: '<div id="ckfinder" role="application" style="visibility: hidden">') +
									'<!-- 1. CKE Skin class. --><div class="fake_wrapper cke_skin_' +
									h +
									'"><!-- 2. High contrast class. --><div class="fake_wrapper"><!-- Applicable: hc cke_hc --><!-- 3. Browser class. --><div class="fake_wrapper ' +
									l.cssClass +
									'"><!-- 4. RTL class. --><div class="fake_wrapper cke_' +
									("ltr" == e.lang.dir || (s && l.version < 8)
										? "ltr"
										: "rtl") +
									'"><!-- Applicable: rtl cke_rtl --><!-- 5. Layout class. --><div class="fake_wrapper"><div id="ckfinder_view" class="columns_2"><!-- Applicable: columns_1 columns_2 --><div id="sidebar_container" class="container" role="region"' +
									(e.config.sidebarWidth
										? ' style="width: ' +
										  c.cssLength(e.config.sidebarWidth) +
										  '"'
										: "") +
									'><div id="sidebar_wrapper" class="wrapper">' +
									r.html +
									'</div></div><div id="main_container" class="container" role="region">' +
									d.html +
									u.html +
									f.html +
									"</div></div></div></div></div></div></div></div></body></html>";
							o.log("[THEME] DOM flush using document.write"),
								e.document.$.write(m),
								e.cr("themeLoaded"),
								e.cr("uiReady", function () {
									t(),
										e.cr("appReady", function () {
											function n() {
												s = s || e.document.getHead().eG("link").getItem(0);
												var o = 0;
												if (s)
													try {
														s.$.sheet && s.$.sheet.cssRules.length > 0
															? (o = 1)
															: s.$.styleSheet &&
															  s.$.styleSheet.cssText.length > 0
															? (o = 1)
															: s.$.innerHTML &&
															  s.$.innerHTML.length > 0 &&
															  (o = 1);
													} catch (i) {}
												return o
													? void (l.ie6Compat
															? (t(),
															  e.layout.ea(),
															  setTimeout(function () {
																	e.layout.ea();
															  }, 500))
															: (e.layout.ea(!0),
															  setTimeout(function () {
																	e.document
																		.getById("ckfinder")
																		.removeStyle("visibility");
															  })))
													: void window.setTimeout(n, 250);
											}
											if ((t(), l.ie8)) {
												var o,
													i = e.document.$;
												if (
													(i.documentMode
														? (o = i.documentMode)
														: ((o = 5),
														  i.compatMode &&
																"CSS1Compat" == i.compatMode &&
																(o = 7)),
													8 > o)
												) {
													var a =
															'<strong style="color: red;">Forced IE compatibility mode! CKFinder may not look as intended.</strong>',
														r = e.plugins.tools;
													r.showTool(r.addTool(a));
												}
											}
											l.ie6Compat && e.document.getWindow().on("resize", t),
												e.document.getWindow().on("resize", function () {
													e.layout.ea.call(e.layout);
												});
											var s;
											n();
										});
								});
						}
					},
					pu: function (e) {
						var t = c.getNextNumber(),
							n = f.kE(
								[
									'<div class="cke_compatibility cke_' +
										e.name.replace(".", "\\.") +
										"_dialog cke_skin_",
									e.gd,
									'" dir="',
									e.lang.dir,
									'" lang="',
									e.langCode,
									'"><table class="cke_dialog',
									" " + l.cssClass.replace(/browser/g, "cke_browser"),
									" cke_",
									e.lang.dir,
									'" style="position:absolute"><tr><td><div class="%body"><div id="%title#" class="%title"></div><div id="%close_button#" class="%close_button"><span>X</span></div><div id="%tabs#" class="%tabs"></div><table class="%contents"><tr><td id="%contents#" class="%contents"></td></tr></table><div id="%footer#" class="%footer"></div></div><div id="%tl#" class="%tl"></div><div id="%tc#" class="%tc"></div><div id="%tr#" class="%tr"></div><div id="%ml#" class="%ml"></div><div id="%mr#" class="%mr"></div><div id="%bl#" class="%bl"></div><div id="%bc#" class="%bc"></div><div id="%br#" class="%br"></div></td></tr></table>',
									s ? "" : "<style>.cke_dialog{visibility:hidden;}</style>",
									"</div>",
								]
									.join("")
									.replace(/#/g, "_" + t)
									.replace(/%/g, "cke_dialog_"),
								o.document
							),
							i = n.getChild([0, 0, 0, 0, 0]),
							a = i.getChild(0),
							r = i.getChild(1);
						return (
							a.unselectable(),
							r.unselectable(),
							{
								element: n,
								bO: {
									dialog: n.getChild(0),
									title: a,
									close: r,
									tabs: i.getChild(2),
									contents: i.getChild([3, 0, 0, 0]),
									footer: i.getChild(4),
								},
							}
						);
					},
					destroy: function (e) {
						var t = e.container,
							n = e.ia;
						t && t.remove();
						for (var i = 0; n && i < n.length; i++) n[i].remove();
						e.element && (e.ff == o.fc && e.element.remove(), delete e.element);
					},
				};
			})()
		),
		(o.application.prototype.vU = function (e) {
			var t = "" + e,
				n = this._[t] || (this._[t] = o.document.getById(t + "_" + this.name));
			return n;
		}),
		(o.application.prototype.nJ = function (e) {
			var t = /^\d+$/;
			t.test(e) && (e += "px");
			var n = this.layout.dV();
			n.setStyle("width", e), this.oW("resize"), this.layout.ea();
		}),
		(o.application.prototype.resize = function (e, t) {
			this.element.getChild(0).setStyle("height", t + "px"),
				this.element.getChild(0).setStyle("width", e + "px");
		}),
		(function () {
			function e(e, t) {
				for (
					var n = 0, o = 0, i = 0;
					i < e.$.parentNode.childNodes.length;
					i++
				) {
					var a = e.$.parentNode.childNodes[i];
					if (1 == a.nodeType) {
						var r = a == e.$;
						if (!a.offsetHeight && !r) continue;
						o++, r || (n += a.offsetHeight);
					}
				}
				var d = e.$.offsetHeight - e.$.clientHeight,
					c = (o - 1) * t;
				!l.ie6Compat || l.ie8 || l.ie7Compat || (c += 2 * t);
				var u = s
						? e.$.parentNode.parentNode.parentNode.offsetHeight
						: e.$.parentNode.offsetHeight,
					f = u - d - n - (c || 0);
				try {
					e.setStyle("height", f + "px");
				} catch (p) {}
			}
			function t(e) {
				return o.bs.substr((9 * e) % 32, 1);
			}
			var n =
					"<div class='view tool_panel' style='padding:2px;display:block !important;position:static !important;color:black !important;background-color:white !important;'>",
				i = "</div>",
				a = n + "CKFinder Developer License<br/>Licensed to: ^^ " + i,
				r = n + "CKFinder Developer License<br/>Licensed to: ";
			(o.application.layout = function (e) {
				(this.app = a.length ? e : null), (this.jB = null);
			}),
				(o.application.layout.prototype = {
					ea: function (n) {
						this.jB ||
							(this.jB = c.setTimeout(
								function () {
									o.log("[THEME] Repainting layout");
									var i = o.bs.indexOf(o.bF.substr(1, 1)) % 5,
										d = [o.bF.substr(8, 1), o.bF.substr(6, 1)],
										u =
											o.bF &&
											o.bF.substr(3, 1) !=
												o.bs.substr(
													(9 *
														(o.bs.indexOf(o.bF.substr(0, 1)) +
															o.bs.indexOf(o.bF.substr(2, 1)))) %
														(o.bs.length - 1),
													1
												),
										f = !!o.ed && d[1] != t(o.ed.length + o.bs.indexOf(d[0]));
									if (
										(o.bF &&
											1 == i &&
											o.lS(window.top[o.nd + "cation"][o.jG + "st"]) !=
												o.lS(o.ed)) ||
										4 == i ||
										u
									) {
										for (
											var p = this.dV().getChild(0).getChildren(), h = 0, m = 0;
											m < p.count();
											m++
										)
											"static" == p.getItem(m).rd("position") && (h = 1);
										h ||
											this.dV()
												.getChild(0)
												.appendHtml(
													u || f || 4 != i
														? a
														: r + "<b>" + c.htmlEncode(o.ed) + "</b></div>"
												);
									}
									var g = this.pn(),
										v = this.pS(),
										b = o.skins.loaded[this.app.gd];
									if (b.ps && s && l.ie6Compat && !l.ie8) {
										var y = this.mB(),
											w = this.dV(),
											F = 3 * b.kN,
											_ = b.rv ? b.rv : 0,
											k = this.oG.width - w.$.offsetWidth - F + _;
										y.setStyle("width", k + "px");
									}
									g && e(g, b.mA),
										v && e(v, b.kN),
										(this.jB = null),
										(n = !1),
										this.app.oW("afterRepaintLayout"),
										l.ie6Compat &&
											c.setTimeout(
												function () {
													this.app.element.$.style.cssText += "";
												},
												0,
												this
											);
								},
								n === !0 ? 0 : 500,
								this
							));
					},
					dV: function () {
						var e = this;
						return (
							e.kS || (e.kS = e.app.document.getById("sidebar_container")), e.kS
						);
					},
					mB: function () {
						var e = this;
						return (
							e.lb || (e.lb = e.app.document.getById("main_container")), e.lb
						);
					},
					pS: function () {
						var e = this;
						return (
							"undefined" == typeof e.kK &&
								(e.kK = e.app.document.getById("folders_view")),
							e.kK
						);
					},
					pn: function () {
						var e = this;
						return (
							"undefined" == typeof e.kD &&
								(e.kD = e.app.document.getById("files_view")),
							e.kD
						);
					},
				});
		})();
})();
