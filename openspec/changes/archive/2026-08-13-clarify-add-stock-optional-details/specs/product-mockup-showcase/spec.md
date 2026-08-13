## MODIFIED Requirements

### Requirement: Add Stock depicts essentials-first inventory entry
The Add Stock image SHALL depict a short new-pair form whose primary facts are brand/model, size, colorway, and cost price, with target price visibly optional. Between the target-price field and the primary Add pair action, the image SHALL depict a collapsed **Optional details** disclosure that identifies **Date acquired**, **Status**, and **Notes** as additional fields and states that they can be added or edited later. The optional fields themselves SHALL remain hidden, the Add pair action SHALL remain visually primary, and the composition SHALL NOT imply that item photos or supplier data are supported by the initial product.

#### Scenario: Visitor views Add Stock
- **WHEN** Add Stock is selected
- **THEN** the image shows the New Balance 530 example with US 7, White / Silver, ₱4,200 cost, optional ₱5,600 target, a collapsed Optional details disclosure naming Date acquired, Status, and Notes with add-or-edit-later guidance, and one clear Add pair action

#### Scenario: Add Stock is described nonvisually
- **WHEN** assistive technology encounters the selected Add Stock photograph
- **THEN** one concise equivalent description communicates the essentials-first form, the supported optional details, their later editability, and the Add pair action without exposing the depicted disclosure or fields as operable controls
