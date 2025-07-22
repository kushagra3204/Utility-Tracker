// // Copyright (c) 2025, dummy and contributors
// // For license information, please see license.txt

frappe.ui.form.on("Electricity Management", {
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
        frm.doc.units = "KWH-Units";
    },

    refresh: function(frm) {
        frm.set_query("country", function() {
            if (frm.doc.electricity === "Other Locations") {
                return {
                    filters: {
                        name: "India"
                    }
                };
            } else if (frm.doc.electricity === "Foreign Subsidiaries") {
                return {
                    filters: [
                        ["name", "!=", "India"]
                    ]
                };
            }
            return {};
        });
        
        if (frm.doc.electricity == "Other Locations") {
            frm.set_df_property("company_location", "hidden", 1);
            frm.set_df_property("property_type", "hidden", 0);
            frm.set_df_property("address", "hidden", 0);
            frm.set_df_property("landlord", "hidden", 0);
            frm.set_df_property("agreement_status", "hidden", 0);
            frm.set_df_property("country", "hidden", 0);
            frm.set_df_property("city", "hidden", 0);
            frm.set_df_property("state", "hidden", 0);
            frm.set_df_property("month", "hidden", 0);
            frm.set_df_property("remarks", "hidden", 0);
            frm.set_df_property("units", "hidden", 0);
            frm.doc.country = "India";
        } else if (frm.doc.electricity == "Foreign Subsidiaries") {
            frm.set_df_property("company_location", "hidden", 1);
            frm.set_df_property("property_type", "hidden", 1);
            frm.set_df_property("address", "hidden", 1);
            frm.set_df_property("landlord", "hidden", 1);
            frm.set_df_property("agreement_status", "hidden", 1);
            frm.set_df_property("country", "hidden", 0);
            frm.set_df_property("city", "hidden", 1);
            frm.set_df_property("state", "hidden", 1);
            frm.set_df_property("month", "hidden", 0);
            frm.set_df_property("remarks", "hidden", 0);
            frm.set_df_property("units", "hidden", 0);
        } else {
            frm.set_df_property("company_location", "hidden", 0);
            frm.set_df_property("property_type", "hidden", 1);
            frm.set_df_property("address", "hidden", 1);
            frm.set_df_property("landlord", "hidden", 1);
            frm.set_df_property("agreement_status", "hidden", 1);
            frm.set_df_property("country", "hidden", 1);
            frm.set_df_property("city", "hidden", 1);
            frm.set_df_property("state", "hidden", 1);
            frm.set_df_property("month", "hidden", 0);
            frm.set_df_property("remarks", "hidden", 0);
            frm.set_df_property("units", "hidden", 0);
        }

        frm.set_query("city", function() {
            if (!frm.doc.state) {
                frappe.msgprint("Please select a State first.");
                return {};
            }
            return {
                filters: {
                    state: frm.doc.state
                }
            };
        });
        frm.doc.units = "KWH-Units";
    },

    electricity: function(frm) {
        Object.keys(frm.doc).forEach(function(key) {
            if (key !== 'electricity' && frm.fields_dict[key]) {
                frm.set_value(key, null);
            }
        });

        frm.set_query("country", function() {
            if (frm.doc.electricity === "Other Locations") {
                return {
                    filters: {
                        name: "India"
                    }
                };
            } else if (frm.doc.electricity === "Foreign Subsidiaries") {
                return {
                    filters: [
                        ["name", "!=", "India"]
                    ]
                };
            }
            return {};
        });

        if (frm.doc.electricity === "Other Locations") {
            frm.set_value("country", "India");
        }
        
        if (frm.doc.electricity == "Other Locations") {
            frm.set_df_property("company_location", "hidden", 1);
            frm.set_df_property("property_type", "hidden", 0);
            frm.set_df_property("address", "hidden", 0);
            frm.set_df_property("landlord", "hidden", 0);
            frm.set_df_property("agreement_status", "hidden", 0);
            frm.set_df_property("country", "hidden", 0);
            frm.set_df_property("city", "hidden", 0);
            frm.set_df_property("state", "hidden", 0);
            frm.set_df_property("month", "hidden", 0);
            frm.set_df_property("remarks", "hidden", 0);
            frm.set_df_property("units", "hidden", 0);
        } else if (frm.doc.electricity == "Foreign Subsidiaries") {
            frm.set_df_property("company_location", "hidden", 1);
            frm.set_df_property("property_type", "hidden", 1);
            frm.set_df_property("address", "hidden", 1);
            frm.set_df_property("landlord", "hidden", 1);
            frm.set_df_property("agreement_status", "hidden", 1);
            frm.set_df_property("country", "hidden", 0);
            frm.set_df_property("city", "hidden", 1);
            frm.set_df_property("state", "hidden", 1);
            frm.set_df_property("month", "hidden", 0);
            frm.set_df_property("remarks", "hidden", 0);
            frm.set_df_property("units", "hidden", 0);
        } else {
            frm.set_df_property("company_location", "hidden", 0);
            frm.set_df_property("property_type", "hidden", 1);
            frm.set_df_property("address", "hidden", 1);
            frm.set_df_property("landlord", "hidden", 1);
            frm.set_df_property("agreement_status", "hidden", 1);
            frm.set_df_property("country", "hidden", 1);
            frm.set_df_property("city", "hidden", 1);
            frm.set_df_property("state", "hidden", 1);
            frm.set_df_property("month", "hidden", 0);
            frm.set_df_property("remarks", "hidden", 0);
            frm.set_df_property("units", "hidden", 0);
        }
        frm.doc.units = "KWH-Units";
    },

    property_type: function(frm) {
        findLandlordData(frm);
    },
    company: function(frm) {
        findLandlordData(frm);
    },
    state: function(frm) {
        frm.set_value("city", "");
    },
    city: function(frm) {
        findLandlordData(frm);
    },
    country: function(frm) {
        frm.set_value("state", "");
        frm.set_value("city", "");
        frm.set_query("company", function() {
            if (!frm.doc.country) {
                frappe.msgprint("Please select a Country first.");
                return {};
            }
            return {
                filters: {
                    country: frm.doc.country
                }
            };
        });
    },
});

function findLandlordData(frm) {
    frm.set_value("landlord","");
    frm.set_value("address","");
    frm.set_value("agreement_status","");
    
    if (frm.doc.company && frm.doc.state && frm.doc.city && frm.doc.property_type) {
        frappe.call({
            method: "utility_tracker.utility_tracker.doctype.master_agreement.master_agreement.get_agreement_details",
            args: {
                company: frm.doc.company,
                state: frm.doc.state,
                city: frm.doc.city,
                property_type: frm.doc.property_type
            },
            callback: function(r) {
                if (r.message) {
                    frm.set_value("landlord", r.message.landlord);
                    frm.set_value("address", r.message.address);
                    frm.set_value("agreement_status", r.message.agreement_status);
                }
            }
        });
    }
}