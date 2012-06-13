// Caterwaul UI macros | Spencer Tipping
// Licensed under the terms of the MIT source code license

// DOM libraries.
// Right now I've only got a set of combinators for jQuery.

 caterwaul . module ('ui.jquery' ,(function ( qs , qs1 , qs2 , qs3 , qs4 , qs5 , qs6 , qs7 , qs8 , qs9 , qsa , qsb , qsc , qsd , qse , qsf , qsg , qsh , qsi , qsj , qsk , qsl , qsm , qsn , qso , qsp , qsq , qsr , qss , qst , qsu , qsv , qsw , qsx , qsy , qsz , qs10 , qs11 , qs12 , qs13 , qs14 , qs15 , qs16 , qs17 , qs18 , qs19 , qs1a , qs1b , qs1c , qs1d , qs1e , qs1f , qs1g , qs1h , qs1i , qs1j , qs1k , qs1l , qs1m , qs1n) {var result=( function ($) { 
  $.jquery =  function (  caterwaul_function) {   ; return  ( function ( it) { return it.modifiers.jquery = $.grammar ('J', {initial: qs}, ( function ( rule, anon) { return  ( function ( ) { var jq            = qs1, 
          hyphenate =  function (  s) {   ; return  s.replace (/_/g, '-')},

          p             = ( function ( ) { var p_pattern = anon ( qs2) ; return  ( function ( node) { return  p_pattern.replace ({_thing: node})})}) . call ( this),

          jquery_macros = ( function ( ) { var dom_node_template      = anon ( ( '' + (jq) + '(TS[_element])')),       jquery_template       = anon ( ( '' + (jq) + '("<span>" + (_element) + "</span>")')), 
                                   become_dom_node =  function (  match) {   ; return  dom_node_template.replace (match)},   wrap_in_jquery =  function (  match) {   ; return  jquery_template.replace (match)} ; return  [rule ( qs3, ( function ( match) { return match._element.is_constant ( ) || match._element.length ? wrap_in_jquery (match): become_dom_node (match)})),

                           rule ( qs4, qs5),

                           rule ( qs6, qs7),
                           rule ( qs8, qs9),
                           rule ( qsa, qsb),
                           rule ( qsc, qsd),
                           rule ( qse, qsf),

                           rule ( qsg, qsh),
                           rule ( qsi, qsj),
                           rule ( qsk, qsl),
                           rule ( qsm, qsn),
                           rule ( qso, qsp),

                           rule ( qsq, qsr),
                           rule ( qss, qst),

                           rule ( qsu, qsv),

                           rule ( qsw, qsx),
                           rule ( qsy, qsz),
                           rule ( qs10, qs11),

                           rule ( qs12, qs13),
                           rule ( qs14, qs15),

                           rule ( qs16, qs17)]}) . call ( this),

          string_macros = ( function ( ) { var  string =  function (  s) {   ; return  new $.syntax ('"' + s.replace (/\\/g, '\\\\').replace (/"/g, '\\"') + '"')} ; return  [rule ( qs18, ( function ( match) { return  string ( ( '<' + (hyphenate (match._identifier.data)) + '>'))})),
                           rule ( qs19, ( function ( match) { return   string (    hyphenate (match._identifier.data))})),
                           rule ( qs1a, ( function ( match) { return  string (     expand (p (match._identifier)).data)}))]}) . call ( this),

          search_macros = ( function ( ) { var  interpolated =  function (  node) {   ; return  ( '(' + (node.toString ( )) + ').replace(/(\\)/g, "$1$1").replace(/(")/g, "\\$1")')}, 
                           binary (op) =  function (  match) {   ; return  new $.syntax ( ( '' + (expand (p (match._element1)).data) + '' + (op) + '' + (expand (p (match._element2)).data) + ''))} ; return  [rule ( qs1b, ( function ( match) { return                     new $.syntax (hyphenate ( ( function ( it) { return it === '_' ? '*': it}) . call ( this , ( match._element.data))))})),
                           rule ( qs1c, ( function ( match) { return              new $.syntax ( ( '' + (this (p (match._element)).data) + '.' + (hyphenate (match._class.data)) + ''))})),

                           rule ( qs1d, ( function ( match) { return        new $.syntax ( ( '' + (this (p (match._element)).data) + '[' + (this (p (match._attributes))) + ']'))})),
                           rule ( qs1e, ( function ( match) { return          new $.syntax ( ( '' + (this (p (match._attribute)).data) + '="' + '') + interpolated (match._value) + '}"')})),

                           rule ( qs1f,                 'P[_element]'),        // No paren support

                           rule ( qs1g,     binary (', ')),
                           rule ( qs1h,     binary (', ')),
                           rule ( qs1i,     binary (' ')),
                           rule ( qs1j,     binary (' ')),
                           rule ( qs1k,     binary (' > ')),
                           rule ( qs1l,        binary (' > ')),

                           rule ( qs1m, ( function ( match) { return          new $.syntax ( ( '' + (expand (p (match._element)).data) + ':' + (hyphenate (match._selector.data)) + ''))})),
                           rule ( qs1n, ( function ( match) { return  new $.syntax ( ( '' + (expand (p (match._element)).data) + ':' + (hyphenate (match._selector.data)) + '("#') +
                                                                                  '{' + interpolated (match._value) + '}")')}))]}) . call ( this) ; return  ( jquery_macros) .concat (  string_macros)}) . call ( this)})) , it}) . call ( this , (  caterwaul_function))}});result.caterwaul_expression_ref_table =  { qs : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_expression\")).prefix ( \" \")") , qs1 : ( "new caterwaul.syntax ( \"jQuery\")") , qs2 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"_thing\")).prefix ( \" \")") , qs3 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \")") , qs4 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_class\"))).prefix ( \" \")") , qs5 : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"addClass\")) ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"S\") ,new caterwaul.syntax ( \"_class\")).prefix ( \" \")).prefix ( \" \")") , qs6 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"*\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \"_attr\") ,new caterwaul.syntax ( \"_val\")).prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qs7 : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"attr\")) ,new caterwaul.syntax ( \",\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"S\") ,new caterwaul.syntax ( \"_attr\")).prefix ( \" \") ,new caterwaul.syntax ( \"_val\").prefix ( \" \"))).prefix ( \" \")") , qs8 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"*\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"u!\",  new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \"_name\") ,new caterwaul.syntax ( \"_val\")).prefix ( \" \"))).prefix ( \" \")).prefix ( \" \")") , qs9 : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"data\")) ,new caterwaul.syntax ( \",\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"S\") ,new caterwaul.syntax ( \"_name\")).prefix ( \" \") ,new caterwaul.syntax ( \"_val\").prefix ( \" \"))).prefix ( \" \")") , qsa : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"/\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \"_method\") ,new caterwaul.syntax ( \"_args\")).prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qsb : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"_method\")) ,new caterwaul.syntax ( \"_args\")).prefix ( \" \")") , qsc : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"/\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"u!\",  new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \"_event\") ,new caterwaul.syntax ( \"_args\")).prefix ( \" \"))).prefix ( \" \")).prefix ( \" \")") , qsd : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"bind\")) ,new caterwaul.syntax ( \",\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"S\") ,new caterwaul.syntax ( \"_event\")).prefix ( \" \") ,new caterwaul.syntax ( \"_args\").prefix ( \" \"))).prefix ( \" \")") , qse : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"%\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_function\")).prefix ( \" \")).prefix ( \" \")") , qsf : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \"_function\") ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \")).prefix ( \" \")") , qsg : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_children\")).prefix ( \" \")).prefix ( \" \")") , qsh : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"append\")) ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_children\")).prefix ( \" \")).prefix ( \" \")") , qsi : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_children\")).prefix ( \" \")).prefix ( \" \")") , qsj : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"append\")) ,new caterwaul.syntax ( \"_children\")).prefix ( \" \")") , qsk : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"<\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_tree\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qsl : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"append\")) ,new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"(\",  new caterwaul.syntax ( \"_tree\")) ,new caterwaul.syntax ( \"toString\")) ,new caterwaul.syntax ( \"\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qsm : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \">\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_child\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qsn : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"append\")) ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_child\")).prefix ( \" \")).prefix ( \" \")") , qso : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \">=\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_child\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qsp : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"append\")) ,new caterwaul.syntax ( \"_child\")).prefix ( \" \")") , qsq : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \",\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\").prefix ( \" \"))).prefix ( \" \")") , qsr : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element1\")).prefix ( \" \") ,new caterwaul.syntax ( \"add\")) ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element2\")).prefix ( \" \")).prefix ( \" \")") , qss : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"+\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qst : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element1\")).prefix ( \" \") ,new caterwaul.syntax ( \"add\")) ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element2\")).prefix ( \" \")).prefix ( \" \")") , qsu : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"-\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qsv : ( "new caterwaul.syntax ( \"-\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element1\")).prefix ( \" \") ,new caterwaul.syntax ( \"_element2\").prefix ( \" \")).prefix ( \" \")") , qsw : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \">>\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_pattern\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qsx : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"filter\")) ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"PS\") ,new caterwaul.syntax ( \"_pattern\")).prefix ( \" \")).prefix ( \" \")") , qsy : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \">>>\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_pattern\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qsz : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"find\")) ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"PS\") ,new caterwaul.syntax ( \"_pattern\")).prefix ( \" \")).prefix ( \" \")") , qs10 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"<<\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_pattern\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qs11 : ( "new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \") ,new caterwaul.syntax ( \"parents\")) ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"PS\") ,new caterwaul.syntax ( \"_pattern\")).prefix ( \" \")).prefix ( \" \")") , qs12 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"(\",  new caterwaul.syntax ( \"_element\"))).prefix ( \" \")") , qs13 : ( "new caterwaul.syntax ( \"(\",  new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \"))") , qs14 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"[\",  new caterwaul.syntax ( \"_element\"))).prefix ( \" \")") , qs15 : ( "new caterwaul.syntax ( \"[\",  new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \"))") , qs16 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"J\") ,new caterwaul.syntax ( \"u+\",  new caterwaul.syntax ( \"_expression\"))).prefix ( \" \")") , qs17 : ( "new caterwaul.syntax ( \"_expression\")") , qs18 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"TS\") ,new caterwaul.syntax ( \"_identifier\")).prefix ( \" \")") , qs19 : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"S\") ,new caterwaul.syntax ( \"_identifier\")).prefix ( \" \")") , qs1a : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"PS\") ,new caterwaul.syntax ( \"_identifier\")).prefix ( \" \")") , qs1b : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"_element\")).prefix ( \" \")") , qs1c : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \".\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_class\"))).prefix ( \" \")") , qs1d : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_attributes\")).prefix ( \" \")).prefix ( \" \")") , qs1e : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"=\", new caterwaul.syntax ( \"_attribute\") ,new caterwaul.syntax ( \"_value\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qs1f : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"(\",  new caterwaul.syntax ( \"_element\"))).prefix ( \" \")") , qs1g : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"+\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\").prefix ( \"   \")).prefix ( \" \")).prefix ( \" \")") , qs1h : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \",\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\").prefix ( \"    \"))).prefix ( \" \")") , qs1i : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \">>\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\").prefix ( \"  \")).prefix ( \" \")).prefix ( \" \")") , qs1j : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \">>>\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\").prefix ( \" \")).prefix ( \" \")).prefix ( \" \")") , qs1k : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \">\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\").prefix ( \"   \")).prefix ( \" \")).prefix ( \" \")") , qs1l : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \"_element1\") ,new caterwaul.syntax ( \"_element2\")).prefix ( \" \")).prefix ( \" \")") , qs1m : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"/\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"_selector\")).prefix ( \" \")).prefix ( \" \")") , qs1n : ( "new caterwaul.syntax ( \"[]\", new caterwaul.syntax ( \"P\") ,new caterwaul.syntax ( \"/\", new caterwaul.syntax ( \"_element\") ,new caterwaul.syntax ( \"()\", new caterwaul.syntax ( \"_selector\") ,new caterwaul.syntax ( \"_value\")).prefix ( \" \")).prefix ( \" \")).prefix ( \" \")")};return(result)}).call (this, new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_expression")).prefix ( " ") ,new caterwaul.syntax ( "jQuery") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "_thing")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( ".", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_class"))).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "addClass")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "S") ,new caterwaul.syntax ( "_class")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "*", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( "_attr") ,new caterwaul.syntax ( "_val")).prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "attr")) ,new caterwaul.syntax ( ",", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "S") ,new caterwaul.syntax ( "_attr")).prefix ( " ") ,new caterwaul.syntax ( "_val").prefix ( " "))).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "*", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "u!",  new caterwaul.syntax ( "()", new caterwaul.syntax ( "_name") ,new caterwaul.syntax ( "_val")).prefix ( " "))).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "data")) ,new caterwaul.syntax ( ",", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "S") ,new caterwaul.syntax ( "_name")).prefix ( " ") ,new caterwaul.syntax ( "_val").prefix ( " "))).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "/", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( "_method") ,new caterwaul.syntax ( "_args")).prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "_method")) ,new caterwaul.syntax ( "_args")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "/", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "u!",  new caterwaul.syntax ( "()", new caterwaul.syntax ( "_event") ,new caterwaul.syntax ( "_args")).prefix ( " "))).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "bind")) ,new caterwaul.syntax ( ",", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "S") ,new caterwaul.syntax ( "_event")).prefix ( " ") ,new caterwaul.syntax ( "_args").prefix ( " "))).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "%", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_function")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( "_function") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_children")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "append")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_children")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_children")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "append")) ,new caterwaul.syntax ( "_children")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "<", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_tree").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "append")) ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "(",  new caterwaul.syntax ( "_tree")) ,new caterwaul.syntax ( "toString")) ,new caterwaul.syntax ( "").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( ">", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_child").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "append")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_child")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( ">=", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_child").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "append")) ,new caterwaul.syntax ( "_child")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( ",", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2").prefix ( " "))).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element1")).prefix ( " ") ,new caterwaul.syntax ( "add")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element2")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "+", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element1")).prefix ( " ") ,new caterwaul.syntax ( "add")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element2")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "-", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "-", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element1")).prefix ( " ") ,new caterwaul.syntax ( "_element2").prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( ">>", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_pattern").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "filter")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "PS") ,new caterwaul.syntax ( "_pattern")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( ">>>", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_pattern").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "find")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "PS") ,new caterwaul.syntax ( "_pattern")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "<<", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_pattern").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( ".", new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "parents")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "PS") ,new caterwaul.syntax ( "_pattern")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "(",  new caterwaul.syntax ( "_element"))).prefix ( " ") ,new caterwaul.syntax ( "(",  new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "[",  new caterwaul.syntax ( "_element"))).prefix ( " ") ,new caterwaul.syntax ( "[",  new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "_element")).prefix ( " ")) ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "J") ,new caterwaul.syntax ( "u+",  new caterwaul.syntax ( "_expression"))).prefix ( " ") ,new caterwaul.syntax ( "_expression") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "TS") ,new caterwaul.syntax ( "_identifier")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "S") ,new caterwaul.syntax ( "_identifier")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "PS") ,new caterwaul.syntax ( "_identifier")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "_element")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( ".", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_class"))).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_attributes")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "=", new caterwaul.syntax ( "_attribute") ,new caterwaul.syntax ( "_value").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "(",  new caterwaul.syntax ( "_element"))).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "+", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2").prefix ( "   ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( ",", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2").prefix ( "    "))).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( ">>", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2").prefix ( "  ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( ">>>", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2").prefix ( " ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( ">", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2").prefix ( "   ")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( "_element1") ,new caterwaul.syntax ( "_element2")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "/", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "_selector")).prefix ( " ")).prefix ( " ") ,new caterwaul.syntax ( "[]", new caterwaul.syntax ( "P") ,new caterwaul.syntax ( "/", new caterwaul.syntax ( "_element") ,new caterwaul.syntax ( "()", new caterwaul.syntax ( "_selector") ,new caterwaul.syntax ( "_value")).prefix ( " ")).prefix ( " ")).prefix ( " "))) ; 

  caterwaul.module('ui', function ($) {$.all.push('jquery')});

// Generated by SDoc
