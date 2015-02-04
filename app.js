!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var t={},r={},a=function(e,t){return{}.hasOwnProperty.call(e,t)},n=function(e,t){var r,a,n=[];r=/^\.\.?(\/|$)/.test(t)?[e,t].join("/").split("/"):t.split("/");for(var i=0,s=r.length;s>i;i++)a=r[i],".."===a?n.pop():"."!==a&&""!==a&&n.push(a);return n.join("/")},i=function(e){return e.split("/").slice(0,-1).join("/")},s=function(t){return function(r){var a=i(t),s=n(a,r);return e.require(s,t)}},c=function(e,t){var a={id:e,exports:{}};return r[e]=a,t(a.exports,s(e),a),a.exports},o=function(e,i){var s=n(e,".");if(null==i&&(i="/"),a(r,s))return r[s].exports;if(a(t,s))return c(s,t[s]);var o=n(s,"./index");if(a(r,o))return r[o].exports;if(a(t,o))return c(o,t[o]);throw new Error('Cannot find module "'+e+'" from "'+i+'"')},l=function(e,r){if("object"==typeof e)for(var n in e)a(e,n)&&(t[n]=e[n]);else t[e]=r},u=function(){var e=[];for(var r in t)a(t,r)&&e.push(r);return e};e.require=o,e.require.define=l,e.require.register=l,e.require.list=u,e.require.brunch=!0}}(),require.register("javascripts/library_card",function(e,t,r){var a=React.createClass({displayName:"LibraryCard",render:function(){for(var e=[],t=this.props.data.stars||0,r="no-star",a=1;5>=a;a++)t>=a&&(r="star"),e.push(React.createElement("span",{className:r}," ★ ")),r="no-star";return React.createElement("div",{className:"library-card"},React.createElement("div",{className:"link"},React.createElement("a",{href:this.props.data.link,target:"_blank"},React.createElement("div",{className:"name"},this.props.data.name),React.createElement("div",{className:"license"},"(",this.props.data.license,")"))),React.createElement("div",{className:"stars"},e),React.createElement("div",{className:"screenshot"},React.createElement("a",{href:this.props.data.link,target:"_blank"},React.createElement("img",{src:this.props.data.screenshot}))),React.createElement("div",{className:"comment"},this.props.data.comment))}});r.exports=a}),require.register("javascripts/library_list",function(e,t,r){var a=t("./library_card"),n=React.createClass({displayName:"LibraryList",getInitialState:function(){return{data:[]}},componentDidMount:function(){var e=function(e){this.setState({data:e})}.bind(this),t=function(){var t="https://docs.google.com/spreadsheets/d/1HH1tsLKopqA0l4U0EiOHTo50rpnm9BrSbqKn8bTbqh0/pubhtml?gid=532028845&single=true";Tabletop.init({key:t,callback:e,simpleSheet:!0})}.bind(this);t(),setInterval(t,5e3)},render:function(){var e=this.state.data.sort(function(e,t){return t.stars-e.stars}).map(function(e){return React.createElement(a,{data:e})});return React.createElement("div",{className:"libraryNodes"},e)}});React.render(React.createElement(n,{url:"libraries.json"}),document.getElementById("library")),r.exports=n});