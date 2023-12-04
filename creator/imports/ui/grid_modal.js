import './grid_modal.html';
const { store, viewStateSelector, createGridModalAction } = BuilderCreator
import GridModalContainer from './containers/GridModal'
var _ = require("underscore");

var gridModalProp = new ReactiveVar({heading: "list", appElement: 'body'});

Template.gridModal.helpers({
	component: function(){
		return GridModalContainer;
	},
	gridModalProp: function(){
		return gridModalProp.get();
	}
});

Template.gridModal.show = function(options){
	if(options){
		if(options.onConfirm){
			var gridProp = options.gridProp;
			var onConfirm = options.onConfirm;
			options.onConfirm = function(){
				if(_.isFunction(onConfirm)){
					onConfirm(viewStateSelector(store.getState(), gridProp.id).selection);
				}
			}
		}
		gridModalProp.set(options);
	}

	Meteor.defer(function(){
		store.dispatch(createGridModalAction('isOpen', true, {id: options.id}))
	});
};