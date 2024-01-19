/**
 * 現在のユーザーID
 */
declare const USER_ID: str | null;
/**
 * 現在のユーザーの名前
 */
declare const USER_NAME: str | null;
/**
 * 現在のユーザーの表示名
 */
declare const USER_USERNAME: str | null;

interface IEmoji {
	/**
	 * 絵文字ID
	 */
	id: str;
	/**
	 * 絵文字のタグ
	 */
	aliases: arr<str>;
	/**
	 * 絵文字の名前
	 */
	name: str;
	/**
	 * 絵文字のカテゴリー
	 */
	category: str;
	/**
	 * この絵文字がどのhostにあるか
	 */
	host: str | null;
	/**
	 * 絵文字の画像URL
	 */
	url: str;
	/**
	 * 絵文字のライセンス
	 */
	license: str;
	/**
	 * 絵文字がセンシティブかどうか
	 */
	isSensitive: bool;
	/**
	 * 絵文字がローカルのみかどうか
	 */
	localOnly: bool;
	/**
	 * 絵文字が使えるロール
	 *
	 * (おそらく未実装)
	 */
	roleIdsThatCanBeUsedThisEmojiAsReaction: arr;
	/**
	 * 絵文字を使用することができないロール
	 *
	 * (おそらく未実装)
	 */
	roleIdsThatCanNotBeUsedThisEmojiAsReaction: arr;
}
/**
 * ローカルキャッシュのカスタム絵文字
 */
declare const CUSTOM_EMOJIS: arr<IEmoji>;

/**
 * 現在の言語
 */
declare const LOCALE: str;
/**
 * サーバーのURL
 *
 * ここで取得されるのはオリジンのみです。パスまで取得したい場合は`Mk.url()`を使用してください。
 */
declare const SERVER_URL: str;

type ModalIconType = 'info' | 'success' | 'warn' | 'error' | 'question';
declare interface Mk {
	/**
	 * ダイアログを表示します。
	 * @param title - タイトル
	 * @param text - テキスト
	 * @param type - アイコン表記
	 */
	dialog(title: str, text: str, type?: ModalIconType): null;
	/**
	 * 
	 * @param title - タイトル
	 * @param text - テキスト
	 * @param type - アイコン表記
	 * @returns 「はい」を選択したら`true`、「いいえ」を選択したら`false`になります
	 */
	confirm(title: str, text: str, type?: ModalIconType): bool;
	/**
	 * 現在のサーバーのapiを送信します。
	 * 
	 * サーバーが使用できる各エンドポイントはAPI Consoleまたはapi/endpointsを参照してください。
	 * @param endpoint - エンドポイント
	 * @param params - 各エンドポイントが要求するパラメーター
	 * @param token - apiトークン(必要であれば)。
	 */
	api(endpoint: str, params: obj, token?: str): obj | Error;
	/**
	 * データをkey-valueでローカルストレージに保存します。
	 * @param key - キー
	 * @param value - 値
	 */
	save(key: str, value: value): null;
	/**
	 * キーに対応したデータをローカルストレージから取得します。
	 * @param key - キー
	 */
	load(key: str): value;
	/**
	 * 現在のurlを取得します。
	 * 
	 * オリジンのみを取得したい場合は`SERVER_URL`を推奨します。
	 */
	url(): str;
	/**
	 * テキストをnayizeします。
	 * @param text - テキスト
	 */
	nyaize(text: str): str;
}
/**
 * misskey lib
 */
declare var Mk: Mk;

declare interface Plugin {
	/**
	 * メタデータで定義したコンフィグの設定データ
	 *
	 * 使用するにはメタデータでconfigを定義してください
	 */
	readonly config: obj;
	/**
	 * 投稿フォームにアクションを追加します。
	 * @param title - アクションメニューに表示する名前
	 * @param fn - アクション。引数にノートオブジェクトと更新関数を取り、更新関数では指定したキーを値に置き換えます。
	 */
	register_post_form_action(
		title: str,
		fn: (
			form: { text: str; cw: str },
			update: (key: "text" | "cw", value: str) => void
		) => void
	): void;
	/**
	 * ノートメニューに項目を追加します。
	 * @param title - アクションメニューに表示する名前
	 * @param fn - アクション。引数にノートオブジェクトを取ります。
	 */
	register_note_action(title: str, fn: (note: obj) => void): void;
	/**
	 * ユーザーメニューに項目を追加します。
	 * @param title - アクションメニューに表示する名前
	 * @param fn - アクション。引数にユーザーオブジェクトを取ります。
	 */
	register_user_action(title: str, fn: (user: obj) => void): void;
	/**
	 * UIに表示されるノート情報を書き換えます。
	 * @param fn - アクション。引数にノートオブジェクトを取り、返り値にはノートオブジェクトを返します。null(void)を返した場合はノートは削除されます。
	 */
	register_note_view_interruptor(fn: (note: obj) => obj | void): void;
	/**
	 * ノート投稿時にノート情報を書き換えます。
	 * @param fn - アクション。引数にノートオブジェクトを取り、返り値にはノートオブジェクトを返します。
	 */
	register_note_post_interruptor(fn: (note: obj) => obj): void;
	/**
	 * UIに表示されるページ情報を書き換えます。
	 * @param fn - アクション。引数にページオブジェクトを取り、返り値にはページオブジェクトを返します。
	 */
	register_page_view_interruptor(fn: (page: obj) => obj): void;
	/**
	 * 第一引数に渡されたURLをブラウザの新しいタブで開きます。
	 *
	 * urlは同一オリジンであっても新規タブで開かれます。
	 * @param url
	 */
	open_url(url: str): void;
}
/**
 * プラグイン用API
 */
declare var Plugin: Plugin;

interface IUiComponent<T extends obj, I extends str = str> {
	/**
	 * コンポーネントID
	 */
	id: I;
	/**
	 * コンポーネントの状態を更新します
	 * @param options - 各コンポーネントが要求するパラメーター
	 */
	update(options: T): void;
}
type FontType = 'serif' | 'sans-serif' | 'monospace';
type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
interface Component {
	/**
	 * コンテナコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	container(options: {
		children?: arr<IUiComponent<obj>>;
		align?: 'left' | 'center' | 'right';
		bgColor?: str;
		fgColor?: str;
		font?: FontType;
		borderWidth?: num;
		borderColor?: str;
		padding?: num;
		rounded?: bool;
		hidden?: bool;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * 標準テキストコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	text(options: {
		text?: str;
		size?: num;
		bold?: bool;
		color?: str;
		font?: FontType;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * MFMテキストコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	mfm(options: {
		text?: str;
		size?: num;
		bold?: bool;
		color?: str;
		font?: FontType;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * 複数行テキスト入力コンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	textarea(options: {
		onInput?: (value: str) => void;
		default?: str;
		label?: str;
		caption?: str;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * 1行テキスト入力コンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	textInput(options: {
		onInput?: (value: str) => void;
		default?: str;
		label?: str;
		caption?: str;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * 数値入力コンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	numberInput(options: {
		onInput?: (value: num) => void;
		default?: num;
		label?: str;
		caption?: str;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * ボタンコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	button(options: {
		text?: str;
		onClick?: () => void;
		primary?: bool;
		rounded?: bool;
		disabled?: bool;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * 複数ボタンコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	buttons(options: {
		buttons?: arr<Parameters<typeof Ui.C.button>[0]>
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * スイッチコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	switch(options: {
		onChange?: (value: bool) => void;
		default?: bool;
		label?: str;
		caption?: str;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * プルダウンコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	select(options: {
		items?: arr<{ text: str; value: str }>;
		onChange?: (value: str) => void;
		default?: str;
		label?: str;
		caption?: str;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * フォルダーコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	folder(options: {
		children?: IUiComponent<obj>;
		title?: str;
		opened?: bool;
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * 投稿フォーム表示ボタンコンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	postFormButton(options: {
		text?: str;
		primary?: bool;
		rounded?: bool;
		form?: { text: str };
	}, id?: str): IUiComponent<typeof options>;
	/**
	 * 投稿フォーム(そのもの)コンポーネント
	 * @param options - パラメーター
	 * @param id - コンポーネントID(必要であれば)
	 */
	postForm(options: {
		form?: { text: str };
	}, id?: str): IUiComponent<typeof options>;
}

declare interface Ui {
	/**
	 * rootコンポーネント
	 */
	readonly root: IUiComponent<{ children: arr<IUiComponent<obj>> }, '___root___'>;
	/**
	 * レンダー関数
	 * 
	 * `Ui.root.update({})`の糖衣構文です。
	 * @param children - コンポーネント
	 */
	render(children: arr<IUiComponent<obj>>): void;
	/**
	 * コンポーネントIDからコンポーネントを取得します。
	 * @param id - コンポーネントID
	 */
	get(id: str): IUiComponent<obj> | null;

	/**
	 * Uiコンポーネント
	 */
	readonly C: Component;
}
/**
 * Ui API
 */
declare var Ui: Ui;
