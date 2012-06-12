caterwaul.module( 'std.js' , (function(qs,qs1,qs2,qs3,qs4,qs5,qs6,qs7,qs8,qs9,qsa,qsb,qsc,qsd,qse,qsf,qsg,qsh,qsi,qsj,qsk,qsl,qsm,qsn) {var result1= (function($) {$.js=function(macroexpander) {var string_interpolator=function(node) {var s=node.data,q=s.charAt(0) ,syntax=$.syntax;
if(q!== '\'' &&q!== '"' || ! /#\{[^\}]+\}/ .test(s) )return false;
for(var pieces= [] ,is_code= [] ,i=1,l=s.length-1,brace_depth=0,got_hash=false,start=1,c;
i<l;
 ++i)if(brace_depth)if( (c=s.charAt(i) ) === '}' ) --brace_depth|| (pieces.push(s.substring(start,i) ) ,is_code.push(true) ) && (start=i+1) ,got_hash=false;
else brace_depth+=c=== '{' ;
else if( (c=s.charAt(i) ) === '#' )got_hash=true;
else if(c=== '{' &&got_hash)pieces.push(s.substring(start,i-1) ) ,is_code.push(false) ,start=i+1, ++brace_depth;
else got_hash=false;
pieces.push(s.substring(start,l) ) ,is_code.push(false) ;
for(var quoted=new RegExp( '\\\\' +q, 'g' ) ,i=0,l=pieces.length;
i<l;
 ++i)pieces[i] =is_code[i] ?this($.parse(pieces[i] .replace(quoted,q) ) .as( '(' ) ) 
:new syntax(q+pieces[i] +q) ;
return new syntax( '+' ,pieces) .unflatten() .as( '(' ) } ;
var function_local_template=qs,function_bind_pattern=qs1,function_result_pattern=qs2,function_with_afters=qs3,function_without_afters=qs4,function_assignment_template=qs5,function_is_result=function(n) {return n.is_empty() &&n.data=== 'result' } ,function_destructure=$.rereplacer(qs6,function(match) {for(var formals= [] ,befores= [] ,afters= [] ,ps=match._xs.flatten( ',' ) ,i=0,l=ps.length;
i<l;
 ++i) (afters.length||ps[i] .contains(function_is_result) ?afters
:befores.length||ps[i] .length?befores
:formals) .push(ps[i] ) ;
for(var contains_locals= [befores,afters] ,i=0,l=contains_locals.length;
i<l;
 ++i)for(var xs=contains_locals[i] ,j=0,lj=xs.length,m;
j<lj;
 ++j)xs[j] = (m=function_bind_pattern.match(xs[j] ) ) &&m._x.is_empty() ?function_local_template.replace(m) 
:xs[j] .as( '(' ) ;
var new_formals=formals.length?new $.syntax( ',' ,formals) .unflatten() 
:$.empty,new_befores=befores.length?new $.syntax( ';' ,befores) .unflatten() 
:$.empty,new_afters=afters.length?new $.syntax( ';' ,afters) .unflatten() 
:$.empty,template=function_assignment_template.replace( {_f:match._f,_x:afters.length?function_with_afters
:function_without_afters} ) ;
return template.replace( {_formals:new_formals,_befores:new_befores,_afters:new_afters,_result:match._y} ) } ) ;
var tuple_template=qs7,tuple_constructor=qs8,tuple_assignment=qs9,tuple_destructure=$.rereplacer(qsa,function(match) {for(var formals=match._xs.flatten( ',' ) ,assignments=new $.syntax( ';' ) ,i=0,l=formals.length;
i<l;
 ++i)assignments.push(tuple_assignment.replace( {_name:formals[i] } ) ) ;
return tuple_template.replace( {_f:match._f,_g:$.gensym( 'tuple_ctor' ) ,_ctor:tuple_constructor.replace( {_formals:formals,_assignments:assignments.unflatten() } ) ,_prototype:match._y} ) } ) ;
var infix_function=function(node) {var d=node.data,left,fn;
if( (d=== '/' ||d=== '|' ) && (left=node[0] ) .data===d&&left[1] &&left[1] .data=== 'u-' && (fn=left[1] [0] ) )return new $.syntax( '()' ,fn,this(left[0] ) .flatten(d) .push(this(node[1] ) ) .with_data( ',' ) .unflatten() ) } ;
var infix_method=function(node) {var d=node.data,left,fn;
if( (d=== '/' ||d=== '|' ) && (left=node[0] ) .data===d&&left[1] &&left[1] .data=== 'u~' && (fn=left[1] [0] ) ) {var xs= [] .slice.call(this(node[0] [0] ) .flatten(d) ) ,object=xs.shift() ;
return new $.syntax( '()' ,new $.syntax( '.' ,new $.syntax( '(' ,object) ,fn) ,new $.syntax( ',' ,xs,this(node[1] ) ) .unflatten() ) } } ;
var postfix_function_template=qsb,postfix_function=$.rereplacer(qsc,function(match) {return postfix_function_template.replace( {_f:match._f,_x:this(match._x) .flatten( '/' ) .with_data( ',' ) .unflatten() } ) } ) ;
var modified_literal_form=$.pattern(qsd) ,lookup_literal_modifier=function(caterwaul,type,modifier) {var hash=caterwaul.literal_modifiers[type] ;
return hash.hasOwnProperty(modifier) &&hash[modifier] } ,literal_modifier=function(node) {var modified_literal=modified_literal_form.call(this,node) ,literal,expander;
if(modified_literal&& (literal=modified_literal._literal) && (expander=literal.is_identifier() ?lookup_literal_modifier(this, 'identifier' ,modified_literal._modifier.data) 
:literal.is_array() ?lookup_literal_modifier(this, 'array' ,modified_literal._modifier.data) 
:literal.is_regexp() ?lookup_literal_modifier(this, 'regexp' ,modified_literal._modifier.data) 
:literal.is_number() ?lookup_literal_modifier(this, 'number' ,modified_literal._modifier.data) 
:literal.is_string() ?lookup_literal_modifier(this, 'string' ,modified_literal._modifier.data) 
:null) )return expander.call(this,literal) } ;
var bracket_modifier_form=$.pattern(qse) ,slash_modifier_form=$.pattern(qsf) ,minus_modifier_form=$.pattern(qsg) ,in_modifier_form=$.pattern(qsh) ,pipe_modifier_form=$.pattern(qsi) ,comma_modifier_form=$.pattern(qsj) ,dot_parameters=$.pattern(qsk) ,bracket_parameters=$.pattern(qsl) ,parameterized_wickets=$.pattern(qsm) ,parameterized_minus=$.pattern(qsn) ,modifier=function(node) {var modifier,parameterized_match=parameterized_wickets.call(this,node) ||parameterized_minus.call(this,node) ;
if(parameterized_match&&this.parameterized_modifiers.hasOwnProperty(modifier=parameterized_match._modifier.data) ) {var r=this.parameterized_modifiers[modifier] .call(this,parameterized_match) ;
if(r)return r}var regular_match=bracket_modifier_form.call(this,node) ||slash_modifier_form.call(this,node) ||minus_modifier_form.call(this,node) ||in_modifier_form.call(this,node) ||pipe_modifier_form.call(this,node) ||comma_modifier_form.call(this,node) ;
if(regular_match) {var parameter_match=dot_parameters.call(this,regular_match._modifier) ||bracket_parameters.call(this,regular_match._modifier) ;
if(parameter_match) {regular_match._modifier=parameter_match._modifier;
regular_match._parameters=parameter_match._parameters;
return this.parameterized_modifiers.hasOwnProperty(modifier=regular_match._modifier.data) &&this.parameterized_modifiers[modifier] .call(this,regular_match) }else return this.modifiers.hasOwnProperty(modifier=regular_match._modifier.data) &&this.modifiers[modifier] .call(this,regular_match) } } ;
var each_node=function(node) {var p= (function(xs1) {var x,x0,xi,xl,xr;
for(var x=xs1[0] ,xi=0,xl=xs1.length,x1;
xi<xl;
 ++xi) {x=xs1[xi] ;
if(x1= ( /^#/ .test(x) ) )return x1}return false} ) .call(this,node.prefixes() ) ,i= (function(xs1) {var x,x0,xi,xl,xr;
for(var x=xs1[0] ,xi=0,xl=xs1.length,x1;
xi<xl;
 ++xi) {x=xs1[xi] ;
if(x1= ( /^#/ .test(x) ) )return x1}return false} ) .call(this,node.infixes() ) ,s= (function(xs1) {var x,x0,xi,xl,xr;
for(var x=xs1[0] ,xi=0,xl=xs1.length,x1;
xi<xl;
 ++xi) {x=xs1[xi] ;
if(x1= ( /^#/ .test(x) ) )return x1}return false} ) .call(this,node.suffixes() ) ;
 (p||i||s) && (node=node.thin_clone() ) ;
p&& (node.prefix_data= (function(xs1) {var x,x0,xi,xl,xr;
for(var xr=new xs1.constructor() ,xi=0,xl=xs1.length;
xi<xl;
 ++xi)x=xs1[xi] , ( /^#/ .test(x) ) ||xr.push(x) ;
return xr} ) .call(this,node.prefix_data) ) ;
i&& (node.infix_data= (function(xs1) {var x,x0,xi,xl,xr;
for(var xr=new xs1.constructor() ,xi=0,xl=xs1.length;
xi<xl;
 ++xi)x=xs1[xi] , ( /^#/ .test(x) ) ||xr.push(x) ;
return xr} ) .call(this,node.infix_data) ) ;
s&& (node.suffix_data= (function(xs1) {var x,x0,xi,xl,xr;
for(var xr=new xs1.constructor() ,xi=0,xl=xs1.length;
xi<xl;
 ++xi)x=xs1[xi] , ( /^#/ .test(x) ) ||xr.push(x) ;
return xr} ) .call(this,node.suffix_data) ) ;
return string_interpolator.call(this,node) ||literal_modifier.call(this,node) ||node.length&& (modifier.call(this,node) ||function_destructure.call(this,node) ||tuple_destructure.call(this,node) ||infix_function.call(this,node) ||infix_method.call(this,node) ||postfix_function.call(this,node) ) } ,result=macroexpander?$(function(node) {return macroexpander.call(this,node) ||each_node.call(this,node) } ) 
:$(each_node) ;
result.modifiers= {} ;
result.parameterized_modifiers= {} ;
result.literal_modifiers= {regexp: {} ,array: {} ,string: {} ,number: {} ,identifier: {} } ;
return result} } ) ;
result1.caterwaul_expression_ref_table= {qs: ( "new caterwaul.syntax( \"var\" ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"_y\" ) ) )" ) ,qs1: ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"_y\" ) )" ) ,qs2: ( "new caterwaul.syntax( \"result\" )" ) ,qs3: ( "new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formals\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"_befores\" ) ,new caterwaul.syntax( \"var\" ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"result\" ) ,new caterwaul.syntax( \"_result\" ) ) ) ) ,new caterwaul.syntax( \"_afters\" ) ) ,new caterwaul.syntax( \"return\" ,new caterwaul.syntax( \"result\" ) ) ) ) )" ) ,qs4: ( "new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formals\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"_befores\" ) ,new caterwaul.syntax( \"return\" ,new caterwaul.syntax( \"_result\" ) ) ) ) )" ) ,qs5: ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_x\" ) )" ) ,qs6: ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_xs\" ) ) ,new caterwaul.syntax( \"_y\" ) )" ) ,qs7: ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"var\" ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_g\" ) ,new caterwaul.syntax( \"_ctor\" ) ) ) ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_g\" ) ,new caterwaul.syntax( \"prototype\" ) ) ,new caterwaul.syntax( \"_prototype\" ) ) ) ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_g\" ) ,new caterwaul.syntax( \"prototype\" ) ) ,new caterwaul.syntax( \"constructor\" ) ) ,new caterwaul.syntax( \"_g\" ) ) ) ,new caterwaul.syntax( \"return\" ,new caterwaul.syntax( \"_g\" ) ) ) ) ) ) ,new caterwaul.syntax( \"call\" ) ) ,new caterwaul.syntax( \"this\" ) ) )" ) ,qs8: ( "new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formals\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \"_assignments\" ) ) )" ) ,qs9: ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"this\" ) ,new caterwaul.syntax( \"_name\" ) ) ,new caterwaul.syntax( \"_name\" ) )" ) ,qsa: ( "new caterwaul.syntax( \"*=\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_xs\" ) ) ,new caterwaul.syntax( \"_y\" ) )" ) ,qsb: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_x\" ) )" ) ,qsc: ( "new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"u!\" ,new caterwaul.syntax( \"_f\" ) ) )" ) ,qsd: ( "new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_literal\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) ,qse: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_expression\" ) )" ) ,qsf: ( "new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) ,qsg: ( "new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) ,qsh: ( "new caterwaul.syntax( \"in\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_expression\" ) )" ) ,qsi: ( "new caterwaul.syntax( \"|\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) ,qsj: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) ,qsk: ( "new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_parameters\" ) )" ) ,qsl: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_parameters\" ) )" ) ,qsm: ( "new caterwaul.syntax( \">\" ,new caterwaul.syntax( \"<\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) ) ,new caterwaul.syntax( \"_parameters\" ) )" ) ,qsn: ( "new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) ) ,new caterwaul.syntax( \"_parameters\" ) )" ) } ;
return(result1) } ) .call(this,new caterwaul.syntax( "var" ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "_y" ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "_y" ) ) ,new caterwaul.syntax( "result" ) ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formals" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "_befores" ) ,new caterwaul.syntax( "var" ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "result" ) ,new caterwaul.syntax( "_result" ) ) ) ) ,new caterwaul.syntax( "_afters" ) ) ,new caterwaul.syntax( "return" ,new caterwaul.syntax( "result" ) ) ) ) ) ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formals" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "_befores" ) ,new caterwaul.syntax( "return" ,new caterwaul.syntax( "_result" ) ) ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_x" ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_xs" ) ) ,new caterwaul.syntax( "_y" ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "var" ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_g" ) ,new caterwaul.syntax( "_ctor" ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_g" ) ,new caterwaul.syntax( "prototype" ) ) ,new caterwaul.syntax( "_prototype" ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_g" ) ,new caterwaul.syntax( "prototype" ) ) ,new caterwaul.syntax( "constructor" ) ) ,new caterwaul.syntax( "_g" ) ) ) ,new caterwaul.syntax( "return" ,new caterwaul.syntax( "_g" ) ) ) ) ) ) ,new caterwaul.syntax( "call" ) ) ,new caterwaul.syntax( "this" ) ) ) ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formals" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( "_assignments" ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "this" ) ,new caterwaul.syntax( "_name" ) ) ,new caterwaul.syntax( "_name" ) ) ,new caterwaul.syntax( "*=" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_xs" ) ) ,new caterwaul.syntax( "_y" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_x" ) ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "u!" ,new caterwaul.syntax( "_f" ) ) ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_literal" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_expression" ) ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "in" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_expression" ) ) ,new caterwaul.syntax( "|" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( ">" ,new caterwaul.syntax( "<" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "_parameters" ) ) ) ) ;
