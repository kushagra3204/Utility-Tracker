// Copyright (c) 2025, dummy and contributors
// For license information, please see license.txt

frappe.ui.form.on("Fuel Management", {
    onload: function(frm) {
        const fieldname = 'month';

        let $wrapper = $(frm.fields_dict[fieldname].wrapper);
        
        $wrapper.find('.control-input').remove();
        $wrapper.find('.help-box').remove();

        let $control_input_div = $wrapper.find('.control-input-wrapper');
        $control_input_div.find('input').remove();

        let $monthInput = $('<input type="month" class="input-with-feedback form-control">');
        $control_input_div.append($monthInput);

        if (frm.doc[fieldname]) {
            const existingDate = frappe.datetime.str_to_obj(frm.doc[fieldname]);
            if (existingDate) {
                const year = existingDate.getFullYear();
                const month = (existingDate.getMonth() + 1).toString().padStart(2, '0');
                $monthInput.val(`${year}-${month}`);
            }
        }

        $monthInput.on('change', function() {
            const selected = $(this).val();
            if (selected) {
                const firstDate = `${selected}-01`;
                frm.set_value(fieldname, firstDate);
            }
        });

        frm.refresh_field(fieldname);
        
        frm.set_query("employee_code", function() {
            return {
                filters: {
                    car: 1
                }
            };
        });
    },
    fuel_type : function(frm){
        if (frm.doc.fuel_type) {
            frappe.db.get_value("Master Fuel Type", frm.doc.fuel_type, "unit")
                .then(r => {
                    if (r.message && r.message.unit) {
                        frm.set_value("unit", r.message.unit);
                    } else {
                        frm.set_value("unit", null);
                    }
                });
        } else {
            frm.set_value("unit", null);
        }
    },
    gas_type : function(frm){
        if (frm.doc.gas_type) {
            frappe.db.get_value("Master Gas Type", frm.doc.gas_type, "unit")
                .then(r => {
                    if (r.message && r.message.unit) {
                        frm.set_value("unit", r.message.unit);
                    } else {
                        frm.set_value("unit", null);
                    }
                });
        } else {
            frm.set_value("unit", null);
        }
    },
	refresh: function(frm) {
        if(frm.doc.fuel == "Employee Fuel") {
            frm.set_df_property("fuel_type","hidden",0);
            frm.set_df_property("gas_type","hidden",1);
            frm.set_df_property("employee_code","hidden",0);
            frm.set_df_property("fuel_gross","hidden",0);
            frm.set_df_property("location","hidden",1);
            frm.set_df_property("company_name","hidden",1);
            frm.set_df_property("month","hidden",1);
        } else if(frm.doc.fuel == "HSD Consumption") {
            frm.set_df_property("fuel_type","hidden",0);
            frm.set_df_property("gas_type","hidden",1);
            frm.set_df_property("employee_code","hidden",1);
            frm.set_df_property("fuel_gross","hidden",1);
            frm.set_df_property("location","hidden",0);
            frm.set_df_property("company_name","hidden",0);
            frm.set_df_property("month","hidden",0);
        } else {
            frm.set_df_property("fuel_type","hidden",1);
            frm.set_df_property("gas_type","hidden",0);
            frm.set_df_property("employee_code","hidden",1);
            frm.set_df_property("fuel_gross","hidden",1);
            frm.set_df_property("location","hidden",1);
            frm.set_df_property("company_name","hidden",0);
            frm.set_df_property("month","hidden",0);
        }
	},

    fuel: function(frm) {
        Object.keys(frm.doc).forEach(function(key) {
            if (key !== 'fuel' && frm.fields_dict[key]) {
                frm.set_value(key, null);
            }
        });

        if(frm.doc.fuel == "Employee Fuel") {
            frm.set_df_property("fuel_type","hidden",0);
            frm.set_df_property("gas_type","hidden",1);
            frm.set_df_property("employee_code","hidden",0);
            frm.set_df_property("fuel_gross","hidden",0);
            frm.set_df_property("location","hidden",1);
            frm.set_df_property("company_name","hidden",1);
            frm.set_df_property("month","hidden",1);
        } else if(frm.doc.fuel == "HSD Consumption") {
            frm.set_df_property("fuel_type","hidden",0);
            frm.set_df_property("gas_type","hidden",1);
            frm.set_df_property("employee_code","hidden",1);
            frm.set_df_property("fuel_gross","hidden",1);
            frm.set_df_property("location","hidden",0);
            frm.set_df_property("company_name","hidden",0);
            frm.set_df_property("month","hidden",0);
        } else {
            frm.set_df_property("fuel_type","hidden",1);
            frm.set_df_property("gas_type","hidden",0);
            frm.set_df_property("employee_code","hidden",1);
            frm.set_df_property("fuel_gross","hidden",1);
            frm.set_df_property("location","hidden",1);
            frm.set_df_property("company_name","hidden",0);
            frm.set_df_property("month","hidden",0);
        }
    }

});