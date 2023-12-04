 ### Amis plugin
- Support Amis rendering Page
- Support Amis editor


### monaco worker
- When requiring amis, amis sdk will add the MonacoEnvironment function to the window to handle monaco workers.
- steedos provides the default monaco worker processor window.SteedosMonacoEnvironment
- If you need to use the monaco worker provided by steedos, please add the code `window.MonacoEnvironment = window.SteedosMonacoEnvironment;` after requie amis