import {UserModel} from "./../../model/user"
const userModel = new UserModel()
// Form-Validation.js
// ====================================================================
// This file should not be included in your project.
// This is just a sample how to initialize plugins or components.
//
// - ThemeOn.net -


$(document).ready(function() {


	// FORM VALIDATION
	// =================================================================
	// Require Bootstrap Validator
	// http://bootstrapvalidator.com/
	// =================================================================


	// FORM VALIDATION FEEDBACK ICONS
	// =================================================================
	var faIcon = {
		valid: 'fa fa-check-circle fa-lg text-success',
		invalid: 'fa fa-times-circle fa-lg',
		validating: 'fa fa-refresh'
	}


	// FORM VALIDATION ON ACCORDION
	// =================================================================
	$('#demo-bv-accordion').bootstrapValidator({
		message: 'This value is not valid',
		excluded: ':disabled',
		feedbackIcons: faIcon,
		fields: {
            firstName: {
                validators: {
                    notEmpty: {
                        message: 'The first name is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[A-Z\s]+$/i,
                        message: 'The first name can only consist of alphabetical characters and spaces'
                    }
                }
            },
            lastName: {
                validators: {
                    notEmpty: {
                        message: 'The last name is required and cannot be empty'
                    },
                    regexp: {
                        regexp: /^[A-Z\s]+$/i,
                        message: 'The last name can only consist of alphabetical characters and spaces'
                    }
                }
            },
            user_name: {
                message: '姓名不能为空',
                validators: {
                    notEmpty: {
                        message: '姓名不能为空'
                    },
                    stringLength: {
                        min: 4,
                        max: 30,
                        message: 'The username must be more than 4 and less than 30 characters long'
                    },
                    regexp: {
                        regexp: /^[a-zA-Z0-9_\.]+$/,
                        message: 'The username can only consist of alphabetical, number, dot and underscore'
                    }
                }
            },
            email: {
                validators: {
                    notEmpty: {
                        message: 'The email address is required and cannot be empty'
                    },
                    emailAddress: {
                        message: 'The input is not a valid email address'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: 'The password is required and cannot be empty'
                    },
                    different: {
                        field: 'username',
                        message: 'The password cannot be the same as username'
                    }
                }
            },
            memberType: {
                validators: {
                    notEmpty: {
                        message: 'The gender is required'
                    }
                }
            },
            bio:{
                validators: {
                    notEmpty: {
                        message: 'The bio is required and cannot be empty'
                    },
                }
            },
            phoneNumber: {
                validators: {
                    notEmpty: {
                        message: 'The phone number is required and cannot be empty'
                    },
                    digits: {
                        message: 'The value can contain only digits'
                    }
                }
            },
            city:{
                validators: {
                    notEmpty: {
                        message: 'The city is required and cannot be empty'
                    },
                }
            }
		}
	}).on('status.field.bv', function(e, data) {
		var $form = $(e.target),
		validator = data.bv,
		$collapsePane = data.element.parents('.collapse'),
		colId = $collapsePane.attr('id');

		if (colId) {
		var $anchor = $('a[href="#' + colId + '"][data-toggle="collapse"]');
		var $icon = $anchor.find('i');

		// Add custom class to panel containing the field
		if (data.status == validator.STATUS_INVALID) {
			$anchor.addClass('bv-col-error');
			$icon.removeClass(faIcon.valid).addClass(faIcon.invalid);
		} else if (data.status == validator.STATUS_VALID) {
			var isValidCol = validator.isValidContainer($collapsePane);
			if (isValidCol) {
				$anchor.removeClass('bv-col-error');
			}else{ 
				$anchor.addClass('bv-col-error');
			}
			$icon.removeClass(faIcon.valid + " " + faIcon.invalid).addClass(isValidCol ? faIcon.valid : faIcon.invalid);
		}
		}
	});


	// FORM VALIDATION CUSTOM ERROR CONTAINER
	// =================================================================
	// Indicate where the error messages are shown.
	// Tooltip, Popover, Custom Container.
	// =================================================================
    $("#add_User").on("click",async function(){
        console.log($("#demo-bv-accordion").serialize())
        const res = await userModel.insUser($("#demo-bv-accordion").serialize())
        alert(res)

    })


	// MASKED INPUT
	// =================================================================
	// Require Masked Input
	// http://digitalbush.com/projects/masked-input-plugin/
	// =================================================================




});
