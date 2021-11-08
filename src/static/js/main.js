(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewMsg = void 0;

var _sockets = require("./sockets");

var messages = document.getElementById("jsMessages");
var sendMsg = document.getElementById("jsSendMsg"); // "유저이름 : 메세지 내용" UI에 띄워주기

var appendMsg = function appendMsg(text, nickname) {
  var li = document.createElement("li");
  li.innerHTML = "<span class=\"author ".concat(nickname ? "notMe" : "me", "\" >").concat(nickname ? nickname : "You", ": </span> ").concat(text);
  messages.appendChild(li);
};

var handleSendMsg = function handleSendMsg(event) {
  //새로고침 방지
  event.preventDefault(); //유저가 입력한 값 받아오기

  var input = sendMsg.querySelector("input");
  var value = input.value; // value = input.value
  // 실제로 소켓통신하기
  // sendMsg라는 이벤트를 발생시켜서, 유저가 입력한 내용 전달

  (0, _sockets.getSocket)().emit(window.events.sendMsg, {
    message: value
  }); //입력값을 UI에 표시

  appendMsg(value);
};

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

var handleNewMsg = function handleNewMsg(_ref) {
  var message = _ref.message,
      nickname = _ref.nickname;
  return appendMsg(message, nickname);
};

exports.handleNewMsg = handleNewMsg;

},{"./sockets":5}],2:[function(require,module,exports){
"use strict";

var _sockets = require("./sockets");

var body = document.querySelector("body");
var loginForm = document.getElementById("jsLogin");
var LOGGED_OUT = "loggedOut";
var LOGGED_IN = "loggedIn";
var NICKNAME = "nickname";
var nickname = localStorage.getItem(NICKNAME);

var logIn = function logIn(nickname) {
  var socket = io("/");
  socket.emit(window.events.setNickname, {
    nickname: nickname
  });
  (0, _sockets.initSockets)(socket);
};

if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
  logIn(nickname);
}

var handleFormSubmit = function handleFormSubmit(event) {
  event.preventDefault();
  var input = loginForm.querySelector("input");
  var value = input.value;
  localStorage.setItem(NICKNAME, value);
  body.className = LOGGED_IN;
  logIn(value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}

},{"./sockets":5}],3:[function(require,module,exports){
"use strict";

require("./sockets");

require("./login");

require("./chat");

},{"./chat":1,"./login":2,"./sockets":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleNewUser = exports.handleDisconnected = void 0;
// 다른 유저가 나간 경우
var noti = document.querySelector("body"); // 메세지를 div에 띄워주려고 함

var fireNoti = function fireNoti(text, color) {
  var n = document.createElement("div");
  n.innerText = text;
  n.style.backgroundColor = color;
  n.className = "notification";
  noti.appendChild(n);
};

var handleNewUser = function handleNewUser(_ref) {
  var nickname = _ref.nickname;
  fireNoti("".concat(nickname, " is joined!"), "rgb(0,122,255)");
};

exports.handleNewUser = handleNewUser;

var handleDisconnected = function handleDisconnected(_ref2) {
  var nickname = _ref2.nickname;
  fireNoti("".concat(nickname, " is left!"), "rgb(255,149,0)");
};

exports.handleDisconnected = handleDisconnected;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSockets = exports.getSocket = void 0;

var _chat = require("./chat");

var _notifications = require("./notifications");

// frontend (웹) 소켓 관련된 모든 기능 컨트롤
var socket = null;

var getSocket = function getSocket() {
  return socket;
};

exports.getSocket = getSocket;

var initSockets = function initSockets(aSocket) {
  var _window = window,
      events = _window.events; // events = window.events

  socket = aSocket; // 다른 유저가 들어온 이벤트 "newUser"를 듣고 작동

  socket.on(events.newUser, _notifications.handleNewUser); // 특정 유저가 나간 경우의 이벤트 "disconnected"를 듣고 작동

  socket.on(events.disconnected, _notifications.handleDisconnected); //newMsg 이벤트 수신

  socket.on(window.events.newMsg, _chat.handleNewMsg);
};

exports.initSockets = initSockets;

},{"./chat":1,"./notifications":4}]},{},[3]);
