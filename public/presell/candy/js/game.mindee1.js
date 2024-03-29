! function () {
    var G = {};
    window.G = G, window.gameG = G, G.BuildEnvironment = {
        production: !1,
        APP_ID: "candy-crush",
        GAGK: "5ea9840366027cf0654b6ca2a8a91507",
        GASK: "d8aecfb6d7fae18491893b5057e826699bb77646"
    }, void 0 === G && (G = {});
    var po = document.createElement("script");
    po.type = "text/javascript", po.src = "js/api.js";
    var s = document.getElementsByTagName("script")[0];

    function AnbycookGP() {
        var t = document.createElement("div");
        t.id = "anbycook", t.style.cssText = "height: 100%;width: 100%;background: #1F2E65;position: absolute;z-index: 9999998;top: 0", document.body.appendChild(t), window.addEventListener("message", function (t) {
            "okvid" === t.data.toString().split("|")[0] && setTimeout(function () {
                document.getElementById("anbycook").remove(), G.sfx.music.volume = 1
            }, 1)
        });
        var e = document.getElementById("anbycook"),
            i = document.createElement("iframe");
        i.frameBorder = 0, i.scrolling = "no", i.width = "100%", i.height = "90%", i.id = "randomid", i.setAttribute("src", ""), i.setAttribute("style", "position: absolute;z-index: 9999999;margin: auto;top: 0;bottom: 0;left: 0;right: 0;padding: 0px;max-height: 100%;max-width: 100%");
        var s = new Image;
        s.src = "loading.gif", s.width = 120, s.setAttribute("alt", "Chargement..."), s.setAttribute("style", "position: absolute;z-index: 9999999;margin: auto;bottom: 0;left: 0;right: 0;padding: 0px;max-height: 100%;max-width: 100%"), e.appendChild(i), e.appendChild(s)
    }
    s.parentNode.insertBefore(po, s), G.ExtLoader = function () {
        Phaser.Loader.call(this, game), game.state.onStateChange.add(this.reset, this), this.imagesToRemoveOnStateChange = [], this.loadedUrls = {}
    }, G.ExtLoader.prototype = Object.create(Phaser.Loader.prototype), G.ExtLoader.prototype.reset = function (t, e) {
        this.imagesToRemoveOnStateChange.forEach(function (t) {
            this.cache.removeImage(t)
        }, this), this.imagesToRemoveOnStateChange = [], Phaser.Loader.prototype.reset.call(this, t, e)
    }, G.ExtLoader.prototype.addToFileList = function (t, e, i, s, a, o) {
        if (void 0 === a && (a = !1), void 0 === e || "" === e) return console.warn("Phaser.Loader: Invalid or no key given of type " + t), this;
        if (null == i) {
            if (!o) return console.warn("Phaser.Loader: No URL given for file type: " + t + " key: " + e), this;
            i = e + o
        }
        var n = {
            type: t,
            key: e,
            path: this.path,
            url: i,
            syncPoint: 0 < this._withSyncPointDepth,
            data: null,
            loading: !1,
            loaded: !1,
            error: !1
        };
        if (s)
            for (var r in s) n[r] = s[r];
        var h = this.getAssetIndex(t, e);
        if (a && -1 < h) {
            var l = this._fileList[h];
            l.loading || l.loaded ? (this._fileList.push(n), this._totalFileCount++) : this._fileList[h] = n
        } else -1 === h && (this._fileList.push(n), this._totalFileCount++);
        return this.loadFile(this._fileList.shift()), this
    }, G.ExtLoader.prototype.asyncComplete = function (t, e) {
        void 0 === e && (e = ""), t.loaded = !0, t.error = !!e, e && (t.errorMessage = e, console.warn("Phaser.Loader - " + t.type + "[" + t.key + "]: " + e))
    }, G.ExtLoader.prototype.fileComplete = function (e, t) {
        switch (e.type) {
            case "packfile":
                var i = JSON.parse(t.responseText);
                e.data = i || {};
                break;
            case "image":
                this.cache.addImage(e.key, e.url, e.data);
                break;
            case "spritesheet":
                this.cache.addSpriteSheet(e.key, e.url, e.data, e.frameWidth, e.frameHeight, e.frameMax, e.margin, e.spacing);
                break;
            case "textureatlas":
                if (null == e.atlasURL) this.cache.addTextureAtlas(e.key, e.url, e.data, e.atlasData, e.format);
                else if (!1, e.format == Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY || e.format == Phaser.Loader.TEXTURE_ATLAS_JSON_HASH || e.format == Phaser.Loader.TEXTURE_ATLAS_JSON_PYXEL) this.xhrLoad(e, this.transformUrl(e.atlasURL, e), "text", this.jsonLoadComplete);
                else {
                    if (e.format != Phaser.Loader.TEXTURE_ATLAS_XML_STARLING) throw new Error("Phaser.Loader. Invalid Texture Atlas format: " + e.format);
                    this.xhrLoad(e, this.transformUrl(e.atlasURL, e), "text", this.xmlLoadComplete)
                }
                break;
            case "bitmapfont":
                e.atlasURL ? (!1, this.xhrLoad(e, this.transformUrl(e.atlasURL, e), "text", function (t, e) {
                    var i;
                    try {
                        i = JSON.parse(e.responseText)
                    } catch (t) { }
                    i ? (t.atlasType = "json", this.jsonLoadComplete(t, e)) : (t.atlasType = "xml", this.xmlLoadComplete(t, e))
                })) : this.cache.addBitmapFont(e.key, e.url, e.data, e.atlasData, e.atlasType, e.xSpacing, e.ySpacing);
                break;
            case "video":
                if (e.asBlob) try {
                    e.data = t.response
                } catch (t) {
                    throw new Error("Phaser.Loader. Unable to parse video file as Blob: " + e.key)
                }
                this.cache.addVideo(e.key, e.url, e.data, e.asBlob);
                break;
            case "audio":
                this.game.sound.usingWebAudio ? (e.data = t.response, this.cache.addSound(e.key, e.url, e.data, !0, !1), e.autoDecode && this.game.sound.decode(e.key)) : this.cache.addSound(e.key, e.url, e.data, !1, !0);
                break;
            case "text":
                e.data = t.responseText, this.cache.addText(e.key, e.url, e.data);
                break;
            case "shader":
                e.data = t.responseText, this.cache.addShader(e.key, e.url, e.data);
                break;
            case "physics":
                i = JSON.parse(t.responseText);
                this.cache.addPhysicsData(e.key, e.url, i, e.format);
                break;
            case "script":
                e.data = document.createElement("script"), e.data.language = "javascript", e.data.type = "text/javascript", e.data.defer = !1, e.data.text = t.responseText, document.head.appendChild(e.data), e.callback && (e.data = e.callback.call(e.callbackContext, e.key, t.responseText));
                break;
            case "binary":
                e.callback ? e.data = e.callback.call(e.callbackContext, e.key, t.response) : e.data = t.response, this.cache.addBinary(e.key, e.data)
        }
        this.onFileComplete.dispatch(0, e.key, !e.error)
    };
    var saveAs = saveAs || function (r) {
        "use strict";
        if (!(void 0 === r || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
            var t = r.document,
                h = function () {
                    return r.URL || r.webkitURL || r
                },
                l = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                d = "download" in l,
                c = /constructor/i.test(r.HTMLElement) || r.safari,
                p = /CriOS\/[\d]+/.test(navigator.userAgent),
                u = function (t) {
                    (r.setImmediate || r.setTimeout)(function () {
                        throw t
                    }, 0)
                },
                g = function (t) {
                    setTimeout(function () {
                        "string" == typeof t ? h().revokeObjectURL(t) : t.remove()
                    }, 4e4)
                },
                f = function (t) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], {
                        type: t.type
                    }) : t
                },
                s = function (t, e, i) {
                    i || (t = f(t));

                    function s() {
                        ! function (t, e, i) {
                            for (var s = (e = [].concat(e)).length; s--;) {
                                var a = t["on" + e[s]];
                                if ("function" == typeof a) try {
                                    a.call(t, i || t)
                                } catch (t) {
                                    u(t)
                                }
                            }
                        }(o, "writestart progress write writeend".split(" "))
                    }
                    var a, o = this,
                        n = "application/octet-stream" === t.type;
                    if (o.readyState = o.INIT, d) return a = h().createObjectURL(t), void setTimeout(function () {
                        l.href = a, l.download = e,
                            function (t) {
                                var e = new MouseEvent("click");
                                t.dispatchEvent(e)
                            }(l), s(), g(a), o.readyState = o.DONE
                    });
                    ! function () {
                        if ((p || n && c) && r.FileReader) {
                            var e = new FileReader;
                            return e.onloadend = function () {
                                var t = p ? e.result : e.result.replace(/^data:[^;]*;/, "data:attachment/file;");
                                r.open(t, "_blank") || (r.location.href = t), t = void 0, o.readyState = o.DONE, s()
                            }, e.readAsDataURL(t), o.readyState = o.INIT
                        } (a = a || h().createObjectURL(t), n) ? r.location.href = a : r.open(a, "_blank") || (r.location.href = a);
                        o.readyState = o.DONE, s(), g(a)
                    }()
                },
                e = s.prototype;
            return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (t, e, i) {
                return e = e || t.name || "download", i || (t = f(t)), navigator.msSaveOrOpenBlob(t, e)
            } : (e.abort = function () { }, e.readyState = e.INIT = 0, e.WRITING = 1, e.DONE = 2, e.error = e.onwritestart = e.onprogress = e.onwrite = e.onabort = e.onerror = e.onwriteend = null, function (t, e, i) {
                return new s(t, e || t.name || "download", i)
            })
        }
    }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
    "undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null !== define.amd && define("FileSaver.js", function () {
        return saveAs
    }), void 0 === G && (G = {}), G.Button = function (t, e, i, s, a) {
        Phaser.Button.call(this, game, G.l(t), G.l(e), null), this.state = game.state.getCurrentState(), G.changeTexture(this, i), this.anchor.setTo(.5), this.sfx = G.sfx.pop, this.active = !0, this.onClick = new Phaser.Signal, s && this.onClick.add(s, a || this), this.onInputDown.add(this.click, this), this.terms = [], this.IMMEDIATE = !1, this.scaleOnClick = !0, this.targetAlphaTermsNotFulfilled = .5, this.targetAlpha = 1, this.refractorPeriod = 400, this.scaleChange = .1, this.pulsing = !1
    }, G.Button.prototype = Object.create(Phaser.Button.prototype), G.Button.constructor = G.Button, G.Button.prototype.update = function () {
        this.checkTerms() ? this.targetAlpha = 1 : this.targetAlpha = this.targetAlphaTermsNotFulfilled, this.alpha = G.lerp(this.alpha, this.targetAlpha, .2, .05), this.updateChildren()
    }, G.Button.prototype.pulse = function (t) {
        this.pulsing = !0, this.pulsingTween = game.add.tween(this.scale).to({
            x: t || 1.1,
            y: t || 1.1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.Button.prototype.stopPulse = function (t) {
        this.pulsingTween && this.pulsingTween.stop(), this.scale.setTo(t || 1), this.pulsing = !1
    }, G.Button.prototype.click = function () {
        if (this.active && this.checkTerms()) {
            this.active = !1, this.onClick.dispatch(), this.sfx && this.sfx.play();
            var t = this.scale.x,
                e = this.scale.y;
            this.IMMEDIATE ? this.active = !0 : this.pulsing || !this.scaleOnClick ? game.time.events.add(this.refractorPeriod, function () {
                this.active = !0
            }, this) : game.add.tween(this.scale).to({
                x: t + this.scaleChange,
                y: e + this.scaleChange
            }, Math.floor(.5 * this.refractorPeriod), Phaser.Easing.Quadratic.Out, !0).onComplete.add(function () {
                game.add.tween(this.scale).to({
                    x: t,
                    y: e
                }, Math.floor(.5 * this.refractorPeriod), Phaser.Easing.Quadratic.Out, !0).onComplete.add(function () {
                    this.active = !0
                }, this)
            }, this)
        }
    }, G.Button.prototype.checkTerms = function () {
        for (var t = 0; t < this.terms.length; t++)
            if (!this.terms[t][0].call(this.terms[t][1])) return !1;
        return !0
    }, G.Button.prototype.addTerm = function (t, e) {
        this.terms.push([t, e])
    }, G.Button.prototype.addImageLabel = function (t) {
        this.label = game.make.image(0, 0, "ssheet", t), this.label.anchor.setTo(.5), this.addChild(this.label)
    }, G.Button.prototype.addTextLabel = function (t, e, i) {
        var s = 1 / G.Loader.currentConfigMulti;
        this.label = new G.OneLineText(-7, -6, t, e, i || Math.floor(this.height * s * .7), this.width * s * .9, .5, .5), this.addChild(this.label)
    }, G.Button.prototype.addTextLabelMultiline = function (t, e) {
        var i = 1 / G.Loader.currentConfigMulti;
        this.label = new G.MultiLineText(0, 0, t, e, Math.floor(this.height * i * .5), this.width * i * .8, this.height * i * .7, "center", .5, .5), this.addChild(this.label)
    }, G.Button.prototype.addGTextLabel = function (t, e) {
        this.label = new G.Text(0, 0, t, e, .5, .9 * this.width, .9 * this.height, !0, "center"), this.addChild(this.label)
    }, G.Button.prototype.stopTweens = function () {
        G.stopTweens(this)
    }, G.Button.prototype.changeTexture = function (t) {
        G.changeTexture(this, t)
    }, G.Button.prototype.add = function (t) {
        return this.addChild(t)
    }, G.Button.prototype.updateChildren = function () {
        for (var t = this.children.length; t--;) this.children[t].update()
    }, void 0 === G && (G = {}), G.FrameAnimation = function (t, e, i, s, a) {
        Phaser.Image.call(this, game, G.l(t), G.l(e)), this.anchor.setTo(.5), this.frameNamePrefix = i, this.animFramesLen = this.getAnimationLength(this.frameNamePrefix), this.timerEvery = s ? 60 / s : 1, this.animDir = 1, G.changeTexture(this, this.frameNamePrefix + "_0"), this.currentTimer = 0, this.currentIndex = 0, this.onFinish = new Phaser.Signal, this.active = a || !1
    }, G.FrameAnimation.prototype = Object.create(Phaser.Image.prototype), G.FrameAnimation.prototype.play = function (t, e, i) {
        return this.currentTimer = 0, this.currentIndex = i || 0, this.active = !0, this.loop = t - 1 || 0, this.animDir = 1, this.bounce = e || !1, G.changeTexture(this, this.frameNamePrefix + "_" + this.currentIndex), this
    }, G.FrameAnimation.prototype.update = function () {
        if (this.active && (this.currentTimer += G.deltaTime, this.currentTimer >= this.timerEvery)) {
            if (this.currentTimer = this.currentTimer - this.timerEvery, this.currentIndex += this.animDir, this.bounce) {
                if (this.currentIndex == this.animFramesLen || 0 == this.currentIndex) {
                    if (0 == this.loop && 0 == this.currentIndex) return this.onFinish.dispatch(), this.active = !1;
                    0 < this.loop && 0 == this.currentIndex && this.loop--, this.currentIndex == this.animFramesLen && (this.currentIndex = this.animFramesLen - 1), this.animDir *= -1
                }
            } else if (this.currentIndex == this.animFramesLen) {
                if (0 == this.loop) return this.onFinish.dispatch(), this.active = !1;
                0 < this.loop && this.loop--, this.currentIndex = 0
            }
            G.changeTexture(this, this.frameNamePrefix + "_" + this.currentIndex)
        }
    }, G.FrameAnimation.prototype.getAnimationLength = function (t) {
        if (G.FrameAnimation.CacheAnimLength[t]) return G.FrameAnimation.CacheAnimLength[t];
        for (var e = 0, i = 0; i < 1e3 && G.isImageInCache(t + "_" + i); i++) e++;
        return G.FrameAnimation.CacheAnimLength[t] = e
    }, G.FrameAnimation.CacheAnimLength = {}, G.gift = {}, G.gift.getGift = function (t) {
        t = t || "normals";
        var e = G.json.settings.gifts[t],
            i = e.boosterMaxNr || G.json.settings.gifts.boosterMaxNr,
            s = e.boosterChance || G.json.settings.gifts.boosterChance,
            a = [];
        e.list.forEach(function (t) {
            "coin" == t[0] ? a.push(t) : -1 !== t[0].indexOf("booster") && G.saveState.isBoosterUnlocked(parseInt(t[0][8])) && G.saveState.getBoosterAmount(parseInt(t[0][8])) < i && a.push(t)
        }), Phaser.ArrayUtils.shuffle(a);
        for (var o = Math.random() < s, n = 0; n < a.length; n++) {
            var r = a[n];
            if (-1 === r[0].indexOf("booster")) return r.slice();
            if (o) return r.slice()
        }
        return ["coin", 50]
    }, G.gift.getLabelString = function (t) {
        return t[1] + " @" + G.json.settings.gifts.icons[t[0]] + "@"
    }, G.gift.applyGift = function (t) {
        "coin" == t[0] ? G.saveState.changeCoins(t[1]) : G.saveState.changeBoosterAmount(parseInt(t[0][8]), t[1])
    }, G.gift.getIcon = function (t) {
        return G.json.settings.gifts.icons[t[0]]
    }, void 0 === G && (G = {}), G.GridArray = function (t, e, i, s) {
        "number" == typeof t ? this.createGrid.apply(this, arguments) : "string" == typeof t ? (this.data = JSON.parse(t), this.width = this.data.length, this.height = this.data[0].length) : Array.isArray(t) && (a = t, this.data = t, this.width = this.data.length, this.height = this.data[0].length)
    }, G.GridArray.prototype = {
        createGrid: function (t, e, i) {
            this.data = [], this.width = t, this.height = e;
            for (var s = 0; s < t; s++) {
                this.data[s] = [];
                for (var a = 0; a < e; a++) this.data[s][a] = i
            }
        },
        set: function (t, e, i) {
            return this.isInGrid(t, e) ? this.data[t][e] = i : (this.dbg && console.log("setValue OUT OF RANGE"), !1)
        },
        get: function (t, e) {
            return this.isInGrid(t, e) ? this.data[t][e] : (this.dbg && console.log("getValue OUT OF RANGE"), !1)
        },
        swapValues: function (t, e, i, s) {
            if (!this.isInGrid(t, e) || !this.isInGrid(i, s)) return this.dbg && console.log("swapValues OUT OF RANGE"), !1;
            var a = this.data[t][e];
            this.data[t][e] = this.data[i][s], this.data[i][s] = a
        },
        isInGrid: function (t, e) {
            return !(t < 0 || t >= this.width || e < 0 || e >= this.height)
        },
        find: function (t, e) {
            for (var i = 0; i < this.width; i++)
                for (var s = 0; s < this.height; s++) {
                    if (t.call(e, this.data[i][s], i, s, this.data)) return this.data[i][s]
                }
            return !1
        },
        filter: function (t, e) {
            for (var i = [], s = 0; s < this.width; s++)
                for (var a = 0; a < this.height; a++) {
                    t.call(e, this.data[s][a], s, a, this.data) && i.push(this.data[s][a])
                }
            return i
        },
        loop: function (t, e) {
            for (var i = 0; i < this.width; i++)
                for (var s = 0; s < this.height; s++) t.call(e, this.data[i][s], i, s, this.data)
        },
        clear: function (a) {
            this.loop(function (t, e, i, s) {
                s[e][i] = a || !1
            })
        },
        findPattern: function (n, r) {
            var h = !1,
                l = n.length;
            return this.loop(function (t, e, i, s) {
                if (t == r && !h) {
                    for (var a = 0; a < l; a += 2) {
                        if (!this.get(e + n[a], i + n[a + 1])) return;
                        if (this.get(e + n[a], i + n[a + 1]) !== r) return
                    }
                    h = [];
                    for (var o = 0; o < l; o += 2) h.push(e + n[o], i + n[o + 1])
                }
            }, this), h
        },
        count: function () {
            for (var t = 0, e = 0; e < this.width; e++)
                for (var i = 0; i < this.height; i++) this.data[e][i] && t++;
            return t
        },
        getAllElements: function () {
            for (var t = [], e = 0; e < this.width; e++)
                for (var i = 0; i < this.height; i++) this.data[e][i] && t.push(this.data[e][i]);
            return t
        }
    }, G.Image = function (t, e, i, s, a) {
        Phaser.Image.call(this, game, G.l(t), G.l(e), null), this.state = game.state.getCurrentState(), this.changeTexture(i), s && ("number" == typeof s ? this.anchor.setTo(s) : this.anchor.setTo(s[0], s[1])), a ? (a.add || a.addChild).call(a, this) : null !== a && game.world.add(this)
    }, G.Image.prototype = Object.create(Phaser.Image.prototype), G.Image.prototype.stopTweens = function () {
        G.stopTweens(this)
    }, G.Image.prototype.changeTexture = function (t) {
        G.changeTexture(this, t)
    }, Phaser.Image.prototype.changeTexture = function (t) {
        G.changeTexture(this, t)
    }, G.Image.prototype.add = function (t) {
        return this.addChild(t)
    }, G.LabelGroupT = function (t, e, i, s, a, o, n) {
        Phaser.Group.call(this, game), this.str = t, this.tagArray = G.LabelParser.changeIntoTagArray(t), this.x = e, this.y = i, this.textStyle = s, this.fontSize = parseInt(s.fontSize), this.distanceBetween = n || 0, "number" == typeof a ? this.anchorX = this.anchorY = a : (this.anchorX = a[0], this.anchorY = a[1]), this.maxWidth = o || 0, this.processTagArray()
    }, G.LabelGroupT.prototype = Object.create(Phaser.Group.prototype), G.LabelGroupT.prototype.processTagArray = function () {
        for (var t = 0; t < this.tagArray.length; t++) {
            if ("img" == this.tagArray[t].type) (e = G.makeImage(0, 0, this.tagArray[t].content, 0, this)).tagScale = this.tagArray[t].scale;
            else if ("separator" == this.tagArray[t].type) {
                var e;
                (e = G.makeImage(0, 0, null, 0, this)).SEPARATOR = !0, e.SEP_LENGTH = this.tagArray[t].length
            } else this.add(new G.Text(0, 0, this.tagArray[t].content, this.textStyle))
        }
        this.refresh()
    }, G.LabelGroupT.prototype.refresh = function () {
        if (this.applySizeAndAnchor(), 0 < this.maxWidth && this.getWholeWidth() > this.maxWidth)
            for (; this.getWholeWidth() > this.maxWidth;) this.distanceBetween = Math.floor(.9 * this.distanceBetween), this.fontSize = Math.floor(.9 * this.fontSize), this.applySizeAndAnchor();
        this.spreadElements()
    }, G.LabelGroupT.prototype.applySizeAndAnchor = function () {
        this.children.forEach(function (t) {
            t.anchor.setTo(this.anchorX, this.anchorY), t.fontSize ? (t.fontSize = this.fontSize, t.updateTransform()) : (t.height = this.fontSize * (t.tagScale || 1), t.scale.x = t.scale.y), t.SEPARATOR && (t.width = this.fontSize * t.SEP_LENGTH)
        }, this)
    }, G.LabelGroupT.prototype.getWholeWidth = function () {
        var t = (this.children.length - 1) * this.distanceBetween,
            e = 0;
        return this.children.forEach(function (t) {
            e += t.width
        }), t + e
    }, G.LabelGroupT.prototype.spreadElements = function () {
        var s = this.getWholeWidth() * this.anchorX * -1;
        this.children.forEach(function (t, e, i) {
            t.left = 0 == e ? s : i[e - 1].right + this.distanceBetween
        }, this)
    }, G.LabelParser = {
        specialChars: ["$", "@", "%", "^"],
        changeIntoTagArray: function (t, e) {
            for (var i = [], s = 0; 0 < t.length && !(20 < s++);) {
                var a = this.findFirstSpecialChar(t);
                if (-1 === a) {
                    i.push(t);
                    break
                }
                0 < a[0] && (i.push(t.slice(0, a[0])), t = t.slice(a[0])), t = this.cutOffTag(t, i, a[1])
            }
            var o = [];
            for (s = 0; s < i.length; s++) o.push(this.processTag(i[s], e));
            return this.mergeTextTagsInArray(o)
        },
        mergeTextTagsInArray: function (t) {
            for (var e = [], i = null, s = 0; s < t.length; s++) "text" !== t[s].type ? (null !== i && (e.push(this.mergeTextTags(t, i, s)), i = null), e.push(t[s])) : null == i && (i = s);
            return null !== i && e.push(this.mergeTextTags(t, i, s)), e
        },
        mergeTextTags: function (t, e, i) {
            for (var s = {
                type: "text",
                content: []
            }; e < i; e++) s.content.push(t[e].content);
            return s.content = s.content.join(" "), s
        },
        processTag: function (t, e) {
            if ("@" != t[0]) return "%" == t[0] ? {
                type: "text",
                content: e[t.slice(1, -1)]
            } : "$" == t[0] ? {
                type: "text",
                content: G.txt(t.slice(1, -1))
            } : "^" == t[0] ? {
                type: "text",
                content: t.slice(1, -1)
            } : this.isStringJustSpaces(t) ? {
                type: "separator",
                content: t,
                length: t.length
            } : {
                type: "text",
                content: t
            };
            var i = 1;
            return "*" == t[1] && t.indexOf("*", 2) && (i = parseFloat(t.slice(t.indexOf("*") + 1, t.indexOf("*", 2))), t = t.slice(t.indexOf("*", 2))), {
                type: "img",
                content: t.slice(1, -1),
                scale: i
            }
        },
        isStringJustSpaces: function (t) {
            for (var e = 0; e < t.length; e++)
                if (" " !== t[e]) return !1;
            return !0
        },
        cutOffTag: function (t, e, i) {
            var s = t.indexOf(i),
                a = t.indexOf(i, s + 1);
            return e.push(t.slice(s, a + 1)), t.slice(0, s) + t.slice(a + 1)
        },
        findFirstSpecialChar: function (i) {
            var s = 1 / 0,
                a = !1;
            return this.specialChars.forEach(function (t) {
                var e = i.indexOf(t); - 1 < e && e < s && (a = t, s = Math.min(e, s))
            }), s === 1 / 0 ? -1 : [s, a]
        },
        createLabel: function (t, e, i, s, a, o, n, r, h, l) {
            this.changeIntoTagArray(t, e);
            return new G.LabelGroup(i, s, o, h, n, r, l)
        }
    }, G.LabelGroup = function (t, e, i, s, a, o, n, r) {
        Phaser.Group.call(this, game), this.fontData = game.cache.getBitmapFont(s).font, this.fontBaseSize = this.fontData.size, this.fontSpaceOffset = this.fontData.chars[32].xOffset + this.fontData.chars[32].xAdvance, this.str = t, this.tagArray = G.LabelParser.changeIntoTagArray(t), this.x = void 0 === e ? 0 : G.l(e), this.y = void 0 === i ? 0 : G.l(i), this.font = s, this.fontSize = void 0 === a ? G.l(30) : G.l(a), this.distanceBetween = 0, this.anchorX = void 0 === o ? .5 : o, this.anchorY = void 0 === n ? .5 : n, this.maxWidth = r || 0, this.processTagArray()
    }, G.LabelGroup.prototype = Object.create(Phaser.Group.prototype), G.LabelGroup.prototype.processTagArray = function () {
        for (var t = 0; t < this.tagArray.length; t++) {
            if ("img" == this.tagArray[t].type) (e = G.makeImage(0, 0, this.tagArray[t].content, 0, this)).tagScale = this.tagArray[t].scale;
            else if ("separator" == this.tagArray[t].type) {
                var e;
                (e = G.makeImage(0, 0, null, 0, this)).SEPARATOR = !0, e.SEP_LENGTH = this.tagArray[t].length
            } else this.add(game.add.bitmapText(0, 0, this.font, this.tagArray[t].content, this.fontSize))
        }
        this.refresh()
    }, G.LabelGroup.prototype.refresh = function () {
        if (this.applySizeAndAnchor(), 0 < this.maxWidth && this.getWholeWidth() > this.maxWidth)
            for (; this.getWholeWidth() > this.maxWidth;) this.distanceBetween *= .9, this.fontSize *= .9, this.applySizeAndAnchor();
        this.spreadElements()
    }, G.LabelGroup.prototype.applySizeAndAnchor = function () {
        this.children.forEach(function (t) {
            t.anchor.setTo(this.anchorX, this.anchorY), t.fontSize ? (t.fontSize = this.fontSize, t.updateText()) : (t.height = this.fontSize * (t.tagScale || 1), t.scale.x = t.scale.y), t.SEPARATOR && (t.width = this.fontSize / this.fontBaseSize * this.fontSpaceOffset * t.SEP_LENGTH)
        }, this)
    }, G.LabelGroup.prototype.getWholeWidth = function () {
        var t = (this.children.length - 1) * this.distanceBetween,
            e = 0;
        return this.children.forEach(function (t) {
            e += t.width
        }), t + e
    }, G.LabelGroup.prototype.spreadElements = function () {
        var s = this.getWholeWidth() * this.anchorX * -1;
        this.children.forEach(function (t, e, i) {
            t.left = 0 == e ? s : i[e - 1].right + this.distanceBetween
        }, this)
    }, G.LineEditor = function () {
        Phaser.Group.call(this, game), this.gfx = game.add.graphics(), this.gfx.fixedToCamera = !0, this.points = {
            x: [],
            y: []
        }, this.currentIndex = null, this.pointerStart = new Phaser.Point(0, 0), this.interpolation = "linearInterpolation", game.input.onDown.add(function (t) {
            this.currentIndex = this.findCurrentIndex(t), null !== this.currentIndex && (this.pointerStart.x = t.x, this.pointerStart.y = t.y)
        }, this), game.input.onUp.add(function (t) {
            this.currentIndex = null
        }, this), this.keys = game.input.keyboard.addKeys({
            Z: Phaser.Keyboard.Z,
            X: Phaser.Keyboard.X,
            C: Phaser.Keyboard.C,
            A: Phaser.Keyboard.A,
            S: Phaser.Keyboard.S,
            D: Phaser.Keyboard.D
        }), this.keys.Z.onDown.add(function () {
            this.interpolation = "catmullRomInterpolation"
        }, this), this.keys.X.onDown.add(function () {
            this.interpolation = "bezierInterpolation"
        }, this), this.keys.C.onDown.add(function () {
            this.interpolation = "linearInterpolation"
        }, this), this.keys.A.onDown.add(function () {
            var t = game.input.activePointer;
            this.points.x.push(t.x), this.points.y.push(t.y)
        }, this), this.keys.S.onDown.add(function () {
            this.currentIndex && (this.points.x.splice(this.currentIndex, 1), this.points.y.splice(this.currentIndex, 1))
        }, this), this.keys.D.onDown.add(function () {
            this.points.x.pop(), this.points.y.pop()
        }, this)
    }, G.LineEditor.prototype = Object.create(Phaser.Group.prototype), G.LineEditor.prototype.update = function () {
        if (this.currentIndex) {
            var t = game.input.activePointer,
                e = this.pointerStart.x - t.x,
                i = this.pointerStart.y - t.y;
            this.pointerStart.x = t.x, this.pointerStart.y = t.y, this.points.x[this.currentIndex] -= e, this.points.y[this.currentIndex] -= i
        }
        this.redraw()
    }, G.LineEditor.prototype.findCurrentIndex = function (t) {
        for (var e = null, i = 1 / 0, s = 0; s < this.points.x.length; s++) {
            var a = game.math.distance(t.x, t.y, this.points.x[s], this.points.y[s]);
            a < i && (e = s, i = a)
        }
        return e
    }, G.LineEditor.prototype.redraw = function () {
        this.gfx.clear(), this.drawLine(), this.drawPoints()
    }, G.LineEditor.prototype.drawPoints = function () {
        this.gfx.lineStyle(2, 255, 1), this.gfx.beginFill(255, .5);
        for (var t = 0; t < this.points.x.length; t++) this.gfx.drawCircle(this.points.x[t], this.points.y[t], 10)
    }, G.LineEditor.prototype.drawLine = function () {
        if (0 != this.points.x.length) {
            this.gfx.lineStyle(2, 16711680, 1), this.gfx.moveTo(this.points.x[0], this.points.y[0]);
            for (var t = 0; t < 1; t += .001) {
                var e = game.math[this.interpolation](this.points.x, t),
                    i = game.math[this.interpolation](this.points.y, t);
                this.gfx.lineTo(e, i)
            }
        }
    }, void 0 === G && (G = {}), G.Loader = {
        currentConfig: "hd",
        currentConfigMulti: 1,
        loadingScreenActive: !1,
        lang: !1,
        passConfigs: function (t) {
            this.configs = t
        },
        setConfig: function (t) {
            this.currentConfig = t, this.currentConfigMulti = this.configs[t]
        },
        killLoadingScreen: function () {
            G.imgRotate && (G.whiteOverlay.destroy(), G.imgRotate.fadeOut = !0, G.imgRotate = !1, this.loadingScreenActive = !1)
        },
        loadPOSTImage: function (t) {
            void 0 !== t && (game.cache.checkImageKey(t) || (this.makeLoadingScreen(), game.load.image(t, "assets/" + this.currentConfig + "/imagesPOST/" + t)))
        },
        loadBootAssets: function (t) {
            t && (this.lang = t.toUpperCase()), G.ASSETS.images.forEach(function (t) {
                this.checkIfLoad(t, !0) && game.load.image(this.removeExt(this.cutOffPrefixes(t)), "assets/" + this.currentConfig + "/images/" + t)
            }, this), G.ASSETS.spritesheets.forEach(function (t) {
                this.checkIfLoad(t, !0) && game.load.atlasJSONHash(this.cutOffPrefixes(t), "assets/" + this.currentConfig + "/spritesheets/" + t + ".png", "assets/" + this.currentConfig + "/spritesheets/" + t + ".json")
            }, this), game.load.onLoadComplete.addOnce(function () {
                this.createSpritesheetMap(!0)
            }, this)
        },
        loadAssets: function (t) {
            t && (this.lang = t.toUpperCase()), game.load.onLoadComplete.addOnce(this.processAssets, this), !1 == (null !== navigator.appVersion.match(/Chrome\/3[0-9]\./)) && this.loadSFX(G.ASSETS.sfx), this.loadImages(G.ASSETS.images), this.loadSpritesheets(G.ASSETS.spritesheets), this.loadJson(G.ASSETS.json), this.loadFonts(G.ASSETS.fonts)
        },
        processAssets: function () {
            this.processJson(G.ASSETS.json), this.processSFX(G.ASSETS.sfx), this.createSpritesheetMap()
        },
        createSpritesheetMap: function (t) {
            G.spritesheetMap || (G.spritesheetMap = {});
            for (var e = 0, i = G.ASSETS.spritesheets.length; e < i; e++)
                if (this.checkIfLoad(G.ASSETS.spritesheets[e], t)) {
                    var s = this.cutOffPrefixes(G.ASSETS.spritesheets[e]);
                    if (game.cache.checkImageKey(s))
                        for (var a = game.cache.getFrameData(s), o = 0; o < a._frames.length; o++) {
                            var n = a._frames[o];
                            G.spritesheetMap[n.name] && console.warn("Images name collision: " + n.name), G.spritesheetMap[n.name] = s
                        }
                }
        },
        loadSFX: function (t) {
            t.forEach(function (t) {
                game.load.audio(this.removeExt(t), "assets/sfx/" + t)
            }, this)
        },
        loadFonts: function (t) {
            for (var e in t) {
                if (!this.checkIfLoad(e)) return;
                game.load.bitmapFont(this.cutOffPrefixes(e), "assets/" + this.currentConfig + "/fonts/" + t[e].frame, "assets/" + this.currentConfig + "/fonts/" + t[e].data)
            }
        },
        loadImages: function (t) {
            t.forEach(function (t) {
                this.checkIfLoad(t) && game.load.image(this.removeExt(this.cutOffPrefixes(t)), "assets/" + this.currentConfig + "/images/" + t)
            }, this)
        },
        loadJson: function (t) {
            t.forEach(function (t) {
                game.load.json(this.removeExt(t), "assets/json/" + t)
            }, this)
        },
        loadSpritesheets: function (t) {
            t.forEach(function (t) {
                this.checkIfLoad(t) && game.load.atlasJSONHash(this.cutOffPrefixes(t), "assets/" + this.currentConfig + "/spritesheets/" + t + ".png", "assets/" + this.currentConfig + "/spritesheets/" + t + ".json")
            }, this)
        },
        checkIfLoad: function (t, e) {
            return (!e || -1 != t.indexOf("BOOT-")) && (!(!e && -1 !== t.indexOf("BOOT-")) && ((-1 === t.indexOf("MOBILE-") || !game.device.desktop) && (!(-1 !== t.indexOf("DESKTOP-") && !game.device.desktop) && (!this.lang || !t.match(/^[A-Z]{2}\-/) || 0 == t.indexOf(this.lang + "-")))))
        },
        cutOffPrefixes: function (t) {
            return t = (t = (t = (t = t.replace(/^[A-Z]{2}\-/, "")).replace("BOOT-", "")).replace("MOBILE-", "")).replace("DESKTOP-", "")
        },
        removeExt: function (t) {
            return t.slice(0, t.lastIndexOf("."))
        },
        processJson: function (t) {
            G.json = {}, t.forEach(function (t) {
                t = this.removeExt(t), G.json[t] = game.cache.getJSON(t)
            }, this)
        },
        processSFX: function (t) {
            G.sfx = {}, game.sfx = G.sfx;
            var s = {};
            t.forEach(function (t) {
                t = this.removeExt(t), G.sfx[t] = game.add.audio(t);
                var e = t.lastIndexOf("_");
                if (-1 !== e && !isNaN(t.slice(e + 1))) {
                    parseInt(t.slice(e + 1));
                    var i = t.slice(0, e);
                    s[i] || (s[i] = []), s[i].push(G.sfx[t])
                }
            }, this), Object.keys(s).forEach(function (t) {
                G.sfx[t] = {
                    sfxArray: s[t],
                    play: function (t, e, i) {
                        game.rnd.pick(this.sfxArray).play("", 0, t, e, i)
                    }
                }
            })
        }
    }, G.MultiLineText = function (t, e, i, s, a, o, n, r, h, l) {
        if (t = G.l(t), e = G.l(e), a = G.l(a), o = G.l(o), n = G.l(n), this.maxUserWidth = o, this.maxUserHeight = n, Phaser.BitmapText.call(this, game, t, e, i, "", a), this.splitText(s, o), this.align = r || "center", n)
            for (; this.height > n && (this.fontSize -= 2, this.splitText(s, o), this.updateText(), !(this.fontSize < 5)););
        this.anchor.setTo(h, l), this.cacheAsBitmap = !0
    }, G.MultiLineText.prototype = Object.create(Phaser.BitmapText.prototype), G.MultiLineText.prototype.constructor = G.MultiLineText, G.MultiLineText.prototype.splitText = function (t, e) {
        for (var i = t, s = [], a = 0, o = 0; 0 < i.length;)
            if (a = o, -1 == (o = i.indexOf(" ", o + 1)) ? this.setText(i) : this.setText(i.substring(0, o)), this.updateText(), this.width > e) {
                if (0 == a && -1 == o) {
                    s.push(i), i = "", o = 0;
                    continue
                }
                if (0 == a) {
                    s.push(i.substring(0, o)), i = i.substring(o + 1), o = 0;
                    continue
                }
                s.push(i.substring(0, a)), i = i.substring(a + 1), o = 0
            } else -1 == o && (s.push(i), i = "");
        this.setText(s.join("\n"))
    }, G.MultiLineText.prototype.popUpAnimation = function () {
        this.cacheAsBitmap = !1;
        for (var t = this.children.length, s = [], e = 0; e < t; e++) s[e] = e;
        s = Phaser.ArrayUtils.shuffle(s), delay_index = 0, this.activeTweens = 0, this.children.forEach(function (t) {
            0 == t.anchor.x && (t.x = t.x + .5 * t.width, t.y = t.y + t.height, t.anchor.setTo(.5, 1));
            var e = t.scale.x;
            t.scale.setTo(0, 0), this.activeTweens++;
            var i = game.add.tween(t.scale).to({
                x: 1.5 * e,
                y: 1.5 * e
            }, 200, Phaser.Easing.Quadratic.In, !1, 25 * s[delay_index]).to({
                x: e,
                y: e
            }, 200, Phaser.Easing.Sinusoidal.In);
            i.onComplete.add(function () {
                this.activeTweens--, 0 == this.activeTweens && this.alive && (this.cacheAsBitmap = !0)
            }, this), i.start(), delay_index++
        }, this)
    }, G.OneLineText = function (t, e, i, s, a, o, n, r) {
        if (Phaser.BitmapText.call(this, game, G.l(t), G.l(e), i, s, G.l(a), G.l(o)), o)
            for (; this.width > G.l(o) && (this.fontSize -= 2, this.updateText(), !(this.fontSize < 5)););
        this.orgFontSize = G.l(a), this.maxUserWidth = G.l(o), this.skipCaching = G.skipOneLineTextCaching || !1, this.hAnchor = n, this.vAnchor = r, this.anchor.setTo(this.hAnchor, this.vAnchor), this.updateText(), this.insertCoin(this.fontSize), this.skipCaching || (this.cacheAsBitmap = !0, this.updateCache())
    }, G.OneLineText.prototype = Object.create(Phaser.BitmapText.prototype), G.OneLineText.prototype.constructor = G.OneLineText, G.OneLineText.prototype.insertCoin = function (o) {
        -1 != this.text.indexOf("$$") && this.children.forEach(function (t, e, i) {
            if (t.name && "$" == t.name && t.visible && e + 1 <= i.length - 1 && "$" == i[e].name) {
                var s = t,
                    a = i[e + 1];
                s.visible = !1, a.visible = !1, coin = G.makeImage(s.x + .05 * o, s.y - .05 * o, "coin"), coin.width = o, coin.height = o, s.parent.addChild(coin)
            }
        })
    }, G.OneLineText.prototype.setText = function (t) {
        Phaser.BitmapText.prototype.setText.call(this, t.toString());
        var e = this.scale.x,
            i = this.scale.y,
            s = this.alpha,
            a = this.angle;
        if (this.alpha = 1, this.scale.setTo(1), this.maxUserWidth) {
            this.fontSize = this.orgFontSize, this.updateText();
            for (; this.width > this.maxUserWidth && (this.fontSize -= 1, this.updateText(), !(this.fontSize < 5)););
        } !this.skipCaching && this.cacheAsBitmap && this.updateCache(), this.scale.setTo(e, i), this.alpha = s, this.angle = a
    }, G.OneLineText.prototype.popUpAnimation = function () {
        this.cacheAsBitmap = !1;
        for (var t = this.children.length, s = [], e = 0; e < t; e++) s[e] = e;
        s = Phaser.ArrayUtils.shuffle(s), delay_index = 0, this.activeTweens = 0, this.children.forEach(function (t) {
            0 == t.anchor.x && (t.x = t.x + .5 * t.width, t.y = t.y + t.height, t.anchor.setTo(.5, 1));
            var e = t.scale.x;
            t.scale.setTo(0, 0), this.activeTweens++;
            var i = game.add.tween(t.scale).to({
                x: 1.5 * e,
                y: 1.5 * e
            }, 200, Phaser.Easing.Quadratic.In, !1, 25 * s[delay_index]).to({
                x: e,
                y: e
            }, 200, Phaser.Easing.Sinusoidal.In);
            i.onComplete.add(function () {
                this.activeTweens--, 0 == this.activeTweens && this.alive && !this.skipCaching && (this.cacheAsBitmap = !0)
            }, this), i.start(), delay_index++
        }, this)
    }, G.OneLineText.prototype.scaleOut = function (t, e) {
        this.cacheAsBitmap = !1, this.activeTweens = 0, this.children.forEach(function (t, e) {
            0 == t.anchor.x && (t.x = t.x + .5 * t.width, t.y = t.y + .5 * t.height, t.anchor.setTo(.5, .5)), this.activeTweens++, t.scale.setTo(t.scale.x, t.scale.y);
            var i = game.add.tween(t.scale).to({
                x: 0,
                y: 0
            }, 400, Phaser.Easing.Cubic.In, !1, 20 * e);
            i.onComplete.add(function () {
                this.activeTweens--, 0 == this.activeTweens && this.destroy()
            }, this), i.start()
        }, this)
    }, G.OneLineCounter = function (t, e, i, s, a, o, n, r, h, l) {
        G.OneLineText.call(this, t, e, i, "", a, o, n, r), this.amount = s, this.amountDisplayed = s, this.amountMaxInterval = 5, this.amountMaxNegInterval = -5, this.absoluteDisplay = !1, this.fixedToDecimal = 0, this.stepCurrent = 0, this.step = 0, this.preText = h || "", this.postText = l || "", this.setText(this.preText + s + this.postText)
    }, G.OneLineCounter.prototype = Object.create(G.OneLineText.prototype), G.OneLineCounter.prototype.update = function () {
        if (this.lerp) this.lerpUpdate();
        else if (this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.amountDisplayed != this.amount)) {
            var t = this.amount - this.amountDisplayed;
            this.amountDisplayed += game.math.clamp(t, this.amountMaxNegInterval, this.amountMaxInterval);
            var e = this.amountDisplayed;
            this.absoluteDisplay && (e = Math.abs(e)), 0 != this.fixedTo && (e = e.toFixed(this.fixedToDecimal)), this.setText(this.preText + e + this.postText)
        }
    }, G.OneLineCounter.prototype.changeAmount = function (t) {
        this.amount = t
    }, G.OneLineCounter.prototype.increaseAmount = function (t) {
        this.amount += t
    }, G.OneLineCounter.prototype.changeIntervals = function (t, e) {
        void 0 === e ? (this.amountMaxInterval = t, this.amountMaxNegInterval = -t) : (this.amountMaxInterval = t, this.amountMaxNegInterval = e)
    }, G.OneLineCounter.prototype.lerpUpdate = function () {
        this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.amountDisplayed = Math.round(G.lerp(this.amountDisplayed, this.amount, .5, .6)), this.setText(this.amountDisplayed.toString()))
    }, G.PartCacher = function () {
        Phaser.Group.call(this, game), this.active = !1, this.every = 1, this.rt = game.add.renderTexture(10, 10), this.frameCounter = 0, this.framesToRecord = null
    }, G.PartCacher.prototype = Object.create(Phaser.Group.prototype), G.PartCacher.prototype.update = function () {
        if (this.active) {
            if (this.stepForward(), !this.checkChildren()) return this.active = !1, void this.removeAll(!0, !0);
            this.frameCounter % this.frameRate == 0 && (this.saveFrame(), this.frameNr++, null !== this.framesToRecord && (this.framesToRecord--, 0 == this.framesToRecord && (this.active = !1))), this.frameCounter++
        }
    }, G.PartCacher.prototype.stepForward = function () {
        for (var t = this.children.length; t--;) this.children[t].update()
    }, G.PartCacher.prototype.start = function (t, e, i) {
        this.fileName = t, this.frameNr = 0, this.frameRate = 60 / e, this.active = !0, this.frameCounter = 0, this.framesToRecord = i || null
    }, G.PartCacher.prototype.saveFrame = function () {
        var t = this.getBounds(),
            e = Math.max(this.x - t.x, t.x + t.width - this.x, 400),
            i = Math.max(this.y - t.y, t.y + t.height - this.y, 400);
        this.rt.resize(2 * e, 2 * i, !0), this.rt.renderXY(this, e, i, !0);
        var s = this.rt.getCanvas(),
            a = this.fileName + "_" + this.frameNr;
        s.toBlob(function (t) {
            saveAs(t, a)
        })
    }, G.PartCacher.prototype.checkChildren = function () {
        var t = this.children.filter(function (t) {
            return !t.alive || 0 === t.alpha || 0 == t.scale.x || 0 == t.scale.y
        });
        return this.children.length !== t.length
    }, G.PoolGroup = function (t, e, i, s) {
        if (Phaser.Group.call(this, game), this._deadArray = [], this._elementConstructor = t, this._argumentsArray = e || [], this._argumentsArray.unshift(null), i && G.sb(i).add(this.init, this), s)
            for (var a = 0; a < s; a++) element = new (Function.prototype.bind.apply(this._elementConstructor, this._argumentsArray)), this.add(element), element.events.onKilled.add(this._onElementKilled, this), element.kill()
    }, G.PoolGroup.prototype = Object.create(Phaser.Group.prototype), G.PoolGroup.prototype.getFreeElement = function () {
        var t;
        return 0 < this._deadArray.length ? t = this._deadArray.pop() : (t = new (Function.prototype.bind.apply(this._elementConstructor, this._argumentsArray))).events.onKilled.add(this._onElementKilled, this), this.add(t), t
    }, G.PoolGroup.prototype._onElementKilled = function (t) {
        this === t.parent && (this._deadArray.push(t), this.removeChild(t))
    }, G.PoolGroup.prototype.init = function () {
        var t = this.getFreeElement();
        return t.init.apply(t, arguments), t
    }, G.PoolGroup.prototype.initBatch = function (t) {
        for (var e = 0; e < t; e++) this.init.apply(this, [].slice.call(arguments, 1))
    }, G.PreloaderBar = function () {
        Phaser.Group.call(this, game), this.fixedToCamera = !0, this.softgamesBtn = game.add.button(0, 200, "sg_logo", function () {
            SG_Hooks.triggerMoreGames()
        }, this), this.softgamesBtn.anchor.setTo(.5, .5), this.add(this.softgamesBtn), this.gfx = game.add.graphics(), this.add(this.gfx), this.drawProgress(0), G.sb("onScreenResize").add(this.onResize, this), this.onResize(), game.load.onFileComplete.add(this.drawProgress, this)
    }, G.PreloaderBar.prototype = Object.create(Phaser.Group.prototype), G.PreloaderBar.prototype.onResize = function () {
        this.cameraOffset.x = .5 * game.width, this.cameraOffset.y = .4 * game.height
    }, G.PreloaderBar.prototype.drawProgress = function (t) {
        this.gfx.clear(), this.gfx.lineStyle(2, 16777215, 1), this.gfx.beginFill(0, 1), this.gfx.drawRect(-150, 0, 300, 50), this.gfx.beginFill(16777215, 1), this.gfx.drawRect(-145, 5, t / 100 * 290, 40)
    }, G.ProgressBar = function (t, e, i, s, a, o, n) {
        G.Image.call(this, t, e, i + "_empty", 0, null), o = void 0 === o ? 0 : o, n = void 0 === n ? 0 : o, this.fill = G.makeImage(o, n, i + "_full", 0, this), this.fillFullWidth = this.fill.width, this.fillOverlay = G.makeImage(o, n, i + "_full_overlay", this.fill, this), this.fillOverlay.alpha = 0, this.fill.cropRect = new Phaser.Rectangle(0, 0, 0, this.fill.height), this.fill.updateCrop(), this.currentValue = s, this.prevCurrentValue = s, this.targetValue = s, this.maxValue = a, this.lerpValue = .05, this.updateBarCrop(), this.onTargetReached = new Phaser.Signal, this.onBarFilled = new Phaser.Signal
    }, G.ProgressBar.prototype = Object.create(G.Image.prototype), G.ProgressBar.prototype.update = function () {
        this.currentValue !== this.targetValue && (this.currentValue = G.lerp(this.currentValue, this.targetValue, this.lerpValue, .005 * this.maxValue), this.currentValue === this.targetValue && this.onTargetReached.dispatch()), this.currentValue !== this.prevCurrentValue && (this.updateBarCrop(), this.currentValue === this.maxValue && (game.add.tween(this.fillOverlay).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), this.onBarFilled.dispatch(), this.label && game.add.tween(this.label).to({
            alpha: 0
        }, 600, Phaser.Easing.Sinusoidal.InOut, !0)), this.label && Math.floor(this.currentValue) !== Math.floor(this.prevCurrentValue) && (console.log("updating label"), this.label.updateValue(Math.floor(this.currentValue)))), this.prevCurrentValue = this.currentValue
    }, G.ProgressBar.prototype.updateBarCrop = function () {
        var t = this.fill.cropRect.width,
            e = Math.round(this.fillFullWidth * (this.currentValue / this.maxValue));
        t !== e && (this.fill.cropRect.width = e, this.fill.updateCrop())
    }, G.ProgressBar.prototype.changeCurrentValue = function (t, e) {
        this.targetValue = game.math.clamp(t, 0, this.maxValue), this.lerpValue = e || this.lerpValue
    }, G.ProgressBar.prototype.increaseCurrentValue = function (t) {
        this.changeCurrentValue(this.targetValue + (t || 1))
    }, G.ProgressBar.prototype.decreaseCurrentValue = function (t) {
        this.changeCurrentValue(this.targetValue - (t || 1))
    }, G.ProgressBar.prototype.changeValues = function (t, e) {
        this.currentValue = t, this.prevCurrentValue = t, this.targetValue = t, this.maxValue = e, this.label && this.label.changeValues(t, e), this.updateBarCrop()
    }, G.ProgressBar.prototype.addLabel = function (t, e) {
        this.label = new G.ProgressBar.Label(G.rl(.5 * this.width), G.rl(.5 * this.height), this.currentValue, this.maxValue, Math.floor(.6 * G.rl(this.height)), G.rl(.7 * this.width), t, e), this.add(this.label)
    }, G.ProgressBar.Label = function (t, e, i, s, a, o, n, r) {
        G.OneLineText.call(this, t, e, "font", "", a, o, .5, .5), this.labelType = n || 0, this.labelType1Text = G.txt("%AMOUNT% left"), this.currentValue = i, this.maxValue = s, this.animationOnIncrease = r || !1, this.updateValue(this.currentValue, !0)
    }, G.ProgressBar.Label.prototype = Object.create(G.OneLineText.prototype), G.ProgressBar.Label.prototype.updateValue = function (t, e) {
        !e && Math.min(t, this.maxValue) === this.currentValue || (this.currentValue = t, this.updateLabelText(), !e && this.animationOnIncrease && (G.stopTweens(this), this.scale.setTo(1), game.add.tween(this.scale).to({
            x: 1.2,
            y: 1.2
        }, 200, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0)))
    }, G.ProgressBar.Label.prototype.changeValues = function (t, e) {
        this.currentValue = t, this.maxValue = e, this.alpha = this.currentValue < this.maxValue ? 1 : 0, this.updateLabelText()
    }, G.ProgressBar.Label.prototype.updateLabelText = function () {
        0 == this.labelType ? this.setText(this.currentValue + "/" + this.maxValue) : this.setText(this.labelType1Text.replace("%AMOUNT%", this.maxValue - this.currentValue))
    }, void 0 === G && (G = {}), G.SignalBox = function () {
        Phaser.Signal.prototype.addPermanent || (Phaser.Signal.prototype.addPermanent = function () {
            var t = this.add.apply(this, arguments);
            return t._PERMANENT = !0, t
        }, Phaser.Signal.prototype.removeNonPermanent = function () {
            if (this._bindings)
                for (var t = this._bindings.length; t--;) this._bindings[t]._PERMANENT || (this._bindings[t]._destroy(), this._bindings.splice(t, 1))
        });
        var e = {};

        function i() {
            Object.keys(e).forEach(function (t) {
                e[t].removeNonPermanent()
            })
        }

        function t(t) {
            return game.state.onStateChange.add(i, this), e[t] || (e[t] = new Phaser.Signal), e[t]
        }
        return t.signals = e, t.clearNonPermanent = i, t.clearAll = function () {
            Object.keys(e).forEach(function (t) {
                e[t].removeAll()
            })
        }, t
    }(), G.Slider = function (t, e, i, s) {
        Phaser.Graphics.call(this, game, t, e), this.sliderWidth = i, this.pos = s, this.beginFill(0, 1), this.drawRect(0, -2, this.sliderWidth, 4), this.circleGfx = this.addChild(game.make.graphics(i * s, 0)), this.circleGfx.clear(), this.circleGfx.lineStyle(1, 0, 1), this.circleGfx.beginFill(10066329, 1), this.circleGfx.drawCircle(0, 0, 32), this.circleGfx.sliderWidth = i, this.circleGfx.inputEnabled = !0, this.circleGfx.input.useHandCursor = !0, this.circleGfx.input.draggable = !0, this.circleGfx.input.setDragLock(!0, !1)
    }, G.Slider.prototype = Object.create(Phaser.Graphics.prototype), G.Slider.prototype.update = function () {
        this.circleGfx.x = game.math.clamp(this.circleGfx.x, 0, this.sliderWidth), this.pos = this.circleGfx.x / this.sliderWidth
    }, G.SliderPanel = function (t, e, i, s, a, o) {
        Phaser.Group.call(this, game), this.sliderWidth = G.l(i), this.sliderHeight = G.l(s), this.x = t + -.5 * this.sliderWidth, this.y = e + -.5 * this.sliderHeight, this.gfxMask = game.add.graphics(), this.gfxMask.beginFill(0, 1), this.gfxMask.drawRect(0, 0, i, s), this.clickableObjects = [], this.config = o, this.applyConfig(this.config), this.addContent(a), this.add(this.gfxMask), this.contentGroup.mask = this.gfxMask, this.slideY = 0, this.inputSprite = G.makeImage(0, 0, null, 0, this), this.inputSprite.inputEnabled = !0, this.inputSprite.hitArea = new Phaser.Rectangle(0, 0, i, s), this.inputSpriteDown = !1, this.inputData = {
            x: null,
            y: null,
            velX: 0,
            velY: 0,
            xStart: null,
            yStart: null,
            startFrameStamp: null,
            clickDistanceWindow: 10,
            clickTimeWindow: 10
        }, this.inputSprite.events.onInputDown.add(function (t) {
            var e = game.input.activePointer;
            this.inputSpriteDown = !0, this.inputData.x = this.inputData.xStart = e.worldX, this.inputData.y = this.inputData.yStart = e.worldY, this.inputData.startFrameStamp = this.frameCounter
        }, this), this.inputSprite.events.onInputUp.add(function () {
            var t = game.input.activePointer;
            this.inputSpriteDown = !1;
            var e = game.math.distance(this.inputData.xStart, this.inputData.yStart, t.worldX, t.worldY),
                i = this.frameCounter - this.inputData.startFrameStamp;
            e <= this.inputData.clickDistanceWindow && i <= this.inputData.clickTimeWindow && (this.propagateClick(t.x, t.y), this.inputData.velX = 0, this.inputData.velY = 0)
        }, this), this.frameCounter = 0
    }, G.SliderPanel.prototype = Object.create(Phaser.Group.prototype), G.SliderPanel.prototype.applyConfig = function (t) {
        this.horizontal = t.horizontal || !1, this.horizontalLerp = t.horizontalLerp || !1, this.vertical = t.vertical || !0, this.verticalLerp = t.verticalLerp
    }, G.SliderPanel.prototype.addContent = function (t) {
        this.changeInputSettings(t), this.contentGroup = t, this.add(t), this.contentGroup.x = 0, this.contentGroupMinY = -this.contentGroup.height + this.sliderHeight, this.contentGroupMaxY = 0, this.contentGroupMinX = this.sliderWidth - this.contentGroup.width, this.contentGroupMaxX = 0
    }, G.SliderPanel.prototype.changeInputSettings = function (t) {
        for (var e = t.children.length; e--;) {
            var i = t.children[e];
            i.inputEnabled && (this.clickableObjects.push(i), i.inputEnabled = !1), 0 < i.children.length && this.changeInputSettings(i)
        }
    }, G.SliderPanel.prototype.update = function () {
        if (this.frameCounter++, this.inputSpriteDown && game.input.activePointer.isDown) {
            var t = this.inputData.x - game.input.activePointer.worldX,
                e = this.inputData.y - game.input.activePointer.worldY;
            this.inputData.x = game.input.activePointer.worldX, this.inputData.y = game.input.activePointer.worldY, this.inputData.velX = .8 * t + .2 * this.inputData.velX, this.inputData.velY = .8 * e + .2 * this.inputData.velY, this.horizontal && (this.contentGroup.x -= this.inputData.velX), this.vertical && (this.contentGroup.y -= this.inputData.velY)
        } else this.horizontal && (this.contentGroup.x -= this.inputData.velX, this.inputData.velX *= .95, Math.abs(this.inputData.velX) < 1 && (this.inputData.velX = 0)), this.vertical && (this.contentGroup.y -= this.inputData.velY, this.inputData.velY *= .95, Math.abs(this.inputData.velY) < 1 && (this.inputData.velY = 0));
        this.vertical && this.boundRestrict("y", this.verticalLerp, this.contentGroupMinY, this.contentGroupMaxY), this.horizontal && this.boundRestrict("x", this.horizontalLerp, this.contentGroupMinX, this.contentGroupMaxX), this.boundRestrict()
    }, G.SliderPanel.prototype.propagateClick = function (t, e) {
        for (var i = 0; i < this.clickableObjects.length; i++)
            if (this.clickableObjects[i].visible && this.clickableObjects[i].getBounds().contains(t, e)) {
                this.clickableObjects[i].onInputDown.dispatch();
                break
            }
    }, G.SliderPanel.prototype.boundRestrict = function (t, e, i, s) {
        e ? (this.contentGroup[t] > s && (this.contentGroup[t] = G.lerp(this.contentGroup[t], s, .5), this.contentGroup[t] < s + 1 && (this.contentGroup[t] = s)), this.contentGroup[t] < i && (this.contentGroup[t] = G.lerp(this.contentGroup[t], i, .2), this.contentGroup[t] > i - 1 && (this.contentGroup[t] = i))) : this.contentGroup[t] = game.math.clamp(this.contentGroup[t], i, s)
    }, G.StrObjGroup = function (t, e, i) {
        Phaser.Group.call(this, game), this.x = t || 0, this.y = e || 0, this.importObj = "string" == typeof i ? JSON.parse(i) : i, this.parseImportObj(this.importObj)
    }, G.StrObjGroup.prototype = Object.create(Phaser.Group.prototype), G.StrObjGroup.prototype.parseImportObj = function (t) {
        for (var e = 0; e < t.length; e++) {
            var i = t[e],
                s = G.makeImage(i.x, i.y, i.frame, i.anchor, this);
            s.scale.setTo(i.scale[0], i.scale[1]), s.angle = i.angle
        }
    }, G.Text = function (t, e, i, s, a, o, n, r, h) {
        "object" != typeof s && (s = JSON.parse(JSON.stringify(G.Text.styles[s]))), this.userMaxWidth = o || 1 / 0, this.userMaxHeight = n || 1 / 0, r && (s.wordWrap = !0, s.wordWrapWidth = o, s.align = h || "left"), Phaser.Text.call(this, game, t, e, i, s), s.lineSpacing && (this.lineSpacing = s.lineSpacing), a && ("number" == typeof a ? this.anchor.setTo(a) : this.anchor.setTo(a[0], a[1])), this.width = Math.min(this.width, this.userMaxWidth), this.height = Math.min(this.height, this.userMaxHeight)
    }, G.Text.prototype = Object.create(Phaser.Text.prototype), G.Text.styles = {}, G.Text.addStyle = function (t, e) {
        G.Text.styles[t] = e
    }, G.Text.prototype.setText = function (t) {
        Phaser.Text.prototype.setText.call(this, t), this.scale.setTo(1), this.width = Math.min(this.width, this.userMaxWidth), this.height = Math.min(this.height, this.userMaxHeight)
    }, G.TextCounter = function (t, e, i, s, a, o, n) {
        this.amount = i, this.amountDisplayed = i, G.Text.call(this, t, e, null === i ? "..." : i.toString(), s, a, o), n = n || {
            lerpValue: .5
        }, this.lerp = !0, this.lerpValue = n.lerpValue, this.stepCurrent = 0, this.step = 0
    }, G.TextCounter.prototype = Object.create(G.Text.prototype), G.TextCounter.prototype.setAmount = function (t, e) {
        this.amount = t, e && (this.amountDisplayed = t, this.setText(this.amountDisplayed.toString()))
    }, G.TextCounter.prototype.changeAmount = function (t, e) {
        this.amount += t, e && (this.amountDisplayed = this.amount, this.setText(this.amountDisplayed.toString()))
    }, G.TextCounter.prototype.update = function () {
        this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.lerp && this.lerpUpdate())
    }, G.TextCounter.prototype.lerpUpdate = function () {
        this.amountDisplayed = G.lerp(this.amountDisplayed, this.amount, this.lerpValue, .2), this.setText(Math.round(this.amountDisplayed).toString())
    }, G.TextRTCacher = function () { }, G.TextRTCacher.prototype.cacheText = function (t, e, i, s, a) {
        this.txt || (this.txt = game.make.bitmapText(0, 0, t, "", 80)), this.txt.fontSize = i, this.txt.setText(e), this.txt.tint = a || 16777215, this.txt.updateCache(), game.make.renderTexture(this.txt.width, this.txt.height, s, !0).render(this.txt)
    }, G.TextRTCacher.prototype.cachePhaserText = function (t, e, i) {
        var s = game.make.text(0, 0, t, i);
        game.make.renderTexture(s.width, s.height, e, !0).render(s), s.destroy()
    }, G.Timer = function (t, e, i, s, a, o, n) {
        G.OneLineText.call(this, t, e, i, "???", s, a, o, n), this.secLeft = 0, this.active = !1, this.timerBinding = G.sb("onWallClockTimeUpdate").add(this.updateTimer, this), this.events.onDestroy.add(function () {
            this.timerBinding.detach()
        }, this)
    }, G.Timer.prototype = Object.create(G.OneLineText.prototype), G.Timer.prototype.updateTimer = function () {
        this.active && (G.sfx.clock_tick.play(), this.secLeft = Math.max(0, this.secLeft - 1), this.setText(G.changeSecToTimerFormat(this.secLeft)))
    }, G.Timer.prototype.setSecLeft = function (t) {
        this.secLeft = t, this.setText(G.changeSecToTimerFormat(this.secLeft))
    }, G.Timer.prototype.start = function (t) {
        this.active = !0
    }, G.TimerT = function (t, e, i, s, a, o, n, r) {
        G.Text.call(this, t, e, "???", s, a, o), this.secLeft = 0, this.active = !1, this.timerFormat = n, this.dots = !0, this.sfx = r ? G.sfx[sfs] : null, this.timerBinding = G.sb("onWallClockTimeUpdate").add(this.updateTimer, this), this.events.onDestroy.add(function () {
            this.timerBinding.detach()
        }, this), i && this.setDate(i)
    }, G.TimerT.prototype = Object.create(G.Text.prototype), G.TimerT.prototype.updateTimer = function () {
        this.active && (this.sfx && this.sfx.play(), this.secLeft = Math.max(0, this.secLeft - 1), this.updateTimerText(this.secLeft, this.dots), this.dots = !this.dots)
    }, G.TimerT.prototype.setSecLeft = function (t) {
        this.secLeft = Math.max(0, t), this.updateTimerText(this.secLeft, !0)
    }, G.TimerT.prototype.updateTimerText = function (t, e) {
        var i = G.changeSecToDHMS(this.secLeft),
            s = []; - 1 < this.timerFormat.indexOf("d") && s.push(i[0]), -1 < this.timerFormat.indexOf("h") && s.push(i[1]), -1 < this.timerFormat.indexOf("m") && s.push(i[2]), -1 < this.timerFormat.indexOf("s") && s.push(i[3]), this.setText(s.join(e ? ":" : " "))
    }, G.TimerT.prototype.start = function (t) {
        this.active = !0
    }, G.TimerT.prototype.setDate = function (t) {
        var e = new Date(t).getTime(),
            i = Date.now(),
            s = Math.ceil((e - i) / 1e3);
        this.setSecLeft(s), this.active = !0
    }, G.UITargetParticles = function () {
        G.PoolGroup.call(this, G.UITargetParticle), this.fixedToCamera = !0
    }, G.UITargetParticles.prototype = Object.create(G.PoolGroup.prototype), G.UITargetParticles.prototype.initPart = function (t, e, i, s, a, o) {
        return this.init(t, e, i, s, a)
    }, G.UITargetParticles.prototype.createDividedBatch = function (t, e, i, s, a, o) {
        var n = new G.UITargetParticles.BatchObj,
            r = r || 25;
        r < a / o && (o = Math.ceil(a / r));
        for (var h = Math.floor(a / o) + Math.sign(a % o), l = 0; l < h; l++) {
            var d = this.init(t, e, i, s, Math.min(o, a));
            a -= o, n.add(d)
        }
        return n
    }, G.UITargetParticles.prototype.createBatch = function (t, e, i, s, a, o) {
        for (var n = new G.UITargetParticles.BatchObj, r = Array.isArray(t), h = 0; h < o; h++) {
            if (r) var l = this.init(t[h].x, t[h].y, i, s, a);
            else l = this.init(t, e, i, s, a);
            n.add(l)
        }
        return n
    }, G.UITargetParticles.BatchObj = function () {
        this.parts = [], this.nrOfParts = 0, this.nrOfFinished = 0, this.onFinish = new Phaser.Signal
    }, G.UITargetParticles.BatchObj.prototype.add = function (t) {
        this.parts.push(t), t.onFinish.addOnce(this.onPartFinish, this), this.nrOfParts++
    }, G.UITargetParticles.BatchObj.prototype.onPartFinish = function () {
        this.nrOfFinished++, this.nrOfFinished == this.nrOfParts && this.onFinish.dispatch()
    }, G.UITargetParticles.BatchObj.prototype.addOnPartStart = function (e, i) {
        this.parts.forEach(function (t) {
            t.onStart.addOnce(e, i || t, 1)
        })
    }, G.UITargetParticles.BatchObj.prototype.addOnPartFinish = function (e, i) {
        this.parts.forEach(function (t) {
            t.onFinish.addOnce(e, i || t, 1)
        })
    }, G.UITargetParticles.BatchObj.prototype.start = function (e) {
        var i = 0;
        this.parts.forEach(function (t) {
            t.start(i), i += e || 0
        })
    }, G.UITargetParticle = function () {
        G.Image.call(this, 0, 0, null, .5), this.onStart = new Phaser.Signal, this.onFinish = new Phaser.Signal, this.speed = 0, this.speedMax = 30, this.speedDelta = .75, this.vel = new Phaser.Point(0, 0), this.velInit = new Phaser.Point(0, 0), this.kill()
    }, G.UITargetParticle.prototype = Object.create(G.Image.prototype), G.UITargetParticle.prototype.init = function (t, e, i, s, a) {
        this.position.setTo(t, e), this.changeTexture(i), this.onStart.removeAll(), this.onFinish.removeAll(), this.carriedValue = a || 1, this.targetObj = s, this.stopTweens(this), this.scale.setTo(1), this.alpha = 1, this.speed = 0, this.vel.setTo(0, 0)
    }, G.UITargetParticle.prototype.start = function (t) {
        t ? game.time.events.add(t, this.start, this) : (this.revive(), this.onStart.dispatch(this, this.carriedValue))
    }, G.UITargetParticle.prototype.update = function () {
        if (this.alive) {
            this.position.add(this.vel.x, this.vel.y), this.vel.x *= .95, this.vel.y *= .95, this.speed += this.speedDelta, this.speed = Math.min(this.speed, this.speedMax);
            var t = Phaser.Point.distance(this.worldPosition, this.targetObj.worldPosition),
                e = Phaser.Point.angle(this.targetObj.worldPosition, this.worldPosition);
            this.position.add(G.lengthDirX(e, Math.min(t, this.speed), !0), G.lengthDirY(e, Math.min(t, this.speed), !0)), t < 1.2 * this.speedMax && (this.onFinish.dispatch(this, this.carriedValue), this.kill())
        }
    }, void 0 === G && (G = {}), Math.sign = Math.sign || function (t) {
        return 0 === (t = +t) || isNaN(t) ? t : 0 < t ? 1 : -1
    }, G.isImageInCache = function (t) {
        return "" != this.checkSheet(t) || game.cache.checkImageKey(t)
    }, G.checkSheet = function (t) {
        return G.spritesheetMap ? G.spritesheetMap[t] || "" : this.checkSheetOld()
    }, G.checkSheetOld = function () {
        for (var t = 0, e = G.ASSETS.spritesheets.length; t < e; t++) {
            G.ASSETS.spritesheets[t];
            if (game.cache.checkImageKey(G.ASSETS.spritesheets[t]) && game.cache.getFrameData(G.ASSETS.spritesheets[t]).getFrameByName(frame)) return G.ASSETS.spritesheets[t]
        }
        return ""
    }, G.lerp = function (t, e, i, s) {
        return s && Math.abs(t - e) <= s ? e : t + i * (e - t)
    }, G.l = function (t) {
        return Math.floor(t * G.Loader.currentConfigMulti)
    }, G.rl = function (t) {
        return Math.floor(t * (1 / G.Loader.currentConfigMulti))
    }, G.lnf = function (t) {
        return t * G.Loader.currentConfigMulti
    }, G.rnd = function (t, e) {
        return game.rnd.realInRange(t || 0, e || 1)
    }, G.rndInt = function (t, e) {
        return game.rnd.between(t, e)
    }, G.changeTexture = function (t, e) {
        if ("string" != typeof e) return t.loadTexture(e);
        var i = this.checkSheet(e);
        "" == i ? t.loadTexture(e) : t.loadTexture(i, e)
    }, G.txt = function (t) {
        return G.lang || (G.lang = "en"), G.json.languages[G.lang] || (G.lang = "en"), G.json.languages[G.lang][t] || t + ""
    }, G.deltaTime = 1, G.delta = function () {
        G.deltaTime = Math.min(1.5, game.time.elapsedMS / 16), 17 == game.time.elapsedMS && (G.deltaTime = 1)
    }, G.rotatePositions = function (t) {
        for (var e = [], i = 0, s = t.length; i < s; i += 2) e.push(-1 * t[i + 1], t[i]);
        return e
    }, G.loadTexture = G.changeTexture, G.makeImage = function (t, e, i, s, a) {
        var o, n = this.checkSheet(i);
        return o = "" == n ? game.make.image(this.l(t), this.l(e), i) : game.make.image(this.l(t), this.l(e), n, i), s && ("number" == typeof s ? o.anchor.setTo(s) : o.anchor.setTo(s[0], s[1])), a ? (a.add || a.addChild).call(a, o) : null !== a && game.world.add(o), o
    }, G.capitalize = function (t) {
        return t.charAt(0).toUpperCase() + t.slice(1)
    }, G.lengthDirX = function (t, e, i) {
        return (i = i || !1) ? Math.cos(t) * e : Math.cos(game.math.degToRad(t)) * e
    }, G.lengthDirY = function (t, e, i) {
        return (i = i || !1) ? Math.sin(t) * e : Math.sin(game.math.degToRad(t)) * e
    }, G.stopTweens = function (e) {
        game.tweens._add.forEach(function (t) {
            e.scale && t.target == e.scale && t.stop(), t.target == e && t.stop()
        }), game.tweens._tweens.forEach(function (t) {
            e.scale && t.target == e.scale && t.stop(), t.target == e && t.stop()
        })
    }, G.makeExtImage = function (t, e, s, i, a, o, n, r) {
        var h;
        if (G.extLoader || (G.extLoader = new G.ExtLoader(game)), G.extLoader.loadedUrls[s]) return h = G.makeImage(t, e, G.extLoader.loadedUrls[s], a, o), r.call(h), h;
        (h = G.makeImage(t, e, i, a, o)).onImgLoaded = new Phaser.Signal, G.extImagesKeys || (G.extImagesKeys = []);
        var l = "extImgBlankName" + G.extImagesKeys.length;
        G.extImagesKeys.push(l);
        var d = G.extLoader.onFileComplete.add(function (t, e, i) {
            e == l && i && (G.extLoader.loadedUrls[s] = l, null !== h.game && (G.changeTexture(h, l), r && r.call(h)), d.detach())
        });
        return G.extLoader.image(l, s, !0), h
    }, G.drawCircleSegment = function (t, e, i, s, a, o, n) {
        if (a === o) return t;
        void 0 === n && (n = 10);
        var r = (o - a) / n;
        t.moveTo(e, i);
        for (var h = t.currentPath.shape.points; a <= o; a += r) h.push(Math.floor(e + G.lengthDirX(a, s, !1)), Math.floor(i + G.lengthDirY(a, s, !1)));
        return h.push(Math.floor(e + G.lengthDirX(o, s, !1)), Math.floor(i + G.lengthDirY(o, s, !1))), t.dirty = !0, t._boundsDirty = !0, t
    }, G.centerElements = function (t, s, e) {
        void 0 === e && (e = 0), void 0 === s && (s = []);
        var i = 0,
            a = Array.isArray(s);
        t.forEach(function (t, e) {
            i += t.width, (a ? s[e - 1] : void 0 !== s) && (i += G.l(a ? s[e - 1] : s))
        });
        var o = e + -.5 * i;
        t.forEach(function (t, e, i) {
            t.x = o, t.x += t.width * t.anchor.x, o += t.width, (a ? s[e - 1] : void 0 !== s) && (o += G.l(a ? s[e] : s))
        })
    }, G.centerElements2 = function (t, s, a) {
        void 0 === a && (a = 0), void 0 === s && (s = 0);
        var o = 0;
        t.forEach(function (t, e) {
            o += t.width
        }), o += s * (t.length - 1), t.forEach(function (t, e, i) {
            t.left = 0 == e ? a + -.5 * o : i[e - 1].right + s
        })
    }, G.makeMover = function (e) {
        void 0 !== G.activeMover && (G.activeMover.destroy(), G.activeMover.eKey.onDown.removeAll()), G.activeMover = game.add.image(), G.activeMover.obj = e, G.activeMover.cursors = game.input.keyboard.createCursorKeys(), G.activeMover.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT), G.activeMover.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E), G.activeMover.eKey.onDown.add(function () { }, G.activeMover), G.activeMover.update = function () {
            var t = this.shiftKey.isDown ? 10 : 2;
            this.cursors.down.isDown && (e.y += t), this.cursors.up.isDown && (e.y -= t), this.cursors.left.isDown && (e.x -= t), this.cursors.right.isDown && (e.x += t)
        }
    }, G.makeLineEditor = function (t) {
        var a = game.add.group();
        return a.interpolation = t || "linear", a.pointsX = [0], a.pointsY = [0], a.gfx = a.add(game.make.graphics()), a.shiftKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT), a.wKey = game.input.keyboard.addKey(Phaser.Keyboard.W), a.wKey.onDown.add(function () {
            var t, e;
            e = 2 < this.children.length ? (t = this.children[this.children.length - 1].x, this.children[this.children.length - 1].y) : t = 0;
            var i = G.makeImage(t, e, "candy_1");
            i.anchor.setTo(.5), i.scale.setTo(.1), this.add(i), this.activeObject = i, this.changed = !0
        }, a), a.qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q), a.qKey.onDown.add(function () {
            this.children.length <= 2 || (this.removeChildAt(this.children.length - 1), 3 < this.children.length ? this.activeObject = this.children[this.children.length - 1] : this.activeObject = null, this.changed = !0)
        }, a), a.aKey = game.input.keyboard.addKey(Phaser.Keyboard.A), a.aKey.onDown.add(function () {
            if (this.activeObject) {
                var t = this.getChildIndex(this.activeObject);
                2 != t && (this.activeObject = this.getChildAt(t - 1))
            }
        }, a), a.sKey = game.input.keyboard.addKey(Phaser.Keyboard.S), a.sKey.onDown.add(function () {
            if (this.activeObject) {
                var t = this.getChildIndex(this.activeObject);
                t != this.children.length - 1 && (this.activeObject = this.getChildAt(t + 1))
            }
        }, a), a.eKey = game.input.keyboard.addKey(Phaser.Keyboard.E), a.eKey.onDown.add(function () {
            console.log(JSON.stringify([this.pointsX, this.pointsY]))
        }, a), a.cursors = game.input.keyboard.createCursorKeys(), a.activeObject = null, a.preview = G.makeImage(0, 0, "candy_2", .5, a), a.preview.width = 8, a.preview.height = 8, a.preview.progress = 0, a.update = function () {
            if (null !== this.activeObject && (this.forEach(function (t) {
                t == this.activeObject ? t.alpha = 1 : t.alpha = .5
            }, this), 0 != this.children.length)) {
                var t = this.shiftKey.isDown ? 3 : 1;
                if (this.cursors.down.isDown && (this.activeObject.y += t, this.changed = !0), this.cursors.up.isDown && (this.activeObject.y -= t, this.changed = !0), this.cursors.left.isDown && (this.activeObject.x -= t, this.changed = !0), this.cursors.right.isDown && (this.activeObject.x += t, this.changed = !0), a.preview.progress += .01, 1 < a.preview.progress && (a.preview.progress = 0), a.preview.x = game.math[this.interpolation + "Interpolation"](this.pointsX, a.preview.progress), a.preview.y = game.math[this.interpolation + "Interpolation"](this.pointsY, a.preview.progress), this.changed) {
                    var i = [],
                        s = [];
                    this.pointsX = i, this.pointsY = s, this.children.forEach(function (t, e) {
                        e <= 1 || (i.push(t.x), s.push(t.y))
                    }), this.gfx.clear(), this.gfx.beginFill(16711680, 1);
                    for (var e = 0; e < 200; e++) this.gfx.drawRect(game.math[this.interpolation + "Interpolation"](i, e / 200), game.math[this.interpolation + "Interpolation"](s, e / 200), 3, 3)
                }
            }
        }, a
    }, G.lineUtils = {
        getWholeDistance: function (t, e) {
            for (var i = 0, s = 1; s < t.length; s++) i += game.math.distance(t[s - 1], e[s - 1], t[s], e[s]);
            return i
        },
        findPointAtDitance: function (t, e, i) {
            for (var s = 0, a = 1; a < t.length; a++) {
                var o = game.math.distance(t[a - 1], e[a - 1], t[a], e[a]);
                if (i < o + s) {
                    var n = game.math.angleBetween(t[a - 1], e[a - 1], t[a], e[a]);
                    return [t[a - 1] + G.lengthDirX(n, i - s, !0), e[a - 1] + G.lengthDirY(n, i - s, !0)]
                }
                s += o
            }
            return [t[t.length - 1], e[e.length - 1]]
        },
        spreadAcrossLine: function (t, e, i, s, a) {
            for (var o = this.getWholeDistance(t, e) / (i.length - 1), n = 0; n < i.length; n++) {
                var r = this.findPointAtDitance(t, e, o * n);
                i[n][s || "x"] = r[0], i[n][a || "y"] = r[1]
            }
        },
        spreadOnNodes: function (t, e, i, s, a) {
            for (var o = 0; o < t.length; o++) {
                if (void 0 === i[o]) return;
                i[o][s || "x"] = t[o], i[o][a || "y"] = e[o]
            }
        }
    }, G.changeSecToTimerFormat = function (t, e) {
        var i = parseInt(t, 10),
            s = !!e && -1 !== e.toUpperCase().indexOf("D"),
            a = !!e && -1 !== e.toUpperCase().indexOf("H"),
            o = Math.floor(i / 86400),
            n = Math.floor((i - 86400 * o) / 3600),
            r = Math.floor((i - 86400 * o - 3600 * n) / 60),
            h = i - 86400 * o - 3600 * n - 60 * r,
            l = G.zeroPad(r) + ":" + G.zeroPad(h);
        return (0 < n || 0 < o || a) && (l = G.zeroPad(n) + ":" + l), (0 < o || s) && (l = G.zeroPad(o) + ":" + l), l
    }, G.changeSecToDHMS = function (t, e) {
        var i = parseInt(t, 10),
            s = (!e || e.toUpperCase().indexOf("D"), !e || e.toUpperCase().indexOf("H"), Math.floor(i / 86400)),
            a = Math.floor((i - 86400 * s) / 3600),
            o = Math.floor((i - 86400 * s - 3600 * a) / 60),
            n = i - 86400 * s - 3600 * a - 60 * o;
        return [G.zeroPad(s), G.zeroPad(a), G.zeroPad(o), G.zeroPad(n)]
    }, G.zeroPad = function (t) {
        return t < 10 ? "0" + t : t
    }, G.arrayJoin = function (t, i) {
        return t.reduce(function (t, e) {
            return e ? t ? t + i + e : e : t
        }, "")
    }, G.makeTextButton = function (t, e, i, s, a, o) {
        var n = game.make.text(t, e, i, s);
        return n.inputEnabled = !0, n.input.useHandCursor = !0, n.hitArea = new Phaser.Rectangle(0, 0, n.width, n.height), n.events.onInputDown.add(a, o || null), n
    }, G.setObjProp = function (t, e, i) {
        var s = t;
        "string" == typeof e && e.split(".");
        try {
            for (var a = 0; a < this.refreshProp.length - 1; a++) s = s[this.refreshProp[a]];
            s[this.refreshProp[this.refreshProp.length - 1]] = i
        } catch (t) {
            console.warn("cant set prop")
        }
    }, G.getObjProp = function (t, e) {
        var i = t;
        "string" == typeof e && (e = e.split("."));
        try {
            for (var s = 0; s < e.length; s++) i = i[e[s]]
        } catch (t) {
            return
        }
        return i
    }, void 0 === G && (G = {}), G.Utils = {
        cacheText: function (t, e, i, s, a) {
            (e = game.make.bitmapText(0, 0, i, e, s)).tint = a || 16777215, e.updateCache(), game.make.renderTexture(e.width, e.height, t, !0).render(e), e.destroy()
        },
        cacheGText: function (t, e, i) {
            e = new G.Text(0, 0, e, i, 0);
            game.make.renderTexture(e.width, e.height, t, !0).render(e), e.destroy()
        },
        lerp: function (t, e, i, s) {
            return s && Math.abs(t - e) <= s ? e : t + i * (e - t)
        },
        copyToClipboard: function (t) {
            this.copyArea || (this.copyArea = document.createElement("textarea"), this.copyArea.style.positon = "fixed", this.copyArea.style.opacity = 0, document.body.appendChild(this.copyArea)), this.copyArea.value = t, this.copyArea.select(), document.execCommand("copy")
        },
        getObjProp: function (t, e) {
            var i = t;
            "string" == typeof e && (e = e.split("."));
            try {
                for (var s = 0; s < e.length; s++) i = i[e[s]]
            } catch (t) {
                return
            }
            return i
        },
        setObjProp: function (t, e, i) {
            var s = t;
            "string" == typeof e && (e = e.split("."));
            try {
                for (var a = 0; a < e.length - 1; a++) s = s[e[a]];
                s[e[e.length - 1]] = i
            } catch (t) {
                return null
            }
        },
        replaceAll: function (t, e, i) {
            return t.split(e).join(i)
        },
        removeDuplicates: function (t) {
            var e = [];
            return t.forEach(function (t) {
                -1 === e.indexOf(t) && e.push(t)
            }), e
        },
        getParentsScaleX: function (t, e) {
            return t == game.stage ? 1 : G.Utils.getParentsScaleX(t.parent, !0) * (e ? t.scale.x : 1)
        },
        getParentsScaleY: function (t, e) {
            return t == game.stage ? 1 : G.Utils.getParentsScaleY(t.parent, !0) * (e ? t.scale.y : 1)
        },
        makeTextButton: function (t, e, i, s, a, o) {
            var n = game.add.text(t, e, i, o);
            return n.inputEnabled = !0, n.input.useHandCursor = !0, n.hitArea = new Phaser.Rectangle(0, 0, n.width, n.height), n.events.onInputDown.add(s, a), n
        },
        injectCSS: function (t) {
            var e = document.createElement("style");
            e.type = "text/css", e.innerHTML = t, document.getElementsByTagName("head")[0].appendChild(e)
        },
        toClientX: function (t) {
            return (parseInt(game.canvas.style.marginLeft) || 0) + t / game.width * game.canvas.clientWidth
        },
        toClientY: function (t) {
            return (parseInt(game.canvas.style.marginTop) || 0) + t / game.height * game.canvas.clientHeight
        },
        clientXToWorldX: function (t) {
            t -= parseInt(game.canvas.style.marginLeft) || 0;
            var e = parseInt(game.canvas.style.width),
                i = (parseInt(game.canvas.style.height), parseInt(game.canvas.width));
            parseInt(game.canvas.height);
            return t * (i / e)
        },
        clientYToWorldY: function (t) {
            t -= parseInt(game.canvas.style.marginTop) || 0;
            parseInt(game.canvas.style.width);
            var e = parseInt(game.canvas.style.height);
            parseInt(game.canvas.width);
            return t * (parseInt(game.canvas.height) / e)
        },
        getImageURI: function (t) {
            return this._bmpMarker || (this._bmpMarker = G.makeImage(0, 0, null, 0, null)), this._bmp || (this._bmp = game.make.bitmapData()), this._bmp.clear(), G.changeTexture(this._bmpMarker, t), this._bmp.resize(this._bmpMarker.width, this._bmpMarker.height), this._bmp.draw(this._bmpMarker), this._bmp.canvas.toDataURL()
        },
        getRT: function (t) {
            return game.cache.getRenderTexture(t).texture
        },
        arraysEqual: function (t, e) {
            if (t === e) return !0;
            if (null == t || null == e) return !1;
            if (t.length != e.length) return !1;
            for (var i = 0; i < t.length; ++i)
                if (t[i] !== e[i]) return !1;
            return !0
        }
    }, G.lineCircleColl = function (t, e, i) {
        var s = t.start,
            a = t.end,
            o = Math.sqrt(Math.pow(a.x - s.x, 2) + Math.pow(a.y - s.y, 2)),
            n = (a.x - s.x) / o,
            r = (a.y - s.y) / o,
            h = n * (e.x - s.x) + r * (e.y - s.y),
            l = h * n + s.x,
            d = h * r + s.y,
            c = Math.sqrt(Math.pow(l - e.x, 2) + Math.pow(d - e.y, 2));
        if (c < e.radius) {
            var p = Math.sqrt(e.radius * e.radius - c * c),
                u = (h - p) * n + s.x,
                g = (h - p) * r + s.y,
                f = (h + p) * n + s.x,
                m = (h + p) * r + s.y,
                G = game.math.distance(s.x, s.y, u, g),
                y = game.math.distance(s.x, s.y, f, m);
            return G < y ? t.length > G && (i.setTo(u, g), i) : t.length > y && (i.setTo(f, m), i)
        }
        return !1
    }, G.getRT = function (t) {
        var e = game.cache.getRenderTexture(t);
        return e ? e.texture : null
    }, G.numberDot = function (t) {
        for (var e = "", i = 0, s = (t = t.toString()).length - 1; 0 <= s; s--) e = t[s] + e, 3 == ++i && 0 !== s && (e = "." + e, i = 0);
        return e
    }, G.guid = function () {
        function t() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
    }, G.AnimationElement = function (t, e, i, s) {
        G.Image.call(this, t, e, null), this.ANIMATIONELEMENT = !0, this.SPR = new G.Image(0, 0, null, .5, this), this.frameCounter = 0, this.data = i, this.currentAnimationData = null, this.currentAnimationName = null, this.playing = void 0 === s || s
    }, G.AnimationElement.prototype = Object.create(G.Image.prototype), G.AnimationElement.prototype.update = function () {
        this.currentAnimationName && this.playing && (this.frameCounter++, this.updateAnimation(this.frameCounter))
    }, G.AnimationElement.prototype.pause = function () {
        this.playing = !1
    }, G.AnimationElement.prototype.resume = function () {
        this.playing = !0
    }, G.AnimationElement.prototype.play = function () {
        this.playing = !0
    }, G.AnimationElement.prototype.stop = function () {
        this.playing = !1, this.updateAnimation(0)
    };
    var testObj = {
        normal: {
            eventTL: [],
            frameTL: [{
                f: 0,
                v: "candy_1"
            }],
            propTLS: {
                alpha: [{
                    f: 0,
                    v: 1
                }],
                x: [{
                    f: 0,
                    v: 0
                }],
                y: [{
                    f: 0,
                    v: 0
                }],
                angle: [{
                    f: 0,
                    v: 0
                }],
                "scale.x": [{
                    f: 0,
                    v: 1
                }],
                "scale.y": [{
                    f: 0,
                    v: 1
                }],
                "anchor.x": [{
                    f: 0,
                    v: .5
                }],
                "anchor.y": [{
                    f: 0,
                    v: 1
                }]
            }
        },
        jump: {
            eventTL: [],
            frameTL: [{
                f: 0,
                v: null
            }],
            propTLS: {
                alpha: [{
                    f: 0,
                    v: 1
                }],
                x: [{
                    f: 0,
                    v: 0
                }],
                y: [{
                    f: 0,
                    v: 0
                }, {
                    f: 120,
                    v: -300
                }],
                angle: [{
                    f: 0,
                    v: 0,
                    e: ["Linear", "None"]
                }, {
                    f: 400,
                    v: 360
                }],
                "scale.x": [{
                    f: 0,
                    v: 1
                }],
                "scale.y": [{
                    f: 0,
                    v: 1
                }],
                "anchor.x": [{
                    f: 0,
                    v: .5
                }],
                "anchor.y": [{
                    f: 0,
                    v: 1
                }]
            }
        }
    };
    G.AnimationElement.prototype.changeAnimationData = function (t) {
        this.data[t] || (t = Object.keys(this.data)[0]), this.eventTL = this.data[t].eventTL, this.frameTL = this.data[t].frameTL, this.propTLS = this.data[t].propTLS, this.propKeys = Object.keys(this.propTLS), this.currentAnimationData = this.data[t], this.currentAnimationName = t, this.updateAnimation(0)
    }, G.AnimationElement.prototype.playAnimation = function (t) {
        this.changeAnimationData(t), this.playing = !0
    }, G.AnimationElement.prototype.getLastKeyFrame = function (t, e) {
        for (var i = t.length, s = 0; s < i; s++) {
            if (t[s].f == e || s == i - 1) return t[s];
            if (t[s].f < e && e < t[s + 1].f) return t[s]
        }
    }, G.AnimationElement.prototype.getNextKeyFrame = function (t, e) {
        for (var i = t.length, s = 0; s < i; s++)
            if (t[s].f > t || s == i - 1) return t[s]
    }, G.AnimationElement.prototype.getKeyFrameAt = function (t, e) {
        if (!this.currentAnimationName) return null;
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            if (s.f === e) return s
        }
        return null
    }, G.AnimationElement.prototype.isAnyKeyFrameAt = function (t) {
        if (!this.currentAnimationName) return !1;
        if (this.getKeyFrameAt(this.eventTL, t)) return !0;
        if (this.getKeyFrameAt(this.frameTL, t)) return !0;
        for (var e = 0; e < this.propKeys.length; e++) {
            var i = this.propKeys[e];
            if (this.getKeyFrameAt(this.propTLS[i], t)) return !0
        }
        return !1
    }, G.AnimationElement.prototype.getFrameValue = function (t, e) {
        var i = this.getLastKeyFrame(t, e),
            s = this.getNextKeyFrame(t, e);
        if (i.e) {
            var a = s.f - i.f,
                o = s.v - i.v,
                n = Phaser.Easing[i.e[0]][i.e[1]]((e - i.f) / a);
            return i.v + o * n
        }
        return i.v
    }, G.AnimationElement.prototype.updateAnimation = function (t) {
        if (this.currentAnimationName) {
            this.frameCounter = t, this.updateFromPropTLS(t);
            var e = this.getTextureFrameValue(this.frameTL, t);
            this.SPR.key != e && this.SPR.frameName != e && G.changeTexture(this.SPR, e)
        }
    }, G.AnimationElement.prototype.updateFromPropTLS = function (t) {
        for (var e = 0; e < this.propKeys.length; e++) {
            var i = this.propKeys[e];
            this.setProp(i, this.getFrameValue(this.propTLS[i], t))
        }
    }, G.AnimationElement.prototype.setProp = function (t, e) {
        "scale.x" == t ? this.SPR.scale.x = e : "scale.y" == t ? this.SPR.scale.y = e : "anchor.x" == t ? this.SPR.anchor.x = e : "anchor.y" == t ? this.SPR.anchor.y = e : this.SPR[t] = e
    }, G.AnimationElement.prototype.getTextureFrameValue = function (t, e) {
        var i = this.getLastKeyFrame(t, e),
            s = i.frameSkip || 1,
            a = e - i.f;
        if (a = Math.floor(a / s), !i.animation) return i.v;
        var o = i.v.length;
        return i.loop ? i.refraction || i.reverse ? i.refraction && !i.reverse ? i.v[Math.min(o - 1, a % (o + i.refraction))] : void 0 : i.v[a % o] : i.v[Math.min(o - 1, a)]
    }, G.GroupColliderLineLine = function (t, e, i, s) {
        G.Image.call(this, 0, 0, null), this.group1 = t, this.group2 = e, this.callback = i, this.context = s || null, this.collPoint = new Phaser.Point(0, 0)
    }, G.GroupColliderLineLine.prototype = Object.create(G.Image.prototype), G.GroupColliderLineLine.prototype.update = function () {
        for (var t = this.group1.length, e = this.group2.length, i = 0; i < t; i++)
            for (var s = this.group1.children[i], a = 0; a < e; a++) {
                var o = this.group2.children[a];
                s !== o && s.collLine.intersects(o.collLine, !0, this.collPoint) && this.callback.call(this.context, s, o, this.collPoint, this.group1, this.group2)
            }
    }, G.GroupColliderLineCircle = function (t, e, i, s) {
        G.Image.call(this, 0, 0, null), this.group1 = t, this.group2 = e, this.callback = i, this.context = s || null, this.collPoint = new Phaser.Point(0, 0)
    }, G.GroupColliderLineCircle.prototype = Object.create(G.Image.prototype), G.GroupColliderLineCircle.prototype.update = function () {
        this.group1.length, this.group2.length;
        for (var t = this.group1.length; t--;)
            for (var e = this.group1.children[t], i = this.group2.length; i--;) {
                var s = this.group2.children[i];
                e !== s && G.lineCircleColl(e.collLine, s.collCircle, this.collPoint) && this.callback.call(this.context, e, s, this.collPoint, this.group1, this.group2)
            }
    }, Phaser.Group.prototype.destroy = function (t, e) {
        null === this.game || this.ignoreDestroy || (void 0 === t && (t = !0), void 0 === e && (e = !1), this.onDestroy.dispatch(this, t, e), this.removeAll(t), this.cursor = null, this.filters = null, this.alive = !1, this.pendingDestroy = !1, e || (this.parent && this.parent.removeChild(this), this.game = null, this.exists = !1))
    }, Phaser.exportChildren = function (t) {
        for (var e = [], i = 0; i < t.children.length; i++) {
            var s = t.children[i];
            s.exportToString && e.push(s.exportToString())
        }
        return e
    }, Phaser.Group.prototype.exportToString = function () {
        return {
            type: "GROUP",
            x: this.x,
            y: this.y,
            scale: [this.scale.x, this.scale.y],
            angle: this.angle,
            children: Phaser.exportChildren(this)
        }
    }, Phaser.Image.prototype.exportToString = function () {
        return exportObj = {
            type: "IMG",
            x: this.x,
            y: this.y,
            frame: this.frameName,
            anchor: [this.anchor.x, this.anchor.y],
            scale: [this.scale.x, this.scale.y],
            angle: this.angle,
            children: Phaser.exportChildren(this)
        }, exportObj
    }, void 0 === G && (G = {}), G.Board = function (t, e, i) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.MAX_NUMBER_OF_REGULAR_CANDY = G.lvlData.nrOfTypes, this.collectCells = t.collectCells || !1, this.tilesize = e, this.offsetX = 0, this.offsetY = 0, this.editorMode = i, this.borderSize = G.l(8), this.tweenObj = {
            a: .6
        }, game.add.tween(this.tweenObj).to({
            a: 1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.levelData = new G.GridArray(t.levelData), this.boardData = new G.GridArray(this.levelData.width, this.levelData.height), this.checkMatchList = [], this.checkSpecialMatchList = [], this.checkAfterFall = [], this.fallCheckList = [], this.duringAnimation = 0, this.duringFall = 0, G.sb("onCandyFallStart").add(function () {
            this.duringFall++
        }, this), G.sb("onCandyFallFinish").add(function (t) {
            this.duringFall--, -1 == this.fallCheckList.indexOf(t) && this.fallCheckList.push(t)
        }, this), G.sb("onCandyAnimationStart").add(function () {
            this.duringAnimation++
        }, this), G.sb("onCandyAnimationFinish").add(function () {
            this.duringAnimation--
        }, this), G.sb("onScreenResize").add(this.onResize, this), this.matcher = new G.BoardMatcher(this), this.boardBackground = new G.BoardBackground(this), this.background = game.make.image(0, 0, this.boardBackground.renderTexture), this.background.x = -this.tilesize, this.background.y = -this.tilesize, this.add(this.background), this.tileShade = G.makeImage(0, 0, "tile_shade", .5, this), this.tileShade.visible = !1, this.boardDirt = new G.BoardDirt(this), this.boardDirtS = new G.BoardDirtS(this), this.candySelection = new G.CandySelection(this), this.boardCandies = new G.BoardCandies(this, this.boardData, t), this.boardJam = new G.BoardJam(this), this.boardIce = new G.BoardIce(this), this.boardCage = new G.BoardConcrete(this), this.boardCandies.secondFloor.parent.bringToTop(this.boardCandies.secondFloor), this.boardCandies.fxGroup.parent.bringToTop(this.boardCandies.fxGroup), this.boardCandies.boosterFxGroup.parent.bringToTop(this.boardCandies.boosterFxGroup), this.boardCandies.thirdFloor.parent.bringToTop(this.boardCandies.thirdFloor), this.boardCandies.fxTopGroup.parent.bringToTop(this.boardCandies.fxTopGroup), this.layers = [this.boardDirt, this.boardDirtS, this.boardCandies, this.boardJam, this.boardCage, this.boardIce], this.layersNoCandies = [this.boardDirt, this.boardDirtS, this.boardJam, this.boardCage, this.boardIce], this.inputController = new G.InputController(this), this.actionManager = new G.BoardActionManager(this), this.refiller = new G.Refiller(t, this), this.fallMgr = new G.BoardFallMgr(this, this.refiller), this.goalCandies = G.json.specialCandies.goalCandies, this.import(this.levelData), this.boardBackground.redraw(), this.lastRowInCollumn = this.getLastRowInCollumn(), this.onResize(), G.sb("onActionFinish").add(function () {
            if (!(1 < this.actionManager.actionList.length)) {
                for (var t = !1, e = 0; e < this.boardData.width; e++) {
                    var i = this.getCandy(e, this.boardData.height - 1);
                    i && -1 !== this.goalCandies.indexOf(i.candyType) && (this.boardCandies.removeCandy(e, this.boardData.height - 1), G.sfx.xylophone_positive6.play(), t = !0)
                }
                t && this.actionManager.newAction("processFall")
            }
        }, this)
    }, G.Board.prototype = Object.create(Phaser.Group.prototype), G.Board.prototype.getLastRowInCollumn = function () {
        for (var t = [], e = 0; e < this.boardData.width; e++) t.push(this.getLastCellInCollumn(e));
        return t
    }, G.Board.prototype.pushToFallCheckList = function (t) {
        !1 !== t && -1 == this.fallCheckList.indexOf(t) && this.fallCheckList.push(t)
    }, G.Board.prototype.onResize = function () {
        this.center()
    }, G.Board.prototype.destroyBoard = function () {
        this.boardDirt.destroy(), this.boardCandies.destroy(), this.boardCage.destroy(), this.boardIce.destroy(), this.destroy()
    }, G.Board.prototype.clearBoard = function () {
        this.boardData.loop(function (t, e, i) {
            this.boardCandies.goalCandies = [], this.boardCandies.rabbitCandy = !1;
            var s = this.boardCandies.getCandy(e, i);
            s && this.boardCandies.removeCandy(s), this.boardIce.destroyCell(e, i), this.boardDirt.destroyCell(e, i)
        }, this)
    }, G.Board.prototype.center = function () {
        var t, e, i, s = this.tilesize * this.boardData.width,
            a = this.tilesize * this.boardData.height;
        G.horizontal ? (t = Math.min(1, 580 / s), e = Math.min(1, (game.height - 100) / a), i = Math.min(t, e), this.scale.setTo(i), this.x = G.l(80) - .5 * (580 - s * i), this.y = .5 * game.height - a * i * .5) : (t = Math.min(1, 640 / s), e = Math.min(1, (game.height - 220 - 150) / a), i = Math.min(t, e), this.scale.setTo(i), this.x = G.l(320) - s * i * .5, this.y = G.l(220) + .5 * (game.height - 220 - 150 - a * i)), this.x = Math.floor(this.x), this.y = Math.floor(this.y)
    }, G.Board.prototype.update = function () {
        this.actionManager.update()
    }, G.Board.prototype.isIdle = function () {
        return 0 === this.actionManager.actionList.length
    }, G.Board.prototype.checkGoalCandy = function () {
        for (var t = !1, e = 0; e < this.boardData.width; e++) {
            var i = this.getCandy(e, this.lastRowInCollumn[e]);
            if (i && -1 !== this.goalCandies.indexOf(i.candyType)) {
                var s = !0;
                this.collectCells && (this.isCandyOnCollectCell(i) || (s = !1)), s && (this.boardCandies.removeCandy(e, this.lastRowInCollumn[e]), G.sfx.xylophone_positive6.play(), t = !0)
            }
        }
        if (t) return this.actionManager.newAction("processFall"), !0
    }, G.Board.prototype.isCandyOnCollectCell = function (e) {
        if (this.collectCells && this.collectCells.find(function (t) {
            return t.x === e.cellX && t.y === e.cellY
        })) return !0;
        return !1
    }, G.Board.prototype.makeMove = function (t, e, i) {
        this.actionManager.newAction("move", t, e, i)
    }, G.Board.prototype.hitCell = function (t, e) {
        for (var i = this.layers.length; i--;)
            if (!this.layers[i].onHit(t, e)) return
    }, G.Board.prototype.isMoveable = function (t, e, i) {
        return "number" != typeof t && (e = t[1], t = t[0]), !!this.isCellOnBoard(t, e) && (!this.isMoveBlocked(t, e) && !!this.getCandy(t, e))
    }, G.Board.prototype.isMoveBlocked = function (t, e) {
        for (var i = this.layers.length; i--;)
            if (this.layers[i].isMoveBlocked(t, e)) return !0;
        return !1
    }, G.Board.prototype.isBoosterChangeBlocked = function (t, e) {
        for (var i = this.layers.length; i--;)
            if (this.layers[i].isBoosterChangeBlocked(t, e)) return !0;
        return !1
    }, G.Board.prototype.isMatchBlocked = function (t, e) {
        for (var i = this.layers.length; i--;)
            if (this.layers[i].isMatchBlocked(t, e)) return !0;
        return !1
    }, G.Board.prototype.matchCellExceptCandy = function (t, e) {
        for (var i = this.layersNoCandies.length; i--;)
            if (!this.layersNoCandies[i].onMatch(t, e)) return void console.log("** except stopped propataion")
    }, G.Board.prototype.getLastCellInCollumn = function (t) {
        for (var e = this.boardData.height - 1; 0 <= e; e--)
            if (this.isCellOnBoard(t, e)) return e
    }, G.Board.prototype.matchCell = function (t, e, i, s, a) {
        for (var o = this.layers.length; o--;)
            if (!this.layers[o].onMatch(t, e, i, s, a)) return void console.log("** stopped propagation")
    }, G.Board.prototype.isCellInBoardArea = function (t, e) {
        return t < this.boardData.width && 0 <= t && 0 <= e && e < this.boardData.height
    }, G.Board.prototype.isCellMatchable = function (t, e, i) {
        if ("number" != typeof t && (e = t[1], t = t[0]), !this.isCellOnBoard(t, e)) return !1;
        if (this.isMatchBlocked(t, e)) return !1;
        var s = this.getCandy(t, e);
        return !!s && (!i || s.candyType == i)
    }, G.Board.prototype.isCellMatchable = function (t, e, i) {
        if ("number" != typeof t && (e = t[1], t = t[0]), !this.isCellOnBoard(t, e)) return !1;
        if (this.boardIce.isToken(t, e)) return !1;
        if (this.isMatchBlocked(t, e)) return !1;
        var s = this.getCandy(t, e);
        return !!s && (!!s.matchable && (!s.falling && (!s.goalCandy && (!s.chocolate && (!i || this.getCandy(t, e).candyType == i)))))
    }, G.Board.prototype.isCellOnBoard = function (t, e) {
        return "boolean" != typeof t && ("number" != typeof t && (e = t[1], t = t[0]), !(t < 0 || t >= this.boardData.width || e < 0 || e >= this.boardData.height) && "X" != this.boardData.get(t, e))
    }, G.Board.prototype.getCandy = function (t, e) {
        return "number" != typeof t ? this.boardCandies.getCandy(t[0], t[1]) : this.boardCandies.getCandy(t, e)
    }, G.Board.prototype.cellToPxOut = function (t) {
        var e = this.tilesize * this.scale.x;
        return [this.x + this.offsetX + e * t[0] + .5 * e, this.y + this.offsetY + e * t[1] + .5 * e]
    }, G.Board.prototype.pxInToCellX = function (t) {
        return Math.floor(t / this.tilesize)
    }, G.Board.prototype.pxInToCellY = function (t) {
        return Math.floor(t / this.tilesize)
    }, G.Board.prototype.cellXToPxIn = function (t) {
        return t * this.tilesize + .5 * this.tilesize
    }, G.Board.prototype.cellYToPxIn = function (t) {
        return t * this.tilesize + .5 * this.tilesize
    }, G.Board.prototype.cellToPxIn = function (t) {
        return [this.cellXToPxIn(t[0]), this.cellYToPxIn(t[1])]
    }, G.Board.prototype.swapCandies = function (t, e) {
        this.boardCandies.swapCandies(t, e)
    }, G.Board.prototype.removeCandy = function () {
        this.boardCandies.removeCandy.apply(this.boardCandies, arguments)
    }, G.Board.prototype.newFallingCandy = function (t, e, i, s) {
        var a = this.boardCandies.newCandy(t, e, i);
        a.y = this.cellYToPxIn(s), a.fallTo(t, e), a.alpha = 0
    }, G.Board.prototype.export = function () {
        var t = new G.GridArray(this.boardData.width, this.boardData.height);
        return t.loop(function (t, i, s, e) {
            var a = [];
            "X" == this.boardData.get(i, s) && a.push("X"), this.layers.forEach(function (t) {
                var e = t.export(i, s);
                e && a.push(e)
            }), e[i][s] = a
        }, this), JSON.stringify(t.data)
    }, G.Board.prototype.import = function (t) {
        t.loop(function (i, s, a) {
            for (var o = 0, t = i.length; o < t; o++)
                if (i[o] = i[o].toString(), "W" == i[o][0] && (i[o] = i[o][1] + ":" + i[o][0]), "r" !== i[o][0] || this.editorMode || (i[o] = this.getRandomThatDoesntMatch(s, a) + i[o].substr(1)), "X" == i[o]) this.boardData.set(s, a, "X");
                else {
                    var n = !1;
                    this.layersNoCandies.forEach(function (t) {
                        var e = t.import(s, a, i[o]);
                        !n && e && (n = !0)
                    }), n || this.boardCandies.import(s, a, i[o])
                }
        }, this), 0 == this.matcher.checkPossibleMoves().length && this.shuffleCandies(!0), this.possibleMoves = this.matcher.checkPossibleMoves()
    }, G.Board.prototype.makePossibleMatch = function () {
        for (var t, e, i, s = this.boardData.width, a = this.boardData.height, o = [
            [1, 0, 1, -1, 1, 1],
            [-1, 0, -1, -1, -1, 1],
            [0, -1, -1, -1, 1, -1],
            [0, 1, -1, 1, 1, 1]
        ]; ;)
            if (t = Math.floor(Math.random() * s), e = Math.floor(Math.random() * a), i = o[Math.floor(Math.random() * o.length)], this.isMoveable(t, e) && this.isCellMatchable(t, e) && this.isMoveable(t + i[0], e + i[1]) && this.isCellMatchable(t + i[2], e + i[3]) && this.isCellMatchable(t + i[4], e + i[5])) {
                var n = this.getCandy(t, e),
                    r = this.getCandy(t + i[2], e + i[3]),
                    h = r.candyType,
                    l = this.getCandy(t + i[4], e + i[5]),
                    d = l.candyType;
                if (!n.goalCandy && !r.goalCandy && !l.goalCandy) {
                    if (r.candyType = n.candyType, l.candyType = n.candyType, !this.matcher.quickMatchCheck(r) && !this.matcher.quickMatchCheck(l)) {
                        G.changeTexture(r, n.frameName), G.changeTexture(l, n.frameName);
                        break
                    }
                    r.candyType = h, l.candyType = d
                }
            }
    }, G.Board.prototype.getRandomThatDoesntMatch = function (t, e) {
        for (var i = game.rnd.between(1, this.MAX_NUMBER_OF_REGULAR_CANDY), s = 0; s < this.MAX_NUMBER_OF_REGULAR_CANDY; s++) {
            if (!(this.isCellMatchable(t - 2, e, i) && this.isCellMatchable(t - 1, e, i) || this.isCellMatchable(t, e - 2, i) && this.isCellMatchable(t, e - 1, i) || this.isCellMatchable(t - 1, e, i) && this.isCellMatchable(t - 1, e - 1, i) && this.isCellMatchable(t, e - 1, i))) return i;
            i = (i + 1) % this.MAX_NUMBER_OF_REGULAR_CANDY
        }
        return i
    }, G.Board.prototype.shuffleFailure = function () {
        for (var t = 0; t < 24; t++) this.removeCandy(t % 8, Math.floor(t / 8));
        for (t = 0; t < 24; t++) this.boardCandies.newCandy(t % 8, Math.floor(t / 8), game.rnd.between(1, 3).toString())
    }, G.Board.prototype.shuffleCandies = function (r) {
        for (var h = this.boardData.width, l = this.boardData.height, t = 0; 20 < ++t && this.shuffleFailure(), this.boardCandies.grid.loop(function (t, e, i, s) {
            if (t && this.isMoveable(e, i) && !t.goalCandy) {
                for (var a, o, n; a = game.rnd.between(0, h - 1), o = game.rnd.between(0, l - 1), e == a && o == i || (n = s[a][o], !this.isMoveable(a, o) || n.goalCandy););
                r || G.IMMEDIATE ? this.swapCandiesWithPosition(t, n) : this.swapCandies(t, n)
            }
        }, this), 0 == this.matcher.checkPossibleMoves().length;);
        G.sfx.whoosh_short_1.play(), this.boardCandies.grid.loop(function (t, e, i) {
            t && (!r && this.isMoveable(e, i) && t.shuffleMoveToOwnCell(), this.isCellMatchable(e, i) && this.matcher.quickMatchCheck(t) && this.checkMatchList.push(t))
        }, this), 0 < this.checkMatchList.length && this.actionManager.newAction("processMatch")
    }, G.Board.prototype.swapCandiesWithPosition = function (t, e) {
        this.boardCandies.grid.set(t.cellX, t.cellY, e), this.boardCandies.grid.set(e.cellX, e.cellY, t);
        var i = t.cellX,
            s = t.cellY,
            a = t.x,
            o = t.y;
        t.x = e.x, t.y = e.y, t.cellX = e.cellX, t.cellY = e.cellY, e.x = a, e.y = o, e.cellX = i, e.cellY = s
    }, G.Board.prototype.deconstruct = function () {
        this.deconstructing = !0, this.background.x += .5 * this.background.width, this.background.y += .5 * this.background.height, this.background.anchor.setTo(.5), this.glowImg = G.makeImage(0, 0, "popup_lighht", .5, this), this.glowImg.x = this.background.x, this.glowImg.y = this.background.y, this.glowImg.blendMode = 1, game.add.tween(this.glowImg).to({
            angle: 360
        }, 6e3, Phaser.Easing.Linear.None, !0), this.glowImg.alpha = 0, this.wellDoneTxt = new G.Text(0, 0, G.txt("Well done!"), {
            style: "font-red",
            fontSize: 70
        }, .5, 600), G.sfx.music.pause(), G.sfx.lvlcompleted.play(), this.add(this.wellDoneTxt), this.wellDoneTxt.x = this.background.x, this.wellDoneTxt.y = this.background.y, this.wellDoneTxt.visible = !1, game.add.tween(this.boardDirt).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this.boardIce).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this.boardCage).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0), game.time.events.add(200, this.boardCandies.deconstruct, this.boardCandies), game.time.events.add(900, function () {
            game.add.tween(this.background.scale).to({
                x: 0,
                y: 0
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.background).to({
                angle: 70
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0)
        }, this), game.time.events.add(900, function () {
            game.add.tween(this.glowImg).to({
                alpha: .2
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.wellDoneTxt.visible = !0, this.wellDoneTxt.scale.setTo(0), game.add.tween(this.wellDoneTxt.scale).to({
                x: 1,
                y: 1
            }, 500, Phaser.Easing.Elastic.Out, !0)
        }, this), game.time.events.add(2200, function () {
            game.add.tween(this.glowImg).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.wellDoneTxt).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), G.lvl.state.windowLayer.pushWindow("win")
        }, this)
    }, G.BoardActionManager = function (t) {
        this.board = t, this.state = game.state.getCurrentState(), this.actionList = [], this.noAction = !0, this.madeMove = !1, G.sb("madeMove").add(function () {
            this.madeMove = !0
        }, this), this.availableActions = {
            move: G.ActionMove,
            processMatch: G.ActionProcessMatch,
            processFall: G.ActionProcessFall,
            boosterMatch: G.ActionBoosterMatch,
            boosterSwap: G.ActionBoosterSwap,
            shuffle: G.ActionShuffle,
            startBoosterInit: G.ActionStartBoosters
        }, G.sb("onBoosterSelect").add(function (t) {
            1 == t ? this.newAction("boosterSwap") : this.newAction("boosterMatch", t)
        }, this), G.sb("onBoosterDeselect").add(function () {
            1 == this.actionList.length && this.actionList[0].finish()
        }, this), this.noActionFrames = 0, this.shakingCandies = []
    }, G.BoardActionManager.prototype.update = function () {
        0 == this.actionList.length ? (this.noAction = !0, this.noActionFrames++, 160 < this.noActionFrames && (this.noActionFrames = 0, this.glowPossibleMoves()), this.updateShakes()) : (this.noActionFrames = 0, this.noAction = !1, this.actionList[0].update())
    }, G.BoardActionManager.prototype.normalCandies = ["0", "1", "2", "3", "4", "5", "6"], G.BoardActionManager.prototype.updateShakes = function () {
        for (var t = this.shakingCandies.length; t--;) {
            var e = this.shakingCandies[t],
                i = e.candy;
            e.dt += .04, i.x = e.orgX + Math.sin(e.dt * (4 * Math.PI)) * e.wave, 1 <= e.dt && (i.x = e.orgX, i.y = e.orgY, this.shakingCandies.pop())
        }
    }, G.BoardActionManager.prototype.breakShakes = function () {
        this.shakingCandies.forEach(function (t) {
            t.candy.x = t.orgX, t.candy.y = t.orgY
        }), this.shakingCandies = []
    }, G.BoardActionManager.prototype.glowPossibleMoves = function () {
        if (!G.tutorialOpened) {
            var t = this.board.matcher.checkPossibleMoves();
            if (Phaser.ArrayUtils.shuffle(t), 0 != t.length) {
                var e = t[0];
                this.shakeCandy(this.board.getCandy(e[0], e[1])), this.shakeCandy(this.board.getCandy(e[2], e[3]))
            }
        }
    }, G.BoardActionManager.prototype.shakeCandy = function (t) {
        this.shakingCandies.push({
            candy: t,
            orgX: t.x,
            orgY: t.y,
            dt: 0,
            wave: G.l(5)
        })
    }, G.BoardActionManager.prototype.newAction = function (t) {
        this.breakShakes();
        var e = [].slice.call(arguments, 1);
        this.actionList.push(new this.availableActions[t](this.board, this, e))
    }, G.BoardActionManager.prototype.removeAction = function (t) {
        var e = this.actionList.indexOf(t);
        if (-1 != e ? this.actionList.splice(e, 1) : this.actionList.splice(0, 1), 0 == this.actionList.length) {
            if (G.lvl.endCombo(), G.lvl.goalAchieved) {
                if (0 < G.lvl.moves) {
                    var i = this.board.boardCandies.getNormalCandies();
                    Phaser.ArrayUtils.shuffle(i);
                    for (var s = Math.min(G.lvl.moves, i.length, 15), a = 0; a < s; a++) {
                        var o = i[a];
                        o.changeInto(Math.random() < .5 ? "horizontal" : "vertical"), o.activatedByMove = !0, G.lvl.changePointsNumber(G.json.settings.pointsForMoveLeft);
                        var n = G.lvl.state.board.cellToPxOut([o.cellX, o.cellY]);
                        G.sb("displayPoints").dispatch(n[0], n[1], G.json.settings.pointsForMoveLeft), G.lvl.madeMove(), this.board.checkSpecialMatchList.push(o)
                    }
                    return G.sfx.booster.play(), void game.time.events.add(800, function () {
                        this.newAction("processMatch")
                    }, this)
                }
                var r = this.board.boardCandies.getAllSpecialCandies();
                if (!(0 < r.length)) return G.sb("onWinLevelPopUp").dispatch(), "CHALLENGE" == this.state.mode && (G.saveState.data.dailyBeaten || (G.saveState.data.dailyBeaten = 0), G.saveState.data.dailyBeaten++), this.board.deconstruct();
                r.forEach(function (t) {
                    t.activatedByMove = !0, this.board.checkSpecialMatchList.push(t)
                }, this), G.IMMEDIATE ? this.newAction("processMatch") : game.time.events.add(G.IMMEDIATE ? 1 : 300, function () {
                    this.newAction("processMatch")
                }, this)
            }
            if (this.board.possibleMoves = this.possibleMoves = this.board.matcher.checkPossibleMoves(), 0 == this.possibleMoves.length) return this.newAction("shuffle");
            0 == G.lvl.moves && (G.lvl.isGoalAchieved() || (game.incentivised ? G.lvl.state.windowLayer.pushWindow("outOfMoves") : G.saveState.getCoins() >= 2 * G.lvl.getPriceOfExtraMoves() ? G.lvl.state.windowLayer.pushWindow("outOfMoves") : G.lvl.state.windowLayer.pushWindow("levelFailed"))), G.sb("actionQueueEmpty").dispatch(), this.madeMove && (this.madeMove = !1, G.sb("actionQueueEmptyAfterMove").dispatch())
        }
    }, G.BoardBackground = function (t) {
        Phaser.Group.call(this, game), this.board = t, this.borderSize = G.l(8), this.renderTexture = game.add.renderTexture(1, 1), this.markerImg = game.make.image(), this.markerImg.anchor.setTo(.5)
    }, G.BoardBackground.prototype = Object.create(Phaser.Group.prototype), G.BoardBackground.prototype.redraw = function () {
        this.renderTexture.resize((this.board.boardData.width + 2) * this.board.tilesize, (this.board.boardData.height + 2) * this.board.tilesize, !0), this.renderTexture.clear(), this.drawBg()
    }, G.BoardBackground.prototype.drawBg = function () {
        this.board.tilesize;
        for (var t = -1; t < this.board.boardData.width + 1; t++)
            for (var e = -1; e < this.board.boardData.height + 1; e++) {
                var i = this.checkIfTile(t, e),
                    s = this.checkIfTile(t, e - 1),
                    a = this.checkIfTile(t, e + 1),
                    o = this.checkIfTile(t - 1, e),
                    n = this.checkIfTile(t + 1, e),
                    r = this.checkIfTile(t + 1, e - 1),
                    h = this.checkIfTile(t - 1, e - 1),
                    l = this.checkIfTile(t + 1, e + 1),
                    d = this.checkIfTile(t - 1, e + 1);
                i ? this.drawSprite(t, e, "tile_" + (1 + (t % 2 + e % 2) % 2), 0) : (s && this.drawSprite(t, e, "tile_border_straight", 180), a && this.drawSprite(t, e, "tile_border_straight", 0), o && this.drawSprite(t, e, "tile_border_straight", 90), n && this.drawSprite(t, e, "tile_border_straight", 270), !l || n || a || this.drawSprite(t, e, "tile_border_outside_corner", 0), !d || o || a || this.drawSprite(t, e, "tile_border_outside_corner", 90), !r || n || s || this.drawSprite(t, e, "tile_border_outside_corner", 270), !h || o || s || this.drawSprite(t, e, "tile_border_outside_corner", 180), a && n && this.drawSprite(t, e, "tile_border_inside_corner", 0), a && o && this.drawSprite(t, e, "tile_border_inside_corner", 90), s && n && this.drawSprite(t, e, "tile_border_inside_corner", 270), s && o && this.drawSprite(t, e, "tile_border_inside_corner", 180))
            }
    }, G.BoardBackground.prototype.drawSprite = function (t, e, i, s) {
        var a = t * this.board.tilesize,
            o = e * this.board.tilesize;
        this.markerImg.angle = s || 0, G.changeTexture(this.markerImg, i), this.markerImg.updateTransform(), this.renderTexture.renderXY(this.markerImg, a + 1.5 * this.board.tilesize, o + 1.5 * this.board.tilesize)
    }, G.BoardBackground.prototype.checkIfTile = function (t, e) {
        var i = this.board.boardData.get(t, e);
        return !1 !== i && "X" !== i
    }, G.BoardCandies = function (t, e) {
        Phaser.Group.call(this, game), this.board = t, this.position = t.position, this.scale = t.scale, this.boardData = e, this.grid = new G.GridArray(this.boardData.width, this.boardData.height, !1), this.deadGroup = game.add.group(), this.deadGroup.visible = !1, this.firstFloor = game.add.group(), this.secondFloor = game.add.group(), this.collectCells = t.collectCells, this.boardCollectCells = new G.BoardCollectCells(t, this.collectCells), t.boardCollectCells = this.boardCollectCells, this.fxGroup = new G.TopFxLayer(this.board), this.boosterFxGroup = game.add.group(), this.thirdFloor = game.add.group(), this.fxTopGroup = this.fxGroup.aboveThirdFloorLayer = game.add.group(), G.IMMEDIATE && (this.deadGroup.visible = this.firstFloor.visible = this.secondFloor.visible = this.fxGroup.visible = this.thirdFloor.visible = this.fxTopGroup.visible = !1), this.firstFloor.position = this.secondFloor.position = this.fxGroup.position = this.fxTopGroup.position = this.boosterFxGroup.position = this.thirdFloor.position = this.position, this.firstFloor.scale = this.secondFloor.scale = this.fxGroup.scale = this.fxTopGroup.scale = this.boosterFxGroup.scale = this.thirdFloor.scale = this.scale, this.infectionSources = [], this.infectionSuperSources = [], this.infectionCoords = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, -1],
            [-1, -1],
            [-1, -1],
            [1, -1],
            [1, 1]
        ], G.sb("onCandyInfect").add(function (t) {
            this.addInfectionSource(t, this.infectionSources)
        }, this), G.sb("onCandyInfectionRemove").add(function (t) {
            this.removeInfectionSource(t, this.infectionSources)
        }, this), this.removedInfectionSource = !1, this.infectionToMakeStep = 0, G.sb("actionQueueEmptyAfterMove").add(function () {
            this.removedInfectionSource || 0 < this.infectionSuperSources.length && (this.spreadInfection(this.infectionSuperSources) || this.spreadInfection(this.infectionSources));
            this.removedInfectionSource = !1
        }, this)
    }, G.BoardCandies.prototype = Object.create(Phaser.Group.prototype), G.BoardCandies.prototype.onMatch = function (t, e, i, s, a) {
        var o = this.getCandy(t, e);
        return o && o.match(i, s, a), !0
    }, G.BoardCandies.prototype.onHit = function (t, e) {
        var i = this.getCandy(t, e);
        return i && i.hit(), !0
    }, G.BoardCandies.prototype.isMoveBlocked = function (t, e) {
        return !1
    }, G.BoardCandies.prototype.isMatchBlocked = function (t, e) {
        var i = this.getCandy(t, e);
        return !!i && (!i.matchable || i.falling || i.goalCandy || i.chocolate)
    }, G.BoardCandies.prototype.isBoosterChangeBlocked = function (t, e) {
        var i = this.getCandy(t, e);
        return !!i && (i.special || i.wrapped || i.infected)
    }, G.BoardCandies.prototype.import = function (t, e, i) {
        var s = i.indexOf(":");
        s = -1 == s ? i.length : s;
        var a = this.newCandy(t, e, i.slice(0, s)),
            o = i.slice(s); - 1 !== o.indexOf("W") && a.wrap(), -1 !== o.indexOf("B") && a.changeIntoBlocker(o[2]), -1 !== o.indexOf("I") && a.infect(), -1 !== o.indexOf("H") && a.changeInto("horizontal", !0), -1 !== o.indexOf("V") && a.changeInto("vertical", !0), -1 !== o.indexOf("S") && a.changeInto("spiral", !0), -1 !== o.indexOf("C") && a.changeInto("cross", !0)
    }, G.BoardCandies.prototype.export = function (t, e) {
        var i = this.getCandy(t, e);
        return !(!i || i.blocker) && (i.wrapped ? "W" + i.candyType : i.chocolate ? "c" + i.hp : i.candyType)
    }, G.BoardCandies.prototype.spreadInfection = function (t) {
        if (0 != t.length) {
            Phaser.ArrayUtils.shuffle(t);
            for (var e = game.rnd.pick(t), i = 0, s = this.infectionCoords.length; i < s; i++) {
                var a = this.infectionCoords[i],
                    o = e.cellX + a[0],
                    n = e.cellY + a[1],
                    r = this.getCandy(o, n);
                if (r && (this.board.isMoveable(o, n) && this.board.isCellMatchable(o, n) && !r.wrapped && !r.infected && !r.special)) return r.infect(), !0
            }
            return !1
        }
    }, G.BoardCandies.prototype.getRandom = function () {
        var t, e = this.firstFloor.children.concat(this.secondFloor.children),
            i = e.length,
            s = game.rnd.between(0, i);
        if (0 == i) return !1;
        for (var a = 0; a < i; a++)
            if (t = e[(a + s) % i], this.grid.get(t.cellX, t.cellY) == t && t && t.alive && !t.goalCandy && this.board.isCellMatchable(t.cellX, t.cellY)) return t;
        return !1
    }, G.BoardCandies.prototype.getRandomNormal = function () {
        var t, e = this.firstFloor.children.concat(this.secondFloor.children),
            i = e.length,
            s = game.rnd.between(0, i);
        if (0 == i) return !1;
        for (var a = 0; a < i; a++)
            if (t = e[(a + s) % i], this.grid.get(t.cellX, t.cellY) == t && t && !t.special && !t.chocolate && !t.wrapped && t.alive && !t.goalCandy && this.board.isCellMatchable(t.cellX, t.cellY) && this.board.isMoveable(t.cellX, t.cellY)) return t;
        return !1
    }, G.BoardCandies.prototype.getNormalCandies = function () {
        var t, e = this.firstFloor.children.concat(this.secondFloor.children),
            i = e.length,
            s = game.rnd.between(0, i),
            a = [];
        if (0 == i) return !1;
        for (var o = 0; o < i; o++) t = e[(o + s) % i], this.grid.get(t.cellX, t.cellY) == t && t && !t.special && !t.chocolate && !t.wrapped && t.alive && !t.goalCandy && this.board.isCellMatchable(t.cellX, t.cellY) && this.board.isMoveable(t.cellX, t.cellY) && a.push(t);
        return a
    }, G.BoardCandies.prototype.moveTo = function (t, e) {
        this.x = t, this.y = e
    }, G.BoardCandies.prototype.isSpaceFree = function (t, e) {
        return !this.grid.get(t, e)
    }, G.BoardCandies.prototype.gridMoveFromTo = function (t, e, i, s) {
        this.grid.set(i, s, this.grid.get(t, e)), this.grid.set(t, e, null)
    }, G.BoardCandies.prototype.newCandy = function (t, e, i) {
        var s = this.deadGroup.children[0] ? this.deadGroup.children[0] : new G.Candy(this.board, this.grid);
        return this.firstFloor.add(s), void 0 !== i && i.indexOf && -1 !== i.indexOf("CHAIN") ? (s.init(t, e, i.slice(-1)), s.wrap()) : s.init(t, e, i || game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY)), this.grid.set(t, e, s), "infection" == i && (s.matchable = !1, this.addInfectionSource(s, this.infectionSuperSources)), "chest" == i && (s.matchable = !1), s
    }, G.BoardCandies.prototype.getCandy = function (t, e) {
        return this.grid.get(t, e)
    }, G.BoardCandies.prototype.swapCandies = function (t, e) {
        this.grid.set(t.cellX, t.cellY, e), this.grid.set(e.cellX, e.cellY, t);
        var i = t.cellX,
            s = t.cellY;
        t.cellX = e.cellX, t.cellY = e.cellY, e.cellX = i, e.cellY = s
    }, G.BoardCandies.prototype.removeCandy = function () {
        var t, e = !1;
        e = "object" == typeof arguments[0] ? (t = Array.isArray(arguments[0]) ? this.getCandy(arguments[0][0], arguments[0][1]) : arguments[0], arguments[1]) : (t = this.getCandy(arguments[0], arguments[1]), arguments[2]), t && (this.removeInfectionSource(t, this.infectionSuperSources), this.grid.set(t.cellX, t.cellY, !1), e || G.sb("onCollectableRemove").dispatch(t.candyType, !t.specialType && t), t.kill(), this.deadGroup.add(t))
    }, G.BoardCandies.prototype.removeToken = G.BoardCandies.prototype.removeCandy, G.BoardCandies.prototype.destroyCell = G.BoardCandies.prototype.removeCandy, G.BoardCandies.prototype.addInfectionSource = function (t, e) {
        -1 === e.indexOf(t) && e.push(t)
    }, G.BoardCandies.prototype.removeInfectionSource = function (t, e) {
        var i = e.indexOf(t); - 1 !== i && (e.splice(i, 1), this.removedInfectionSource = !0)
    }, G.BoardCandies.prototype.consoleInfectionSources = function () {
        for (var t = 0; t < this.infectionSources.length; t++) console.log("INFECTION SOURCE: " + this.infectionSources[t].cellX + "x" + this.infectionSources[t].cellY)
    }, G.BoardCandies.prototype.getAllSpecialCandies = function () {
        var s = [];
        return this.grid.loop(function (t, e, i) {
            t && t.special && s.push(t)
        }), s
    }, G.BoardCandies.prototype.deconstruct = function () {
        for (var t = 0, e = 0; e <= 14; e++) {
            for (var i = 0, s = e; 0 <= s; s--) this.grid.get(i, s) && (t1 = game.add.tween(this.grid.get(i, s).scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Sinusoidal.InOut, !0, t)), i++;
            t += 40
        }
    }, G.BoardCandies.prototype.areCandiesNeighbours = function (t, e) {
        return !(!t || !e) && Math.abs(t.cellX - e.cellX) + Math.abs(t.cellY - e.cellY) == 1
    }, G.BoardCollectCells = function (t, e) {
        Phaser.Group.call(this, game), this.board = t, this.position = t.position, this.scale = t.scale, this.ccs = [], e && this.init(e)
    }, G.BoardCollectCells.prototype = Object.create(Phaser.Group.prototype), G.BoardCollectCells.prototype.init = function (t) {
        t.forEach(function (t) {
            this.addCC(t)
        }, this), G.sb("onCollectableTaskFinished").add(function (t) {
            "goalCandy" === t && this.hide()
        }), G.sb("onGoalAchieved").add(this.hide, this)
    }, G.BoardCollectCells.prototype.hide = function () {
        1 === this.alpha && game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0)
    }, G.BoardCollectCells.prototype.addCC = function (t) {
        var e = t.x * this.board.tilesize,
            i = t.y * this.board.tilesize,
            s = G.makeImage(e, i, "collect_cell", 0, this);
        s.cellX = t.x, s.cellY = t.y, this.ccs.push(s)
    }, G.BoardCollectCells.prototype.editorChangeCC = function (e, i) {
        var t = this.ccs.find(function (t) {
            return t.cellX === e && t.cellY === i
        });
        t ? (t.destroy(), this.ccs.splice(this.ccs.indexOf(t), 1)) : this.addCC({
            x: e,
            y: i
        }), G.lvlData.collectCells = this.editorExport()
    }, G.BoardCollectCells.prototype.editorExport = function () {
        return 0 === this.ccs.length ? null : this.ccs.map(function (t) {
            return {
                x: t.cellX,
                y: t.cellY
            }
        })
    }, G.BoardMatcher = function (t) {
        this.board = t, this.specialsCoordinates = G.specialCandies.patterns, this.grid = new G.GridArray(this.board.boardData.width, this.board.boardData.height, !1), this.grid.set = function (t, e, i) {
            return !!this.isInGrid(t, e) && (this.data[t][e] ? "m" == this.data[t][e] && "m" != i ? this.data[t][e] = i : void 0 : this.data[t][e] = i)
        }, this.tempGrid = new G.GridArray(this.board.boardData.width, this.board.boardData.height, !1), this.hitGrid = new G.GridArray(this.board.boardData.width, this.board.boardData.height, !1), this.toCheck = []
    }, G.BoardMatcher.prototype.isMoveValid = function (t) {
        var e = t.cellX,
            i = t.cellY;
        return !!this.board.isCellMatchable(e, i) && (!(!t.special || !t.activatedByMove) || (!!this.quickCheckCoords(t, this.horCoords, !1) || !!this.quickCheckCoords(t, this.verCoords, !1)))
    }, G.BoardMatcher.prototype.quickMatchCheck = function (t) {
        if (!t) return !1;
        var e = t.cellX,
            i = t.cellY;
        return !!this.board.isCellMatchable(e, i) && (!!this.quickCheckCoords(t, this.horCoords, !1) || !!this.quickCheckCoords(t, this.verCoords, !1))
    }, G.BoardMatcher.prototype.checkPossibleMoves = function () {
        var s = [];
        return this.board.boardCandies.grid.loop(function (t, e, i) {
            t && this.board.isMoveable(t.cellX, t.cellY) && this.board.isCellMatchable(t.cellX, t.cellY) && (t && this.board.isMoveable(e + 1, i) && this.quickCheckCoords(t, this.possibleRightMoves, !1) && s.push([e, i, e + 1, i]), t && this.board.isMoveable(e - 1, i) && this.quickCheckCoords(t, this.possibleLeftMoves, !1) && s.push([e, i, e - 1, i]), t && this.board.isMoveable(e, i - 1) && this.quickCheckCoords(t, this.possibleUpMoves, !1) && s.push([e, i, e, i - 1]), t && this.board.isMoveable(e, i + 1) && this.quickCheckCoords(t, this.possibleDownMoves, !1) && s.push([e, i, e, i + 1]))
        }, this), s
    }, G.BoardMatcher.prototype.quickCheckCoords = function (t, e, i) {
        for (var s, a, o = t.cellX, n = t.cellY, r = t.candyType, h = 0, l = e.length; h < l; h++) {
            a = !0;
            for (var d = 0, c = (s = e[h]).length; d < c; d += 2)
                if (!this.board.isCellMatchable(o + s[d], n + s[d + 1], r)) {
                    a = !1;
                    break
                } if (i && !a) return !1;
            if (!i && a) return !0
        }
        return !!i
    }, G.BoardMatcher.prototype.processMatchList = function () {
        if (0 != this.board.checkMatchList.length || 0 != this.board.checkSpecialMatchList.length) {
            G.lvl.increaseCombo(), G.sfx["match_" + game.math.clamp(G.lvl.combo || 1, 1, 5)].play(), this.candiesToProcess = this.board.checkMatchList, this.specialCandiesToProcess = this.board.checkSpecialMatchList;
            for (var t = 0, e = this.candiesToProcess.length; t < e; t++) this.grid.get(this.candiesToProcess[t].cellX, this.candiesToProcess[t].cellY) || (this.candiesToProcess[t].special && this.candiesToProcess[t].activatedByMove ? this.specialCandiesToProcess.push(this.candiesToProcess[t]) : this.processTemp(this.candiesToProcess[t]));
            this.inflateHitGrid();
            for (var i = 0; i < this.specialCandiesToProcess.length; i++) this.processTempSpecial(this.specialCandiesToProcess[i]);
            this.processGrid(), this.processHitGrid(), this.board.checkMatchList = [], this.board.checkSpecialMatchList = [], this.grid.clear(), this.hitGrid.clear()
        }
    }, G.BoardMatcher.prototype.inflateHitGrid = function () {
        this.grid.loop(function (t, e, i) {
            t && (this.hitGrid.set(e - 1, i, "h"), this.hitGrid.set(e + 1, i, "h"), this.hitGrid.set(e, i - 1, "h"), this.hitGrid.set(e, i + 1, "h"))
        }, this)
    }, G.BoardMatcher.prototype.processHitGrid = function () {
        this.hitGrid.loop(function (t, e, i) {
            t && this.board.hitCell(e, i)
        }, this)
    }, G.BoardMatcher.prototype.processGrid = function () {
        this.grid.loop(function (t, e, i) {
            t && ("m" == t ? this.board.matchCell(e, i) : ("change" == t[0] && (this.board.getCandy(e, i) && this.board.getCandy(e, i).changeInto(t[1]), this.board.matchCellExceptCandy(e, i)), "match-move" == t[0] && this.board.matchCell(e, i, t[1], t[2], t[3])))
        }, this)
    }, G.BoardMatcher.prototype.processTempSpecial = function (t) {
        for (var e, i = 0, s = t.exe.length; i < s; i++) "loop" == (e = t.exe[i])[0] && this.processSpecialExeLoop(t, e[1]), "specific" == e[0] && this.processSpecialExeSpecific(t, e[1]), "matchType" == e[0] && this.processSpecialExeMatchType(t, e[1]), "changeTypeInto" == e[0] && this.processSpecialExeChangeTypeInto(t, e[1], e[2]), "perform" == e[0] && this.processSpecialExePerform(t, e[1]), "superSpiral" == e[0] && this.processSpecialExeSuperSpiral(t, e[1]);
        this.copyTempGridToMatchGrid()
    }, G.BoardMatcher.prototype.processSpecialExeLoop = function (t, e) {
        G.sfx.line.play();
        for (var i = t.cellX, s = t.cellY; this.board.isCellInBoardArea(i, s);) this.tempCheckAndMark(i, s), i += e.x, s += e.y
    }, G.BoardMatcher.prototype.processSpecialExePerform = function (t, e) {
        t[e]()
    }, G.BoardMatcher.prototype.processSpecialExeSpecific = function (t, e) {
        G.sfx.boom.play();
        var i, s, a = t.cellX,
            o = t.cellY;
        G.sb("fx").dispatch("explosion", t);
        for (var n = 0, r = e.length; n < r; n += 2) i = a + e[n], s = o + e[n + 1], this.tempCheckAndMark(i, s)
    }, G.BoardMatcher.prototype.processSpecialExeMatchType = function (s, a) {
        G.sfx.lightning.play(), "LASTMOVEDWITH" == a && (a = s.lastMovedWith ? s.lastMovedWith.candyType : game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY)), "CANDYTYPE" == a && (a = s.candyType), this.board.getCandy(s.cellX, s.cellY) == s && this.tempGrid.set(s.cellX, s.cellY, "m"), this.board.boardCandies.grid.loop(function (t, e, i) {
            t && t.candyType == a && this.tempCheckAndMark(e, i, !0) && G.sb("fx").dispatch("lightning", s, [e, i])
        }, this)
    }, G.BoardMatcher.prototype.processSpecialExeChangeTypeInto = function (s, a, o) {
        "CANDYTYPE" == a && (a = s.candyType), "SPECIALLASTMOVED" == o && (o = s.lastMovedWith.specialType), this.board.getCandy(s.cellX, s.cellY) == s && this.tempGrid.set(s.cellX, s.cellY, "m"), this.board.boardCandies.grid.loop(function (t, e, i) {
            t && t.candyType == a && !t.special && t !== s && this.board.isCellMatchable(e, i) && this.board.isMoveable(e, i) && (this.board.checkAfterFall.push(t), t.changeInto(o), G.sb("fx").dispatch("lightning", s, [e, i]))
        }, this)
    }, G.BoardMatcher.prototype.processSpecialExeSuperSpiral = function (t) {
        this.board.boardData.loop(function (t, e, i) {
            this.board.isCellOnBoard(e, i) && this.tempCheckAndMark(e, i)
        }, this)
    }, G.BoardMatcher.prototype.tempCheckAndMark = function (t, e, i) {
        return i || this.hitGrid.set(t, e, !0), !(!this.board.isCellMatchable(t, e) || this.grid.get(t, e)) && (candy = this.board.getCandy(t, e), candy.special ? (this.specialCandiesToProcess.push(candy), this.tempGrid.set(t, e, "mSpecial")) : this.tempGrid.set(t, e, "m"), this.hitGrid.set(t, e, !0), !0)
    }, G.BoardMatcher.prototype.processTemp = function (t) {
        for (var e, i, s, a, o, n = [t], r = 0; r < n.length; r++) {
            e = n[r], [], s = this.getHorizontalMatchPos(e, this.quickCheckCoords(e, this.horCoords, !1)), a = this.getVerticalMatchPos(e, this.quickCheckCoords(e, this.verCoords, !1));
            for (var h = 0, l = (o = [].concat(s, a)).length; h < l; h += 2) i = this.board.getCandy(o[h], o[h + 1]), -1 == n.indexOf(i) && n.push(i)
        }
        n.forEach(function (t) {
            t.special ? (this.tempGrid.set(t.cellX, t.cellY, "m"), this.specialCandiesToProcess.push(t)) : this.tempGrid.set(t.cellX, t.cellY, "m")
        }, this), this.searchAndProcessSpecialsInTemp(n[0]), this.copyTempGridToMatchGrid()
    }, G.BoardMatcher.prototype.copyTempGridToMatchGrid = function () {
        var a = 0,
            o = 0,
            n = 0,
            r = [],
            t = !1;
        this.tempGrid.loop(function (t, e, i) {
            if (t) {
                a++, o += e, n += i;
                var s = this.board.getCandy(e, i);
                s && -1 === r.indexOf(s.candyType.toString()) && r.push(s.candyType.toString()), "mSpecial" == t ? this.grid.set(e, i, "m") : this.grid.set(e, i, t)
            }
        }, this), 1 == r.length && (t = r[0]), 0 < a && G.lvl.processMatch(a, o / a, n / a, t), this.tempGrid.clear()
    }, G.BoardMatcher.prototype.searchAndProcessSpecialsInTemp = function (t) {
        for (; ;) {
            for (var e = 0, i = this.specialsCoordinates.length; e < i; e++)
                for (var s = 0, a = this.specialsCoordinates[e][1].length; s < a; s++) {
                    var o = this.tempGrid.findPattern(this.specialsCoordinates[e][1][s], "m");
                    o && this.pushSpecialToTempGrid(o, this.specialsCoordinates[e][0], t) && s--
                }
            break
        }
    }, G.BoardMatcher.prototype.pushSpecialToTempGrid = function (t, e, i) {
        var s, a = !1,
            o = t.length,
            n = ["change", e],
            r = t[0],
            h = t[1],
            l = !1;
        if (i)
            for (s = 0; s < o; s += 2) {
                this.board.getCandy(t[s], t[s + 1]);
                if (t[s] == i.cellX && t[s + 1] == i.cellY && !this.board.isBoosterChangeBlocked(t[s], t[s + 1])) {
                    a = !0, r = t[s], h = t[s + 1], this.tempGrid.set(t[s], t[s + 1], n), l = !0;
                    break
                }
            }
        for (s = 0; s < o; s += 2) 0 != s || a || this.board.isBoosterChangeBlocked(t[s], t[s + 1]) ? this.tempGrid.get(t[s], t[s + 1]) == n || this.board.getCandy(t[s], t[s + 1]).wrapped || this.board.boardCage.isToken(t[s], t[s + 1]) || (this.tempGrid.set(t[s], t[s + 1], ["match-move", 0, r, h]), l = !0) : (this.tempGrid.set(t[s], t[s + 1], n), l = !0);
        return l
    }, G.BoardMatcher.prototype.getHorizontalMatchPos = function (t, e) {
        var i = [],
            s = (t.cellX, t.cellY);
        if (!e) return i;
        var a = t.cellX,
            o = t.cellX;
        for (i.push(t.cellX, t.cellY); this.board.isCellMatchable(--a, s, t.candyType) && !this.grid.get(a, s);) i.push(a, s);
        for (; this.board.isCellMatchable(++o, s, t.candyType) && !this.grid.get(o, s);) i.push(o, s);
        return i
    }, G.BoardMatcher.prototype.getVerticalMatchPos = function (t, e) {
        var i = [],
            s = t.cellX,
            a = t.cellY;
        if (!e) return i;
        var o = a,
            n = a;
        for (i.push(t.cellX, t.cellY); this.board.isCellMatchable(s, --o, t.candyType) && !this.grid.get(s, o);) i.push(s, o);
        for (; this.board.isCellMatchable(s, ++n, t.candyType) && !this.grid.get(s, n);) i.push(s, n);
        return i
    }, G.BoardMatcher.prototype.getBirdMatchPos = function (t) {
        for (var e = [], i = t.cellX, s = t.cellY, a = 0; a < 4; a++) this.board.isCellMatchable(i + this.birdCoords[a][0], s + this.birdCoords[a][1], t.candyType) && this.board.isCellMatchable(i + this.birdCoords[a][2], s + this.birdCoords[a][3], t.candyType) && this.board.isCellMatchable(i + this.birdCoords[a][4], s + this.birdCoords[a][5], t.candyType) && e.push(i + this.birdCoords[a][0], s + this.birdCoords[a][1], i + this.birdCoords[a][2], s + this.birdCoords[a][3], i + this.birdCoords[a][4], s + this.birdCoords[a][5]);
        return e
    }, G.BoardMatcher.prototype.possibleDownMoves = [
        [-1, 1, 1, 1],
        [1, 1, 2, 1],
        [-2, 1, -1, 1],
        [0, 2, 0, 3]
    ], G.BoardMatcher.prototype.possibleRightMoves = [
        [2, 0, 3, 0],
        [1, 1, 1, 2],
        [1, -1, 1, 1],
        [1, -2, 1, -1]
    ], G.BoardMatcher.prototype.possibleLeftMoves = [
        [-3, 0, -2, 0],
        [-1, -2, -1, -1],
        [-1, -1, -1, 1],
        [-1, 1, -1, 2]
    ], G.BoardMatcher.prototype.possibleUpMoves = [
        [-1, -1, 1, -1],
        [1, -1, 2, -1],
        [-2, -1, -1, -1],
        [0, -3, 0, -2]
    ], G.BoardMatcher.prototype.horCoords = [
        [-1, 0, 1, 0],
        [-2, 0, -1, 0],
        [1, 0, 2, 0]
    ], G.BoardMatcher.prototype.verCoords = [
        [0, -1, 0, 1],
        [0, -1, 0, -2],
        [0, 1, 0, 2]
    ], G.BoardMatcher.prototype.birdCoords = [
        [-1, -1, -1, 0, 0, -1],
        [1, 0, 0, -1, 1, -1],
        [-1, 0, -1, 1, 0, 1],
        [1, 0, 0, 1, 1, 1]
    ], G.Candy = function (t, e) {
        this.grid = e, this.board = t, this.boardCandies = t.boardCandies, Phaser.Image.call(this, game, 0, 0), this.anchor.setTo(.5), this.wrapperImg = G.makeImage(0, 0, "blocker_chain_wrapped", .5, null), this.anchor.setTo(.5, .5), this.animationData = {
            active: !1
        }, this.fallData = {
            alpha0: this.board.cellYToPxIn(-1),
            alpha1: this.board.cellYToPxIn(0),
            alphaDistance: Math.abs(this.board.cellYToPxIn(-1) - this.board.cellYToPxIn(0)),
            active: !1,
            delay: 0,
            targetY: 0,
            targetX: 0,
            velY: 0,
            grav: G.lnf(2.5)
        }, this.kill()
    }, G.Candy.prototype = Object.create(Phaser.Image.prototype), G.Candy.prototype.init = function (t, e, i) {
        this.loadTexture(null), this.scale.setTo(1), this.candyType = !1, this.special = !1, this.specialType = !1, this.animationData.active = !1, this.fallData.active = !1, this.alpha = 1, this.angle = 0, this.scale.setTo(1), this.revive(), this.onMatchFx = !1, this.activatedByMove = !1, this.exe = [], this.matchable = !0, this.goalCandy = !1, this.blocker = !1, this.blockerHp = 0, this.wrapped = !1, this.infected = !1, this.chocolate = !1, this.cellX = t, this.cellY = e, this.x = this.board.cellXToPxIn(t), this.y = this.board.cellYToPxIn(e), this.changeInto(i, !0)
    }, G.Candy.prototype.fallTo = function (t, e, i) {
        this.setCell(t, e), this.fallData.active || G.sb("onCandyFallStart").dispatch(this), this.fallData.active = !0, this.fallData.delay = i || 0, this.fallData.velY = G.IMMEDIATE ? 1e3 : 0, this.fallData.targetY = this.board.cellYToPxIn(e), this.fallData.targetX = this.board.cellXToPxIn(t)
    }, G.Candy.prototype.fallFrom = function (t, e) {
        G.sb("onCandyFallStart").dispatch(this), this.y = this.board.cellYToPxIn(t), this.fallData.active = !0, this.fallData.delay = e || 0, this.fallData.velY = 0, this.fallData.targetX = this.board.cellXToPxIn(this.cellX), this.fallData.targetY = this.board.cellYToPxIn(this.cellY)
    }, G.Candy.prototype.movedWith = function (t) {
        this.lastMovedWith = t
    }, G.Candy.prototype.changeInto = function (t, e) {
        if (this.bringToTop(), G.specialCandies.isTypeSpecial(t)) {
            e || G.sb("fx").dispatch("changeCircle", this);
            var i = G.specialCandies.getSpecialData(t);
            this.special = !0, i.texture && (this.boardCandies.secondFloor.add(this), G.changeTexture(this, i.texture.replace("%CANDYTYPE%", this.candyType))), i.candyType && ("RANDOM" == i.candyType ? this.candyType = Math.random() : this.candyType = i.candyType), i.onMatchFx && (this.onMatchFx = i.onMatchFx.slice()), i.specialType && (this.specialType = i.specialType), G.sb("onCandyChangedIntoSpecial").dispatch(this.specialType), i.activatedByMove && (this.activatedByMove = !0), i.exe && (this.exe = i.exe.slice()), i.specialInit && this["changeInto" + G.capitalize(t)]()
        } else G.changeTexture(this, "candy_" + t), this.candyType = t, this.boardCandies.firstFloor.add(this); - 1 !== G.json.specialCandies.goalCandies.indexOf(this.candyType) && (this.matchable = !1, this.goalCandy = !0)
    }, G.Candy.prototype.changeIntoBlocker = function (t) {
        this.blocker = !0, this.blockerHp = t, G.changeTexture(this, "candy_blocker_" + t), this.matchable = !1
    }, G.Candy.prototype.removeBlocker = function () {
        this.blocker = !1, G.changeTexture(this, "candy_" + this.candyType), this.matchable = !0
    }, G.Candy.prototype.prepareToProcess = function () {
        this.startAnimation("biggerAndExplode")
    }, G.Candy.prototype.wrap = function () {
        this.wrapped = !0, this.wrapperImg.alpha = 1, this.wrapperImg.scale.setTo(1), G.changeTexture(this.wrapperImg, "blocker_chain_wrapped"), this.addChild(this.wrapperImg)
    }, G.Candy.prototype.unwrap = function () {
        G.sfx.brick_break.play(), G.sb("onCollectableRemove").dispatch("chain", this), game.add.tween(this.wrapperImg).to({
            width: 1.5 * this.wrapperImg.width,
            height: 1.5 * this.wrapperImg.height,
            alpha: 0
        }, 1e3, Phaser.Easing.Cubic.Out, !0).onComplete.add(function () {
            this.removeChild(this.wrapperImg)
        }, this), G.sb("fx").dispatch("changeCircle", this), G.sb("fxTop").dispatch("burstChainAnim", this, this), G.sfx.chain_rattle.play(), this.wrapped = !1, this.board.pushToFallCheckList(this)
    }, G.Candy.prototype.coverWithChocolate = function () {
        this.chocolateHp = 2, this.chocolate = !0
    }, G.Candy.prototype.hitChocolate = function () {
        G.sb("fx").dispatch("changeCircle", this), G.sb("fx").dispatch("chocolatePart", this), G.sb("fx").dispatch("chocolatePart", this), G.sb("fx").dispatch("chocolatePart", this), G.sb("fx").dispatch("chocolatePart", this), G.sfx.explosion_subtle.play(), 1 == --this.chocolateHp || (this.chocolate = !1, this.board.fallCheckList.push(this))
    }, G.Candy.prototype.detachFromGrid = function () {
        this.boardCandies.grid.set(this.cellX, this.cellY, null)
    }, G.Candy.prototype.hit = function () {
        this.blocker && (this.blockerHp--, 0 === this.blockerHp ? (this.candyType = "blocker", this.remove()) : G.changeTexture(this, "candy_blocker_" + this.blockerHp)), "infection" == this.candyType && (G.sb("fxTop").dispatch("burstInfectionAnim", this, this), this.remove()), "chest" == this.candyType && (G.sb("onChestOpen").dispatch(this), this.remove()), this.chocolate && this.hitChocolate()
    }, G.Candy.prototype.update = function () {
        this.updateFall(), this.updateAnimation(), this.chainAttachement && (this.chainAttachement.x = this.x, this.chainAttachement.y = this.y)
    }, G.Candy.prototype.updateFall = function () {
        if (this.fallData.active) {
            if (0 < this.fallData.delay) return this.fallData.delay -= 1 * G.deltaTime;
            this.fallData.velY += this.fallData.grav * G.deltaTime, this.y += this.fallData.velY * G.deltaTime, this.y < this.fallData.alpha1 ? this.y < this.fallData.alpha0 ? this.alpha = 0 : this.alpha = Math.abs(this.fallData.alpha0 - this.y) / this.fallData.alphaDistance : this.alpha = 1;
            var t = this.fallData.targetX - this.x,
                e = this.fallData.targetY - this.y;
            Math.abs(t) > e && (this.x = this.fallData.targetX - e * game.math.sign(t)), this.y > this.fallData.targetY && (this.y = this.fallData.targetY, this.x = this.fallData.targetX, this.fallData.active = !1, this.startAnimation("bounce"), G.sfx["stone_impact_" + game.rnd.between(1, 3)].play(), G.sb("onCandyFallFinish").dispatch(this))
        }
    }, G.Candy.prototype.setCell = function (t, e) {
        this.grid.get(this.cellX, this.cellY) == this && this.grid.set(this.cellX, this.cellY, null), this.cellX = t, this.cellY = e, this.grid.set(t, e, this)
    }, G.Candy.prototype.isGoalCandy = function () {
        return -1 != this.boardCandies.goalCandies.indexOf(this)
    }, G.Candy.prototype.infect = function () {
        this.infected = !0, G.stopTweens(this.wrapperImg), this.wrapperImg.alpha = 1, this.wrapperImg.scale.setTo(1), G.changeTexture(this.wrapperImg, "infection_front"), game.add.tween(this.wrapperImg).from({
            alpha: 0,
            width: 0,
            height: 0
        }, 250, Phaser.Easing.Sinusoidal.Out, !0), this.addChild(this.wrapperImg), G.sb("onCandyInfect").dispatch(this)
    }, G.Candy.prototype.removeInfection = function () {
        G.sb("fxTop").dispatch("burstInfectionAnim", this, this), this.infected = !1, G.stopTweens(this.wrapperImg), this.board.pushToFallCheckList(this), game.add.tween(this.wrapperImg).to({
            alpha: 0
        }, 250, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            this.removeChild(this.wrapperImg)
        }, this), G.sb("onCandyInfectionRemove").dispatch(this)
    }, G.Candy.prototype.match = function (t, e, i) {
        if (this.matchable) {
            if (this.wrapped) return this.unwrap();
            if (this.infected) return this.removeInfection();
            if (!this.animationData.active) return this.detachFromGrid(), G.sb("onCandyMatch").dispatch(this), this.special ? (this.onMatchFx && this.onMatchFx.forEach(function (t) {
                G.sb("fx").dispatch(t[0], this, t[1], this)
            }, this), game.camera.shake(.0075, 250), this.boardCandies.thirdFloor.add(this), this.startAnimation("growAndFade", t)) : G.lvl.isGoal(this.candyType) ? this.remove() : void (void 0 === e ? this.startAnimation("vanishAlphaBurst", t) : this.startAnimation("moveTo", [t, e, i]))
        }
    }, G.Candy.prototype.remove = function () {
        this.boardCandies.removeCandy(this)
    }, G.Candy.prototype.updateAnimation = function () {
        this.animationData.active && (this.animationData.func && this.animationData.func.call(this), this.animationData.active || G.sb("onCandyAnimationFinish").dispatch())
    }, G.Candy.prototype.startAnimation = function (t, e) {
        if (this.animationData.active) return alert("during another animation");
        this["animation-init-" + t] && (G.sb("onCandyAnimationStart").dispatch(), this.animationData.active = !0, this["animation-init-" + t](e))
    }, G.Candy.prototype["animation-init-bounce"] = function () {
        if (G.IMMEDIATE) return this.animationData.active = !1, void G.sb("onCandyAnimationFinish").dispatch(this);
        game.add.tween(this).to({
            y: this.y - G.l(5)
        }, 100, Phaser.Easing.Sinusoidal.Out, !0, 0, 0, !0).onComplete.add(function () {
            this.animationData.active = !1, G.sb("onCandyAnimationFinish").dispatch(this)
        }, this)
    }, G.Candy.prototype["animation-init-vanishAlphaBurst"] = function (t) {
        G.sb("fx").dispatch("burstCandy", this, this), G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
    }, G.Candy.prototype["animation-init-vanish"] = function (t) {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), this.remove(), void this.scale.setTo(1);
        game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0, t || 0).onComplete.add(function () {
            G.sb("onCandyAnimationFinish").dispatch(this), this.remove(), this.scale.setTo(1)
        }, this)
    }, G.Candy.prototype["animation-init-scaleEndlessly"] = function () {
        G.IMMEDIATE || game.add.tween(this.scale).to({
            x: .5,
            y: .5
        }, 300, Phaser.Easing.Sinusoidal.In, !0, 0, -1, !0)
    }, G.Candy.prototype["animation-init-shrink"] = function () {
        this.boardCandies.thirdFloor.add(this), this.bringToTop();
        game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function () {
            G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
        }, this)
    }, G.Candy.prototype["animation-init-growAndFade"] = function () {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), void this.remove();
        this.boardCandies.thirdFloor.add(this), this.bringToTop();
        var t = game.add.tween(this.scale).to({
            x: 2.5,
            y: 2.5
        }, 200, Phaser.Easing.Sinusoidal.In, !0);
        game.add.tween(this).to({
            alpha: 0
        }, 100, Phaser.Easing.Sinusoidal.In, !0, 100).onComplete.add(function () {
            t.stop(), G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
        }, this)
    }, G.Candy.prototype["animation-init-biggerAndExplode"] = function (t) {
        if (G.IMMEDIATE) return this.board.checkSpecialMatchList.push(this), this.burst = !0, this.readyToProcess = !0, G.sb("onCandyAnimationFinish").dispatch(this), void this.remove();
        t ? game.time.events.add(t, function () {
            this.bringToTop(), game.add.tween(this.scale).to({
                x: 1.5,
                y: 1.5
            }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function () {
                this.board.checkSpecialMatchList.push(this), this.burst = !0, this.readyToProcess = !0, G.sb("onCandyAnimationFinish").dispatch(this), this.remove(), this.scale.setTo(1)
            }, this)
        }, this) : (this.bringToTop(), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function () {
            this.board.checkSpecialMatchList.push(this), this.burst = !0, this.readyToProcess = !0, G.sb("onCandyAnimationFinish").dispatch(this), this.remove(), this.scale.setTo(1)
        }, this))
    }, G.Candy.prototype["animation-init-moveTo"] = function (e) {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), void this.remove();
        if (e[0]) game.time.events.add(e[0], function () {
            var t = game.add.tween(this).to({
                x: this.board.cellXToPxIn(e[1]),
                y: this.board.cellYToPxIn(e[2])
            }, 300, Phaser.Easing.Sinusoidal.In, !0);
            game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Sinusoidal.In, !0, 100).onComplete.add(function () {
                t.stop(), G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
            }, this)
        }, this);
        else {
            var t = game.add.tween(this).to({
                x: this.board.cellXToPxIn(e[1]),
                y: this.board.cellYToPxIn(e[2])
            }, 300, Phaser.Easing.Sinusoidal.In, !0);
            game.add.tween(this).to({
                alpha: 0
            }, 200, Phaser.Easing.Sinusoidal.In, !0, 100).onComplete.add(function () {
                t.stop(), G.sb("onCandyAnimationFinish").dispatch(this), this.remove()
            }, this)
        }
    }, G.Candy.prototype["animation-init-moveToCombo"] = function (t) {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), void this.remove();
        if (0 !== t[3]) var e = game.add.tween(this).to({
            angle: t[3]
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0);
        var i = game.add.tween(this).to({
            x: this.board.cellXToPxIn(t[1]),
            y: this.board.cellYToPxIn(t[2])
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0);
        game.add.tween(this).to({
            alpha: .8
        }, 200, Phaser.Easing.Sinusoidal.In, !0, 200).onComplete.add(function () {
            i.stop(), e && e.stop(), G.sb("onCandyAnimationFinish").dispatch(this), game.time.events.add(1, this.remove, this)
        }, this)
    }, G.Candy.prototype.moveTo = function (t, e, i) {
        if (G.IMMEDIATE) return G.sb("onCandyAnimationFinish").dispatch(this), this.cellX = s[0], this.cellY = s[1], this.animationData.active = !1, void this.boardCandies.grid.set(this.cellX, this.cellY, this);
        this.board.getCandy(t, e);
        var s = [t, e];
        this.bringToTop(), G.sb("onCandyAnimationStart").dispatch(), this.animationData.active = !0, i && game.add.tween(this.scale).to({
            x: 2 * this.scale.x,
            y: 2 * this.scale.y
        }, 250, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), game.add.tween(this).to({
            x: this.board.cellXToPxIn(t),
            y: this.board.cellYToPxIn(e)
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function () {
            G.sb("onCandyAnimationFinish").dispatch(this), this.cellX = s[0], this.cellY = s[1], this.animationData.active = !1, this.boardCandies.grid.set(this.cellX, this.cellY, this)
        }, this)
    }, G.Candy.prototype.shuffleMoveToOwnCell = function () {
        var t = this.parent;
        this.special ? this.boardCandies.thirdFloor.add(this) : this.boardCandies.secondFloor.add(this), G.sb("onCandyAnimationStart").dispatch(), this.animationData.active = !0, game.add.tween(this).to({
            x: this.board.cellXToPxIn(this.cellX),
            y: this.board.cellYToPxIn(this.cellY)
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function () {
            t.add(this), G.sb("onCandyAnimationFinish").dispatch(this), this.animationData.active = !1
        }, this)
    }, G.CandySelection = function (t) {
        G.Image.call(this, 0, 0, null, .5), this.board = t, this.alpha = 0, game.add.existing(this), this.selection = G.makeImage(0, 0, "selected_cookie_new", .5, this), game.add.tween(this.selection.scale).to({
            x: 1.2,
            y: 1.2
        }, 800, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.frameIndex = 0, this.every = 3, this.frameCounter = 0, this.scale = this.board.scale
    }, G.CandySelection.prototype = Object.create(G.Image.prototype), G.CandySelection.prototype.selectCandy = function (t) {
        this.alpha = 1, this.x = this.board.boardCandies.x + t.x * this.board.scale.x, this.y = this.board.boardCandies.y + t.y * this.board.scale.y
    }, G.CandySelection.prototype.hide = function () {
        this.alpha = 0
    }, G.AttachementsGroup = function () {
        Phaser.Group.call(this, game), this.deadArray = []
    }, G.AttachementsGroup.prototype = Object.create(Phaser.Group.prototype), G.AttachementsGroup.prototype.attach = function (t, e) {
        var i;
        return (i = 0 < this.deadArray.length ? this.deadArray.pop() : new G.AttachementPart).init(t, e), this.add(i), i
    }, G.AttachementPart = function () {
        Phaser.Image.call(this, game, 0, 0, null), this.anchor.setTo(.5), this.kill()
    }, G.AttachementPart.prototype = Object.create(Phaser.Image.prototype), G.AttachementPart.prototype.init = function (t, e) {
        this.attachement = e, this.position = e.position, this.scale = e.scale, this.position, this["init" + G.capitalize(t)](e), this.revive()
    }, G.AttachementPart.prototype.postUpdate = function () {
        this.alive && (this.rotation = this.attachement.rotation)
    }, G.AttachementPart.prototype.remove = function () {
        this.kill(), this.parent.deadArray.push(this), this.parent.removeChild(this)
    }, G.AttachementPart.prototype.detach = function () {
        this.position = new Phaser.Point(this.x, this.y)
    }, G.AttachementPart.prototype.initChain = function (t) {
        G.changeTexture(this, "blocker_chain_wrapped")
    }, G.BoardFallMgr = function (t, e) {
        this.board = t, this.boardData = t.boardData, this.refiller = e, this.refillData = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    }, G.BoardFallMgr.prototype.allCollumsFall = function () {
        this.refillData = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
        for (var t = 0; t < this.boardData.width; t++) this.collumnFall(t)
    }, G.BoardFallMgr.prototype.collumnFall = function (t) {
        for (var e = this.boardData.height - 1; 0 <= e; e--)
            if ("X" != this.boardData.get(t, e) && !this.board.getCandy(t, e) && !this.board.boardIce.isToken(t, e)) {
                for (var i = !1, s = e; 0 <= s; s--) {
                    i = this.board.getCandy(t, s);
                    if (this.board.isMoveBlocked(t, s)) {
                        i = !0;
                        break
                    }
                    if (i && this.board.isMoveable(t, s)) {
                        i.fallTo(t, e);
                        break
                    }
                }
                i || this.board.newFallingCandy(t, e, this.refiller.getTypeToDrop(t), this.refillData[t]--)
            }
    }, G.BoardFallMgr.prototype.collumnFall = function (t) {
        for (var e = this.boardData.height - 1; 0 <= e; e--)
            if ("X" != this.boardData.get(t, e) && !this.board.getCandy(t, e) && !this.board.boardIce.isToken(t, e)) {
                for (var i = !1, s = e; 0 <= s; s--) {
                    i = this.board.getCandy(t, s);
                    if (this.board.isMoveBlocked(t, s)) {
                        i = !0;
                        break
                    }
                    if (i && this.board.isMoveable(t, s)) {
                        i.fallTo(t, e);
                        break
                    }
                }
                i || this.board.newFallingCandy(t, e, this.refiller.getTypeToDrop(t), this.refillData[t]--)
            }
    }, G.BoardFallMgr.prototype.isCellSolid = function (t, e) {
        return e == this.boardData.height || "X" == this.boardData.get(t, e) || this.board.getCandy(t, e)
    }, G.BoardFallMgr.prototype.crossCollumnFall = function () {
        for (var t = !1, e = 1, i = this.boardData.height - 1; 0 <= i; i--)
            for (var s = 0; s < this.boardData.width; s++)
                if (this.board.isCellOnBoard(s, i) && !this.isCellSolid(s, i) && this.isCellSolid(s, i + 1) && !this.board.isMoveBlocked(s, i)) {
                    if (this.board.isMoveable(s + e, i - 1)) {
                        this.board.getCandy(s + e, i - 1).fallTo(s, i), this.collumnFall(s + e), t = !0;
                        continue
                    }
                    if (this.board.isMoveable(s - e, i - 1)) {
                        this.board.getCandy(s - e, i - 1).fallTo(s, i), this.collumnFall(s - e), t = !0;
                        continue
                    }
                    e *= -1
                } return t
    }, G.InputController = function (t) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.board = t, this.booster = null, this.clicked = !1, this.clickedCell = !1, this.anyWindowOpen = !1, this.possibleCandies = [], G.sb("onWindowOpened").add(function () {
            this.anyWindowOpen = !0
        }, this), G.sb("onAllWindowsClosed").add(function () {
            this.anyWindowOpen = !1
        }, this), this.state.EDITOR || game.input.onDown.add(this.onClick, this), game.input.onUp.add(function () {
            this.clicked = !1
        }, this), this.locked = !1
    }, G.InputController.prototype = Object.create(Phaser.Group.prototype), G.InputController.prototype.update = function () {
        this.board.tileShade.visible = !1;
        var t = this.pointerToCell2(game.input.activePointer);
        if (game.device.desktop && !G.lvl.goalAchieved && this.board.isCellOnBoard(t[0], t[1]) && (this.board.tileShade.visible = !0, this.board.tileShade.x = this.board.cellXToPxIn(t[0]), this.board.tileShade.y = this.board.cellYToPxIn(t[1])), this.canMakeMove() && this.clicked) {
            if (0 < this.possibleCandies.length && (-1 == this.possibleCandies.indexOf(this.board.getCandy(this.clickedCell)) || -1 == this.possibleCandies.indexOf(this.board.getCandy(t)))) return;
            t && this.board.isMoveable(t) && this.areNeighbours(this.clickedCell, t) && this.board.getCandy(t) && (this.board.makeMove(this.board.getCandy(this.clickedCell), this.board.getCandy(t)), this.clicked = !1, this.clickedCell = null)
        }
    }, G.InputController.prototype.canMakeMove = function () {
        return !this.locked && (!!this.board.actionManager.noAction && (!G.lvl.goalAchieved && !this.anyWindowOpen))
    }, G.InputController.prototype.onClick = function (t) {
        if (this.canMakeMove()) {
            var e = this.pointerToCell(t);
            if (e && this.board.isMoveable(e[0], e[1]) && this.board.getCandy(e)) {
                if (G.sfx.pop.play(), 0 === G.lvl.lvlNr || 1 === G.lvl.lvlNr || G.lvl.lvlNr, this.clickedCell && Math.abs(this.clickedCell[0] - e[0]) + Math.abs(this.clickedCell[1] - e[1]) == 1) {
                    if (!(0 < this.possibleCandies.length)) return this.board.makeMove(this.board.getCandy(this.clickedCell), this.board.getCandy(e)), this.clickedCell = null, void (this.clicked = !1);
                    if (-1 < this.possibleCandies.indexOf(this.board.getCandy(this.clickedCell)) && -1 < this.possibleCandies.indexOf(this.board.getCandy(e))) return this.board.makeMove(this.board.getCandy(this.clickedCell), this.board.getCandy(e)), this.clickedCell = null, void (this.clicked = !1)
                }
                this.clicked = !0, this.clickedCell = e
            }
        }
    }, G.InputController.prototype.pointerToCell = function (t) {
        if (this.anyWindowOpen) return !1;
        var e = t.worldX,
            i = t.worldY;
        return !!this.isPointerInRange(t) && [Math.floor((e - (this.board.x + this.board.offsetX)) / (this.board.tilesize * this.board.scale.x)), Math.floor((i - (this.board.y + this.board.offsetY)) / (this.board.tilesize * this.board.scale.y))]
    }, G.InputController.prototype.pointerToCell2 = function (t) {
        var e = t.worldX,
            i = t.worldY;
        return [Math.floor((e - (this.board.x + this.board.offsetX)) / (this.board.tilesize * this.board.scale.x)), Math.floor((i - (this.board.y + this.board.offsetY)) / (this.board.tilesize * this.board.scale.y))]
    }, G.InputController.prototype.isPointerInRange = function (t) {
        var e = t.worldX,
            i = t.worldY;
        return !(e < this.board.x + this.board.offsetX || e > this.board.x + this.board.offsetX + this.board.width || i < this.board.y + this.board.offsetY || i > this.board.y + this.board.offsetY + this.board.height)
    }, G.InputController.prototype.areNeighbours = function (t, e) {
        return t[0] == e[0] ? 1 == Math.abs(t[1] - e[1]) : t[1] == e[1] ? 1 == Math.abs(t[0] - e[0]) : void 0
    }, G.MatchList = function () {
        this.list = []
    }, G.MatchList.prototype.push = function (t) {
        for (var e = 0, i = this.list.length; e < i; e++)
            if (this.list[e][0] == t[0] && this.list[e][1] == t[1]) return;
        this.list.push(t)
    }, G.MatchList.prototype.remove = function (t) {
        for (var e = 0, i = this.list.length; e < i; e++)
            if (this.list[e][0] == t[0] && this.list[e][1] == t[1]) return void this.list.splice(e, 1)
    }, G.MatchList.prototype.addHorizontal = function (t, e, i) {
        for (; t <= e; t++) this.push([t, i])
    }, G.MatchList.prototype.addVertical = function (t, e, i) {
        for (; i <= e; e--) this.push([t, e])
    }, G.MatchList.prototype.loop = function (t, e) {
        for (var i = 0, s = this.list.length; i < s; i++) t.call(e || this, this.list[i])
    }, G.Refiller = function (t, e) {
        this.board = e, this.drops = t.drops, this.goalDrops = t.goalDrops ? JSON.parse(JSON.stringify(t.goalDrops)) : [], this.predefinedDrops = t.predefinedDrops ? JSON.parse(JSON.stringify(t.predefinedDrops)) : [], void 0 === this.drops.chest && (this.drops.chest = 0), void 0 === this.drops.infection && (this.drops.infection = 0), void 0 === this.drops.chain && (this.drops.chain = 0), void 0 === this.drops.goalCandy && (this.drops.goalCandy = 0), this.drops.chest *= G.lvl.coinChanceProb
    }, G.Refiller.prototype.getTypeToDrop = function (t) {
        var e = this.checkPredifinedDrops(t);
        if (e) return "r" === e && (e = game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY)), e;
        this.substractGoalDropCounter();
        var i = this.checkGoalDropList();
        if (i) return i;
        var s = Math.random() < this.drops.goalCandy / 100,
            a = Math.random() < this.drops.chest / 100,
            o = Math.random() < this.drops.chain / 100,
            n = Math.random() < this.drops.infection / 100;
        if (s) return "goalCandy";
        if (a) return "chest";
        if (n) return "infection";
        var r = game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY);
        return o && 0 == (r = "CHAIN" + r) && alert(r), r
    }, G.Refiller.prototype.checkPredifinedDrops = function (t) {
        return this.predefinedDrops[t] ? this.predefinedDrops[t].shift() : null
    }, G.Refiller.prototype.checkGoalDropList = function () {
        for (var t = 0, e = this.goalDrops.length; t < e; t++)
            if (this.goalDrops[t][1] <= 0) {
                var i = this.goalDrops[t][0];
                return this.goalDrops.splice(t, 1), i
            } return !1
    }, G.Refiller.prototype.substractGoalDropCounter = function () {
        for (var t = 0, e = this.goalDrops.length; t < e; t++) this.goalDrops[t][1] = this.goalDrops[t][1] - 1
    }, G.Action = function (t, e, i) {
        this.state = game.state.getCurrentState(), this.board = t, this.am = e, this.args = i
    }, G.Action.prototype.finish = function () {
        this.am.removeAction(this)
    }, G.ActionBoosterMatch = function (t, e, i) {
        G.Action.call(this, t, e, i), this.clickedCandy = !1, this.availableCandies = [], this.inputController = this.board.inputController, this.signalBinding = game.input.onDown.add(function (t) {
            var e = this.inputController.pointerToCell(t);
            if (e) {
                var i = this.board.getCandy(e[0], e[1]);
                !i || 0 != this.availableCandies.length && -1 == this.availableCandies.indexOf(i) || (G.sfx.pop.play(), this.clickedCandy = i, G.saveState.useBooster(this.args[0]))
            }
        }, this), this.boosterInit = !1
    }, G.ActionBoosterMatch.prototype = Object.create(G.Action.prototype), G.ActionBoosterMatch.prototype.update = function () {
        this.clickedCandy && (this.boosterInit || this.board.duringAnimation || this.board.duringFall || (this.boosterInit = !0, this.signalBinding.detach(), 3 == this.args[0] ? this.board.boardCandies.boosterFxGroup.add(new G.BoosterHorizontal(this.clickedCandy.cellX, this.clickedCandy.cellY, this.args[0])) : 4 == this.args[0] ? this.board.boardCandies.boosterFxGroup.add(new G.BoosterVertical(this.clickedCandy.cellX, this.clickedCandy.cellY, this.args[0])) : this.board.boardCandies.boosterFxGroup.add(new G.Booster(this.clickedCandy.cellX, this.clickedCandy.cellY, this.args[0]))))
    }, G.ActionBoosterMatch.prototype.finish = function () {
        this.signalBinding.detach(), this.am.removeAction(this)
    }, G.ActionBoosterSwap = function (t, e, i) {
        G.Action.call(this, t, e, i), this.availableCandies = [], this.clickedCandy = !1, this.clickedCandy2 = !1, this.madeMove = !1, this.inputController = this.board.inputController, this.signalBinding = game.input.onDown.add(function (t) {
            var e = this.inputController.pointerToCell(t);
            if (e && this.board.isMoveable(e[0], e[1])) {
                var i = this.board.getCandy(e[0], e[1]);
                if (i.goalCandy) return;
                if (!this.clickedCandy && (0 == this.availableCandies.length || -1 != this.availableCandies.indexOf(i))) return this.selection = this.board.candySelection, this.selection.selectCandy(i), G.sb("onBoosterSwapCandySelect").dispatch(i), this.clickedCandy = i;
                if (this.clickedCandy != i && (0 == this.availableCandies.length || -1 != this.availableCandies.indexOf(i))) {
                    if (G.lvl.tutOpen) {
                        var s = game.state.getCurrentState().tut;
                        game.add.tween(s.hand).to({
                            alpha: 0
                        }, 300, Phaser.Easing.Sinusoidal.In, !0)
                    }
                    this.clickedCandy2 = i, G.saveState.useBooster(1)
                }
            }
        }, this)
    }, G.ActionBoosterSwap.prototype = Object.create(G.Action.prototype), G.ActionBoosterSwap.prototype.update = function () {
        this.clickedCandy && this.clickedCandy2 && (this.madeMove || (this.madeMove = !0, this.signalBinding.detach(), this.selection && this.selection.hide(), this.clickedCandy2.moveTo(this.clickedCandy.cellX, this.clickedCandy.cellY), this.clickedCandy.moveTo(this.clickedCandy2.cellX, this.clickedCandy2.cellY, !0)), this.board.duringAnimation || this.board.duringFall || (this.board.matcher.isMoveValid(this.clickedCandy) && this.board.checkMatchList.push(this.clickedCandy), this.board.matcher.isMoveValid(this.clickedCandy2) && this.board.checkMatchList.push(this.clickedCandy2), 0 < this.board.checkMatchList.length && this.am.newAction("processMatch"), G.sb("onBoosterActionFinished").dispatch(), this.finish()))
    }, G.ActionBoosterSwap.prototype.finish = function () {
        this.selection && this.selection.hide(), this.signalBinding.detach(), this.am.removeAction(this)
    }, G.ActionMove = function (t, e, i) {
        G.Action.call(this, t, e, i), this.candy1 = i[0], this.candy1orgParent = this.candy1.parent, this.candy2 = i[1], this.candy2orgParent = this.candy2.parent, this.forceMove = i[2], this.back = !1, this.startAnimation()
    }, G.ActionMove.prototype = Object.create(G.Action.prototype), G.ActionMove.prototype.update = function () {
        if (this.updateAnimation(), this.progress += .075 * G.deltaTime, 1 <= this.progress) {
            if (this.finishAnimation(), this.back) return this.finish();
            if (this.candy1.movedWith(this.candy2), this.candy2.movedWith(this.candy1), this.candy1.special && this.candy2.special) {
                if (this.checkCombo(this.candy1, this.candy2)) return G.lvl.madeMove(), this.am.newAction("processMatch"), this.finish();
                if ("spiral" != this.candy1.specialType && "spiral" != this.candy2.specialType) return this.candy1.activatedByMove = !0, this.candy2.activatedByMove = !0, this.board.checkMatchList.push(this.candy1), this.board.checkMatchList.push(this.candy2), G.lvl.madeMove(), this.am.newAction("processMatch"), this.finish();
                var t = "spiral" == this.candy1.specialType ? this.candy1 : this.candy2,
                    e = "spiral" != this.candy1.specialType ? this.candy1 : this.candy2;
                return e.startAnimation("moveTo", [0, t.cellX, t.cellY]), t.exe = [
                    ["changeTypeInto", 1 <= e.candyType ? e.candyType : game.rnd.between(1, this.board.MAX_NUMBER_OF_REGULAR_CANDY), e.specialType]
                ], this.board.checkMatchList.push(t), G.lvl.madeMove(), this.am.newAction("processMatch"), this.finish()
            }
            if (this.additionalChecks(this.candy1, this.candy2) && (this.board.matcher.isMoveValid(this.candy1) && this.board.checkMatchList.push(this.candy1), this.board.matcher.isMoveValid(this.candy2) && this.board.checkMatchList.push(this.candy2)), 0 != this.board.checkMatchList) return this.candy1.movedWith(this.candy2), this.candy2.movedWith(this.candy1), this.forceMove || G.lvl.madeMove(), this.am.newAction("processMatch"), this.finish();
            this.back || this.forceMove ? this.finish() : (this.back = !0, this.startAnimation())
        }
    }, G.ActionMove.prototype.additionalChecks = function (t, e) {
        var i = [t, e].find(function (t) {
            return "spiral" == t.specialType
        }),
            s = [t, e].find(function (t) {
                return "goalCandy" === t.candyType
            }),
            a = [t, e].find(function (t) {
                return "chest" === t.candyType
            });
        return !(i && s || i && a)
    }, G.ActionMove.prototype.startAnimation = function () {
        G.sfx.exchange.play(), this.candy1anim = {
            startX: this.candy1.x,
            deltaX: this.candy2.x - this.candy1.x,
            startY: this.candy1.y,
            deltaY: this.candy2.y - this.candy1.y
        }, this.board.boardCandies.secondFloor.add(this.candy1), this.candy2anim = {
            startX: this.candy2.x,
            deltaX: this.candy1.x - this.candy2.x,
            startY: this.candy2.y,
            deltaY: this.candy1.y - this.candy2.y
        }, this.board.boardCandies.secondFloor.add(this.candy2), this.candy1.bringToTop(), this.progress = 0, G.IMMEDIATE && (this.progress = 1)
    }, G.ActionMove.prototype.finishAnimation = function () {
        this.board.swapCandies(this.candy1, this.candy2), this.candy1.x = this.board.cellXToPxIn(this.candy1.cellX), this.candy1.y = this.board.cellYToPxIn(this.candy1.cellY), this.candy1.scale.setTo(1), this.candy1orgParent.add(this.candy1), this.candy2.x = this.board.cellXToPxIn(this.candy2.cellX), this.candy2.y = this.board.cellYToPxIn(this.candy2.cellY), this.candy2orgParent.add(this.candy2)
    }, G.ActionMove.prototype.updateAnimation = function () {
        var t = Phaser.Easing.Sinusoidal.InOut(this.progress);
        this.candy1.x = this.candy1anim.startX + t * this.candy1anim.deltaX, this.candy1.y = this.candy1anim.startY + t * this.candy1anim.deltaY, this.candy1.scale.setTo(2 - 2 * Math.abs(.5 - t)), this.candy2.x = this.candy2anim.startX + t * this.candy2anim.deltaX, this.candy2.y = this.candy2anim.startY + t * this.candy2anim.deltaY
    }, G.ActionMove.prototype.checkCombo = function (t, e) {
        for (var i, s = 0, a = G.specialCandies.combos.length; s < a; s++)
            if (i = G.specialCandies.combos[s], t.specialType == i[0] && e.specialType == i[1] || t.specialType == i[1] && e.specialType == i[0]) {
                var o = i[3];
                return "vertical" != i[0] && "horizontal" != i[0] || "cross" != i[1] || "vertical" != t.specialType && "horizontal" != t.specialType || (game.add.tween(t).to({
                    angle: i[3]
                }, 300, Phaser.Easing.Sinusoidal.InOut, !0), o = 0), t.changeInto(i[2]), e.detachFromGrid(), e.startAnimation("moveToCombo", [0, t.cellX, t.cellY, o]), t.onMatchFx || (t.onMatchFx = []), t.onMatchFx.push(["dummyComboGrowAndFade", [e.frameName, o]]), e.bringToTop(), e.candyType = Math.random(), t.activatedByMove = !0, this.board.checkMatchList.push(this.candy1), !0
            } return !1
    }, G.ActionProcessFall = function (t, e, i) {
        G.Action.call(this, t, e, i), this.madeCrossCollumn = !1, this.board.fallMgr.allCollumsFall()
    }, G.ActionProcessFall.prototype = Object.create(G.Action.prototype), G.ActionProcessFall.prototype.update = function () {
        if (!this.board.duringAnimation && !this.board.duringFall) {
            if (!this.madeCrossCollumn) {
                for (; this.board.fallMgr.crossCollumnFall(););
                return void (this.madeCrossCollumn = !0)
            }
            if (this.board.fallCheckList.forEach(function (t) {
                this.board.matcher.quickMatchCheck(t) && this.board.checkMatchList.push(t)
            }, this), this.board.fallCheckList = [], 0 != this.board.checkMatchList || 0 < this.board.checkAfterFall.length) {
                for (var t = 0, e = this.board.checkAfterFall.length; t < e; t++) this.board.checkMatchList.push(this.board.checkAfterFall[t]);
                this.board.checkAfterFall = [], this.am.newAction("processMatch")
            }
            G.sb("actionFallEnd").dispatch(), this.board.checkGoalCandy(), this.finish()
        }
    }, G.ActionProcessMatch = function (t, e, i) {
        G.Action.call(this, t, e, i), this.preFall = !0, this.processed = !1
    }, G.ActionProcessMatch.prototype = Object.create(G.Action.prototype), G.ActionProcessMatch.prototype.update = function () {
        this.board.duringAnimation || this.board.duringFall || this.board.matcher.processMatchList(), this.board.duringAnimation || this.board.duringFall || 0 != this.board.checkMatchList || 0 != this.board.checkSpecialMatchList || (this.am.newAction("processFall"), this.finish())
    }, G.ActionShuffle = function (t, e, i) {
        G.Action.call(this, t, e, i), this.state = game.state.getCurrentState(), this.board = this.state.board, this.shuffleText = new G.Text(0, 0, G.txt("No possible match - shuffling"), {
            font: "ComicSansBold",
            fill: "#fdfbe4",
            fontSize: 40,
            fontSize: "50px",
            stroke: "#73461c",
            strokeThickness: 7,
            lineSpacing: -25
        }, .5, 620), this.shuffleText.position.setTo(this.board.x + .5 * (this.board.width - 2 * this.board.tilesize), this.board.y + .45 * (this.board.height - 2 * this.board.tilesize)), game.state.getCurrentState().UIFxLayer.add(this.shuffleText), this.shuffleText.scale.setTo(0), game.add.tween(this.shuffleText.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Elastic.Out, !0), this.updateActive = !1, game.add.tween(this.shuffleText).to({
            alpha: 0
        }, G.IMMEDIATE ? 1 : 300, Phaser.Easing.Sinusoidal.Out, !0, G.IMMEDIATE ? 10 : 2e3).onComplete.add(function () {
            this.board.shuffleCandies(), this.updateActive = !0, this.shuffleText.destroy()
        }, this)
    }, G.ActionShuffle.prototype = Object.create(G.Action.prototype), G.ActionShuffle.prototype.update = function () {
        this.updateActive && (this.board.duringAnimation || this.board.duringFall || (this.updateActive = !1, 0 == this.board.checkMatchList.length ? this.finish() : G.IMMEDIATE ? this.finish() : game.time.events.add(300, this.finish, this)))
    }, G.ActionStartBoosters = function (t, e, i) {
        G.Action.call(this, t, e, i), this.state = game.state.getCurrentState(), this.boosters = [], this.popCounter = 0, this.positions = this.generatePositions(), this.positionIndex = 0;
        this.delay = 500, this.delayIncrease = 200;
        var s = this.state.startBoosters || [];
        this.normals = this.getTargetCandies(), this.normalsIndex = 0, this.initStartBoosters(s), G.MYSTERYGIFT && this.initMysteryGifts(G.saveState.mysteryGift_getCurrentGifts()), this.state.UIFxLayer.addMultiple(this.boosters), this.boosters.forEach(function (t) {
            t.events.onDestroy.add(function () {
                this.popCounter++
            }, this)
        }, this)
    }, G.ActionStartBoosters.prototype = Object.create(G.Action.prototype), G.ActionStartBoosters.prototype.update = function () {
        this.popCounter == this.boosters.length && this.finish()
    }, G.ActionStartBoosters.prototype.generatePositions = function () {
        for (var t = [], e = .15; e <= .85; e += .14)
            for (var i = .15; i <= .85; i += .14) t.push([e + game.rnd.realInRange(-.02, .02), i + game.rnd.realInRange(-.02, .02)]);
        return Phaser.ArrayUtils.shuffle(t)
    }, G.ActionStartBoosters.prototype.initStartBoosters = function (t) {
        t[5] && (G.saveState.useStartBooster(5), (i = new G.StartBoosterBubble(this.positions[this.positionIndex++], "ui_booster_5", this.state.topBar.movesTxt, function () {
            G.lvl.changeMoveNumber(5)
        })).goToTarget(this.delay), this.delay += this.delayIncrease, this.boosters.push(i), G.sb("onStartBoosterUsed").dispatch(6));
        if (t[7]) {
            for (var e = 0; e < 3; e++) {
                var i;
                if (this.normals[this.normalsIndex + 1]) (i = new G.StartBoosterBubble(this.positions[this.positionIndex++], "ui_booster_7", this.normals[this.normalsIndex++], function () {
                    this.target.changeInto(Math.random() < .5 ? "vertical" : "horizontal")
                })).goToTarget(this.delay), this.delay += this.delayIncrease, this.boosters.push(i), G.sb("onStartBoosterUsed").dispatch(7)
            }
            G.saveState.useStartBooster(7)
        }
        t[8] && this.normals[this.normalsIndex + 1] && (G.saveState.useStartBooster(8), (i = new G.StartBoosterBubble(this.positions[this.positionIndex++], "ui_booster_8", this.normals[this.normalsIndex++], function () {
            this.target.changeInto("spiral")
        })).goToTarget(this.delay), this.delay += this.delayIncrease, this.boosters.push(i), G.sb("onStartBoosterUsed").dispatch(8))
    }, G.ActionStartBoosters.prototype.initMysteryGifts = function (t) {
        t.forEach(this.addChangeIntoBooster, this)
    }, G.ActionStartBoosters.prototype.addChangeIntoBooster = function (t) {
        var e = this.normals[this.normalsIndex + 1];
        if (e) {
            var i = {
                cross: "ui_booster_9",
                vertical: "ui_booster_3",
                spiral: "ui_booster_8",
                horizontal: "ui_booster_4"
            }[t].replace("%%", e.frameName),
                s = new G.StartBoosterBubble(this.positions[this.positionIndex], i, e, function () {
                    this.target.changeInto(t)
                });
            this.normalsIndex++, this.positionIndex++, s.goToTarget(this.delay), this.delay += this.delayIncrease, this.boosters.push(s)
        }
    }, G.ActionStartBoosters.prototype.getTargetCandies = function () {
        var t = this.board.boardCandies.getNormalCandies();
        Phaser.ArrayUtils.shuffle(t);
        var i = [],
            s = [];
        return t.forEach(function (e) {
            i.find(function (t) {
                return this.board.boardCandies.areCandiesNeighbours(e, t)
            }, this) ? s.push(e) : i.push(e)
        }, this), i.concat(s)
    }, G.BoardLayer = function (t, e) {
        Phaser.Group.call(this, game), this.position = t.position, this.scale = t.scale, this.board = t, this.boardData = t.boardData, this.config = e, this.grid = new G.GridArray(this.boardData.width, this.boardData.height, !1)
    }, G.BoardLayer.prototype = Object.create(Phaser.Group.prototype), G.BoardLayer.prototype.isMoveBlocked = function (t, e) {
        return this.isToken(t, e) && this.config.blockMove
    }, G.BoardLayer.prototype.isMatchBlocked = function (t, e) {
        return this.isToken(t, e) && this.config.blockMatch
    }, G.BoardLayer.prototype.isBoosterChangeBlocked = function (t, e) {
        return this.isToken(t, e) && this.config.blockMove
    }, G.BoardLayer.prototype.isProperChunk = function (t) {
        return 0 === t.indexOf(this.config.editorSymbol)
    }, G.BoardLayer.prototype.createToken = function (t, e, i) {
        var s = this.add(new this.config.constructor(this, t, e, i));
        return this.grid.set(t, e, s), s.grid = this.grid, s
    }, G.BoardLayer.prototype.import = function (t, e, i) {
        return 0 === i.indexOf(this.config.editorSymbol) && (this.config.hpToken && this.createToken(t, e, i[this.config.editorSymbol.length]), !0)
    }, G.BoardLayer.prototype.export = function (t, e) {
        var i = this.getToken(t, e);
        return i ? this.config.hpToken ? this.config.editorSymbol + i.hp : i.export ? i.export() : this.config.editorSymbol : null
    }, G.BoardLayer.prototype.getRandom = function () {
        if (0 == this.children.length) return !1;
        for (var t, e = this.children.length, i = (game.rnd.between(0, e), 0); i < e; i++)
            if ((t = this.children[i]) && this.grid.get(t.cellX, t.cellY) == t) return t;
        return !1
    }, G.BoardLayer.prototype.removeToken = function (t, e) {
        var i = this.grid.get(t, e);
        if (i) {
            this.grid.set(t, e, !1), this.config.collectableType && G.sb("onCollectableRemove").dispatch(this.config.collectableType, i, i.frameName), i.deathAnimation();
            var s = this.board.getCandy(t, e);
            s && (this.config.blockMove && this.board.pushToFallCheckList(s), this.config.blockMatch && this.board.checkMatchList.push(s))
        }
    }, G.BoardLayer.prototype.onMatch = function (t, e) {
        var i = this.getToken(t, e);
        return !i || (i.onMatch(), !this.config.stopMatchPropagation)
    }, G.BoardLayer.prototype.onHit = function (t, e) {
        var i = this.getToken(t, e);
        return !i || (i.onHit(), !this.config.stopHitPropagation)
    }, G.BoardLayer.prototype.isCellFree = function (t, e) {
        return !this.grid.get(t, e)
    }, G.BoardLayer.prototype.getToken = function (t, e) {
        return this.grid.get(t, e)
    }, G.BoardLayer.prototype.isToken = G.BoardLayer.prototype.getToken, G.BoardLayer.prototype.destroyCell = G.BoardLayer.prototype.removeToken, G.BoardToken = function (t, e, i, s, a) {
        Phaser.Image.call(this, game, t.board.cellXToPxIn(i), t.board.cellYToPxIn(s)), this.board = t.board, this.config = e, this.anchor.setTo(.5), this.layer = t, this.layerGrid = t.grid, this.cellX = i, this.cellY = s, this.hp = parseInt(a)
    }, G.BoardToken.prototype = Object.create(Phaser.Image.prototype), G.BoardToken.prototype.onMatch = function () { }, G.BoardToken.prototype.onHit = function () { }, G.BoardToken.prototype.remove = function () {
        this.layer.removeToken(this.cellX, this.cellY)
    }, G.BoardToken.prototype.deathAnimation = function () {
        this.destroy()
    }, G.BoardConcrete = function (t) {
        G.BoardLayer.call(this, t, {
            constructor: G.Concrete,
            maxHp: 3,
            hpToken: !0,
            editorSymbol: "cn",
            blockMove: !0,
            blockBoosterChange: !0,
            collectableType: "concrete",
            stopMatchPropagation: !0
        })
    }, G.BoardConcrete.prototype = Object.create(G.BoardLayer.prototype), G.BoardDirt = function (t) {
        G.BoardLayer.call(this, t, {
            constructor: G.Dirt,
            maxHp: 3,
            hpToken: !0,
            editorSymbol: "dirt",
            collectableType: "dirt"
        })
    }, G.BoardDirt.prototype = Object.create(G.BoardLayer.prototype), G.BoardDirtS = function (t) {
        G.BoardLayer.call(this, t, {
            constructor: G.DirtS,
            maxHp: 3,
            hpToken: !0,
            editorSymbol: "dS",
            collectableType: "dirtS"
        }), this.removedToken = !1, G.sb("onCollectableRemove").add(function (t) {
            "dirtS" === t && (this.removedToken = !0)
        }, this), G.sb("actionQueueEmptyAfterMove").add(function () {
            this.removedToken || this.spread(), this.removedToken = !1
        }, this)
    }, G.BoardDirtS.prototype = Object.create(G.BoardLayer.prototype), G.BoardDirtS.prototype.spread = function () {
        for (var t = ["U", "D", "L", "R", "I"], e = this.children.length, i = game.rnd.between(0, e - 1), s = 0; s < e; s++) {
            var a = this.children[(s + i) % e];
            Phaser.ArrayUtils.shuffle(t);
            for (var o = 0; o < t.length; o++) {
                switch (t[o]) {
                    case "U":
                        if (this.isSpreadPossible(a.cellX, a.cellY - 1)) return void this.spreadToken(a.cellX, a.cellY - 1);
                        break;
                    case "D":
                        if (this.isSpreadPossible(a.cellX, a.cellY + 1)) return void this.spreadToken(a.cellX, a.cellY + 1);
                        break;
                    case "L":
                        if (this.isSpreadPossible(a.cellX - 1, a.cellY)) return void this.spreadToken(a.cellX - 1, a.cellY);
                        break;
                    case "R":
                        if (this.isSpreadPossible(a.cellX + 1, a.cellY)) return void this.spreadToken(a.cellX + 1, a.cellY);
                        break;
                    case "I":
                        if (a.hp < this.config.maxHp) return void a.increaseHp()
                }
            }
        }
    }, G.BoardDirtS.prototype.isSpreadPossible = function (t, e) {
        return this.board.isCellOnBoard(t, e) && !this.getToken(t, e)
    }, G.BoardDirtS.prototype.spreadToken = function (t, e) {
        var i = this.createToken(t, e, 1);
        game.add.tween(i.scale).from({
            x: 0,
            y: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.BoardIce = function (t) {
        G.BoardLayer.call(this, t, {
            constructor: G.Ice,
            maxHp: 4,
            hpToken: !0,
            editorSymbol: "ice",
            collectableType: "ice",
            blockMove: !0,
            blockMatch: !0,
            blockBoosterChange: !0,
            stopHitPropagation: !0
        })
    }, G.BoardIce.prototype = Object.create(G.BoardLayer.prototype), G.BoardJam = function (t) {
        G.BoardLayer.call(this, t, {
            constructor: G.Jam,
            maxHp: 3,
            hpToken: !0,
            editorSymbol: "jam",
            collectableType: "jam",
            blockMove: !0,
            blockMatch: !0,
            stopHitPropagation: !0
        }), this.removedToken = !1, G.sb("onCollectableRemove").add(function (t) {
            "jam" === t && (this.removedToken = !0)
        }, this), G.sb("actionQueueEmptyAfterMove").add(function () {
            this.removedToken || this.spread(), this.removedToken = !1
        }, this)
    }, G.BoardJam.prototype = Object.create(G.BoardLayer.prototype), G.BoardJam.prototype.spread = function () {
        for (var t = ["U", "D", "L", "R", "I"], e = this.children.length, i = game.rnd.between(0, e - 1), s = 0; s < e; s++) {
            var a = this.children[(s + i) % e];
            Phaser.ArrayUtils.shuffle(t);
            for (var o = 0; o < t.length; o++) {
                switch (t[o]) {
                    case "U":
                        if (this.isSpreadPossible(a.cellX, a.cellY - 1)) return void this.spreadToken(a.cellX, a.cellY - 1);
                        break;
                    case "D":
                        if (this.isSpreadPossible(a.cellX, a.cellY + 1)) return void this.spreadToken(a.cellX, a.cellY + 1);
                        break;
                    case "L":
                        if (this.isSpreadPossible(a.cellX - 1, a.cellY)) return void this.spreadToken(a.cellX - 1, a.cellY);
                        break;
                    case "R":
                        if (this.isSpreadPossible(a.cellX + 1, a.cellY)) return void this.spreadToken(a.cellX + 1, a.cellY);
                        break;
                    case "I":
                        if (a.hp < this.config.maxHp) return void a.increaseHp()
                }
            }
        }
    }, G.BoardJam.prototype.isSpreadPossible = function (t, e) {
        return this.board.isCellOnBoard(t, e) && !this.getToken(t, e)
    }, G.BoardJam.prototype.spreadToken = function (t, e) {
        var i = this.createToken(t, e, 1);
        game.add.tween(i.scale).from({
            x: 0,
            y: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.Concrete = function (t, e, i, s) {
        G.BoardToken.call(this, t, {
            tokenType: "concrete"
        }, e, i, s), G.changeTexture(this, "concrete_" + this.hp)
    }, G.Concrete.prototype = Object.create(G.BoardToken.prototype), G.Concrete.prototype.onMatch = function () {
        G.sb("fx").dispatch("burstConcrete", this, this.hp), G.sfx.explosion_subtle.play(), this.hp--, G.sb("fxTop").dispatch("burstConcreteAnim", this, this), G.sfx.brick_break.play(), 0 == this.hp ? this.remove() : G.changeTexture(this, "concrete_" + this.hp)
    }, G.Dirt = function (t, e, i, s) {
        G.BoardToken.call(this, t, {
            tokenType: "dirt"
        }, e, i, s), G.changeTexture(this, "dirt_" + this.hp)
    }, G.Dirt.prototype = Object.create(G.BoardToken.prototype), G.Dirt.prototype.onMatch = function () {
        G.sb("fxTop").dispatch("burstDirtAnim", this, this), this.hp--, 0 < this.hp ? G.changeTexture(this, "dirt_" + this.hp) : this.remove()
    }, G.DirtS = function (t, e, i, s) {
        G.BoardToken.call(this, t, {
            tokenType: "dirtS"
        }, e, i, s), G.changeTexture(this, "dirt_s_" + this.hp), this.top
    }, G.DirtS.prototype = Object.create(G.BoardToken.prototype), G.DirtS.prototype.onMatch = function () {
        G.sb("fxTop").dispatch("burstDirtAnim", this, this), this.hp--, 0 < this.hp ? G.changeTexture(this, "dirt_s_" + this.hp) : this.remove()
    }, G.DirtS.prototype.increaseHp = function () {
        this.hp++, G.changeTexture(this, "dirt_s_" + this.hp)
    }, G.Ice = function (t, e, i, s) {
        G.BoardToken.call(this, t, {
            tokenType: "ice"
        }, e, i, s), G.changeTexture(this, "ice_front"), this.breakImg = G.makeImage(0, 0, null, .5, this), this.hp < 4 && G.changeTexture(this.breakImg, "ice_crack_" + this.hp)
    }, G.Ice.prototype = Object.create(G.BoardToken.prototype), G.Ice.prototype.onHit = function () {
        G.sfx.explosion_subtle.play(), G.sb("fxTop").dispatch("burstIce", this, this), this.hp--, 0 < this.hp ? G.changeTexture(this.breakImg, "ice_crack_" + this.hp) : (G.sb("fx").dispatch("smallCircle", this), this.remove())
    }, G.Jam = function (t, e, i, s) {
        G.BoardToken.call(this, t, {
            tokenType: "jam"
        }, e, i, s), G.changeTexture(this, "jam_" + this.hp)
    }, G.Jam.prototype = Object.create(G.BoardToken.prototype), G.Jam.prototype.onHit = function () {
        if (G.sfx.explosion_subtle.play(), this.hp--, 0 == this.hp) {
            this.remove();
            this.board.removeCandy(this.cellX, this.cellY, !0)
        } else G.changeTexture(this, "jam_" + this.hp)
    }, G.Jam.prototype.increaseHp = function () {
        this.hp++, G.changeTexture(this, "jam_" + this.hp)
    }, G.EditorDropPanel = function (t, e) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.goalTxt = new G.Text(0, 0, "% DROPS:", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }, [0, .5], 400), this.add(this.goalTxt), this.drops = G.lvlData.drops, this.makeField(50, "candy_chest", "chest"), this.makeField(100, "blocker_chain_wrapped", "chain"), this.makeField(150, "candy_infection", "infection"), this.makeField(200, "candy_goalCandy", "goalCandy")
    }, G.EditorDropPanel.prototype = Object.create(Phaser.Group.prototype), G.EditorDropPanel.prototype.makeField = function (t, e, i) {
        G.makeImage(50, t, e, [0, .5], this).scale.setTo(.6);
        var s = new G.Text(150, t - 30, this.drops[i] || "0", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        });
        s.inputEnabled = !0, s.input.useHandCursor = !0, s.events.onInputDown.add(function () {
            var t = prompt("Enter % of getting " + i),
                e = parseFloat(t);
            isNaN(e) || e < 0 || 100 <= e || (G.lvlData.drops[i] = e, this.setText(e.toString()))
        }, s), this.add(s)
    }, G.EditorDropZones = function (t, e) {
        Phaser.Group.call(this, game), this.board = t, this.position = t.position, this.scale = t.scale, this.dropZones = [], this.import(e)
    }, G.EditorDropZones.prototype = Object.create(Phaser.Group.prototype), G.EditorDropZones.prototype.import = function (t) {
        t && (this.update(), t.forEach(function (t, i) {
            t.forEach(function (t, e) {
                this.dropZones[i].addElement(t, e)
            }, this)
        }, this))
    }, G.EditorDropZones.prototype.export = function () {
        return this.dropZones.filter(function (t) {
            return null !== t
        }).map(function (t) {
            return t.elements
        })
    }, G.EditorDropZones.prototype.update = function () {
        for (var t = Math.max(this.dropZones.length, this.board.boardData.width), e = 0; e < t; e++) e < this.board.boardData.width ? this.dropZones[e] ? this.dropZones[e].update() : this.dropZones[e] = this.add(new G.EditorDropZone(this.board, e)) : this.dropZones[e] && (this.dropZones[e].destroy(), this.dropZones[e] = null)
    }, G.EditorDropZone = function (t, e) {
        Phaser.Group.call(this, game), this.board = t, this.col = e, this.elements = [], this.elementsObj = [], this.x = e * t.tilesize, this.y = this.getTopTile() * t.tilesize, this.gfx = game.add.graphics(), this.add(this.gfx), this.redrawGfx(), this.gfx.inputEnabled = !0, this.keys = game.input.keyboard.addKeys({
            one: Phaser.Keyboard.ONE,
            two: Phaser.Keyboard.TWO,
            three: Phaser.Keyboard.THREE,
            four: Phaser.Keyboard.FOUR,
            five: Phaser.Keyboard.FIVE,
            six: Phaser.Keyboard.SIX,
            seven: Phaser.Keyboard.SEVEN,
            eight: Phaser.Keyboard.EIGHT,
            nine: Phaser.Keyboard.NINE,
            zero: Phaser.Keyboard.ZERO,
            bs: Phaser.Keyboard.BACKSPACE
        }), this.keys.one.onDown.add(function () {
            this.onBtnPressed("1")
        }, this), this.keys.two.onDown.add(function () {
            this.onBtnPressed("2")
        }, this), this.keys.three.onDown.add(function () {
            this.onBtnPressed("3")
        }, this), this.keys.four.onDown.add(function () {
            this.onBtnPressed("4")
        }, this), this.keys.five.onDown.add(function () {
            this.onBtnPressed("5")
        }, this), this.keys.six.onDown.add(function () {
            this.onBtnPressed("6")
        }, this), this.keys.seven.onDown.add(function () {
            this.onBtnPressed("r")
        }, this), this.keys.eight.onDown.add(function () {
            this.onBtnPressed("chest")
        }, this), this.keys.nine.onDown.add(function () {
            this.onBtnPressed("goalCandy")
        }, this), this.keys.bs.onDown.add(this.removeLastElement, this)
    }, G.EditorDropZone.prototype = Object.create(Phaser.Group.prototype), G.EditorDropZone.prototype.onBtnPressed = function (t) {
        if (this.gfx.input.pointerOver()) {
            var e = Math.floor((this.gfx.worldPosition.y - game.input.activePointer.worldY) / this.board.tilesize);
            this.addElement(t, e)
        }
    }, G.EditorDropZone.prototype.addElement = function (t, e) {
        this.elementsObj[e] && this.elementsObj[e].destroy(), this.elements[e] = t, this.elementsObj[e] = G.makeImage(.5 * this.board.tilesize, (e + .5) * this.board.tilesize * -1, "candy_" + t, .5, this), this.redrawGfx()
    }, G.EditorDropZone.prototype.removeLastElement = function (t) {
        this.gfx.input.pointerOver() && 0 < this.elements.length && (this.elements.splice(-1, 1), this.elementsObj.splice(-1, 1)[0].destroy()), this.redrawGfx()
    }, G.EditorDropZone.prototype.redrawGfx = function () {
        var t = this.board.tilesize;
        this.gfx.clear(), this.gfx.beginFill(255, .5);
        var e = Math.max(1, this.elements.length + 1) * t;
        this.gfx.drawRect(0, -e, t, e)
    }, G.EditorDropZone.prototype.update = function () {
        var t = this.getTopTile();
        null === t ? this.visible = !1 : this.y = t * this.board.tilesize, this.gfx.input.pointerOver() ? this.gfx.alpha = 1 : this.gfx.alpha = .1
    }, G.EditorDropZone.prototype.getTopTile = function (t) {
        for (var e = 0; e < this.board.boardData.height; e++)
            if (this.board.isCellOnBoard(this.col, e)) return e;
        return null
    }, G.EditorGoalDropPanel = function (t, e) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), G.lvlData.goalDrops || (G.lvlData.goalDrops = []), this.goalTxt = new G.Text(0, 0, "DROPS:", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }, [0, .5], 400), this.plusBtn = new G.Button(200, 0, "plus_ico", function () {
            this.makeGoalItem(this.goals.length)
        }, this), this.minusBtn = new G.Button(240, 0, "minus_ico", function () {
            0 != this.goals.length && this.removeGoal()
        }, this), this.addMultiple([this.goalTxt, this.plusBtn, this.minusBtn]), this.goals = [], this.loadLvlDrops()
    }, G.EditorGoalDropPanel.prototype = Object.create(Phaser.Group.prototype), G.EditorGoalDropPanel.prototype.loadLvlDrops = function () {
        G.lvlData.goalDrops.forEach(function (t, e) {
            this.makeGoalItem(e, t[0], t[1])
        }, this)
    }, G.EditorGoalDropPanel.prototype.removeGoal = function () {
        this.goals.pop().destroy(), G.lvlData.goalDrops.pop()
    }, G.EditorGoalDropPanel.prototype.makeGoalItem = function (t, e, i) {
        var s = game.make.group();
        s.goalIndex = t, s.x = G.l(100), s.y = G.l(50 + 50 * t), s.allGoals = ["goalCandy"], s.goalName = e || s.allGoals[0], s.goalNr = i || 5, s.img = G.makeImage(-50, 0, null, .5, s), s.img.scale.setTo(.6), s.img.refreshGraphics = function () {
            G.changeTexture(this, G.json.settings.goals[this.parent.goalName].sprite)
        }, s.img.refreshGraphics(), s.img.inputEnabled = !0, s.img.input.useHandCursor = !0, s.img.events.onInputDown.add(function () {
            var t = s.allGoals.indexOf(s.goalName);
            s.goalName = s.allGoals[(t + 1) % s.allGoals.length], G.lvlData.goalDrops[s.goalIndex][0] = s.goalName, s.img.refreshGraphics()
        }), s.nr = new G.Text(50, 0, s.goalNr.toString(), {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        }), s.add(s.nr), s.nr.anchor.setTo(0, .5), s.nr.inputEnabled = !0, s.nr.input.useHandCursor = !0, s.nr.events.onInputDown.add(function () {
            var t = prompt("Enter moves number");
            isNaN(parseInt(t)) || (G.lvlData.goalDrops[s.goalIndex][1] = parseInt(t), s.goalNr = t, s.nr.setText(s.goalNr.toString()))
        }), this.add(s), this.goals.push(s), t >= G.lvlData.goalDrops.length && G.lvlData.goalDrops.push([s.goalName, s.goalNr])
    }, G.EditorGoalPanel = function (t, e) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.state = game.state.getCurrentState(), this.goalTxt = new G.Text(0, 0, "GOAL:", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }, [0, .5], 400), this.plusBtn = new G.Button(160, 0, "plus_ico", function () {
            "points" !== G.lvlData.goal[0] && (4 <= this.goals.length || this.makeGoalItem(this.goals.length))
        }, this), this.plusBtn.IMMEDIATE = !0, this.minusBtn = new G.Button(200, 0, "minus_ico", function () {
            "points" !== G.lvlData.goal[0] && 1 != this.goals.length && this.removeGoal()
        }, this), this.minusBtn.IMMEDIATE = !0, this.changeGoalType = new G.Button(270, 0, "minus_ico", function () {
            "points" === G.lvlData.goal[0] ? G.lvlData.goal = ["collect", [
                ["1", 5],
                ["2", 5]
            ]] : G.lvlData.goal = ["points", 5e3], this.loadLvlGoals()
        }, this), this.changeGoalType.IMMEDIATE = !0, this.changeGoalType.angle = 90, this.addMultiple([this.goalTxt, this.plusBtn, this.minusBtn, this.changeGoalType]), this.goals = [], this.normals = ["1", "2", "3", "4", "5", "6"];
        var i = "points" === G.lvlData.goal[0] ? G.lvlData.goal[1] : 1e3;
        this.pointTxt = new G.Text(50, 50, i, {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        }), this.add(this.pointTxt), this.pointTxt.anchor.setTo(0, .5), this.pointTxt.inputEnabled = !0, this.pointTxt.input.useHandCursor = !0, this.pointTxt.events.onInputDown.add(function () {
            var t = prompt("Enter points target");
            isNaN(parseInt(t)) || (G.lvlData.goal[1] = parseInt(t), this.setText(parseInt(t)))
        }, this.pointTxt), this.loadLvlGoals()
    }, G.EditorGoalPanel.prototype = Object.create(Phaser.Group.prototype), G.EditorGoalPanel.prototype.update = function () {
        if ("points" !== G.lvlData.goal[0])
            for (var t = 0; t < this.goals.length; t++) this.updateGoal(this.goals[t])
    }, G.EditorGoalPanel.prototype.loadLvlGoals = function () {
        if (this.goals.forEach(function (t) {
            t.destroy()
        }), this.goals = [], "points" == G.lvlData.goal[0]) return this.pointTxt.visible = !0, void this.pointTxt.setText(G.lvlData.goal[1]);
        this.pointTxt.visible = !1, G.lvlData.goal[1].forEach(function (t, e) {
            this.makeGoalItem(e, t[0], t[1])
        }, this)
    }, G.EditorGoalPanel.prototype.removeGoal = function () {
        this.goals.pop().destroy(), G.lvlData.goal[1].pop()
    }, G.EditorGoalPanel.prototype.makeGoalItem = function (t, e, i) {
        var s = game.make.group();
        s.goalIndex = t, s.x = G.l(50), s.y = G.l(50 + 50 * t), s.allGoals = Object.keys(G.json.settings.goals), s.goalName = e || s.allGoals[0], s.goalNr = i || 5, s.img = G.makeImage(0, 0, null, .5, s), s.img.scale.setTo(.6), s.img.refreshGraphics = function () {
            this.parent.goalName;
            G.changeTexture(this, G.json.settings.goals[this.parent.goalName].sprite)
        }, s.img.refreshGraphics(), s.img.inputEnabled = !0, s.img.input.useHandCursor = !0, s.img.events.onInputDown.add(function () {
            var t = s.allGoals.indexOf(s.goalName);
            s.goalName = s.allGoals[(t + 1) % s.allGoals.length], G.lvlData.goal[1][s.goalIndex][0] = s.goalName, s.img.refreshGraphics()
        }), s.alert = new G.Text(250, 0, "ALERT", {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        }), s.alert.anchor.setTo(0, .5), s.alert.tint = 16711680, s.alert.visible = !1, s.add(s.alert), s.nr = new G.Text(50, 0, s.goalNr.toString(), {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        }), s.add(s.nr), s.nr.anchor.setTo(0, .5), s.nr.inputEnabled = !0, s.nr.input.useHandCursor = !0, s.nr.events.onInputDown.add(function () {
            var t = prompt("Enter moves number");
            isNaN(parseInt(t)) || (G.lvlData.goal[1][s.goalIndex][1] = parseInt(t), s.goalNr = t, s.nr.setText(s.goalNr.toString()))
        }), this.add(s), this.goals.push(s), t >= G.lvlData.goal[1].length && G.lvlData.goal[1].push([s.goalName, s.goalNr])
    }, G.EditorGoalPanel.prototype.updateGoal = function (t) {
        var e = t.goalNr.toString();
        if (-1 !== this.normals.indexOf(t.goalName)) t.nr.setText(e), t.nr.fill = "#a8dbc6";
        else {
            var i, s = !1;
            "concrete" === t.goalName && (i = this.countConcrete()), "goalCandy" === t.goalName ? i = this.countGoalCandies() : "ice" === t.goalName ? i = this.countIce() : "dirt" === t.goalName ? i = this.countDirt() : "chain" === t.goalName ? (i = this.countChains(), s = 0 < G.lvlData.drops.chain) : "infection" === t.goalName && (i = this.countInfections(), s = 0 < G.lvlData.drops.infection), e += " (" + i + ")", t.nr.setText(" "), t.nr.setText(e), t.goalNr > i ? t.nr.fill = s ? "#ffa500" : "#ff0000" : t.nr.fill = "#a8dbc6"
        }
    }, G.EditorGoalPanel.prototype.countConcrete = function () {
        var e = 0;
        return this.state.board.boardCage.grid.loop(function (t) {
            null !== t && !1 !== t && e++
        }), e
    }, G.EditorGoalPanel.prototype.countGoalCandies = function () {
        var e = 0;
        return this.state.board.boardCandies.grid.loop(function (t) {
            null !== t && !1 !== t && "goalCandy" == t.candyType && e++
        }), G.lvlData.goalDrops.forEach(function (t) {
            "goalCandy" === t[0] && e++
        }), e
    }, G.EditorGoalPanel.prototype.countDirt = function () {
        var e = 0;
        return this.state.board.boardDirt.grid.loop(function (t) {
            null !== t && !1 !== t && e++
        }), e
    }, G.EditorGoalPanel.prototype.countChains = function () {
        var e = 0;
        return this.state.board.boardCandies.grid.loop(function (t) {
            null !== t && !1 !== t && t.wrapped && e++
        }), e
    }, G.EditorGoalPanel.prototype.countIce = function () {
        var e = 0;
        return this.state.board.boardIce.grid.loop(function (t) {
            null !== t && !1 !== t && e++
        }), e
    }, G.EditorGoalPanel.prototype.countInfections = function () {
        var e = 0;
        return this.state.board.boardCandies.grid.loop(function (t) {
            null !== t && !1 !== t && "infection" === t.candyType && e++
        }), e
    }, void 0 === G && (G = {}), G.EditorSidePanel = function (t) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.x = t, this.makeKeyLabels(0, 0), this.makeBoardSizeController(0, 150), this.makeMoveController(0, 220), this.makeMaxNumberController(0, 270), this.makeStarsReqController(0, 320), this.makeTutorialIdBtn(0, 370), this.goalPanel = new G.EditorGoalPanel(0, 470), this.add(this.goalPanel), this.dropPanel = new G.EditorDropPanel(350, 470), this.add(this.dropPanel), this.dropGoalPanel = new G.EditorGoalDropPanel(650, 470), this.add(this.dropGoalPanel), this.backBtn = this.makeTextBtn(0, 1370, "Back to WORLD MAP", function () {
            this.exportLevel(), game.state.start("EditorWorld", !0, !1, G.lvlNr)
        }, this), this.makeNextPrevExport(0, 1420)
    }, G.EditorSidePanel.prototype = Object.create(Phaser.Group.prototype), G.EditorSidePanel.prototype.makeTutorialIdBtn = function (t, e) {
        var i = this.add(game.add.group());
        i.position.setTo(t, e), i.label = i.add(this.makeText(0, 0, "Tutorial ID:"));
        var s = G.lvlData.tutID;
        i.switch = this.makeTextBtn(300, 0, s || "---", function () {
            var t = prompt("Enter tutorial ID");
            0 == t.length ? (delete G.lvlData.tutID, this.setText("---"), this.fill = "#a8dbc6") : (G.lvlData.tutID = t, this.setText(t), this.fill = G.json.tutorials[t] ? "green" : "orange")
        }), i.add(i.switch), s && G.json.tutorials[s] && (i.switch.fill = "green")
    }, G.EditorSidePanel.prototype.makeNextPrevExport = function (t, e) {
        this.makeTextBtn(t + 200, e, "Prev", function () {
            this.exportLevel(), game.state.start("Editor", !0, !1, Math.max(0, G.lvlNr - 1))
        }, this), this.makeTextBtn(t, e, "Play", function () {
            this.exportLevel(), game.state.start("Game", !0, !1, G.lvlNr, !0)
        }, this), this.makeTextBtn(t + 350, e, "Next", function () {
            this.exportLevel(), game.state.start("Editor", !0, !1, Math.min(G.json.levels.length - 1, G.lvlNr + 1))
        }, this), this.makeTextBtn(t + 600, e, "EXPORT", function () {
            this.exportLevel();
            var t = new Blob([JSON.stringify(G.json.levels)], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(t, "levels.json")
        }, this)
    }, G.EditorSidePanel.prototype.makeText = function (t, e, i) {
        i = new G.Text(t, e, i, {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "white",
            stroke: "black",
            strokeThickness: 5
        });
        return this.add(i), i
    }, G.EditorSidePanel.prototype.makeTextBtn = function (t, e, i, s, a) {
        return (i = new G.Text(t, e, i, {
            font: "Verdana",
            fontWeight: "bold",
            fontSize: 40,
            fill: "#a8dbc6",
            stroke: "black",
            strokeThickness: 5
        })).inputEnabled = !0, i.input.useHandCursor = !0, i.events.onInputDown.add(s, a || i), this.add(i), i
    }, G.EditorSidePanel.prototype.makeMaxNumberController = function (t, e) {
        this.maxNrGroup = this.add(game.make.group()), this.maxNrGroup.x = G.l(t), this.maxNrGroup.y = G.l(e), this.maxNrLabel = this.makeText(0, 0, "Types of candies:"), this.maxNrGroup.add(this.maxNrLabel), this.maxNrBtn = this.makeTextBtn(400, 0, G.lvlData.nrOfTypes.toString(), function () {
            var t = prompt("Enter max candy number (4 or 5)"),
                e = parseInt(t);
            isNaN(e) || (G.lvlData.nrOfTypes = parseInt(t), this.maxNrBtn.setText(parseInt(t).toString()))
        }, this), this.maxNrGroup.add(this.maxNrBtn)
    }, G.EditorSidePanel.prototype.makeMoveController = function (t, e) {
        this.moveControllerGroup = this.add(game.make.group()), this.moveControllerGroup.x = G.l(t), this.moveControllerGroup.y = G.l(e), this.moveLabel = this.makeText(0, 0, "Moves:"), this.movesNr = this.makeTextBtn(200, 0, G.lvlData.moves.toString(), function () {
            var t = prompt("Enter moves number");
            isNaN(parseInt(t)) || (G.lvlData.moves = parseInt(t), this.setText(parseInt(t).toString()))
        }), this.moveControllerGroup.addMultiple([this.moveLabel, this.movesNr])
    }, G.EditorSidePanel.prototype.makeStarsReqController = function (t, e) {
        this.starsReqGroup = this.add(game.make.group()), this.starsReqGroup.x = G.l(t), this.starsReqGroup.y = G.l(e), this.starsReqGroup.add(this.makeText(0, 0, "Stars:")), this.btns = [];
        for (var i = 0; i < 3; i++) this.btns[i] = this.makeTextBtn(200 + 150 * i, 0, G.lvlData.starsReq[i].toString(), function () {
            var t = prompt("Enter requirement for " + (this.index + 1) + " stars:"),
                e = parseInt(t);
            isNaN(e) || (G.lvlData.starsReq[this.index] = e, this.setText(e.toString()))
        }), this.btns[i].index = i;
        this.starsReqGroup.addMultiple(this.btns)
    }, G.EditorSidePanel.prototype.makeKeyPreview = function (t, e, i, s) {
        var a = game.add.group();
        a.position.setTo(t, e);
        var o = G.makeImage(0, 0, s, 0, a),
            n = new G.Text(45, 30, i, {
                font: "Verdana",
                fontWeight: "bold",
                fontSize: 20,
                fill: "white",
                stroke: "black",
                strokeThickness: 5
            }, 0);
        a.add(n), o.width = G.l(60), o.height = G.l(60), this.add(a)
    }, G.EditorSidePanel.prototype.makeBoardSizeController = function (t, e) {
        this.makeText(t, e, "Board size:"), this.widthMinus = new G.Button(t + 320, e + 30, "minus_ico", function () {
            this.state.changeBoardSize(Math.max(4, this.state.board.boardData.width - 1), Math.max(4, this.state.board.boardData.height)), this.widthText.setText(this.state.board.boardData.width)
        }, this), this.widthMinus.IMMEDIATE = !0, this.widthText = this.makeText(t + 340, e, this.state.board.boardData.width.toString()), this.widthPlus = new G.Button(t + 390, e + 30, "plus_ico", function () {
            this.state.changeBoardSize(Math.max(4, this.state.board.boardData.width + 1), Math.max(4, this.state.board.boardData.height)), this.widthText.setText(this.state.board.boardData.width)
        }, this), this.widthPlus.IMMEDIATE = !0, this.heightMinus = new G.Button(t + 440, e + 30, "minus_ico", function () {
            this.state.changeBoardSize(Math.max(4, this.state.board.boardData.width), Math.max(4, this.state.board.boardData.height - 1)), this.heightText.setText(this.state.board.boardData.height)
        }, this), this.heightMinus.IMMEDIATE = !0, this.heightText = this.makeText(t + 460, e, this.state.board.boardData.height.toString()), this.heightPlus = new G.Button(t + 510, e + 30, "plus_ico", function () {
            this.state.changeBoardSize(Math.max(4, this.state.board.boardData.width), Math.max(4, this.state.board.boardData.height + 1)), this.heightText.setText(this.state.board.boardData.height)
        }, this), this.heightPlus.IMMEDIATE = !0, this.addMultiple([this.widthMinus, this.widthPlus, this.heightPlus, this.heightMinus])
    }, G.EditorSidePanel.prototype.makeKeyLabels = function (i, s) {
        var a = {
            1: "candy_1",
            2: "candy_2",
            3: "candy_3",
            4: "candy_4",
            5: "candy_5",
            6: "candy_6",
            7: "candy_r",
            8: "candy_chest",
            9: "candy_goalCandy",
            B: "candy_spiral"
        },
            o = {
                E: "concrete_3",
                R: "dirt_2",
                T: "eraser",
                Y: "tile_1",
                W: "ice_front",
                A: "blocker_chain_wrapped",
                S: "candy_infection",
                C: "collect_cell",
                F: "dirt_s_2",
                G: "jam_2",
                S: "candy_infection",
                0: "candy_r"
            };
        Object.keys(a).forEach(function (t, e) {
            this.makeKeyPreview(i + 70 * e, s, t, a[t])
        }, this), Object.keys(o).forEach(function (t, e) {
            this.makeKeyPreview(i + 70 * e, s + 70, t, o[t])
        }, this)
    }, G.EditorSidePanel.prototype.exportLevel = function () {
        var t = new G.GridArray(this.state.board.boardData.width, this.state.board.boardData.height);
        t.loop(function (t, e, i, a) {
            a[e][i] = [], "X" == s.board.boardData.data[e][i] && a[e][i].push("X");
            var o = s.board.boardDirt.grid.data[e][i];
            o && a[e][i].push("dirt" + o.hp);
            var n = s.board.boardDirtS.grid.data[e][i];
            n && a[e][i].push("dS" + n.hp);
            var r = s.board.boardJam.grid.data[e][i];
            r && a[e][i].push("jam" + r.hp);
            var h = s.board.boardIce.grid.data[e][i];
            h && a[e][i].push("ice" + h.hp);
            var l = s.board.boardCage.grid.data[e][i];
            l && a[e][i].push("cn" + l.hp);
            var d = s.board.boardCandies.grid.data[e][i];
            if (d) {
                var c = d.candyType;
                d.blocker && (c += ":B" + d.blockerHp), d.wrapped && (c += ":W"), d.infected && (c += ":I"), d.specialType && ("horizontal" == d.specialType && (c += ":H"), "vertical" == d.specialType && (c += ":V"), "cross" == d.specialType && (c += ":C"), "spiral" == d.specialType && (c = "1:S")), a[e][i].push(c)
            }
        }, this), G.lvlData.predefinedDrops = this.state.dropZones.export(), G.lvlData.levelData = t.data
    }, G.EditorWorldSidePanel = function (t, e) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.state = game.state.getCurrentState(), this.levelNr = this.makeText(0, 0, "LEVEL: --"), this.add(this.levelNr), this.starsReq = this.makeText(0, 50, "--"), this.add(this.starsReq), this.previewBitmap = game.add.bitmapData(400, 400), this.previewBitmapImg = this.add(this.previewBitmap.addToWorld(0, 100)), this.swapUpBtn = this.makeTextButton(0, 500, "Swap Up", 50, function () {
            void 0 !== this.state.selectedLevels[0] && this.swapLevels(this.state.selectedLevels[0] + 1)
        }, this), this.add(this.swapUpBtn), this.swapDownBtn = this.makeTextButton(0, 550, "Swap Down", 50, function () {
            void 0 !== this.state.selectedLevels[0] && this.swapLevels(Math.max(0, this.state.selectedLevels[0] - 1))
        }, this), this.add(this.swapDownBtn), this.changeNumberBtn = this.makeTextButton(0, 600, "Change number", 50, function () {
            var t = parseInt(prompt("New lvl nr")) - 1;
            isNaN(t) || this.swapLevels(t)
        }, this), this.add(this.changeNumberBtn), this.removeLevelsBtn = this.makeTextButton(0, 675, "Remove Levels", 50, this.removeLevels, this), this.removeLevelsBtn.fill = "red", this.add(this.removeLevelsBtn), this.playLevelBtn = this.makeTextButton(0, 750, "Play Level", 50, function () {
            void 0 !== this.state.selectedLevels[0] && (G.lvlNr = this.state.selectedLevels[0], game.state.start("Game", !0, !1, G.lvlNr, !0))
        }, this), this.add(this.playLevelBtn), this.editLevelBtn = this.makeTextButton(0, 800, "Edit Level", 50, function () {
            void 0 !== this.state.selectedLevels[0] && game.state.start("Editor", !0, !1, this.state.selectedLevels[0])
        }, this), this.add(this.editLevelBtn), this.copyLevelBtn = this.makeTextButton(0, 850, "Copy Levels", 50, function () {
            this.copyLevels()
        }, this), this.add(this.copyLevelBtn), this.exportBtn = this.makeTextButton(0, 950, "Export JSON", 50, function () {
            var t = new Blob([JSON.stringify(G.json.levels)], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(t, "levels.json")
        }, this), this.add(this.exportBtn), this.lineEditorInit()
    }, G.EditorWorldSidePanel.prototype = Object.create(Phaser.Group.prototype), G.EditorWorldSidePanel.prototype.makeText = function (t, e, i, s) {
        i = new G.Text(t, e, i, {
            style: "font-white",
            fontSize: (s || 50) + "px"
        });
        return this.add(i), i
    }, G.EditorWorldSidePanel.prototype.makeTextButton = function (t, e, i, s, a, o) {
        return (i = this.makeText(t, e, i, s)).inputEnabled = !0, i.input.useHandCursor = !0, i.events.onInputDown.add(a, o), i
    }, G.EditorWorldSidePanel.prototype.swapLevels = function (t) {
        if (0 !== this.state.selectedLevels.length) {
            console.log("swap levels");
            var i = G.json.levels.map(function (t) {
                return {
                    mapX: t.mapX,
                    mapY: t.mapY
                }
            }),
                e = [];
            this.state.selectedLevels.forEach(function (t) {
                e.push(G.json.levels[t])
            }), e.forEach(function (t) {
                var e = G.json.levels.indexOf(t);
                0 <= e && G.json.levels.splice(e, 1)
            }), G.json.levels.splice.apply(G.json.levels, [t, 0].concat(e)), G.json.levels.forEach(function (t, e) {
                t && (t.mapX = i[e].mapX, t.mapY = i[e].mapY)
            });
            var s = e.map(function (t) {
                return G.json.levels.indexOf(t)
            });
            this.state.selectLevel(s)
        }
    }, G.EditorWorldSidePanel.prototype.copyLevels = function () {
        var t = this.state.selectedLevels.map(function (t) {
            var e = JSON.parse(JSON.stringify(G.json.levels[t]));
            return e.mapX += 150, e
        });
        G.json.levels = G.json.levels.concat(t), this.state.fillSaveState3Stars(), this.state.map.refreshButtons();
        var e = t.map(function (t) {
            return G.json.levels.indexOf(t)
        });
        this.state.selectLevel(e)
    }, G.EditorWorldSidePanel.prototype.removeLevels = function (t) {
        if (confirm("ARE YOU SURE?") && 0 !== this.state.selectedLevels.length) {
            var e = [];
            this.state.selectedLevels.forEach(function (t) {
                e.push(G.json.levels[t])
            }), e.forEach(function (t) {
                var e = G.json.levels.indexOf(t);
                0 <= e && G.json.levels.splice(e, 1)
            }), this.state.selectLevel(null)
        }
    }, G.EditorWorldSidePanel.prototype.refresh = function () {
        void 0 === s.selectedLevels[0] ? (this.levelNr.setText("LEVEL: --"), this.starsReq.setText("--"), this.previewBitmapImg.alpha = 0) : (this.previewBitmapImg.alpha = 1, G.makeLvlPreview(G.json.levels[s.selectedLevels[0]], this.previewBitmap), this.levelNr.setText("LEVEL: " + (s.selectedLevels[0] + 1)), this.starsReq.setText(G.json.levels[s.selectedLevels[0]].starsReq.toString()))
    }, G.makeLvlPreview = function (t, e) {
        var i = game.make.image(0, 0, null);
        e.clear(), e.fill(0, 0, 0, 1);
        for (var s = t.levelData.length, a = t.levelData[0].length, o = e.width / s, n = e.height / a, r = Math.min(o, n), h = {
            1: "candy_1",
            2: "candy_2",
            3: "candy_3",
            4: "candy_4",
            5: "candy_5",
            6: "candy_6",
            r: "candy_r",
            goalCandy: "candy_goalCandy",
            cn1: "concrete_1",
            cn2: "concrete_2",
            cn3: "concrete_3",
            dirt1: "dirt_1",
            dirt2: "dirt_2",
            dirt3: "dirt_3",
            ice1: "ice_front",
            ice2: "ice_front",
            ice3: "ice_front",
            chest: "candy_chest",
            infection: "candy_infection",
            dS1: "dirt_s_1",
            dS2: "dirt_s_2",
            dS3: "dirt_s_3",
            jam1: "jam_1",
            jam2: "jam_2",
            jam3: "jam_3"
        }, l = 0; l < s; l++)
            for (var d = 0; d < a; d++) {
                var c = t.levelData[l][d];
                if ("X" != c[0]) {
                    G.changeTexture(i, "tile_1"), e.draw(i, l * r, d * r, r, r);
                    for (var p = 0; p < c.length; p++) {
                        var u = c[p];
                        if ("S" != u[2])
                            if ("H" != u[2] && "V" != u[2] && "C" != u[2]) "W" == u[2] ? (G.changeTexture(i, h[u[0]]), e.draw(i, l * r, d * r, r, r), G.changeTexture(i, "blocker_chain_wrapped"), i.alpha = .5, e.draw(i, l * r, d * r, r, r), i.alpha = 1) : h[u] && (G.changeTexture(i, h[u]), e.draw(i, l * r, d * r, r, r));
                            else {
                                var g = "candy_" + u[0] + "_bonus_" + [0, "H", "V", "C"].indexOf(u[2]);
                                G.changeTexture(i, g), e.draw(i, l * r, d * r, r, r)
                            }
                        else G.changeTexture(i, "candy_spiral"), e.draw(i, l * r, d * r, r, r)
                    }
                } else G.changeTexture(i, "dark_screen"), i.tint = 0, e.draw(i, l * r, d * r, r, r), i.tint = 16777215
            }
    }, G.EditorWorldSidePanel.prototype.lineEditorInit = function () {
        this.line = this.makeText(0, 1050, "LVL LINE:\nZ-clearLine\nX-add node\nC-remove last node\nV-spread\nB-improt from lvls\nN-spread on nodes", 25), this.lvlLineX = [], this.lvlLineY = [], gfx = game.add.graphics(), gfx.sidePanel = this, gfx.update = function () {
            if (this.x = s.map.x, this.y = s.map.y, this.clear(), this.beginFill(16711680, 1), !(this.sidePanel.lvlLineX.length < 2))
                for (var t = 0; t < 1e4; t++) this.drawRect(game.math.linearInterpolation(this.sidePanel.lvlLineX, t / 1e4), game.math.linearInterpolation(this.sidePanel.lvlLineY, t / 1e4), 1, 1)
        }, this.keys = game.input.keyboard.addKeys({
            Z: Phaser.Keyboard.Z,
            X: Phaser.Keyboard.X,
            C: Phaser.Keyboard.C,
            V: Phaser.Keyboard.V,
            B: Phaser.Keyboard.B,
            N: Phaser.Keyboard.N
        }), this.keys.Z.onDown.add(function () {
            this.lvlLineX = [], this.lvlLineY = []
        }, this), this.keys.X.onDown.add(function () {
            var t = game.input.activePointer,
                e = Math.floor((t.worldX - s.map.x) * (1 / G.Loader.currentConfigMulti)),
                i = Math.floor((t.worldY - s.map.y) * (1 / G.Loader.currentConfigMulti));
            this.lvlLineX.push(e), this.lvlLineY.push(i)
        }, this), this.keys.C.onDown.add(function () {
            this.lvlLineX.pop(), this.lvlLineY.pop()
        }, this), this.keys.V.onDown.add(function () {
            var t = parseInt(prompt("FROM: ")),
                e = parseInt(prompt("TO: "));
            if (isNaN(t) && isNaN(e)) G.lineUtils.spreadAcrossLine(this.lvlLineX, this.lvlLineY, G.json.levels, "mapX", "mapY");
            else {
                isNaN(t) && !isNaN(e) && (t = 0), !isNaN(t) && isNaN(e) && (e = G.json.levels.length), t--;
                var i = G.json.levels.slice(t, e);
                G.lineUtils.spreadAcrossLine(this.lvlLineX, this.lvlLineY, i, "mapX", "mapY")
            }
            s.map.refreshButtons()
        }, this), this.keys.N.onDown.add(function () {
            console.log("N key");
            var t = parseInt(prompt("FROM: ")),
                e = parseInt(prompt("TO: "));
            if (isNaN(t) && isNaN(e)) G.lineUtils.spreadAcrossLine(this.lvlLineX, this.lvlLineY, G.json.levels, "mapX", "mapY");
            else {
                isNaN(t) && !isNaN(e) && (t = 0), !isNaN(t) && isNaN(e) && (e = G.json.levels.length), t--;
                var i = G.json.levels.slice(t, e);
                console.log("from to: " + t + "x" + e), G.lineUtils.spreadOnNodes(this.lvlLineX, this.lvlLineY, i, "mapX", "mapY")
            }
            s.map.refreshButtons()
        }, this), this.keys.B.onDown.add(function () {
            this.lvlLineX = [], this.lvlLineY = [], G.json.levels.forEach(function (t) {
                this.lvlLineX.push(t.mapX), this.lvlLineY.push(t.mapY)
            }, this)
        }, this)
    }, G.BOT = function (t) {
        Phaser.Group.call(this, game), this.board = t, this.active = !1, this.finished = !1, this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), this.spacebar.onDown.add(function () {
            this.active = !this.active
        }, this), G.sb("onGoalAchieved").add(function () {
            this.finished = !0
        }, this)
    }, G.BOT.prototype = Object.create(Phaser.Group.prototype), G.BOT.prototype.update = function () {
        this.active && !this.finished ? (G.IMMEDIATE = !0, this.active && this.board.isIdle() && this.board.possibleMoves[0] && this.makeMove()) : G.IMMEDIATE = !1
    }, G.BOT.prototype.makeMove = function () {
        var t = game.rnd.pick(this.board.possibleMoves),
            e = this.board.getCandy(t[0], t[1]),
            i = this.board.getCandy(t[2], t[3]);
        this.board.makeMove(e, i)
    }, G.BoosterTutorialText = function () {
        Phaser.Group.call(this, game), this.x = G.l(480), this.y = .8 * game.height, this.alpha = 0, this.bg = G.makeImage(0, 0, "text_shade_bg", .5, this), this.bg.alpha = 0, G.sb("onBoosterUse").add(function (t) {
            G.lvl.tutOpen || ((this.alpha = 1) == t && this.makeNewText("CANDY SWIPER CHANGES THE PLACE OF TWO CANDIES"), 2 == t && this.makeNewText("SWEET APPLE CRUSHES ONE CANDY. TAP ON CANDY YOU WANT TO CRUSH"), 3 != t && 4 != t || this.makeNewText("THE ROLLING PIN CAN CLEAR WHOLE ROW OR COLUMN"))
        }, this), G.sb("onBoosterUsed").add(function () {
            G.lvl.tutOpen || game.add.tween(this).to({
                alpha: 0
            }, 500, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(this.hide, this)
        }, this)
    }, G.BoosterTutorialText.prototype = Object.create(Phaser.Group.prototype), G.BoosterTutorialText.prototype.makeNewText = function (t) {
        this.txt = new G.Text(0, 0, {
            font: "ComicSansBold",
            fill: "white",
            fontSize: "45px",
            lineSpacing: -25
        }, .5, 940, 400, !0, "center"), this.txt.alpha = 0, this.add(this.txt), game.add.tween(this.txt).to({
            alpha: 1
        }, 500, Phaser.Easing.Sinusoidal.Out, !0), this.bg.width = this.txt.width + G.l(100), this.bg.height = this.txt.height + G.l(100), game.add.tween(this.bg).to({
            alpha: .7
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.BoosterTutorialText.prototype.changeText = function (t) {
        var e = this.txt;
        game.add.tween(e).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(e.destroy, e), this.makeNewText(t)
    }, G.BoosterTutorialText.prototype.hide = function () {
        if (this.txt) {
            var t = this.txt;
            game.add.tween(this).to({
                alpha: 0
            }, 500, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
                this.bg.alpha = 0, t.destroy()
            }, this)
        }
    }, G.CollectableAnimLayer = function (t, e) {
        Phaser.Group.call(this, game), this.board = t, this.goalPanel = e.goalPanel, G.IMMEDIATE || G.sb("onCandyToUIAnim").add(function (t, e, i, s, a) {
            if (e) {
                var o = this.goalPanel.getGoalPanel(t);
                this.getFreeParticle().init(t, e, o, i, s, a)
            } else s.call(a)
        }, this)
    }, G.CollectableAnimLayer.prototype = Object.create(Phaser.Group.prototype), G.CollectableAnimLayer.prototype.getFreeParticle = function () {
        return this.getFirstDead() || this.add(new G.CollectableAnimPart(this.board, this.goalPanel))
    }, G.CollectableAnimLayer.prototype.initNofly = function (t) {
        this.getFreeParticle().initNofly(t)
    }, G.CollectableAnimPart = function (t, e) {
        Phaser.Image.call(this, game), this.kill(), this.anchor.setTo(.5), this.board = t, this.goalPanel = e
    }, G.CollectableAnimPart.prototype = Object.create(Phaser.Image.prototype), G.CollectableAnimPart.prototype.init = function (t, e, i, s, a, o) {
        this.revive();
        var n = this.board.cellToPxOut([e.cellX, e.cellY]);
        this.x = n[0], this.y = n[1], this.scale.setTo(1), this.alpha = 1, G.changeTexture(this, s || G.json.settings.goals[t].sprite);
        var r = (i = i).img.worldPosition.x + game.world.bounds.x,
            h = i.img.worldPosition.y;
        game.add.tween(this.scale).to({
            x: 1.2,
            y: 1.2
        }, 250, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            game.add.tween(this).to({
                x: r,
                y: h,
                width: i.img.width * i.scale.x,
                height: i.img.height * i.scale.y
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function () {
                a && a.call(o), game.add.tween(this).to({
                    alpha: 0
                }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.scale).to({
                    x: 2,
                    y: 2
                }, 300, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
                    this.kill()
                }, this)
            }, this)
        }, this)
    }, G.CollectableAnimPart.prototype.initNofly = function (t) {
        this.revive(), this.x = game.world.bounds.x + t.img.worldPosition.x, this.y = t.img.worldPosition.y, this.alpha = 1, G.changeTexture(this, G.json.settings.goals[t.goalName].sprite), this.width = t.img.width * t.scale.x, this.height = t.img.height * t.scale.y, game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            this.kill()
        }, this)
    }, G.FadeLayer = function () {
        Phaser.Image.call(this, game, 0, 0), game.camera.flash(16777215, 600, !0), G.sb("onStateChange").add(this.setupChange, this), this.game.add.existing(this)
    }, G.FadeLayer.prototype = Object.create(Phaser.Image.prototype), G.FadeLayer.constructor = G.FadeLayer, G.FadeLayer.prototype.setupChange = function (t, e, i, s, a) {
        G.sfx.transition.play(), G.sfx.music.resume(), 0 < game.camera.onFadeComplete.getNumListeners() || (game.camera.onFadeComplete.addOnce(function () {
            game.state.start(t, !0, !1, e, i, s, a)
        }), game.camera.fade(16777215, 300, !0))
    }, G.FxParticle = function (t, e) {
        Phaser.Image.call(this, game), this.board = t, this.fxGroup = e, this.anchor.setTo(.5), this.kill(), this.id = Math.random(), this.animationData = {
            currentIndex: 0,
            currentTimer: 0,
            timer: 3,
            loop: 0,
            maxFrame: 0,
            gfxName: ""
        }
    }, G.FxParticle.prototype = Object.create(Phaser.Image.prototype), G.FxParticle.prototype.getOther = function () {
        return this.parent.getFreeParticle()
    }, G.FxParticle.prototype.update = function () {
        this.alive && this.updateFunc()
    }, G.FxParticle.prototype.updateAnimation = function () {
        if (this.animationData.currentTimer += G.deltaTime, this.animationData.currentTimer >= this.animationData.timer) {
            if (this.animationData.currentIndex++, this.animationData.currentTimer -= this.animationData.timer, this.animationData.currentIndex > this.animationData.maxFrame) {
                if (0 == this.animationData.loop) return this.kill();
                this.animationData.loop--, this.animationData.currentIndex = 0
            }
            G.changeTexture(this, this.animationData.gfxName + this.animationData.currentIndex)
        }
    }, G.FxParticle.prototype.initAnimation = function (t, e, i, s, a) {
        this.animationData.currentIndex = a || 0, this.animationData.currentTimer = 0, this.animationData.timer = i, this.animationData.gfxName = t, this.animationData.maxFrame = e, this.animationData.loop = s || 0, G.changeTexture(this, t + this.animationData.currentIndex), this.updateFunc = this.updateAnimation
    }, G.FxParticle.prototype.emptyFunc = function () { }, G.FxParticle.prototype.init = function (t, e) {
        this.x = t, this.y = e, this.blendMode = 0, this.alpha = 1, this.angle = 0, this.scale.setTo(1), this.updateFunc = this.emptyFunc, this.anchor.setTo(.5), this.revive()
    }, G.FxParticle.prototype.explosion = function (t, e, i) {
        this.init(t, e), this.initAnimation("cookie_match_", 10, 2, 0, 1), this.scale.setTo(.6)
    }, G.FxParticle.prototype.spiral = function (t, e, i) {
        this.init(t, e), this.initAnimation("candy_spiral_explode_", 13, 2)
    }, G.FxParticle.prototype.dummyFadeOut = function (t, e, i) {
        this.init(t, e), G.changeTexture(this, i), game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.dummyFadeOutScaleIn = function (t, e, i) {
        this.init(t, e), G.changeTexture(this, i), game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.dummyComboGrowAndFade = function (t, e, i) {
        this.fxGroup.aboveThirdFloorLayer.add(this), this.init(t, e), G.changeTexture(this, i[0]), this.angle = i[1], this.alpha = .8;
        var s = game.add.tween(this.scale).to({
            x: 2.5,
            y: 2.5
        }, 200, Phaser.Easing.Sinusoidal.In, !0);
        game.add.tween(this).to({
            alpha: 0
        }, 100, Phaser.Easing.Sinusoidal.In, !0, 100).onComplete.add(function () {
            s.stop(), this.fxGroup.add(this), this.kill()
        }, this)
    }, G.FxParticle.prototype.electricCircle = function (t, e) {
        this.init(t, e), this.blendMode = 1, G.loadTexture(this, "circle"), game.add.tween(this).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.Out, !0, 300).onComplete.add(this.kill, this), this.updateFunc = this.electricCircleUpdate, this.other = this.getOther(), this.other.blendMode = 1, G.loadTexture(this.other, "circle"), this.other.updateFunc = this.other.electricCircleUpdate, game.add.tween(this.other).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.Out, !0, 300).onComplete.add(this.other.kill, this.other)
    }, G.FxParticle.prototype.electricCircleUpdate = function () {
        this.scale.setTo(1 + .5 * Math.random())
    }, G.FxParticle.prototype.smallCircle = function (t, e) {
        this.init(t, e), this.blendMode = 1, G.loadTexture(this, "circle"), this.scale.setTo(0), this.alpha = .5, game.add.tween(this.scale).to({
            x: .5,
            y: .5
        }, 150, Phaser.Easing.Cubic.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 150, Phaser.Easing.Cubic.Out, !0, 200).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.lightCircle = function (t, e) {
        this.init(t, e), this.blendMode = 1, G.loadTexture(this, "circle"), this.scale.setTo(0), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 500, Phaser.Easing.Cubic.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Cubic.Out, !0, 200).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.lightCircleFast = function (t, e) {
        this.init(t, e), this.blendMode = 1, G.loadTexture(this, "circle"), this.scale.setTo(0), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Cubic.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 200, Phaser.Easing.Cubic.Out, !0, 100).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.changeCircle = function (t, e) {
        this.init(t, e), this.blendMode = 1, G.loadTexture(this, "circle"), this.scale.setTo(.6), game.add.tween(this.scale).to({
            x: 1.5,
            y: 1.5
        }, 600, Phaser.Easing.Cubic.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 600, Phaser.Easing.Cubic.Out, !0).onComplete.add(this.kill, this)
    }, G.FxParticle.prototype.initStroke = function (t, e, i, s) {
        this.init(t, e);
        var a = parseInt(i.candyType),
            o = "line_effect_" + game.rnd.between(1, 6);
        1 <= a && a <= 6 && (o = "line_effect_" + a), G.changeTexture(this, o), this.angle = s || 0, game.add.tween(this.scale).to({
            y: 15
        }, 500, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 100, Phaser.Easing.Cubic.In, !0, 400).onComplete.add(function () {
            this.kill()
        }, this)
    }, G.FxParticle.prototype.strokeH = function (t, e, i, s) {
        this.initStroke(t, e, s, 90)
    }, G.FxParticle.prototype.strokeV = function (t, e, i, s) {
        this.initStroke(t, e, s, 0)
    }, G.FxParticle.prototype.strokeDR = function (t, e, i, s) {
        this.initStroke(t, e, s, -45)
    }, G.FxParticle.prototype.strokeDF = function (t, e, i, s) {
        this.initStroke(t, e, s, 45)
    }, G.FxParticle.prototype.lightning = function (t, e, i) {
        this.init(t, e), G.changeTexture(this, "lightning"), this.anchor.setTo(.5, 0);
        var s = this.board.cellXToPxIn(i[0]),
            a = this.board.cellYToPxIn(i[1]);
        this.height = game.math.distance(t, e, s, a), this.rotation = game.math.angleBetween(t, e, s, a), this.angle -= 90, this.timer = 0, this.updateFunc = this.lightningUpdate, game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Cubic.In, !0).onComplete.add(function () {
            this.kill()
        }, this)
    }, G.FxParticle.prototype.lightningUpdate = function () {
        this.timer += 1 * G.deltaTime, 2 < this.timer && (this.scale.x *= -1, this.timer = 0)
    }, G.FxParticle.prototype.chocolatePart = function (t, e) {
        this.init(t, e), this.x += G.l(40 * Math.random() - 20), this.y += G.l(40 * Math.random() - 20), G.changeTexture(this, "chocolatePiece"), this.scale.setTo(.8), this.angle = 360 * Math.random(), this.velX = Math.random() * G.lnf(-12) + G.lnf(6), this.velY = Math.random() * G.lnf(-6) - G.lnf(4), this.gravity = G.lnf(.6), this.updateFunc = this.fallingPartUpdate
    }, G.FxParticle.prototype.chocolatePartW = function (t, e) {
        this.init(t, e), this.x += G.l(40 * Math.random() - 20), this.y += G.l(40 * Math.random() - 20), G.changeTexture(this, "chocolatePieceW"), this.scale.setTo(.8), this.angle = 360 * Math.random(), this.velX = Math.random() * G.lnf(-12) + G.lnf(6), this.velY = Math.random() * G.lnf(-6) - G.lnf(4), this.gravity = G.lnf(.6), this.updateFunc = this.fallingPartUpdate
    }, G.FxParticle.prototype.burstConcrete = function (t, e, i, s, a) {
        this.init(t + G.l(i), e + G.l(s)), G.changeTexture(this, a), this.burstConcreteVelX = Math.sign(i) * G.lnf(2 + 3 * Math.random()), this.burstConcreteVelY = G.lnf(-3 * Math.random() - 3), this.burstConcreteGrav = G.lnf(.6), this.updateFunc = this.burstConcreteUpdate
    }, G.FxParticle.prototype.burstConcreteUpdate = function () {
        this.x += this.burstConcreteVelX, this.y += this.burstConcreteVelY, this.angle += 2 * this.burstConcreteVelX, this.burstConcreteVelX *= .98, this.burstConcreteVelY += this.burstConcreteGrav, this.alpha -= .03, this.scale.setTo(this.scale.x + .01), this.alpha <= 0 && this.kill()
    }, G.FxParticle.prototype.burstLookup = {
        1: 17,
        2: 15,
        3: 16,
        4: 16,
        5: 16,
        6: 17
    }, G.FxParticle.prototype.burstCandy = function (t, e, i) {
        this.init(t, e), this.scale.setTo(.9), this.alpha = 1, this.initAnimation("cookie_match_", 10, 2, 0, 1)
    }, G.FxParticle.prototype.burstIce = function (t, e, i) {
        this.init(t, e), this.alpha = 1, this.scale.setTo(1), this.initAnimation("ice_part_", 13, 2, 0, 1)
    }, G.FxParticle.prototype.burstConcreteAnim = function (t, e, i) {
        this.init(t, e), this.alpha = 1, this.scale.setTo(1), this.initAnimation("concrete_part_", 17, 2, 0, 0)
    }, G.FxParticle.prototype.burstDirtAnim = function (t, e, i) {
        this.init(t, e), this.alpha = 1, this.scale.setTo(1), this.initAnimation("dirt_part_", 16, 2, 0, 0)
    }, G.FxParticle.prototype.burstInfectionAnim = function (t, e, i) {
        this.init(t, e), this.alpha = 1, this.scale.setTo(1), this.initAnimation("infection_part_", 18, 2, 0, 0)
    }, G.FxParticle.prototype.burstChainAnim = function (t, e, i) {
        this.init(t, e), this.alpha = 1, this.scale.setTo(1), this.initAnimation("unwrap_part_", 14, 2, 0, 0)
    }, G.FxParticle.prototype.glowLookup = {
        1: 8,
        2: 12,
        3: 5,
        4: 6,
        5: 11,
        6: 8
    }, G.FxParticle.prototype.whiteStarPart = function (t, e) {
        this.init(t, e), G.changeTexture(this, "starPart"), this.blendMode = 1, this.angle = 360 * Math.random(), this.velX = Math.random(20) * G.lnf(-20) + G.lnf(10), this.velY = Math.random() * G.lnf(-9) - G.lnf(3), this.gravity = G.lnf(.5), this.updateFunc = this.fallingPartUpdate
    }, G.FxParticle.prototype.fallingPartUpdate = function () {
        this.x += this.velX * G.deltaTime, this.y += this.velY * G.deltaTime, this.angle += .1 * this.velX, this.velX *= .99, this.velY += this.gravity * G.deltaTime, this.alpha -= .02, this.alpha <= 0 && this.kill()
    }, G.FxParticle.prototype.whiteStarPartFast = function (t, e) {
        this.init(t, e), G.changeTexture(this, "starPart"), this.blendMode = 1, this.angle = 360 * Math.random(), this.velX = Math.random(20) * G.lnf(-20) + G.lnf(10), this.velY = Math.random() * G.lnf(-9) - G.lnf(3), this.gravity = G.lnf(.25), this.updateFunc = this.fallingPartUpdate
    }, G.addTextStyles = function () {
        G.Text.addStyle("font-white", {
            font: "ComicSansBold",
            fill: "white",
            fontSize: 40,
            stroke: "#85511f",
            strokeThickness: 5
        }), G.Text.addStyle("font-white-stroke", {
            font: "ComicSansBold",
            fill: "white",
            fontSize: 40,
            stroke: "#85511f",
            strokeThickness: 5
        }), G.Text.addStyle("font-green", {
            font: "ComicSansBold",
            fill: "#f7ffdb",
            fontSize: 40,
            stroke: "#005700",
            strokeThickness: 5
        }), G.Text.addStyle("font-beige", {
            font: "ComicSansBold",
            fill: "#ece9e5",
            fontSize: 40,
            stroke: "#85511f",
            strokeThickness: 5
        }), G.Text.addStyle("font-beige-standard", {
            font: "ComicSansBold",
            fill: "#fdfbe4",
            fontSize: 40,
            stroke: "#73461c",
            strokeThickness: 7
        }), G.Text.addStyle("font-beige-header", {
            font: "ComicSansBold",
            fill: "#ece9e5",
            fontSize: 40,
            stroke: "#85511f",
            strokeThickness: 5
        }), G.Text.addStyle("font-brown", {
            font: "ComicSansBold",
            fill: "#ece9e5",
            fontSize: 40,
            stroke: "#A0692E",
            strokeThickness: 7
        }), G.Text.addStyle("font-red", {
            font: "ComicSansBold",
            fill: "#ffe9d0",
            fontSize: 40,
            stroke: "#961400",
            strokeThickness: 7
        }), G.Text.addStyle("font-blue-out", {
            font: "ComicSansBold",
            fill: "#ffffe8",
            fontSize: 40,
            stroke: "#004455",
            strokeThickness: 10
        }), G.Text.addStyle("font-blue-out-small", {
            font: "ComicSansBold",
            fill: "#ffffe8",
            fontSize: 40,
            stroke: "#004455",
            strokeThickness: 5
        }), G.Text.addStyle("font-gray", {
            font: "ComicSansBold",
            fill: "white",
            fontSize: 40,
            stroke: "#393939",
            strokeThickness: 5
        }), G.Text.addStyle("font-white", {
            font: "Lobster",
            fill: "white",
            fontSize: "30px",
            shadow: [2, 3, "rgba(0,0,0,0.3)", 0]
        }), G.Text.addStyle("font-blue", {
            font: "Lobster",
            fill: "#008aca",
            fontSize: "30px"
        }), G.Text.addStyle("font-darkBlue", {
            font: "Lobster",
            fill: "#006A8F",
            fontSize: "30px"
        }), G.Text.addStyle("font-num-blue", {
            font: "Lobster",
            fill: "white",
            fontSize: "30px",
            stroke: "#3d95ea",
            strokeThickness: 3
        }), G.Text.addStyle("font-num-orange", {
            font: "Lobster",
            fill: "white",
            fontSize: "30px",
            stroke: "#ff7200",
            strokeThickness: 3
        }), G.Text.addStyle("font-score-0", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#eea1c2"
        }), G.Text.addStyle("font-score-1", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#c52216"
        }), G.Text.addStyle("font-score-2", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#1eb3e5"
        }), G.Text.addStyle("font-score-3", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#eac867"
        }), G.Text.addStyle("font-score-4", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#e34bbc"
        }), G.Text.addStyle("font-score-5", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#7adc2c"
        }), G.Text.addStyle("font-score-6", {
            font: "RubikBold",
            fontSize: "50px",
            stroke: "white",
            strokeThickness: 8,
            fill: "#e79909"
        }), G.Text.addStyle("rubikWB", {
            font: "RubikBold",
            fontSize: "40px",
            stroke: "#49abe8",
            strokeThickness: 6,
            fill: "white"
        }), G.Text.addStyle("rubikPW", {
            font: "RubikBold",
            fontSize: "40px",
            stroke: "white",
            strokeThickness: 6,
            fill: "#EC048D"
        })
    }, void 0 === G && (G = {}), G.Button = function (t, e, i, s, a) {
        Phaser.Button.call(this, game, G.l(t), G.l(e), null), this.state = game.state.getCurrentState(), G.changeTexture(this, i), this.anchor.setTo(.5), this.sfx = G.sfx.pop, this.active = !0, this.onClick = new Phaser.Signal, s && this.onClick.add(s, a || this), this.onInputDown.add(this.click, this), this.terms = [], this.IMMEDIATE = !1, this.pulsing = !1, this.tweenScale = !1
    }, G.Button.prototype = Object.create(Phaser.Button.prototype), G.Button.constructor = G.Button, G.Button.prototype.pulse = function (t) {
        this.pulsing = !0, this.pulsingTween = game.add.tween(this.scale).to({
            x: t || 1.1,
            y: t || 1.1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.Button.prototype.stopPulse = function (t) {
        this.pulsingTween && this.pulsingTween.stop(), this.scale.setTo(t || 1), this.pulsing = !1
    }, G.Button.prototype.click = function () {
        if (this.active) {
            for (var t = 0; t < this.terms.length; t++)
                if (!this.terms[t][0].call(this.terms[t][1])) return;
            this.active = !1, this.onClick.dispatch(), this.sfx.play();
            var e = this.scale.x,
                i = this.scale.y;
            this.IMMEDIATE ? this.active = !0 : this.pulsing ? game.time.events.add(400, function () {
                this.active = !0
            }, this) : game.add.tween(this.scale).to({
                x: this.tweenScale ? this.tweenScale.x : e + .2 * Math.sign(e),
                y: this.tweenScale ? this.tweenScale.y : i + .2 * Math.sign(i)
            }, 200, Phaser.Easing.Quadratic.Out, !0).onComplete.add(function () {
                game.add.tween(this.scale).to({
                    x: e,
                    y: i
                }, 200, Phaser.Easing.Quadratic.Out, !0).onComplete.add(function () {
                    this.active = !0
                }, this)
            }, this)
        }
    }, G.Button.prototype.addTerm = function (t, e) {
        this.terms.push([t, e])
    }, G.Button.prototype.addImageLabel = function (t) {
        this.label = game.make.image(0, 0, "ssheet", t), this.label.anchor.setTo(.5), this.addChild(this.label)
    }, G.Button.prototype.addTextLabel = function (t, e, i, s, a, o) {
        var n = 1 / G.Loader.currentConfigMulti;
        s = void 0 === s ? 0 : s, a = void 0 === a ? -6 : a, o = void 0 === o ? this.width * n * .7 : o, this.label = new G.Text(s, a, e, {
            style: t,
            fontSize: i || Math.floor(this.height * n * .7)
        }, .5, o), this.label.scale.setTo(Math.min(this.label.scale.x, this.label.scale.y)), this.label.hitArea = new Phaser.Rectangle(0, 0, 0, 0), this.addChild(this.label)
    }, G.Button.prototype.addTextLabelMultiline = function (t, e) {
        this.label = new G.Text(0, 0, e, {
            style: t,
            fontSize: Math.floor(.5 * this.height)
        }, .5, .7 * this.width, .7 * this.height, !0, "center"), this.addChild(this.label)
    }, G.ChestLayer = function () {
        Phaser.Group.call(this, game), this.deadElems = [], this.state = game.state.getCurrentState(), this.board = this.state.board, this.deadArray = [], G.sb("onChestOpen").add(function (t) {
            var e = this.board.cellToPxOut([t.cellX, t.cellY]);
            this.getFreeParticle().init(e[0], e[1]), this.sort("orgY", Phaser.Group.SORT_ASCENDING)
        }, this)
    }, G.ChestLayer.prototype = Object.create(Phaser.Group.prototype), G.ChestLayer.prototype.onElemKilled = function (t) {
        this === t.parent && (this.deadArray.push(t), this.removeChild(t))
    }, G.ChestLayer.prototype.getFreeParticle = function () {
        return 0 < this.deadArray.length ? part = this.deadArray.pop() : (part = new G.Chest(this.board, this), part.events.onKilled.add(this.onElemKilled, this)), this.add(part), part
    }, G.Chest = function () {
        Phaser.Image.call(this, game, 0, 0), G.changeTexture(this, "chest_bottom"), this.anchor.setTo(.5), this.state = game.state.getCurrentState(), this.cover = G.makeImage(-33, 0, null, [0, 1], this), this.light = G.makeImage(0, -20, "popup_lighht", .5, this), this.light.scale.setTo(.5), this.light.cacheAsBitmap = !0, this.light.blendMode = 1, this.addChild(this.light), this.gift = G.makeImage(0, -10, null, .5, this), this.animTimer = 0, this.animEvery = 3, this.animIndex = 0, this.coverCoords = [
            [G.l(-33), 0],
            [G.l(-33), G.l(-8)],
            [G.l(-33), G.l(-8)],
            [G.l(-35), G.l(-8)]
        ], this.kill()
    }, G.Chest.prototype = Object.create(Phaser.Image.prototype), G.Chest.prototype.init = function (t, e) {
        G.stopTweens(this), G.changeTexture(this.cover, "chest_top_00"), this.cover.y = 0, this.orgX = t, this.orgY = e, this.alpha = 1, this.scale.setTo(1), this.animTimer = 0, this.animIndex = 0, this.x = t, this.y = e + G.l(5), this.light.alpha = 0, game.add.tween(this).to({
            y: e - G.l(30)
        }, 1500, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.scale).to({
            x: 1.2,
            y: 1.2
        }, 400, Phaser.Easing.Sinusoidal.Out, !0), G.stopTweens(this.gift), this.giftData = G.gift.getGift("ingamechests"), G.changeTexture(this.gift, G.gift.getIcon(this.giftData)), "coin" == this.giftData[0] && (1 == this.giftData[1] ? G.changeTexture(this.gift, "coin_package_icon_0") : 2 == this.giftData[1] ? G.changeTexture(this.gift, "coin_package_icon_1") : 3 == this.giftData[1] ? G.changeTexture(this.gift, "coin_package_icon_2") : G.changeTexture(this.gift, "coin_package_icon_4")), this.gift.scale.setTo(0), this.gift.angle = -10, this.gift.y = G.l(-10), this.update = this.updatePreOpen, this.revive(), G.sfx.chest_open_louder.play()
    }, G.Chest.prototype.updatePreOpen = function () {
        if (this.alive) {
            if (this.animIndex < 3 && this.animTimer++ % this.animEvery == 0 && (this.animIndex++, this.cover.x = this.coverCoords[this.animIndex][0], this.cover.y = this.coverCoords[this.animIndex][1], G.changeTexture(this.cover, "chest_top_0" + this.animIndex), 3 == this.animIndex)) {
                game.add.tween(this.gift.scale).to({
                    x: 1,
                    y: 1
                }, 600, Phaser.Easing.Bounce.Out, !0), game.add.tween(this.gift).to({
                    y: G.l(-40)
                }, 400, Phaser.Easing.Sinusoidal.InOut).to({
                    y: G.l(-30)
                }, 1100, Phaser.Easing.Sinusoidal.Out).start(), game.add.tween(this.gift).to({
                    angle: 10
                }, 1500, Phaser.Easing.Sinusoidal.InOut, !0), game.time.events.add(1e3, function () {
                    G.gift.applyGift(this.giftData, !0), game.add.tween(this).to({
                        alpha: 0
                    }, 500, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function () {
                        this.kill()
                    }, this)
                }, this)
            }
            this.light.angle++, this.light.alpha = game.math.clamp(this.light.alpha + .03, 0, .5)
        }
    }, G.DotBg = function (t) {
        this.texture = game.add.renderTexture(game.width, game.height), this.marker = G.makeImage(0, 0, "background_star_tile", 0, null), this.marker.alpha = .4, this.img = game.add.image(0, 0, this.texture), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.DotBg.prototype = Object.create(Phaser.Image.prototype), G.DotBg.prototype.onScreenResize = function () {
        this.texture.resize(game.width, game.height), this.texture.clear(), this.img.x = game.world.bounds.x;
        for (var t = 0; t < game.width; t += this.marker.width)
            for (var e = 0; e < game.height; e += this.marker.height) this.texture.renderXY(this.marker, t, e)
    }, G.FxMapLayer = function () {
        G.PoolGroup.call(this, G.FxMapPart), this.fixedToCamera = !0, G.sb("fxMap").add(this.init, this)
    }, G.FxMapLayer.prototype = Object.create(G.PoolGroup.prototype), G.FxMapPart = function () {
        G.Image.call(this), this.state = game.state.getCurrentState()
    }, G.FxMapPart.prototype = Object.create(G.Image.prototype), G.FxMapPart.prototype.emptyUpdate = function () { }, G.FxMapPart.prototype.reset = function (t) {
        this.x = t.position ? t.position.x : t.x, this.y = t.position ? t.position.y : t.y, this.anchor.setTo(.5), this.scale.setTo(1), this.alpha = 1, this.angle = 0, this.blendMode = 0, this.changeTexture(null), this.visible = !0, this.update = this.emptyUpdate, this.revive()
    }, G.FxMapPart.prototype.init = function (t, e) {
        this.reset(e), this[t] ? this[t].apply(this, arguments) : console.warn("There is no " + t + " in G.FxPart")
    }, G.FxMapPart.prototype.star = function (t, e) {
        this.changeTexture("starPart"), this.blendMode = 1, this.alpha = e.alpha || 1, this.grav = void 0 === e.grav ? 0 : e.grav, this.timer = e.timer || game.rnd.between(20, 40), this.blendMode = 0, this.scale.setTo(e.scale || .7), this.velX = e.velX || game.rnd.realInRange(-10, 10), this.velY = e.velY || game.rnd.realInRange(-20, -8), this.velAngle = game.rnd.realInRange(-5, 5), this.angle = game.rnd.realInRange(0, 360), this.update = this.starUpdate
    }, G.FxMapPart.prototype.starUpdate = function () {
        this.x += this.velX, this.y += this.velY, this.velX *= .95, this.velY *= .95, this.angle += this.velAngle, this.timer-- < 0 && (this.alpha -= .05, this.alpha <= 0 && this.kill())
    }, G.gameTracking = {
        sink: function (t, e, i, s) {
            console.log("sink", t, e, i, s);
            try {
                sdkHandler.trigger("gameTracking", {
                    event: "Sink",
                    dimension1: t ? t.toString() : void 0,
                    dimension2: e ? e.toString() : void 0,
                    dimension3: i ? i.toString() : void 0,
                    value: s || 1
                })
            } catch (t) {
                console.log(t)
            }
        },
        source: function (t, e, i, s) {
            console.log("source", t, e, i, s);
            try {
                sdkHandler.trigger("gameTracking", {
                    event: "Source",
                    dimension1: t ? t.toString() : void 0,
                    dimension2: e ? e.toString() : void 0,
                    dimension3: i ? i.toString() : void 0,
                    value: s || 1
                })
            } catch (t) {
                console.log(t)
            }
        },
        start: function (t, e, i, s) {
            try {
                sdkHandler.trigger("gameTracking", {
                    event: "Start",
                    dimension1: t ? t.toString() : void 0,
                    dimension2: e ? e.toString() : void 0,
                    dimension3: i ? i.toString() : void 0,
                    value: s
                })
            } catch (t) {
                console.log(t)
            }
        },
        fail: function (t, e, i, s) {
            try {
                sdkHandler.trigger("gameTracking", {
                    event: "Fail",
                    dimension1: t ? t.toString() : void 0,
                    dimension2: e ? e.toString() : void 0,
                    dimension3: i ? i.toString() : void 0,
                    value: s
                })
            } catch (t) {
                console.log(t)
            }
        },
        complete: function (t, e, i, s) {
            try {
                sdkHandler.trigger("gameTracking", {
                    event: "Complete",
                    dimension1: t ? t.toString() : void 0,
                    dimension2: e ? e.toString() : void 0,
                    dimension3: i ? i.toString() : void 0,
                    value: s
                })
            } catch (t) {
                console.log(t)
            }
        },
        design: function (t, e) {
            try {
                sdkHandler.trigger("gameTracking", {
                    event: "Design",
                    dimension1: t ? t.toString() : void 0,
                    value: e
                })
            } catch (t) {
                console.log(t)
            }
        },
        init: function () {
            this.onInitFinished = new Phaser.Signal, sdkHandler.trigger("restore", {
                key: "ftueEventsData",
                callback: function (t, e) {
                    t ? console.log(t) : (this.ftueData = null === e ? {} : JSON.parse(e), this.initialized = !0, this.onInitFinished.dispatch())
                }
            }, this)
        },
        FTUEDesign: function (t, e) {
            this.initialized, this._FTUEDesign(t, e)
        },
        _FTUEDesign: function (t, e) {
            this.ftueData[t] || (console.log("FTUE EVENT: ", t, e), this.ftueData[t] = !0, this.design(t, e), sdkHandler.trigger("save", {
                key: "ftueEventsData",
                value: JSON.stringify(this.ftueData),
                callback: function () { }
            }))
        },
        checkFTUE: function (t) {
            return this.ftueData[t]
        }
    }, G.ga = {
        event: function () { }
    }, G.gift = {}, G.gift.getGift = function (t) {
        t = t || "normals";
        var e = G.json.settings.gifts[t],
            i = e.boosterMaxNr || G.json.settings.gifts.boosterMaxNr,
            s = e.boosterChance || G.json.settings.gifts.boosterChance,
            a = [];
        e.list.forEach(function (t) {
            "coin" == t[0] ? a.push(t) : -1 !== t[0].indexOf("booster") ? G.saveState.isBoosterUnlocked(parseInt(t[0][8])) && G.saveState.getBoosterAmount(parseInt(t[0][8])) < i && a.push(t) : "ginger" === t[0] && G.GINGEREVENT && a.push(t)
        }), Phaser.ArrayUtils.shuffle(a);
        for (var o = Math.random() < s, n = 0; n < a.length; n++) {
            var r = a[n];
            if (-1 === r[0].indexOf("booster")) return r.slice();
            if (o) return r.slice()
        }
        return ["coin", 50]
    }, G.gift.getLabelString = function (t, e) {
        var i = "coin" === t[0] ? "" : "x";
        e = e ? "*" + e + "*" : "";
        return t[1] + i + "@" + e + G.json.settings.gifts.icons[t[0]] + "@"
    }, G.gift.applyGift = function (t, e) {
        "coin" == t[0] ? G.saveState.changeCoins(t[1], e) : "life" == t[0] ? G.saveState.addLife(t[1], e) : "ginger" == t[0] ? G.saveState.addGinger(t[1]) : G.saveState.changeBoosterAmount(parseInt(t[0][8]), t[1], e)
    }, G.gift.getIcon = function (t) {
        return G.json.settings.gifts.icons[t[0]]
    }, G.gift.processRandomBoosters = function (t) {
        if ("coin" === t[0] && "R" !== t[0][8]) return t;
        var e = [1, 2, 3, 4, 5, 6, 7, 8].filter(function (t) {
            return G.saveState.isBoosterUnlocked(t)
        });
        return 0 < e.length ? t[0] = "booster#" + game.rnd.pick(e) : (t[0] = "coin", t[1] = t[1] * G.json.settings.gifts.fallbackCoins), t
    }, G.gift.getLabelPackString = function (t) {
        var s = "";
        return t.forEach(function (t, e, i) {
            s += G.gift.getLabelString(t, 1), e !== i.length - 1 && (s += " ")
        }), s
    }, G.GiftBox = function (t, e, i, s) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.giftData = s || G.gift.getGift("normals"), this.giftData = G.gift.processRandomBoosters(this.giftData), this.x = t, this.y = e, this.light = G.makeImage(0, 0, "popup_lighht", .5, this), this.light.update = function () {
            this.angle++
        }, this.light.alpha = 0, this.light.blendMode = 1, this.inside = new G.LabelGroupT(G.gift.getLabelString(this.giftData), 0, 0, {
            font: "ComicSansBold",
            fontSize: "120px",
            fill: "#FDFBE4",
            stroke: "#A0692E",
            strokeThickness: 7
        }, .5, 180), this.add(this.inside), this.inside.alpha = 0, this.gift = G.makeImage(0, 0, "gift", .5, this), i && (this.gift.inputEnabled = !0, this.gift.events.onInputDown.add(function () {
            this.gift.inputEnabled = !1, this.unpack()
        }, this), this.hand = G.makeImage(30, 40, "tut_hand", 0, this), this.hand.scale.setTo(.6), game.add.tween(this.hand).to({
            x: G.l(50),
            y: G.l(60)
        }, 600, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0))
    }, G.GiftBox.prototype = Object.create(Phaser.Group.prototype), G.GiftBox.prototype.unpack = function (t) {
        if ("coin" == this.giftData[0] && "World" == game.state.current && this.state.uiTargetParticles) {
            this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.worldPosition.x, this.worldPosition.y, this.state.panel.coinsTxt, this.giftData[1]);
            this.state.uiTargetParticles.createDividedBatch(this.worldPosition.y, "coin_1", this.state.panel.coinsTxt, this.giftData[1], 5)
        } else G.gift.applyGift(this.giftData);
        G.sfx.xylophone_positive_12.play(), game.add.tween(this.gift).to({
            alpha: 0,
            width: 1.2 * this.gift.width,
            height: 1.2 * this.gift.height
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.light).to({
            alpha: .5
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.inside).to({
            alpha: 1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), this.hand && game.add.tween(this.hand).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.InOut, !0)
    }, G.GlobalGoalButton = function (t, e) {
        Phaser.Group.call(this, game), this.position.setTo(0, 130), this.unlocked = G.saveState.getLastPassedLevelNr() >= G.json.settings.featuresUnlock.globalGoals, this.tutorial = this.unlocked && !G.saveState.data.sawGlobalGoalsTut, this.x = G.l(t), this.y = G.l(e), this.state = game.state.getCurrentState(), this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.blendMode = 1, this.glow.scale.setTo(.5), this.glow.alpha = 0, this.importantStuff = G.globalGoalMgr.isAnyToUserAttention(), this.goalBtn = new G.Button(0, 0, this.unlocked ? "Mission_Button_yellow" : "Mission_Button_locked_yellow", function () {
            new G.Window("globalGoals")
        }), this.goalBtn.addTerm(function () {
            return this.unlocked
        }, this), this.add(this.goalBtn), this.unlocked ? this.initUnlocked() : this.initLocked(), this.tutorial && this.addTutHand(), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.GlobalGoalButton.prototype = Object.create(Phaser.Group.prototype), G.GlobalGoalButton.prototype.onResize = function () {
        var t = game.world.bounds.x + Math.floor(.5 * game.width);
        game.width < 1070 ? this.x = t - 265 : this.x = t - 265 - 235
    }, G.GlobalGoalButton.prototype.initUnlocked = function () {
        this.amount = G.makeImage(20, 15, "booster_ammount", .5, this), this.amount.scale.setTo(.75), this.amountTxt = this.amount.addChild(new G.Text(0, 2, this.importantStuff.toString(), {
            style: "font-beige-standard",
            fontSize: "30px"
        }, .5)), this.reasons = [], G.globalGoalMgr.isAnyToUserAttention() && (this.reasons = G.globalGoalMgr.getAttentionReason()), G.sb("onGlobalGoalOutOfTime").add(function (t) {
            this.reasons.push(t.status)
        }, this), this.duringMessage = !1, this.txtLookUp = {
            inactive: "New mission available",
            achieved: "Mission completed",
            failed: "Mission failed"
        }, this.initDelay = 30
    }, G.GlobalGoalButton.prototype.initLocked = function () {
        this.unlockTxt = new G.Text(95, 0, G.txt("Unlock at Level X").replace("X", G.json.settings.featuresUnlock.globalGoals + 1), {
            fill: "#fdfbe4",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#73461c",
            strokeThickness: 5
        }, .5, 150, 150, !0, "center"), this.unlockTxt.lineSpacing = -15, this.unlockTxt.setShadow(0, 0, "black", 3), this.add(this.unlockTxt), game.add.tween(this.unlockTxt.scale).to({
            x: .9,
            y: .9
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.GlobalGoalButton.prototype.update = function () {
        if (this.unlocked) {
            var t = this.importantStuff;
            this.importantStuff = G.globalGoalMgr.isAnyToUserAttention(), t !== this.importantStuff && this.amountTxt.setText(this.importantStuff.toString()), this.amount.alpha = 0 == this.importantStuff ? 0 : 1, this.glow.angle++, 0 < this.importantStuff ? this.glow.alpha = Math.min(this.glow.alpha + .05, .4) : this.glow.alpha = Math.max(this.glow.alpha - .05, 0), this.updateMsg()
        }
    }, G.GlobalGoalButton.prototype.updateMsg = function () {
        if (!(0 < this.state.windowLayer.children.length)) {
            if (this.initDelay-- < 0 && this.reasons[0] && !this.duringMessage) {
                var t = this.txtLookUp[this.reasons[0]];
                this.reasons.splice(0, 1);
                var e = new G.Text(60, 0, G.txt(t), {
                    fill: "#fdfbe4",
                    font: "ComicSansBold",
                    fontSize: "30px",
                    stroke: "#73461c",
                    strokeThickness: 7
                }, [0, .5], 300);
                e.scale.x = 0, game.add.tween(e.scale).to({
                    x: 1
                }, 300, Phaser.Easing.Elastic.Out, !0), this.add(e), this.duringMessage = !0, game.add.tween(e).to({
                    alpha: 0
                }, 500, Phaser.Easing.Sinusoidal.In, !0, 2e3).onComplete.add(function () {
                    this.duringMessage = !1, e.destroy()
                }, this)
            }
        }
    }, G.GlobalGoalButton.prototype.addTutHand = function () {
        this.tutHand = G.makeImage(0, 10, "tut_hand", 0, this), game.add.tween(this.tutHand).to({
            x: G.l(10),
            y: G.l(20)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.goalBtn.onClick.addOnce(function () {
            this.tutHand && (this.tutHand.destroy(), this.tutHand = null, G.saveState.data.sawGlobalGoalsTut = !0)
        }, this)
    }, G.GlobalGoalMgr = function () {
        this.globalGoalsTemplates = G.json.settings.globalGoals, this.loadGoals(), this.lastSave = 15, setInterval(function () {
            G.sb("onWallClockTimeUpdate").dispatch(Date.now())
        }, 1e3), G.sb("onGlobalGoalOutOfTime").addPermanent(this.saveGoals, this), G.sb("onWallClockTimeUpdate").addPermanent(this.updateTimers, this)
    }, G.GlobalGoalMgr.prototype.saveGoals = function () {
        var e = [];
        this.goals.forEach(function (t) {
            e.push(t.stringify())
        }), G.saveState.data.globalGoals = e, G.saveState.save()
    }, G.GlobalGoalMgr.prototype.loadGoals = function () {
        if (this.goals = [], !(G.saveState.getLastPassedLevelNr() < G.json.settings.featuresUnlock.globalGoals))
            for (G.saveState.data.globalGoals.forEach(function (t) {
                this.goals.push(this.parseGoal(t))
            }, this); this.goals.length < 4;) this.createNewGoal()
    }, G.GlobalGoalMgr.prototype.unlockCheck = function () {
        0 === this.goals.length && G.saveState.getLastPassedLevelNr() >= G.json.settings.featuresUnlock.globalGoals && this.loadGoals()
    }, G.GlobalGoalMgr.prototype.updateTimers = function (t) {
        for (var e = 0; e < this.goals.length; e++) this.goals[e].updateTimer(t)
    }, G.GlobalGoalMgr.prototype.isAnyToUserAttention = function () {
        for (var t = 0, e = 0; e < this.goals.length; e++) "active" != this.goals[e].status && t++;
        return t
    }, G.GlobalGoalMgr.prototype.getAttentionReason = function () {
        for (var t = [], e = 0; e < this.goals.length; e++) "active" != this.goals[e].status && -1 == t.indexOf(this.goals[e].status) && t.push(this.goals[e].status);
        return t
    }, G.GlobalGoalMgr.prototype.parseGoal = function (t) {
        var e = JSON.parse(t),
            i = new G.GlobalGoal(e.id, e.description, e.listener, e.terms, e.increaser, e.target, e.timeDuration, e.afterIncreaseCallbackName, e.reward, e.rewardHidden, e.cancelationPrice);
        return i.status = e.status, i.current = e.current, e.timeBeginingDate && (i.timeBinding = G.sb("onWallClockTimeUpdate").addPermanent(i.updateTimer, this), i.timeBeginingDate = e.timeBeginingDate, i.updateTimer(Date.now())), i
    }, G.GlobalGoalMgr.prototype.removeAndPushNew = function (t) {
        var e = t.id,
            i = this.goals.indexOf(t);
        this.goals.splice(i, 1), t.destroy(), G.sb("onGlobalGoalRemove").dispatch(t, i);
        var s = this.createNewGoal(e);
        return this.saveGoals(), s
    }, G.GlobalGoalMgr.prototype.createNewGoal = function (t) {
        var e = [];
        void 0 !== t && e.push(t);
        for (var i = 0; i < this.goals.length; i++) e.push(this.goals[i].id);
        var s = G.saveState.getLastPassedLevelNr(),
            a = this.globalGoalsTemplates.filter(function (t) {
                if (t.levelRangeRequired && Array.isArray(t.levelRangeRequired)) {
                    var e = t.levelRangeRequired[0],
                        i = t.levelRangeRequired[1];
                    return e <= s && s < i
                }
                return !0
            });
        for (a.length < 4 && (a = this.globalGoalsTemplates); ;) {
            var o = Math.floor(Math.random() * a.length);
            if (-1 == e.indexOf(a[o].id)) break
        }
        var n = a[o],
            r = G.saveState.getLastPassedLevelNr() / G.json.levels.length;
        if (n.levelRangeRequired && Array.isArray(n.levelRangeRequired)) {
            var h = n.levelRangeRequired[1] - n.levelRangeRequired[0];
            r = (s - n.levelRangeRequired[0]) / h, r = game.math.clamp(r, 0, 1)
        }
        var l = this.prepareArgumentsArray(n, r),
            d = new (Function.prototype.bind.apply(G.GlobalGoal, [null].concat(l)));
        return d.timeRestriction || d.start(), this.goals.push(d), G.sb("onGoalCreated").dispatch(d, this.goals.indexOf(d)), d
    }, G.GlobalGoalMgr.safetyCheck = function () {
        function t(s) {
            return G.json.settings.globalGoals.filter(function (t) {
                if (t.levelRangeRequired && Array.isArray(t.levelRangeRequired)) {
                    var e = t.levelRangeRequired[0],
                        i = t.levelRangeRequired[1];
                    return e <= s && s < i
                }
                return !0
            })
        }
        for (var e = 0; e < G.json.levels.length++; e++) {
            var i = t(e).length;
            console.log(e, i)
        }
    }, G.GlobalGoalMgr.prototype.prepareArgumentsArray = function (t, e) {
        var i = t.targetRange[0] + 5 * Math.floor((t.targetRange[1] - t.targetRange[0]) * e / 5),
            s = !1;
        void 0 !== t.terms && (s = JSON.parse(JSON.stringify(t.terms)));
        var a = !1;
        void 0 !== t.timeRange && Math.random() < .3 && (a = t.timeRange[0] + 5 * Math.floor((t.timeRange[1] - t.timeRange[0]) * e / 5));
        var o = G.gift.getGift("missions");
        return [t.id, t.description.replace("%TARGET%", i.toString()), t.listener, s, t.increaser, i, a, t.afterIncrease, o, Math.random() < .4]
    }, G.GlobalGoal = function (t, e, i, s, a, o, n, r, h, l, d) {
        this.id = t, this.reward = h, this.rewardHidden = l || !1, this.description = e, this.status = "inactive", this.listenerBinding = G.sb(i).addPermanent(this.onListener, this), this.listener = i, this.current = 0, this.target = o, this.timeRestriction = n || !1, this.timeDuration = n || 0, this.timeBeginingDate = !1, this.cancelationPrice = d || 5 * game.rnd.between(G.json.settings.priceOfGoalRemove[0] / 5, G.json.settings.priceOfGoalRemove[1] / 5), this.terms = s, this.increaser = a, this.afterIncreaseCallback = this.customAfterIncrease[r] || !1, this.afterIncreaseCallbackName = r || "", this.onFinish = new Phaser.Signal
    }, G.GlobalGoal.prototype.customAfterIncrease = {
        pushPassedLevelToTerms: function (t) {
            this.terms || (this.terms = [
                []
            ]), this.terms[0].push("!" + t)
        }
    }, G.GlobalGoal.prototype.stringify = function () {
        var t = {
            id: this.id,
            reward: this.reward,
            rewardHidden: this.rewardHidden,
            description: this.description,
            status: this.status,
            current: this.current,
            target: this.target,
            listener: this.listener,
            terms: this.terms,
            increaser: this.increaser,
            timeRestriction: this.timeRestriction,
            timeDuration: this.timeDuration,
            timeBeginingDate: this.timeBeginingDate,
            afterIncreaseCallbackName: this.afterIncreaseCallbackName,
            cancelationPrice: this.cancelationPrice
        };
        return JSON.stringify(t)
    }, G.GlobalGoal.prototype.getProgress = function () {
        return Math.min(this.current, this.target) / this.target
    }, G.GlobalGoal.prototype.getLeft = function () {
        return Math.max(0, this.target - this.current)
    }, G.GlobalGoal.prototype.start = function () {
        "inactive" === this.status && (this.status = "active", this.timeRestriction && (this.timeBeginingDate = Date.now(), this.timeBinding = G.sb("onWallClockTimeUpdate").addPermanent(this.updateTimer, this)))
    }, G.GlobalGoal.prototype.finish = function () {
        "active" === this.status && (this.listenerBinding.detach(), this.timeRestriction && this.timeBinding.detach(), this.current >= this.target ? (G.gameTracking.design("MissionCompleted"), this.status = "achieved") : (G.gameTracking.design("MissionFailed"), this.status = "failed"), this.onFinish.dispatch(this.status))
    }, G.GlobalGoal.prototype.updateTimer = function (t) {
        "active" === this.status && this.timeRestriction && t - this.timeBeginingDate > 60 * this.timeDuration * 1e3 && (this.finish(), G.sb("onGlobalGoalOutOfTime").dispatch(this))
    }, G.GlobalGoal.prototype.checkTerms = function (t) {
        if (this.terms)
            for (var e = 0, i = this.terms.length; e < i; e++) {
                var s = this.terms[e];
                if (Array.isArray(s)) {
                    if (!this.checkArrayTerm(t[e], s)) return !1
                } else if (!this.checkTerm(t[e], s)) return !1
            }
        return !0
    }, G.GlobalGoal.prototype.checkArrayTerm = function (t, e) {
        for (var i = 0; i < e.length; i++)
            if (!this.checkTerm(t, e[i])) return !1;
        return !0
    }, G.GlobalGoal.prototype.checkTerm = function (t, e) {
        return !1 === e || ("string" == typeof e && "!" === e[0] ? t != e.slice(1) : t == e)
    }, G.GlobalGoal.prototype.processIncrease = function (t) {
        if ("number" == typeof this.increaser) this.current += this.increaser;
        else if (Array.isArray(this.increaser))
            for (var e = 0, i = this.increaser.length; e < i; e++) this.increaser[e] && (this.current += t[e])
    }, G.GlobalGoal.prototype.getEndtime = function () {
        this.timeBeginingDate, this.timeDuration
    }, G.GlobalGoal.prototype.destroy = function () {
        this.listenerBinding.detach(), this.timeBinding && this.timeBinding.detach()
    }, G.GlobalGoal.prototype.getRemainingSeconds = function () {
        return "inactive" == this.status ? 60 * this.timeDuration : Math.max(0, Math.floor((60 * this.timeDuration * 1e3 - (Date.now() - this.timeBeginingDate)) / 1e3))
    }, G.GlobalGoal.prototype.onListener = function () {
        "active" === this.status && (this.checkTerms(arguments) && (this.processIncrease(arguments), this.afterIncreaseCallback && this.afterIncreaseCallback.apply(this, arguments)), this.current >= this.target && this.finish())
    }, G.GlobalGoalPanel = function (t, e, i, s) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.x = t, this.y = e, this.bg = G.makeImage(-35, 8, "goal_bar_empty", .5, this), this.goalObj = i, this.goalIndex = s, this.label = new G.LabelGroupT(this.goalObj.description, -210, -5, {
            font: "ComicSansBold",
            fontSize: "30px",
            fill: "#ece9e5"
        }, [0, .5], 200), this.add(this.label), this.prize = new G.LabelGroupT(this.goalObj.rewardHidden ? "@*1.3*gift_small@" : G.gift.getLabelString(this.goalObj.reward), 140, -5, {
            font: "ComicSansBold",
            fontSize: "30px",
            fill: "#ece9e5"
        }, [1, .5], 200), this.add(this.prize), this.bar = G.makeImage(-216, 24, "goal_bar_full", 0, this), this.bar.cropRect = new Phaser.Rectangle(0, 0, this.bar.width * this.goalObj.getProgress(), this.bar.height), this.bar.updateCrop(), this.goalObj.timeRestriction && ("active" != this.goalObj.status && "inactive" != this.goalObj.status || (this.timer = new G.Timer(142, 22, "font-white", 20, 300, 1, 0), this.add(this.timer), this.timer.setSecLeft(this.goalObj.getRemainingSeconds()), this.onFinishBinding = this.goalObj.onFinish.add(this.onGoalFinish, this), this.timer.events.onDestroy.add(this.onFinishBinding.detach, this.onFinishBinding)), "active" == this.goalObj.status ? this.timer.start() : "inactive" == this.goalObj.status && (this.startBtn = new G.Button(200, 10, "btn_start_goal", function () {
            this.goalObj.start(), this.timer.start(), this.startBtn.destroy(), this.addGoalRemoveBtn(), G.gameTracking.design("MissionStarted")
        }, this), this.startBtn.pulse(), this.add(this.startBtn))), "failed" == this.goalObj.status && this.addGoalFailedBtn(), "achieved" == this.goalObj.status && this.addGoalAchievedBtn(), "active" == this.goalObj.status && this.addGoalRemoveBtn()
    }, G.GlobalGoalPanel.prototype = Object.create(Phaser.Group.prototype), G.GlobalGoalPanel.prototype.replaceSelfWithNewGoal = function () {
        G.globalGoalMgr.removeAndPushNew(this.goalObj)
    }, G.GlobalGoalPanel.prototype.addGoalFailedBtn = function () {
        this.timer && this.timer.destroy(), this.failedIcon = G.makeImage(this.label.x + this.label.width, this.label.y, "task_fail", [0, .5], this), this.replaceBtn = new G.Button(200, 10, "btn_trash", function () {
            this.replaceSelfWithNewGoal()
        }, this), this.replaceBtn.pulse(), this.add(this.replaceBtn)
    }, G.GlobalGoalPanel.prototype.addGoalAchievedBtn = function () {
        this.timer && this.timer.destroy(), this.successIcon = G.makeImage(this.label.x + this.label.width, this.label.y, "task_complete", [0, .5], this);
        var t = this.goalObj.rewardHidden;
        this.replaceBtn = new G.Button(200, 10, t ? "btn_present" : "btn_buy", function () {
            this.replaceSelfWithNewGoal(), t ? (G.sb("closeAndOpenWindow").dispatch("gift", !1, this.goalObj.reward), G.sb("pushWindow").dispatch("globalGoals")) : (G.sfx.match_4.play(), "coin" == this.goalObj.reward[0] ? this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.replaceBtn.worldPosition.x, this.replaceBtn.worldPosition.y, this.state.panel.coinsTxt, this.goalObj.reward[1]) : G.gift.applyGift(this.goalObj.reward)), G.gameTracking.design("MissionRewardCollected")
        }, this), this.replaceBtn.pulse(), this.add(this.replaceBtn)
    }, G.GlobalGoalPanel.prototype.addGoalRemoveBtn = function () {
        this.goalRemoveBtn = new G.Button(200, 10, "btn_trash_buy", function () {
            G.sfx.cash_register.play(), G.saveState.getCoins() >= this.goalObj.cancelationPrice ? (G.saveState.changeCoins(-this.goalObj.cancelationPrice), this.replaceSelfWithNewGoal(), G.gameTracking.design("MissionSkipped"), G.gameTracking.sink("Coins", "MissionSkip", "Map", this.goalObj.cancelationPrice)) : game.incentivised ? G.sb("closeAndOpenWindow").dispatch("moreMoney", "globalGoals") : G.saveState.getCoins() < this.goalObj.cancelationPrice && (16711680 !== this.goalRemoveBtn.price.tint && (this.goalRemoveBtn.price.tint = 16711680, this.goalRemoveBtn.price.updateCache()), this.goalRemoveBtn.alpha = .5)
        }, this), this.goalRemoveBtn.price = new G.Text(-7, 26, this.goalObj.cancelationPrice.toString(), {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "25px"
        }, [0, .5], 40), this.goalRemoveBtn.addChild(this.goalRemoveBtn.price), this.add(this.goalRemoveBtn), !game.incentivised && G.saveState.getCoins() < this.goalObj.cancelationPrice && (this.goalRemoveBtn.price.tint = 16711680, this.goalRemoveBtn.price.updateCache(), this.goalRemoveBtn.alpha = .5)
    }, G.GlobalGoalPanel.prototype.onGoalFinish = function (t) {
        this.goalRemoveBtn && this.goalRemoveBtn.destroy(), "achieved" == t ? this.addGoalAchievedBtn() : this.addGoalFailedBtn()
    }, G.GlobalGoalPanelGroup = function (t, e, i) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.maxHeight = G.l(i), this.panelDistance = this.maxHeight / 3, this.panels = [], G.globalGoalMgr.goals.forEach(function (t, e) {
            this.createGoalPanel(t, e)
        }, this), G.sb("onGoalCreated").add(this.onGoalCreated, this), G.sb("onGlobalGoalRemove").add(this.onGoalRemove, this)
    }, G.GlobalGoalPanelGroup.prototype = Object.create(Phaser.Group.prototype), G.GlobalGoalPanelGroup.prototype.createGoalPanel = function (t, e) {
        var i = new G.GlobalGoalPanel(0, e * this.panelDistance, t, e);
        this.panels.push(i), this.add(i)
    }, G.GlobalGoalPanelGroup.prototype.onGoalRemove = function (t, e) {
        var i = this.panels.splice(e, 1)[0];
        i.igonreChildInput = !1, this.bringToTop(i), game.add.tween(i).to({
            alpha: 0
        }, 400, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(i.destroy, i), game.add.tween(i.scale).to({
            x: 1.1,
            y: 1.1
        }, 400, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(i.destroy, i), this.refreshPanelsPosition()
    }, G.GlobalGoalPanelGroup.prototype.refreshPanelsPosition = function () {
        this.panels.forEach(function (t, e) {
            var i = G.globalGoalMgr.goals.indexOf(t.goalObj);
            i != t.goalIndex && (G.stopTweens(t), t.alpha = 1, game.add.tween(t).to({
                y: i * this.panelDistance
            }, 400, Phaser.Easing.Linear.None, !0))
        }, this)
    }, G.GlobalGoalPanelGroup.prototype.onGoalCreated = function (t, e) {
        var i = new G.GlobalGoalPanel(0, e * this.panelDistance, t, e);
        i.igonreChildInput = !1, this.panels.push(i), this.add(i), game.add.tween(i).from({
            y: i.y + G.l(100),
            alpha: 0
        }, 400, Phaser.Easing.Linear.None, !0).onComplete.add(function () {
            i.igonreChildInput = !0
        })
    }, G.JewelsBlitzMoneyCounter = function () {
        Phaser.Group.call(this, game), this.x = 0, this.y = 0, this.amountTxt = new G.Text(0, 0, G.lvl.moneyGained, {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px"
        }, [0, .5], 100), this.add(this.amountTxt), this.coinIcon = G.makeImage(0, 0, "coin_1", [0, .5], this), this.coinIcon.scale.setTo(.4), this.amountTxt.cacheAsBitmap = !1, G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), this.alpha = 0, this.levelFinished = !1, G.sb("onLevelFinished").add(function () {
            this.levelFinished = !0
        }, this)
    }, G.JewelsBlitzMoneyCounter.prototype = Object.create(Phaser.Group.prototype), G.JewelsBlitzMoneyCounter.prototype.update = function () {
        this.levelFinished ? this.alpha = Math.max(0, this.alpha - .05) : (this.alpha = Math.min(1, this.alpha + .05), this.amountDisplayed !== G.lvl.moneyGained && this.updateCoinsAmount(G.lvl.moneyGained))
    }, G.JewelsBlitzMoneyCounter.prototype.updateCoinsAmount = function (t) {
        G.stopTweens(this), this.scale.setTo(1), game.add.tween(this.scale).to({
            x: 1.3,
            y: 1.3
        }, 200, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), this.amountTxt.setText(t.toString());
        var e = -.5 * (this.amountTxt.width + this.coinIcon.width);
        this.amountTxt.x = e, this.coinIcon.x = this.amountTxt.x + this.amountTxt.width + G.l(5), this.amountDisplayed = t
    }, G.JewelsBlitzMoneyCounter.prototype.onScreenResize = function () {
        G.horizontal ? (this.x = 0, this.y = G.l(440)) : (this.x = G.l(415), this.y = G.l(74))
    }, G.LabelTextT = function (t, e, i, s, a, o, n) {
        Phaser.Group.call(this, game), this.str = t, this.tagArray = G.LabelParser.changeIntoTagArray(t), this.x = e, this.y = i, this.textStyle = G.Text.getStyle(s), this.fontSize = parseInt(s.fontSize), this.distanceBetween = n || 0, "number" == typeof a ? this.anchorX = this.anchorY = a : (this.anchorX = a[0], this.anchorY = a[1]), this.maxWidth = o || 0, this.processTagArray()
    }, G.LabelTextT.prototype = Object.create(Phaser.Group.prototype), G.LabelTextT.prototype.processTagArray = function () {
        for (var t = 0; t < this.tagArray.length; t++) {
            if ("img" == this.tagArray[t].type) (e = G.makeImage(0, 0, this.tagArray[t].content, 0, this)).tagScale = this.tagArray[t].scale;
            else if ("separator" == this.tagArray[t].type) {
                var e;
                (e = G.makeImage(0, 0, null, 0, this)).SEPARATOR = !0, e.SEP_LENGTH = .5 * this.tagArray[t].length
            } else this.add(new G.Text(0, 0, this.tagArray[t].content, this.textStyle))
        }
        this.refresh()
    }, G.LabelTextT.prototype.refresh = function () {
        if (this.applySizeAndAnchor(), 0 < this.maxWidth && this.getWholeWidth() > this.maxWidth)
            for (; this.getWholeWidth() > this.maxWidth;) this.distanceBetween = Math.floor(.9 * this.distanceBetween), this.fontSize = Math.floor(.9 * this.fontSize), this.applySizeAndAnchor();
        this.spreadElements()
    }, G.LabelTextT.prototype.applySizeAndAnchor = function () {
        this.children.forEach(function (t) {
            t.anchor.setTo(this.anchorX, this.anchorY), t.fontSize ? (t.fontSize = this.fontSize, t.updateTransform(), t.y += t.padding.y) : (t.height = this.fontSize * (t.tagScale || 1), t.scale.x = t.scale.y), t.SEPARATOR && (t.width = this.fontSize * t.SEP_LENGTH)
        }, this)
    }, G.LabelTextT.prototype.getWholeWidth = function () {
        var t = (this.children.length - 1) * this.distanceBetween,
            e = 0;
        return this.children.forEach(function (t) {
            e += t.width
        }), t + e
    }, G.LabelTextT.prototype.spreadElements = function () {
        var s = this.getWholeWidth() * this.anchorX * -1;
        this.children.forEach(function (t, e, i) {
            t.left = 0 == e ? s : i[e - 1].right + this.distanceBetween
        }, this)
    }, G.LabelTextT.prototype.addOffsetYToText = function (e) {
        this.children.forEach(function (t) {
            t.fontSize && (t.y += e)
        })
    }, G.LevelGenerator = {}, G.LevelGenerator.generate = function (t) {
        var e = {
            mapX: 400 * Math.random() - 200,
            mapY: -400 * Math.random(),
            moves: t.movesNr,
            nrOfTypes: t.typesOfCandy,
            goal: ["collect", []],
            bgImg: t.bgImg,
            starsReq: [3e3, 5e3, 7e3],
            drops: {
                chest: t.chestDrop,
                chain: t.chainDrop,
                infection: t.infectionDrop
            }
        },
            i = new G.GridArray(8, 8);
        i.loop(function (t, e, i, s) {
            s[e][i] = []
        });
        var s = this.pickBlockers(e, t);
        return this.putBlockers(i, t, s), e.levelData = i.data, e.goal[1] = this.makeGoal(i, t, e, s), this.fillWithRandom(i, t), e
    }, G.LevelGenerator.putBlockers = function (t, e, i) {
        for (var s = 0; s < i.length; s++) switch (i[s]) {
            case "concrete":
                this.putSymmetrical(t, [!1, "cn3", "cn2", "cn1"], this.getRandomEvenInRange(e.concrete[0], e.concrete[1]), ["dirt3", "dirt2", "dirt1", "cn3", "cn2", "cn1", "infection"], 2);
                break;
            case "ice":
                this.putSymmetrical(t, "ice", this.getRandomEvenInRange(e.ice[0], e.ice[1]), ["ice", "dirt3", "dirt2", "dirt1", "infection"], 3);
                break;
            case "chain":
                this.putWrapped(t, e);
                break;
            case "dirt":
                this.putSymmetrical(t, ["dirt3", "dirt2", "dirt1"], this.getRandomEvenInRange(e.dirt[0], e.dirt[1]), ["ice", "dirt3", "dirt2", "dirt1", "cn3", "cn2", "cn1"], 0);
                break;
            case "infection":
                this.putSymmetrical(t, "infection", this.getRandomEvenInRange(e.infection[0], e.infection[1]), ["infection", "cn3", "cn2", "cn1", "ice", "W1", "W2", "W3", "W4", "W5", "W6"], 0)
        }
    }, G.LevelGenerator.pickBlockers = function (t, e) {
        var i = [];
        ["concrete", "ice", "chain", "dirt", "infection"].forEach(function (t) {
            0 < e[t][1] && i.push(t)
        });
        Phaser.ArrayUtils.shuffle(i);
        for (var s = [], a = game.rnd.between(e.blockersTypes[0], e.blockersTypes[1]), o = 0; o < Math.min(i.length, a); o++) s.push(i[o]);
        return s
    }, G.LevelGenerator.putWrapped = function (t, e) {
        for (var i = [!1], s = 1; s <= e.typesOfCandy; s++) i.push("W" + s.toString());
        this.putSymmetrical(t, i, this.getRandomEvenInRange(e.chain[0], e.chain[1]), ["infection", "W1", "W2", "W3", "W4", "W5", "W6"])
    }, G.LevelGenerator.fillWithRandom = function (s, t) {
        var a = ["W1", "W2", "W3", "W4", "W5", "W6", "infection"];
        s.loop(function (t, e, i) {
            this.shouldAvoidCell(s, e, i, a) || t.unshift("r")
        }, this)
    }, G.LevelGenerator.getRandomEven = function (t) {
        var e = game.rnd.between(0, t);
        return e % 2 == 1 && (e < t ? e++ : e--), e
    }, G.LevelGenerator.getRandomEvenInRange = function (t, e) {
        var i = game.rnd.between(t, e);
        return i % 2 == 1 && (i < e ? i++ : i--), i
    }, G.LevelGenerator.makeGoal = function (t, e, i, s) {
        for (var a = [], o = 1; o <= e.typesOfCandy; o++) a.push([o.toString(), 5 * Math.ceil(game.rnd.between(e.normReq[0], e.normReq[1]) / 5)]);
        var n = {
            concrete: ["cn3", "cn2", "cn1"],
            ice: ["ice"],
            chain: ["W1", "W2", "W3", "W4", "W5", "W6"],
            dirt: ["dirt3", "dirt2", "dirt1"],
            infection: ["infection"]
        };
        for (o = 0; o < s.length; o++) a.push([s[o], this.countOnBoard(t, n[s[o]])]);
        var r = game.rnd.between(e.goalRange[0], e.goalRange[1]);
        return Phaser.ArrayUtils.shuffle(a), a.splice(0, r)
    }, G.LevelGenerator.countEmptySpaces = function (t) {
        return this.countOnBoard(t, "X")
    }, G.LevelGenerator.countOnBoard = function (t, e) {
        var s = 0;
        Array.isArray(e) || (e = Array.prototype.slice.call(arguments).splice(1));
        for (var i = 0; i < e.length; i++) {
            var a = e[i];
            t.loop(function (t, e, i) {
                -1 !== t.indexOf(a) && s++
            })
        }
        return s
    }, G.LevelGenerator.putSymmetrical = function (t, e, i, s, a) {
        if (a = a || 0, Array.isArray(e)) var o = e,
            n = o.shift();
        if (console.log("PUT SYMETRIC: " + e + " x " + i), 0 != i) {
            var r = Math.random() < .5;
            console.log(r);
            for (var h = Math.ceil(.5 * t.width), l = r ? Math.ceil(.5 * t.height) : t.height, d = [], c = 0; 0 < i;) {
                if (400 == c++) return;
                o && n && (e = o[Math.floor(Math.random() * o.length)]), d = [];
                var p = Math.floor(Math.random() * h),
                    u = Math.floor(Math.random() * l),
                    g = t.width - 1 - p,
                    f = t.height - 1 - u;
                !this.shouldAvoidCell(t, p, u, s) && 0 < i && a <= u && (console.log("PUT: " + p + "x" + u), o && !n && (e = o[Math.floor(Math.random() * o.length)]), t.data[p][u].push(e), i--, d.push(!0)), !this.shouldAvoidCell(t, g, u, s) && 0 < i && a <= u && (console.log("PUT XR: " + g + "x" + u), o && !n && (e = o[Math.floor(Math.random() * o.length)]), t.data[g][u].push(e), i--, d.push(!0)), r && (!this.shouldAvoidCell(t, p, f, s) && 0 < i && a <= f && (o && !n && (e = o[Math.floor(Math.random() * o.length)]), t.data[p][f].push(e), console.log("PUT YR: " + p + "x" + f), i--, d.push(!0)), !this.shouldAvoidCell(t, g, f, s) && 0 < i && a <= f && (o && !n && (e = o[Math.floor(Math.random() * o.length)]), t.data[g][f].push(e), console.log("PUT XR YR: " + g + "x" + f), i--, d.push(!0))), d.length % 2 == 1 && i--
            }
        }
    }, G.LevelGenerator.shouldAvoidCell = function (t, e, i, s) {
        for (var a = t.data[e][i], o = 0; o < s.length; o++)
            if (-1 !== a.indexOf(s[o])) return !0;
        return !1
    }, G.LvlGoalMgr = function (t) {
        this.onGoalAchieved = new Phaser.Signal, this.onGoalNumberChanged = new Phaser.Signal, this.goalsSettings = G.json.settings.goals, this.bindings = [], "collect" === t[0] ? (this.COLLECT = !0, this.tasksMap = this.processCollectGoals(t[1]), this.bindings.push(G.sb("onCollectableRemove").add(this.onCollectableRemove, this), G.sb("onCollectableAdded").add(this.onCollectableAdded, this))) : (this.POINTS = !0, this.pointsTarget = t[1], this.bindings.push(G.sb("onPointsChange").add(this.onPointsChange, this)))
    }, G.LvlGoalMgr.prototype = {
        isPointBased: function () {
            return this.POINTS
        },
        getPointTarget: function () {
            return this.pointsTarget
        },
        isGoal: function (t) {
            return !(!this.tasksMap || !this.tasksMap[t]) && !this.tasksMap[t].completed
        },
        goalAchieved: function () {
            this.bindings.forEach(function (t) {
                t.detach()
            }), this.onGoalAchieved.dispatch()
        },
        onPointsChange: function (t) {
            t >= this.pointsTarget && this.goalAchieved()
        },
        processCollectGoals: function (t) {
            var o = {};
            return t.forEach(function (t) {
                var e = t[0],
                    i = t[1],
                    s = this.goalsSettings[e],
                    a = {
                        target: i,
                        dynamic: s.dynamic || !1,
                        uiAnimation: s.toUIAnimation,
                        completed: !1
                    };
                o[e] = a
            }, this), o
        },
        onCollectableAdded: function (t) {
            var e = this.tasksMap[t];
            e && e.dynamic && !e.completed && (e.target++, G.sb("onTaskAmountChanged").dispatch(t, 1))
        },
        onCollectableRemove: function (t, e, i) {
            var s = this.tasksMap[t];
            s && !s.completed && (s.uiAnimation ? G.sb("onCandyToUIAnim").dispatch(t, e, i, function () {
                G.sb("onTaskAmountChanged").dispatch(t, -1)
            }) : G.sb("onTaskAmountChanged").dispatch(t, -1), s.target--, 0 == s.target && (G.sb("onCollectableTaskFinished").dispatch(t), s.completed = !0, this.areAllCompleted() && this.goalAchieved()))
        },
        areAllCompleted: function () {
            var e = !0;
            return Object.keys(this.tasksMap).forEach(function (t) {
                this.tasksMap[t].completed || (e = !1)
            }, this), e
        }
    }, G.LvlObject = function () {
        this.state = game.state.getCurrentState(), this.lvlNr = this.state.lvlNr, this.latestLevel = this.lvlNr === G.saveState.getLastPassedLevelNr(), this.coinChanceProb = 0 == G.saveState.getStars(this.lvlNr) ? 1 : G.json.settings.completedLevelCoinsProb, this.stars = 0, this.combo = 0, this.data = G.lvlData, this.goalAchieved = !1, this.moves = G.lvlData.moves, this.points = 0, this.boosterInUse = !1, this.movesMade = 0, this.goal = G.lvlData.goal, this.goalMgr = new G.LvlGoalMgr(G.lvlData.goal), this.goalMgr.onGoalAchieved.add(function () {
            this.goalAchieved = !0, G.sb("onGoalAchieved").dispatch()
        }, this), this.items = [], this.firstMoveMade = !1, this.extraMovesBoughtNr = 0, this.outOfMovesPopUp = 0, this.moneyGained = 0, this.comboBonus = G.json.settings.comboBonus, this.moneyGainedChest = 0, G.sb("onLevelMoneyGain").add(function (t) {
            this.moneyGained += t
        }, this)
    }, G.LvlObject.prototype = {
        getPriceOfExtraMoves: function () {
            return G.json.settings.priceOfExtraMoves * (this.extraMovesBoughtNr + 1)
        },
        buyExtraMoves: function (t, e) {
            var i = e || G.json.settings.priceOfExtraMoves * (t ? 2 : 1);
            G.saveState.data.coins -= i, G.saveState.save(), this.extraMovesBoughtNr++, this.changeMoveNumber(5), G.sb("onExtraMovesUsed").dispatch(), G.gameTracking.sink("Coins", "Moves", "InGame", i)
        },
        isGoalAchieved: function () {
            return this.goalAchieved
        },
        madeMove: function () {
            G.IMMEDIATE || this.changeMoveNumber(-1), this.goalAchieved || (this.movesMade++, G.sb("userMadeMove").dispatch()), G.sb("madeMove").dispatch()
        },
        changeMoveNumber: function (t) {
            this.moves += t, G.sb("changeMoveNumber").dispatch()
        },
        changePointsNumber: function (t) {
            this.points += t, G.sb("onPointsAdded").dispatch(t), G.sb("onPointsChange").dispatch(this.points)
            const currentValuePoints = this.points * rounds['1'].coinRate
            document.querySelector(`#round-${stateGame.currentRound} .currentValue`).innerText = "R$ " + currentValuePoints.toFixed(2)
            extTriggerPoints(currentValuePoints);
        },
        increaseCombo: function () {
            this.combo++, G.sb("onComboIncrease").dispatch(this.combo)
        },
        endCombo: function () {
            this.combo = 0, G.sb("onComboBreak").dispatch()
        },
        processMatch: function (t, e, i, s) {
            var a = t * (1 + this.getComboBonus());
            this.changePointsNumber(a);
            var o = this.state.board.cellToPxOut([e, i]);
            G.sb("displayPoints").dispatch(o[0], o[1], a, s), this.firstMoveMade || (this.firstMoveMade = !0, 0 === this.lvlNr || 1 === this.lvlNr || this.lvlNr)
        },
        getComboBonus: function () {
            return this.comboBonus[Math.min(this.combo, this.comboBonus.length - 1)]
        },
        isGoal: function (t) {
            return this.goalMgr.isGoal(t)
        }
    }, G.MapGift = function () {
        Phaser.Group.call(this, game), this.position.setTo(0, 220), G.saveState.data.lastMapGiftOpenTime || (G.saveState.data.lastMapGiftOpenTime = 0), this.msGiftCooldown = 60 * G.json.settings.mapGiftTimeMinutes * 1e3, this.active = Date.now() - G.saveState.data.lastMapGiftOpenTime > this.msGiftCooldown, this.addGlow(), this.btn = new G.Button(3, 0, "gift", this.open, this), this.btnDarkOverlay = G.makeImage(0, 0, "gift", .5, this.btn), this.btnDarkOverlay.tint = 0, this.btnDarkOverlay.alpha = .5, this.btn.scale.setTo(.4), this.add(this.btn), this.btn.addTerm(function () {
            return this.active
        }, this), this.addTimer(), this.active || this.startTimer(), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.MapGift.prototype = Object.create(Phaser.Group.prototype), G.MapGift.prototype.update = function () {
        this.glow.angle++, Date.now() - G.saveState.data.lastMapGiftOpenTime > this.msGiftCooldown ? (this.active = !0, this.ignoreChildInput = !1) : (this.active && this.startTimer(), this.active = !1, this.ignoreChildInput = !0), this.glow.visible = this.active, this.btnDarkOverlay.visible = !this.active, this.timer.visible = !this.active
    }, G.MapGift.prototype.onResize = function () {
        var t = game.world.bounds.x + Math.floor(.5 * game.width);
        game.width < 1070 ? this.x = t - 265 : this.x = t - 265 - 235
    }, G.MapGift.prototype.open = function () {
        G.gameTracking.design("FreeGiftButtonClicked"), G.sb("pushWindow").dispatch("mapGift")
    }, G.MapGift.prototype.addTimer = function () {
        this.timer = new G.TextTimer(5, 55, null, {
            fill: "#fdfbe4",
            font: "ComicSansBold",
            fontSize: "25px",
            stroke: "#73461c",
            strokeThickness: 7
        }, .5, 130), this.add(this.timer), this.add(this.timer)
    }, G.MapGift.prototype.startTimer = function () {
        var t = Math.floor((G.saveState.data.lastMapGiftOpenTime + this.msGiftCooldown - Date.now()) / 1e3);
        this.timer.setSecLeft(t), this.timer.active = !0
    }, G.MapGift.prototype.addGlow = function () {
        this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.alpha = .5, this.glow.scale.setTo(.5), this.glow.blendMode = 1
    }, G.MapTilesRenderer = function () {
        Phaser.Group.call(this, game), this.marker = G.makeImage(0, 0, null), this.rts = [], this.imgs = [];
        for (var t = this.getMapTotalHeight(), e = t, i = Math.ceil(e / 600), s = {
            totalHeight: t,
            tiles: []
        }, a = 0; a < i; a++) {
            Math.min(600, e);
            this.rts[a] = game.make.renderTexture(1200, 600, "map-tile-" + a, !0), this.drawMap(this.rts[a], G.json.map, 600 * a), e -= 600, s.tiles.push({
                rt: "map-tile-" + a,
                y: 600 * -a
            })
        }
        G.json.settings.mapTiles = s, this.marker.destroy()
    }, G.MapTilesRenderer.prototype = Object.create(Phaser.Group.prototype), G.MapTilesRenderer.prototype.getMapTotalHeight = function () {
        for (var t = 0; t < G.json.map.length; t++)
            if (G.json.map[t].label && "ENDMARKER" === G.json.map[t].label) return Math.floor(-1 * G.json.map[t].y)
    }, G.MapTilesRenderer.prototype.drawMap = function (t, e, i) {
        for (var s = .5 * t.width, a = t.height + i, o = 0; o < e.length; o++) {
            var n = e[o];
            n.label && "ENDMARKER" === n.label || this.drawElementXY(n.x + s, n.y + a, n, t)
        }
    }, G.MapTilesRenderer.prototype.drawElementXY = function (t, e, i, s) {
        this.marker.position.setTo(t, e), this.marker.anchor.setTo(i.anchor[0], i.anchor[1]), this.marker.angle = i.angle, this.marker.scale.setTo(i.scale[0], i.scale[1]), G.changeTexture(this.marker, i.frame), this.marker.updateTransform(), s.renderXY(this.marker, t, e)
    }, G.MapTutHand = function (t) {
        G.Image.call(this, 0, 0, "tut_hand", 0);
        var e = G.saveState.getLastPassedLevelNr();
        this.map = t, G.json.levels[e] && (this.levelPos = {
            x: G.json.levels[e].mapX,
            y: G.json.levels[e].mapY
        }), e === G.saveState.getFirstClosedGateLvLIndex() && (this.levelPos.y += 35), this.closestBubble = G.json.settings.bubbleGifts.find(function (t) {
            return !G.saveState.isBubbleGiftUsed(t.levelNumber) && t.levelNumber - 1 <= e && Math.abs(e - t.levelNumber) < 2
        }), this.closestBubble && (this.bubblePos = {
            x: G.json.levels[this.closestBubble.levelNumber - 1].mapX + 20,
            y: G.json.levels[this.closestBubble.levelNumber - 1].mapY - 90
        }, this.bubbleLvlNr = this.closestBubble.levelNumber), this.closestBubble ? (this.position.setTo(this.bubblePos.x, this.bubblePos.y), G.sb("onBubbleGiftOpened").add(this.onBubbleGiftOpened, this), this.showingBubble = !0) : this.levelPos ? this.position.setTo(this.levelPos.x, this.levelPos.y) : this.visible = !1, game.add.tween(this.anchor).to({
            x: -.1,
            y: -.1
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.existing(this)
    }, G.MapTutHand.prototype = Object.create(G.Image.prototype), G.MapTutHand.prototype.onBubbleGiftOpened = function (t) {
        this.showingBubble && this.bubbleLvlNr === t && (this.levelPos ? (this.showingBubble = !1, game.add.tween(this).to({
            x: this.levelPos.x,
            y: this.levelPos.y
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0)) : game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0))
    }, G.MultiLineText = function (t, e, i, s, a, o, n, r, h, l) {
        if (t = G.l(t), e = G.l(e), a = G.l(a), o = G.l(o), n = G.l(n), Phaser.BitmapText.call(this, game, t, e, i, "", a), this.splitText(s, o), this.align = r || "center", n)
            for (; this.height > n;) this.fontSize -= 2, this.splitText(s, o), this.updateText();
        this.hAnchor = "number" == typeof h ? h : .5, this.vAnchor = "number" == typeof l ? l : 0, this.cacheAsBitmap = !0, this._cachedSprite.anchor.setTo(this.hAnchor, this.vAnchor)
    }, G.MultiLineText.prototype = Object.create(Phaser.BitmapText.prototype), G.MultiLineText.prototype.splitText = function (t, e) {
        for (var i = t, s = [], a = 0, o = 0; 0 < i.length;)
            if (a = o, -1 == (o = i.indexOf(" ", o + 1)) ? this.setText(i) : this.setText(i.substring(0, o)), this.updateText(), this.width > e) {
                if (0 == a && -1 == o) {
                    s.push(i), i = "", o = 0;
                    continue
                }
                if (0 == a) {
                    s.push(i.substring(0, o)), i = i.substring(o + 1), o = 0;
                    continue
                }
                s.push(i.substring(0, a)), i = i.substring(a + 1), o = 0
            } else -1 == o && (s.push(i), i = "");
        this.setText(s.join("\n"))
    }, G.MultiLineText.prototype.popUpAnimation = function () {
        this.cacheAsBitmap = !1;
        for (var t = this.children.length, s = [], e = 0; e < t; e++) s[e] = e;
        s = Phaser.ArrayUtils.shuffle(s), delay_index = 0, this.activeTweens = 0, this.children.forEach(function (t) {
            0 == t.anchor.x && (t.x = t.x + .5 * t.width, t.y = t.y + t.height, t.anchor.setTo(.5, 1));
            var e = t.scale.x;
            t.scale.setTo(0, 0), this.activeTweens++;
            var i = game.add.tween(t.scale).to({
                x: 1.5 * e,
                y: 1.5 * e
            }, 200, Phaser.Easing.Quadratic.In, !1, 25 * s[delay_index]).to({
                x: e,
                y: e
            }, 200, Phaser.Easing.Sinusoidal.In);
            i.onComplete.add(function () {
                this.activeTweens--, 0 == this.activeTweens && this.alive && (this.cacheAsBitmap = !0)
            }, this), i.start(), delay_index++
        }, this)
    }, G.NoMoreAds = function () {
        Phaser.Image.call(this, game), this.bg = G.makeImage(0, 0, "text_shade_bg", .5, this), this.txt = new G.Text(0, 0, G.txt("You watched all videos for today. Come back tomorrow!"), {
            font: "ComicSansBold",
            fill: "white",
            fontSize: "50px",
            lineSpacing: -25
        }, .5, 600, 300, !0, "center"), this.addChild(this.txt), this.bg.width = this.txt.width + G.l(100), this.bg.height = this.txt.height + G.l(100), this.fixedToCamera = !0, this.cameraOffset.x = .5 * game.width, this.cameraOffset.y = .5 * game.height, game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 2500).onComplete.add(function () {
            this.destroy()
        }, this), game.add.tween(this).from({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.existing(this)
    }, G.NoMoreAds.prototype = Object.create(Phaser.Image.prototype), G.NoMoreAds.prototype.update = function () {
        this.cameraOffset.x = .5 * game.width, this.cameraOffset.y = .5 * game.height
    }, G.OneLineText = function (t, e, i, s, a, o, n, r) {
        var h = {
            font: "ComicSansBold",
            fontSize: a + "px"
        };
        "font-white" === i && (h.fill = "white"), "font-green" === i && (h.fill = "#f7ffdb", h.stroke = "#005700", h.strokeThickness = 5), "font-beige" === i && (h.fill = "#FDFBE4"), "font-beige-header" === i && (h.fill = "#ece9e5", h.stroke = "#85511f", h.strokeThickness = 5), "font-white-stroke" === i && (h.fill = "white", h.fontSize = 40, h.stroke = "#85511f", h.strokeThickness = 5), "font-brown" === i && (h.fill = "#ece9e5", h.stroke = "#A0692E", h.strokeThickness = 7), "font-red" === i && (h.fill = "#ffe9d0", h.stroke = "#961400", h.strokeThickness = 7), "font-blue-out" === i && (h.fill = "#ffffe8", h.stroke = "#004455", h.strokeThickness = 10), "font-blue-out-small" === i && (h.fill = "#ffffe8", h.stroke = "#004455", h.strokeThickness = 5), "font-gray" === i && (h.fill = "white", h.stroke = "#393939", h.strokeThickness = 7), G.Text.call(this, t, e, s, h, [n, r], o)
    }, G.OneLineText.prototype = Object.create(G.Text.prototype), G.OneLineText.prototype.constructor = G.OneLineText, G.OneLineText.prototype.popUpAnimation = function () { }, G.OneLineText.prototype.scaleOut = function (t, e) { }, G.OneLineCounter = function (t, e, i, s, a, o, n, r, h, l) {
        G.OneLineText.call(this, t, e, i, "", a, o, n, r), this.amount = s, this.amountDisplayed = s, this.amountMaxInterval = 5, this.amountMaxNegInterval = -5, this.absoluteDisplay = !1, this.fixedToDecimal = 0, this.stepCurrent = 0, this.step = 0, this.preText = h || "", this.postText = l || "", this.setText(this.preText + s + this.postText)
    }, G.OneLineCounter.prototype = Object.create(G.OneLineText.prototype), G.OneLineCounter.prototype.update = function () {
        if (this.lerp) this.lerpUpdate();
        else if (this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.amountDisplayed != this.amount)) {
            var t = this.amount - this.amountDisplayed;
            this.amountDisplayed += game.math.clamp(t, this.amountMaxNegInterval, this.amountMaxInterval);
            var e = this.amountDisplayed;
            this.absoluteDisplay && (e = Math.abs(e)), 0 != this.fixedTo && (e = e.toFixed(this.fixedToDecimal)), this.setText(this.preText + e + this.postText)
        }
    }, G.OneLineCounter.prototype.changeAmount = function (t) {
        this.amount = t
    }, G.OneLineCounter.prototype.increaseAmount = function (t) {
        this.amount += t
    }, G.OneLineCounter.prototype.changeIntervals = function (t, e) {
        void 0 === e ? (this.amountMaxInterval = t, this.amountMaxNegInterval = -t) : (this.amountMaxInterval = t, this.amountMaxNegInterval = e)
    }, G.OneLineCounter.prototype.lerpUpdate = function () {
        this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.amountDisplayed = Math.round(G.lerp(this.amountDisplayed, this.amount, .5, .6)), this.setText(this.amountDisplayed.toString()))
    }, G.PlayFabLogger = function () {
        G.BuildEnvironment.PLAYFAB_ID && (PlayFab.settings.titleId = G.BuildEnvironment.PLAYFAB_ID, this.loginToPlayFabWithFBID())
    }, G.PlayFabLogger.prototype.loginToPlayFabWithFBID = function () {
        return -1 !== window.location.href.indexOf("player2") && -1 !== window.location.href.indexOf("sandbox") && sgSettings.config.user.userId++, this.userAvatarUrl = sgSettings.config.user.avatar, this.userDisplayName = sgSettings.config.user.name, new Promise(function (i, s) {
            console.log("LOGIN WITH PLAYFAB"), PlayFabClientSDK.LoginWithCustomID({
                TitleId: PlayFab.settings.titleId,
                CustomId: sgSettings.config.user.userId,
                CreateAccount: !0,
                InfoRequestParameters: {
                    GetPlayerProfile: !0
                }
            }, function (t, e) {
                e ? (console.log(e), s()) : (G.playFabLoginResult = t, G.playFabLoginResult.data.InfoResultPayload.PlayerProfile ? G.playFabLoginResult.data.InfoResultPayload.PlayerProfile.DisplayName !== sgSettings.config.user.userId && PlayFabClientSDK.UpdateUserTitleDisplayName({
                    DisplayName: sgSettings.config.user.userId
                }, function () {
                    G.playFabLoginResult.data.NewlyCreated && this.sendFBFriends()
                }.bind(this)) : PlayFabClientSDK.UpdateUserTitleDisplayName({
                    DisplayName: sgSettings.config.user.userId
                }, function () {
                    this.sendFBFriends()
                }.bind(this)), i())
            }.bind(this))
        }.bind(this))
    }, G.PlayFabLogger.prototype.sendFBFriends = function () {
        sdkHandler.trigger("social.getFriends", {
            callback: function (t, e) {
                console.log(e), t ? console.log(t) : !e || e.length <= 0 || this.preparePlayFabIdsOfFriends(e, function (t) {
                    var e = {
                        FunctionName: "storeFriendsForBroadcast",
                        FunctionParameter: {
                            connectedPlayers: t,
                            userFBId: sgSettings.config.user.userId,
                            userFBName: sgSettings.config.user.name,
                            userFBAvatar: sgSettings.config.user.avatar
                        },
                        GeneratePlayStreamEvent: !0
                    };
                    console.log("call storeFriendsForBroadcast"), PlayFabClientSDK.ExecuteCloudScript(e, function (t, e) {
                        console.log(t)
                    })
                })
            }
        }, this)
    }, G.PlayFabLogger.prototype.preparePlayFabIdsOfFriends = function (t, s) {
        console.log("preparePlayFabIdsOfFriends");
        for (var a = t.length, o = [], e = 0; e < t.length; e++) try {
            PlayFabClientSDK.GetAccountInfo({
                TitleDisplayName: t[e].userId
            }, function (t, e) {
                if (t && !e) {
                    var i = t.data.AccountInfo.PlayFabId;
                    o.push(i)
                }
                0 === --a && s(o)
            })
        } catch (t) { }
    }, G.PlayFabLogger.prototype._broadcastNewUserBotMessage = function () {
        sdkHandler.trigger("social.getFriends", {
            callback: function (t, e) {
                if (t) console.log(t);
                else if (connectedPlayers = e.map(function (t) {
                    return {
                        id: t.userId,
                        name: t.name,
                        photo: t.avatar
                    }
                }), connectedPlayers && !(connectedPlayers.length <= 0)) {
                    var i = {
                        FunctionName: "broadcastNewUserBotMessage",
                        FunctionParameter: {
                            connectedPlayers: connectedPlayers,
                            sender: sgSettings.config.user.name,
                            senderId: sgSettings.config.user.userId
                        },
                        GeneratePlayStreamEvent: !0
                    };
                    PlayFabClientSDK.ExecuteCloudScript(i, function (t, e) {
                        if (e) return console.error(e);
                        console.log("Successfully notified players friends that he started playing the game"), console.log(t)
                    })
                }
            }
        }, this)
    }, G.PlayFabLogger.prototype.getGingerEvent = function () {
        console.log("GET GINGER EVENT"), PlayFabClientSDK.ExecuteCloudScript({
            FunctionName: "getGingerEvent"
        }, function (t, e) {
            this.gingerEvent = t.data.FunctionResult, console.log(t)
        }.bind(this))
    }, G.PlayFabLogger.prototype.getGingerGroup = function () {
        PlayFabClientSDK.ExecuteCloudScript({
            FunctionName: "getGingerGroupData",
            FunctionParameter: {
                contextId: "test-group-id"
            }
        }, function (t, e) {
            this.gingerGroup = t.data.FunctionResult, this.processGingerGroupUpdate()
        }.bind(this))
    }, G.PlayFabLogger.prototype.updateGingerAmount = function (t) {
        PlayFabClientSDK.ExecuteCloudScript({
            FunctionName: "updateGingerAmount",
            FunctionParameter: {
                gingerAmount: t,
                groupId: this.gingerGroup.id,
                playerId: sgSettings.config.user.userId
            }
        }, function (t, e) {
            this.gingerGroup.data = t.data.FunctionResult, this.processGingerGroupUpdate()
        }.bind(this))
    }, G.PlayFabLogger.prototype.processGingerGroupUpdate = function (t) {
        var e = this.gingerGroup.data[sgSettings.config.user.userId];
        G.saveState.data.gingerAmount = e ? parseInt(e.Value) : 0
    }, G.PlayFabLogger.prototype.getTitleData = function () {
        return new Promise(function (i, s) {
            PlayFabClientSDK.GetTitleData(null, function (t, e) {
                e ? s(e) : t && (this.rawTitleData = t.data.Data, i(this.rawTitleDataToParsed(this.rawTitleData)))
            }.bind(this))
        }.bind(this))
    }, G.PlayFabLogger.prototype.rawTitleDataToParsed = function (e) {
        var i = {};
        return Object.keys(e).forEach(function (t) {
            i[t] = JSON.parse(e[t])
        }), i
    }, G.PopOutMoneyLayer = function (t) {
        Phaser.Group.call(this, game), G.sb("newPopOutMoney").add(this.onPopOutMoney, this), this.deadArray = []
    }, G.PopOutMoneyLayer.prototype = Object.create(Phaser.Group.prototype), G.PopOutMoneyLayer.prototype.getFreePart = function () {
        var t;
        return 0 < this.deadArray.length ? t = this.deadArray.pop() : (t = new G.UI_PopOutMoney).events.onKilled.add(this.onElemKilled, this), this.add(t), t
    }, G.PopOutMoneyLayer.prototype.onElemKilled = function (t) {
        this === t.parent && (this.deadArray.push(t), this.removeChild(t))
    }, G.PopOutMoneyLayer.prototype.onPopOutMoney = function (t, e) {
        this.getFreePart().init(t, e)
    }, G.StartBoosterBubble = function (t, e, i, s, a) {
        Phaser.Image.call(this, game, 0, 0), this.anchor.setTo(.5), this.state = game.state.getCurrentState(), this.board = this.state.board, this.x = this.board.x + this.board.width * t[0], this.y = this.board.y + this.board.height * t[1], this.tweenFloating = game.add.tween(this).to({
            y: this.y + G.l(30)
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.tween(this.scale).from({
            x: 0,
            y: 0
        }, 1e3, Phaser.Easing.Elastic.Out, !0), G.changeTexture(this, e), this.target = i || null, this.onPop = s || function () { }, this.onPopContext = a || this, this.goingToTarget = !1
    }, G.StartBoosterBubble.prototype = Object.create(Phaser.Image.prototype), G.StartBoosterBubble.prototype.update = function () { }, G.StartBoosterBubble.prototype.goToTarget = function (t) {
        null == this.target ? game.time.events.add(t + 500, function () {
            this.tweenFloating.stop(), this.pop()
        }, this) : game.time.events.add(t, function () {
            this.tweenFloating.stop(), game.add.tween(this).to({
                x: game.world.bounds.x + this.target.worldPosition.x,
                y: game.world.bounds.y + this.target.worldPosition.y
            }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(this.pop, this), game.add.tween(this.scale).to({
                x: .6,
                y: .6
            }, 300, Phaser.Easing.Sinusoidal.In, !0)
        }, this)
    }, G.StartBoosterBubble.prototype.pop = function () {
        G.sfx["match_" + game.rnd.between(1, 5)].play(), this.onPop.call(this.onPopContext), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), this.destroy()
    }, G.StartBoosterConfig = function () {
        this.data = []
    }, G.StartBoosterConfig.prototype.select = function (t, e) {
        this.data[t] || (this.data[t] = []), this.data[t][e] = !0
    }, G.StartBoosterConfig.prototype.deselect = function (t, e) {
        this.data[t] || (this.data[t] = []), this.data[t][e] = !1
    }, G.StartBoosterConfig.prototype.isSelected = function (t, e) {
        return !!this.data[t] && this.data[t][e]
    }, G.StartBoosterConfig.prototype.getConfigForLevel = function (t) {
        return this.data[t] || []
    }, G.Text = function (t, e, i, s, a, o, n, r, h) {
        for (s = G.Text.getStyle(s), this.userMaxWidth = o || 1 / 0, this.userMaxHeight = n || 1 / 0, r && (s.wordWrap = !0, s.wordWrapWidth = o, s.align = h || "left"), Phaser.Text.call(this, game, t, e, i, s), s.lineSpacing && (this.lineSpacing = s.lineSpacing), s.shadow && (this.setShadow.apply(this, s.shadow), this.padding.setTo(s.shadow[0], s.shadow[1])), a && ("number" == typeof a ? this.anchor.setTo(a) : this.anchor.setTo(a[0], a[1]));
            (this.width > this.userMaxWidth || this.height > this.userMaxHeight) && (this.fontSize -= 2, !(this.fontSize < 10)););
    }, G.Text.prototype = Object.create(Phaser.Text.prototype), G.Text.styles = {}, G.Text.addStyle = function (t, e) {
        G.Text.styles[t] = e
    }, G.Text.getStyle = function (t) {
        var e;
        if ("object" != typeof t) e = JSON.parse(JSON.stringify(G.Text.styles[t]));
        else if (t.style || t.fontStyle) {
            t.style = t.fontStyle || t.style;
            var i = JSON.parse(JSON.stringify(G.Text.styles[t.style]));
            if (t.scaleStroke && t.fontSize && i.fontSize && i.strokeThickness) {
                var s = i.strokeThickness / parseInt(i.fontSize);
                t.strokeThickness = Math.ceil(parseInt(t.fontSize) * s)
            }
            e = Object.assign(i, t)
        } else e = t;
        return "vi" === G.lang && "Lobster" === e.font && (delete e.font, e.fontWeight = "bold"), e
    }, G.Text.prototype.setText = function (t) {
        Phaser.Text.prototype.setText.call(this, t), this.scale.setTo(1), this.width = Math.min(this.width, this.userMaxWidth), this.height = Math.min(this.height, this.userMaxHeight)
    }, G.Text.prototype.setStyle = function (t, e) {
        t = G.Text.getStyle(t), Phaser.Text.prototype.setStyle.call(this, t, e)
    }, G.TextCounter = function (t, e, i, s, a, o, n) {
        this.amount = i, this.amountDisplayed = i, G.Text.call(this, t, e, null === i ? "..." : i.toString(), s, a, o), n = n || {
            lerpValue: .5
        }, this.lerp = !0, this.lerpValue = n.lerpValue, this.stepCurrent = 0, this.step = 0
    }, G.TextCounter.prototype = Object.create(G.Text.prototype), G.TextCounter.prototype.setAmount = function (t, e) {
        this.amount = t, e && (this.amountDisplayed = t, this.setText(this.amountDisplayed.toString()))
    }, G.TextCounter.prototype.changeAmount = function (t, e) {
        this.amount += t, e && (this.amountDisplayed = this.amount, this.setText(this.amountDisplayed.toString()))
    }, G.TextCounter.prototype.increaseAmount = function (t, e) {
        this.changeAmount(t)
    }, G.TextCounter.prototype.update = function () {
        this.amountDisplayed != this.amount && this.stepCurrent-- <= 0 && (this.stepCurrent = this.step, this.lerp && this.lerpUpdate())
    }, G.TextCounter.prototype.lerpUpdate = function () {
        this.amountDisplayed = G.lerp(this.amountDisplayed, this.amount, this.lerpValue, .2), this.setText(Math.round(this.amountDisplayed).toString())
    }, "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function (t, e) {
            "use strict";
            if (null == t) throw new TypeError("Cannot convert undefined or null to object");
            for (var i = Object(t), s = 1; s < arguments.length; s++) {
                var a = arguments[s];
                if (null != a)
                    for (var o in a) Object.prototype.hasOwnProperty.call(a, o) && (i[o] = a[o])
            }
            return i
        },
        writable: !0,
        configurable: !0
    }), G.TextTimer = function (t, e, i, s, a, o, n) {
        G.Text.call(this, t, e, "???", s, a, o), this.secLeft = 0, this.active = !1, this.timerFormat = n || "hms", this.dots = !0, this.timerBinding = G.sb("onWallClockTimeUpdate").add(this.updateTimer, this), this.events.onDestroy.add(function () {
            this.timerBinding.detach()
        }, this), i && this.setDate(i)
    }, G.TextTimer.prototype = Object.create(G.Text.prototype), G.TextTimer.prototype.sfx = null, G.TextTimer.prototype.updateTimer = function () {
        this.active && (this.sfx && this.sfx.play(), this.secLeft = Math.max(0, this.secLeft - 1), this.updateTimerText(this.secLeft, this.dots), this.dots = !this.dots)
    }, G.TextTimer.prototype.setSecLeft = function (t) {
        this.secLeft = Math.max(0, t), this.updateTimerText(this.secLeft, !0)
    }, G.TextTimer.prototype.updateTimerText = function (t, e) {
        var i = G.changeSecToDHMS(this.secLeft),
            s = []; - 1 < this.timerFormat.indexOf("d") && s.push(i[0]), -1 < this.timerFormat.indexOf("h") && s.push(i[1]), -1 < this.timerFormat.indexOf("m") && s.push(i[2]), -1 < this.timerFormat.indexOf("s") && s.push(i[3]), this.setText(s.join(":"))
    }, G.TextTimer.prototype.start = function (t) {
        t && this.setSecLeft(t), this.active = !0
    }, G.TextTimer.prototype.setDate = function (t) {
        var e = new Date(t).getTime(),
            i = Date.now(),
            s = Math.ceil((e - i) / 1e3);
        this.setSecLeft(s), this.active = !0
    }, G.Timer = function (t, e, i, s, a, o, n, r) {
        G.OneLineText.call(this, t, e, i, r ? G.changeSecToTimerFormat(r) : "???", s, a, o, n), this.secLeft = r || 0, this.dhms = !1, this.active = !1, this.timerBinding = G.sb("onWallClockTimeUpdate").add(this.updateTimer, this), this.events.onDestroy.add(function () {
            this.timerBinding.detach()
        }, this)
    }, G.Timer.prototype = Object.create(G.OneLineText.prototype), G.Timer.prototype.updateTimer = function () {
        this.active && (this.secLeft = Math.max(0, this.secLeft - 1), this.setText(G.changeSecToTimerFormat(this.secLeft, this.dhms)))
    }, G.Timer.prototype.setSecLeft = function (t) {
        this.secLeft = t, this.setText(G.changeSecToTimerFormat(this.secLeft, this.dhms))
    }, G.Timer.prototype.start = function (t) {
        this.setText(G.changeSecToTimerFormat(this.secLeft, this.dhms)), this.active = !0
    }, G.TitleScreenGemsThrower = function () {
        Phaser.Group.call(this, game), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), this.chanceForShoot = .1, this.horizontal = !1;
        for (var t = 0; t < 20; t++) this.addChild(new G.TitleScreenGem)
    }, G.TitleScreenGemsThrower.prototype = Object.create(Phaser.Group.prototype), G.TitleScreenGemsThrower.prototype.onScreenResize = function () {
        this.x = game.world.bounds.x, this.y = 0
    }, G.TitleScreenGemsThrower.prototype.throwGem = function () {
        var t, e, i, s, a = this.getFreeGem();
        null != a && (s = this.horizontal ? (t = Math.random() < .5 ? game.world.bounds.x - G.l(50) : -game.world.bounds.x + game.width + G.l(50), e = .5 * game.height + .5 * game.height * Math.random(), i = G.l(3 + 6 * Math.random()) * Math.sign(t) * -1, G.l(-2 * Math.random() - 2)) : (t = Math.random() * game.width, e = game.height + G.l(50), i = G.l(1 + -2 * Math.random()), G.l(-3 * Math.random() - 1)), a.init(t, e, i, s))
    }, G.TitleScreenGemsThrower.prototype.getFreeGem = function () {
        return this.getFirstDead()
    }, G.TitleScreenGemsThrower.prototype.update = function () {
        Math.random() < this.chanceForShoot && this.throwGem();
        for (var t = 0; t < this.children.length; t++) this.children[t].update()
    }, G.TitleScreenGem = function () {
        Phaser.Image.call(this, game, 0, 0), this.anchor.setTo(.5), this.grav = G.lnf(.02), this.kill()
    }, G.TitleScreenGem.prototype = Object.create(Phaser.Image.prototype), G.TitleScreenGem.prototype.init = function (t, e, i, s) {
        G.changeTexture(this, "candy_" + game.rnd.between(1, 6)), this.x = t, this.y = e, this.velX = i, this.velX *= .99, this.velY = s, this.angleSpeed = 3 * Math.random() - 1.5, this.revive()
    }, G.TitleScreenGem.prototype.update = function () {
        this.alive && (this.x += this.velX, this.angle += this.angleSpeed, this.y += this.velY, this.velY += this.grav, this.y > game.height + 100 && this.kill())
    }, G.TrackData = function (t, e) {
        this.data = {
            boosterBought: [0, 0, 0, 0],
            boosterUsed: [0, 0, 0, 0],
            startBoosterUsed: [0, 0, 0, 0],
            lvlNr: t + 1,
            extraMovesBought: 0,
            continues: 0,
            stars: 0,
            passed: !1,
            movesLeft: e.moves
        }, G.sb("onBoosterBought").add(function (t) {
            this.data.boosterBought[t - 1]++
        }, this), G.sb("onBoosterUsed").add(function (t) {
            this.data.boosterUsed[t - 1]++
        }, this), G.sb("onStartBoosterUsed").add(function (t) {
            this.data.startBoosterUsed[t - 5] = 1
        }, this), G.sb("onExtraMovesUsed").add(function () {
            this.data.extraMovesBought++
        }, this), G.sb("onOutOfMovesWatch").add(function () {
            this.data.continues++
        }, this), G.sb("onOutOfMovesBuy").add(function () {
            this.data.continues++
        }, this), G.sb("madeMove").add(function () {
            this.data.passed || this.data.movesLeft--
        }, this), G.sb("onGoalAchieved").add(function () {
            this.data.passed = !0
        }, this), G.sb("onLevelFinished").add(function (t, e) {
            this.data.stars = e
        }, this), game.state.onStateChange.addOnce(this.send, this)
    }, G.TrackData.prototype.send = function () { }, G.UITargetParticles = function (t, e) {
        G.PoolGroup.call(this, G.UITargetParticle), this.minNrOfPart = t || 3, this.maxNrOfPart = e || 100
    }, G.UITargetParticles.prototype = Object.create(G.PoolGroup.prototype), G.UITargetParticles.prototype.createDividedBatch = function (t, e, i, s, a, o, n) {
        var r = new G.UITargetParticles.BatchObj;
        (n = n || 25) < a / o && (o = Math.ceil(a / n));
        for (var h = Math.floor(a / o) + Math.sign(a % o), l = 0; l < h; l++) {
            var d = this.init(t, e, i, s, Math.min(o, a));
            a -= o, r.add(d)
        }
        return r
    }, G.UITargetParticles.prototype.createBatch = function (t, e, i, s, a, o) {
        for (var n = new G.UITargetParticles.BatchObj, r = 0; r < o; r++) {
            var h = this.init(t, e, i, s, a);
            n.add(h)
        }
        return n
    }, G.UITargetParticles.prototype.createCoinBatch = function (t, e, i, s) {
        game.state.getCurrentState();
        var a = this.createDividedBatch(t, e, "coin_1", i, s, 5);
        a.addOnPartStart(function () {
            this.scale.setTo(.75), this.vel.setTo(game.rnd.realInRange(-12, 12), game.rnd.realInRange(-12, 12))
        }), a.addOnPartFinish(function () {
            G.sfx.pop.play(), G.saveState.changeCoins(this.carriedValue, !0)
        }), a.start(), a.onFinish.add(function () {
            G.saveState.save()
        })
    }, G.UITargetParticles.BatchObj = function () {
        this.parts = [], this.nrOfParts = 0, this.nrOfFinished = 0, this.onFinish = new Phaser.Signal
    }, G.UITargetParticles.BatchObj.prototype.add = function (t) {
        this.parts.push(t), t.onFinish.addOnce(this.onPartFinish, this), this.nrOfParts++
    }, G.UITargetParticles.BatchObj.prototype.onPartFinish = function () {
        this.nrOfFinished++, this.nrOfFinished == this.nrOfParts && this.onFinish.dispatch()
    }, G.UITargetParticles.BatchObj.prototype.addOnPartStart = function (e, i) {
        this.parts.forEach(function (t) {
            t.onStart.addOnce(e, i || t, 1)
        })
    }, G.UITargetParticles.BatchObj.prototype.addOnPartFinish = function (e, i) {
        this.parts.forEach(function (t) {
            t.onFinish.addOnce(e, i || t, 1)
        })
    }, G.UITargetParticles.BatchObj.prototype.start = function (e) {
        var i = 0;
        this.parts.forEach(function (t) {
            t.start(i), i += e || 0
        })
    }, G.UITargetParticle = function () {
        G.Image.call(this, 0, 0, null, .5), this.onStart = new Phaser.Signal, this.onFinish = new Phaser.Signal, this.speed = 0, this.speedMax = 30, this.speedDelta = .75, this.vel = new Phaser.Point(0, 0), this.velInit = new Phaser.Point(0, 0), this.kill()
    }, G.UITargetParticle.prototype = Object.create(G.Image.prototype), G.UITargetParticle.prototype.init = function (t, e, i, s, a) {
        this.position.setTo(t, e), this.changeTexture(i), this.onStart.removeAll(), this.onFinish.removeAll(), this.carriedValue = a || 1, this.targetObj = s, this.stopTweens(this), this.scale.setTo(1), this.alpha = 1, this.speed = 0, this.speedMax = 30, this.speedDelta = .75, this.vel.setTo(0, 0)
    }, G.UITargetParticle.prototype.start = function (t) {
        t ? game.time.events.add(t, this.start, this) : (this.revive(), this.worldPosition.x = 9999, this.worldPosition.y = 9999, this.onStart.dispatch(this, this.carriedValue))
    }, G.UITargetParticle.prototype.update = function () {
        if (this.alive) {
            this.position.add(this.vel.x, this.vel.y), this.vel.x *= .95, this.vel.y *= .95, this.speed += this.speedDelta, this.speed = Math.min(this.speed, this.speedMax);
            var t = Phaser.Point.distance(this.worldPosition, this.targetObj.worldPosition),
                e = Phaser.Point.angle(this.targetObj.worldPosition, this.worldPosition);
            this.position.add(G.lengthDirX(e, Math.min(t, this.speed), !0), G.lengthDirY(e, Math.min(t, this.speed), !0)), t < this.speedMax && (this.onFinish.dispatch(this, this.carriedValue), this.kill())
        }
    }, G.UI_BoosterButton = function (t, e, i) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.orgY = this.y, this.state = game.state.getCurrentState(), this.boosterNr = i, this.overlay = this.state.overlay, this.selected = !1, this.highlighted = !1, this.hl = G.makeImage(0, 0, "popup_lighht", .5, this), this.hl.blendMode = 1, this.hl.alpha = 0, this.hl.angle2 = 0, this.openLock = !1, G.sb("onTutorialFinish").add(function () {
            this.hideSuggestion()
        }, this), this.btn = new G.Button(0, 0, "ui_booster_" + i, function () {
            if (this.selected && !G.tutorialOpened) return G.sb("onBoosterDeselect").dispatch(this.boosterNr);
            0 < this.state.board.actionManager.actionList.length || (0 < G.saveState.getBoosterAmount(this.boosterNr) || G.saveState.isEnoughToBuyBooster(this.boosterNr) ? G.sb("onBoosterSelect").dispatch(this.boosterNr) : game.incentivised ? G.sb("pushWindow").dispatch("moreMoney") : (G.stopTweens(this.priceLabel), this.priceLabel.scale.setTo(1), game.add.tween(this.priceLabel.scale).to({
                x: .6,
                y: 1.4
            }, 150, Phaser.Easing.Bounce.InOut, !0, 0, 2, !0)))
        }, this), this.add(this.btn), this.btn.addTerm(function () {
            return 0 == this.state.board.actionManager.actionList.length || this.selected
        }, this), this.boosterActiveOffset = G.l(20), this.tweenObj = {
            angle: -15,
            alpha: 1
        }, game.add.tween(this.tweenObj).to({
            angle: 15
        }, 2e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.tween(this.tweenObj).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.angleMulti = 0, this.priceLabel = new G.LabelGroupT(G.json.settings["priceOfBooster" + i] + "@currency@", 0, 35, {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "#fdfbe4",
            stroke: "#73461c",
            strokeThickness: 7
        }, .5, 85), this.add(this.priceLabel), this.plus = G.makeImage(40, 30, "booster_plus", .5, this), this.amount = new G.Text(40, 33, G.saveState.getBoosterAmount(i).toString(), {
            style: "font-beige-standard",
            fontSize: "25px"
        }, .5, 100), this.add(this.amount), this.hand = G.makeImage(0, 0, "tut_hand", 0, this), this.hand.alpha = 0, this.alphaTween = !1, this.refreshBoosterAmount(), G.sb("refreshBoosterAmount").add(function (t) {
            t == this.boosterNr && this.refreshBoosterAmount()
        }, this), G.sb("onBoosterSelect").add(function (t) {
            t == this.boosterNr ? this.select() : this.squeeze()
        }, this), G.sb("onBoosterUsed").add(function (t) {
            t == this.boosterNr ? this.deselect() : this.unsqueeze()
        }, this), G.sb("onBoosterDeselect").add(function (t) {
            t == this.boosterNr ? this.deselect() : this.unsqueeze()
        }, this)
    }, G.UI_BoosterButton.prototype = Object.create(Phaser.Group.prototype), G.UI_BoosterButton.prototype.refreshBoosterAmount = function () {
        0 == G.saveState.getBoosterAmount(this.boosterNr) ? (this.plus.visible = !1, this.amount.visible = !1, this.priceLabel.visible = !0) : (G.changeTexture(this.plus, "booster_ammount"), this.plus.visible = !0, this.amount.visible = !0, this.priceLabel.visible = !1, this.amount.setText(G.saveState.getBoosterAmount(this.boosterNr).toString()))
    }, G.UI_BoosterButton.prototype.update = function () {
        this.angle = this.angleMulti * this.tweenObj.angle, this.y = this.orgY - this.angleMulti * this.boosterActiveOffset, this.x = this.orgX, this.hl.angle2++, this.hl.angle = -this.angle + this.hl.angle2, this.hl.alpha = G.lerp(this.hl.alpha, this.selected ? .5 : 0, .1)
    }, G.UI_BoosterButton.prototype.select = function () {
        G.sb("startOverlay").dispatch([
            ["clearBoard"],
            ["moveToAboveGroup", this, "boosterGroup"]
        ]), this.selected = !0, game.add.tween(this).to({
            angleMulti: 1
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0)
    }, G.UI_BoosterButton.prototype.deselect = function () {
        G.sb("closeOverlay").dispatch(), this.selected = !1, game.add.tween(this).to({
            angleMulti: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0)
    }, G.UI_BoosterButton.prototype.squeeze = function () {
        game.add.tween(this.scale).to({
            x: .8,
            y: .8
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UI_BoosterButton.prototype.unsqueeze = function () {
        1 != this.scale.x && game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UI_BoosterButton.prototype.lock = function () {
        this.ignoreChildInput = !0
    }, G.UI_BoosterButton.prototype.unlock = function () {
        this.ignoreChildInput = !1
    }, G.UI_BoosterButton.prototype.hideSuggestion = function () {
        0 != this.hand.alpha && (this.alphaTween && this.alphaTween.stop(), G.stopTweens(this.hand), this.alphaTween = game.add.tween(this.hand).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0))
    }, G.UI_BoosterButton.prototype.showSuggestion = function () {
        this.openLock || (this.alphaTween && this.alphaTween.stop(), this.alphaTween = game.add.tween(this.hand).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.hand.position.setTo(0, 0), game.add.tween(this.hand).to({
            x: G.l(20),
            y: G.l(20)
        }, 800, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.openLock = !0, G.tutorialOpened || game.time.events.add(5e3, function () {
            this.hideSuggestion()
        }, this), game.time.events.add(15e3, function () {
            this.openLock = !1
        }, this))
    }, G.UI_BoosterLabel = function () {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.ico = G.makeImage(0, 0, null, .5, this), this.txt = new G.Text(0, 0, " ", {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "white",
            lineSpacing: -10
        }, .5, 400, 200, !0, "center"), this.txt.anchor.setTo(.5), this.txt.setShadow(0, 10, "rgba(0,0,0,1)", 10), this.add(this.txt), this.topBar = this.state.topBar, this.textLookup = {
            1: G.txt("Use the swap booster to change the place of two cookies!") + " ",
            2: G.txt("Use the star wand to crush one cookie!") + " ",
            3: G.txt("Use the horizontal pin to clear the whole row!") + " ",
            4: G.txt("Use the vertical pin to clear the whole column!") + " "
        }, G.sb("onScreenResize").add(this.resize, this), this.resize(), G.sb("onBoosterSelect").add(this.init, this), G.sb("closeOverlay").add(this.hide, this)
    }, G.UI_BoosterLabel.prototype = Object.create(Phaser.Group.prototype), G.UI_BoosterLabel.prototype.init = function (t) {
        G.changeTexture(this.ico, "ui_booster_" + t), this.txt.setText(this.textLookup[t.toString()]), this.alpha = 0, G.stopTweens(this), game.add.tween(this).to({
            alpha: 1
        }, 500, Phaser.Easing.Sinusoidal.Out, !0), this.resize()
    }, G.UI_BoosterLabel.prototype.hide = function () {
        G.stopTweens(this), game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UI_BoosterLabel.prototype.resize = function () {
        G.horizontal ? (this.position.setTo(-79, 194), this.txt.position.setTo(0, 60), this.txt.anchor.y = 0, this.txt.wordWrapWidth = G.l(200)) : (this.position.setTo(132, 70), this.txt.position.setTo(260, 0), this.txt.anchor.y = .5, this.txt.wordWrapWidth = G.l(350)), this.txt.setText(this.txt.text)
    }, G.UI_CoinCounter = function () {
        Phaser.Group.call(this, game), this.x = 100, this.y = 100, this.state = game.state.getCurrentState(), this.text = new G.TextCounter(0, 0, G.saveState.data.coins, {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "40px"
        }, [1, .5], 200), this.add(this.text), this.ico = G.makeImage(0, 0, "currency", [0, .5], this), this.alpha = 0, G.sb("onScreenResize").add(this.resize, this), this.resize(), G.sb("onBoosterSelect").add(this.init, this), G.sb("closeOverlay").add(this.hide, this), G.sb("onCoinsChange").add(this.text.setAmount, this.text)
    }, G.UI_CoinCounter.prototype = Object.create(Phaser.Group.prototype), G.UI_CoinCounter.prototype.resize = function () {
        G.horizontal ? (this.x = 0, this.y = G.l(700)) : (this.x = G.l(330), this.y = this.state.board.y - G.l(60), this.x += Math.floor(.5 * this.text.width))
    }, G.UI_CoinCounter.prototype.init = function (t) {
        G.saveState.getBoosterAmount(t) <= 0 && (this.alpha = 0, G.stopTweens(this), game.add.tween(this).to({
            alpha: 1
        }, 500, Phaser.Easing.Sinusoidal.Out, !0), this.resize())
    }, G.UI_CoinCounter.prototype.hide = function () {
        G.stopTweens(this), game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UI_ComboIndicator = function () {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.bg = G.makeImage(0, 0, "combo_bg", .5, this), this.coinGroup = this.add(game.add.group()), this.comboTxt = new G.OneLineCounter(0, 5, "font-score-4", 0, 50, 100, .5, .5, "x"), this.add(this.comboTxt), G.sb("onComboIncrease").add(this.increaseCombo, this), G.sb("onComboBreak").add(this.breakCombo, this), this.lvl = G.lvl, this.scale.setTo(0), this.breakTimerAmount = 30, this.breakTimer = -1, this.combo = 0, this.board = game.state.getCurrentState().board, this.x = this.board.x + .5 * this.board.width, this.y = this.board.y + .5 * this.board.height
    }, G.UI_ComboIndicator.prototype = Object.create(Phaser.Group.prototype), G.UI_ComboIndicator.prototype.update = function () {
        this.x = this.board.x + .9 * this.board.width, this.y = this.board.y + .02 * this.board.height, this.comboTxt.update(), 0 == this.breakTimer-- && (G.stopTweens(this), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.worldPosition.x + game.world.bounds.x, this.worldPosition.y, "whiteStarPart"), game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 200, Phaser.Easing.Cubic.In, !0)), this.coinGroup.update()
    }, G.UI_ComboIndicator.prototype.increaseCombo = function (t) {
        G.lvl.combo < 2 || (3 == G.lvl.combo && (this.breakTimer = -1, G.stopTweens(this), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Cubic.In, !0)), G.stopTweens(this.comboTxt), this.comboTxt.changeAmount(t), this.comboTxt.scale.setTo(1), game.add.tween(this.comboTxt.scale).to({
            x: 1.3,
            y: 1.3
        }, 200, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), this.combo = t)
    }, G.UI_ComboIndicator.prototype.breakCombo = function () {
        this.combo < 3 || (this.combo = 0, this.breakTimer = this.breakTimerAmount)
    }, G.UI_ComboIndicatorCoin = function (t, e) {
        Phaser.Image.call(this, game, t, e, null), this.anchor.setTo(.5), this.scale.setTo(.7), G.changeTexture(this, "coin_1"), this.angle = game.rnd.between(0, 360), this.velX = game.rnd.realInRange(G.l(-5), G.l(5)), this.velY = game.rnd.realInRange(G.l(-10), G.l(-5)), this.grav = G.lnf(.35), this.alphaDelay = 20
    }, G.UI_ComboIndicatorCoin.prototype = Object.create(Phaser.Image.prototype), G.UI_ComboIndicatorCoin.prototype.update = function () {
        this.x += this.velX, this.y += this.velY, this.velX *= .98, this.velY += this.grav, this.angle += .5 * this.velX, this.alphaDelay-- < 0 && (this.alpha -= .03, this.alpha <= 0 && this.destroy())
    }, G.UI_DailyChallengeIcon = function (t, e) {
        this.state = game.state.getCurrentState(), Phaser.Group.call(this, game), this.unlocked = G.saveState.getLastPassedLevelNr() >= G.json.settings.featuresUnlock.dailyChallenge, this.x = G.l(t), this.y = G.l(e), this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.alpha = .5, this.glow.scale.setTo(.5), this.glow.blendMode = 1, this.glow.update = function () {
            this.angle++
        }, this.icon = new G.Button(0, 0, "btn_daily_challenge", function () {
            this.available && G.sb("pushWindow").dispatch(["dailyChallenge", G.saveState.getDailyChallengeLevel()])
        }, this), this.add(this.icon), this.freeText = new G.Text(0, 65, G.txt("Daily Challenge"), {
            fill: "#fdfbe4",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#73461c",
            strokeThickness: 7
        }, .5, 150, 150, !0, "center"), this.freeText.inputEnabled = !0, this.freeText.input.useHandCursor = !0, this.freeText.events.onInputDown.add(function () {
            this.available && G.sb("pushWindow").dispatch(["dailyChallenge", G.saveState.getDailyChallengeLevel()])
        }, this), this.freeText.lineSpacing = -20, this.freeText.setShadow(0, 0, "black", 3), this.add(this.freeText), game.add.tween(this.freeText.scale).to({
            x: .9,
            y: .9
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.checkAvailability(), G.sb("onScreenResize").add(this.onResize, this), this.onResize();
        var i = this.state.lastLevelData;
        i && i.challenge && game.time.events.add(1e3, function () {
            this.batchesWaitingForFinish = 0, this.createParticlesBatch(i)
        }, this)
    }, G.UI_DailyChallengeIcon.prototype = Object.create(Phaser.Group.prototype), G.UI_DailyChallengeIcon.prototype.update = function () {
        this.glow.angle++
    }, G.UI_DailyChallengeIcon.prototype.checkAvailability = function () {
        this.unlocked && G.saveState.isChallengeAvailable() ? (this.available = !0, this.freeText.visible = this.glow.visible = !0, this.visible = !0) : (this.freeText.visible = this.glow.visible = !1, this.available = !1, this.visible = !1, game.time.events.add(5e3, this.checkAvailability, this))
    }, G.UI_DailyChallengeIcon.prototype.onResize = function () {
        var t = game.world.bounds.x + Math.floor(.5 * game.width);
        game.width < 1070 ? this.x = t + 260 : this.x = t + 260 + 230
    }, G.UI_DailyChallengeIcon.prototype.createParticlesBatch = function (t) {
        0 < t.starImprovement && this.afterLvlPartBatch(t.lvlNr, t.starImprovement, "stars"), 0 < t.reward && this.afterLvlPartBatch(t.lvlNr, t.reward, "coins")
    }, G.UI_DailyChallengeIcon.prototype.afterLvlPartBatch = function (t, e, i) {
        var s = "coins" == i,
            a = this.state.uiTargetParticlesBW.createDividedBatch(game.world.bounds.x + this.worldPosition.x, this.worldPosition.y, s ? "coin_1" : "map_star_1", s ? this.state.panel.coinsTxt : this.state.panel.starsTxt, e, s ? 3 : 1);
        a.addOnPartStart(function () {
            s ? this.scale.setTo(.9) : this.scale.setTo(1.2), this.speedDelta = .5, this.speedMax = 20, this.vel.x = game.rnd.realInRange(-20, 20), this.vel.y = game.rnd.realInRange(-20, 20)
        }), a.addOnPartFinish(function () {
            if (G.sfx.pop.play(), s) G.saveState.changeCoins(this.carriedValue, !0);
            else {
                var t = this.state.panel.starsTxt;
                t.setText(parseInt(t.text) + 1)
            }
        }), this.batchesWaitingForFinish++, a.onFinish.add(function () {
            this.batchesWaitingForFinish--, 0 == this.batchesWaitingForFinish && G.saveState.save()
        }, this), a.start()
    }, G.UI_DailyIcon = function (t, e) {
        this.active = G.saveState.getLastPassedLevelNr() >= G.json.settings.featuresUnlock.daily, this.tutorial = this.active && !G.saveState.data.sawDailyTut, this.state = game.state.getCurrentState(), Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.addIcon(), this.active ? (this.addGlow(), this.addTimerAndFreeText()) : this.addUnlockTxt(), this.update(), this.tutorial && (this.tutHand = G.makeImage(0, 20, "tut_hand", 0, this), game.add.tween(this.tutHand).to({
            x: G.l(20),
            y: G.l(50)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.UI_DailyIcon.prototype = Object.create(Phaser.Group.prototype), G.UI_DailyIcon.prototype.update = function () {
        this.active && (this.glow.angle++, this.freeText.visible = this.glow.visible = G.saveState.data.freeSpin, this.timer.visible = !this.freeText.visible), this.iconDark.visible = !this.active || !G.saveState.data.freeSpin
    }, G.UI_DailyIcon.prototype.onResize = function () {
        var t = game.world.bounds.x + Math.floor(.5 * game.width);
        game.width < 1070 ? this.x = t + 260 : this.x = t + 260 + 230
    }, G.UI_DailyIcon.prototype.addIcon = function () {
        this.icon = new G.Button(0, 0, "daily_icon", function () {
            this.active && (game.incentivised || G.saveState.data.freeSpin) && (G.sb("pushWindow").dispatch(["daily2", this.tutorial]), this.tutorial && (this.tutHand && this.tutHand.destroy(), G.saveState.data.sawDailyTut = !0, G.saveState.save(), G.sb("onWindowClosed").addOnce(function () {
                var t = game.state.getCurrentState();
                t.lvlTutHand && game.add.tween(t.lvlTutHand).to({
                    alpha: 1
                }, 500, Phaser.Easing.Sinusoidal.Out, !0)
            })))
        }, this), this.add(this.icon), this.iconDark = G.makeImage(0, 0, "daily_icon_dark", .5, this.icon)
    }, G.UI_DailyIcon.prototype.addGlow = function () {
        this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.alpha = .5, this.glow.scale.setTo(.5), this.glow.blendMode = 1, this.glow.update = function () {
            this.angle++
        }, this.sendToBack(this.glow)
    }, G.UI_DailyIcon.prototype.addTimerAndFreeText = function () {
        this.timer = new G.Timer(0, 0, "font-white-stroke", 30, 130, .5, .5, (G.saveState.data.lastDaily + 864e5 - Date.now()) / 1e3), this.timer.active = !0, this.add(this.timer), G.sb("onDailyFreeSpinGain").add(function () {
            this.timer.setSecLeft((G.saveState.data.lastDaily + 864e5 - Date.now()) / 1e3)
        }, this), this.freeText = new G.Text(0, 0, G.txt("Free spin!"), {
            fill: "#ffffe8",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#004455",
            strokeThickness: 5
        }, .5, 150, 150, !0, "center"), this.freeText.lineSpacing = -15, this.freeText.setShadow(0, 0, "black", 3), this.add(this.freeText), game.add.tween(this.freeText.scale).to({
            x: .9,
            y: .9
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.UI_DailyIcon.prototype.addUnlockTxt = function (t) {
        this.unlockTxt = new G.Text(0, 0, G.txt("Unlock at Level X").replace("X", G.json.settings.featuresUnlock.daily + 1), {
            fill: "#fdfbe4",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#73461c",
            strokeThickness: 5
        }, .5, 150, 150, !0, "center"), this.unlockTxt.lineSpacing = -15, this.unlockTxt.setShadow(0, 0, "black", 3), this.add(this.unlockTxt), game.add.tween(this.unlockTxt.scale).to({
            x: .9,
            y: .9
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.UI_ExtraMovesBuyButton = function () {
        Phaser.Group.call(this, game), this.targetY = 0, this.state = game.state.getCurrentState(), this.hl = G.makeImage(0, 0, "popup_lighht", .5, this), this.hl.alpha = .2, this.hl.scale.setTo(.6), this.hl.blendMode = 1, this.floating = {
            offset: G.l(-10)
        }, game.add.tween(this.floating).to({
            offset: G.l(10)
        }, 700, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.btn = new G.Button(0, 0, "ui_booster_5", this.btnClick, this), this.btn.sfx = G.sfx.cash_register, this.btn.addTerm(function () {
            return G.lvl.moves < 5
        }), this.add(this.btn), this.labelBg = G.makeImage(0, 45, "move_extra_label", .5, this), G.sb("madeMove").add(function () {
            G.lvl.goalAchieved || G.saveState.data.coins >= G.lvl.getPriceOfExtraMoves() && 4 == G.lvl.moves && this.show()
        }, this), G.sb("onWindowOpened").add(function () {
            this.hide()
        }, this), G.sb("onWindowClosed").add(function () {
            this.visible || G.saveState.data.coins >= G.lvl.getPriceOfExtraMoves() && G.lvl.moves <= 4 && 0 < G.lvl.moves && this.show()
        }, this), this.scale.setTo(0), this.visible = !1, G.sb("onGoalAchieved").add(this.hide, this)
    }, G.UI_ExtraMovesBuyButton.prototype = Object.create(Phaser.Group.prototype), G.UI_ExtraMovesBuyButton.prototype.update = function () {
        this.y = this.targetY + this.floating.offset, this.hl.angle++
    }, G.UI_ExtraMovesBuyButton.prototype.btnClick = function () {
        if (G.saveState.data.coins >= G.lvl.getPriceOfExtraMoves()) {
            var t = this.worldPosition;
            G.sb("UIfx").dispatch(t.x + game.world.bounds.x, t.y, "whiteStarPart"), G.sb("UIfx").dispatch(t.x + game.world.bounds.x, t.y, "whiteStarPart"), G.sb("UIfx").dispatch(t.x + game.world.bounds.x, t.y, "whiteStarPart"), G.sb("UIfx").dispatch(t.x + game.world.bounds.x, t.y, "whiteStarPart"), G.lvl.buyExtraMoves(), this.hide()
        } else this.state.windowLayer.pushWindow(["moreMoney"])
    }, G.UI_ExtraMovesBuyButton.prototype.show = function () {
        !game.incentivised && G.saveState.getCoins() < G.lvl.getPriceOfExtraMoves() || (this.priceTxt && this.priceTxt.destroy(), this.priceTxt = new G.LabelGroupT("$+5 moves$ " + G.lvl.getPriceOfExtraMoves() + "@coin_1@", 5, 45, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "white"
        }, .5, 180), this.add(this.priceTxt), this.visible = !0, G.stopTweens(this), this.scale.setTo(0), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 2e3, Phaser.Easing.Elastic.Out, !0))
    }, G.UI_ExtraMovesBuyButton.prototype.hide = function () {
        G.stopTweens(this), game.add.tween(this.scale).to({
            x: 0,
            y: 0
        }, 400, Phaser.Easing.Cubic.Out, !0).onComplete.add(function () {
            this.visible = !1
        }, this)
    }, G.UI_Life = function (t, e) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.lifeIcon = new G.Button(0, 0, "top-panel-heardsBg", function () {
            G.gameTracking.design("GetLivesButtonClicked"), G.sb("pushWindow").dispatch("buyLives")
        }, this), this.add(this.lifeIcon), this.currentLivesNr = G.saveState.getCurrentLivesNr(), this.livesMax = G.json.settings.livesMax, this.livesNrTxt = new G.Text(-50, 0, this.currentLivesNr.toString(), {
            style: "font-red",
            fontSize: "29px"
        }, .5, 150), this.add(this.livesNrTxt), this.timer = new G.TextTimer(25, 4, 0, {
            style: "font-beige",
            fontSize: 30
        }, .5, 140, "ms"), this.add(this.timer), this.timerMax = new G.Text(25, 4, G.txt("Max"), {
            style: "font-beige",
            fontSize: 30
        }, .5, 100), this.add(this.timerMax), this.timer.start(), G.sb("onWallClockTimeUpdate").add(this.onTickUpdate, this), G.sb("onLifeAdded").add(this.onTickUpdate, this), G.sb("onLifeTimerUpdate").add(this.timer.setSecLeft, this.timer), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onAllWindowsClosed").add(this.unlockInput, this)
    }, G.UI_Life.prototype = Object.create(Phaser.Group.prototype), G.UI_Life.prototype.onTickUpdate = function () {
        var t = G.saveState.getCurrentLivesNr();
        this.currentLivesNr !== t && (this.currentLivesNr = t, this.livesNrTxt.setText(this.currentLivesNr.toString()))
    }, G.UI_Life.prototype.update = function () {
        this.currentLivesNr !== this.livesMax ? (this.timer.visible = !0, this.timerMax.visible = !1) : (this.timer.visible = !1, this.timerMax.visible = !0), 0 === this.currentLivesNr ? this.lifeIcon.inputEnabled = !0 : this.lifeIcon.inputEnabled = !1
    }, G.UI_Life.prototype.lockInput = function () {
        this.ignoreChildInput = !0
    }, G.UI_Life.prototype.unlockInput = function () {
        this.ignoreChildInput = !1
    }, G.UI_PopOutMoney = function () {
        Phaser.Image.call(this, game, 0, 0, null), this.state = game.state.getCurrentState(), this.double = this.state.doubleMoney, G.changeTexture(this, this.double ? "coin_2" : "coin_1"), this.anchor.setTo(.5), this.kill()
    }, G.UI_PopOutMoney.prototype = Object.create(Phaser.Image.prototype), G.UI_PopOutMoney.prototype.init = function (t, e) {
        G.stopTweens(this), this.revive(), G.saveState.changeCoins(this.double ? 2 : 1), G.sb("onLevelMoneyGain").dispatch(this.double ? 2 : 1), G.sfx.cash_register.play(), this.x = t, this.y = e, this.scale.setTo(0), this.angle = -10, game.add.tween(this).to({
            y: this.y - G.l(20 * Math.random() + 30)
        }, 500, Phaser.Easing.Cubic.InOut, !0, 0, 0, !0), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Cubic.InOut, !0, 0, 0, !0).onComplete.add(this.kill, this)
    }, G.UI_ShoutOuts = function () {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.board = this.state.board, this.glowImg = G.makeImage(0, 0, "popup_lighht", .5, this), this.glowImg.alpha = .5, this.glowImg.visible = !1, this.shoutOut = new G.Text(0, 0, " ", {
            style: "font-red",
            fontSize: 70
        }, .5, 600), this.add(this.shoutOut), this.shoutOut.visible = !1, this.combo = 0, G.sb("onComboIncrease").add(this.increaseCombo, this), G.sb("onComboBreak").add(this.breakCombo, this), G.sb("onGoalAchieved").add(this.cookieCrush, this), G.sb("madeMove").add(function () {
            G.lvl.goalAchieved || (10 == G.lvl.moves && this.lockedShoutOut(G.txt("10 moves left")), 5 == G.lvl.moves && this.lockedShoutOut(G.txt("5 moves left")))
        }, this), this.locked = !1, this.board = game.state.getCurrentState().board, this.x = this.board.x + .5 * (this.board.width - 2 * this.board.tilesize), this.y = this.board.y + .45 * (this.board.height - 2 * this.board.tilesize)
    }, G.UI_ShoutOuts.prototype = Object.create(Phaser.Group.prototype), G.UI_ShoutOuts.prototype.update = function () {
        this.x = this.board.x + .5 * (this.board.width - 2 * this.board.tilesize), this.y = this.board.y + .45 * (this.board.height - 2 * this.board.tilesize), this.glowImg.angle++
    }, G.UI_ShoutOuts.prototype.increaseCombo = function (t) {
        if (!this.locked && !G.lvl.goalAchieved) {
            this.combo = t;
            var e = !1;
            3 == this.combo && (e = G.txt("Sweet!"), G.sfx.sweet.play()), 5 == this.combo && (e = G.txt("Tasty!"), G.sfx.tasty.play()), 7 == this.combo && (e = G.txt("Delicious!"), G.sfx.delicious.play()), 9 == this.combo && (e = G.txt("Divine!"), G.sfx.divine.play()), e && (G.stopTweens(this.shoutOut), this.shoutOut.visible = !0, this.shoutOut.alpha = 1, this.shoutOut.setText(e), this.shoutOut.scale.setTo(0), game.add.tween(this.shoutOut.scale).to({
                x: 1,
                y: 1
            }, 700, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.shoutOut).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.In, !0, 1e3).onComplete.add(function () {
                this.shoutOut.visible = !1
            }, this))
        }
    }, G.UI_ShoutOuts.prototype.lockedShoutOut = function (t) {
        this.locked = !0, G.stopTweens(this.shoutOut), this.shoutOut.visible = !0, this.shoutOut.alpha = 1, this.shoutOut.setText(t), this.shoutOut.scale.setTo(0), game.add.tween(this.shoutOut.scale).to({
            x: 1,
            y: 1
        }, 700, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.shoutOut).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0, 1500).onComplete.add(function () {
            this.shoutOut.visible = !1, this.locked = !1
        }, this)
    }, G.UI_ShoutOuts.prototype.cookieCrush = function () {
        G.sfx.sugarcrush.play(), this.glowImg.scale.setTo(0), this.glowImg.visible = !0, game.add.tween(this.glowImg.scale).to({
            x: 1.5,
            y: 1.5
        }, 500, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.glowImg).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0, 1500), G.stopTweens(this.shoutOut), this.shoutOut.visible = !0, this.shoutOut.alpha = 1, this.shoutOut.setText(G.txt("SUGAR CRUSH!")), this.shoutOut.scale.setTo(0), game.add.tween(this.shoutOut.scale).to({
            x: 1,
            y: 1
        }, 700, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.shoutOut).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0, 1500).onComplete.add(function () {
            this.shoutOut.visible = !1
        }, this);
        for (var t = 0; t < 10; t++) G.sb("UIfx").dispatch(this.x - 100 + 20 * t, this.y, "whiteStarPart")
    }, G.UI_ShoutOuts.prototype.breakCombo = function () {
        this.combo = 0
    }, G.UI_StartBoosterButton = function (t, e, i, s) {
        Phaser.Group.call(this, game), this.unlocked = G.saveState.isBoosterUnlocked(i), this.x = G.l(t), this.y = G.l(e), this.nr = i, this.lvlNr = s, this.unlocked ? (this.initUnlocked(i, s), G.saveState.data.startBoosterAnim[i - 5] && (G.saveState.data.startBoosterAnim[i - 5] = !1, G.saveState.save(), this.initUlockAnimation())) : this.img = G.makeImage(0, 0, "ui_booster_" + i + "_locked", .5, this)
    }, G.UI_StartBoosterButton.prototype = Object.create(Phaser.Group.prototype), G.UI_StartBoosterButton.prototype.update = function () {
        this.hl && (this.hl.angle++, this.hl.alpha = game.math.clamp(this.hl.alpha + (this.selected ? .05 : -.05), 0, 1), this.priceTxt.alpha = game.math.clamp(this.priceTxt.alpha + (0 != this.amount || this.selected ? -.05 : .05), 0, 1));
        for (var t = this.children.length; t--;) this.children[t].update()
    }, G.UI_StartBoosterButton.prototype.select = function () {
        this.startBoosterConfig.select(this.levelNr, this.boosterNr), this.selected = !0, this.amount--, this.amountTxt.setText(this.amount.toString())
    }, G.UI_StartBoosterButton.prototype.deselect = function () {
        this.startBoosterConfig.deselect(this.levelNr, this.boosterNr), this.selected = !1, this.amount++, this.amountTxt.setText(this.amount.toString())
    }, G.UI_StartBoosterButton.prototype.initUnlocked = function (t, e) {
        this.startBoosterConfig = game.state.getCurrentState().startBoosterConfig, this.boosterNr = t, this.levelNr = e, this.hl = G.makeImage(0, 0, "popup_lighht", .5, this), this.hl.scale.setTo(.6), this.hl.angle = 360 * Math.random(), this.hl.alpha = 0, this.btn = new G.Button(0, 0, "ui_booster_" + t, function () {
            this.selected ? this.deselect() : 0 < this.amount ? this.select() : G.saveState.isEnoughToBuyBooster(this.boosterNr) ? (G.saveState.buyBooster(this.boosterNr), this.amount++, this.amountTxt.setText(this.amount.toString())) : game.incentivised ? (this.parent.state.windowLayer.pushWindow(["moreMoney", "level"]), this.parent.closeWindow()) : (this.alpha = .5, this.btn.inputEnabled = !1)
        }, this), this.add(this.btn), this.selected = !1, this.amountBg = G.makeImage(-40, -40, "booster_ammount", .5, this), this.amount = G.saveState.getBoosterAmount(t), this.amountTxt = new G.Text(-40, -40, this.amount.toString(), {
            style: "font-beige-standard",
            fontSize: "25px"
        }, .5, 100), this.add(this.amountTxt), this.priceTxt = new G.LabelGroupT(G.json.settings["priceOfBooster" + this.boosterNr] + "@coin_1@", 10, 45, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "white"
        }, .5, 100), this.add(this.priceTxt), 0 < this.amount && (this.priceTxt.alpha = 0), this.startBoosterConfig.isSelected(this.levelNr, this.boosterNr) && this.select(), 0 == this.amount && !game.incentivised && G.saveState.getCoins() < G.json.settings["priceOfBooster" + this.boosterNr] && (this.alpha = .5, this.btn.inputEnabled = !1)
    }, G.UI_StartBoosterButton.prototype.initUlockAnimation = function () {
        this.ignoreChildInput = !0, this.amountTxt.alpha = 0, this.amountBg.alpha = 0;
        var t = G.makeImage(0, 0, "circle", .5, this),
            e = t.width,
            i = t.height;
        t.scale.setTo(0), t.blendMode = 1, game.add.tween(t).to({
            width: 2 * e,
            height: 2 * i,
            alpha: 0
        }, 600, Phaser.Easing.Cubic.Out, !0, 500), game.time.events.add(500, function () {
            G.sfx.match_1.play();
            for (var t = 0; t < 5; t++) {
                var e = G.makeImage(0, 0, "starPart", .5, this);
                e.angle = 360 * Math.random(), e.velX = Math.random(20) * G.lnf(-20) + G.lnf(10), e.velY = Math.random() * G.lnf(-9) - G.lnf(3), e.gravity = G.lnf(.5), e.update = function () {
                    this.x += this.velX * G.deltaTime, this.y += this.velY * G.deltaTime, this.angle += .1 * this.velX, this.velX *= .99, this.velY += this.gravity * G.deltaTime, this.alpha -= .02, this.alpha <= 0 && this.kill()
                }
            }
            game.add.tween(this.amountTxt).to({
                alpha: 1
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.amountBg).to({
                alpha: 1
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.ignoreChildInput = !1
        }, this), this.lock = G.makeImage(0, 0, "ui_booster_" + this.nr + "_locked", .5, this), game.add.tween(this.lock).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 500)
    }, G.makeExtImage = function (t, e, s, i, a, o, n, r) {
        var h;
        if (G.extLoader || (G.extLoader = new G.ExtLoader(game), G.extLoader.crossOrigin = "anonymous"), G.extLoader.loadedUrls[s]) return h = G.makeImage(t, e, G.extLoader.loadedUrls[s], a, o), r.call(h), h;
        (h = G.makeImage(t, e, i, a, o)).onImgLoaded = new Phaser.Signal, G.extImagesKeys || (G.extImagesKeys = []);
        var l = "extImgBlankName" + G.extImagesKeys.length;
        G.extImagesKeys.push(l);
        var d = G.extLoader.onFileComplete.add(function (t, e, i) {
            e == l && i && (G.extLoader.loadedUrls[s] = l, G.changeTexture(h, l), r && r.call(h), d.detach())
        });
        return G.extLoader.image(l, s, !0), h
    }, G.changeSecToDHMS = function (t) {
        var e = parseInt(t, 10),
            i = Math.floor(e / 86400),
            s = Math.floor((e - 86400 * i) / 3600),
            a = Math.floor((e - 86400 * i - 3600 * s) / 60),
            o = e - 86400 * i - 3600 * s - 60 * a;
        return [this.zeroPad(i), this.zeroPad(s), this.zeroPad(a), this.zeroPad(o)]
    }, G.zeroPad = function (t) {
        return t < 10 ? "0" + t : t
    }, G.WaitingIcon = function (t, e) {
        Phaser.Image.call(this, game, t, e), G.changeTexture(this, "waiting_icon"), this.anchor.setTo(.5, .5), this.frameCounter = 0
    }, G.WaitingIcon.prototype = Object.create(Phaser.Image.prototype), G.WaitingIcon.prototype.update = function () {
        this.frameCounter++ % 5 == 0 && (this.angle += 45)
    }, G.WorldMapBubbleGiftDynamicLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, this.map = t, this.freeInstances = [], this.activeBubbleGiftsData = JSON.parse(JSON.stringify(G.json.settings.bubbleGifts)).filter(function (t) {
            return !G.saveState.isBubbleGiftUsed(t.levelNumber)
        }), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapBubbleGiftDynamicLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapBubbleGiftDynamicLayer.prototype.unlockInput = function () {
        this.ignoreChildInput = !1, this.children.forEach(function (t) {
            t.ignoreChildInput = !1
        })
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.lockInput = function () {
        this.ignoreChildInput = !0, this.children.forEach(function (t) {
            t.ignoreChildInput = !0
        })
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.update = function () {
        for (var t = 0, e = this.activeBubbleGiftsData.length; t < e; t++) {
            var i = this.activeBubbleGiftsData[t];
            if (G.json.levels[i.levelNumber - 1]) {
                var s = this.y + G.json.levels[i.levelNumber - 1].mapY; - 500 < s && s < game.height + 500 ? i.instance || G.saveState.isBubbleGiftUsed(i.levelNumber) || this.placeInstance(i) : i.instance && this.hideInstance(i)
            }
        }
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.placeInstance = function (t) {
        t.instance = this.getFreeInstance(), t.instance.init(t), this.add(t.instance)
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.hideInstance = function (t) {
        t.instance.hide(), t.instance.parent.removeChild(t.instance), this.freeInstances.push(t.instance), t.instance = null
    }, G.WorldMapBubbleGiftDynamicLayer.prototype.getFreeInstance = function () {
        return this.freeInstances.shift() || new G.WorldMapBubbleGiftDynamicLayer.BubbleGift
    }, G.WorldMapBubbleGiftDynamicLayer.BubbleGift = function () {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.iconImg = G.makeImage(0, 0, null, .5, this), this.bubbleImg = G.makeImage(0, 0, null, .5, this), this.bubbleImg2 = G.makeImage(0, 0, null, .5, this), this.bubbleImg2.blendMode = 1, this.bubbleImg2.scale = this.bubbleImg.scale, this.bubbleImg2.alpha = .3, game.add.tween(this.bubbleImg2).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.tween(this.pivot).to({
            y: 20
        }, 2600, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.WorldMapBubbleGiftDynamicLayer.BubbleGift.prototype = Object.create(Phaser.Group.prototype), G.WorldMapBubbleGiftDynamicLayer.BubbleGift.prototype.init = function (t) {
        this.config = t, this.levelNumber = this.config.levelNumber, this.lvlData = G.json.levels[t.levelNumber - 1], this.position.setTo(this.lvlData.mapX, this.lvlData.mapY), this.config.offset ? (this.position.x += this.config.offset.x, this.position.y += this.config.offset.y) : this.position.y -= 120;
        var e = G.gift.getIcon(this.config.gift);
        G.changeTexture(this.iconImg, "coin_1" === e ? "coin_3" : e), this.iconImg.scale.setTo("coin_3" === e ? .9 : 1), this.bubbleImg.scale.setTo(1), this.unlocked = this.config.levelNumber - 1 <= G.saveState.getLastPassedLevelNr(), G.changeTexture(this.bubbleImg, this.unlocked ? "giftBubble_active" : "giftBubble"), G.changeTexture(this.bubbleImg2, this.unlocked ? "giftBubble_active" : "giftBubble"), this.unlocked ? (this.bubbleImg.inputEnabled = !0, this.bubbleImg.input.useHandCursor = !0, this.bubbleImg.events.onInputDown.addOnce(this.open, this), this.bubbleImg2.visible = !0, this.alpha = 1) : (this.bubbleImg.inputEnabled = !1, this.bubbleImg2.visible = !1, this.alpha = .75)
    }, G.WorldMapBubbleGiftDynamicLayer.BubbleGift.prototype.hide = function () {
        G.stopTweens(this), G.stopTweens(this.bubbleImg), G.stopTweens(this.iconImg), this.bubbleImg.events.onInputDown.removeAll(), this.rewardLabel && (this.rewardLabel.destroy(), this.rewardLabel = null)
    }, G.WorldMapBubbleGiftDynamicLayer.BubbleGift.prototype.open = function () {
        G.saveState.markBubbleGiftAsUsed(this.config.levelNumber), G.gift.applyGift(this.config.gift), G.sb("onBubbleGiftOpened").dispatch(this.config.levelNumber), G.sfx.pop.play(), game.time.events.add(300, G.sfx.line.play, G.sfx.line), this.bubbleImg.inputEnabled = !1;
        var t = G.gift.getLabelString(this.config.gift, 1.2);
        game.add.tween(this.bubbleImg.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0), game.add.tween(this.iconImg.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0), this.rewardLabel = this.add(new G.LabelTextT(t, 0, 0, {
            font: "ComicSansBold",
            fontSize: "45px",
            fill: "#A0692E",
            stroke: "#85511f",
            strokeThickness: 4
        }, .5, 300)), this.rewardLabel.scale.setTo(0), game.add.tween(this.rewardLabel.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Elastic.Out, !0, 300), game.add.tween(this).to({
            alpha: 0
        }, 400, Phaser.Easing.Sinusoidal.Out, !0, 1200)
    }, G.WorldMapBubbleGiftLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, this.init(), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapBubbleGiftLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapBubbleGiftLayer.prototype.unlockInput = function () {
        this.ignoreChildInput = !1, this.children.forEach(function (t) {
            t.ignoreChildInput = !1
        })
    }, G.WorldMapBubbleGiftLayer.prototype.lockInput = function () {
        this.ignoreChildInput = !0, this.children.forEach(function (t) {
            t.ignoreChildInput = !0
        })
    }, G.WorldMapBubbleGiftLayer.prototype.init = function () {
        G.json.settings.bubbleGifts.forEach(function (t) {
            G.saveState.isBubbleGiftUsed(t.levelNumber) || this.add(new G.WorldMapBubbleGiftLayer.BubbleGift(t))
        }, this)
    }, G.WorldMapBubbleGiftLayer.BubbleGift = function (t) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.config = t, this.levelNumber = this.config.levelNumber, this.lvlData = G.json.levels[t.levelNumber - 1], this.position.x = this.lvlData.mapX, this.position.y = this.lvlData.mapY, this.config.offset ? (this.position.x += this.config.offset.x, this.position.y += this.config.offset.y) : this.position.y -= 120, this.unlocked = this.config.levelNumber - 1 <= G.saveState.getLastPassedLevelNr();
        var e = G.gift.getIcon(this.config.gift);
        "coin_1" === e && (e = "coin_3"), this.iconImg = G.makeImage(0, 0, e, .5, this), "coin_3" === e && this.iconImg.scale.setTo(.9), this.bubbleImg = G.makeImage(0, 0, this.unlocked ? "giftBubble_active" : "giftBubble", .5, this), this.unlocked ? (this.bubbleImg.inputEnabled = !0, this.bubbleImg.input.useHandCursor = !0, this.bubbleImg.events.onInputDown.addOnce(this.open, this), this.bubbleImg2 = G.makeImage(0, 0, this.unlocked ? "giftBubble_active" : "giftBubble", .5, this), this.bubbleImg2.blendMode = 1, this.bubbleImg2.scale = this.bubbleImg.scale, this.bubbleImg2.alpha = .3, game.add.tween(this.bubbleImg2).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)) : this.alpha = .75, game.add.tween(this).to({
            y: this.y + 20
        }, 2600, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.WorldMapBubbleGiftLayer.BubbleGift.prototype = Object.create(Phaser.Group.prototype), G.WorldMapBubbleGiftLayer.BubbleGift.prototype.update = function () {
        var t = this.state.map.y + this.y;
        t < -400 || t > game.height + 400 ? this.visible = !1 : this.visible = !0
    }, G.WorldMapBubbleGiftLayer.BubbleGift.prototype.open = function () {
        G.saveState.markBubbleGiftAsUsed(this.config.levelNumber), G.gift.applyGift(this.config.gift), G.sb("onBubbleGiftOpened").dispatch(this.config.levelNumber), G.sfx.pop.play(), game.time.events.add(300, G.sfx.line.play, G.sfx.line), this.bubbleImg.inputEnabled = !1;
        var t = G.gift.getLabelString(this.config.gift, 1.2);
        game.add.tween(this.bubbleImg.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0), game.add.tween(this.iconImg.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0), this.rewardLabel = this.add(new G.LabelGroupT(t, 0, 0, {
            font: "ComicSansBold",
            fontSize: "45px",
            fill: "#A0692E",
            stroke: "#85511f",
            strokeThickness: 4
        }, .5, 300)), this.rewardLabel.scale.setTo(0), game.add.tween(this.rewardLabel.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Elastic.Out, !0, 300), game.time.events.add(1200, function () {
            game.add.tween(this).to({
                alpha: 0
            }, 400, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
                this.destroy()
            }, this)
        }, this)
    }, G.WorldMapChestDynamicLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, this.map = t, this.freeInstances = [], this.activeChestsData = JSON.parse(JSON.stringify(G.json.settings.mapChests)).filter(function (t) {
            return !G.saveState.data.mapChests[t.id]
        }), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapChestDynamicLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapChestDynamicLayer.prototype.unlockInput = function () {
        this.ignoreChildInput = !1, this.children.forEach(function (t) {
            t.ignoreChildInput = !1
        })
    }, G.WorldMapChestDynamicLayer.prototype.lockInput = function () {
        this.ignoreChildInput = !0, this.children.forEach(function (t) {
            t.ignoreChildInput = !0
        })
    }, G.WorldMapChestDynamicLayer.prototype.update = function () {
        for (var t = 0, e = this.activeChestsData.length; t < e; t++) {
            var i = this.activeChestsData[t],
                s = this.y + i.mapY; - 500 < s && s < game.height + 500 ? (0, i.instance || i.opened || G.saveState.data.mapChests[i.id] || this.placeInstance(i)) : i.instance && this.hideInstance(i)
        }
        for (var a = this.children.length; a--;) this.children[a].update()
    }, G.WorldMapChestDynamicLayer.prototype.placeInstance = function (t) {
        t.instance = this.getFreeInstance(), t.instance.init(t), this.add(t.instance)
    }, G.WorldMapChestDynamicLayer.prototype.hideInstance = function (t) {
        t.instance.hide(), t.instance.parent.removeChild(t.instance), this.freeInstances.push(t.instance), t.instance = null
    }, G.WorldMapChestDynamicLayer.prototype.getFreeInstance = function () {
        return this.freeInstances.shift() || new G.WorldMapChestDynamicLayer.ChestInstance
    }, G.WorldMapChestDynamicLayer.ChestInstance = function () {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.shadow = G.makeImage(0, 40, "chest_shadow", .5, this), this.chest = new G.Button(0, 0, "chest", this.onClick, this), this.chest.IMMEDIATE = !0, this.chestGlow = G.makeImage(0, 0, "chest", .5, this.chest), this.chestGlow.blendMode = 1, this.chestGlow.alpha = .4, game.add.tween(this.chestGlow).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.add(this.chest), game.time.events.loop(2e3, this.setJumpRepeat, this)
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype = Object.create(Phaser.Group.prototype), G.WorldMapChestDynamicLayer.ChestInstance.prototype.init = function (t) {
        G.changeTexture(this.chest, "chest"), G.changeTexture(this.chestGlow, "chest"), this.chestData = t, this.position.setTo(t.mapX, t.mapY), this.orgX = this.x, this.orgY = this.y, this.chest.inputEnabled = !0, this.chest.input.useHandCursor = !0, this.chest.scale.x = this.x < 0 ? 1 : -1, this.shadow.scale.x = this.chest.scale.x, this.alpha = 1, this.opened = !1, this.currentStars = G.saveState.getAllStars(), this.unlocked = this.currentStars >= t.req, this.unlocked ? (this.chestGlow.visible = !0, this.setJumpRepeat()) : (this.chestGlow.visible = !1, this.label = new G.LabelTextT(Math.min(this.currentStars, t.req) + "/" + this.chestData.req + "@map_star_1@", 0, 50, {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "#fdfbe4",
            stroke: "#73461c",
            strokeThickness: 5
        }, .5, 150), this.add(this.label))
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.update = function () {
        this.shadow.alpha = 1 + this.chest.y / 150
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.hide = function () {
        G.stopTweens(this.chest), this.chest.position.setTo(0, 0), this.chest.angle = 0, this.label && this.label.destroy()
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.onClick = function () {
        this.unlocked ? (G.changeTexture(this.chest, "chest_open"), G.changeTexture(this.chestGlow, "chest_open"), this.opened = !0, this.chestData.opened = !0, G.saveState.data.mapChests[this.chestData.id] = !0, G.saveState.save(), this.chest.inputEnabled = !1, G.sb("pushWindow").dispatch(["mapChest", this.chestData.gifts]), game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 1e3).onComplete.add(function () {
            this.hide()
        }, this)) : (this.chest.inputEnabled = !1, this.jump(function () {
            this.chest.inputEnabled = !0, this.chest.input.useHandCursor = !0
        }, this))
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.setJumpRepeat = function (t, e) {
        this.opened || this.unlocked && this.parent && this.jump()
    }, G.WorldMapChestDynamicLayer.ChestInstance.prototype.jump = function (t, e) {
        var i = game.add.tween(this.chest).to({
            y: -G.l(150)
        }, 300, Phaser.Easing.Cubic.Out),
            s = game.add.tween(this.chest).to({
                y: 0
            }, 300, Phaser.Easing.Circular.In);
        i.chain(s), i.start();
        var a = game.add.tween(this.chest).to({
            angle: -15
        }, 200, Phaser.Easing.Cubic.InOut),
            o = game.add.tween(this.chest).to({
                angle: 15
            }, 375, Phaser.Easing.Sinusoidal.In),
            n = game.add.tween(this.chest).to({
                angle: 0
            }, 50, Phaser.Easing.Cubic.InOut);
        a.chain(o, n), a.start(), t && n.onComplete.add(t, e)
    }, G.WorldMapChestLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, G.json.settings.mapChests.forEach(function (t) {
            G.saveState.data.mapChests[t.id] || this.add(new G.WorldMapChestLayer.Chest(t))
        }, this), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapChestLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapChestLayer.prototype.unlockInput = function () {
        this.ignoreChildInput = !1, this.children.forEach(function (t) {
            t.ignoreChildInput = !1
        })
    }, G.WorldMapChestLayer.prototype.lockInput = function () {
        this.ignoreChildInput = !0, this.children.forEach(function (t) {
            t.ignoreChildInput = !0
        })
    }, G.WorldMapChestLayer.Chest = function (t) {
        Phaser.Group.call(this, game), this.onChestClicked = new Phaser.Signal, this.chestData = t, this.state = game.state.getCurrentState(), this.shadow = G.makeImage(0, 40, "chest_shadow", .5, this), this.x = G.l(t.mapX), this.y = G.l(t.mapY), this.orgX = this.x, this.orgY = this.y, this.opened = !1, this.currentStars = G.saveState.getAllStars();
        var e = Math.min(this.currentStars, this.chestData.req);
        this.unlocked = this.currentStars >= t.req, this.gift = new G.Button(0, 0, "chest", this.onClick, this), this.add(this.gift), this.gift.scale.x = this.x < 0 ? -1 : 1, this.shadow.scale.x = this.gift.scale.x, this.unlocked ? (this.gift.tweenScale = {
            x: this.gift.scale.x,
            y: this.gift.scale.y
        }, this.glow = G.makeImage(10, -20, "popup_lighht", .5, this), this.glow.update = function () {
            this.angle++
        }, this.glow.scale.setTo(.75), this.glow.blendMode = 1, this.glow.alpha = 0, this.giftGlow = G.makeImage(0, 0, "chest", .5, this.gift), this.giftGlow.blendMode = 1, this.giftGlow.alpha = .4, game.add.tween(this.giftGlow).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.jump()) : (this.gift.IMMEDIATE = !0, this.label = new G.LabelGroupT(e + "/" + this.chestData.req + "@star_small@", 0, 50, {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "#fdfbe4",
            stroke: "#73461c",
            strokeThickness: 5
        }, .5, 150), this.add(this.label))
    }, G.WorldMapChestLayer.Chest.prototype = Object.create(Phaser.Group.prototype), G.WorldMapChestLayer.Chest.prototype.onClick = function () {
        if (this.currentStars >= this.chestData.req) G.changeTexture(this.gift, "chest_open"), G.changeTexture(this.giftGlow, "chest_open"), this.opened = !0, G.saveState.data.mapChests[this.chestData.id] = !0, G.saveState.save(), this.gift.inputEnabled = !1, game.add.tween(this.glow).to({
            alpha: .2
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.onChestClicked.dispatch(), G.sb("pushWindow").dispatch(["mapChest", this.chestData.gifts]), game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 1e3).onComplete.add(function () {
            this.destroy()
        }, this);
        else {
            this.gift.inputEnabled = !1;
            var t = game.add.tween(this.gift).to({
                y: -G.l(150)
            }, 300, Phaser.Easing.Cubic.Out),
                e = game.add.tween(this.gift).to({
                    y: 0
                }, 300, Phaser.Easing.Circular.In);
            t.chain(e), t.start();
            var i = game.add.tween(this.gift).to({
                angle: -15
            }, 200, Phaser.Easing.Cubic.InOut),
                s = game.add.tween(this.gift).to({
                    angle: 15
                }, 375, Phaser.Easing.Sinusoidal.In),
                a = game.add.tween(this.gift).to({
                    angle: 0
                }, 50, Phaser.Easing.Cubic.InOut);
            a.onComplete.add(function () {
                this.gift.inputEnabled = !0, this.gift.input.useHandCursor = !0
            }, this), i.chain(s, a), i.start()
        }
    }, G.WorldMapChestLayer.Chest.prototype.update = function () {
        this.glow && this.glow.update(), this.shadow.alpha = 1 + this.gift.y / 150;
        var t = -1 * (1 - this.gift.y / 150 * .1);
        this.shadow.scale.x = t * this.gift.scale.x * -1, this.shadow.scale.y = Math.abs(t);
        var e = this.state.map.y + this.y;
        e < -1e3 || e > game.height + 1e3 ? this.visible = !1 : this.visible = !0
    };
    G.WorldMapChestLayer.Chest.prototype.jump = function () {
        if (!this.opened) {
            var t = game.add.tween(this.gift).to({
                y: -G.l(150)
            }, 300, Phaser.Easing.Cubic.Out),
                e = game.add.tween(this.gift).to({
                    y: 0
                }, 300, Phaser.Easing.Circular.In);
            t.chain(e), t.start();
            var i = game.add.tween(this.gift).to({
                angle: -15
            }, 200, Phaser.Easing.Cubic.InOut),
                s = game.add.tween(this.gift).to({
                    angle: 15
                }, 375, Phaser.Easing.Sinusoidal.In),
                a = game.add.tween(this.gift).to({
                    angle: 0
                }, 50, Phaser.Easing.Cubic.InOut);
            i.chain(s, a), i.start(), game.time.events.add(2e3, this.jump, this)
        }
    }, G.WorldMapCloudDynamicLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, this.map = t, this.freeInstances = [], this.activeGatesData = JSON.parse(JSON.stringify(G.json.settings.gates)).filter(function (t) {
            if (G.saveState.checkGate(t), G.json.levels[t.lvlNr - 1]) return t.savedGateData = G.saveState.getGateData(t.id), !t.savedGateData.open
        })
    }, G.WorldMapCloudDynamicLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCloudDynamicLayer.prototype.update = function () {
        for (var t = this.children.length; t--;) this.children[t].update();
        for (var e = 0, i = this.activeGatesData.length; e < i; e++) {
            var s = this.activeGatesData[e],
                a = this.y + G.json.levels[s.lvlNr - 1].mapY; - 500 < a && a < game.height + 500 ? s.instance || s.savedGateData.open || this.placeInstance(s) : s.instance && this.hideInstance(s)
        }
    }, G.WorldMapCloudDynamicLayer.prototype.placeInstance = function (t) {
        t.instance = this.getFreeInstance(), t.instance.init(t), this.add(t.instance)
    }, G.WorldMapCloudDynamicLayer.prototype.hideInstance = function (t) {
        t.instance.hide(), t.instance.parent.removeChild(t.instance), this.freeInstances.push(t.instance), t.instance = null
    }, G.WorldMapCloudDynamicLayer.prototype.getFreeInstance = function () {
        return this.freeInstances.shift() || new G.WorldMapCloudDynamicLayer.CloudInstance
    }, G.WorldMapCloudDynamicLayer.CloudInstance = function () {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.cloud1 = G.makeImage(-450, 0, "cloud_1", .5, this), this.cloud1.scale.setTo(2), this.c1tween = game.add.tween(this.cloud1.scale).to({
            x: 2.1,
            y: 2.1
        }, 4e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.c1tween.timeline[0].dt = 2e3, this.cloud1.alpha = .95, this.cloud2 = G.makeImage(0, 50, "cloud_1", .5, this), this.cloud2.scale.setTo(2), this.c2tween = game.add.tween(this.cloud2.scale).to({
            x: 2.1,
            y: 2.1
        }, 8e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.c2tween.timeline[0].dt = 3e3, this.cloud2.alpha = .95, this.cloud3 = G.makeImage(450, 0, "cloud_1", .5, this), this.cloud3.scale.setTo(-2, 2), this.c3tween = game.add.tween(this.cloud3.scale).to({
            x: -2.1,
            y: 2.1
        }, 6e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.c3tween.timeline[0].dt = 1500, this.cloud3.alpha = .95
    }, G.WorldMapCloudDynamicLayer.CloudInstance.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCloudDynamicLayer.CloudInstance.prototype.init = function (t) {
        this.savedGateData = t.savedGateData, this.y = G.json.levels[t.lvlNr - 1].mapY - 370, this.fading = !1, this.cloud1.x = -450, this.cloud1.y = 50, this.cloud2.x = 0, this.cloud2.y = 50, this.cloud2.alpha = .95, this.cloud3.x = 450, this.alpha = 1
    }, G.WorldMapCloudDynamicLayer.CloudInstance.prototype.hide = function () {
        this.fadingTweens && (this.fadingTweens.forEach(function (t) {
            t.stop()
        }), this.fadingTweens = null)
    }, G.WorldMapCloudDynamicLayer.CloudInstance.prototype.fadeAway = function () {
        if (!this.fading) {
            this.fading = !0;
            var t = game.add.tween(this.cloud1).to({
                x: -900,
                y: 50
            }, 3e3, Phaser.Easing.Sinusoidal.Out, !0),
                e = game.add.tween(this.cloud3).to({
                    x: 900,
                    y: 50
                }, 3e3, Phaser.Easing.Sinusoidal.Out, !0),
                i = game.add.tween(this.cloud2).to({
                    alpha: 0
                }, 3e3, Phaser.Easing.Sinusoidal.Out, !0),
                s = game.add.tween(this).to({
                    alpha: 0
                }, 2e3, Phaser.Easing.Sinusoidal.In, !0, 1e3);
            this.fadingTweens = [t, e, i, s]
        }
    }, G.WorldMapCloudDynamicLayer.CloudInstance.prototype.update = function () {
        !this.fading && this.savedGateData.open && this.fadeAway()
    }, G.WorldMapCloudLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, this.init(), this.minGateY = null
    }, G.WorldMapCloudLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCloudLayer.prototype.init = function () {
        G.json.settings.gates.forEach(function (t) {
            if (G.saveState.checkGate(t), G.json.levels[t.lvlNr - 1]) {
                var e = G.saveState.getGateData(t.id);
                e.open || this.add(new G.WorldMapCloudLayer.CloudWall(t.lvlNr - 1, e))
            }
        }, this)
    }, G.WorldMapCloudLayer.CloudWall = function (t, e) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.savedGateData = e, this.y = G.json.levels[t].mapY - 370, this.cloud1 = G.makeImage(-450, 0, "cloud_1", .5, this), this.cloud1.scale.setTo(2), game.add.tween(this.cloud1.scale).to({
            x: 2.1,
            y: 2.1
        }, 4e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0).timeline[0].dt = 2e3, this.cloud1.alpha = .95, this.cloud2 = G.makeImage(0, 50, "cloud_1", .5, this), this.cloud2.scale.setTo(2), game.add.tween(this.cloud2.scale).to({
            x: 2.1,
            y: 2.1
        }, 8e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0).timeline[0].dt = 3e3, this.cloud2.alpha = .95, this.cloud3 = G.makeImage(450, 0, "cloud_1", .5, this), this.cloud3.scale.setTo(-2, 2), game.add.tween(this.cloud3.scale).to({
            x: -2.1,
            y: 2.1
        }, 6e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0).timeline[0].dt = 1500, this.cloud3.alpha = .95, this.fading = !1
    }, G.WorldMapCloudLayer.CloudWall.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCloudLayer.prototype.update = function () {
        for (var t = 0; t < this.length; t++) this.children.visible = 0 == t, this.children[t].update()
    }, G.WorldMapCloudLayer.CloudWall.prototype.fadeAway = function () {
        this.fading || (this.fading = !0, game.add.tween(this.cloud1).to({
            x: -900,
            y: 50
        }, 3e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.cloud3).to({
            x: 900,
            y: 50
        }, 3e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.cloud2).to({
            alpha: 0
        }, 3e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 0
        }, 2e3, Phaser.Easing.Sinusoidal.In, !0, 1e3).onComplete.add(function () {
            this.destroy()
        }, this))
    }, G.WorldMapCloudLayer.CloudWall.prototype.update = function () {
        !this.fading && this.savedGateData.open && this.fadeAway(), this.visible = -1e3 < this.state.map.y + this.y
    }, G.WorldMapGateLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, this.init(), this.minGateY = null, G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapGateLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapGateLayer.prototype.getMinY = function () {
        if (0 == this.children.length) return 1 / 0;
        for (var t = -1 / 0, e = 0; e < this.length; e++) this.children[e].y > t && (t = this.children[e].y);
        return -1 * t
    }, G.WorldMapGateLayer.prototype.unlockInput = function () {
        this.ignoreChildInput = !1, this.children.forEach(function (t) {
            t.ignoreChildInput = !1
        })
    }, G.WorldMapGateLayer.prototype.lockInput = function () {
        this.ignoreChildInput = !0, this.children.forEach(function (t) {
            t.ignoreChildInput = !0
        })
    }, G.WorldMapGateLayer.prototype.init = function () {
        G.json.settings.gates.forEach(function (t) {
            G.saveState.checkGate(t), G.json.levels[t.lvlNr - 1] && (G.saveState.getGateData(t.id).open || this.add(new G.WorldMapGateLayer.Gate(t)))
        }, this)
    }, G.WorldMapGateLayer.Gate = function (t) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.gate = t, this.lvlIndex = this.gate.lvlNr - 1, this.savedData = G.saveState.getGateData(t.id);
        var e = G.json.levels[this.lvlIndex];
        this.x = G.l(e.mapX), this.y = G.l(e.mapY), this.gateImg = G.makeImage(0, 20, "gate", [.5, 1], this), this.active = this.lvlIndex <= G.saveState.getLastPassedLevelNr(), this.active && (G.saveState.activateGate(t), this.unlockBtn = new G.Button(10, 30, "btn_chest_gate", function () {
            this.savedData.readyToOpen ? G.saveState.openGate(this.gate.id) : G.sb("pushWindow").dispatch(["gate", this.gate])
        }, this), this.unlockBtn.addTextLabel("font-beige-standard", G.txt("Unlock"), 40), this.unlockBtn.label.y = -2, this.add(this.unlockBtn), this.savedData.readyToOpen ? (this.unlockBtn.x = 0, this.unlockBtn.pulse()) : this.lockImg = G.makeImage(-73, 28, "lock", .5, this)), this.bursedParts = !1
    }, G.WorldMapGateLayer.Gate.prototype = Object.create(Phaser.Group.prototype), G.WorldMapGateLayer.Gate.prototype.update = function () {
        if (this.visible = -1e3 < this.state.map.y + this.y, this.savedData.open) {
            if (!this.bursedParts) {
                this.bursedParts = !0;
                for (var t = 0; t < 10; t++) G.sb("fxMap").dispatch("star", {
                    x: this.worldPosition.x,
                    y: this.worldPosition.y
                })
            }
            this.alpha -= .05, this.alpha <= 0 && this.destroy()
        }
    }, G.WorldMapPack = function (t, e) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e);
        var i = G.json.settings.packs.find(function (t) {
            return G.saveState.isPackActive(t)
        });
        i && (this.initPack(i), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this), G.sb("onStarterPackBought").add(function () {
            game.add.tween(this).to({
                y: 140
            }, 400, Phaser.Easing.Sinusoidal.Out, !0)
        }, this), G.saveState.data.sawPackTut || (this.tutHand = G.makeImage(0, 20, "tut_hand", 0, this), game.add.tween(this.tutHand).to({
            x: G.l(20),
            y: G.l(50)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)), G.sb("onScreenResize").add(this.onResize, this), this.onResize())
    }, G.WorldMapPack.prototype = Object.create(Phaser.Group.prototype), G.WorldMapPack.prototype.onResize = function () {
        G.horizontal ? this.x = -200 : this.x = 60
    }, G.WorldMapPack.prototype.initPack = function (t) {
        this.activePack = t, this.currentStage = G.saveState.getPackStage(t), this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.update = function () {
            this.angle++
        }, this.glow.scale.setTo(.5), this.glow.alpha = .25, this.glow.blendMode = 1, this.giftBtn = new G.Button(-7, 0, "promo_pack", function () {
            G.saveState.data.sawPackTut = !0, G.saveState.save(), G.sb("pushWindow").dispatch(["pack", this.activePack]), this.tutHand && this.tutHand.destroy()
        }, this), this.add(this.giftBtn);
        var e = G.saveState.getPackSaveData(this.activePack.id),
            i = 60 * this.activePack.timeMinutes - (Date.now() - e.activationTime) / 1e3,
            s = "lbl_50%";
        this.currentStage.promo && (60 == this.currentStage.promo && (s = "lbl_60%"), 70 == this.currentStage.promo && (s = "lbl_70%")), this.lblPromo = G.makeImage(-35, 30, s, .5, this.giftBtn), this.timer = new G.Timer(0, 60, "font-num-orange", 30, 150, .5, .5, i), this.add(this.timer), this.timer.start(), this.update = function () {
            this.glow.angle++, G.saveState.isPackActive(this.activePack) || (this.alpha -= .05, this.alpha <= 0 && this.destroy())
        }
    }, G.WorldMapPack.prototype.unlockInput = function () {
        this.ignoreChildInput = !1
    }, G.WorldMapPack.prototype.lockInput = function () {
        this.ignoreChildInput = !0
    }, G.WorldMapPlayerAvatar = function (t) {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.onAnimFinished = new Phaser.Signal, sgSettings.config.user && sgSettings.config.user.avatar ? this.avatar = G.makeExtImage(0, 0, sgSettings.config.user.avatar, "avatar_m", 0, this, !1, function () {
            this.width = this.height = 80
        }) : this.avatar = G.makeImage(0, 0, "avatar_m", 0, this), this.avatar.anchor.setTo(.5), this.avatar.width = this.avatar.height = 80, this.pivotTween = game.add.tween(this.pivot).to({
            x: 10
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.add(this.avatar), this.frame = G.makeImage(0, 0, "avatar_frame_big", [.5, .52], this), this.frame.position = this.avatar.position, this.worldMap = t, this.position = t.position, this.state.lastLevelData ? this.animPosToLevel(this.state.lastLevelData.lvlNr, G.saveState.getLastPassedLevelNr()) : this.setPosToLevel(G.saveState.getLastPassedLevelNr())
    }, G.WorldMapPlayerAvatar.prototype = Object.create(Phaser.Group.prototype), G.WorldMapPlayerAvatar.prototype.setPosToLevel = function (t) {
        t = game.math.clamp(t, 0, G.json.levels.length - 1);
        var e = G.json.levels[t];
        this.avatar.x = e.mapX - 90, this.avatar.y = e.mapY - 10, this.onAnimFinished.dispatch()
    }, G.WorldMapPlayerAvatar.prototype.animPosToLevel = function (t, e) {
        t = game.math.clamp(t, 0, G.json.levels.length - 1), e = game.math.clamp(e, 0, G.json.levels.length - 1);
        var i = G.json.levels[t],
            s = G.json.levels[e];
        this.avatar.x = i.mapX - 90, this.avatar.y = i.mapY - 10, game.add.tween(this.avatar).to({
            x: s.mapX - 90,
            y: s.mapY - 10
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function () {
            this.onAnimFinished.dispatch()
        }, this)
    }, G.WorldMapSides = function (t) {
        Phaser.Group.call(this, game), this.worldMap = t, this.leftSide = game.make.tileSprite(-550, 0, 556, game.height, "map_margin"), this.leftSide.anchor.setTo(1, 0), this.add(this.leftSide), this.rightSide = game.make.tileSprite(550, 0, 556, game.height, "map_margin"), this.rightSide.anchor.setTo(1, 0), this.rightSide.scale.x = -1, this.add(this.rightSide), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.WorldMapSides.prototype = Object.create(Phaser.Group.prototype), G.WorldMapSides.prototype.postUpdate = function () {
        this.visible = 1100 < game.width, this.x = this.worldMap.x, this.leftSide.tilePosition.y = this.worldMap.y, this.rightSide.tilePosition.y = this.worldMap.y
    }, G.WorldMapSides.prototype.onResize = function () {
        this.leftSide.height = game.height, this.rightSide.height = game.height
    }, G.WorldMapSocialLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, sdkHandler.trigger("social.getFriends", {
            callback: function (t, e) {
                t || this.initLabels(e)
            }
        }, this)
    }, G.WorldMapSocialLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapSocialLayer.prototype.initLabels = function (t) {
        if (t)
            for (var e = [], i = 0; i < t.length; i++) {
                var s = t[i];
                if (void 0 !== s.maxLevel && 3 !== e[s.maxLevel]) {
                    void 0 === e[s.maxLevel] && (e[s.maxLevel] = 0);
                    var a = 30 * e[s.maxLevel];
                    e[s.maxLevel]++;
                    var o = G.json.levels[s.maxLevel - 1];
                    this.add(new G.WorldMapSocialLayer.MapLabel(o.mapX, o.mapY, s.avatar, a))
                }
            }
    }, G.WorldMapSocialLayer.MapLabel = function (t, e, i, s) {
        s = s || 0, Phaser.Image.call(this, game, G.l(t) + G.l(1 * (50 + s)), G.l(e - 20)), this.anchor.setTo(.5, .5), this.orgX = G.l(t) + G.l(1 * (70 + s)), this.tweenOffsetX = 0, this.scale.setTo(0);
        var a = this;
        this.avatar = G.makeExtImage(0, 0, i, null, .5, this, !1, function () {
            this.width = 50, this.height = 50, game.add.tween(a.scale).to({
                x: 1,
                y: 1
            }, 500, Phaser.Easing.Elastic.Out, !0)
        }), this.border = G.makeImage(0, 0, "avatar_frame", .5, this)
    }, G.WorldMapSocialLayer.MapLabel.prototype = Object.create(Phaser.Image.prototype), G.WorldMapSocialLayer.MapLabel.prototype.update = function () {
        this.x = this.orgX + this.tweenOffsetX * this.scale.x
    }, G.WorldMapStarterPack = function (t, e) {
        this.state = game.state.getCurrentState(), G.saveState.data.sawPackTut || this.state.makeBlackOverlay(), Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this), G.sb("onStarterPackBought").add(function () {
            this.giftBtn.inputEnabled = !1
        }, this), this.initPack(G.json.settings.starterPack), G.saveState.data.sawPackTut || (G.saveState.data.sawPackTut = !0, G.saveState.save(), this.tutHand = G.makeImage(0, 20, "tut_hand", 0, this), game.add.tween(this.tutHand).to({
            x: G.l(20),
            y: G.l(50)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.WorldMapStarterPack.prototype = Object.create(Phaser.Group.prototype), G.WorldMapStarterPack.prototype.onResize = function () {
        G.horizontal ? this.x = -200 : this.x = 60
    }, G.WorldMapStarterPack.prototype.initPack = function (t) {
        this.activePack = t, this.glow = G.makeImage(0, 0, "popup_lighht", .5, this), this.glow.update = function () {
            this.angle++
        }, this.glow.scale.setTo(.5), this.glow.alpha = .25, this.glow.blendMode = 1, this.giftBtn = new G.Button(0, 0, "chest_sale", function () {
            G.sb("pushWindow").dispatch(["starterPack", this.activePack]), this.tutHand && this.tutHand.destroy()
        }, this), this.add(this.giftBtn);
        var e = G.saveState.getPackSaveData(this.activePack.id);
        this.activePack.timeMinutes, Date.now(), e.activationTime;
        this.update = function () {
            this.glow.angle++, G.saveState.data.starterPackBought && (this.alpha -= .05, this.alpha <= 0 && this.destroy())
        }
    }, G.WorldMapStarterPack.prototype.unlockInput = function () {
        this.ignoreChildInput = !1
    }, G.WorldMapStarterPack.prototype.lockInput = function () {
        this.ignoreChildInput = !0
    }, G.LevelBg = function (t) {
        Phaser.Image.call(this, game, 0, 0), this.anchor.setTo(.5), G.changeTexture(this, "background_1"), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), game.add.existing(this)
    }, G.LevelBg.prototype = Object.create(Phaser.Image.prototype), G.LevelBg.prototype.onScreenResize = function () {
        this.x = game.world.bounds.x + .5 * game.width, this.y = game.world.bounds.y + .5 * game.height, this.scale.setTo(1), this.width = Math.max(this.width, game.width), this.height = Math.max(this.height, game.height), this.width += 10, this.height += 10, this.updateCache()
    }, void 0 === G && (G = {}), G.Logo = function (t, e) {
        Phaser.Group.call(this, game), this.shine = G.makeImage(0, 0, "shine_title", [.5, .5], this), this.shine.scale.setTo(2), this.shine.update = function () {
            this.angle += .17
        }, this.wheel = G.makeImage(0, 0, "whell_1", .5, this), this.wheel.update = function () {
            this.angle += .22
        }, this.wheel2 = G.makeImage(0, 0, "whell_2", .5, this), this.wheel2.update = function () {
            this.angle += .12
        }, this.x = G.l(t), this.y = G.l(e), this.logo = G.makeImage(0, 0, "ja" === G.lang ? "logo-ja" : "logo", .5, this), game.add.tween(this.logo.scale).to({
            x: 1.05,
            y: 1.05
        }, 3e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)
    }, G.Logo.prototype = Object.create(Phaser.Group.prototype), G.Logo.prototype.startGlow = function () {
        game.add.tween(this.logoGlow).to({
            alpha: .5
        }, 1e3 + 1e3 * Math.random(), Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0).onComplete.add(function () {
            game.time.events.add(1500 + Math.floor(1500 * Math.random()), this.startGlow, this)
        }, this)
    }, G.Logo.prototype.startPartGlow = function () {
        this.glows[this.currentGlow++ % this.glows.length].start(), game.time.events.add(2e3 + Math.floor(1e3 * Math.random()), this.startPartGlow, this)
    }, G.MoreGamesBtn = function (t, e) {
        G.Button.call(this, t, e, "btn_moregames", function () {
            sdkHandler.trigger("moreGames")
        }), this.visible = sgSettings.config.moreGames.displayButton, game.add.existing(this)
    }, G.MoreGamesBtn.prototype = Object.create(G.Button.prototype), G.Modify = function () {
        if (this === G) return new G.Modify;
        Phaser.Group.call(this, game), (G.Modify.instance = this).onLevelObjChange = new Phaser.Signal, this.onCurrentObjChange = new Phaser.Signal, this.onObjDestroy = new Phaser.Signal, this.inputBlocker = new G.ModifyInputBlocked, this.add(this.inputBlocker), game.stage.disableVisibilityChange = !0, game.paused = !1, obj = game.state.getCurrentState(), obj === game.state.getCurrentState() && (game.state.getCurrentState().children = game.world.children), this.objectName = "WORLD", this.currentLevel = [], this.currentChildIndex = 0, this.currentPropIndex = 0, this.mods = [], this.gfx = game.add.graphics(), this.gfx.fixedToCamera = !0, this.add(this.gfx), this.obj = obj, this.propGroup = this.add(new G.ModifyPropGroup(this)), this.childrenPropNames = this.getChildrenPropNames(), this.buttonGroup = new G.ModifyButtonGroup, this.add(this.buttonGroup), this.childList = new G.ModifyChildList, this.add(this.childList), this.addKeyboardControlls(), this.bottomBar = this.add(new G.ModifyBottomBar), this.frameSelector = this.add(new G.ModifyFrameSelector), this.frameSelector.onFrameClicked.add(this.changeFrame, this), this.animationEditor = new G.ModifyAnimationEditor(this), this.add(this.animationEditor), this.removeCash = {}, this.codeGenerator = new G.ModifyCodeGenerator(this), this.defaultNewObjectsNames = !0, this.hideGroupTxt = !1, game.state.states.MODIFYEMPTYSTATE || game.state.add("MODIFYEMPTYSTATE", {
            create: function () {
                new G.Modify
            }
        }), this.domLayer = new G.ModifyDOMLayer(this), game.input.onDown.add(this.processClick, this)
    }, G.Modify.prototype = Object.create(Phaser.Group.prototype), G.Modify.prototype.removeCashObjToString = function (t) {
        if (!this.removeCash[t]) return "";
        for (var e = "\tREMOVED:", i = 0; i < this.removeCash[t].length; i++) e += "\t\t" + this.removeCash[t][i] + "\n";
        return e
    }, G.Modify.prototype.removeObject = function () {
        console.log("removeObject");
        var t = this.getCurrentObject();
        if (console.log(t), t) {
            var e = this.currentLevel.join("/") || this.currentLevel[0] || game.state.current,
                i = this.childrenPropNames[this.currentChildIndex].toString();
            t.___NEWOBJECT, this.removeCash[e] || (this.removeCash[e] = []), this.removeCash[e].push(i), t.destroy(), this.refreshLevel()
        }
    }, G.Modify.prototype.refreshLevel = function () {
        this.currentLevel = this.currentLevel, this.childrenPropNames = this.getChildrenPropNames(), this.onLevelObjChange.dispatch()
    }, G.Modify.prototype.addToGroup = function (t, e) {
        var i;
        t != game.world && t != game.state.getCurrentState() || (t = game.world, e.x = game.camera.x + .5 * game.width, e.y = game.camera.y + .5 * game.height), t.add ? t.add(e) : t.addChild && t.addChild(e);
        var s = this.getCurrentLevelObject();
        (i = this.defaultNewObjectsNames ? "child_" + s.children.length : prompt("Enter object name")) && (e.___LABEL = i, t == game.world ? game.state.getCurrentState()[i] = e : t[i] = e)
    }, G.Modify.prototype.addGroup = function () {
        var t = this.getCurrentLevelObject(),
            e = game.make.group();
        e.___NEWOBJECT = !0, this.addToGroup(t, e), this.refreshLevel()
    }, G.Modify.prototype.addImage = function () {
        var t = this.getCurrentLevelObject(),
            e = new G.Image(0, 0, "__missing", .5, null);
        return e.___NEWOBJECT = !0, this.addToGroup(t, e), this.refreshLevel(), e
    }, G.Modify.prototype.addButton = function () {
        var t = this.getCurrentLevelObject(),
            e = new G.Button(0, 0, "__missing", function () { }, this);
        e.___NEWOBJECT = !0, this.addToGroup(t, e), this.refreshLevel()
    }, G.Modify.prototype.addOneLineText = function () {
        var t = this.getCurrentLevelObject(),
            e = Object.keys(game.cache._cache.bitmapFont),
            i = new G.OneLineText(0, 0, e[0], "TEXT", 50, 300, .5, .5);
        i.cacheAsBitmap = !1, this.addToGroup(t, i), this.refreshLevel()
    }, G.Modify.prototype.addMultiLineText = function () {
        var t = this.getCurrentLevelObject(),
            e = Object.keys(game.cache._cache.bitmapFont),
            i = new G.MultiLineText(0, 0, e[0], "TEXT", 50, 300, 300, "center", .5, .5);
        i.cacheAsBitmap = !1, this.addToGroup(t, i), this.refreshLevel()
    }, G.Modify.prototype.update = function () {
        this.updateKeyboard(), this.redrawGfx(), this.propGroup.update(), this.hideGroupTxt ? (this.childList.hideList(), this.propGroup.cameraOffset.y = this.childList.cameraOffset.y + 50) : (this.childList.showList(), this.propGroup.cameraOffset.y = this.childList.cameraOffset.y + this.childList.height + 30), this.frameSelector.update(), this.bottomBar.x = game.world.bounds.x, this.bottomBar.y = game.world.bounds.y + game.height - this.bottomBar.height;
        for (var t = 0; t < this.children.length; t++) this.children[t].update()
    }, G.Modify.prototype.getChildrenPropNames = function () {
        game.world.bringToTop(this);
        var t = [],
            e = this.getCurrentLevelObject(),
            i = e;
        e === game.world && (i = game.state.getCurrentState());
        for (var s = 0; s < e.children.length; s++) {
            var a = !1,
                o = e.children[s];
            if (o !== this)
                if (o.___LABEL) t.push([o.___LABEL]);
                else {
                    for (var n in i)
                        if ("children" != n && "cursor" != n && (a || o !== i[n] || (a = !0, o.___LABEL = n, t.push([n])), Array.isArray(i[n]) && "children" !== n))
                            for (var r = 0; r < i[n].length; r++) a || o !== i[n][r] || (a = !0, t.push([n, r]));
                    a || t.push(["children", s])
                }
            else t.push(["G.MODIFY-EDITOR"])
        }
        return t
    }, G.Modify.prototype.getCurrentObject = function () {
        return this.getCurrentLevelObject().children[this.currentChildIndex]
    }, G.Modify.prototype.changeFrame = function (t) {
        console.log(t);
        var e = this.getCurrentObject();
        this.saveInitPropValue("frameName", t), e.loadTexture && G.changeTexture(e, t)
    }, G.Modify.prototype.getCurrentLevelObject = function () {
        for (var t = this.obj, e = 0; e < this.currentLevel.length; e++) t = t[this.currentLevel[e]];
        return t
    }, G.Modify.prototype.redrawGfx = function () {
        this.gfx.clear();
        var t = this.getCurrentLevelObject();
        if (t !== game.state.getCurrentState()) {
            var e = t.getLocalBounds();
            this.gfx.lineStyle(3, 16711680, .2), this.gfx.drawRect(t.worldPosition.x + e.x, t.worldPosition.y + e.y, e.width, e.height), this.gfx.beginFill(0, .5), this.gfx.drawRect(t.worldPosition.x - 10, t.worldPosition.y - 10, 20, 20)
        }
        this.gfx.beginFill(0, 0), this.childrenPropNames.forEach(function (t, e) {
            var i = e == this.currentChildIndex;
            this.gfx.lineStyle(i ? 3 : 1, 255, i ? 1 : .2);
            var s = this.getCurrentLevelObject().children[e];
            if (s) {
                var a = s.getBounds(),
                    o = s.getLocalBounds();
                this.gfx.drawRect(s.worldPosition.x + o.x * s.scale.x, s.worldPosition.y + o.y * s.scale.y, a.width * s.scale.x, a.height * s.scale.y), i && s.maxUserWidth && !s.maxUserHeight ? (this.gfx.lineStyle(2, 65280, .5), this.gfx.drawRect(s.worldPosition.x - s.anchor.x * s.maxUserWidth, s.worldPosition.y - s.anchor.y * s.height, s.maxUserWidth, s.height)) : i && s.maxUserWidth && s.maxUserHeight && (this.gfx.lineStyle(2, 65280, .5), this.gfx.drawRect(s.worldPosition.x - s.anchor.x * s.maxUserWidth, s.worldPosition.y - s.anchor.y * s.maxUserHeight, s.maxUserWidth, s.maxUserHeight))
            }
        }, this);
        this.getCurrentObject()
    }, G.Modify.prototype.addKeyboardControlls = function () {
        this.keys = game.input.keyboard.addKeys({
            Q: Phaser.Keyboard.Q,
            A: Phaser.Keyboard.A,
            E: Phaser.Keyboard.E,
            UP: Phaser.Keyboard.UP,
            ONE: Phaser.Keyboard.ONE,
            TWO: Phaser.Keyboard.TWO,
            DOWN: Phaser.Keyboard.DOWN,
            RIGHT: Phaser.Keyboard.RIGHT,
            LEFT: Phaser.Keyboard.LEFT,
            ALT: Phaser.Keyboard.ALT,
            Z: Phaser.Keyboard.Z,
            X: Phaser.Keyboard.X,
            C: Phaser.Keyboard.C,
            U: Phaser.Keyboard.U,
            PLUS: 107,
            MINUS: 109,
            ESC: Phaser.Keyboard.ESC,
            NUM8: 104,
            NUM5: 101,
            NUM4: 100,
            NUM6: 102,
            NUM2: 98,
            NUM7: 103,
            NUM9: 105,
            NUMSTAR: 106,
            SPACE: Phaser.Keyboard.SPACEBAR,
            V: Phaser.Keyboard.V,
            L: Phaser.Keyboard.L,
            I: Phaser.Keyboard.I,
            P: Phaser.Keyboard.P,
            O: Phaser.Keyboard.O,
            M: Phaser.Keyboard.M,
            DEL: Phaser.Keyboard.DELETE,
            sqBracketOpen: 219,
            sqBracketClose: 221,
            SHIFT: Phaser.Keyboard.SHIFT
        }), this.keys.sqBracketOpen.onDown.add(function () {
            this.keys.SHIFT.isDown ? this.objToBottom() : this.objMoveDown()
        }, this), this.keys.sqBracketClose.onDown.add(function () {
            this.keys.SHIFT.isDown ? this.objToTop() : this.objMoveUp()
        }, this), this.keys.frameCounter = 0, this.keys.L.onDown.add(function () {
            var e = this.getCurrentLevelObject(),
                i = this.getCurrentObject();
            this.domLayer.openInputDiv((i.___LABEL || "obj") + " | label", i.___LABEL || "", function (t) {
                void 0 === e[t] && (i.___LABEL && delete e[i.___LABEL], (e[t] = i).___LABEL = t, this.refreshLevel())
            }, this, "string")
        }, this), this.keys.Q.onDown.add(function () {
            this.changeCurrentChildrenIndex(this.currentChildIndex + 1)
        }, this), this.keys.A.onDown.add(function () {
            console.log("children -1"), this.changeCurrentChildrenIndex(this.currentChildIndex - 1)
        }, this), this.keys.E.onDown.add(function () {
            this.exportChanges()
        }, this), this.keys.NUM5.onDown.add(function () {
            var t = this.getCurrentObject();
            t && (t.scale.setTo(1), t.angle = 0, t.alpha = 1, t.visible = !0, t.anchor.setTo(.5))
        }, this), this.keys.TWO.onDown.add(function () {
            0 < this.getCurrentObject().children.length && (this.currentLevel = this.currentLevel.concat(this.childrenPropNames[this.currentChildIndex]), this.childrenPropNames = this.getChildrenPropNames(), this.currentChildIndex = 0, this.makeTexts())
        }, this), this.keys.ONE.onDown.add(function () {
            0 != this.currentLevel.length && (this.currentLevel = "number" == typeof this.currentLevel[this.currentLevel.length - 1] ? this.currentLevel.splice(0, this.currentLevel.length - 2) : this.currentLevel.splice(0, this.currentLevel.length - 1), this.childrenPropNames = this.getChildrenPropNames(), this.currentChildIndex = 0, this.makeTexts())
        }, this), this.keys.ESC.onDown.add(this.turnOff, this), this.keys.V.onDown.add(function () {
            this.alpha = 1 == this.alpha ? .1 : 1
        }, this), this.keys.O.onDown.add(function () {
            var t = this.getCurrentObject();
            t instanceof Phaser.Group && (t.___CONSTRUCTOR = !0)
        }, this), this.keys.P.onDown.add(function () {
            var t = this.getCurrentObject();
            this.codeGenerator.start(t)
        }, this), this.keys.C.onDown.add(function () {
            var t = game.input.activePointer,
                e = this.addImage();
            this.setNewCurrentChildren(e), this.moveCurrentObjectToWorldPos(t.x, t.y)
        }, this), this.keys.I.onDown.add(function () {
            void 0 === this.pressCounterI && (this.pressCounterI = 0), this.pressCounterI++, 3 == this.pressCounterI && game.state.start("MODIFYEMPTYSTATE"), game.time.events.add(1e3, function () {
                this.pressCounterI = 0
            }, this)
        }, this), this.keys.DEL.onDown.add(this.removeObject, this), this.keys.NUMSTAR.onDown.add(function () {
            console.log("numstar"), this.frameSelector.opened ? this.frameSelector.close() : this.frameSelector.open()
        }, this), this.keys.U.onDown.add(function () {
            this.hideGroupTxt = !this.hideGroupTxt
        }, this)
    }, G.Modify.prototype.turnOff = function () {
        if (void 0 === this.escPressed && (this.escPressed = 0), this.escPressed++, game.time.events.add(2e3, function () {
            this.escPressed = 0
        }, this), !(this.escPressed < 5)) {
            for (key in this.keys) this.keys[key].onDown && this.keys[key].onDown.removeAll();
            this.gfx.destroy(), this.levelTxt.destroy(), this.propGroup.destroy(), this.groupTxt.destroy(), this.destroy()
        }
    }, G.Modify.prototype.modifyCurrentObjProp = function (t, e) {
        var i = this.getCurrentObject();
        this.saveInitPropValue(t, e), G.Utils.setObjProp(i, t, e)
    }, G.Modify.prototype.saveInitPropValue = function (t, e) {
        var i = this.getCurrentObject();
        Array.isArray(t) && (t = t.join(".")), G.Utils.getObjProp(i, t) !== e && (i.___initState || (i.___initState = {}), void 0 === i.___initState[t] && (i.___initState[t] = G.Utils.getObjProp(i, t)))
    }, G.Modify.prototype.updateKeyboard = function () {
        var t = this.getCurrentObject();
        if (t) {
            this.keys.frameCounter++;
            var e = 1,
                i = !0;
            this.keys.Z.isDown && this.keys.frameCounter % 5 != 0 && (i = !1), this.keys.X.isDown && (e = 5), this.keys.C.isDown && (e = 20), i && this.keys.UP.isDown && this.modifyCurrentObjProp("y", t.y - e), i && this.keys.DOWN.isDown && this.modifyCurrentObjProp("y", t.y + e), i && this.keys.LEFT.isDown && this.modifyCurrentObjProp("x", t.x - e), i && this.keys.RIGHT.isDown && this.modifyCurrentObjProp("x", t.x + e), e = .025, this.keys.X.isDown && (e = .05), this.keys.C.isDown && (e = .1), i && this.keys.NUM8.isDown && this.modifyCurrentObjProp("scale.y", t.scale.y + e), i && this.keys.NUM2.isDown && (this.modifyCurrentObjProp("scale.y", t.scale.y - e), t.scale.y -= e), i && this.keys.NUM4.isDown && this.modifyCurrentObjProp("scale.x", t.scale.x - e), i && this.keys.NUM6.isDown && this.modifyCurrentObjProp("scale.x", t.scale.x + e), i && this.keys.PLUS.isDown && (this.modifyCurrentObjProp("scale.x", t.scale.x + e), this.modifyCurrentObjProp("scale.y", t.scale.y + e)), i && this.keys.MINUS.isDown && (this.modifyCurrentObjProp("scale.x", t.scale.x - e), this.modifyCurrentObjProp("scale.y", t.scale.y - e)), e = 1, this.keys.X.isDown && (e = 2), this.keys.C.isDown && (e = 5), i && this.keys.NUM7.isDown && this.modifyCurrentObjProp("angle", t.angle - e), i && this.keys.NUM9.isDown && this.modifyCurrentObjProp("angle", t.angle + e), this.keys.SPACE.isDown && (this.modifyCurrentObjProp("x", 5 * Math.floor(t.x / 5)), this.modifyCurrentObjProp("y", 5 * Math.floor(t.y / 5)), this.modifyCurrentObjProp("scale.x", .025 * Math.floor(t.scale.x / .025)), this.modifyCurrentObjProp("scale.y", .025 * Math.floor(t.scale.y / .025)), this.modifyCurrentObjProp("angle", Math.floor(t.angle)))
        }
    }, G.Modify.prototype.currentLevelGoUp = function () {
        0 != this.currentLevel.length && (this.currentLevel = "number" == typeof this.currentLevel[this.currentLevel.length - 1] ? this.currentLevel.splice(0, this.currentLevel.length - 2) : this.currentLevel.splice(0, this.currentLevel.length - 1), this.childrenPropNames = this.getChildrenPropNames(), this.currentChildIndex = 0, this.onLevelObjChange.dispatch())
    }, G.Modify.prototype.currentLevelGoDown = function (t) {
        console.log(arguments), console.log(this.childrenPropNames[t]), this.currentLevel = this.currentLevel.concat(this.childrenPropNames[t]), this.childrenPropNames = this.getChildrenPropNames(), this.currentChildIndex = 0, this.onLevelObjChange.dispatch()
    }, G.Modify.prototype.changeCurrentChildrenIndex = function (t) {
        this.currentChildIndex = t, this.currentChildIndex < 0 && (this.currentChildIndex = this.childrenPropNames.length - 1), this.currentChildIndex >= this.childrenPropNames.length && (this.currentChildIndex = 0), this.onCurrentObjChange.dispatch()
    }, G.Modify.prototype.setNewCurrentChildren = function (t) {
        var e = this.getCurrentLevelObject().children.indexOf(t); - 1 != e && this.changeCurrentChildrenIndex(e)
    }, G.Modify.prototype.childPropChange = function (t) {
        var e = this.currentLevel,
            i = this.currentChildIndex;
        this.currentLevel = t || [];
        for (var s = this.currentLevel.join("/") || this.currentLevel[0] || game.state.current, a = this.removeCashObjToString(s), o = "", n = this.getChildrenPropNames(), r = 0; r < n.length; r++) {
            this.currentChildIndex = r;
            var h = this.getCurrentObject();
            if (h !== this) {
                n[r].toString();
                var l = h.___NEWOBJECT,
                    d = h.constructor === G.OneLineText || h.constructor === G.MultiLineText;
                if (l && (o += "NEW OBJECT \n"), h.___initState) o += "\t" + n[r] + "\n", Object.keys(h.___initState).forEach(function (t) {
                    o += "\t" + t + ":  " + G.Utils.getObjProp(h, t) + "\n"
                }, this), h.___initState = void 0;
                !d && (l || h.children && 0 < h.children.length) && this.childPropChange(this.currentLevel.concat(n[r]))
            }
        } (0 < o.length || 0 < a.length) && (a.length, o.length, this.export += s + "\n" + a + o), this.currentChildIndex = i, this.currentLevel = e
    }, G.Modify.prototype.exportChanges = function () {
        this.export = "", this.childPropChange(), this.export ? (this.export = this.objectName + "\n" + this.export, G.Utils.copyToClipboard(this.export), console.log(this.export)) : console.log("NO CHANGES TO EXPORT")
    }, G.Modify.prototype.processClick = function () {
        var t = game.input.activePointer;
        this.keys.M.isDown && this.moveCurrentObjectToWorldPos(t.x, t.y)
    }, G.Modify.prototype.moveCurrentObjectToWorldPos = function (t, e) {
        var i = this.getCurrentObject();
        if (i) {
            i.updateTransform();
            var s = t - i.worldPosition.x,
                a = e - i.worldPosition.y,
                o = new Phaser.Point(s, a),
                n = new Phaser.Point(t, e);
            o.normalize();
            for (var r = i.worldPosition.distance(n); ;) {
                var h = r;
                if (i.x += o.x, i.y += o.y, i.updateTransform(), h < (r = i.worldPosition.distance(n))) break
            }
            i.x = Math.round(i.x), i.y = Math.round(i.y)
        }
    }, G.Modify.prototype.addMouseWheel = function () {
        game.input.mouse.mouseWheelCallback = function (t) {
            var e = this.getCurrentLevelObject();
            e && e !== game.world && (e.y += 150 * game.input.mouse.wheelDelta)
        }.bind(this)
    }, G.Modify.prototype.exportLvlAsString = function () {
        for (var t = [], e = this.getCurrentLevelObject(), i = 0; i < e.children.length; i++) {
            var s = e.children[i];
            if (s instanceof Phaser.Image) {
                var a = null;
                "string" == typeof s.frameName && (a = -1 == s.frameName.indexOf("/") ? s.frameName : s.key);
                var o = {
                    x: s.x,
                    y: s.y,
                    frame: a,
                    anchor: [s.anchor.x, s.anchor.y],
                    scale: [s.scale.x, s.scale.y],
                    angle: s.angle
                };
                s.___LABEL && (o.label = s.___LABEL), s.___DATA && (o.data = s.___DATA), t.push(o)
            }
        }
        console.log(JSON.stringify(t)), G.Utils.copyToClipboard(JSON.stringify(t))
    }, G.Modify.prototype.objToTop = function () {
        var t = this.getCurrentObject();
        t && (this.getCurrentLevelObject().bringToTop(t), this.refreshLevel(), this.setNewCurrentChildren(t))
    }, G.Modify.prototype.objMoveUp = function () {
        var t = this.getCurrentObject();
        t && (this.getCurrentLevelObject().moveUp(t), this.refreshLevel(), this.setNewCurrentChildren(t))
    }, G.Modify.prototype.objMoveDown = function () {
        var t = this.getCurrentObject();
        t && (this.getCurrentLevelObject().moveDown(t), this.refreshLevel(), this.setNewCurrentChildren(t))
    }, G.Modify.prototype.objToBottom = function () {
        var t = this.getCurrentObject();
        t && (this.getCurrentLevelObject().sendToBack(t), this.refreshLevel(), this.setNewCurrentChildren(t))
    }, G.ModifyAnimationEditor = function (t) {
        Phaser.Group.call(this, game), this.modify = G.Modify.instance, this.tl = new G.ModifyAnimationTL, this.tl.x = 100, this.add(this.tl), this.fw = new G.ModifyAnimationFrameWindow, this.fw.x = -250, this.add(this.fw), this.tl.onFrameSelected.add(this.fw.refresh, this.fw), this.fw.onChange.add(function (t, e) {
            console.log("fw onchange"), this.tl.redrawTl(), t.updateAnimation(e)
        }, this), this.tl.changeTlPxWidth(800), this.visible = !1, this.modify.onLevelObjChange.add(function () {
            var t = this.modify.getCurrentLevelObject();
            t.ANIMATIONELEMENT ? this.open(t) : this.close()
        }, this)
    }, G.ModifyAnimationEditor.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationEditor.prototype.open = function (t) {
        this.visible = !0, this.tl.open(t), this.fw.refresh(t, 0)
    }, G.ModifyAnimationEditor.prototype.close = function () {
        this.visible = !1
    }, G.ModifyAnimationFrameGroup = function (t, e) {
        Phaser.Group.call(this, game), this.x = t, this.y = e, this.active = !1, this.currentObj = null, this.currentKeyFrame = null, this.currentFrameNr = 0, this.style = {
            font: "Verdana",
            fontSize: 13,
            fontWeight: "bold"
        }, this.onOffBtn = game.add.text(0, 0, "off", this.style), this.onOffBtn.inputEnabled = !0, this.onOffBtn.hitArea = new Phaser.Rectangle(0, 0, this.onOffBtn.width, this.onOffBtn.height), this.onOffBtn.events.onInputDown.add(this.onOff, this), this.propValue = game.add.text(280, 0, "---", this.style), this.propValue.anchor.x = 1, this.addMultiple([this.onOffBtn, this.propValue]), this.onChange = new Phaser.Signal
    }, G.ModifyAnimationFrameGroup.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationFrameGroup.prototype.onOff = function () {
        if (0 != this.currentFrameNr) {
            if (this.active) {
                this.active = !1, this.alpha = .5, this.onOffBtn.setText("off");
                var t = this.currentObj.frameTL.indexOf(this.currentKeyFrame);
                this.currentObj.frameTL.splice(t, 1)
            } else {
                this.active = !0, this.alpha = 1, this.onOffBtn.setText("on");
                for (var e = {
                    f: this.currentFrameNr,
                    v: G.Utils.getObjProp(this.currentObj.SPR, "frameName")
                }, i = this.currentFrameNr, s = this.currentObj.frameTL, a = 0, o = 0; o < s.length; o++) s[o].f < i && a++;
                s.splice(a, 0, e)
            }
            this.refresh(this.currentObj, this.currentFrameNr)
        }
    }, G.ModifyAnimationFrameGroup.prototype.update = function () {
        if (this.currentObj.playing) this.refresh(this.currentObj, this.currentObj.frameCounter);
        else if (this.currentObj) {
            var t = G.Utils.getObjProp(this.currentObj.SPR, "frameName") || G.Utils.getObjProp(this.currentObj.SPR, "key");
            t.indexOf("/") && (t = t.slice(t.lastIndexOf("/") + 1)), null == this.currentKeyFrame && (t != this.valAtRefresh ? (this.propValue.fill = "red", this.alpha = 1) : (this.alpha = .5, this.propValue.fill = "black")), !this.currentObj.playing && this.currentKeyFrame && this.currentKeyFrame.v !== t && (this.currentKeyFrame.v = t), this.propValue.setText(t)
        } else this.propValue.setText("---")
    }, G.ModifyAnimationFrameGroup.prototype.refresh = function (t, e) {
        this.currentObj = t, this.currentObj.currentAnimationName && (this.currentKeyFrame = t.getKeyFrameAt(t.frameTL, e), this.currentFrameNr = e, this.propValue.fill = "black", this.valAtRefresh = G.Utils.getObjProp(this.currentObj.SPR, "frameName"), this.currentKeyFrame ? (this.active = !0, this.alpha = 1, this.onOffBtn.setText("on"), console.log("frameGroup refresh"), console.log(this.currentObj.getTextureFrameValue(t.frameTL, e)), this.propValue.setText(this.currentObj.getTextureFrameValue(t.frameTL, e) || "---")) : (this.onOffBtn.setText("off"), this.active = !1, this.alpha = .5, this.propValue.setText("---")))
    }, G.ModifyAnimationFrameWindow = function () {
        Phaser.Group.call(this, game), this.onChange = new Phaser.Signal, this.gfx = game.add.graphics(), this.gfx.inputEnabled = !0, this.add(this.gfx), this.gfx.beginFill(14540253), this.gfx.drawRect(0, 0, 300, 500), this.style = {
            font: "Verdana",
            fontSize: 13,
            fontWeight: "bold"
        }, this.currentAnimationTxt = game.add.text(10, 10, "", this.style), this.add(this.currentAnimationTxt), this.currentAnimationTxt.inputEnabled = !0, this.currentAnimationTxt.events.onInputDown.add(function () {
            this.changeAnimation()
        }, this), this.addAnimationBtn = game.add.text(170, 10, "+", this.style), this.add(this.addAnimationBtn), this.addAnimationBtn.inputEnabled = !0, this.addAnimationBtn.events.onInputDown.add(this.addNewAnimation, this), this.renameAnimationBtn = game.add.text(200, 10, "R", this.style), this.add(this.renameAnimationBtn), this.renameAnimationBtn.inputEnabled = !0, this.renameAnimationBtn.events.onInputDown.add(this.renameAnimation, this), this.removeAnimationBtn = game.add.text(230, 10, "-", this.style), this.add(this.removeAnimationBtn), this.removeAnimationBtn.inputEnabled = !0, this.removeAnimationBtn.events.onInputDown.add(this.removeAnimation, this), this.frameNr = game.add.text(290, 10, "", this.style), this.frameNr.anchor.x = 1, this.add(this.frameNr), this.frameGroup = new G.ModifyAnimationFrameGroup(10, 50), this.add(this.frameGroup), this.propGroups = [new G.ModifyAnimationPropGroup(10, 70, "alpha", "#43c9e7"), new G.ModifyAnimationPropGroup(10, 90, "x", "#e08040"), new G.ModifyAnimationPropGroup(10, 110, "y", "#d8ff30"), new G.ModifyAnimationPropGroup(10, 130, "angle", "#072ba0"), new G.ModifyAnimationPropGroup(10, 150, "scale.x", "#6c0674"), new G.ModifyAnimationPropGroup(10, 170, "scale.y", "#d34ed9"), new G.ModifyAnimationPropGroup(10, 190, "anchor.x"), new G.ModifyAnimationPropGroup(10, 210, "anchor.y")], this.propGroups.forEach(function (t) {
            t.onChange.add(this.onChange.dispatch, this.onChange)
        }, this), this.addMultiple(this.propGroups)
    }, G.ModifyAnimationFrameWindow.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationFrameWindow.prototype.update = function () {
        this.currentObj && (this.propGroups.forEach(function (t) {
            t.update()
        }, this), this.frameGroup.update())
    }, G.ModifyAnimationFrameWindow.prototype.loadFrame = function (t, e) {
        this.currentObj = t, this.labelObjTxt.setText(t.LABEL || "obj"), this.frameNr.setText(e)
    }, G.ModifyAnimationFrameWindow.prototype.refresh = function (e, i) {
        this.propGroups.forEach(function (t) {
            t.refresh(e, i)
        }), this.frameGroup.refresh(e, i), this.frameNr.setText(i), this.currentFrameNr = i, this.currentObj = e, this.currentAnimationTxt.setText(this.currentObj.currentAnimationName || "------")
    }, G.ModifyAnimationFrameWindow.prototype.changeAnimation = function (t) {
        if (this.currentObj) {
            var e = Object.keys(this.currentObj.dataAnimation);
            if (console.log(JSON.stringify(e)), t) this.currentObj.changeAnimationData(t);
            else if (this.currentObj.currentAnimationName) {
                var i = e.indexOf(this.currentObj.currentAnimationName),
                    s = (i + 1) % e.length;
                console.log(i, s), this.currentObj.changeAnimationData(e[s])
            } else this.currentObj.changeAnimationData(e[0]);
            this.refresh(this.currentObj, this.currentFrameNr), this.onChange.dispatch(this.currentObj, 0)
        }
    }, G.ModifyAnimationFrameWindow.prototype.addNewAnimation = function () {
        if (this.currentObj) {
            for (var t = Object.keys(this.currentObj.dataAnimation), e = "newAnimation", i = 0; - 1 !== t.indexOf(e + i);) i++;
            this.currentObj.dataAnimation[e + i] = {
                eventTL: [],
                frameTL: [{
                    f: 0,
                    v: null
                }],
                propTLS: {
                    alpha: [{
                        f: 0,
                        v: 1
                    }],
                    x: [{
                        f: 0,
                        v: 0
                    }],
                    y: [{
                        f: 0,
                        v: 0
                    }],
                    angle: [{
                        f: 0,
                        v: 0
                    }],
                    "scale.x": [{
                        f: 0,
                        v: 1
                    }],
                    "scale.y": [{
                        f: 0,
                        v: 1
                    }],
                    "anchor.x": [{
                        f: 0,
                        v: .5
                    }],
                    "anchor.y": [{
                        f: 0,
                        v: .5
                    }]
                }
            }, this.changeAnimation(e + i)
        }
    }, G.ModifyAnimationFrameWindow.prototype.removeAnimation = function () {
        this.currentObj && this.currentObj.currentAnimationName && 1 != Object.keys(this.currentObj.dataAnimation).length && confirm("delete " + this.currentObj.currentAnimationName + "?") && (delete this.currentObj.dataAnimation[this.currentObj.currentAnimationName], this.changeAnimation())
    }, G.ModifyAnimationFrameWindow.prototype.renameAnimation = function () {
        this.currentObj && this.currentObj.currentAnimationName && G.Modify.instance.domLayer.openInputDiv(this.currentObj.currentAnimationName, this.currentObj.currentAnimationName, function (t) {
            var e = this.currentObj.currentAnimationName,
                i = this.currentObj.currentAnimationData;
            delete this.currentObj.dataAnimation[e], this.currentObj.dataAnimation[t] = i, this.changeAnimation(t)
        }, this, "string")
    }, G.ModifyAnimationPropGroup = function (t, e, i, s) {
        Phaser.Group.call(this, game), this.x = t, this.y = e, this.propKey = i, this.active = !1, this.currentObj = null, this.currentKeyFrame = null, this.currentFrameNr = 0, this.style = {
            font: "Verdana",
            fontSize: 13,
            fontWeight: "bold"
        }, this.easings = ["Back", "Bounce", "Circular", "Cubic", "Elastic", "Exponential", "Linear", "Quadratic", "Quartic", "Quintic", "Sinusoidal"], this.onOffBtn = game.add.text(0, 0, "off", this.style), this.onOffBtn.inputEnabled = !0, this.onOffBtn.hitArea = new Phaser.Rectangle(0, 0, this.onOffBtn.width, this.onOffBtn.height), this.onOffBtn.events.onInputDown.add(this.onOff, this), this.label = game.add.text(30, 0, i, this.style), s && this.label.addColor(s, 0), this.easingLabel0 = game.add.text(120, 0, "", this.style), this.easingLabel0.inputEnabled = !0, this.easingLabel0.hitArea = new Phaser.Rectangle(0, 0, 80, this.easingLabel0.height), this.easingLabel0.events.onInputDown.add(this.changeEasing0, this), this.easingLabel1 = game.add.text(200, 0, "", this.style), this.easingLabel1.inputEnabled = !0, this.easingLabel1.hitArea = new Phaser.Rectangle(0, 0, 50, this.easingLabel1.height), this.easingLabel1.events.onInputDown.add(this.changeEasing1, this), this.propValue = game.add.text(280, 0, "", this.style), this.propValue.anchor.x = 1, this.addMultiple([this.label, this.onOffBtn, this.easingLabel0, this.easingLabel1, this.propValue]), this.onChange = new Phaser.Signal
    }, G.ModifyAnimationPropGroup.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationPropGroup.prototype.onOff = function () {
        if (0 != this.currentFrameNr) {
            if (this.active) {
                this.active = !1, this.alpha = .5, this.onOffBtn.setText("off");
                var t = this.currentObj.propTLS[this.propKey].indexOf(this.currentKeyFrame);
                this.currentObj.propTLS[this.propKey].splice(t, 1)
            } else {
                this.active = !0, this.alpha = 1, this.onOffBtn.setText("on");
                for (var e = {
                    f: this.currentFrameNr,
                    v: G.Utils.getObjProp(this.currentObj.SPR, this.propKey)
                }, i = this.currentFrameNr, s = this.currentObj.propTLS[this.propKey], a = 0, o = 0; o < s.length; o++) s[o].f < i && a++;
                s.splice(a, 0, e)
            }
            this.refresh(this.currentObj, this.currentFrameNr)
        }
    }, G.ModifyAnimationPropGroup.prototype.update = function () {
        if (this.currentObj.playing) this.refresh(this.currentObj, this.currentObj.frameCounter);
        else if (this.currentObj) {
            var t = G.Utils.getObjProp(this.currentObj.SPR, this.propKey);
            null == this.currentKeyFrame && (t != this.valAtRefresh ? (this.propValue.fill = "red", this.alpha = 1) : (this.alpha = .5, this.propValue.fill = "black")), !this.currentObj.playing && this.currentKeyFrame && this.currentKeyFrame.v !== t && (this.currentKeyFrame.v = t), this.propValue.setText(t.toFixed(1))
        } else this.propValue.setText("---")
    }, G.ModifyAnimationPropGroup.prototype.changeEasing0 = function () {
        if (this.currentKeyFrame) {
            if (this.currentKeyFrame.e) {
                var t = this.easings.indexOf(this.currentKeyFrame.e[0]);
                if (t + 1 == this.easings.length) this.currentKeyFrame.e = !1, this.easingLabel0.setText("--"), this.easingLabel1.setText("--");
                else {
                    this.currentKeyFrame.e[0] = this.easings[t + 1], this.easingLabel0.setText(this.easings[t + 1]);
                    var e = this.currentKeyFrame.e[1];
                    Phaser.Easing[this.easings[t + 1]][e] || (Phaser.Easing[this.easings[t + 1]].None ? this.currentKeyFrame.e[1] = "None" : Phaser.Easing[this.easings[t + 1]].In && (this.currentKeyFrame.e[1] = "In")), this.easingLabel1.setText(this.currentKeyFrame.e[1])
                }
            } else this.currentKeyFrame.e = ["Back", "In"], this.easingLabel0.setText("Back"), this.easingLabel1.setText("In");
            this.onChange.dispatch(this.currentObj, this.currentFrameNr)
        }
    }, G.ModifyAnimationPropGroup.prototype.changeEasing1 = function () {
        if (this.currentKeyFrame && this.currentKeyFrame.e) {
            var t = this.currentKeyFrame.e[1],
                e = Object.keys(Phaser.Easing[this.currentKeyFrame.e[0]]),
                i = e.indexOf(t);
            this.currentKeyFrame.e[1] = e[(i + 1) % e.length], this.easingLabel1.setText(this.currentKeyFrame.e[1]), this.onChange.dispatch(this.currentObj, this.currentFrameNr)
        }
    }, G.ModifyAnimationPropGroup.prototype.refresh = function (t, e) {
        this.currentObj = t, this.currentObj.currentAnimationName && (this.currentKeyFrame = t.getKeyFrameAt(t.propTLS[this.propKey], e), this.currentFrameNr = e, this.propValue.fill = "black", this.valAtRefresh = G.Utils.getObjProp(this.currentObj.SPR, this.propKey), this.currentKeyFrame ? (this.active = !0, this.alpha = 1, this.onOffBtn.setText("on"), this.currentKeyFrame.e ? (this.easingLabel0.setText(this.currentKeyFrame.e[0]), this.easingLabel1.setText(this.currentKeyFrame.e[1])) : (this.easingLabel0.setText("---"), this.easingLabel1.setText("---"))) : (this.onOffBtn.setText("off"), this.active = !1, this.alpha = .5, this.easingLabel0.setText("---"), this.easingLabel1.setText("---")))
    }, G.ModifyAnimationTL = function () {
        Phaser.Group.call(this, game), this.gfx = game.add.graphics(), this.add(this.gfx), this.tlGfx = game.add.graphics(), this.tlGfx.inputEnabled = !0, this.pointerPressed = !1, this.pointerStartFrame = 0, this.tlGfx.events.onInputDown.add(this.onDown, this), this.tlGfx.events.onInputUp.add(this.onUp, this), this.add(this.tlGfx), this.visible = !1, this.currentObj = null, this.frameWidth = 10, this.frameHeight = 50, this.tlPxWidth = 400, this.tlFrameLength = this.tlPxWidth / this.frameWidth, this.selectedFrame = null, this.frameOffset = 0, this.cursors = game.input.keyboard.createCursorKeys(), this.cursors.left.onDown.add(function () {
            this.frameOffset--, this.redrawTl()
        }, this), this.cursors.right.onDown.add(function () {
            this.frameOffset++, this.redrawTl()
        }, this), this.onFrameSelected = new Phaser.Signal
    }, G.ModifyAnimationTL.prototype = Object.create(Phaser.Group.prototype), G.ModifyAnimationTL.prototype.colors = [9904692, 35664, 4442599, 14712896, 14221104, 469920, 7079540, 13848281], G.ModifyAnimationTL.prototype.update = function () {
        if (this.pointerPressed) {
            var t = game.input.activePointer,
                e = Math.floor((t.x - this.tlGfx.worldPosition.x) / this.frameWidth);
            if (e !== this.pointerStartFrame) {
                var i = this.pointerStartFrame - e;
                this.frameOffset += i, this.pointerStartFrame = e, this.frameOffset = Math.max(0, this.frameOffset), this.redrawTl()
            }
        }
    }, G.ModifyAnimationTL.prototype.changeFrameWidth = function (t) {
        this.frameWidth = t, this.tlFrameLength = Math.floor(this.tlPxWidth / this.frameWidth), this.redrawTl()
    }, G.ModifyAnimationTL.prototype.changeTlPxWidth = function (t) {
        this.tlPxWidth = t, this.tlFrameLength = Math.floor(this.tlPxWidth / this.frameWidth), this.redrawTl()
    }, G.ModifyAnimationTL.prototype.open = function (t) {
        this.currentObj = t, this.visible = !0, this.redrawTl(), this.currentObj.stop()
    }, G.ModifyAnimationTL.prototype.onDown = function (t, e) {
        this.currentObj.pause();
        var i = Math.floor((e.x - this.tlGfx.worldPosition.x) / this.frameWidth);
        this.pointerStartFrame = i, this.pointerPressed = !0
    }, G.ModifyAnimationTL.prototype.onUp = function (t, e) {
        var i = Math.floor((e.x - this.tlGfx.worldPosition.x) / this.frameWidth);
        this.pointerStartFrame == i && (this.selectFrame(i), this.pointerStar), this.pointerPressed = !1
    }, G.ModifyAnimationTL.prototype.selectFrame = function (t) {
        this.selectedFrame = t + this.frameOffset, this.currentObj.updateAnimation(this.selectedFrame), this.redrawTl(), this.onFrameSelected.dispatch(this.currentObj, this.selectedFrame)
    }, G.ModifyAnimationTL.prototype.redrawTl = function () {
        if (this.tlGfx.clear(), this.currentObj && this.currentObj.currentAnimationName) {
            this.tlGfx.beginFill(14540253, 1), this.tlGfx.drawRect(0, 0, this.tlFrameLength * this.frameWidth, this.frameHeight), this.tlGfx.beginFill(10066329, 1);
            for (var t = this.frameOffset; t < this.frameOffset + this.tlFrameLength; t++) this.currentObj.isAnyKeyFrameAt(t) && (this.tlGfx.lineStyle(1, 0, 1), this.tlGfx.drawRect(this.frameWidth * t - this.frameOffset * this.frameWidth, 0, this.frameWidth, this.frameHeight)), t % 60 == 0 && (this.tlGfx.lineStyle(1, 0, .25), this.tlGfx.moveTo(this.frameWidth * t - this.frameOffset * this.frameWidth, 0), this.tlGfx.lineTo(this.frameWidth * t - this.frameOffset * this.frameWidth, this.frameHeight));
            this.tlGfx.lineStyle(0, 0, 0);
            for (t = 0; t < this.currentObj.eventTL.length; t++) {
                var e = this.currentObj.eventTL[t];
                this.tlGfx.beginFill(this.colors[0], 1), e.f >= this.frameOffset && e.f < this.frameOffset + this.tlFrameLength && this.tlGfx.drawRect(this.frameWidth * e.f - this.frameOffset * this.frameWidth, 0, this.frameWidth, 5)
            }
            for (t = 0; t < this.currentObj.frameTL.length; t++) {
                e = this.currentObj.frameTL[t];
                this.tlGfx.beginFill(this.colors[1], 1), e.f >= this.frameOffset && e.f < this.frameOffset + this.tlFrameLength && this.tlGfx.drawRect(this.frameWidth * e.f - this.frameOffset * this.frameWidth, 5, this.frameWidth, 5)
            }
            for (t = 0; t < this.currentObj.propKeys.length; t++) this.drawPropLine(this.currentObj.propTLS[this.currentObj.propKeys[t]], 15 + 5 * t, this.colors[2 + t]);
            null !== this.selectedFrame && this.selectedFrame >= this.frameOffset && this.selectedFrame < this.frameOffset + this.tlFrameLength && (this.tlGfx.beginFill(255, .5), this.tlGfx.drawRect(this.frameWidth * this.selectedFrame - this.frameOffset * this.frameWidth, 0, this.frameWidth, this.frameHeight))
        }
    }, G.ModifyAnimationTL.prototype.drawPropLine = function (t, e, i) {
        for (var s, a = .5 * this.frameWidth, o = 0; o < t.length; o++) {
            var n = t[o];
            if (s = n.f * this.frameWidth + .5 * this.frameWidth - this.frameOffset * this.frameWidth, this.tlGfx.lineStyle(0, 0, 0), !(n.f < this.frameOffset)) {
                var r = t[o - 1];
                if (r && r.e && (this.tlGfx.lineStyle(2, i, 1), this.tlGfx.moveTo(0, e), this.tlGfx.lineTo(Math.min(this.tlFrameLength * this.frameWidth, n.f * this.frameWidth - this.frameOffset * this.frameWidth), e)), !(n.f >= this.frameOffset + this.tlFrameLength))
                    if (n.e) {
                        if (this.tlGfx.beginFill(i, 1), this.tlGfx.drawCircle(s, e, a), t[o + 1]) {
                            this.tlGfx.lineStyle(2, i, 1), this.tlGfx.moveTo(s, e);
                            var h = t[o + 1].f * this.frameWidth - this.frameOffset * this.frameWidth;
                            h = Math.min(this.tlFrameLength * this.frameWidth, h), this.tlGfx.lineTo(h, e)
                        }
                    } else this.tlGfx.endFill(), this.tlGfx.lineStyle(2, i, 1), this.tlGfx.drawCircle(s, e, a - 2)
            }
        }
    }, G.ModifyBottomBar = function () {
        Phaser.Group.call(this, game), this.modify = G.Modify.instance, this.gfx = game.add.graphics(), this.gfx.beginFill(13421772, 1), this.gfx.drawRect(0, 0, 3e3, 30), this.gfx.inputEnabled = !0, this.gfx.events.onInputDown.add(function () { }), this.add(this.gfx);
        var t = {
            font: "Verdana",
            fontSize: 15,
            fontWeight: "bold"
        };
        this.buttons = [G.Utils.makeTextButton(10, 5, "+GROUP", this.modify.addGroup, this.modify, t), G.Utils.makeTextButton(90, 5, "+IMG", this.modify.addImage, this.modify, t), G.Utils.makeTextButton(160, 5, "+OneLine", this.modify.addOneLineText, this.modify, t), G.Utils.makeTextButton(260, 5, "+MultiLine", this.modify.addMultiLineText, this.modify, t), G.Utils.makeTextButton(360, 5, "+BTN", this.modify.addButton, this.modify, t), G.Utils.makeTextButton(450, 5, "REMOVE", this.modify.removeObject, this.modify, t), G.Utils.makeTextButton(600, 5, "EXPORT LVL STR", this.modify.exportLvlAsString, this.modify, t)], this.addMultiple(this.buttons)
    }, G.ModifyBottomBar.prototype = Object.create(Phaser.Group.prototype), G.ModifyButtonGroup = function () {
        Phaser.Group.call(this, game), this.modify = G.Modify.instance, this.fixedToCamera = !0, this.gfx = this.add(game.add.graphics()), this.transformButtons = this.add(game.add.group()), this.changeObjButtons = this.add(game.add.group()), this.mode = 0, this.tabKey = game.input.keyboard.addKey(Phaser.Keyboard.TAB), this.tabKey.onDown.add(function () {
            this.gfx.clear(), this.mode = (this.mode + 1) % 2, this.transformButtons.visible = 0 == this.mode, this.changeObjButtons.visible = 1 == this.mode
        }, this), this.keys = {
            ALT: game.input.keyboard.addKey(Phaser.Keyboard.ALT)
        }, this.clickedButton = null, this.clickedPos = null, this.posButton = game.add.button(0, 0, null), this.posButton.onInputDown.add(function () {
            this.clickedButton = this.posButton, this.clickedPos = {
                x: game.input.activePointer.x,
                y: game.input.activePointer.y
            }
        }, this), this.posButton.anchor.setTo(.5, .5), this.posButton.tint = 16711680, this.transformButtons.add(this.posButton), this.scaleButton = game.add.button(0, 0, null), this.scaleButton.onInputDown.add(function () {
            this.clickedButton = this.scaleButton, this.clickedPos = {
                x: game.input.activePointer.x,
                y: game.input.activePointer.y
            }
        }, this), this.scaleButton.anchor.setTo(.5, .5), this.scaleButton.tint = 65280, this.transformButtons.add(this.scaleButton), this.rotateButton = game.add.button(0, 0, null), this.rotateButton.onInputDown.add(function () {
            this.clickedButton = this.rotateButton, this.clickedPos = {
                x: game.input.activePointer.x,
                y: game.input.activePointer.y
            }
        }, this), this.rotateButton.anchor.setTo(.5, .5), this.rotateButton.tint = 65280, this.transformButtons.add(this.rotateButton), this.refreshChangeObjButtons(), this.modify.onLevelObjChange.add(this.refreshChangeObjButtons, this), this.modify.onObjDestroy.add(this.refreshChangeObjButtons, this)
    }, G.ModifyButtonGroup.prototype = Object.create(Phaser.Group.prototype), G.ModifyButtonGroup.prototype.update = function () {
        0 == this.mode ? (this.updateTransformButtons(), this.transformButtons.ignoreChildInput = !1, this.changeObjButtons.ignoreChildInput = !0) : (this.transformButtons.ignoreChildInput = !0, this.changeObjButtons.ignoreChildInput = !1, this.updateChangeObjButtons())
    }, G.ModifyButtonGroup.prototype.updateTransformButtons = function () {
        var t = this.modify.getCurrentObject();
        if (!t) return this.posButton.position.setTo(-9999, -9999), this.scaleButton.position.setTo(-9999, -9999), void this.rotateButton.position.setTo(-9999, -9999);
        var e = t.getBounds(),
            i = t.getLocalBounds(),
            s = game.input.activePointer;
        if (this.posButton.x = t.worldPosition.x, this.posButton.y = t.worldPosition.y, this.scaleButton.x = t.worldPosition.x + i.x * t.scale.x + e.width * t.scale.x + 20, this.scaleButton.y = t.worldPosition.y + i.y * t.scale.y + e.height * t.scale.y + 20, this.rotateButton.x = t.worldPosition.x + i.x * t.scale.x - 20, this.rotateButton.y = t.worldPosition.y + i.y * t.scale.y - 20, this.gfx.clear(), this.gfx.lineStyle(1, 0, 1), this.gfx.beginFill(16711680, 1), this.gfx.drawCircle(this.posButton.worldPosition.x, this.posButton.worldPosition.y, 10), this.gfx.endFill(), this.gfx.beginFill(65280, 1), this.gfx.drawCircle(this.scaleButton.worldPosition.x, this.scaleButton.worldPosition.y, 10), this.gfx.endFill(), this.gfx.beginFill(255, 1), this.gfx.drawCircle(this.rotateButton.worldPosition.x, this.rotateButton.worldPosition.y, 10), this.gfx.endFill(), this.clickedButton)
            if (s.isDown) {
                var a = s.x - this.clickedPos.x,
                    o = s.y - this.clickedPos.y;
                this.clickedButton === this.posButton && (this.modify.modifyCurrentObjProp("x", t.x + a), this.modify.modifyCurrentObjProp("y", t.y + o)), this.clickedButton === this.scaleButton && (this.modify.modifyCurrentObjProp("width", t.width + a), this.modify.modifyCurrentObjProp("height", t.height + o), this.keys.ALT.isDown && this.modify.modifyCurrentObjProp("scale.y", t.scale.x)), this.clickedButton === this.rotateButton && this.modify.modifyCurrentObjProp("angle", t.angle + .25 * a), this.clickedPos = {
                    x: game.input.activePointer.x,
                    y: game.input.activePointer.y
                }
            } else this.modify.modifyCurrentObjProp("x", 5 * Math.floor(t.x / 5)), this.modify.modifyCurrentObjProp("y", 5 * Math.floor(t.y / 5)), this.modify.modifyCurrentObjProp("scale.x", .025 * Math.floor(t.scale.x / .025)), this.modify.modifyCurrentObjProp("scale.y", .025 * Math.floor(t.scale.y / .025)), this.modify.modifyCurrentObjProp("angle", Math.floor(t.angle)), this.clickedButton = null
    }, G.ModifyButtonGroup.prototype.updateChangeObjButtons = function () {
        this.gfx.clear(), this.gfx.beginFill(65280, 1), this.gfx.lineStyle(3, 16711680, 1);
        for (var t = 0; t < this.changeObjButtons.length; t++) {
            var e = this.changeObjButtons.children[t];
            this.gfx.drawCircle(e.worldPosition.x, e.worldPosition.y, 10)
        }
    }, G.ModifyButtonGroup.prototype.refreshChangeObjButtons = function () {
        this.changeObjButtons.removeAll(!0);
        for (var t = this.modify.getCurrentLevelObject(), e = 0; e < t.children.length; e++)
            if (t.children[e] != this.modify) {
                var i = t.children[e],
                    s = game.make.button(0, 0, null);
                this.changeObjButtons.add(s), s.attachement = i, s.modify = this.modify, s.position = i.worldPosition, s.hitArea = new Phaser.Circle(0, 0, 10), s.onInputDown.add(function () {
                    this.modify.setNewCurrentChildren(this.attachement)
                }, s)
            }
    }, G.ModifyChildList = function () {
        Phaser.Group.call(this, game), this.fixedToCamera = !0, this.modify = G.Modify.instance, this.levelTxt = game.add.text(20, 0, "", {
            font: "Verdana",
            fontSize: 20
        }), this.levelTxtBack = game.add.text(0, 0, "<", {
            font: "Verdana",
            backgroundColor: "rgba(0,255,0,0.5)",
            fontSize: 20,
            fontWeight: "bold"
        }), this.levelTxtBack.visible = !1, this.levelTxtBack.inputEnabled = !0, this.levelTxtBack.input.useHandCursor = !0, this.levelTxtBack.events.onInputDown.add(function () {
            this.modify.currentLevelGoUp()
        }, this), this.add(this.levelTxtBack), this.add(this.levelTxt), this.listGroup = this.add(game.add.group()), this.listGroup.y = 40, this.makeList(), this.currentLevelObj = this.modify.getCurrentLevelObject(), this.currentObj = this.modify.getCurrentObject(), this.modify.onLevelObjChange.add(this.makeList, this), this.modify.onCurrentObjChange.add(this.refreshTexts, this), this.modify.onObjDestroy.add(this.makeList)
    }, G.ModifyChildList.prototype = Object.create(Phaser.Group.prototype), G.ModifyChildList.prototype.hideList = function () {
        this.listGroup.visible = !1
    }, G.ModifyChildList.prototype.showList = function () {
        this.listGroup.visible = !0
    }, G.ModifyChildList.prototype.makeList = function () {
        var t = this.modify.getCurrentLevelObject();
        this.listGroup.removeAll();
        for (var e = 0; e < this.modify.childrenPropNames.length; e++) {
            var i = t.children[e].children && 0 < t.children[e].children.length || t.children[e].constructor === Phaser.Group,
                s = t.children[e].constructor == G.OneLineText || t.children[e].constructor == G.MultiLineText,
                a = game.make.text(0, 20 * e, this.modify.childrenPropNames[e].join("."), {
                    font: "Verdana",
                    fontSize: 15,
                    backgroundColor: "rgba(221,221,221,0.5)",
                    fontWeight: "bold"
                }),
                o = "G.MODIFY-EDITOR" == this.modify.childrenPropNames[e].join(".");
            if (!s && !o && i) {
                var n = game.make.text(a.width + 10, 0, "+", {
                    font: "Verdana",
                    fontSize: 15,
                    backgroundColor: "rgba(200,255,200,0.75)",
                    fontWeight: "bold"
                });
                a.addChild(n), n.txtBtn = a, n.modify = this.modify, n.childList = this, n.indexChild = e, n.inputEnabled = !0, n.input.useHandCursor = !0, n.hitArea = new Phaser.Rectangle(0, 0, n.width, n.height), n.events.onInputDown.add(function () {
                    this.modify.currentLevelGoDown(this.indexChild)
                }, n)
            }
            this.listGroup.add(a), o || (a.inputEnabled = !0, a.indexChild = e, a.childList = this, a.modify = this.modify, a.hitArea = new Phaser.Rectangle(0, 0, a.width, a.height), a.input.useHandCursor = !0, a.events.onInputDown.add(function () {
                this.modify.changeCurrentChildrenIndex(this.indexChild)
            }, a))
        }
        this.refreshTexts()
    }, G.ModifyChildList.prototype.refreshTexts = function () {
        this.levelTxt.setText(this.modify.currentLevel.join("/") || this.modify.currentLevel[0] || game.state.current), this.levelTxtBack.visible = this.levelTxt.text !== game.state.current;
        for (var t = 0; t < this.listGroup.length; t++) {
            var e = this.listGroup.children[t];
            this.modify.currentChildIndex == t ? (e.x = 10, "rgba(221,221,221,0.5)" === e.style.backgroundColor && (e.style.backgroundColor = "rgba(180,180,255,1)", e.updateText())) : (e.x = 0, "rgba(180,180,255,1)" === e.style.backgroundColor && (e.style.backgroundColor = "rgba(221,221,221,0.5)", e.updateText()))
        }
    }, G.ModifyCodeGenerator = function (t) {
        this.modify = t
    }, G.ModifyCodeGenerator.prototype.start = function (t) {
        this.constStr = "";
        var e = this.generateCode(t),
            i = this.constStr + "\n\n" + e;
        G.Utils.copyToClipboard(i), console.log(i)
    }, G.ModifyCodeGenerator.prototype.generateCode = function (t, e) {
        return G.OneLineText && t instanceof G.OneLineText ? this.generateCodeOneLineText(t, e) : G.MultiLineText && t instanceof G.MultiLineText ? this.generateCodeMultiLineText(t, e) : G.Button && t instanceof G.Button ? this.generateCodeButton(t, e) : t instanceof Phaser.Group && !(t instanceof Phaser.BitmapText) ? t.___CONSTRUCTOR ? this.generateConstructorCode(t, e) : this.generateGroupCode(t, e) : this.generateCodeImage(t, e)
    }, G.ModifyCodeGenerator.prototype.generateConstructorCode = function (t, e, i) {
        var s = this.getObjName(t),
            a = G.capitalize(s),
            o = "";
        o += "G." + a + " = function(x,y){\n", o += "\tPhaser.Group.call(this,game);\n", o += "\tthis.position.setTo(x,y);\n", o += this.generateCodeUniProp(t, "this"), o += "\n";
        for (var n = 0; n < t.children.length; n++) o += "\t" + this.generateCode(t.children[n], "this"), o += "\n";
        o += "};\n", o += "G." + a + ".prototype = Object.create(Phaser.Group.prototype);\n\n", this.constStr += o;
        var r = (e ? e + "." : "var ") + "%NAME% = new G." + a + "(^x^,^y^);\n";
        return e && (r += e + ".add(" + e + ".%NAME%);\n"), r = G.Utils.replaceAll(r, "%NAME%", s), r = this.injectObjPropToString(t, r)
    }, G.ModifyCodeGenerator.prototype.generateGroupCode = function (t, e) {
        var i = this.getObjName(t),
            s = (e ? e + "." : "var ") + "%NAME% = game.add.group();\n";
        s += (e ? e + "." : "") + "%NAME%.position.setTo(^x^,^y^);\n", s += this.generateCodeUniProp(t, e), e && (s += e + ".add(" + e + ".%NAME%);\n");
        for (var a = 0; a < t.children.length; a++) {
            var o = this.generateCode(t.children[a], (e ? e + "." : "") + i, !0);
            s += G.Utils.replaceAll(o, "this", "%NAME%")
        }
        return s = G.Utils.replaceAll(s, "%NAME%", i), this.injectObjPropToString(t, s)
    }, G.ModifyCodeGenerator.prototype.generateGroupConstructor = function (t) { }, G.ModifyCodeGenerator.prototype.generateChildrensCode = function (t) { }, G.ModifyCodeGenerator.prototype.generateCodeButton = function (t, e) {
        var i = "";
        return i += ((e = e || "") ? e + "." : "var ") + "%NAME% = new G.Button(^x^,^y^,'^frameName^',function(){},this);\n", i += (e ? e + "." : "") + "add(" + (e ? e + "." : "var ") + "%NAME%);\n", i += this.generateCodeUniProp(t, e), i = G.Utils.replaceAll(i, "%NAME%", this.getObjName(t)), this.injectObjPropToString(t, i)
    }, G.ModifyCodeGenerator.prototype.generateCodeImage = function (t, e) {
        var i = "";
        return i += (e ? e + "." : "var ") + "%NAME% = G.makeImage(^x^,^y^,'^frameName^',[^anchor.x^,^anchor.y^]," + e + ");\n", i += this.generateCodeUniProp(t, e), i = G.Utils.replaceAll(i, "%NAME%", this.getObjName(t)), this.injectObjPropToString(t, i)
    }, G.ModifyCodeGenerator.prototype.generateCodeOneLineText = function (t, e) {
        var i = "";
        return i += (e ? e + "." : "var ") + "%NAME% = new G.OneLineText(^x^,^y^,'^font^','^text^',^fontSize^,^maxUserWidth^,^anchor.x^,^anchor.y^);\n", i += (e ? e + "." : "") + "add(" + (e ? e + "." : "var ") + "%NAME%);\n", i += this.generateCodeUniProp(t, e), i = G.Utils.replaceAll(i, "%NAME%", this.getObjName(t)), this.injectObjPropToString(t, i)
    }, G.ModifyCodeGenerator.prototype.generateCodeMultiLineText = function (t, e) {
        var i = "";
        return i += (e ? e + "." : "var ") + "%NAME% = new G.MultiLineText(^x^,^y^,'^font^','^text^',^fontSize^,^maxUserWidth^,^maxUserHeight^,'^align^',^anchor.x^,^anchor.y^);\n", i += (e ? e + "." : "") + "add(" + (e ? e + "." : "var ") + "%NAME%);\n", i += this.generateCodeUniProp(t, e), i = G.Utils.replaceAll(i, "%NAME%", this.getObjName(t)), this.injectObjPropToString(t, i)
    }, G.ModifyCodeGenerator.prototype.getObjName = function (t) {
        if (t.___LABEL) return t.___LABEL;
        var e = prompt("enter name");
        return t.___LABEL = e
    }, G.ModifyCodeGenerator.prototype.generateCodeUniProp = function (t, e) {
        var i = "";
        return e = e ? e + "." : "", 1 === t.scale.x && 1 === t.scale.y || (i += e + "%NAME%.scale.setTo(^scale.x^, ^scale.y^);\n"), 0 !== t.angle && (i += e + "%NAME%.angle = ^angle^;\n"), 1 !== t.alpha && (i += e + "%NAME%.alpha = ^alpha^;\n"), t.fixedToCamera && (i += e + "%NAME%.fixedToCamera = true;\n", i += e + "%NAME%.cameraOffset.setTo(^cameraOffset.x^,^cameraOffset.y^);\n"), i
    }, G.ModifyCodeGenerator.prototype.injectObjPropToString = function (t, e) {
        for (; ;) {
            var i = e.indexOf("^"),
                s = e.indexOf("^", i + 1);
            if (-1 == i) break;
            var a = e.slice(i, s + 1),
                o = e.slice(i + 1, s);
            e = e.replace(a, G.Utils.getObjProp(t, o))
        }
        return e
    }, G.ModifyDOMLayer = function (t) {
        this.modify = t, this.openElement = null, this.extraDataDiv = this.initExtraDataDiv(), this.inputDataDiv = this.initInputDiv()
    }, G.ModifyDOMLayer.prototype.closeCurrent = function () {
        game.time.events.add(1, function () {
            game.input.enabled = !0
        }), this.openElement.style.display = "none", game.canvas.focus()
    }, G.ModifyDOMLayer.prototype.initExtraDataDiv = function () {
        var dataInputDiv = document.createElement("DIV");
        dataInputDiv.style.backgroundColor = "green", dataInputDiv.style.left = "10%", dataInputDiv.style.top = "10%", dataInputDiv.style.position = "fixed", dataInputDiv.style.width = "80%", dataInputDiv.style.height = "80%";
        var input = document.createElement("TEXTAREA");
        return input.style.marginTop = "2%", input.style.marginLeft = "2%", input.style.width = "95%", input.style.height = "94%", input.style.resize = "none", input.onkeydown = function (e) {
            var textarea = e.target,
                div = dataInputDiv;
            if (game.time.events.add(1, function () {
                try {
                    eval("var tmp = " + textarea.value), "object" == typeof tmp ? (div.style.backgroundColor = "green", div.proper = !0) : (div.style.backgroundColor = "red", div.proper = !1)
                } catch (t) {
                    div.style.backgroundColor = "red", div.proper = !1
                }
            }), 9 == e.keyCode || 9 == e.which) {
                e.preventDefault();
                var s = textarea.selectionStart;
                textarea.value = textarea.value.substring(0, textarea.selectionStart) + "\t" + textarea.value.substring(textarea.selectionEnd), textarea.selectionEnd = s + 1
            }
            if (83 == e.keyCode && e.ctrlKey) return e.preventDefault(), div.proper && (this.closeCurrent(), div.callback.call(div.context, textarea.value)), !1;
            27 == e.keyCode && this.closeCurrent()
        }.bind(this), dataInputDiv.textarea = input, dataInputDiv.appendChild(input), document.body.appendChild(dataInputDiv), dataInputDiv.style.display = "none", dataInputDiv.style.position = "fixed", dataInputDiv
    }, G.ModifyDOMLayer.prototype.openExtraData = function (t, e, i, s) {
        console.log("openExtraData"), this.openElement = this.extraDataDiv, this.extraDataDiv.style.backgroundColor = "green", this.extraDataDiv.callback = i || function () { }, this.extraDataDiv.context = s || this, this.extraDataDiv.style.display = "block", game.input.enabled = !1, e ? "object" == typeof e && (e = JSON.stringify(e, null, "\t")) : e = "", this.extraDataDiv.textarea.value = e, game.time.events.add(1, function () {
            this.extraDataDiv.textarea.focus()
        }, this)
    }, G.ModifyDOMLayer.prototype.initInputDiv = function () {
        var a = document.createElement("DIV");
        a.style.backgroundColor = "gray", a.style.left = "30%", a.style.top = "10%", a.style.position = "fixed", a.style.width = "40%", a.style.textAlign = "center", a.style.padding = "10px", a.style.fontFamily = "Verdana";
        var t = document.createElement("h3"),
            e = document.createElement("SPAN");
        e.style.float = "right";
        var i = document.createElement("SPAN");
        i.style.float = "left", t.innerHTML = "";
        var s = document.createElement("INPUT");
        return s.style.width = "90%", s.style.fontSize = "25px", s.onkeydown = function (t) {
            var e = t.target,
                i = a;
            if (83 == t.keyCode && t.ctrlKey || 13 == t.keyCode) {
                t.preventDefault();
                var s = i.filter(e.value);
                return void 0 === s ? (i.style.backgroundColor = "red", game.time.events.add(50, function () {
                    i.style.backgroundColor = "gray"
                })) : (this.closeCurrent(), i.callback.call(i.context, s)), !1
            }
            27 == t.keyCode && this.closeCurrent()
        }.bind(this), a.appendChild(t), a.appendChild(s), a.appendChild(e), a.appendChild(i), document.body.appendChild(a), a.span = t, a.textarea = s, a.input = s, a.filterLabel = e, a.initValue = i, a.filters = {
            number: function (t) {
                var e = parseFloat(t);
                return isNaN(e) ? void 0 : e
            },
            string: function (t) {
                if (0 != t.length) return t
            },
            none: function (t) {
                return t
            }
        }, a.style.display = "none", a.style.position = "fixed", a
    }, G.ModifyDOMLayer.prototype.openInputDiv = function (t, e, i, s, a) {
        this.inputDataDiv || this.initInputArea(), this.openElement = this.inputDataDiv, this.inputDataDiv.style.display = "block", game.input.enabled = !1, this.inputDataDiv.span.innerHTML = t || "", this.inputDataDiv.input.value = e, this.inputDataDiv.callback = i || function () { }, this.inputDataDiv.context = s || this, a = a || "none", this.inputDataDiv.filter = this.inputDataDiv.filters[a], this.inputDataDiv.filterLabel.innerHTML = a, this.inputDataDiv.initValue.innerHTML = "init val: " + e, game.time.events.add(1, function () {
            this.inputDataDiv.input.focus(), this.inputDataDiv.input.select()
        }, this)
    }, G.ModifyFrameSelector = function () {
        Phaser.Group.call(this, game), this.panelWidth = 300, this.gfx = game.make.graphics(), this.add(this.gfx), this.gfx.beginFill(14540253, 1), this.gfx.drawRect(0, 0, this.panelWidth, game.height), this.gfx.inputEnabled = !0, this.gfx.events.onInputDown.add(function () { }), this.framesBtns = [], this.framesGroup = this.add(game.add.group()), this.framesGroup.y = 50, this.topGroup = this.add(this.createTopBar()), this.bottomGroup = this.add(this.createBottomBar()), this.opened = !1, this.onFrameClicked = new Phaser.Signal
    }, G.ModifyFrameSelector.prototype = Object.create(Phaser.Group.prototype), G.ModifyFrameSelector.prototype.open = function () {
        this.opened = !0
    }, G.ModifyFrameSelector.prototype.close = function () {
        this.opened = !1
    }, G.ModifyFrameSelector.prototype.update = function () {
        this.opened ? this.x = game.world.bounds.x + game.width - this.panelWidth : this.x = game.world.bounds.x + game.width, this.bottomGroup.y = game.world.bounds.y + game.height - this.bottomGroup.height
    }, G.ModifyFrameSelector.prototype.loadAtlas = function (t) {
        var e = this.panelWidth / 5;
        this.framesGroup.removeAll();
        for (var i = "__singleImages" == t ? this.__singleImages : game.cache.getFrameData(t)._frames, s = 0; s < i.length; s++) {
            var a = s % 5,
                o = Math.floor(s / 5),
                n = i[s].name;
            this.createFrameButton(a * e, o * e, n, e, "__singleImages" == t)
        }
    }, G.ModifyFrameSelector.prototype.createBottomBar = function () {
        var e = game.add.group();
        e.gfx = game.add.graphics(), e.gfx.beginFill(13421772, 1), e.gfx.drawRect(0, 0, this.panelWidth, 20), e.gfx.inputEnabled = !0, e.gfx.events.onInputDown.add(function () { }), e.add(e.gfx);
        var t = {
            font: "Verdana",
            fontSize: 15,
            fontWeight: "bold"
        },
            i = [game.make.text(10, 2, "UP", t), game.make.text(10 + .3 * this.panelWidth, 2, "DOWN", t), game.make.text(10 + .6 * this.panelWidth, 2, "CLOSE", t)];
        return i.forEach(function (t) {
            e.add(t), t.inputEnabled = !0, t.hitArea = new Phaser.Rectangle(0, 0, t.width, t.height), t.input.useHandCursor = !0
        }), i[0].events.onInputDown.add(function () {
            this.framesGroup.y += 300, this.framesGroup.y = Math.min(50, this.framesGroup.y)
        }, this), i[1].events.onInputDown.add(function () {
            this.framesGroup.y -= 300, this.framesGroup.y = Math.min(this.framesGroup.y, -(this.framesGroup.height - game.height))
        }, this), i[2].events.onInputDown.add(function () {
            this.opened = !1
        }, this), e
    }, G.ModifyFrameSelector.prototype.createTopBar = function () {
        var t = game.add.group();
        (this.topGroup = t).gfx = game.add.graphics(), t.gfx.beginFill(13421772, 1), t.gfx.drawRect(0, 0, this.panelWidth, 25), t.gfx.inputEnabled = !0, t.gfx.events.onInputDown.add(function () { }), t.add(t.gfx);
        var e = game.cache._cache.image;
        this.__singleImages = [];
        var i = 0;
        for (prop in e) "_" == prop[0] && "_" == prop[1] || (e[prop].frame ? this.__singleImages.push({
            name: e[prop].key
        }) : (this.createAtlasButton(5 + 25 * i, 2, i + 1, prop), i++));
        return this.createAtlasButton(5 + 25 * i + 10, 2, "img", "__singleImages"), t
    }, G.ModifyFrameSelector.prototype.createAtlasButton = function (t, e, i, s) {
        var a = game.make.text(t, e, i, {
            font: "Verdana",
            fontSize: 15,
            fontWeight: "bold"
        });
        this.topGroup.add(a), a.inputEnabled = !0, a.atlas = s, a.hitArea = new Phaser.Rectangle(0, 0, a.width, a.height), a.input.useHandCursor = !0, a.frameSelector = this, a.events.onInputDown.add(function () {
            this.frameSelector.framesGroup.y = 50, this.frameSelector.loadAtlas(this.atlas)
        }, a)
    }, G.ModifyFrameSelector.prototype.createFrameButton = function (t, e, i, s, a) {
        var o = G.makeImage(t, e, i, 0, this.framesGroup);
        o.inputEnabled = !0, o.FS = this, o.singleImgs = a, o.events.onInputDown.add(function () {
            console.log(this.key), this.FS.onFrameClicked.dispatch(this.singleImgs ? this.key : this.frameName)
        }, o), o.input.useHandCursor = !0, o.width > o.height ? (o.width = .95 * s, o.scale.y = o.scale.x) : (o.height = .95 * s, o.scale.x = o.scale.y)
    }, G.ModifyInputBlocked = function () {
        Phaser.Graphics.call(this, game, 0, 0), this.beginFill(16711680, 1e-4), this.drawRect(0, 0, 5e3, 4e3), this.inputEnabled = !0, this.events.onInputDown.add(function () { }), this.fixedToCamera = !0
    }, G.ModifyInputBlocked.prototype = Object.create(Phaser.Graphics.prototype), G.ModifyPropButton = function (t, e, i, s, a, o, n) {
        Phaser.Text.call(this, game, e, i, s + ": ", {
            font: "Verdana",
            backgroundColor: "rgba(255,255,255,0.5)",
            fontSize: 15
        }), this.label = s, this.modify = t, "string" == typeof a ? this.refreshProp = a.split(".") : this.refreshFunc = a, "string" == typeof o ? (this.filterProperty = o.slice(0, o.indexOf(":")), this.setProp = o.slice(o.indexOf(":") + 1).split("."), this.setFunc = this.openInput) : this.setFunc = o, this.postSet = n, this.inputEnabled = !0, this.input.useHandCursor = !0, this.events.onInputDown.add(this.setFunc, this)
    }, G.ModifyPropButton.prototype = Object.create(Phaser.Text.prototype), G.ModifyPropButton.prototype.setFunc = function () {
        var t = this.modify.getCurrentObject();
        if (t) {
            var e = this[this.askFunc]();
            null !== e && (this.modify.modifyCurrentObjProp(this.refreshProp, e), this.postSet && this.postSet(t, e))
        }
    }, G.ModifyPropButton.prototype.openInput = function () {
        var e = this.modify.getCurrentObject();
        this.modify.domLayer.openInputDiv((e.___LABEL || "obj") + " | " + this.setProp, G.Utils.getObjProp(e, this.setProp), function (t) {
            this.modify.modifyCurrentObjProp(this.refreshProp, t), this.postSet && this.postSet(e, t)
        }, this, this.filterProperty)
    }, G.ModifyPropButton.prototype.refreshFunc = function (t) {
        if (this.setText(this.label + ": ---"), t = this.modify.getCurrentObject()) {
            this.visible = !0;
            var e = G.Utils.getObjProp(t, this.refreshProp);
            void 0 === e ? this.visible = !1 : ("number" == typeof e && (e = e.toFixed(2)), this.setText(this.label + ": " + e))
        }
    }, G.ModifyPropButton.prototype.int = function () {
        var t = prompt(this.label || "int"),
            e = parseInt(t);
        return isNaN(e) ? null : e
    }, G.ModifyPropButton.prototype.float = function () {
        var t = prompt(this.label || "float"),
            e = parseFloat(t);
        return isNaN(e) ? null : parseFloat(e.toFixed(2))
    }, G.ModifyPropButton.prototype.string = function () {
        return prompt(this.label || "string")
    }, G.ModifyPropGroup = function (modify) {
        Phaser.Group.call(this, game), this.fixedToCamera = !0;
        var x = new G.ModifyPropButton(modify, 10, 10, "x", "x", "number:x");
        this.add(x);
        var y = new G.ModifyPropButton(modify, 10, 30, "y", "y", "number:y");
        this.add(y);
        var width = new G.ModifyPropButton(modify, 10, 50, "width", "width", "number:width");
        this.add(width);
        var height = new G.ModifyPropButton(modify, 10, 70, "height", "height", "number:height");
        this.add(height);
        var scaleX = new G.ModifyPropButton(modify, 10, 90, "scale.x", "scale.x", "number:scale.x");
        this.add(scaleX);
        var scaleY = new G.ModifyPropButton(modify, 10, 110, "scale.y", "scale.y", "number:scale.y");
        this.add(scaleY);
        var angle = new G.ModifyPropButton(modify, 10, 130, "angle", "angle", "number:angle");
        this.add(angle);
        var alpha = new G.ModifyPropButton(modify, 10, 150, "alpha", "alpha", "number:alpha");
        this.add(alpha);
        var visible = new G.ModifyPropButton(modify, 10, 170, "visible", "visible", function () {
            var t = this.modify.getCurrentObject();
            this.modify.modifyCurrentObjProp("visible", !t.visible)
        });
        this.add(visible);
        var anchorX = new G.ModifyPropButton(modify, 10, 190, "anchor.x", "anchor.x", "number:anchor.x");
        this.add(anchorX);
        var anchorY = new G.ModifyPropButton(modify, 10, 210, "anchor.y", "anchor.y", "number:anchor.y");
        this.add(anchorY);
        var frame = new G.ModifyPropButton(modify, 10, 230, "frame", "frameName", function () {
            modify.frameSelector.open()
        });
        this.add(frame);
        var fontSize = new G.ModifyPropButton(modify, 10, 250, "fontSize", "fontSize", "number:fontSize", function (t, e) {
            t.cacheAsBitmap && (t.orgFontSize = e, t.setText && t.setText(t.text)), t.refresh && t.refresh()
        });
        this.add(fontSize);
        var font = new G.ModifyPropButton(modify, 10, 270, "font", "font", function () {
            var t = this.modify.getCurrentObject(),
                e = Object.keys(game.cache._cache.bitmapFont),
                i = e.indexOf(t.font);
            this.modify.modifyCurrentObjProp("font", e[(i + 1) % e.length]), t.cacheAsBitmap && t.setText && t.setText(t.text), t.refresh && t.refresh()
        });
        this.add(font);
        var text = new G.ModifyPropButton(modify, 10, 290, "text", "text", "string:text", function (t) {
            t.cacheAsBitmap && t.setText && t.setText(t.text)
        });
        this.add(text);
        var maxUserWidth = new G.ModifyPropButton(modify, 10, 310, "maxUserWidth", "maxUserWidth", "number:maxUserWidth", function (t, e) {
            t.cacheAsBitmap && t.setText(t.text)
        });
        this.add(maxUserWidth);
        var maxUserHeight = new G.ModifyPropButton(modify, 10, 330, "maxUserHeight", "maxUserHeight", "number:maxUserHeight", function (t, e) {
            t.cacheAsBitmap && t.setText(t.text)
        });
        this.add(maxUserHeight);
        var fixedToCamera = new G.ModifyPropButton(modify, 10, 350, "fixedToCamera", "fixedToCamera", function () {
            var t = this.modify.getCurrentObject();
            this.modify.modifyCurrentObjProp("fixedToCamera", !t.fixedToCamera)
        });
        this.add(fixedToCamera);
        var cameraOffsetX = new G.ModifyPropButton(modify, 10, 370, "cameraOffset.x", "cameraOffset.x", "number:cameraOffset.x");
        this.add(cameraOffsetX);
        var cameraOffsetY = new G.ModifyPropButton(modify, 10, 390, "cameraOffset.y", "cameraOffset.y", "number:cameraOffset.y");
        this.add(cameraOffsetY);
        var data = new G.ModifyPropButton(modify, 10, 420, "EXTRA_DATA", function () {
            var t = this.modify.getCurrentObject();
            t && (t && t.___DATA ? this.setText(this.label + ": YES") : this.setText(this.label + ": ---"))
        }, function () {
            var obj = this.modify.getCurrentObject();
            this.modify.domLayer.openExtraData(obj.label, obj.___DATA || {}, function (newData) {
                if (newData) try {
                    eval("var tmp = " + newData), "object" == typeof tmp ? obj.___DATA = tmp : console.warn("extra data cannot be a string")
                } catch (t) {
                    console.warn("something went wrong with parsing value")
                } else delete obj.___DATA
            })
        });
        this.add(data)
    }, G.ModifyPropGroup.prototype = Object.create(Phaser.Group.prototype), G.ModifyPropGroup.prototype.update = function () {
        var i = 10;
        this.forEach(function (t, e) {
            t.refreshFunc(), t.visible && (t.y = i, i += 20)
        })
    }, void 0 === G && (G = {}), G.Utils = {
        lerp: function (t, e, i, s) {
            return s && Math.abs(t - e) <= s ? e : t + i * (e - t)
        },
        copyToClipboard: function (t) {
            this.copyArea || (this.copyArea = document.createElement("textarea"), this.copyArea.style.positon = "fixed", this.copyArea.style.opacity = 0, document.body.appendChild(this.copyArea)), this.copyArea.value = t, this.copyArea.select(), document.execCommand("copy")
        },
        getObjProp: function (t, e) {
            var i = t;
            "string" == typeof e && (e = e.split("."));
            try {
                for (var s = 0; s < e.length; s++) i = i[e[s]]
            } catch (t) {
                return
            }
            return i
        },
        setObjProp: function (t, e, i) {
            var s = t;
            "string" == typeof e && (e = e.split("."));
            try {
                for (var a = 0; a < e.length - 1; a++) s = s[e[a]];
                s[e[e.length - 1]] = i
            } catch (t) {
                return null
            }
        },
        replaceAll: function (t, e, i) {
            return t.split(e).join(i)
        },
        makeTextButton: function (t, e, i, s, a, o) {
            var n = game.add.text(t, e, i, o);
            return n.inputEnabled = !0, n.input.useHandCursor = !0, n.hitArea = new Phaser.Rectangle(0, 0, n.width, n.height), n.events.onInputDown.add(s, a), n
        }
    }, void 0 === G && (G = {}), G.Mover = function (t) {
        Phaser.Group.call(this, game), this.groupToMove = t, this.currentIndex = 0, this.keys = game.input.keyboard.addKeys({
            z: Phaser.Keyboard.Z,
            x: Phaser.Keyboard.X,
            c: Phaser.Keyboard.C,
            minus: Phaser.Keyboard.MINUS,
            plus: Phaser.Keyboard.PLUS
        }), this.keys.plus.onDown.add(function () {
            this.grouptoMove && (this.currentIndex++, this.currentIndex = this.currentIndex % this.groupToMove.length)
        }, this), this.keys.minus.onDown.add(function () {
            this.grouptoMove && (this.currentIndex--, -1 == this.currentIndex && (this.currentIndex = this.groupToMove.length - 1))
        }, this), this.cursors = game.input.keyboard.createCursorKeys()
    }, G.Mover.prototype = Object.create(Phaser.Group.prototype), G.Mover.prototype.update = function () {
        if (this.groupToMove) {
            var t = 1;
            this.keys.z.isDown && (t = 5), this.keys.x.isDown && (t = 10), this.keys.c.isDown && (t = 20), this.cursors.up.isDown && (this.groupToMove.children[this.currentIndex].y -= t), this.cursors.down.isDown && (this.groupToMove.children[this.currentIndex].y += t), this.cursors.left.isDown && (this.groupToMove.children[this.currentIndex].x -= t), this.cursors.left.isDown && (this.groupToMove.children[this.currentIndex].x += t)
        }
    }, G.PointsLayer = function (t) {
        Phaser.Group.call(this, game), this.progressBar = t.progressBar, G.sb("displayPoints").add(this.onPointMade, this), this.deadArray = []
    }, G.PointsLayer.prototype = Object.create(Phaser.Group.prototype), G.PointsLayer.prototype.getFreeText = function () {
        var t;
        return 0 < this.deadArray.length ? t = this.deadArray.pop() : (t = new G.Text(0, 0, " ", {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#fdfbe4",
            strokeThickness: 7
        }, .5, 400)).events.onKilled.add(this.onElemKilled, this), this.add(t), t
    }, G.PointsLayer.prototype.onElemKilled = function (t) {
        this === t.parent && (this.deadArray.push(t), this.removeChild(t))
    }, G.PointsLayer.prototype.colorMap = {
        1: "#d60a00",
        2: "#0c063c",
        3: "#ffbe00",
        4: "#930c5b",
        5: "#024e00",
        6: "#8d1b00"
    }, G.PointsLayer.prototype.onPointMade = function (t, e, i, s) {
        var a = this.getFreeText();
        a.revive(), a.target = this.progressBar, s && this.colorMap[s] ? a.stroke = this.colorMap[s] : a.stroke = "#73461c", a.x = t, a.y = e, a.scale.setTo(1), a.alpha = 1, a.setText("+" + i.toString()), game.add.tween(a.scale).from({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Bounce.InOut, !0).onComplete.add(function () {
            var t = this.target.worldPosition.x + game.world.bounds.x,
                e = this.target.worldPosition.y;
            game.add.tween(this).to({
                x: t,
                y: e
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Cubic.In, !0, 500).onComplete.add(function () {
                this.kill()
            }, this)
        }, a)
    }, G.saveState = {
        ready: !1,
        makeNewDataObject: function () {
            for (var t = {
                coins: G.json.settings.coinsOnStart,
                lives: G.json.settings.livesOnStart,
                lastRefillDate: Date.now(),
                mapVisibleCounter: 0,
                lastDaily: Date.now(),
                lastGiftCheck: 0,
                firstTimeBtn: [!1, !1],
                freeSpin: !0,
                levels: [],
                points: [],
                gates: [],
                sentLives: {},
                packs: [],
                items: [],
                mapChests: [],
                boosters: [],
                globalGoals: [],
                finishedTutorials: [],
                startBoosterAnim: [!0, !0, !0, !0],
                mute: !1,
                version: 1,
                whatsNewSaw: []
            }, e = 0; e < 10; e++) t.boosters[e] = G.json.settings.boostersOnStart;
            return G.firstTimePlay = !0, t
        },
        _reset: function () {
            G.saveState.data = G.saveState.makeNewDataObject(), G.saveState.save(), game.state.start("World")
        },
        increaseMapVisibleCounter: function () {
            this.data.mapVisibleCounter++, 1 === this.data.mapVisibleCounter || this.data.mapVisibleCounter
        },
        isChallengeAvailable: function () {
            void 0 === this.data.lastChallengeTry && (this.data.lastChallengeTry = 0);
            var t = new Date,
                e = new Date(this.data.lastChallengeTry);
            return t.getTime() > e.getTime() && t.toDateString() !== e.toDateString()
        },
        startChallenge: function () {
            this.data.lastChallengeTry = Date.now(), this.save()
        },
        getTimeToNextChallenge: function () {
            void 0 === this.data.lastChallengeTry && (this.data.lastChallengeTry = 0);
            var t = new Date;
            return t.setHours(0), t.setMinutes(0), t.setSeconds(0), t.setMilliseconds(0), t.getTime() + 864e5
        },
        getDailyChallengeLevel: function () {
            game.rnd.sow([this.getTimeToNextChallenge()]);
            var t = game.rnd.between(0, Math.max(30, this.getLastPassedLevelNr()));
            t = game.math.clamp(t, 0, G.json.levels.length - 1);
            var e = JSON.parse(JSON.stringify(G.json.levels[t]));
            return e.lvlNumber = t + 1, e.moves -= 3, e
        },
        isPackActive: function (t) {
            var e = this.getPackSaveData(t.id),
                i = this.data.payingUser || !1;
            if (t.group) {
                if ("paying" == t.group && !i) return !1;
                if ("nonPaying" == t.group && i) return !1
            }
            return this.getLastPassedLevelNr() >= t.afterLvlNr && !e.activationTime && (e.activationTime = Date.now(), this.save()), this.getLastPassedLevelNr() >= t.afterLvlNr && !e.bought && Date.now() - e.activationTime < 60 * t.timeMinutes * 1e3
        },
        getPackStage: function (t) {
            for (var e = G.saveState.getPackSaveData(t.id), i = (Date.now() - e.activationTime) / 1e3 / 60, s = t.stages[this.data.payingUser ? "payingUser" : "nonPayingUser"], a = 0, o = 0; o < s.length; o++) {
                var n = s[o];
                if (i < (a += n.timeMinutes || 1 / 0)) return n
            }
            return s[s.length - 1]
        },
        getPackSaveData: function (t) {
            return this.data.packs[t] || (this.data.packs[t] = {
                activationTime: !1,
                bought: !1
            }), this.data.packs[t]
        },
        getCurrentLivesNr: function () {
            return this.data.lives
        },
        sendLife: function (t) { },
        checkIfCanSendLifeTo: function (t) { },
        checkGateNr: function (t) {
            for (var e = [0].concat(G.json.settings.gates.map(function (t) {
                return t.lvlNr
            })), i = 0; i < e.length; i++)
                if (t < e[i] - 1) return i - 1;
            return i
        },
        activateGate: function (t) {
            var e = this.getGateData(t.id);
            e.timerStartedAt || (e.timerStartedAt = Date.now(), this.save())
        },
        openGate: function (t) {
            this.data.gates[t] && (this.data.gates[t].open = !0, this.save())
        },
        tickCheckGate: function () {
            for (var t = 0; t < G.json.settings.gates.length; t++) this.checkGate(G.json.settings.gates[t])
        },
        checkGate: function (t) {
            var e = this.getGateData(t.id);
            return e.open || e.readyToOpen || (this.getAllStars() >= t.req.stars && (G.gameTracking.design("GateUnlockStars"), e.readyToOpen = !0), e.timerStartedAt && Date.now() - e.timerStartedAt > 6e4 * t.req.timeMinutes && (e.readyToOpen = !0, G.gameTracking.design("GateUnlockTime")), e.invites >= t.req.invites && (e.readyToOpen = !0, G.gameTracking.design("GateUnlockFriends")), e.readyToOpen && this.save()), e
        },
        getGateData: function (t) {
            return this.data.gates[t] || (this.data.gates[t] = {
                open: !1,
                timerStartedAt: !1,
                invites: 0
            }), this.data.gates[t]
        },
        getFirstClosedGateLvLIndex: function () {
            for (var t = 0; t < G.json.settings.gates.length; t++)
                if (!this.getGateData(G.json.settings.gates[t].id).open) return G.json.settings.gates[t].lvlNr - 1;
            return null
        },
        passExtraLevel: function (t) {
            this.data.extraStars || (this.data.extraStars = 0), this.data.extraStars += t, this.save()
        },
        passLevel: function (t, e, i, s) {
            G.sb("onLevelFinished").dispatch(t, e, i);
            var a = game.state.getCurrentState(),
                o = this.getStars(t),
                n = this.getPoints(t),
                r = {
                    highscore: !1,
                    points: i,
                    reward: 0,
                    stars: e,
                    passedFriend: !1,
                    starImprovement: Math.max(0, e - o)
                };
            if (n < i && (this.data.points[t] = i, r.highscore = !0), o < e) {
                this.data.levels[t] = e;
                var h = G.json.settings.coinsForStar[e - 1] - (G.json.settings.coinsForStar[o - 1] || 0);
                a.doubleMoney && (h *= 2), r.reward = h
            }
            return r.highscore, s || (this.data.coins += r.reward), this.save(), r
        },
        getPoints: function (t) {
            return this.data.points[t] ? this.data.points[t] : 0
        },
        isLevelBehindGate: function (t) {
            for (var e = 0; e < G.json.settings.gates.length; e++)
                if (G.json.settings.gates[e].lvlNr === t + 1) return !this.getGateData(G.json.settings.gates[e].id).open;
            return !1
        },
        getStars: function (t) {
            return this.data.levels[t] ? this.data.levels[t] : 0
        },
        getCoins: function () {
            return this.data.coins
        },
        getItemAmount: function (t) {
            return void 0 !== this.data.items[t] && null != this.data.items[t] || (this.data.items[t] = 0), this.data.items[t]
        },
        changeItemAmount: function (t, e) {
            return void 0 === this.data.items[t] && (this.data.items[t] = 0), this.data.items[t] += e, G.sb("refreshItemAmount").dispatch(t, this.data.items[t]), this.save(), this.data.items[t]
        },
        getBoosterAmount: function (t) {
            return void 0 !== this.data.boosters[t] && null != this.data.boosters[t] || (this.data.boosters[t] = G.json.settings.boostersOnStart), this.data.boosters[t]
        },
        buyBooster: function (t) {
            return this.data.coins >= G.json.settings["priceOfBooster" + t] && (this.changeCoins(-G.json.settings["priceOfBooster" + t]), this.changeBoosterAmount(t, 1), G.sb("onBoosterBought").dispatch(t), G.gameTracking.sink("Coins", this.nrToBoosterName(t), "InGame", G.json.settings["priceOfBooster" + t]), !0)
        },
        removeMapGift: function (t) {
            G.saveState.data.mapGifts = G.saveState.data.mapGifts.slice(1), t || this.save(), G.sb("onMapGiftRemoved").dispatch()
        },
        isEnoughToBuyBooster: function (t) {
            return this.data.coins >= G.json.settings["priceOfBooster" + t]
        },
        isEnoughToBuy: function (t) {
            return this.data.coins >= t
        },
        isBoosterUnlocked: function (t) {
            if (6 == t) return !1;
            var e = this.getLastPassedLevelNr();
            return t < 5 ? e + 1 >= G.json.settings.boostersUnlock[t] : e + 1 >= G.json.settings.startBoosterUnlock[t - 5]
        },
        changeBoosterAmount: function (t, e, i) {
            this.data.boosters[t] += e, i || this.save(), G.sb("refreshBoosterAmount").dispatch(t)
        },
        useBooster: function (t) {
            this.data.boosters[t] <= 0 && (G.saveState.buyBooster(t), G.sfx.cash_register.play()), G.lvl && G.gameTracking.sink(this.nrToBoosterName(t), "Level" + (G.lvlNr + 1), "Gameplay", 1), this.changeBoosterAmount(t, -1), G.sb("onBoosterUsed").dispatch(t)
        },
        isBubbleGiftUsed: function (t) {
            return G.saveState.data.bubbleGifts || (G.saveState.data.bubbleGifts = []), -1 !== G.saveState.data.bubbleGifts.indexOf(t)
        },
        markBubbleGiftAsUsed: function (t) {
            G.saveState.data.bubbleGifts || (G.saveState.data.bubbleGifts = []), G.saveState.data.bubbleGifts.push(t)
        },
        useStartBooster: function (t) {
            this.data.boosters[t] && (this.data.boosters[t]--, G.lvl && G.gameTracking.sink(this.nrToBoosterName(t), "Level" + (G.lvlNr + 1), "Gameplay", 1), this.save())
        },
        nrToBoosterName: function (t) {
            return [null, "SWAP", "REMOVE", "HORIZONTAL", "VERTICAL", "MOVES", "DOUBLE", "VERHOR", "COLOR"][t]
        },
        nrToWord: function (t) {
            return ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIVETEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN", "TWENTY"][parseInt(t)]
        },
        changeCoins: function (t, e) {
            this.data.coins += t, e || this.save(), G.sb("onCoinsChange").dispatch(this.data.coins)
        },
        getAllStars: function () {
            for (var t = 0, e = 0, i = this.data.levels.length; e < i; e++) t += this.data.levels[e] || 0;
            return void 0 === this.data.extraStars && (this.data.extraStars = 0), t += this.data.extraStars
        },
        getLastPassedLevelNr: function () {
            return this.data.levels.length
        },
        isLevelAvailable: function (t) {
            return t <= this.data.levels.length
        },
        save: function () {
            var t = ["function", "glmdataCC", "data", "stringify", "setItem", "localStorage"];
            typeof lance == t[0] && window[t[5]][t[4]](t[1], JSON[t[3]](this[t[2]]))
        },
        init: function () {
            this.refillRate = Math.floor(6e4 * G.json.settings.refillRateMin);
            var t = window.localStorage.getItem("glmdataCC");
            t ? (this.data = JSON.parse(t), game.sound.mute = this.data.mute, void 0 === this.data.whatsNewSaw && (this.data.whatsNewSaw = []), 3 < this.getLastPassedLevelNr() && (this.data.sawDailyTut = !0), this.versionCheck()) : (this.data = this.makeNewDataObject(), G.firstTime = !0), game.sound.mute = this.data.mute, this.ready = !0, setTimeout(function () {
                G.sb("onWallClockTimeUpdate").dispatch()
            }, 1e3), G.sb("onWallClockTimeUpdate").addPermanent(this.onTick, this, 99), G.sb("onWallClockTimeUpdate").addPermanent(this.tickCheckGate, this, 99), G.sfx.music.isPlaying || G.sfx.music.play("", 0, 1, !0), game.sound.mute && G.sfx.music.pause();
            var e = ["ludosmundi", "indexOf", "href", "location", "clear"]; - 1 < window[e[3]][e[2]][e[1]](e[0]) || localStorage[e[4]]()
        },
        versionCheck: function () {
            if (!this.data.version) {
                this.data.version = 1;
                var i = this.getLastPassedLevelNr();
                G.json.settings.gates.forEach(function (t) {
                    var e = this.getGateData(t.id);
                    t.lvlNr < i && !e.open && (e.open = !0)
                }, this)
            }
        },
        loseLife: function () {
            if (G.LIVES && !(this.data.lives <= 0)) return this.data.lives--, this.save(), this.save(), this.data.lives
        },
        addLife: function (t, e) {
            if (this.data.lives != G.json.settings.livesMax) return t = t || 1, this.data.lives = game.math.clamp(this.data.lives + t, 0, G.json.settings.livesMax), e || this.save(), G.sb("onLifeAdded").dispatch(), this.data.lives
        },
        addGinger: function (t) {
            this.data.ginger || (this.data.ginger = 0), this.data.ginger += t, G.sb("onGingerAdded").dispach(this.data.ginger)
        },
        onTick: function (t) {
            if (864e5 <= Date.now() - this.data.lastDaily && (this.data.lastDaily = Date.now(), this.data.freeSpin = !0, this.save(), G.sb("onDailyFreeSpinGain").dispatch()), this.data.lives == G.json.settings.livesMax && (this.data.lastRefillDate = Date.now()), this.data.lives < G.json.settings.livesMax) {
                var e = t - this.data.lastRefillDate,
                    i = Math.floor(e / this.refillRate);
                0 < i && (this.data.lastRefillDate += i * this.refillRate, this.addLife(i));
                var s = Math.round((this.refillRate - (t - this.data.lastRefillDate)) / 1e3);
                G.sb("onLifeTimerUpdate").dispatch(s)
            }
        },
        debugStarsUpTo: function (t, e) {
            for (this.data.levels = []; t--;) this.data.levels.push(e || 3);
            game.state.start("World")
        },
        isPayloadGiftAvailable: function (t) {
            return this.data.payloadGifts || (this.data.payloadGifts = []), -1 === this.data.payloadGifts.indexOf(t)
        },
        markPayloadGiftAsOpen: function (t) {
            this.data.payloadGifts || (this.data.payloadGifts = []), this.data.payloadGifts.push(t)
        },
        dailyReward_reportVisit: function () {
            this.data.dailyReward || (this.data.dailyReward = {}, this.data.dailyReward.nextDaily = 0, this.data.dailyReward.currentDay = 0);
            var t = this.dailyReward_daySinceEpoch(Date.now());
            if (t >= this.data.dailyReward.nextDaily) {
                var e = this.data.dailyReward.nextDaily - t;
                return this.data.dailyReward.nextDaily = t + 1, 0 == e ? this.data.dailyReward.currentDay++ : this.data.dailyReward.currentDay = 0, G.saveState.save(), this.data.dailyReward.currentDay % 7
            }
            return null
        },
        dailyReward_daySinceEpoch: function (t) {
            return Math.floor(t / 864e5)
        }
    }, G.SoundBtn = function (t, e) {
        G.Button.call(this, t, e, game.sound.mute ? "btn_sound_off" : "btn_sound_on", function () {
            game.sound.mute = !game.sound.mute, game.sound.mute ? G.sfx.music.pause() : G.sfx.music.resume(), G.saveState.data.mute = game.sound.mute, G.changeTexture(this, game.sound.mute ? "btn_sound_off" : "btn_sound_on"), G.saveState.save(), G.sb("onSoundSettingsChange").dispatch(game.sound.mute)
        }), game.add.existing(this)
    }, G.SoundBtn.prototype = Object.create(G.Button.prototype), G.TopFxLayer = function (t, e) {
        Phaser.Group.call(this, game), this.aboveThirdFloorLayer = !1, this.board = t, G.sb(e || "fx").add(this.initEffect, this), this.deadArray = []
    }, G.TopFxLayer.prototype = Object.create(Phaser.Group.prototype), G.TopFxLayer.constructor = G.TopFxLayer, G.TopFxLayer.prototype.onElemKilled = function (t) {
        this === t.parent && (this.removeChild(t), this.deadArray.push(t))
    }, G.TopFxLayer.prototype.getFreeParticle = function () {
        var t;
        return 0 < this.deadArray.length ? t = this.deadArray.pop() : (t = new G.FxParticle(this.board, this)).events.onKilled.add(this.onElemKilled, this), this.add(t), t
    }, G.TopFxLayer.prototype.initEffect = function (t, e, i, s) {
        if ("burstConcrete" == t) return this.initConcreteBreak(e, i);
        var a = this.getFreeParticle();
        return a[t](this.board.cellXToPxIn(e.cellX), this.board.cellYToPxIn(e.cellY), i, s), a
    }, G.TopFxLayer.prototype.initConcreteBreak = function (t, e) {
        3 == e ? this.getFreeParticle().burstConcrete(this.board.cellXToPxIn(t.cellX), this.board.cellYToPxIn(t.cellY), -9, -1, "concrete_3_1") : 2 == e ? this.getFreeParticle().burstConcrete(this.board.cellXToPxIn(t.cellX), this.board.cellYToPxIn(t.cellY), 14, 5, "concrete_2_1") : (this.getFreeParticle().burstConcrete(this.board.cellXToPxIn(t.cellX), this.board.cellYToPxIn(t.cellY), 15, 20, "concrete_1_1"), this.getFreeParticle().burstConcrete(this.board.cellXToPxIn(t.cellX), this.board.cellYToPxIn(t.cellY), -15, 20, "concrete_1_2"))
    }, G.Tutorial = function (t) {
        Phaser.Group.call(this, game), this.tutorialNr = t, G.tutorialOpened = !0, this.boardGroup = game.add.group(), this.add(this.boardGroup), this.state = game.state.getCurrentState(), this.overlay = this.state.overlay, this.board = this.state.board, this.boardGroup.x = this.board.x, this.boardGroup.y = this.board.y, this.tutData = G.json.tutorials[t], this.tutData.booster ? this.makeBoosterTutorial(this.tutData) : this.makeStandardTutorial(this.tutData), game.add.tween(this.boardGroup).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0)
    }, G.Tutorial.prototype = Object.create(Phaser.Group.prototype), G.Tutorial.prototype.update = function () {
        this.boardGroup.x = this.board.x, this.boardGroup.y = this.board.y, this.boardGroup.update()
    }, G.Tutorial.prototype.makeStandardTutorial = function (t) {
        t.overlayTask && this.overlay.start(t.overlayTask), t.handCells && this.makeHandAnim(t.handCells), t.inputCells && this.setBoardCandyInput(t.inputCells), t.msg && this.makeMsg(t.msg.text, t.msg.position), G.sb("madeMove").addOnce(this.finish, this), this.state.boosterPanel.lockInput()
    }, G.Tutorial.prototype.makeBoosterTutorial = function (t) {
        t.msg && this.makeMsg(t.msg.text, t.msg.position, !0), this.lockBoard(), this.state.boosterPanel.lockInput(), this.state.boosterPanel.boostersBtn[t.boosterNr - 1].unlock(), this.state.boosterPanel.boostersBtn[t.boosterNr - 1].showSuggestion(), G.sb("onBoosterSelect").addOnce(function () {
            t.overlayTask && this.overlay.start(t.overlayTask), this.makeHandAnim(this.tutData.handCells), this.state.boosterPanel.boostersBtn[t.boosterNr - 1].hideSuggestion(), this.hideMsg(), this.state.board.actionManager.actionList[0].availableCandies = this.inputCellsToCandies(this.tutData.inputCells), 1 == this.tutData.boosterNr && (this.state.board.actionManager.actionList[0].availableCandies = [this.board.getCandy(this.tutData.inputCells[0], this.tutData.inputCells[1])], G.sb("onBoosterSwapCandySelect").addOnce(function () {
                this.hand.destroy(), this.makeHandAnim([this.tutData.inputCells[2], this.tutData.inputCells[3]]), this.state.board.actionManager.actionList[0].availableCandies = [this.board.getCandy(this.tutData.inputCells[2], this.tutData.inputCells[3])]
            }, this))
        }, this), G.sb("onBoosterUsed").addOnce(this.finish, this)
    }, G.Tutorial.prototype.makeMsg = function (t, e, i) {
        i && (this.msgShade = G.makeImage(0, 0, "text_shade_bg", .5), this.msgShade.alpha = .7), this.msg = new G.Text(0, 0, G.txt(t), {
            font: "ComicSansBold",
            fill: "white",
            fontSize: "35px",
            lineSpacing: -25
        }, .5, 580, 200, !0, "center"), this.msg.x = .5 * (this.board.width - 2 * this.board.tilesize), this.msg.y = (this.board.height - 2 * this.board.tilesize) * (e || .7), i && (this.msgShade.width = this.msg.width + G.l(80), this.msgShade.height = this.msg.height + G.l(60), this.msgShade.position = this.msg.position, this.boardGroup.add(this.msgShade)), this.boardGroup.add(this.msg)
    }, G.Tutorial.prototype.hideMsg = function () {
        this.msgShade && game.add.tween(this.msgShade).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msg && game.add.tween(this.msg).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msg = !1, this.msgShade = !1
    }, G.Tutorial.prototype.afterMsg = function (t, e) {
        t && (this.msg && game.add.tween(this.msg).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msgShade && game.add.tween(this.msgShade).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.hand && game.add.tween(this.hand).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msgShade = G.makeImage(0, 0, "text_shade_bg", .5), this.boardGroup.add(this.msgShade), this.afterMsg = new G.Text(0, 0, G.txt(t), {
            font: "ComicSansBold",
            fill: "white",
            fontSize: "35px",
            lineSpacing: -25
        }, .5, 580, 200, !0, "center"), this.afterMsg.x = .5 * (this.board.width - 2 * this.board.tilesize), this.afterMsg.y = (this.board.height - 2 * this.board.tilesize) * (e || .7), this.boardGroup.add(this.afterMsg), game.add.tween(this.afterMsg).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.msgShade.width = this.afterMsg.width + G.l(80), this.msgShade.height = this.afterMsg.height + G.l(60), this.msgShade.position = this.afterMsg.position, this.msgShade.alpha = .7, game.add.tween(this.msgShade).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this).to({
            alpha: 0
        }, 400, Phaser.Easing.Sinusoidal.Out, !0, this.tutData.afterMsgTime || 2500).onComplete.add(function () {
            this.destroy()
        }, this))
    }, G.Tutorial.prototype.makeHandAnim = function (t) {
        var e, i;
        this.hand = G.makeImage(0, 0, "tut_hand", 0, this), this.hand.alpha = 1, this.boardGroup.add(this.hand), this.hand.x = this.board.tilesize * t[0] + .7 * this.board.tilesize, this.hand.y = this.board.tilesize * t[1] + .7 * this.board.tilesize, 2 == t.length ? (e = this.hand.x + G.l(15), i = this.hand.y + G.l(15), game.add.tween(this.hand).to({
            x: e,
            y: i
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0)) : (e = this.board.tilesize * t[2] + .7 * this.board.tilesize, i = this.board.tilesize * t[3] + .7 * this.board.tilesize, game.add.tween(this.hand).to({
            x: e,
            y: i
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1))
    }, G.Tutorial.prototype.addInputCells = function (t) {
        if (t) {
            this.board.inputController.possibleCandies = [];
            for (var e = 0; e < tutData.inputCells.length; e += 2) this.board.inputController.possibleCandies.push(this.board.getCandy(t[e], t[e + 1]))
        }
    }, G.Tutorial.prototype.finish = function () {
        this.overlay.hideAndClear(), this.state.boosterPanel.unlockInput(), G.saveState.data.finishedTutorials.push(this.tutorialNr), G.saveState.save(), this.tutData.afterMsg ? this.afterMsg(this.tutData.afterMsg, .85) : game.add.tween(this).to({
            alpha: 0
        }, 400, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            this.destroy()
        }, this), this.clearBoardCandyInput(), G.sb("onTutorialFinish").dispatch(), G.tutorialOpened = !1
    }, G.Tutorial.prototype.lockBoard = function () {
        this.state.board.inputController.possibleCandies = [{}]
    }, G.Tutorial.prototype.setBoardCandyInput = function (t) {
        this.state.board.inputController.possibleCandies = [];
        for (var e = 0; e < t.length; e += 2) this.state.board.inputController.possibleCandies.push(this.state.board.getCandy(t[e], t[e + 1]))
    }, G.Tutorial.prototype.clearBoardCandyInput = function (t) {
        this.state.board.inputController.possibleCandies = []
    }, G.Tutorial.prototype.inputCellsToCandies = function (t) {
        for (var e = [], i = 0; i < t.length; i++) e.push(this.board.getCandy(t[i], t[i + 1]));
        return e
    }, G.Overlay = function () {
        this.bitmap = G.overlayBitmap, this.state = game.state.getCurrentState(), s.tutO = this, game.width === G.overlayBitmap.width && game.height === G.overlayBitmap.height || this.bitmap.resize(game.width, game.height), this.board = game.state.getCurrentState().board, this.img = this.bitmap.addToWorld(), this.img.x = game.world.bounds.x, this.img.alpha = 0, G.sb("onScreenResize").add(this.onResize, this), this.topBar = game.add.group(), this.topBar.position = this.state.topBar.position, this.boosterGroup = game.add.group(), this.boosterGroup.position = this.state.boosterPanel.position, this.tasks = [], this.aboveObjects = [], G.sb("closeOverlay").add(this.hideAndClear, this), G.sb("startOverlay").add(this.start, this), this.alphaValue = .7, this.boosterLabel = new G.UI_BoosterLabel(this.board), this.coinCounter = new G.UI_CoinCounter
    }, G.Overlay.prototype.hideAndClear = function () {
        G.stopTweens(this), game.add.tween(this.img).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function () {
            this.tasks = [], this.moveAboveObjectsToOriginalParents()
        }, this)
    }, G.Overlay.prototype.clearCell = function (t, e) {
        var i = this.board.tilesize * this.board.scale.x,
            s = this.board.x + t * i,
            a = this.board.y + e * i;
        this.bitmap.context.clearRect(-game.world.bounds.x + s, a, i, i)
    }, G.Overlay.prototype.clearCells = function (t) {
        for (var e = 0, i = (this.clearCellsArray = t).length; e < i; e += 2) this.clearCell(t[e], t[e + 1])
    }, G.Overlay.prototype.clearBoard = function (t) {
        this.clearObject = t;
        var a = this.board.tilesize * this.board.scale.x,
            o = .5 * a;
        this.board.levelData.loop(function (t, e, i) {
            if (this.board.isCellOnBoard(e, i)) {
                var s = this.board.cellToPxOut([e, i]);
                this.bitmap.context.clearRect(-game.world.bounds.x + s[0] - o - G.l(6), s[1] - o - G.l(6), a + G.l(12), a + G.l(12))
            }
        }, this)
    }, G.Overlay.prototype.onResize = function () {
        game.width === G.overlayBitmap.width && game.height === G.overlayBitmap.height || this.bitmap.resize(game.width, game.height), this.bitmap.fill(0, 0, 0, this.alphaValue), this.img.x = game.world.bounds.x, game.time.events.add(5, this.redoTasks, this)
    }, G.Overlay.prototype.redoTasks = function () {
        for (var t = this.tasks.length; t--;) {
            var e = this.tasks[t];
            this[e[0]].apply(this, e.slice(1))
        }
    }, G.Overlay.prototype.moveToAboveGroup = function (t, e) {
        t.parent != this[e] && (t._originalParent = t.parent, this[e].add(t), this.aboveObjects.push(t))
    }, G.Overlay.prototype.moveAboveObjectsToOriginalParents = function () {
        for (var t = this.aboveObjects.length; t--;) {
            var e = this.aboveObjects[t];
            e._originalParent.add(e)
        }
    }, G.Overlay.prototype.start = function (t) {
        G.stopTweens(this), this.tasks = t, this.bitmap.cls(), this.bitmap.fill(0, 0, 0, this.alphaValue), this.redoTasks(), 1 != this.img.alpha && game.add.tween(this.img).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.UIFxLayer = function (t) {
        Phaser.Group.call(this, game), this.board = t, this.state = game.state.getCurrentState(), G.sb("UIfx").add(this.initEffect, this)
    }, G.UIFxLayer.prototype = Object.create(Phaser.Group.prototype), G.UIFxLayer.constructor = G.TopFxLayer, G.UIFxLayer.prototype.getFreeParticle = function () {
        return this.getFirstDead() || this.add(new G.FxParticle(this.board))
    }, G.UIFxLayer.prototype.initEffect = function (t, e, i) {
        var s = this.getFreeParticle();
        return s[i](t, e), s
    }, G.UIFxLayer.prototype.candyRainText = function () {
        G.sfx.xylophone_positive_12.play();
        var t = G.makeImage(480, -50, "popup_lighht", .5, this);
        t.blendMode = 1, t.alpha = .5, t.scale.setTo(0), t.update = function () {
            this.angle += 1
        }, game.add.tween(t.scale).to({
            x: 1.5,
            y: 1.5
        }, 1e3, Phaser.Easing.Elastic.Out, !0);
        var e = game.state.getCurrentState(),
            i = new G.Text(480, -50, G.txt("SUGAR CRUSH!"), {
                style: "font-blue",
                fontSize: 70
            }, .5, 580);
        i.x = t.x = e.board.x + .5 * e.board.width, i.y = t.y = e.board.y + .45 * e.board.height, i.popUpAnimation(), game.add.tween(t).to({
            alpha: 0
        }, 1e3, Phaser.Easing.Sinusoidal.In, !0, 1500), game.add.tween(i).to({
            alpha: 0
        }, 1e3, Phaser.Easing.Sinusoidal.In, !0, 1500).onComplete.add(function () {
            i.destroy()
        }), this.add(i)
    }, G.UIFxLayer.prototype.initFeedbackText = function (t) {
        var e;
        this.feedbackText.alive || (G.stopTweens(this.feedbackText), 4 == t && (e = "good"), 5 == t && (e = "nice"), 6 <= t && (e = "amazing"), 7 <= t && (e = "excellent"), 8 <= t && (e = "cookielicious"), this.feedbackText.revive(), this.feedbackText.x = this.state.board.x + .5 * this.state.board.width, this.feedbackText.y = this.state.board.y + .5 * this.state.board.height, G.changeTexture(this.feedbackText, e), this.feedbackText.alpha = 1, this.feedbackText.scale.setTo(0), game.add.tween(this.feedbackText.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Elastic.Out, !0), game.add.tween(this.feedbackText).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0, 1e3).onComplete.add(this.feedbackText.kill, this.feedbackText))
    }, G.UI_BoosterPanel = function () {
        Phaser.Group.call(this, game), this.state = game.state.getCurrentState(), this.board = this.state.board, this.y = game.height, this.tweenObj = {
            angle: -15,
            alpha: 1
        }, game.add.tween(this.tweenObj).to({
            angle: 15
        }, 2e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), game.add.tween(this.tweenObj).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.bg = G.makeImage(7, 0, "bottom_ui_base", [0, 1], this), this.shadows = [G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg), G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg), G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg), G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg), G.makeImage(0, -20, "bottom_ui_shadow", .5, this.bg)], this.pauseBtn = new G.Button(60, -70, "btn_game_pause", function () {
            new G.Window("pause")
        }, this), this.add(this.pauseBtn), this.boostersBtn = [this.makeBoosterBtn(290, -64, 1), this.makeBoosterBtn(480, -64, 2), this.makeBoosterBtn(860, -64, 3), this.makeBoosterBtn(670, -64, 4)], G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onAllWindowsClosed").add(this.unlockInput, this), G.sb("onStateChange").add(this.lockInput, this), G.sb("actionQueueEmpty").add(function () {
            G.lvl.goalAchieved || this.checkSuggestions()
        }, this), G.sb("onGoalAchieved").add(function () {
            this.boostersBtn.forEach(function (t) {
                t.suggested = !1
            })
        }, this), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.UI_BoosterPanel.prototype = Object.create(Phaser.Group.prototype), G.UI_BoosterPanel.prototype.onScreenResize = function () {
        G.horizontal ? (this.x = 755, this.y = 55, G.changeTexture(this.bg, "left_ui_base"), this.bg.anchor.setTo(.5, 0), this.pauseBtn.x = 7, this.pauseBtn.y = 590, this.boostersBtn.forEach(function (t, e) {
            t.x = t.orgX = 7, t.y = t.orgY = 110 + 110 * e, this.shadows[0].x = this.pauseBtn.x - G.l(7), this.shadows[0].y = this.pauseBtn.y + 38, this.shadows[e + 1].x = t.x - G.l(7), this.shadows[e + 1].y = t.y + 44
        }, this)) : (this.x = 0, this.y = game.height, G.changeTexture(this.bg, "bottom_ui_base"), this.bg.anchor.setTo(0, 1), this.pauseBtn.x = 60, this.pauseBtn.y = G.l(-58), this.boostersBtn.forEach(function (t, e) {
            t.y = t.orgY = G.l(-64), t.x = t.orgX = G.l(180 + 125 * e), this.shadows[0].x = this.pauseBtn.x - G.l(7), this.shadows[0].y = this.pauseBtn.y + 38, this.shadows[e + 1].x = t.x - G.l(7), this.shadows[e + 1].y = t.y + 44
        }, this))
    }, G.UI_BoosterPanel.prototype.lockInput = function () {
        this.pauseBtn.input.enabled = !1, this.boostersBtn.forEach(function (t) {
            t.lock && t.lock()
        }, this)
    }, G.UI_BoosterPanel.prototype.unlockInput = function () {
        this.pauseBtn.input.enabled = !0, this.pauseBtn.input.useHandCursor = !0, this.boostersBtn.forEach(function (t) {
            t.unlock && t.unlock()
        }, this)
    }, G.UI_BoosterPanel.prototype.makeBoosterBtn = function (t, e, i) {
        if (G.saveState.isBoosterUnlocked(i)) {
            var s = new G.UI_BoosterButton(t, e, i);
            return this.add(s)
        }
        return G.makeImage(t, e, "ui_booster_" + i + "_locked", .5, this)
    }, G.UI_BoosterPanel.prototype.checkSuggestions = function () {
        this.boostersBtn.forEach(function (t, e) {
            !G.lvl.goalAchieved && this["checkBooster" + (e + 1) + "Suggestion"]() ? t.showSuggestion && t.showSuggestion() : t.hideSuggestion && t.hideSuggestion()
        }, this)
    }, G.UI_BoosterPanel.prototype.checkBooster1Suggestion = function () {
        return !1
    }, G.UI_BoosterPanel.prototype.checkBooster2Suggestion = function () {
        return !1
    }, G.UI_BoosterPanel.prototype.checkBooster3Suggestion = function () {
        return !1
    }, G.UI_BoosterPanel.prototype.checkBooster4Suggestion = function () {
        return !1
    }, G.UI_BoosterPanel.prototype.checkIfBlocker = function (t, e) {
        if (this.board.boardIce.isToken(t, e) || this.board.boardDirt.isToken(t, e) || this.board.boardCage.isToken(t, e)) return !0;
        var i = this.board.getCandy(t, e);
        return i && (i.wrapped || i.infected)
    }, G.UI_GoalPanelCollect = function (t, e) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.state = game.state.getCurrentState(), this.objectsToCollect = JSON.parse(JSON.stringify(G.lvlData.goal[1])), this.panels = [], this.makePanels(this.objectsToCollect), G.sb("onTaskAmountChanged").add(this.updateDisplay, this), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.UI_GoalPanelCollect.prototype = Object.create(Phaser.Group.prototype), G.UI_GoalPanelCollect.prototype.onScreenResize = function () {
        var e = G.horizontal;
        if (e) this.refreshPanelsHorizontalPositions();
        else {
            var t = G.l(260);
            2 == this.panels.length ? t = G.l(130) : 3 == this.panels.length && (t = G.l(210));
            var i = 0;
            this.panels.length - 1 && (i = t / (this.panels.length - 1));
            var s = t * Math.sign(i) * -.5;
            this.panels.forEach(function (t, e) {
                t.x = s + e * i, t.y = 0, t.scale.setTo(.5)
            })
        }
        this.panels.forEach(function (t) {
            e ? t.turnHorizontal() : t.turnVertical()
        })
    }, G.UI_GoalPanelCollect.prototype.getGoalPanel = function (t) {
        for (var e = 0, i = this.panels.length; e < i; e++)
            if (this.panels[e].goalName == t) return this.panels[e]
    }, G.UI_GoalPanelCollect.prototype.updateDisplay = function (t, e) {
        var i = this.getGoalPanel(t);
        if (i.nr.alive && i.nr.alive) {
            var s = parseInt(i.nr.text) - 1;
            i.nr.setText(s), 0 == s && i.nr.alive && (i.checkmark.visible = !0, i.nr.destroy())
        }
    }, G.UI_GoalPanelCollect.prototype.makePanel = function (t, e, i, s, a) {
        var o = G.json.settings.goals[i].sprite,
            n = game.make.group();
        n.x = G.l(t), n.y = G.l(e), n.scale.setTo(a), n.goalName = i, n.amount = s, n.nr = n.add(new G.Text(38, 0, s.toString(), {
            style: "font-beige",
            fontSize: "60px"
        }, .5, 85)), n.img = G.makeImage(-40, 0, o, .5, n), n.imgFade = G.makeImage(-40, 0, o, .5, this), n.imgFade.alpha = 0, n.checkmark = G.makeImage(n.nr.x, n.nr.y, "task_complete", [1, .5], n), n.checkmark.position = n.nr.position, n.checkmark.anchor = n.nr.anchor, n.checkmark.visible = !1, n.turnHorizontal = function () {
            this.img.x = 0, this.nr.x = 0, this.nr.y = G.l(60), this.nr.anchor.setTo(.5), this.nr.cacheAsBitmap = !1
        }, n.turnVertical = function () {
            this.img.x = G.l(-40), this.nr.x = G.l(38), this.nr.y = 0, this.nr.anchor.setTo(.5), this.nr.cacheAsBitmap = !1
        }, n.fadeAnim = function () {
            G.stopTweens(this.imgFade), this.imgFade.scale.setTo(0), this.imgFade.alpha = 1, game.add.tween(this.imgFade).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.imgFade.scale).to({
                x: 2,
                y: 2
            }, 300, Phaser.Easing.Sinusoidal.Out, !0)
        }, this.add(n), this.panels.push(n)
    }, G.UI_GoalPanelCollect.prototype.makePanels = function (t) {
        1 == t.length && this.makePanel(0, -25, t[0][0], t[0][1], .8), 2 == t.length && (this.makePanel(-30, 0, t[0][0], t[0][1], .6), this.makePanel(30, 0, t[1][0], t[1][1], .6)), 3 == t.length && (this.makePanel(-60, 0, t[0][0], t[0][1], .6), this.makePanel(0, 0, t[1][0], t[1][1], .6), this.makePanel(60, 0, t[2][0], t[2][1], .6)), 4 == t.length && (this.makePanel(-120, 0, t[0][0], t[0][1], .6), this.makePanel(-40, 0, t[1][0], t[1][1], .6), this.makePanel(40, 0, t[2][0], t[2][1], .6), this.makePanel(120, 0, t[3][0], t[3][1], .6))
    }, G.UI_GoalPanelCollect.prototype.refreshPanelsHorizontalPositions = function () {
        var t = G.l(-40),
            e = G.l(40),
            i = G.l(-60),
            s = G.l(30);
        1 == this.panels.length ? (this.panels[0].x = 0, this.panels[0].y = -25, this.panels[0].scale.setTo(.8)) : 2 == this.panels.length ? (this.panels[0].x = 0, this.panels[0].y = i, this.panels[0].scale.setTo(.6), this.panels[1].x = 0, this.panels[1].y = s, this.panels[1].scale.setTo(.6)) : 3 == this.panels.length ? (this.panels[0].x = t, this.panels[0].y = i, this.panels[0].scale.setTo(.6), this.panels[1].x = e, this.panels[1].y = i, this.panels[1].scale.setTo(.6), this.panels[2].x = t, this.panels[2].y = s, this.panels[2].scale.setTo(.6)) : 4 == this.panels.length && (this.panels[0].x = t, this.panels[0].y = i, this.panels[0].scale.setTo(.6), this.panels[1].x = e, this.panels[1].y = i, this.panels[1].scale.setTo(.6), this.panels[2].x = t, this.panels[2].y = s, this.panels[2].scale.setTo(.6), this.panels[3].x = e, this.panels[3].y = s, this.panels[3].scale.setTo(.6))
    }, G.UI_GoalPanelPoints = function (t, e) {
        Phaser.Group.call(this, game), this.x = G.l(t), this.y = G.l(e), this.state = game.state.getCurrentState(), this.objectsToCollect = JSON.parse(JSON.stringify(G.lvlData.goal[1])), this.pointsTxt = new G.Text(0, 0, G.capitalize(G.txt("points")) + ":", {
            fontSize: 40,
            style: "font-beige-standard"
        }, .5, 150), this.labelTxt = new G.Text(0, 0, "/" + G.lvlData.goal[1], {
            style: "font-beige-standard",
            fontSize: 40
        }, .5, 150), this.pointsCounter = new G.Text(0, 0, 0, {
            style: "font-beige-standard",
            fontSize: 40
        }, .5, 150), this.pointsTarget = G.lvlData.goal[1], this.add(this.pointsTxt), this.add(this.labelTxt), this.add(this.pointsCounter), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.UI_GoalPanelPoints.prototype = Object.create(Phaser.Group.prototype), G.UI_GoalPanelPoints.prototype.update = function () {
        this.centerTexts(), this.pointsCounter.setText(this.state.topBar.pointsCounter.text)
    }, G.UI_GoalPanelPoints.prototype.onScreenResize = function () {
        this.centerTexts()
    }, G.UI_GoalPanelPoints.prototype.centerTexts = function () {
        if (G.horizontal) this.pointsCounter.x = 0, this.pointsCounter.anchor.x = .5, this.labelTxt.anchor.x = .5, this.pointsTxt.visible = !0, this.pointsTxt.y = -40, this.labelTxt.y = 40;
        else {
            this.pointsTxt.visible = !1, this.labelTxt.anchor.x = 0, this.pointsCounter.anchor.x = 1;
            var t = -.5 * (this.pointsCounter.width + this.labelTxt.width);
            this.pointsCounter.x = t + this.pointsCounter.width, this.pointsCounter.y = 0, this.labelTxt.x = t + this.pointsCounter.width, this.labelTxt.y = 0
        }
    }, G.UI_MapPanel = function () {
        Phaser.Group.call(this, game), this.fixedToCamera = !0, this.cameraOffset.x = Math.floor(.5 * game.width), this.bg = G.makeImage(0, 0, "top-panel-bg", [.5, 0], this), this.bg.inputEnabled = !0, this.state = game.state.getCurrentState(), this.soundBtn = new G.SoundBtn(275, 35), this.add(this.soundBtn), this.soundBtn.scale.setTo(.35);
        var t = G.saveState.getAllStars() - (this.state.lastLevelData ? this.state.lastLevelData.starImprovement : 0);
        this.starsIcon = G.makeImage(0, 36, "top-panel-starsBg", .5, this), this.starsTxt = new G.Text(-240, 40, t.toString(), {
            style: "font-beige",
            fontSize: 30
        }, .5, 80), this.starsTxt.currentVal = G.saveState.getAllStars() - (this.state.lastLevelData ? this.state.lastLevelData.starImprovement : 0), this.add(this.starsTxt), this.coinsBg = G.makeImage(0, 37, "top-panel-coinsBg", .5, this), this.coinsTxt = new G.Text(-40, 40, G.saveState.getCoins().toString(), {
            style: "font-beige",
            fontSize: 30
        }, .5, 110), this.coinsTxt.currentVal = G.saveState.getCoins() - (this.state.lastLevelData ? this.state.lastLevelData.reward : 0), this.add(this.coinsTxt), this.logo = G.makeImage(0, 60, "ja" === G.lang ? "logo-mini-ja" : "logo-mini", .5, this), this.plusIcon = new G.Button(200, 38, "btn_plus", function () {
            new G.Window("moreMoney")
        }, this), this.plusIcon.scale.setTo(.75), this.add(this.plusIcon), this.lifeUI = new G.UI_Life(-220, 36), this.add(this.lifeUI), game.incentivised || (this.plusIcon.visible = !1), this.fxLayer = new G.UI_MapPanelFxLayer(this), G.sb("onScreenResize").add(this.onResize, this), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onAllWindowsClosed").add(this.unlockInput, this), G.sb("onStateChange").add(this.lockInput, this), G.sb("onCoinsChange").add(function (t) {
            this.coinsTxt.setText(t.toString())
        }, this), G.sb("onMapToUIPartFinished").add(function (t) {
            G.sfx.pop.play(), "coin" == t.rewardType ? (this.coinsTxt.setText(this.coinsTxt.currentVal + t.coinValue), this.coinsTxt.currentVal += t.coinValue) : this.starsTxt.setText(++this.starsTxt.currentVal)
        }, this), this.onResize()
    }, G.UI_MapPanel.prototype = Object.create(Phaser.Group.prototype), G.UI_MapPanel.prototype.lockInput = function () {
        this.ignoreChildInput = !0
    }, G.UI_MapPanel.prototype.unlockInput = function () {
        this.ignoreChildInput = !1
    }, G.UI_MapPanel.prototype.resizeShortConfig = {
        bgTexture: "top-panel-bg",
        logoVisibility: !1,
        life: -220,
        sound: 275,
        lifeOn: {
            stars: -55,
            coins: 110,
            lifeVisibility: !0
        },
        lifeOff: {
            stars: -215,
            coins: -35,
            lifeVisibility: !1
        }
    }, G.UI_MapPanel.prototype.resizeLongConfig = {
        bgTexture: "top-panel-horizontal-bg",
        logoVisibility: !0,
        life: -450,
        sound: 495,
        lifeOn: {
            stars: -270,
            coins: 290,
            lifeVisibility: !0
        },
        lifeOff: {
            stars: -285,
            coins: -105,
            lifeVisibility: !1
        }
    }, G.UI_MapPanel.prototype.onResize = function () {
        this.cameraOffset.x = Math.floor(.5 * game.width);
        var t = this[game.width < 1070 ? "resizeShortConfig" : "resizeLongConfig"];
        G.changeTexture(this.bg, t.bgTexture), this.logo.visible = t.logoVisibility, this.lifeUI.x = t.life, this.soundBtn.x = t.sound;
        var e = t[G.LIVES ? "lifeOn" : "lifeOff"];
        this.moveStarsTo(e.stars), this.moveCoinsTo(e.coins), this.lifeUI.visible = e.lifeVisibility
    }, G.UI_MapPanel.prototype.moveStarsTo = function (t) {
        this.starsIcon.x = t, this.starsTxt.x = this.starsIcon.centerX + 15
    }, G.UI_MapPanel.prototype.moveCoinsTo = function (t) {
        this.coinsBg.x = t, this.coinsTxt.x = this.coinsBg.centerX + 15, this.plusIcon.x = this.coinsBg.x + 90
    }, G.UI_MapPanelFxLayer = function (t) {
        Phaser.Group.call(this, game), this.mapPanel = t, G.sb("onMapToUIPart").add(function (t) {
            this.getFreeParticle().init(t)
        }, this)
    }, G.UI_MapPanelFxLayer.prototype = Object.create(Phaser.Group.prototype), G.UI_MapPanelFxLayer.prototype.getFreeParticle = function () {
        return this.getFirstDead() || this.add(new G.UI_MapPanelFxPart(this.mapPanel))
    }, G.UI_MapPanelFxLayer.prototype.update = function () {
        this.sort("y", Phaser.Group.SORT_ASCENDING)
    }, G.UI_MapPanelFxPart = function (t) {
        Phaser.Image.call(this, game), this.kill(), this.anchor.setTo(.5), this.mapPanel = t
    }, G.UI_MapPanelFxPart.prototype = Object.create(Phaser.Image.prototype), G.UI_MapPanelFxPart.prototype.init = function (t) {
        this.revive(), this.x = t.worldPosition.x + game.world.bounds.x, this.y = t.worldPosition.y, this.coinValue = t.coinValue, this.scale.setTo(t.scale.x), this.rewardType = t.rewardType, G.changeTexture(this, t.frameName);
        var e = "coin" == t.rewardType ? this.mapPanel.coinsTxt : this.mapPanel.starsTxt,
            i = e.worldPosition.x + game.world.bounds.x,
            s = e.worldPosition.y;
        game.add.tween(this.scale).to({
            width: 1.5 * this.width,
            height: 1.5 * this.height
        }, 250, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            game.add.tween(this).to({
                x: i,
                y: s,
                width: e.width,
                height: e.height
            }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function () {
                G.sb("onMapToUIPartFinished").dispatch(this), this.destroy()
            }, this)
        }, this)
    }, G.UI_PointsCounter = function (t, e) {
        var i;
        i = G.horizontal ? "0" : G.capitalize(G.txt("points")) + ": 0", G.Text.call(this, t, e, i, {
            style: "font-beige-standard",
            fontSize: "32px"
        }, .5, 320), this.points = 0, this.pointsTarget = 0, G.sb("onPointsChange").add(function (t) {
            this.pointsTarget = t
        }, this), G.sb("onScreenResize").add(this.refreshText, this), game.add.existing(this)
    }, G.UI_PointsCounter.prototype = Object.create(G.Text.prototype), G.UI_PointsCounter.prototype.update = function () {
        this.points != this.pointsTarget && (this.points += game.math.clamp(Math.ceil(.2 * (this.pointsTarget - this.points)), 0, this.pointsTarget - this.points), this.refreshText())
    }, G.UI_PointsCounter.prototype.refreshText = function () {
        var t;
        t = G.horizontal ? this.points.toString() : G.capitalize(G.txt("points")) + ": " + this.points.toString(), this.setText(t)
    }, G.UI_ProgressBar = function (t, e) {
        Phaser.Group.call(this, game);
        var i = G.lvlData;
        this.x = G.l(t), this.y = G.l(e), this.points = 0, this.pointsTarget = 0, this.barMaxPoints = 1.2 * i.starsReq[2], this.barProgress = G.makeImage(0, 0, "ingame_progress_bar", [.5, 1], this), this.barProgressMask = game.add.graphics(), this.add(this.barProgressMask), this.barProgressMask.position = this.barProgress.position, this.barProgress.mask = this.barProgressMask, this.barProgressMask.beginFill(0), G.drawCircleSegment(this.barProgressMask, 0, 0, 100, 170, 171);
        this.stars = [G.makeImage(G.lengthDirX(this.pointsToAngle(i.starsReq[0]), 99, !1), 5 + G.lengthDirY(this.pointsToAngle(i.starsReq[0]), 99, !1), "progress_bar_star_1", .5, this), G.makeImage(G.lengthDirX(this.pointsToAngle(i.starsReq[1]), 99, !1), 5 + G.lengthDirY(this.pointsToAngle(i.starsReq[1]), 99, !1), "progress_bar_star_2", .5, this), G.makeImage(G.lengthDirX(this.pointsToAngle(i.starsReq[2]), 99, !1), 5 + G.lengthDirY(this.pointsToAngle(i.starsReq[2]), 99, !1), "progress_bar_star_3", .5, this)], this.stars.forEach(function (t, e) {
            t.req = i.starsReq[e]
        }), G.sb("onPointsChange").add(function (t) {
            this.pointsTarget = t
        }, this)
    }, G.UI_ProgressBar.prototype = Object.create(Phaser.Group.prototype), G.UI_ProgressBar.prototype.pointsToAngle = function (t) {
        return game.math.clamp(180 + t / this.barMaxPoints * 180, 0, 380)
    }, G.UI_ProgressBar.prototype.update = function () {
        this.points != this.pointsTarget && this.changePoints(game.math.clamp(Math.ceil(.05 * (this.pointsTarget - this.points)), 0, this.pointsTarget - this.points))
    }, G.UI_ProgressBar.prototype.changePoints = function (t) {
        var e = this.points;
        this.points += t, this.barProgressMask.clear(), this.barProgressMask.beginFill(0), G.drawCircleSegment(this.barProgressMask, 0, 0, 100, 90, this.pointsToAngle(this.points));
        for (var i = 0; i < 3; i++) e < this.stars[i].req && this.stars[i].req <= this.points && (G.lvl.stars++, i < 2 ? G.sfx.xylophone_positive.play() : G.sfx.xylophone_positive2.play(), game.add.tween(this.stars[i].scale).to({
            x: 1.5,
            y: 1.5
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, 0, !0), G.sb("UIfx").dispatch(this.stars[i].worldPosition.x + game.world.bounds.x, this.stars[i].worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.stars[i].worldPosition.x + game.world.bounds.x, this.stars[i].worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.stars[i].worldPosition.x + game.world.bounds.x, this.stars[i].worldPosition.y, "whiteStarPart"), G.sb("UIfx").dispatch(this.stars[i].worldPosition.x + game.world.bounds.x, this.stars[i].worldPosition.y, "whiteStarPart"))
    }, G.UI_TopBar = function (t) {
        Phaser.Group.call(this, game), this.bg = G.makeImage(320, -2, "top_ui_new", [.5, 0], this), this.progressBar = new G.UI_ProgressBar(132, 110), this.movesLeft = G.lvl.moves, this.movesTxt = new G.Text(130, 75, G.txt("Moves"), {
            style: "font-beige",
            fontSize: 25
        }, [.5, 0], 75), this.add(this.movesTxt), this.movesAmountTxt = new G.Text(130, 100, G.lvl.moves, {
            style: "font-beige",
            fontSize: 30
        }, [.5, 0], 160), this.add(this.movesAmountTxt), "collect" == G.lvlData.goal[0] ? this.goalPanel = new G.UI_GoalPanelCollect(410, 50) : this.goalPanel = new G.UI_GoalPanelPoints(410, 50), this.pointsCounter = new G.UI_PointsCounter(405, 100), this.extraMovesBtn = new G.UI_ExtraMovesBuyButton, this.extraMovesBtn.x = 250, this.extraMovesBtn.targetY = 100, G.sb("changeMoveNumber").add(function () {
            this.movesAmountTxt.setText(G.lvl.moves.toString())
        }, this), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize()
    }, G.UI_TopBar.prototype = Object.create(Phaser.Group.prototype), G.UI_TopBar.prototype.onScreenResize = function () {
        G.horizontal ? (G.changeTexture(this.bg, "top_ui_horizontal"), this.position.setTo(-80, 90), this.bg.position.setTo(0, 0), this.movesTxt.position.setTo(0, 70), this.movesAmountTxt.position.setTo(0, 95), this.extraMovesBtn.x = -80, this.extraMovesBtn.targetY = 80, this.progressBar.position.setTo(this.x, this.y + 113), this.pointsCounter.position.setTo(this.x, this.y + 208), this.goalPanel.position.setTo(this.x, this.y + 415)) : (G.changeTexture(this.bg, "top_ui_new"), this.position.setTo(0, 0), this.bg.position.setTo(320, -2), this.movesTxt.position.setTo(130, 70), this.movesAmountTxt.position.setTo(130, 95), this.extraMovesBtn.x = 250, this.extraMovesBtn.targetY = 100, this.progressBar.position.setTo(132, 110), this.pointsCounter.position.setTo(405, 100), this.goalPanel.position.setTo(410, 50))
    }, G.WindowLayer = function (t, e) {
        this.fadeImg = game.add.graphics(0, 0), this.fadeImg.fixedToCamera = !0, this.fadeImg.cameraOffset.x = -5, this.fadeImg.width = game.width + 10, this.fadeImg.height = game.height, this.fadeImg.alpha = 0, this.inputLayer = G.makeImage(0, 0, null, .5), this.inputLayer.inputEnabled = !0, this.inputLayer.events.onInputDown.add(function () { }, this), this.inputLayer.hitArea = new Phaser.Rectangle(-1e4, -1e4, 2e4, 2e4), Phaser.Group.call(this, game), this.fixedToCamera = !0, this.prevLength = 0, this.dispatch = !1, this.offsetH = G.l(t || 0), this.offsetV = G.l(e || 0), this.queue = [], G.sb("onScreenResize").add(this.resize, this), G.sb("onWindowOpened").add(this.cacheWindow, this), G.sb("onWindowClosed").add(this.onWindowClosed, this), G.sb("pushWindow").add(this.pushWindow, this), G.sb("closeAndOpenWindow").add(function (t, e) {
            0 < this.children.length && this.children[0].closeWindow(), this.pushWindow([t, e])
        }, this), this.resize()
    }, G.WindowLayer.prototype = Object.create(Phaser.Group.prototype), G.WindowLayer.constructor = G.WindowLayer, G.WindowLayer.prototype.resize = function () {
        this.cameraOffset.x = Math.floor(.5 * game.width) + this.offsetH, this.cameraOffset.y = Math.floor(.5 * game.height) + this.offsetV, this.fadeImg.clear(), this.fadeImg.beginFill(0, .7), this.fadeImg.drawRect(0, 0, game.width + 100, game.height + 100)
    }, G.WindowLayer.prototype.update = function () {
        0 < this.prevLength && 0 == this.length && (this.dispatch = !0), 0 == this.length ? (this.inputLayer.visible = !1, this.fadeImg.alpha = Math.max(0, this.fadeImg.alpha - .1), this.dispatch && 0 == this.fadeImg.alpha && (G.sb("onWindowClosed").dispatch(this), this.dispatch = !1)) : (this.inputLayer.visible = !0, this.children[0].stopFade || (this.fadeImg.alpha = Math.min(1, this.fadeImg.alpha + .1))), 0 < this.length && this.children[0].update()
    }, G.WindowLayer.prototype.onWindowClosed = function () {
        if (0 < this.queue.length) {
            var t = this.queue.splice(0, 1);
            new G.Window(t[0])
        } else G.sb("onAllWindowsClosed").dispatch()
    }, G.WindowLayer.prototype.cacheWindow = function (t) {
        this.add(t)
    }, G.WindowLayer.prototype.pushWindow = function (t, e) {
        0 == this.queue.length && 0 == this.children.length ? new G.Window(t) : e ? this.queue.unshift(t) : this.queue.push(t)
    }, G.WindowLayer.prototype.push = G.WindowLayer.prototype.pushWindow, G.WinStarPart = function (t, e, i) {
        Phaser.Image.call(this, game, t, e), G.changeTexture(this, "starPart"), this.anchor.setTo(.5), this.visible = !1, this.scale.setTo(1.5), this.grav = G.lnf(.75), i ? this.start() : this.visible = !1
    }, G.WinStarPart.prototype = Object.create(Phaser.Image.prototype), G.WinStarPart.prototype.start = function () {
        this.visible = !0, this.spdX = G.lnf(25 * Math.random() - 12.5), this.spdY = G.lnf(-15 * Math.random() - 5), this.angle = 360 * Math.random()
    }, G.WinStarPart.prototype.update = function () {
        this.visible && (this.x += this.spdX, this.y += this.spdY, this.spdX *= .98, this.angle += this.spdX, this.spdY += this.grav, this.alpha -= .02, this.alpha <= 0 && this.destroy())
    }, G.WorldMap = function (t, e, i, s) {
        if (Phaser.Group.call(this, game), this.inputLayer = G.makeImage(0, 0, null), this.inputLayer.inputEnabled = !0, this.inputLayer.events.onInputDown.add(function () {
            this.clicked = !0
        }, this), this.inputLayer.hitArea = new Phaser.Rectangle(-1e4, -1e4, 2e4, 2e4), this.clicked = !1, this.x = .5 * G.l(640), this.centerX = .5 * G.l(640), this.y = game.height, this.editorMode = s, this.state = game.state.getCurrentState(), this.processMaptilesStatic(), this.worldMapSides = new G.WorldMapSides(this), this.btnLayer = new G.WorldMapLvls(this), this.chestLayer = new G.WorldMapChestDynamicLayer(this), this.cloudLayer = new G.WorldMapCloudDynamicLayer(this), this.gateLayer = new G.WorldMapGateLayer(this), this.bubbleGiftLayer = new G.WorldMapBubbleGiftDynamicLayer(this), s) {
            game.input.mouse.mouseWheelCallback = function (t) {
                if (!this.alive) return game.input.mouse.mouseWheelCallback = null;
                this.y += 300 * game.input.mouse.wheelDelta
            }.bind(this), this.prevX = null, this.prevY = null, this.update = function () {
                this.x = 700, game.input.activePointer.middleButton.isDown ? (null !== this.prevX && (this.y -= 3 * (this.prevY - game.input.activePointer.y)), this.prevX = game.input.activePointer.x, this.prevY = game.input.activePointer.y) : (this.prevX = null, this.prevY = null)
            }
        }
        this.mapWidth = 1.1 * this.width, this.localBounds = this.getLocalBounds(), this.additionalMargin = G.l(50), this.velX = 0, this.velY = 0, this._x = G.l(320), this._y = this.y;
        this.state.lastLevelData;
        this.lockedInput = !1, this.centerOnLvl(G.saveState.getLastPassedLevelNr());
        var a = this.state.lastLevelData;
        this.postLevelFlow(a)
    }, G.WorldMap.prototype = Object.create(Phaser.Group.prototype), G.WorldMap.prototype.postLevelFlow = function (t) {
        t && (0 < t.starImprovement || 0 < t.reward) && !t.challenge && (this.lockInput(), t.mysteryGiftStreakIncrease && G.saveState.mysteryGift_getCurrentStreak() < 4 ? game.time.events.add(1, function () {
            G.sb("pushWindow").dispatch("mysteryGiftStreakIncrese"), G.sb("onAllWindowsClosed").addOnce(function () {
                this.startBatches(t)
            }, this)
        }, this) : game.time.events.add(500, function () {
            this.startBatches(t)
        }, this))
    }, G.WorldMap.prototype.startBatches = function (t) {
        (this.batchesWaitingForFinish = 0) < t.starImprovement && this.afterLvlPartBatch(t.lvlNr, t.starImprovement, "stars"), 0 < t.reward && this.afterLvlPartBatch(t.lvlNr, t.reward, "coins"), 0 == this.batchesWaitingForFinish && this.afterBatch()
    }, G.WorldMap.prototype.centerOnLvl = function (t) {
        t = Math.min(G.json.levels.length - 1, t);
        var e = G.l(G.json.levels[t].mapX),
            i = G.l(G.json.levels[t].mapY);
        this.x = this._x = 320 - e, this.y = this._y = game.math.clamp(game.height + (Math.abs(i) - .5 * game.height), game.height, Math.max(game.height, this.mapHeight)), this.updatePosition()
    }, G.WorldMap.prototype.scrollToPoint = function (t, e, i) {
        var s = {};
        this.chestScroll = !0, this.lockInput();
        var a = Math.max(0, .5 * (1200 - game.width));
        t.lvlNr ? (t.lvlNr = Math.min(G.json.levels.length - 1, t.lvlNr), s.x = game.math.clamp(320 - G.json.levels[t.lvlNr].mapX, 320 - a, 320 + a), s.y = game.math.clamp(game.height + (Math.abs(G.json.levels[t.lvlNr].mapY) - .5 * game.height), game.height, Math.max(game.height, this.mapHeight))) : (s.x = game.math.clamp(320 - t.x, 320 - a, 320 + a), s.y = game.math.clamp(game.height + (Math.abs(t.y) - .5 * game.height), game.height, Math.max(game.height, this.mapHeight)));
        var o = game.add.tween(this).to({
            x: s.x,
            _x: s.x,
            y: s.y,
            _y: s.y
        }, 1300, Phaser.Easing.Sinusoidal.InOut, !0);
        o.onComplete.add(function () {
            this.chestScroll = !1, this.unlockInput()
        }, this), e && o.onComplete.add(e, i)
    }, G.WorldMap.prototype.update = function () {
        if (!this.chestScroll && !this.lockedInput) {
            if (0 < this.state.windowLayer.children.length) return this.velY = 0, void (this.velX = 0);
            this.clicked && game.input.activePointer.isDown ? (null != this.prevY && (this.velY = game.input.activePointer.y - this.prevY), this.prevY = game.input.activePointer.y, null != this.prevX && (this.velX = game.input.activePointer.x - this.prevX), this.prevX = game.input.activePointer.x) : (this.clicked = !1, this.prevY = null, this.prevX = null), this._x += this.velX, this._y += this.velY, this.velX *= .95, this.velY *= .95, this.updatePosition()
        }
    }, G.WorldMap.prototype.updatePosition = function () {
        var t = Math.min(this.mapHeight, this.gateLayer.getMinY() + 500);
        this.state.EDITOR && (t = this.mapHeight), this._y = game.math.clamp(this._y, game.height, Math.max(game.height, t)), this.y = game.math.clamp(Math.round(this._y), game.height, Math.max(game.height, t));
        var e = Math.max(0, .5 * (1200 - game.width));
        this._x = game.math.clamp(this._x, 320 - e, 320 + e), this.x = Math.ceil(this._x)
    }, G.WorldMap.prototype.processMaptiles = function (t) {
        this.mapHeight = t.totalHeight, this.editorMode && (this.mapHeight *= 2);
        for (var e = 0; e < t.tiles.length; e++) {
            var i = t.tiles[e],
                s = game.cache.getRenderTexture(i.rt);
            img = game.make.image(0, i.y, s.texture), img.anchor.setTo(.5, 1), img.autoCull = !0, this.add(img)
        }
    }, G.WorldMap.prototype.processMaptilesStatic = function () {
        this.mapHeight = G.json.settings.mapHeight, this.editorMode && (this.mapHeight *= 2);
        for (var t = G.json.settings.mapHeight, e = 0, i = 0; 0 < t;) {
            var s = "Map_background_tileable_" + e % 4;
            G.makeImage(0, i, s, [.5, 1], this).autoCull = !0;
            var a = game.cache.getFrame(s).height;
            i -= a, t -= a, e++
        }
    }, G.WorldMap.prototype.refreshButtons = function () {
        this.btnLayer.refreshData()
    }, G.WorldMap.prototype.processAnimElements = function (t) {
        t.forEach(function (t) {
            var e = G.makeImage(t[0], t[1], t[2], .5, this);
            e.tweenY = game.add.tween(e).to({
                y: e.y - G.l(20)
            }, 5e3, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), e.angle = -15, e.tweenAngle = game.add.tween(e).to({
                angle: 15
            }, 1e4, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), e.tweenY.timeline[0].dt = Math.random() * e.tweenY.timeline[0].duration, e.tweenAngle.timeline[0].dt = Math.random() * e.tweenAngle.timeline[0].duration
        }, this)
    }, G.WorldMap.prototype.lockInput = function () {
        this.lockedInput = !0, this.btnLayer.ignoreChildInput = !0, this.chestLayer.lockInput(), this.gateLayer.lockInput()
    }, G.WorldMap.prototype.unlockInput = function () {
        this.lockedInput = !1, this.btnLayer.ignoreChildInput = !1, this.chestLayer.unlockInput(), this.gateLayer.unlockInput()
    }, G.WorldMap.prototype.afterLvlPartBatch = function (t, e, i) {
        console.log("after lvl batch");
        var o = "coins" == i,
            s = this.btnLayer.getButtonObj(t);
        if (s) {
            var a = this.state.uiTargetParticlesBW.createDividedBatch(game.world.bounds.x + s.worldPosition.x, s.worldPosition.y, o ? "coin_1" : "map_star_1", o ? this.state.panel.coinsTxt : this.state.panel.starsTxt, e, o ? 5 : 1);
            a.addOnPartStart(function () {
                o && this.scale.setTo(.75), this.speedDelta = 1.5, this.speedMax = 35;
                var t = 0,
                    e = G.lnf(-2 * Math.random() - 5),
                    i = game.rnd.realInRange(-2.5, 2.5),
                    s = this.y,
                    a = game.rnd.realInRange(-2.5, 2.5);
                this.update = function () {
                    this.grounded || (this.x += i, s += a, 0 < (t += e) ? 4 < Math.abs(e) ? e *= -.7 : (verVelX = 0, !(a = i = 0), game.time.events.add(game.rnd.between(200, 600), function () {
                        this.update = G.UITargetParticle.prototype.update
                    }, this)) : e += .5, t = Math.min(0, t), this.y = s + t)
                }
            }), a.addOnPartFinish(function () {
                if (o) G.saveState.changeCoins(this.carriedValue, !0);
                else {
                    var t = this.state.panel.starsTxt;
                    t.setText(parseInt(t.text) + 1)
                }
            }), this.batchesWaitingForFinish++, a.onFinish.add(function () {
                this.batchesWaitingForFinish--, 0 == this.batchesWaitingForFinish && (this.afterBatch(), G.saveState.save())
            }, this), a.start()
        }
    }, G.WorldMap.prototype.afterBatch = function () {
        var e = G.saveState.getAllStars(),
            t = G.json.settings.mapChests.filter(function (t) {
                return t.req <= e && !G.saveState.data.mapChests[t.id]
            })[0];
        if (t) this.scrollToPoint({
            x: t.mapX,
            y: t.mapY
        }), G.sb("mapChestWindowClosed").addOnce(function () {
            this.scrollToPoint({
                lvlNr: G.saveState.getLastPassedLevelNr()
            })
        }, this);
        else {
            if (this.unlockInput(), G.saveState.getLastPassedLevelNr() == G.json.levels.length) return;
            if (G.saveState.getLastPassedLevelNr() === G.saveState.getFirstClosedGateLvLIndex()) return;
            if (!G.json.settings.bubbleGifts.find(function (t) {
                return t.levelNumber - 1 == G.saveState.getLastPassedLevelNr() && !G.saveState.isBubbleGiftUsed(t.levelNumber)
            })) {
                game.math.clamp(G.saveState.getLastPassedLevelNr(), 0, G.json.levels.length - 1);
                G.lvlNr = G.saveState.getLastPassedLevelNr(), G.lvlData = G.json.levels[G.saveState.getLastPassedLevelNr()], G.sb("pushWindow").dispatch("level")
            }
        }
    }, G.WorldMapCoinLayer = function (t) {
        Phaser.Group.call(this, game), this.position = t.position, this.inputEnabledChildren = !1
    }, G.WorldMapCoinLayer.prototype = Object.create(Phaser.Group.prototype), G.WorldMapCoinLayer.prototype.update = function () {
        this.sort("y", Phaser.Group.SORT_ASCENDING);
        for (var t = this.children.length; t--;) this.children[t].update()
    }, G.WorldMapCoinLayer.prototype.rewardOnLvl = function (t, e, i) {
        for (var s = G.l(G.json.levels[t].mapX), a = G.l(G.json.levels[t].mapY), o = e; 0 < o;) this.add(new G.WorldMapRewardPart(s, a, "coin", Math.min(o, 15))), o -= 15;
        for (var n = 0; n < i; n++) this.add(new G.WorldMapRewardPart(s, a, "star"))
    }, G.WorldMapRewardPart = function (t, e, i, s) {
        Phaser.Image.call(this, game, t, e), G.changeTexture(this, "coin" == i ? "coin_1" : "star"), this.rewardType = i, this.coinValue = s || 0, this.anchor.setTo(.5), this.scale.setTo("coin" == i ? .5 : .3), this.verOffsetY = 0, this.verVelY = G.lnf(-2 * Math.random() - 3), this.velX = G.lnf(3 * Math.random() - 1.5), this.yy = e, this.velYY = G.lnf(3 * Math.random() - 1.5), this.grounded = !1
    }, G.WorldMapRewardPart.prototype = Object.create(Phaser.Image.prototype), G.WorldMapRewardPart.prototype.update = function () {
        this.grounded || (this.x += this.velX, this.yy += this.velYY, this.verOffsetY += this.verVelY, this.verVelY += .2, 0 < this.verOffsetY && (2 < Math.abs(this.verVelY) ? this.verVelY *= -.6 : (this.verVelX = 0, this.velX = 0, this.velYY = 0, this.grounded = !0, game.time.events.add(Math.floor(500 * Math.random() + 200), function () {
            G.sb("onMapToUIPart").dispatch(this), this.destroy()
        }, this))), this.verOffsetY = Math.min(0, this.verOffsetY), this.y = this.yy + this.verOffsetY)
    }, G.WorldMapLvlButton = function () {
        G.Button.call(this, 0, 0, null, this.handleClick, this), this.state = game.state.getCurrentState(), this.starsImg = G.makeImage(0, 30, null, .5, this), this.lvlNrTxt = this.addChild(new G.Text(0, -16, " ", {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "white",
            stroke: "#1f6185",
            strokeThickness: 5
        }, .5, 60)), this.state = game.state.getCurrentState(), this.addTerm(function () {
            return !G.saveState.isLevelBehindGate(this.lvlIndex)
        }, this), this.kill(), this.state.EDITOR && G.sb("editorLevelSelected").add(this.editorCheckTint, this)
    }, G.WorldMapLvlButton.prototype = Object.create(G.Button.prototype), G.WorldMapLvlButton.prototype.handleClick = function () {
        console.log("HANDLING CLICK"), (this.state.EDITOR || this.lvlAvailable) && (this.state.EDITOR ? (this.state.selectLevel(this.lvlIndex), this.IMMEDIATE = !0) : 0 == G.saveState.getCurrentLivesNr() ? G.sb("pushWindow").dispatch("buyLives") : ((0 != this.lvlIndex || G.saveState.data.firstTimeBtn[this.lvlIndex]) && (1 != this.lvlIndex || G.saveState.data.firstTimeBtn[this.lvlIndex]) || (G.saveState.data.firstTimeBtn[this.lvlIndex] = !0, G.saveState.save()), G.lvlNr = this.lvlIndex, G.lvlData = G.json.levels[this.lvlIndex], G.sb("pushWindow").dispatch("level")))
    }, G.WorldMapLvlButton.prototype.revealChange = function () {
        game.add.tween(this.starsImg.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Elastic.Out, !0, 1500).onComplete.add(function () {
            this.inputEnabled = !0, this.input.useHandCursor = !0
        }, this), this.state.lastLevelData.lvlNr = -999
    }, G.WorldMapLvlButton.prototype.init = function (e, t) {
        this.alpha = 1, this.stopPulse(), this.revive(), G.stopTweens(this), G.stopTweens(this.starsImg), this.starsImg.scale.setTo(1), this.x = G.l(t.mapX), this.y = G.l(t.mapY), this.lvlIndex = e, this.lvlAvailable = G.saveState.isLevelAvailable(this.lvlIndex), this.lvlStarsNr = G.saveState.getStars(this.lvlIndex), this.lvlAvailable ? (this.lvlNrTxt.visible = !0, this.lvlNrTxt.setText((this.lvlIndex + 1).toString()), 0 == this.lvlStarsNr ? (G.changeTexture(this, "map_point_2"), G.changeTexture(this.starsImg, null), this.lvlNrTxt.stroke = "#997b11", this.pulse()) : (G.changeTexture(this, "map_point_1"), this.lvlNrTxt.stroke = "#1f6185", G.changeTexture(this.starsImg, "map_star_" + this.lvlStarsNr)), this.inputEnabled = !0, this.input.useHandCursor = !0) : (G.changeTexture(this, "map_point_3"), G.changeTexture(this.starsImg, null), this.lvlNrTxt.visible = !1, this.alpha = .5, this.inputEnabled = !1, this.input.useHandCursor = !1);
        var i = G.json.settings.gates.find(function (t) {
            return t.lvlNr === e + 1
        });
        i && (i.lvlNr - 1 <= G.saveState.getLastPassedLevelNr() || (this.alpha = 0));
        this.state.EDITOR && this.editorCheckTint()
    }, G.WorldMapLvlButton.prototype.editorCheckTint = function () {
        this.state.EDITOR && (this.state.selectedLevels.includes(this.lvlIndex) ? this.tint = 65280 : this.tint = 16777215)
    }, G.WorldMapLvls = function (t) {
        G.PoolGroup.call(this, G.WorldMapLvlButton), this.position = t.position, this.lvlBtnCoords = G.json.levels.map(function (t, e) {
            return {
                mapY: G.l(t.mapY),
                lvlIndex: e,
                btnObj: null,
                lvlData: t
            }
        }).sort(function (t, e) {
            return t.mapY - e.mapY
        }), G.sb("onWindowOpened").add(this.lockInput, this), G.sb("onWindowClosed").add(this.unlockInput, this)
    }, G.WorldMapLvls.prototype = Object.create(G.PoolGroup.prototype), G.WorldMapLvls.prototype.refreshData = function () {
        this.lvlBtnCoords.forEach(function (t, e) {
            t.btnObj && this.detachButton(e)
        }, this), this.lvlBtnCoords = G.json.levels.map(function (t, e) {
            return {
                mapY: G.l(t.mapY),
                lvlIndex: e,
                btnObj: null,
                lvlData: t
            }
        })
    }, G.WorldMapLvls.prototype.getButtonObj = function (t) {
        for (var e = 0; e < this.children.length; e++) {
            var i = this.children[e];
            if (i.lvlIndex == t) return i
        }
    }, G.WorldMapLvls.prototype.update = function () {
        for (var t = this.y - game.height, e = !1, i = 0; i < this.lvlBtnCoords.length; i++) t - G.l(40) + this.lvlBtnCoords[i].mapY < 0 && 0 < t + game.height + G.l(40) + this.lvlBtnCoords[i].mapY ? (null === this.lvlBtnCoords[i].btnObj && this.attachButton(i), e = !0) : null !== this.lvlBtnCoords[i].btnObj ? this.detachButton(i) : e
    }, G.WorldMapLvls.prototype.attachButton = function (t) {
        this.lvlBtnCoords[t].btnObj = this.getFreeElement(), this.lvlBtnCoords[t].btnObj.init(this.lvlBtnCoords[t].lvlIndex, this.lvlBtnCoords[t].lvlData)
    }, G.WorldMapLvls.prototype.detachButton = function (t) {
        this.lvlBtnCoords[t].btnObj.kill(), this.lvlBtnCoords[t].btnObj = null
    }, G.WorldMapLvls.prototype.unlockInput = function () {
        this.ignoreChildInput = !1
    }, G.WorldMapLvls.prototype.lockInput = function () {
        this.ignoreChildInput = !0
    }, G.Booster = function (t, e, i) {
        this.board = G.lvl.state.board, this.am = this.board.actionManager, this.cellX = t, this.cellY = e, Phaser.Image.call(this, game, this.board.cellXToPxIn(t), this.board.cellYToPxIn(e - 2)), this.anchor.setTo(.5), this.boosterNr = i, this.orgY = this.y, this.targetY = this.board.cellYToPxIn(e), G.changeTexture(this, "ui_booster_" + i), this.alpha = 0, this.scale.setTo(2), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 700, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 1
        }, 700, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            game.add.tween(this).to({
                y: this.targetY
            }, 300, Phaser.Easing.Cubic.In, !0).onComplete.add(function () {
                var t = this.getMatchCandy(this.boosterNr);
                3 == this.boosterNr && (G.sb("fx").dispatch("strokeH", t), G.sb("fx").dispatch("lightCircle", t), G.sb("fx").dispatch("explosion", t)), 4 == this.boosterNr && (G.sb("fx").dispatch("strokeV", t), G.sb("fx").dispatch("lightCircle", t), G.sb("fx").dispatch("explosion", t)), this.board.checkSpecialMatchList.push(t), this.am.newAction("processMatch"), this.am.removeAction(), game.add.tween(this).to({
                    y: this.orgY,
                    alpha: 0
                }, 600, Phaser.Easing.Cubic.Out, !0), game.time.events.add(600, this.destroy, this)
            }, this)
        }, this)
    }, G.Booster.prototype = Object.create(Phaser.Image.prototype), G.Booster.prototype.getMatchCandy = function (t) {
        return 2 == t ? {
            cellX: this.cellX,
            cellY: this.cellY,
            exe: [
                ["specific", [0, 0]]
            ]
        } : 3 == t ? {
            cellX: this.cellX,
            cellY: this.cellY,
            exe: [
                ["loop", {
                    x: -1,
                    y: 0
                }],
                ["loop", {
                    x: 1,
                    y: 0
                }]
            ]
        } : 4 == t ? {
            cellX: this.cellX,
            cellY: this.cellY,
            exe: [
                ["loop", {
                    x: 0,
                    y: -1
                }],
                ["loop", {
                    x: 0,
                    y: 1
                }]
            ]
        } : void 0
    }, G.BoosterHorizontal = function (t, e, i) {
        this.board = G.lvl.state.board, this.am = this.board.actionManager, this.cellX = t, this.cellY = e, Phaser.Image.call(this, game, this.board.cellXToPxIn(-.5), this.board.cellYToPxIn(e)), this.anchor.setTo(.5), this.oldCellX = -1, this.boosterNr = i, this.active = !1, this.orgY = this.y, this.targetX = this.board.cellYToPxIn(this.board.boardData.width) + G.l(30), G.changeTexture(this, "ui_booster_" + i), this.alpha = 0, this.scale.setTo(2), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 1e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 1
        }, 1e3, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            this.active = !0
        }, this)
    }, G.BoosterHorizontal.prototype = Object.create(Phaser.Image.prototype), G.BoosterHorizontal.prototype.update = function () {
        if (this.active) {
            this.x += G.l(10);
            var t, e = this.board.pxInToCellX(this.x);
            e != this.oldCellX && (this.oldCellX = e, (t = this.board.getCandy(e - 1, this.cellY)) && (this.board.hitCell(e - 1, this.cellY), this.board.isCellMatchable(e - 1, this.cellY) && (this.board.boardDirt.isToken(e - 1, this.cellY) && this.board.boardDirt.onMatch(e - 1, this.cellY), this.board.boardCage.isToken(e - 1, this.cellY) ? this.board.boardCage.onMatch(e - 1, this.cellY) : t.special ? this.board.checkSpecialMatchList.push(t) : (t.match(), G.sfx.boom.play(), G.lvl.processMatch(1, t.cellX, t.cellY))))), this.x >= this.targetX && 0 == this.board.duringAnimation && (this.active = !1, 0 == this.board.checkSpecialMatchList.length ? this.am.newAction("processFall") : this.am.newAction("processMatch"), G.sb("onBoosterActionFinished").dispatch(), this.am.removeAction(), this.destroy())
        }
    }, G.BoosterSelection = function (t, e, i) {
        this.board = G.lvl.state.board, this.am = this.board.actionManager, this.cellX = t, this.cellY = e, Phaser.Image.call(this, game, this.board.cellXToPxIn(t), this.board.cellYToPxIn(e)), this.alpha = 0, this.follow = i, this.anchor.setTo(0), G.changeTexture(this, "tut_hand"), this.offsetTween = 0, game.add.tween(this).to({
            offsetTween: G.l(20)
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 0, -1, !0), this.alphaTween = game.add.tween(this).to({
            alpha: .8
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.BoosterSelection.prototype = Object.create(Phaser.Image.prototype), G.BoosterSelection.prototype.update = function () {
        this.x = this.follow.x + this.offsetTween, this.y = this.follow.y + this.offsetTween
    }, G.BoosterSelection.prototype.hide = function () {
        this.alphaTween.stop(), game.add.tween(this).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0, 200).onComplete.add(function () {
            this.destroy()
        }, this)
    }, G.BoosterVertical = function (t, e, i) {
        this.board = G.lvl.state.board, this.am = this.board.actionManager, this.cellX = t, this.cellY = e, Phaser.Image.call(this, game, this.board.cellXToPxIn(t), this.board.cellYToPxIn(-.5)), this.anchor.setTo(.5), this.boosterNr = i, this.oldCellY = -1, this.orgY = this.y, this.targetY = this.board.cellYToPxIn(this.board.boardData.height) + G.l(30), G.changeTexture(this, "ui_booster_" + i), this.alpha = 0, this.scale.setTo(2), game.add.tween(this.scale).to({
            x: 1,
            y: 1
        }, 1e3, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this).to({
            alpha: 1
        }, 1e3, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            this.active = !0
        }, this)
    }, G.BoosterVertical.prototype = Object.create(Phaser.Image.prototype), G.BoosterVertical.prototype.getMatchCandy = function (t) {
        return 2 == t ? {
            cellX: this.cellX,
            cellY: this.cellY,
            exe: [
                ["specific", [0, 0]]
            ]
        } : 3 == t ? {
            cellX: this.board.boardData.width - 1,
            cellY: this.cellY,
            exe: [
                ["loop", {
                    x: -1,
                    y: 0
                }],
                ["loop", {
                    x: 1,
                    y: 0
                }]
            ]
        } : 4 == t ? {
            cellX: this.cellX,
            cellY: this.board.boardData.height - 1,
            exe: [
                ["loop", {
                    x: 0,
                    y: -1
                }],
                ["loop", {
                    x: 0,
                    y: 1
                }]
            ]
        } : void 0
    }, G.BoosterVertical.prototype.update = function () {
        if (this.active) {
            this.y += G.l(10);
            var t, e = this.board.pxInToCellY(this.y);
            e != this.oldCellY && (this.oldCellY = e, (t = this.board.getCandy(this.cellX, e - 1)) && (this.board.hitCell(this.cellX, e - 1), this.board.isCellMatchable(this.cellX, e - 1) && (this.board.boardDirt.isToken(this.cellX, e - 1) && this.board.boardDirt.onMatch(this.cellX, e - 1), this.board.boardCage.isToken(this.cellX, e - 1) ? this.board.boardCage.onMatch(this.cellX, e - 1) : t.special ? this.board.checkSpecialMatchList.push(t) : (t.match(), G.sfx.boom.play(), G.lvl.processMatch(1, t.cellX, t.cellY))))), this.y >= this.targetY && 0 == this.board.duringAnimation && (this.active = !1, 0 == this.board.checkSpecialMatchList.length ? this.am.newAction("processFall") : this.am.newAction("processMatch"), G.sb("onBoosterActionFinished").dispatch(), this.am.removeAction(), this.destroy())
        }
    }, G.GingerMapButton = function () {
        Phaser.Group.call(this, game), G.GINGEREVENT && (this.timer = new G.TextTimer(-13, 113, Date.now() + 36e6, {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#ec308f",
            strokeThickness: 6
        }, [.5, 0], 300), this.timer.setShadow(0, 4, "rgba(0,0,0,0.5)", 0, !0, !1), this.add(this.timer), this.mainButton = new G.Button(0, 0, "Button_Map", function () {
            G.sb("pushWindow").dispatch("gingerJoin")
        }, this), this.mainButton.label = new G.Text(-9, 84, "Cookie Quest", {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#ec308f"
        }, .5, 170), this.mainButton.addChild(this.mainButton.label), this.add(this.mainButton)), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.GingerMapButton.prototype = Object.create(Phaser.Group.prototype), G.GingerMapButton.prototype.onResize = function () {
        var t = game.world.bounds.x + Math.floor(.5 * game.width);
        this.x = t - 200, this.y = game.height - 365
    }, G.GingerRanking = function (t) {
        Phaser.Group.call(this, game), this.bg = G.makeImage(-204, 0, "Ranking_Board_Long", 0, this), this.bg.inputEnabled = !0, this.bg.events.onInputDown.add(function () {
            this.clicked = !0
        }, this), this.clicked = !1, this.rankingGroup = this.add(game.make.group()), this.rankingGroup.x = -204, this.rankingGroup.y = 55, this.maskGfx = this.add(game.add.graphics()), this.maskGfx.y = 55, this.maskGfx.x = -204, this.maskGfx.beginFill(16711680, 1), this.maskGfx.drawRect(0, 0, 408, 326), this.rankingUsers = [], this.rankingGroup.mask = this.maskGfx, this.initRanking(), this.inputPrevY = 0, this.inputVelY = 0, this.rankingTitle = new G.Text(0, 25, "Your team", {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "40px"
        }, .5, 400), this.add(this.rankingTitle)
    }, G.GingerRanking.prototype = Object.create(Phaser.Group.prototype), G.GingerRanking.prototype.update = function () {
        this.updateInput()
    }, G.GingerRanking.prototype.updateInput = function () {
        if (this.clicked && game.input.activePointer.isDown) {
            if (null !== this.inputPrevY) {
                var t = .5 * (game.input.activePointer.y - this.inputPrevY);
                this.inputVelY = t
            }
            this.inputPrevY = game.input.activePointer.y
        } else this.clicked = !1, this.inputPrevY = null;
        this.rankingGroup.y += this.inputVelY, this.boundRistrict(), this.inputVelY *= .95, Math.abs(this.inputVelY) < 1 && (this.inputVelY = 0)
    }, G.GingerRanking.prototype.boundRistrict = function () {
        var t = Math.min(55, 55 - (this.rankingGroup.height - 326));
        55 < this.rankingGroup.y && (this.rankingGroup.y = G.lerp(this.rankingGroup.y, 55, .5), this.rankingGroup.y < 56 && (this.rankingGroup.y = 55)), this.rankingGroup.y < t && (this.rankingGroup.y = G.lerp(this.rankingGroup.y, t, .5), this.rankingGroup.y > t + 1 && (this.rankingGroup.y = t))
    }, G.GingerRanking.prototype.initRanking = function (t) {
        t = [{
            rank: 1,
            name: "sodomo",
            gingerAmount: 15,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 2,
            name: "Annie",
            gingerAmount: 13,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 3,
            name: "John",
            gingerAmount: 12,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 4,
            name: "Hell",
            gingerAmount: 10,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 5,
            name: "Dubious",
            gingerAmount: 8,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 6,
            name: "Krrr",
            gingerAmount: 3,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 7,
            name: "Goldie",
            gingerAmount: 0,
            avatar: sgSettings.config.user.avatar
        }];
        for (var e = 0; e < t.length; e++) this.initUser(30 + 60 * e, t[e])
    }, G.GingerRanking.prototype.initUser = function (t, e) {
        var i = new G.Text(30, t, e.rank.toString(), {
            fill: "#007D5D",
            font: "ComicSansBold",
            fontSize: "30px"
        }, .5, 50);
        this.rankingGroup.add(i);
        G.makeExtImage(80, t, e.avatar, "avatar_m", .5, this.rankingGroup, !1, function () {
            this.width = this.height = 50
        });
        var s = new G.Text(120, t, e.name, {
            fill: "#007D5D",
            font: "ComicSansBold",
            fontSize: "30px"
        }, [0, .5], 160);
        this.rankingGroup.add(s);
        var a = G.makeImage(340, t - 4, "Ranking_Small_Counter", .5, this.rankingGroup),
            o = new G.Text(355, t, e.gingerAmount.toString(), {
                fill: "white",
                font: "ComicSansBold",
                fontSize: "30px"
            }, .5, 40);
        this.rankingGroup.add(o), this.rankingUsers.push({
            userData: e,
            rankTxt: i,
            nameTxt: s,
            gingerBg: a,
            gingerTxt: o
        })
    }, G.dailyCheck = function () {
        function t() {
            new G.Window("daily2"), G.saveState.data.lastDaily = [e.getYear(), e.getMonth(), e.getDate()], G.saveState.save()
        }
        var e = new Date,
            i = G.saveState.data.lastDaily;
        i ? i[2] == e.getDate() && i[1] == e.getMonth() && i[0] == e.getYear() || t() : (G.saveState.data.spins++, G.saveState.save(), t())
    }, G.DailyCoin = function (t, e, i) {
        Phaser.Image.call(this, game, G.l(t), G.l(e)), this.state = game.state.getCurrentState(), this.anchor.setTo(.5), G.changeTexture(this, "coin_1"), this.rewardType = "coin", this.coinValue = i, this.scale.setTo(.75), this.target = this.state.panel.coinIco, game.add.existing(this);
        var s = this.target;
        game.add.tween(this).to({
            x: game.world.bounds.x + s.worldPosition.x,
            y: this.target.worldPosition.y,
            width: s.width,
            height: s.height
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0).onComplete.add(function () {
            G.saveState.changeCoins(this.coinValue), G.sb("onMapToUIPartFinished").dispatch(this), this.destroy()
        }, this)
    }, G.DailyCoin.prototype = Object.create(Phaser.Image.prototype), G.DailyCoin.prototype.update = function () {
        this.target
    }, G.DailyWheel = function (t, e) {
        Phaser.Group.call(this, game), (D = this).state = game.state.getCurrentState(), this.x = G.l(t), this.y = G.l(e), this.prizeTable = G.json.settings.wheelPrizes, this.prizeTableGold = G.json.settings.wheelPrizesGold, this.prizeTable.forEach(function (t) {
            G.gift.processRandomBoosters(t.prize)
        }), this.prizeTableGold.forEach(function (t) {
            G.gift.processRandomBoosters(t.prize)
        }), this.angleBetweenFields = 360 / this.prizeTable.length, this.anglePrizeStartOffset = this.angleBetweenFields / 2, this.angleDiffSinceLastPin = 0, this.angleBetweenPins = 15, this.angleSpeedMulti = .985, this.wheelGfx = this.add(this.makeWheelGfx(0, 0, "prize_wheel_2", this.prizeTable)), this.wheelGfxGold = this.add(this.makeWheelGfx(0, 0, "gold_wheel", this.prizeTableGold)), this.wheelPointer = this.add(this.makeWheelPointer(0, -180, "prize_wheel_arrow")), WH = this.wheelGfx, this.wheelGfx.wheelDistancePassed = 0, this.wheelGfx.prevDistancePassed = 0, this.wheelGfx.inputEnabled = !0, this.pointer = null, this.pointerStartX = 0, this.pointerClickedDate = 0, this.launched = !1, this.finished = !1, this.wheelGfx.events.onInputDown.add(function () {
            var t = game.input.activePointer;
            this.pointerStartX.worldX, this.pointerClickedDate = Date.now(), this.pointer = t
        }, this), this.onFinish = new Phaser.Signal, this.gold = !1
    }, G.DailyWheel.prototype = Object.create(Phaser.Group.prototype), G.DailyWheel.prototype.changeToRegular = function () {
        this.gold = !1
    }, G.DailyWheel.prototype.changeToGold = function () {
        this.gold = !0
    }, G.DailyWheel.prototype.update = function () {
        if (this.wheelGfxGold.angle = this.wheelGfx.angle, this.gold ? (this.wheelGfx.alpha = G.lerp(this.wheelGfx.alpha, 0, .1, .02), this.wheelGfxGold.alpha = G.lerp(this.wheelGfxGold.alpha, 1, .1, .02)) : (this.wheelGfx.alpha = G.lerp(this.wheelGfx.alpha, 1, .1, .02), this.wheelGfxGold.alpha = G.lerp(this.wheelGfxGold.alpha, 0, .1, .02)), this.wheelPointer.update(), !this.finished) {
            if (this.launched) {
                var t = this.updateLaunched();
                t && (this.onFinish.dispatch(t.prize), this.finished = !0)
            } else null !== this.pointer && this.pointer.isDown;
            for (var e = this.children.length; e--;) this.children[e].update()
        }
    }, G.DailyWheel.prototype.restart = function () {
        this.finished && (this.launched = !1, this.pointer = null, this.finished = !1, this.giftGfx && game.add.tween(this.giftGfx.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Cubic.In, !0).onComplete.add(function () {
            this.destroy()
        }, this.giftGfx), this.wheelGfx.inputEnabled = !0)
    }, G.DailyWheel.prototype.launch = function (t) {
        for (this.wheelGfx.inputEnabled = !1; ;) {
            var e = this.testSpin(t, this.wheelGfx.prevDistancePassed, this.wheelGfx.wheelDistancePassed);
            if (!e.keep) break;
            if (!(Math.random() > e.keep)) break;
            t += 80
        }
        this.wheelGfx.angleSpeed = .025 * t, this.launched = !0
    }, G.DailyWheel.prototype.updateLaunched = function () {
        return this.updateWheel(this.wheelGfx, !0)
    }, G.DailyWheel.prototype.applyPrize = function (t) { }, G.DailyWheel.prototype.testSpin = function (t, e, i) {
        var s = {
            angle: 0
        };
        for (s.angleSpeed = .025 * t, s.prevDistancePassed = e || 0, s.wheelDistancePassed = i || 0; ;) {
            var a = this.updateWheel(s);
            if (a) return a
        }
    }, G.DailyWheel.prototype.updateWheel = function (t, e) {
        t.angle += t.angleSpeed;
        var i = t.wheelDistancePassed;
        return t.wheelDistancePassed += t.angleSpeed, Math.floor(i / this.angleBetweenPins) !== Math.floor(t.wheelDistancePassed / this.angleBetweenPins) && (e && this.wheelPointer.bounce(-1 * Math.sign(t.angleSpeed)), t.angleSpeed = .95 * t.angleSpeed, t.angleSpeed < .25 && (t.wheelDistancePassed = i, t.angle = game.math.wrapAngle(i), t.angleSpeed *= -.5)), t.angleSpeed *= this.angleSpeedMulti, this.wheelGfxGold.angle = t.angle, Math.abs(t.angleSpeed) < .05 && this.getPrizeFromAngle(t.angle)
    }, G.DailyWheel.prototype.getPrizeFromAngle = function (t) {
        var e = t + 180;
        return t < 0 && (e = 180 + t), (this.gold ? this.prizeTableGold : this.prizeTable)[Math.floor(e / this.angleBetweenFields)]
    }, G.DailyWheel.prototype.makeWheelGfx = function (t, e, i, s) {
        wheel = G.makeImage(0, 0, i, .5), wheel.labels = wheel.addChild(game.make.group());
        for (var a = s.length - 1, o = this.anglePrizeStartOffset; o < 360; o += this.angleBetweenFields) {
            var n = s[a],
                r = new G.LabelGroupT(G.gift.getLabelString(n.prize, 1.4), G.lengthDirX(90 + o, 160, !1), G.lengthDirY(90 + o, 160, !1), {
                    font: "ComicSansBold",
                    fontSize: "25px",
                    fill: "#ece9e5",
                    stroke: "#817F81",
                    strokeThickness: 7
                }, [1, .5], 200);
            r.angle = 90 + o, wheel.labels.add(r), a--
        }
        return wheel.labels.cacheAsBitmap = !0, wheel
    }, G.DailyWheel.prototype.makeWheelPointer = function (t, e, i) {
        var s = G.makeImage(t, e, i, .5, null);
        return s.soundTimer = 2, s.bounce = function (t) {
            this.soundTimer < 0 && (G.sfx.pop.play(), this.soundTimer = 2), this.angle = 10 * t
        }, s.update = function () {
            this.soundTimer--, this.angle = G.lerp(this.angle, 0, .2)
        }, s
    }, G.GiftUnwrapAnim = function (t, e, i) {
        Phaser.Group.call(this, game), this.giftData = i, this.x = G.l(t), this.y = G.l(e), this.light = G.makeImage(0, 0, "popup_lighht", .5, this), this.light.update = function () {
            this.angle++
        }, this.light.alpha = 0, this.light.blendMode = 1, game.add.tween(this.light).to({
            alpha: .2
        }, 1e3, Phaser.Easing.Cubic.Out, !0), game.add.tween(this.light).to({
            angle: 360
        }, 3e3, Phaser.Easing.Linear.None, !0, 0, -1, !1), this.inside = new G.LabelGroupT(G.gift.getLabelString(this.giftData), 0, 0, {
            font: "ComicSansBold",
            fontSize: "90px",
            fill: "white"
        }, .5, 180), this.add(this.inside), this.inside.scale.setTo(.5, 0), game.add.tween(this.inside.scale).to({
            x: 1,
            y: 1
        }, 800, Phaser.Easing.Elastic.Out, !0), G.sfx.xylophone_positive_12.play()
    }, G.GiftUnwrapAnim.prototype = Object.create(Phaser.Group.prototype), G.GiftUnwrapAnim.prototype.hide = function () {
        game.add.tween(this).to({
            alpha: 0
        }, 500, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            this.destroy()
        }, this)
    }, G.DailyRewardBoxIcon = function (t, e, i) {
        Phaser.Group.call(this, game), this.position.setTo(t, e), G.json.settings.dailyReward.days[i - 1].boxIcon.forEach(function (t) {
            var e = t.sprite || "medium_green_present",
                i = t.pos || [0, 0],
                s = t.scale || [1, 1];
            G.makeImage(i[0], i[1], e, .5, this).scale.setTo(s[0], s[1])
        }, this)
    }, G.DailyRewardBoxIcon.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardCurrentGift = function (t, e, i) {
        Phaser.Group.call(this, game), this.position.setTo(t, e), this.dayConfig = G.json.settings.dailyReward.days[i], this.giftPanel = this.add(new G.DailyRewardCurrentGiftPrizePanel(0, -30, this.dayConfig)), this.giftPanel.visible = !1, this.boxIcon = G.makeImage(0, 0, "big_pink_present", .5, this), this.boxJump(), this.add(this.boxIcon)
    }, G.DailyRewardCurrentGift.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardCurrentGift.prototype.showReward = function () {
        game.add.tween(this.boxIcon).to({
            alpha: 0,
            width: 1.2 * this.boxIcon.width,
            height: 1.2 * this.boxIcon.height
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.giftPanel.show()
    }, G.DailyRewardCurrentGift.prototype.claimReward = function () {
        this.giftPanel.claimPrize()
    }, G.DailyRewardCurrentGift.prototype.boxJump = function () {
        if (1 == this.boxIcon.alpha && this.boxIcon.visible) {
            var t = game.add.tween(this.boxIcon).to({
                y: -G.l(15)
            }, 150, Phaser.Easing.Cubic.Out),
                e = game.add.tween(this.boxIcon).to({
                    y: 0
                }, 150, Phaser.Easing.Circular.In);
            t.chain(e), t.start();
            var i = game.add.tween(this.boxIcon).to({
                angle: -3
            }, 100, Phaser.Easing.Cubic.InOut),
                s = game.add.tween(this.boxIcon).to({
                    angle: 3
                }, 170, Phaser.Easing.Sinusoidal.In),
                a = game.add.tween(this.boxIcon).to({
                    angle: 0
                }, 30, Phaser.Easing.Cubic.InOut);
            i.chain(s, a), i.start(), game.time.events.add(1e3, this.boxJump, this)
        }
    }, G.DailyRewardCurrentGiftPrizePanel = function (t, e, i) {
        Phaser.Group.call(this, game), this.position.setTo(t, e), this.dayConfig = i, this.prize = JSON.parse(JSON.stringify(this.dayConfig.gifts)), this.bg = G.makeImage(0, 0, "daily_prize_panel_bg", .5, this), "coin" === this.prize[0][0] ? this.icon = G.makeImage(0, 0, "coin_3", .5, this) : this.icon = this.add(new G.DailyRewardGiftIcon(0, 0, this.prize)), this.descText = this.addDescText(0, 130, this.prize), game.incentivised || (this.icon.x = -80, this.dblBtn = new G.Button(80, 0, "btn_x2", function () {
            G.gameTracking.design("NewDailyDoubleReward"), this.dblBtn.inputEnabled = !1, this.dblBtn.alpha = .5, sdkHandler.trigger("rewardedAd", {
                callback: function (t) {
                    game.paused = !1, t ? this.dblSuccess() : this.dblFail()
                }
            }, this)
        }, this), this.add(this.dblBtn)), this.visible = !1
    }, G.DailyRewardCurrentGiftPrizePanel.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardCurrentGiftPrizePanel.prototype.show = function () {
        this.visible = !0, this.alpha = 0, game.add.tween(this).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.icon.scale.setTo(0), game.add.tween(this.icon.scale).to({
            x: 1.2,
            y: 1.2
        }, 300, Phaser.Easing.Elastic.Out, !0), this.dblBtn && (this.dblBtn.scale.setTo(0), game.add.tween(this.dblBtn.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Elastic.Out, !0, 150)), this.descText.scale.setTo(0), game.add.tween(this.descText.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Elastic.Out, !0, 300)
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.claimPrize = function () {
        this.dblBtn && (this.dblBtn.inputEnabled = !1), this.processClaim(this.icon, this.prize), this.dblIcon && this.processClaim(this.dblIcon, this.prize)
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.addDescText = function (t, e, i) {
        var s;
        return s = "coin" === i[0][0] ? G.txt("%NR% Coins").replace("%NR%", i[0][1]) : G.txt("Get more boosters!"), this.add(new G.Text(t, e, s, {
            style: "font-beige",
            fontSize: "40px",
            lineSpacing: -20
        }, .5, 400, 200, !0, "center"))
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.dblSuccess = function () {
        this.dblBtn.inputEnabled = !1, game.add.tween(this.dblBtn).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), "coin" === this.prize[0][0] ? this.dblIcon = G.makeImage(-80, 0, "coin_3", .5, this) : this.dblIcon = this.add(new G.DailyRewardGiftIcon(-80, 0, this.prize)), this.dblIcon.scale.setTo(1.2), game.add.tween(this.dblIcon.scale).to({
            x: 1.3,
            y: 1.3
        }, 300, Phaser.Easing.Elastic.Out, !0, 0, 0, !0, 500), game.add.tween(this.dblIcon).to({
            x: 80,
            y: 0
        }, 500, Phaser.Easing.Sinusoidal.InOut, !0), "coin" === this.prize[0][0] ? this.descText.setText(G.txt("%NR% Coins").replace("%NR%", 2 * this.prize[0][1])) : this.descText.setText(G.txt("Use these to boost your game!"))
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.dblFail = function () {
        new G.NoMoreAds
    }, G.DailyRewardCurrentGiftPrizePanel.prototype.processClaim = function (e, t) {
        var i = game.state.getCurrentState();
        t.forEach(function (t) {
            "coin" === t[0] ? G.gameTracking.source("Coins", "Reward", "NewDailyReward", t[1]) : G.gameTracking.source(G.saveState.nrToBoosterName(t[0][8]), "Reward", "NewDailyReward", t[1]), "coin" === t[0] ? i.uiTargetParticles.createCoinBatch(game.world.bounds.x + e.worldPosition.x, e.worldPosition.y, i.panel.coinsTxt, t[1]) : G.gift.applyGift(t, !0)
        })
    }, G.DailyRewardDay = function (t, e, i) {
        Phaser.Group.call(this, game), this.position.setTo(t, e), this.bg = G.makeImage(0, 0, i.bgSprite, .5, this), this.addRibbon(0, -.5 * this.bg.height + 10, i), i.giftsVisible ? this.icon = this.add(new G.DailyRewardGiftIcon(0, 10, i.gifts)) : this.icon = this.add(new G.DailyRewardBoxIcon(0, 10, i.dayNr)), this.icon.height = Math.min(this.icon.height, .9 * this.bg.height), this.icon.scale.setTo(this.icon.scale.y), i.past && (this.checkedIconPast = G.makeImage(50, 0, "task_complete", .5, this)), i.today && (this.checkedIcon = G.makeImage(50, 0, "task_complete", .5, this), this.checkedIcon.alpha = 0, this.checkedIcon.scale.setTo(2))
    }, G.DailyRewardDay.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardDay.prototype.checkedIconAnimation = function () {
        this.checkedIcon && (game.add.tween(this.checkedIcon).to({
            alpha: 1
        }, 400, Phaser.Easing.Cubic.In, !0), game.add.tween(this.checkedIcon.scale).to({
            x: 1,
            y: 1
        }, 400, Phaser.Easing.Cubic.In, !0))
    }, G.DailyRewardDay.prototype.addRibbon = function (t, e, i) {
        this.dayRibbon = G.makeImage(t, e, i.today ? "selected_day" : "unselected_day", .5, this), this.dayText = new G.Text(t, e, i.today ? G.txt("Today") : G.txt("Day %NR%").replace("%NR%", i.dayNr), {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px"
        }, .5, 76), this.add(this.dayText)
    }, G.DailyRewardDay.prototype.addBoxesIcons = function (t, e, i) {
        this.iconGroup = this.add(this.iconGroup)
    }, G.DailyRewardGiftIcon = function (t, e, i) {
        Phaser.Group.call(this, game), this.position.setTo(t, e), 1 == i.length ? this.addIcon(0, 0, i[0]) : (this.addIcon(20, 20, i[0]), this.addIcon(-20, -20, i[1]))
    }, G.DailyRewardGiftIcon.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardGiftIcon.prototype.addIcon = function (t, e, i) {
        var s = G.makeImage(t, e, G.gift.getIcon(i), .5, this);
        1 < i[1] && (s.amountTxt = new G.Text(0, 30, "x" + i[1], {
            style: "font-beige-header",
            fontSize: "35px"
        }, .5), s.addChild(s.amountTxt)), "coin" === i[0] && (s.y -= 10, s.amountTxt.y += 10)
    }, G.DailyRewardWeek = function (t, e, i, s) {
        Phaser.Group.call(this, game), this.position.setTo(t, e), this.days = [], this.init(i, s)
    }, G.DailyRewardWeek.prototype = Object.create(Phaser.Group.prototype), G.DailyRewardWeek.prototype.init = function (t, e) {
        for (var i = G.json.settings.dailyReward.days, s = 0; s < 7; s++) {
            var a;
            a = s === t ? "current_day_box" : s < t ? "passed_day_box" : "future_day_box", a += 6 === s ? "_big" : "";
            var o = new G.DailyRewardDay(s % 3 * 140 - 140, 135 * Math.floor(s / 3) - 135, {
                gifts: i[s].gifts,
                dayNr: s + 1,
                past: s < t,
                today: s === t,
                bgSprite: a,
                giftsVisible: s <= t
            });
            o.scale.setTo(0), game.add.tween(o.scale).to({
                x: 1,
                y: 1
            }, 200, Phaser.Easing.Sinusoidal.Out, !0, 50 + 50 * s), 6 == s && (o.x += 140), this.add(o), this.days.push(o)
        }
        game.time.events.add(50 + 50 * s, function () {
            this.days.forEach(function (t) {
                t.checkedIconAnimation()
            })
        }, this)
    }, G.GingerMapButton = function () {
        Phaser.Group.call(this, game), G.GINGEREVENT && (this.timer = new G.TextTimer(-13, 113, Date.now() + 36e6, {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#ec308f",
            strokeThickness: 6
        }, [.5, 0], 300), this.timer.setShadow(0, 4, "rgba(0,0,0,0.5)", 0, !0, !1), this.add(this.timer), this.mainButton = new G.Button(0, 0, "Button_Map", function () {
            G.sb("pushWindow").dispatch("gingerJoin")
        }, this), this.mainButton.label = new G.Text(-9, 84, "Cookie Quest", {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "30px",
            stroke: "#ec308f"
        }, .5, 170), this.mainButton.addChild(this.mainButton.label), this.add(this.mainButton)), G.sb("onScreenResize").add(this.onResize, this), this.onResize()
    }, G.GingerMapButton.prototype = Object.create(Phaser.Group.prototype), G.GingerMapButton.prototype.onResize = function () {
        var t = game.world.bounds.x + Math.floor(.5 * game.width);
        this.x = t - 200, this.y = game.height - 365
    }, G.GingerRanking = function (t) {
        Phaser.Group.call(this, game), this.bg = G.makeImage(-204, 0, "Ranking_Board_Long", 0, this), this.bg.inputEnabled = !0, this.bg.events.onInputDown.add(function () {
            this.clicked = !0
        }, this), this.clicked = !1, this.rankingGroup = this.add(game.make.group()), this.rankingGroup.x = -204, this.rankingGroup.y = 55, this.maskGfx = this.add(game.add.graphics()), this.maskGfx.y = 55, this.maskGfx.x = -204, this.maskGfx.beginFill(16711680, 1), this.maskGfx.drawRect(0, 0, 408, 326), this.rankingUsers = [], this.rankingGroup.mask = this.maskGfx, this.initRanking(), this.inputPrevY = 0, this.inputVelY = 0, this.rankingTitle = new G.Text(0, 25, "Your team", {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "40px"
        }, .5, 400), this.add(this.rankingTitle)
    }, G.GingerRanking.prototype = Object.create(Phaser.Group.prototype), G.GingerRanking.prototype.update = function () {
        this.updateInput()
    }, G.GingerRanking.prototype.updateInput = function () {
        if (this.clicked && game.input.activePointer.isDown) {
            if (null !== this.inputPrevY) {
                var t = .5 * (game.input.activePointer.y - this.inputPrevY);
                this.inputVelY = t
            }
            this.inputPrevY = game.input.activePointer.y
        } else this.clicked = !1, this.inputPrevY = null;
        this.rankingGroup.y += this.inputVelY, this.boundRistrict(), this.inputVelY *= .95, Math.abs(this.inputVelY) < 1 && (this.inputVelY = 0)
    }, G.GingerRanking.prototype.boundRistrict = function () {
        var t = Math.min(55, 55 - (this.rankingGroup.height - 326));
        55 < this.rankingGroup.y && (this.rankingGroup.y = G.lerp(this.rankingGroup.y, 55, .5), this.rankingGroup.y < 56 && (this.rankingGroup.y = 55)), this.rankingGroup.y < t && (this.rankingGroup.y = G.lerp(this.rankingGroup.y, t, .5), this.rankingGroup.y > t + 1 && (this.rankingGroup.y = t))
    }, G.GingerRanking.prototype.initRanking = function (t) {
        t = [{
            rank: 1,
            name: "sodomo",
            gingerAmount: 15,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 2,
            name: "Annie",
            gingerAmount: 13,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 3,
            name: "John",
            gingerAmount: 12,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 4,
            name: "Hell",
            gingerAmount: 10,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 5,
            name: "Dubious",
            gingerAmount: 8,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 6,
            name: "Krrr",
            gingerAmount: 3,
            avatar: sgSettings.config.user.avatar
        }, {
            rank: 7,
            name: "Goldie",
            gingerAmount: 0,
            avatar: sgSettings.config.user.avatar
        }];
        for (var e = 0; e < t.length; e++) this.initUser(30 + 60 * e, t[e])
    }, G.GingerRanking.prototype.initUser = function (t, e) {
        var i = new G.Text(30, t, e.rank.toString(), {
            fill: "#007D5D",
            font: "ComicSansBold",
            fontSize: "30px"
        }, .5, 50);
        this.rankingGroup.add(i);
        G.makeExtImage(80, t, e.avatar, "avatar_m", .5, this.rankingGroup, !1, function () {
            this.width = this.height = 50
        });
        var s = new G.Text(120, t, e.name, {
            fill: "#007D5D",
            font: "ComicSansBold",
            fontSize: "30px"
        }, [0, .5], 160);
        this.rankingGroup.add(s);
        var a = G.makeImage(340, t - 4, "Ranking_Small_Counter", .5, this.rankingGroup),
            o = new G.Text(355, t, e.gingerAmount.toString(), {
                fill: "white",
                font: "ComicSansBold",
                fontSize: "30px"
            }, .5, 40);
        this.rankingGroup.add(o), this.rankingUsers.push({
            userData: e,
            rankTxt: i,
            nameTxt: s,
            gingerBg: a,
            gingerTxt: o
        })
    }, G.HighscorePanel = function () {
        Phaser.Group.call(this, game), this.hidingOffset = 500, this.hidingOffsetTarget = 0, this.x = .5 * game.width + game.world.bounds.x + this.hidingOffset, this.y = game.height, this.scrolled = !1, this.opened = !1, this.contentBg = G.makeImage(0, 0, "highscore-panel-content-bg", [.5, 0], this), this.contentBg.inputEnabled = !0, this.contentBg.events.onInputDown.add(function () {
            this.clicked = !0
        }, this), this.clicked = !1, this.tabsGroup = this.add(game.add.group()), this.tabsGroup.x = -320, this.tabs = {}, this.contentGroup = this.add(game.add.group()), this.contentGroup.x = -302, this.contentGroup.y = 68, this.borderImg = G.makeImage(0, 0, "highscore-panel-border", [.5, 0], this), this.initCheck = !1, this.responseData = !1, this.prevY = this.y, this.inputPrevY = null, this.inputVelY = 0, this.inputPrevX = null, this.inputVelX = 0, this.maskGfx = this.add(game.add.graphics()), this.maskGfx.y = 68, this.maskGfx.alpha = .5, this.maskWidth = 604, this.borderWidth = 5, this.maskHeight = 80, this.visiblePx = 195, this.updateMaskSize(), this.chinGroup = this.add(game.add.group()), this.inviteBtn = new G.Button(0, 0, "btn_invite", G.platform.invite), this.inviteBtn.addTextLabel("font-white", G.txt("Invite!"), 50), this.chinGroup.add(this.inviteBtn), this.toggleBtn = new G.Button(260, 0, "btn_up", function () {
            this.opened ? this.close() : (G.gameTracking.design("LeaderBoardExpandBtnClicked"), this.open())
        }, this), this.chinGroup.add(this.toggleBtn), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), this.leaderboards = {}, this.leaderboardsV = {}, this.fetchedData = {}, this.currentLeaderboard = null
    }, G.HighscorePanel.prototype = Object.create(Phaser.Group.prototype), G.HighscorePanel.prototype.init = function () {
        var i = {
            GLOBAL: G.LeaderboardData.getLeaderboardData("GLOBAL"),
            FRIENDS: G.LeaderboardData.getLeaderboardData("FRIENDS")
        },
            s = {
                vertical: !0,
                allEntries: !0,
                entriesNr: 5
            },
            a = {
                vertical: !1,
                allEntries: !0,
                entriesNr: 5
            };
        Object.keys(i).forEach(function (t, e) {
            "GLOBAL" === t ? (a.displayFullPos = !0, a.displayPos = !1) : (a.displayFullPos = !1, a.displayPos = !0), this.leaderboardsV[t] = this.add(new G.HighscorePanelLeaderboard(i[t], s)), this.leaderboardsV[t].visible = !1, this.leaderboards[t] = this.add(new G.HighscorePanelLeaderboard(i[t], a)), this.leaderboards[t].visible = !1, this.tabs[t] = this.tabsGroup.add(new G.HighscorePanelTabBtn(0, 0, t)), this.tabs[t].onTabClick.add(this.showLeaderboard, this)
        }, this), -1 !== Object.keys(i).indexOf("FRIENDS") ? this.showLeaderboard("FRIENDS") : this.showLeaderboard(Object.keys(i)[0])
    }, G.HighscorePanel.prototype.fetchData = function (e) {
        this.fetchedData[e] || (this.fetchedData[e] = !0, G.LeaderboardData.fetchLeaderboard(e, function (t) {
            this.fetchedData[e] = t, this.leaderboards[e].init(t), this.leaderboardsV[e].init(t), this.leaderboardsV[e].centerOnCurrent(this.maskWidth, 712), this.leaderboards[e].centerOnCurrent(this.maskWidth, 712)
        }, this))
    }, G.HighscorePanel.prototype.onScreenResize = function () {
        this.x = .5 * game.width + game.world.bounds.x
    }, G.HighscorePanel.prototype.showLeaderboard = function (t) {
        for (name in this.contentGroup.removeAll(), this.leaderboards) this.leaderboards[name].visible = !1, this.leaderboards[name].mask = !1, this.tabs[name].setAsInactive();
        for (name in this.leaderboardsV) this.leaderboardsV[name].visible = !1, this.leaderboardsV[name].mask = !1, this.tabs[name].setAsInactive();
        var e = this.opened ? this.leaderboardsV : this.leaderboards;
        e[t] && (this.currentLeaderboard = e[t], this.maskGfx.visible = !0, this.currentLeaderboard.visible = !0, this.currentLeaderboard.mask = this.maskGfx, this.tabs[t].setAsActive(), this.tabsGroup.bringToTop(this.tabs[t]), this.contentGroup.add(this.currentLeaderboard), this.currentLeaderboardName = t, this.fetchData(t)), this.inputVelY = 0, this.inputVelX = 0
    }, G.HighscorePanel.prototype.update = function () {
        this.y = game.height + this.hidingOffset - this.visiblePx, this.chinGroup.y = this.visiblePx - 30, this.currentLeaderboard && this.currentLeaderboard.update(), this.updateMaskSize(), this.updateInput(), this.hidingOffset = G.lerp(this.hidingOffset, this.hidingOffsetTarget, .1)
    }, G.HighscorePanel.prototype.updateMaskSize = function () {
        this.maskGfx.clear(), this.maskGfx.beginFill(16711680, 1), this.maskGfx.drawRect(-.5 * this.maskWidth, 0, this.maskWidth, this.maskHeight)
    }, G.HighscorePanel.prototype.updateInput = function () {
        if (this.clicked && this.currentLeaderboard && game.input.activePointer.isDown) {
            if (null !== this.inputPrevX) {
                var t = .5 * (game.input.activePointer.x - this.inputPrevX);
                this.inputVelX = t
            }
            if (null !== this.inputPrevY) {
                var e = .5 * (game.input.activePointer.y - this.inputPrevY);
                this.inputVelY = e
            }
            this.scrolled || (G.gameTracking.design("LeaderboardMapScrolled"), this.scrolled = !0), this.inputPrevX = game.input.activePointer.x, this.inputPrevY = game.input.activePointer.y
        } else this.clicked = !1, this.inputPrevY = null, this.inputPrevX = null;
        this.currentLeaderboard && (this.currentLeaderboard.HORIZONTAL && (this.currentLeaderboard.x += this.inputVelX), this.currentLeaderboard.VERTICAL && (this.currentLeaderboard.y += this.inputVelY), this.boundRistrict(this.currentLeaderboard)), this.inputVelX *= .95, this.inputVelY *= .95, Math.abs(this.inputVelX) < 1 && (this.inputVelX = 0), Math.abs(this.inputVelY) < 1 && (this.inputVelY = 0)
    }, G.HighscorePanel.prototype.boundRistrict = function (t) {
        if (t.VERTICAL) {
            var e = Math.min(0, -(t.height - this.maskHeight));
            0 < t.y && (t.y = G.lerp(t.y, 0, .5), t.y < 1 && (t.y = 0)), t.y < e && (t.y = G.lerp(t.y, e, .5), t.y > e + 1 && (t.y = e))
        }
        if (t.HORIZONTAL) {
            var i = Math.min(0, -(t.width - this.maskWidth));
            0 < t.x && (t.x = G.lerp(t.x, 0, .5), t.x < 1 && (t.x = 0)), t.x < i && (t.x = G.lerp(t.x, i, .5), t.x > i + 1 && (t.x = i))
        }
    }, G.HighscorePanel.prototype.open = function (t) {
        this.opened = !0, G.stopTweens(this), this.visiblePx = 850, this.toggleBtn.angle = 180, this.maskHeight = this.visiblePx - 70 - 68, this.showLeaderboard(this.currentLeaderboardName)
    }, G.HighscorePanel.prototype.close = function (t) {
        this.opened = !1, G.stopTweens(this), this.visiblePx = 195, this.toggleBtn.angle = 0, this.maskHeight = this.visiblePx - 70, this.showLeaderboard(this.currentLeaderboardName)
    }, G.HighscorePanelIngame = function () {
        Phaser.Group.call(this, game), this.fixedToCamera = !0, this.contentBg = G.makeImage(0, 0, "leaderboard_ingame_panel", [.5, 1], this), this.contentBg.inputEnabled = !0, this.contentBg.events.onInputDown.add(function () {
            this.clicked = !0
        }, this), this.clicked = !1, this.contentGroup = this.add(game.add.group()), this.contentGroup.x = -302, this.contentGroup.y = -85, this.currentLeaderboard = new G.HighscorePanelLeaderboard([], {
            vertical: !1,
            entriesNr: 5,
            allEntries: !0,
            displayPos: !0
        }), this.contentGroup.add(this.currentLeaderboard), this.add(this.contentGroup), this.maskGfx = this.add(game.add.graphics()), this.maskGfx.y = -85, this.maskGfx.alpha = .5, this.maskWidth = 604, this.maskHeight = 80, this.maskGfx.beginFill(16711680, 1), this.maskGfx.drawRect(-.5 * this.maskWidth, 0, this.maskWidth - 140, this.maskHeight), this.inputPrevY = null, this.inputVelY = 0, this.inputPrevX = null, this.inputVelX = 0, this.currentLeaderboard.mask = this.maskGfx, G.LeaderboardData.fetchLevelLeaderboard(G.lvl.lvlNr + 1, function (t, e) {
            this.currentLeaderboard.init(t), this.currentLeaderboard.centerOnCurrent(this.maskWidth, this.maskHeight), e && G.sb("pushWindow").dispatch(["friendBeaten", e[0], e[1]])
        }, this), this.inviteBtn = new G.Button(235, -45, "btn_invite_ingame", G.platform.invite, this), this.inviteBtn.addTextLabel("font-white", G.txt("Invite!"), 50), this.add(this.inviteBtn), this.additionalCameraOffset = 200, game.add.tween(this).to({
            additionalCameraOffset: 0
        }, 1e3, Phaser.Easing.Sinusoidal.InOut, !0), this.update()
    }, G.HighscorePanelIngame.prototype = Object.create(Phaser.Group.prototype), G.HighscorePanelIngame.prototype.update = function () {
        this.cameraOffset.x = .5 * game.width, this.cameraOffset.y = game.height + this.additionalCameraOffset, this.currentLeaderboard.update(), this.updateInput()
    }, G.HighscorePanelIngame.prototype.updateInput = function () {
        if (this.clicked && this.currentLeaderboard && game.input.activePointer.isDown) {
            if (null !== this.inputPrevX) {
                var t = .5 * (game.input.activePointer.x - this.inputPrevX);
                this.inputVelX = t
            }
            if (null !== this.inputPrevY) {
                var e = .5 * (game.input.activePointer.y - this.inputPrevY);
                this.inputVelY = e
            }
            this.scrolled || (G.gameTracking.design("LeaderboardMapScrolled"), this.scrolled = !0), this.inputPrevX = game.input.activePointer.x, this.inputPrevY = game.input.activePointer.y
        } else this.clicked = !1, this.inputPrevY = null, this.inputPrevX = null;
        this.currentLeaderboard && (this.currentLeaderboard.HORIZONTAL && (this.currentLeaderboard.x += this.inputVelX), this.currentLeaderboard.VERTICAL && (this.currentLeaderboard.y += this.inputVelY), this.boundRistrict(this.currentLeaderboard)), this.inputVelX *= .95, this.inputVelY *= .95, Math.abs(this.inputVelX) < 1 && (this.inputVelX = 0), Math.abs(this.inputVelY) < 1 && (this.inputVelY = 0)
    }, G.HighscorePanelIngame.prototype.boundRistrict = function (t) {
        if (t.HORIZONTAL) {
            var e = Math.min(0, -(t.width - this.maskWidth)) - 140;
            0 < t.x && (t.x = G.lerp(t.x, 0, .5), t.x < 1 && (t.x = 0)), t.x < e && (t.x = G.lerp(t.x, e, .5), t.x > 1 + e && (t.x = e))
        }
    }, G.HighscorePanelLeaderboard = function (t, e) {
        Phaser.Group.call(this, game), this.config = e || {}, this.config = JSON.parse(JSON.stringify(e)), this.brush = game.make.image(0, 0), this.avatarAlphaMask = game.make.image(0, 0, "leaderboard", "highscore-avatar-alphaMask"), this.txt = new G.Text(0, 0, " ", {}), this.rt = game.make.renderTexture(602, 70), this.rtPadding = e.rtPadding || 10, this.image = this.add(game.make.image(0, 0, this.rt)), this.waitingIcon = new G.WaitingIcon(301, 45), this.add(this.waitingIcon), e.vertical ? (this.VERTICAL = !0, this.rt.resize(602, 300), this.waitingIcon.y = 150) : (this.HORIZONTAL = !0, this.waitingIcon.y = 35, this.waitingIcon.scale.setTo(.75)), this.currentUser = null, this.currentUserX = null, this.currentUserY = null
    }, G.HighscorePanelLeaderboard.prototype = Object.create(Phaser.Group.prototype), G.HighscorePanelLeaderboard.prototype.init = function (t) {
        var e;
        if (this.waitingIcon.destroy(), e = this.config.allEntries ? Math.max(t.length, this.config.entriesNr) : this.config.entriesNr, this.config.entriesMax && (e = Math.min(e, this.config.entriesMax)), this.config.vertical) {
            var i = 70 * e;
            this.rt.resize(602, i)
        } else {
            var s = 145 * e;
            this.rt.resize(s + 2 * this.rtPadding, 70)
        }
        this.rt.x = game.world.bounds.x;
        for (var a = 0; a < e; a++) this.config.vertical ? t[a] ? this.createEntryVer(0, 70 * a, t[a].rank || a + 1, t[a]) : this.createEntryVer(0, 70 * a, a + 1) : t[a] ? this.createEntryHor(this.rtPadding + 145 * a, 10, t[a].rank || a + 1, t[a]) : this.createEntryHor(this.rtPadding + 145 * a, 10, a + 1)
    }, G.HighscorePanelLeaderboard.prototype.centerOnCurrent = function (t, e) {
        this.currentUser && (this.VERTICAL ? (this.y = -this.currentUserY + .5 * e, this.y = Math.min(0, this.y)) : (this.x = -this.currentUserX + .5 * t, this.x = Math.min(0, this.x)))
    }, G.HighscorePanelLeaderboard.prototype.createEntryVer = function (t, e, i, s) {
        s && s.isCurrentUser ? (G.changeTexture(this.brush, "highscore-v-hl-current"), this.rt.renderXY(this.brush, t, e)) : i % 2 == 1 && (G.changeTexture(this.brush, "highscore-v-hl"), this.rt.renderXY(this.brush, t, e)), this.txt.fill = "#008bf9", this.txt.fontSize = "25px", this.txt.anchor.x = .5, this.txt.updateTransform(), this.txt.userMaxWidth = 40, this.txt.setText(i.toString() + "."), this.txt.width = Math.min(40, this.txt.width), this.rt.renderXY(this.txt, t + 45, e + 17);
        var a = this;
        if (s) G.makeExtImage(t + 80, e + 10, s.image, "avatar_m", 0, this, !1, function () {
            avatar = a.alphaMaskAvatar(t + 80, e + 10, this, s && s.isCurrentUser, i), this.destroy()
        });
        else G.changeTexture(this.brush, "avatar_m"), avatar = this.alphaMaskAvatar(t + 80, e + 10, this.brush, s && s.isCurrentUser, i);
        var o = s ? s.name : "---";
        this.txt.anchor.x = 0, this.txt.updateTransform(), this.txt.fill = "#008bf9", this.txt.fontSize = "25px", this.txt.userMaxWidth = 250, this.txt.setText(o), this.rt.renderXY(this.txt, t + 145, e + 17), s && s.score && (this.txt.fill = "#008bf9", this.txt.fontSize = "25px", this.txt.userMaxWidth = 250, this.txt.anchor.x = 1, this.txt.updateTransform(), this.txt.setText(s.score.toString()), this.rt.renderXY(this.txt, t + 570, e + 17)), s && s.isCurrentUser && (this.currentUser = !0, this.currentUserY = e + 35)
    }, G.HighscorePanelLeaderboard.prototype.createEntryHor = function (t, e, i, s) {
        G.changeTexture(this.brush, "highscore-h-playerBg_small"), this.rt.renderXY(this.brush, t + 10, e);
        var a = this;
        if (s) G.makeExtImage(t + 0, e - 0, s.image, "avatar_m", 0, this, !1, function () {
            a.alphaMaskAvatar(t, e + 0, this, s && s.isCurrentUser, i), this.destroy()
        });
        else G.changeTexture(this.brush, "avatar_m"), this.alphaMaskAvatar(t, e + 0, this.brush, s && s.isCurrentUser, i);
        var o = s ? s.name : "---";
        this.txt.anchor.x = 0, this.txt.updateTransform(), this.txt.fill = "#008bf9", this.txt.fontSize = "20px", this.txt.userMaxWidth = 60, this.txt.setText(o), this.rt.renderXY(this.txt, t + 55, e + 3), s && s.score && (this.txt.fill = "#008bf9", this.txt.fontSize = "20px", this.txt.userMaxWidth = 60, this.txt.setText(s.score.toString()), this.rt.renderXY(this.txt, t + 55, e + 25)), s && s.isCurrentUser && (this.currentUser = !0, this.currentUserX = t + 100)
    }, G.HighscorePanelLeaderboard.prototype.alphaMaskAvatar = function (t, e, i, s, a) {
        var o, n = game.make.bitmapData(50, 50),
            r = new Phaser.Rectangle(0, 0, 50, 50);
        n.alphaMask(i, this.avatarAlphaMask, r, r), o = this.config.displayPos ? "highscore-avatar-border_num" : this.config.displayFullPos ? "highscore-avatar-border_num_full" : "highscore-avatar-border", G.changeTexture(this.brush, o), n.draw(this.brush, 0, 0, 50, 50);
        var h = n.addToWorld();
        if (this.rt.renderXY(h, t, e), n.destroy(), h.destroy(), s && (G.changeTexture(this.brush, "highscore-avatar-userBorder"), this.rt.renderXY(this.brush, t - 5, e - 5)), this.config.displayPos || this.config.displayFullPos) {
            this.txt.fontSize = "12px", this.txt.fill = "white", this.txt.anchor.x = .5, this.txt.userMaxWidth = this.config.displayPos ? 17 : 48, this.txt.setText(a.toString());
            var l = this.config.displayPos ? t + 10 : t + 25;
            this.rt.renderXY(this.txt, l, e + 32)
        }
    }, G.HighscorePanelTabBtn = function (t, e, i) {
        this.onTabClick = new Phaser.Signal, this.tabKeyLower = i.toLowerCase(), G.Button.call(this, t, e, "highscore-panel-tab-" + this.tabKeyLower + "-inactive", function () {
            this.onTabClick.dispatch(this.tabKey)
        }, this), this.anchor.setTo(0, 0), this.hitArea = new Phaser.Rectangle("GLOBAL" == i ? 0 : 320, 0, 320, 68), this.tabKey = i, this.keyTxt = new G.Text("GLOBAL" == i ? 160 : 480, 30, G.txt(i), {
            fill: "white",
            font: "ComicSansBold",
            fontSize: "40px",
            stroke: "#0a7fd5",
            strokeThickness: 1
        }, .5, 300), this.keyTxt.setShadow(0, 2, "#0a7fd5", 2, !0, !0), this.addChild(this.keyTxt), this.IMMEDIATE = !0, this.setAsInactive()
    }, G.HighscorePanelTabBtn.prototype = Object.create(G.Button.prototype), G.HighscorePanelTabBtn.prototype.setAsActive = function () {
        G.changeTexture(this, "highscore-panel-tab-" + this.tabKeyLower + "-active"), this.keyTxt.alpha = 1, this.keyTxt.y = 25
    }, G.HighscorePanelTabBtn.prototype.setAsInactive = function () {
        G.changeTexture(this, "highscore-panel-tab-" + this.tabKeyLower + "-inactive"), this.keyTxt.alpha = .5, this.keyTxt.y = 30
    }, G.LeaderboardData = {
        currentPlayer: null,
        lastGroupPosition: null,
        ready: !1,
        onReady: new Phaser.Signal,
        onFetch: {},
        onStateBinding: !1,
        leaderboards: {},
        onPerLevelFetch: new Phaser.Signal,
        perLevelPrev: [],
        fetchLeaderboard: function (i, t, e) {
            t && (this.onFetch[i] || (this.onFetch[i] = new Phaser.Signal), this.onFetch[i].addOnce(t, e)), this.onStateBinding || (this.onStateBinding = game.state.onStateChange.add(this.clearFetch, this)), sdkHandler.trigger("getLeaderboard", {
                scope: [{
                    name: i,
                    topPlayersCount: "GLOBAL" === i ? 10 : 20,
                    beforePlayerCount: 2,
                    afterPlayerCount: 3
                }],
                callback: function (t, e) {
                    t || e && (this.processLeaderboard(e, i), this.ready = !0, this.onReady.dispatch(), this.onFetch[i].dispatch(this.getLeaderboardData(i)))
                }
            }, this)
        },
        fetchLevelLeaderboard: function (s, t, e) {
            t && this.onPerLevelFetch.addOnce(t, e), this.onStateBinding || (this.onStateBinding = game.state.onStateChange.add(this.clearFetch, this)), sdkHandler.trigger("getLeaderboard", {
                scope: [{
                    name: "FRIENDS",
                    topPlayersCount: 20,
                    beforePlayerCount: 2,
                    afterPlayerCount: 3
                }],
                perLevel: s,
                callback: function (t, e) {
                    if (!t && e) {
                        var i = null;
                        this.perLevelPrev[s] && (i = this.getBeatenFriend(this.perLevelPrev[s], e.FRIENDS)), this.perLevelPrev[s] = e.FRIENDS, this.onPerLevelFetch.dispatch(e.FRIENDS, i)
                    }
                }
            }, this)
        },
        getBeatenFriend: function (t, e) {
            try {
                var i = t.find(function (t) {
                    return t.isCurrentUser
                }),
                    s = t.indexOf(i),
                    a = i ? i.score : 0,
                    o = e.find(function (t) {
                        return t.isCurrentUser
                    }),
                    n = e.indexOf(o),
                    r = o ? o.score : 0;
                if (!o) return null;
                if (r <= a) return null;
                var h = e[n + 1];
                if (!h) return null;
                if (0 === a) return h ? [o, h] : null;
                for (var l = h.userId, d = 0; d < s; d++)
                    if (t[d].userId === l) return [o, h];
                return null
            } catch (t) {
                console.log(t)
            }
        },
        clearFetch: function () {
            console.log("clear Fetch"), Object.keys(this.onFetch).forEach(function (t) {
                this.onFetch[t].removeAll()
            }, this), this.onReady.removeAll(), this.onPerLevelFetch.removeAll()
        },
        getLeaderboardData: function (t) {
            return this.leaderboards && this.leaderboards[t] ? this.leaderboards[t] : []
        },
        processLeaderboard: function (t, e) {
            console.log("processLeaderboard"), this.leaderboards[e] = t[e], this.leaderboards.FRIENDS && (this.currentPlayer = this.leaderboards.FRIENDS.find(function (t) {
                return t.isCurrentUser
            }))
        },
        checkIfNewHighscoreTier: function () {
            if (G.saveState.data && this.currentPlayer && 15e3 < this.currentPlayer.score) {
                var t = Math.floor(this.currentPlayer.score / 15e3);
                G.saveState.data.highscoreTierMsgs || (G.saveState.data.highscoreTierMsgs = []), -1 == G.saveState.data.highscoreTierMsgs.indexOf(t) && (G.saveState.data.highscoreTierMsgs.push(t), G.saveState.save(), G.platform.sendMsg("New highscore!", G.MsgWOW, {
                    name: this.currentPlayer.name,
                    avatar: this.currentPlayer.image,
                    score: this.currentPlayer.score
                }))
            }
        },
        checkIfBeat: function () {
            try {
                if (this.leaderboardsPrev && this.leaderboards && this.leaderboardsPrev.GROUP && this.leaderboards.GROUP) {
                    var t = this.leaderboardsPrev.GROUP.find(function (t) {
                        return t.isCurrentUser
                    });
                    console.log("lastCurrent", t);
                    var e = this.leaderboards.GROUP.find(function (t) {
                        return t.isCurrentUser
                    });
                    if (console.log("current", e), t && e && e.rank > t.rank) {
                        var i = this.leaderboardsPrev.GROUP.indexOf(e),
                            s = this.leaderboardsPrev.GROUP[i + 1];
                        console.log("other", s), s && G.platform.beatMsg({
                            name: this.currentPlayer.name,
                            avatar: this.currentPlayer.image,
                            score: this.currentPlayer.score
                        }, {
                            name: s.name,
                            avatar: s.image,
                            score: s.score
                        })
                    }
                }
            } catch (t) { }
        }
    }, G.platform = {
        invite: function () { },
        firstLevelMsg: function (t) { },
        beatMsg: function (t, e) { },
        shareBeatMsg: function (t, e) {
            return
        },
        sendMsg: function (t, e, i, s) { }
    }, G.msgToDataURL = function (t) {
        return G._msgBmp || (G._msgBmp = game.make.bitmapData(672, 354)), t.x = game.world.bounds.x, t.y = game.world.bounds.y, t.updateTransform(), G._msgBmp.clear(), G._msgBmp.drawGroup(t), t.destroy(), G._msgBmp.canvas.toDataURL()
    }, G.MsgBeaten = function (t, e) {
        Phaser.Group.call(this, game), console.log("G.MsgBeaten"), console.log(t, e), t.avatar || (t.avatar = t.image), e.avatar || (e.avatar = e.image), this.imagesToLoad = 2, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_beat", 0, this), this.friendsBeaten = this.add(new G.Text(336, 40, "Friend beaten!", {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "white"
        }, .5, 420));
        var i = this;
        this.avatar1 = G.makeExtImage(230, 129, t.avatar, null, 0, this, !1, function () {
            this.width = this.height = 94, i.imagesLoaded++, i.imagesLoaded == i.imagesToLoad && (i.ready = !0, game.time.events.add(100, i.onReady.dispatch, i.onReady))
        }), this.name1 = this.add(new G.Text(212, 156, t.name, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#0088d1"
        }, [1, .5], 420)), this.score1 = this.add(new G.Text(212, 196, t.score, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 4
        }, [1, .5], 420)), this.avatar2 = G.makeExtImage(354, 148, e.avatar, null, 0, this, !1, function () {
            this.width = this.height = 94, i.imagesLoaded++, i.imagesLoaded == i.imagesToLoad && (i.ready = !0, game.time.events.add(100, i.onReady.dispatch, i.onReady))
        }), this.name2 = this.add(new G.Text(470, 186, e.name, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#0088d1"
        }, [0, .5], 420)), this.avatar2.width = this.avatar2.height = 94, this.score2 = this.add(new G.Text(470, 226, e.score, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 4
        }, [0, .5], 420));
        var s = " scored higher than ";
        this.desc = this.add(new G.Text(336, 311, t.name + s + e.name + "!", {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#ffe715"
        }, .5, 420)), this.desc.addColor("#ffffff", t.name.length), this.desc.addColor("#ffe715", s.length + t.name.length), this.desc.addColor("#ffffff", s.length + t.name.length + e.name.length)
    }, G.MsgBeaten.prototype = Object.create(Phaser.Group.prototype), G.MsgBeatMe = function (t) {
        Phaser.Group.call(this, game), this.imagesToLoad = 1, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_beat_me", 0, this), this.friendsBeaten = this.add(new G.Text(336, 39, "Challenge Friend", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "white"
        }, .5, 420));
        var e = this;
        this.avatar1 = G.makeExtImage(380, 111, t.avatar, null, 0, this, !1, function () {
            this.width = this.height = 96, e.imagesLoaded++, e.imagesLoaded == e.imagesToLoad && (e.ready = !0, game.time.events.add(100, e.onReady.dispatch, e.onReady))
        }), this.name1 = this.add(new G.Text(424, 325, t.name, {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#0088d1"
        }, .5, 420)), this.score1 = this.add(new G.Text(424, 266, t.score, {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 4
        }, .5, 420)), this.name2 = this.add(new G.Text(241, 325, "YOU", {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "#0088d1"
        }, .5, 420)), this.score2 = this.add(new G.Text(241, 266, "???", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 4
        }, .5, 420)), this.desc = this.add(new G.Text(336, 311, "Can you beat me?", {
            font: "ComicSansBold",
            fontSize: "25px",
            fill: "white"
        }, .5, 420))
    }, G.MsgBeatMe.prototype = Object.create(Phaser.Group.prototype), G.MsgFirst = function (t) {
        Phaser.Group.call(this, game), this.imagesToLoad = 1, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_first_highscore", 0, this), this.friendsBeaten = this.add(new G.Text(336, 39, "First highscore ever!", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "white"
        }, .5, 420));
        var e = this;
        this.avatar1 = G.makeExtImage(266, 103, t.avatar, null, 0, this, !1, function () {
            this.width = this.height = 139, e.imagesLoaded++, e.imagesLoaded == e.imagesToLoad && (e.ready = !0, game.time.events.add(100, e.onReady.dispatch, e.onReady))
        }), this.score1 = this.add(new G.Text(336, 295, t.score, {
            font: "ComicSansBold",
            fontSize: "65px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 8
        }, .5, 420))
    }, G.MsgFirst.prototype = Object.create(Phaser.Group.prototype), G.MsgFirst.prototype.extToInt = function (t) {
        return G.extLoader.loadedUrls[t]
    }, G.MsgInvite = function (t) {
        Phaser.Group.call(this, game), this.imagesToLoad = 1, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_woow", 0, this), this.friendsBeaten = this.add(new G.Text(336, 39, "Play with me!", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "white"
        }, .5, 420)), this.score1 = this.add(new G.Text(336, 295, t.name, {
            font: "ComicSansBold",
            fontSize: "65px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 8
        }, .5, 420));
        var e = this;
        this.avatar1 = G.makeExtImage(266, 103, t.avatar, null, 0, this, !1, function () {
            this.width = this.height = 139, e.imagesLoaded++, e.imagesLoaded == e.imagesToLoad && (e.ready = !0, game.time.events.add(100, e.onReady.dispatch, e.onReady))
        })
    }, G.MsgInvite.prototype = Object.create(Phaser.Group.prototype), G.MsgWOW = function (t) {
        Phaser.Group.call(this, game), this.imagesToLoad = 1, this.imagesLoaded = 0, this.onReady = new Phaser.Signal, this.ready = !1, this.y = -9999, this.bg = G.makeImage(0, 0, "bg_woow", 0, this), this.friendsBeaten = this.add(new G.Text(336, 39, "Wow! See what I achieved!", {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "white"
        }, .5, 420));
        var e = this;
        this.avatar1 = G.makeExtImage(266, 103, t.avatar, null, 0, this, !1, function () {
            this.width = this.height = 139, e.imagesLoaded++, e.imagesLoaded == e.imagesToLoad && (e.ready = !0, game.time.events.add(100, e.onReady.dispatch, e.onReady))
        }), this.score1 = this.add(new G.Text(336, 295, t.score, {
            font: "ComicSansBold",
            fontSize: "65px",
            fill: "#ffe715",
            stroke: "#0088d1",
            strokeThickness: 8
        }, .5, 420))
    }, G.MsgWOW.prototype = Object.create(Phaser.Group.prototype), G.MsgWOW.prototype.extToInt = function (t) {
        return G.extLoader.loadedUrls[t]
    }, G.Window = function (t) {
        Phaser.Group.call(this, game), this.buttonsList = [], this.state = game.state.getCurrentState(), t.constructor === Array ? this[t[0]].apply(this, t.slice(1)) : this[t].apply(this, Array.prototype.slice.call(arguments, 1)), "taskSlider" != t && (game.add.tween(this.scale).from({
            x: 0
        }, 300, Phaser.Easing.Elastic.Out, !0), game.add.tween(this).from({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.In, !0)), G.sb("onWindowOpened").dispatch(this), G.sb("onStateChange").add(this.lockInput, this)
    }, G.Window.prototype = Object.create(Phaser.Group.prototype), G.Window.constructor = G.Window, G.Window.prototype.closeWindow = function (t, e) {
        this.closing || (this.lockInput(), this.closing = !0, this.boosterHighlight && (this.boosterHighlight.inputEnabled = !1, game.add.tween(this.boosterHighlight.shine).to({
            alpha: 0
        }, 800, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            this.boosterHighlight.destroy()
        }, this)), game.add.tween(this.scale).to({
            x: 1.5
        }, 200, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this).to({
            alpha: 0
        }, 200, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            G.sb("onWindowClosed").dispatch(), this.destroy(), t && t.call(e || !1)
        }, this))
    }, G.Window.prototype.addBackground = function (t) {
        t = t || "popup";
        this.bg = G.makeImage(0, 0, t, .5, this)
    }, G.Window.prototype.addCloseButton = function (t, e, i, s) {
        i = i || !1, s = s || this;
        this.closeButton = new G.Button(t || 250, e || -270, "btn_x", function () {
            this.closeWindow(i, s)
        }, this), this.registerButtons(this.closeButton)
    }, G.Window.prototype.registerButtons = function (t) {
        for (var e = 0; e < arguments.length; e++) this.buttonsList.push(arguments[e]), this.add(arguments[e]), arguments[e].addTerm(function () {
            return 1 == this.scale.x
        }, this)
    }, G.Window.prototype.lockInput = function () {
        this.buttonsList.forEach(function (t) {
            t.input.enabled = !1
        })
    }, G.Window.prototype.unlockInput = function () {
        this.buttonsList.forEach(function (t) {
            t.input.enabled = !0, t.input.useHandCursor = !0
        })
    }, G.Window.prototype.makeCoinBar = function (t, e, i) {
        this.coinArea = G.makeImage(0, e, "popup_text_backgr", .5, this), this.coinIco = G.makeImage(t - 130, e, "coin_1", .5, this), this.coinsTxt = new G.Text(0, e, G.saveState.getCoins().toString(), {
            style: "font-brown",
            fontSize: 45
        }, .5, 190), this.add(this.coinsTxt), game.incentivised && (this.plusBtn = new G.Button(t + 130, e, "btn_plus", function () {
            this.state.windowLayer.pushWindow(["moreMoney", i]), this.closeWindow()
        }, this), this.registerButtons(this.plusBtn))
    }, G.Window.prototype.buyLives = function () {
        game.incentivised ? this.buyLivesIncentivised() : this.buyLivesNotIncentivised()
    }, G.Window.prototype.buyLivesIncentivised = function () {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(0, -300, G.txt("Not enough Hearts"), {
            style: "font-beige",
            fontSize: "50px"
        }, .5, 300), this.add(this.titleTxt), this.closeButton = new G.Button(250, -255, "btn_x", function () {
            this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.preGroup = this.add(game.make.group()), this.heartImg = G.makeImage(0, -85, "icon_video_hearts", [.5, .5], this), this.preGroup.add(this.heartImg), this.watchVideoToGetTxt = new G.Text(0, 45, G.txt("Watch a video to get"), {
            style: "font-brown",
            fontSize: "40px"
        }, .5, 500), this.preGroup.add(this.watchVideoToGetTxt), this.moneyTxt = new G.LabelGroupT("+" + G.json.settings.livesForAd + " @heart@", 0, 110, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ece9e5",
            stroke: "#A0692E",
            strokeThickness: 5
        }, .5, 500), this.preGroup.add(this.moneyTxt), this.watchBtn = new G.Button(0, 220, "btn_green", function () {
            var t = game.sound.mute;
            game.sound.mute = !0, "ludosmundi.com" == document.domain ? (G.sfx.music.volume = 0, AnbycookGP(), game.sound.mute = t, this.watchBtn.inputEnabled = !1, "World" == game.state.current ? this.buyLivesIncentivised_thanks() : G.saveState.addLife(G.json.settings.livesForAd)) : (new G.NoMoreAds, this.watchBtn.inputEnabled = !1, this.watchBtn.alpha = .5, G.sfx.music.volume = 1)
        }, this), this.watchBtn.addTextLabel("font-blue-out", G.txt("Watch"), 50), this.registerButtons(this.watchBtn)
    }, G.Window.prototype.buyLivesIncentivised_thanks = function () {
        game.add.tween(this.preGroup).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.watchBtn.inputEnabled = !1, game.add.tween(this.watchBtn).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.postGroup = this.add(game.make.group()), this.thanksForWatching = new G.Text(0, -100, G.txt("Thanks for watching!"), {
            style: "font-blue",
            fontSize: "50px"
        }, .5, 500), this.postGroup.add(this.thanksForWatching), this.moneyBg = G.makeImage(0, 25, "popup_bigtext_backgr", [.5, .5], this.postGroup), this.moneyTxt = new G.LabelGroupT("+" + G.json.settings.livesForAd + " @heart@", 0, 25, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ece9e5",
            stroke: "#A0692E",
            strokeThickness: 5
        }, .5, 500), this.postGroup.add(this.moneyTxt), this.postGroup.alpha = 0, game.add.tween(this.postGroup).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.claimBtn = new G.Button(0, 230, "button_green", function () {
            if ("World" == game.state.current) {
                var t = this.state.uiTargetParticles.createDividedBatch(game.world.bounds.x + this.worldPosition.x, this.worldPosition.y, "heart", this.state.panel.lifeUI.lifeIcon, G.json.settings.livesForAd, 1);
                t.addOnPartFinish(function () {
                    G.saveState.addLife(1)
                }), t.start()
            } else G.saveState.addLife(G.json.settings.livesForAd);
            this.closeWindow()
        }, this), this.claimBtn.addTextLabel("font-white", G.txt("Claim"), 50), this.registerButtons(this.claimBtn), game.add.tween(this.claimBtn).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.Window.prototype.buyLivesNotIncentivised = function () {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(0, -300, G.txt("Not enough Hearts"), {
            style: "font-beige",
            fontSize: "50px"
        }, .5, 300), this.add(this.titleTxt), this.closeButton = new G.Button(250, -255, "btn_x", function () {
            this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.heartImg = G.makeImage(0, -70, "broken_heart", [.5, .5], this), this.heartImg.scale.setTo(2), this.moneyTxt = new G.LabelGroupT("+1 @heart@ = " + G.json.settings.lifePrice + "@coin_1@", 0, 60, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ece9e5",
            stroke: "#A0692E",
            strokeThickness: 5
        }, .5, 500), this.add(this.moneyTxt), this.buyBtn = new G.Button(0, 220, "btn_orange", function () {
            if (G.gameTracking.sink("Coins", "Life", "Map", G.json.settings.lifePrice), G.saveState.changeCoins(-G.json.settings.lifePrice, !0), "World" == game.state.current) {
                var t = this.state.uiTargetParticles.createDividedBatch(game.world.bounds.x + this.worldPosition.x, this.worldPosition.y, "heart", this.state.panel.lifeUI.lifeIcon, 1, 1);
                t.addOnPartFinish(function () {
                    G.saveState.addLife(1)
                }), t.start()
            } else G.saveState.addLife(1);
            this.closeWindow()
        }, this), this.buyBtn.addTextLabel("font-green", G.txt("Buy"), 50), this.registerButtons(this.buyBtn), G.saveState.getCoins() < G.json.settings.lifePrice && (this.buyBtn.alpha = .5, this.buyBtn.inputEnabled = !1)
    }, G.Window.prototype.daily2 = function () {
        G.saveState.ftueDailyRewardVisible || (G.saveState.ftueDailyRewardVisible = !0), this.incentivised = game.incentivised, this.played = 0, this.addBackground("popup_background_2"), this.bg.y = G.l(40), this.ribbon = G.makeImage(0, -270, "popup_top", .5, this), this.titleTxt = new G.Text(0, -295, G.txt("Prize wheel"), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 300), this.add(this.titleTxt), this.ribbonImg = G.makeImage(0, -215, "gold_wheel_ribbon", .5, this), this.ribbonTxt = new G.Text(0, 0, G.txt("3x higher winnings!"), {
            style: "font-blue-out-small",
            fontSize: 30
        }, .5, 350), this.ribbonImg.scale.setTo(0), this.ribbonImg.addChild(this.ribbonTxt), this.closeButton = new G.Button(260, -222, "btn_x", function () {
            G.saveState.ftueDailyRewardClose || (G.saveState.ftueDailyRewardClose = !0), this.wonPrize && (G.gift.applyGift(this.wonPrize), "coin" === this.wonPrize[0] ? G.gameTracking.source("Coins", "Reward", "DailyReward", this.wonPrize[1]) : G.gameTracking.source(G.saveState.nrToBoosterName(this.wonPrize[0][8]), "Reward", "DailyReward", this.wonPrize[1]), this.wonPrize = !1), this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.dailyGame = this.add(new G.DailyWheel(0, 70)), this.giftGroup = this.add(game.make.group()), this.giftGroup.y = 50, this.freeSpinBtn = new G.Button(0, 335, "button_green", function () {
            this.dailyGame.restart(), this.dailyGame.launch(game.rnd.between(600, 1400)), G.gameTracking.design("DailySpinClicked"), this.closeButton.visible = !1, G.saveState.data.freeSpin = !1, G.saveState.save(), this.freeSpinBtn.visible = !1, this.premiumSpinBtn.visible = !1
        }, this), this.freeSpinBtn.addTextLabel("font-green", G.txt("Spin"), 50), this.add(this.freeSpinBtn), this.premiumSpinBtn = new G.Button(0, 280, "button_play", function () {
            var t = game.sound.mute;
            game.sound.mute = !0, "ludosmundi.com" == document.domain ? (G.sfx.music.volume = 0, AnbycookGP(), game.sound.mute = t, this.dailyGame.restart(), this.dailyGame.launch(game.rnd.between(600, 1400)), this.closeButton.visible = !1, this.freeSpinBtn.visible = !1, this.premiumSpinBtn.visible = !1) : (new G.NoMoreAds, this.premiumSpinBtn.inputEnabled = !1, this.premiumSpinBtn.alpha = .5, G.sfx.music.volume = 1)
        }, this), this.premiumSpinBtn.label = new G.Text(42, 0, G.txt("Watch a video to try again"), {
            font: "ComicSansBold",
            fontSize: "30px",
            fill: "#f7ffdb",
            stroke: "#005700",
            lineSpacing: -25,
            strokeThickness: 5
        }, .5, 230, 70, !0, "center"), this.premiumSpinBtn.addChild(this.premiumSpinBtn.label), this.add(this.premiumSpinBtn), G.saveState.data.freeSpin ? this.changeToRegular() : this.changeToGold(), this.dailyGame.onFinish.add(function (t) {
            game.add.tween(this.dailyGame).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.daily2showPrize(t)
        }, this), this.plusCoin = new G.LabelGroupT("+@coin_1@", 100, 30, {
            font: "ComicSansBold",
            fontSize: "100px",
            fill: "#FDFBE4"
        }, .5, 200), this.plusCoin.visible = !1, this.add(this.plusCoin), this.youWinTxt = new G.Text(0, -40, G.txt("You win!"), {
            style: "font-beige-standard",
            fontSize: 60
        }, .5, 500), this.add(this.youWinTxt), this.youWinTxt.visible = !1, this.claimButton = new G.Button(0, 260, "button_green", function () {
            this.shareCheckbox && this.shareCheckbox.selected || this.daily2ClaimBtnAction()
        }, this), this.claimButton.addTextLabel("font-green", G.txt("Claim"), 50), this.registerButtons(this.claimButton), this.claimButton.inputEnabled = !1, this.claimButton.visible = !1
    }, G.Window.prototype.daily2ClaimBtnAction = function () {
        this.daily2applyPrize(this.wonPrize, !1), this.wonPrize = !1, this.claimButton.inputEnabled = !1
    }, G.Window.prototype.daily2showPrize = function (t) {
        this.youWinTxt.scale.setTo(0), this.youWinTxt.visible = !0, game.add.tween(this.youWinTxt.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Elastic.Out, !0), this.giftGfx = new G.LabelGroupT(G.gift.getLabelString(t), 0, 30, {
            font: "ComicSansBold",
            fontSize: "80px",
            fill: "#FDFBE4"
        }, .5, 300), this.giftGfx.scale.setTo(0), game.add.tween(this.giftGfx.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Elastic.Out, !0), this.giftGroup.add(this.giftGfx), this.wonPrize = t, game.time.events.add(1e3, function () {
            this.plusCoin.width, this.giftGfx.width, G.l(10);
            this.claimButton.alpha = 1, this.claimButton.scale.setTo(0), game.add.tween(this.claimButton.scale).to({
                x: 1,
                y: 1
            }, 600, Phaser.Easing.Elastic.Out, !0).onComplete.add(function () {
                this.claimButton.inputEnabled = !0, this.claimButton.input.useHandCursor = !0
            }, this), this.claimButton.visible = !0, this.shareCheckbox && (this.shareCheckbox.visible = !0, this.shareCheckbox.alpha = 0, game.add.tween(this.shareCheckbox).to({
                alpha: 1
            }, 600, Phaser.Easing.Elastic.Out, !0).onComplete.add(function () {
                this.shareCheckbox.ignoreChildInput = !1
            }, this)), this.closeButton.visible = !0
        }, this)
    }, G.Window.prototype.daily2applyPrize = function (t, e) {
        this.wonPrize = !1, "coin" === t[0] ? (this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.giftGfx.worldPosition.x, this.giftGfx.worldPosition.y, this.state.panel.coinsTxt, t[1]), G.gameTracking.source("Coins", "Reward", "DailyReward", t[1])) : (G.gift.applyGift(t), G.gameTracking.source(G.saveState.nrToBoosterName(t[0][8]), "Reward", "DailyReward")), game.time.events.add(1e3, this.daily2restart, this)
    }, G.Window.prototype.changeToRegular = function () {
        this.freeSpinBtn.visible = !0, this.premiumSpinBtn.visible = !1, 0 < this.ribbonImg.scale.x && (G.stopTweens(this.ribbonImg), game.add.tween(this.ribbonImg.scale).to({
            x: 0,
            y: 0
        }, 200, Phaser.Easing.Cubic.In, !0)), this.dailyGame.changeToRegular()
    }, G.Window.prototype.changeToGold = function () {
        this.freeSpinBtn.visible = !1, this.premiumSpinBtn.visible = !0, this.ribbonImg.scale.x < 1 && (G.stopTweens(this.ribbonImg), game.add.tween(this.ribbonImg.scale).to({
            x: 1,
            y: 1
        }, 500, Phaser.Easing.Elastic.Out, !0)), this.dailyGame.changeToGold()
    }, G.Window.prototype.daily2restart = function () {
        if (!game.incentivised) return this.closeWindow();
        this.shareCheckbox && (this.shareCheckbox.ignoreChildInput = !0, game.add.tween(this.shareCheckbox).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0)), this.claimButton.inputEnabled = !1, game.add.tween(this.claimButton).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this.plusCoin).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0), game.add.tween(this.dailyGame).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0, 400).onComplete.add(function () {
            G.saveState.data.freeSpin ? this.changeToRegular() : this.changeToGold()
        }, this), game.add.tween(this.youWinTxt.scale).to({
            x: 0,
            y: 0
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.giftGroup).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.In, !0).onComplete.add(function () {
            this.giftGroup.destroy(), this.giftGroup = this.add(game.make.group()), this.giftGroup.y = 40
        }, this)
    }, G.Window.prototype.daily2makeFirework = function (t, e) {
        var i = game.add.group();
        this.add(i), i.x = G.l(t), i.y = G.l(e);
        for (var s = 0; s < 10; s++) {
            var a = G.makeImage(0, 0, "firework", .5, i),
                o = 36 * (s + .5 * Math.random());
            a.fadeRate = .02 + .02 * Math.random(), a.grav = 4, a.scale.setTo(1.5), a.velX = G.lengthDirX(o, G.l(12), !1), a.velY = G.lengthDirY(o, G.l(12), !1), a.update = function () {
                this.x += this.velX, this.y += this.velY, this.y += this.grav, this.velX *= .97, this.velY *= .97, this.alpha -= this.fadeRate, this.alpha <= 0 && this.destroy()
            }
        }
        return i.update = function () {
            for (var t = this.children.length; t--;) this.children[t].update();
            0 == this.length && this.destroy()
        }, i
    }, G.Window.prototype.dailyChallenge = function (t) {
        this.addBackground("popup_background_2"), this.levelBg = G.makeImage(0, -290, "popup_top", .5, this), this.levelTxt = new G.Text(0, -315, G.txt("Daily Challenge"), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 330), this.add(this.levelTxt), this.closeButton = new G.Button(235, -257, "btn_x", function () {
            this.boosters.forEach(function (t) {
                t.signalBinding && t.signalBinding.detach()
            }), this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.addChild(this.closeButton);
        this.stars = [G.makeImage(-100, -150, "star_blank", .5, this), G.makeImage(0, -175, "star_blank", .5, this), G.makeImage(100, -150, "star_blank", .5, this)], this.stars[0].scale.setTo(.8), this.stars[2].scale.setTo(.8), this.taskBg = G.makeImage(0, 5, "popup_bigtext_backgr", .5, this), this.taskTxt = new G.Text(0, -70, G.txt("Task") + ":", {
            style: "font-beige-standard",
            fontSize: "45px"
        }, .5, 380), this.add(this.taskTxt), "collect" == t.goal[0] ? this.makeTaskCollectPanels(5, t) : this.add(new G.Text(0, 5, G.txt("points").toUpperCase() + ": " + t.goal[1], {
            style: "font-beige-header",
            fontSize: "50px"
        }, .5, 380)), this.buyTxt = new G.Text(0, 75, G.txt("Buy some boosters") + ":", {
            style: "font-beige-standard",
            fontSize: 35
        }, .5, 680), this.add(this.buyTxt), this.boosterBg = G.makeImage(0, 170, "popup_bigtext_backgr", .5, this), this.boosters = [new G.UI_StartBoosterButton(-195, 170, 5, 999), new G.UI_StartBoosterButton(0, 170, 7, 999), new G.UI_StartBoosterButton(195, 170, 8, 999)], this.addMultiple(this.boosters), this.continueBtn = new G.Button(0, 300, "btn_orange", function () {
            G.saveState.startChallenge(), G.sb("onStateChange").dispatch("Game", 999, !1, this.state.startBoosterConfig.getConfigForLevel(999), t)
        }, this), this.continueBtn.pulse(), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.dailyReward = function (t) {
        this.dayNr = game.math.clamp(t, 0, 6), this.y = 0, this.bg = G.makeImage(0, -330, "big_popup", [.5, 0], this), this.bg.scale.y = .9, this.ribbon = G.makeImage(0, -285, "daily_rewards_ribbon", .5, this), this.title = new G.Text(0, -300, G.txt("Daily Reward") + "!", {
            style: "font-beige-header",
            fontSize: "55px"
        }, .5, 400), this.title.padding.x = 10, this.add(this.title), G.sb("hideMainHighscorePanel").dispatch(), this.dailyReward_showCurrentGift(this.dayNr)
    }, G.Window.prototype.dailyReward_showCurrentGift = function (t) {
        this.currentDay = this.add(new G.DailyRewardCurrentGift(0, -30, t)), this.openBtn = new G.Button(0, 200, "btn_orange", this.dailyReward_openGift, this), this.openBtn.addTextLabel("font-green", G.txt("Open"), 40), this.add(this.openBtn)
    }, G.Window.prototype.dailyReward_openGift = function () {
        this.currentDay.showReward(), this.openBtn.visible = !1, this.openBtn.inputEnabled = !1, this.claimBtn = new G.Button(0, 200, "btn_orange", function () {
            this.currentDay.claimReward(), this.claimBtn.inputEnabled = !1, game.add.tween(this.claimBtn).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.currentDay).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(this.dailyReward_showGiftWeek, this)
        }, this), this.claimBtn.addTextLabel("font-green", G.txt("Claim"), 40), this.add(this.claimBtn)
    }, G.Window.prototype.dailyReward_showGiftWeek = function (t) {
        game.add.tween(this).to({
            y: -70
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), game.add.tween(this.bg.scale).to({
            y: 1.1
        }, 300, Phaser.Easing.Sinusoidal.InOut, !0), this.week = this.add(new G.DailyRewardWeek(0, 20, this.dayNr)), this.comeBackTxt = this.add(new G.Text(0, 270, G.txt("Come back tomorrow for more rewards!"), {
            style: "font-beige",
            fontSize: "30px",
            lineSpacing: -20
        }, .5, 400, null, !0, "center")), this.comeBackTxt.scale.setTo(0), game.add.tween(this.comeBackTxt.scale).to({
            x: 1,
            y: 1
        }, 600, Phaser.Easing.Elastic.Out, !0, 200), this.timerBg = G.makeImage(0, 345, "future_day_box_big", .5, this), this.timerBg.height = 40, this.timerBg.alpha = 0, game.add.tween(this.timerBg).to({
            alpha: 1
        }, 600, Phaser.Easing.Sinusoidal.Out, !0, 600), this.timer = new G.TextTimer(0, 347, 864e5 * G.saveState.data.dailyReward.nextDaily, {
            style: "font-beige",
            fontSize: "35px"
        }, .5), this.add(this.timer), this.timer.alpha = 0, game.add.tween(this.timer).to({
            alpha: 1
        }, 600, Phaser.Easing.Sinusoidal.Out, !0, 600), this.coolBtn = new G.Button(0, 435, "btn_orange", function () {
            this.coolBtn.inputEnabled = !1, game.add.tween(this.coolBtn.scale).to({
                x: 0,
                y: 0
            }, 300, Phaser.Easing.Cubic.In, !0), this.closeWindow(), G.sb("showMainHighscorePanel").dispatch()
        }, this), this.coolBtn.addTextLabel("font-green", G.txt("Cool"), 40), this.coolBtn.scale.setTo(0), game.add.tween(this.coolBtn.scale).to({
            x: 1,
            y: 1
        }, 300, Phaser.Easing.Cubic.Out, !0, 400), this.add(this.coolBtn)
    }, G.Window.prototype.gate = function (t) {
        this.addBackground("popup_background_2"), this.gateData = t, this.closeButton = new G.Button(250, -270, "btn_x", function () {
            this.closeWindow()
        }, this), this.registerButtons(this.closeButton);
        var e = this.savedData = G.saveState.getGateData(t.id),
            i = G.saveState.getAllStars();
        !1 === e.timerStartedAt && (e.timerStartedAt = Date.now(), G.saveState.save()), this.timerNewLevelsInTxt = new G.Text(0, -290, G.txt("New levels in"), {
            style: "font-brown",
            fontSize: 40
        }, .5, 400), this.add(this.timerNewLevelsInTxt);
        var s = 60 * t.req.timeMinutes - (Date.now() - e.timerStartedAt) / 1e3;
        this.timer = new G.TextTimer(0, -245, 0, {
            style: "font-brown",
            fontSize: "40px"
        }, .5, 400), this.timer.setSecLeft(s), this.timer.start(), this.add(this.timer);
        var a = -130;
        this.starsTxt = new G.LabelGroupT("@*1.4*star@" + i + "/" + t.req.stars, -210, 60 + a, {
            font: "ComicSansBold",
            fill: "#ece9e5",
            fontSize: "40px",
            stroke: "#A0692E",
            strokeThickness: 7
        }, [0, .5], 250), this.add(this.starsTxt), this.collectMoreStarsTxt = new G.Text(130, 65 + a, G.txt("Collect more stars!"), {
            font: "ComicSansBold",
            fill: "#ece9e5",
            fontSize: "40px",
            stroke: "#A0692E",
            strokeThickness: 7,
            lineSpacing: -25
        }, .5, 250, !1, !0, "center"), this.add(this.collectMoreStarsTxt), this.or2 = new G.Text(0, 30, G.txt("or"), {
            style: "font-brown",
            fontSize: "50px"
        }, .5, 500), this.add(this.or2), a = -80, this.priceTxt = new G.LabelGroupT(t.req.coins + " @coin_1@", -120, 230 + a, {
            font: "ComicSansBold",
            fill: "#ece9e5",
            fontSize: "40px",
            stroke: "#A0692E",
            strokeThickness: 7
        }, .5, 250), this.add(this.priceTxt), this.priceBtn = new G.Button(130, 230 + a, "btn_orange", function () {
            G.saveState.isEnoughToBuy(this.gateData.req.coins) ? (G.gameTracking.design("GateUnlockCoins"), G.gameTracking.sink("Coins", this.gateData.id.toString, "Map", this.gateData.req.coins), G.saveState.changeCoins(-1 * this.gateData.req.coins), G.saveState.openGate(this.gateData.id)) : game.incentivised ? (G.sb("pushWindow").dispatch(["moreMoney", ["gate", this.gateData]]), this.closeWindow()) : (this.priceBtn.alpha = .5, this.priceBtn.inputEnabled = !1)
        }, this), this.priceBtn.label = new G.Text(0, 0, G.txt("Buy a key"), {
            font: "ComicSansBold",
            fontSize: "30px",
            fill: "#f7ffdb",
            stroke: "#005700",
            lineSpacing: -25,
            strokeThickness: 5
        }, .5, .9 * this.priceBtn.width, this.priceBtn.height, !0, "center"), this.priceBtn.addChild(this.priceBtn.label), this.add(this.priceBtn), !game.incentivised && G.saveState.getCoins() < this.gateData.req.coins && (this.priceBtn.alpha = .5, this.priceBtn.inputEnabled = !1), this.registerButtons(this.priceBtn), this.update = function () {
            this.savedData.open && this.closeWindow()
        }
    }, G.Window.prototype.gift = function (t, e) {
        "Game" === game.state.current && (0 === G.lvl.lvlNr || G.lvl.lvlNr), this.addBackground("popup_background_2"), this.giftMakeTitle(t), t && this.giftMakeExplanation(t), this.gift = this.add(new G.GiftBox(0, t ? 50 : 0, !1, e)), this.continueBtn = new G.Button(5, 250, "btn_orange", function () {
            "Game" === game.state.current && (0 === G.lvl.lvlNr || G.lvl.lvlNr), this.continueBtn.inputEnabled = !1, this.continueBtn.visible = !1, game.add.tween(this.continueBtn).to({
                alpha: 0
            }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.gift.unpack(), this.getItBtn = new G.Button(5, 250, "btn_orange", function () {
                "Game" === game.state.current && (0 === G.lvl.lvlNr || G.lvl.lvlNr), this.closeWindow()
            }, this), this.getItBtn.addTextLabel("font-green", G.txt("Get it"), 50), this.registerButtons(this.getItBtn)
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Unpack it"), 50), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.giftMakeTitle = function (t) {
        if ("3stars" === t) {
            this.stars = [], this.starsGroup = game.add.group();
            for (var e = 0; e < 3; e++) this.stars[e] = G.makeImage(60 * e, e % 2 == 0 ? 0 : -20, "star", [0, .5], this.starsGroup), this.stars[e].scale.setTo(.7);
            this.starsGroup.y = G.l(-270), this.titleTxt = new G.Text(0, -270, G.txt("Gift"), {
                style: "font-beige-standard",
                fontSize: "60px"
            }, [0, .5], 300), this.starsGroup.x = -.5 * (this.starsGroup.width + this.titleTxt.width + G.l(10)), this.titleTxt.x = this.starsGroup.x + this.starsGroup.width + G.l(10), this.add(this.starsGroup), this.add(this.titleTxt)
        } else this.titleTxt = new G.Text(0, -270, "achievement" == t ? G.txt("Achievement gift") : G.txt("Gift"), {
            style: "font-beige-standard",
            fontSize: "60px"
        }, .5, 450), this.add(this.titleTxt)
    }, G.Window.prototype.giftMakeExplanation = function (t) {
        var e = "3stars" == t ? G.txt("Nice job! You earned 3 stars! Enjoy your gift!") : G.txt("Nice job! You won 3 times in a row! Enjoy your gift!");
        this.explanationTxt = new G.Text(0, -130, e, {
            font: "ComicSansBold",
            fill: "#FDFBE4",
            stroke: "#A0692E",
            strokeThickness: 7,
            fontSize: "35px",
            lineSpacing: -25
        }, .5, 450, 110, !0, "center"), this.add(this.explanationTxt)
    }, G.Window.prototype.giveUp = function (t, e) {
        this.state = game.state.getCurrentState(), t && this.state.windowLayer.pushWindow(t), this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -290, "popup_top", .5, this), this.titleTxt = new G.Text(0, -315, "NORMAL" == this.state.mode ? G.txt("Level") + " " + (G.lvlNr + 1) : G.txt("Daily Challenge"), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 330), this.add(this.titleTxt), this.loseProgressTxt = new G.Text(0, -70, G.txt("Your level progress will be lost!"), {
            font: "ComicSansBold",
            fontSize: "40px",
            fill: "#FDFBE4",
            stroke: "#A0692E",
            strokeThickness: 7,
            lineSpacing: -25
        }, .5, 500, 140, !0, "center"), this.add(this.loseProgressTxt), this.continueBtn = new G.Button(0, 120, "btn_orange", function () {
            this.closeWindow()
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn), this.continueBtn.pulse(), this.giveUpBtn = new G.Button(0, 250, "btn_red", function () {
            G.lvl.lvlNr, G.lvl.points, G.winsInRow = 0, "CHALLENGE" === this.state.mode ? G.gameTracking.fail("DailyChallenge", this.state.getLevelDimension(), void 0, G.lvl.points) : G.gameTracking.fail("Gate" + G.saveState.checkGateNr(G.lvlNr).toString(), this.state.getLevelDimension(), void 0, G.lvl.points), game.paused = !0, game.paused = !1, e && e()
        }, this), this.giveUpBtn.addTextLabel("font-red", G.txt("Give up"), 50), this.registerButtons(this.giveUpBtn), G.LIVES && (this.brokenHeart = G.makeImage(-120, 250, "broken_heart", .5, this), this.minusOneTxt = new G.Text(-125, 250, "-1", {
            style: "font-red",
            fontSize: "35px"
        }, .5, 50), this.add(this.minusOneTxt)), this.giveUpBtn.visible = !1, this.brokenHeart.visible = !1, this.minusOneTxt.visible = !1, this.giveUpBtn.visible = !0, this.brokenHeart.visible = !0, this.minusOneTxt.visible = !0
    }, G.Window.prototype.globalGoals = function () {
        G.gameTracking.design("MissionWindowVisibleOnMap"), this.addBackground("popup_background_2"), this.addCloseButton(), this.closeButton.terms = [], this.myMissionTxt = new G.Text(0, -280, G.txt("My Missions"), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 400), this.add(this.myMissionTxt), this.completeMissionsTxt = new G.Text(0, -235, G.txt("Complete missions to receive rewards!"), {
            style: "font-beige-standard",
            fontSize: "25px"
        }, .5, 400), this.add(this.completeMissionsTxt), this.add(new G.GlobalGoalPanelGroup(0, -140, 340))
    }, G.Window.prototype.level = function () {
        game.state.getCurrentState();
        this.addBackground("popup_background_2"), 1 === G.lvlNr || 2 === G.lvlNr || G.lvlNr, this.levelBg = G.makeImage(0, -305, "popup_top", .5, this), this.levelTxt = new G.Text(0, -334, G.txt("Level") + " " + (G.lvlNr + 1), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 330), this.add(this.levelTxt), this.closeButton = new G.Button(235, -263, "btn_x", function () {
            1 === G.lvlNr || G.lvlNr, this.boosters.forEach(function (t) {
                t.signalBinding && t.signalBinding.detach()
            }), this.closeWindow()
        }, this), this.registerButtons(this.closeButton), this.addChild(this.closeButton);
        var t = G.saveState.getStars(G.lvlNr);
        this.stars = [G.makeImage(-100, -180, 1 <= t ? "star" : "star_blank", .5, this), G.makeImage(0, -208, 2 <= t ? "star" : "star_blank", .5, this), G.makeImage(100, -180, 3 <= t ? "star" : "star_blank", .5, this)], this.stars[0].scale.setTo(.8), this.stars[2].scale.setTo(.8), this.taskBg = G.makeImage(0, -25, "popup_bigtext_backgr", .5, this), this.taskTxt = new G.Text(0, -90, G.txt("Task") + ":", {
            style: "font-beige-standard",
            fontSize: "45px"
        }, .5, 380), this.add(this.taskTxt), "collect" == G.lvlData.goal[0] ? this.makeTaskCollectPanels(-25, G.lvlData) : this.add(new G.Text(0, -25, G.txt("points").toUpperCase() + ": " + G.lvlData.goal[1], {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 380)), this.buyTxt = new G.Text(0, 65, G.txt("Buy some boosters") + ":", {
            style: "font-beige-standard",
            fontSize: "35px"
        }, .5, 680), this.add(this.buyTxt), this.boosterBg = G.makeImage(0, 150, "popup_bigtext_backgr", .5, this), this.boosters = [new G.UI_StartBoosterButton(-180, 150, 5, G.lvlNr), new G.UI_StartBoosterButton(0, 150, 7, G.lvlNr), new G.UI_StartBoosterButton(180, 150, 8, G.lvlNr)], this.addMultiple(this.boosters), this.continueBtn = new G.Button(0, 290, "btn_orange", function () {
            1 === G.lvlNr || G.lvlNr, G.sb("onStateChange").dispatch("Game", G.lvlNr, !1, this.state.startBoosterConfig.getConfigForLevel(G.lvlNr))
        }, this), this.continueBtn.pulse(), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.makeTaskCollectPanels = function (t, e) {
        for (var i = [
            [0],
            [-85, 85],
            [-170, 0, 170],
            [-205, -65, 65, 205]
        ], s = 0, a = e.goal[1].length; s < a; s++) {
            var o = G.json.settings.goals[e.goal[1][s][0]].sprite;
            G.makeImage(i[a - 1][s] - 5, t, o, [1, .5], this).scale.setTo(.68);
            var n = new G.Text(i[a - 1][s] + 40, t, e.goal[1][s][1].toString(), {
                style: "font-beige-header",
                fontSize: "35px"
            }, [1, .5], 85);
            this.add(n)
        }
    }, G.Window.prototype.levelFailed = function () {
        let pathArray = window.location.pathname.split("/"), newpath = ""; pathArray[1] && "arcade" != pathArray[1] && "games" != pathArray[1] && (newpath = "/" + pathArray[1]); var str = window.location.hostname, res = str.replace("static", "www"), dom = str.replace("static.", ""), gameprefix = ""; "igre123.com" == dom && (gameprefix = "igra"), "igre123.net" == dom && (gameprefix = "igra"), "igrice123.rs" == dom && (gameprefix = "igrica"), "giochi123.net" == dom && (gameprefix = "gioco"), "jogos123.net" == dom && (gameprefix = "jogo"), "spiele123.com" == dom && (gameprefix = "spiel"), "juegos123.net" == dom && (gameprefix = "juego"), "jeux123.fr" == dom && (gameprefix = "jeu"), "spelletjes123.nl" == dom && (gameprefix = "spel"), "play123.com" == dom && (gameprefix = "game"), scorepost(window.location.protocol + "//" + res + "/" + gameprefix + "/index.php?act=Arcade&do=newscore", { gname: "CandyCrshH5TH", gscore: eval(JSON.parse(localStorage.getItem("glmdataCC")).points.join("+")) });
        "NORMAL" == this.state.mode && (G.lvl.lvlNr, G.lvl.points), G.sfx.music.pause(), G.sfx.lvlfailed.play(), "CHALLENGE" === this.state.mode ? G.gameTracking.fail("DailyChallenge", this.state.getLevelDimension(), void 0, G.lvl.points) : G.gameTracking.fail("Gate" + G.saveState.checkGateNr(G.lvlNr).toString(), this.state.getLevelDimension(), void 0, G.lvl.points);
        for (var t = JSON.parse(localStorage.getItem("glmdataCC")).points, e = 0, i = 0; i < 451; i++) void 0 !== t[i] && (e += t[i]);
        try {
            window.parent.postMessage("comandd|" + e, "*")
        } catch (t) { }
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -290, "popup_top", .5, this), this.titleTxt = new G.Text(0, -315, "NORMAL" == this.state.mode ? G.txt("Level") + " " + (G.lvlNr + 1) : G.txt("Daily Challenge"), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 330), this.add(this.titleTxt), this.closeButton = new G.Button(250, -270, "btn_x", function () {
            G.sb("onStateChange").dispatch("World")
        }, this), this.closeButton.visible = !1, this.registerButtons(this.closeButton), G.LIVES && (this.brokenHeart = G.makeImage(0, -75, "broken_heart", .5, this), this.minusOneTxt = new G.Text(-55, -75, "-1", {
            style: "font-red",
            fontSize: "35px"
        }, .5, 50), this.add(this.minusOneTxt)), G.lvl.goalMgr.isPointBased() ? (this.butgoal = new G.Text(0, 115, G.txt("points").toUpperCase() + ":\n" + G.lvl.points + "/" + G.lvl.goalMgr.getPointTarget(), {
            style: "font-beige-standard",
            fontSize: "40px"
        }, .5, 380), this.add(this.butgoal)) : this.makeLevelFailedTaskCollectPanels(95), "NORMAL" === this.state.mode ? (this.retryBtn = new G.Button(5, 250, "btn_orange", function () {
            game.paused = !0, game.paused = !1, G.winsInRow = 0, G.gameTracking.design("LevelRetryButtonClicked"), 0 < G.saveState.getCurrentLivesNr() ? G.sb("onStateChange").dispatch("Game", G.lvl.lvlNr, G.debugMode) : G.sb("onStateChange").dispatch("World")
        }, this), this.retryBtn.addTextLabel("font-green", G.txt("Retry"), 50), this.registerButtons(this.retryBtn)) : (this.continueBtn = new G.Button(0, 240, "btn_green", function () {
            sdkHandler.trigger("playButtonPressed", {
                callback: function () {
                    G.sb("onStateChange").dispatch("World")
                }
            }, this)
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 70), this.registerButtons(this.continueBtn)), this.continueBtn && (this.continueBtn.visible = !1), this.retryBtn && (this.retryBtn.visible = !1), this.retryBtn && (this.retryBtn.visible = !0), this.continueBtn && (this.continueBtn.visible = !0), this.closeButton && (this.closeButton.visible = !0)
    }, G.Window.prototype.makeLevelFailedTaskCollectPanels = function (t) {
        var i = [
            [0],
            [-85, 85],
            [-170, 0, 170],
            [-205, -65, 65, 205]
        ];
        this.taskBg = G.makeImage(0, t, "popup_bigtext_backgr", .5, this), this.panels = [];
        for (var e = G.lvl.goal[1], s = 0, a = e.length; s < a; s++)
            if (0 < this.state.topBar.goalPanel.panels[s].amount) {
                var o = G.json.settings.goals[e[s][0]].sprite,
                    n = G.makeImage(0, t, o, .5, this);
                G.makeImage(70, 0, "task_fail", .5, n), this.panels.push(n)
            } var r = this.panels.length;
        this.panels.forEach(function (t, e) {
            t.x = G.l(i[r - 1][e] - 25)
        })
    }, G.Window.prototype.mapChest = function (t) {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -290, "popup_top", .5, this), this.titleTxt = new G.Text(0, -315, G.txt("Chest Unlocked"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 330), this.add(this.titleTxt), this.gifts = t, this.chest = G.makeImage(0, -25, "chest_open", .5, this), this.youReceiveTxt = new G.Text(0, -150, G.txt("You receive") + ":", {
            style: "font-beige",
            fontSize: "50px"
        }, .5, 550), this.add(this.youReceiveTxt), this.giftsLabelGroup = new G.LabelGroupT(G.gift.getLabelPackString(t), 0, 120, {
            font: "ComicSansBold",
            fontSize: "60px",
            fill: "#FDFBE4",
            stroke: "#A0692E",
            strokeThickness: 7
        }, [.5, .5], 500, 0), this.add(this.giftsLabelGroup), this.claimBtn = new G.Button(0, 245, "btn_orange", function () {
            this.gifts.forEach(function (t) {
                "coin" == t[0] ? (G.gameTracking.source("Coins", "Reward", "MapChest", t[1]), this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.chest.worldPosition.x, this.chest.worldPosition.y, this.state.panel.coinsTxt, t[1])) : (G.gameTracking.source("life" === t[0] ? "Life" : G.saveState.nrToBoosterName(t[0][8]), "Reward", "MapChest", t[1]), G.gift.applyGift(t))
            }, this), this.closeWindow()
        }, this), this.claimBtn.addTextLabel("font-green", G.txt("Claim"), 45), this.registerButtons(this.claimBtn)
    }, G.Window.prototype.mapGift = function (t) {
        this.giftData = G.gift.getGift(), this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(0, -300, G.txt("Gift"), {
            style: "font-beige-header",
            fontSize: "50px"
        }, .5, 300), this.add(this.titleTxt), this.addCloseButton(), this.mapGift_claim()
    }, G.Window.prototype.mapGift_watch = function () {
        this.preGroup = this.add(game.make.group()), this.preGroup.y = 40, this.watchGiftImg = G.makeImage(0, -100, "icon_video_gift", [.5, .5], this.preGroup), this.watchVideoToGetTxt = new G.Text(0, 46, G.txt("Watch a video to get"), {
            style: "font-blue",
            fontSize: "50px"
        }, .5, 500), this.preGroup.add(this.watchVideoToGetTxt), this.getGiftTxt = new G.Text(0, 46, G.txt("Watch a video to get"), {
            style: "font-blue",
            fontSize: "50px"
        }, .5, 500), this.preGroup.add(this.getGiftTxt), this.watchBtn = new G.Button(0, 230, "button_play", function () {
            var t = game.sound.mute;
            game.sound.mute = !0, "ludosmundi.com" == document.domain ? (G.sfx.music.volume = 0, AnbycookGP(), game.sound.mute = t, this.mapGift_claimAfterWatch()) : (new G.NoMoreAds, this.watchBtn.inputEnabled = !1, this.watchBtn.alpha = .5, G.sfx.music.volume = 1)
        }, this), this.watchBtn.addTextLabel("font-white", G.txt("Watch"), 55, 30, -4, 260), this.registerButtons(this.watchBtn)
    }, G.Window.prototype.mapGift_claim = function () {
        this.gift = this.add(new G.GiftBox(0, 0, !1, this.giftData)), this.claimBtn = new G.Button(0, 230, "button_green", function () {
            this.claimBtn.visible = !1, G.saveState.data.lastMapGiftOpenTime = Date.now(), this.getItBtn = new G.Button(5, 230, "btn_orange", function () {
                this.closeWindow()
            }, this), this.getItBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.getItBtn), this.gift.unpack(), "coin" === this.giftData[0] ? G.gameTracking.source("Coins", "Reward", "FreeGift", this.giftData[1]) : "life" === this.giftData[0] ? G.gameTracking.source("Life", "Reward", "FreeGift", this.giftData[1]) : -1 !== this.giftData[0].indexOf("booster") && G.gameTracking.source(G.saveState.nrToBoosterName(this.giftData[0][8]), "Reward", "FreeGift", this.giftData[1])
        }, this), this.claimBtn.addTextLabel("font-green", G.txt("Claim"), 50), this.registerButtons(this.claimBtn)
    }, G.Window.prototype.mapGift_claimAfterWatch = function () {
        this.watchBtn.inputEnabled = !1, game.add.tween(this.watchBtn).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.preGroup).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.mapGift_claim(), game.add.tween(this.claimBtn).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), game.add.tween(this.gift).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.gift.y = 30, this.thanksForWatching = new G.Text(0, -155, G.txt("Thanks for watching!"), {
            style: "font-blue",
            fontSize: 50
        }, .5, 500), this.add(this.thanksForWatching), game.add.tween(this.thanksForWatching).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.Window.prototype.moreMoney = function (t) {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(0, -300, G.txt("Get more coins"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 300), this.add(this.titleTxt), this.addCloseButton(), t && this.state.windowLayer.pushWindow(t), this.preGroup = this.add(game.make.group()), this.coinImg = G.makeImage(0, -100, "icon_video_coins", [.5, .5], this.preGroup), this.watchVideoToGetTxt = new G.Text(0, 55, G.txt("Watch a video to get"), {
            style: "font-beige",
            fontSize: 40
        }, .5, 500), this.preGroup.add(this.watchVideoToGetTxt), this.moneyTxt = new G.LabelGroupT("@coin_1@ " + G.json.settings.coinsForAd, 0, 110, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#FDFBE4"
        }, .5, 500), this.preGroup.add(this.moneyTxt), this.watchBtn = new G.Button(0, 230, "button_play", function () {
            var t = game.sound.mute;
            game.sound.mute = !0, "ludosmundi.com" == document.domain ? (G.sfx.music.volume = 0, AnbycookGP(), game.sound.mute = t, this.moreMoney_thanks()) : (new G.NoMoreAds, this.watchBtn.inputEnabled = !1, this.watchBtn.alpha = .5, G.sfx.music.volume = 1)
        }, this), this.watchBtn.addTextLabel("font-green", G.txt("Watch"), 50, 30, -4, 260), this.registerButtons(this.watchBtn)
    }, G.Window.prototype.moreMoney_thanks = function () {
        game.add.tween(this.preGroup).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.watchBtn.inputEnabled = !1, game.add.tween(this.watchBtn).to({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.postGroup = this.add(game.make.group()), this.thanksForWatching = new G.Text(0, -100, G.txt("Thanks for watching!"), {
            style: "font-beige",
            fontSize: 50
        }, .5, 500), this.postGroup.add(this.thanksForWatching), this.moneyBg = G.makeImage(0, 25, "popup_bigtext_backgr", [.5, .5], this.postGroup), this.moneyTxt = new G.LabelGroupT("@coin_1@ " + G.json.settings.coinsForAd, 0, 25, {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ece9e5",
            stroke: "#A0692E",
            strokeThickness: 5
        }, .5, 500), this.postGroup.add(this.moneyTxt), this.postGroup.alpha = 0, game.add.tween(this.postGroup).to({
            alpha: 1
        }, 300, Phaser.Easing.Sinusoidal.Out, !0), this.claimBtn = new G.Button(0, 230, "button_green", function () {
            "World" == game.state.current ? this.state.uiTargetParticles.createCoinBatch(game.world.bounds.x + this.moneyTxt.worldPosition.x, this.moneyTxt.worldPosition.y, this.state.panel.coinsTxt, G.json.settings.coinsForAd) : G.saveState.changeCoins(G.json.settings.coinsForAd), this.closeWindow()
        }, this), this.claimBtn.addTextLabel("font-green", G.txt("Claim"), 50), this.registerButtons(this.claimBtn), game.add.tween(this.claimBtn).from({
            alpha: 0
        }, 300, Phaser.Easing.Sinusoidal.Out, !0)
    }, G.Window.prototype.outOfMoves = function () {
        this.addBackground("popup_background_2"), this.makeCoinBar(0, -270, "outOfMoves"), G.sb("onGoalAchieved").add(this.closeWindow, this), this.outOfMovesTxt = new G.Text(0, -130, G.txt("Out of moves!"), {
            style: "font-brown",
            fontSize: 50
        }, .5, 500), this.add(this.outOfMovesTxt), this.endGameBtn = new G.Button(-120, 230, "end_game_btn", function () {
            G.sb("pushWindow").dispatch("levelFailed"), this.timerActivate = !1, this.closeWindow()
        }, this), this.endGameBtn.addTextLabel("font-gray", G.txt("End game"), 30), this.add(this.endGameBtn), G.LIVES && (this.brokenHeart = G.makeImage(-223, 226, "broken_heart", .5, this), this.minusOneTxt = new G.Text(-232, 226, "-1", {
            style: "font-red",
            fontSize: "35px"
        }, .5, 50), this.add(this.minusOneTxt)), this.promo = 0 == G.lvl.outOfMovesPopUp || Math.random() < .25, G.lvl.outOfMovesPopUp++, G.saveState.data.outOfMovesInterstitialTimer || (G.saveState.data.outOfMovesInterstitialTimer = 0), game.incentivised && Date.now() - G.saveState.data.outOfMovesInterstitialTimer > 60 * G.json.settings.interstitialSettings.outOfMovesTimerMin * 1e3 ? this.outOfMoves_addWatchButton() : this.outOfMoves_addBuyButton()
    }, G.Window.prototype.outOfMoves_addWatchButton = function () {
        this.watchBtn = new G.Button(140, 230, "moves-ad-btn", function () {
            this.watchBtn.inputEnabled = !1;
            var t = game.sound.mute;
            game.sound.mute = !0, "ludosmundi.com" == document.domain ? (G.sfx.music.volume = 0, AnbycookGP(), game.sound.mute = t, G.lvl.changeMoveNumber(5), this.closeWindow(), G.saveState.data.outOfMovesInterstitialTimer = Date.now()) : (new G.NoMoreAds, this.watchBtn.visible = !1, this.outOfMoves_addBuyButton(), G.sfx.music.volume = 1)
        }, this), this.registerButtons(this.watchBtn), "ja" === G.lang && (G.changeTexture(this.watchBtn, "btn_orange"), this.watchBtn.label = new G.Text(-40, 0, G.txt("watch-outOfMovesPopUp"), {
            fill: "#f7ffdb",
            fontSize: "30px",
            font: "Lobster",
            stroke: "#005700",
            strokeThickness: 7
        }, .5, 83), this.watchBtn.addChild(this.watchBtn.label), this.watchBtn.boosterIcon = G.makeImage(48, 0, "ui_booster_5", .5, this.watchBtn))
    }, G.Window.prototype.outOfMoves_addBuyButton = function () {
        this.timerTxt = new G.Text(0, 0, 60 * G.json.settings.outOfMovesTimer, {
            style: "font-brown",
            fontSize: 50
        }, .5, 500), this.timerTxt.cacheAsBitmap = !1, this.timerTxt.timer = 60 * G.json.settings.outOfMovesTimer, this.timerActivate = !0, this.add(this.timerTxt), this.price = this.promo ? Math.floor(2 * G.lvl.getPriceOfExtraMoves() * .7) : 2 * G.lvl.getPriceOfExtraMoves(), this.continueBtn = new G.Button(120, 230, "btn_orange", function () {
            G.saveState.data.coins >= this.price ? (G.lvl.buyExtraMoves(!0, this.price), this.timerActivate = !1, this.closeWindow(), G.ga.event("Recurring:GetMoreMoves:LevelEnd")) : (G.sb("pushWindow").dispatch(["moreMoney", "outOfMoves"]), this.timerActivate = !1, this.closeWindow())
        }, this), this.continueBtn.pulse(), this.continueBtn.extraMoveIcon = G.makeImage(-105, 0, "ui_booster_5", [0, .5], this.continueBtn), this.continueBtn.extraMoveIcon.scale.setTo(.95);
        var t = this.price + "@currency@";
        this.continueBtn.label = new G.LabelGroupT(t, 25, 0, {
            font: "ComicSansBold",
            fontSize: "35px",
            fill: "#f7ffdb",
            stroke: "#005700",
            strokeThickness: 5
        }, .5, 95), this.continueBtn.addChild(this.continueBtn.label), this.update = function () {
            if (this.timerActivate) {
                this.timerTxt.timer-- <= 0 && (this.timerActivate = !1, G.sb("pushWindow").dispatch("levelFailed"), this.closeWindow());
                var t = Math.ceil(this.timerTxt.timer / 60).toString();
                this.timerTxt.text != t && this.timerTxt.setText(t)
            }
        }, this.promo && (this.continueBtn.promoLabel = G.makeImage(115, -7, "off_lable", .5, this.continueBtn), this.continueBtn.promoTxt = this.continueBtn.addChild(new G.Text(117, -7, "-30%", {
            style: "font-red",
            fontSize: 25
        }, .5, 60)), this.continueBtn.promoTxt.angle = -10, this.continueBtn.label.y = G.l(10), this.continueBtn.label2 = new G.LabelGroupT(2 * G.lvl.getPriceOfExtraMoves() + "@currency@", 25, -30, {
            font: "ComicSansBold",
            fontSize: "20px",
            fill: "#ffe9d0",
            stroke: "#961400",
            strokeThickness: 5
        }, .5, 95), this.continueBtn.addChild(this.continueBtn.label2), this.continueBtn.crossOut = G.makeImage(25, -30, "coins_lable", .5, this.continueBtn), this.continueBtn.crossOut.cacheAsBitmap = !0, this.continueBtn.crossOut.width = 1.1 * this.continueBtn.label2.width, this.continueBtn.crossOut.height = 2, this.continueBtn.crossOut.angle = -10, this.continueBtn.bringToTop(this.continueBtn.label)), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.pause = function () {
        this.addBackground("popup_background_2"), this.ribbon = G.makeImage(0, -275, "popup_top", .5, this), this.titleTxt = new G.Text(6, -300, G.txt("Pause"), {
            style: "font-beige-header",
            fontSize: 50
        }, .5, 300), this.add(this.titleTxt), this.addCloseButton(253, -260), this.homeBtn = new G.Button(-130, -54, "btn_home", function () {
            this.state.windowLayer.pushWindow(["giveUp", "pause", function () {
                G.sb("onStateChange").dispatch(G.debugMode ? "EditorWorld" : "World")
            }]), this.closeWindow()
        }, this), this.playBtn = new G.Button(0, 150, "btn_play", function () {
            this.closeWindow()
        }, this), this.soundBtn = new G.SoundBtn(134, -50), this.registerButtons(this.soundBtn, this.homeBtn, this.playBtn)
    }, G.Window.prototype.taskSlider = function () {
        this.y = -1.5 * game.height, G.sfx.whoosh_short_1.play(), game.add.tween(this).to({
            y: G.l(-120)
        }, 400, Phaser.Easing.Sinusoidal.Out, !0).onComplete.add(function () {
            game.time.events.add(1e3, G.sfx.whoosh_short_2.play, G.sfx.whoosh_short_2), game.add.tween(this).to({
                y: 1.5 * game.height
            }, 400, Phaser.Easing.Sinusoidal.Out, !0, 1e3).onComplete.add(function () {
                G.sb("onWindowClosed").dispatch(), this.destroy()
            }, this)
        }, this), this.addBackground("task_slider"), this.bg.y = G.l(120), this.taskTxt = new G.Text(0, 50, G.txt("Task") + ":", {
            style: "font-beige-standard",
            fontSize: "40px"
        }, .5, 380), this.add(this.taskTxt), G.lvl.goalMgr.isPointBased() ? (this.goal = new G.Text(0, 115, G.txt("points").toUpperCase() + ": " + G.lvl.goalMgr.getPointTarget(), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 380), this.add(this.goal)) : this.makeTaskCollectPanels(115, G.lvlData)
    }, G.Window.prototype.thanksForWatching = function () {
        this.addBackground("popup_background_2"), this.thanksForWatching = new G.Text(0, 0, G.txt("Thanks for watching!"), {
            font: "ComicSansBold",
            fontSize: "50px",
            fill: "#ece9e5",
            stroke: "#A0692E",
            strokeThickness: 7,
            lineSpacing: -25
        }, .5, 530, 200, !0, "center"), this.add(this.thanksForWatching), this.continueBtn = new G.Button(5, 250, "btn_orange", function () {
            this.closeWindow()
        }, this), this.continueBtn.pulse(), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn)
    }, G.Window.prototype.win = function (t) {
        if (this.state = game.state.getCurrentState(), "CHALLENGE" !== this.state.mode) {
            G.lvl.lvlNr, G.lvl.points;
            var e = G.saveState.getLastPassedLevelNr();
            G.saveState.addLife(), G.lvl.resultData || (G.lvl.oldStars = G.saveState.getStars(G.lvl.lvlNr), G.lvl.resultData = G.saveState.passLevel(G.lvl.lvlNr, Math.max(1, G.lvl.stars), G.lvl.points, !0));
            var s = G.lvl.resultData,
                a = G.lvl.oldStars;
            a < 3 && 3 == s.stars && (G.winsInRow || (G.winsInRow = 0), G.winsInRow++), "CHALLENGE" === this.state.mode ? G.gameTracking.complete("DailyChallenge", this.state.getLevelDimension(), void 0, G.lvl.points) : G.gameTracking.complete("Gate" + G.saveState.checkGateNr(G.lvlNr).toString(), this.state.getLevelDimension(), void 0, G.lvl.points);
            for (var i = 0; i < G.lvl.items.length; i++) G.lvl.items[i] && G.saveState.changeItemAmount(i, G.lvl.items[i]);
            this.result = s, this.addBackground("popup_background_2");
            var o = s.stars;
            this.ribbon = G.makeImage(0, -305, "popup_top", .5, this), this.titleTxt = new G.Text(0, -334, G.txt("Level") + " " + (this.state.lvlNr + 1), {
                style: "font-beige-standard",
                fontSize: 50
            }, .5, 330), this.add(this.titleTxt), this.youWinTxt = new G.Text(0, -90, G.txt("You win!"), {
                style: "font-beige-standard",
                fontSize: 45
            }, .5, 530), this.add(this.youWinTxt), this.scoreBg = G.makeImage(20, -5, "popup_text_backgr", .5, this), this.scoreIcon = G.makeImage(-90, -5, "score_icon", .5, this), this.scoreIcon.scale.setTo(1.2), 0 < G.lvl.resultData.reward && (this.coinBg = G.makeImage(20, 95, "popup_text_backgr", .5, this), this.coinIco = G.makeImage(-90, 95, "coin_1", .5, this), this.amountTxt = new G.OneLineCounter(25, 95, "font-beige-header", 0, 45, 160, .5, .5), this.add(this.amountTxt)), this.scoreTxt = new G.Text(32, -5, G.lvl.points.toString(), {
                style: "font-beige-header",
                fontSize: 45
            }, .5, 190), this.add(this.scoreTxt), this.retryBtn = new G.Button(-120, 205, "btn_green", function () {
                1 === G.lvl.lvlNr || G.lvl.lvlNr, G.sb("onAllWindowsClosed").add(function () {
                    G.sb("onStateChange").dispatch("Game", G.lvlNr)
                }), this.closeWindow()
            }, this), this.retryBtn.addTextLabel("font-blue-out", G.txt("Retry"), 50), this.add(this.retryBtn), this.continueBtn = new G.Button(120, 205, "btn_orange", function () {
                0 === G.lvl.lvlNr || 1 === G.lvl.lvlNr || G.lvl.lvlNr, 4 <= G.saveState.getLastPassedLevelNr() && this.result.passed && G.sb("pushWindow").dispatch(["passedFriend", this.result]);
                for (var t = JSON.parse(localStorage.getItem("glmdataCC")).points, e = 0, i = 0; i < 451; i++) void 0 !== t[i] && (e += t[i]);
                try {
                    window.parent.postMessage("comandd|" + e, "*")
                } catch (t) { }
                G.sb("onAllWindowsClosed").add(function () {
                    game.paused = !0, game.paused = !1, G.sb("onStateChange").dispatch(G.debugMode ? "EditorWorld" : "World", {
                        lvlNr: G.lvl.lvlNr,
                        reward: G.lvl.moneyGained,
                        starImprovement: G.lvl.resultData.starImprovement
                    })
                }), 2 == G.lvl.lvlNr && 0 == a || 3 <= G.winsInRow && Math.random() < G.json.settings.chancesForAchievementGift ? (G.winsInRow = 0, G.sb("pushWindow").dispatch(["gift", "achievement"])) : (0 == G.lvl.lvlNr && 0 == a || a < 3 && 3 == s.stars && Math.random() < G.json.settings.chancesFor3StarsGift) && G.sb("pushWindow").dispatch(["gift", "3stars"]), this.closeWindow()
            }, this), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn), this.blankStars = [G.makeImage(-100, -180, "star_blank", .5, this), G.makeImage(0, -208, "star_blank", .5, this), G.makeImage(100, -180, "star_blank", .5, this)], this.blankStars[0].scale.setTo(.8), this.blankStars[2].scale.setTo(.8), this.stars = [G.makeImage(-100, -180, 1 <= o ? "star" : "star_blank", .5, this), G.makeImage(0, -208, 2 <= o ? "star" : "star_blank", .5, this), G.makeImage(100, -180, 3 <= o ? "star" : "star_blank", .5, this)], this.stars[0].scale.setTo(.8), this.stars[2].scale.setTo(.8), this.stars.forEach(function (t, e) {
                if (e + 1 <= o) {
                    var i = t.scale.x;
                    t.scale.setTo(0), game.add.tween(t.scale).to({
                        x: i,
                        y: i
                    }, 300, Phaser.Easing.Bounce.Out, !0, 800 + 200 * e).onStart.add(function () {
                        G.sfx.pop.play(), G.sfx.explosion_subtle.play(), this.add(new G.WinStarPart(t.x, t.y, !0)), this.add(new G.WinStarPart(t.x, t.y, !0)), this.add(new G.WinStarPart(t.x, t.y, !0)), this.add(new G.WinStarPart(t.x, t.y, !0)), this.add(new G.WinStarPart(t.x, t.y, !0))
                    }, this)
                } else t.visible = !1
            }, this), game.time.events.add(1e3, function () {
                0 < s.reward && (G.gameTracking.source("Coins", "Reward", "LevelCompleted", s.reward), G.gameTracking.source("Coins", "Reward", "InGameChest", G.lvl.moneyGainedChest), this.amountTxt.increaseAmount(s.reward))
            }, this), G.sb("onLevelMoneyGain").dispatch(s.reward), 0 == e && (this.retryBtn.visible = !1, this.continueBtn.x = 0, this.continueBtn.pulse()), 0 == G.lvl.lvlNr && 0 == a && 0 < o && G.platform.firstLevelMsg(G.lvl.points), this.retryBtn.visible = !1, this.continueBtn.visible = !1, 0 !== e && (this.retryBtn.visible = !0), this.continueBtn.visible = !0, 0 === G.lvl.lvlNr || 1 === G.lvl.lvlNr || G.lvl.lvlNr
        } else this.winChallenge()
    }, G.Window.prototype.winChallenge = function () {
        this.addBackground("popup_background_2");
        var s = G.lvl.stars;
        G.saveState.passExtraLevel(s), G.gameTracking.complete("DailyChallenge", G.lvlData.lvlNumber, void 0, G.lvl.points), this.ribbon = G.makeImage(0, -290, "popup_top", .5, this), this.titleTxt = new G.Text(0, -315, G.txt("Daily Challenge"), {
            style: "font-beige-standard",
            fontSize: "50px"
        }, .5, 330), this.add(this.titleTxt), this.youWinTxt = new G.Text(0, -70, G.txt("You win!"), {
            style: "font-brown",
            fontSize: 45
        }, .5, 530), this.add(this.youWinTxt), this.scoreBg = G.makeImage(20, 20, "popup_text_backgr", .5, this), this.scoreIcon = G.makeImage(-90, 20, "score_icon", .5, this), this.scoreIcon.scale.setTo(1.2);
        var t = G.json.settings.coinsForStar[s - 1];
        0 < t && (this.coinBg = G.makeImage(20, 120, "popup_text_backgr", .5, this), this.coinIco = G.makeImage(-90, 120, "coin_1", .5, this), this.amountTxt = new G.OneLineCounter(25, 120, "font-brown", 0, 45, 160, .5, .5), this.add(this.amountTxt)), this.scoreTxt = new G.Text(32, 20, G.lvl.points.toString(), {
            style: "font-brown",
            fontSize: 45
        }, .5, 190), this.add(this.scoreTxt), this.continueBtn = new G.Button(0, 240, "btn_orange", function () {
            G.sb("onAllWindowsClosed").add(function () {
                G.sb("onStateChange").dispatch(G.debugMode ? "EditorWorld" : "World", {
                    lvlNr: G.lvl.lvlNr,
                    reward: G.lvl.moneyGained,
                    starImprovement: s,
                    challenge: !0
                })
            }), this.closeWindow()
        }, this), this.continueBtn.addTextLabel("font-green", G.txt("Continue"), 50), this.registerButtons(this.continueBtn), this.blankStars = [G.makeImage(-100, -150, "star_blank", .5, this), G.makeImage(0, -175, "star_blank", .5, this), G.makeImage(100, -150, "star_blank", .5, this)], this.blankStars[0].scale.setTo(.8), this.blankStars[2].scale.setTo(.8), this.stars = [G.makeImage(-100, -150, 1 <= s ? "star" : "star_blank", .5, this), G.makeImage(0, -175, 2 <= s ? "star" : "star_blank", .5, this), G.makeImage(100, -150, 3 <= s ? "star" : "star_blank", .5, this)], this.stars[0].scale.setTo(.8), this.stars[2].scale.setTo(.8), this.stars.forEach(function (t, e) {
            if (e + 1 <= s) {
                var i = t.scale.x;
                t.scale.setTo(0), game.add.tween(t.scale).to({
                    x: i,
                    y: i
                }, 300, Phaser.Easing.Bounce.Out, !0, 800 + 200 * e).onStart.add(function () {
                    G.sfx.pop.play(), G.sfx.explosion_subtle.play(), this.add(new G.WinStarPart(t.x, t.y, !0)), this.add(new G.WinStarPart(t.x, t.y, !0)), this.add(new G.WinStarPart(t.x, t.y, !0)), this.add(new G.WinStarPart(t.x, t.y, !0)), this.add(new G.WinStarPart(t.x, t.y, !0))
                }, this)
            } else t.visible = !1
        }, this), game.time.events.add(1e3, function () {
            0 < t && (G.sb("onLevelMoneyGain").dispatch(t), this.amountTxt.increaseAmount(t))
        }, this)
    }, G.Assets = {
        order: ["TitleScreen", "World", "Game"],
        jsons: ["languages", "levels", "settings", "specialCandies", "tutorials"],
        TitleScreen: {
            spritesheets: ["titleScreen", "buttons"],
            sfx: ["music", "pop", "transition"]
        },
        World: {
            spritesheets: ["mapsheet", "ssheet"],
            fonts: ["font-white", "font-pink"],
            images: ["bg_road.png"]
        },
        Game: {
            spritesheets: ["board", "gems", "bursteffects"],
            images: ["bg_1.png", "bg_2.png", "bg_3.png", "bg_4.png"],
            sfx: ["boom", "sugarcrush", "sweet", "tasty", "delicious", "divine", "lvlcompleted", "lvlfailed", "exchange", "lightning", "line", "match_1", "match_2", "match_3", "match_4", "match_5", "xylophone_positive", "xylophone_positive2", "xylophone_positive6", "explosion_subtle"]
        }
    }, G.Boot = function (t) { }, G.Boot.prototype = {
        init: function () {
            game.state.onStateChange.add(function () {
                game.input.interactiveItems.removeAll()
            }), G.sentWorldMapDesignEvent = !1, G.playFabLogger = new G.PlayFabLogger;
            G.LIVES = !0, G.sb = G.SignalBox, G.lang = "fr", G.ASSETS.images.splice(G.ASSETS.images.indexOf("ja" === G.lang ? "BOOT-logo.png" : "BOOT-logo-ja.png"), 1), G.ASSETS.images.splice(G.ASSETS.images.indexOf("ja" === G.lang ? "BOOT-logo-mini.png" : "BOOT-logo-mini-ja.png"), 1);
            var t, e, i = !!(e = (t = (t || navigator.userAgent).toLowerCase()).match(/android\s([0-9\.]*)/)) && e[1];
            game.device.desktop ? (G.Loader.currentConfig = "hd", G.Loader.currentConfigMulti = 1) : i && parseFloat(i) < 4.4 ? (G.Loader.currentConfig = "ssd", G.Loader.currentConfigMulti = .4) : (G.Loader.currentConfig = "sd", G.Loader.currentConfigMulti = .6), G.Loader.currentConfig = "hd", G.Loader.currentConfigMulti = 1, this.input.maxPointers = 1, this.stage.disableVisibilityChange = !0, this.stage.backgroundColor = 16777215, game.tweens.frameBased = !1, game.time.advancedTiming = !0, this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL, this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL, this.scale.pageAlignHorizontally = !0, this.scale.pageAlignVertically = !0, this.scaleGameSizeUpdate = function () {
                game.state.current;
                var t = window.innerWidth / window.innerHeight,
                    e = game.state.getCurrentState(),
                    i = G.l(640),
                    s = G.l(960),
                    a = i / s;
                e.NOTRESIZABLE || e.NOSCALABLE || (G.horizontal = 1.35 < t, G.horizontal && "Game" === game.state.current && (s = G.l(770)), a < t ? (game.scale.setGameSize(Math.ceil(s * t), s), i = G.l(640), game.world.setBounds(Math.ceil(-.5 * (game.width - i)), 0, game.width, game.height)) : (game.scale.setGameSize(i, Math.ceil(i * (window.innerHeight / window.innerWidth))), i = G.l(640), game.world.setBounds(Math.ceil(-.5 * (game.width - i)), 0, Math.ceil(-.5 * (game.height - s)), game.height)), G.sb("onScreenResize").dispatch(game.width, game.height))
            }, game.resizeGame = this.scaleGameSizeUpdate, this.scale.setResizeCallback(function () {
                G.old_w == window.innerWidth && G.old_h == window.innerHeight || (G.old_w = window.innerWidth, G.old_h = window.innerHeight, game.resizeGame())
            }), game.incentivised = 1, game.resizeGame()
        },
        preload: function () {
            G.Loader.loadBootAssets()
        },
        create: function () {
            game.resizeGame(), G.overlayBitmap = game.make.bitmapData(256, 256), G.overlayBitmap.fill(255, 0, 0, 1), game.state.start("Preloader")
        },
        enterIncorrectOrientation: function () {
            G.orientated = !1, document.getElementById("orientation").style.display = "block"
        },
        leaveIncorrectOrientation: function () {
            G.orientated = !0, document.getElementById("orientation").style.display = "none"
        }
    }, G.pad = function (t, e, i) {
        return i = i || "0", (t += "").length >= e ? t : new Array(e - t.length + 1).join(i) + t
    }, Phaser.Stage.prototype.visibilityChange = function (t) {
        if ("pagehide" !== t.type && "blur" !== t.type && "pageshow" !== t.type && "focus" !== t.type && "click" !== t.type) (document.hidden || document.mozHidden || document.msHidden || document.webkitHidden || "pause" === t.type) && (game.sound.mute = !0);
        else if ("pagehide" === t.type || "blur" === t.type) this.game.focusLoss(t), game.sound.mute = !0;
        else if ("pageshow" === t.type || "focus" === t.type) {
            this.game.focusGain(t);
            try {
                var e = G.saveState.data.mute;
                game.paused || (game.sound.mute = e)
            } catch (t) { }
        }
    }, Phaser.Text.prototype.updateText = function () {
        this.texture.baseTexture.resolution = this._res, this.context.font = this.style.font;
        var t = this.text; - 1 < this.characterLimitSize && this.characterLimitSize < t.length && (t = this.text.substring(0, this.characterLimitSize) + this.characterLimitSuffix), this.style.wordWrap && (t = this.runWordWrap(this.text));
        var e = t.split(this.splitRegExp),
            i = this.style.tabs,
            s = [],
            a = 0,
            o = this.determineFontProperties(this.style.font),
            n = e.length;
        0 < this.style.maxLines && this.style.maxLines < e.length && (n = this.style.maxLines);
        for (var r = this._charCount = 0; r < n; r++) {
            if (0 === i) {
                var h = this.style.strokeThickness + this.padding.x;
                0 < this.colors.length || 0 < this.strokeColors.length || 0 < this.fontWeights.length || 0 < this.fontStyles.length ? h += this.measureLine(e[r]) : h += this.context.measureText(e[r]).width, this.style.wordWrap && (h -= this.context.measureText(" ").width)
            } else {
                var l = e[r].split(/(?:\t)/);
                h = this.padding.x + this.style.strokeThickness;
                if (Array.isArray(i))
                    for (var d = 0, c = 0; c < l.length; c++) {
                        var p = 0;
                        p = 0 < this.colors.length || 0 < this.strokeColors.length || 0 < this.fontWeights.length || 0 < this.fontStyles.length ? this.measureLine(l[c]) : Math.ceil(this.context.measureText(l[c]).width), 0 < c && (d += i[c - 1]), h = d + p
                    } else
                    for (c = 0; c < l.length; c++) {
                        0 < this.colors.length || 0 < this.strokeColors.length || 0 < this.fontWeights.length || 0 < this.fontStyles.length ? h += this.measureLine(l[c]) : h += Math.ceil(this.context.measureText(l[c]).width), h += this.game.math.snapToCeil(h, i) - h
                    }
            }
            s[r] = Math.ceil(h), a = Math.max(a, s[r])
        }
        this.canvas.width = a * this._res, this.canvas.width % 2 == 1 && (this.canvas.width = this.canvas.width + 1);
        var u, g, f = o.fontSize + this.style.strokeThickness + this.padding.y,
            m = f * n,
            G = this._lineSpacing;
        for (G < 0 && Math.abs(G) > f && (G = -f), 0 !== G && (m += 0 < G ? G * e.length : G * (e.length - 1)), this.canvas.height = m * this._res, this.canvas.height % 2 == 1 && (this.canvas.height = this.canvas.height + 1), this.context.scale(this._res, this._res), navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.style.backgroundColor && (this.context.fillStyle = this.style.backgroundColor, this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)), this.context.fillStyle = this.style.fill, this.context.font = this.style.font, this.context.strokeStyle = this.style.stroke, this.context.textBaseline = "alphabetic", this.context.lineWidth = this.style.strokeThickness, this.context.lineCap = "round", this.context.lineJoin = "round", r = this._charCount = 0; r < n; r++) u = this.style.strokeThickness / 2, g = this.style.strokeThickness / 2 + r * f + o.ascent, 0 < r && (g += G * r), "right" === this.style.align ? u += a - s[r] : "center" === this.style.align && (u += (a - s[r]) / 2), this.autoRound && (u = Math.round(u), g = Math.round(g)), 0 < this.colors.length || 0 < this.strokeColors.length || 0 < this.fontWeights.length || 0 < this.fontStyles.length ? this.updateLine(e[r], u, g) : (this.style.stroke && this.style.strokeThickness && (this.updateShadow(this.style.shadowStroke), 0 === i ? this.context.strokeText(e[r], u, g) : this.renderTabLine(e[r], u, g, !1)), this.style.fill && (this.updateShadow(this.style.shadowFill), 0 === i ? this.context.fillText(e[r], u, g) : this.renderTabLine(e[r], u, g, !0)));
        this.updateTexture(), this.dirty = !1
    };
    var saveAs = saveAs || function (r) {
        "use strict";
        if (!(void 0 === r || "undefined" != typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) {
            var t = r.document,
                h = function () {
                    return r.URL || r.webkitURL || r
                },
                l = t.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                d = "download" in l,
                c = /constructor/i.test(r.HTMLElement),
                p = function (t) {
                    (r.setImmediate || r.setTimeout)(function () {
                        throw t
                    }, 0)
                },
                u = function (t) {
                    setTimeout(function () {
                        "string" == typeof t ? h().revokeObjectURL(t) : t.remove()
                    }, 4e4)
                },
                g = function (t) {
                    return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type) ? new Blob([String.fromCharCode(65279), t], {
                        type: t.type
                    }) : t
                },
                s = function (t, e, i) {
                    i || (t = g(t));

                    function s() {
                        ! function (t, e, i) {
                            for (var s = (e = [].concat(e)).length; s--;) {
                                var a = t["on" + e[s]];
                                if ("function" == typeof a) try {
                                    a.call(t, i || t)
                                } catch (t) {
                                    p(t)
                                }
                            }
                        }(o, "writestart progress write writeend".split(" "))
                    }
                    var a, o = this,
                        n = "application/octet-stream" === t.type;
                    if (o.readyState = o.INIT, d) return a = h().createObjectURL(t), void setTimeout(function () {
                        l.href = a, l.download = e,
                            function (t) {
                                var e = new MouseEvent("click");
                                t.dispatchEvent(e)
                            }(l), s(), u(a), o.readyState = o.DONE
                    });
                    ! function () {
                        if (n && c && r.FileReader) {
                            var e = new FileReader;
                            return e.onloadend = function () {
                                var t = e.result;
                                r.location.href = "data:attachment/file" + t.slice(t.search(/[,;]/)), o.readyState = o.DONE, s()
                            }, e.readAsDataURL(t), o.readyState = o.INIT
                        } (a = a || h().createObjectURL(t), n) ? r.location.href = a : r.open(a, "_blank") || (r.location.href = a);
                        o.readyState = o.DONE, s(), u(a)
                    }()
                },
                e = s.prototype;
            return "undefined" != typeof navigator && navigator.msSaveOrOpenBlob ? function (t, e, i) {
                return e = e || t.name || "download", i || (t = g(t)), navigator.msSaveOrOpenBlob(t, e)
            } : (e.abort = function () { }, e.readyState = e.INIT = 0, e.WRITING = 1, e.DONE = 2, e.error = e.onwritestart = e.onprogress = e.onwrite = e.onabort = e.onerror = e.onwriteend = null, function (t, e, i) {
                return new s(t, e || t.name || "download", i)
            })
        }
    }("undefined" != typeof self && self || "undefined" != typeof window && window || this.content);
    "undefined" != typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" != typeof define && null !== define && null !== define.amd && define([], function () {
        return saveAs
    }), G.Editor = function (t) {
        this.game, this.add, this.camera, this.cache, this.input, this.load, this.math, this.sound, this.stage, this.time, this.tweens, this.state, this.world, this.particles, this.physics, this.rnd
    }, G.Editor.prototype = {
        init: function (t) {
            s = game.state.getCurrentState(), this.EDITOR = !0, this.NOTRESIZABLE = !0, G.lvl = {}, G.lvlNr = t, G.lvl.data = G.json.levels[t], G.lvlData = G.json.levels[t], G.lvl = new G.LvlObject
        },
        create: function () {
            game.world.setBounds(0, 0, game.width, game.height), game.scale.setGameSize(2e3, 1500), this.txt = game.add.existing(new G.Text(0, 0, "LEVEL " + (G.lvlNr + 1), {
                style: "font-white",
                fontSize: "50px"
            }, 0, 300)), this.board = new G.Board(G.lvlData, G.l(72), !0), this.board.update = function () { }, this.board.actionManager.glowPossibleMoves = function () { }, this.board.position.setTo(50, 150), this.board.boardIce.alpha = .7, this.board.inputController.destroy(), game.input.mouse.mouseWheelCallback = function () {
                this.board.y += -50 * game.input.mouse.wheelDelta
            }.bind(this), this.dropZones = new G.EditorDropZones(this.board, G.lvlData.predefinedDrops), this.sidePanel = new G.EditorSidePanel(900), this.keys = game.input.keyboard.addKeys({
                one: Phaser.Keyboard.ONE,
                two: Phaser.Keyboard.TWO,
                three: Phaser.Keyboard.THREE,
                four: Phaser.Keyboard.FOUR,
                five: Phaser.Keyboard.FIVE,
                six: Phaser.Keyboard.SIX,
                seven: Phaser.Keyboard.SEVEN,
                eight: Phaser.Keyboard.EIGHT,
                nine: Phaser.Keyboard.NINE,
                zero: Phaser.Keyboard.ZERO,
                tilde: Phaser.Keyboard.B,
                z: Phaser.Keyboard.Z,
                x: Phaser.Keyboard.X,
                c: Phaser.Keyboard.C,
                v: Phaser.Keyboard.V,
                b: Phaser.Keyboard.B,
                n: Phaser.Keyboard.N,
                m: Phaser.Keyboard.M,
                l: Phaser.Keyboard.L,
                Q: Phaser.Keyboard.Q,
                W: Phaser.Keyboard.W,
                E: Phaser.Keyboard.E,
                R: Phaser.Keyboard.R,
                T: Phaser.Keyboard.T,
                Y: Phaser.Keyboard.Y,
                U: Phaser.Keyboard.U,
                P: Phaser.Keyboard.P,
                A: Phaser.Keyboard.A,
                S: Phaser.Keyboard.S,
                D: Phaser.Keyboard.D,
                F: Phaser.Keyboard.F,
                G: Phaser.Keyboard.G,
                SPACE: Phaser.Keyboard.SPACEBAR
            }), this.keys.one.onDown.add(function () {
                this.dbgChangeCandy("1")
            }, this), this.keys.two.onDown.add(function () {
                this.dbgChangeCandy("2")
            }, this), this.keys.three.onDown.add(function () {
                this.dbgChangeCandy("3")
            }, this), this.keys.four.onDown.add(function () {
                this.dbgChangeCandy("4")
            }, this), this.keys.five.onDown.add(function () {
                this.dbgChangeCandy("5")
            }, this), this.keys.six.onDown.add(function () {
                this.dbgChangeCandy("6")
            }, this), this.keys.seven.onDown.add(function () {
                this.dbgChangeCandy("r")
            }, this), this.keys.eight.onDown.add(function () {
                this.dbgChangeCandy("chest")
            }, this), this.keys.nine.onDown.add(function () {
                this.dbgChangeCandy("goalCandy")
            }, this), this.keys.S.onDown.add(function () {
                this.dbgChangeCandy("infection")
            }, this), this.keys.tilde.onDown.add(function () {
                this.dbgChangeCandyIntoSpecial()
            }, this), this.keys.SPACE.onDown.add(function () {
                for (var t = 0; t < 8; t++)
                    for (var e = 0; e < 8; e++)
                        if (this.board.isCellOnBoard(t, e)) {
                            var i = this.board.getCandy(t, e);
                            i && i.destroy(), this.board.boardCandies.newCandy(t, e, this.board.getRandomThatDoesntMatch(t, e))
                        }
            }, this), this.keys.zero.onDown.add(function () {
                for (var t = 0; t < 10; t++)
                    for (var e = 0; e < 10; e++)
                        if (this.board.isCellOnBoard(t, e)) {
                            var i = this.board.getCandy(t, e);
                            i && i.destroy(), this.board.boardCandies.newCandy(t, e, "r")
                        }
            }, this), this.keys.P.onDown.add(function () {
                var t = this.board.inputController.pointerToCell(game.input.activePointer);
                if (t && this.board.isCellOnBoard(t)) {
                    var e = this.board.getCandy(t[0], t[1]);
                    e && "infection" !== e.candyType && (e.infected ? e.infect() : e.removeInfection())
                }
            }, this), this.keys.A.onDown.add(function () {
                var t = this.board.inputController.pointerToCell(game.input.activePointer);
                if (t && this.board.isCellOnBoard(t)) {
                    var e = this.board.getCandy(t[0], t[1]);
                    e && "infection" !== e.candyType && (e.wrapped ? e.unwrap() : e.wrap())
                }
            }, this), this.keys.D.onDown.add(function () {
                var t = this.board.inputController.pointerToCell(game.input.activePointer);
                if (t && this.board.isCellOnBoard(t)) {
                    var e = this.board.getCandy(t[0], t[1]);
                    e && "infection" !== e.candyType && (e.blocker ? 1 == e.blockerHp ? e.removeBlocker() : e.changeIntoBlocker(e.blockerHp - 1) : e.changeIntoBlocker(3))
                }
            }, this), this.keys.W.onDown.add(function () {
                this.changeHpToken(this.board.boardIce)
            }, this), this.keys.Y.onDown.add(function () {
                var e = this.board.inputController.pointerToCell(game.input.activePointer);
                if (e) {
                    if ("X" == this.board.boardData.get(e[0], e[1])) return this.board.boardData.set(e[0], e[1], null), void this.board.boardBackground.redraw();
                    this.board.boardData.set(e[0], e[1], "X"), this.board.boardBackground.redraw(), this.board.layers.forEach(function (t) {
                        t.grid.get(e[0], e[1]) && t.removeToken(e[0], e[1])
                    }, this)
                }
            }, this), this.keys.U.onDown.add(function () {
                this.changeHpToken(this.board.boardIce)
            }, this), this.keys.E.onDown.add(function () {
                this.changeHpToken(this.board.boardCage)
            }, this), this.keys.R.onDown.add(function () {
                this.changeHpToken(this.board.boardDirt)
            }, this), this.keys.F.onDown.add(function () {
                this.changeHpToken(this.board.boardDirtS)
            }, this), this.keys.G.onDown.add(function () {
                this.changeHpToken(this.board.boardJam)
            }, this), this.keys.T.onDown.add(function () {
                var t = this.board.inputController.pointerToCell(game.input.activePointer);
                t && this.board.getCandy(t[0], t[1]) && this.board.removeCandy(t[0], t[1])
            }, this), this.keys.z.onDown.add(function () {
                this.sidePanel.exportLevel();
                for (var t = G.lvlData.levelData.length, e = G.lvlData.levelData, i = JSON.parse(JSON.stringify(e)), s = t % 2 == 0 ? .5 * t : Math.floor(.5 * t), a = 0; a < s; a++) i[a] = JSON.parse(JSON.stringify(e[a])), i[t - (a + 1)] = JSON.parse(JSON.stringify(e[a]));
                G.lvlData.levelData = i, game.state.start("Editor", !0, !1, G.lvlNr)
            }, this), this.keys.x.onDown.add(function () {
                this.sidePanel.exportLevel();
                for (var t = G.lvlData.levelData[0].length, e = G.lvlData.levelData, i = JSON.parse(JSON.stringify(e)), s = t % 2 == 0 ? .5 * t : Math.floor(.5 * t), a = 0; a < e.length; a++)
                    for (var o = 0; o < s; o++) i[a][t - (o + 1)] = JSON.parse(JSON.stringify(i[a][o]));
                G.lvlData.levelData = i, game.state.start("Editor", !0, !1, G.lvlNr)
            }, this), this.keys.c.onDown.add(function () {
                var t = this.board.inputController.pointerToCell(game.input.activePointer);
                t && this.board.boardCollectCells.editorChangeCC(t[0], t[1])
            }, this)
        },
        update: function () { },
        changeHpToken: function (t) {
            var e = this.board.inputController.pointerToCell(game.input.activePointer);
            if (e) {
                var i = e[0],
                    s = e[1];
                if (this.board.isCellOnBoard(i, s)) {
                    var a = t.getToken(i, s);
                    if (a) {
                        var o = a.hp;
                        console.log("changeHpToken", o), t.destroyCell(i, s), o < t.config.maxHp && t.createToken(i, s, o + 1)
                    } else console.log("create token"), t.createToken(i, s, 1)
                }
            }
        },
        changeBoardSize: function (e, i) {
            e = game.math.clamp(e, 4, 10), i = game.math.clamp(i, 4, 10);
            var t = this.board.boardData;
            this.board.boardData = new G.GridArray(e, i, null), t.loop(function (t, e, i, s) {
                this.board.boardData.isInGrid(e, i) && "X" == t && this.board.boardData.set(e, i, "X")
            }, this), this.board.boardBackground.redraw(), this.board.layers.forEach(function (s) {
                var t = s.grid;
                s.grid = new G.GridArray(e, i, !1), t.loop(function (t, e, i) {
                    s.grid.isInGrid(e, i) ? s.grid.set(e, i, t) : t && t.destroy && t.destroy()
                })
            }), G.sb("editorChangedBoardSize").dispatch()
        },
        dbgChangeCandy: function (t) {
            var e = this.board.inputController.pointerToCell(game.input.activePointer);
            if (e && this.board.isCellOnBoard(e)) {
                var i = this.board.getCandy(e[0], e[1]);
                i && i.destroy(), this.board.boardCandies.newCandy(e[0], e[1], t)
            }
        },
        dbgChangeCandyIntoSpecial: function (t) {
            var e = this.board.inputController.pointerToCell(game.input.activePointer);
            if (e && this.board.isCellOnBoard(e)) {
                var i = this.board.getCandy(e[0], e[1]);
                if (!i) return;
                var s = i.candyType;
                console.log("candyType", s), !1 === i.specialType ? i.changeInto("horizontal", !0) : "horizontal" === i.specialType ? (i.destroy(), this.board.boardCandies.newCandy(e[0], e[1], s).changeInto("vertical", !0)) : "vertical" === i.specialType ? (i.destroy(), this.board.boardCandies.newCandy(e[0], e[1], s).changeInto("cross", !0)) : "cross" === i.specialType ? (i.destroy(), this.board.boardCandies.newCandy(e[0], e[1], s).changeInto("spiral", !0)) : "spiral" === i.specialType && (i.destroy(), this.board.boardCandies.newCandy(e[0], e[1], "1"))
            }
        },
        render: function () {
            game.debug.text(game.time.fps, 300, 10, "#ff0000");
            var t = this.board.inputController.pointerToCell(game.input.activePointer);
            if (game.debug.text(this.board.inputController.isPointerInRange(game.input.activePointer), 10, 10, "#ff0000"), game.debug.text(t, 10, 40, "#ff0000"), game.debug.text(this.board.isCellOnBoard(this.board.inputController.pointerToCell(game.input.activePointer)), 10, 80, "#ff0000"), t) {
                var e = this.board.getCandy(t[0], t[1]);
                e && game.debug.text(e.candyType, 10, 150, "#ff0000")
            }
        },
        shutdown: function () {
            G.IMMEDIATE = !1, game.input.mouse.mouseWheelCallback = null
        }
    }, G.EditorWorld = function (t) { }, G.EditorWorld.prototype = {
        init: function (t) {
            s = game.state.getCurrentState(), this.NOTRESIZABLE = !0, this.EDITOR = !0, this.lastLvlIndex = null, "object" == typeof t ? this.lastLvlIndex = t.lvlNr : "number" == typeof t && (this.lastLvlIndex = t), this.fillSaveState3Stars(), this.selectedLevels = []
        },
        create: function () {
            game.world.setBounds(0, 0, game.width, game.height), game.scale.setGameSize(2300, 1300), this.map = new G.WorldMap(G.json.settings.mapTiles, [], G.json.levels, !0), this.sidePanel = new G.EditorWorldSidePanel(1400, 10), this.keys = game.input.keyboard.addKeys({
                C: Phaser.Keyboard.C,
                M: Phaser.Keyboard.M,
                CTRL: Phaser.Keyboard.CONTROL
            }), this.cursors = game.input.keyboard.createCursorKeys(), game.input.onDown.add(function (t) {
                var e = Math.floor((t.worldX - this.map.x) * (1 / G.Loader.currentConfigMulti)),
                    i = Math.floor((t.worldY - this.map.y) * (1 / G.Loader.currentConfigMulti));
                this.keys.C.isDown && (this.map.lvlBtnGroup.add(G.makeImage(e, i, "map_point", .5)), G.json.levels.push({
                    mapX: e,
                    mapY: i,
                    moves: 30,
                    rainbowChance: 2,
                    nrOfTypes: 5,
                    goal: ["collect", [
                        ["1", 5],
                        ["2", 5],
                        ["3", 5],
                        ["4", 5]
                    ]],
                    starsReq: [5e3, 7500, 1e4],
                    drops: [],
                    levelData: [
                        [
                            ["1"],
                            ["3"],
                            ["1"],
                            ["4"],
                            ["1"]
                        ],
                        [
                            ["2"],
                            ["3"],
                            ["2"],
                            ["3"],
                            ["4"]
                        ],
                        [
                            ["4"],
                            ["1"],
                            ["2"],
                            ["1"],
                            ["2"]
                        ],
                        [
                            ["1"],
                            ["4"],
                            ["4"],
                            ["3"],
                            ["1"]
                        ],
                        [
                            ["2"],
                            ["1"],
                            ["3"],
                            ["2"],
                            ["4"]
                        ],
                        [
                            ["3"],
                            ["4"],
                            ["1"],
                            ["4"],
                            ["3"]
                        ]
                    ]
                }), this.fillSaveState3Stars(), this.map.refreshButtons()), this.keys.M.isDown && this.moveLevels(e, i)
            }, this), void 0 !== this.lastLvlIndex && (this.map.centerOnLvl(this.lastLvlIndex + 1), this.selectLevel(this.lastLvlIndex))
        },
        selectLevel: function (t) {
            "number" == typeof t ? this.keys.CTRL.isDown ? this.selectedLevels.includes(t) ? this.selectedLevels.splice(this.selectedLevels.indexOf(t), 1) : this.selectedLevels.push(t) : this.selectedLevels.includes(t) ? this.selectedLevels = [] : this.selectedLevels = [t] : Array.isArray(t) ? this.selectedLevels = t : this.selectedLevels = [], this.selectedLevels.sort(function (t, e) {
                return t - e
            }), this.map.refreshButtons(), G.sb("editorLevelSelected").dispatch(), this.sidePanel.refresh()
        },
        moveLevels: function (i, s) {
            if (0 !== this.selectedLevels.length) {
                var a = this.selectedLevels.map(function (t, e, i) {
                    var s = G.json.levels[i[0]],
                        a = G.json.levels[t];
                    return {
                        x: a.mapX - s.mapX,
                        y: a.mapY - s.mapY
                    }
                });
                this.selectedLevels.forEach(function (t, e) {
                    G.json.levels[t].mapX = i + a[e].x, G.json.levels[t].mapY = s + a[e].y
                }), this.map.refreshButtons()
            }
        },
        fillSaveState3Stars: function () {
            G.saveState.data.levels = [];
            for (var t = 0; t < G.json.levels.length; t++) G.saveState.data.levels.push(3);
            G.saveState.save()
        },
        update: function () {
            this.selectedLevels.forEach(function (t) {
                this.cursors.up.isDown && (G.json.levels[t].mapY--, this.map.refreshButtons()), this.cursors.down.isDown && (G.json.levels[t].mapY++, this.map.refreshButtons()), this.cursors.left.isDown && (G.json.levels[t].mapX--, this.map.refreshButtons()), this.cursors.right.isDown && (G.json.levels[t].mapX++, this.map.refreshButtons())
            }, this)
        },
        render: function () {
            game.debug.text(game.time.fps, 10, 10, "#ff0000")
        }
    }, G.ErrorState = function () { }, G.ErrorState.prototype = {
        preload: function () { },
        create: function () {
            this.bg = new G.LevelBg, new G.AnotherTabWindow
        }
    }, G.Game = function (t) { }, G.Game.prototype = {
        init: function (t, e, i, a) {
            this.gameId = game.rnd.uuid(), G.giftStatusIndex = 0, s = game.state.getCurrentState(), a ? (this.lvlNr = 1e4 + (G.saveState.data.dailyBeaten || 0), G.lvlData = a, this.mode = "CHALLENGE") : (this.lvlNr = Math.min(G.json.levels.length - 1, t), G.lvlData = JSON.parse(JSON.stringify(G.json.levels[t])), this.mode = "NORMAL"), this.debugMode = e || !1, G.debugMode = this.debugMode, this.startBoosters = i || [], this.doubleMoney = !1
        },
        preload: function () { },
        create: function () {
            if (this.lvlNr, game.resizeGame(), G.saveState.loseLife(), "CHALLENGE" === this.mode ? G.gameTracking.start("DailyChallenge", this.getLevelDimension()) : G.gameTracking.start("Gate" + G.saveState.checkGateNr(this.lvlNr).toString(), this.getLevelDimension()), this.tracker = new G.TrackData(this.lvlNr, G.lvlData), G.lvl = new G.LvlObject, this.debugMode && game.resizeGame(), this.bg = new G.LevelBg, this.board = new G.Board(G.lvl.data, G.l(72)), this.topBar = new G.UI_TopBar, this.boosterPanel = new G.UI_BoosterPanel, this.collectableAnimLayer = new G.CollectableAnimLayer(this.board, this.topBar), this.chestLayer = new G.ChestLayer, this.UIFxLayer = new G.UIFxLayer, this.fxTopLayer = new G.TopFxLayer(this.board, "fxTop"), this.fxTopLayer.position = this.board.boardCandies.position, this.fxTopLayer.scale = this.board.boardCandies.scale, this.pointsLayer = new G.PointsLayer(this.topBar), this.popOutMoneyLayer = new G.PopOutMoneyLayer, this.shoutOuts = new G.UI_ShoutOuts, this.overlay = new G.Overlay, this.windowLayer = new G.WindowLayer, this.fadeLayer = new G.FadeLayer, this.windowLayer.pushWindow("taskSlider"), G.json.tutorials[this.lvlNr + 1] && -1 == G.saveState.data.finishedTutorials.indexOf(this.lvlNr + 1) ? (G.sb("onAllWindowsClosed").addOnce(function () {
                new G.Tutorial(this.lvlNr + 1)
            }, this), G.sb("onTutorialFinish").addOnce(function () {
                G.sb("actionQueueEmpty").addOnce(function () {
                    this.board.actionManager.newAction("startBoosterInit")
                }, this)
            }, this)) : G.sb("onAllWindowsClosed").addOnce(function () {
                this.board.actionManager.newAction("startBoosterInit")
            }, this), this.debugMode && this.debugInit(), game.resizeGame(), !game.device.desktop) {
                game.input.onUp.add(function () {
                    if (!game.isFullScreen) {
                        game.isFullScreen = !0;
                        try {
                            document.body[game.device.requestFullscreen]()
                        } catch (t) {
                            console.log(t)
                        }
                    }
                }, this)
            }
        },
        update: function () {
            G.delta(), G.DEBUG && (this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer))
        },
        getLevelDimension: function () {
            return "Level" + G.pad(this.lvlNr + 1, 4)
        },
        render: function () { },
        initDebugTools: function () {
            var t = game.input.keyboard.addKeys({
                one: Phaser.Keyboard.ONE,
                two: Phaser.Keyboard.TWO,
                three: Phaser.Keyboard.THREE,
                four: Phaser.Keyboard.FOUR,
                five: Phaser.Keyboard.FIVE,
                six: Phaser.Keyboard.SIX,
                r: Phaser.Keyboard.R
            });
            t.one.onDown.add(function () {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("1")
            }, this), t.two.onDown.add(function () {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("2")
            }, this), t.three.onDown.add(function () {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("3")
            }, this), t.four.onDown.add(function () {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("4")
            }, this), t.five.onDown.add(function () {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("5")
            }, this), t.six.onDown.add(function () {
                this.dbgPos = this.board.inputController.pointerToCell(game.input.activePointer), s.board.getCandy(this.dbgPos[0], this.dbgPos[1]).changeInto("6")
            }, this)
        },
        shutdown: function () { },
        debugInit: function () {
            this.initDebugTools();
            var t = game.add.text(0, 0, "LEVEL " + (this.lvlNr + 1));
            game.add.existing(t);
            var e = game.add.text(150, 0, "TOOL");
            e.inputEnabled = !0, e.input.useHandCursor = !0, e.events.onInputDown.add(function () {
                G.openLevelMgr(G.json.levels)
            }, this), game.add.existing(e);
            var i = game.add.text(250, 0, "MAP");
            i.inputEnabled = !0, i.input.useHandCursor = !0, i.events.onInputDown.add(function () {
                game.state.start("EditorWorld")
            }, this), game.add.existing(i);
            var s = game.add.text(350, 0, "LVL EDIT");
            s.inputEnabled = !0, s.input.useHandCursor = !0, s.events.onInputDown.add(function () {
                game.state.start("Editor", !0, !1, this.lvlNr)
            }, this), game.add.existing(s);
            var a = game.add.text(500, 0, "PREV");
            a.inputEnabled = !0, a.input.useHandCursor = !0, a.events.onInputDown.add(function () {
                console.log("current: " + G.lvlNr), console.log("prev: " + Math.max(0, this.lvlNr - 1)), game.state.start("Game", !0, !1, Math.max(0, this.lvlNr - 1), !0)
            }, this), game.add.existing(a);
            var o = game.add.text(600, 0, "NEXT");
            o.inputEnabled = !0, o.input.useHandCursor = !0, o.events.onInputDown.add(function () {
                console.log("current: " + G.lvlNr), console.log("nextL " + Math.min(G.json.levels.length - 1, this.lvlNr + 1)), game.state.start("Game", !0, !1, Math.min(G.json.levels.length - 1, this.lvlNr + 1), !0)
            }, this), game.add.existing(o)
        }
    }, G.debugGoToLevel = function (t) {
        G.saveState.data.levels = [], G.saveState.data.finishedTutorials = [], G.saveState.data.boosters = [null, 30, 30, 30, 30, 30, 30, 30, 30];
        for (var e = 0; e < t; e++) G.saveState.data.levels.push(3);
        game.state.start("Game", !0, !1, t - 1, !0)
    }, G.MapEditor = function (t) { }, G.MapEditor.prototype = {
        init: function () {
            s = game.state.getCurrentState()
        },
        create: function () {
            this.mapGroup = new G.StrObjGroup(.5 * game.width, .5 * game.height, G.json.map), this.gfxHelpLayer = game.add.graphics(), this.gfxHelpLayer.lineStyle(1, 16711680, .5), this.gfxHelpLayer.moveTo(0, 0), this.gfxHelpLayer.lineTo(0, 2e3), this.gfxHelpLayer.moveTo(-600, 0), this.gfxHelpLayer.lineTo(-600, 2e3), this.gfxHelpLayer.moveTo(600, 0), this.gfxHelpLayer.lineTo(600, 2e3), this.modify = new G.Modify, this.modify.addMouseWheel()
        },
        update: function () {
            this.mapGroup.x = game.world.bounds.x + .5 * game.width, this.gfxHelpLayer.x = this.mapGroup.x
        },
        render: function () { }
    }, G.MidLoader = function (t) { }, G.MidLoader.prototype = {
        init: function (t, e) {
            console.log("mid state loader init"), this.transitionCandy = G.makeImage(480, 0, "transition", .5), this.transitionCandy.angle = G.fadeTransitionAngle || 0, this.transitionCandy.scale.setTo(7), this.transitionCandy.y = .5 * game.height, this.softGamesLogo = new G.Button(480, 0, "softgames_logo", function () {
                SG && SG.redirectToPortal()
            }), game.add.existing(this.softGamesLogo), this.softGamesLogo.y = .5 * game.height, this.softGamesLogo.width = G.l(800), this.softGamesLogo.scale.y = this.softGamesLogo.scale.x, this.softGamesLogo.addTerm(function () {
                return 1 == this.alpha
            }), this.softGamesLogo.input.useHandCursor = !1, this.softGamesLogo.alpha = 0, this.goTo = t, this.neededAssets = G.Assets[t], this.args = e || []
        },
        create: function () { },
        update: function () {
            G.delta(), this.transitionCandy.angle += 1 * G.deltaTime, G.fadeTransitionAngle = this.transitionCandy.angle, G.Loader.checkAssets(this.neededAssets) ? (this.softGamesLogo.alpha = game.math.clamp(this.softGamesLogo.alpha - .05, 0, 1), 0 == this.softGamesLogo.alpha && (this.args.splice(0, 0, this.goTo, !0, !1), game.state.start.apply(game.state, this.args))) : this.softGamesLogo.alpha = game.math.clamp(this.softGamesLogo.alpha + .05, 0, 1)
        }
    }, G.Preloader = function () { }, G.Preloader.prototype = {
        preload: function () {
            console.log("Preloader:"),
                this.ready = !1,
                this.load.onFileComplete.add(function (t) {
                }),
                this.logo = new G.Logo(320, 360), this.loadingBar = G.makeImage(320, 650, "loading_bar"), this.loadingBar.x -= .5 * this.loadingBar.width, this.loadingBar.y -= .5 * this.loadingBar.height, this.loadingBarFull = G.makeImage(320, 650, "loading_bar_full"), this.loadingBarFull.x -= .5 * this.loadingBarFull.width, this.loadingBarFull.y -= .5 * this.loadingBarFull.height, this.load.setPreloadSprite(this.loadingBarFull, 0), G.SGLOGO && (this.softgamesBtn = game.add.button(320, 850, "softgames_logo", function () { }), this.softgamesBtn.anchor.setTo(.5)), G.Loader.loadAssets(), this.fadeLayer = new G.FadeLayer
        },
        create: function () {
            G.addTextStyles(), G.logoURI = this.getImageURL("logo"), G.json.settings.boostersUnlock = [null, 0, 0, 0, 0], Object.keys(G.json.tutorials).forEach(function (t) {
                G.json.tutorials[t].boosterNr && (G.json.settings.boostersUnlock[G.json.tutorials[t].boosterNr] = parseInt(t))
            }), G.json.levels.find(function (t) {
                return t.tutID
            }) || Object.keys(G.json.tutorials).forEach(function (t) {
                G.json.levels[parseInt(t) - 1].tutID = t
            }), G.saveState.init(), this.processSpecialCandiesJson(), game.resizeGame(), null === game.cache.getSound("music") && (Phaser.Sound.prototype.play = function () { }), game.canvas.addEventListener("click", function () {
                try {
                    game.sound.context.resume()
                } catch (t) { }
            })
        },
        update: function () {
            if (!this.ready && G.saveState.ready && (null === game.cache.getSound("music") || G.sfx.music.isDecoded)) {
                if (this.ready = !0, G.globalGoalMgr = new G.GlobalGoalMgr, console.log("game is ready"), window._game_loading_timer) {
                    Date.now(), window._game_loading_timer;
                    window._game_loading_timer = !1
                }
                G.firstTime ? G.sb("onStateChange").dispatch("Game", 0) : G.sb("onStateChange").dispatch("World")
            }
        },
        processSpecialCandiesJson: function () {
            G.specialCandies = {
                names: [],
                patterns: [],
                lookUp: {},
                combos: G.json.specialCandies.combos,
                isTypeSpecial: function (t) {
                    return -1 != this.names.indexOf(t)
                },
                getSpecialData: function (t) {
                    return this.lookUp[t]
                }
            }, G.json.specialCandies.candies.forEach(function (t, e, i) {
                G.specialCandies.names.push(t.name), t.patterns && G.specialCandies.patterns.push([t.name, t.patterns]), G.specialCandies.lookUp[t.name] = t
            })
        },
        getImageURL: function (t) {
            return this._bmpMarker || (this._bmpMarker = this.game.make.image(0, 0, null, 0, null)), this._bmp || (this._bmp = this.game.make.bitmapData()), this._bmp.clear(), G.changeTexture(this._bmpMarker, t), this._bmp.resize(this._bmpMarker.width, this._bmpMarker.height), this._bmp.draw(this._bmpMarker), this._bmp.canvas.toDataURL()
        }
    }, G.TestState = function (t) {
        this.game, this.add, this.camera, this.cache, this.input, this.load, this.math, this.sound, this.stage, this.time, this.tweens, this.state, this.world, this.particles, this.physics, this.rnd
    }, G.TestState.prototype = {
        init: function () { },
        create: function () {
            this.testGroup = game.add.group(), this.testGroup2 = game.add.group(), this.testGroup2.x = 10, this.testGroup2.add(this.testGroup), this.testGroup3 = game.add.group(), this.testGroup3.y = 50, this.testGroup3.add(this.testGroup2), this.testGroup4 = game.add.group(), this.testGroup4.angle = 30, this.testGroup4.add(this.testGroup3);
            for (var t = 0; t < 200; t++) {
                var e = G.makeImage(0, 0, "b_play_big_1", .5);
                e.scale.x = 2, e.dirX = 20 * Math.random() - 10, e.dirY = 20 * Math.random() - 10, e.update = function () {
                    this.x += this.dirX, this.y += this.dirY, this.x < 0 && (this.x = 0, this.dirX *= -1), this.y < 0 && (this.y = 0, this.dirY *= -1), this.x > game.width && (this.x = game.width, this.dirX *= -1), this.y > game.height && (this.y = game.height, this.dirY *= -1)
                }
            }
        },
        update: function () { },
        render: function () {
            game.debug.text(game.time.fps, 300, 10, "#ff0000")
        }
    }, G.TitleScreen = function (t) { }, G.TitleScreen.prototype = {
        init: function () {
            G.giftStatusIndex = 0, this.stage.backgroundColor = 16768477, s = game.state.getCurrentState(), game.world.children[0] && game.world.children[0].destroy()
        },
        create: function () {
            this.bg = new G.LevelBg, this.gemThrower = new G.TitleScreenGemsThrower, this.gemThrower.alpha = .7, this.mainGroup = game.add.group(), this.logo = new G.Logo(320, 360), this.playBtn = new G.Button(320, 650, "btn_play", function () {
                G.sb("onStateChange").dispatch("World")
            }), game.add.existing(this.playBtn), this.soundBtn = new G.SoundBtn(100, 850), this.moreGamesBtn = new G.MoreGamesBtn(540, 850), this.mainGroup.addMultiple([this.logo, this.playBtn, this.soundBtn, this.moreGamesBtn]), this.fadeLayer = new G.FadeLayer, this.editorString = "", this.EDITORKEY = game.input.keyboard.addKeys({
                Q: Phaser.KeyCode.Q,
                W: Phaser.KeyCode.W,
                E: Phaser.KeyCode.E
            }), this.EDITORKEY.Q.onDown.add(function () {
                this.onEditorKey("Q")
            }, this), this.EDITORKEY.W.onDown.add(function () {
                this.onEditorKey("W")
            }, this), this.EDITORKEY.E.onDown.add(function () {
                this.onEditorKey("E")
            }, this), G.sb("onScreenResize").add(this.onScreenResize, this), this.onScreenResize(), game.resizeGame()
        },
        onScreenResize: function () {
            G.horizontal ? (this.logo.y = G.l(360), this.soundBtn.x = G.l(50), this.moreGamesBtn.x = G.l(590), this.soundBtn.y = this.moreGamesBtn.y = G.l(850), this.playBtn.y = G.l(800), this.mainGroup.y = 0) : (this.logo.y = G.l(260), this.soundBtn.x = G.l(100), this.moreGamesBtn.x = G.l(540), this.soundBtn.y = this.moreGamesBtn.y = G.l(850), this.playBtn.y = G.l(650), this.mainGroup.y = .5 * (game.height - G.l(960)))
        },
        update: function () {
            G.delta()
        },
        onEditorKey: function (t) {
            this.editorString += t, "QWEWQ" === this.editorString.slice(-5) && G.openLevelMgr(G.json.levels)
        },
        render: function () { }
    }, G.World = function (t) { }, G.World.prototype = {
        init: function (t) {
            G.globalGoalMgr.unlockCheck(), G.giftStatusIndex = 0, s = game.state.getCurrentState(), this.lastLevelData = t, this.startBoosterConfig = new G.StartBoosterConfig, document.body.style.backgroundColor = "#41354c", document.body.style.backgroundImage = "none"
        },
        create: function () {
            G.sentWorldMapDesignEvent || (G.gameTracking.design("SessionFirstTimeWorldMapVisible"), G.sentWorldMapDesignEvent = !0), game.resizeGame(), G.saveState.increaseMapVisibleCounter(), G.globalGoalMgr.saveGoals(), this.map = new G.WorldMap(G.json.settings.mapTiles, G.json.settings.mapAnimatedElements, G.json.levels);
            var t = G.saveState.getLastPassedLevelNr();
            if (G.json.levels[t] && (this.tutHandGroup = game.add.group(), this.tutHandGroup.position = this.map.position, this.tutHand = new G.MapTutHand(this.map), this.tutHandGroup.add(this.tutHand)), this.panel = new G.UI_MapPanel, this.mapGift = new G.MapGift, this.dailyChallengeIcon = new G.UI_DailyChallengeIcon(855, 220), this.dailyIcon = new G.UI_DailyIcon(855, 130, !G.saveState.data.sawDailyTut), this.globalGoalBtn = new G.GlobalGoalButton(-270, 125), G.GINGEREVENT && (this.gb = new G.GingerMapButton), this.uiTargetParticlesBW = new G.UITargetParticles, this.windowLayer = new G.WindowLayer(0, 0), this.windowLayer.resize(), this.fxMapLayer = new G.FxMapLayer, this.uiTargetParticles = new G.UITargetParticles, this.fadeLayer = new G.FadeLayer, !game.device.desktop) {
                game.input.onUp.add(function () {
                    if (!game.isFullScreen) {
                        game.isFullScreen = !0;
                        try {
                            document.body[game.device.requestFullscreen]()
                        } catch (t) {
                            console.log(t)
                        }
                    }
                }, this)
            }
            if (!G.checkedDailyReward) {
                G.checkedDailyReward = !0;
                var e = G.saveState.dailyReward_reportVisit();
                null !== e && G.sb("pushWindow").dispatch(["dailyReward", e])
            }
        },
        update: function () {
            G.delta()
        },
        makeBlackOverlay: function () { },
        render: function () { }
    }, window.startGame = function () {
        var t = new Phaser.Game(800, 1100, Phaser.CANVAS, "", null, !0);
        (window.game = t).state.add("Boot", G.Boot), t.state.add("Preloader", G.Preloader), t.state.add("World", G.World), t.state.add("Game", G.Game), t.state.add("Editor", G.Editor), t.state.add("EditorWorld", G.EditorWorld), t.state.add("TitleScreen", G.TitleScreen), t.state.add("TestState", G.TestState), t.state.add("MidLoader", G.MidLoader), t.state.add("ErrorState", G.ErrorState), t.state.add("MapEditor", G.MapEditor), t.state.start("Boot")
    }, window.initGame = function () {
        document.body.style.backgroundImage = "url(img/banner.webp)", document.body.style.backgroundRepeat = "no-repeat", document.body.style.backgroundSize = "cover", document.body.style.backgroundPosition = "center", G.BuildEnvironment.RAVEN_DSN && Raven.config(G.BuildEnvironment.RAVEN_DSN).install();
        var t = ["function", "startGame"];
        typeof lance == t[0] && window[t[1]]()
    }, G.ASSETS = {
        spritesheets: ["board", "BOOT-preloader", "bursteffects", "buttons", "dailyReward", "gems", "leaderboard", "mapsheet", "ssheet"],
        sfx: ["boom.mp3", "sugarcrush.mp3", "sweet.mp3", "tasty.mp3", "delicious.mp3", "divine.mp3", "lvlcompleted.mp3", "lvlfailed.mp3", "booster.mp3", "brick_break.mp3", "cash_register.mp3", "chain_rattle.mp3", "chest_open.mp3", "chest_open_louder.mp3", "clock_tick.mp3", "coin_collect.mp3", "dirt_break.mp3", "exchange.mp3", "explosion_subtle.mp3", "forest_sounds.mp3", "ice_break_0.mp3", "ice_break_1.mp3", "lightning.mp3", "line.mp3", "match_1.mp3", "match_2.mp3", "match_3.mp3", "match_4.mp3", "match_5.mp3", "music.mp3", "pop.mp3", "stone_impact_1.mp3", "stone_impact_2.mp3", "stone_impact_3.mp3", "transition.mp3", "whoosh.mp3", "whoosh_short_1.mp3", "whoosh_short_2.mp3", "xylophone_positive.mp3", "xylophone_positive2.mp3", "xylophone_positive6.mp3", "xylophone_positive_12.mp3"],
        images: ["BOOT-background_1.jpg", "BOOT-logo-ja.png", "BOOT-logo-mini-ja.png", "BOOT-logo-mini.png", "BOOT-logo.png", "Map_background_tileable_0.jpg", "Map_background_tileable_1.jpg", "Map_background_tileable_2.jpg", "Map_background_tileable_3.jpg", "map_margin.png"],
        json: ["json.json", "languages.json", "levels.json", "map.json", "settings.json", "specialCandies.json", "tutorials.json"],
        fonts: {}
    }
}();