declare const USER_ID: str | null;
declare const USER_NAME: str | null;
declare const USER_USERNAME: str | null;

interface IEmoji {
	id: str;
	aliases: arr<str>;
	name: str;
	category: str;
	host: str | null;
	url: str;
	license: str;
	isSensitive: bool;
	localOnly: bool;
	roleIdsThatCanBeUsedThisEmojiAsReaction: arr;
	roleIdsThatCanNotBeUsedThisEmojiAsReaction: arr;
}
declare const CUSTOM_EMOJIS: arr<IEmoji>;

declare const LOCALE: str;
declare const SERVER_URL: str;

type ModalIconType = 'info' | 'success' | 'warn' | 'error' | 'question';
declare namespace Mk {
	function dialog(title: str, text: str, type?: ModalIconType): null;
	function confirm(title: str, text: str, type?: ModalIconType): bool;
	function api(endpoint: str, params: obj, token?: str): obj | Error;
	function save(key: str, value: value): null;
	function load(key: str): value;
	function url(): str;
	function nyaize(text: str): str;
}

declare namespace Plugin {
	const config: obj;
	function register_post_form_action(title: str, fn: (form: { text: str, cw: str }, update: (key: 'text' | 'cw', value: str) => void) => void): void;
	function register_note_action(title: str, fn: (user: obj) => void): void;
	function register_user_action(title: str, fn: (note: obj) => void): void;
	function register_note_view_interruptor(fn: (note: obj) => obj | void): void;
	function register_note_post_interruptor(fn: (note: obj) => obj): void;
	function register_page_view_interruptor(fn: (page: obj) => obj): void;
	function open_url(url: str): void;
}

declare namespace Ui {
	interface IUiComponent<T extends obj, I extends str = str> {
		id: I;
		update: (options: T) => void;
	}

	const root: IUiComponent<{ children: arr<IUiComponent<obj>> }, '___root___'>
	function render(children: arr<IUiComponent<obj>>);
	function get(id: str): IUiComponent<obj> | null;

	namespace C {
		function container(options: {}, id?: str): IUiComponent<typeof options>;
		function text(options: {}, id?: str): IUiComponent<typeof options>;
		function mfm(options: {}, id?: str): IUiComponent<typeof options>;
		function text(options: {}, id?: str): IUiComponent<typeof options>;
		function textarea(options: {}, id?: str): IUiComponent<typeof options>;
		function textInput(options: {}, id?: str): IUiComponent<typeof options>;
		function numberInput(options: {}, id?: str): IUiComponent<typeof options>;
		function button(options: {}, id?: str): IUiComponent<typeof options>;
		function buttons(options: {}, id?: str): IUiComponent<typeof options>;
		//function switch(options: {}, id?: str): IUiComponent<typeof options>;
		function folder(options: {}, id?: str): IUiComponent<typeof options>;
		function postFormButton(options: {}, id?: str): IUiComponent<typeof options>;
		function postForm(options: {}, id?: str): IUiComponent<typeof options>;
	}
}
