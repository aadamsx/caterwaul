// Caterwaul JS Recon module | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Code reconnaissance.
// This is probably one of the coolest things about Caterwaul, especially on IE. It has the ability to annotate your source code and capture any value returned by any expression, including
// figuring out when any expression produces an error. This approach works at the large-scale; by capturing every value over a span of time, you can then go back through the history
// programmatically and pick out the ones of interest.

// Recon works by post-processing your macroexpanded code. It traverses the expression tree inserting calls to a new hook function. This hook function records the calls that it receives,
// allowing you to browse the execution history. A more aggressive mode puts each expression in a try{} block so that errors can be pinpointed exactly. This mode isn't enabled by default,
// however, because it is much slower than just emitting trace calls.

// So, for example, basic transformation works like this (where f1 ... f4 are monitor functions):

// | var foo = function (x) {return x + 1};    =>   var foo = f1(function (x) {return f4(f2(x) + f3(1))});

// Under more aggressive transformation the code would become this:

// | var foo = function (x) {return x + 1};    =>   var foo = (function () {try {return f1(function (x) {
//                                                               return f4((function () {try {return ((function () {try {return f2(x)} catch (e) {e1(e); throw e}})() +
//                                                                                                    (function () {try {return f3(1)} catch (e) {e2(e); throw e}})())}
//                                                                                       catch (e) {e3(e); throw e}})());
//                                                               })}
//                                                               catch (e) {e4(e); throw e}})();

// It should be clear from this example that using aggressive error tracing is a much bigger deal than just using value tracing. Depending on your JS interpreter it could mean that your program
// becomes as much as 100x slower (and unfortunately it could also create stack overflows where there weren't any, since twice as many stack frames will be allocated). Also, you can triangulate
// the error position without wrapping everything in a try{} block. The way to do this is to look at the list of expressions that are still waiting to be evaluated. These, if followed
// backwards, lead directly to the error -- at least, provided that the error stops your program.

//   Event log API.
//   It's fairly straightforward to find out what happened in your program (presumably you have access to a shell of some sort at this point). All you have to do is refer to your caterwaul
//   function's recon.log, like this:

//   | caterwaul.recon.log.length

//   You can also subscript the log as you would an array, e.g. recon.log[10], as well as querying it in various ways. Probably you'll want to query it:

//   | caterwaul.recon.log.grep('_ + _')                 // Returns a sub-log of binary additions (the sub-log has the same interface as the main one, but fewer events)
//     caterwaul.recon.log.grep('foo(5, _)', 10)         // Invocations of 'foo' on 5 and something else, returning ten events around each match for context
//     caterwaul.recon.log.grep('let[x = _] in _')       // Grep patterns are macroexpanded for you, so this will match anything generated by let[x = _] in _ (underscores are preserved as wild)

//   | ...log.grep(fn[e][e.value === undefined])         // Greps events instead of patterns, creating a sub-log of events that were mapped to truthy values
//     ...log.grep(fn[e][e.value > 4], 100)              // Returns 100 context events around each match

//   | ...log.between('++_', '_ < l')                    // Sub-log of each run of expressions starting with ++_ and ending with _ < l (the bounds are included)
//     ...log.after('new _(foo)')                        // Sub-log of events that occurred strictly after the first match -- does not include the matching event
//     ...log.after('new _(foo)', 10)                    // Sub-log of events that occurred strictly after the tenth match
//     ...log.before('new _(bar)')                       // Sub-log of events that occurred strictly before the last match -- does not include the matching event
//     ...log.before('new _(bar)', 10)                   // Sub-log of events that occurred strictly before the tenth match from the last

//   | ...log.unpaired()                                 // Find events whose pair is unset -- this almost always indicates that an error occurred (or you used an escaping continuation, if your
//                                                       // JS interpreter supports those)

//   | ...log.first()                                    // A sub-log of the first event in the log
//     ...log.first(50)                                  // A sub-log of the first 50 events
//     ...log.last()                                     // A sub-log of the last event
//     ...log.last(100)                                  // A sub-log of the last 100 events

//   | ...log.each(f)                                    // Invokes f on each event and returns the log
//     ...log.map(f)                                     // Invokes f on each event and returns an array of results

//   The reason you can grep() on a string (which seems superfluous given the presence of qs[]) is that debugging is often done outside of caterwaul()ed functions, so qs[] is unavailable. The
//   simplest way to specify syntax is with a string that is then parsed (we're not going for super-high-performance in a debug shell).

//   Events contain several useful pieces of information. One is a reference to the syntax node that generated them (note that statement-level constructs such as 'if', 'for', etc. are not
//   traced due to JavaScript's syntactic limitations). Another is a reference to the value that was produced (though it may have been modified since -- Caterwaul can't keep track of the
//   original in the state it was in at the time of event generation). Finally, there is some event-specific information that is also tracked. This includes a sequence number (which is equal to
//   the index in the original log; that is, caterwaul.recon.log[0].sequence === 0) and a time offset. The time offset is the number of milliseconds since the debugger was invoked on the
//   function; it is not meaningful for profiling (since a bunch of extra machinery is running inside your code), but it does give you some indication of the real-time ordering of events, as
//   well as indicating where large delays are (e.g. AJAX calls).

//   | ...log[0].node            // A reference to the syntax node
//     ...log[0].value           // A reference to the value
//     ...log[0].pending         // Truthy if this event is a 'will be evaluated' event (see below)
//     ...log[0].error           // Any error that was produced when evaluating the expression -- only available for aggressive tracing
//     ...log[0].sequence        // The index of this event in the original log (for log[0], it will always be 0)
//     ...log[0].time            // The number of milliseconds that elapsed between the original caterwaul() call and the creation of this event
//     ...log[0].pair            // The complement event -- if this one is pending, then the pair contains the value, and vice versa

//   There are a few things to note when working with events. The most important one is that an event is created not just when a value is generated; it also signifies when a value is, at some
//   point, going to be generated. For example, given this expression:

//   | x + y * z()

//   These events will appear:

//   | 1. x + y * z() will be evaluated        5. y will be evaluated          9. z = function () {return 20}
//     2. x will be evaluated                  6. y = 10                      10. z() = 20
//     3. x = 4                                7. z() will be evaluated       11. y * z() = 200
//     4. y * z() will be evaluated            8. z will be evaluated         12. x + y * z() = 204

//   The 'will be evaluated' events obviously don't have values. These instead are 'pending', such that log[0].pending === true. Here, the 'pair' properties are set like this:

//   | 1 <-> 12, 2 <-> 3, 4 <-> 11, 5 <-> 6, 7 <-> 10, 8 <-> 9.

//   Now let's suppose that z() threw an error instead of returning a number. The event stream would contain only events 1-9; anything after that would have been unwound by the exception. For
//   cases like this, the unpaired() log method gives you the error trace:

//   | ...log.unpaired()         -> sub-log of events 1, 4, and 7, which are:  x + y * z() will be evaluated
//                                                                             y * z() will be evaluated
//                                                                             z() will be evaluated

//   Because you know that z evaluated successfully -- it was defined at the time of evaluation (otherwise it would also be unpaired), the cause must be the invocation of z. Ideally z is traced
//   as well, so you can tell exactly what about it failed.

//   Note that the 'recon' environment, once added to a caterwaul function, gets referenced instead of copied. In order to get a different recon environment, you have to use the 'recon'
//   configuration again, like this:

//   | var c1 = caterwaul.clone('recon');
//     var c2 = c1.clone('recon');

//   Configuring the annotator.
//   The 'recon' configuration adds a function, caterwaul.recon, that performs the source code annotation. It's low-level; that is, it takes a syntax tree and returns an annotated syntax tree,
//   so generally you won't use it directly. But all configuration is done by calling configuration methods on the function. So, for example, to enable aggressive annotation:

//   | caterwaul.recon.aggressive(true);         // Incidentally, this returns caterwaul.recon so you can further configure it
//     caterwaul.recon.aggressive()              // Returns the current state of the 'aggressive' setting

//   Configuration options such as these determine the behavior of the caterwaul.recon annotator. I mentioned earlier that you don't use caterwaul.recon directly to annotate code; what happens
//   instead is that the caterwaul function's 'init' method (which is what caterwaul() does when you use it as a function) is augmented to do this for you. So all you have to do is something
//   like this:

//   | var c = caterwaul.clone('recon');
//     c.recon.aggressive(true);
//     c(function () {...}) ();

//   The third line automatically adds debugging annotations to the function and then invokes it.

//   Something awesome: annotating Caterwaul itself.
//   Caterwaul gives you a copy of its initialization function and lets you reinitialize the library with a transformation of itself. For example:

//   | caterwaul.reinitialize(caterwaul.clone('recon'))                  // Returns the new caterwaul, leaving the global 'caterwaul' symbol intact (as long as you didn't break deglobalize())

//   Doing this can be useful for debugging macros, configurations, or other things.

  caterwaul.configuration('recon', caterwaul.clone('std')(function () {
    var old_init = this.init, s = this.syntax, hook_name = this.gensym(), gensym = this.gensym, recon = merge(function (tree) {return recon.annotate(tree)},

//     Annotation logic.
//     In a reasonably orthogonal language such as Lisp, annotating nodes is relatively trivial. However, JavaScript doesn't provide syntactic uniformity, so we have to work around some
//     constructs. This includes everything at the statement-level (e.g. if, for, var, etc.), any lvalues (though subcomponents of those lvalues can be annotated), and custom annotation for
//     function invocations. (This has to do with the fact that invocation context determines function binding.)

//     Specifically, here is the traversal pattern (where A is the annotation function and f is the hook):

//     | A(identifier)     ->    f(identifier)
//       A(x op y)         ->    f(A(x) op A(y))
//       A(op x)           ->    f(op A(x))
//       A(x.y(z))         ->    f((function () {var _gensym_ = A(x); return A(_gensym_.y).call(_gensym_, z)})())
//       A(x[y](z))        ->    f((function () {var _gensym_ = A(x); return A(_gensym_[y]).call(_gensym_, z)})())
//       A(x(y))           ->    A(x)(A(y))
//       A(if (x) y)       ->    if (A(x)) A(y)
//       A({n ...})        ->    {A(n.flatten())}
//       A(x [op]= y)      ->    x = A(y)
//       A(x.y [op]= z)    ->    A(x).y = A(z)
//       A(x[y] [op]= z)   ->    A(x)[y] = A(z)
//       ...

//     Unfortunately it would be difficult to use macros to implement this mechanism. The reason has to do with quoting syntax; JavaScript's limitations mean that we can't say things like
//     qs[if(_)_], since that would be putting a statement-mode command ('if') into an expression context. (I could build the nodes using strings or something, but that's too much work;
//     besides, using macros for this is inefficient anyway.)

    {annotate: function (node) {return node &&
              (node.is_constant()        ? node :
               node.is_empty()           ? recon.wrap(node, node) :
               node.left_is_lvalue()     ? recon.wrap(node, node.change(0, node[0].data === '[]' ? node[0].map(recon.annotate) : node[0].data === '.' ?
                                                                                                   node[0].compose_single(0, recon.annotate) : node[0]).compose_single(1, recon.annotate)) :
               node.is_invocation()      ? recon.wrap(node, node.is_contextualized_invocation() ?
                                             new s(node.data, recon.annotate(node[0]), new s('(', recon.annotate(node[1][0]))) :
                                             (function (gensym) {return qs[qg[function () {var _ = _; return _.call(_, _)}]()].s('_',
                                                                   [gensym, recon.annotate(node[0][0]), new s(node[0].data, gensym, node[0].data === '[]' ?
                                                                      new s('[]', gensym, new s('[', recon.annotate(node[0][1][0]))) : new s('.',  gensym, node[0][1])), gensym,
                                                                    new s('(', recon.annotate(node[1][0]))])}) (new s(gensym()))) :

               node.has_lvalue_list()    ? new s(node.data, node[0].data === ',' ? new s(',', node[0].flatten().map(function (n) {return n.data === '=' && new s(n.data, n[0], recon.annotate(n[1]))})) :
                                                            node[0].data === '=' ? new s('=', node[0][0], node[0][1]) : node[0]) :
               node.has_parameter_list() ? new s(node.data, node[0], recon.annotate(node[1])) :
                                           null)},

         wrap: function (node) {},

  environment: {}});

                                      this.method('init', function (f) {return this.compile(recon(this.decompile(old_init.call(this, f))), this.recon.environment)}).
                                              ref('recon', this.util.configurable(recon, 'aggressive'))}));

// Generated by SDoc 