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
declare interface Mk {
	dialog(title: str, text: str, type?: ModalIconType): null;
	confirm(title: str, text: str, type?: ModalIconType): bool;
	api(endpoint: str, params: obj, token?: str): obj | Error;
	save(key: str, value: value): null;
	load(key: str): value;
	url(): str;
	nyaize(text: str): str;
}
declare var Mk: Mk;

declare interface Plugin {
	readonly config: obj;
	register_post_form_action(title: str, fn: (form: { text: str, cw: str }, update: (key: 'text' | 'cw', value: str) => void) => void): void;
	register_note_action(title: str, fn: (user: obj) => void): void;
	register_user_action(title: str, fn: (note: obj) => void): void;
	register_note_view_interruptor(fn: (note: obj) => obj | void): void;
	register_note_post_interruptor(fn: (note: obj) => obj): void;
	register_page_view_interruptor(fn: (page: obj) => obj): void;
	open_url(url: str): void;
}
declare var Plugin: Plugin;

interface IUiComponent<T extends obj, I extends str = str> {
	id: I;
	update: (options: T) => void;
}

interface Component {
	container(options: {}, id?: str): IUiComponent<typeof options>;
	text(options: {}, id?: str): IUiComponent<typeof options>;
	mfm(options: {}, id?: str): IUiComponent<typeof options>;
	text(options: {}, id?: str): IUiComponent<typeof options>;
	textarea(options: {}, id?: str): IUiComponent<typeof options>;
	textInput(options: {}, id?: str): IUiComponent<typeof options>;
	numberInput(options: {}, id?: str): IUiComponent<typeof options>;
	button(options: {}, id?: str): IUiComponent<typeof options>;
	buttons(options: {}, id?: str): IUiComponent<typeof options>;
	switch(options: {}, id?: str): IUiComponent<typeof options>;
	folder(options: {}, id?: str): IUiComponent<typeof options>;
	postFormButton(options: {}, id?: str): IUiComponent<typeof options>;
	postForm(options: {}, id?: str): IUiComponent<typeof options>;
}

declare interface Ui {
	readonly root: IUiComponent<{ children: arr<IUiComponent<obj>> }, '___root___'>;
	render(children: arr<IUiComponent<obj>>): void;
	get(id: str): IUiComponent<obj> | null;

	readonly C: Component;
}
declare var Ui: Ui;
