export type ProjectCategory = 'Web apps' | 'ERP' | 'E-commerce' | 'Restaurant/POS';

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  liveLink: string;
  description: string;
  summary: string;
  tags: string[];
  modules: string[];
  tools: string[];
  scenarioRows: {
    id: string;
    scenario: string;
    type: string;
    status: 'PASS' | 'WARN' | 'FAIL';
  }[];
  defects: { label: string; value: number; tone: 'pass' | 'amber' | 'fail' }[];
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: 'hs-admin',
    name: 'Hotel Simplify Admin System',
    category: 'Web apps',
    liveLink: 'https://hs.danfesolution.com/Admin',
    description:
      'A business admin platform for managing users, dashboards, operational reports, and audit visibility across a hotel or service business workflow. The testing focus was on role-based access, data accuracy, dashboard consistency, and reliable reporting so administrators could act on trustworthy operational information.',
    summary:
      'Admin-focused workflow system covering user access, dashboards, reporting, and audit review for operational control and business oversight.',
    tags: ['Admin', 'Roles', 'Reports'],
    modules: ['User access', 'Dashboards', 'Reporting', 'Audit trail'],
    tools: ['Manual', 'Jira', 'Excel'],
    scenarioRows: [
      { id: 'TC-0101', scenario: 'Role-based login validation', type: 'Security', status: 'PASS' },
      { id: 'TC-0102', scenario: 'Filters for user record management', type: 'UI', status: 'PASS' },
      { id: 'TC-0103', scenario: 'Report export consistency check', type: 'Regression', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 5, tone: 'pass' },
      { label: 'Medium', value: 3, tone: 'amber' },
      { label: 'High', value: 2, tone: 'fail' },
    ],
    outcome: 'Admin workflows were stabilized after test-cycle cleanup and edge-case validation.',
  },
  {
    slug: 'restro-pos',
    name: 'Restaurant POS',
    category: 'Restaurant/POS',
    liveLink: 'http://restro.danfesolution.com/sf/sfLogin.aspx?ReturnUrl=http://restro.danfesolution.com/',
    description:
      'A restaurant point-of-sale platform covering table service, takeaway orders, online order handling, and invoicing across live transactions. The QA work focused on order flow accuracy, pricing rules, invoice generation, and recovery when POS data changed during active service.',
    summary:
      'Multi-channel restaurant ordering and billing system covering table, takeaway, online orders, and invoice integrity under live service conditions.',
    tags: ['POS', 'Orders', 'Billing'],
    modules: ['Table orders', 'Takeaway', 'Online orders', 'Invoice flow'],
    tools: ['Manual', 'Selenium', 'Jira'],
    scenarioRows: [
      { id: 'TC-0201', scenario: 'Takeaway order update flow', type: 'Workflow', status: 'PASS' },
      { id: 'TC-0202', scenario: 'Discount and tax calculation', type: 'Logic', status: 'PASS' },
      { id: 'TC-0203', scenario: 'Offline table sync recovery', type: 'Integration', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 8, tone: 'pass' },
      { label: 'Medium', value: 4, tone: 'amber' },
      { label: 'High', value: 2, tone: 'fail' },
    ],
    outcome: 'Core order and billing flows were validated with a stronger focus on edge cases and reconciliation.',
  },
  {
    slug: 'cloud-restro-order',
    name: 'Cloud Restro Order',
    category: 'Restaurant/POS',
    liveLink: 'https://cloud.restroorder.com',
    description:
      'A cloud-based ordering platform designed for restaurant operations across order creation, payment processing, updates, and order history tracking. I validated the end-to-end user journey from product selection to payment completion and historical consistency so business teams could trust the live order lifecycle.',
    summary:
      'Cloud ordering workflow for restaurant teams covering order placement, billing accuracy, state updates, and operational history tracking.',
    tags: ['Cloud', 'Orders', 'Payments'],
    modules: ['Customer flow', 'Billing', 'Order history', 'Updates'],
    tools: ['Manual', 'API', 'Jira'],
    scenarioRows: [
      { id: 'TC-0301', scenario: 'Order placement to payment complete', type: 'End-to-end', status: 'PASS' },
      { id: 'TC-0302', scenario: 'Order update after confirmation', type: 'Workflow', status: 'PASS' },
      { id: 'TC-0303', scenario: 'Billing mismatch detection', type: 'Regression', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 6, tone: 'pass' },
      { label: 'Medium', value: 3, tone: 'amber' },
      { label: 'High', value: 1, tone: 'fail' },
    ],
    outcome: 'Order quality improved through tighter validation around billing accuracy and change tracking.',
  },
  {
    slug: 'nso-app',
    name: 'NSO App',
    category: 'Web apps',
    liveLink: 'https://nso-app.danfesolution.com',
    description:
      'An operational business application built around login control, form entry, record management, and reporting workflows. Coverage focused on access validation, data entry checks, synchronization behavior, and reporting reliability across daily operational tasks.',
    summary:
      'Operational business app validating access control, form handling, records, and reporting workflows across day-to-day work.',
    tags: ['App', 'Operations', 'Flows'],
    modules: ['Login', 'Forms', 'Records', 'Reports'],
    tools: ['Manual', 'Excel', 'Jira'],
    scenarioRows: [
      { id: 'TC-0401', scenario: 'Login state and access control', type: 'Security', status: 'PASS' },
      { id: 'TC-0402', scenario: 'Record creation with validation', type: 'Functional', status: 'PASS' },
      { id: 'TC-0403', scenario: 'Data sync with listing refresh', type: 'Integration', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 5, tone: 'pass' },
      { label: 'Medium', value: 2, tone: 'amber' },
      { label: 'High', value: 1, tone: 'fail' },
    ],
    outcome: 'The app received quality checks across workflow continuity and access validation.',
  },
  {
    slug: 'bricx-erp',
    name: 'BricX ERP',
    category: 'ERP',
    liveLink: '',
    description:
      'An ERP platform spanning HR, inventory, finance, and reporting modules used to support business operations and internal controls. Quality testing reviewed journal workflows, user permissions, stock transfer accuracy, and reconciliation logic to reduce risk in key business processes.',
    summary:
      'ERP validation across HR, finance, inventory, and reporting with a focus on operational integrity and process reliability.',
    tags: ['ERP', 'Finance', 'Inventory'],
    modules: ['User Mgmt', 'HR', 'Inventory', 'Reporting'],
    tools: ['Manual', 'Excel', 'Jira'],
    scenarioRows: [
      { id: 'TC-0501', scenario: 'Journal voucher posting', type: 'Finance', status: 'PASS' },
      { id: 'TC-0502', scenario: 'Receivable reconciliation', type: 'Integration', status: 'PASS' },
      { id: 'TC-0503', scenario: 'Inventory update on stock transfer', type: 'Regression', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 7, tone: 'pass' },
      { label: 'Medium', value: 4, tone: 'amber' },
      { label: 'High', value: 2, tone: 'fail' },
    ],
    outcome: 'ERP workflows were checked with attention to integrity, journal accuracy, and update consistency.',
  },
  {
    slug: 'phat-food-order',
    name: 'Phat Online Food Order',
    category: 'E-commerce',
    liveLink: '',
    description:
      'An online food ordering experience covering guest checkout, registered-user journeys, payment completion, and order history tracking. The testing scope included purchase flow validation, state transitions, payment confidence, and consistent record updates to protect the customer experience.',
    summary:
      'Customer-focused ordering platform validating checkout, payment, tracking, and order history across the online food purchase journey.',
    tags: ['Food', 'Checkout', 'Tracking'],
    modules: ['Guest flow', 'Customer flow', 'Payment', 'Order history'],
    tools: ['Manual', 'Automation', 'Figma', 'Excel'],
    scenarioRows: [
      { id: 'TC-0601', scenario: 'Guest checkout and payment path', type: 'End-to-end', status: 'PASS' },
      { id: 'TC-0602', scenario: 'Tracking update for in-progress orders', type: 'Functional', status: 'PASS' },
      { id: 'TC-0603', scenario: 'Order history consistency', type: 'Regression', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 6, tone: 'pass' },
      { label: 'Medium', value: 3, tone: 'amber' },
      { label: 'High', value: 1, tone: 'fail' },
    ],
    outcome: 'Checkout and order history testing improved confidence in the customer journey.',
  },
  {
    slug: 'ecommerce-nepal-usa',
    name: 'E-commerce (Nepal to USA)',
    category: 'E-commerce',
    liveLink: '',
    description:
      'A cross-border commerce platform spanning registration, checkout, shipping, order tracking, and fulfillment updates for customers across Nepal and the USA. The QA process emphasized address validation, payment path behavior, shipping milestones, and checkout confidence during multi-country transactions.',
    summary:
      'Cross-border commerce testing for registration, checkout, shipping, and tracking across international purchase flows.',
    tags: ['Checkout', 'Shipping', 'Registration'],
    modules: ['Registration', 'Checkout', 'Shipping', 'Tracking'],
    tools: ['Manual', 'Automation', 'Jira', 'Excel'],
    scenarioRows: [
      { id: 'TC-0701', scenario: 'Registration and address validation', type: 'Functional', status: 'PASS' },
      { id: 'TC-0702', scenario: 'Cross-border payment selection', type: 'Checkout', status: 'PASS' },
      { id: 'TC-0703', scenario: 'Shipment status consistency', type: 'Integration', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 7, tone: 'pass' },
      { label: 'Medium', value: 4, tone: 'amber' },
      { label: 'High', value: 2, tone: 'fail' },
    ],
    outcome: 'Cross-border flows were checked for user entry and shipping milestones to reduce confusion.',
  },
  {
    slug: 'jilla-bachat',
    name: 'Jilla Bachat',
    category: 'Web apps',
    liveLink: '',
    description:
      'A regional financial and branch-management application focused on records, sub-account settlements, and report integrity. QA coverage included ledger validation, role-based access, and financial totals to help protect trust in accounting and reporting flows.',
    summary:
      'Financial and branch workflow application validating access control, account records, and report integrity in a regional business context.',
    tags: ['Banking', 'Access', 'Reports'],
    modules: ['Branch records', 'Sub-accounts', 'Reporting', 'Access'],
    tools: ['Manual', 'Excel', 'Jira'],
    scenarioRows: [
      { id: 'TC-0801', scenario: 'Branch ledger entry validation', type: 'Finance', status: 'PASS' },
      { id: 'TC-0802', scenario: 'Role-based access check', type: 'Security', status: 'PASS' },
      { id: 'TC-0803', scenario: 'Financial report totals', type: 'Regression', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 6, tone: 'pass' },
      { label: 'Medium', value: 3, tone: 'amber' },
      { label: 'High', value: 1, tone: 'fail' },
    ],
    outcome: 'The app was reviewed for financial integrity and clean permission boundaries.',
  },
  {
    slug: 'qr-digital-menu',
    name: 'QR Digital Menu',
    category: 'Restaurant/POS',
    liveLink: '',
    description:
      'A mobile-friendly digital menu experience designed for quick browsing, category navigation, and menu access through QR-based entry points. Testing covered responsiveness, link accuracy, layout behavior, and fallback usability across smaller screens and hospitality use cases.',
    summary:
      'Mobile-first QR menu validation for hospitality access, category navigation, and responsive usability across quick-service browsing patterns.',
    tags: ['QR', 'Mobile', 'Hospitality'],
    modules: ['Menu display', 'Link validation', 'Responsive layout', 'Navigation'],
    tools: ['Manual', 'Excel'],
    scenarioRows: [
      { id: 'TC-0901', scenario: 'QR menu opens correctly on mobile', type: 'Responsive', status: 'PASS' },
      { id: 'TC-0902', scenario: 'Category navigation and links', type: 'UI', status: 'PASS' },
      { id: 'TC-0903', scenario: 'Display fallback on smaller screens', type: 'Regression', status: 'WARN' },
    ],
    defects: [
      { label: 'Low', value: 4, tone: 'pass' },
      { label: 'Medium', value: 2, tone: 'amber' },
      { label: 'High', value: 1, tone: 'fail' },
    ],
    outcome: 'Responsive menu quality improved by validating usability across small screens and link accuracy.',
  },
];

export const selectedProjects = projects.slice(0, 4);
