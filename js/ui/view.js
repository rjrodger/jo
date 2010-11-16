/**
	joView
	=======
	
	Base class for all other views, containers, controls and other visual doo-dads.
	
	Use
	-----
	
		var x = new joView(data);
	
	Where `data` is either a text or HTML string, an HTMLElement, or any joView object
	or subclass.
		
	Methods
	-------
	
	- `setData(data)`
	- `getData()`
	- `createContainer(type, classname)`
	- `setContainer(HTMLElement)`
	- `getContainer()`
	- `clear()`
	- `refresh()`
	- `attach(HTMLElement or joView)`
	- `detach(HTMLElement or joView)`
	
*/
joView = function(data) {
	this.changeEvent = new joSubject(this);

	this.setContainer();

	if (data)
		this.setData(data);
};
joView.prototype = {
	tagName: "joview",
	busyNode: null,
	container: null,
	data: null,
	
	getContainer: function() {
		return this.container;
	},

	setContainer: function(container) {
		this.container = joDOM.get(container);
			
		if (!this.container)
			this.container = this.createContainer();
		
		this.setEvents();
		
		return this;
	},
	
	createContainer: function() {
		return joDOM.create(this);
	},

	clear: function() {
		this.data = "";
		
		if (this.container)
			this.container.innerHTML = "";

		this.changeEvent.fire();
	},

	setData: function(data) {
		this.data = data;
		this.refresh();
		
		return this;
	},

	getData: function() {
		return this.data;
	},

	refresh: function() {
		if (!this.container || typeof this.data == "undefined")
			return 0;

		this.container.innerHTML = "";
		this.draw();

		this.changeEvent.fire(this.data);
	},

	draw: function() {
		this.container.innerHTML = this.data;
	},
	
	setStyle: function(style) {
		joDOM.setStyle(this.container, style);
		
		return this;
	},
	
        addCSSClass: function(classname) {
		joDOM.addCSSClass(this.container, classname);
		return this;
	},

	removeCSSClass: function(classname) {
		joDOM.removeCSSClass(this.container, classname);
		return this;
	},

	toggleCSSClass: function(classname) {
		joDOM.toggleCSSClass(this.container, classname);
		return this;
	},

	attach: function(parent) {
		if (!this.container)
			return this;
		
		var node = joDOM.get(parent) || document.body;
		node.appendChild(this.container);
		
		return this;
	},
	
	detach: function(parent) {
		if (!this.container)
			return this;

		var node = joDOM.get(parent) || document.body;
		
		if (this.container && this.container.parentNode === node)
			node.removeChild(this.container);
		
		return this;
	},
		
	setEvents: function() {}
};
