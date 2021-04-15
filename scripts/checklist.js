(function (window) {
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery;

  function CheckList(selector) {
    if (!selector) { throw new Error("No selector provided"); }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addClickHandler = function(fn) {
    this.$element.on('click', 'input', function(event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  };
  
  CheckList.prototype.addRow = function(data) {
    var rowElement = new Row(data);
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function(email) { 
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-questions="checkbox"]')
      .remove();
  };

  function Row(order) {    
    var $div = $('<div></div>', {
      'data-questions': 'checkbox', class: 'checkbox'
    });
    
    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: order.emailAddress
    });

    var desc = order.size + ' ';
    if (order.flavor) {
      desc += order.flavor + ' ';
    }

    desc += order.coffee + ', '
         + ' (' + order.emailAddress + ')'
         + ' [' + order.strength + 'x]';

    $label.append($checkbox);
    $label.append(desc);
    $div.append($label);

    this.$element = $div;
  }

  App.CheckList = CheckList;
  window.App = App;

})(window);