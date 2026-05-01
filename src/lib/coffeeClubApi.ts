const BASE_URL = 'https://coffee-club-api-672980247099.us-central1.run.app';

export interface OrderItem {
  id: string;
  order_id: string;
  member_id: string;
  item_name: string;
  price: number;
  quantity: number;
  created_at: string;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
}

export const coffeeClubApi = {
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
    const items: OrderItem[] = await response.json();

    // Group items by order_id
    const grouped = items.reduce((acc, item) => {
      if (!acc[item.order_id]) {
        acc[item.order_id] = {
          id: item.order_id,
          date: item.created_at,
          total: 0,
          items: [],
        };
      }
      acc[item.order_id].items.push(item);
      acc[item.order_id].total += item.price * item.quantity;
      return acc;
    }, {} as Record<string, Order>);

    return Object.values(grouped).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  },
};
