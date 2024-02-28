interface Beneficiary {
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: Date;
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  residentialAddress: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
}
