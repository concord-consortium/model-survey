!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var r={},t={},a=function(e,r){return{}.hasOwnProperty.call(e,r)},n=function(e,r){var t,a,n=[];t=/^\.\.?(\/|$)/.test(r)?[e,r].join("/").split("/"):r.split("/");for(var i=0,s=t.length;s>i;i++)a=t[i],".."===a?n.pop():"."!==a&&""!==a&&n.push(a);return n.join("/")},i=function(e){return e.split("/").slice(0,-1).join("/")},s=function(r){return function(t){var a=i(r),s=n(a,t);return e.require(s,r)}},c=function(e,r){var a={id:e,exports:{}};return t[e]=a,r(a.exports,s(e),a),a.exports},o=function(e,i){var s=n(e,".");if(null==i&&(i="/"),a(t,s))return t[s].exports;if(a(r,s))return c(s,r[s]);var o=n(s,"./index");if(a(t,o))return t[o].exports;if(a(r,o))return c(o,r[o]);throw new Error('Cannot find module "'+e+'" from "'+i+'"')},u=function(e,t){if("object"==typeof e)for(var n in e)a(e,n)&&(r[n]=e[n]);else r[e]=t},l=function(){var e=[];for(var t in r)a(r,t)&&e.push(t);return e};e.require=o,e.require.define=u,e.require.register=u,e.require.list=l,e.require.brunch=!0}}(),require.register("javascripts/library_card",function(e,r,t){var a=React.createClass({displayName:"LibraryCard",render:function(){for(var e=[],r=this.props.data.stars||0,t="no-star",a=1;5>=a;a++)r>=a&&(t="star"),e.push(React.createElement("span",{className:t}," ★ ")),t="no-star";return React.createElement("div",{className:"library-card"},React.createElement("div",{className:"link"},React.createElement("a",{href:this.props.data.link,target:"_blank"},this.props.data.name)),React.createElement("div",{className:"stars"},e),React.createElement("div",{className:"screenshot"},React.createElement("a",{href:this.props.data.link,target:"_blank"},React.createElement("img",{src:this.props.data.screenshot}))),React.createElement("div",{className:"comment"},this.props.data.comment))}});t.exports=a}),require.register("javascripts/library_list",function(e,r,t){var a=r("./library_card"),n=React.createClass({displayName:"LibraryList",getInitialState:function(){return{data:[]}},componentDidMount:function(){$.ajax({url:this.props.url,dataType:"json",success:function(e){this.setState({data:e})}.bind(this),error:function(e,r,t){console.error(this.props.url,r,t.toString())}.bind(this)})},render:function(){var e=this.state.data.sort(function(e,r){return r.stars-e.stars}).map(function(e){return React.createElement(a,{data:e})});return React.createElement("div",{className:"libraryNodes"},e)}});React.render(React.createElement(n,{url:"libraries.json"}),document.getElementById("library")),t.exports=n});