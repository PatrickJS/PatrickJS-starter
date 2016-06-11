var _should_send_ping = true;
var ports = []
var is_visible = false;
var _is_metro_mode = true;
var ping_interval = "";
var reload_count = 0;

function set_metro_mode(mode_)
{
	_is_metro_mode = mode_;
	if (mode_) 
	{
		init_metro_mode();
	}
}

function init_metro_mode()
{
	chrome.tabs.query({}, function (tabs) {
		for (i = 0 ; i < tabs.length; i ++)
		{
			chrome.pageAction.setPopup({tabId: tabs[i].id, popup: ""});
		}
	});
}

function set_ping(ping_)
{
	_should_send_ping = ping_;
}

function nikko_reload()
{
	destructor();
	chrome.runtime.reload();
}

function ping_function()
{
	if (_should_send_ping)
	{
		var queried = false;
		_has_active_tabs = false;
		chrome.windows.getCurrent({populate: true}, function (window) {		
			if (window)
			{
				var active = false;				
			}
		});
	}
}

function send_unload_prepare_message(tab)
{
	try
	{
		var tab_data = {msg_type : "unload_prepare", tab_id: tab.id};
		send_message_to_tab(tab, tab_data);
	}
	catch(err)
	{
	}
}

function get_version() {
	var nikko_url = 'nikkomsgchannel/extenstion_info?version=1';
	return '[nikko]'+nikko_url;
};

function show_icon(tid) {
  if (is_visible)
	chrome.pageAction.show(tid);
  else
	chrome.pageAction.hide(tid);
}

function set_visible(newval) {
	if (is_visible == newval)
		return;

	is_visible = newval;
	chrome.tabs.query({}, function (tabs) {
		try{
			for (i = 0 ; i < tabs.length; i ++)
			{
				var tab_data = null;
				show_icon(tabs[i].id);
			}
		}
		catch(err)
		{
		}
	});
}

var request_id = 0

function send_message_to_tab(tab, message)
{
	send_message_to_tab_internal(tab.id, message);
}

function send_message_to_tab_internal(tab_id, message)
{
	chrome.tabs.sendMessage(tab_id, {nikkodata: message}, function (response) {});
}

function set_tab_id(tab)
{
	set_tab_id_internal(tab.id);
}

function set_tab_id_internal(tab_id)
{
	var tab_data = {'msg_type' : 'set_tab_id', 'tab' : String(tab_id)};
	send_message_to_tab_internal(tab_id, tab_data);
}

function update_tab_id(tab)
{
	update_tab_id_internal(tab.id);
}

function update_tab_id_internal(tab_id)
{
	var tab_data = {'msg_type' : 'update_tab_id', 'tab' : String(tab_id)};
	send_message_to_tab_internal(tab_id, tab_data);
}

function notify_metro_icon_click(tab)
{
	try{
		var tab_data = {'msg_type' : 'metro_icon_click', 'tab' : String(tab.id)};	
		send_message_to_tab(tab, tab_data);
	}
	catch(err)
	{
		console.log(err)
	}
}

function tab_change(tab) {
	if (tab.active)
	{
		set_tab_id(tab);
	}
	show_icon(tab.id);
	
	if (_is_metro_mode)
	{
		chrome.pageAction.setPopup({tabId: tab.id, popup: ""});
	}
};

function reinject_all_tabs(show_)
{
	chrome.tabs.query({}, function (tabs) {
		for (i = 0; i < tabs.length; i ++)
		{
			try 
			{
				chrome.pageAction.setIcon({path: "rtmon_disable.png", tabId: tabs[i].id});
				if (show_)
				{
					chrome.pageAction.show(tabs[i].id);
				}
			}
			catch(err)
			{
				console.log(err);
			}
		}
	});
	
	
}

var initialize_active_tab = function()
{
	chrome.tabs.query({active: true}, function (tabs) {
		if (tabs.length > 0)
		{
			chrome.windows.getAll({populate: true}, function(w) {
				for (i = 0; i < w.length; i ++)
				{
					for (j = 0; j < w[i].tabs.length; j ++)
					{
						if (w[i].tabs[j].active)
						{
							set_tab_id_internal(w[i].tabs[j].id);
						}
					}
				}
				set_tab_id_internal(tabs[0].id);
			});
		}
	});
}

var constructor = function () {
	// Listen for any changes to the URL of any tab.
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		chrome.windows.getLastFocused({populate: false}, function (w) {	
			if (w.id == tab.windowId)
			{
				tab_change(tab);
			}
			else 
			{
				update_tab_id(tab); 
			}
		});
	});

	// Listen for any changes to the active tab.
	chrome.tabs.onActivated.addListener(function(activeInfo) {
		try {
			chrome.tabs.get(activeInfo.tabId, function (tab) {
				tab_change(tab);
			});
		}
		catch(err)
		{
		}
	});

	// Listen for any changes to the active window.
	chrome.windows.onFocusChanged.addListener(function(wId) {
		if (wId > 0)
		{
			chrome.tabs.query({ windowId: wId, active: true }, function (tabs) {
				if (tabs && tabs[0])
					tab_change(tabs[0]);
			});
		}
	});

	chrome.pageAction.onClicked.addListener(function(tab) { 
			if (_is_metro_mode)
			{
				notify_metro_icon_click(tab);
			}
		}
	);
	
	chrome.tabs.onCreated.addListener(function(tab) {
		show_icon(tab.id);
	});
	
	chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
		show_icon(tabId);
	});
}

var destructor = function () {
	chrome.tabs.onUpdated.removeListener();
	chrome.tabs.onActivated.removeListener();
	chrome.windows.onFocusChanged.removeListener();
	chrome.pageAction.onClicked.removeListener();
}

constructor();
initialize_active_tab();
reinject_all_tabs(false);
ping_interval = setInterval(ping_function, 1000);