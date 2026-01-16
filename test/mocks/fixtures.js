'use strict';

// Base address fixture
const ADDRESS = {
  id: 'adr_test123456789',
  object: 'address',
  name: 'HARRY ZHANG',
  email: 'harry@lob.com',
  phone: '5555555555',
  address_line1: '185 BERRY ST STE 6100',
  address_line2: null,
  address_city: 'SAN FRANCISCO',
  address_state: 'CA',
  address_zip: '94107-1741',
  address_country: 'UNITED STATES',
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// Bank account fixture
const BANK_ACCOUNT = {
  id: 'bank_test123456789',
  object: 'bank_account',
  routing_number: '122100024',
  account_number: '123456788',
  account_type: 'company',
  signatory: 'John Doe',
  verified: false,
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// Postcard fixture
const POSTCARD = {
  id: 'psc_test123456789',
  object: 'postcard',
  description: 'Test Postcard',
  to: ADDRESS,
  front: 'https://lob.com/front.pdf',
  back: 'https://lob.com/back.pdf',
  merge_variables: { is_awesome: true },
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// Letter fixture
const LETTER = {
  id: 'ltr_test123456789',
  object: 'letter',
  description: 'Test Letter',
  to: ADDRESS,
  from: ADDRESS,
  file: 'https://lob.com/letter.pdf',
  merge_variables: { name: 'Harry' },
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// Check fixture
const CHECK = {
  id: 'chk_test123456789',
  object: 'check',
  description: 'Test Check',
  to: ADDRESS,
  from: ADDRESS,
  bank_account: BANK_ACCOUNT,
  check_number: 10001,
  memo: 'Test memo',
  amount: 100,
  merge_variables: { name: 'Harry' },
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// Card fixture
const CARD = {
  id: 'card_test123456789',
  object: 'card',
  description: 'Test Card',
  url: 'https://lob.com/card.pdf',
  size: '2.125x3.375',
  auto_reorder: false,
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// Card Order fixture
const CARD_ORDER = {
  id: 'co_test123456789',
  object: 'card_order',
  card_id: 'card_test123456789',
  quantity_ordered: 10000,
  unit_price: 0.75,
  status: 'pending',
  date_created: '2024-01-16T12:00:00.000Z'
};

// Self Mailer fixture
const SELF_MAILER = {
  id: 'sfm_test123456789',
  object: 'self_mailer',
  description: 'Test Self Mailer',
  to: ADDRESS,
  size: '6x18_bifold',
  outside: 'https://lob.com/outside.pdf',
  inside: 'https://lob.com/inside.pdf',
  merge_variables: { name: 'Harry' },
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// Template fixture
const TEMPLATE = {
  id: 'tmpl_test123456789',
  object: 'template',
  description: 'Test Template',
  html: '<html>Test</html>',
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// Campaign fixture
const CAMPAIGN = {
  id: 'cmp_test123456789',
  object: 'campaign',
  name: 'My test campaign',
  description: 'Created via lob-node SDK',
  schedule_type: 'immediate',
  date_created: '2024-01-16T12:00:00.000Z',
  date_modified: '2024-01-16T12:00:00.000Z'
};

// US Verification fixture
const US_VERIFICATION = {
  id: 'us_ver_test123456789',
  recipient: null,
  primary_line: '185 BERRY ST STE 6100',
  secondary_line: '',
  urbanization: '',
  last_line: 'SAN FRANCISCO CA 94107-1741',
  deliverability: 'deliverable',
  components: {
    primary_number: '185',
    street_predirection: '',
    street_name: 'BERRY',
    street_suffix: 'ST',
    street_postdirection: '',
    secondary_designator: 'STE',
    secondary_number: '6100',
    pmb_designator: '',
    pmb_number: '',
    extra_secondary_designator: '',
    extra_secondary_number: '',
    city: 'SAN FRANCISCO',
    state: 'CA',
    zip_code: '94107',
    zip_code_plus_4: '1741',
    zip_code_type: 'standard',
    delivery_point_barcode: '941071741066',
    address_type: 'commercial',
    record_type: 'highrise',
    default_building_address: false,
    county: 'SAN FRANCISCO',
    county_fips: '06075',
    carrier_route: 'C001',
    carrier_route_type: 'city_delivery',
    latitude: 37.7749,
    longitude: -122.4194
  },
  deliverability_analysis: {
    dpv_confirmation: 'Y',
    dpv_cmra: 'N',
    dpv_vacant: 'N',
    dpv_active: 'Y',
    dpv_footnotes: ['AA', 'BB'],
    ews_match: false,
    lacs_indicator: '',
    lacs_return_code: '',
    suite_return_code: ''
  },
  lob_confidence_score: {
    score: 100,
    level: 'high'
  },
  object: 'us_verification'
};

// International Verification fixture
const INTL_VERIFICATION = {
  id: 'intl_ver_test123456789',
  recipient: null,
  primary_line: '370 WATER ST',
  secondary_line: '',
  last_line: 'SUMMERSIDE PE C1N 1C4',
  country: 'CA',
  deliverability: 'deliverable',
  components: {
    primary_number: '370',
    street_name: 'WATER',
    street_suffix: 'ST',
    city: 'SUMMERSIDE',
    state: 'PE',
    postal_code: 'C1N 1C4'
  },
  object: 'intl_verification'
};

// Bulk US Verification fixture
const BULK_US_VERIFICATION = {
  id: 'us_ver_test123456789',
  primary_line: '1 TELEGRAPH HILL BLVD',
  deliverability: 'deliverable'
};

// Bulk International Verification fixture
const BULK_INTL_VERIFICATION = {
  id: 'intl_ver_test123456789',
  primary_line: '370 WATER ST',
  deliverability: 'deliverable'
};

// US Autocomplete fixture
const US_AUTOCOMPLETE = {
  id: 'us_auto_test123456789',
  suggestions: [
    {
      primary_line: '185 BERRY ST',
      city: 'SAN FRANCISCO',
      state: 'CA',
      zip_code: '94107'
    }
  ],
  object: 'us_autocompletion'
};

// US Reverse Geocode fixture
const US_REVERSE_GEOCODE = {
  id: 'us_reverse_geocode_test123',
  addresses: [
    {
      components: {
        zip_code: '94107',
        zip_code_plus_4: '1741'
      },
      location_analysis: {
        latitude: 37.7749,
        longitude: -122.4194,
        distance: 0
      }
    }
  ],
  object: 'us_reverse_geocode_lookup'
};

// US ZIP Lookup fixture
const US_ZIP_LOOKUP = {
  id: 'us_zip_lookup_test123',
  zip_code: '94107',
  zip_code_type: 'standard',
  cities: [
    {
      city: 'SAN FRANCISCO',
      state: 'CA',
      county: 'SAN FRANCISCO',
      county_fips: '06075',
      preferred: true
    }
  ],
  object: 'us_zip_lookup'
};

// Helper to create a list response
function list (items, count, nextUrl) {
  return {
    object: 'list',
    data: items,
    count: count !== undefined ? count : items.length,
    next_url: nextUrl || null
  };
}

// Helper to create a deleted response
function deleted (id) {
  return {
    id,
    deleted: true
  };
}

// Helper to create an error response
function error (message, statusCode) {
  return {
    error: {
      message,
      status_code: statusCode
    }
  };
}

// Helper to create a clone with overrides
function clone (obj, overrides) {
  return Object.assign({}, obj, overrides);
}

module.exports = {
  ADDRESS,
  BANK_ACCOUNT,
  POSTCARD,
  LETTER,
  CHECK,
  CARD,
  CARD_ORDER,
  SELF_MAILER,
  TEMPLATE,
  CAMPAIGN,
  US_VERIFICATION,
  INTL_VERIFICATION,
  BULK_US_VERIFICATION,
  BULK_INTL_VERIFICATION,
  US_AUTOCOMPLETE,
  US_REVERSE_GEOCODE,
  US_ZIP_LOOKUP,
  list,
  deleted,
  error,
  clone
};
