export interface Location {
  id: string;
  name: string;
  area: string;
  city: string;
}

export const locations: Location[] = [
  { id: '1', name: 'Koramangala', area: 'Koramangala', city: 'Bangalore' },
  { id: '2', name: 'Indiranagar', area: 'Indiranagar', city: 'Bangalore' },
  { id: '3', name: 'HSR Layout', area: 'HSR Layout', city: 'Bangalore' },
  { id: '4', name: 'Whitefield', area: 'Whitefield', city: 'Bangalore' },
  { id: '5', name: 'Jubilee Hills', area: 'Jubilee Hills', city: 'Hyderabad' },
  { id: '6', name: 'Banjara Hills', area: 'Banjara Hills', city: 'Hyderabad' },
  { id: '7', name: 'Baner', area: 'Baner', city: 'Pune' },
  { id: '8', name: 'Viman Nagar', area: 'Viman Nagar', city: 'Pune' },
  { id: '9', name: 'Old Delhi', area: 'Old Delhi', city: 'Delhi' },
  { id: '10', name: 'Connaught Place', area: 'Connaught Place', city: 'Delhi' },
  { id: '11', name: 'Andheri', area: 'Andheri', city: 'Mumbai' },
  { id: '12', name: 'Bandra', area: 'Bandra', city: 'Mumbai' },
];
