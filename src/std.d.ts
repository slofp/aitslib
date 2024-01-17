type num = Number;
type str = String;
type arr<T = any> = Array<T>;
type bool = boolean;
type fn = () => void;
type value = any;
type obj = { [key: string]: value };

interface Number {
	/**
	 * 数値を文字列に変換します。
	 */
	to_str(): str;
}

interface String {
	/**
	 * 文字列の長さを取得します。
	 */
	len: num;
	/**
	 * 文字列が数字であれば、数値に変換します。
	 */
	to_num(): num | null;
	/**
	 * 文字列を書記素クラスタ毎に区切り、配列にしたものを返します。
	 * 文字列に孤立サロゲートが含まれない場合、孤立サロゲートを返すことはありません。
	 */
	to_arr(): arr<str>;
	/**
	 * 文字列を Unicode コードポイント毎に区切り、配列にしたものを返します。
	 * 書記素クラスタは分割されます。
	 * 文字列に孤立サロゲートが含まれない場合、孤立サロゲートを返すことはありません。
	 */
	to_unicode_arr(): arr<str>;
	/**
	 * 文字列を Unicode コードポイント毎に区切り、それぞれコードポイント値を取得し配列にしたものを返します。
	 * 文字列に孤立サロゲートが含まれない場合、孤立サロゲートを返すことはありません。
	 */
	to_unicode_codepoint_arr(): arr<num>;
	/**
	 * 文字列を UTF-16 コード単位毎に区切り、配列にしたものを返します。
	 * 文字列にサロゲートペアが含まれる場合、上位と下位それぞれ孤立サロゲートを返します。
	 */
	to_char_arr(): arr<str>;
	/**
	 * 文字列を UTF-16 コード単位毎に区切り、それぞれUTF-16 コード単位を表す 0 から 65535 までの整数を取得し配列にしたものを返します。
	 * 文字列にサロゲートペアが含まれる場合、上位と下位それぞれ孤立サロゲートを返します。
	 */
	to_charcode_arr(): arr<num>;
	/**
	 * 文字列を UTF-8 エンコードし、各バイト毎の 0 から 255 までの整数値を取得し配列にしたものを返します。
	 */
	to_utf8_byte_arr(): arr<num>;
	/**
	 * 文字列中の i 番目の文字を取得します。
	 * @param i
	 */
	pick(i: num): str | null;
	/**
	 * 文字列中に keyword が含まれていれば`true`、なければ`false`を返します。
	 * @param keyword
	 */
	incl(keyword: str): bool;
	/**
	 * 文字列の begin 番目から end 番目の直前までの部分を取得します。
	 * @param begin
	 * @param end
	 */
	slice(begin: num, end: num): str;
	/**
	 * 文字列を splitter がある場所で区切り、配列にしたものを返します。
	 * splitter が与えられなければ一文字づつ区切ります。
	 * @param splitter
	 */
	split(splitter?: str): arr<str>;
	/**
	 * 文字列中の old を _new に置換したものを返します。
	 * @param old
	 * @param _new
	 */
	replace(old: str, _new: str): str;
	/**
	 * 文字列中から search を検索し、あれば何文字に存在したかを、なければ-1を返します。
	 * @param search
	 */
	index_of(search: str): num;
	/**
	 * 文字列の前後の空白を取り除いたものを返します。
	 */
	trim(): str;
	/**
	 * 文字列中の英字を大文字に変換して返します。
	 */
	upper(): str;
	/**
	 * 文字列中の英字を小文字に変換して返します。
	 */
	lower(): str;
	/**
	 * i 番目のにある UTF-16 コード単位を表す 0 から 65535 までの整数を返します。
	 * インデックスは UTF-16 コード単位に基づきます。
	 *
	 * 文字列にサロゲートペアが含まれる場合、位置によって上位または下位の孤立サロゲートを返すことがあります。
	 *
	 * i 番目の文字が存在しない場合は null が返されます。
	 * @param i
	 */
	charcode_at(i: num): num | null;
	/**
	 * i 番目の文字のコードポイントを取得します。
	 * インデックスは UTF-16 コード単位に基づきます。
	 * 
	 * 文字列にサロゲートペアが含まれ、指定位置が下位のサロゲートである場合、下位の孤立サロゲートを返します。
	 * 
	 * i 番目の文字が存在しない場合は null が返されます。
	 * @param i
	 */
	codepoint_at(i: num): num | null;
}

interface Array<T> {
	/**
	 * 配列の要素数を取得します。
	 */
	len: num;
	/**
	 * 【この操作は配列を書き換えます】
	 *
	 * 配列の最後に要素を追加します。
	 * @param i
	 */
	push<I>(i: I): asserts this is Array<T | I>;
	/**
	 * 【この操作は配列を書き換えます】
	 *
	 * 配列の最初に要素を追加します。
	 * @param i
	 */
	unshift<I>(i: I): asserts this is Array<T | I>;
	/**
	 * 【この操作は配列を書き換えます】
	 *
	 * 配列の最後の要素を取り出します。
	 */
	pop(): T;
	/**
	 * 【この操作は配列を書き換えます】
	 *
	 * 配列の最初の要素を取り出します。
	 */
	shift(): T;
	/**
	 * 配列を連結します。
	 * @param b
	 */
	concat<U>(b: arr<U>): arr<T | U>;
	/**
	 * 文字列の配列を結合して一つの文字列として返します。
	 * @param joiner
	 */
	join(joiner?: str): str;
	/**
	 * 配列の begin 番目から end 番目の部分を切り出して返します。
	 * @param begin
	 * @param end
	 */
	slice(begin: num, end: num): arr<T>;
	/**
	 * 配列に指定した値が含まれているかどうかを返します。
	 * @param i
	 */
	incl(i: str | num | bool | null): bool;
	/**
	 * 配列の各要素に対し func を非同期的に呼び出します。 それぞれの要素を func の返り値で置き換えたものを返します。
	 * @param func
	 */
	map<R>(func: (value: T) => R): arr<R>;
	/**
	 * 配列の要素のうち func が true を返すようなもののみを抜き出して返します。順序は維持されます。
	 * @param func
	 */
	filter(func: (value: T) => bool): arr<T>;
	/**
	 * 配列の各要素に対し func を順番に呼び出します。
	 * 各呼び出しでは、前回の結果が第1引数 acm として渡されます。
	 *
	 * initial が指定された場合は初回呼び出しの引数が(initial, v[0], 0)、指定されなかった場合は(v[0], v[1], 1)となります。
	 * @param func
	 * @param initial
	 */
	reduce(func: (acm: T, item: T, index: num) => T, initial: T): T;
	/**
	 * 配列から func が true を返すような要素を探し、その値を返します。
	 * @param func
	 */
	find(func: (item: T, index: num) => bool): T;
	/**
	 * 【この操作は配列を書き換えます】
	 *
	 * 配列を反転させます。
	 */
	reverse(): null;
	/**
	 * 配列のコピーを生成します。
	 */
	copy(): arr<T>;
	/**
	 * 【この操作は配列を書き換えます】
	 * 
	 * 配列の並べ替えをします。第1引数 comp として次のような比較関数を渡します。
	 * 
	 * a が b より順番的に前の時、負の値を返す
	 * 
	 * a が b より順番的に後の時、正の値を返す
	 * 
	 * a が b と順番的に同等の時、0を返す
	 * 
	 * 数値の並び替えではCore:subを渡すことで昇順、@(a,b){b-a}を渡すことで降順ソートができます。
	 * 文字列用の比較関数としてStr:lt（昇順）, Str:gt（降順）が用意されています。詳しくはstd.mdをご覧下さい。
	 * @param comp
	 */
	sort(comp: (a: T, b: T) => num): arr<T>;
}

interface Error {
	/**
	 * エラーの識別子となる文字列を取得します。
	 */
	name: str;
	/**
	 * エラーに付加情報がある場合、それを取得します。
	 */
	info: value;
}

declare interface Math {
	/**
	 * 無限大
	 */
	readonly Infinity: num;
	/**
	 * ネイピア数e
	 */
	readonly E: num;
	/**
	 * 2の自然対数
	 */
	readonly LN2: num;
	/**
	 * 10の自然対数
	 */
	readonly LN10: num;
	/**
	 * 2を底としたeの対数
	 */
	readonly LOG2E: num;
	/**
	 * 10を底としたeの対数
	 */
	readonly LOG10E: num;
	/**
	 * 円周率π
	 */
	readonly PI: num;
	/**
	 * √(1/2)
	 */
	readonly SQRT1_2: num;
	/**
	 * √2
	 */
	readonly SQRT2: num;
	/**
	 * 絶対値を計算します。
	 * @param x
	 */
	abs(x: num): num;
	/**
	 * x が正であれば1、負であれば-1、0または-0であればそのままの値を返します。
	 * いずれでもなければNaNを返します。
	 * @param x
	 */
	sign(x: num): num;
	/**
	 * 四捨五入して、もっとも近い整数を返します。
	 * @param x
	 */
	round(x: num): num;
	/**
	 * 引数以上の最小の整数を返します。
	 * @param x
	 */
	ceil(x: num): num;
	/**
	 * 引数以下の最大の整数を返します。
	 * @param x
	 */
	floor(x: num): num;
	/**
	 * 引数の小数部を切り捨て、整数部を返します。
	 * @param x
	 */
	trunc(x: num): num;
	/**
	 * 小さい方の値を取得します。
	 * @param a
	 * @param b
	 */
	min(a: num, b: num): num;
	/**
	 * 大きい方の値を取得します。
	 * @param a
	 * @param b
	 */
	max(a: num, b: num): num;
	/**
	 * 正の平方根を計算します。
	 * @param x
	 */
	sqrt(x: num): num;
	/**
	 * 立方根を計算します。
	 * @param x
	 */
	cbrt(x: num): num;
	/**
	 * vs の要素をそれぞれ自乗してから合計した値の正の平方根を返します。
	 * @param vs
	 */
	hypot(vs: arr): num;
	/**
	 * 正弦を計算します。
	 * @param rad - 角度の単位はラジアンです。
	 */
	sin(rad: num): num;
	/**
	 * 余弦を計算します。
	 * @param rad - 角度の単位はラジアンです。
	 */
	cos(rad: num): num;
	/**
	 * 正接を計算します。
	 * @param rad - 角度の単位はラジアンです。
	 */
	tan(rad: num): num;
	/**
	 * 逆正弦を計算します。
	 * @param x
	 */
	asin(x: num): num;
	/**
	 * 逆余弦を計算します。
	 * @param x
	 */
	acos(x: num): num;
	/**
	 * 逆正接を計算します。
	 * @param x
	 */
	atan(x: num): num;
	/**
	 * y /x の正接を返しますが、x が負値の場合はπだけずれた値を返します。
	 * @param y
	 * @param x
	 */
	atan2(y: num, x: num): num;
	/**
	 * 双曲線正弦を計算します。
	 * @param x
	 */
	sinh(x: num): num;
	/**
	 * 双曲線余弦を計算します。
	 * @param x
	 */
	cosh(x: num): num;
	/**
	 * 双曲線正接を計算します。
	 * @param x
	 */
	tanh(x: num): num;
	/**
	 * 双曲線逆正弦を計算します。
	 * @param x
	 */
	asinh(x: num): num;
	/**
	 * 双曲線逆余弦を計算します。
	 * @param x
	 */
	acosh(x: num): num;
	/**
	 * 双曲線逆正接を計算します。
	 * @param x
	 */
	atanh(x: num): num;
	/**
	 * x の y 乗を計算します。結果がNaNとなることを許容する点、内部的にJavascriptの**演算子ではなくMath.pow関数を用いている点の２つを除き、ほぼCore:powと同じものです。
	 * @param x
	 * @param y
	 */
	pow(x: num, y: num): num;
	/**
	 * eの x 乗を計算します。
	 * @param x
	 */
	exp(x: num): num;
	/**
	 * eの x 乗から1を引いた値を計算します。
	 * @param x
	 */
	expm1(x: num): num;
	/**
	 * 自然対数を計算します。常用対数にはMath:log10を使用して下さい。
	 * @param x
	 */
	log(x: num): num;
	/**
	 * x +1の自然対数を計算します。
	 * @param x
	 */
	log1p(x: num): num;
	/**
	 * 10を底とした対数を計算します。
	 * @param x
	 */
	log10(x: num): num;
	/**
	 * 2を底とした対数を計算します。
	 * @param x
	 */
	log2(x: num): num;
	/**
	 * 乱数を生成します。
	 *
	 * min および max を渡した場合、min <= x, x <= max の整数、
	 * 渡していない場合は 0 <= x, x < 1 の 小数が返されます。
	 * @param min
	 * @param max
	 */
	rnd(min?: num, max?: num): num;
	/**
	 * シードから乱数生成機を生成します。
	 * @param seed
	 */
	gen_rng(seed: num | str): () => num;
	/**
	 * xを32ビットのバイナリで表現したときの先頭の0の個数を返します。
	 * @param x
	 */
	clz32(x: num): num;
	/**
	 * x を32ビットの浮動小数点数に変換した時の値を返します。
	 * @param x
	 */
	fround(x: num): num;
	/**
	 * x と y に対しC言語風の32ビット乗算を行った結果を返します。
	 * @param x
	 * @param y
	 */
	imul(x: num, y: num): num;
}
declare var Math: Math;

declare interface Core {
	/**
	 * AiScriptのバージョンです。
	 */
	readonly v: str;
	/**
	 * 値の型名を取得します。
	 * @param v
	 */
	type(v: value): 'null' | 'bool' | 'num' | 'str' | 'arr' | 'obj';
	/**
	 * 値を表す文字列を取得します。
	 * @param v
	 */
	to_str(v: value): str;
	/**
	 * 指定時間（ミリ秒）待機します。
	 * @param time
	 */
	sleep(time: value): void;
}
declare var Core: Core;

// Global

/**
 * 画面に文字列を表示します。
 * @param message
 */
declare function print(message: str): void;

/**
 * 文字列の入力を受け付けます。
 * @param message
 */
declare function readline(message: str): str;


declare interface Util {
	/**
	 * 新しいUUIDを生成します。
	 */
	uuid(): str;
}
declare var Util: Util;

declare interface Json {
	/**
	 * JSONを生成します。
	 * @param v
	 */
	stringify(v: value): str;
	/**
	 * JSONをパースします。 引数がJSONとしてパース可能性でない場合、エラー型の値（name='not_json'）を返します。
	 * @param json
	 */
	parse(json: str): value;
	/**
	 * 文字列がJSONとしてパース可能であるかの判定を行います。歴史的理由により存在しています
	 * @param str
	 */
	parsable(str: str): bool;
}
declare var Json: Json;

declare interface Date {
	/**
	 * 現在時刻を取得します。
	 */
	now(): num;
	/**
	 * 時刻の年を取得します。
	 *
	 * date を渡した場合、_date_に対応する年、
	 * 渡していない場合は現在時刻の年が返されます。
	 * @param date
	 */
	year(date?: num): num;
	/**
	 * 現在時刻の月を取得します。
	 *
	 * date を渡した場合、_date_に対応する月、
	 * 渡していない場合は現在時刻の月が返されます。
	 * @param date
	 */
	month(date?: num): num;
	/**
	 * 現在時刻の日を取得します。
	 *
	 * date を渡した場合、_date_に対応する日、
	 * 渡していない場合は現在時刻の日が返されます。
	 * @param date
	 */
	day(date?: num): num;
	/**
	 * 現在時刻の時を取得します。
	 *
	 * date を渡した場合、_date_に対応する時、
	 * 渡していない場合は現在時刻の時が返されます。
	 * @param date
	 */
	hour(date?: num): num;
	/**
	 * 現在時刻の分を取得します。
	 *
	 * date を渡した場合、_date_に対応する分、
	 * 渡していない場合は現在時刻の分が返されます。
	 * @param date
	 */
	minute(date?: num): num;
	/**
	 * 現在時刻の秒を取得します。
	 * 
	 * date を渡した場合、_date_に対応する秒、
	 * 渡していない場合は現在時刻の秒が返されます。
	 * @param date
	 */
	second(date?: num): num;
	/**
	 * 日時の文字列からUNIX時間(ミリ秒含む)を返します。
	 * 本質的には`new Date(date).getTime()`と変わりません。
	 * @param date
	 */
	parse(date: str): num;
}
declare var Date: Date;

declare interface Num {
	/**
	 * 数値から16進数の文字列を生成します。
	 * @param x
	 */
	to_hex(x: num): str;
	/**
	 * 16進数の文字列から数値を生成します。
	 * @param hex
	 */
	from_hex(hex: str): num;
}
declare var Num: Num;

declare interface Str {
	/**
	 * 改行コード(LF)です。
	 */
	readonly lf: str;
	/**
	 * a < b ならば -1、a == b ならば 0、a > b ならば 1 を返します。
	 * arr.sortの比較関数として使用できます。
	 * @param a
	 * @param b
	 */
	lt(a: str, b: str): num;
	/**
	 * a > b ならば -1、a == b ならば 0、a < b ならば 1 を返します。
	 * arr.sortの比較関数として使用できます。
	 * @param a
	 * @param b
	 */
	gt(a: str, b: str): num;
	/**
	 * Unicodeのコードポイントから文字を生成します。
	 * @param codepoint - 0 以上、10FFFF(16) 以下である必要があります。
	 */
	from_codepoint(codepoint: num): str;
	/**
	 * Unicodeのコードポイント列を表す数値の配列から文字を生成します。
	 * @param codePoints - 各要素は 0 以上、10FFFF(16) 以下である必要があります。
	 */
	from_unicode_codepoints(codePoints: arr<num>): str;
	/**
	 * UTF-8のバイト列を表す数値の配列から文字を生成します。
	 * @param bytes - 各要素は 0 以上、255 以下である必要があります。
	 */
	from_utf8_bytes(bytes: arr<num>): str;
}
declare var Str: Str;

declare interface Obj {
	/**
	 * オブジェクトからキーの名前を取得します。
	 * @param v
	 */
	keys(v: object): arr<str>;
	/**
	 * オブジェクトからキーに対応した値だけを取り出します。
	 * @param v
	 */
	vals<T>(v: { [s: string]: T }): arr<T>;
	vals(v: obj): arr<value>;
	/**
	 * オブジェクトのキー、値、キーと値の組を配列にして返します。
	 * @param v
	 */
	kvs(v: obj): arr<[str, value]>;
	/**
	 * オブジェクトからキーに対応した値を返します。
	 * @param v
	 * @param key
	 */
	get(v: obj, key: str): value;
	/**
	 * キーを使用してオブジェクトに値をいれます。
	 * @param v
	 * @param key
	 * @param val
	 */
	set(v: obj, key: str, val: value): null;
	/**
	 * オブジェクトにキーが含まれているかを判定します。
	 * @param v
	 * @param key
	 */
	has(v: obj, key: str): bool;
	/**
	 * オブジェクトのコピーを生成します。
	 * @param v
	 */
	copy(v: obj): obj;
	/**
	 * ２つのオブジェクトを併合したものを返します。
	 * @param o1
	 * @param o2
	 */
	merge(o1: obj, o2: obj): obj;
}
declare var Obj: Obj;

declare interface ErrorConstructor {
	/**
	 * エラー型の値を作成します。
	 * @param name
	 * @param info
	 */
	create(name: str, info?: value): Error;
}
declare var Error: ErrorConstructor;

declare interface Async {
	/**
	 * 指定した周期でコールバック関数を呼び出します。
	 * 戻り値として停止関数を返します。
	 * @param interval
	 * @param callback
	 * @param immediate
	 */
	interval(interval: num, callback: fn, immediate?: bool): fn;
	/**
	 * 指定した時間経過後にコールバック関数を呼び出します。
	 * 戻り値として停止関数を返します。
	 * @param delay
	 * @param callback
	 */
	timeout(delay: num, callback: fn): fn;
}
declare var Async: Async;
