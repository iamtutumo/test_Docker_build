import './icon.html';
const { Icon } = DesignSystem;

const getSourceName = (source, name) => {
	var foo;
	foo = name != null ? name.split(".") : void 0;
	if (foo && foo.length > 1) {
	  return foo[0];
	}
	if (source != null ? source.endsWith("-sprite") : void 0) {
	  return source.substr(0, source.length - 7);
	}
};

Template.steedos_icon.helpers({
	component: function () {
		return Icon;
	},
	data: function () {
		let assistiveText;
		if(this.assistiveText){
			assistiveText = this.assistiveText;
		}
		else if(this.title){
			assistiveText = { label: this.title }
		}
		return Object.assign({}, {...this}, {
			title: this.title || this.label,
			category: this.category || getSourceName(this.source, this.name),
			className: this.className || this.class,
			assistiveText
		}, {component: Icon})
	}
	// component: function () {
	// 	return Icon;
	// },
	// category: function () {
	// 	return this.category || getSourceName(this.source, this.name);
	// },
	// name: function () {
	// 	return this.name;
	// },
	// size: function () {
	// 	return this.size;
	// },
	// title: function () {
	// 	return this.title;
	// },
	// // icon: function () {
	// // 	return this.icon;
	// // },
	// colorVariant: function () {
	// 	return this.colorVariant;
	// },
	// className: function () {
	// 	return this.className || this.class;
	// },
	// containerClassName: function () {
	// 	return this.containerClassName;
	// },
	// style: function () {
	// 	return this.style;
	// },
	// containerStyle: function () {
	// 	return this.containerStyle;
	// },
	// assistiveText: function () {
	// 	if(this.assistiveText){
	// 		return this.assistiveText;
	// 	}
	// 	else if(this.title){
	// 		return { label: this.title }
	// 	}
	// }
});
