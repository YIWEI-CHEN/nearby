import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    name: 'Ava Gregoraci',
    rate: '4.5',
    imageUrl: '/static/images/avatars/avatar_7.png',
    numberOfComments: '594',
    gender: 'Female',
    age: '18',
    providedServices: [
      { label: 'Shower', price: '1' },
      { label: 'Blood Pressure Measurement', price: '1' },
      { label: 'Medicine Feeding', price: '1' },
      { label: 'Upper Limbs Moving', price: '1' },
      { label: 'Turn Body Over', price: '1' },
    ],
    location: {lat:30.601389, lng:-96.314445},
    updatedAt: '27/03/2019'
  },
  {
    id: uuid(),
    name: 'Emilee Simchenko',
    rate: '2.5',
    imageUrl: '/static/images/avatars/avatar_8.png',
    numberOfComments: '625',
    gender: 'Female',
    age: '28',
    providedServices: [
      { label: 'Blood Sugar Measurement', price: '1' },
      { label: 'Blood Pressure Measurement', price: '1' },
      { label: 'Hair Washing', price: '1' },
      { label: 'Body Temperature Measurement', price: '1' },
      { label: 'Medicine Feeding', price: '1' },
      { label: 'Shower', price: '1' },
    ],

    location: {lat:30.611389, lng:-96.344445},
    createdAt: '31/03/2019'
  },
  {
    id: uuid(),
    name: 'Kwak Seong-Min',
    rate: '5.0',
    imageUrl: '/static/images/avatars/avatar_9.png',
    numberOfComments: '857',
    gender: 'Male',
    age: '35',
    providedServices: [
      { label: 'Blood Pressure Measurement', price: '1' },
      { label: 'Lower Limbs Moving', price: '1' },
      { label: 'Body Temperature Measurement', price: '1' },
      { label: 'Shower', price: '1' },
      { label: 'Hair Washing', price: '1' },
      { label: 'Medicine Feeding', price: '1' },
      { label: 'Teeth Brushing', price: '1' },
      { label: 'Bed Bathing', price: '1' },
      { label: 'Food Feeding', price: '1' },
      { label: 'Upper Limbs Moving', price: '1' },
      { label: 'Turn Body Over', price: '1' },
    ],
    location: {lat:30.641389, lng:-96.364445},
    createdAt: '03/04/2019'
  },
  {
    id: uuid(),
    name: 'Anje Keizer',
    rate: '2.5',
    imageUrl: '/static/images/avatars/avatar_5.png',
    numberOfComments: '406',
    gender: 'Male',
    age: '25',
    providedServices: [
      { label: 'Blood Pressure Measurement', price: '1' },
      { label: 'Food Feeding', price: '1' },
      { label: 'Bed Bathing', price: '1' },
      { label: 'Body Temperature Measurement', price: '1' },
    ],
    location: {lat:30.691389, lng:-96.304445},
    createdAt: '04/04/2019'
  },
  {
    id: uuid(),
    name: 'Clarke Gillebert',
    rate: '3.5',
    imageUrl: '/static/images/avatars/avatar_6.png',
    numberOfComments: '835',
    age: '27',
    location: {lat:30.701389, lng:-96.284445},
    providedServices: [
      { label: 'Blood Pressure Measurement', price: '1' },
      { label: 'Shower' },
      { label: 'Body Temperature Measurement', price: '1' },
      { label: 'Turn Body Over', price: '1' },
      { label: 'Medicine Feeding', price: '1' },
    ]
  },
  {
    id: uuid(),
    name: 'Adam Denisov',
    rate: '3.0',
    imageUrl: '/static/images/avatars/avatar_1.png',
    numberOfComments: '835',
    location: {lat:30.571389, lng:-96.354445},
    gender: 'Male',
    age: '37',
    providedServices: [
      { label: 'Blood Pressure Measurement', price: '1' },
      { label: 'Bed Bathing', price: '1' },
      { label: 'Shower', price: '1' },
      { label: 'Medicine Feeding', price: '1' },
      { label: 'Blood Sugar Measurement', price: '1' },
      { label: 'Body Temperature Measurement', price: '1' },
    ]
  }
];
