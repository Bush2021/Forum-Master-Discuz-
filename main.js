// ==UserScript==
// @name         Forum Master・Discuz!
// @name:en      Forum Master・Discuz!
// @name:zh-CN   论坛大师・Discuz!
// @name:zh-TW   論壇大師・Discuz!
// @namespace    Forum Master・Discuz!-mxdh
// @version      0.2.0
// @icon         https://www.discuz.net/favicon.ico
// @description  Forum Master - Discuz!　Beautify the interface, Remove ads, Enhance functions.
// @description:en    Forum Master - Discuz!　Beautify the interface, Remove ads, Enhance functions.
// @description:zh-CN 论坛大师（简体中文）・Discuz!　界面美化、移除广告、功能增强、回帖强显……
// @description:zh-TW 論壇大師（繁體中文）・Discuz!　界面美化、移除廣告、功能增強、回帖強顯……
// @author       hostname,mxdh
// @match        https://www.discuz.net/thread-*.html
// @match        https://www.discuz.net/forum.php?mod=viewthread&tid=*
// @match        https://www.52pojie.cn/thread-*.html
// @match        https://www.52pojie.cn/forum.php?mod=viewthread&tid=*
// @match        https://hostloc.com/thread-*.html
// @match        https://hostloc.com/forum.php?mod=viewthread&tid=*
// @match        https://www.hostloc.com/thread-*.html
// @match        https://www.hostloc.com/forum.php?mod=viewthread&tid=*
// @match        https://bbs.kafan.cn/thread-*.html
// @match        https://bbs.kafan.cn/forum.php?mod=viewthread&tid=*
// @match        http://bbs.pcbeta.com/thread-*.html
// @match        http://bbs.pcbeta.com/viewthread-*.html
// @match        http://bbs.pcbeta.com/forum.php?mod=viewthread&tid=*
// @match        https://bbs.pcbeta.com/thread-*.html
// @match        https://bbs.pcbeta.com/viewthread-*.html
// @match        https://bbs.pcbeta.com/forum.php?mod=viewthread&tid=*
// @match        https://www.right.com.cn/forum/thread-*.html
// @match        https://www.right.com.cn/forum/forum.php?mod=viewthread&tid=*
// @match        http://bbs.nas66.com/thread-*.html
// @match        http://bbs.nas66.com/forum.php?mod=viewthread&tid=*
// @match        https://bbs.nas66.com/thread-*.html
// @match        https://bbs.nas66.com/forum.php?mod=viewthread&tid=*
// @match        http://www.gebi1.com/thread-*.html
// @match        http://www.gebi1.com/forum.php?mod=viewthread&tid=*
// @match        https://www.gebi1.com/thread-*.html
// @match        https://www.gebi1.com/forum.php?mod=viewthread&tid=*
// @match        https://www.fglt.net/thread-*.html
// @match        https://www.fglt.net/forum.php?mod=viewthread&tid=*
// @match        https://www.fglt.cn/thread-*.html
// @match        https://www.fglt.cn/forum.php?mod=viewthread&tid=*
// @match        https://www.fgbbs.net/thread-*.html
// @match        https://www.fgbbs.net/forum.php?mod=viewthread&tid=*
// @match        http://www.zuanke8.com/thread-*.html
// @match        http://www.zuanke8.com/forum.php?mod=viewthread&tid=*
// @match        https://www.zuanke8.com/thread-*.html
// @match        https://www.zuanke8.com/forum.php?mod=viewthread&tid=*
// @match        http://www.aihao.cc/thread-*.html
// @match        http://www.aihao.cc/forum.php?mod=viewthread&tid=*
// @match        https://www.aihao.cc/thread-*.html
// @match        https://www.aihao.cc/forum.php?mod=viewthread&tid=*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @supportURL   https://github.com/mxdh/Forum-Master-Discuz-
// @license GPL-3.0
// ==/UserScript==

(function () {
    'use strict';

    //This is the original author's statement:
    /**
     * Forum Master・Discuz! - https://greasyfork.org/scripts/400250
     *
     * == BEGIN LICENSE ==
     *
     * Open name: Forum Master・Discuz!
     * Open home: https://greasyfork.org/scripts/400250
     *
     * Licensed under the terms of any of the following licenses at your
     * choice:
     *
     * 1. GPL - GNU General Public License
     *    https://www.gnu.org/licenses/gpl-3.0.html
     *
     * 2. MPL - Mozilla Public License
     *    https://www.mozilla.org/MPL/2.0/
     *
     * Copyright statement is prohibited from modification and must be retained.
     *
     * == END LICENSE ==
     */

    // Global Settings
    const global_config = {
        // Text Beautification: true/false
        // 文本美化：true/false
        // 文字美化：true/false
        text_beautification: false,
        // Code Beautification: true/false
        // 代码美化：true/false
        // 程式碼美化：true/false
        code_beautification: true,
        // Display Mode: 'Standard', 'Family', 'Office'
        // 显示模式：'Standard', 'Family', 'Office'
        // 顯示模式：'Standard', 'Family', 'Office'
        display_mode: 'Standard',
        // Force Display: true/false
        // 回帖强显：true/false
        // 回帖強顯：true/false
        force_display: true
    }

    // Global variables
    var display_mode = global_config.display_mode || 'Standard';

    const display_mode_dic = {
        Standard: '标准模式',
        Family: '家庭模式',
        Office: '办公模式',
    }
    const display_mode_cutover_dic = {
        Standard: 'Family',
        Family: 'Office',
        Office: 'Standard',
    }

    // Cascading Style Sheets・Global
    GM_addStyle(`
        .ads {
            display: none;
        }

        #um .avt img {
            border-radius: 50%;
        }

        #um .avt img:hover {
            border-radius: 0;
        }

        .pls .avatar {
            padding-top: 1px;
            position: relative;
            text-align: center;
        }

        .pls .avatar a {
            width: 1px;
            height: 1px;
        }

        .pls .avatar img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            padding: 0;
            border: 4px solid #fff;
            box-shadow: 0 2px 8px #bbb;
        }

        .pls .avatar img:hover {
            border-radius: 0;
        }

        .pls .m img {
            width: 120px;
            height: 120px;
        }
    `);

    if (global_config.text_beautification === true) {
        GM_addStyle(`
            body, table, input, button, select, textarea, a {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei New", "Microsoft Yahei", "WenQuanYi Micro Hei", "Noto Sans CJK", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            }
        `)
    }

    if (global_config.code_beautification === true) {
        GM_addStyle(`
            .mono, .md, .code, .pre, .tt, mono, md, code, pre, tt,
            .blockcode ol li {
                font-family: "Fira Code", Hack, "Source Code Pro", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", "Microsoft YaHei Mono", "WenQuanYi Zen Hei Mono", "Noto Sans Mono CJK", monospace !important;
            }
        `)
    }

    // Cascading Style Sheets・www.52pojie.cn
    GM_addStyle(`
        .dnch_eo_pt,
        .dnch_eo_pb {
            display: none;
        }
    `);

    // Cascading Style Sheets・www.hostloc.com
    GM_addStyle(`
        .a_h,
        .a_t,
        .a_pt,
        .a_pb {
            display: none;
        }

        .custom-function-button {
            margin: 4px 0 0 4px;
            padding: 2px 8px;
            background-color: #f1f1f1;
            border: none;
            border-radius: 4px;
            outline: none;
            cursor: pointer;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        .custom-function-button:hover {
            box-shadow: 0 1px 2px #bbb;
        }

        .button-disabled {
            color: #808080;
            cursor: default;
        }

        .button-disabled:hover {
            box-shadow: none;
        }

        #hiddenpoststip {
            padding: 0;
        }

        #hiddenpoststip a {
            height: 32px;
            line-height: 32px;
            font-size: 16px;
        }

        #hiddenpoststip a:hover {
            color: #f33;
        }

        #hiddenpoststip a::before {
            padding-right: 8px;
            content: "🌜";
        }
        #hiddenpoststip a::after {
            padding-left: 8px;
            content: "🌛";
        }

        .user-status {
            position: absolute;
            left: 0;
            top: 0;
            width: 10px;
            height: 10px;
            cursor: help;
        }

        .offline {
            -webkit-filter: grayscale(100%);
            -moz-filter: grayscale(100%);
            -ms-filter: grayscale(100%);
            -o-filter: grayscale(100%);
            filter: grayscale(100%);
        }
    `);

    // Cascading Style Sheets・bbs.pcbeta.com
    GM_addStyle(`
        #diynavtop {
            display: none;
        }
    `);

    // Cascading Style Sheets・www.fglt.net
    GM_addStyle(`
        #drk_colee_left1,
        #drk_colee_left2,
        #drk_ledtd,
        #hd .wp .a_mu,
        table .a_pr {
            display: none;
        }
    `);

    const website = window.location.href;
    !!~website.indexOf('&extra=') && !!~website.indexOf('&mobile=') && window.location.replace(website.split('&extra=')[0]);

    // Login status
    const member = !!document.getElementById('extcreditmenu') || !!document.getElementById('myrepeats') || !!document.getElementById('myprompt');

    // Set as Default avatar
    function default_avatar(src) {
        const avtm = document.getElementsByClassName('avtm');
        for (let i = 0; i < avtm.length; i++) {
            avtm[i].innerHTML = '<img src="' + src + '">';
        }
    }

    // Abbreviated avatar
    function abbreviated_avatar() {
        GM_addStyle(`
            .pls .avatar {
                margin: 10px auto;
                width: 60px;
                height: 60px;
            }

            .pls .avatar img {
                width: 60px;
                height: 60px;
            }

            .pls .avatar img:hover {
                border-radius: 0;
            }

            #scbar_txt {
                display: inline;
            }

            .pil,
            .xg1 {
                display: none;
            }
        `);
    }

    // Hidden Signature
    function hidden_signature() {
        GM_addStyle(`
            .sign {
                display: none;
            }
        `);
    }

    function show_status() {
        const avatar = document.getElementsByClassName('avatar');
        const info = document.getElementsByClassName('i');

        for (let i = 0; i < info.length; i++) {
            if (!!~info[i].innerHTML.indexOf('<em>当前在线</em>')) {
                let div = document.createElement('div');
                div.className = 'user-status online gol';
                avatar[i].appendChild(div);
            } else {
                let div = document.createElement('div');
                div.className = 'user-status offline gol';
                avatar[i].appendChild(div);

                // avatar[i].classList.add('offline');
            }
        }
    }

    function change_button_style() {
        GM_addStyle(`
            .text-align-right {
                float: right;
            }

            .custom-function-button {
                background-color: #e8eff5;
            }

            .custom-function-button:hover {
                color: #369;
                box-shadow: 0 1px 2px #bbb;
            }

        `);
    }

    function display_mode_switch(value) {
        const display_mode_switch_button = document.getElementsByClassName('display-mode-switch')[0];
        display_mode_switch_button.disabled = true;
        display_mode_switch_button.classList.add('button-disabled');
        display_mode = display_mode_cutover_dic[display_mode];
        display_mode_switch_button.innerHTML = display_mode_dic[display_mode];
        GM_setValue(value, display_mode);
        display_mode_switch_button.disabled = false;
        display_mode_switch_button.classList.remove('button-disabled');
    }

    function add_div() {
        // DIV
        const div = document.createElement('div');
        div.id = 'function-buttons';
        div.className = 'text-align-right';
        document.getElementById('pt').appendChild(div);

        return document.getElementById('function-buttons');
    }

    function add_display_mode_switch_button(site, pos) {
        const display_mode_switch_button = document.createElement('button');
        display_mode_switch_button.className = 'custom-function-button display-mode-switch';
        display_mode_switch_button.innerHTML = display_mode_dic[display_mode];
        display_mode_switch_button.addEventListener('click', function () { display_mode_switch(site + '_DISPLAY_MODE'); }, false);
        pos.appendChild(display_mode_switch_button);
    }

    // www.52pojie.cn
    if (window.location.hostname === 'www.52pojie.cn') {
        // Display Mode
        display_mode = GM_getValue('52POJIE_DISPLAY_MODE') || display_mode;
        switch (display_mode) {
            case 'Standard':
                break;

            case 'Family':
                default_avatar('//avatar.52pojie.cn/images/noavatar_middle.gif');
                break;

            case 'Office':
                default_avatar('//avatar.52pojie.cn/images/noavatar_middle.gif');
                abbreviated_avatar();
                hidden_signature();
                break;

            default:
                break;
        }

        // Show users online status
        if (member) show_status();

        // Switch Mode
        if (member) {
            add_display_mode_switch_button('52POJIE', document.getElementById('extcreditmenu').parentElement);
        } else {
            change_button_style();
            add_display_mode_switch_button('52POJIE', add_div());
        }
    }

    // www.hostloc.com
    if (window.location.hostname === 'www.hostloc.com') {
        // Display Mode
        display_mode = GM_getValue('HOSTLOC_DISPLAY_MODE') || display_mode;
        switch (display_mode) {
            case 'Standard':
                break;

            case 'Family':
                default_avatar('//www.hostloc.com/uc_server/images/noavatar_middle.gif');
                break;

            case 'Office':
                default_avatar('//www.hostloc.com/uc_server/images/noavatar_middle.gif');
                abbreviated_avatar();
                hidden_signature();
                break;

            default:
                break;
        }

        // Show all posts
        // display_blocked_post();

        // Show users online status
        if (member) show_status();

        // Switch Mode
        if (member) {
            add_display_mode_switch_button('HOSTLOC', document.getElementById('extcreditmenu').parentElement);
        } else {
            change_button_style();
            add_display_mode_switch_button('HOSTLOC', add_div());
        }

        // Check in
        if (member) {
            function check_in() {
                const check_in = document.getElementsByClassName('check-in')[0];
                check_in.innerHTML = '正在签到';
                check_in.disabled = true;
                check_in.classList.add('button-disabled');
                setTimeout(() => {
                    check_in.innerHTML = '签到完成';
                }, 1234);

                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        let request = new XMLHttpRequest();
                        let space = '//www.hostloc.com/space-uid-'.concat(Math.ceil(Math.random() * 47000 + 100), '.html');
                        request.open('get', space);
                        request.send();
                    }, i * 100);
                }
            }
            const check_in_button = document.createElement('button');
            check_in_button.className = 'custom-function-button check-in';
            check_in_button.innerHTML = '每日签到';
            check_in_button.addEventListener('click', check_in, false);
            document.getElementById('extcreditmenu').parentElement.appendChild(check_in_button);
        }

    }

    // bbs.pcbeta.com
    if (window.location.hostname === 'bbs.pcbeta.com') {
        // Display Mode
        const avatar = document.getElementsByClassName('avatar');
        switch (display_mode) {
            case 'Standard':
                break;

            case 'Family':
                // default_avatar('//uc.pcbeta.com//images/noavatar_middle.gif');
                // Set as Default avatar
                for (let i = 0; i < avatar.length - 1; i++) {
                    avatar[i].innerHTML = '<img src="//uc.pcbeta.com//images/noavatar_middle.gif">';
                }
                break;

            case 'Office':
                // default_avatar('//uc.pcbeta.com//images/noavatar_middle.gif');
                // Set as Default avatar
                for (let i = 0; i < avatar.length - 1; i++) {
                    avatar[i].innerHTML = '<img src="//uc.pcbeta.com//images/noavatar_middle.gif">';
                }
                abbreviated_avatar();
                hidden_signature();
                break;

            default:
                break;
        }

        // Show users online status
        if (member) show_status();
    }

    // bbs.kafan.cn
    if (window.location.hostname === 'bbs.kafan.cn') {
        // Display Mode
        display_mode = GM_getValue('KAFAN_DISPLAY_MODE') || display_mode;
        switch (display_mode) {
            case 'Standard':
                break;

            case 'Family':
                default_avatar('//b.kafan.cn/5/middle.gif');
                break;

            case 'Office':
                default_avatar('//b.kafan.cn/5/middle.gif');
                abbreviated_avatar();
                hidden_signature();
                break;

            default:
                break;
        }

        // Show users online status
        if (member) {
            show_status();
        } else {
            change_button_style();
        }

        // Switch Mode
        add_display_mode_switch_button('KAFAN', add_div());
    }

    if (global_config.force_display === true) {
        const attachContent = '[img]https://www.fb.com/security/hsts-pixel.gif[/img]';

        const fastPostMessage = document.getElementById('fastpostmessage');

        function editor_content() {
            let fastPostMessageContent = fastPostMessage.value;
            if (fastPostMessageContent && fastPostMessageContent.length < 20) {
                fastPostMessageContent = fastPostMessageContent.trim();
                switch (window.location.hostname) {
                    case 'bbs.kafan.cn': break;
                    case 'www.hostloc.com':
                        fastPostMessage.value = fastPostMessageContent.concat('󠀠'.repeat(10)); // Zero Width Space
                        break;
                    default:
                        fastPostMessage.value = fastPostMessageContent.concat('\n\n', attachContent);
                }
            }
        }

        !!fastPostMessage && fastPostMessage.removeAttribute('onkeydown');

        !!fastPostMessage && fastPostMessage.addEventListener('keydown', function (event) {
            if (event.ctrlKey && event.which === 13) { // Ctrl+Enter
                editor_content();
                seditor_ctlent(event, 'fastpostvalidate($(\'fastpostform\'))');
            }
            if (event.altKey && event.which === 83) { // Alt+S
                editor_content();
                seditor_ctlent(event, 'fastpostvalidate($(\'fastpostform\'))');
            }
        }, false);

        document.getElementById('fastpostsubmit').addEventListener('click', editor_content, false);
    }
})();