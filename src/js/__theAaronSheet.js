//var getSectionIDs=function(){};
//var getAttrs=function(){};
//var setAttrs=function(){};
//var on=function(){};
/* ---- BEGIN: TheAaronSheet.js ---- */
// Github:   https://github.com/shdwjk/TheAaronSheet/blob/master/TheAaronSheet.js
// By:       The Aaron, Arcane Scriptomancer
// Contact:  https://app.roll20.net/users/104025/the-aaron

var TAS = TAS || (function(){
		'use strict';

		var version = '0.2.1',
			lastUpdate = 1453794214,

			loggingSettings = {
				debug: {
					key:     'debug',
					title:   'DEBUG',
					color: {
						bgLabel: '#7732A2',
						label:   '#F2EF40',
						bgText:  '#FFFEB7',
						text:    '#7732A2'
					}
				},
				error: {
					key:     'error',
					title:   'Error',
					color: {
						bgLabel: '#C11713',
						label:   'white',
						bgText:  '#C11713',
						text:    'white'
					}
				},
				warn: {
					key:     'warn',
					title:   'Warning',
					color: {
						bgLabel: '#F29140',
						label:   'white',
						bgText:  '#FFD8B7',
						text:    'black'
					}
				},
				info: {
					key:     'info',
					title:   'Info',
					color: {
						bgLabel: '#413FA9',
						label:   'white',
						bgText:  '#B3B2EB',
						text:    'black'
					}
				},
				notice: {
					key:     'notice',
					title:   'Notice',
					color: {
						bgLabel: '#33C133',
						label:   'white',
						bgText:  '#ADF1AD',
						text:    'black'
					}
				},
				log: {
					key:     'log',
					title:   'Log',
					color: {
						bgLabel: '#f2f240',
						label:   'black',
						bgText:  '#ffff90',
						text:    'black'
					}
				},
				callstack: {
					key:     'TAS',
					title:   'function',
					color: {
						bgLabel: '#413FA9',
						label:   'white',
						bgText:  '#B3B2EB',
						text:    'black'
					}
				},
				callstack_async: {
					key:     'TAS',
					title:   'ASYNC CALL',
					color: {
						bgLabel: '#413FA9',
						label:   'white',
						bgText:  '#413FA9',
						text:    'white'
					}
				},
				TAS: {
					key:     'TAS',
					title:   'TAS',
					color: {
						bgLabel: 'grey',
						label:   'black;background:linear-gradient(#304352,#d7d2cc,#d7d2cc,#d7d2cc,#304352)',
						bgText:  'grey',
						text:    'black;background:linear-gradient(#304352,#d7d2cc,#d7d2cc,#d7d2cc,#304352)'
					}
				}
			},


			config = {
				debugMode: false,
				logging: {
					log: true,
					notice: true,
					info: true,
					warn: true,
					error: true,
					debug: false
				}
			},

			callstackRegistry = [],
			queuedUpdates = {}, //< Used for delaying saves till the last momment.

			complexType = function(o){
				switch(typeof o){
					case 'string':
						return 'string';
					case 'boolean':
						return 'boolean';
					case 'number':
						return (_.isNaN(o) ? 'NaN' : (o.toString().match(/\./) ? 'decimal' : 'integer'));
					case 'function':
						return 'function: '+(o.name ? o.name+'()' : '(anonymous)');
					case 'object':
						return (_.isArray(o) ? 'array' : (_.isArguments(o) ? 'arguments' : ( _.isNull(o) ? 'null' : 'object')));
					default:
						return typeof o;
				}
			},

			dataLogger = function(primaryLogger,secondaryLogger,data){
				_.each(data,function(m){
					var type = complexType(m);
					switch(type){
						case 'string':
							primaryLogger(m);
							break;
						case 'undefined':
						case 'null':
						case 'NaN':
							primaryLogger('['+type+']');
							break;
						case 'number':
						case 'not a number':
						case 'integer':
						case 'decimal':
						case 'boolean':
							primaryLogger('['+type+']: '+m);
							break;
						default:
							primaryLogger('['+type+']:=========================================');
							secondaryLogger(m);
							primaryLogger('=========================================================');
							break;
					}
				});
			},


			colorLog = function(options){
				var coloredLoggerFunction,
					key = options.key,
					label = options.title || 'TAS',
					lBGColor = (options.color && options.color.bgLabel) || 'blue',
					lTxtColor = (options.color && options.color.label) || 'white',
					mBGColor = (options.color && options.color.bgText) || 'blue',
					mTxtColor = (options.color && options.color.text) || 'white';

				coloredLoggerFunction = function(message){
					console.log(
						'%c '+label+': %c '+message,
						'background-color: '+lBGColor+';color: '+lTxtColor+'; font-weight:bold;',
						'background-color: '+mBGColor+';color: '+mTxtColor+';'
					);
				};
				return function(){
					if('TAS'===key || config.logging[key]){
						dataLogger(coloredLoggerFunction,function(m){console.log(m);},_.toArray(arguments));
					}
				};
			},

			logDebug  = colorLog(loggingSettings.debug),
			logError  = colorLog(loggingSettings.error),
			logWarn   = colorLog(loggingSettings.warn),
			logInfo   = colorLog(loggingSettings.info),
			logNotice = colorLog(loggingSettings.notice),
			logLog    = colorLog(loggingSettings.log),
			log       = colorLog(loggingSettings.TAS),
			logCS     = colorLog(loggingSettings.callstack),
			logCSA    = colorLog(loggingSettings.callstack_async),

			registerCallstack = function(callstack,label){
				var idx=_.findIndex(callstackRegistry,function(o){
					return (_.difference(o.stack,callstack).length === _.difference(callstack,o.stack).length)
						   && _.difference(o.stack,callstack).length === 0
						   && o.label === label;
				});
				if(-1 === idx){
					idx=callstackRegistry.length;
					callstackRegistry.push({
											   stack: callstack,
											   label: label
										   });
				}
				return idx;
			},

			setConfigOption = function(options){
				var newconf =_.defaults(options,config);
				newconf.logging=_.defaults(
					(options && options.logging)||{},
					config.logging
				);
				config=newconf;
			},

			debugMode = function(){
				config.logging.debug=true;
				config.debugMode = true;
			},

			getCallstack = function(){
				var e = new Error('dummy'),
					stack = _.map(_.rest(e.stack.replace(/^[^\(]+?[\n$]/gm, '')
											 .replace(/^\s+at\s+/gm, '')
											 .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@')
											 .split('\n')),function(l){
						return l.replace(/\s+.*$/,'');
					});
				return stack;
			},
			logCallstackSub = function(cs){
				var matches, csa;
				_.find(cs,function(line){
					matches = line.match(/TAS_CALLSTACK_(\d+)/);
					if(matches){
						csa=callstackRegistry[matches[1]];
						logCSA( '===================='+(csa.label ? '> '+csa.label+' <' : '')+'====================');
						logCallstackSub(csa.stack);
						return true;
					}
					logCS(line);
					return false;
				});
			},
			logCallstack = function(){
				var cs;
				if(config.debugMode){
					cs = getCallstack();
					cs.shift();
					log('==============================> CALLSTACK <==============================');
					logCallstackSub(cs);
					log('=========================================================================');
				}
			},


			wrapCallback = function (label, callback,context){
				var callstack;
				if('function' === typeof label){
					context=callback;
					callback=label;
					label=undefined;
				}
				if(!config.debugMode){
					return (function(cb,ctx){
						return function(){
							cb.apply(ctx||{},arguments);
						};
					}(callback,context));
				}

				callstack = getCallstack();
				callstack.shift();

				return (function(cb,ctx,cs,lbl){
					var ctxref=registerCallstack(cs,lbl);
					return new Function('cb','ctx','TASlog',
						"return function TAS_CALLSTACK_"+ctxref+"(){"+
						"TASlog('Entering: '+(cb.name||'(anonymous function)'));"+
						"cb.apply(ctx||{},arguments);"+
						"TASlog('Exiting: '+(cb.name||'(anonymous function)'));"+
						"};")(cb,ctx,log);
				}(callback,context,callstack,label));
			},


			prepareUpdate = function( attribute, value ){
				queuedUpdates[attribute]=value;
			},

			applyQueuedUpdates = function() {
				setAttrs(queuedUpdates);
				queuedUpdates = {};
			},

			namesFromArgs = function(args,base){
				return _.chain(args)
					.reduce(function(memo,attr){
						if('string' === typeof attr) {
							memo.push(attr);
						} else if(_.isArray(args) || _.isArguments(args)){
							memo = namesFromArgs(attr,memo);
						}
						return memo;
					},(_.isArray(base) && base) || [])
					.uniq()
					.value();
			},

			addId = function(obj,value){
				Object.defineProperty(obj,'id',{
					value: value,
					writeable: false,
					enumerable: false
				});
			},

			addProp = function(obj,prop,value,fullname){
				(function(){
					var pname=(_.contains(['S','F','I','D'],prop) ? '_'+prop : prop),
						full_pname = fullname || prop,
						pvalue=value;

					_.each(['S','I','F'],function(p){
						if( !_.has(obj,p)){
							Object.defineProperty(obj, p, {
								value: {},
								enumerable: false,
								readonly: true
							});
						}
					});
					if( !_.has(obj,'D')){
						Object.defineProperty(obj, 'D', {
							value: _.reduce(_.range(10),function(m,d){
								Object.defineProperty(m, d, {
									value: {},
									enumerable: true,
									readonly: true
								});
								return m;
							},{}),
							enumerable: false,
							readonly: true
						});
					}


					// Raw value
					Object.defineProperty(obj, pname, {
						enumerable: true,
						set: function(v){
							pvalue=v;
							prepareUpdate(full_pname,v);
						},
						get: function(){
							return pvalue;
						}
					});

					// string value
					Object.defineProperty(obj.S, pname, {
						enumerable: true,
						set: function(v){
							var val=v.toString();
							pvalue=val;
							prepareUpdate(full_pname,val);
						},
						get: function(){
							return pvalue.toString();
						}
					});

					// int value
					Object.defineProperty(obj.I, pname, {
						enumerable: true,
						set: function(v){
							var val=parseInt(v,10) || 0;
							pvalue=val;
							prepareUpdate(full_pname,val);
						},
						get: function(){
							return parseInt(pvalue,10) || 0;
						}
					});

					// float value
					Object.defineProperty(obj.F, pname, {
						enumerable: true,
						set: function(v){
							var val=parseFloat(v) || 0;
							pvalue=val;
							prepareUpdate(full_pname,val);
						},
						get: function(){
							return parseFloat(pvalue) || 0;
						}
					});
					_.each(_.range(10),function(d){
						Object.defineProperty(obj.D[d], pname, {
							enumerable: true,
							set: function(v){
								var val=(parseFloat(v) || 0).toFixed(d);
								pvalue=val;
								prepareUpdate(full_pname,val);
							},
							get: function(){
								return (parseFloat(pvalue) || 0).toFixed(d);
							}
						});
					});

				}());
			},

			repeating = function( section ) {
				return (function(s){
					var sectionName = s,
						attrNames = [],
						fieldNames = [],
						operations = [],
						after = [],

						repAttrs = function TAS_Repeating_Attrs(){
							attrNames = namesFromArgs(arguments,attrNames);
							return this;
						},
						repFields = function TAS_Repeating_Fields(){
							fieldNames = namesFromArgs(arguments,fieldNames);
							return this;
						},
						repReduce = function TAS_Repeating_Reduce(func, initial, final, context) {
							operations.push({
												type: 'reduce',
												func: (func && _.isFunction(func) && func) || _.noop,
												memo: (_.isUndefined(initial) && 0) || initial,
												final: (final && _.isFunction(final) && final) || _.noop,
												context: context || {}
											});
							return this;
						},
						repMap = function TAS_Repeating_Map(func, final, context) {
							operations.push({
												type: 'map',
												func: (func && _.isFunction(func) && func) || _.noop,
												final: (final && _.isFunction(final) && final) || _.noop,
												context: context || {}
											});
							return this;
						},
						repEach = function TAS_Repeating_Each(func, final, context) {
							operations.push({
												type: 'each',
												func: (func && _.isFunction(func) && func) || _.noop,
												final: (final && _.isFunction(final) && final) || _.noop,
												context: context || {}
											});
							return this;
						},
						repTap = function TAS_Repeating_Tap(final, context) {
							operations.push({
												type: 'tap',
												final: (final && _.isFunction(final) && final) || _.noop,
												context: context || {}
											});
							return this;
						},
						repAfter = function TAS_Repeating_After(callback,context) {
							after.push({
										   callback: (callback && _.isFunction(callback) && callback) || _.noop,
										   context: context || {}
									   });
							return this;
						},
						repExecute = function TAS_Repeating_Execute(callback,context){
							var rowSet = {},
								attrSet = {},
								fieldIds = [],
								fullFieldNames = [];

							repAfter(callback,context);

							// call each operation per row.
							// call each operation's final
							getSectionIDs("repeating_"+sectionName,function(ids){
								fieldIds = ids;
								fullFieldNames = _.reduce(fieldIds,function(memo,id){
									return memo.concat(_.map(fieldNames,function(name){
										return 'repeating_'+sectionName+'_'+id+'_'+name;
									}));
								},[]);
								getAttrs( _.uniq(attrNames.concat(fullFieldNames)), function(values){
									_.each(attrNames,function(aname){
										if(values.hasOwnProperty(aname)){
											addProp(attrSet,aname,values[aname]);
										}
									});

									rowSet = _.reduce(fieldIds,function(memo,id){
										var r={};
										addId(r,id);
										_.each(fieldNames,function(name){
											var fn = 'repeating_'+sectionName+'_'+id+'_'+name;
											addProp(r,name,values[fn],fn);
										});

										memo[id]=r;

										return memo;
									},{});

									_.each(operations,function(op){
										var res;
										switch(op.type){
											case 'tap':
												_.bind(op.final,op.context,rowSet,attrSet)();
												break;

											case 'each':
												_.each(rowSet,function(r){
													_.bind(op.func,op.context,r,attrSet,r.id,rowSet)();
												});
												_.bind(op.final,op.context,rowSet,attrSet)();
												break;

											case 'map':
												res = _.map(rowSet,function(r){
													return _.bind(op.func,op.context,r,attrSet,r.id,rowSet)();
												});
												_.bind(op.final,op.context,res,rowSet,attrSet)();
												break;

											case 'reduce':
												res = op.memo;
												_.each(rowSet,function(r){
													res = _.bind(op.func,op.context,res,r,attrSet,r.id,rowSet)();
												});
												_.bind(op.final,op.context,res,rowSet,attrSet)();
												break;
										}
									});

									// finalize attrs
									applyQueuedUpdates();
									_.each(after,function(op){
										_.bind(op.callback,op.context)();
									});
								});
							});
						};

					return {
						attrs: repAttrs,
						attr: repAttrs,

						column: repFields,
						columns: repFields,
						field: repFields,
						fields: repFields,

						reduce: repReduce,
						inject: repReduce,
						foldl: repReduce,

						map: repMap,
						collect: repMap,

						each: repEach,
						forEach: repEach,

						tap: repTap,
						'do': repTap,

						after: repAfter,
						last: repAfter,
						done: repAfter,

						execute: repExecute,
						go: repExecute,
						run: repExecute
					};
				}(section));
			},


			repeatingSimpleSum = function(section, field, destination){
				repeating(section)
					.attr(destination)
					.field(field)
					.reduce(function(m,r){
						return m + (r.F[field]);
					},0,function(t,r,a){
						a[destination]=t;
					})
					.execute();
			};

		console.log('%c•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸  The Aaron Sheet  v'+version+'  ¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•','background: linear-gradient(to right,green,white,white,green); color:black;text-shadow: 0 0 8px white;');
		console.log('%c•.¸¸.•*´¨`*•.¸¸.•*´¨`*•.¸  Last update: '+(new Date(lastUpdate*1000))+'  ¸.•*´¨`*•.¸¸.•*´¨`*•.¸¸.•','background: linear-gradient(to right,green,white,white,green); color:black;text-shadow: 0 0 8px white;');


		return {
			/* Repeating Sections */
			repeatingSimpleSum: repeatingSimpleSum,
			repeating: repeating,

			/* Configuration */
			config: setConfigOption,

			/* Debugging */
			callback: wrapCallback,
			callstack: logCallstack,
			debugMode: debugMode,
			_fn: wrapCallback,

			/* Logging */
			debug: logDebug,
			error: logError,
			warn: logWarn,
			info: logInfo,
			notice: logNotice,
			log: logLog
		};
	}());

/* ---- END: TheAaronSheet.js ---- */
TAS.config({logging:{debug: true}});
TAS.debugMode();


var ExExp = ExExp|| (function(){

		parseExpression = function (s, until) {
			var untilCb = (typeof until === "function" ? until : function (tok) {
				return (tok == until);
			});

			// constants
			var ARG_COUNTS = { 'abs': 1 , 'ceil': 1 , 'floor': 1 , 'round': 1 , 'max': [1] , 'min': [1] };
			var BINARY_PRECEDENCE = {
				'?': 1, ':': 2, '||': 3, '&&': 4, '|': 5, '^': 6
				, '&': 7, '=': 8, '==': 8, '!=': 8, '>=': 9, '>': 9
				, '<': 9, '<=': 9, '<<': 10, '>>': 10, '+': 11, '-': 11
				, '*': 12, '/': 12, '%': 12
				, '**': 14
				, 't': 98, 'd': 99
			};
			var UNARY_PRECEDENCE = {
				'!': 13
				, '~': 13
				, '-': 13
			};
			var CLOSERS = {
				'(': ")"
				, '{': "}"
			};

			// local variables
			var operators = [{'precedence': 0}], operands = [];

			// helper functions
			function getToken(s) {
				if (!s) {
					return s;
				}

				var m;

				function retVal(tokType, matchObj) {
					return {
						'type': tokType
						, 'text': matchObj[0]
						, 'match': matchObj
					};
				}

				m = s.match(/^\s+/);
				if (m) {
					return retVal("whitespace", m);
				}
				m = s.match(/^(abs|ceil|floor|round|max|min)[(]/);
				if (m) {
					return retVal("function", m);
				}
				m = s.match(/^[({]/);
				if (m) {
					return retVal("opengroup", m);
				}
				m = s.match(/^[)}]/);
				if (m) {
					return retVal("closegroup", m);
				}
				m = s.match(/^((\d+(\.\d+)?)|(\.\d+))/);
				if (m) {
					return retVal("number", m);
				}
				m = s.match(/^['"]/);
				if (m) {
					return retVal("quote", m);
				}
				m = s.match(/^((\|\|)|(&&)|(==)|(!=)|(>=)|(<=)|(<<)|(>>)|(\*\*)|[?:|^&=><%!~])/);
				if (m) {
					return retVal("extoperator", m);
				}
				m = s.match(/^[-+*/td]/);
				if (m) {
					return retVal("baseoperator", m);
				}
				m = s.match(/^\[([^\]]+)\]/);
				if (m) {
					return retVal("label", m);
				}
				m = s.match(/^\${([^'"($}][^}]*)}/);
				if (m) {
					return retVal("variable", m);
				}
				m = s.match(/^\${/);
				if (m) {
					return retVal("openvariable", m);
				}

				return {
					'type': "raw"
					, 'text': s.charAt(0)
				};
			}

			function popToken(state) {
				state.tok = getToken(state.s);
				if (state.tok) {
					state.s = state.s.substring(state.tok.text.length);
				}
				return state;
			}

			function popString(state, delim) {
				var i = -1
					, j = i;
				// find first index of delim not preceeded by an odd number of backslashes
				while (((i - j) & 1) === 0) {
					i = state.s.indexOf(delim, i + 1);
					if (i < 0) {
						return;
					}
					j = i - 1;
					while ((j >= 0) && (state.s.charAt(j) === '\\')) {
						j--;
					}
				}
				// unescape string to be returned
				function replaceEscapes(s) {
					return s.replace(/\\n/g, "\n")
						.replace(/\\r/g, "\r")
						.replace(/\\t/g, "\t")
						.replace(/\\/g, "");
				}
				var retval = state.s.substring(0, i)
					.split("\\\\")
					.map(replaceEscapes)
					.join("\\");
				// point state delim, then pop off the delimiter token
				state.s = state.s.substring(i);
				popToken(state);
				return retval;
			}

			function popOperator() {
				var op = operators.pop();
				var right = operands.pop();
				if (op.unary) {
					operands.push({
									  'type': (op.type === "baseoperator" ? "unop" : "unopex")
									  , 'datatype': right.datatype
									  , 'operator': op.text
									  , 'operand': right
								  });
					return;
				}
				var left = operands.pop();
				if (op.text !== ":") {
					var datatype;
					if (op.text === "d" || op.text === "t") {
						datatype = "number";
					} else if (left.datatype === right.datatype) {
						datatype = left.datatype;
					} else if ((left.datatype === "string") || (right.datatype === "string")) {
						datatype = "string";
					}
					operands.push({
									  'type': (op.type === "baseoperator" ? "binop" : "binopex")
									  , 'datatype': datatype
									  , 'operator': op.text
									  , 'left': left
									  , 'right': right
									  , 'mods': op.mods
									  , 'label': op.label
								  });
					return;
				}
				op = operators.pop();
				if (op.text !== "?") {
					return "Error: Expected ? but got " + op.text;
				}
				var cond = operands.pop();
				operands.push({
								  'type': "cond"
								  , 'cond': cond
								  , 'left': left
								  , 'right': right
								  , 'datatype': (left.datatype === right.datatype ? left.datatype : undefined)
							  });
			}

			function pushOperator(op) {
				var err;
				op.precedence = (op.unary ? UNARY_PRECEDENCE[op.text] : BINARY_PRECEDENCE[op.text]) || 0;
				while (operators[operators.length - 1].precedence >= op.precedence) {
					err = popOperator();
					if (err) {
						return err;
					}
				}
				operators.push(op);
			}

			function argListUntil(tok) {
				return (tok === ',') || (tok === ')');
			}

			function parseHelper() {
				var err;

				popToken(s);
				if (!s.tok) {
					return "Error: Unrecognized token: " + s.s.split(" ", 1)[0];
				}
				while (s.tok.type === "whitespace") {
					popToken(s);
					if (!s.tok) {
						return "Error: Unrecognized token: " + s.s.split(" ", 1)[0];
					}
				}
				switch (s.tok.type) {
					case "function":
						var func = s.tok.match[1];
						var argCounts = ARG_COUNTS[func]
							, minArgs, maxArgs;
						if (argCounts === undefined) {
							return "Error: Unrecognized function: " + func;
						}
						if (Array.isArray(argCounts) ) {
							minArgs = argCounts[0];
							maxArgs = argCounts[1];
						} else {
							minArgs = argCounts;
							maxArgs = argCounts;
						}
						var args = [];
						while ((s.tok) && (s.tok.text !== ')')) {
							var argTree = parseExpression(s, argListUntil);
							if (typeof (argTree) === "string") {
								return argTree;
							} // error
							args.push(argTree);
							if (!s.tok) {
								return "Error: Unterminated function: " + func;
							}
							if (!argListUntil(s.tok.text)) {
								return "Error: Expected ',' or ')' to continue/close '" + func + "(', but got '" + s.tok.text + "'";
							}
						}
						if (minArgs < 0) {
							minArgs = args.length;
						}
						if (isNaN(maxArgs)||maxArgs<0) {
							maxArgs = args.length;
						}
						if (args.length < minArgs) {
							return "Error: Function '" + func + "' requires at least " + minArgs + " argument(s)";
						}
						if (args.length > maxArgs) {
							return "Error: Function '" + func + "' requires at most " + maxArgs + " argument(s)";
						}
						operands.push({
										  'type': "function"
										  , 'datatype': "number"
										  , 'function': func
										  , 'args': args
									  });
						return;
					case "number":
						operands.push({
										  'type': "number"
										  , 'datatype': "number"
										  , 'value': parseFloat(s.tok.text)
									  });
						return;
					case "variable":
						operands.push({
										  'type': "variable"
										  , 'value': s.tok.match[1]
									  });
						return;
					case "quote":
						var str = popString(s, s.tok.text);
						if (typeof (str) !== "string" ) {
							return "Error: Unterminated string";
						}
						operands.push({
										  'type': "string"
										  , 'datatype': "string"
										  , 'value': str
									  });
						return;
					case "opengroup":
						var opener = s.tok.text
							, closer = CLOSERS[opener];
						var operand = parseExpression(s, closer);
						if (typeof (operand) === "string") {
							return operand;
						} // error
						operands.push(operand);
						if (s.tok.text !== closer) {
							return "Error: Expected '" + closer + "' to close '" + opener + "', but got '" + s.tok.text + "'";
						}
						return;
					case "openvariable":
						var varExp = parseExpression(s, "}");
						if (typeof (varExp) === "string") {
							return varExp;
						} // error
						if (s.tok.text !== "}") {
							return "Error: Expected '}' to close '${', but got '" + s.tok.text + "'";
						}
						operands.push({
										  'type': "variable"
										  , 'value': varExp
									  });
						return;
					case "extoperator":
					case "baseoperator":
						if (!UNARY_PRECEDENCE[s.tok.text]) {
							return "Error: " + s.tok.text + " is not a unary operator";
						}
						s.tok.unary = true;
						err = pushOperator(s.tok);
						if (err) {
							return err;
						}
						return parseHelper();
				}
				return "Error: Unrecognized token: " + s.tok.text + (s.tok.type === "raw" ? s.s.split(" ", 1)[0] : "");
			}

			// if we were given a string, construct a state object
			if (typeof (s) === "string") {
				s = {
					's': s
				};
			}

			// push operators and operands to their respective stacks, building sub-ASTs in the operand stack as needed
			var err = parseHelper();
			if (err) {
				return err;
			}
			for (popToken(s);
				 (s.tok) && (!untilCb(s.tok.text)) && ((until) || (s.tok.type !== "raw")); popToken(s)) {
				switch (s.tok.type) {
					case "extoperator":
					case "baseoperator":
						rollOperator = (s.tok.text === "d" ? s.tok : null);
						err = pushOperator(s.tok);
						if (err) {
							return err;
						}
						if ((rollOperator) && (s.s.charAt(0) === 'F')) {
							operands.push({
											  'type': "rollspec"
											  , 'value': "F"
										  })
							s.s = s.s.substring(1);
						} else if (s.tok.text === "t") {
							if (s.s.charAt(0) !== '[') {
								return "Error: 't' operator requires '[table]' argument";
							}
							var m = s.s.match(/^\[([^'"$(\]][^\]]*)\]/);
							var tableExp;
							if (m) {
								tableExp = m[1];
								s.s = s.s.substring(m[0].length);
							} else {
								s.s = s.s.substring(1);
								tableExp = parseExpression(s, "]");
								if (typeof (tableExp) === "string") {
									return tableExp;
								} // error
								if (s.tok.text !== "]") {
									return "Error: Expected ']' to close 't[', but got '" + s.tok.text + "'";
								}
							}
							operands.push({
											  'type': "tablename"
											  , 'value': tableExp
										  });
						} else {
							err = parseHelper();
							if (err) {
								return err;
							}
						}
						if (rollOperator) {
							var m = s.s.match(/^[acdfhkloprs0-9<=>!]+/);
							if (m) {
								rollOperator.mods = m[0];
								s.s = s.s.substring(m[0].length)
							}
						}
						break;
					case "label":
						if ((operators.length > 0) && (operators[operators.length - 1].text === "d")) {
							// set label on "d" operator instead of operand (e.g. "1d6[foo]" is "(1d6)[foo]", not "1d(6[foo])")
							operators[operators.length - 1].label = s.tok.match[1];
							break;
						}
						var operand = operands.pop();
						if (operand) {
							operand.label = s.tok.match[1];
							operands.push(operand);
						}
						break;
				}
			}
			// no more input; collapse remaining operators and operands into a single AST
			while (operators.length > 1) {
				err = popOperator();
				if (err) {
					return err;
				}
			}

			return operands.pop();
		},

			write= function (s) {
				console.log("EXEXP:"+s);
			},


			sendCommand= function (chunks, asts, evalResults, labels) {
				//infinite loop
				//TAS.log("at sendCommand");
				//TAS.log(chunks);TAS.log(asts); TAS.log(evalResults);TAS.log(labels);
				// constants
				var FUNCTION_FUNCTIONS = {
					'abs': Math.abs
					, 'ceil': Math.ceil
					, 'floor': Math.floor
					, 'round': Math.round
					, 'max': Math.max
					, 'min': Math.min
				};
				var BINARY_FUNCTIONS = {
					'||': function (x, y) {
						return x || y;
					}
					, '&&': function (x, y) {
						return x && y;
					}
					, '|': function (x, y) {
						return x | y;
					}
					, '^': function (x, y) {
						return x ^ y;
					}
					, '&': function (x, y) {
						return x & y;
					}
					, '=': function (x, y) {
						return x == y;
					}
					, '==': function (x, y) {
						return x == y;
					}
					, '!=': function (x, y) {
						return x != y;
					}
					, '>=': function (x, y) {
						return x >= y;
					}
					, '>': function (x, y) {
						return x > y;
					}
					, '<': function (x, y) {
						return x < y;
					}
					, '<=': function (x, y) {
						return x <= y;
					}
					, '<<': function (x, y) {
						return x << y;
					}
					, '>>': function (x, y) {
						return x >> y;
					}
					, '+': function (x, y) {
						return x + y;
					}
					, '-': function (x, y) {
						return x - y;
					}
					, '*': function (x, y) {
						return x * y;
					}
					, '/': function (x, y) {
						return x / y;
					}
					, '%': function (x, y) {
						return x % y;
					}
					, '**': Math.pow
					, 'd': function (x, y) {
						var retval = 0;
						for (var i = 0; i < x; i++) {
							retval += randomInteger(y);
						}
						return retval;
					}
				};
				var UNARY_FUNCTIONS = {
					'!': function (x) {
						return !x;
					}
					, '~': function (x) {
						return ~x;
					}
					, '-': function (x) {
						return -x;
					}
				};


				// local variables
				var references = {}
					, unevalRefs = []
					, evalReqs = [];

				// helper functions
				function lazyEval(t, labels, references, unevalRefs, evalReqs, force) {
					//alert(' at lazyEval, t: ' + t + ', t.type:'+t.type);
					var x, y;

					if (t.label) {
						labels[t.label] = t;
					}

					switch (t.type) {
						case "number":
						case "rollspec":
							t.baseValid = true;
						// fall through
						case "string":
							return t;
						case "tablename":
							if (typeof (t.value) !== "string") {
								x = lazyEval(t.value, labels, references, unevalRefs, evalReqs, true);
								if (typeof (x) === "string") {
									return x;
								} // error
								if (x.type === "number") {
									// number node; coerce to string
									x.value = "" + x.value;
									x.type = "string"
								}
								if (x.type !== "string") {
									// unable to fully evaluate table name
									if (t.baseValid) {
										t.baseValid = false;
									}
									unevalRefs.push(t.value);
									return t;
								}
								// successfully evaluated table name
								t.value = x.value;
							}
							// if we got here, t.value is the name of a rollable table
							t.baseValid = true;
							return t;
						case "function":
							var args = [];
							for (var i = 0; i < t.args.length; i++) {
								x = lazyEval(t.args[i], labels, references, unevalRefs, evalReqs, true);
								if (typeof (x) === "string") {
									return x;
								} // error
								if (x.type === "string") {
									x.value = parseFloat(x.value);
									x.type = "number";
								}
								if (x.type !== "number") {
									// unable to fully evaluate argument
									if (t.baseValid) {
										t.baseValid = false;
									}
									return t;
								}
								args.push(x.value);
							}
							// successfully evaluated all arguments
							t.type = "number";
							t.datatype = "number";
							t.value = FUNCTION_FUNCTIONS[t.function].apply(args, args);
							for (var i = 0; i < t.args.length; i++) {
								if (t.args[i].label) {
									labels[t.args[i].label] = t.args[i];
								}
							}
							delete t.function;
							delete t.args;
							t.baseValid = true;
							return t;
						case "unop":
						case "unopex":
							force = force || (t.type !== "unop");
							x = lazyEval(t.operand, labels, references, unevalRefs, evalReqs, force);
							if (typeof (x) === "string") {
								return x;
							} // error
							if (force) {
								if (x.type !== "number") {
									// unable to fully evaluate operand
									if (t.baseValid) {
										t.baseValid = false;
									}
									return t;
								}
								// successfully evaluated operand
								t.type = "number";
								t.datatype = "number";
								t.value = UNARY_FUNCTIONS[t.operator](x.value);
								delete t.operator;
								if (t.operand.label) {
									labels[t.operand.label] = x;
								}
								delete t.operand;
								t.baseValid = true;
							} else {
								t.baseValid = x.baseValid;
							}
							return t;
						case "binop":
						case "binopex":
							force = force || (t.type !== "binop") || (t.left.datatype === "string") || (t.right.datatype === "string");
							var forceSubtrees = force || (t.operator === "d") || (t.operator === "t");
							//alert('left is: ' + t.left + ', right is:' + t.right);
							x = lazyEval(t.left, labels, references, unevalRefs, evalReqs, forceSubtrees);
							y = lazyEval(t.right, labels, references, unevalRefs, evalReqs, forceSubtrees);
							//    TAS.log("At binop the values are: x:"+x+", y:"+y);
							//	TAS.log(x);
							//	TAS.log(y);
							force = true;
							/*****************************************************/
							if (typeof x === "string") {
								//	TAS.log(x);
								return x;
							} // error
							if (typeof y === "string") {
								//	TAS.log(y);
								return y;
							} // error
							/****************************************************/
							if (force) {
								if ((x.type !== "number") && (x.type !== "string")) {
									// unable to fully evaluate left operand
									if (t.baseValid) {
										t.baseValid = false;
									}
									return t;
								}
								if ((y.type !== "number") && (y.type !== "string") && (y.type !== "rollspec") && (y.type !== "tablename")) {
									// unable to fully evaluate right operand
									if (t.baseValid) {
										t.baseValid = false;
									}
									return t;
								}
								if ((y.type === "rollspec") && (t.operator !== "d")) {
									return "Rollspec operand is only compatible with 'd' operator";
								}
								if ((t.operator === "t") && (y.type !== "tablename")) {
									return "'t' operator requires tablename operand";
								}
								// successfully evaluated both operands
								if ((t.operator === "t") || ((t.operator === "d") && (t.mods))) {
									// operator is rollable table or is roll with mods; must submit to base system for evaluation
									evalReqs.push(t);
									return t;
								}
								//alert('about to call binary');
								t.value = BINARY_FUNCTIONS[t.operator](x.value, y.value);
								delete t.operator;
								if (t.left.label) {
									labels[t.left.label] = x;
								}
								delete t.left;
								if (t.right.label) {
									labels[t.right.label] = y;
								}
								delete t.right;
								t.type = (typeof (t.value) === "string" ? "string" : "number");
								t.datatype = t.type;
								t.baseValid = (t.datatype === "number");
							} else if ((x.datatype === "number") && (y.datatype === "number")) {
								t.datatype = "number";
								t.baseValid = true;
							}
							return t;
						case "cond":
							x = lazyEval(t.cond, labels, references, unevalRefs, evalReqs, true);
							if (typeof (x) === "string") {
								return x;
							} // error
							if ((x.type !== "number") && (x.type !== "string")) {
								// unable to fully evaluate condition
								t.baseValid = false;
								return t;
							}
							// successfully evaluated condition; replace t with t.left or t.right as appropriate
							y = (x.value ? t.left : t.right);
							if (t.cond.label) {
								labels[t.cond.label] = x;
							}
							delete t.cond;
							delete t.left;
							delete t.right;


							for (var k in y) {
								t[k] = y[k];
							}
							return lazyEval(t, labels, references, unevalRefs, evalReqs, force);
						case "variable":
							if (typeof (t.value) !== "string") {
								x = lazyEval(t.value, labels, references, unevalRefs, evalReqs, true);
								if (typeof (x) === "string") {
									return x;
								} // error
								if (x.type === "number") {
									// number node; coerce to string
									x.value = "" + x.value;
									x.type = "string"
								}
								if (x.type !== "string") {
									// unable to fully evaluate variable name
									if (t.baseValid) {
										t.baseValid = false;
									}
									unevalRefs.push(t.value);
									return t;
								}
								// successfully evaluated variable name
								t.value = x.value;
							}
							// if we got here, t.value is the name of a variable
							if ((labels[t.value]) && ((labels[t.value].type === "string") || (labels[t.value].type === "number"))) {
								// variable exists and has been fully evaluated
								t.type = labels[t.value].type;
								t.datatype = labels[t.value].datatype;
								t.baseValid = labels[t.value].baseValid;
								t.value = labels[t.value].value;
							} else {
								// variable not yet defined or not yet fully evaluated
								if (!references[t.value]) {
									references[t.value] = [];
								}
								references[t.value].push(t);
								if (t.baseValid) {
									t.baseValid = false;
								}
							}
							return t;
						default:
							return "Unknown node type: " + t.type;
					}
				}

				function hasUnevaluatedLabels(t) {
					// base types: fully evaluated
					if ((t.type === "number") || (t.type === "string") || (t.type === "rollspec")) {
						return false;
					}

					// if we got here, node is unevaluated
					if (t.label) {
						return true;
					}

					// node has no label; check children
					switch (t.type) {
						case "function":
							for (var i = 0; i < t.args.length; i++) {
								if (hasUnevaluatedLabels(t.args[i])) {
									return true;
								}
							}
							return false;
						case "tablename":
						case "variable":
							if (typeof (t.value) === "string") {
								return false;
							}
							return hasUnevaluatedLabels(t.value);
						case "unop":
						case "unopex":
							return hasUnevaluatedLabels(t.operand);
						case "cond":
							if (hasUnevaluatedLabels(t.cond)) {
								return true;
							}
						// fall through
						case "binop":
						case "binopex":
							if (hasUnevaluatedLabels(t.left)) {
								return true;
							}
							return hasUnevaluatedLabels(t.right);
					}
				}

				function flattenAST(t) {
					var retval;

					switch (t.type) {
						case "number":
						case "rollspec":
							retval = t.value || 0;
							break;
						case "tablename":
							retval = "[" + t.value + "]";
							break;
						case "unop":
							retval = "(" + t.operator + flattenAST(t.operand) + ")";
							break;
						case "binop":
							retval = "(" + flattenAST(t.left) + t.operator + flattenAST(t.right) + (t.mods || "") + ")";
							if ((t.label) && (t.operator === "d")) {
								retval += "[" + t.label + "]";
							}
							break;
						default:
							return "Unknown node type: " + t.type;
					}

					return retval;
				}

				function astToCmd(t) {
					if (t.type === "string") {
						return t.value;
					}
					var retval = flattenAST(t);
					return retval;
				}

				function reportError(err) {
					ExExp.write("Error: " + err);
					return "";
				}

				//BEGIN
				// substitute in results of base evaluation
				for (var i = 0; i < evalResults.length; i++) {
					var t = evalResults[i][0];
					delete t.operator;
					delete t.left;
					delete t.right;
					t.type = "number";
					t.datatype = "number";
					t.value = evalResults[i][1];
					t.baseValid = true;
				}

				// traverse ASTs, collapsing as much as possible
				for (var i = 0; i < asts.length; i++) {
					if (asts[i].baseValid) {
						continue;
					} // can be handled by base expression evaluator
					if ((asts[i].type === "string") || (asts[i].type === "number")) {
						continue;
					} // tree is fully evaluated
					var err = lazyEval(asts[i], labels, references, unevalRefs, evalReqs, false);
					if (typeof (err) === "string") {
						return reportError(err);
					}
				}

				// do variable substitution; repeat until we don't make any more progress
				var doSubstitution = true;
				while (doSubstitution) {
					doSubstitution = false;
					// substitute in values for variables for which we already have names

					for (var label in references) {
						if (!labels[label]) {
							return reportError("Variable '" + label + "' not defined");
						}
						if ((labels[label].type !== "string") && (labels[label].type !== "number")) {
							// variable exists but not yet evaluated; try to evaluate
							var err = lazyEval(labels[label], labels, references, unevalRefs, evalReqs, true);
							if (typeof (err) === "string") {
								return reportError(err);
							}
						}
						if ((labels[label].type === "string") || (labels[label].type === "number")) {
							// variable fully evaluated; substitute it in
							for (var i = 0; i < references[label].length; i++) {
								references[label][i].type = labels[label].type;
								references[label][i].datatype = labels[label].datatype;
								references[label][i].value = labels[label].value;
								references[label][i].baseValid = labels[label].baseValid;
							}
							delete references[label];
							doSubstitution = true;
						}
					}

					// try to get names for variables and tables with unevaluated names
					var newUneval = [];
					while (unevalRefs.length > 0) {
						var r = lazyEval(unevalRefs.shift(), labels, references, unevalRefs, evalReqs, true);
						if (typeof (r) === "string") {
							return reportError(err);
						}
						if ((r.type === "string") || (r.type === "number")) {
							doSubstitution = true;
						} else {
							newUneval.push(r);
						}
					}
					unevalRefs = newUneval;

				}

				// flatten fully evaluated ASTs into strings and splice into chunks
				for (var i = asts.length - 1; i >= 0; i--) {
					if ((!asts[i].baseValid) && (asts[i].type !== "number") && (asts[i].type !== "string")) {
						continue;
					}
					if ((unevalRefs.length > 0) & (hasUnevaluatedLabels(asts[i]))) {
						continue;
					}
					chunks.splice(i, 2, (chunks[i] || "") + astToCmd(asts.splice(i, 1)[0]) + (chunks[i + 1] || ""));
				}

				if (evalReqs.length > 0) {
					Console.log("Cannot evalutate");
					return "";
				}
				if (asts.length > 0) {
					// need to finish evaluating some ASTs; recurse directly
					return sendCommand(chunks, asts, [], labels)
				}
				// if we got here, we're done evaluating everything; submit results via sendChat
				var retval=chunks.join("");

				return retval;
			},


			handleExpression= function ( msg) {
				var chunks = []
					, asts = []
					, cmd = msg.replace(/^\s+/, "");
				var state = {
					's': cmd
				};
				var ast ;
				//TAS.log(msg);
				ast= parseExpression(state, null);
				//TAS.log(ast);
				if (typeof (ast) === "string") {
					ExExp.write("could not parse"+msg);
					return "";
				}
				asts.push(ast);
				state.s =  (state.tok)?(state.tok.text+state.s):state.s;
				//  ((state.tok || {'text': ""}).text || "") + state.s;
				chunks.push(state.s);
				return sendCommand(chunks, asts, [], {});
			};


		return {
			write:write,
			handleExpression:handleExpression
		};
	}());



var SWUtils = SWUtils || (function() {

		/*no macro calls, dropdowns, or keep  highest/lowest more than 1
		 * currently support floor, abs, kh1, kl1 , also extended: ceil, round, max, min
		 */
		var validNumericStr = function(preeval) {
				var anyIllegal=preeval.match(/\||\?|&|\{|\}|k[h,l][^1]/);
				if (anyIllegal) {
					return false;
				}

				anyIllegal=preeval.replace(/floor|ceil|round|abs|max|min|kh1|kl1/g,'');
				anyIllegal = anyIllegal.match(/[a-zA-Z]/);
				if (anyIllegal) {
					return false;
				}
				return true;
			},

		/* searchAndReplaceFields
		 * Examines a string for instances of @{fieldname}, and then searches the sheet for those values
		 * then replaces the instances in the string with the values of those fields.
		 * Because it is a search and replace, if there are no @{fieldname} values, then it will return the same string back.
		 * If there is an error, it will return an empty string "".
		 *
		 * @fromfield = string containing one or more @{fieldname}
		 * @callback = method accepting 1 parameter , this parameter will be the result of the search and replace in the fromfield.
		 * the end result should be evaluable to a number (not a macro string that is sent to chat)
		 *   e.g.: replaces  [[ and ]] with ( and ) , ensures only kl1 or kh1 (not kh2 or more etc),
		 *         no strings except valid functions like floor, ceil, etc, according to validNumericStr
		 */
			searchAndReplaceFields = function(fromfield, callback ) {
				if (typeof callback !== "function") {
					return;
				}
				if (! fromfield ) {
					callback(null);
					return;
				}
				try {
					var i,numfields,fieldnames=[],matches = [];
					fromfield = fromfield.split("selected|").join("");
					fromfield = fromfield.split("target|").join("");

					matches = fromfield.match(/(@\{([^}]+)\})(?!.*\1)/g);
					if (!matches) {
						callback (fromfield);
						return;
					}
					numfields=matches.length;

					fieldnames=[numfields];
					for (i=0;i<numfields;i++) {
						fieldnames[i]=matches[i].replace("@{","").replace("}","");
					}
					getAttrs(fieldnames,function(values){
						var evalstr=fromfield,replacements=[numfields];
						try {
							for (i=0;i<numfields;i++){
								replacements[i]=values[fieldnames[i]];
							}
							for (i=0;i<numfields;i++){
								//easier than escaping special regex and double escaping $
								evalstr = evalstr.split(matches[i]).join(replacements[i]);

							}
						} catch (err) {
							console.log("ERROR:" + err);
							evalstr=null;
						} finally {
							callback ( evalstr);
						}
					});
				} catch (err){
					console.log("ERROR: " + err);
					callback (null);
				}
			},

		/* evaluateExpression
		 *  reads in the string, evalutates it until we find a number, then passes that numbe to the callback.
		 *  @exprStr= A string containing a mathematical expression, possibly containing references to fields such as @{myfield}
		 *  @callback = a function taking one parameter, either a number or empty string .
		 */
			evaluateExpression = function(exprStr,callback) {
				if (typeof callback !== "function" ) {
					return;
				}
				if (! exprStr) {
					callback("");
				}
				searchAndReplaceFields(exprStr, function(replacedStr) {
					var evaluated;
					console.log("search and replace of " + exprStr +" resulted in " + replacedStr);
					replacedStr=replacedStr.replace(/\s+/g,'').replace(/\[\[/g,"(").replace(/\]\]/g,")");
					if(!isNaN(parseFloat(replacedStr)) && isFinite(replacedStr)) {
						evaluated=parseFloat(replacedStr);
						console.log("sending back "+evaluated);
						callback(evaluated);
					}
					if (!isNaN(evaluated)) {  console.log("sending back "+evaluated); callback(evaluated); }
					else if (typeof replacedStr !== "undefined" && replacedStr !== null && validNumericStr(replacedStr) ) {
						evaluated = ExExp.handleExpression(replacedStr);
						console.log("sending back "+evaluated);
						callback( evaluated);
					} else {
						console.log("ERROR: cannot evaluate this to number: " + exprStr);
						callback(null);
					}
				});
			},


		/* evaluateAndSetString
		 * Searches the readField for any instances of @{field} and replaces them with a value
		 * then writes the resulting string to the writeField.
		 *
		 * @readField = the field that contains the string to evaluate, like a field containing a macro
		 * @writeField = the field to write the evaluated value of readField to
		 * @ensureValidExpr = the field should POTENTIALLY be evalauable to a number, it does not have to finish the evaluation,
		 */
			evaluateAndSetString = function (readField,writeField,ensureValidExpr) {
				if (!writeField || !readField) {
					return;
				}
				getAttrs([readField], ensureValidExpr,function(values) {
					searchAndReplaceFields(values[readField], function(replacedStr) {
						var setter = {};
						if (typeof replacedStr !== "undefined" && replacedStr !== null ) {
							setter[writeField]=replacedStr;
							setAttrs(setter);
						}
					});
				});
			},

		/* evaluateAndSetNumber
		 * Examines the string in readField, and tests to see if it is a number
		 * if it's a number immediately write it to writeField.
		 * if not, then replace any @{field} references with numbers, and then evaluate it
		 * as a mathematical expression till we find a number.
		 *
		 * note this is NOT recursive, you can't point one field of
		 *
		 * @readField {string}= field to read containing string to parse
		 * @writeField {string}= field to write to
		 * @dontForceOnBlank {boolean}= False (default): if writeField is empty overwrite no matter what,
		 *               True: if writeField empty, then write only if readField evaluates to other than defaultVal||0.
		 * @defaultVal {number}= optional, default to set if we cannot evaluate the field. If none set to 0.
		 *
		 */
			evaluateAndSetNumber = function(readField,writeField,dontForceOnBlank,defaultVal){
				//console.log("EEEE at evaluateAndSetNumber read:"+readField+", write:"+writeField+", dontforce:"+dontForceOnBlank+", default:"+defaultVal);
				getAttrs([readField,writeField], function (values){
					//console.log(values);
					var setter = {},forceUpdate,
						trueDefault = defaultVal||0,
						currVal= parseFloat(values[writeField],10),
						value = Number(values[readField]);
					//console.log("trueDefault:"+trueDefault+", currVal:"+currVal+", value:"+value+", isNaN:"+isNaN(currVal));

					if (typeof values[readField] === "undefined" || values[readField]==="" || values[readField]===null ){
						value=trueDefault;
						//console.log("PFSheet Warning: could not find readField "+ readField + " at evaluateAndSetNumber");
						//not warning, just not there if they never entered anything for it. so ignore and set to default
					}
					forceUpdate = isNaN(currVal) && !dontForceOnBlank;
					currVal=isNaN(currVal)?trueDefault:currVal;

					if (!isNaN(value))  {
						//console.log("it was a number");
						if ( forceUpdate ||  currVal!==value) {
							setter[writeField]=value;
							setAttrs(setter);
						}
					} else {
						//console.log("ok evaluate "+values[readField]);
						evaluateExpression(values[readField],function(value2){
							console.log("came back with "+value2+", is it NaN?:"+isNaN(value2));
							//look for ( and ) at begining and end

							value2=isNaN(value2)?trueDefault:value2;
							if (forceUpdate || currVal!==value2) {
								setter[writeField]=value2;
								setAttrs(setter);
							}
						});
					}

				});
			},

		/* setAttributeNumber
		 * use if you have to clone the fieldToUpdate name due to a loop that would be outside getAttrs
		 */
			setAttributeNumber=function(fieldToUpdate,newVal) {
				getAttrs([fieldToUpdate],function(v){
					//console.log("setAttributeNumber setting with "+newVal);
					//console.log(v);
					var setter={},
						val = parseInt(v[fieldToUpdate],10);
					if (newVal !== val || isNaN(val)) {
						setter[fieldToUpdate]=newVal;
						setAttrs(setter);
					}
				});
			},


		/* copyStaticNumberFieldToRepeating
		 * Copies a number from a field outside a repeating section to the fields inside a repeating section
		 * For instance, if you have a field @{FOO} and when it is updated you want to update all field in
		 * the repeating_bar section, and they are named repeating_bar_$X_foo_copy
		 *   then you would call with parameters ("bar","foo","foo","_copy")
		 *
		 * @repeatingSection = sectioname without "repeating_"
		 * @copyFromField = Field to copy from
		 * @fieldToUpdatePartialName = the partial name (everything after repeating_<name>_$X_   except a postpended string )
		 *       if this is null, then use the copyFromField (if you set the name to be the same with a postpended string at the end)
		 * @postPend = a postpend string at the end of the fieldname in the repeating section , such as "-copy"
		 */
			copyStaticNumberFieldToRepeating = function (repeatingSection,copyFromField,fieldToUpdatePartialName) {
				if (!fieldToUpdatePartialName ) {fieldToUpdatePartialName = copyFromField+"-copy";}
				getAttrs([copyFromField],function(attrs){
					var val = parseInt(attrs[copyFromField],10)||0;
					getSectionIDs("repeating_"+repeatingSection,function(ids){
						ids.forEach(function(id,index){
							setAttributeNumber("repeating_" + repeatingSection + "_"+id+"_" + fieldToUpdatePartialName,val);
						});
					});
				});
			},

		/* getReferencedAttributeValue
		 * by passing the value of a dropdown that has string references to abilties,
		 * this determines what ability / field it references, finds that field in
		 * the sheet, and calls the callback function passing the value in.
		 * If new dropdowns are made, ensure the fields referenced are in the
		 * findAbilityInString method.
		 *
		 * @readField {string| = the attribute name of dropdown we are looking at
		 * @synchrousFindAttributeFunc {function} takes value of @readField and says what the lookup field is.
		 * @callback {function} = a function that takes one integer parameter, which is the value the dropdown selection represents
		 */
			getReferencedAttributeValue = function (readField,synchrousFindAttributeFunc,callback) {
				if (!readField  || typeof callback !== "function" || typeof synchrousFindAttributeFunc !== "function") {
					return;
				}
				getAttrs([readField],function(values) {
					var fieldToFind =values[readField],foundField;
					if (typeof fieldToFind === "undefined" || fieldToFind === null) {
						callback("");
					} else if (fieldToFind==="0" || fieldToFind===0 || fieldToFind.indexOf("0")===0 ) {
						//select = none
						callback(0);
					} else {
						foundField = synchrousFindAttributeFunc(fieldToFind);
						getAttrs([foundField], function(v) {
							var valueOf = parseInt(v[foundField],10)||0;
							callback(valueOf);
						});
					}
				});
			},


		/* handleDropdown
		 * Looks at a dropdown, evaluates the number the selected item refers to, and then
		 * sets the writeFields with that number.
		 *
		 * @readField {string} = the dropdpown field
		 * @writeFields {string or Array} = Fields to write the value to
		 * @synchrousFindAttributeFunc {function} takes value of @readField and says what the lookup field is.
		 * @callback {function} =  (optional) if we need to update the field, call this function
		 *         with the value we set as the only parameter.
		 */
			handleDropdown = function (readField,writeFields,synchrousFindAttributeFunc,callback) {
				SWUtils.getReferencedAttributeValue(readField,synchrousFindAttributeFunc,function(valueOf){
					if (typeof writeFields === "string") {
						getAttrs([writeFields],function(v){
							var currValue=parseInt(v[writeFields],10),setter={};
							if (currValue!==valueOf || isNaN(writeFields)) {
								setter[writeFields]=valueOf;
								setAttrs(setter);
								if (typeof callback === "function" ) {
									callback(valueOf);
								}
							}
						});
					} else if (Array.isArray(writeFields)){
						getAttrs(writeFields,function(v){
							var i=0, setany=0,setter = {};
							for( i=0;i<writeFields.length;i++) {
								if (v[writeFields[i]] !== valueOf) {
									setter[writeFields[i]]=valueOf;
									setany++;
								}
							}
							if (setany) {
								setAttrs(setter);
								if (typeof callback === "function" ) {
									callback(valueOf);
								}
							}
						});
					}
				});
			};


		return {
			util: {
				validNumericStr: validNumericStr

			}
			,searchAndReplaceFields:searchAndReplaceFields
			,evaluateExpression:evaluateExpression
			,evaluateAndSetString:evaluateAndSetString
			,evaluateAndSetNumber:evaluateAndSetNumber
			,copyStaticNumberFieldToRepeating:copyStaticNumberFieldToRepeating
			,setAttributeNumber:setAttributeNumber
			,getReferencedAttributeValue:getReferencedAttributeValue
		};
	}());
