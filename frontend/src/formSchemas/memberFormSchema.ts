import type { IFormSchema, SectionMeta } from './formSchema.types';

class MemberFormSchema implements IFormSchema {
  readonly formType = 'MemberForm';

  getSections(): SectionMeta[] {
    return [
      {
        title: 'Personal Details',
        fields: [
          { key: 'mem_email',             label: 'Email',                   showMandatory: true,  showPlugin: true,  defaultMandatory: true  },
          { key: 'mem_gender',            label: 'Gender',                  showMandatory: true,  showPlugin: true,  defaultMandatory: true  },
          { key: 'mem_dateOfBirth',       label: 'Date of Birth',           showMandatory: true,  showPlugin: true,  defaultMandatory: true  },
          { key: 'mem_anniversary',       label: 'Anniversary',             showMandatory: false, showPlugin: false, defaultEnabled: false   },
          { key: 'mem_address',           label: 'Address',                 showMandatory: true,  showPlugin: true   },
          { key: 'mem_locality',          label: 'Locality',                showMandatory: true,  showPlugin: true   },
          { key: 'mem_city',              label: 'City',                    showMandatory: true,  showPlugin: true   },
          { key: 'mem_bloodGroup',        label: 'Blood Group',             showMandatory: true,  showPlugin: false  },
          { key: 'mem_whatsappNumber',    label: 'Whatsapp Number',         showMandatory: false, showPlugin: false  },
          { key: 'mem_facebookId',        label: 'Facebook ID',             showMandatory: false, showPlugin: false  },
          { key: 'mem_instagramId',       label: 'Instagram ID',            showMandatory: false, showPlugin: false  },
          { key: 'mem_profilePhoto',      label: 'Profile Photo Mandatory', showMandatory: false, showPlugin: false  },
          { key: 'mem_pincode',           label: 'Pincode',                 showMandatory: true,  showPlugin: true   },
          { key: 'mem_schoolNameTimings', label: 'School name and timings', showMandatory: false, showPlugin: false  },
          { key: 'mem_mothersName',       label: "Mother's name",           showMandatory: false, showPlugin: false  },
          { key: 'mem_mothersProfession', label: "Mother's profession",     showMandatory: false, showPlugin: false  },
          { key: 'mem_fathersName',       label: "Father's name",           showMandatory: false, showPlugin: false  },
          { key: 'mem_fathersProfession', label: "Father's profession",     showMandatory: false, showPlugin: false  },
          { key: 'mem_appSignature',      label: 'App Member Signature',    showMandatory: false, showPlugin: false  },
          { key: 'mem_vaccination',       label: 'Vaccination',             showMandatory: false, showPlugin: true   },
        ],
      },
      {
        title: 'Professional Information',
        fields: [
          { key: 'mem_primaryOccupation',      label: 'Primary Occupation',      showMandatory: true, showPlugin: true  },
          { key: 'mem_primaryCompanyName',     label: 'Primary Company name',    showMandatory: true, showPlugin: true  },
          { key: 'mem_primaryOfficialEmail',   label: 'Primary Official Email',  showMandatory: true, showPlugin: true  },
          { key: 'mem_proContactNumber',       label: 'Contact Number',          showMandatory: true, showPlugin: true  },
          { key: 'mem_proWhatsapp',            label: 'WhatsApp Number',         showMandatory: true, showPlugin: true  },
          { key: 'mem_primaryAddress',         label: 'Primary Address',         showMandatory: true, showPlugin: true  },
          { key: 'mem_primaryCity',            label: 'Primary City',            showMandatory: true, showPlugin: true  },
          { key: 'mem_primaryState',           label: 'Primary State',           showMandatory: true, showPlugin: true  },
          { key: 'mem_primaryPin',             label: 'Primary PIN',             showMandatory: true, showPlugin: true  },
          { key: 'mem_primaryCountry',         label: 'Primary Country',         showMandatory: true, showPlugin: true  },
          { key: 'mem_primaryWing',            label: 'Primary Wing',            showMandatory: true, showPlugin: true  },
          { key: 'mem_hrDetails',              label: 'HR Details',              showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryOccupation',    label: 'Secondary Occupation',    showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryCompanyName',   label: 'Secondary Company name',  showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryOfficialEmail', label: 'Secondary Official Email',showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryAddress',       label: 'Secondary Address',       showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryCity',          label: 'Secondary City',          showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryState',         label: 'Secondary State',         showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryPin',           label: 'Secondary PIN',           showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryCountry',       label: 'Secondary Country',       showMandatory: true, showPlugin: false },
          { key: 'mem_secondaryWing',          label: 'Secondary Wing',          showMandatory: true, showPlugin: false },
        ],
      },
      {
        title: 'Emergency contact',
        fields: [
          { key: 'mem_emergencyContact', label: 'Emergency contact', showMandatory: true, showPlugin: true },
        ],
      },
      {
        title: 'Member Manager',
        fields: [
          { key: 'mem_memberManager', label: 'Member Manager', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Additional information',
        fields: [
          { key: 'mem_additionalInfo', label: 'Additional information', showMandatory: false, showPlugin: true },
        ],
      },
      {
        title: 'IDs',
        fields: [
          { key: 'mem_ids',          label: 'IDs',              showMandatory: false, showPlugin: false },
          { key: 'mem_nationalId',   label: 'National ID',      showMandatory: true,  showPlugin: true  },
          { key: 'mem_countryState', label: 'Country And State',showMandatory: true,  showPlugin: true  },
          { key: 'mem_lockerKeyNo',  label: 'Locker Key No',    showMandatory: false, showPlugin: false },
          { key: 'mem_pan',          label: 'PAN',              showMandatory: true,  showPlugin: false },
        ],
      },
      {
        title: 'Lead Information',
        fields: [
          { key: 'mem_customerType', label: 'Customer type', showMandatory: false, showPlugin: false, defaultEnabled: false },
          { key: 'mem_leadSource',   label: 'Lead source',   showMandatory: true,  showPlugin: false, defaultMandatory: true },
          { key: 'mem_company',      label: 'Company',       showMandatory: true,  showPlugin: true  },
          { key: 'mem_enquiryType',  label: 'Enquiry Type',  showMandatory: true,  showPlugin: false },
        ],
      },
      {
        title: 'Primary School/College/Course Details',
        fields: [
          { key: 'mem_pri_guardianName',  label: 'Parent / Guardian Full Name', showMandatory: true, showPlugin: false },
          { key: 'mem_pri_contactNumber', label: 'Contact Number',              showMandatory: true, showPlugin: false },
          { key: 'mem_pri_homeContact',   label: 'Home Contact Number',         showMandatory: true, showPlugin: false },
          { key: 'mem_pri_schoolEmail',   label: 'Email',                       showMandatory: true, showPlugin: false },
          { key: 'mem_pri_relationship',  label: 'Relationship',                showMandatory: true, showPlugin: false },
          { key: 'mem_pri_schoolAddress', label: 'Address',                     showMandatory: true, showPlugin: false },
          { key: 'mem_pri_schoolCity',    label: 'City',                        showMandatory: true, showPlugin: false },
        ],
      },
      {
        title: 'Secondary School/College/Course Details',
        fields: [
          { key: 'mem_sec_guardianName',  label: 'Parent / Guardian Full Name', showMandatory: true, showPlugin: false },
          { key: 'mem_sec_contactNumber', label: 'Contact Number',              showMandatory: true, showPlugin: false },
          { key: 'mem_sec_homeContact',   label: 'Home Contact Number',         showMandatory: true, showPlugin: false },
          { key: 'mem_sec_schoolEmail',   label: 'Email',                       showMandatory: true, showPlugin: false },
          { key: 'mem_sec_relationship',  label: 'Relationship',                showMandatory: true, showPlugin: false },
          { key: 'mem_sec_schoolAddress', label: 'Address',                     showMandatory: true, showPlugin: false },
          { key: 'mem_sec_schoolCity',    label: 'City',                        showMandatory: true, showPlugin: false },
        ],
      },
      {
        title: 'Insurance',
        fields: [
          { key: 'mem_nomineeFullName',        label: 'Nominee Full name',        showMandatory: true, showPlugin: true },
          { key: 'mem_relationshipWithNominee',label: 'Relationship with Nominee',showMandatory: true, showPlugin: true },
        ],
      },
      {
        title: 'Apparel and Shoes',
        fields: [
          { key: 'mem_tshirtSize', label: 'T-Shirt Size', showMandatory: true, showPlugin: true },
          { key: 'mem_shortsSize', label: 'Shorts Size',  showMandatory: true, showPlugin: true },
          { key: 'mem_shoesSize',  label: 'Shoes Size',   showMandatory: true, showPlugin: true },
        ],
      },
      {
        title: 'Secondary contact details',
        fields: [
          { key: 'mem_secContactName',   label: 'Secondary Contact Name',   showMandatory: false, showPlugin: false },
          { key: 'mem_secContactNumber', label: 'Secondary Contact Number', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'T&C Acceptance',
        fields: [
          { key: 'mem_tcAcceptance', label: 'T&C Acceptance', showMandatory: true, showPlugin: true },
        ],
      },
      {
        title: 'Level',
        fields: [
          { key: 'mem_level', label: 'Level', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Fitness Profile',
        fields: [
          { key: 'mem_injuriesConditions', label: 'Injuries and conditions', showMandatory: false, showPlugin: false },
          { key: 'mem_fitnessGoal',        label: 'Fitness Goal',            showMandatory: true,  showPlugin: true  },
          { key: 'mem_activityLevel',      label: 'Activity Level',          showMandatory: false, showPlugin: false },
          { key: 'mem_expertiseLevel',     label: 'Expertise Level',         showMandatory: true,  showPlugin: true  },
          { key: 'mem_division',           label: 'Division',                showMandatory: true,  showPlugin: true  },
          { key: 'mem_certification',      label: 'Certification',           showMandatory: true,  showPlugin: true  },
        ],
      },
      {
        title: 'Dependent',
        fields: [
          { key: 'mem_dependent', label: 'Dependent', showMandatory: false, showPlugin: true },
        ],
      },
      {
        title: 'Mobile Number',
        fields: [
          { key: 'mem_otpVerification', label: 'OTP Verification', showMandatory: false, showPlugin: false },
        ],
      },
    ];
  }
}

export const memberFormSchema = new MemberFormSchema();
