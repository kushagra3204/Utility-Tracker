# Copyright (c) 2025, Meril and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class MasterAgreement(Document):
	pass

import frappe
from frappe import _

@frappe.whitelist()
def get_agreement_details(company, state, city, property_type):
    doc = frappe.get_all("Master Agreement",
        filters={
            "company_name": company,
            "state": state,
            "city": city,
            "property_type": property_type
        },
        fields=["landlord", "address", "agreement_status"],
        limit=1
    )

    if doc:
        return doc[0]
    else:
        return frappe.throw(_("No matching Master Agreement found."))
