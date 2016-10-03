(function ( $ ) { 
    $.fn.myKeyboardNavigatorPlugin = function( options ) {	
	    var selectors = options.selector.join(',');
		$(document ).ready(function() {
			//adding tab indexes to the given DOM options, so they can be tabbed using keyboard.
			//var theDOMElements = $('*');//Only the Selected Options need to be tabable.//
			var theDOMElements = $(selectors);//Only the Selected Options need to be tabable.
			var tab_index = 0;
			$(selectors).each( function( index, element ) {
				$(this).attr( "tabindex", tab_index );
				++tab_index;
			});
		});
		
		document.onkeydown = checkKey;
		function checkKey(e) {
			e = e || window.event;
			if (e.keyCode == '37') {
				//left arrow pressed
				switchToPreviousElement();
			} else if (e.keyCode == '39') {
				//right arrow pressed
				switchToNextElement();
			} else if (e.keyCode == '74') {
				//j pressed
				switchToPreviousElement();
			} else if (e.keyCode == '75') {
				//k pressed
				switchToNextElement();
			} 			
		}
		
		function switchToPreviousElement() {
			var tab_index = getCurrentTabIndex();
			//faux optimization, pre vs post increment.
			--tab_index;
			focusOnNextElement(tab_index);
		}
		
		function switchToNextElement() {
			var tab_index = getCurrentTabIndex();
			++tab_index;
			focusOnNextElement(tab_index);
		}
		
		function getCurrentTabIndex() {
			var current_element = $(document.activeElement);
			var tab_index = current_element.attr('tabindex');
			return tab_index;
		}
		
		function focusOnNextElement(tab_index) {
			//If this is the first key press, default to 0.
			if (isNaN(tab_index)) tab_index = 0;
			$('[tabindex=' + tab_index + ']').focus();
		}
    };
	
}( jQuery ));