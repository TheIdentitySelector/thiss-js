import {DiscoveryService, json_mdq_search, parse_qs} from "@theidentityselector/thiss-ds/src/discovery.js";
import 'core-js/actual';

jQuery(function ($) {
    $.widget("thiss.discovery_client", {

        options: {
            persistence: undefined,
            search: undefined,
            mdq: undefined,
            entityID: null,
            trustProfile: null,
            context: undefined,
            before: undefined,
            after: undefined,
            render: undefined,
            render_search_result: undefined,
            render_saved_choice: undefined,
            fallback_icon: undefined,
            input_field_selector: 'input',
            search_result_selector: '#ds-search-list',
            saved_choices_selector: '#ds-saved-choices',
            entity_selector: '.identityprovider',
            too_many_results: undefined,
            no_results: undefined,
            persist: undefined,
            sp_entity: undefined
        },

        _create: function () {
            let obj = this;
            obj.ac = [];

            if (!$.isFunction(obj.options.render)) {
                obj.options.render = $.noop;
            }

            if (!$.isFunction(obj.options.search)) {
                obj.options.search_url = obj.options.search;
                obj.options.search = function (text, callback) {
                  obj.ac.forEach(ab => ab.abort())
                    let this_ab = new AbortController();
                    obj.ac.push(this_ab);

                    json_mdq_search(text, obj.options.search_url, obj.options.entityID, obj.options.trustProfile, {signal: this_ab.signal})
                        .then(data => {
                            return data.filter(o => o.hidden != "true")
                        })
                        .then(data => {
                            let first_ab = obj.ac.shift()
                            if (!this_ab.signal.aborted) {
                                callback(data)
                            }
                        });
                }
            }

            if (!$.isFunction(obj.options.render_search_result)) {
                obj.options.render_search_result = obj.options.render;
            }
            if (!$.isFunction(obj.options.render_saved_choice)) {
                obj.options.render_saved_choice = obj.options.render;
            }
            if (!$.isFunction(obj.options.fallback_icon)) {
                obj.options.fallback_icon = $.noop;
            }
            if (!$.isFunction(obj.options.after)) {
                obj.options.after = $.noop;
            }
            if (!$.isFunction(obj.options.before)) {
                obj.options.before = function(x) { return x; }
            }
            if (!$.isFunction(obj.options.persist)) {
                obj.options.persist = function() { return true; }
            }
            obj._update();
        },

        _setOption: function (key, value) {
            this.options[key] = value;
            this._update();
        },

        sp: function() {
            let obj = this;
            if (obj.sp_entity !== undefined) {
                return obj.sp_entity;
            }
            let params = parse_qs(window.location.search.substr(1).split('&'));
            let entity_id = params.entityID;
            if (entity_id) {
                const sp = obj._ds.mdq_sp(entity_id).then(entity => {
                    return entity ? entity : Promise.resolve({'entity_id': entity_id, 'title': entity_id});
                });
                obj.sp_entity = sp;
                return sp;
            } else {
                console.log("Missing entityID parameter in discovery request");
                return {'title': 'Unknown'}
            }
        },

        _after: function (count) {
            let saved_choices_element = $(this.options.saved_choices_selector);
            if (this.options.search) {
                let obj = this;
                let search_result_element = $(obj.options.search_result_selector);
                let counter = 0;
                $(obj.options.input_field_selector).focus();
                search_result_element.btsListFilter(obj.options.input_field_selector, {
                    resetOnBlur: false,
                    casesensitive: false,
                    maxResults: 10,
                    itemEl: obj.options.entity_selector,
                    getValue: function(that) {
                        let v = that.val();
                        let i = v.indexOf('@');
                        return i > -1 ? v.substring(i+1,v.length) : v;
                    },
                    sourceNodes: function(opts, val, results, render) {
                        const MAX_RESULTS = 25

                        if (!results || results.length === 0) {
                            render(obj.options.no_results(val))
                        } else if (opts.maxResults > 0 && results.length > opts.maxResults) {
                            render(obj.options.too_many_results(this, results.length))
                        } else {
                            let numberDisplayed = 0

                            const getResults = function() {
                                if (numberDisplayed === 0) {
                                    if (results.length < MAX_RESULTS) {
                                        numberDisplayed = results.length
                                    } else {
                                        numberDisplayed = MAX_RESULTS
                                    }

                                    return results.slice(0, MAX_RESULTS - 1)
                                } else {
                                    if (results.length >= MAX_RESULTS) {
                                        const updatedResults = results.slice(numberDisplayed, numberDisplayed + MAX_RESULTS)
                                        numberDisplayed += updatedResults.length
                                        return updatedResults
                                    }
                                }
                            }

                            const displayResults = function(newResults) {
                                const resultsSubset = getResults()
                                let updatedResultsSubset = []

                                if (newResults) {
                                    counter = 0;
                                }

                                for (let i in resultsSubset) {
                                    let data = resultsSubset[i]
                                    counter += 1;
                                    data.counter = counter;
                                    data.saved = false;
                                    updatedResultsSubset.push(data);
                                }

                                render(obj.options.render_search_result(resultsSubset))
                            }

                            displayResults(true);

                            window.onscroll = function(ev) {
                                if (results.length >= MAX_RESULTS) {
                                    if ($(window).scrollTop() + $(window).height() > 0.75 * $(document).height()) {
                                        displayResults(false);
                                    }
                                }
                            };
                        }
                    },
                    sourceData: obj.options.search,
                    cancelNode: function () { console.log("cancel"); },
                });
            }
            this.options.after(count, saved_choices_element);
        },

        _update: function () {
            let obj = this;
            obj._ds = new DiscoveryService(obj.options.mdq, obj.options.persistence,
                obj.options.context, obj.options.entityID, obj.options.trustProfile);
            obj._count = 0;
            let top_element = obj.element;

            obj.sp();

            $('img.pyff-idp-icon').bind('error', function () {
                $(this).unbind('error');
                obj.options.fallback_icon(this);
            });

            $('body').on('mouseenter', obj.options.entity_selector, function (e) {
                $(this).addClass("active");
            });
            $('body').on('mouseleave', obj.options.entity_selector, function (e) {
                $(this).removeClass("active");
            });

            $('body').on('click', obj.options.entity_selector, function (e) {
                let entity_id = $(this).closest(obj.options.entity_selector).attr('data-href');

                console.log('entity_id XX: ', entity_id)
                return obj._ds.saml_discovery_response(entity_id, obj.options.persist());
            });

            $('body').on('keyup', obj.options.entity_selector, function (e) {
                if (e.keyCode === 13) {
                    e.preventDefault();
                    $(this).click();
                }
            });

            $(obj.options.input_field_selector).closest('form').submit(function(e) {
                e.preventDefault();
            });

            $('body').on('click', '.remove', function (e) {
                e.stopPropagation();
                let entity_element = $(this).closest(obj.options.entity_selector);
                obj._count = entity_element.siblings().length + 1;
                let entity_id = entity_element.attr('data-href');

                if (entity_id) {
                    obj._ds.remove(entity_id).then(function () {
                        entity_element.remove();
                    }).then(function() {
                        obj._count -= 1;
                        obj._after(obj._count)
                    });
                }
            });

            $('body').on('keypress', '.remove', function (e) {
                if(e.which == 13){
                    $('.remove').click();
                }
            });

            obj._ds.with_items(function (items) {
                return obj.options.before(items).then(items => {
                    let count = 0;
                    let entities = []
                    if (items && items.length > 0) {
                        items.forEach(function (item) {
                            let entity = item.entity;
                            entity.saved = true;
                            entities.push(entity)
                            count++;
                        });
                    }
                    obj.options.render_saved_choice(entities);
                    return count;
                }).then(count => {
                    obj._after(count);
                    return items; // needed later by persistence
                });
            });
        }
    })
});
