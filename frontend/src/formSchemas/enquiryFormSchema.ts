import type { IFormSchema, SectionMeta } from './formSchema.types';

class EnquiryFormSchema implements IFormSchema {
  readonly formType = 'EnquiryForm';

  getSections(): SectionMeta[] {
    return [
      {
        title: 'Personal Details',
        fields: [
          { key: 'email',       label: 'Email',        showMandatory: true,  showPlugin: true  },
          { key: 'gender',      label: 'Gender',       showMandatory: true,  showPlugin: true  },
          { key: 'dateOfBirth', label: 'Date of Birth',showMandatory: false, showPlugin: false },
          { key: 'address',     label: 'Address',      showMandatory: false, showPlugin: false },
          { key: 'locality',    label: 'Locality',     showMandatory: true,  showPlugin: true  },
          { key: 'city',        label: 'City',         showMandatory: false, showPlugin: false },
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
          { key: 'customerType', label: 'Customer type', showMandatory: false, showPlugin: false },
          { key: 'leadSource',   label: 'Lead source',   showMandatory: true,  showPlugin: false },
          { key: 'enquiryType',  label: 'Enquiry Type',  showMandatory: true,  showPlugin: false },
          { key: 'company',      label: 'Company',       showMandatory: false, showPlugin: false },
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
          { key: 'emergencyContact', label: 'Emergency contact', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Schedule enquiry follow-up',
        fields: [
          { key: 'scheduleFollowUp', label: 'Schedule enquiry follow-up', showMandatory: true, showPlugin: false },
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
          { key: 'primaryContact',      label: 'Primary Contact',   showMandatory: false, showPlugin: false },
          { key: 'hrDetails',           label: 'HR Details',        showMandatory: false, showPlugin: false },
          { key: 'secondaryContactPro', label: 'Secondary Contact', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Additional information',
        fields: [
          { key: 'additionalInfo', label: 'Additional information', showMandatory: false, showPlugin: false },
        ],
      },
      {
        title: 'Fitness Goal',
        fields: [
          { key: 'fitnessGoal', label: 'Fitness Goal', showMandatory: false, showPlugin: false },
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
