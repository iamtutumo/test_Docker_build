// import React from 'react';
const { List, Bootstrap, store } = BuilderCreator

function ListContainer(prop){
	const Provider = ReactRedux.Provider;
	if(!prop.listProps){
		return null;
	}
	return (
		<Provider store={store}>
			<Bootstrap>
				<List id={prop.id} {...prop.listProps}/>
			</Bootstrap>
		</Provider>
	)
}

export default ListContainer;