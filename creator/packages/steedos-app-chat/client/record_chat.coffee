Template.steedos_record_chat.onCreated ->
	console.log('record_chat created', this.data);
#
##	if !this.data.object_name or !this.data.record_id
##		throw new Meteor.Error('500', 'Missing required parameters: object_name, record_id')