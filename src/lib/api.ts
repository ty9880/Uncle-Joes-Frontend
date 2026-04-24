const API_BASE = 'https://uncle-joes-api-919649227917.us-central1.run.app';

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  size?: string;
  calories?: number;
}

export interface Location {
  id: string;
  name: string;
  address_one: string;
  address_two: string | null;
  city: string;
  state: string;
  zip_code: string | number;
  phone_number: string | null;
  hours_monday_open: number | null;
  hours_monday_close: number | null;
  hours_tuesday_open: number | null;
  hours_tuesday_close: number | null;
  hours_wednesday_open: number | null;
  hours_wednesday_close: number | null;
  hours_thursday_open: number | null;
  hours_thursday_close: number | null;
  hours_friday_open: number | null;
  hours_friday_close: number | null;
  hours_saturday_open: number | null;
  hours_saturday_close: number | null;
  hours_sunday_open: number | null;
  hours_sunday_close: number | null;
}

export async function fetchMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_BASE}/menu`);
  if (!res.ok) throw new Error('Failed to fetch menu');
  const data = await res.json();
  // Ensure we return an array. Sometimes APIs return { data: [...] }
  return Array.isArray(data) ? data : data.menu || [];
}

export async function fetchLocations(): Promise<Location[]> {
  const res = await fetch(`${API_BASE}/locations`);
  if (!res.ok) throw new Error('Failed to fetch locations');
  const data = await res.json();
  const locations = Array.isArray(data) ? data : data.locations || [];
  return locations.map((loc: any) => ({
    ...loc,
    name: loc.name || `${loc.city} - ${loc.address_one}`
  }));
}
