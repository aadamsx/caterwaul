// Caterwaul JS sequence library | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// Javascript's looping facilities are side-effectful and more importantly operate in statement-mode rather than expression-mode. This sequence library moves finite and anamorphic looping into
// expression-mode using both methods and macros. Macros are used sparingly here; they provide comprehensions, but are ultimately just shorthands for sequence methods.

  caterwaul.tconfiguration('std', 'seq.core', function () {this.shallow('seq', {core: fn_[null]})}).

// There are two kinds of sequences represented here. One is a finite sequence, which is eager and acts like a Javascript array (though it has a different prototype). The other is an infinite
// stream; this is an anamorphism that generates new elements from previous ones. Because Javascript isn't required to optimize tail calls, any recursion done by the sequence library is coded in
// CPS using the continuation library.

// Finite sequence API.
// Finite sequences are assumed to have numbered elements and a 'length' field, just like a Javascript array or jQuery object. Any mapping, filtering, or folding on these sequences is done
// eagerly (put differently, most sequence/stream operations are closed under eagerness). There's a core prototype for finite sequences that contains eager implementations of each(), map(),
// filter(), foldl(), foldr(), zip(), etc.

// Stream API.
// All streams are assumed to be infinite in length; that is, given some element there is always another one. Streams provide this interface with h() and t() methods; the former returns the first
// element of the stream, and the latter returns a stream containing the rest of the elements.

//   Terminals.
//   There isn't a 'nil' stream exactly, since that would imply an end of data. Rather, if you're building a stream from consing, you'll end up consing something onto a constant stream.

    tconfiguration('std continuation', 'seq.infinite.core', function () {
      this.configure('seq.core').seq.infinite = fn_[null] /se[_.prototype = new this.seq.core() /se[_.constructor = ctor], where[ctor = _]]
        /se[_.def(name, ctor, h, t) = i[name] = ctor /se[_.prototype = new i() /se[_.h = h, _.t = t, _.constructor = ctor]], where[i = _],

            _.def('cons', fn[h, t][this._h = h, this._t = t], fn_[this._h], fn_[this._t]),
            _.def('k',    fn   [x][this._x = x],              fn_[this._x], fn_[this])]}).

//   Anamorphisms via fixed-point.
//   Anamorphic streams are basically unwrapped version of the Y combinator. An anamorphic stream takes a function f and an initial element x, and returns f(x), f(f(x)), f(f(f(x))), ....

    tconfiguration('std', 'seq.infinite.y', function () {
      this.configure('seq.infinite.core').seq.infinite.def('y', fc[f, x][this._f = f, this._x = x], fn_[this._x], fn_[new this.constructor(this._f, this._f(this._x))])}).

//   Lazy map and filter.
//   These are implemented as separate classes that wrap instances of infinite streams. They implement the next() method to provide the desired functionality. map() and filter() are simple
//   because they provide streams as output. filter() is eager on its first element; that is, it remains one element ahead of what is requested.

    tconfiguration('std continuation', 'seq.infinite.class.transform', function () {
      this.configure('seq.infinite.core').seq.infinite
        /se[_.prototype.map(f) = new _.map(f, this),
            _.def('map', fc[f, xs][this._f = f, this._xs = xs], fn_[this._f(this._xs.h())], fn_[new this.constructor(this._f, this._xs.t())]),

            _.prototype.filter(f) = new _.filter(f, this),
            _.def('filter', fc[f, xs][this._f = f, this._xs = let*[next(s)(cc) = f(s.h()) ? cc(s) : call/tail[next(s.t())(cc)]] in call/cc[next(xs)]],
                            fn_[this._xs.h()], fn_[new this.constructor(this._f, this._xs.t())])]}).

//   Traversal and forcing.
//   This is where we convert from infinite streams to finite sequences. You can take or drop elements until a condition is met. take() always assumes it will return a finite sequence, whereas
//   drop() assumes it will return an infinite stream. (In other words, the number of taken or dropped elements is assumed to be finite.) Both take() and drop() are eager. drop() returns a
//   sequence starting with the element that triggers the function, whereas take() returns a sequence for which no element triggers the function.

    tconfiguration('std continuation', 'seq.infinite.class.traversal', function () {
      this.configure('seq.infinite.core').seq.infinite.prototype
        /se[_.drop(f) = let*[next(s)(cc) = f(s.h()) ? cc(s) : call/tail[next(s.t())(cc)]] in call/cc[next(this)],
            _.take(f) = let*[xs = [], next(s)(cc) = let[h = s.h()][f(h) ? cc(xs) : (xs.push(h), call/tail[next(s.t())(cc)])]] in call/cc[next(this)]]}).

// Final configuration.
// Rather than including individual configurations above, you'll probably just want to include this one.

  configuration('seq', function () {this.configure('seq.core seq.infinite.core seq.infinite.y seq.infinite.class.transform seq.infinite.class.traversal')});

// Generated by SDoc 
