const BASE_URL = 'https://coffee-club-api-672980247099.us-central1.run.app';

export interface OrderItem {
  city: string;
  item_name: string;
  order_date: string;
  order_id: string;
  order_total: number;
  price: number;
  quantity: number;
  state: string;
  size?: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  city: string;
  state: string;
  items: OrderItem[];
  order_size?: string | number;
}

export const coffeeClubApi = {
  // ... (login and register remain same)
  async login(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Login failed. Please check your credentials.');
    }
    return response.json(); // { id, email }
  },

  async register(email: string, name: string, password: string) {
    const response = await fetch(`${BASE_URL}/members`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Account creation failed. This email might already be in use.');
    }
    return response.json(); // { id, email }
  },

  async getPoints(memberId: string) {
    const response = await fetch(`${BASE_URL}/members/${memberId}/points`);
    if (!response.ok) throw new Error('Failed to fetch points');
    return response.json(); // { points }
  },

  async getOrders(memberId: string): Promise<Order[]> {
    const response = await fetch(`${BASE_URL}/members/${memberId}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    const data = await response.json();

    // Handle already grouped format (from user sample)
    if (Array.isArray(data) && data.length > 0 && data[0].items) {
      return data.map((order: any) => ({
        id: order.order_id || Math.random().toString(36).substr(2, 9),
        date: order.order_date || new Date().toISOString(),
        total: (typeof order.order_size === 'number' ? order.order_size : 
                (typeof order.order_total === 'number' ? order.order_total : 0)),
        city: order.location?.city || '',
        state: order.location?.state || '',
        items: (order.items || []).map((item: any) => ({
          ...item,
          order_id: order.order_id || '',
          order_date: order.order_date || '',
          city: order.location?.city || '',
          state: order.location?.state || '',
          order_total: (typeof order.order_size === 'number' ? order.order_size : 0),
          price: Number(item.price) || 0,
          quantity: Number(item.quantity) || 1,
        })),
        order_size: order.order_size,
      })).sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    // Handle flat list format (existing logic)
    const items: OrderItem[] = data;
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.order_id]) {
        acc[item.order_id] = {
          id: item.order_id,
          date: item.order_date,
          total: Number(item.order_total) || 0,
          city: item.city || '',
          state: item.state || '',
          items: [],
        };
      }
      acc[item.order_id].items.push({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      });
      return acc;
    }, {} as Record<string, Order>);

    return Object.values(grouped).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
};
