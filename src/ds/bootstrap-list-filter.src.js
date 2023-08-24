/*
* OPTIONS
*
* delay        *millisecond before apply filter*
* minLength    *min string lentgh searched*
* initial      *search only initial text (default: true)*
* eventKey     *event digit (default: 'keyup')*
* resetOnBlur  *auto reset selection*
* sourceData   *function generate data source(receive: text, callback)*
* sourceTmpl   *html template contains {title} placeholder*
* sourceNode   *function builder DOM html fragment (default: sourceTmpl)*
* emptyNode    *function builder for empty result*
* itemEl       *item selector (default: .list-group-item)*,
* itemChild    *sub item selector (default: .list-group-item)*,
* itemFilter   *function for filter results(receive: text, item)*
*/
(function($) {
	console.log('bootstrap filter starting')
	$.fn.btsListFilter = function(inputEl, opts) {

		'use strict';
		console.log('bootstrap filter started')

		var self = this,
			searchlist$ = $(this),
			inputEl$ = $(inputEl),
			cancelEl$,
			items$ = searchlist$,
			callData,
			callReq;	//last callData execution

		console.log('self: ', self)
		console.log('inputEl$: ', inputEl$)
		function tmpl(str, data) {
			return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
				return data[key] || '';
			});
		}

		function defaultItemFilter(item, val) {
			val = val && val.replace(new RegExp("[({[^.$*+?\\\]})]","g"),'');
			//sanitize regexp

			var text = $(item).text(),
				i = opts.initial ? '^' : '',
				regSearch = new RegExp(i + val, opts.casesensitive ? '' : 'i');

			return regSearch.test( text );
		}

		opts = $.extend({
			delay: 300,
			minLength: 1,
			initial: true,
			casesensitive: false,
			eventKey: 'keyup',
			resetOnBlur: true,
			sourceData: null,
			sourceTmpl: '<a class="list-group-item" href="#"><span>{title}</span></a>',
			sourceNode: function(data) {
				return tmpl(opts.sourceTmpl, data);
			},
			emptyNode: function(data) {
				return '<a class="list-group-item well" href="#"><span>No Results</span></a>';
			},
			cancelNode: function() {
				return '<span class="btn glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
			},
			maxResults: -1,
			maxResultsNode: function(data) {
				return '<span class="list-groiup-item well">Too many results - keep typing to refine search</span>';
			},
			sourceNodes: undefined,
			loadingClass: 'bts-loading-list',
			itemClassTmp: 'bts-dynamic-item',
			itemEl: '.list-group-item',
			itemChild: null,
			itemFilter: defaultItemFilter,
			showEvent: 'show.bs',
			hideEvent: 'hide.bs'
		}, opts);

		function debouncer(func, timeout) {
			console.log('debouncer')
			var timeoutID;
			timeout = timeout || 300;
			return function () {
				var scope = this , args = arguments;
				clearTimeout( timeoutID );
				timeoutID = setTimeout( function () {
					func.apply( scope , Array.prototype.slice.call( args ) );
				}, timeout);
			};
		}

		self.reset = function() {
			inputEl$.val('').trigger(opts.eventKey);
		};

		self.showall = function() {
			opts.maxResults = -1;
			inputEl$.val(inputEl$.val()).trigger(opts.eventKey);
		};

		$('body').on('click', '#reset', function () {
			self.reset()
		});

		$('body').on('click', '#showall', function () {
			self.showall()
		});

		if($.isFunction(opts.cancelNode)) {

			cancelEl$ = $(opts.cancelNode.call(self)).hide();

			inputEl$.after( cancelEl$ );
			inputEl$.parents('.form-group').addClass('has-feedback');

			if(!inputEl$.prev().is('.control-label'))
				cancelEl$.css({top: 0});

			cancelEl$.css({'pointer-events': 'auto'});

			cancelEl$.on('click', self.reset);
		}

		inputEl$.on(opts.eventKey, debouncer(function(e) {
			console.log('action 1')
			var keyCode = e.keyCode

			if (keyCode !== 9) {
				var val = $(this).val();

				if(opts.itemEl)
					items$ = searchlist$.find(opts.itemEl);

				if(opts.itemChild)
					items$ = items$.find(opts.itemChild);

				var contains = items$.filter(function(){
						return opts.itemFilter.call(self, this, val);
					}),
					containsNot = items$.not(contains);

				if (opts.itemChild){
					contains = contains.parents(opts.itemEl);
					containsNot = containsNot.parents(opts.itemEl).hide();
				}

				if(val!=='' && val.length >= opts.minLength)
				{
					contains.show();
					containsNot.hide();
					cancelEl$.show();
					self.trigger(opts.showEvent);

					if($.type(opts.sourceData)==='function')
					{
						contains.hide();
						containsNot.hide();

						if(callReq)
						{
							if($.isFunction(callReq.abort))
								callReq.abort();
							else if($.isFunction(callReq.stop))
								callReq.stop();
						}

						searchlist$.addClass(opts.loadingClass);
						callReq = opts.sourceData.call(self, val, function(data) {
							callReq = null;
							contains.hide();
							containsNot.hide();
							searchlist$.find('.'+opts.itemClassTmp).remove();

							if (opts.sourceNodes) {
								opts.sourceNodes.call(self, opts, val, data, function (n) {
									$(n).addClass(opts.itemClassTmp).appendTo(searchlist$);
								})
							} else {
								if (!data || data.length === 0)
									$(opts.emptyNode.call(self, val)).addClass(opts.itemClassTmp).appendTo(searchlist$);
								else if (opts.maxResults < 0 || data.length <= opts.maxResults) {
									for (var i in data)
										$(opts.sourceNode.call(self, data[i])).addClass(opts.itemClassTmp).appendTo(searchlist$);
								} else {
									console.log('max results')
									$(opts.maxResultsNode(data)).addClass(opts.itemClassTmp).appendTo(searchlist$);
								}
							}

							searchlist$.removeClass(opts.loadingClass);
						});
					}
					else {
						searchlist$.find('.'+opts.itemClassTmp).remove();

						if(contains.length===0)
							$( opts.emptyNode.call(self, val) ).addClass(opts.itemClassTmp).appendTo(searchlist$);
					}

				}
				else
				{
					contains.show();
					containsNot.show();
					cancelEl$.hide();
					self.trigger(opts.hideEvent);
					searchlist$.find('.'+opts.itemClassTmp).remove();
				}
			}
		}, opts.delay));

		if(opts.resetOnBlur)
			inputEl$.on('blur', function(e) {
				console.log('action 2')
				self.reset();
			});

		return searchlist$;
	};

})(jQuery);
