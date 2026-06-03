type ViewElement = Element & {
	parentNode?: Node | null;
};

type ViewLike = {
	displayed?: boolean;
	element: ViewElement;
	section?: {
		index: number;
	};
	destroy(): void;
	hide(): void;
	show(): void;
};

type SectionLike = {
	index: number;
};

class Views {
	container: Element | undefined;
	_views: ViewLike[];
	length: number;
	hidden: boolean;

	constructor(container?: Element) {
		this.container = container;
		this._views = [];
		this.length = 0;
		this.hidden = false;
	}

	all(): ViewLike[] {
		return this._views;
	}

	first(): ViewLike | undefined {
		return this._views[0];
	}

	last(): ViewLike | undefined {
		return this._views[this._views.length-1];
	}

	indexOf(view: ViewLike): number {
		return this._views.indexOf(view);
	}

	slice(...args: Parameters<ViewLike[]["slice"]>): ViewLike[] {
		return this._views.slice.apply(this._views, args);
	}

	get(i: number): ViewLike | undefined {
		return this._views[i];
	}

	append(view: ViewLike): ViewLike {
		this._views.push(view);
		if(this.container){
			this.container.appendChild(view.element);
		}
		this.length++;
		return view;
	}

	prepend(view: ViewLike): ViewLike {
		this._views.unshift(view);
		if(this.container){
			this.container.insertBefore(view.element, this.container.firstChild);
		}
		this.length++;
		return view;
	}

	insert(view: ViewLike, index: number): ViewLike {
		this._views.splice(index, 0, view);

		if(this.container){
			if(index < this.container.children.length){
				this.container.insertBefore(view.element, this.container.children[index]);
			} else {
				this.container.appendChild(view.element);
			}
		}

		this.length++;
		return view;
	}

	remove(view: ViewLike): void {
		var index = this._views.indexOf(view);

		if(index > -1) {
			this._views.splice(index, 1);
		}


		this.destroy(view);

		this.length--;
	}

	destroy(view: ViewLike): void {
		view.destroy();
		
		if(this.container){
			 this.container.removeChild(view.element);
		}
		view = null;
	}

	// Iterators

	forEach(...args: Parameters<ViewLike[]["forEach"]>): void {
		return this._views.forEach.apply(this._views, args);
	}

	clear(): void {
		// Remove all views
		var view;
		var len = this.length;

		if(!this.length) return;

		for (var i = 0; i < len; i++) {
			view = this._views[i];
			this.destroy(view);
		}

		this._views = [];
		this.length = 0;
	}

	find(section: SectionLike): ViewLike | undefined {

		var view;
		var len = this.length;

		for (var i = 0; i < len; i++) {
			view = this._views[i];
			if(view.displayed && view.section.index == section.index) {
				return view;
			}
		}

	}

	displayed(): ViewLike[] {
		var displayed = [];
		var view;
		var len = this.length;

		for (var i = 0; i < len; i++) {
			view = this._views[i];
			if(view.displayed){
				displayed.push(view);
			}
		}
		return displayed;
	}

	show(): void {
		var view;
		var len = this.length;

		for (var i = 0; i < len; i++) {
			view = this._views[i];
			if(view.displayed){
				view.show();
			}
		}
		this.hidden = false;
	}

	hide(): void {
		var view;
		var len = this.length;

		for (var i = 0; i < len; i++) {
			view = this._views[i];
			if(view.displayed){
				view.hide();
			}
		}
		this.hidden = true;
	}
}

export default Views;
