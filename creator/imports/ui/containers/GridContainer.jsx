// import React from 'react';
const { Grid, store } = BuilderCreator

var iconPath = `/assets/icons`;
var gridObjectName = 'space_users';
var gridColumns = [
	{
		field: 'name',
		label: 'Name',
		hidden: false,
		onClick: function () {
			console.log(111);
		},
		renderCell: function () { }
	},
	{
		field: 'mobile',
		label: 'Phone number',

	},
	{
		field: 'email',
		label: 'Email address',

	},
	{
		field: 'modified_by',
		label: 'Modifier',
		type: 'lookup'
	},
	{
		field: 'modified',
		label: 'Change the time',
		type: 'datetime'
	},
];

function GridContainer(){
	const Provider = ReactRedux.Provider;
	return 
			<Provider store={store}>
				<Grid objectName={gridObjectName} columns={gridColumns} selectRows='checkbox' enableSearch={true}></Grid>
			</Provider>
		
}

export default GridContainer;