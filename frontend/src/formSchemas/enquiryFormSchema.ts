import type { IFormSchema, SectionMeta } from './formSchema.types';

class EnquiryFormSchema implements IFormSchema {
  readonly formType = 'EnquiryForm';

  getSections(): SectionMeta[] {
    return [
      {
        title: 'Personal Details',
        fields: [
          { key: 'email',       label: 'Email',        showMandatory: true,  showPlugin: true,  defaultMandatory: true, defaultPlugin: true  },
          { key: 'gender',      label: 'Gender',       showMandatory: true,  showPlugin: true,  defaultMandatory: true, defaultPlugin: true  },
          { key: 'dateOfBirth', label: 'Date of Birth',showMandatory: true,  showPlugin: true,  defaultMandatory: true, defaultPlugin: true  },
          { key: 'address',     label: 'Address',      showMandatory: true,  showPlugin: false, defaultMandatory: true  },
          { key: 'locality',    label: 'Locality',     showMandatory: true,  showPlugin: true,  defaultMandatory: true, defaultPlugin: true  },
          { key: 'city',        label: 'City',         showMandatory: true,  showPlugin: true,  defaultMandatory: true, defaultPlugin: true  },
          { key: 'nationalId',  label: 'National ID',  showMandatory: false, showPlugin: false },
          { key: 'enquiryId',   label: 'Enquiry ID',   showMandatory: false, showPlugin: false },
          { key: 'goal',        label: 'Goal',         showMandatory: false, showPlugin: false },
          { key: 'profession',  label: 'Profession',   showMandatory: false, showPlugin: false },
          { key: 'incomeSlab',  label: 'Income Slab',  showMandatory: false, showPlugin: false },
          { key: 'uploadImage', label: 'Upload Image', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Lead Information',
        fields: [
          { key: 'customerType', label: 'Customer type', showMandatory: true,  showPlugin: false, defaultMandatory: true  },
          { key: 'leadSource',   label: 'Lead source',   showMandatory: true,  showPlugin: false, defaultMandatory: true  },
          { key: 'enquiryType',  label: 'Enquiry Type',  showMandatory: true,  showPlugin: false, defaultMandatory: true  },
          { key: 'company',      label: 'Company',       showMandatory: true,  showPlugin: true,  defaultMandatory: true, defaultPlugin: true  },
          { key: 'campaign',     label: 'Campaign',      showMandatory: false, showPlugin: false },
          { key: 'subCampaign',  label: 'SubCampaign',   showMandatory: false, showPlugin: false },
          { key: 'utmSource',    label: 'UTM Source',    showMandatory: false, showPlugin: false },
          { key: 'medium',       label: 'Medium',        showMandatory: false, showPlugin: false },
          { key: 'campaignTerm', label: 'Campaign Term', showMandatory: false, showPlugin: false },
          { key: 'publisher',    label: 'Publisher',     showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Emergency contact',
        fields: [
          { key: 'emergencyContact', label: 'Emergency contact', showMandatory: true, showPlugin: true, defaultMandatory: true, defaultPlugin: true },
        ],
      },
      {
        title: 'Schedule enquiry follow-up',
        fields: [
          { key: 'scheduleFollowUp', label: 'Schedule enquiry follow-up', showMandatory: true, showPlugin: false, defaultMandatory: true },
        ],
      },
      {
        title: 'Schedule a trial / meeting',
        fields: [
          { key: 'scheduleTrial', label: 'Schedule a trial / meeting', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Professional Information',
        fields: [
          { key: 'primaryContact',      label: 'Primary Contact',   showMandatory: true, showPlugin: true,  defaultMandatory: true, defaultPlugin: true  },
          { key: 'hrDetails',           label: 'HR Details',        showMandatory: true, showPlugin: false, defaultMandatory: true  },
          { key: 'secondaryContactPro', label: 'Secondary Contact', showMandatory: true, showPlugin: false, defaultMandatory: true  },
        ],
      },
      {
        title: 'Additional information',
        fields: [
          { key: 'additionalInfo', label: 'Additional information', showMandatory: false, showPlugin: true, defaultPlugin: true },
        ],
      },
      {
        title: 'Fitness Goal',
        fields: [
          { key: 'fitnessGoal', label: 'Fitness Goal', showMandatory: true, showPlugin: true, defaultMandatory: true, defaultPlugin: true },
        ],
      },
      {
        title: 'Secondary contact details',
        fields: [
          { key: 'secContactName',   label: 'Secondary Contact Name',   showMandatory: false, showPlugin: false },
          { key: 'secContactNumber', label: 'Secondary Contact Number', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Mobile Number',
        fields: [
          { key: 'otpVerification', label: 'OTP Verification', showMandatory: false, showPlugin: false },
        ],
      },
    ];
  }
}

export const enquiryFormSchema = new EnquiryFormSchema();
