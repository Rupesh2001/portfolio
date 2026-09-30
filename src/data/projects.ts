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
    name: 'HS Admin System',
    category: 'Web apps',
    liveLink: 'https://hs.danfesolution.com/Admin',
    description: 'Description TODO (admin panel; ask owner what "HS" stands for, leave TODO)',
    summary: 'Admin panel operations and control flows for a business system.',
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
    description: 'Restaurant POS, table/online/take-away orders, billing (http only, add a small "insecure link" note)',
    summary: 'Multi-channel order handling with billing and kitchen coordination.',
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
    description: 'Table orders, online orders, take-away, order updates, accurate billing and order history',
    summary: 'Order lifecycle tracking for restaurant operations across multiple channels.',
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
    description: 'Description TODO',
    summary: 'Operational product handling and user workflows for the NSO application.',
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
    description: 'Functional, integration, regression across User Mgmt, HR, Inventory, Reporting; journal vouchers, Daybooks, Payable/Receivable. Tools: Manual, Excel, Jira',
    summary: 'Business operations validation across ERP modules, finance, and reporting.',
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
    description: 'Guest + customer flows, order placement, cash/card payment, tracking, order history. Tools: Manual + Automation, Figma, Excel, Jira',
    summary: 'End-user ordering and payment validation for online food ordering.',
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
    description: 'Cross-border checkout, cash/card, registration, local + international shipment tracking. Tools: Manual + Automation, Jira, Excel',
    summary: 'Cross-border purchase flow and shipment tracking checks.',
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
    description: 'Bank transaction recording, main branches and sub-accounts, financial reports, role-based access. Tools: Manual, Excel, Jira',
    summary: 'Financial controls and role-based validation for a regional banking workflow.',
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
    description: 'QR access for hotels/restaurants, display, links, mobile compatibility. Tools: Manual, Excel',
    summary: 'Mobile-first menu access and link display validation for hospitality clients.',
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
