
class Dns {
  selectors = {
    add_new_entry_button: `.js-add-new-dns`,
    dns_container: `.js-dns-container`,
    delete_button: `.js-delete-row`,
    save_button: `.js-save`,
    ip_elements: `.js-ip`,
    form: `#dns-form`
  };

  constructor () {
    this.init();
  }

  init () {
    this.initAddDnsClickListener();
    this.initDeleteDnsClickListener();
    this.initSaveClickListener();
  }

  initAddDnsClickListener () {

    $(this.selectors.add_new_entry_button).on('click', () => {
      this.getNewRow();
    });
  }

  getNewRow () {
    let self = this;

    $.ajax({
      type: 'get',
      url: '/get-new-dns-row',
      data: {},
      dataType: 'json',
      success: function (data) {
        $(self.selectors.dns_container).append(data.html);
      },
      error: function () {
        console.log(`An error occurred.`);
      }
    });
  }

  initDeleteDnsClickListener () {
    let self = this;

    $(this.selectors.dns_container).on('click', this.selectors.delete_button, function () {
      let exists = $(this).data('exists'),
        id = $(this).data('id'),
        parent = $(this).parents(`.js-dns-row-${id}`);

      self.removeRow(exists, id, parent);
    });
  }

  removeRow (rowExists, id, parent) {
    if (rowExists === 0 && id === 0) {
      parent.remove();
      return;
    }

    $.ajax({
      type: 'get',
      url: `/delete-dns-record/${id}`,
      data: {},
      dataType: 'json',
      success: function (data) {
        parent.remove();
        alert(data.message);
      },
      error: function () {
        console.log(`Delete dns error`);
      }
    });
  }

  initSaveClickListener () {
    $(this.selectors.save_button).on('click', () => {
      if (!this.validForm()) {
        alert("The form is not valid.");
        return;
      }

      $.ajax({
        type: 'post',
        url: `/save-dns-records/${window.Laravel.domainID}`,
        headers: {
          'X-CSRF-TOKEN': window.Laravel.csrfToken
        },
        data: $(this.selectors.form).serializeArray(),
        dataType: 'json',
        success: function (data) {
          alert(data.message);
          window.location.reload();
        },
        error: function (xhr) {
          alert(xhr.responseJSON.message);
        }
      });
    });
  }

  validForm () {
    let validationRule = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    let isValid = true;

    $(this.selectors.ip_elements).each(function (idx, elem) {
      $(elem).removeClass('is-invalid');
      $(elem).next().remove();

      let value = $(elem).val();

      if (validationRule.test(value)) {
        return;
      }

      isValid = false;
      $(elem).addClass('is-invalid');
      $(elem).after(`<div class="invalid-feedback">This is not a valid IP address.</div>`);
    });

    return isValid;
  }
}

new Dns();