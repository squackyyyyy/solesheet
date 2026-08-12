## ADDED Requirements

### Requirement: Home dashboard previews share one canonical basic summary
Every Home dashboard representation in the product showcase SHALL use the same canonical mock state and information hierarchy. The shared state SHALL show 12 active pairs, ₱53,200 inventory cost, ₱8,950 monthly profit, ₱2,500 unpaid installment balance, and a **Stock mix** of 9 available and 3 reserved pairs. The Stock mix SHALL use a compact segmented visualization derived from those status counts and SHALL remain a basic status summary rather than imply time-series, ranking, drill-down, or advanced reporting capability.

#### Scenario: Visitor compares dashboard representations
- **WHEN** a visitor views the general dashboard preview and the Home dashboard beneath Quick Actions
- **THEN** both representations use the same dashboard labels, values, Stock mix counts, status proportions, and module order without contradictory information

#### Scenario: Visitor sees the free basic-dashboard value
- **WHEN** a Home dashboard preview is visible
- **THEN** the Stock mix communicates 9 available and 3 reserved pairs through text and a restrained segmented bar without presenting paid advanced analytics as available

#### Scenario: Dashboard equivalent descriptions are read nonvisually
- **WHEN** assistive technology encounters a dashboard preview or the Quick Actions photograph
- **THEN** its concise equivalent description communicates the canonical active inventory and Stock mix state without exposing the segmented bar as a separate control

## MODIFIED Requirements

### Requirement: Quick Actions depicts the anchored hold menu
The Quick Actions image SHALL depict the canonical Home dashboard, including its compact **Stock mix** visualization, beneath a menu visually anchored to the bottom-right `+`. The menu SHALL list **Sell a pair**, **Record a payment**, and **Add a pair** in that order, and the composition SHALL visibly explain **Hold + for more** without implying that the image itself responds to a hold. The menu, Quick Log label, and trigger SHALL remain the dominant visual message; the open menu MAY naturally cover lower dashboard modules but the visible underlying dashboard content SHALL remain consistent with the general dashboard preview.

#### Scenario: Visitor views Quick Actions
- **WHEN** Quick Actions is selected
- **THEN** the image shows the canonical dashboard and Stock mix while clearly associating the three-action menu with the `+` button rather than presenting it as a centered modal

#### Scenario: Mobile visitor views Quick Actions
- **WHEN** Quick Actions is selected at 360px wide
- **THEN** the complete three-action menu, Quick Log label, anchored `+` trigger, and enough of the Stock mix to recognize the basic visualization are visible together inside the mobile photograph

#### Scenario: Quick Actions is described nonvisually
- **WHEN** assistive technology encounters the selected Quick Actions photograph
- **THEN** one equivalent description identifies the canonical Home summary, the 9-available and 3-reserved Stock mix, and the three actions anchored to Quick Log
