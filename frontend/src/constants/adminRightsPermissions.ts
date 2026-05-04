export interface Permission {
  key: string;
  label: string;
  type?: 'toggle' | 'number';
}

export interface PermissionGroup {
  heading?: string;
  permissions: Permission[];
}

export interface PermissionSection {
  id: string;
  title: string;
  groups: PermissionGroup[];
}

export const ADMIN_RIGHTS_SECTIONS: PermissionSection[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    groups: [
      {
        heading: 'Search',
        permissions: [
          { key: 'dash_search',         label: 'Search' },
          { key: 'dash_universalSearch', label: 'Universal Search' },
        ],
      },
      {
        heading: 'Snapshot',
        permissions: [
          { key: 'dash_summary',             label: 'Summary' },
          { key: 'dash_salesPendingPayment', label: 'Sales, Pending Payment and Payment Collected Display' },
          { key: 'dash_paymentModeSummary', label: 'Payment mode summary' },
          { key: 'dash_expenseSummary',      label: 'Expense summary' },
        ],
      },
      {
        heading: 'Follow-ups',
        permissions: [
          { key: 'dash_viewMyFollowUps',  label: 'View only my follow-ups' },
          { key: 'dash_viewAllFollowUps', label: 'View all follow-ups' },
        ],
      },
      {
        heading: 'Leaderboards',
        permissions: [
          { key: 'dash_ptLeaderboard',           label: 'Personal Training Leaderboard' },
          { key: 'dash_generalSalesLeaderboard', label: 'General Sales Leaderboard' },
        ],
      },
    ],
  },
  {
    id: 'sales',
    title: 'Sales',
    groups: [
      {
        permissions: [
          { key: 'sales_addManageEnquiries', label: 'Add enquiry, manage enquiries, enquiry archive' },
          { key: 'sales_convertEnquiry',     label: 'Convert Enquiry & Add member' },
          { key: 'sales_importEnquiries',    label: 'Import enquiries' },
          { key: 'sales_printEnquiries',     label: 'Print all enquiries' },
          { key: 'sales_backdatedEnquiry',   label: 'Backdated enquiry' },
        ],
      },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Communication',
    groups: [
      {
        permissions: [
          { key: 'mkt_unqualifiedData',         label: 'Unqualified Data' },
          { key: 'mkt_createMailerList',         label: 'Create Custom mailer list' },
          { key: 'mkt_sendEmail',                label: 'Send e-mail (Staff & Client)' },
          { key: 'mkt_sendSMS',                  label: 'Send SMS(Staff & Client)' },
          { key: 'mkt_sendWhatsapp',             label: 'Send Whatsapp(Staff & Client)' },
          { key: 'mkt_pushNotification',         label: 'Push Notification' },
          { key: 'mkt_loyaltyPoints',            label: 'Loyalty Points' },
          { key: 'mkt_discountCode',             label: 'Discount Code' },
          { key: 'mkt_offers',                   label: 'Offers' },
          { key: 'mkt_replyCustomerReview',      label: 'Reply to Customer review' },
          { key: 'mkt_receiveTrialNotif',        label: 'Receive trial notification SMS & WhatsApp' },
          { key: 'mkt_receiveAppFeedback',       label: 'Receive app feedback notification SMS & email' },
          { key: 'mkt_receiveDailyReportSMS',    label: 'Receive daily report SMS' },
          { key: 'mkt_receiveDailyWeeklyReport', label: 'Receive daily, weekly & monthly report email' },
          { key: 'mkt_newBillEmail',             label: 'New bill email' },
          { key: 'mkt_newBillSMSWhatsapp',       label: 'New bill SMS & WhatsApp' },
          { key: 'mkt_supportRequestEmail',      label: 'Support request email' },
        ],
      },
    ],
  },
  {
    id: 'clients',
    title: 'Clients',
    groups: [
      {
        heading: 'Manage Lists',
        permissions: [
          { key: 'cli_manageAllMembers', label: 'Manage all members list' },
          { key: 'cli_manageGroups',     label: 'Manage groups' },
        ],
      },
      {
        heading: 'Member Profile',
        permissions: [
          { key: 'cli_updateClientProfile', label: 'Update client profile' },
          { key: 'cli_changeClientMobile',  label: 'Change client mobile number' },
          { key: 'cli_agreementSignature',  label: 'Agreement signature editing' },
        ],
      },
      {
        heading: 'Update Memberships',
        permissions: [
          { key: 'cli_transferMemberships', label: 'Transfer memberships' },
          { key: 'cli_upgradeMemberships',  label: 'Upgrade memberships' },
          { key: 'cli_freezeMemberships',   label: 'Freeze memberships' },
          { key: 'cli_changeStartEndDate',  label: 'Change start & end date' },
          { key: 'cli_suspendMemberships',  label: 'Suspend memberships' },
          { key: 'cli_addReduceSessions',   label: 'Add/reduce sessions' },
        ],
      },
      {
        heading: 'Operations',
        permissions: [
          { key: 'cli_updateCheckins',      label: 'Update Checkins' },
          { key: 'cli_checkinReversal',     label: 'Checkin Reversal' },
          { key: 'cli_changeStaffPT',       label: 'Change staff name in PT check-ins' },
          { key: 'cli_changeSalesRepPT',    label: 'Change sales rep and PT' },
          { key: 'cli_addToTransfer',       label: 'Add to transfer' },
          { key: 'cli_interbranchTransfer', label: 'Interbranch Transfer' },
          { key: 'cli_addSupportRequest',   label: 'Add support request' },
          { key: 'cli_deleteClientSupport', label: 'Delete client support requests' },
          { key: 'cli_deleteFingerprint',   label: 'Delete fingerprint/face' },
        ],
      },
      {
        heading: 'Challenge',
        permissions: [
          { key: 'cli_manageChallenges', label: 'View/Manage Challenges' },
        ],
      },
    ],
  },
  {
    id: 'bookings',
    title: 'Bookings',
    groups: [
      {
        heading: 'Classes & Sessions',
        permissions: [
          { key: 'bk_manageBookingReservations', label: 'Manage Booking & Reservations' },
          { key: 'bk_createClasses',             label: 'Create classes' },
          { key: 'bk_cancelClasses',             label: 'Cancel classes' },
          { key: 'bk_manageStaffSubstitution',   label: 'Manage Staff Substitution' },
          { key: 'bk_manageClassSettings',       label: 'Manage Class Settings' },
          { key: 'bk_startClass',                label: 'Start Class' },
        ],
      },
      {
        heading: 'Events',
        permissions: [
          { key: 'bk_manageEventBookings',       label: 'Manage Bookings' },
          { key: 'bk_createEvents',              label: 'Create Events' },
          { key: 'bk_activateDeactivateEvents',  label: 'Activate/Deactivate Events' },
        ],
      },
      {
        heading: 'Turfs & Venues',
        permissions: [
          { key: 'bk_manageTurfBookings',  label: 'Manage Turf Bookings' },
          { key: 'bk_manageTurfSettings',  label: 'Manage Turf Settings' },
        ],
      },
    ],
  },
  {
    id: 'training',
    title: 'Training',
    groups: [
      {
        permissions: [
          { key: 'trn_myPTDashboard',       label: 'My PT Dashboard' },
          { key: 'trn_consolidatedPT',       label: 'Consolidated PT dashboard' },
          { key: 'trn_manageExerciseLib',    label: 'Manage Exercise Library & Workout Templates' },
          { key: 'trn_manageMealPlan',       label: 'Manage Meal Plan Templates' },
          { key: 'trn_manageAssessment',     label: 'Manage Assessment Templates' },
          { key: 'trn_viewUpdateFitnessLogs', label: 'View and update Fitness Logs, assessments, Fitness Profile & Fitness Goal' },
          { key: 'trn_viewAssignWorkout',    label: 'View and assign Workout & Meal Plan' },
        ],
      },
    ],
  },
  {
    id: 'staff',
    title: 'Staff',
    groups: [
      {
        permissions: [
          { key: 'stf_manageStaffList',       label: 'Manage Staff List' },
          { key: 'stf_addDeleteStaff',         label: 'Add/ Delete staff' },
          { key: 'stf_changeStatus',           label: 'Change Status (Active/Inactive)' },
          { key: 'stf_adminRights',            label: 'Admin Rights' },
          { key: 'stf_manageCalendar',         label: 'Manage Staff Calendar' },
          { key: 'stf_scheduleAppointments',   label: 'Schedule & Reschedule Appointments' },
          { key: 'stf_editAppointments',       label: 'Edit Appointments (Cancel, no show, completed)' },
          { key: 'stf_updateProfile',          label: 'Update Staff Profile, Working Hour & Document Upload' },
          { key: 'stf_changePassword',         label: 'Change Password' },
          { key: 'stf_forgotPassword',         label: 'Forgot Password' },
          { key: 'stf_bulkRepChange',          label: 'Bulk rep change' },
          { key: 'stf_updateTarget',           label: 'Update Staff Target' },
          { key: 'stf_multipleAppointments',   label: 'Multiple appointments' },
          { key: 'stf_checkinSMS',             label: 'Checkin SMS' },
          { key: 'stf_checkoutSMS',            label: 'Checkout SMS' },
          { key: 'stf_biometricOfflineSMS',    label: 'Biometric Offline SMS' },
          { key: 'stf_biometricAdminLock',     label: 'Biometric Admin Lock/Unlock' },
          { key: 'stf_viewLeaveEntries',       label: 'View Leave Entries' },
          { key: 'stf_manageLeaveEntries',     label: 'Manage Leave Entries' },
        ],
      },
    ],
  },
  {
    id: 'bills',
    title: 'Bills',
    groups: [
      {
        permissions: [
          { key: 'bill_generateBills',              label: 'Generate Bills' },
          { key: 'bill_cancelBills',                label: 'Cancel Bills' },
          { key: 'bill_writeOff',                   label: 'Write Off' },
          { key: 'bill_allowDiscounts',             label: 'Allow discounts' },
          { key: 'bill_discountPct',                label: 'Discount(%)' },
          { key: 'bill_maxDiscountPct',             label: 'Max Discount(%)', type: 'number' },
          { key: 'bill_discountINR',                label: 'Discount(INR)' },
          { key: 'bill_maxDiscountINR',             label: 'Max Discount(INR)', type: 'number' },
          { key: 'bill_collectPartialPayment',      label: 'Collect partial payment' },
          { key: 'bill_raiseInvoiceWithoutPayment', label: 'Raise invoice without payment' },
          { key: 'bill_backdatedBilling',           label: 'Backdated billing' },
          { key: 'bill_backdatedFreeze',            label: 'Backdated freeze' },
          { key: 'bill_membershipCancellation',     label: 'Membership Cancellation, Refund' },
          { key: 'bill_dealOverride',               label: 'Deal override' },
          { key: 'bill_generateAdvancePayments',    label: 'Generate Advance Payments' },
        ],
      },
    ],
  },
  {
    id: 'inventory',
    title: 'Inventory',
    groups: [
      {
        permissions: [
          { key: 'inv_addDeleteProducts',   label: 'Add/Delete Products' },
          { key: 'inv_sellRentProducts',    label: 'Sell and Rent Products' },
          { key: 'inv_stockAdjustments',    label: 'Stock Adjustments' },
          { key: 'inv_backdatedStockUpdate', label: 'Backdated stock update' },
        ],
      },
    ],
  },
  {
    id: 'expenses',
    title: 'Expenses',
    groups: [
      {
        permissions: [
          { key: 'exp_addExpenses',    label: 'Add expenses' },
          { key: 'exp_deleteExpenses', label: 'Delete expenses' },
        ],
      },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    groups: [
      {
        heading: 'Export',
        permissions: [
          { key: 'data_exportEnquiries',   label: 'Export enquiries' },
          { key: 'data_exportMemberList',  label: 'Export Member List' },
          { key: 'data_exportTrialDetails', label: 'Export trial details' },
          { key: 'data_exportTaskDetails', label: 'Export task details' },
          { key: 'data_exportReports',     label: 'Export reports' },
          { key: 'data_exportBills',       label: 'Export Bills' },
          { key: 'data_exportAttendance',  label: 'Export attendance' },
        ],
      },
      {
        heading: 'Delete',
        permissions: [
          { key: 'data_deleteEnquiries', label: 'Delete enquiries, members and invoices' },
        ],
      },
    ],
  },
  {
    id: 'staffSelector',
    title: 'Allow to be selected as staff',
    groups: [
      {
        permissions: [
          { key: 'sel_enquiry',                 label: 'Enquiry' },
          { key: 'sel_callsEnquiryMember',      label: 'Calls(enquiry,member)' },
          { key: 'sel_appointmentEnquiryMember', label: 'Appointment(enquiry,member)' },
          { key: 'sel_salesRep',                label: 'Sales rep' },
          { key: 'sel_memberManager',           label: 'Member manager' },
          { key: 'sel_generalTrainer',          label: 'General trainer' },
          { key: 'sel_personalTrainer',         label: 'Personal trainer' },
          { key: 'sel_nutritionCounselling',    label: 'Nutrition Counselling' },
          { key: 'sel_groupClass',              label: 'Group class' },
        ],
      },
    ],
  },
  {
    id: 'report',
    title: 'Report',
    groups: [
      {
        heading: 'General',
        permissions: [
          { key: 'rep_centralReport',    label: 'Central report' },
          { key: 'rep_accessBiometric', label: 'Access control/Biometric' },
          { key: 'rep_vaccination',     label: 'Vaccination' },
          { key: 'rep_visitors',        label: 'Visitors' },
          { key: 'rep_analytics',       label: 'Analytics' },
        ],
      },
      {
        heading: 'Marketing',
        permissions: [
          { key: 'rep_offers',      label: 'Offers' },
          { key: 'rep_discountCode', label: 'Discount Code' },
          { key: 'rep_leadSource',  label: 'Lead source' },
          { key: 'rep_referrals',   label: 'Referrals' },
          { key: 'rep_loyaltyPoints', label: 'Loyalty points' },
          { key: 'rep_smsDelivery', label: 'SMS delivery' },
        ],
      },
      {
        heading: 'Sales',
        permissions: [
          { key: 'rep_dailySales',         label: 'Daily sales (DSR)' },
          { key: 'rep_revenueSales',       label: 'Revenue,Sales Accounting,Effectiv Sale' },
          { key: 'rep_expectedRevenue',    label: 'Expected Revenue' },
          { key: 'rep_revenueVsTarget',    label: 'Revenue vs target' },
          { key: 'rep_revenueMonthTill',   label: 'Revenue month till date' },
          { key: 'rep_serviceSaleType',    label: 'Service sale, service type' },
          { key: 'rep_registrationFee',    label: 'Registration fee' },
          { key: 'rep_upgradeAndCrossSell', label: 'Upgrade and cross-sell (3 reports)' },
          { key: 'rep_notInterested',      label: 'Not interested' },
          { key: 'rep_ptSalesReport',      label: 'PT Sales Report' },
          { key: 'rep_corporateSales',     label: 'Corporate sales' },
        ],
      },
      {
        heading: 'Appointments & Trials',
        permissions: [
          { key: 'rep_trials',              label: 'Trials (4 reports)' },
          { key: 'rep_appointments',        label: 'Appointments' },
          { key: 'rep_deletedAppointments', label: 'Deleted Appointments' },
        ],
      },
      {
        heading: 'Finance',
        permissions: [
          { key: 'rep_viewAllInvoices',      label: 'View all Invoices' },
          { key: 'rep_cancellationRefund',   label: 'Cancellation and refund (3 reports)' },
          { key: 'rep_revenueRealisation',   label: 'Revenue realisation (4 reports)' },
          { key: 'rep_revenueVsUtilisation', label: 'Revenue VS utilisation (2 reports)' },
          { key: 'rep_subscriptions',        label: 'Subscriptions (3 reports)' },
          { key: 'rep_collectionPOS',        label: 'Collection,POS Payment, Payment Reconciliation' },
          { key: 'rep_paymentMode',          label: 'Payment mode' },
          { key: 'rep_staffCommission',      label: 'Staff commission' },
          { key: 'rep_advancePayment',       label: 'Advance Payment Received & Utilized' },
          { key: 'rep_endOfDay',             label: 'End of the Day' },
          { key: 'rep_wallet',               label: 'Wallet' },
        ],
      },
      {
        heading: 'Client Management',
        permissions: [
          { key: 'rep_renewalVsAttrition',   label: 'Renewal vs attrition' },
          { key: 'rep_newClients',           label: 'New clients' },
          { key: 'rep_renewals',             label: 'Renewals' },
          { key: 'rep_membership',           label: 'Membership' },
          { key: 'rep_membershipPTExpiry',   label: 'Membership & PT expiry' },
          { key: 'rep_membersNotCalled',     label: 'Members not called' },
          { key: 'rep_irregularMembers',     label: 'Irregular members' },
          { key: 'rep_activeInactiveClients', label: 'Active/Inactive clients Summary(2 reports)' },
          { key: 'rep_multiclubClients',     label: 'Multiclub Clients & Multiclub Passport' },
          { key: 'rep_archivedClients',      label: 'Archived Clients' },
          { key: 'rep_freezeChangeDate',     label: 'Freeze & Change Date' },
          { key: 'rep_suspensions',          label: 'Suspensions' },
          { key: 'rep_attendanceHeatMap',    label: 'Attendance heat map' },
          { key: 'rep_serviceTransfer',      label: 'Service transfer' },
          { key: 'rep_clientGroups',         label: 'Client groups' },
          { key: 'rep_birthdaysAnniversaries', label: 'Birthdays & Anniversaries' },
          { key: 'rep_feedback',             label: 'Feedback (2 reports)' },
          { key: 'rep_feedbackMask',         label: 'Feedback mask personal details' },
          { key: 'rep_clientAttendance',     label: 'Client Attendance' },
          { key: 'rep_dataHygiene',          label: 'Data Hygiene/Additional Information' },
          { key: 'rep_membershipRetention',  label: 'Membership retention' },
          { key: 'rep_viewMemberCheckins',   label: 'View Member checkins' },
          { key: 'rep_attendanceRegister',   label: 'Attendance Register' },
          { key: 'rep_supportRequests',      label: 'Support requests' },
          { key: 'rep_referrers',            label: 'Referrers' },
          { key: 'rep_oneTimePurchasers',    label: 'One-time purchasers' },
          { key: 'rep_averageLifetimeValue', label: 'Average lifetime value' },
        ],
      },
      {
        heading: 'Staff',
        permissions: [
          { key: 'rep_noShowUsage',           label: 'No Show and usage (2 reports)' },
          { key: 'rep_classSessionUtil',      label: 'Class & Session utilisation' },
          { key: 'rep_trialUtilisation',      label: 'Trial Utilisation' },
          { key: 'rep_staffSubstitution',     label: 'Staff Substitution' },
          { key: 'rep_viewUpdateStaffCheckins', label: 'View & Update staff Checkins' },
          { key: 'rep_staffBirthdayAnniv',    label: 'Staff Birthday & Anniversaries' },
          { key: 'rep_staffAttendanceReg',    label: 'Attendance Register' },
        ],
      },
      {
        heading: 'Expenses',
        permissions: [
          { key: 'rep_expenses',       label: 'Expenses (2 reports)' },
          { key: 'rep_reimbursements', label: 'Reimbursements' },
          { key: 'rep_approvalStatus', label: 'Approval Status' },
        ],
      },
      {
        heading: 'Training',
        permissions: [
          { key: 'rep_fitnessGoal',        label: 'Fitness Goal' },
          { key: 'rep_ptConversion',       label: 'PT conversion' },
          { key: 'rep_ptRetention',        label: 'PT retention' },
          { key: 'rep_assignedMealPlan',   label: 'Assigned Meal Plan' },
          { key: 'rep_assignedWorkout',    label: 'Assigned Workout,Fitness Log' },
          { key: 'rep_assessmentsStatus',  label: 'Assessments Status' },
          { key: 'rep_sessionsUtilisation', label: 'Sessions Utilisation (PT)' },
        ],
      },
      {
        heading: 'Inventory',
        permissions: [
          { key: 'rep_productStockMovement', label: 'Product stock Movement' },
          { key: 'rep_productReorderAlert',  label: 'Product Reorder Alert' },
          { key: 'rep_supplier',             label: 'Supplier' },
          { key: 'rep_internal',             label: 'Internal' },
          { key: 'rep_rental',               label: 'Rental' },
          { key: 'rep_productExpiry',        label: 'Product Expiry/Inuse/Consumption' },
        ],
      },
    ],
  },
  {
    id: 'setup',
    title: 'Setup',
    groups: [
      {
        heading: 'General',
        permissions: [
          { key: 'set_viewBranchProfile',     label: 'View branch profile' },
          { key: 'set_editBranchProfile',     label: 'Edit branch profile' },
          { key: 'set_addEditDeleteServices', label: 'Add, edit and delete services, offers and packages' },
          { key: 'set_formCustomization',     label: 'Form Customization' },
          { key: 'set_defineTax',             label: 'Define Tax' },
          { key: 'set_billTemplateFormat',    label: 'Bill Template and Report Format' },
          { key: 'set_clubAgreement',         label: 'Club Agreement' },
          { key: 'set_crmAppAccess',          label: 'CRM App Access' },
          { key: 'set_crmAppCheckins',        label: 'CRM App - Check-ins and Sessions management' },
          { key: 'set_crmAppDashboard',       label: 'CRM App Dashboard View' },
          { key: 'set_crmAppPromote',         label: 'CRM App Promote' },
          { key: 'set_frontDeskApp',          label: 'Front Desk App Access' },
          { key: 'set_activatePaymentLink',   label: 'Activate Payment Link' },
          { key: 'set_biometricManagement',   label: 'Biometric management (staff & client)' },
          { key: 'set_buyInsurance',          label: 'Buy insurance & report (staff & client)' },
          { key: 'set_endOfDay',              label: 'End of the Day' },
        ],
      },
      {
        heading: 'Marketing',
        permissions: [
          { key: 'set_manageLeadSources',    label: 'Manage lead sources' },
          { key: 'set_guestPassTrialPass',   label: 'Guest Pass/ Trial Pass' },
          { key: 'set_gallery',              label: 'Gallery' },
          { key: 'set_smsTemplates',         label: 'SMS Templates' },
          { key: 'set_emailTemplates',       label: 'E-Mail Templates' },
          { key: 'set_automatedCommStaff',   label: 'Automated communication - Staff' },
          { key: 'set_automatedCommClients', label: 'Automated communication - Clients' },
        ],
      },
      {
        heading: 'Client Management',
        permissions: [
          { key: 'set_membershipUpgrade',    label: 'Membership upgrade, cross-sell and transfer' },
          { key: 'set_appointmentType',      label: 'Appointment Type' },
          { key: 'set_feedback',             label: 'Feedback' },
          { key: 'set_checkInNotification',  label: 'Check In Notification' },
          { key: 'set_supportRequestType',   label: 'Support Request Type' },
          { key: 'set_bulkReferral',         label: 'Bulk & Referral Extension' },
        ],
      },
      {
        heading: 'Staff Management',
        permissions: [
          { key: 'set_ipRestriction',          label: 'IP Restriction' },
          { key: 'set_updateAttendanceSetup',  label: 'Update attendance set-up' },
          { key: 'set_updateJobDesignation',   label: 'Update Job Designation' },
          { key: 'set_staffPayrollSetup',      label: 'Staff Payroll Setup' },
          { key: 'set_staffCommission',        label: 'Staff Commission' },
        ],
      },
      {
        heading: 'Expenses',
        permissions: [
          { key: 'set_expenseTemplate', label: 'Expense template' },
          { key: 'set_expenseBudget',   label: 'Expense budget' },
        ],
      },
      {
        heading: 'Inventory',
        permissions: [
          { key: 'set_productSettings', label: 'Product settings' },
          { key: 'set_viewProductList', label: 'View Product List' },
        ],
      },
      {
        heading: 'Training',
        permissions: [
          { key: 'set_fitnessLogFields', label: 'Fitness log fields & Workout template/tag type' },
          { key: 'set_fitnessGoalType',  label: 'Fitness Goal Type' },
        ],
      },
      {
        heading: 'Integration & Plugins',
        permissions: [
          { key: 'set_integrationsPlugins', label: 'Integrations & Plugins' },
        ],
      },
      {
        heading: 'Connect',
        permissions: [
          { key: 'set_addListing', label: 'Add listing' },
        ],
      },
    ],
  },
  {
    id: 'franchise',
    title: 'Franchise',
    groups: [
      {
        permissions: [
          { key: 'fran_addUpdateDocuments', label: 'Add/Update Documents' },
          { key: 'fran_viewDocuments',      label: 'View Documents' },
        ],
      },
    ],
  },
];
