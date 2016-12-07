webpackJsonp([3],{1e3:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(14),o=l(n),s=a(1037),i=l(s),c=a(1075),u=l(c),d=a(1074),f=l(d),m=a(1076),p=l(m),E=a(40),v=function(e){var t=void 0;switch(e.activeView){default:case E.MY_POSITIONS:t=o.default.createElement(u.default,r({},e.positions,{settings:e.settings}));break;case E.MY_MARKETS:t=o.default.createElement(f.default,e.markets);break;case E.MY_REPORTS:t=o.default.createElement(p.default,r({},e.reports,{branch:e.branch}))}return o.default.createElement("section",{id:"portfolio_view"},o.default.createElement("header",{className:"page-header portfolio-header"},!!e.navItems&&!!e.navItems.length&&o.default.createElement(i.default,{activeView:e.activeView,navItems:e.navItems})),o.default.createElement("div",{className:"page-content"},o.default.createElement("section",{className:"portfolio-content"},t)))};v.propTypes={navItems:n.PropTypes.array.isRequired,totals:n.PropTypes.object.isRequired,positions:n.PropTypes.object.isRequired,markets:n.PropTypes.object.isRequired,reports:n.PropTypes.object.isRequired,settings:n.PropTypes.object.isRequired},t.default=v},1004:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(14),n=l(r),o=a(62),s=l(o),i=function(e){return n.default.createElement("span",{className:(0,s.default)("value-date",e.className)},e.formatted)};i.propTypes={className:r.PropTypes.string,value:r.PropTypes.object,formatted:r.PropTypes.string},t.default=i},1037:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(14),o=l(n),s=a(141),i=l(s),c=a(62),u=l(c),d=a(462),f=l(d),m=a(463),p=l(m),E=function(e){return o.default.createElement("div",{className:"tab-navigator"},!!e.navItems&&e.navItems.map(function(t,a){return"string"==typeof t.page&&(t.page=[t.page]),o.default.createElement(f.default,{key:""+a,className:(0,u.default)("nav-item",{active:t.page.indexOf(e.activeView)>-1}),href:t.link.href,onClick:t.link.onClick},o.default.createElement("span",{className:"nav-label"},t.label),(!!t.leadingValue||!!t.trailingValue)&&o.default.createElement("section",{className:"nav-values"},t.leadingValue&&o.default.createElement(p.default,r({"data-tip":!0,"data-for":"tab-"+a+"-leading-tooltip"},t.leadingValue||{})),t.trailingValue&&o.default.createElement(p.default,r({"data-tip":!0,"data-for":"tab-"+a+"-trailing-tooltip",className:"colorize"},t.trailingValue||{})),o.default.createElement(i.default,{id:"tab-"+a+"-leading-tooltip",type:"light",effect:"solid",place:"top"},o.default.createElement("span",{className:"tooltip-text"},t.leadingTitle?t.leadingTitle+": "+t.leadingValue.full:"")),o.default.createElement(i.default,{id:"tab-"+a+"-trailing-tooltip",type:"light",effect:"solid",place:"top"},o.default.createElement("span",{className:"tooltip-text"},t.trailingTitle?t.trailingTitle+": "+t.trailingValue.full:""))))}))};t.default=E},1062:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(14),o=l(n),s=a(463),i=l(s),c=a(1004),u=l(c),d=function(e){return o.default.createElement("div",{className:"portfolio-row"},o.default.createElement("div",{className:"portfolio-group portfolio-main-group"},o.default.createElement("span",{className:"market-main-group-title"},"ends: "),o.default.createElement(u.default,e.endDate)),o.default.createElement("div",{className:"portfolio-group"},o.default.createElement("div",{className:"portfolio-pair total-value"},o.default.createElement("span",{className:"title"},"fees collected"),o.default.createElement(i.default,r({className:"colorize"},e.fees))),o.default.createElement("div",{className:"portfolio-pair"},o.default.createElement("span",{className:"title"},"open volume"),o.default.createElement(i.default,e.openVolume)),o.default.createElement("div",{className:"portfolio-pair"},o.default.createElement("span",{className:"title"},"volume"),o.default.createElement(i.default,e.volume)),o.default.createElement("div",{className:"portfolio-pair total-cost"},o.default.createElement("span",{className:"title"},"# of trades"),o.default.createElement(i.default,e.numberOfTrades)),o.default.createElement("div",{className:"portfolio-pair total-value"},o.default.createElement("span",{className:"title"},"avg trade size"),o.default.createElement(i.default,e.averageTradeSize))))};d.propTypes={endDate:n.PropTypes.object.isRequired,openVolume:n.PropTypes.object.isRequired,volume:n.PropTypes.object.isRequired,numberOfTrades:n.PropTypes.object.isRequired,averageTradeSize:n.PropTypes.object.isRequired,fees:n.PropTypes.object.isRequired},t.default=d},1063:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(14),n=l(r),o=a(463),s=l(o),i=a(22),c=function(e){return n.default.createElement("div",{className:"position"},n.default.createElement("div",{className:"position-group main-group"},e.type===i.SCALAR?n.default.createElement("span",{className:"position-name"},e.lastPricePercent.rounded):n.default.createElement("span",{className:"position-name"},e.name),n.default.createElement(s.default,e.qtyShares)),n.default.createElement("div",{className:"position-group"},n.default.createElement("div",{className:"position-pair purchase-price"},n.default.createElement("span",{className:"title"},"average price of open position"),n.default.createElement(s.default,e.purchasePrice)),n.default.createElement("div",{className:"position-pair last-price"},n.default.createElement("span",{className:"title"},"last trade price"),n.default.createElement(s.default,e.lastPrice))),n.default.createElement("div",{className:"position-group"},n.default.createElement("div",{className:"position-pair realized-net"},n.default.createElement("span",{className:"title"},"realized P/L"),n.default.createElement(s.default,e.realizedNet)),n.default.createElement("div",{className:"position-pair unrealized-net"},n.default.createElement("span",{className:"title"},"unrealized P/L"),n.default.createElement(s.default,e.unrealizedNet)),n.default.createElement("div",{className:"position-pair total-net"},n.default.createElement("span",{className:"title"},"total P/L"),n.default.createElement(s.default,e.totalNet))))};c.propTypes={name:n.default.PropTypes.string,type:n.default.PropTypes.string,qtyShares:n.default.PropTypes.object,gainPercent:n.default.PropTypes.object,lastPrice:n.default.PropTypes.object,lastPricePercent:n.default.PropTypes.object,purchasePrice:n.default.PropTypes.object,realizedNet:n.default.PropTypes.object,unrealizedNet:n.default.PropTypes.object,totalNet:n.default.PropTypes.object},t.default=c},1064:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(14),n=l(r),o=a(463),s=l(o),i=function(e){return n.default.createElement("article",{className:"positions-market-overview"},n.default.createElement("div",{className:"position"},n.default.createElement("span",{className:"description"},e.description),n.default.createElement("div",{className:"position-group"},n.default.createElement("div",{className:"position-pair realized-net"},n.default.createElement("span",{className:"title"},"total realized P/L"),n.default.createElement(s.default,e.realizedNet)),n.default.createElement("div",{className:"position-pair unrealized-net"},n.default.createElement("span",{className:"title"},"total unrealized P/L"),n.default.createElement(s.default,e.unrealizedNet)),n.default.createElement("div",{className:"position-pair total-net"},n.default.createElement("span",{className:"title"},"total P/L"),n.default.createElement(s.default,e.totalNet)))))};i.propTypes={description:n.default.PropTypes.string.isRequired,unrealizedNet:n.default.PropTypes.object.isRequired,realizedNet:n.default.PropTypes.object.isRequired},t.default=i},1065:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(14),o=l(n),s=a(141),i=l(s),c=a(1063),u=l(c),d=a(462),f=l(d),m=function(e){return o.default.createElement("article",{className:"positions-list"},e.marketLink&&o.default.createElement(f.default,{key:e.market.id,href:e.marketLink.href,onClick:e.marketLink.onClick},(e.market.myPositionOutcomes||[]).map(function(t){return o.default.createElement(u.default,r({key:e.market.id+"-"+t.id,type:e.market.type},t,t.position))})),!e.marketLink&&(e.market.myPositionOutcomes||[]).map(function(t){return o.default.createElement(u.default,r({key:t.id,type:e.market.type},t,t.position))}),!e.settings.autoSellCompleteSets&&e.market.hasCompleteSet&&o.default.createElement("div",{className:"complete-sets"},o.default.createElement("div",{className:"close-position-button"},o.default.createElement("button",{"data-tip":e.market.smallestPosition.full,className:"button",onClick:function(t){t.stopPropagation(),e.market.onSubmitClosePosition()}},"Redeem ",e.market.smallestPosition.formatted," Complete Sets"))),o.default.createElement(i.default,{type:"light",effect:"solid",place:"top",globalEventOff:"click"}))};t.default=m},1066:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(14),o=l(n),s=a(141),i=l(s),c=a(463),u=l(c),d=a(1004),f=l(d),m=function(e){return o.default.createElement("div",{className:"portfolio-row"},o.default.createElement("div",{className:"portfolio-group portfolio-main-group"},o.default.createElement("div",{className:"portfolio-pair"},o.default.createElement("span",{className:"report-main-group-title"},"outcome: "),o.default.createElement("span",{className:"report-main-group-title-outcome"},e.outcome&&e.outcomePercentage&&e.outcomePercentage.value&&o.default.createElement("span",null,e.outcome,"  (",o.default.createElement(u.default,e.outcomePercentage),")"),e.outcome&&!e.outcomePercentage&&o.default.createElement("span",null,e.outcome),!e.outcome&&"-")),o.default.createElement("div",{className:"portfolio-pair"},o.default.createElement("span",{className:"report-main-group-title"},"reported: "),o.default.createElement("span",{className:"report-main-group-title-outcome"},!!e.isCommitted&&!e.isRevealed&&o.default.createElement("span",{className:"report-committed","data-tip":"You have successfully committed to this report. Remember to login to reveal the report!"},e.reported||"-"),!!e.isRevealed&&o.default.createElement("span",{className:"report-revealed"},e.reported||"-"),!e.isRevealed&&!e.isCommitted&&o.default.createElement("span",null,e.reported||"-"),!!e.outcome&&e.isReportEqual&&o.default.createElement("span",{className:"fa report-equal","data-tip":"Your report matches the consensus outcome"},""),!!e.outcome&&!e.isReportEqual&&o.default.createElement("span",{className:"fa report-unequal","data-tip":"Your report does not match the consensus outcome"},""),!!e.isUnethical&&o.default.createElement("span",{className:"fa report-unethical","data-tip":"You reported that this market is unethical"},""))),o.default.createElement("div",{className:"portfolio-pair"},o.default.createElement("span",{className:"report-main-group-title"},"cycle: "),o.default.createElement("span",{className:"report-main-group-title-outcome"},e.period?o.default.createElement("span",{"data-tip":e.branch.currentPeriod-e.period+" reporting cycles ago"},e.period):"-"))),o.default.createElement("div",{className:"portfolio-group"},o.default.createElement("div",{className:"portfolio-pair"},o.default.createElement("span",{className:"title"},"rep gain/loss"),o.default.createElement(u.default,r({className:"colorize"},e.repEarned))),o.default.createElement("div",{className:"portfolio-pair"},o.default.createElement("span",{className:"title"},"ended"),o.default.createElement(f.default,e.endDate))),o.default.createElement(i.default,{type:"light",effect:"solid",place:"top"}))};t.default=m},1074:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(14),o=l(n),s=a(1062),i=l(s),c=a(462),u=l(c),d=function(e){return o.default.createElement("div",null,!!e.markets&&!!e.markets.length&&e.markets.map(function(e){return o.default.createElement(u.default,r({key:e.id},e.marketLink),o.default.createElement("div",{className:""},o.default.createElement("span",{className:"description"},e.description),!!e&&o.default.createElement("article",{className:"portfolio-list"},o.default.createElement(i.default,e))))}))};t.default=d},1075:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(14),o=l(n),s=a(1065),i=l(s),c=a(1064),u=l(c),d=a(462),f=l(d),m=function(e){return o.default.createElement("div",{className:"positions-content"},!!e.markets&&!!e.markets.length&&e.markets.map(function(t){return o.default.createElement("div",{key:t.id,className:"positions-container"},o.default.createElement(f.default,{href:t.marketLink.href,onClick:t.marketLink.onClick},o.default.createElement(u.default,r({description:t.description},t.myPositionsSummary))),!!t.myPositionOutcomes&&!!t.myPositionOutcomes.length&&o.default.createElement(i.default,{className:"page-content positions-content",market:t,marketLink:t.marketLink,settings:e.settings}))}))};t.default=m},1076:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(e[l]=a[l])}return e},n=a(14),o=l(n),s=a(141),i=l(s),c=a(1066),u=l(c),d=a(462),f=l(d),m=function(e){return o.default.createElement("div",null,!!e.reports&&!!e.reports.length&&e.reports.map(function(t){return o.default.createElement(f.default,r({key:""+t.marketId},t.marketLink),o.default.createElement("div",{key:t.marketId},o.default.createElement("span",{className:"description"},t.description,t.isChallenged&&o.default.createElement("span",{className:"fa outcome-challenged","data-tip":"This outcome is currently being challenged"},""),!t.isChallenged&&t.isChallengeable&&o.default.createElement("span",{className:"fa outcome-challengeable","data-tip":"This outcome is eligible to be challenged"},"")),!!t&&o.default.createElement("article",{className:"portfolio-list"},o.default.createElement(u.default,r({},t,{branch:e.branch})))))}),o.default.createElement(i.default,{type:"light",effect:"solid",place:"top"}))};t.default=m}});