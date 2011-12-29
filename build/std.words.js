caterwaul.module( 'std.words' ,function($) {var scope_template=$.parse( '(function () {var _variables; return (_expression)}).call(this)' ) ,trivial_node_template=$.parse( 'new caterwaul.syntax(_data)' ) ,nontrivial_node_template=$.parse( 'new caterwaul.syntax(_data, _xs)' ) ;
$.words=function(caterwaul_function) {$.merge(caterwaul_function.modifiers,$.words.modifiers) ;
$.merge(caterwaul_function.parameterized_modifiers,$.words.parameterized_modifiers) ;
return caterwaul_function} ;
$.syntax_to_expression=function(tree) {if(tree.length) {for(var comma=new $.syntax( ',' ) ,i=0,l=tree.length;
i<l;
 ++i)comma.push($.syntax_to_expression(tree[i] ) ) ;
return nontrivial_node_template.replace( {_data: '"' +tree.data.replace( /"/g , '\\"' ) .replace( /\n/g , '\\n' ) + '"' ,_xs:comma.unflatten() } ) }else return trivial_node_template.replace( {_data: '"' +tree.data.replace( /"/g , '\\"' ) .replace( /\n/g , '\\n' ) + '"' } ) } ;
$.words.modifiers= {qs:function(match) {return new $.expression_ref($.syntax_to_expression(match._expression) , 'qs' ) } ,qse:function(match) {return new $.expression_ref($.syntax_to_expression(this(match._expression) ) , 'qse' ) } ,reexpand:function(match) {return this(this(match._expression) ) } ,noexpand:function(match) {return match._expression} ,raise:$.reexpander( '(function () {throw _expression}).call(this)' ) ,eval:function(match) {return new $.ref($.compile(this(match._expression) ) , 'eval' ) } ,delay:$.reexpander( '(function (t, f) {return (function () {return f.call(t)})})(this, (function () {return _expression}))' ) ,lazy:$.reexpander( '(function (t, f, v, vc) {return (function () {return vc ? v : (vc = true, v = f.call(t))})})(this, (function () {return _expression}))' ) ,capture:function(match) {for(var comma=new $.syntax( ',' ) ,bindings=match._expression.flatten( ',' ) ,i=0,l=bindings.length;
i<l;
 ++i)comma.push(this(bindings[i] ) .with_data( ':' ) ) ;
return new $.syntax( '{' ,comma.unflatten() ) } ,wcapture:function(match) {for(var e=this(match._expression) ,comma=new $.syntax( ',' ) ,bindings=e.flatten( ',' ) ,node,i=0,l=bindings.length;
i<l;
 ++i) (node=this(bindings[i] ) ) [1] =node[0] ,comma.push(node.with_data( ':' ) ) ;
return scope_template.replace( {_variables:e,_expression:new $.syntax( '{' ,comma.unflatten() ) } ) } } ;
$.words.parameterized_modifiers= {given:$.reexpander( '(function (_parameters) {return _expression})' ) ,bgiven:$.reexpander( '(function (t, f) {return (function () {return f.apply(t, arguments)})})(this, (function (_parameters) {return _expression}))' ) ,rescue:$.reexpander( '(function () {try {return (_expression)} catch (e) {return (_parameters)}}).call(this)' ) ,se:$.reexpander( '(function (it) {return (_parameters), it}).call(this, (_expression))' ) ,re:$.reexpander( '(function (it) {return (_parameters)}).call(this, (_expression))' ) ,where:$.reexpander( '(function () {var _parameters; return (_expression)}).call(this)' ) ,using:$.reexpander(function(match) {var m=this(match._parameters) ,o=$.compile(m) ,comma=new $.syntax( ',' ) ,expression_ref=new $.expression_ref(m) ;
for(var k in o)Object.prototype.hasOwnProperty.call(o,k) && /^[_$a-zA-Z][_$0-9a-zA-Z]*$/ .test(k) && !this.modifiers.hasOwnProperty(k) && !this.parameterized_modifiers.hasOwnProperty(k) &&comma.push(new $.syntax( '=' ,k,new $.syntax( '.' ,expression_ref,k) ) ) ;
return scope_template.replace( {_variables:comma.unflatten() ,_expression:match._expression} ) } ) ,when:$.reexpander( '((_parameters) && (_expression))' ) ,and:$.reexpander( '((_expression) && (_parameters))' ) ,unless:$.reexpander( '(! (_parameters) && (_expression))' ) ,or:$.reexpander( '((_expression) || (_parameters))' ) } } ) ;
