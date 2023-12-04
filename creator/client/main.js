import("./browser");
require("./tailwind.css");
require("./theme.less");

import("./main.html");

// Global variable import

const { registerWindowLibraries, registerDefaultPlugins } = BuilderCreator
registerWindowLibraries();
window["ReactDom"] = ReactDOM;
registerDefaultPlugins();

 // Import the component to use it normally in creatorimport * as UI from '../imports/ui';

BlazeLayout.setRoot('body');


Template.preloadAssets.helpers({
    absoluteUrl(url){
        return Steedos.absoluteUrl(url)
    }
});

Meteor.startup(function(){
    $('head').append('<link rel="shortcut icon" href="'+Steedos.absoluteUrl('/favicon.ico')+'">');
    $('head').append('<link rel="manifest" href="'+Steedos.absoluteUrl('/manifest.json')+'" />');
    if (Steedos.isMobile() && Meteor.settings.public && Meteor.settings.public.tenant && Meteor.settings.public.tenant.enable_mobile == false) {
        $('head meta[name=viewport]').remove();
        $('head').append('<meta name="viewport" content="">');
    } else if (screen.width>360){
        // Automatic zoom is deactivated on mobile phones, and there is also a problem on iPad
        // $('head meta[name=viewport]').remove();
        // $('head').append('<meta name="viewport" content="user-scalable=no, initial-scale=1.1, maximum-scale=1.1, minimum-scale=1.1">');        
    }
});
