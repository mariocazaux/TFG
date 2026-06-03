## ADDED Requirements

### Requirement: Global ITCSS Architecture

The frontend workspace must include a global SCSS architecture based on ITCSS principles, ensuring scalable and predictable styling.

#### Scenario: SCSS compilation

- **WHEN** the Angular application is built
- **THEN** the global `styles.scss` file successfully imports the ITCSS layers (`settings`, `tools`, `generic`, etc.) without circular dependencies or variable missing errors.

### Requirement: Design Tokens Integration

Visual tokens defined in Figma (such as color palettes, typography scales, and spacing) must be translated into global SCSS variables.

#### Scenario: Using design tokens in components

- **WHEN** a new UI component is styled
- **THEN** the developer can reference a global SCSS variable (e.g., `$color-primary`, `$font-body`) to apply the correct Figma values.

### Requirement: BEM Methodology

All custom CSS classes created for the landing page must follow the Block Element Modifier (BEM) naming convention.

#### Scenario: DOM Inspection

- **WHEN** inspecting the DOM elements of the landing page
- **THEN** CSS classes follow the `block__element--modifier` format (e.g., `header__logo`, `button--primary`).
