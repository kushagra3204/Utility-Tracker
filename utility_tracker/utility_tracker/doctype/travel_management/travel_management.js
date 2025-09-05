// Copyright (c) 2025, Meril and contributors
// For license information, please see license.txt

frappe.ui.form.on("Travel Management", {
    country: function(frm) {
        frm.set_query("company", function() {
            return {
                filters: {
                    country: frm.doc.country
                }
            };
        });
    },
    distance_travelled: function(frm) {
        if(frm.doc.distance_travelled < 0) {
            frm.set_value("distance_travelled", null);
            frappe.throw("Distance cannot be less than zero")
        }
    },
    no_of_trips: function(frm) {
        if(frm.doc.no_of_trips < 0) {
            frm.set_value("no_of_trips", null);
            frappe.throw("No of trips cannot be less than zero")
        }
    }
});
