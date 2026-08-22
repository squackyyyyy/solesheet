## MODIFIED Requirements

### Requirement: Quick Sale depicts the minimum sale workflow
The Quick Sale image SHALL depict one combined search covering model, size, and colorway; one selected sellable pair; read-only size, colorway, and cost facts; a dominant selling-price value; an editable sold date shown as today; Paid in full and Installment choices; and the appropriate sale action. As the default gallery destination, it SHALL lead with a deterministic paid-in-full before-and-after result that makes the relationship **sale recorded → stock updated → profit calculated** visible without accepting visitor input. The depicted result SHALL use the same selected pair and sale values as its entry context, and its visible supporting copy and concise equivalent description SHALL communicate the same outcome.

#### Scenario: Visitor views Quick Sale
- **WHEN** Quick Sale is selected
- **THEN** the image shows that selecting Nike Dunk Low · US 8.5 · Cacao Wow prefills size, colorway, and ₱4,800 cost while the seller supplies the ₱6,500 sale price
- **AND** the paid-in-full result shows active pairs changing from 12 to 11, sale profit of +₱1,700, and monthly profit changing from ₱8,950 to ₱10,650

#### Scenario: Quick Sale is described nonvisually
- **WHEN** assistive technology encounters the selected Quick Sale photograph
- **THEN** one concise equivalent description identifies the recorded paid sale and communicates that stock updates from 12 to 11 active pairs while ₱1,700 profit raises monthly profit from ₱8,950 to ₱10,650

#### Scenario: Visitor compares paid and installment workflows
- **WHEN** a visitor moves between Quick Sale and the installment-related destinations
- **THEN** Quick Sale presents a completed paid-in-full result without mixing in installment balances, payment collection, or lending behavior
