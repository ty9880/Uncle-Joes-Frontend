const API_BASE = 'https://coffee-club-api-672980247099.us-central1.run.app';

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

export interface LocationHours {
  open: number | null;
  close: number | null;
}

export interface Location {
  id: string;
  name: string;
  address_one?: string;
  address_two?: string | null;
  city: string;
  state: string;
  zip_code?: string | number;
  phone_number?: string | null;
  hours?: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

function formatTime(militaryTime: number | null): string {
  if (militaryTime === null) return 'Closed';
  if (militaryTime === 0) return '12:00 AM';
  
  const hours24 = Math.floor(militaryTime / 100);
  const minutes = militaryTime % 100;
  const ampm = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

function formatHoursBlock(h: LocationHours | undefined): string {
  if (!h || h.open === null || h.close === null) return 'Closed';
  return `${formatTime(h.open)} - ${formatTime(h.close)}`;
}

export async function fetchMenu(): Promise<MenuItem[]> {
  const res = await fetch(`${API_BASE}/menu`);
  if (!res.ok) throw new Error('Failed to fetch menu');
  const data = await res.json();
  
  const rawMenu = Array.isArray(data) ? data : data.menu || [];
  
  // Flatten nested sizes into individual items for compatibility with existing UI
  const flattened: MenuItem[] = [];
  
  rawMenu.forEach((item: any) => {
    if (item.sizes && Array.isArray(item.sizes)) {
      item.sizes.forEach((sizeOption: any) => {
        flattened.push({
          id: `${item.name}-${sizeOption.size}`.replace(/\s+/g, '-').toLowerCase(),
          name: item.name,
          price: sizeOption.price,
          size: sizeOption.size,
          category: (function() {
            const n = item.name.toLowerCase();
            if (n.includes('tea') || n.includes('chai')) return 'Tea';
            if (n.includes('chocolate') || n.includes('cocoa')) return 'Other';
            return 'Coffee';
          })(),
          description: `Enjoy our signature ${item.name} in ${sizeOption.size} size.`
        });
      });
    } else {
      // Fallback for items without nested sizes if any
      flattened.push({
        id: item.id || item.name.replace(/\s+/g, '-').toLowerCase(),
        name: item.name,
        price: item.price || 0,
        category: 'Other',
        ...item
      });
    }
  });

  return flattened;
}

export async function fetchLocations(): Promise<Location[]> {
  const res = await fetch(`${API_BASE}/locations`);
  if (!res.ok) throw new Error('Failed to fetch locations');
  const data = await res.json();
  const rawLocations = Array.isArray(data) ? data : data.locations || [];
  
  return rawLocations.map((loc: any) => ({
    id: loc.location_id || loc.id,
    name: loc.city,
    city: loc.city,
    state: loc.state,
    address_one: loc.address || 'Local Coffee Club',
    address_two: loc.address_two,
    zip_code: loc.zip_code || '',
    phone_number: loc.phone_number ? (function() {
      const p = loc.phone_number.replace(/\D/g, '');
      if (p.length === 10) {
        return `(${p.slice(0,3)}) ${p.slice(3,6)}-${p.slice(6)}`;
      }
      return loc.phone_number;
    })() : null,
    hours: loc.hours ? {
      monday: formatHoursBlock(loc.hours.monday),
      tuesday: formatHoursBlock(loc.hours.tuesday),
      wednesday: formatHoursBlock(loc.hours.wednesday),
      thursday: formatHoursBlock(loc.hours.thursday),
      friday: formatHoursBlock(loc.hours.friday),
      saturday: formatHoursBlock(loc.hours.saturday),
      sunday: formatHoursBlock(loc.hours.sunday),
    } : undefined
  }));
}
